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
    liveUrl: "https://swarmpy.vercel.app/",
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
    id: "ai-hackathon-x-factor",
    company: "X Factor",
    role: "AI Hackathon Participant",
    type: "Hackathon",
    startDate: "2 Days",
    endDate: "",
    current: false,
    description:
      "Participated in a 2-day AI hackathon, collaborating on an AI-focused project and developing practical solutions within a fast-paced team environment.",
    order: 1,
  },
  {
    id: "nextgen-internship",
    company: "NextGen",
    role: "Full Stack Development Intern",
    type: "Virtual Internship",
    startDate: "Jun 2026",
    endDate: "Aug 2026",
    current: false,
    description:
      "Completed a 3-month virtual internship focused on full-stack development, gaining hands-on experience in building web applications and working with frontend and backend technologies.",
    order: 2,
  },
];

export const seedCertifications: Certification[] = [
  {
    id: "quizoff-2026",
    title: "QuizOff 2026: India's Biggest AI Quiz",
    issuer: "CampusCrew · Unstop",
    date: "2026",
    credentialUrl: "",
    description:
      "Participated in QuizOff 2026, India’s Biggest AI Quiz, competing among students from institutions across the globe.",
    order: 1,
  },
  {
    id: "ai-hackathon-2026",
    title: "AI Hackathon 2026",
    issuer: "X Factor",
    date: "2026",
    credentialUrl: "",
    description:
      "Successfully completed and actively participated in a 2-day AI Hackathon, building and deploying an AI-powered project using modern AI-assisted development platforms.",
    order: 2,
  },
  {
    id: "ai-skills-passport",
    title: "AI Skills Passport",
    issuer: "EY & Microsoft",
    date: "2026",
    credentialUrl: "",
    description:
      "Completed the AI Skills Passport course, covering AI concepts, technology applications, employability skills, and the impact of AI across business and technology.",
    order: 3,
  },
  {
    id: "ai-for-beginners",
    title: "AI for Beginners",
    issuer: "HP LIFE · HP Foundation",
    date: "2026",
    credentialUrl: "",
    description:
      "Completed the AI for Beginners course, gaining a foundational understanding of artificial intelligence, data, business applications, and AI ethics.",
    order: 4,
  },
];

export const seedEducation: Education[] = [
  {
    id: "btech",
    degree: "B.Tech — Machine Learning",
    institution: "KIET Womens Engineering College",
    period: "2024 – 2028",
    description:
      "Focused coursework in machine learning, artificial intelligence, data science, statistics and programming, with hands-on experience through projects and practical applications.",
    order: 1,
  },
  {
    id: "inter",
    degree: "Intermediate — MPC",
    institution: "Sri Chaitanya Girls Junior College",
    period: "2021 – 2023",
    description: "Mathematics, Physics and Chemistry with a focus on analytical problem solving.",
    order: 2,
  },
  {
    id: "school",
    degree: "Secondary Education",
    institution: "VVS High School",
    period: "2021",
    description: "Completed secondary schooling with distinction in mathematics and science.",
    order: 3,
  },
];

export const seedGallery: GalleryItem[] = [];
