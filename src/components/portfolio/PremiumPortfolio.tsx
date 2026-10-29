import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRevealOnce } from "./useRevealOnce";
import { HeroShowcase } from "./HeroShowcase";
import {
  ArrowUpRight,
  Bug,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  CloudUpload,
  Code2,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  PenTool,
  Search,
  Send,
  Sparkles,
  Star,
  TerminalSquare,
  type LucideIcon,
  X,
  Zap,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import oryzenLogo from "@/assets/projects/oryzen_logo.png?logo";
import figma1 from "@/assets/projects/figma1.png?card";
import figma2 from "@/assets/projects/figma2.png?card";
import figma3 from "@/assets/projects/figma3.png?card";
import leakedDataChecker from "@/assets/projects/Leaked-Data-Checker.png?card";
import costPilot1 from "@/assets/projects/1.png?card";
import costPilot2 from "@/assets/projects/2.png?card";
import costPilot3 from "@/assets/projects/3.png?card";
import costPilot4 from "@/assets/projects/4.png?card";
import costPilot5 from "@/assets/projects/5.png?card";
import omniAi1 from "@/assets/projects/img1.png?card";
import omniAi2 from "@/assets/projects/img2.png?card";
import omniAi3 from "@/assets/projects/img3.png?card";
import omniAi4 from "@/assets/projects/img4.png?card";
import omniAi5 from "@/assets/projects/img5.png?card";
import omniAi6 from "@/assets/projects/img6.png?card";
import plumberApp from "@/assets/projects/plumber.png?card";
import iplanIos from "@/assets/projects/iplan_ios.png?card";
import indilingoApp from "@/assets/projects/eng_app.png?card";
import mufoApp from "@/assets/projects/mufo.png?card";
import nirahaStore from "@/assets/projects/niraha-trending-products.png?card";
import ekswaadStore from "@/assets/projects/ekswaad-forest-honey-banner.png?card";
import orasureStore from "@/assets/projects/orasure-organics-hero.png?card";
import magnoliaBakery from "@/assets/projects/magnolia-bakery-hero.png?card";
import polloTropical from "@/assets/projects/pollo-tropical-hero.png?card";
import getSkin from "@/assets/projects/getskin-hero.png?card";

const cardSizes = "(min-width: 1200px) 450px, (min-width: 768px) 30vw, 95vw";
const gallerySizes = "(min-width: 1100px) 984px, 95vw";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const contactEmail = "oryzentechnolabs@gmail.com";
const calendlyBaseUrl =
  import.meta.env.VITE_CALENDLY_URL ??
  "https://calendly.com/oryzentechnolabs/15-minute-mvp-discovery-call";
const freeMvpCallLink = `${calendlyBaseUrl}${
  calendlyBaseUrl.includes("?") ? "&" : "?"
}hide_gdpr_banner=1`;
const instagramProfileUrl = "https://www.instagram.com/oryzentechnolabs/";

const heroStats = [
  { value: "40+", label: "Projects delivered" },
  { value: "4+", label: "Years building" },
  { value: "12+", label: "Stacks shipped" },
];

const techGroups = [
  {
    title: "Programming Languages",
    items: [
      ["HTML5", "html5"],
      [
        "CSS3",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/css.svg",
      ],
      ["JavaScript", "javascript"],
      ["TypeScript", "typescript"],
      ["Python", "python"],
      ["PHP", "php"],
    ],
  },
  {
    title: "Frontend",
    items: [
      ["React", "react"],
      ["Next.js", "nextdotjs"],
      ["Vue.js", "vuedotjs"],
      ["Angular", "angular"],
      ["Tailwind CSS", "tailwindcss"],
      ["Bootstrap", "bootstrap"],
      ["Material UI", "mui"],
      ["Sass", "sass"],
    ],
  },
  {
    title: "Backend",
    items: [
      ["Django", "django"],
      ["FastAPI", "fastapi"],
      ["Node.js", "nodedotjs"],
      ["Express.js", "express"],
      ["Laravel", "laravel"],
    ],
  },
  {
    title: "Mobile",
    items: [
      ["Flutter", "flutter"],
      ["React Native", "react"],
    ],
  },
  {
    title: "CMS & Website Builders",
    items: [
      ["WordPress", "wordpress"],
      ["WooCommerce", "woocommerce"],
      ["Elementor", "elementor"],
      ["Divi", "https://cdn.worldvectorlogo.com/logos/divi.svg"],
      ["Wix", "wix"],
      ["Webflow", "webflow"],
      ["Shopify", "shopify"],
      ["Squarespace", "squarespace"],
      ["Framer", "framer"],
      ["Bubble", "https://cdn.worldvectorlogo.com/logos/bubble-io.svg"],
      ["Ghost", "ghost"],
    ],
  },
  {
    title: "Databases",
    items: [
      ["PostgreSQL", "postgresql"],
      ["MySQL", "mysql"],
      ["MongoDB", "mongodb"],
      ["Firebase", "firebase"],
      ["Supabase", "supabase"],
      ["SQLite", "sqlite"],
    ],
  },
  {
    title: "Cloud & Deployment",
    items: [
      [
        "AWS",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonwebservices.svg",
      ],
      ["Google Cloud", "googlecloud"],
      [
        "Microsoft Azure",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg",
      ],
      ["Cloudflare", "cloudflare"],
      ["Vercel", "vercel"],
      ["Netlify", "netlify"],
      ["Railway", "railway"],
      ["Render", "render"],
      ["DigitalOcean", "digitalocean"],
    ],
  },
  {
    title: "DevOps",
    items: [
      ["Docker", "docker"],
      ["Git", "git"],
      ["GitLab", "gitlab"],
      ["Bitbucket", "bitbucket"],
    ],
  },
  {
    title: "Design",
    items: [
      ["Figma", "figma"],
      [
        "Adobe XD",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobexd.svg",
      ],
      [
        "Photoshop",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobephotoshop.svg",
      ],
      [
        "Illustrator",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobeillustrator.svg",
      ],
      [
        "Canva",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/canva.svg",
      ],
    ],
  },
  {
    title: "APIs",
    items: [
      ["REST API", "openapiinitiative"],
      ["GraphQL", "graphql"],
      ["Stripe", "stripe"],
      ["PayPal", "paypal"],
      ["Razorpay", "razorpay"],
      [
        "Twilio",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twilio.svg",
      ],
      ["Google Maps API", "googlemaps"],
    ],
  },
  {
    title: "AI Tools",
    items: [
      [
        "OpenAI",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg",
      ],
      ["Claude", "anthropic"],
      ["Gemini", "googlegemini"],
      ["Cursor AI", "cursor"],
    ],
  },
  {
    title: "Productivity",
    items: [
      ["Notion", "notion"],
      ["Jira", "jira"],
      [
        "Slack",
        "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg",
      ],
      ["Trello", "trello"],
      ["Asana", "asana"],
    ],
  },
];

const figmaDesigns = [
  {
    title: "Task Management Dashboard",
    type: "Dashboard UI",
    description:
      "A clean productivity dashboard for tracking tasks, team progress, deadlines, and project workflows.",
    href: "https://www.figma.com/design/d8GSgTfBag120ibA9kn95z/Task-Management-Dashboard?node-id=2-2552&t=AByaWcpkN9KJ9OuI-1",
    image: figma1,
  },
  {
    title: "Mobile Shopping App",
    type: "Mobile App",
    description:
      "A polished mobile commerce flow for product discovery, cart management, checkout, and shopping interactions.",
    href: "https://www.figma.com/design/HA03D6bZlFUDt26QdS5RXK/Mobile-Shopping-App?node-id=3-19&t=zOOO9l4B9hm5D3R6-1",
    image: figma2,
  },
  {
    title: "Online Medical Store Figma",
    type: "Healthcare Store",
    description:
      "A trustworthy pharmacy shopping interface for browsing medicines, managing orders, and quick checkout.",
    href: "https://www.figma.com/design/pg55Tm7Xmi62i2T4KojHTw/Online-Medical-Store-Figma?m=auto&t=OtYnzLdCstuvxLj8-6",
    image: figma3,
  },
];

const onlineStores = [
  {
    title: "Niraha — House of Fragrance",
    description:
      "An elegant online fragrance store with a rich product catalogue, trending collections, and a smooth, conversion-focused shopping flow.",
    href: "https://niraha.co",
    image: nirahaStore,
    stack: ["E-commerce", "Product Catalogue", "Storefront"],
  },
  {
    title: "Ek Swaad — Natural Foods",
    description:
      "A farm-to-home natural foods store showcasing pure honey and artisanal products with trust-driven storytelling and online ordering.",
    href: "https://ekswaad.in",
    image: ekswaadStore,
    stack: ["E-commerce", "D2C Brand", "Online Ordering"],
  },
  {
    title: "Orasure Organics",
    description:
      "An organic wellness store with a clean product discovery experience, brand storytelling, and a frictionless checkout journey.",
    href: "https://orasureorganics.com",
    image: orasureStore,
    stack: ["E-commerce", "Organic Products", "Storefront"],
  },
];

const websiteProjects = [
  {
    title: "Magnolia Bakery",
    description:
      "The official website of the legendary New York bakery, blending beloved brand storytelling with polished product presentation and online ordering.",
    href: "https://www.magnoliabakery.com",
    image: magnoliaBakery,
    stack: ["Brand Website", "Bakery", "Online Ordering"],
  },
  {
    title: "Pollo Tropical",
    description:
      "A vibrant Caribbean-inspired restaurant website with bold visual identity, menu discovery, and location-based ordering flows.",
    href: "https://www.pollotropical.com",
    image: polloTropical,
    stack: ["Restaurant Website", "Brand Identity", "Menu UX"],
  },
  {
    title: "GetSkin Medical Spa",
    description:
      "A refined medical spa and wellness website with an elegant treatment catalogue, booking prompts, and a calming premium aesthetic.",
    href: "https://getskin.us",
    image: getSkin,
    stack: ["Medical Spa", "Wellness", "Appointment UX"],
  },
];

const webApps = [
  {
    title: "Omni AI Workforce",
    description:
      "A production AI agent platform for building, deploying, and managing autonomous workers that use tools, APIs, and data integrations to automate real business workflows across web, mobile, and SDK channels.",
    image: omniAi1,
    stack: ["AI Agents", "Automation", "Orchestration"],
    gallery: [omniAi1, omniAi2, omniAi3, omniAi4, omniAi5, omniAi6],
  },
  {
    title: "Leaked Data Checker",
    description:
      "A comprehensive security tool that lets individuals and organizations instantly check if their data has been exposed in public breaches, featuring continuous monitoring and a robust developer API.",
    href: "https://www.leakdatachecker.com/",
    image: leakedDataChecker,
    stack: ["Security", "Monitoring", "Developer API"],
  },
  {
    title: "CostPilot",
    description:
      "A centralized platform for the UAE/GCC market connecting project stakeholders. It offers real-time cost tracking, AI-generated reports, ESG scoring, and financial risk analysis.",
    image: costPilot1,
    stack: ["SaaS", "AI Reports", "ESG Scoring"],
    gallery: [costPilot1, costPilot2, costPilot3, costPilot4, costPilot5],
  },
  {
    title: "AI Voice Agent for Plumber",
    description:
      "A voice-first assistant currently in active development for plumbing teams. It is being crafted to handle incoming calls, capture job details, and schedule visits with a natural, brand-safe conversation flow.",
    image: plumberApp,
    stack: ["Voice AI", "Call Routing", "Scheduling", "CRM Intake"],
    status: "In active development",
  },
];

const mobileApps = [
  {
    title: "AI iPlan App",
    description:
      "The native iOS app for the iPlane series, delivering minute-by-minute flight boards, an AI chat assistant, and interactive terminal maps for seamless airport transit.",
    href: "https://apps.apple.com/us/app/iplan-ai-ai-travel-planner/id1611716564",
    image: iplanIos,
    stack: ["iOS", "AI Assistant", "Flight Tracking"],
  },
  {
    title: "Indilingo App",
    description:
      "Master Indian languages with AI-powered learning across 15 official Indian languages, built to help learners study in their mother tongue.",
    href: "https://play.google.com/store/apps/details?id=com.indilingo",
    image: indilingoApp,
    stack: ["Android", "AI Learning", "Indian Languages"],
  },
  {
    title: "Mufo",
    description:
      "Mufo is a free app that allows users to chat in voice rooms and play games with friends in shared social spaces.",
    href: "https://play.google.com/store/apps/details?id=com.mufo__&pcampaignid=web_share",
    image: mufoApp,
    stack: ["Android", "Voice Rooms", "Social Gaming"],
  },
];

const services = [
  "UI/UX Design",
  "Figma to HTML",
  "Website Development",
  "Web Application Development",
  "Mobile App Development",
  "Backend Development",
  "API Development",
  "CMS Development",
  "WordPress Development",
  "Shopify Development",
  "Wix Development",
  "Webflow Development",
  "Website Maintenance",
  "Performance Optimization",
  "SEO Optimization",
  "Bug Fixes",
  "Landing Pages",
  "E-commerce Development",
  "Custom Dashboard Development",
];

const pricingPlans = [
  {
    name: "Website Starter",
    price: "$499",
    description: "For clients who need a professional website only",
    timeline: "3-7 days",
    features: [
      "Single-page or basic multi-page website",
      "Mobile-responsive layout",
      "Contact form and essential sections",
      "Basic on-page SEO setup",
      "Deployment on your hosting/domain",
      "14 days post-launch support",
      "Unlimited revisions within scope",
    ],
  },
  {
    name: "MVP Launch",
    price: "$1,499",
    description: "Perfect for founders who want to validate fast",
    timeline: "3 weeks",
    features: [
      "Mobile app or Web app",
      "Core features only",
      "App Store submission or Website deployment",
      "30 days post launch support",
      "Complete source code ownership",
      "Unlimited revisions within scope",
      "Weekly progress updates",
    ],
  },
  {
    name: "Full Product",
    price: "$2,999",
    description: "For founders ready to launch and scale",
    timeline: "5 weeks",
    popular: true,
    features: [
      "Mobile app + Web app",
      "Full feature set",
      "Custom UI/UX design",
      "App Store submission + Website deployment",
      "60 days post launch support",
      "Complete source code ownership",
      "Unlimited revisions within scope",
      "Weekly progress updates",
    ],
  },
  {
    name: "Scale Ready",
    price: "$4,999",
    description: "For startups building serious products",
    timeline: "8+ weeks",
    features: [
      "Everything in Full Product",
      "AI integration",
      "SaaS platform",
      "Admin dashboard",
      "Payment integration",
      "Dedicated project manager",
      "90 days post launch support",
      "Complete source code ownership",
      "Unlimited revisions within scope",
      "Weekly progress updates",
    ],
  },
];

const trustPoints = [
  "Clean Code",
  "Fast Delivery",
  "Responsive Design",
  "SEO Friendly",
  "Scalable Architecture",
  "Modern Technologies",
  "Long-Term Support",
  "Professional Communication",
];

const processStages: Array<{
  title: string;
  detail: string;
  signal: string;
  icon: LucideIcon;
}> = [
  {
    title: "Discovery",
    detail:
      "Goals, users, constraints, and success metrics become clear before a line is built.",
    signal: "Brief locked",
    icon: Search,
  },
  {
    title: "Planning",
    detail:
      "Scope, architecture, milestones, and priorities are sequenced into a calm delivery map.",
    signal: "Roadmap ready",
    icon: ClipboardList,
  },
  {
    title: "UI/UX Design",
    detail:
      "Flows, wireframes, and polished screens shape the product before engineering starts.",
    signal: "Prototype approved",
    icon: PenTool,
  },
  {
    title: "Development",
    detail:
      "Frontend, backend, APIs, CMS, and integrations move from plan into working software.",
    signal: "Build in motion",
    icon: TerminalSquare,
  },
  {
    title: "Testing",
    detail:
      "Responsive behavior, performance, edge cases, and launch blockers are checked carefully.",
    signal: "QA passed",
    icon: Bug,
  },
  {
    title: "Deployment",
    detail:
      "The product ships with hosting, analytics, SEO basics, and production configuration in place.",
    signal: "Live release",
    icon: CloudUpload,
  },
  {
    title: "Support",
    detail:
      "Post-launch improvements, fixes, handoff notes, and growth iterations keep momentum steady.",
    signal: "Care cycle",
    icon: Headphones,
  },
];

const testimonials = [
  {
    name: "Ayesha R.",
    role: "Founder, SaaS Studio",
    quote:
      "The Oryzen team turned a rough product idea into a clean, investor-ready experience with impressive speed and taste.",
  },
  {
    name: "Michael T.",
    role: "Agency Partner",
    quote:
      "The work felt senior from the first call: precise communication, sharp frontend quality, and reliable delivery.",
  },
  {
    name: "Nora K.",
    role: "E-commerce Lead",
    quote:
      "Our site became faster, clearer, and easier to sell from. The mobile polish made a visible difference.",
  },
];

const testimonialMarquee = [...testimonials, ...testimonials];

function simpleIconUrl(slug: string) {
  if (slug.startsWith("http")) return slug;
  return `https://cdn.simpleicons.org/${slug}`;
}

function AnimatedWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [ref, revealed] = useRevealOnce<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`inline-block ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            aria-hidden="true"
            style={{ "--reveal-index": index } as CSSProperties}
            className="reveal-word mr-[0.24em] inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

function AnimatedEyebrow({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [ref, revealed] = useRevealOnce<HTMLSpanElement>();
  let characterCount = 0;

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`inline-block ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="mr-[0.5em] inline-block whitespace-nowrap"
        >
          {Array.from(word).map((character, characterIndex) => (
            <span
              key={`${character}-${characterIndex}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <span
                aria-hidden="true"
                style={{ "--reveal-index": characterCount++ } as CSSProperties}
                className="reveal-character inline-block"
              >
                {character}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function AnimatedLine({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, revealed] = useRevealOnce<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
      className={`reveal-line inline-block ${revealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-primary">
        <AnimatedEyebrow text={eyebrow} />
      </p>
      <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
        <AnimatedWords text={title} />
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
        <AnimatedLine delay={0.15}>{copy}</AnimatedLine>
      </p>
    </motion.div>
  );
}

function TechLogo({ name, slug }: { name: string; slug: string }) {
  return (
    <motion.li
      variants={reveal}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 p-3 shadow-[0_22px_55px_-46px_rgba(17,17,17,0.45)] transition-colors hover:border-black/25 hover:bg-white"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1f0eb] ring-1 ring-black/10 transition group-hover:ring-black/25">
        <img
          src={simpleIconUrl(slug)}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          className="h-6 w-6 object-contain grayscale transition group-hover:grayscale-0"
        />
      </span>
      <span className="text-sm font-medium text-foreground/90">{name}</span>
      <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-foreground opacity-0 shadow-2xl transition group-hover:opacity-100">
        {name}
      </span>
    </motion.li>
  );
}

export function PremiumPortfolio() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroScrollProgress = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  }).scrollYProgress;
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    gallery: ResponsiveImage[];
  } | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryWheelGestureActive = useRef(false);
  const galleryWheelResetTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const galleryPointerStart = useRef<{ x: number; y: number } | null>(null);

  const openGallery = (title: string, gallery: ResponsiveImage[]) => {
    galleryWheelGestureActive.current = false;
    setActiveGallery({ title, gallery });
    setGalleryIndex(0);
  };

  const showPreviousGalleryImage = () => {
    if (!activeGallery) return;
    setGalleryIndex(
      (index) =>
        (index - 1 + activeGallery.gallery.length) %
        activeGallery.gallery.length,
    );
  };

  const showNextGalleryImage = () => {
    if (!activeGallery) return;
    setGalleryIndex((index) => (index + 1) % activeGallery.gallery.length);
  };

  const handleGalleryWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

    if (galleryWheelResetTimer.current) {
      clearTimeout(galleryWheelResetTimer.current);
    }
    galleryWheelResetTimer.current = setTimeout(() => {
      galleryWheelGestureActive.current = false;
      galleryWheelResetTimer.current = null;
    }, 250);

    if (Math.abs(delta) < 20 || galleryWheelGestureActive.current) return;

    galleryWheelGestureActive.current = true;
    if (delta > 0) showNextGalleryImage();
    else showPreviousGalleryImage();
  };

  const handleGalleryPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    galleryPointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleGalleryPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = galleryPointerStart.current;
    galleryPointerStart.current = null;
    if (!start || !event.isPrimary) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const dominantDelta =
      Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;

    if (Math.abs(dominantDelta) < 45) return;
    if (dominantDelta < 0) showNextGalleryImage();
    else showPreviousGalleryImage();
  };

  useEffect(() => {
    if (!activeGallery) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveGallery(null);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setGalleryIndex((index) => (index + 1) % activeGallery.gallery.length);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setGalleryIndex(
          (index) =>
            (index - 1 + activeGallery.gallery.length) %
            activeGallery.gallery.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (galleryWheelResetTimer.current) {
        clearTimeout(galleryWheelResetTimer.current);
        galleryWheelResetTimer.current = null;
      }
      galleryWheelGestureActive.current = false;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGallery]);

  useEffect(() => {
    if (!activeGallery) return;
    const { gallery } = activeGallery;
    [galleryIndex + 1, galleryIndex - 1].forEach((offset) => {
      const image = gallery[(offset + gallery.length) % gallery.length];
      const preload = new Image();
      preload.sizes = gallerySizes;
      preload.srcset = image.sources.webp;
      preload.src = image.img.src;
    });
  }, [activeGallery, galleryIndex]);

  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-35" />
        <div className="noise" />
        <div className="absolute left-[-12%] top-[-10%] h-[540px] w-[540px] rounded-full bg-white/90 blur-[120px]" />
        <div className="absolute right-[-15%] top-[18%] h-[620px] w-[620px] rounded-full bg-[#d8d5cb]/60 blur-[150px]" />
      </div>

      <section
        id="top"
        ref={heroRef}
        className="relative isolate flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-24 [@supports(min-height:100svh)]:min-h-[100svh]"
      >
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-[minmax(0,620px)_minmax(440px,1fr)] lg:gap-12 xl:gap-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[640px]"
          >
            <motion.h1
              variants={reveal}
              className="mt-8 max-w-[640px] font-display text-[clamp(2.85rem,12vw,4rem)] font-semibold leading-[0.95] text-foreground sm:mt-9 sm:text-[clamp(4rem,7.5vw,5rem)] lg:text-[clamp(4.2rem,4.7vw,5.2rem)]"
            >
              <span className="block">Agency-grade</span>
              <span className="block">websites</span>
              <span className="block">and apps for</span>
              <span className="block">ambitious</span>
              <span className="block">clients.</span>
            </motion.h1>
            <motion.p
              variants={reveal}
              className="mt-6 max-w-[640px] text-pretty text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8"
            >
              <AnimatedLine delay={0.25}>
                We design and develop premium web experiences, scalable
                dashboards, mobile apps, CMS builds, and APIs with the polish
                of a studio and the speed of a dedicated team.
              </AnimatedLine>
            </motion.p>
            <motion.div
              variants={reveal}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                asLink="#portfolio"
                className="h-14 whitespace-nowrap px-7 text-base sm:px-8"
              >
                View portfolio <ArrowUpRight size={18} />
              </MagneticButton>
              <MagneticButton
                asLink="#contact"
                variant="ghost"
                className="h-14 whitespace-nowrap px-7 text-base sm:px-8"
              >
                Start a project <Send size={17} />
              </MagneticButton>
              <a
                href={freeMvpCallLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a 15-minute MVP discovery call on Calendly"
                className="inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-white/50 px-7 text-base font-medium text-foreground/80 transition hover:border-black/25 hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:px-8"
              >
                <CalendarPlus size={17} /> Book a Call
              </a>
            </motion.div>
            <motion.div
              variants={reveal}
              className="mt-10 grid max-w-[560px] grid-cols-3 gap-4 border-t border-black/10 pt-6"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative h-[340px] w-full pb-8 sm:h-[440px] lg:h-[560px] xl:h-[620px]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),transparent_58%)]"
            />
            <HeroShowcase
              scrollProgress={heroScrollProgress}
              reduced={!!prefersReducedMotion}
            />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40 sm:flex [@media(max-height:900px)]:hidden">
          Scroll
          <span className="h-12 w-px overflow-hidden bg-black/10">
            <span className="scroll-cue block h-full w-full bg-primary" />
          </span>
        </div>
      </section>

      <section id="about" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-[2rem] border border-black/10 bg-white/70 p-7 shadow-[0_24px_70px_-55px_rgba(17,17,17,.45)] sm:p-9"
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
              Positioning
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight">
              <AnimatedWords text="Agency-grade execution. Founder-friendly speed." />
            </h2>
          </motion.div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-[2rem] border border-black/10 bg-white/70 p-7 text-base leading-8 text-muted-foreground shadow-[0_24px_70px_-55px_rgba(17,17,17,.45)] sm:p-9"
          >
            <p>
              <AnimatedLine>
                We help founders, agencies, and businesses move from idea to
                launched product with thoughtful design, reliable engineering,
                and calm communication. Every build is shaped around user trust,
                conversion, performance, and maintainable code.
              </AnimatedLine>
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["UI systems", "Full stack", "Launch care"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-background/50 p-4 text-sm font-medium text-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Selected Work"
            title="Online stores, websites, and shipped digital products."
            copy="A focused collection of e-commerce storefronts, brand websites, web applications, mobile apps, and product design work with direct links to the live products."
          />

          <div className="mb-16">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  <AnimatedWords text="Online Stores" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  E-commerce storefronts built to convert visitors into
                  customers.
                </p>
              </div>
              <span className="w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                E-commerce projects
              </span>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {onlineStores.map((project, index) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/75 p-4 shadow-[0_26px_80px_-58px_rgba(17,17,17,.5)] transition hover:border-black/20 hover:bg-white/95"
                >
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-black/10 bg-[#f4f1e8]">
                    <img
                      src={project.image.img.src}
                      srcSet={project.image.sources.webp}
                      sizes={cardSizes}
                      alt={`${project.title} online store screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 font-mono text-xs text-primary shadow-sm backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h4 className="font-display text-xl font-semibold">
                    {project.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#efeee8] px-3 py-1 text-xs text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Visit Store <ArrowUpRight size={15} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="mb-5 font-display text-2xl font-semibold">
              Website Projects
            </h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {websiteProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/75 p-4 shadow-[0_26px_80px_-58px_rgba(17,17,17,.5)] transition hover:border-black/20 hover:bg-white/95"
                >
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-black/10 bg-[#f4f1e8]">
                    <img
                      src={project.image.img.src}
                      srcSet={project.image.sources.webp}
                      sizes={cardSizes}
                      alt={`${project.title} website screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 font-mono text-xs text-primary shadow-sm backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <h4 className="font-display text-xl font-semibold">
                    {project.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#efeee8] px-3 py-1 text-xs text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Visit Website <ArrowUpRight size={15} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-2xl font-semibold">
                <AnimatedWords text="Web Applications" />
              </h3>
              <span className="w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                Dashboards, SaaS, and security tools
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {webApps.map((project) => (
                <motion.article
                  key={project.title}
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-[0_26px_90px_-65px_rgba(17,17,17,.5)] transition hover:border-black/20 hover:bg-white/95 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      project.gallery
                        ? openGallery(project.title, project.gallery)
                        : undefined
                    }
                    className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f5f4ef] ${project.gallery ? "cursor-zoom-in" : "cursor-default"}`}
                    aria-label={
                      project.gallery
                        ? `Open ${project.title} gallery`
                        : `${project.title} preview`
                    }
                  >
                    <img
                      src={project.image.img.src}
                      srcSet={project.image.sources.webp}
                      sizes={cardSizes}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                    {project.gallery && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                        Click to view gallery
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-2xl font-semibold leading-tight">
                        {project.title}
                      </h4>
                      {project.status &&
                        (() => {
                          const isActiveDevelopment = project.status
                            .toLowerCase()
                            .includes("active development");

                          return (
                            <span
                              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                                isActiveDevelopment
                                  ? "border-sky-500/35 bg-sky-100 text-sky-800"
                                  : "border-amber-500/30 bg-amber-100 text-amber-800"
                              }`}
                            >
                              {isActiveDevelopment
                                ? "In active development"
                                : "In development"}
                            </span>
                          );
                        })()}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>
                    {project.status &&
                      (() => {
                        const isActiveDevelopment = project.status
                          .toLowerCase()
                          .includes("active development");

                        return (
                          <p
                            className={`mt-3 text-xs leading-5 ${
                              isActiveDevelopment
                                ? "text-sky-800/85"
                                : "text-amber-800/85"
                            }`}
                          >
                            {project.status}
                          </p>
                        );
                      })()}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#efeee8] px-3 py-1 text-xs text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                        >
                          Open Project <ArrowUpRight size={15} />
                        </a>
                      )}
                      {project.gallery && (
                        <button
                          type="button"
                          onClick={() =>
                            openGallery(project.title, project.gallery)
                          }
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                        >
                          View Gallery <ArrowUpRight size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="mb-5 font-display text-2xl font-semibold">
              <AnimatedWords text="Mobile Applications" />
            </h3>
            <div className="grid gap-6 lg:grid-cols-3">
              {mobileApps.map((app) => (
                <motion.a
                  key={app.title}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col rounded-[2rem] border border-black/10 bg-white/75 p-4 shadow-[0_26px_80px_-58px_rgba(17,17,17,.5)] transition hover:border-black/20 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <div className="mx-auto w-full max-w-[176px] rounded-[2.25rem] border border-black/20 bg-[#111111] p-[0.42rem] shadow-[0_34px_80px_-50px_rgba(17,17,17,.9)] sm:max-w-[192px]">
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.85rem] bg-[#0f0f10] ring-1 ring-white/10">
                      <div className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/30" />
                      <div className="absolute inset-[3.2%_3.4%_3.4%] overflow-hidden rounded-[1.5rem] bg-black/95">
                        <img
                          src={app.image.img.src}
                          srcSet={app.image.sources.webp}
                          sizes="192px"
                          alt={`${app.title} app preview`}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full transition duration-700 group-hover:scale-[1.03] ${app.title === "AI iPlan App" ? "object-cover object-center" : "object-contain object-center"}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col pt-5">
                    <h4 className="font-display text-2xl font-semibold">
                      {app.title}
                    </h4>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {app.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {app.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#efeee8] px-3 py-1 text-xs text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open Store <ArrowUpRight size={15} />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  <AnimatedWords text="Figma Designs" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click any preview image to open the Figma file.
                </p>
              </div>
              <span className="w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                3 live design files
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {figmaDesigns.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/80 p-3 shadow-[0_26px_80px_-58px_rgba(17,17,17,.5)] transition hover:border-black/20 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:p-4"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-black/10 bg-[#f4f1e8] p-2 shadow-inner">
                    <img
                      src={item.image.img.src}
                      srcSet={item.image.sources.webp}
                      sizes={cardSizes}
                      alt={`${item.title} Figma design preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-[1rem] object-contain object-center transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute right-3 top-3 grid h-9 w-9 translate-y-1 place-items-center rounded-full border border-white/50 bg-black/45 text-white opacity-0 shadow-lg backdrop-blur transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                    <span className="mb-3 w-fit rounded-full border border-black/10 bg-[#f4f1e8] px-3 py-1 text-xs font-medium text-foreground">
                      {item.type}
                    </span>
                    <h4 className="font-display text-xl font-semibold leading-tight text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      Open in Figma <ArrowUpRight size={15} />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Tech Stack"
            title="Official logos, practical coverage, and room to adapt."
            copy="A practical capability map of the tools, frameworks, and platforms we use to ship reliable products across web, mobile, backend, cloud, and AI workflows."
          />
          <div className="space-y-8">
            {techGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="rounded-[1.75rem] border border-black/10 bg-[#fbfaf6]/75 p-4 shadow-[0_22px_70px_-58px_rgba(17,17,17,.5)] sm:p-6"
              >
                <h3 className="mb-4 font-display text-xl font-semibold">
                  <AnimatedWords text={group.title} />
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {group.items.map(([name, slug]) => (
                    <TechLogo key={name} name={name} slug={slug} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {activeGallery && (
        <div
          data-lenis-prevent
          onWheel={handleGalleryWheel}
          onPointerDown={handleGalleryPointerDown}
          onPointerUp={handleGalleryPointerUp}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.title} gallery`}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#111111] p-4 text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,.8)] sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-semibold sm:text-2xl">
                  {activeGallery.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {galleryIndex + 1} of {activeGallery.gallery.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveGallery(null)}
                aria-label="Close gallery"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <img
                src={activeGallery.gallery[galleryIndex].img.src}
                srcSet={activeGallery.gallery[galleryIndex].sources.webp}
                sizes={gallerySizes}
                width={activeGallery.gallery[galleryIndex].img.w}
                height={activeGallery.gallery[galleryIndex].img.h}
                alt={`${activeGallery.title} screen ${galleryIndex + 1}`}
                decoding="async"
                className="max-h-[72vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={showPreviousGalleryImage}
                aria-label="Previous gallery image"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={showNextGalleryImage}
                aria-label="Next gallery image"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronRight size={22} />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {activeGallery.gallery.map((image, index) => (
                <button
                  key={image.img.src}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Show gallery image ${index + 1}`}
                  className={`h-2.5 rounded-full transition ${galleryIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <section id="services" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Services"
            title="Specialized delivery across design, build, launch, and growth."
            copy="Choose a focused task or a full product build. Each service is structured for clear scope, quality execution, and measurable outcomes."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={service}
                variants={reveal}
                className="group rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_60px_-52px_rgba(17,17,17,.45)] transition hover:border-black/25 hover:bg-white"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Code2 size={18} className="text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {service}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Pricing"
            title="Our Pricing Plans Designed for You"
            copy="Choose the plan that fits your needs and budget."
          />
          <div className="grid gap-6 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <motion.article
                key={plan.name}
                whileHover={{ y: -10 }}
                className={`relative rounded-[2rem] border p-6 ${plan.popular ? "border-black/25 bg-[#111111] text-background shadow-[0_32px_100px_-62px_rgba(17,17,17,.85)]" : "border-black/10 bg-white/70 shadow-[0_24px_80px_-60px_rgba(17,17,17,.45)]"}`}
              >
                {plan.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-background">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">
                  {plan.name}
                </h3>
                <p
                  className={`mt-3 min-h-16 text-sm leading-6 ${plan.popular ? "text-background/65" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
                <div
                  className={`mt-5 text-xs font-semibold uppercase tracking-[0.2em] ${plan.popular ? "text-background/65" : "text-muted-foreground"}`}
                >
                  Starts at
                </div>
                <div className="mt-7 font-display text-4xl font-semibold">
                  {plan.price}
                </div>
                <div
                  className={`mt-2 text-xs ${plan.popular ? "text-background/55" : "text-muted-foreground"}`}
                >
                  Timeline · {plan.timeline}
                </div>
                <div
                  className={`mt-6 inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${plan.popular ? "border-background/25 bg-background/10 text-background" : "border-black/15 bg-[#f1f0eb] text-foreground/80"}`}
                >
                  What's Included
                </div>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex gap-3 text-sm ${plan.popular ? "text-background/85" : "text-foreground/85"}`}
                    >
                      <Check size={17} className="shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={freeMvpCallLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition ${plan.popular ? "bg-background text-foreground hover:bg-background/90" : "bg-foreground text-background hover:bg-foreground/90"}`}
                >
                  Book a Call
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Why & How"
            title="Built for trust from first call to long-term support."
            copy="A premium result comes from controlled decisions, clear sequencing, and honest communication."
          />
          <div className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_60px_-52px_rgba(17,17,17,.45)]"
              >
                <Zap className="mb-4 text-primary" size={18} />
                <h3 className="font-display text-lg font-semibold">{point}</h3>
              </div>
            ))}
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#fbfaf6]/80 p-4 shadow-[0_28px_90px_-62px_rgba(17,17,17,.55)] backdrop-blur sm:p-6 lg:p-8"
          >
            <motion.div
              aria-hidden
              className="absolute inset-x-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-black/15 to-transparent lg:block"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              aria-hidden
              className="absolute left-8 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-black/15 to-transparent lg:hidden"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="grid gap-5 lg:grid-cols-[1.12fr_.88fr] lg:gap-6">
              <div className="relative grid gap-3">
                {processStages.map(
                  ({ title, detail, signal, icon: Icon }, index) => (
                    <motion.article
                      key={title}
                      variants={reveal}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className="group relative overflow-hidden rounded-[1.4rem] border border-black/10 bg-white/75 p-4 shadow-[0_20px_60px_-52px_rgba(17,17,17,.5)] transition hover:border-black/25 hover:bg-white sm:p-5"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-1 bg-foreground"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                      <div className="flex items-start gap-4">
                        <div
                          className="process-ripple relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-foreground text-background"
                          style={{ animationDelay: `${index * 0.25}s` }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                                {String(index + 1).padStart(2, "0")}
                              </p>
                              <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                                {title}
                              </h3>
                            </div>
                            <span className="rounded-full border border-black/10 bg-[#f1f0eb] px-3 py-1 text-[11px] font-medium text-foreground/70">
                              {signal}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            {detail}
                          </p>
                          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/5">
                            <motion.div
                              className="h-full rounded-full bg-foreground"
                              initial={{ width: "0%" }}
                              whileInView={{
                                width: `${((index + 1) / processStages.length) * 100}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.7,
                                delay: 0.18 + index * 0.08,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ),
                )}
              </div>

              <motion.div
                variants={reveal}
                className="relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#f3f2ed] p-4 lg:sticky lg:top-28 lg:self-start sm:p-5"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,.85),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(216,213,203,.7),transparent_34%)]" />
                <div className="relative rounded-[1.35rem] border border-black/10 bg-white/70 p-4 shadow-[0_22px_70px_-55px_rgba(17,17,17,.55)] sm:p-5">
                  <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        Live workflow
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">
                        Project engine
                      </h3>
                    </div>
                    <span className="engine-spin grid h-11 w-11 place-items-center rounded-full bg-foreground text-background">
                      <Sparkles size={18} />
                    </span>
                  </div>

                  <div className="relative min-h-[390px] overflow-hidden rounded-[1.25rem] border border-black/10 bg-[#fbfaf6] p-4 sm:min-h-[430px]">
                    <motion.div
                      aria-hidden
                      className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-black/10"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div
                      aria-hidden
                      className="engine-ball absolute left-1/2 top-8 h-12 w-12 -translate-x-1/2 rounded-full border border-black/10 bg-white shadow-[0_18px_50px_-35px_rgba(17,17,17,.8)]"
                    />
                    <div className="relative grid gap-3">
                      {processStages.map(({ title, icon: Icon }, index) => (
                        <motion.div
                          key={title}
                          className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.55,
                            delay: index * 0.09,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div
                            className={`rounded-2xl border border-black/10 bg-white/70 p-3 text-sm shadow-[0_16px_45px_-38px_rgba(17,17,17,.45)] ${index % 2 === 0 ? "text-right" : "opacity-0"}`}
                          >
                            {index % 2 === 0 && title}
                          </div>
                          <div
                            className="node-pulse relative z-10 grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-foreground text-background"
                            style={{ animationDelay: `${index * 0.32}s` }}
                          >
                            <Icon size={17} />
                          </div>
                          <div
                            className={`rounded-2xl border border-black/10 bg-white/70 p-3 text-sm shadow-[0_16px_45px_-38px_rgba(17,17,17,.45)] ${index % 2 === 1 ? "text-left" : "opacity-0"}`}
                          >
                            {index % 2 === 1 && title}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionIntro
            eyebrow="Testimonials"
            title="Proof points designed to feel personal, not manufactured."
            copy="Selected client feedback from recent product, platform, and growth engagements across SaaS, consumer apps, and digital brands."
          />
          <div className="marquee-paused relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="marquee flex w-max gap-5 pr-5 [animation-duration:32s]"
            >
              {testimonialMarquee.map((item, index) => {
                const isDuplicate = index >= testimonials.length;
                return (
                  <motion.article
                    key={`${item.name}-${index}`}
                    aria-hidden={isDuplicate}
                    whileHover={{ y: -10, scale: 1.015 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative w-[82vw] max-w-[420px] shrink-0 overflow-hidden rounded-[2rem] border border-black/10 bg-white/78 p-6 shadow-[0_24px_80px_-60px_rgba(17,17,17,.45)] transition-colors duration-500 hover:border-black/25 hover:bg-white sm:w-[390px]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,.95),transparent_32%),linear-gradient(135deg,rgba(17,17,17,.06),transparent_44%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1 text-primary">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star key={n} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <span className="rounded-full border border-black/10 bg-[#f1f0eb] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                          Review
                        </span>
                      </div>
                      <p className="min-h-32 text-pretty text-base leading-8 text-foreground/85">
                        “{item.quote}”
                      </p>
                      <div className="mt-7 flex items-center gap-3 border-t border-black/10 pt-5">
                        <div
                          className="avatar-pulse grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-[#d8d5cb] font-display text-sm font-semibold text-background shadow-[0_18px_48px_-34px_rgba(17,17,17,.65)]"
                          style={{ animationDelay: `${index * 0.15}s` }}
                        >
                          {item.name.slice(0, 1)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-black/10 bg-[linear-gradient(135deg,rgba(17,17,17,.08),rgba(255,255,255,.78))] p-7 shadow-[0_24px_90px_-62px_rgba(17,17,17,.5)] sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
              Contact
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              <AnimatedWords text="Have a project worth doing properly?" />
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              <AnimatedLine>
                Send the scope, timeline, and goals. We’ll reply with a clear
                next step and the cleanest path to launch.
              </AnimatedLine>
            </p>
            <div className="mt-8 space-y-3">
              {[
                {
                  icon: Mail,
                  text: contactEmail,
                  href: `mailto:${contactEmail}`,
                },
                {
                  icon: Linkedin,
                  text: "LinkedIn",
                  href: "https://www.linkedin.com/company/oryzen-technolabs",
                },
                {
                  icon: Instagram,
                  text: "Instagram",
                  href: instagramProfileUrl,
                },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="flex items-center gap-3 rounded-2xl bg-white/65 p-4 text-sm"
                >
                  <Icon size={18} className="text-primary" />
                  {text}
                </a>
              ))}
            </div>
            <a
              href={freeMvpCallLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 text-sm font-semibold text-foreground shadow-[0_18px_55px_-45px_rgba(17,17,17,.6)] transition hover:border-black/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <CalendarPlus size={18} /> Book a Call
            </a>
          </div>
          <form
            className="rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-[0_24px_90px_-62px_rgba(17,17,17,.5)] backdrop-blur sm:p-7"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = String(formData.get("name") ?? "").trim();
              const email = String(formData.get("email") ?? "").trim();
              const project = String(formData.get("project") ?? "").trim();
              const budget = String(formData.get("budget") ?? "").trim();
              const timeline = String(formData.get("timeline") ?? "").trim();
              const message = String(formData.get("message") ?? "").trim();
              const subject = encodeURIComponent(
                `Project inquiry${project ? ` - ${project}` : ""}`,
              );
              const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nProject Type: ${project}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`,
              );
              window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
            }}
          >
            <div className="mb-6 border-b border-black/10 pb-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                Project inquiry
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Share a few details and we’ll send the best next step.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Name
                <input
                  name="name"
                  required
                  placeholder="Your full name"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white/85 px-4 text-sm normal-case tracking-normal text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                />
              </label>
              <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white/85 px-4 text-sm normal-case tracking-normal text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Project type
                <select
                  name="project"
                  defaultValue=""
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white/85 px-4 text-sm normal-case tracking-normal text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  <option value="Website">Website</option>
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="API / Backend">API / Backend</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Budget range
                <select
                  name="budget"
                  defaultValue=""
                  className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white/85 px-4 text-sm normal-case tracking-normal text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                >
                  <option value="" disabled>
                    Select budget
                  </option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                  <option value="$3,000 - $7,000">$3,000 - $7,000</option>
                  <option value="$7,000+">$7,000+</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Timeline
              <input
                name="timeline"
                placeholder="e.g. 2-4 weeks"
                className="mt-2 h-12 w-full rounded-xl border border-black/10 bg-white/85 px-4 text-sm normal-case tracking-normal text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <label className="mt-4 block text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Message
              <textarea
                name="message"
                rows={6}
                placeholder="What are you building, and what outcome do you need?"
                className="mt-2 w-full rounded-xl border border-black/10 bg-white/85 px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
              />
            </label>

            <button className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground font-semibold text-background transition hover:bg-foreground/90">
              <Send size={17} /> Send inquiry
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(135deg,rgba(17,17,17,.07),rgba(255,255,255,.86))] p-6 shadow-[0_28px_90px_-62px_rgba(17,17,17,.55)] sm:p-8 lg:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Still not sure?
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Let&apos;s talk for 15 minutes and map your best next step.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                No pressure, no long forms. Just a clear direction for your
                website, app, or product idea.
              </p>
            </div>
            <a
              href={freeMvpCallLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 15-minute MVP discovery call on Calendly"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-semibold text-background shadow-[0_20px_55px_-38px_rgba(17,17,17,.8)] transition hover:scale-[1.02] hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <CalendarPlus size={17} /> Book a Call
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-black/10 px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-[1440px] rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_90px_-62px_rgba(17,17,17,.5)] sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.9fr]">
            <div>
              <a
                href="#top"
                className="group inline-flex h-14 w-64 items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_18px_45px_-36px_rgba(17,17,17,.55)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <img
                  src={oryzenLogo.img.src}
                  srcSet={oryzenLogo.sources.webp}
                  sizes="256px"
                  alt="Oryzen Technolabs logo"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain object-center px-3 py-1 transition-transform duration-500 group-hover:scale-[1.035]"
                />
              </a>
              <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
                Oryzen Technolabs
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                A digital product studio building polished web experiences,
                scalable systems, and launch-ready platforms for ambitious
                teams.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={freeMvpCallLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-foreground transition hover:border-black/25 hover:bg-[#f8f7f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <CalendarPlus size={16} /> Book a Call
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-[#f8f7f2] px-5 text-sm font-medium text-foreground transition hover:border-black/25 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Send size={16} /> Start a project
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                Navigation
              </h3>
              <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
                {[
                  { label: "About", href: "#about" },
                  { label: "Work", href: "#portfolio" },
                  { label: "Tech Stack", href: "#tech-stack" },
                  { label: "Services", href: "#services" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="rounded-lg px-2 py-1 transition hover:bg-black/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                Contact
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-black/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Mail size={16} /> {contactEmail}
                </a>
                <a
                  href="https://www.linkedin.com/company/oryzen-technolabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-black/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-black/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 border-t border-black/10 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Oryzen Technolabs. All rights
              reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                Full Stack · AI · SaaS
              </span>
              <a
                href="#top"
                aria-label="Back to top"
                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-muted-foreground transition hover:border-black/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <ChevronUp size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
