import { submitWebsiteEnquiry } from "../server/brevo";

const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

/**
 * Vercel Function for the public TLCG enquiry form. The BREVO_API_KEY remains
 * available only to the imported server module and is never bundled for the client.
 */
export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return Response.json(
        { success: false, error: "Method not allowed." },
        { status: 405, headers: { ...jsonHeaders, allow: "POST" } },
      );
    }

    try {
      const result = await submitWebsiteEnquiry(await request.json());
      return Response.json(result.body, { status: result.status, headers: jsonHeaders });
    } catch {
      return Response.json(
        { success: false, error: "Please check the form and try again." },
        { status: 400, headers: jsonHeaders },
      );
    }
  },
};
