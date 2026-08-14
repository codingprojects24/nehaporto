import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useRef } from "react";

import { optimizedImage } from "@/lib/cloudinary";
import type { Certification } from "@/lib/types";

import { Reveal, Section, SectionHeading } from "./shared";

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: "google-ai-pro",
    title: "Google AI Professional Certificate",
    issuer: "Google · Coursera",
    date: "2026",
    credentialUrl: "",
    description: "7-course certificate covering AI, prompting, data analysis, and app building.",
    order: 1,
  },
  {
    id: "ai-for-beginners",
    title: "AI for Beginners",
    issuer: "HP LIFE · HP Foundation",
    date: "2026",
    credentialUrl: "",
    description: "Covered AI fundamentals, applications, data, and ethics.",
    order: 2,
  },
  {
    id: "ai-hackathon-2026",
    title: "AI Hackathon 2026",
    issuer: "X Factor",
    date: "2026",
    credentialUrl: "",
    description: "Built and deployed an AI-powered project in a 2-day hackathon.",
    order: 3,
  },
  {
    id: "quizoff-2026",
    title: "QuizOff 2026: India's Biggest AI Quiz",
    issuer: "CampusCrew · Unstop",
    date: "2026",
    credentialUrl: "",
    description: "Participated in India’s Biggest AI Quiz.",
    order: 4,
  },
  {
    id: "enterprise-design-thinking",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM SkillsBuild",
    date: "2026",
    credentialUrl: "",
    description: "Focused on user-centered problem solving and solution design.",
    order: 5,
  },
];

export function CertificationsSection({ items }: { items: Certification[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeItems =
    items &&
    items.length > 0 &&
    !items.some(
      (c) =>
        c.id === "cert-ds" ||
        c.id === "cert-tf" ||
        c.id === "cert-be10x" ||
        c.id === "ai-skills-passport",
    )
      ? items
      : DEFAULT_CERTIFICATIONS;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <Section id="certifications">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          label="Credentials"
          title="Certifications"
          description="Verified professional certifications, hackathons, and foundation badges."
        />
        {/* Horizontal Navigation Controls */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll certifications left"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll certifications right"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Side-Scrolling Horizontal Track */}
      <div
        ref={scrollContainerRef}
        className="mt-12 flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {activeItems.map((cert, i) => (
          <Reveal
            key={cert.id}
            delay={i * 0.06}
            className="w-[290px] shrink-0 snap-start sm:w-[320px] md:w-[340px]"
          >
            <article className="lift flex h-full flex-col rounded-2xl border border-border border-l-4 border-l-primary bg-surface p-6 shadow-sm transition-all duration-200 hover:rotate-1 hover:shadow-float">
              {cert.badgeImageUrl ? (
                <img
                  src={optimizedImage(cert.badgeImageUrl, 200)}
                  alt={`${cert.title} badge`}
                  loading="lazy"
                  className="size-12 rounded-lg object-cover"
                />
              ) : (
                <Award className="size-10 text-primary" aria-hidden />
              )}
              <h3 className="mt-4 text-base font-bold leading-snug text-slate-900">{cert.title}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.date}</p>
              {cert.description ? (
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                  {cert.description}
                </p>
              ) : null}
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  View Certificate <ExternalLink className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
