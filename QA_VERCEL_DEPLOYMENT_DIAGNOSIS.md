# TLCG Vercel Deployment Diagnosis

## Scope

This is a read-only diagnosis. No TLCG application code, Vercel setting, Vercel environment variable, GitHub revision, DNS record, production-domain setting, or email configuration was changed.

## Verified evidence

| Area | Finding |
|---|---|
| Live production root | `https://topline-communications-group.vercel.app/` returns the compiled `server/index.ts` and `server/brevo.ts` JavaScript source as text, rather than the TLCG document shell. |
| Frontend build | Vite successfully produces `dist/public/index.html` and its compiled asset files. |
| Current package build | `pnpm build` runs `vite build` and then bundles `server/index.ts` directly into `dist/index.js`. |
| Current Vite output | The configured Vite output directory is `dist/public`, while Vercel’s Vite project setting uses output directory `dist`. |
| Vercel behaviour | The deployment is Ready but shows zero Function Invocations. The project has no repository `vercel.json` routing/output configuration. |
| Brevo environment | `BREVO_API_KEY` is present as a Vercel project environment-variable name. Its value was not viewed or changed. |

## Root cause

The deployment has two incompatible production artefacts under the directory Vercel serves as the Vite output: the intended Vite frontend at `dist/public/index.html` and the server bundle at `dist/index.js`. Vercel is configured to use `dist`, so its root response resolves to the bundled server file instead of the nested Vite document shell. The existing Express server is a standalone server process intended for a persistent Node runtime; it is not deployed as an `/api/enquiry` Vercel Function, which is consistent with the zero function-invocation count.

## Minimum safe remediation proposed for approval

1. Make the Vite frontend output directory `dist`, so its `index.html` sits at the exact Vercel output root.
2. Remove the standalone Express bundle from the Vercel production build path; retain its shared Brevo delivery logic in `server/brevo.ts`.
3. Add a dedicated `api/enquiry.ts` Vercel Function that imports `submitWebsiteEnquiry` from `server/brevo.ts`, accepts only `POST`, and reads `BREVO_API_KEY` server-side. No credential value is added to source or browser code.
4. Add a minimal repository `vercel.json` that declares `dist` as the output directory and rewrites the existing client-side route paths (`/capabilities`, `/experience`, `/approach`, `/why-tlcg`, `/lets-talk`, plus existing policy paths) to `/index.html`. The `/api/enquiry` path remains outside those rewrites and is handled by the function.
5. Before redeployment, confirm the existing `BREVO_API_KEY` applies to the Vercel **Production** environment. Do not expose or replace its value.

## Intended result

The TLCG Vite frontend is served at `/`; each direct section route returns the same single-page frontend for client-side positioning; and `POST /api/enquiry` invokes only the server-side Brevo function. No DNS or email record is involved in this remediation.

## References

- [Vercel — Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel — Using the Node.js Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js)
- [Vercel — Rewrites](https://vercel.com/docs/routing/rewrites)
