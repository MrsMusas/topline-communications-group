import { submitWebsiteEnquiry } from "./server/brevo";

interface Env {
  BREVO_API_KEY?: string;
}

const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/enquiry") {
      return new Response(null, { status: 404 });
    }

    if (request.method !== "POST") {
      return Response.json(
        { success: false, error: "Method not allowed." },
        { status: 405, headers: { ...jsonHeaders, allow: "POST" } },
      );
    }

    try {
      const result = await submitWebsiteEnquiry(await request.json(), env.BREVO_API_KEY);
      return Response.json(result.body, { status: result.status, headers: jsonHeaders });
    } catch {
      return Response.json(
        { success: false, error: "Please check the form and try again." },
        { status: 400, headers: jsonHeaders },
      );
    }
  },
};
