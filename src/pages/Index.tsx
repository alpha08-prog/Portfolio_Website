import { useEffect, useRef, useState, type FormEvent } from "react";
import { Asterisk, Braces, Check, ChevronDown, Command, Copy, Cpu, Download, Github, Layers3, Linkedin, Menu, Plus, Search, Send, ShieldCheck, Workflow, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projects, experiences, skillGroups, EMAIL, GITHUB, LINKEDIN, type Project } from "@/lib/portfolio";
import "@/portfolio.css";

const filters = ["All work", "AI & ML", "Security"] as const;
const searchText = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const layers = [
  { name: "Applications", icon: Braces, tools: "React · TypeScript · React Native", description: "Thoughtful interfaces that make complex workflows feel simple.", code: "interface → experience" },
  { name: "Services", icon: Workflow, tools: "Node.js · FastAPI · PostgreSQL", description: "APIs, access control, and business logic that connect the pieces.", code: "request → reliable response" },
  { name: "Intelligence", icon: Cpu, tools: "Qwen · Whisper · RAG · Embeddings", description: "Local AI, voice pipelines, and answers grounded in evidence.", code: "data → understanding" },
  { name: "Infrastructure", icon: Layers3, tools: "Docker · Kubernetes · CI/CD", description: "The delivery pipelines and infrastructure behind the product.", code: "commit → deployment" },
];

function Architecture() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const LayerIcon = layers[active].icon;
  return <div className={`architecture ${paused ? "motion-paused" : ""}`}>
    <div className="architecture-top">
      <span className="micro">A SYSTEMS MINDSET</span>
      <button className="text-control" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Play motion" : "Pause motion"}</button>
    </div>
    <div className="system-map">
      <div className="map-orbit orbit-one" />
      <div className="map-orbit orbit-two" />
      <div className="map-cross cross-h" />
      <div className="map-cross cross-v" />
      <svg className="map-lines" viewBox="0 0 460 330" preserveAspectRatio="none" aria-hidden="true">
        <path d="M230 165 L105 70 M230 165 L360 85 M230 165 L100 255 M230 165 L355 260" />
        <circle r="4" className="signal signal-one" />
        <circle r="4" className="signal signal-two" />
      </svg>
      <div className="system-core">
        <Asterisk size={53} strokeWidth={1.2} />
        <span>BUILD WITH<br />PURPOSE.</span>
      </div>
      {layers.map(({ name, icon: Icon }, i) => <button key={name} className={`map-node node-${i} ${active === i ? "active" : ""}`} onClick={() => setActive(i)} aria-pressed={active === i}>
        <Icon size={19} />
        <span>{name}</span>
        <span className="node-light" />
      </button>)}
      <span className="map-coordinate">IDEA / SYSTEM / IMPACT</span>
    </div>
    <div className="system-readout" aria-live="polite">
      <div className="readout-label">
        <LayerIcon size={17} />
        <span>{layers[active].name}</span>
        <code>{layers[active].code}</code>
      </div>
      <p>{layers[active].description}</p>
      <span className="micro readout-tools">{layers[active].tools}</span>
    </div>
    <p className="map-hint">
      <span>+</span> Select a layer. Explore how I think.</p>
  </div>;
}

function ProjectVisual({ project }: { project: Project; }) {
  if (project.visual === "cloud") return <div className="project-visual cloud-visual" aria-hidden="true">
    <div className="mini-sidebar">
      <Asterisk size={22} />
      <i />
      <i />
      <i />
      <i />
    </div>
    <div className="mini-app">
      <div className="mini-app-header">
        <span>IsoLab<span className="mini-muted"> / Cloud Security</span>
        </span>
        <span className="mini-avatar">AA</span>
      </div>
      <div className="mini-greeting">Isolation, backed by evidence.</div>
      <div className="mini-stats">
        <div>
          <span>Configuration checks</span>
          <strong>30 checks</strong>
        </div>
        <div>
          <span>Measured pilot</span>
          <strong>160 runs</strong>
        </div>
        <div>
          <span>Test workloads</span>
          <strong>3 workloads</strong>
        </div>
      </div>
      <div className="mini-table">
        <div>CONTROL AREA <span>METHOD</span>
        </div>{[["Configuration posture", "Policy gates"], ["Resource isolation", "cgroup v2"], ["Runtime telemetry", "Engine events"]].map(([area, method]) => <div key={area}>{area}<span>
          <i /> {method}</span>
        </div>)}</div>
    </div>
    <span className="visual-caption">CLOUD SECURITY LAB / CONCEPT</span>
  </div>;
  if (project.visual === "scholar") return <div className="project-visual scholar-visual" aria-hidden="true">
    <div className="paper paper-back">
      <span>RESEARCH LIBRARY</span>
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
    <div className="scholar-phone">
      <div className="phone-island" />
      <div className="phone-brand">
        <Asterisk size={20} /> AI Scholar</div>
      <span className="phone-small">YOUR RESEARCH COMPANION</span>
      <h4>Less searching.<br />More discovering.</h4>
      <div className="phone-search">
        <Search size={12} /> Ask your papers</div>
      <div className="answer-card">
        <span>
          <Cpu size={13} /> Grounded in your research</span>
        <i />
        <i />
        <i />
        <div className="source-tag">Sources connected</div>
      </div>
      <div className="phone-tabs">
        <Search size={16} />
        <Layers3 size={16} />
        <Braces size={16} />
      </div>
    </div>
    <div className="rag-label">
      <span className="rag-dot" /> RETRIEVE<br />
      <span className="rag-dot" /> AUGMENT<br />
      <span className="rag-dot" /> GENERATE</div>
    <span className="visual-caption">MOBILE EXPERIENCE / CONCEPT</span>
  </div>;
  return <div className={`project-visual image-visual ${project.visual}`}>
    <img src={project.image} alt={`${project.title} application interface`} loading="lazy" width="1000" height="650" />
    <span className="image-sticker">
      <ShieldCheck size={16} />{project.category === "Security" ? "Security by design" : "From data to decisions"}</span>
  </div>;
}

