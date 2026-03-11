import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/alpha08-prog", handle: "@atharva08" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/atharva-agrawal-172421330/", handle: "in/atharva-agrawal" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/atharva_8904_/", handle: "@atharva_8904_" },
  { icon: Mail, label: "Email", href: "mailto:agrawalatharva2004@gmail.com", handle: "agrawalatharva2004@gmail.com" },
];

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Atharva",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all duration-300";

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 grid-bg">
      {/* Glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(var(--neon-cyan) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-cyan uppercase">
            {"// "}05. Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Let's{" "}
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border-neon bg-neon-cyan/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-16 h-16 rounded-full bg-neon-cyan/20 flex items-center justify-center mb-4"
                >
                  <Send size={24} className="text-neon-cyan" />
                </motion.div>
                <h3 className="text-xl font-bold text-neon-cyan mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 btn-neon px-6 py-2 rounded-lg text-sm font-mono"
                >
                  Send Another
                </button>
              </div>
            ) : status === "error" ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-red-500/30 bg-red-500/5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4"
                >
                  <Mail size={24} className="text-red-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Oops! Something went wrong.</h3>
                <p className="text-muted-foreground text-sm">
                  Couldn't send your message. Please try again or email me directly at{" "}
                  <a href="mailto:agrawalatharva2004@gmail.com" className="text-neon-cyan underline">
                    agrawalatharva2004@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 btn-neon px-6 py-2 rounded-lg text-sm font-mono"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-neon-solid w-full py-3.5 rounded-lg text-sm font-mono tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Info + Socials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-between gap-8"
          >
            {/* Quick info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "agrawalatharva2004@gmail.com", color: "#00ffff" },
                { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka", color: "#a855f7" },
                { icon: Phone, label: "Response Time", value: "Within 24 hours", color: "#3b82f6" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl border-neon bg-card/50">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Find me online
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href, handle }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-neon-cyan/30 bg-card/50 hover:bg-neon-cyan/5 transition-all duration-300 group"
                  >
                    <Icon size={16} className="text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 pt-8 border-t border-border text-center"
        >
          <p className="text-xs font-mono text-muted-foreground">
            <span className="text-neon-cyan">{"<"}</span>
            {"  Designed & Built by "}
            <span className="text-foreground font-semibold">Atharva Agrawal</span>
            {"  "}
            <span className="text-neon-cyan">{"/>"}</span>
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
            React · Three.js · TypeScript · Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
