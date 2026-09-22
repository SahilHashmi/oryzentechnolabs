import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

import dennysImg from "@/assets/projects/dennys.png";
import wowWashImg from "@/assets/projects/wow_wash.png";
import suncoastImg from "@/assets/projects/suncoast.png";
import iplanWebImg from "@/assets/projects/iplan_web.png";
import iplanIosImg from "@/assets/projects/iplan_ios.png";
import iplanAndroidImg from "@/assets/projects/iplan_android.png";
import mufoImg from "@/assets/projects/mufo.png";
import leakedImg from "@/assets/projects/leaked.jpg";
import plumberImg from "@/assets/projects/plumber.png";

import cp1 from "@/assets/projects/1.png";
import cp2 from "@/assets/projects/2.png";
import cp3 from "@/assets/projects/3.png";
import cp4 from "@/assets/projects/4.png";
import cp5 from "@/assets/projects/5.png";
import cp6 from "@/assets/projects/6.png";
import cp7 from "@/assets/projects/7.png";
import cp8 from "@/assets/projects/8.png";
import omniVid from "@/assets/projects/omni_vid.mp4";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Category = "Web Applications" | "Websites" | "Mobile Applications";

type Project = {
  name: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  accent: string;
  cover: string;
  liveUrl: string;
  gallery?: string[];
  video?: string;
  status?: string;
};

const projects: Project[] = [
  // Web Applications
  {
    name: "Leaked Data Checker",
    tagline: "Data breach search & notification service",
    description: "A comprehensive security tool that lets individuals and organizations instantly check if their data has been exposed in public breaches, featuring continuous monitoring and a robust developer API.",
    category: "Web Applications",
    tags: ["Python", "Django", "DRF", "Stripe", "PayPal", "BitPay", "Next.js", "MongoDB", "PostgreSQL"],
    accent: "from-rose-500/30 to-orange-500/10",
    cover: leakedImg,
    liveUrl: "https://leakeddatachecker.com",
    status: "In Development",
  },
  {
    name: "CostPilot",
    tagline: "Construction cost intelligence & procurement SaaS",
    description: "A centralized platform for the UAE/GCC market connecting project stakeholders. It offers real-time cost tracking, AI-generated reports, ESG scoring, and financial risk analysis.",
    category: "Web Applications",
    tags: ["Next.js", "Node.js", "Gemini", "Stripe", "Supabase", "AWS", "EC2", "S3"],
    accent: "from-blue-500/30 to-indigo-500/10",
    cover: cp1,
    liveUrl: "https://costpilot.ai",
    gallery: [cp1, cp2, cp3, cp4, cp5],
  },
  {
    name: "iPlane AI (Web)",
    tagline: "Aviation & travel navigation platform",
    description: "A specialized web application for travelers and aviation enthusiasts. Features a real-time AI assistant, live flight tracking, gate assignments, and comprehensive aircraft details.",
    category: "Web Applications",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    accent: "from-blue-500/30 to-indigo-500/10",
    cover: iplanWebImg,
    liveUrl: "https://iplan.ai/",
  },
  {
    name: "Omni AI Workforce",
    tagline: "Secure AI agents for industrial enterprises",
    description: "Advanced agentic AI solutions tailored for manufacturing, logistics, and supply chain. Automates and optimizes enterprise workflows with industry-grade security and data privacy.",
    category: "Web Applications",
    tags: ["Next.js", "Python", "FastAPI", "Supabase", "OpenAI", "Anthropic", "Gemini", "Stripe", "AWS", "EC2", "S3"],
    accent: "from-violet-500/30 to-fuchsia-500/10",
    cover: cp6,
    liveUrl: "https://omniai.app",
    video: omniVid,
    gallery: [cp6, cp7, cp8],
  },
  {
    name: "AI Voice Agent for Plumber",
    tagline: "Intelligent voice-driven plumbing assistant",
    description: "An AI-powered voice agent designed specifically for plumbing businesses, streamlining customer inquiries, appointment scheduling, and service dispatch through natural voice interactions.",
    category: "Web Applications",
    tags: ["React", "Next.js", "OpenAI", "Whisper API", "Text-to-Speech", "FastAPI", "WebRTC", "Twilio"],
    accent: "from-cyan-500/30 to-blue-500/10",
    cover: plumberImg,
    liveUrl: "#",
    status: "In Development",
  },
  // Websites
  {
    name: "Denny's",
    tagline: "Restaurant locator and corporate site",
    description: "Modern, responsive website for Denny's restaurant locations, featuring a robust store locator and menu presentation.",
    category: "Websites",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    accent: "from-orange-500/30 to-red-500/10",
    cover: dennysImg,
    liveUrl: "https://locations.dennys.com",
  },
  {
    name: "Wow Wash",
    tagline: "Premium car wash booking platform",
    description: "A sleek, dark-themed website for a premium car wash service, complete with online booking and service showcases.",
    category: "Websites",
    tags: ["WordPress"],
    accent: "from-sky-500/30 to-blue-500/10",
    cover: wowWashImg,
    liveUrl: "https://wowwash.com",
  },
  {
    name: "Suncoast Hotel & Casino",
    tagline: "Luxury resort & casino website",
    description: "An elegant, highly accessible website for Suncoast Hotel & Casino, offering room reservations and entertainment schedules.",
    category: "Websites",
    tags: ["WordPress"],
    accent: "from-amber-500/30 to-yellow-500/10",
    cover: suncoastImg,
    liveUrl: "https://suncoast.boydgaming.com",
  },
  // Mobile Applications
  {
    name: "iPlane AI (iOS)",
    tagline: "Live flight tracking & airport navigation",
    description: "The native iOS app for the iPlane series, delivering minute-by-minute flight boards, an AI chat assistant, and interactive terminal maps for seamless airport transit.",
    category: "Mobile Applications",
    tags: ["React Native", "Stripe Payment Gateway", "Generative AI", "OpenAI", "Python", "FastAPI", "Supabase"],
    accent: "from-purple-500/30 to-pink-500/10",
    cover: iplanIosImg,
    liveUrl: "https://apps.apple.com/us/app/iplan-ai-ai-travel-planner/id1611716564",
  },
  {
    name: "iPlane AI (Android)",
    tagline: "Aviation assistant & travel companion",
    description: "The Android counterpart of the iPlane ecosystem, helping travelers and drivers with real-time flight statuses, turnaround tracking, and critical aviation data on the go.",
    category: "Mobile Applications",
    tags: ["React Native", "Stripe Payment Gateway", "Generative AI", "OpenAI", "Python", "FastAPI", "Supabase"],
    accent: "from-emerald-500/30 to-teal-500/10",
    cover: iplanAndroidImg,
    liveUrl: "https://play.google.com/store/apps/details?id=ai.iplan.app",
  },
  {
    name: "Mufo",
    tagline: "Social chat & gaming platform",
    description: "An innovative Android app designed to keep friends and family connected. Users can create customized private rooms to chat, play interactive games together, and socialize effortlessly.",
    category: "Mobile Applications",
    tags: ["React Native", "FastAPI", "Socket.io", "WebRTC", "MongoDB", "Redis", "Twilio", "Razorpay", "PostgreSQL"],
    accent: "from-emerald-500/30 to-teal-500/10",
    cover: mufoImg,
    liveUrl: "https://play.google.com/store/apps/details?id=com.mufo__&pcampaignid=web_share",
  },
];

