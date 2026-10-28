import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { PremiumPortfolio } from "@/components/portfolio/PremiumPortfolio";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://sahilhashmi.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oryzen Technolabs — Web, App & AI Product Studio" },
      {
        name: "description",
        content:
          "Oryzen Technolabs is a digital product studio building e-commerce stores, premium websites, mobile apps, and AI-powered SaaS platforms. Book a free 15-minute MVP discovery call to start your project.",
      },
      {
        name: "keywords",
        content:
          "Oryzen Technolabs, Web Development Studio, E-commerce Development, App Development Agency, AI Product Studio, Online Store Development, Next.js, React, Django, FastAPI, SaaS Development, Digital Product Studio",
      },
      {
        property: "og:title",
        content: "Oryzen Technolabs — Web, App & AI Product Studio",
      },
      {
        property: "og:description",
        content:
          "Premium e-commerce stores, websites, apps, and AI products — built by Oryzen Technolabs. Web · App · AI — available worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Oryzen Technolabs — digital product studio portfolio",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Oryzen Technolabs — Web, App & AI Product Studio",
      },
      {
        name: "twitter:description",
        content:
          "Premium e-commerce stores, websites, apps, and AI products — built by Oryzen Technolabs.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}/#organization`,
              name: "Oryzen Technolabs",
              url: SITE_URL,
              description:
                "Digital product studio specializing in e-commerce development, premium websites, mobile apps, and AI-powered SaaS platforms.",
              email: "oryzentechnolabs@gmail.com",
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              priceRange: "$$",
              sameAs: [
                "https://www.linkedin.com/company/oryzen-technolabs",
                "https://www.instagram.com/oryzentechnolabs/",
                "https://calendly.com/oryzentechnolabs/15-minute-mvp-discovery-call",
              ],
              knowsAbout: [
                "Full Stack Development",
                "E-commerce Development",
                "Online Store Design",
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
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Product Studio Services",
                itemListElement: [
                  "Website Development",
                  "E-commerce Store Development",
                  "Web Application Development",
                  "Mobile App Development",
                  "UI/UX & Figma Design",
                  "SEO Optimization",
                ].map((name) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name },
                })),
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Oryzen Technolabs",
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en-US",
            },
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
