import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Hijacking the wheel is the single most expensive thing on this page for
    // anyone who has asked the OS to keep motion to a minimum.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true });

    // Route in-page anchors through Lenis so navbar/footer links glide to the
    // target section instead of jumping, offset for the fixed navbar height.
    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
      window.history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    let raf = 0;
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
        return;
      }

      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    raf = requestAnimationFrame(loop);

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
  return null;
}
