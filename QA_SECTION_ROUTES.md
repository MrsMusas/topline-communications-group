# TLCG Section Route QA

## Initial direct-route verification

The required routes are registered as single-page entry points and preserve the existing TLCG shell. Direct browser navigation to `/` placed the rendered page at the existing About TLCG section. Direct navigation to `/capabilities` placed the viewport 1,623px into the page at the Capabilities section, and direct navigation to `/experience` placed the viewport 1,312px into the page at the existing Experience section.

The direct-route tests leave the Hero and all existing content in the continuous document. The desktop navigation remains fixed and is intended to continue using its existing IntersectionObserver-driven active state while the visitor scrolls.

The existing desktop **Approach** navigation item was clicked from the rendered page. It updated the address to `/approach` and positioned the viewport 4,769px into the continuous document at the existing Approach section. A fresh direct load of `/` positioned the viewport 1,100px into the page at the existing About TLCG section, as required.

On the continuous homepage, a manual scroll moved from About TLCG into Capabilities and then into Selected Experience. In each viewport, the existing gold active navigation treatment transferred to the corresponding **Capabilities** and **Experience** item, confirming that the existing scroll-driven active state remains functional.

Fresh direct loads of `/why-tlcg` and `/lets-talk` positioned the existing page at 4,893px and 5,937px respectively. The Why TLCG section and the unchanged Let’s Talk contact details, portrait, and Brevo-backed enquiry form rendered at those route targets without a separate or duplicated page.