const categories: Category[] = ["Websites", "Web Applications", "Mobile Applications"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("Websites");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Products that earned their pixels."
          description="A curated showcase of recent projects across web applications, websites, and mobile apps — designed and developed end-to-end."
        />

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:mb-12 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-sm ${
                activeCategory === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-white/20 bg-white/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.a
                href={p.gallery ? "#" : p.liveUrl}
                target={p.gallery ? undefined : "_blank"}
                rel={p.gallery ? undefined : "noopener noreferrer"}
                onClick={(e) => {
                  if (p.gallery) {
                    e.preventDefault();
                    setActiveProject(p);
                  }
                }}
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_80px_-30px_rgba(91,140,255,0.35)] sm:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
              >
                {/* Gradient backdrop */}
                <div
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${p.accent} opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
                />

                {/* Preview image */}
                <div className={`relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-background/40 sm:mb-5 ${
                  p.category === "Mobile Applications"
                    ? "aspect-[9/16] max-h-[340px]"
                    : "aspect-[16/10]"
                }`}>
                  <img
                    src={p.cover}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-35 blur-xl transition-transform duration-[1200ms] ease-out group-hover:scale-[1.18]"
                  />
                  <img
                    src={p.cover}
                    alt={`${p.name} preview`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="relative z-[1] h-full w-full p-2 object-contain object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:p-3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-80" />

                  {/* View Project Button */}
                  <div className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-background/80 px-4 py-2 text-xs font-medium text-foreground shadow-xl sm:text-sm">
                      {p.gallery ? "View Gallery" : "View Project"} <ExternalLink size={14} />
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-foreground/80 backdrop-blur sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-[10px]">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {p.category}
                  </div>
                  <div className="absolute right-2 top-2 grid h-8 w-8 translate-y-1 place-items-center rounded-full border border-white/15 bg-background/70 text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-9 sm:w-9">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-medium text-foreground transition-colors group-hover:text-primary sm:text-xl">
                      {p.name}
                    </h3>
                    {p.status && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-400 sm:px-2.5 sm:text-[10px]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                        </span>
                        {p.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{p.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1 sm:mt-5 sm:gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-foreground/80 sm:px-2.5 sm:py-1 sm:text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Gallery Modal */}
      <Dialog open={!!activeProject} onOpenChange={(open) => !open && setActiveProject(null)}>
        <DialogContent className="max-w-[95vw] border-white/10 bg-background/95 p-4 backdrop-blur-xl [&>button]:hidden sm:max-w-3xl sm:p-6 md:max-w-4xl md:p-8 lg:max-w-5xl lg:p-10">
          <VisuallyHidden>
            <DialogTitle>{activeProject?.name}</DialogTitle>
            <DialogDescription>{activeProject?.tagline}</DialogDescription>
          </VisuallyHidden>

          <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6 sm:gap-4">
            <div>
              <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl md:text-3xl">
                {activeProject?.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{activeProject?.tagline}</p>
            </div>
            <button
              aria-label="Close"
              onClick={() => setActiveProject(null)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/70 transition hover:bg-white/10 hover:text-foreground sm:h-10 sm:w-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <X size={16} className="sm:h-[18px] sm:w-[18px]" />
            </button>
          </div>

          {(activeProject?.gallery || activeProject?.video) && (
            <Carousel className="w-full">
              <CarouselContent>
                {/* Video slide — plays first if present */}
                {activeProject.video && (
                  <CarouselItem key="video">
                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-background/40 sm:rounded-xl">
                      <video
                        src={activeProject.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="max-h-full w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                )}
                {activeProject.gallery?.map((imgSrc, index) => (
                  <CarouselItem key={index}>
                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-background/40 sm:rounded-xl">
                      <img
                        src={imgSrc}
                        alt={`${activeProject.name} screen ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 bg-background/80 backdrop-blur sm:left-2 md:-left-4 lg:-left-12" />
              <CarouselNext className="right-1 bg-background/80 backdrop-blur sm:right-2 md:-right-4 lg:-right-12" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}