// Verify bigger navbar + footer logos: desktop top, desktop footer, mobile top.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9228;
const URL_BASE = "http://localhost:8080/";
const OUT_DIR = path.resolve("shots/logo-check");
mkdirSync(OUT_DIR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForEndpoint(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try { const res = await fetch(url); if (res.ok) return res.json(); } catch {}
    await sleep(200);
  }
  throw new Error("endpoint never up: " + url);
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0; const pending = new Map();
    ws.onopen = () => resolve({
      send: (method, params = {}) => new Promise((res, rej) => {
        const mid = ++id; pending.set(mid, { res, rej });
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
  writeFileSync(path.join(OUT_DIR, `${name}.png`), Buffer.from(data.data, "base64"));
  console.log(`saved ${name}`);
}

const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
  `--remote-debugging-port=${PORT}`, "--user-data-dir=" + path.join(OUT_DIR, "profile"), "about:blank"], { stdio: "ignore" });
try {
  const targets = await waitForEndpoint(`http://127.0.0.1:${PORT}/json/list`);
  const page = targets.find((t) => t.type === "page");
  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(9000);
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.textContent = '.reveal-word,.reveal-character,.reveal-line{opacity:1 !important;transform:none !important}';
    document.head.appendChild(style);
    document.querySelectorAll('main [style], header, header [style]').forEach(el => {
      const s = el.style;
      if (s.opacity && parseFloat(s.opacity) < 1) s.opacity = '1';
      if (s.transform && s.transform !== 'none') s.transform = 'none';
    });
    return 'ok';
  })()`);
  await shot(cdp, "desktop-navbar");

  await evalJs(cdp, "window.scrollTo(0, document.documentElement.scrollHeight); 'ok'");
  await sleep(1000);
  await shot(cdp, "desktop-footer");

  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(8000);
  await evalJs(cdp, `(() => {
    document.querySelectorAll('main [style], header, header [style]').forEach(el => {
      const s = el.style;
      if (s.opacity && parseFloat(s.opacity) < 1) s.opacity = '1';
      if (s.transform && s.transform !== 'none') s.transform = 'none';
    });
    return 'ok';
  })()`);
  await shot(cdp, "mobile-navbar");
  cdp.close();
} finally { chrome.kill(); }
