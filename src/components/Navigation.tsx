import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const navItems = [
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["hero", "about", "projects", "skills", "experience", "contact"];
      for (const id of sections.reverse()) {
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
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
          >
            <Code2 size={22} />
            <span className="font-mono font-bold text-sm tracking-widest">AM.DEV</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => (
              <button
                key={href}
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

          {/* Hire me CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-neon px-5 py-2 rounded-md text-xs font-mono tracking-widest uppercase"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground hover:text-neon-cyan transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
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
            <div className="mt-auto">
              <button
                onClick={() => scrollTo("contact")}
                className="btn-neon w-full py-3 rounded-lg font-mono text-sm tracking-wider uppercase"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
