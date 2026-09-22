import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarPlus, Menu, X } from "lucide-react";
import oryzenLogo from "@/assets/projects/oryzen_logo.png?logo";

const calendlyBaseUrl =
  import.meta.env.VITE_CALENDLY_URL ??
  "https://calendly.com/hashmisahil19/30min";
const freeMvpCallLink = `${calendlyBaseUrl}${
  calendlyBaseUrl.includes("?") ? "&" : "?"
}hide_gdpr_banner=1`;

const links = [
  { href: "#about", label: "About" },
  { href: "#tech-stack", label: "Stack" },
  { href: "#portfolio", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", ...links.map((link) => link.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-24% 0px -58%", threshold: [0.12, 0.24, 0.4] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onScrollClose = () => {
      setOpen(false);
    };
    window.addEventListener("scroll", onScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", onScrollClose);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close mobile menu on outside click
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        open &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    },
    [open],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [open, handleOutsideClick]);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 ${
        open ? "bottom-0 flex flex-col bg-background" : ""
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-3 py-2.5 sm:px-5 sm:py-3 transition-all duration-500 ${
          open
            ? "w-full border border-transparent bg-transparent shadow-none"
            : scrolled
              ? "glass-strong shadow-[0_18px_70px_-52px_rgba(17,17,17,0.55)]"
              : "border border-black/10 bg-white/50 backdrop-blur-xl"
        }`}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="group relative flex h-11 w-40 items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-[0_18px_45px_-36px_rgba(17,17,17,.55)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:h-12 sm:w-56"
        >
          <img
            src={oryzenLogo.img.src}
            srcSet={oryzenLogo.sources.webp}
            sizes="(min-width: 640px) 224px, 160px"
            alt="Oryzen Technolabs logo"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-contain object-center px-2.5 py-1 transition-transform duration-500 group-hover:scale-[1.035] sm:px-3 sm:py-1.5"
          />
          <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={activeSection === l.href ? "page" : undefined}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  activeSection === l.href
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={freeMvpCallLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#3b3b3b,#0f0f0f)] px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.28),0_12px_28px_-18px_rgba(17,17,17,.9)] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.32),0_16px_34px_-18px_rgba(17,17,17,.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:inline-flex"
          >
            Book a Call
          </a>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`grid h-10 w-10 place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:hidden ${
              open
                ? "border-foreground bg-foreground text-background"
                : "border-black/10 bg-white/65 text-foreground"
            }`}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.16 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col overflow-hidden px-2 pb-4 pt-7 md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="min-h-0 flex-1 overflow-y-auto"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    activeSection === link.href ? "page" : undefined
                  }
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.045, duration: 0.35 }}
                  className={`group flex min-h-14 items-center justify-between px-2 py-3 font-display text-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    activeSection === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`h-2 w-2 rounded-full transition ${
                      activeSection === link.href
                        ? "bg-foreground"
                        : "bg-transparent group-hover:bg-black/20"
                    }`}
                  />
                </motion.a>
              ))}
            </nav>
            <div className="shrink-0 pt-4 sm:pt-8">
              <p className="mb-4 px-2 text-sm leading-6 text-muted-foreground [@media(max-height:650px)]:hidden">
                Have a project in mind? Let&apos;s build something useful.
              </p>
              <a
                href={freeMvpCallLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <CalendarPlus size={16} /> Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
