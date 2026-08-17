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
  { number: "01", name: "Brand & Strategy", note: "Helping organizations build stronger brands, launch campaigns and improve customer engagement." },
  { number: "02", name: "Corporate Communications", note: "Internal communications, stakeholder messaging, executive messaging, PR and thought leadership." },
  { number: "03", name: "Events & Experiences", note: "End-to-end event strategy, planning, communications and execution." },
  { number: "04", name: "Digital Marketing", note: "Content strategy, LinkedIn, social media campaigns, AI-powered workflows and marketing automation." },
  { number: "05", name: "Customer Engagement", note: "Customer experience, CRM journeys, onboarding campaigns and retention communications." },
  { number: "06", name: "Fractional Leadership", note: "Supporting organizations that need senior marketing expertise without hiring a full-time executive." },
];

const experienceItems = [
  { name: "FESPA", descriptor: "Profit for Purpose" },
  { name: "doTERRA Africa", descriptor: "Africa" },
  { name: "Amway", descriptor: "Global FMCG" },
  { name: "HRG Rennies Travel", descriptor: "Corporate Travel" },
  { name: "NYDA", descriptor: "National Youth Development Agency" },
  { name: "South African Express Airways", descriptor: "" },
  { name: "Avon Justine", descriptor: "Beauty & Direct Sales" },
  { name: "Avroy Shlain", descriptor: "True To You" },
];

const differenceItems = [
  { number: "01", title: "Strategic Thinking", detail: "We align marketing and communication strategies with business objectives." },
  { number: "02", title: "Measurable Results", detail: "Every recommendation is designed to create meaningful business impact." },
  { number: "03", title: "20+ Years of Corporate Experience", detail: "Supporting respected organizations across multiple industries." },
  { number: "04", title: "AI-Enabled Delivery", detail: "We combine human expertise with AI-powered workflows to improve efficiency and accelerate execution." },
  { number: "05", title: "Flexible Engagement Models", detail: "Project-based consulting, retainer partnerships, fractional leadership and event support." },
  { number: "06", title: "Trusted Partnership", detail: "We become an extension of your team, delivering practical solutions that create lasting value." },
];

const expertiseGroups = [
  {
    title: "Strategy & Communications",
    items: ["Marketing Strategy", "Corporate Communications", "Stakeholder Engagement", "Executive Messaging", "Brand Positioning", "Social Media Management"],
  },
  {
    title: "Marketing & Automation",
    items: ["Digital Marketing", "Content Marketing", "AI Marketing Workflows", "Marketing Automation", "Customer Experience", "CRM Journeys"],
  },
  {
    title: "Programmes & Delivery",
    items: ["Conference Marketing", "Executive Events", "Product Launches", "Promotions & Recognition Programmes", "Project & Supplier Management", "Budget & Performance Reporting"],
  },
];

const industries = ["Corporate Organizations", "Professional Associations", "Financial Services", "Technology", "Education", "Healthcare", "Manufacturing", "Retail", "SMEs & Startups", "Non-Profit Organizations"];

