/**
 * TLCG design note: a warm paper policy page that preserves Verdant Ledger’s
 * editorial hierarchy while keeping legal information readable and restrained.
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const sections = [
  ["What we collect", "We may collect the information you choose to provide through the Let’s Talk form, including your name, organisation, email address, phone number and message. We may also receive limited technical and usage information generated when you visit the website."],
  ["How form information is handled", "When you submit the Let’s Talk form, the information you enter is prepared in an email message addressed to Top Line Communications Group. Please do not include sensitive information unless it is necessary for your enquiry."],
  ["Why we use information", "We use personal information to respond to enquiries, understand the nature of a requested engagement, maintain professional communications and improve the relevance and reliability of this website."],
  ["Storage and protection", "We take reasonable steps to protect personal information against unauthorised access, loss, misuse or disclosure. Information is retained only for as long as reasonably necessary for the purpose for which it was collected or as required by applicable law."],
  ["Sharing information", "We do not sell personal information. We may share information with trusted service providers or professional advisers where this is reasonably necessary to operate the website, respond to an enquiry or comply with legal obligations. We will only do so where appropriate safeguards apply."],
  ["Analytics and technical information", "The website includes an analytics measurement script and may process limited technical information, such as pages viewed, browser type, device information and approximate usage patterns, to understand website performance. This policy does not claim use of advertising pixels or specific third-party tracking services where they are not identified here."],
  ["Cookies", "This website may use essential cookies or similar technologies needed for basic functionality and may use analytics or performance technologies where configured. Please read our Cookie Policy for further information."],
  ["Your rights", "Subject to applicable law, including the Protection of Personal Information Act, 2013 (POPIA), you may request access to, correction of or deletion of your personal information, object to certain processing, or ask questions about how your information is handled."],
  ["Policy updates", "We may update this Privacy Policy from time to time to reflect changes to the website or applicable requirements. The current version will be published on this page."],
] as const;

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" className="legal-back"><ArrowLeft size={16} /> Back to TLCG</Link><span>Top Line Communications Group</span></header>
      <article className="legal-paper">
        <span className="eyebrow">Legal information</span>
        <h1>Privacy<br /><em>Policy.</em></h1>
        <p className="legal-lead">Top Line Communications Group is committed to handling personal information responsibly and in accordance with applicable South African privacy requirements.</p>
        <div className="legal-meta"><span>Last updated: August 2026</span><span>Johannesburg, South Africa</span></div>
        {sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
        <section><h2>Contact us</h2><p>For questions about this policy or personal information, contact Top Line Communications Group at <a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a>.</p></section>
      </article>
    </main>
  );
}
