# TLCG Brevo Enquiry Delivery QA

## Live preview form submission

On 18 August 2026, the Let’s Talk form was completed in the live TLCG preview and submitted through the on-page Send enquiry control. The browser remained on the TLCG page, showed the genuine interim `Sending enquiry…` state, and then displayed the inline confirmation: “Thank you — your enquiry has been sent. TLCG will be in touch shortly.” No email-application handoff or `mailto:` navigation occurred.

## Server delivery contract verified

The secure server route accepts the existing five fields and forwards a transactional request to Brevo only after server-side validation. The request is configured with `Top Line Communications Group <marketing@toplinecommunicationsgroup.co.za>` as sender and recipient, and the submitted visitor address as Reply-To. The browser receives no provider credential.

## Provider delivery confirmation

Brevo’s transactional-message list located the live test enquiry by its recipient and subject. Its detailed provider record then confirmed a `delivered` event. This verifies acceptance and delivery to `marketing@toplinecommunicationsgroup.co.za`; the sender and Reply-To headers were also asserted by the server-side delivery-contract test without exposing the API credential.
