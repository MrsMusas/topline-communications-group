import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const documentHead = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const home = readFileSync(new URL("./pages/Home.tsx", import.meta.url), "utf8");
const stylesheet = readFileSync(new URL("./index.css", import.meta.url), "utf8");
const viteConfig = readFileSync(new URL("../../vite.config.ts", import.meta.url), "utf8");
const vercelConfig = readFileSync(new URL("../../vercel.json", import.meta.url), "utf8");

const origin = "https://www.toplinecommunicationsgroup.co.za";

describe("TLCG search and AI crawlability metadata", () => {
  it("uses the canonical www host consistently in static metadata and linked organization data", () => {
    expect(documentHead).toContain(`<link rel="canonical" href="${origin}/" />`);
    expect(documentHead).toContain(`"@id": "${origin}/#organization"`);
    expect(documentHead).toContain(`"@id": "${origin}/#website"`);
    expect(documentHead).toContain(`"url": "${origin}/"`);
    expect(documentHead).not.toContain('https://toplinecommunicationsgroup.co.za/');
  });

  it("provides factual ProfessionalService, WebSite, and WebPage structured data without ratings or unsupported claims", () => {
    expect(documentHead).toContain('"@type": "ProfessionalService"');
    expect(documentHead).toContain('"@type": "WebSite"');
    expect(documentHead).toContain('"@type": "WebPage"');
    expect(documentHead).toContain('"email": "marketing@toplinecommunicationsgroup.co.za"');
    expect(documentHead).not.toMatch(/aggregateRating|reviewCount|award|foundingDate|sameAs/);
  });

  it("updates canonical, social, and WebPage metadata by public route and exposes crawlable primary-route anchors", () => {
    expect(home).toContain("const pageMetadata: Record<string, { title: string; description: string }>");
    expect(home).toContain('setAttribute(\'link[rel="canonical"]\', "href", canonicalUrl);');
    expect(documentHead).toContain('id="tlcg-webpage-schema"');
    expect(home).toContain('<a className={activeSection === id ? "is-active" : ""} href={path}');
    expect(home).toContain('<a href={path} key={id}');
    expect(stylesheet).toContain(".desktop-nav a {");
    expect(stylesheet).toContain(".mobile-nav a {");
  });

  it("emits crawler-visible route-specific HTML heads for every non-root sitemap route", () => {
    for (const route of ["/capabilities", "/experience", "/approach", "/why-tlcg", "/insights", "/lets-talk"]) {
      expect(viteConfig).toContain(`path: "${route}"`);
      expect(vercelConfig).toContain(`"source": "${route}", "destination": "${route}/index.html"`);
    }
    expect(viteConfig).toContain("vitePluginStaticRouteMetadata");
    expect(viteConfig).toContain("tlcg-static-route-metadata");
  });
});
