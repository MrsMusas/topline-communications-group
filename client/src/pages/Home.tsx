/**
 * TLCG design note: Verdant Ledger uses an asymmetric editorial procession,
 * protected official logo placement, ivory reading fields, and restrained gold lines.
 */
import { ArrowDownRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const OFFICIAL_LOGO = "/manus-storage/LogoGoldMonograme_c7731889.png";
const HERO_IMAGE = "/manus-storage/tlcg-hero-verdant_a29c23f4.jpg";
const EXPERIENCE_IMAGE = "/manus-storage/tlcg-experience-human_978593af.jpg";
const APPROACH_IMAGE = "/manus-storage/tlcg-approach-craft_ecb4a89e.jpg";

const navItems = [
  ["Capabilities", "capabilities"],
  ["Experience", "experience"],
  ["Approach", "approach"],
  ["Why TLCG", "why-tlcg"],
  ["Let’s Talk", "talk"],
] as const;

const capabilityItems = [
  { number: "01", name: "Communication Strategy", note: "Positioning, messaging and audience clarity." },
  { number: "02", name: "Live Experiences", note: "Moments designed for attention and connection." },
  { number: "03", name: "Creative Production", note: "Ideas made tangible with detail and pace." },
  { number: "04", name: "Campaign Activation", note: "Joined-up work that carries the message further." },
];

const approachSteps = [
  { number: "01", name: "Discover", detail: "Understand the business, audience and objectives." },
  { number: "02", name: "Strategise", detail: "Develop tailored strategies and solutions." },
  { number: "03", name: "Execute", detail: "Deliver with excellence and precision." },
  { number: "04", name: "Measure", detail: "Evaluate performance against objectives." },
  { number: "05", name: "Optimise", detail: "Improve through insight and innovation." },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openApproachStep, setOpenApproachStep] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 },
    );

    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const keepFormLocal = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <main id="home" className="site-shell">
      <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
        <a className="brand-mark" href="#home" onClick={() => setMenuOpen(false)} aria-label="TLCG — return to home">
          <img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => navigate(id)}>{label}</button>
          ))}
        </nav>

        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>

        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <span className="eyebrow">Navigate</span>
          {navItems.map(([label, id], index) => (
            <button key={id} type="button" onClick={() => navigate(id)}>
              <span>0{index + 1}</span>{label}<ArrowUpRight size={18} strokeWidth={1.4} />
            </button>
          ))}
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-topline" data-reveal>
            <span className="eyebrow">Top Line</span>
            <span className="gold-rule" />
            <span className="eyebrow">Communications Group</span>
          </div>
          <div className="hero-title-wrap" data-reveal>
            <p className="hero-kicker">TLCG / Strategic communications &amp; experiences</p>
            <h1 id="hero-title">Make the<br /><em>moment</em> matter.</h1>
          </div>
          <div className="hero-foot" data-reveal>
            <p>Strategic communications, live experience and creative production for moments with momentum.</p>
            <button type="button" className="round-link" onClick={() => scrollToSection("capabilities")} aria-label="Explore TLCG capabilities">
              <ArrowDownRight size={24} strokeWidth={1.3} />
            </button>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
      </section>

      <section id="capabilities" className="capabilities chapter section-light" aria-labelledby="capabilities-title">
        <div className="section-rail" data-reveal>
          <span className="eyebrow">01 — Capabilities</span>
          <span className="vertical-rule" />
        </div>
        <div className="capabilities-intro" data-reveal>
          <p className="section-deck">TLCG brings direction to the message, the moment and the way people remember both.</p>
          <h2 id="capabilities-title">The practical,<br /><em>made remarkable.</em></h2>
        </div>
        <div className="capability-list" data-reveal>
          {capabilityItems.map((item) => (
            <article className="capability-row" key={item.number}>
              <span className="capability-number">{item.number}</span>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
              <span className="row-arrow"><ArrowUpRight size={20} strokeWidth={1.2} /></span>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="experience chapter" aria-labelledby="experience-title">
        <div className="experience-image" style={{ backgroundImage: `url(${EXPERIENCE_IMAGE})` }} aria-hidden="true" />
        <div className="experience-overlay" aria-hidden="true" />
        <div className="experience-content">
          <div data-reveal>
            <span className="eyebrow eyebrow-light">02 — Experience</span>
            <h2 id="experience-title">Where strategy<br />becomes <em>presence.</em></h2>
          </div>
          <div className="experience-note" data-reveal>
            <span className="gold-rule" />
            <p>A visual archive for the people, messages and live moments that bring strategy into the room.</p>
          </div>
        </div>
        <div className="experience-caption" data-reveal>
          <span>Selected work / 01</span><span>Live experience</span>
        </div>
      </section>

      <section id="approach" className="approach chapter section-light" aria-labelledby="approach-title">
        <div className="approach-copy" data-reveal>
          <span className="eyebrow">03 — Approach</span>
          <h2 id="approach-title">A process with<br /><em>purpose in it.</em></h2>
          <p className="section-deck">Every engagement starts with listening, then moves with clear intention from first thought to final audience response.</p>
        </div>
        <div className="approach-visual" data-reveal>
          <img src={APPROACH_IMAGE} alt="Editorial planning materials arranged on a forest green table" />
          <span className="image-label">From brief to presence</span>
        </div>
        <ol className="approach-list" data-reveal>
          {approachSteps.map((step, index) => {
            const isOpen = openApproachStep === index;
            return (
              <li className={isOpen ? "is-open" : ""} key={step.name}>
                <button
                  type="button"
                  onClick={() => setOpenApproachStep((current) => current === index ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`approach-detail-${index}`}
                >
                  <span>{step.number}</span>
                  <strong>{step.name}</strong>
                  <Plus size={18} strokeWidth={1.2} />
                </button>
                <div className="approach-detail" id={`approach-detail-${index}`} aria-hidden={!isOpen}>
                  <p>{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section id="why-tlcg" className="why chapter" aria-labelledby="why-title">
        <div className="why-frame" data-reveal>
          <span className="eyebrow eyebrow-light">04 — Why TLCG</span>
          <h2 id="why-title">Built with<br /><em>discernment.</em></h2>
          <div className="why-placeholder">
            <span>What TLCG brings</span>
            <p>Strategic perspective&nbsp;&nbsp; / &nbsp;&nbsp;Human connection&nbsp;&nbsp; / &nbsp;&nbsp;Exacting delivery</p>
          </div>
        </div>
        <div className="why-ornament" aria-hidden="true"><span>T</span><i /></div>
      </section>

      <section id="talk" className="contact chapter section-light" aria-labelledby="contact-title">
        <div className="contact-intro" data-reveal>
          <span className="eyebrow">05 — Let’s Talk</span>
          <h2 id="contact-title">Start a considered<br /><em>conversation.</em></h2>
          <p className="section-deck">Share the situation, the audience or the moment you want to make matter.</p>
        </div>
        <form className="contact-form" onSubmit={keepFormLocal} data-reveal>
          <label><span>Name</span><input type="text" name="name" placeholder="Your name" /></label>
          <label><span>Organisation</span><input type="text" name="organisation" placeholder="Your organisation" /></label>
          <label><span>Email</span><input type="email" name="email" placeholder="you@organisation.com" /></label>
          <label><span>Phone</span><input type="tel" name="phone" placeholder="+27" /></label>
          <label className="message-field"><span>Message</span><textarea name="message" placeholder="Tell us what matters." rows={4} /></label>
          <button className="submit-link" type="submit">Send enquiry <ArrowUpRight size={20} strokeWidth={1.3} /></button>
        </form>
      </section>

      <footer className="site-footer">
        <a className="footer-logo" href="#home" aria-label="TLCG home"><img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" /></a>
        <div className="footer-statement"><span className="gold-rule" /> <p>Top Line Communications Group</p></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} TLCG</span><a href="#home">Back to top <ArrowUpRight size={14} strokeWidth={1.3} /></a></div>
      </footer>
    </main>
  );
}
