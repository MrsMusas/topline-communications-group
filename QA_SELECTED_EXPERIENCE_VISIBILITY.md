# Selected Experience Visibility QA

**Diagnosis date:** 18 August 2026

Live browser inspection confirmed that all five cleared photographs were present in the DOM, had non-zero layout dimensions, and used the correct asset URLs. Before correction, the `.experience-stills-grid` carried the generic `data-reveal` attribute. At the top of the page, its computed opacity was `0`, which could keep the photograph composition invisible until the reveal observer marked it visible.

The grid’s `data-reveal` attribute has been removed. In the live browser after scrolling to Selected Experience, the grid is visible and each photograph has loaded dimensions, a visible layout box, and a rendered image.

| Public descriptor | Rendered location within the composition |
| --- | --- |
| Full-room event scale | Large left-side anchor on desktop; full-width first image on mobile. |
| Venue arrival | Upper-right supporting image on desktop; right-hand second-row image on mobile. |
| Production and event setup | Middle-right supporting image on desktop; left-hand second-row image on mobile. |
| Outdoor event installation | Lower-left supporting image on desktop; left-hand final-row image on mobile. |
| Tablescape / hospitality detail | Wide lower-right image on desktop; right-hand final-row image on mobile. |
