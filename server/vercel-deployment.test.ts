import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const deploymentConfig = JSON.parse(
  readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf-8"),
) as { outputDirectory?: string; rewrites?: Array<{ source: string; destination: string }> };

describe("Vercel deployment configuration", () => {
  it("serves the Vite build from dist and preserves the TLCG SPA routes", () => {
    expect(deploymentConfig.outputDirectory).toBe("dist");
    expect(deploymentConfig.rewrites).toEqual(
      expect.arrayContaining([
        { source: "/capabilities", destination: "/index.html" },
        { source: "/experience", destination: "/index.html" },
        { source: "/approach", destination: "/index.html" },
        { source: "/why-tlcg", destination: "/index.html" },
        { source: "/lets-talk", destination: "/index.html" },
      ]),
    );
  });

  it("does not rewrite the server-side enquiry endpoint into the frontend", () => {
    expect(deploymentConfig.rewrites?.some((rewrite) => rewrite.source === "/api/enquiry")).toBe(false);
  });
});
