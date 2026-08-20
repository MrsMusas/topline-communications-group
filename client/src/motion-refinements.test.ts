import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync(new URL("./pages/Home.tsx", import.meta.url), "utf8");
const stylesheet = readFileSync(new URL("./index.css", import.meta.url), "utf8");

describe("TLCG industry, Insights, and contact-spacing refinements", () => {
  it("reveals industry tokens once in a sequential premium stagger", () => {
    expect(home).toContain('data-industry-reveal');
    expect(home).toContain('`${index * 82}ms`');
    expect(home).toContain('stagedObserver.unobserve(entry.target)');
    expect(stylesheet).toContain('.why-industries[data-industry-reveal].is-visible .industry-token { animation: industry-token-in 480ms');
  });

  it("reveals the four existing Insights blocks in a restrained one-time sequence", () => {
    expect(home).toContain('data-insights-reveal');
    expect(home).toContain('`${index * 110}ms`');
    expect(stylesheet).toContain('.insights-topics[data-insights-reveal].is-visible .insights-topic { animation: insights-topic-in 500ms');
  });

  it("tightens only the Insights-to-contact gap while preserving reduced-motion access", () => {
    expect(stylesheet).toContain('padding: clamp(5rem, 10vw, 10rem) clamp(1.25rem, 8.3vw, 8rem) clamp(2.25rem, 3.5vw, 3rem);');
    expect(stylesheet).toContain('padding: clamp(2.25rem, 3.5vw, 3rem) clamp(1.25rem, 8.3vw, 8rem) clamp(5rem, 10vw, 10rem);');
    expect(stylesheet).toContain('.why-industries[data-industry-reveal] .industry-token, .insights-topics[data-insights-reveal] .insights-topic { opacity: 1; transform: none; animation: none !important; }');
  });
});
