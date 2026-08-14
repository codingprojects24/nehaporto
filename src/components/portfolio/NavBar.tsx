import { Menu, X, FileDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const IDS = LINKS.map((l) => l.id);

export function NavBar({ resumeUrl }: { resumeUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled ? "glass border-border py-2 shadow-elegant" : "py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="font-display text-xl font-extrabold tracking-tight">
          S<span className="text-primary">.</span>C
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition-colors",
                  active === link.id ? "text-primary" : "text-text-secondary hover:text-foreground",
                )}
              >
                {link.label}
                {active === link.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={resumeUrl || "#contact"}
            target={resumeUrl ? "_blank" : undefined}
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition-transform duration-150 hover:-translate-y-0.5 sm:inline-flex"
          >
            <FileDown className="size-4" aria-hidden />
            Download Resume
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mt-2 md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3 text-sm text-text-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {resumeUrl ? (
                <li>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Download Resume
                  </a>
                </li>
              ) : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
