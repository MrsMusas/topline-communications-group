import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("Vercel enquiry function compiled import", () => {
  it("emits a Node-ESM import that resolves to the compiled Brevo module", () => {
    const outputDirectory = mkdtempSync(path.join(os.tmpdir(), "tlcg-vercel-enquiry-"));

    try {
      execFileSync(
        "pnpm",
        [
          "exec",
          "esbuild",
          "api/enquiry.ts",
          "server/brevo.ts",
          "--platform=node",
          "--format=esm",
          "--packages=external",
          `--outdir=${outputDirectory}`,
        ],
        { cwd: process.cwd(), stdio: "pipe" },
      );

      const compiledFunction = path.join(outputDirectory, "api", "enquiry.js");
      const compiledBrevo = path.join(outputDirectory, "server", "brevo.js");
      expect(existsSync(compiledBrevo)).toBe(true);
      expect(readFileSync(compiledFunction, "utf-8")).toContain('from "../server/brevo.js"');
    } finally {
      rmSync(outputDirectory, { recursive: true, force: true });
    }
  });
});