function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); copyTimer.current = setTimeout(() => setCopied(false), 2500); }
    catch { setCopied(false); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    setState("sending");
    try {
      const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!service || !template || !key) throw new Error("Email is not configured");
      await emailjs.send(service, template, { from_name: String(data.get("name")).trim(), from_email: String(data.get("email")).trim(), message: String(data.get("message")).trim(), to_name: "Atharva" }, key);
      setState("sent"); form.reset();
    } catch { setState("error"); }
  }
  return <section id="contact" className="contact-section">
    <div className="section-shell">
      <div className="section-kicker">
        <span className="micro">HAVE SOMETHING IN MIND?</span>
        <Asterisk size={24} />
      </div>
      <div className="contact-grid">
        <div>
          <h2>Good things<br />start with<br />
            <em>a conversation.</em>
          </h2>
          <p>A challenging problem, an interesting idea, or a shared curiosity. Let's connect.</p>
          <div className="email-row">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={19} /> : <Copy size={19} />}</button>
          </div>
          <span className="copy-status" role="status">{copied ? "Email copied to clipboard" : ""}</span>
          <div className="contact-socials">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              <Linkedin size={17} /> LinkedIn</a>
            <a href="/resume.pdf" download="Atharva_Agrawal_Resume.pdf">
              <Download size={17} /> Résumé</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" placeholder="What should I call you?" required minLength={2} maxLength={80} autoComplete="name" />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" placeholder="you@company.com" required maxLength={254} autoComplete="email" />
          <label htmlFor="contact-message">What's on your mind?</label>
          <textarea id="contact-message" name="message" placeholder="Tell me a little about it…" required minLength={10} maxLength={2000} rows={3} />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button type="submit" className="button button-dark" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send a message"}<Send size={16} />
          </button>
          <p className="form-status" role="status">{state === "sent" ? "Message sent. Thanks for reaching out!" : state === "error" ? <>Message couldn't be sent. <a href={`mailto:${EMAIL}`}>Email me directly</a> and we'll take it from there.</> : "Your message goes straight to my inbox."}</p>
        </form>
      </div>
    </div>
  </section>;
}

