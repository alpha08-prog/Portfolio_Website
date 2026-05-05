import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  User,
  FolderGit2,
  Sparkles,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
  Home,
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

type CommandPaletteProps = {
  onTriggerKonami?: () => void;
};

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

const links = [
  { label: "GitHub", href: "https://github.com/alpha08-prog", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/atharva-agrawal-172421330/", icon: Linkedin },
  { label: "Resume (PDF)", href: "/resume.pdf", icon: FileText },
  { label: "Email", href: "mailto:agrawalatharva2004@gmail.com", icon: Mail },
];

export default function CommandPalette({ onTriggerKonami }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  // Cmd+K / Ctrl+K toggle, plus '/' as a quick-open shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      // '/' opens the palette unless the user is typing in an input/textarea.
      if (e.key === "/" && !isMod) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  const goToSection = (id: string) => {
    close();
    // Defer scroll to next tick so the dialog can finish closing without fighting smooth-scroll.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const openExternal = (href: string) => {
    close();
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const copyEmail = async () => {
    close();
    try {
      await navigator.clipboard.writeText("agrawalatharva2004@gmail.com");
      toast.success("Email copied", { description: "agrawalatharva2004@gmail.com" });
    } catch {
      toast.error("Couldn't copy email", { description: "Try clicking the email link instead." });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command, page, or link…" />
      <CommandList>
        <CommandEmpty>Nothing matched. Try "projects" or "github".</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sections.map(({ id, label, icon: Icon }) => (
            <CommandItem
              key={id}
              value={`navigate ${label} ${id}`}
              onSelect={() => goToSection(id)}
            >
              <Icon className="mr-2 text-neon-cyan" />
              <span>{label}</span>
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {links.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={label}
              value={`open ${label} ${href}`}
              onSelect={() => openExternal(href)}
            >
              <Icon className="mr-2 text-neon-purple" />
              <span>Open {label}</span>
              <ArrowUpRight className="ml-auto opacity-40" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem value="copy email" onSelect={copyEmail}>
            <Copy className="mr-2 text-neon-blue" />
            Copy email to clipboard
          </CommandItem>
          {onTriggerKonami && (
            <CommandItem
              value="developer mode konami"
              onSelect={() => {
                close();
                onTriggerKonami();
              }}
            >
              <Terminal className="mr-2 text-neon-green" />
              <span>Activate developer mode</span>
              <CommandShortcut>↑↑↓↓←→←→BA</CommandShortcut>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
