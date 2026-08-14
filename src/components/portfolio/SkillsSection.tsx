import { motion } from "motion/react";
import { useState } from "react";

import type { SkillGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Reveal, Section, SectionHeading } from "./shared";

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  const group = skills[active];
  const marquee = skills.flatMap((s) => s.items);

  return (
    <Section id="skills" className="bg-bg-secondary">
      <SectionHeading
        label="What I Work With"
        title="Skills & tooling"
        description="The stack I reach for when turning ideas into shipped products."
      />

      <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
        {skills.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
              i === active
                ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                : "border-border bg-surface text-text-secondary hover:border-border-strong",
            )}
          >
            {s.category}
          </button>
        ))}
      </Reveal>

      {group ? (
        <motion.div
          key={group.id}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {group.items.map((item) => (
            <motion.span
              key={item}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm text-text-secondary shadow-elegant transition-transform duration-150 hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      ) : null}

      <div className="relative mt-16 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap rounded-full border border-border bg-surface/70 px-4 py-2 font-mono text-xs text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
