# TLCG Production Domain Audit

## Read-only Vercel findings

On 19 August 2026, the signed-in Vercel team **Topline Events** was inspected without making any configuration change. The team dashboard shows no deployed projects. Its Domains view shows an empty domain list, so neither `toplinecommunicationsgroup.co.za` nor `www.toplinecommunicationsgroup.co.za` is currently attached to this Vercel team.

No deployment was created, no domain was added, and no DNS or email record was viewed, changed, removed, or replaced during this inspection.

## Vercel DNS requirement status

Vercel’s documented workflow requires an apex domain to use an A record and a `www` subdomain to use a CNAME record. It also states that the exact values must be taken from the domain card for the specific project: recent projects may receive a project-specific anycast address and CNAME target. The generic apex value is often `76.76.21.21`, but it is **not** a safe substitute for the future TLCG project’s displayed requirement.

Because the Topline Events team currently has no Vercel project and no attached domain, there is no TLCG project domain card and therefore no project-specific Vercel A-record or CNAME value to apply. The domain must first be attached to the intended project in a future, explicitly authorised Vercel setup step; only then will Vercel display the authoritative values.

Sources: Vercel, “Adding & Configuring a Custom Domain” and “Can I use my domain on Vercel with A records?”.

## Public DNS findings

The public apex currently resolves through two A records: `76.223.105.230` and `13.248.243.5`. The `www` host aliases the apex and therefore resolves to the same addresses. These are existing website-routing records and would conflict with a future Vercel A record and Vercel-provided `www` CNAME target; they remain unchanged.

The active nameservers are `ns41.domaincontrol.com` and `ns42.domaincontrol.com`, so the existing external DNS provider—not Vercel—remains authoritative. The following email-related records were confirmed and must remain untouched: the ImprovMX MX records (`mx1.improvmx.com` and `mx2.improvmx.com`), the existing SPF TXT record, and the Brevo verification TXT record. No apex AAAA or CAA record was returned by the public lookup.

No DNS modification was performed. The future website-only cutover must be limited to the apex A record(s) and `www` CNAME after the intended Vercel project displays its specific target values. It must not alter MX, TXT, NS, or email-provider records.

## Future connection sequence — do not action without explicit approval

1. Import or create the intended TLCG Vercel project from `MrsMusas/topline-communications-group` and deploy it. This audit did **not** perform that action.
2. In that project’s **Settings → Domains**, add `toplinecommunicationsgroup.co.za`; accept the optional `www.toplinecommunicationsgroup.co.za` companion if Vercel offers it.
3. Copy the project domain card’s exact apex A-record value and `www` CNAME target. The domain card is the source of truth; do not substitute a generic public Vercel value.
4. At the existing DNS provider, replace only the current website-routing apex A records and the `www` alias with the exact Vercel values. Do not transfer nameservers to Vercel.
5. Preserve the existing ImprovMX MX records, SPF TXT record, Brevo verification TXT record, all other email authentication records, and the current external nameservers unchanged.
6. After propagation, wait for Vercel to mark the domain configuration valid and provision TLS. Configure the preferred primary domain and redirect only inside the Vercel project.

References: [Vercel — Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain); [Vercel — A Record and CAA with Vercel](https://vercel.com/kb/guide/a-record-and-caa-with-vercel).
