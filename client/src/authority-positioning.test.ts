import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync(new URL("./pages/Home.tsx", import.meta.url), "utf8");
const routes = readFileSync(new URL("./lib/sectionRoutes.ts", import.meta.url), "utf8");
const app = readFileSync(new URL("./App.tsx", import.meta.url), "utf8");
const documentHead = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const vercelConfig = readFileSync(new URL("../../vercel.json", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");

describe("TLCG authority positioning", () => {
  it("states the connected strategy, communication and experience proposition with genuine long-term experience", () => {
    expect(home).toContain("Strategy.<br />Communication.<br /><em>Experience.</em><br />Impact.");
    expect(home).toContain("more than two decades");
    expect(home).toContain("2+ Decades of Experience");
    expect(home).toContain("Clarify → Connect → Activate");
    expect(home).not.toMatch(/13\+? years/i);
  });

  it("creates a lightweight Insights route and section without a blog implementation", () => {
    expect(routes).toContain('{ label: "Insights", id: "insights", path: "/insights" }');
    expect(app).toContain('<Route path="/insights" component={Home} />');
    expect(home).toContain('<section id="insights" className="insights chapter section-light"');
    expect(home).toContain("Insights platform in development.");
    expect(vercelConfig).toContain('{ "source": "/insights", "destination": "/index.html" }');
    expect(sitemap).toContain("https://www.toplinecommunicationsgroup.co.za/insights");
  });

  it("makes TLCG’s Johannesburg expertise legible to search and AI systems", () => {
    expect(documentHead).toContain('"@type": "ProfessionalService"');
    expect(documentHead).toContain('"addressLocality": "Johannesburg"');
    expect(documentHead).toContain("More than two decades of practical experience connecting marketing, communications and corporate experiences.");
  });
});
