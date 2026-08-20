/**
 * TLCG design note: Verdant Ledger uses an asymmetric editorial procession,
 * protected official logo placement, ivory reading fields, and restrained gold lines.
 */
import { ArrowDownRight, ArrowUpRight, AtSign, BarChart3, CalendarDays, Globe2, MapPin, Menu, Phone, Presentation, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { navigationSections, sectionIdForPath } from "@/lib/sectionRoutes";

const OFFICIAL_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/CMKVmvzbobMUWdwK.png";
const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/hjlQJwXnVXFrcXAm.jpg";
const EXPERIENCE_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/wvHcqRowqmanLuPG.jpg";
const APPROACH_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/edvaYkuYCtsIVwKf.png";
const CONTACT_PORTRAIT = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/lPROkyXuwCVoDjYz.png";
const EXPERIENCE_EVENT_STILLS = [
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/DWThBqyzjEAtlGIm.webp", alt: "Corporate event experience: full-room scale prepared for guests" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/QvjyLSxyuqOWRRno.webp", alt: "Event production and gifting preparation for a corporate experience" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/eRUYkqiNDMuPIuCZ.webp", alt: "Venue arrival and guest experience setting" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/FVqlKVUpkDrKjecv.webp", alt: "Outdoor event installation and guest experience" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663898775121/zatrSfitRkjAAkln.webp", alt: "Hospitality detail for an event experience" },
];

const capabilityItems = [
  { number: "01", name: "Marketing", note: "Help organisations build visibility, communicate their value and connect with the right audiences." },
  { number: "02", name: "Communications", note: "Help organisations communicate clearly, consistently and strategically with the people who matter." },
  { number: "03", name: "Events & Experiences", note: "Plan and execute corporate events, launches, awards, incentives and experiences that achieve a clear purpose." },
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
  { number: "01", title: "Connected Thinking", detail: "We bring strategy, communication and experience together around the outcome that matters." },
  { number: "02", title: "Corporate Fluency", detail: "We understand the audiences, stakeholders and practical demands that shape corporate work." },
  { number: "03", title: "2+ Decades of Experience", detail: "Practical experience across marketing, communications, events and meaningful corporate experiences." },
  { number: "04", title: "From Plan to Presence", detail: "We take an idea from early direction through detailed planning to confident execution." },
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

type EnquiryState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);
  const [selectedDifference, setSelectedDifference] = useState<number | null>(null);
  const [selectedClientStatement, setSelectedClientStatement] = useState(0);
  const [selectedAboutBelief, setSelectedAboutBelief] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [enquiryState, setEnquiryState] = useState<EnquiryState>({ status: "idle" });
  const pendingNavigationTarget = useRef<string | null>(null);

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

  useEffect(() => {
    const pendingTarget = pendingNavigationTarget.current;
    pendingNavigationTarget.current = null;

    // The root route starts at the approved About TLCG hero. Navigation to the
    // About section still uses a pending target and retains its existing scroll.
    if (!pendingTarget && location === "/") {
      const frame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const sectionId = pendingTarget ?? sectionIdForPath(location);
    if (!sectionId) return;

    let secondFrame: number | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        scrollToSection(sectionId, pendingTarget ? "smooth" : "auto");
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [location]);

  const navigate = (id: string, path: string) => {
    setMenuOpen(false);
    setActiveSection(id);
    if (location === path) {
      scrollToSection(id);
      return;
    }

    pendingNavigationTarget.current = id;
    setLocation(path);
  };

  const sendEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enquiryState.status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) ?? "");
    setEnquiryState({ status: "sending" });

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          organisation: value("organisation"),
          email: value("email"),
          phone: value("phone"),
          message: value("message"),
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "We could not send your enquiry just now. Please try again shortly.");
      }

      form.reset();
      setEnquiryState({ status: "success" });
    } catch (error) {
      setEnquiryState({
        status: "error",
        message: error instanceof Error ? error.message : "We could not send your enquiry just now. Please try again shortly.",
      });
    }
  };

  return (
    <main id="home" className="site-shell">
      <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
        <a className="brand-lockup" href="/" onClick={(event) => { event.preventDefault(); setMenuOpen(false); setLocation("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="TLCG — return to home">
          <span className="brand-mark"><img src={OFFICIAL_LOGO} alt="Official TLCG gold monogram" /></span>
          <span className="brand-copy">
            <strong>Top Line</strong>
            <span>Communications Group</span>
            <small>Strategic Marketing <i /> Communications <i /> Events</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigationSections.map(({ label, id, path }) => (
            <button className={activeSection === id ? "is-active" : ""} key={id} type="button" onClick={() => navigate(id, path)}>{label}</button>
          ))}
        </nav>

        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>

        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <span className="eyebrow">Navigate</span>
          {navigationSections.map(({ label, id, path }, index) => (
            <button key={id} type="button" onClick={() => navigate(id, path)}>
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
            <h1 id="hero-title" className="home-positioning">Strategy.<br />Communication.<br /><em>Experience.</em><br />Impact.</h1>
          </div>
          <div className="hero-foot" data-reveal>
            <p>For organisations that need to communicate with clarity, create experiences with purpose and move people — and business — forward.</p>
            <button type="button" className="round-link" onClick={() => navigate("about-tlcg", "/")} aria-label="Explore TLCG">
              <ArrowDownRight size={24} strokeWidth={1.3} />
            </button>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
      </section>

      <section id="about-tlcg" className="about chapter section-light" aria-labelledby="about-title">
        <div className="about-intro">
          <span className="eyebrow">About TLCG</span>
          <h2 id="about-title">More than two decades,<br /><em>made useful.</em></h2>
          <span className="gold-rule" />
        </div>
        <div className="about-narrative">
          <p className="about-paragraph-reveal" data-reveal style={{ "--about-delay": "0ms" } as React.CSSProperties}>For more than two decades, Top Line Communications Group has helped organisations connect strategy, communication and experience around work that needs to move people — and business — forward.</p>
          <p className="about-paragraph-reveal" data-reveal style={{ "--about-delay": "110ms" } as React.CSSProperties}>Our practical experience spans marketing, corporate communications, launches, awards, corporate and social events, incentive programmes, travel and brand experiences.</p>
          <p className="about-paragraph-reveal" data-reveal style={{ "--about-delay": "220ms" } as React.CSSProperties}>We understand corporate environments, build trusted client relationships and take ideas from early direction through planning to hands-on execution.</p>
          <strong>Strategy. Communication. Experience. Impact.</strong>
        </div>
        <div className="about-principles" data-reveal>
          <span className="eyebrow">What we believe</span>
          {[
            { title: "Good communication should be clear.", detail: "We believe communication works best when the message is clear, purposeful and relevant to the people it needs to reach." },
            { title: "Good strategy should be useful.", detail: "Good thinking is only valuable when it can be translated into practical, measurable work." },
            { title: "Good experiences should be remembered.", detail: "Whether it is a campaign, corporate event or audience experience, the details matter — because they shape how people feel, engage and remember." },
          ].map((belief, index) => {
            const isActive = selectedAboutBelief === index;
            return <button className={`about-belief ${isActive ? "is-active" : ""}`} key={belief.title} type="button" onMouseEnter={() => setSelectedAboutBelief(index)} onFocus={() => setSelectedAboutBelief(index)} onClick={() => setSelectedAboutBelief(index)} aria-expanded={isActive} aria-controls={`about-belief-detail-${index}`}><h3>{belief.title}</h3><p id={`about-belief-detail-${index}`}>{belief.detail}</p></button>;
          })}
          <div className="about-approach-note"><span>Clarify → Connect → Activate</span><p>We clarify what needs to be understood, connect the people and messages that matter, then activate the work with purpose and care.</p><strong>Strategy. Communication. Experience. Impact.</strong></div>
        </div>
      </section>

      <section id="capabilities" className="capabilities chapter section-light" aria-labelledby="capabilities-title">
        <div className="section-rail" data-reveal>
          <span className="eyebrow">Capabilities</span>
          <span className="vertical-rule" />
        </div>
        <div className="capabilities-intro" data-reveal>
          <p className="section-deck">TLCG connects the message, the moment and the experience around a clear purpose.</p>
          <h2 id="capabilities-title">Three connected<br /><em>capabilities.</em></h2>
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
              <span className="eyebrow eyebrow-light">Selected Experience</span>
              <h2 id="experience-title">Over two decades of<br /><em>making experiences matter.</em></h2>
            </div>
            <div className="experience-note" data-reveal>
              <span className="gold-rule" />
              <p>For more than two decades, TLCG has brought strategy, communications and delivery together across marketing, corporate events, social events, launches, awards, incentive programmes, travel and corporate experiences.</p>
            </div>
          </div>
        </div>
        <div className="experience-caption" data-reveal><span>Evidence in action</span><span>Corporate experiences · events · incentive travel</span></div>
        <div className="experience-stills" aria-label="Selected TLCG event photography">
          <div className="experience-stills-viewport">
            <div className="experience-stills-track">
              {[0, 1].map((sequenceIndex) => (
                <div className="experience-stills-sequence" aria-hidden={sequenceIndex === 1} key={sequenceIndex}>
                  {EXPERIENCE_EVENT_STILLS.map((still) => (
                    <figure className="experience-still" key={`${sequenceIndex}-${still.src}`}>
                      <img src={still.src} alt={sequenceIndex === 0 ? still.alt : ""} loading="lazy" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials chapter section-light" aria-labelledby="testimonials-title">
        <div className="testimonials-heading" data-reveal>
          <span className="eyebrow">03 — Perspectives</span>
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
          <span className="eyebrow">Approach</span>
          <h2 id="approach-title">A process with<br /><em>purpose in it.</em></h2>
          <p className="section-deck">Every engagement starts with listening, then moves with clear intention from first thought to final audience response.</p>
        </div>
        <div className="approach-visual" data-reveal>
          <img src={APPROACH_IMAGE} alt="Editorial planning materials arranged on a forest green table" />
          <span className="image-label">From brief to presence</span>
        </div>
      </section>

      <section id="why-tlcg" className="why chapter" aria-labelledby="why-title">
        <div className="why-frame" data-reveal>
          <span className="eyebrow eyebrow-light">Why TLCG</span>
          <h2 id="why-title">Experience you can<br /><em>put to work.</em></h2>
          <p className="why-supporting-label">What more than two decades makes possible</p>
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

      <section id="insights" className="insights chapter section-light" aria-labelledby="insights-title">
        <div className="section-rail" data-reveal>
          <span className="eyebrow">TLCG Insights</span>
          <span className="vertical-rule" />
        </div>
        <div className="insights-intro" data-reveal>
          <h2 id="insights-title">Ideas for the<br /><em>work ahead.</em></h2>
          <p className="section-deck">A future space for practical thinking on the messages, moments and experiences that help organisations move forward.</p>
          <p className="insights-status">Insights platform in development.</p>
        </div>
        <div className="insights-topics" data-reveal aria-label="Future TLCG Insights topics">
          {[
            ["Marketing & brand", "Making value clear to the audiences that matter."],
            ["Business communication", "Communicating with clarity across teams and stakeholders."],
            ["Corporate events", "Creating experiences with a clear purpose."],
            ["Incentive travel", "Designing meaningful experiences beyond the itinerary."],
          ].map(([topic, description]) => <article className="insights-topic" key={topic}><h3>{topic}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section id="talk" className="contact chapter section-light" aria-labelledby="contact-title">
        <div className="contact-intro" data-reveal>
          <span className="eyebrow">Let’s Talk</span>
          <h2 id="contact-title">Let&apos;s talk about your<br /><em>next project.</em></h2>
          <div className="contact-copy"><p>Whether you&apos;re launching a brand, planning a corporate experience, strengthening stakeholder engagement or shaping a communications programme, we&apos;re ready to talk.</p><p>Tell us what needs to move forward. We&apos;ll bring strategic thinking, practical experience and hands-on delivery to the conversation.</p></div>
          <address className="contact-details">
            <div className="contact-detail contact-person"><UserRound size={18} strokeWidth={1.35} /><div><strong>Hellery Musas</strong><span>Managing Director | Principal Consultant</span><span>Top Line Communications Group</span></div></div>
            <div className="contact-detail"><Phone size={18} strokeWidth={1.35} /><a href="tel:+27837626871">+27 83 762 6871</a></div>
            <div className="contact-detail"><AtSign size={18} strokeWidth={1.35} /><div><a href="mailto:hellery@toplinecommunicationsgroup.co.za">hellery@toplinecommunicationsgroup.co.za</a><a href="mailto:marketing@toplinecommunicationsgroup.co.za">marketing@toplinecommunicationsgroup.co.za</a></div></div>
            <div className="contact-detail"><Globe2 size={18} strokeWidth={1.35} /><span>toplinecommunicationsgroup.co.za</span></div>
            <div className="contact-detail"><MapPin size={18} strokeWidth={1.35} /><span>Johannesburg, South Africa</span></div>
          </address>
        </div>
        <figure className="contact-portrait" data-reveal>
          <img src={CONTACT_PORTRAIT} alt="Hellery Musas, Managing Director and Principal Consultant of TLCG" />
        </figure>
        <form className="contact-form" onSubmit={sendEnquiry} data-reveal aria-busy={enquiryState.status === "sending"}>
          <label><span>Name</span><input type="text" name="name" placeholder="Your name" required /></label>
          <label><span>Organisation</span><input type="text" name="organisation" placeholder="Your organisation" /></label>
          <label><span>Email</span><input type="email" name="email" placeholder="you@email.com" required /></label>
          <label><span>Phone</span><input type="tel" name="phone" placeholder="+27" /></label>
          <label className="message-field"><span>Message</span><textarea name="message" placeholder="Tell us what matters." rows={4} required /></label>
          <button className="submit-link" type="submit" disabled={enquiryState.status === "sending"}>{enquiryState.status === "sending" ? "Sending enquiry…" : "Send enquiry"} <ArrowUpRight size={20} strokeWidth={1.3} /></button>
          {enquiryState.status === "success" && <p className="contact-form-status is-success" role="status" aria-live="polite">Thank you — your enquiry has been sent. TLCG will be in touch shortly.</p>}
          {enquiryState.status === "error" && <p className="contact-form-status is-error" role="alert">{enquiryState.message}</p>}
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
