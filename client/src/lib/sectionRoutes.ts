export const navigationSections = [
  { label: "About TLCG", id: "about-tlcg", path: "/" },
  { label: "Capabilities", id: "capabilities", path: "/capabilities" },
  { label: "Experience", id: "experience", path: "/experience" },
  { label: "Approach", id: "approach", path: "/approach" },
  { label: "Why TLCG", id: "why-tlcg", path: "/why-tlcg" },
  { label: "Let’s Talk", id: "talk", path: "/lets-talk" },
] as const;

export const homepageSectionOrder = navigationSections.map(section => section.id);

export function sectionIdForPath(path: string) {
  return navigationSections.find(section => section.path === path)?.id ?? null;
}
