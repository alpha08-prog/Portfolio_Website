import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background text-foreground grid-bg overflow-hidden px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--neon-cyan) / 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Big glitchy 404 */}
        <div className="mb-6">
          <span className="font-mono text-xs tracking-widest text-neon-cyan uppercase">
            {"// "}error 404
          </span>
          <h1 className="text-7xl sm:text-9xl font-bold mt-3 leading-none">
            <span className="text-gradient">4</span>
            <span className="text-foreground">0</span>
            <span className="text-gradient">4</span>
          </h1>
        </div>

        {/* Terminal-style message */}
        <div className="rounded-xl border-neon bg-card/50 p-5 sm:p-6 text-left font-mono text-sm mb-8 mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-3 text-muted-foreground text-xs">
            <Terminal size={14} className="text-neon-cyan" />
            <span>~/atharva-agrawal</span>
          </div>
          <p className="text-foreground">
            <span className="text-neon-green">$</span> cd <span className="text-neon-cyan">{location.pathname}</span>
          </p>
          <p className="text-red-400 mt-1">
            zsh: no such file or directory: {location.pathname}
          </p>
          <p className="text-muted-foreground mt-3 text-xs">
            Try one of the routes below — or head back to the start.
          </p>
        </div>

        <a
          href="/"
          className="btn-neon-solid inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono tracking-wider uppercase"
        >
          <ArrowLeft size={16} />
          Return Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
