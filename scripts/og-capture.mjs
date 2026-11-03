// OG image capture — renders the live hero at a 1200x630 aspect viewport (2x DPR)
// and writes public/og-image.png so the Instagram DM link preview matches the
// real site design exactly.
// 1. emulate prefers-reduced-motion (Lenis off, static hero variant)
// 2. wait for load + hydration settle
// 3. flip lazy images to eager, wait until every <img> is complete
// 4. force final reveal state (CSS reveals + framer inline styles)
// 5. viewport capture (no scroll), downscale to 1200x630
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9224;
const URL_BASE = process.env.OG_URL ?? "http://localhost:8080/";
const OUT_DIR = path.resolve("shots/og");
mkdirSync(OUT_DIR, { recursive: true });

// 1728x907 == 1200x630 aspect (1.9048) at desktop width
const VIEWPORTS = [
  { width: 1728, height: 907, tag: "1728" },
  { width: 1920, height: 1008, tag: "1920" },
];

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
  const r = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails)
    throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 400));
  return r.result.value;
}

async function captureHero(cdp, { width, height, tag }) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: URL_BASE });
  await sleep(12000); // dev-server compile + hydration settle

  await evalJs(
    cdp,
    `document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });`,
  );
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

  // Match the reference framing: full-bleed container with ~56px margins,
  // no stats row, no scroll cue.
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.textContent = [
      '[class*="max-w-[1440px]"] { max-width: none !important; }',
      '#top { padding-left: 56px !important; padding-right: 56px !important; }',
      'header.fixed { padding-left: 56px !important; padding-right: 56px !important; }',
    ].join('\\n');
    document.head.appendChild(style);

    let hidden = [];
    const label = [...document.querySelectorAll('div,p,span')].find(e => /Projects delivered/i.test(e.textContent) && e.textContent.length < 200);
    if (label) {
      const grid = label.closest('[class*="grid-cols-3"]') || label.closest('.grid');
      if (grid) { grid.style.display = 'none'; hidden.push('stats'); }
    }
    const scroll = [...document.querySelectorAll('div,span')].find(e => e.textContent.trim().toLowerCase() === 'scroll');
    if (scroll) {
      let box = scroll;
      for (let i = 0; i < 4 && box.parentElement; i++) {
        const r = box.getBoundingClientRect();
        if (r.height < 300 && r.width < 400 && r.height > 20) break;
        box = box.parentElement;
      }
      box.style.display = 'none'; hidden.push('scroll-cue');
    }
    return 'hidden=' + hidden.join(',');
  })()`);

  // Force every inline-styled element (incl. the fixed <header> itself) to its
  // final revealed state — framer-motion initial styles never animate in headless.
  await evalJs(cdp, `(() => {
    const style = document.createElement('style');
    style.textContent = '.reveal-word,.reveal-character,.reveal-line{opacity:1 !important;transform:none !important}';
    document.head.appendChild(style);
    let fixed = 0;
    document.querySelectorAll('[style]').forEach(el => {
      const s = el.style;
      let touched = false;
      if (s.opacity && parseFloat(s.opacity) < 1) { s.opacity = '1'; touched = true; }
      if (s.transform && s.transform !== 'none') { s.transform = 'none'; touched = true; }
      if (touched) fixed++;
    });
    return 'fixed=' + fixed;
  })()`);
  await sleep(1200);

  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  const raw = path.join(OUT_DIR, `hero-${tag}.png`);
  writeFileSync(raw, Buffer.from(shot.data, "base64"));
  console.log(`[${tag}] saved ${raw}`);
  return raw;
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
      "--hide-scrollbars",
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

    for (const vp of VIEWPORTS) {
      const raw = await captureHero(cdp, vp);
      const out = path.join(OUT_DIR, `og-${vp.tag}.png`);
      await sharp(raw).resize(1200, 630).png().toFile(out);
      console.log(`[${vp.tag}] wrote ${out} (1200x630)`);
    }
    cdp.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
