/**
 * TLCG design note: Verdant Ledger uses an asymmetric editorial procession,
 * protected official logo placement, ivory reading fields, and restrained gold lines.
 */
import { ArrowDownRight, ArrowUpRight, AtSign, BarChart3, CalendarDays, Globe2, MapPin, Menu, Phone, Plus, Presentation, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const OFFICIAL_LOGO = "/manus-storage/LogoGoldMonograme_c7731889.png";
const HERO_IMAGE = "/manus-storage/tlcg-hero-verdant_a29c23f4.jpg";
const EXPERIENCE_IMAGE = "/manus-storage/tlcg-experience-human_978593af.jpg";
const APPROACH_IMAGE = "/manus-storage/tlcg-approach-craft_ecb4a89e.jpg";
const EXPERIENCE_EVENT_STILLS = {
  scale: "/manus-storage/tlcg-malaysia-event-scale_be9e1a35.webp",
  production: "/manus-storage/tlcg-malaysia-event-production_0bda992c.webp",
  arrival: "/manus-storage/tlcg-malaysia-venue-arrival_0b897b23.webp",
  installation: "/manus-storage/tlcg-malaysia-outdoor-installation_09175222.webp",
  tablescape: "/manus-storage/tlcg-malaysia-tablescape-detail_a92bce09.webp",
};

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

const clientExperienceStatements = [
  { number: "01", title: "Clarity", summary: "A clearer path from challenge to action.", detail: "TLCG helps organisations make sense of complex marketing, communications and engagement challenges, turning insight into practical direction." },
  { number: "02", title: "Collaboration", summary: "A partner who works alongside your team.", detail: "We work collaboratively, becoming an extension of your team and bringing strategic thinking, practical expertise and trusted delivery together." },
  { number: "03", title: "Confidence", summary: "Confidence in the work and the way it gets delivered.", detail: "From strategy through execution, TLCG brings structure, experience and attention to detail so organisations can move forward with confidence." },
  { number: "04", title: "Connection", summary: "Work that connects people, messages and moments.", detail: "We connect strategy, communications, marketing and experiences so that every element works together and creates a stronger overall impact." },
  { number: "05", title: "Impact", summary: "Meaningful work designed to make a difference.", detail: "Every engagement is shaped around clear objectives, practical outcomes and work that creates lasting value for the organisation." },
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
    icon: Presentation,
    items: ["Marketing Strategy", "Corporate Communications", "Stakeholder Engagement", "Executive Messaging", "Brand Positioning", "Social Media Management"],
  },
  {
    title: "Marketing & Automation",
    icon: BarChart3,
    items: ["Digital Marketing", "Content Marketing", "AI Marketing Workflows", "Marketing Automation", "Customer Experience", "CRM Journeys"],
  },
  {
    title: "Programmes & Delivery",
    icon: CalendarDays,
    items: ["Conference Marketing", "Executive Events", "Product Launches", "Promotions & Recognition Programmes", "Project & Supplier Management", "Budget & Performance Reporting"],
  },
];

const industries = ["Corporate Organizations", "Professional Associations", "Financial Services", "Technology", "Education", "Healthcare", "Manufacturing", "Retail", "SMEs & Startups", "Non-Profit Organizations"];

