import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/portfolio/AboutSection";
import { CertificationsSection } from "@/components/portfolio/CertificationsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { EducationSection } from "@/components/portfolio/EducationSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { NavBar } from "@/components/portfolio/NavBar";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { useCollectionData, useProfile } from "@/hooks/useContent";
import {
  seedCertifications,
  seedEducation,
  seedExperience,
  seedProfile,
  seedProjects,
  seedSkills,
} from "@/lib/seed-data";
import type { Certification, Education, Experience, Project, SkillGroup } from "@/lib/types";

const TITLE = "Neha satya sridevi vadige — Gen AI Full Stack Developer";
const DESCRIPTION =
  "Portfolio of Neha satya sridevi vadige: Gen AI full stack developer building React web platforms, AI integrations and ML-powered products.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const profile = useProfile().data ?? seedProfile;
  const skills = useCollectionData<SkillGroup>("skills").data ?? seedSkills;
  const projects = useCollectionData<Project>("projects").data ?? seedProjects;
  const experience = useCollectionData<Experience>("experience").data ?? seedExperience;
  const certifications =
    useCollectionData<Certification>("certifications").data ?? seedCertifications;
  const education = useCollectionData<Education>("education").data ?? seedEducation;

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <NavBar resumeUrl={profile.resumeUrl} />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={experience} />
        <CertificationsSection items={certifications} />
        <EducationSection items={education} />
        <ContactSection profile={profile} />
      </main>
      <FooterSection profile={profile} />
    </div>
  );
}
