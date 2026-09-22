// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

const imagePresets: Record<string, Record<string, string>> = {
  card: { w: "480;800;1200;1600", format: "webp", as: "picture" },
  logo: { w: "320;480;751", format: "webp", quality: "90", as: "picture" },
  hero: { w: "480;800;1200;1600", format: "webp", quality: "95", as: "picture" },
};

export default defineConfig({
  vite: {
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          const preset = Object.keys(imagePresets).find((key) =>
            url.searchParams.has(key),
          );
          return new URLSearchParams(preset ? imagePresets[preset] : {});
        },
      }),
    ],
    logLevel: "error",
    build: {
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            typeof warning.message === "string" &&
            warning.message.includes(
              "Module level directives cause errors when bundled",
            )
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
});
