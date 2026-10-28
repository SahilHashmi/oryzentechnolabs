import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import favicon from "../assets/projects/favicon.png";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://sahilhashmi.dev";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oryzen Technolabs — Web, App & AI Product Studio" },
      {
        name: "description",
        content:
          "Oryzen Technolabs is a digital product studio building e-commerce stores, premium websites, mobile apps, and AI-powered SaaS platforms. Book a free 15-minute MVP discovery call to start your project.",
      },
      { name: "author", content: "Oryzen Technolabs" },
      { name: "theme-color", content: "#111111" },
      { name: "color-scheme", content: "light" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "Oryzen Technolabs" },
      { name: "application-name", content: "Oryzen Technolabs" },
      { name: "msapplication-TileColor", content: "#f4f3ee" },
      { name: "msapplication-TileImage", content: favicon },
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
      { property: "og:site_name", content: "Oryzen Technolabs" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Oryzen Technolabs — digital product studio portfolio",
      },
      { property: "og:locale", content: "en_US" },
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
      {
        name: "robots",
        content:
          "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
    ],
    links: [
      {
        rel: "manifest",
        href: "/manifest.webmanifest",
      },
      {
        rel: "icon",
        href: "/icons/icon-transparent-512.png",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        href: favicon,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // The tech stack grid pulls ~70 logos from these two CDNs.
      {
        rel: "preconnect",
        href: "https://cdn.simpleicons.org",
        crossOrigin: "anonymous",
      },
      {
        rel: "preconnect",
        href: "https://cdn.jsdelivr.net",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Required: nested routes render here. Removing <Outlet /> breaks all child routes.
  return <Outlet />;
}
