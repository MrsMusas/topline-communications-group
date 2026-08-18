# TLCG Publish-Readiness QA

## Visual verification

The complete home page and both policy routes were captured at 1280 × 720 and 375 × 812, with the home page also captured at 768 × 1024. The approved Verdant Ledger presentation remained intact across desktop, tablet, and mobile: no overflow, clipping, broken imagery, or unreadable form/policy content was observed. The updated privacy-policy copy visibly describes the server-side Brevo form flow. The public client-perspective eyebrow now reads “03 — Perspectives”; the provisional Beta label is no longer shown.

## Navigation verification

The live preview opens at the Hero and the primary Capabilities control moves to the intended Capabilities chapter beneath the fixed header. Experience, Approach, About TLCG, Why TLCG, and Let’s Talk were then tested in the live navigation and each moved to its intended section. The cleared event imagery, approved Approach image, About interaction, Why TLCG content, and Let’s Talk form all rendered as expected. The footer exposes the policy links and Back to Top control; Back to Top returned the browser to the Hero and updated the address to `#home`.

After the final wording update, the page was refreshed and Capabilities was reselected from the primary navigation. Its active gold underline was present and the page returned to the correct chapter.

## Interaction verification

The Capabilities interaction was tested with two different services. Selecting Brand & Strategy revealed only its supporting description; selecting Fractional Leadership then transferred the active treatment and revealed that service description instead. This confirmed the intended single-active editorial behavior.

The client-perspective interaction was tested with Clarity and then Impact. Its expanded detail moved cleanly to the currently selected perspective, with the prior item returning to the muted state.

The About TLCG belief interaction was tested with the first and third beliefs. The supporting explanation transferred to the chosen belief while the other headings remained muted, confirming the approved single-active behavior.

The Why TLCG interaction was tested with Strategic Thinking and then Trusted Partnership. The active detail transferred to the selected differentiator, confirming its single-active interaction behavior.

## PASSED

The primary navigation, its active gold state, all anchor destinations, the client-perspective interaction, About TLCG belief interaction, Why TLCG differentiator interaction, footer Back to Top, policy routes, approved media rendering, responsive layouts, and the live Brevo enquiry delivery all passed verification.

## FIXED

The Let’s Talk form now submits server-side through Brevo rather than invoking a mail client. The live provider event confirms delivery. The public-facing provisional `Beta Testimonials` eyebrow was also replaced with the neutral `Perspectives` label while retaining the approved section content.

## REMAINING

No release-blocking items remain from the tracked TLCG website QA scope. The non-blocking Vite chunk-size advisory remains a future performance optimisation only; the production build succeeds.

## Form verification

The Let’s Talk form retains Name, Organisation, Email, Phone, and Message. The live delivery test is documented in `QA_BREVO_ENQUIRY.md`.

## Media and build verification

`MEDIA_CLEARANCE.md` lists all five currently rendered Selected Experience photographs as **CLEARED FOR PUBLIC WEBSITE USE**. The public source references exactly those five stills and contains no Victoria Falls reference, no video format reference, and no uncleared media reference. The final type check, production build, stable Brevo unit test, and Brevo credential validation test all passed. The current development-server and browser-console entries contain no application error from the completed work.

## Final outcome

All currently tracked launch-readiness checks are **PASSED**. The only build observation is Vite’s non-blocking warning about a JavaScript chunk exceeding its suggested size; it does not prevent a successful production build.
