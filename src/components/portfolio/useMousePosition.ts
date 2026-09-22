import { useEffect, useRef, useState } from "react";

type Pointer = { x: number; y: number }; // normalized -1..1 from center

export function useMousePosition(enabled = true) {
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const target = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (frame.current == null) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    // Lerp toward target for buttery motion instead of jumpy updates.
    const tick = () => {
      setPointer((prev) => {
        const nx = prev.x + (target.current.x - prev.x) * 0.12;
        const ny = prev.y + (target.current.y - prev.y) * 0.12;
        const settled = Math.abs(nx - target.current.x) < 0.001 && Math.abs(ny - target.current.y) < 0.001;
        if (settled) {
          frame.current = null;
          return { x: target.current.x, y: target.current.y };
        }
        frame.current = requestAnimationFrame(tick);
        return { x: nx, y: ny };
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return pointer;
}
