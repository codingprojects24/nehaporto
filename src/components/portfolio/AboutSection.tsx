import { Bot, Brain, Code2, Palette } from "lucide-react";

import profileFallback from "@/assets/profile-fallback.jpg";
import { optimizedImage } from "@/lib/cloudinary";
import type { Profile } from "@/lib/types";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

const WHAT_I_DO = [
  {
    Icon: Code2,
    title: "Full Stack Web Dev",
    desc: "React frontends and API-driven backends, shipped end to end.",
  },
  {
    Icon: Bot,
    title: "Gen AI Integration",
    desc: "LLM-powered features wired into real product workflows.",
  },
  {
    Icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces with clear hierarchy, motion and polish.",
  },
  {
    Icon: Brain,
    title: "ML Basics & Tools",
    desc: "Model training, evaluation and deployment for practical apps.",
  },
];

export function AboutSection({ profile }: { profile: Profile }) {
  const image = profile.profileImageUrl
    ? optimizedImage(profile.profileImageUrl, 800)
    : profileFallback;

  return (
    <Section id="about">
      <SectionHeading
        label="Who I Am"
        title="Engineering products with intent"
        description="A blend of full-stack craft, AI curiosity and design sensibility."
      />

      <div className="mt-16 grid items-center gap-14 md:grid-cols-2">
        <Reveal x={-30} y={0} className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-4 -top-4 size-full -rotate-6 rounded-3xl border border-border bg-bg-tertiary" />
          <div className="absolute -right-3 top-3 size-full rotate-3 rounded-3xl border border-border bg-secondary" />
          <img
            src={image}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            width={1024}
            height={1024}
            className="relative aspect-square w-full rounded-3xl object-cover shadow-float"
          />
          <div className="absolute -bottom-4 left-6 flex flex-wrap gap-2">
            {["React", "Python", "AI/ML"].map((tag) => (
              <Pill key={tag} tone="accent" className="bg-surface shadow-elegant">
                {tag}
              </Pill>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-text-secondary">{profile.bio}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {WHAT_I_DO.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="lift group h-full rounded-2xl border border-border bg-surface p-6 hover:border-primary">
                  <Icon className="size-6 text-primary transition-colors group-hover:text-accent-warm" />
                  <h3 className="mt-4 text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
