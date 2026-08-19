import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(new URL("./index.css", import.meta.url), "utf8");

describe("fixed TLCG header separator", () => {
  it("keeps the header fixed and the gold separator attached at its bottom edge", () => {
    expect(stylesheet).toContain(".site-header { position: fixed;");
    expect(stylesheet).toContain(".site-header::before { content: \"\"; position: absolute;");
    expect(stylesheet).toContain("bottom: 0; left: 0; height: 2px; background: var(--gold);");
  });

  it("does not shift the header padding while the page is scrolled", () => {
    expect(stylesheet).toContain(".site-header.is-scrolled { background: #08140f;");
    expect(stylesheet).not.toContain(".site-header.is-scrolled { padding-top:");
  });
});
