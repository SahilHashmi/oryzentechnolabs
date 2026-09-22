import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "React Native"],
  },
  {
    title: "Backend",
    items: ["Python", "Django", "FastAPI", "Flask", "Django REST", "Node.js", "GraphQL", "Celery", "Microservices"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"],
  },
  {
    title: "AI & Cloud",
    items: ["Generative AI", "Machine Learning", "NLP", "AWS", "Docker", "Kubernetes", "CI/CD"],
  },
];

const marquee = [
  "React", "Next.js", "TypeScript", "Python", "Django", "FastAPI", "Node.js",
  "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "GraphQL", "Tailwind",
  "GenAI", "NLP", "ML",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[300px] max-w-3xl rounded-full bg-primary/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Skills & Stack"
          title="A toolkit shaped by production."
          description="From elegant interfaces to AI-powered backends — battle-tested across freelance, agency and product engagements."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((g, idx) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 hover-glow"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-lg font-medium text-foreground">{g.title}</h3>
                  <span className="text-xs text-muted-foreground">{g.items.length} tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.03 }}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-foreground/90 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] py-5" aria-hidden="true">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max marquee gap-10 whitespace-nowrap pr-10">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i} className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {t} <span className="ml-10 text-primary/50">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}