const approachSteps = [
  {
    number: "01",
    name: "Discover",
    summary: "Understand your business, audience and objectives.",
    detail: "We begin by listening closely. We dig beneath the surface to understand your goals, your challenges, your audience and the context in which you operate. This gives us clarity and ensures every decision is intentional.",
  },
  {
    number: "02",
    name: "Strategise",
    summary: "Develop tailored strategies and solutions.",
    detail: "We turn insight into direction. We develop tailored strategies and solutions that align with your objectives and are built to deliver meaningful impact.",
  },
  {
    number: "03",
    name: "Execute",
    summary: "Deliver with excellence and precision.",
    detail: "We bring the plan to life with excellence and precision. Our experienced team and trusted partners deliver seamlessly, on time and at the highest standard.",
  },
  {
    number: "04",
    name: "Measure",
    summary: "Evaluate performance against objectives.",
    detail: "We evaluate performance against objectives using clear metrics and real insights. We track what matters to understand what’s working.",
  },
  {
    number: "05",
    name: "Optimise",
    summary: "Improve through insight and innovation.",
    detail: "We refine, learn and improve. Through insight and innovation, we enhance outcomes and create greater impact over time.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openApproachStep, setOpenApproachStep] = useState<number | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);
  const [selectedDifference, setSelectedDifference] = useState<number | null>(null);
  const [selectedClientStatement, setSelectedClientStatement] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
    const navigationNodes = document.querySelectorAll<HTMLElement>("main > section[id]");
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: 0.01 },
    );
    navigationNodes.forEach((node) => navigationObserver.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      navigationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    scrollToSection(id);
  };

  const sendEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = [
      ["Name", formData.get("name")],
      ["Organisation", formData.get("organisation")],
      ["Email", formData.get("email")],
      ["Phone", formData.get("phone")],
      ["Message", formData.get("message")],
    ];
    const body = fields.map(([label, value]) => `${label}: ${value || "—"}`).join("\n\n");
    window.location.href = `mailto:marketing@toplinecommunicationsgroup.co.za?subject=${encodeURIComponent("TLCG website enquiry")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="home" className="site-shell">
      <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="#home" onClick={() => setMenuOpen(false)} aria-label="TLCG — return to home">
          <span className="brand-mark"><img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" /></span>
          <span className="brand-copy">
            <strong>Top Line</strong>
            <span>Communications Group</span>
            <small>Strategic Marketing <i /> Communications <i /> Events</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button className={activeSection === id ? "is-active" : ""} key={id} type="button" onClick={() => navigate(id)}>{label}</button>
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
          <div className="hero-title-wrap" data-reveal>
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
                  className="capability-entry"
                  type="button"
                  onClick={() => setSelectedCapability(index)}
                  onMouseEnter={() => setSelectedCapability(index)}
                  onFocus={() => setSelectedCapability(index)}
                  aria-pressed={isSelected}
                  aria-label={`Highlight ${item.name}`}
                >
                  <span className="capability-number">{item.number}</span>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="experience chapter" aria-labelledby="experience-title">
        <div className="experience-image" style={{ backgroundImage: `url(${EXPERIENCE_IMAGE})` }} aria-hidden="true" />
        <div className="experience-overlay" aria-hidden="true" />
        <div className="experience-layout">
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
        </div>
        <div className="experience-caption" data-reveal><span>Selected experience</span><span>Marketing · communications · events</span></div>
        <div className="experience-stills" aria-label="Selected TLCG event photography">
          <div className="experience-stills-grid" data-reveal>
            <figure className="experience-still experience-still-scale">
              <img src={EXPERIENCE_EVENT_STILLS.scale} alt="Full TLCG event room prepared for guests" loading="lazy" />
            </figure>
            <figure className="experience-still experience-still-arrival">
              <img src={EXPERIENCE_EVENT_STILLS.arrival} alt="TLCG event venue arrival setting" loading="lazy" />
            </figure>
            <figure className="experience-still experience-still-production">
              <img src={EXPERIENCE_EVENT_STILLS.production} alt="TLCG event production and gifting preparations" loading="lazy" />
            </figure>
            <figure className="experience-still experience-still-installation">
              <img src={EXPERIENCE_EVENT_STILLS.installation} alt="TLCG outdoor event installation" loading="lazy" />
            </figure>
            <figure className="experience-still experience-still-tablescape">
              <img src={EXPERIENCE_EVENT_STILLS.tablescape} alt="TLCG event tablescape detail" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials chapter section-light" aria-labelledby="testimonials-title">
        <div className="testimonials-heading" data-reveal>
          <span className="eyebrow">03 — Beta Testimonials</span>
          <h2 id="testimonials-title">What Our<br /><em>Clients Say.</em></h2>
          <p className="section-deck">Trusted partnerships. Meaningful work. Lasting impact.</p>
        </div>
        <div className="client-statement-list" data-reveal aria-label="The experience of working with TLCG">
          {clientExperienceStatements.map((statement, index) => {
            const isSelected = selectedClientStatement === index;
            return (
              <article className={`client-statement ${isSelected ? "is-selected" : ""}`} key={statement.number}>
                <button
                  type="button"
                  onClick={() => setSelectedClientStatement(index)}
                  onMouseEnter={() => setSelectedClientStatement(index)}
                  onFocus={() => setSelectedClientStatement(index)}
                  aria-pressed={isSelected}
                  aria-label={`Highlight ${statement.title}`}
                >
                  <span className="client-statement-number">{statement.number}</span>
                  <h3>{statement.title}</h3>
                  <p className="client-statement-summary">{statement.summary}</p>
                  <p className="client-statement-detail">{statement.detail}</p>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="approach" className="approach chapter section-light" aria-labelledby="approach-title">
        <div className="approach-copy" data-reveal>
          <span className="eyebrow">04 — Approach</span>
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
          <span className="eyebrow eyebrow-light">05 — Why TLCG</span>
          <h2 id="why-title">The Top Line<br /><em>difference.</em></h2>
          <p className="why-supporting-label">Why Organizations Choose Us</p>
          <div className="why-difference-list">
            {differenceItems.map((item, index) => {
              const isSelected = selectedDifference === index;
              return (
              <button
                className={`why-difference-item ${isSelected ? "is-selected" : ""}`}
                key={item.number}
                type="button"
                onMouseEnter={() => setSelectedDifference(index)}
                onFocus={() => setSelectedDifference(index)}
                onClick={() => setSelectedDifference((current) => current === index ? null : index)}
                aria-pressed={isSelected}
                aria-label={`Reveal ${item.title}`}
              >
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
              </button>
              );
            })}
          </div>
          <div className="why-industries">
            <span>Industries we support</span>
            <p>{industries.map((industry) => <i className="industry-item" key={industry}>{industry}</i>)}</p>
          </div>
          <div className="expertise-ledger">
            <span className="eyebrow eyebrow-light">Where we add value</span>
            <div className="expertise-grid">
              {expertiseGroups.map((group) => (
                <div className="expertise-group" key={group.title}>
                  <div className="expertise-heading"><span className="expertise-icon"><group.icon size={21} strokeWidth={1.35} /></span><h3>{group.title}</h3></div>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="why-ornament" aria-hidden="true"><span>T</span><i /></div>
      </section>

      <section id="talk" className="contact chapter section-light" aria-labelledby="contact-title">
        <div className="contact-intro" data-reveal>
          <span className="eyebrow">06 — Let’s Talk</span>
          <h2 id="contact-title">Let’s Start the<br /><em>Conversation.</em></h2>
          <div className="contact-copy"><p>Whether you&apos;re launching a new brand, planning a high-impact event, strengthening stakeholder engagement or modernizing your marketing strategy, we&apos;re ready to partner with you.</p><p>We believe the best results come from strong relationships, strategic thinking and flawless execution. We&apos;d welcome the opportunity to learn more about your organization and explore how we can help you achieve your objectives.</p></div>
          <address className="contact-details">
            <div className="contact-detail contact-person"><UserRound size={18} strokeWidth={1.35} /><div><strong>Hellery Musas</strong><span>Managing Director | Principal Consultant</span><span>Top Line Communications Group</span></div></div>
            <div className="contact-detail"><Phone size={18} strokeWidth={1.35} /><a href="tel:+27837626871">+27 83 762 6871</a></div>
            <div className="contact-detail"><AtSign size={18} strokeWidth={1.35} /><div><a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a><a href="mailto:marketing@toplinecommunicationsgroup.co.za">marketing@toplinecommunicationsgroup.co.za</a></div></div>
            <div className="contact-detail"><Globe2 size={18} strokeWidth={1.35} /><span>toplinecommunicationsgroup.co.za</span></div>
            <div className="contact-detail"><MapPin size={18} strokeWidth={1.35} /><span>Johannesburg, South Africa</span></div>
          </address>
        </div>
        <form className="contact-form" onSubmit={sendEnquiry} data-reveal>
          <label><span>Name</span><input type="text" name="name" placeholder="Your name" required /></label>
          <label><span>Organisation</span><input type="text" name="organisation" placeholder="Your organisation" /></label>
          <label><span>Email</span><input type="email" name="email" placeholder="you@email.com" required /></label>
          <label><span>Phone</span><input type="tel" name="phone" placeholder="+27" /></label>
          <label className="message-field"><span>Message</span><textarea name="message" placeholder="Tell us what matters." rows={4} required /></label>
          <button className="submit-link" type="submit">Send enquiry <ArrowUpRight size={20} strokeWidth={1.3} /></button>
        </form>
      </section>

      <section className="closing-statement section-light" aria-labelledby="closing-statement-title">
        <div className="closing-statement-inner" data-reveal>
          <span className="eyebrow">Top Line Communications Group</span>
          <span className="gold-rule" />
          <blockquote id="closing-statement-title">We don&apos;t just execute marketing. We help organizations communicate with clarity, build brands with purpose and create experiences that people remember.<br /><span>Because every great business deserves <em>a story worth telling.</em></span></blockquote>
        </div>
      </section>

      <div className="experience-marquee" data-reveal aria-label="Selected TLCG experience organisations">
        <div className="experience-marquee-track">
          {[...experienceItems, ...experienceItems].map((item, index) => (
            <span className="experience-marquee-item" key={`${item.name}-${index}`}>
              {item.name}<i aria-hidden="true">•</i>
            </span>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <a className="footer-logo" href="#home" aria-label="TLCG home"><img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" /></a>
        <div className="footer-meta"><span>© {new Date().getFullYear()} TLCG</span><span className="footer-policies"><a href="/privacy-policy">Privacy Policy</a><i aria-hidden="true">|</i><a href="/cookie-policy">Cookie Policy</a></span><a href="#home">Back to top <ArrowUpRight size={14} strokeWidth={1.3} /></a></div>
      </footer>
    </main>
  );
}
