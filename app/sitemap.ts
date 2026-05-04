import type { MetadataRoute } from "next";

// Next.js auto-generates /sitemap.xml from this export. Keep the static-route
// list in sync with public top-level pages. Gated routes (/admin, /seller,
// /dashboard, /inventory, /api) are intentionally excluded.

const BASE = "https://sneakpriceapp.com";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/",                         changeFrequency: "daily",   priority: 1.0 },
  { path: "/exchange",                 changeFrequency: "hourly",  priority: 0.9 },
  { path: "/blog",                     changeFrequency: "weekly",  priority: 0.8 },
  { path: "/news",                     changeFrequency: "daily",   priority: 0.7 },
  { path: "/about",                    changeFrequency: "monthly", priority: 0.5 },
  { path: "/press",                    changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy",                  changeFrequency: "yearly",  priority: 0.3 },
  { path: "/terms",                    changeFrequency: "yearly",  priority: 0.3 },
  { path: "/blog/how-to-flip-sneakers-for-profit", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
