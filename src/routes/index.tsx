import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { PremiumPortfolio } from "@/components/portfolio/PremiumPortfolio";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://sahilhashmi.dev";
const OG_IMAGE = `${SITE_URL}/icons/icon-512x512.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oryzen Technolabs — Web, App & AI Product Studio" },
      {
        name: "description",
        content:
          "Oryzen Technolabs is a digital product studio building premium websites, mobile apps, and AI-powered SaaS platforms. Book a call to start your project.",
      },
      {
        name: "keywords",
        content:
          "Oryzen Technolabs, Web Development Studio, App Development Agency, AI Product Studio, Next.js, React, Django, FastAPI, SaaS Development, Digital Product Studio",
      },
      {
        property: "og:title",
        content: "Oryzen Technolabs — Web, App & AI Product Studio",
      },
      {
        property: "og:description",
        content:
          "Premium websites, apps, and AI products — built by Oryzen Technolabs. Web · App · AI — available worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      {
        property: "og:image:alt",
        content: "Oryzen Technolabs brand preview",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Oryzen Technolabs — Web, App & AI Product Studio",
      },
      {
        name: "twitter:description",
        content:
          "Premium websites, apps, and AI products — built by Oryzen Technolabs.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Oryzen Technolabs",
          description:
            "Digital product studio specializing in premium websites, mobile apps, and AI-powered SaaS platforms.",
          address: { "@type": "PostalAddress", addressCountry: "IN" },
          knowsAbout: [
            "Full Stack Development",
            "Next.js",
            "React",
            "TypeScript",
            "Python",
            "Django",
            "FastAPI",
            "Node.js",
            "PostgreSQL",
            "Generative AI",
            "Machine Learning",
            "AWS",
            "Docker",
            "Kubernetes",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <PremiumPortfolio />
    </>
  );
}
