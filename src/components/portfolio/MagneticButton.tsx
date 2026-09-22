import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  asLink?: string;
}

export function MagneticButton({ children, variant = "primary", asLink, className = "", ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90 shadow-[0_18px_48px_-30px_rgba(17,17,17,0.65)]"
      : "border border-black/10 bg-white/60 text-foreground hover:bg-white hover:border-black/25";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {asLink ? (
        <a
          href={asLink}
          className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles} ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          {...rest}
          className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles} ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
  return inner;
}