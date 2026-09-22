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
      document.removeEventListener("visibilitychange", onVisibilityChange);
      lenis.destroy();
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);
  return null;
}
