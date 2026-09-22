import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 lg:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-10 -z-10 h-[420px] w-full max-w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Let's build something <span className="accent-text">premium</span>
              .
            </>
          }
          description="Available for freelance, contract, part-time and full-time remote roles. Average reply time: under 24 hours."
        />

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:rounded-3xl sm:p-8 md:p-10"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open to new work
              </div>
              <h3 className="mt-5 font-display text-2xl font-medium text-foreground sm:mt-6 sm:text-3xl md:text-4xl">
                Sahil Hashmi
              </h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Full Stack Developer · AI engineer · Remote-first. Currently
                accepting freelance and contract work, and exploring full-time
                opportunities with product-driven teams.
              </p>

              <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
                <a
                  href="mailto:oryzentechnolabs@gmail.com"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:px-4 sm:py-3"
                >
                  <span className="flex min-w-0 items-center gap-3 text-sm text-foreground">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
                      <Mail size={15} />
                    </span>
                    <span className="truncate">oryzentechnolabs@gmail.com</span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </a>
                <a
                  href="https://linkedin.com/in/sahilhashmi"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:px-4 sm:py-3"
                >
                  <span className="flex min-w-0 items-center gap-3 text-sm text-foreground">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
                      <Linkedin size={15} />
                    </span>
                    <span className="truncate">
                      linkedin.com/in/sahilhashmi
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  />
                </a>
                <a
                  href="https://wa.me/916261709525"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:px-4 sm:py-3"
                >
                  <span className="flex min-w-0 items-center gap-3 text-sm text-foreground">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-emerald-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <span className="truncate">+91-6261709525</span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400"
                  />
                </a>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
                  <span className="flex min-w-0 items-center gap-3 text-sm text-foreground">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-primary">
                      <MapPin size={15} />
                    </span>
                    <span className="truncate">India · Remote · GMT+5:30</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:oryzentechnolabs@gmail.com?subject=Project inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\n— " + form.name + " (" + form.email + ")")}`;
            }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:rounded-3xl sm:p-8 md:p-10"
          >
            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  id: "name",
                  label: "Your name",
                  type: "text",
                  placeholder: "Full name",
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "Work email",
                },
              ].map(
                (f: {
                  id: "name" | "email";
                  label: string;
                  type: "text" | "email";
                  placeholder: string;
                }) => (
                  <div key={f.id} className="group relative">
                    <label
                      htmlFor={f.id}
                      className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground sm:mb-2"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      onChange={(e) =>
                        setForm({ ...form, [f.id]: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-primary/[0.04] focus:ring-4 focus:ring-primary/15 focus-visible:ring-primary/30 sm:px-4 sm:py-3"
                    />
                  </div>
                ),
              )}
              <div className="group relative">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground sm:mb-2"
                >
                  Project brief
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your product, timeline and goals…"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-primary/[0.04] focus:ring-4 focus:ring-primary/15 focus-visible:ring-primary/30 sm:px-4 sm:py-3 sm:[rows:5]"
                />
              </div>
              <button
                type="submit"
                className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:mt-2 sm:px-6 sm:py-3.5"
              >
                Send inquiry
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
