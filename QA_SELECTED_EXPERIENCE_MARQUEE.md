# Selected Experience Image Marquee QA

**Verification date:** 18 August 2026

Live browser inspection at the Selected Experience anchor shows the five cleared photographs as a continuous horizontal strip directly beneath the existing Experience hero and copy. The strip is inside the original Experience section and shows the approved stills without captions, controls, or video.

The marquee uses two identical technical sequences to provide a seamless right-to-left loop. The duplicate sequence is `aria-hidden`; only the first sequence exposes descriptive alternative text. The existing organisation marquee and every other section remain separate and unchanged.

The selected strip uses automatic movement, hover pause on hover-capable devices, and a reduced-motion override that disables its animation and leaves the first static sequence visible.

Live computed-style inspection confirmed a `62s` linear, infinite `experience-stills-marquee` animation with non-zero rendered image boxes. The five descriptive images are loaded; the matching technical duplicates remain decorative for accessibility.
