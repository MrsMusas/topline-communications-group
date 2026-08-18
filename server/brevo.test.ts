import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverWebsiteEnquiry } from "./brevo";

const originalApiKey = process.env.BREVO_API_KEY;

afterEach(() => {
  if (originalApiKey) process.env.BREVO_API_KEY = originalApiKey;
  else delete process.env.BREVO_API_KEY;
});

describe("deliverWebsiteEnquiry", () => {
  it("uses the authorised TLCG sender, visitor Reply-To, and escaped form content", async () => {
    process.env.BREVO_API_KEY = "test-server-only-key";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ messageId: "brevo-message-id" }), { status: 201 }),
    );

    await deliverWebsiteEnquiry(
      {
        name: "Taylor <Visitor>",
        email: "taylor@example.com",
        phone: "+27 83 000 0000",
        organisation: "Example Organisation",
        message: "Please help with <strong>launch planning</strong>.",
      },
      fetchMock,
    );

    const requestInit = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const email = JSON.parse(String(requestInit.body));

    expect(requestInit.headers).toMatchObject({
      "api-key": "test-server-only-key",
      "content-type": "application/json",
    });
    expect(email.sender).toEqual({
      name: "Top Line Communications Group",
      email: "marketing@toplinecommunicationsgroup.co.za",
    });
    expect(email.to).toEqual([{ name: "TLCG Marketing", email: "marketing@toplinecommunicationsgroup.co.za" }]);
    expect(email.replyTo).toEqual({ name: "Taylor <Visitor>", email: "taylor@example.com" });
    expect(email.subject).toBe("New website enquiry from Taylor <Visitor>");
    expect(email.htmlContent).toContain("Taylor &lt;Visitor&gt;");
    expect(email.htmlContent).toContain("&lt;strong&gt;launch planning&lt;/strong&gt;");
    expect(email.htmlContent).not.toContain("test-server-only-key");
  });
});
