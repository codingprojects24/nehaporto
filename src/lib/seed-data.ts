import type {
  Certification,
  Education,
  Experience,
  GalleryItem,
  Profile,
  Project,
  SkillGroup,
} from "./types";

export const seedProfile: Profile = {
  name: "Neha satya sridevi vadige",
  tagline: "Gen AI Full Stack Developer",
  bio: "I design and develop modern web applications with a focus on full-stack development and Generative AI. I love learning new technologies and applying them through hands-on projects.",
  heroSubtext:
    "I build production-grade web platforms and weave Generative AI into them — from real-estate marketplaces to ML-powered price predictors.",
  profileImageUrl: "",
  resumeUrl: "",
  stats: [
    { value: "6+", label: "Months of Experience" },
    { value: "2+", label: "Projects Built" },
    { value: "∞", label: "Always Improving" },
    { value: "100%", label: "Dedication" },
  ],
  email: "vadigenehasatyasridevi@gmail.com",
  phone: "+91 73370 19534",
  linkedin: "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/",
  github: "https://github.com/vadigenehasatyasridevi-crypto",
  instagram: "",
  footerQuotePrefix: "Every day is a chance to grow.",
};

export const seedSkills: SkillGroup[] = [
  {
    id: "skills",
    category: "Skills",
    items: ["Python", "HTML", "CSS", "JavaScript", "React"],
    order: 1,
  },
];

export const seedProjects: Project[] = [
  {
    id: "ice-cream-sales-prediction",
    title: "Ice Cream Sales Prediction",
    description:
      "A machine learning project that predicts ice cream sales based on temperature and historical sales data.",
    longDescription:
      "A machine learning project that predicts ice cream sales based on temperature and historical sales data. Analyzes correlation between weather features and consumer demand to forecast sales volumes with high accuracy.",
    techStack: ["Python", "Machine Learning"],
    liveUrl: "",
    githubUrl: "https://github.com/vadigenehasatyasridevi-crypto",
    thumbnailUrl: "",
    images: [],
    category: "ML Project",
    featured: true,
    order: 1,
  },
  {
    id: "ai-user-support-system",
    title: "AI-Powered User Support System",
    description:
      "An AI-powered support system where users can ask questions through a chat interface and receive instant solutions to their issues.",
    longDescription:
      "An AI-powered support system where users can ask questions through a chat interface and receive instant solutions to their issues. Leverages intelligent query parsing and machine learning algorithms for fast troubleshooting.",
    techStack: ["Python", "Chat Interface", "Machine Learning"],
    liveUrl: "",
    githubUrl: "https://github.com/vadigenehasatyasridevi-crypto",
    thumbnailUrl: "",
    images: [],
    category: "AI Web",
    featured: false,
    order: 2,
  },
  {
    id: "swarm-robotics-simulation",
    title: "Swarm Robotics Simulation",
    description:
      "An interactive simulation demonstrating multiple robots working together as a team, showcasing swarm intelligence, coordinated movement, and multi-robot behavior.",
    longDescription:
      "An interactive simulation demonstrating multiple robots working together as a team, showcasing swarm intelligence, coordinated movement, and multi-robot behavior with decentralized multi-agent synchronization.",
    techStack: ["Python", "Simulation", "Swarm Intelligence"],
    liveUrl: "",
    githubUrl: "https://github.com/vadigenehasatyasridevi-crypto",
    thumbnailUrl: "",
    images: [],
    category: "Robotics Simulation",
    featured: false,
    order: 3,
  },
];

export const seedExperience: Experience[] = [
  {
    id: "dream-team",
    company: "Dream Team Services Inc.",
    role: "Gen AI Full Stack Developer Intern",
    type: "Internship",
    startDate: "Feb 2025",
    endDate: "Present",
    current: true,
    description:
      "Building and shipping full-stack web products with Generative AI features — designing React frontends, wiring Firebase backends, and integrating LLM APIs into real client workflows.",
    order: 1,
  },
];

export const seedCertifications: Certification[] = [
  {
    id: "cert-ds",
    title: "Data Science Master Virtual Internship",
    issuer: "EduSkills (APSCHE & Altair)",
    date: "2024",
    credentialUrl: "",
    order: 1,
  },
  {
    id: "cert-tf",
    title: "TensorFlow & Object Detection",
    issuer: "Google Developer Courses",
    date: "2024",
    credentialUrl: "",
    order: 2,
  },
  {
    id: "cert-be10x",
    title: "AI Tools Workshop",
    issuer: "be10x",
    date: "2024",
    credentialUrl: "",
    order: 3,
  },
  {
    id: "cert-aiml",
    title: "AI-ML Virtual Internship",
    issuer: "Google for Developers",
    date: "2024",
    credentialUrl: "",
    order: 4,
  },
];

export const seedEducation: Education[] = [
  {
    id: "btech",
    degree: "B.Tech — Data Science",
    institution: "KIET Engineering College",
    period: "2023 – 2027",
    description:
      "Core coursework in data science, machine learning, statistics and software engineering, alongside continuous project work.",
    order: 1,
  },
  {
    id: "inter",
    degree: "Intermediate — MPC",
    institution: "Sri Chaitanya Junior College",
    period: "2021 – 2023",
    description: "Mathematics, Physics and Chemistry with a focus on analytical problem solving.",
    order: 2,
  },
  {
    id: "school",
    degree: "Secondary Education",
    institution: "Dr. KKR's Gowtham School",
    period: "2021",
    description: "Completed secondary schooling with distinction in mathematics and science.",
    order: 3,
  },
];

export const seedGallery: GalleryItem[] = [];
