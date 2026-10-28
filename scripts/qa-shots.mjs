// QA captures: mobile (390x844) hero / open menu / work / contact+footer,
// desktop (1440x900) contact / figma block / footer. Viewport shots only.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9225;
const URL_BASE = "http://localhost:8080/";
const OUT_DIR = path.resolve("shots/qa");
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

async function shot(cdp, name) {
  await sleep(700);
  const data = await cdp.send("Page.captureScreenshot", { format: "png" });
  const file = path.join(OUT_DIR, `${name}.png`);
  writeFileSync(file, Buffer.from(data.data, "base64"));
  console.log(`saved ${file}`);
}

async function scrollTo(cdp, y) {
  await evalJs(cdp, `window.scrollTo(0, ${y}); 'ok'`);
  await sleep(900);
}

async function eagerImages(cdp) {
  await evalJs(cdp, "document.querySelectorAll('img[loading=\"lazy\"]').forEach(i => { i.loading = 'eager'; }); 'ok'");
}

async function forceReveal(cdp) {
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.id = 'qa-reveal';
    style.textContent = '.reveal-word,.reveal-character,.reveal-line{opacity:1 !important;transform:none !important}';
    if (!document.getElementById('qa-reveal')) document.head.appendChild(style);
    let fixed = 0;
    document.querySelectorAll('main [style], header, header [style]').forEach(el => {
      const s = el.style;
      if (s.opacity && parseFloat(s.opacity) < 1) { s.opacity = '1'; fixed++; }
      if (s.transform && s.transform !== 'none') { s.transform = 'none'; fixed++; }
      if (s.clipPath && !s.clipPath.includes('0% 0')) { s.clipPath = 'inset(0 0 0% 0)'; fixed++; }
    });
    return 'fixed=' + fixed;
  })()`);
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
      "--user-data-dir=" + path.join(OUT_DIR, "profile"),
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
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });

    // ---------- MOBILE ----------
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(10000);
    await eagerImages(cdp);
    await forceReveal(cdp);
    const pageHeight = await evalJs(cdp, "document.documentElement.scrollHeight");
    console.log("[mobile] height=", pageHeight);

    await shot(cdp, "mobile-1-hero");

    // open mobile menu
    const clicked = await evalJs(cdp,
      `(() => { const b = document.querySelector('button[aria-label="Open navigation menu"]'); if (!b) return 'no-button'; b.click(); return 'clicked'; })()`);
    console.log("[mobile] menu:", clicked);
    await forceReveal(cdp);
    await shot(cdp, "mobile-2-menu-open");
    await evalJs(cdp,
      `(() => { const b = document.querySelector('button[aria-label="Close navigation menu"]'); if (b) b.click(); return 'ok'; })()`);
    await sleep(400);

    // work section
    await evalJs(cdp, `(() => { const el = document.getElementById('portfolio'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80); return 'ok'; })()`);
    await sleep(900);
    await shot(cdp, "mobile-3-work");

    // contact + footer (page bottom)
    await evalJs(cdp, "window.scrollTo(0, document.documentElement.scrollHeight); 'ok'");
    await sleep(1200);
    await shot(cdp, "mobile-4-contact-footer");

    // ---------- DESKTOP ----------
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send("Page.navigate", { url: URL_BASE });
    await sleep(9000);
    await eagerImages(cdp);
    await forceReveal(cdp);

    // contact section
    await evalJs(cdp, `(() => { const el = document.getElementById('contact'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60); return 'ok'; })()`);
    await sleep(1000);
    await shot(cdp, "desktop-1-contact");

    // figma designs block (last category heading inside portfolio)
    await evalJs(cdp, `(() => {
      const heads = [...document.querySelectorAll('#portfolio h2, #portfolio h3')];
      const figma = heads.find(h => /figma/i.test(h.textContent));
      if (figma) { window.scrollTo(0, figma.getBoundingClientRect().top + window.scrollY - 140); return 'found'; }
      return 'not-found';
    })()`);
    await sleep(1200);
    await shot(cdp, "desktop-2-figma");

    // footer
    await evalJs(cdp, "window.scrollTo(0, document.documentElement.scrollHeight); 'ok'");
    await sleep(1000);
    await shot(cdp, "desktop-3-footer");

    cdp.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
