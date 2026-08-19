# TLCG Vercel Production Follow-up Diagnosis

## Scope

This is a read-only diagnosis. No source code, Vercel configuration, environment variable, Brevo setting, DNS record, domain setting, or email record was changed.

## Enquiry endpoint evidence

| Verification | Production evidence | Conclusion |
|---|---|---|
| Function invocation | Vercel logged `POST 500` for `/api/enquiry` at 13:21:33.88. | The route is invoked correctly. |
| Exact failure | `ERR_MODULE_NOT_FOUND: Cannot find module '/var/task/server/brevo' imported from /var/task/api/enquiry.js`. | The function exits while loading its relative server module, before request handling or Brevo execution. |
| Brevo environment configuration | The Vercel dashboard lists `BREVO_API_KEY` as Sensitive for Production and Preview. Its value was not viewed or changed. | The key is configured for Production, but the failed function never reaches code that reads it. |
| Brevo API reachability | No Brevo request/status appears in the function log. | The request cannot reach Brevo until the module-resolution error is fixed. |

## Minimum correction proposed for approval

The Vercel Node runtime is executing the compiled ESM function at `/var/task/api/enquiry.js`, whose extensionless relative import resolves to `/var/task/server/brevo` and fails. Change only the Vercel-function import to the emitted ESM path, `../server/brevo.js`, and add one focused function-loading test that exercises the compiled import contract. The shared Brevo implementation remains in `server/brevo.ts`; no key value, sender, recipient, email setting, or frontend behavior changes.

## Root initial-position evidence

A fresh production navigation to `/` landed at 1,074 pixels below the top, on the later “Built to make good work matter” content. This is application-controlled rather than browser scroll restoration: `sectionIdForPath("/")` resolves to `about-tlcg`, and the Home route effect always calls `scrollIntoView()` for that section after two animation frames. The section starts below the approved hero, causing the observed initial position.

## Minimum correction proposed for approval

For the root route only, replace the route effect’s section scroll with `window.scrollTo({ top: 0, behavior: "auto" })`. Leave all non-root route positioning, navigation clicks, active scroll highlighting, section order, and About TLCG content unchanged. This makes a fresh `/` visit start at the approved About TLCG hero while retaining the continuous-scroll experience afterwards.
