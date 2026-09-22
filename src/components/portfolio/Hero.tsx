import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download, MousePointerClick, Rocket, Layers, Briefcase } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const services = ["AI Applications", "Scalable SaaS", "Web Experiences"];

function FloatingCard({ delay, className, title, subtitle, icon: Icon }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring", stiffness: 80, damping: 20 }}
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      className={`absolute hidden lg:flex cursor-grab items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 pr-6 backdrop-blur-xl shadow-2xl transition-colors hover:bg-white/[0.06] ${className}`}
    >
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="font-display text-xl font-bold text-foreground">{title}</span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{subtitle}</span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for orbs
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" ref={containerRef} className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="noise" />
        
        {/* Parallax Glowing Orbs */}
        <motion.div style={{ y: y1 }} className="absolute -left-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-primary/20 blur-[140px]" />
        <motion.div style={{ y: y2 }} className="absolute -right-[5%] top-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[160px]" />
        <div className="absolute left-[30%] top-[60%] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* Smooth gradient fade to blend the grid and glowing orbs with the page sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-24 sm:px-6 sm:py-32">
        
        {/* Floating Stats Cards (Visible only on large screens) */}
        <FloatingCard 
          delay={1.2}
          title="4+ Years"
          subtitle="Experience"
          icon={Briefcase}
          className="-left-12 top-[10%] rotate-[-2deg]"
        />
        <FloatingCard 
          delay={1.4}
          title="40+"
          subtitle="Projects Shipped"
          icon={Rocket}
          className="-right-8 top-[25%] rotate-[3deg]"
        />
        <FloatingCard 
          delay={1.6}
          title="12+"
          subtitle="Stacks Mastered"
          icon={Layers}
          className="bottom-[20%] right-[2%] rotate-[-3deg]"
        />

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] backdrop-blur-md sm:mb-10"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground sm:text-sm">Freelance Full-Stack Developer</span>
        </motion.div>

        {/* Main Headline */}
        <div className="relative flex flex-col items-center text-center">
          <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5"
            >
              <span>Building</span>
              <span className="text-white/60">the Future</span>
              <span>with</span>
            </motion.div>
            
            <div className="relative mt-2 flex h-[1.3em] justify-center overflow-hidden sm:mt-4">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={serviceIndex}
                  initial={{ y: "100%", opacity: 0, rotateX: -45 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-100%", opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 40px rgba(129, 140, 248, 0.3)" }}
                >
                  {services[serviceIndex]}.
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:mt-10 sm:text-lg md:text-xl"
        >
          I'm <span className="font-medium text-foreground">Sahil Hashmi</span> — crafting{" "}
          <span className="text-foreground">AI-powered applications</span>,{" "}
          <span className="text-foreground">scalable SaaS systems</span>, and elegant product experiences for ambitious teams worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12"
        >
          <MagneticButton asLink="#projects" variant="primary" className="h-14 px-8 text-base shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]">
            View selected work
            <ArrowUpRight size={20} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
          <MagneticButton asLink="#contact" variant="ghost" className="h-14 px-8 text-base border-white/20 hover:bg-white/10">
            <Download size={18} className="mr-2" />
            Hire me
          </MagneticButton>
        </motion.div>
        
        {/* Mobile Stats (Only visible on small screens since floating cards are hidden) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:hidden sm:grid-cols-3"
        >
          {[
            { k: "4+", v: "Years exp" },
            { k: "40+", v: "Projects" },
            { k: "12+", v: "Stacks" },
          ].map((s) => (
            <div key={s.v} className="bg-background/60 px-5 py-5 text-center backdrop-blur-md">
              <div className="font-display text-2xl font-bold text-foreground">{s.k}</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hidden [@media(min-height:800px)]:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <MousePointerClick size={16} className="text-white/40" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
          <div className="h-10 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}