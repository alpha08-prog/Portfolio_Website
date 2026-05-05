import { useQuery } from "@tanstack/react-query";
import { Github, Star, GitFork, Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const USERNAME = "alpha08-prog";

type GhUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GhRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
};

async function fetchUser(username: string): Promise<GhUser> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

async function fetchRepos(username: string): Promise<GhRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  const repos: GhRepo[] = await res.json();
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name))
    .slice(0, 4);
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#264de4",
  Shell: "#89e051",
  Java: "#b07219",
  Dockerfile: "#384d54",
  C: "#555555",
  "C++": "#f34b7d",
  Jupyter: "#da5b0b",
};

function StatPill({ icon: Icon, value, label }: { icon: typeof Github; value: number | string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border">
      <Icon size={14} className="text-neon-cyan flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground leading-tight">{value}</p>
        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground leading-tight">
          {label}
        </p>
      </div>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted/60 ${className}`} />;
}

export default function GitHubActivity() {
  const userQuery = useQuery({
    queryKey: ["gh-user", USERNAME],
    queryFn: () => fetchUser(USERNAME),
    staleTime: 1000 * 60 * 30, // 30 min
    retry: 1,
  });

  const reposQuery = useQuery({
    queryKey: ["gh-repos", USERNAME],
    queryFn: () => fetchRepos(USERNAME),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  // If both fail (rate limit, network), hide gracefully — never show a broken card.
  if (userQuery.isError && reposQuery.isError) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      aria-label="GitHub activity"
      className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6 mt-8"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-neon-cyan" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Live from GitHub
          </span>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted-foreground hover:text-neon-cyan transition-colors inline-flex items-center gap-1"
        >
          @{USERNAME}
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {userQuery.isLoading ? (
          <>
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </>
        ) : userQuery.data ? (
          <>
            <StatPill icon={Star} value={userQuery.data.public_repos} label="Public repos" />
            <StatPill icon={Users} value={userQuery.data.followers} label="Followers" />
            <StatPill icon={GitFork} value={userQuery.data.following} label="Following" />
          </>
        ) : (
          <p className="col-span-3 text-xs font-mono text-muted-foreground">Stats unavailable.</p>
        )}
      </div>

      {/* Top repos */}
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
        Top repositories
      </p>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {reposQuery.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[78px]" />)
          : reposQuery.data?.map((repo) => {
              const langColor = repo.language ? LANG_COLORS[repo.language] ?? "#a855f7" : "#6b7280";
              return (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-border hover:border-neon-cyan/30 bg-background/40 hover:bg-neon-cyan/5 p-3 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-sm font-mono font-semibold text-foreground group-hover:text-neon-cyan transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink
                      size={12}
                      className="text-muted-foreground group-hover:text-neon-cyan transition-colors flex-shrink-0 mt-1"
                    />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: langColor }}
                          aria-hidden="true"
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star size={10} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={10} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
      </div>
    </motion.section>
  );
}
