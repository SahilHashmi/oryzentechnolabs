import { motion } from "framer-motion";
import { Sparkles, Code2, Globe2, Cpu } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const pillars = [
  { icon: Code2, title: "Full Stack Craft", body: "End-to-end product engineering across modern web stacks — from pixel-perfect UI to resilient APIs and data layers." },
  { icon: Cpu, title: "AI-Native Systems", body: "Designing intelligent products: RAG pipelines, LLM agents, NLP services and ML-enhanced workflows." },
  { icon: Globe2, title: "Remote-First", body: "Operating across time zones with startups, agencies and founders — async communication, clear delivery." },
  { icon: Sparkles, title: "Premium Experience", body: "Obsessive about polish — typography, motion, micro-interactions, and the small details that compound." },
];

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="About"
          title="A developer who ships what founders imagine."
          description="I help startups, agencies and product teams turn complex ideas into elegant, scalable software — across freelance, contract, part-time and full-time remote engagements."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover-glow"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Long-form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-8 sm:p-12"
        >
          <div className="absolute inset-0 -z-10 opacity-40">
            <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl" />
          </div>
          <p className="max-w-3xl font-display text-2xl leading-snug text-foreground/90 sm:text-3xl text-pretty">
            With 4+ years of experience building products at the intersection of{" "}
            <span className="accent-text">design, engineering and AI</span> — partnering with founders to ship faster, scale further, and look exceptional doing it.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            For <span className="text-foreground/90">large-scale or enterprise-level projects</span> requiring a bigger team, I operate through my{" "}
            <span className="text-foreground/90">registered IT agency</span> — enabling proper team structure, scalability, and reliable delivery support for complex engagements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}