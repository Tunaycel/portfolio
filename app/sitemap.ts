import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base=siteUrl();if(!base)return [];
  return [{url:base.href},{url:new URL('/resume',base).href},...projects.map(p=>({url:new URL(`/work/${p.slug}`,base).href}))];
}
