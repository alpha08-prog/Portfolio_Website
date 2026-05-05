import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail, MapPin, Clock, AlertCircle, Check, Minus } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(80, { message: "Name is too long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message is too long" }),
  // Honeypot — must stay empty.
  website: z.string().max(0, { message: "Spam detected" }).optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/alpha08-prog", handle: "@alpha08-prog" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/atharva-agrawal-172421330/", handle: "in/atharva-agrawal" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/atharva_8904_/", handle: "@atharva_8904_" },
  { icon: Mail, label: "Email", href: "mailto:agrawalatharva2004@gmail.com", handle: "agrawalatharva2004@gmail.com" },
];

type Availability = "open" | "soon" | "closed";

const availability: { label: string; status: Availability; note?: string }[] = [
  { label: "Internships", status: "open", note: "remote / hybrid" },
  { label: "Full-time SWE", status: "soon", note: "from mid-2027" },
  { label: "Frontend / Full Stack roles", status: "open" },
  { label: "Hackathons & buildathons", status: "open", note: "always" },
  { label: "Open-source collaborations", status: "open" },
];

const STATUS_META: Record<Availability, { label: string; color: string; icon: typeof Check }> = {
  open: { label: "Open", color: "#22c55e", icon: Check },
  soon: { label: "Soon", color: "#f59e0b", icon: Clock },
  closed: { label: "Closed", color: "#6b7280", icon: Minus },
};

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const [sent, setSent] = useState(false);

  const onSubmit = async (data: ContactInput) => {
    // Honeypot — silently succeed without sending.
    if (data.website && data.website.trim() !== "") {
      setSent(true);
      reset();
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: "Atharva",
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      toast.success("Message sent!", {
        description: "I'll get back to you within 24 hours.",
      });
      reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Couldn't send your message", {
        description: "Please try again, or email me directly.",
      });
    }
  };

  const inputBase =
    "w-full bg-muted/50 border rounded-lg px-4 py-3 text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300";

  const inputState = (hasError: boolean) =>
    hasError
      ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/40"
      : "border-border focus-visible:border-neon-cyan/70 focus-visible:ring-neon-cyan/40";

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
            {"// "}06. Contact
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
            {sent && isSubmitSuccessful ? (
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
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 btn-neon px-6 py-2 rounded-lg text-sm font-mono"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot — hidden from real users; bots tend to fill every field. */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-err" : undefined}
                    className={`${inputBase} ${inputState(!!errors.name)}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="contact-name-err" className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-red-400">
                      <AlertCircle size={12} />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-err" : undefined}
                    className={`${inputBase} ${inputState(!!errors.email)}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="contact-email-err" className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-red-400">
                      <AlertCircle size={12} />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-err" : undefined}
                    className={`${inputBase} ${inputState(!!errors.message)} resize-none`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="contact-message-err" className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-red-400">
                      <AlertCircle size={12} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon-solid w-full py-3.5 rounded-lg text-sm font-mono tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
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
                { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "#3b82f6" },
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

            {/* Availability matrix */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Open to
              </p>
              <ul className="rounded-xl border border-border bg-card/50 divide-y divide-border overflow-hidden">
                {availability.map(({ label, status, note }) => {
                  const meta = STATUS_META[status];
                  const Icon = meta.icon;
                  return (
                    <li key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <p className="text-sm text-foreground truncate">{label}</p>
                        {note && (
                          <p className="text-[11px] text-muted-foreground/80 font-mono truncate">
                            {note}
                          </p>
                        )}
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider flex-shrink-0"
                        style={{
                          color: meta.color,
                          background: `${meta.color}15`,
                          border: `1px solid ${meta.color}40`,
                        }}
                      >
                        <Icon size={10} />
                        {meta.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
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
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
