import { describe, expect, it } from "vitest";
import { homepageSectionOrder, navigationSections, sectionIdForPath } from "../client/src/lib/sectionRoutes";

describe("TLCG section routes", () => {
  it("maps every approved direct route to its existing page section", () => {
    expect(navigationSections).toEqual([
      { label: "About TLCG", id: "about-tlcg", path: "/" },
      { label: "Capabilities", id: "capabilities", path: "/capabilities" },
      { label: "Experience", id: "experience", path: "/experience" },
      { label: "Approach", id: "approach", path: "/approach" },
      { label: "Why TLCG", id: "why-tlcg", path: "/why-tlcg" },
      { label: "Let’s Talk", id: "talk", path: "/lets-talk" },
    ]);
  });

  it("keeps the requested homepage section order and resolves all non-home deep links", () => {
    expect(homepageSectionOrder).toEqual(["about-tlcg", "capabilities", "experience", "approach", "why-tlcg", "talk"]);
    expect(sectionIdForPath("/capabilities")).toBe("capabilities");
    expect(sectionIdForPath("/experience")).toBe("experience");
    expect(sectionIdForPath("/approach")).toBe("approach");
    expect(sectionIdForPath("/why-tlcg")).toBe("why-tlcg");
    expect(sectionIdForPath("/lets-talk")).toBe("talk");
    expect(sectionIdForPath("/unknown")).toBeNull();
  });
});
