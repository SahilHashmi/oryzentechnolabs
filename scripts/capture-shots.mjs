// CDP screenshot driver v2 — deterministic:
// 1. emulate prefers-reduced-motion (Lenis off, static hero variant)
// 2. wait for load + hydration settle
// 3. flip lazy images to eager, scroll sweep so everything loads
// 4. wait until every <img> is complete
// 5. force final reveal state (CSS reveals + framer inline styles)
// 6. full-page capture (captureBeyondViewport)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9224;
const URL_BASE = "http://localhost:8080/";
const OUT_DIR = path.resolve("shots/cdp");
mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForEndpoint(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {}
    await sleep(200);
  }
  throw new Error("DevTools endpoint never came up: " + url);
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0;
    const pending = new Map();
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            const mid = ++id;
            pending.set(mid, { res, rej });
            ws.send(JSON.stringify({ id: mid, method, params }));
          }),
        close: () => ws.close(),
      });
    ws.onerror = reject;
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      }
    };
  });
}

async function evalJs(cdp, expression) {
  const r = await cdp.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 400));
  return r.result.value;
}

async function captureSet(cdp, { width, height, mobile, tag }) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(10000); // dev-server compile + hydration settle

  const sections = await evalJs(cdp,
    "JSON.stringify(Object.fromEntries(['top','about','tech-stack','portfolio','services','pricing','process','testimonials','contact'].map(id => { const el = document.getElementById(id); return [id, el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1]; })))");
  const pageHeight = await evalJs(cdp, "document.documentElement.scrollHeight");
  console.log(`[${tag}] height=${pageHeight}`, sections);

  // eager-load everything, then sweep so lazy imgs below fold actually fetch
  await evalJs(cdp, "document.querySelectorAll('img[loading=\"lazy\"]').forEach(i => { i.loading = 'eager'; });");
  for (let y = 0; y <= pageHeight; y += 900) {
    await evalJs(cdp, `window.scrollTo(0, ${y})`);
    await sleep(220);
  }
  // wait for every image to finish decoding (imagetools transforms on demand)
  const imagesDone = await evalJs(cdp, `new Promise(resolve => {
    const deadline = Date.now() + 45000;
    const tick = () => {
      const imgs = Array.from(document.images);
      const bad = imgs.filter(i => !i.complete || (i.naturalWidth === 0 && i.src));
      if (bad.length === 0 || Date.now() > deadline) resolve(JSON.stringify({total: imgs.length, pending: bad.length, timedOut: Date.now() > deadline}));
      else setTimeout(tick, 500);
    };
    tick();
  })`);
  console.log(`[${tag}] images:`, imagesDone);

  await evalJs(cdp, "window.scrollTo(0, 0)");
  await sleep(800);

  // force final reveal state: CSS reveal classes + framer inline hidden styles
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.textContent = '.reveal-word,.reveal-character,.reveal-line{opacity:1 !important;transform:none !important}';
    document.head.appendChild(style);
    let fixed = 0;
    document.querySelectorAll('main [style], header [style]').forEach(el => {
      const s = el.style;
      let touched = false;
      if (s.opacity && parseFloat(s.opacity) < 1) { s.opacity = '1'; touched = true; }
      if (s.transform && s.transform !== 'none') { s.transform = 'none'; touched = true; }
      if (touched) fixed++;
    });
    return 'fixed=' + fixed;
  })()`);
  await sleep(400);

  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  const file = path.join(OUT_DIR, `${tag}-fullpage.png`);
  writeFileSync(file, Buffer.from(shot.data, "base64"));
  console.log(`[${tag}] saved ${file}`);
  return { sections, pageHeight };
}

async function main() {
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      `--remote-debugging-port=${PORT}`,
      "--user-data-dir=" + path.join(OUT_DIR, "profile2"),
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  try {
    const targets = await waitForEndpoint(`http://127.0.0.1:${PORT}/json/list`);
    const page = targets.find((t) => t.type === "page");
    const cdp = await connect(page.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    const desktop = await captureSet(cdp, { width: 1440, height: 900, mobile: false, tag: "desktop" });
    const mobile = await captureSet(cdp, { width: 390, height: 844, mobile: true, tag: "mobile" });

    writeFileSync(
      path.join(OUT_DIR, "sections.json"),
      JSON.stringify({ desktop, mobile }, null, 2),
    );
    cdp.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
