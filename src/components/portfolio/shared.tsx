import { motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">— {label}</p>
      <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">{description}</p>
      ) : null}
      <div
        className={cn(
          "mt-6 flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <span className="h-px w-16 bg-border-strong" />
        <span className="size-2 rotate-45 bg-primary" />
        <span className="h-px w-16 bg-border-strong" />
      </div>
    </Reveal>
  );
}

export function Pill({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "warm";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs",
        tone === "default" && "border-border bg-secondary text-text-secondary",
        tone === "accent" && "border-border-strong bg-primary/10 text-primary",
        tone === "warm" && "border-accent-warm/30 bg-accent-warm/10 text-accent-warm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-20 overflow-x-clip py-20 sm:py-24 md:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">{children}</div>
    </section>
  );
}
