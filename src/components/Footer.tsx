import { Github, Linkedin, Mail, ArrowUp, FileText } from "lucide-react";

const sections = [
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/alpha08-prog" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/atharva-agrawal-172421330/" },
  { icon: Mail, label: "Email", href: "mailto:agrawalatharva2004@gmail.com" },
  { icon: FileText, label: "Resume", href: "/resume.pdf" },
];

const stack = ["React", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion", "Vite"];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border bg-background pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand + tagline */}
          <div>
            <p className="font-mono font-bold text-sm tracking-widest text-neon-cyan mb-3">
              A<sup>2</sup>.DEV
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Full Stack Developer building scalable web apps and immersive 3D experiences.
            </p>
            <p className="text-xs text-muted-foreground/70 font-mono">
              Bengaluru, Karnataka · Open to opportunities
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-4">
              Sitemap
            </p>
            <ul className="space-y-2.5">
              {sections.map(({ label, href }) => (
                <li key={href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    className="text-sm font-mono text-muted-foreground hover:text-neon-cyan transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-4">
              Connect
            </p>
            <ul className="space-y-2.5">
              {socials.map(({ icon: Icon, label, href }) => {
                const isExternal = href.startsWith("http") || href.startsWith("mailto");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-neon-cyan transition-colors"
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Built with */}
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-3">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="text-xs font-mono px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border">
          <div>
            <p className="text-xs font-mono text-muted-foreground">
              <span className="text-neon-cyan">{"<"}</span>
              {"  Designed & Built by "}
              <span className="text-foreground font-semibold">Atharva Agrawal</span>
              {"  "}
              <span className="text-neon-cyan">{"/>"}</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1.5 font-mono">
              © {new Date().getFullYear()} · Your details are only used to reply to your message.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-neon-cyan border border-border hover:border-neon-cyan/40 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
