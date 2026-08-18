import { describe, expect, it } from "vitest";

describe("Brevo transactional-email credentials", () => {
  it("authorises the configured server-only API key", async () => {
    const apiKey = process.env.BREVO_API_KEY;

    expect(apiKey).toBeTruthy();

    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": apiKey! },
    });

    expect(response.ok).toBe(true);
  }, 30_000);
});