export default function Index() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const commandTrigger = useRef<HTMLElement | null>(null);
  const commandResults = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!document.activeElement?.closest('[role="dialog"]')) {
          commandTrigger.current = document.activeElement as HTMLElement;
          setQuery("");
        }
        setCommandOpen(value => !value);
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => { window.removeEventListener("keydown", handler); observer.disconnect(); };
  }, []);
  const nav = [{ id: "projects", label: "Work" }, { id: "experience", label: "Experience" }, { id: "about", label: "About" }, { id: "contact", label: "Contact" }];
  const commands = [...nav.map(item => ({ label: item.label, href: `#${item.id}` })), { label: "Download résumé", href: "/resume.pdf" }, { label: "GitHub", href: GITHUB }, { label: "LinkedIn", href: LINKEDIN }, { label: "Email Atharva", href: `mailto:${EMAIL}` }].filter(item => searchText(`${item.label} ${item.href}`).includes(searchText(query.trim())));
  return <div className="portfolio">
    <a href="#projects" className="skip-to-content">Skip to content</a>
    <header className="site-header">
      <a href="#hero" className="wordmark" aria-label="Atharva Agrawal home">atharva<span className="wordmark-star">
        <Asterisk size={28} />
      </span>
      </a>
      <nav id="mobile-nav" aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>{nav.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === item.id ? "location" : undefined}>{item.label}</a>)}</nav>
      <div className="header-actions">
        <button className="command-button" onClick={event => { commandTrigger.current = event.currentTarget; setQuery(""); setCommandOpen(true); }} aria-label="Open quick navigation">
          <Command size={15} />
          <span>K</span>
        </button>
        <a className="header-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Download size={15} />
        </a>
        <button className="mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main>
      <section className="hero-section section-shell" id="hero">
        <div className="hero-topline">
          <span className="micro">ATHARVA AGRAWAL / SOFTWARE ENGINEER</span>
          <span className="micro hero-location">BENGALURU, INDIA · APPLIED AI & SYSTEMS</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Engineering<br />ideas into<br />
              <em>impact.</em>
              <span className="hero-asterisk" aria-hidden="true">✳</span>
            </h1>
            <p>I build the systems behind the experience.<br className="desktop-break" /> Applied AI, full-stack products, and the infrastructure that brings them to life.</p>
            <div className="hero-buttons">
              <a href="#projects" className="button button-lime">Explore my work <Plus size={19} />
              </a>
              <a href="/resume.pdf" className="hero-download" download="Atharva_Agrawal_Resume.pdf">
                <Download size={17} /> Download résumé</a>
            </div>
            <div className="hero-person">
              <img src="/profile.jpeg" alt="Atharva Agrawal" width={40} height={40} />
              <div>
                <strong>Curious by nature. Engineer by practice.</strong>
                <span>Data Science & AI · IIIT Dharwad</span>
              </div>
            </div>
          </div>
          <Architecture />
        </div>
        <div className="hero-bottom">
          <span className="micro">THINK IN SYSTEMS. BUILD FOR PEOPLE.</span>
          <a href="#projects" className="scroll-link">SCROLL TO EXPLORE <span className="scroll-track">
            <span />
          </span>
          </a>
        </div>
      </section>
      <div className="experience-strip">
        <div className="section-shell strip-inner">
          <span className="micro">EXPERIENCE ACROSS</span>
          <div className="company-name boeing">BOEING</div>
          <div className="company-name hal">HAL<span>Hindustan Aeronautics Limited</span>
          </div>
          <div className="company-name ministry">Government of India<span>Office of Union Minister Pralhad Joshi</span>
          </div>
        </div>
      </div>
      <section id="projects" className="work-section">
        <div className="section-shell">
          <div className="section-kicker">
            <span className="micro">SELECTED WORK</span>
            <span className="micro">A FEW THINGS I'VE BUILT</span>
          </div>
          <div className="section-heading">
            <h2>Different problems.<br />
              <em>Same curiosity.</em>
            </h2>
            <p>From everyday operations to intelligent tools.<br />A selection of systems built to do something useful.</p>
          </div>
          <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? "selected" : ""}>{item}{item === "All work" && <span>{projects.length}</span>}</button>)}</div>
          <div className="project-grid" aria-live="polite">{projects.filter(p => filter === "All work" || p.category === filter).map(project => <article className="project-card" key={project.title}>
            <button className="project-open" onClick={event => { projectTrigger.current = event.currentTarget; setSelected(project); }} aria-label={`Explore ${project.title}`}>
              <ProjectVisual project={project} />
              <div className="project-info">
                <div>
                  <span className="micro">{project.category} / {project.year}</span>
                  <h3>{project.title}</h3>
                </div>
                <span className="project-plus">
                  <Plus size={22} />
                </span>
              </div>
              <p className="project-summary">{project.summary}</p>
              <div className="project-tech">{project.tech.slice(0, 4).map(t => <span key={t}>{t}</span>)}</div>
            </button>
          </article>)}</div>
          <div className="work-bottom">
            <span>More experiments. More learning. Always building.</span>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              <Github size={17} /> Explore my GitHub</a>
          </div>
        </div>
      </section>
      <section id="experience" className="journey-section section-shell">
        <div className="section-kicker">
          <span className="micro">THE JOURNEY SO FAR</span>
          <span className="micro">LEARNING BY BUILDING</span>
        </div>
        <div className="journey-grid">
          <div className="journey-intro">
            <h2>Real teams.<br />Real challenges.<br />
              <em>Real growth.</em>
            </h2>
            <p>From on-device AI at Boeing to procurement at HAL and public-sector operations. I care about software that earns its place in the real world.</p>
            <a href="/resume.pdf" className="text-link" target="_blank" rel="noreferrer">The full story in my résumé <Download size={17} />
            </a>
            <div className="impact-note">
              <strong>~7s <span>to</span> ~1s</strong>
              <p>p95 page load for the Office Management System.</p>
            </div>
          </div>
          <div className="experience-list">{experiences.map((item, i) => <details className="experience-item" key={item.company} open={i === 0 || undefined}>
            <summary>
              <div className="experience-monogram" aria-hidden="true">{item.mark}</div>
              <div className="experience-title">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <span className="experience-period">{item.period}</span>
              </div>
              <ChevronDown size={19} />
            </summary>
            <div className="experience-detail">
              <p>{item.description}</p>
              <div className="experience-tags">{item.tech.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </details>)}</div>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="section-shell">
          <div className="section-kicker">
            <span className="micro">A LITTLE ABOUT ME</span>
            <span className="micro">BEYOND THE JOB TITLE</span>
          </div>
          <div className="about-grid">
            <div className="portrait-composition">
              <div className="portrait-frame">
                <img src="/profile.jpeg" alt="Atharva Agrawal outdoors" width={800} height={1000} loading="lazy" />
                <span className="portrait-label">ATHARVA AGRAWAL<br />
                  <span>ENGINEER. EXPLORER. BUILDER.</span>
                </span>
              </div>
              <div className="portrait-stamp" aria-hidden="true">
                <Asterisk size={50} strokeWidth={1} />
                <span>STAY<br />CURIOUS.</span>
              </div>
            </div>
            <div className="about-copy">
              <h2>The interesting part<br />is <em>connecting the dots.</em>
              </h2>
              <p>I'm Atharva, a Data Science and AI student at IIIT Dharwad, with a minor in Cybersecurity. I like taking a problem apart, understanding how the pieces fit, and building something that helps people get things done.</p>
              <p>My work spans local language models, voice pipelines, backend architecture, and full-stack applications. I care about the whole system: the interface someone uses, the logic underneath, and what happens when it reaches the real world.</p>
              <div className="education-note">
                <span className="micro">EDUCATION / AUG 2023 – MAY 2027 EXPECTED</span>
                <strong>B.Tech · Data Science & Artificial Intelligence</strong>
                <span>IIIT Dharwad · CPI 8.82/10 · Minor in Cybersecurity</span>
              </div>
              <div className="achievement-note">
                <strong>500+</strong>
                <span>LeetCode problems solved<br />1600+ contest rating</span>
                <span className="achievement-divider" />
                <strong>5★</strong>
                <span>C++ on HackerRank<br />SQL certified</span>
              </div>
            </div>
          </div>
          <div id="skills" className="skills-block">
            <div className="skills-intro">
              <span className="micro">MY TOOLKIT</span>
              <h3>The right tool.<br />For the right problem.</h3>
            </div>
            <div className="skills-grid">{skillGroups.map(({ title, tools, icon: Icon }) => <div className="skill-group" key={title}>
              <Icon size={21} />
              <h4>{title}</h4>
              <p>{tools.join(" · ")}</p>
            </div>)}</div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
    <footer className="site-footer section-shell">
      <a href="#hero" className="wordmark">atharva<Asterisk size={25} />
      </a>
      <span>Thoughtfully built. Always evolving.</span>
      <span>© {new Date().getFullYear()} Atharva Agrawal</span>
      <a href="#hero" className="back-top">Back to top <Plus size={16} />
      </a>
    </footer>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}>
      <DialogContent className="project-dialog" onCloseAutoFocus={event => { event.preventDefault(); projectTrigger.current?.focus(); }}>{selected && <>
        <span className="micro">{selected.category} / {selected.year}</span>
        <DialogTitle>{selected.title}</DialogTitle>
        <DialogDescription>{selected.summary}</DialogDescription>
        <ProjectVisual project={selected} />
        <h4>Inside the build</h4>
        <ul className="project-details">{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        <div className="project-tech">{selected.tech.map(t => <span key={t}>{t}</span>)}</div>
        <div className="dialog-links">
          <a href={selected.github} target="_blank" rel="noreferrer" className="button button-lime">
            <Github size={17} /> View source code</a>{selected.demo && <a href={selected.demo} target="_blank" rel="noreferrer" className="text-link">{selected.demoLabel}</a>}</div>
      </>}</DialogContent>
    </Dialog>
    <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
      <DialogContent className="quick-dialog" onCloseAutoFocus={event => { event.preventDefault(); commandTrigger.current?.focus(); }}>
        <DialogTitle>Where would you like to go?</DialogTitle>
        <DialogDescription>Quick navigation. Press Escape to close.</DialogDescription>
        <label className="quick-search">
          <Search size={18} />
          <input autoFocus aria-label="Search pages and links" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); commandResults.current?.querySelector<HTMLAnchorElement>("a")?.click(); } }} placeholder="Search work, résumé, contact…" />
        </label>
        <div className="quick-results" ref={commandResults}>{commands.map(item => <a key={item.label} href={item.href} onClick={() => setCommandOpen(false)} target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined} rel="noreferrer">{item.label}<Plus size={16} />
        </a>)}{commands.length === 0 && <p>No matches. Try “work” or “résumé”.</p>}</div>
      </DialogContent>
    </Dialog>
  </div>;
}
