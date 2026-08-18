/**
 * TLCG design note: a warm paper policy page that preserves Verdant Ledger’s
 * editorial hierarchy while keeping legal information readable and restrained.
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const sections = [
  ["What cookies are", "Cookies are small text files or similar technologies that a website or service can store on your browser or device. Websites may use them to support functionality, remember preferences, measure performance or personalise advertising."],
  ["TLCG’s current cookie position", "The current TLCG website configuration does not identify any first-party cookies set by TLCG’s page code for account access, saved preferences, advertising, social-media tracking or marketing. The website does not offer user accounts, shopping functions, newsletter sign-up or a cookie-consent banner because no non-essential cookies have been identified in the current configuration."],
  ["Essential and functional technology", "TLCG may use standard technical services necessary to display and secure the website, such as hosting, content delivery and form functionality. The current site does not identify a user-facing functional cookie set by TLCG for these purposes. If a future feature needs an essential cookie, this policy will be updated to explain it."],
  ["Analytics and performance", "The website loads a privacy-focused Umami analytics measurement script to understand aggregate usage and improve website performance. The current implementation does not identify a cookie set by TLCG’s page code for this measurement. The analytics implementation is not configured as Google Analytics, Meta Pixel, Hotjar, an advertising cookie, a marketing cookie or a social-media tracking tool. It may still process limited technical and usage information as described in the Privacy Policy."],
  ["Third-party technologies", "The website uses technical providers to host and deliver the site, provide analytics measurement and load web fonts. TLCG does not currently embed third-party advertising, social-media plug-ins or remarketing tools. A provider may handle standard technical connection data under its own applicable terms when your browser requests those services; TLCG will update this policy if its implementation changes materially."],
  ["Managing cookies", "You can manage, delete or block cookies through your browser settings. Browser controls differ, so please refer to your browser’s help materials for instructions. Because the current site does not identify non-essential TLCG cookies, changing browser cookie settings should not prevent you from viewing its main content, although some browser or service-level functions may behave differently."],
  ["Updates to this policy", "We may update this Cookie Policy when the website or its technical configuration changes. The current version will be available on this page with a revised date."],
] as const;

export default function CookiePolicy() {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" className="legal-back"><ArrowLeft size={16} /> Back to TLCG</Link><span>Top Line Communications Group</span></header>
      <article className="legal-paper">
        <span className="eyebrow">Legal information</span>
        <h1>Cookie<br /><em>Policy.</em></h1>
        <p className="legal-lead">This policy explains the current, limited use of cookies and similar technologies on the Top Line Communications Group website.</p>
        <div className="legal-meta"><span>Last updated: August 2026</span><span>Johannesburg, South Africa</span></div>
        {sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
        <section><h2>Contact us</h2><p>For questions about this policy, contact Top Line Communications Group at <a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a> or <a href="mailto:marketing@toplinecommunicationsgroup.co.za">marketing@toplinecommunicationsgroup.co.za</a>. TLCG is based in Johannesburg, South Africa.</p></section>
      </article>
    </main>
  );
}
