import { ExternalLink, Github, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { optimizedImage } from "@/lib/cloudinary";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

const FILTERS = ["All", "Web App", "AI/ML", "Mobile", "E-commerce"];

function Thumb({ project, className }: { project: Project; className?: string }) {
  if (project.thumbnailUrl) {
    return (
      <img
        src={optimizedImage(project.thumbnailUrl, 800)}
        alt={project.title}
        loading="lazy"
        className={cn("size-full object-cover", className)}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-full items-center justify-center bg-bg-tertiary text-center",
        className,
      )}
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <span className="font-display text-2xl font-bold text-primary/70">{project.title}</span>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const images = project.images?.length
    ? project.images
    : project.thumbnailUrl
      ? [project.thumbnailUrl]
      : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/25 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-surface shadow-float"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        {project.videoUrl ? (
          <video src={project.videoUrl} controls className="aspect-video w-full bg-black" />
        ) : images.length ? (
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={optimizedImage(images[index]!, 1200)}
              alt={`${project.title} screenshot ${index + 1}`}
              className="size-full object-cover"
            />
            {images.length > 1 ? (
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "size-2 rounded-full transition-all",
                      i === index ? "w-6 bg-primary" : "bg-surface/80",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="aspect-video w-full">
            <Thumb project={project} />
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="accent">{project.category}</Pill>
            {project.featured ? (
              <Pill tone="warm">
                <Star className="size-3" aria-hidden /> Featured
              </Pill>
            ) : null}
          </div>
          <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-text-secondary">
            {project.longDescription || project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Live Demo <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold"
              >
                <Github className="size-4" aria-hidden /> GitHub
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);
  const visible = filter === "All" ? rest : rest.filter((p) => p.category === filter);

  return (
    <Section id="projects">
      <SectionHeading
        label="Selected Work"
        title="Projects I've shipped"
        description="Real products across real estate, commerce, fitness and machine learning."
      />

      {featured ? (
        <Reveal className="mt-14">
          <button
            type="button"
            onClick={() => setSelected(featured)}
            className="lift grid w-full overflow-hidden rounded-3xl border border-border bg-surface text-left hover:border-primary md:grid-cols-2"
          >
            <div className="aspect-video overflow-hidden md:aspect-auto md:h-full">
              <Thumb
                project={featured}
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2">
                <Pill tone="accent">{featured.category}</Pill>
                <Pill tone="warm">
                  <Star className="size-3" aria-hidden /> Featured
                </Pill>
              </div>
              <h3 className="mt-4 text-2xl font-bold md:text-3xl">{featured.title}</h3>
              <p className="mt-3 text-text-secondary">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.techStack.map((tech) => (
                  <Pill key={tech}>{tech}</Pill>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View case details <ExternalLink className="size-4" aria-hidden />
              </span>
            </div>
          </button>
        </Reveal>
      ) : null}

      <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm transition-all",
              f === filter
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-text-secondary hover:border-border-strong",
            )}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.button
              key={project.id}
              layout
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="lift flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left hover:border-primary"
            >
              <div className="aspect-video overflow-hidden">
                <Thumb
                  project={project}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="accent">{project.category}</Pill>
                  {project.featured ? (
                    <Pill tone="warm">
                      <Star className="size-3" aria-hidden /> Featured
                    </Pill>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg font-bold">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Pill key={tech}>{tech}</Pill>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
      </AnimatePresence>
    </Section>
  );
}
