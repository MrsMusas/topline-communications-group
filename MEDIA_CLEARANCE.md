# TLCG Media Clearance Register

**Status: public display disabled pending confirmation.** Do not enable the selected Experience media or publish a version that displays it until TLCG has confirmed permission for public website use.

| Selected asset | Intended experience use | Current public state | Clearance required |
| --- | --- | --- | --- |
| Victoria Falls aerial loop (`tlcg-victoria-falls-aerial-loop_3409f81b.mp4`) | Destination experience loop | Disabled | Public web-use permission for footage, property, and any applicable contributor rights. |
| Malaysia event-production still (`tlcg-malaysia-event-production_89c750ff.webp`) | Event-production detail | Disabled | Public web-use permission for the photograph and visible event details. |
| Malaysia tablescape still (`tlcg-malaysia-tablescape_a359f69a.webp`) | Hospitality detail | Disabled | Public web-use permission for the photograph and visible event materials. |

## Current safeguard

`client/src/pages/Home.tsx` retains the source references but sets `PUBLIC_MEDIA_CLEARANCE_CONFIRMED` to `false`. The media composition is therefore not rendered, and the production build does not emit the three selected asset URLs.

## Reinstatement only after clearance

After TLCG confirms public-use permission for all selected assets, change `PUBLIC_MEDIA_CLEARANCE_CONFIRMED` to `true`, repeat desktop and mobile QA, and save a new checkpoint before any publication decision.

This register is a project-control note, not a legal determination of rights or permissions.
