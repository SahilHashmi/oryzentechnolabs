// Responsive proof: capture hero / work / contact at phone, tablet, desktop
// widths + report horizontal-overflow and image-load status per viewport.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9226;
const URL_BASE = "http://localhost:8080/";
const OUT_DIR = path.resolve("shots/responsive");
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

async function forceReveal(cdp) {
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.id = 'qa-reveal';
    style.textContent = '.reveal-word,.reveal-character,.reveal-line{opacity:1 !important;transform:none !important}';
    if (!document.getElementById('qa-reveal')) document.head.appendChild(style);
    document.querySelectorAll('main [style], header, header [style]').forEach(el => {
      const s = el.style;
      if (s.opacity && parseFloat(s.opacity) < 1) s.opacity = '1';
      if (s.transform && s.transform !== 'none') s.transform = 'none';
      if (s.clipPath && !s.clipPath.includes('0% 0')) s.clipPath = 'inset(0 0 0% 0)';
    });
    return 'ok';
  })()`);
}

async function shot(cdp, name) {
  await sleep(700);
  const data = await cdp.send("Page.captureScreenshot", { format: "png" });
  const file = path.join(OUT_DIR, `${name}.png`);
  writeFileSync(file, Buffer.from(data.data, "base64"));
  console.log(`saved ${file}`);
}

async function run(cdp, { width, height, mobile, tag }) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(9000);
  await forceReveal(cdp);

  // overflow + image health check at this viewport
  const health = await evalJs(cdp, `(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 1000) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 800));
    const de = document.documentElement;
    const badImgs = [...document.images].filter(i => !i.complete || (i.naturalWidth === 0 && i.src)).length;
    return JSON.stringify({
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      horizontalOverflow: de.scrollWidth > de.clientWidth,
      imagesTotal: document.images.length,
      imagesBroken: badImgs,
    });
  })()`);
  console.log(`[${tag}]`, health);
  writeFileSync(path.join(OUT_DIR, `${tag}-health.json`), health);

  await forceReveal(cdp);
  await shot(cdp, `${tag}-1-hero`);

  await evalJs(cdp, `(() => { const el = document.getElementById('portfolio'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80); return 'ok'; })()`);
  await sleep(1000);
  await shot(cdp, `${tag}-2-work`);

  await evalJs(cdp, "window.scrollTo(0, document.documentElement.scrollHeight); 'ok'");
  await sleep(1100);
  await shot(cdp, `${tag}-3-contact-footer`);
}

async function main() {
  const chrome = spawn(
    CHROME,
    ["--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
     `--remote-debugging-port=${PORT}`, "--user-data-dir=" + path.join(OUT_DIR, "profile"), "about:blank"],
    { stdio: "ignore" },
  );
  try {
    const targets = await waitForEndpoint(`http://127.0.0.1:${PORT}/json/list`);
    const page = targets.find((t) => t.type === "page");
    const cdp = await connect(page.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });

    await run(cdp, { width: 390,  height: 844,  mobile: true,  tag: "phone-390" });
    await run(cdp, { width: 768,  height: 1024, mobile: true,  tag: "tablet-768" });
    await run(cdp, { width: 1440, height: 900,  mobile: false, tag: "desktop-1440" });
    cdp.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
