const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-background/60 py-8 sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:gap-6 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="font-display text-sm text-foreground sm:text-base">Sahil Hashmi</div>
          <div className="text-[11px] text-muted-foreground sm:text-xs">Full Stack Developer · Remote · Available for work</div>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[11px] text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded sm:text-xs">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-[11px] text-muted-foreground sm:text-xs">© {new Date().getFullYear()} — Crafted with care.</div>
      </div>
    </footer>
  );
}