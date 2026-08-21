import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync(new URL("./pages/Home.tsx", import.meta.url), "utf8");
const stylesheet = readFileSync(new URL("./index.css", import.meta.url), "utf8");

describe("TLCG single-line footer", () => {
  it("keeps the gold monogram and presents the approved footer items in order", () => {
    expect(home).toContain('className="footer-logo" href="#home"');
    expect(home).toContain('alt="Official TLCG gold monogram"');
    const footer = home.slice(home.indexOf('<footer className="site-footer">'));
    const orderedItems = ["© 2026 TLCG", "Proudly developed by TLCG", "Privacy policy", "Cookie policy", "Back to top"];
    const offsets = orderedItems.map((item) => footer.indexOf(item));
    expect(offsets.every((offset) => offset >= 0)).toBe(true);
    expect(offsets).toEqual([...offsets].sort((a, b) => a - b));
    expect((footer.match(/className="footer-divider"/g) ?? []).length).toBe(4);
  });

  it("uses the requested dark, light-grey, gold, and responsive inline footer treatment", () => {
    expect(stylesheet).toContain('.site-footer { display: grid; grid-template-columns: minmax(5rem, 1fr) auto minmax(5rem, 1fr);');
    expect(stylesheet).toContain('color: #D1D1D1;');
    expect(stylesheet).toContain('.footer-meta .footer-back-top { color: #D4AF37; }');
    expect(stylesheet).toContain('.footer-meta { grid-column: 2; display: flex; flex: 0 1 auto; flex-wrap: wrap; align-items: center; justify-content: center;');
    expect(stylesheet).toContain('.site-footer { grid-template-columns: 1fr; justify-items: center; align-items: center; gap: 1rem; padding: 1.25rem; }');
    expect(stylesheet).toContain('.footer-logo { justify-self: center; }');
  });

  it("retains the Back to Top anchor and its upward arrow icon", () => {
    expect(home).toContain('className="footer-back-top" href="#home"');
    expect(home).toContain('window.scrollTo({ top: 0, behavior: "smooth" })');
    expect(home).toContain('<ArrowUpRight size={14} strokeWidth={1.3} />');
  });
});
