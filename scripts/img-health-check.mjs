// One-off: tablet-viewport image health with a real wait-for-complete loop.
import { spawn } from "node:child_process";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9227;
const URL_BASE = "http://localhost:8080/";
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

const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
  `--remote-debugging-port=${PORT}`, "--user-data-dir=" + path.resolve("shots/responsive/profile2"), "about:blank"], { stdio: "ignore" });
try {
  const targets = await waitForEndpoint(`http://127.0.0.1:${PORT}/json/list`);
  const page = targets.find((t) => t.type === "page");
  const cdp = await connect(page.webSocketDebuggerUrl);
  await cdp.send("Page.enable"); await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 768, height: 1024, deviceScaleFactor: 2, mobile: true });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(9000);

  const result = await evalJs(cdp, `(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 1000) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
    const deadline = Date.now() + 30000;
    let bad = [];
    while (Date.now() < deadline) {
      bad = [...document.images].filter(i => !i.complete || (i.naturalWidth === 0 && i.src));
      if (bad.length === 0) break;
      await new Promise(r => setTimeout(r, 500));
    }
    const imgs = [...document.images];
    return JSON.stringify({
      total: imgs.length,
      brokenAfterWait: bad.length,
      sampleBad: bad.slice(0, 5).map(i => i.currentSrc || i.src),
    }, null, 2);
  })()`);
  console.log(result);
  cdp.close();
} finally { chrome.kill(); }
