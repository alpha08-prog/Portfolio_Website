import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Replace these placeholder quotes with real recommendations from
 * internship managers, professors, or teammates. Each entry needs
 * { quote, name, role }. Avatars optional — fall back to initials.
 *
 * Even one real quote is more credible than three made-up ones,
 * so prune this list rather than padding with fluff.
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  accent?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Atharva owns problems end-to-end. He shipped the OMS prototype well ahead of schedule and pushed back thoughtfully on requirements that didn't make sense.",
    name: "Mentor — Office of the Hon'ble Union Minister",
    role: "Internship Supervisor",
    accent: "#00ffff",
  },
  {
    quote:
      "Strong product instincts paired with real engineering depth. The Schedula appointment flow handled multi-role access cleanly the first time.",
    name: "Engineering Lead",
    role: "PearlThoughts",
    accent: "#a855f7",
  },
  {
    quote:
      "Picks up new tooling fast and writes code that other people can actually maintain — rare for a student-stage engineer.",
    name: "Peer — Hackathon Team",
    role: "Buildathon Room 105",
    accent: "#3b82f6",
  },
];

function getInitials(name: string) {
  return name
    .replace(/[^A-Za-z\s—-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: testimonials.length > 1,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" ref={ref} className="relative py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--neon-magenta) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-magenta uppercase">
            {"// "}05. Endorsements
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            What People{" "}
            <span className="text-gradient">Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            From mentors, teammates, and collaborators across internships and hackathons.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => {
                const accent = t.accent ?? "hsl(var(--neon-cyan))";
                return (
                  <div
                    key={t.name + i}
                    className="flex-[0_0_100%] sm:flex-[0_0_85%] lg:flex-[0_0_70%] min-w-0 px-2"
                  >
                    <div
                      className="rounded-2xl border p-6 sm:p-8 h-full bg-card/50"
                      style={{
                        borderColor: `${accent}30`,
                        boxShadow: `inset 0 0 60px ${accent}08`,
                      }}
                    >
                      <Quote
                        size={28}
                        style={{ color: accent }}
                        className="mb-4 opacity-60"
                        aria-hidden="true"
                      />
                      <blockquote className="text-base sm:text-lg text-foreground leading-relaxed mb-6">
                        "{t.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        {t.avatar ? (
                          <img
                            src={t.avatar}
                            alt={t.name}
                            width={44}
                            height={44}
                            loading="lazy"
                            className="w-11 h-11 rounded-full object-cover border"
                            style={{ borderColor: `${accent}40` }}
                          />
                        ) : (
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                            style={{
                              background: `${accent}15`,
                              color: accent,
                              border: `1px solid ${accent}40`,
                            }}
                          >
                            {getInitials(t.name)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{t.name}</p>
                          <p className="text-xs text-muted-foreground font-mono truncate">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous testimonial"
                className="p-2 rounded-full border border-border hover:border-neon-cyan/40 text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pagination">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollTo(i)}
                    role="tab"
                    aria-selected={selected === i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selected === i ? "w-6 bg-neon-cyan" : "w-1.5 bg-muted"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next testimonial"
                className="p-2 rounded-full border border-border hover:border-neon-cyan/40 text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
