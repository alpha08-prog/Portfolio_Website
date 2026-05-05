import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, FileText } from "lucide-react";

const navItems = [
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

const SECTION_IDS = ["contact", "experience", "skills", "projects", "about", "hero"] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection — iterate from bottom-most section up
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
            aria-label="Atharva Agrawal — back to top"
          >
            <Code2 size={22} />
            <span className="font-mono font-bold text-sm tracking-widest">A<sup>2</sup>.DEV</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className={`px-4 py-2 text-sm font-mono rounded-md transition-all duration-300 relative ${
                  activeSection === href
                    ? "text-neon-cyan"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md border border-neon-cyan/30 bg-neon-cyan/5"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          {/* Resume + Contact CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                // Dispatch a synthetic Ctrl+K so the global listener opens the palette.
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
              }}
              aria-label="Open command palette"
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-neon-cyan border border-border hover:border-neon-cyan/40 transition-all duration-300"
            >
              <span className="opacity-60">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground/80 border border-border text-[10px]">
                ⌘K
              </kbd>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-neon-cyan border border-border hover:border-neon-cyan/40 transition-all duration-300"
            >
              <FileText size={14} />
              Resume
            </a>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-neon px-5 py-2 rounded-md text-xs font-mono tracking-widest uppercase"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground hover:text-neon-cyan transition-colors p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-y-0 right-0 z-40 w-72 glass-strong flex flex-col pt-20 px-6 pb-8 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    type="button"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => scrollTo(href)}
                    className={`text-left px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                      activeSection === href
                        ? "text-neon-cyan border-neon border bg-neon-cyan/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-neon-cyan/50 mr-2">{"0" + (i + 1)}.</span>
                    {label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto space-y-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-mono text-sm tracking-wider uppercase text-muted-foreground hover:text-neon-cyan border border-border hover:border-neon-cyan/40 transition-all duration-300"
                >
                  <FileText size={14} />
                  Resume
                </a>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="btn-neon w-full py-3 rounded-lg font-mono text-sm tracking-wider uppercase"
                >
                  Let's Talk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
