import type { MetadataRoute } from "next";
import { researchTopics } from "@/lib/research";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://githubportfolio-tan.vercel.app";
  const routes = ["", "/about", "/research", "/publications", "/projects", "/cv", "/outreach", "/contact", "/athletics", "/hobbies", "/attitude", "/observatory", "/observatory/cones", "/observatory/voyager", ...researchTopics.map(topic => `/research/${topic.slug}`)];
  return routes.map(route => ({ url: `${base}${route}`, priority: route === "" ? 1 : route.startsWith("/research") ? .8 : .5 }));
}
