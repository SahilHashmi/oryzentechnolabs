import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const experience = [
  {
    company: "SAAS Consultants",
    role: "Full Stack Developer",
    type: "Contract",
    period: "Mar 20, 2026 – Present",
    location: "Dubai, UAE | Remote",
    points: [
      "Building and reviewing the Owner Dashboard and backend APIs for CostPilot, a decision intelligence platform for construction cost and project management — covering financial KPIs, BOQ tracking, and ESG scoring.",
      "Integrated an AI Decision Engine using Gemini API for automated project risk and cost recommendations with rule-based fallback logic",
      "Coordinated between client requirements and developers, conducted code reviews",
      "Prepared stakeholder-ready product walkthrough decks and implementation updates",
    ],
  },
  {
    company: "Leaked Data Checker",
    role: "Full Stack Developer",
    type: "Freelance",
    period: "Oct 10, 2025 – Mar 18, 2026",
    location: "Indonesia | Remote",
    points: [
      "Built a Leaked Data Checker — users can verify if their email, phone or password has appeared in known data breach dumps.",
      "Designed Django/DRF APIs with hashed lookups so raw user input is never stored",
      "Set up a periodic ingestion pipeline to index new breach datasets into PostgreSQL",
      "Deployed on AWS EC2 with S3 storage, configured HTTPS, reverse proxy and production environment settings",
    ],
  },
  {
    company: "Technorizen Software Solution",
    role: "Full Stack Developer",
    type: "Full-Time",
    period: "June 23, 2025 – Sept 18, 2025",
    location: "Indore, M.P. | Onsite",
    points: [
      "Built backend APIs for an AI Travel Planner and a separate AI English Learning App, focusing on modern web technologies and AI-powered solutions.",
      "Built AI Travel Planner using Django/DRF and OpenAI — personalised itineraries with maps, hotel and weather data",
      "Developed AI English Learning App using FastAPI — grammar correction, vocabulary exercises and conversational practice via LLM APIs",
      "Implemented session-based progress tracking for learning applications",
    ],
  },
  {
    company: "ClumpCoder",
    role: "Full Stack Developer",
    type: "Full-Time",
    period: "Aug 18, 2022 – June 20, 2025",
    location: "Indore, M.P. | Onsite",
    points: [
      "Developed and deployed multiple full-stack applications including manufacturing ERP systems and live streaming platforms. Collaborated with cross-functional teams to deliver high-quality solutions.",
      "Built manufacturing ERP modules for production planning, inventory, purchase orders and employee tracking in Django/PostgreSQL",
      "Built backend for a live streaming & social entertainment app — real-time WebSocket chat, virtual gifting and coin system",
      "Used MongoDB for chat logs and event data, PostgreSQL for transactional records; deployed on AWS with stable production uptime",
    ],
  },
  {
    company: "CodeBetter Technology",
    role: "Python Developer Intern",
    type: "Internship",
    period: "Jan 02, 2022 – June 25, 2022",
    location: "Indore, M.P.",
    points: [
      "Assisted in building and maintaining web applications using Python and Django under senior developer guidance.",
      "Wrote unit and integration tests for web applications",
      "Participated in code reviews and contributed to internal tooling",
      "Improved dev workflow through internal tooling contributions",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Experience"
          title="A timeline of shipped work."
          description="Freelance, contract and full-time roles building production systems across AI, SaaS and consumer products."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent md:left-1/2"
          />

          <div className="space-y-8 sm:space-y-10">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <motion.article
                  key={e.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative grid grid-cols-[24px_1fr] gap-3 sm:gap-5 md:grid-cols-2 md:gap-12 ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Node */}
                  <div className="relative md:hidden">
                    <span className="absolute left-[9px] top-1.5 h-3 w-3 rounded-full border border-white/30 bg-background ring-4 ring-primary/20" />
                  </div>
                  <div
                    className={`hidden md:block ${left ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-flex flex-col gap-1.5 ${left ? "items-end" : "items-start"}`}
                    >
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <Briefcase size={12} />
                        {e.period}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {e.location}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Center dot (desktop) */}
                    <span
                      className={`absolute top-7 hidden h-3 w-3 rounded-full border border-white/30 bg-background ring-4 ring-primary/15 md:block ${
                        left
                          ? "-left-[calc(24px+50%)] -translate-x-1/2"
                          : "-right-[calc(24px+50%)] translate-x-1/2"
                      }`}
                    />
                    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:p-6 hover-glow">
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-medium text-foreground sm:text-lg">
                          {e.company}
                        </h3>
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                          {e.type}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {e.role}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:hidden">
                        <span>{e.period}</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} />
                          {e.location}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:mt-4">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/70" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
