import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

type Category = "AI/ML" | "Cybersec" | "DevOps" | "Full Stack" | "Mobile" | "Networks";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  cover?: string; // Optional path to a screenshot in public/. Falls back to procedural cover.
  accent: string;
  featured?: boolean;
  year: string;
  role: string;
  status: "Live" | "Shipped" | "Archived" | "In progress";
  category: Category;
  outcomes?: string[];
};

const projects: Project[] = [
  {
    title: "OpsFlow",
    description:
      "A production-ready full-stack platform that streamlines and modernizes office operations, administrative tasks, and management workflows.",
    tech: ["React.js", "Express.js", "TypeScript", "PostgreSQL", "Jenkins", "Docker"],
    github: "https://github.com/alpha08-prog/Ops_Flow",
    accent: "#00ffff",
    featured: true,
    year: "2025",
    role: "Solo build",
    status: "In progress",
    category: "Full Stack",
    outcomes: ["3+ admin modules", "Dockerized CI via Jenkins"],
  },
  {
    title: "AI Scholar",
    description:
      "A RAG framework for research-paper question answering — search, summarize, and cross-reference papers from a single mobile interface.",
    tech: ["React Native", "Firebase", "RAG", "Python", "AWS"],
    github: "https://github.com/alpha08-prog/AI-Scholar",
    demo: "https://drive.google.com/file/d/1SgHN49c0P5W3EmVsCPcTXfBjBo9Kb4b2/view",
    accent: "#a855f7",
    featured: true,
    year: "2025",
    role: "Solo build",
    status: "Shipped",
    category: "AI/ML",
    outcomes: ["RAG pipeline on AWS", "Native mobile UX"],
  },
  {
    title: "Kubernetes Attack Path Analyzer",
    description:
      "A graph-based tool that identifies hidden privilege escalation routes, blast radius zones, and chokepoints in K8s clusters using classical algorithms and AI threat narratives.",
    tech: ["React", "FastAPI", "Kubernetes", "Python", "Docker"],
    github: "https://github.com/alpha08-prog/Kubenetes-Attack-Path-Analyzer",
    accent: "#3b82f6",
    year: "2025",
    role: "Solo build",
    status: "Shipped",
    category: "Cybersec",
    outcomes: ["Graph-based path analysis", "AI-narrated threat reports"],
  },
  {
    title: "CyberSaviour",
    description:
      "An agentic AI Security Operations Center that turns overwhelming security telemetry into actionable intelligence and immersive analyst workflows.",
    tech: ["React", "TypeScript", "Three.js", "Python"],
    github: "https://github.com/alpha08-prog/Buildathon_Room_105",
    accent: "#00ffff",
    year: "2025",
    role: "Hackathon team",
    status: "Shipped",
    category: "Cybersec",
    outcomes: ["Buildathon submission", "Immersive 3D SOC dashboard"],
  },
  {
    title: "EEG Mental Arithmetic Classification",
    description:
      "An end-to-end MLOps project classifying EEG signals to gauge mental arithmetic performance, with a React frontend and FastAPI backend.",
    tech: ["React.js", "FastAPI", "Scikit-learn", "Docker", "GitHub Actions", "AWS"],
    github: "https://github.com/alpha08-prog/ML_Project",
    accent: "#ec4899",
    year: "2025",
    role: "Solo build",
    status: "Shipped",
    category: "AI/ML",
    outcomes: ["CI/CD via GitHub Actions", "Containerized inference"],
  },
  {
    title: "Decentralized LAN Comms Suite",
    description:
      "A fully decentralized communication system built using Computer Communication Networks (CCN) primitives — peer discovery, messaging, and file transfer over LAN.",
    tech: ["React.js", "Socket.IO", "Express.js", "Node.js", "IndexedDB"],
    github: "https://github.com/alpha08-prog/Networks",
    accent: "#22c55e",
    year: "2024",
    role: "Solo build",
    status: "Archived",
    category: "Networks",
    outcomes: ["Peer-to-peer messaging", "No central server"],
  },
];

const CATEGORIES: ("All" | Category)[] = ["All", "Full Stack", "AI/ML", "Cybersec", "DevOps", "Mobile", "Networks"];

