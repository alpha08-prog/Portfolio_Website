import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Full Stack Engineer",
    company: "TechVenture Labs",
    location: "San Francisco, CA",
    period: "2022 – Present",
    description:
      "Led development of a microservices-based SaaS platform serving 50k+ users. Architected real-time features using WebSockets and Redis pub/sub. Reduced API latency by 40% through query optimization and caching strategies.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    accent: "#00ffff",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Nexus Digital Agency",
    location: "New York, NY",
    period: "2020 – 2022",
    description:
      "Built interactive marketing platforms and e-commerce solutions for Fortune 500 clients. Delivered 15+ projects on time with a focus on performance and accessibility. Introduced Three.js into the tech stack for immersive product showcases.",
    tech: ["React", "TypeScript", "Three.js", "GraphQL", "MongoDB"],
    accent: "#a855f7",
  },
  {
    type: "work",
    title: "Frontend Developer",
    company: "Startup Foundry",
    location: "Remote",
    period: "2019 – 2020",
    description:
      "Developed responsive web applications with React and TypeScript. Implemented design systems and component libraries used across 5+ products. Contributed to open-source tooling used by 1000+ developers.",
    tech: ["React", "TypeScript", "Styled Components", "Jest"],
    accent: "#3b82f6",
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    company: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2015 – 2019",
    description:
      "Focused on algorithms, distributed systems, and computer graphics. Senior thesis on real-time WebGL rendering optimizations. Graduated with honors.",
    tech: ["Algorithms", "Computer Graphics", "Distributed Systems"],
    accent: "#f59e0b",
  },
];

function TimelineItem({
  item,
  index,
  isInView,
  isLast,
}: {
  item: (typeof experiences)[0];
  index: number;
  isInView: boolean;
  isLast: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-x-6 mb-0">
      {/* Left content */}
      <div className={`pb-12 ${isLeft ? "text-right" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            className="rounded-xl border p-5 ml-auto border-neon-hover"
            style={{
              background: "hsl(230 20% 6%)",
              borderColor: "hsl(var(--border))",
              maxWidth: "360px",
            }}
          >
            <ItemContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Center timeline */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.1 + index * 0.15, duration: 0.4, type: "spring" }}
          className="w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0"
          style={{
            borderColor: item.accent,
            background: `${item.accent}15`,
            boxShadow: `0 0 15px ${item.accent}40`,
          }}
        >
          {item.type === "work" ? (
            <Briefcase size={14} style={{ color: item.accent }} />
          ) : (
            <GraduationCap size={14} style={{ color: item.accent }} />
          )}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
            className="w-0.5 flex-1 origin-top"
            style={{ background: `linear-gradient(to bottom, ${item.accent}40, transparent)`, minHeight: "60px" }}
          />
        )}
      </div>

      {/* Right content */}
      <div className={`pb-12 ${!isLeft ? "" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            className="rounded-xl border p-5 border-neon-hover"
            style={{
              background: "hsl(230 20% 6%)",
              borderColor: "hsl(var(--border))",
              maxWidth: "360px",
            }}
          >
            <ItemContent item={item} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ItemContent({ item }: { item: (typeof experiences)[0] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{
            background: `${item.accent}15`,
            color: item.accent,
            border: `1px solid ${item.accent}30`,
          }}
        >
          {item.type === "work" ? "Work" : "Education"}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={10} />
          {item.period}
        </span>
      </div>
      <h3 className="font-bold text-base text-foreground mb-0.5">{item.title}</h3>
      <p className="text-sm font-semibold mb-0.5" style={{ color: item.accent }}>
        {item.company}
      </p>
      <p className="text-xs text-muted-foreground mb-3">{item.location}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Mobile version (stacked)
function MobileTimeline({ item, index, isInView }: { item: (typeof experiences)[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      className="relative pl-10 pb-10"
    >
      {/* Vertical line */}
      <div
        className="absolute left-4 top-5 bottom-0 w-0.5"
        style={{ background: `linear-gradient(to bottom, ${item.accent}60, transparent)` }}
      />
      {/* Dot */}
      <div
        className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
        style={{
          borderColor: item.accent,
          background: `${item.accent}15`,
          boxShadow: `0 0 10px ${item.accent}40`,
        }}
      >
        {item.type === "work" ? (
          <Briefcase size={12} style={{ color: item.accent }} />
        ) : (
          <GraduationCap size={12} style={{ color: item.accent }} />
        )}
      </div>

      <div
        className="rounded-xl border p-5 border-neon-hover"
        style={{ background: "hsl(230 20% 6%)" }}
      >
        <ItemContent item={item} />
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-magenta uppercase">
            {"// "}04. Experience
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            My{" "}
            <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          {experiences.map((item, i) => (
            <TimelineItem
              key={item.title}
              item={item}
              index={i}
              isInView={isInView}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden">
          {experiences.map((item, i) => (
            <MobileTimeline key={item.title} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
