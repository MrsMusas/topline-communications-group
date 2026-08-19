import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ submitWebsiteEnquiry: vi.fn() }));

vi.mock("../server/brevo", () => ({ submitWebsiteEnquiry: mocks.submitWebsiteEnquiry }));

import enquiryFunction from "./enquiry";

describe("Vercel enquiry function", () => {
  beforeEach(() => {
    mocks.submitWebsiteEnquiry.mockReset();
  });

  it("passes a valid JSON POST body to the existing server-side delivery module", async () => {
    mocks.submitWebsiteEnquiry.mockResolvedValue({ status: 200, body: { success: true } });
    const payload = { name: "Route Test", email: "route@example.com", message: "Test enquiry" };

    const response = await enquiryFunction.fetch(
      new Request("https://example.com/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );

    expect(mocks.submitWebsiteEnquiry).toHaveBeenCalledWith(payload);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("rejects non-POST requests without invoking Brevo delivery", async () => {
    const response = await enquiryFunction.fetch(new Request("https://example.com/api/enquiry"));

    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
    expect(mocks.submitWebsiteEnquiry).not.toHaveBeenCalled();
  });
});
