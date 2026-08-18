/**
 * TLCG design note: a warm paper policy page that preserves Verdant Ledger’s
 * editorial hierarchy while keeping legal information readable and restrained.
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const sections = [
  ["What cookies are", "Cookies are small text files or similar technologies that may be stored on your browser or device when you visit a website. They can help a website remember preferences, support essential functionality and understand how visitors use pages."],
  ["Essential technologies", "Top Line Communications Group may use essential cookies or similar technologies needed for basic website functionality, security or the delivery of requested features. These are generally necessary for the website to operate."],
  ["Analytics and performance", "This website includes an analytics measurement script and may use analytics or performance technologies where configured to understand aggregate website usage and improve performance. This policy does not claim use of advertising cookies, Google Analytics, Meta Pixel or other tracking technology unless those services are specifically implemented and disclosed."],
  ["Managing cookies", "You can manage, delete or block cookies through your browser settings. Please note that blocking essential technologies may affect how some parts of a website function. Browser controls differ, so please refer to your browser’s help materials for instructions."],
  ["Updates to this policy", "We may update this Cookie Policy when the website or its technical configuration changes. The current version will be available on this page."],
] as const;

export default function CookiePolicy() {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" className="legal-back"><ArrowLeft size={16} /> Back to TLCG</Link><span>Top Line Communications Group</span></header>
      <article className="legal-paper">
        <span className="eyebrow">Legal information</span>
        <h1>Cookie<br /><em>Policy.</em></h1>
        <p className="legal-lead">This policy explains how Top Line Communications Group may use cookies and similar technologies on this website.</p>
        <div className="legal-meta"><span>Last updated: August 2026</span><span>Johannesburg, South Africa</span></div>
        {sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
        <section><h2>Contact us</h2><p>For questions about this policy, contact <a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a>.</p></section>
      </article>
    </main>
  );
}
