import { Braces, Cpu, Database, Layers3 } from "lucide-react";

export const EMAIL = "agrawalatharva2004@gmail.com";
export const GITHUB = "https://github.com/alpha08-prog";
export const LINKEDIN = "https://www.linkedin.com/in/atharva-agrawal-172421330/";
export type Project = {
  title: string; category: "Systems" | "AI & ML" | "Security"; year: string;
  summary: string; tech: string[]; details: string[]; github: string;
  demo?: string; demoLabel?: string; visual: string; image?: string;
};

// Professional content is grounded in the supplied November 2026 résumé.
// IsoLab follows Cloud_Security's README; EEG retains its existing project details.
export const projects: Project[] = [
  {
    title: "AI Scholar", category: "AI & ML", year: "2025–26", visual: "scholar",
    summary: "Turn a research paper into a conversation. Ask aloud, get a cited answer back.",
    tech: ["React Native", "FastAPI", "ChromaDB", "RAG", "Express.js", "MongoDB"],
    details: ["Built a RAG pipeline with PDF ingestion, chunking, and ChromaDB retrieval so answers cite their source passages.", "Added streaming responses, speech-to-text and text-to-speech for voice conversations with research papers.", "Connected chat history and JWT authentication across the mobile app and backend services."],
    github: `${GITHUB}/AI-Scholar`,
  },
  {
    title: "IsoLab — Cloud Security", category: "Security", year: "2026", visual: "cloud",
    summary: "An executable container-security lab for evaluating tenant isolation, resource contention, and interference detection.",
    tech: ["Python", "Docker", "React", "Prometheus", "Grafana", "TypeScript"],
    details: ["Built 30 configuration checks with severity-weighted posture scores, waivers, policy gates, and JSON/SARIF reports.", "Combines tenant resource controls, network and storage boundaries, cgroup v2/PSI observation, and engine-event rules.", "Completed a 160-run, single-host pilot comparing isolation and detection across payments, Spark RandomForest, and Spark SVM workloads. Isolation protects workloads at a competing-throughput cost; detector performance varies by workload.", "Connects security reports and historical lab results to an interactive React dashboard, with the newer pilot published separately as reproducible research evidence."],
    github: `${GITHUB}/Cloud_Security`,
    demo: "https://alpha08-prog.github.io/Cloud_Security/", demoLabel: "Interactive dashboard",
  },
  {
    title: "Kubernetes Attack Path Analyzer", category: "Security", year: "2026", visual: "kubernetes",
    summary: "Trace hidden privilege-escalation routes. Turn a cluster's attack graph into actionable remediation.",
    tech: ["Python", "FastAPI", "NetworkX", "React", "Docker", "Cytoscape.js", "Gemini"],
    details: ["Maps cluster RBAC and workload configuration as a graph; found 46 reachable paths in a test cluster.", "Analyzes a 500-node graph in under a second using BFS, DFS, and betweenness centrality.", "Gemini writes a plain-English kill-chain summary for each finding. The project has 85% test coverage."],
    github: `${GITHUB}/Kubernetes-Attack-Path-Analyzer`,
    demo: "https://kubenetes-attack-path-analyzer.vercel.app/", demoLabel: "Live demo",
    image: "/projects/k8s-attack-path.png",
  },
  {
    title: "EEG Signal Classification", category: "AI & ML", year: "2025", visual: "eeg",
    summary: "From brainwave signals to a deployed ML workflow for mental arithmetic classification.",
    tech: ["Scikit-learn", "FastAPI", "Docker", "AWS", "React", "GitHub Actions"],
    details: ["An end-to-end machine learning project for classifying mental arithmetic EEG signals.", "Serves model inference through FastAPI with a React interface.", "Packages the application with Docker and automates delivery using GitHub Actions."],
    github: `${GITHUB}/ML_Project`, image: "/projects/eeg-classification.png",
  },
];

export const experiences = [
  {
    company: "Boeing", mark: "B", role: "Software Development Intern", period: "Jun 2026 – Present",
    description: "Built an on-device pipeline that transcribes multilingual voice notes with Whisper and maps evidence to 94 observable behaviours. Created the offline-first React Native app and automatic sync. Also built PDF/Word version comparison with exact, fuzzy, and embedding-based matching, local Qwen 2.5 analysis, code-verified numeric changes, and analyst approval with an audit trail.",
    tech: ["Whisper", "Embeddings", "React Native", "Qwen 2.5", "Offline-first"],
  },
  {
    company: "Hindustan Aeronautics Limited", mark: "H", role: "Full Stack Developer Intern · Remote", period: "Jun 2026 – Present",
    description: "Integrated local Qwen 2.5 to draft 10-stage procurement notes with officer sign-off. Shipped a portal for 6 roles and an 8-stage payment workflow, keeping financial calculations server-side. Built custody-based e-file workflows and contract generation with SHA-256 hashes and QR codes for tamper detection.",
    tech: ["React", "Node.js", "JWT", "Qwen 2.5", "SHA-256"],
  },
  {
    company: "Office of Pralhad Joshi", mark: "IN", role: "Full Stack Developer Intern · Union Minister, Govt. of India", period: "Dec 2025 – Jun 2026",
    description: "Built and deployed the Office Management System, handling 150 citizen grievances and 500 visitors a month across 6 modules. Cut p95 page load from about 7 seconds to 1 second with database indexes, Prisma query fixes, and code splitting. Delivered 15+ REST APIs, dashboards for 50 staff, role-based access, and a CI/CD pipeline.",
    tech: ["React", "Node.js", "Prisma", "PostgreSQL", "RBAC", "CI/CD"],
  },
];

export const skillGroups = [
  { title: "Applied AI", tools: ["Python", "Qwen 2.5", "Gemini", "Whisper", "RAG", "Embeddings"], icon: Cpu },
  { title: "Backend & data", tools: ["FastAPI", "Node.js", "PostgreSQL", "Prisma", "ChromaDB", "JWT / RBAC"], icon: Database },
  { title: "Product engineering", tools: ["TypeScript", "React", "React Native", "Express.js", "REST APIs"], icon: Braces },
  { title: "Infrastructure", tools: ["Docker", "Kubernetes", "Git", "Linux", "CI/CD"], icon: Layers3 },
];
