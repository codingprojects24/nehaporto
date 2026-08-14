import { motion } from "motion/react";

import type { SkillGroup } from "@/lib/types";

import { Section, SectionHeading } from "./shared";

const DEFAULT_SKILLS = ["Python", "HTML", "CSS", "JavaScript", "React"];

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  // If Firestore has old multi-group seeds, ensure we strictly display the user's chosen skills
  const items =
    skills && skills.length > 0 && !skills.some((s) => s.id === "genai" || s.id === "frontend")
      ? skills.flatMap((s) => s.items)
      : DEFAULT_SKILLS;

  return (
    <Section id="skills" className="bg-bg-secondary">
      <SectionHeading
        label="What I Work With"
        title="Skills & Tooling"
        description="The core technologies I work with to build responsive, robust applications."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="mt-12 flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
      >
        {items.map((item) => (
          <motion.span
            key={item}
            variants={{
              hidden: { opacity: 0, y: 18, scale: 0.92 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="rounded-full border border-border bg-surface px-7 py-3 text-base font-medium text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      <div className="relative mt-16 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap rounded-full border border-border bg-surface/70 px-5 py-2 font-mono text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
