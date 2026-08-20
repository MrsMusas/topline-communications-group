import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const robots = readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const vercelConfig = readFileSync(new URL("../../vercel.json", import.meta.url), "utf8");

const productionHost = "https://www.toplinecommunicationsgroup.co.za";
const expectedRoutes = ["/", "/capabilities", "/experience", "/approach", "/why-tlcg", "/insights", "/lets-talk"];

describe("TLCG static crawlability assets", () => {
  it("allows normal crawling and advertises the canonical www sitemap", () => {
    expect(robots).toBe(`User-agent: *\nAllow: /\n\nSitemap: ${productionHost}/sitemap.xml\n`);
  });

  it("lists only the existing public routes on the canonical www host", () => {
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toEqual(expectedRoutes.map((route) => `${productionHost}${route}`));
    expect(sitemap).not.toContain("https://toplinecommunicationsgroup.co.za/");
  });

  it("keeps robots and sitemap outside the client-side route rewrites", () => {
    expect(vercelConfig).not.toContain('"source": "/robots.txt"');
    expect(vercelConfig).not.toContain('"source": "/sitemap.xml"');
  });
});
