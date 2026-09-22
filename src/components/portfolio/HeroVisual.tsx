import { motion } from "framer-motion";
import { useMousePosition } from "./useMousePosition";

const techIcons = [
  { label: "React", x: "-12%", y: "8%", delay: 0 },
  { label: "Next.js", x: "78%", y: "0%", delay: 0.4 },
  { label: "Node.js", x: "-8%", y: "70%", delay: 0.8 },
  { label: "AI", x: "82%", y: "62%", delay: 1.2 },
];

export function HeroVisual() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="relative hidden h-[460px] w-full lg:block"
      style={{ perspective: "1200px" }}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Holographic code panel */}
        <motion.div
          className="glass-strong absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/20 p-5"
          style={{ transform: "translateZ(40px)", boxShadow: "0 0 60px -10px hsl(var(--primary) / 0.4)" }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="space-y-2 font-mono text-[11px]">
            <p className="text-primary/90">const <span className="text-foreground">build</span> = () =&gt; {"{"}</p>
            <p className="pl-4 text-muted-foreground">ship(<span className="text-primary/80">'scalable SaaS'</span>);</p>
            <p className="pl-4 text-muted-foreground">deploy(<span className="text-primary/80">'AI features'</span>);</p>
            <div className="pl-4 h-1.5 w-2/3 rounded bg-primary/20" />
            <div className="pl-4 h-1.5 w-1/2 rounded bg-white/10" />
            <p className="text-primary/90">{"}"}</p>
          </div>
        </motion.div>

        {/* Rotating glass cubes */}
        {[
          { top: "5%", left: "20%", size: 56, dur: 14, z: 80 },
          { top: "72%", left: "70%", size: 44, dur: 18, z: 60 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur"
            style={{
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              transform: `translateZ(${c.z}px)`,
              boxShadow: "inset 0 0 20px hsl(var(--primary) / 0.15), 0 0 30px -8px hsl(var(--primary) / 0.5)",
            }}
            animate={{ rotateZ: [0, 360], rotateX: [0, 180, 360] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Floating tech badges */}
        {techIcons.map((t) => (
          <motion.div
            key={t.label}
            className="glass-strong absolute grid place-items-center rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-foreground/90"
            style={{ left: t.x, top: t.y, transform: "translateZ(100px)" }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, delay: t.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {t.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
