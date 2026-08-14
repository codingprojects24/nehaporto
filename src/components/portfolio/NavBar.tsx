import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const IDS = ["home", ...LINKS.map((l) => l.id)];

export function NavBar({ resumeUrl }: { resumeUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 py-2.5 shadow-sm backdrop-blur-md"
          : "bg-transparent py-3.5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand */}
        <a
          href="#home"
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-2xl font-black tracking-tight text-slate-900 transition-opacity hover:opacity-80"
        >
          Satya<span className="text-blue-600">.</span>
        </a>

        {/* Navigation Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  active === link.id ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                )}
              >
                {link.label}
                {active === link.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-blue-600"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        {/* View Resume Button */}
        <div className="flex items-center gap-3">
          <a
            href={resumeUrl || "#contact"}
            target={resumeUrl ? "_blank" : undefined}
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 sm:inline-flex"
          >
            <span>View Resume</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-b border-slate-200 bg-white/95 px-6 py-4 shadow-lg backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col space-y-2">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {resumeUrl ? (
                <li className="pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-slate-950 px-4 py-2.5 text-center text-xs font-semibold text-white"
                  >
                    <span>View Resume</span>
                    <ArrowUpRight className="size-3.5" />
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
