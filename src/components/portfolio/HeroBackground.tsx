import { motion } from "framer-motion";
import { useMemo } from "react";
import { useMousePosition } from "./useMousePosition";

const PARTICLE_COUNT = 18; // keep low — each is a compositor layer

export function HeroBackground() {
  const { x, y } = useMousePosition();

  // Deterministic particle field so SSR + client match (no hydration mismatch).
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 2 + ((i * 7) % 5),
        delay: (i % 6) * 0.8,
        duration: 8 + (i % 5) * 2,
        depth: 0.4 + ((i % 4) * 0.25), // parallax strength
      })),
    [],
  );

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Existing grid background — kept */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Animated gradient mesh (palette-locked: primary + indigo) */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(40% 50% at 30% 30%, hsl(var(--primary) / 0.18), transparent 70%), radial-gradient(35% 45% at 75% 60%, rgb(99 102 241 / 0.16), transparent 70%)",
          transform: `translate3d(${x * -18}px, ${y * -18}px, 0)`,
        }}
      />

      {/* 3D perspective grid floor fading into the distance */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{ perspective: "600px", maskImage: "linear-gradient(to top, black 0%, transparent 85%)" }}
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={{
            transform: `rotateX(72deg) translateY(${y * 14}px)`,
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.22) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.22) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          animate={{ backgroundPositionY: ["0px", "48px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Mouse-following ambient light */}
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.22), transparent 70%)",
          left: "50%",
          top: "40%",
        }}
        animate={{ x: x * 140 - 210, y: y * 120 - 210 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Existing glows — now parallaxing */}
      <div
        className="absolute left-1/2 top-[20%] h-[320px] w-full max-w-[820px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px] sm:h-[520px]"
        style={{ transform: `translate(-50%, ${y * -20}px)` }}
      />
      <div className="absolute left-[15%] top-[60%] h-[160px] w-[160px] rounded-full bg-primary/20 blur-[110px] float-slow sm:h-[260px] sm:w-[260px]" />
      <div
        className="absolute right-[10%] top-[30%] h-[140px] w-[140px] rounded-full bg-indigo-500/20 blur-[110px] float-slow sm:h-[220px] sm:w-[220px]"
        style={{ animationDelay: "-3s" }}
      />

      {/* Glowing particle field with depth parallax */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/70"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px 1px hsl(var(--primary) / 0.6)",
            transform: `translate3d(${x * p.depth * 30}px, ${y * p.depth * 30}px, 0)`,
            willChange: "transform, opacity",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="noise" />
    </div>
  );
}
