import { execSync } from "child_process";
import fs from "fs";

// Step 1: Run the normal build
execSync("npm run build", { stdio: "inherit" });

// Step 2: Create .vercel/output structure
const vercelOutput = ".vercel/output";
const functionsDir = `${vercelOutput}/functions/__server.func`;
const staticDir = `${vercelOutput}/static`;
const nitroConfigPath = "dist/config.json";

fs.rmSync(vercelOutput, { recursive: true, force: true });
fs.mkdirSync(functionsDir, { recursive: true });
fs.mkdirSync(staticDir, { recursive: true });

// Step 3: Copy server files to function
fs.cpSync("dist/server", functionsDir, { recursive: true });

// Step 4: Copy client static files
fs.cpSync("dist/client", staticDir, { recursive: true });

// Step 5: Start from Nitro's generated Vercel config.
// Nitro includes important route ordering (including filesystem handling)
// that should not be replaced by a hand-written catch-all config.
const nitroConfig = JSON.parse(fs.readFileSync(nitroConfigPath, "utf8"));

const customHeaderRoutes = [
  {
    src: "/(.*)",
    continue: true,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },
  {
    src: "/assets/(.*)",
    continue: true,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
  {
    src: "/icons/(.*)",
    continue: true,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
  {
    src: "/(robots.txt|manifest.webmanifest|sitemap.xml)",
    continue: true,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  },
];

const config = {
  ...nitroConfig,
  routes: [...customHeaderRoutes, ...(nitroConfig.routes ?? [])],
};

fs.writeFileSync(`${vercelOutput}/config.json`, JSON.stringify(config, null, 2));

console.log("✅ Vercel output structure created successfully!");
