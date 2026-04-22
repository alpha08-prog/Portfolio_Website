import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
 
  {
    title: "AI Scholar",
    description:
      "AI-Scholar: A RAG Framework for Research Paper Question Answering.",
    tech: ["React-Native", "Firebase", "RAG", "Python", "AWS"],
    github: "https://github.com/alpha08-prog/AI-Scholar",
    demo: "https://drive.google.com/file/d/1SgHN49c0P5W3EmVsCPcTXfBjBo9Kb4b2/view",
    color: "purple",
    accent: "#a855f7",
    featured: true,
  },
  {
    title: "Kubernetes Attack Path Analyzer",
    description:
      "A comprehensive graph-based attack path analysis tool that identifies hidden privilege escalation routes, blast radius zones, and critical chokepoints in Kubernetes clusters using classical graph algorithms and AI-powered threat narratives.",
    tech: ["React", "FastAPI", "Kubernetes", "Python", "Docker",],
    github: "https://github.com/alpha08-prog/Kubenetes-Attack-Path-Analyzer",
    color: "blue",
    accent: "#3b82f6",
    featured: false,
  },
  {
    title: "Decentralized LAN Communication Suite",
    description:
      "This project is a fully decentralized communication system built using Computer Communication Networks (CCN) concepts.",
    tech: ["React.js", "Socket.IO", "Express.js", "Node.js", "Metadata storage utilities"],
    github: "https://github.com/alpha08-prog/Networks",
    color: "green",
    accent: "#22c55e",
    featured: false,
  },
  {
    title: "EEG Mental Arithmetic Classification (MlOps)",
    description:
      "A complete machine learning project for classifying EEG signals to determine mental arithmetic task performance quality, featuring a modern React frontend and FastAPI backend.",
    tech: ["React.js", "FastAPI", "Scikit-learn", "Docker","GitHub Actions","AWS"],
    github: "https://github.com/alpha08-prog/ML_Project",
    color: "magenta",
    accent: "#ec4899",
    featured: false,
  },
  {
    title: "CyberSaviour(Agentic AI for SOCs)",
    description:
      "CyberSaviour is an agentic AI-powered Security Operations Center (SOC) designed to transform overwhelming security data into actionable intelligence and immersive workflows.",
    tech: ["React", "TypeScript", "Three.js","Python"],
    github: "https://github.com/alpha08-prog/Buildathon_Room_105",
    color: "cyan",
    accent: "#00ffff",
    featured: false,
  },
   {
    title: "OpsFlow",
    description:
      "A comprehensive, production-ready full-stack application designed to streamline and modernize office operations, administrative tasks, and management workflows.",
    tech: ["React.js", "Express.js", "TypeScript", "PostgreSQL", "Jenkins", "Docker"],
    github: "https://github.com/alpha08-prog/Ops_Flow",
    color: "cyan",
    accent: "#00ffff",
    featured: true,
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border transition-all duration-500 overflow-hidden cursor-default"
      style={{
        borderColor: hovered ? `${project.accent}40` : "hsl(var(--border))",
        background: "hsl(230 20% 6%)",
        boxShadow: hovered
          ? `0 0 30px ${project.accent}15, inset 0 0 30px ${project.accent}05`
          : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top color bar */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
            : "transparent",
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
            >
              <Code2 size={16} style={{ color: project.accent }} />
            </div>
            {project.featured && (
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: `${project.accent}15`,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={project.demo}
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground transition-colors p-1"
              style={{ color: hovered ? project.accent : undefined }}
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? project.accent : "hsl(var(--foreground))" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
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
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-widest text-neon-purple uppercase">
            {"// "}02. Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">
            Things I've{" "}
            <span className="text-gradient">Built</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A selection of projects that showcase my technical range, from AI platforms to Full Stack Applications.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
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