// Procedural cover — used when no screenshot is provided yet.
function ProceduralCover({ project }: { project: Project }) {
  // Extract a 2-3 letter glyph (e.g., "OpsFlow" → "OF", "AI Scholar" → "AI")
  const glyph = project.title
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${project.accent}30 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, ${project.accent}20 0%, transparent 50%), linear-gradient(135deg, hsl(230 25% 8%) 0%, hsl(230 30% 4%) 100%)`,
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${project.accent}30 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      {/* Subtle scan line */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.accent}08 2px, ${project.accent}08 4px)`,
        }}
      />
      {/* Big glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-mono font-bold text-7xl sm:text-8xl tracking-tighter select-none"
          style={{
            color: project.accent,
            textShadow: `0 0 40px ${project.accent}60, 0 0 80px ${project.accent}30`,
            opacity: 0.85,
          }}
        >
          {glyph}
        </span>
      </div>
      {/* Corner mark */}
      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase opacity-50" style={{ color: project.accent }}>
        {"// "}{project.category}
      </div>
      {/* Edge fade for crispness against card */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(230 20% 6%) 100%)" }}
      />
    </div>
  );
}

const STATUS_STYLE: Record<Project["status"], string> = {
  Live: "text-neon-green",
  Shipped: "text-neon-cyan",
  "In progress": "text-yellow-400",
  Archived: "text-muted-foreground",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.06, layout: { duration: 0.4 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border transition-[border-color,box-shadow,transform] duration-500 overflow-hidden cursor-default flex flex-col"
      style={{
        borderColor: hovered ? `${project.accent}40` : "hsl(var(--border))",
        background: "hsl(230 20% 6%)",
        boxShadow: hovered
          ? `0 0 30px ${project.accent}15, inset 0 0 30px ${project.accent}05`
          : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.cover ? (
          <img
            src={project.cover}
            alt={`${project.title} cover`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]">
            <ProceduralCover project={project} />
          </div>
        )}
        {project.featured && (
          <span
            className="absolute top-3 right-3 text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full backdrop-blur-sm"
            style={{
              background: `${project.accent}20`,
              color: project.accent,
              border: `1px solid ${project.accent}50`,
            }}
          >
            ★ Featured
          </span>
        )}
      </div>

      {/* Top color bar */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
            : "transparent",
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
            >
              <Code2 size={16} style={{ color: project.accent }} />
            </div>
            <h3
              className="text-lg font-bold transition-colors duration-300 truncate"
              style={{ color: hovered ? project.accent : "hsl(var(--foreground))" }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -m-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${project.title} — GitHub repository`}
            >
              <Github size={16} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 -m-1 text-muted-foreground transition-colors"
                style={{ color: hovered ? project.accent : undefined }}
                aria-label={`${project.title} — Live demo`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>{project.year}</span>
          <span className="opacity-30">·</span>
          <span>{project.role}</span>
          <span className="opacity-30">·</span>
          <span className={STATUS_STYLE[project.status]}>● {project.status}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

        {/* Outcomes (if any) */}
        {project.outcomes && project.outcomes.length > 0 && (
          <ul className="mb-4 space-y-1">
            {project.outcomes.map((o) => (
              <li key={o} className="text-xs text-muted-foreground/90 flex items-start gap-2">
                <span style={{ color: project.accent }} className="mt-0.5">→</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-1 rounded transition-colors duration-300"
              style={{
                background: hovered ? `${project.accent}10` : "hsl(var(--muted))",
                color: hovered ? project.accent : "hsl(var(--muted-foreground))",
                border: `1px solid ${hovered ? project.accent + "30" : "transparent"}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<"All" | Category>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  // Hide categories that have no entries
  const availableCategories = useMemo(
    () => CATEGORIES.filter((c) => c === "All" || projects.some((p) => p.category === c)),
    []
  );

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--neon-purple) / 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-purple uppercase">
            {"// "}02. Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Things I've{" "}
            <span className="text-gradient">Built</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From cybersecurity AI agents to MLOps pipelines, decentralized networks, and full-stack platforms.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {availableCategories.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-colors duration-300 ${
                  active ? "text-neon-cyan" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-neon-cyan/40 bg-neon-cyan/5"
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state — should rarely render but defensive */}
        {visible.length === 0 && (
          <p className="text-center text-muted-foreground font-mono text-sm mt-10">
            No projects in this category yet.
          </p>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/alpha08-prog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-neon px-6 py-3 rounded-lg text-sm font-mono"
          >
            <Github size={16} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
