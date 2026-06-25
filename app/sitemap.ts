import { MetadataRoute } from "next";
import { games, categories } from "@/data/games";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eraogames.vercel.app";

  // Core static routes
  const routes = [
    "",
    "/games",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/dmca",
    "/disclaimer",
    "/editorial-policy",
    "/blog",
    "/category/all",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Game category landing pages
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.name.toLowerCase()}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Individual game detail pages
  const gameRoutes = games.map((game) => ({
    url: `${baseUrl}/game/${game.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...gameRoutes, ...blogRoutes];
}
