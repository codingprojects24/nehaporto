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
          ? "border-b border-slate-200/80 bg-white/85 py-2 shadow-sm backdrop-blur-md"
          : "bg-transparent py-2.5",
      )}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-6 md:px-8">
        {/* Brand */}
        <a
          href="#home"
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80"
        >
          Neha<span className="text-blue-600 font-bold">.</span>
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

      {/* Mobile Menu Backdrop & Floating Card Drawer */}
      <AnimatePresence>
        {open ? (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs md:hidden"
            />

            {/* Floating Menu Card matching reference image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 mx-4 mt-3 max-w-sm rounded-[32px] border border-slate-100/90 bg-white p-7 shadow-[0_25px_60px_rgba(15,23,42,0.14)] md:hidden"
            >
              {/* Stepper Navigation List */}
              <div className="relative">
                {/* Vertical continuous line */}
                <div
                  aria-hidden="true"
                  className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-blue-100/80"
                />

                <ul className="relative z-10 flex flex-col space-y-4">
                  {LINKS.map((link) => {
                    const isActive = active === link.id;

                    return (
                      <li key={link.id}>
                        <a
                          href={`#${link.id}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 py-1 transition-colors"
                        >
                          {/* Stepper Node Ring */}
                          <span
                            className={cn(
                              "flex size-[24px] shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-200",
                              isActive
                                ? "border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.35)]"
                                : "border-blue-200/90 group-hover:border-blue-500",
                            )}
                          >
                            {isActive ? (
                              <span className="size-2 rounded-full bg-blue-600" />
                            ) : null}
                          </span>

                          {/* Stepper Label */}
                          <span
                            className={cn(
                              "text-base font-medium transition-colors",
                              isActive
                                ? "font-semibold text-blue-600"
                                : "text-slate-800 group-hover:text-blue-600",
                            )}
                          >
                            {link.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Bottom Full-Width Action Button: View Resume ↗ */}
              <div className="mt-7 pt-2">
                <a
                  href={resumeUrl || "#contact"}
                  target={resumeUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between rounded-full bg-[#0b0f19] px-6 py-4 text-white shadow-md transition-all duration-150 hover:bg-slate-800 active:scale-[0.98]"
                >
                  <span className="text-base font-semibold tracking-tight">View Resume</span>
                  <ArrowUpRight className="size-5" />
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
