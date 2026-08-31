import { z } from "zod";

const BREVO_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const TLCG_SENDER = {
  name: "Top Line Communications Group",
  email: "marketing@toplinecommunicationsgroup.co.za",
} as const;
const TLCG_RECIPIENT = {
  name: "TLCG Marketing",
  email: "marketing@toplinecommunicationsgroup.co.za",
} as const;

const websiteEnquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(80).optional().default(""),
  organisation: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1).max(5_000),
});

type WebsiteEnquiry = z.infer<typeof websiteEnquirySchema>;

export class EnquiryDeliveryError extends Error {
  constructor(
    message: string,
    public readonly providerStatus: number,
  ) {
    super(message);
    this.name = "EnquiryDeliveryError";
  }
}

export type EnquirySubmissionResult =
  | { status: 200; body: { success: true } }
  | { status: 400 | 500 | 502; body: { success: false; error: string } };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function createEmailContent(enquiry: WebsiteEnquiry) {
  const rows: Array<[string, string]> = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Organisation", enquiry.organisation || "Not provided"],
    ["Message", enquiry.message],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px;background:#f1eee6;color:#132118;font-family:Arial,sans-serif;">
    <div style="max-width:680px;margin:0 auto;border-top:3px solid #D4AF37;">
      <p style="margin:28px 0 8px;color:#10261e;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Top Line Communications Group</p>
      <h1 style="margin:0 0 28px;font-size:28px;font-weight:600;line-height:1.2;">New website enquiry</h1>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `<tr>
            <th align="left" style="width:34%;padding:14px 16px;border-bottom:1px solid #e6e0d5;color:#10261e;font-size:12px;letter-spacing:1px;text-transform:uppercase;vertical-align:top;">${escapeHtml(label)}</th>
            <td style="padding:14px 16px;border-bottom:1px solid #e6e0d5;color:#132118;font-size:15px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(value)}</td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin:24px 0 0;color:#59645d;font-size:13px;line-height:1.55;">Reply directly to this email to respond to the visitor.</p>
    </div>
  </body>
</html>`;
}

async function getBrevoErrorMessage(response: Response) {
  const responseText = await response.text();
  if (!responseText) return `Brevo rejected the delivery request with status ${response.status}.`;

  try {
    const parsed = JSON.parse(responseText) as { message?: unknown };
    if (typeof parsed.message === "string" && parsed.message.trim()) return parsed.message;
  } catch {
    // Retain the safe status fallback when Brevo does not return JSON.
  }

  return `Brevo rejected the delivery request with status ${response.status}.`;
}

export async function deliverWebsiteEnquiry(
  enquiry: WebsiteEnquiry,
  fetchImpl: typeof fetch = fetch,
  configuredApiKey?: string,
) {
  const apiKey = configuredApiKey ?? process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new EnquiryDeliveryError("The Brevo API key is not configured on the server.", 500);
  }

  const response = await fetchImpl(BREVO_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: TLCG_SENDER,
      to: [TLCG_RECIPIENT],
      replyTo: {
        name: cleanHeader(enquiry.name),
        email: enquiry.email,
      },
      subject: `New website enquiry from ${cleanHeader(enquiry.name)}`,
      htmlContent: createEmailContent(enquiry),
    }),
  });

  if (!response.ok) {
    throw new EnquiryDeliveryError(await getBrevoErrorMessage(response), response.status);
  }

  const responseBody = (await response.json().catch(() => null)) as { messageId?: unknown } | null;
  if (!responseBody || typeof responseBody.messageId !== "string" || !responseBody.messageId) {
    throw new EnquiryDeliveryError("Brevo accepted the request without returning a delivery message ID.", 502);
  }
}

export async function submitWebsiteEnquiry(payload: unknown, configuredApiKey?: string): Promise<EnquirySubmissionResult> {
  const parsed = websiteEnquirySchema.safeParse(payload);
  if (!parsed.success) {
    return {
      status: 400,
      body: {
        success: false,
        error: "Please check the required form fields and try again.",
      },
    };
  }

  try {
    await deliverWebsiteEnquiry(parsed.data, fetch, configuredApiKey);
    return { status: 200, body: { success: true } };
  } catch (error) {
    if (error instanceof EnquiryDeliveryError && error.providerStatus === 500) {
      return {
        status: 500,
        body: {
          success: false,
          error: "The enquiry service is not configured. Please contact TLCG directly.",
        },
      };
    }

    return {
      status: 502,
      body: {
        success: false,
        error: "We could not send your enquiry just now. Please try again shortly or contact TLCG directly.",
      },
    };
  }
}