const approachSteps = [
  {
    number: "01",
    name: "Discover",
    summary: "Understand the business, audience and objectives.",
    detail: "Understand your business, audience and objectives.",
  },
  {
    number: "02",
    name: "Strategise",
    summary: "Develop tailored strategies and solutions.",
    detail: "Develop tailored strategies and solutions.",
  },
  {
    number: "03",
    name: "Execute",
    summary: "Deliver with excellence and precision.",
    detail: "Deliver with excellence and precision.",
  },
  {
    number: "04",
    name: "Measure",
    summary: "Evaluate performance against objectives.",
    detail: "Evaluate performance against objectives.",
  },
  {
    number: "05",
    name: "Optimise",
    summary: "Improve through insight and innovation.",
    detail: "Improve through insight and innovation.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openApproachStep, setOpenApproachStep] = useState<number | null>(null);
  const [selectedCapability, setSelectedCapability] = useState(0);

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
            <p className="hero-kicker">Strategic marketing · communications · events</p>
            <h1 id="hero-title" className="home-positioning">Helping organizations<br />build stronger brands,<br /><em>communicate with confidence,</em><br />and deliver exceptional experiences.</h1>
          </div>
          <div className="hero-foot" data-reveal>
            <p>A strategic marketing, communications and events consultancy driving meaningful engagement and measurable results.</p>
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
          {capabilityItems.map((item, index) => {
            const isSelected = selectedCapability === index;
            return (
              <article className={`capability-row ${isSelected ? "is-selected" : ""}`} key={item.number}>
                <button
                  className="capability-trigger"
                  type="button"
                  onClick={() => setSelectedCapability(index)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${item.name}`}
                >
                  <span className="capability-number">{item.number}</span>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                  <span className="row-arrow"><ArrowUpRight size={20} strokeWidth={1.2} /></span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="experience chapter" aria-labelledby="experience-title">
        <div className="experience-image" style={{ backgroundImage: `url(${EXPERIENCE_IMAGE})` }} aria-hidden="true" />
        <div className="experience-overlay" aria-hidden="true" />
        <div className="experience-content">
          <div data-reveal>
            <span className="eyebrow eyebrow-light">02 — Selected Experience</span>
            <h2 id="experience-title">Two decades of<br /><em>trusted delivery.</em></h2>
          </div>
          <div className="experience-note" data-reveal>
            <span className="gold-rule" />
            <p>Over the past two decades, our leadership has contributed to marketing, communications and event initiatives across respected national and international organizations.</p>
          </div>
        </div>
        <div className="experience-roster" data-reveal aria-label="Selected TLCG experience">
          {experienceItems.map((item) => (
            <div className="experience-item" key={item.name}>
              <strong>{item.name}</strong>
              {item.descriptor ? <span>{item.descriptor}</span> : null}
            </div>
          ))}
        </div>
        <div className="experience-caption" data-reveal><span>Selected experience</span><span>Marketing · communications · events</span></div>
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
                  <span className="approach-number">{step.number}</span>
                  <strong>{step.name}</strong>
                  <span className="approach-summary">{step.summary}</span>
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
          <h2 id="why-title">The Top Line<br /><em>difference.</em></h2>
          <div className="why-difference-list">
            {differenceItems.map((item) => (
              <article className="why-difference-item" key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
              </article>
            ))}
          </div>
          <div className="why-industries">
            <span>Industries we support</span>
            <p>{industries.join(" · ")}</p>
          </div>
          <div className="expertise-ledger">
            <span className="eyebrow eyebrow-light">Where we add value</span>
            <div className="expertise-grid">
              {expertiseGroups.map((group) => (
                <div className="expertise-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="why-ornament" aria-hidden="true"><span>T</span><i /></div>
      </section>

      <section id="talk" className="contact chapter section-light" aria-labelledby="contact-title">
        <div className="contact-intro" data-reveal>
          <span className="eyebrow">05 — Let’s Talk</span>
          <h2 id="contact-title">Let’s Start The<br /><em>Conversation.</em></h2>
          <div className="contact-copy">
            <p>Whether you’re launching a new brand, planning a high-impact event, strengthening stakeholder engagement or modernizing your marketing strategy, Top Line Communications Group (Pty) Ltd is ready to partner with you.</p>
            <p>We believe the best results come from strong relationships, strategic thinking and flawless execution. We’d welcome the opportunity to learn more about your organization and explore how we can help you achieve your objectives.</p>
          </div>
        </div>
        <div className="contact-side" data-reveal>
          <address className="contact-details">
            <strong>Hellery Musas</strong>
            <span>Managing Director | Principal Consultant</span>
            <span>Top Line Communications Group (Pty) Ltd</span>
            <a href="tel:+27837626871">+27 83 762 6871</a>
            <a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a>
            <span>toplinecommunicationsgroup.co.za</span>
            <span>Johannesburg, South Africa</span>
          </address>
          <form className="contact-form" onSubmit={keepFormLocal}>
            <label><span>Name</span><input type="text" name="name" placeholder="Your name" /></label>
            <label><span>Organisation</span><input type="text" name="organisation" placeholder="Your organisation" /></label>
            <label><span>Email</span><input type="email" name="email" placeholder="you@organisation.com" /></label>
            <label><span>Phone</span><input type="tel" name="phone" placeholder="+27" /></label>
            <label className="message-field"><span>Message</span><textarea name="message" placeholder="Tell us what matters." rows={4} /></label>
            <button className="submit-link" type="submit">Send enquiry <ArrowUpRight size={20} strokeWidth={1.3} /></button>
          </form>
          <blockquote className="contact-quote">“We don’t just execute marketing. We help organizations communicate with clarity, build brands with purpose and create experiences that people remember. Because every great business deserves a story worth telling.”</blockquote>
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-logo" href="#home" aria-label="TLCG home"><img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" /></a>
        <div className="footer-statement"><span className="gold-rule" /> <p>Top Line Communications Group</p></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} TLCG</span><a href="#home">Back to top <ArrowUpRight size={14} strokeWidth={1.3} /></a></div>
      </footer>
    </main>
  );
}
