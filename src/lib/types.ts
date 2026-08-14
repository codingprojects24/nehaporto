export type Stat = { value: string; label: string };

export type Profile = {
  name: string;
  tagline: string;
  bio: string;
  heroSubtext: string;
  profileImageUrl: string;
  resumeUrl: string;
  stats: Stat[];
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  footerQuotePrefix: string;
};

export type SkillGroup = {
  id: string;
  category: string;
  items: string[];
  iconName?: string;
  order: number;
  colorAccent?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnailUrl: string;
  images: string[];
  videoUrl?: string;
  category: string;
  featured: boolean;
  order: number;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  companyLogoUrl?: string;
  order: number;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  badgeImageUrl?: string;
  order: number;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  order: number;
};

export type GalleryItem = {
  id: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  caption: string;
  section: "hero" | "about" | "projects" | "general";
  order: number;
};
