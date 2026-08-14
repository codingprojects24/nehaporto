import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { Certification } from "@/lib/types";

import { Reveal, Section, SectionHeading } from "./shared";

const LOGO_MAP: Record<string, string> = {
  "google-ai-pro": "/logos/google.png",
  "ai-skills-passport": "/logos/microsoft.png",
  "ai-for-beginners": "/logos/hp.png",
  "ai-hackathon-2026": "/logos/xfactor.png",
  "enterprise-design-thinking": "/logos/ibm.png",
  "quizoff-2026": "/logos/unstop.png",
};

const CERTIFICATE_IMAGE_MAP: Record<string, string> = {
  "google-ai-pro": "/certificates/cert-1.jpg",
  "ai-skills-passport": "/certificates/cert-2.jpg",
  "ai-for-beginners": "/certificates/cert-3.jpg",
  "ai-hackathon-2026": "/certificates/cert-4.jpg",
  "enterprise-design-thinking": "/certificates/cert-5.jpg",
  "quizoff-2026": "/certificates/cert-6.jpg",
};

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: "google-ai-pro",
    title: "Google AI Professional Certificate",
    issuer: "Google · Coursera",
    date: "2026",
    credentialUrl: "/certificates/cert-1.jpg",
    badgeImageUrl: "/logos/google.png",
    description: "7-course certificate covering AI, prompting, data analysis, and app building.",
    order: 1,
  },
  {
    id: "ai-skills-passport",
    title: "AI Skills Passport",
    issuer: "EY · Microsoft",
    date: "2026",
    credentialUrl: "/certificates/cert-2.jpg",
    badgeImageUrl: "/logos/microsoft.png",
    description: "Completed training covering AI, employability, technology, and business skills.",
    order: 2,
  },
  {
    id: "ai-for-beginners",
    title: "AI for Beginners",
    issuer: "HP LIFE · HP Foundation",
    date: "2026",
    credentialUrl: "/certificates/cert-3.jpg",
    badgeImageUrl: "/logos/hp.png",
    description: "Covered AI fundamentals, applications, data, and ethics.",
    order: 3,
  },
  {
    id: "ai-hackathon-2026",
    title: "AI Hackathon 2026",
    issuer: "X Factor",
    date: "2026",
    credentialUrl: "/certificates/cert-4.jpg",
    badgeImageUrl: "/logos/xfactor.png",
    description: "Built and deployed an AI-powered project in a 2-day hackathon.",
    order: 4,
  },
  {
    id: "enterprise-design-thinking",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM SkillsBuild",
    date: "2026",
    credentialUrl: "/certificates/cert-5.jpg",
    badgeImageUrl: "/logos/ibm.png",
    description: "Focused on user-centered problem solving and solution design.",
    order: 5,
  },
  {
    id: "quizoff-2026",
    title: "QuizOff 2026: India's Biggest AI Quiz",
    issuer: "CampusCrew · Unstop",
    date: "2026",
    credentialUrl: "/certificates/cert-6.jpg",
    badgeImageUrl: "/logos/unstop.png",
    description: "Participated in India’s Biggest AI Quiz.",
    order: 6,
  },
];

export function CertificationsSection({ items }: { items: Certification[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const activeItems =
    items &&
    items.length > 0 &&
    !items.some(
      (c) =>
        c.id === "cert-ds" ||
        c.id === "cert-tf" ||
        c.id === "cert-be10x" ||
        c.issuer === "EduSkills (APSCHE & Altair)",
    )
      ? items
      : DEFAULT_CERTIFICATIONS;

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

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
        {activeItems.map((cert, i) => {
          const logoSrc = cert.badgeImageUrl || LOGO_MAP[cert.id] || "/logos/google.png";
          const certImage =
            cert.credentialUrl || CERTIFICATE_IMAGE_MAP[cert.id] || "/certificates/cert-1.jpg";

          return (
            <Reveal
              key={cert.id}
              delay={i * 0.06}
              className="w-[290px] shrink-0 snap-start sm:w-[320px] md:w-[340px]"
            >
              <article
                onClick={() => setSelectedCert({ ...cert, credentialUrl: certImage })}
                className="group lift flex h-full cursor-pointer flex-col rounded-2xl border border-border border-l-4 border-l-primary bg-surface p-6 shadow-sm transition-all duration-200 hover:rotate-1 hover:border-primary/60 hover:shadow-float active:scale-[0.99]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCert({ ...cert, credentialUrl: certImage });
                  }
                }}
                aria-label={`View certificate for ${cert.title}`}
              >
                {/* Brand Logo - Transparent & Prominent */}
                <div className="flex h-12 w-auto items-center">
                  <img
                    src={logoSrc}
                    alt={`${cert.title} logo`}
                    loading="lazy"
                    className="h-12 max-h-12 w-auto max-w-[85px] object-contain object-left transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.date}</p>
                {cert.description ? (
                  <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                    {cert.description}
                  </p>
                ) : null}

                {/* Subtle visible text at the bottom of the card */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40 text-xs font-medium text-slate-500 transition-colors group-hover:text-primary">
                  <span>Tap to view certificate</span>
                  <ExternalLink className="size-3.5 opacity-70 transition-transform group-hover:scale-110 group-hover:opacity-100" />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Full Certificate Modal / Image Viewer */}
      <AnimatePresence>
        {selectedCert ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="min-w-0 pr-4">
                  <h3 id="cert-modal-title" className="text-base font-bold text-slate-900 truncate">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs font-medium text-primary">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-slate-100/80 text-text-primary transition-all duration-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body - High Resolution Certificate Image */}
              <div className="flex flex-1 items-center justify-center overflow-auto bg-slate-950/5 p-4 sm:p-6">
                <img
                  src={
                    selectedCert.credentialUrl ||
                    CERTIFICATE_IMAGE_MAP[selectedCert.id] ||
                    "/certificates/cert-1.jpg"
                  }
                  alt={`Certificate for ${selectedCert.title}`}
                  className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-md"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-border bg-surface px-5 py-3 text-xs text-text-secondary">
                <span>Verified Credential</span>
                <a
                  href={
                    selectedCert.credentialUrl ||
                    CERTIFICATE_IMAGE_MAP[selectedCert.id] ||
                    "/certificates/cert-1.jpg"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Open full image <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
