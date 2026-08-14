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
  email: "satyanarayanach2417@gmail.com",
  phone: "+91 9121055512",
  linkedin: "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/",
  github: "https://github.com/vadigenehasatyasridevi-crypto",
  instagram: "",
  footerQuotePrefix: "Every day is a chance to grow.",
};

export const seedSkills: SkillGroup[] = [
  {
    id: "frontend",
    category: "Web Development",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
    order: 1,
  },
  {
    id: "genai",
    category: "Generative AI & Tools",
    items: [
      "LLM Integration",
      "Prompt Engineering",
      "OpenAI API",
      "Gemini API",
      "LangChain basics",
    ],
    order: 2,
  },
  {
    id: "backend",
    category: "Python & Backend",
    items: ["Python", "Flask", "Node.js", "REST APIs", "Firestore", "Firebase Auth"],
    order: 3,
  },
  {
    id: "ml",
    category: "ML & Data",
    items: ["TensorFlow", "scikit-learn", "Pandas", "NumPy", "Object Detection"],
    order: 4,
  },
];

export const seedProjects: Project[] = [
  {
    id: "mana-nivasam",
    title: "Mana Nivasam",
    description:
      "A real estate platform shipped to the Play Store, connecting buyers with verified property listings.",
    longDescription:
      "Mana Nivasam is a real estate discovery platform published on Google Play. It covers listing management, rich media galleries, search and filtering by locality and budget, and enquiry routing to agents. Built as a web app first and wrapped for Android distribution.",
    techStack: ["React", "Firebase", "Tailwind CSS", "Android"],
    liveUrl: "https://play.google.com/store/apps/details?id=co.median.android.mpynbb",
    githubUrl: "",
    thumbnailUrl: "",
    images: [],
    category: "Mobile",
    featured: true,
    order: 1,
  },
  {
    id: "dre-real-estates",
    title: "DRE Real Estates",
    description: "A polished property showcase site with dynamic listings and enquiry flows.",
    longDescription:
      "DRE Real Estates presents curated property inventory with detail pages, image galleries and a lead capture flow. Focused on fast loads, clean typography and a mobile-first browsing experience.",
    techStack: ["React", "Vite", "Tailwind CSS", "Vercel"],
    liveUrl: "https://devi-real-estates.vercel.app/",
    githubUrl: "",
    thumbnailUrl: "",
    images: [],
    category: "Web App",
    featured: false,
    order: 2,
  },
  {
    id: "sreerasthu-silvers",
    title: "Sreerasthu Silvers",
    description: "Jewellery e-commerce storefront with catalogue, cart and checkout flow.",
    longDescription:
      "A silver jewellery e-commerce experience with a product catalogue, category browsing, cart state, and an order enquiry flow. Emphasis on product photography, premium layout and a frictionless mobile checkout.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    liveUrl: "https://sreerasthusilvers.vercel.app/",
    githubUrl: "",
    thumbnailUrl: "",
    images: [],
    category: "E-commerce",
    featured: true,
    order: 3,
  },
  {
    id: "ignite-gym",
    title: "Ignite Gym Platform",
    description: "Fitness membership platform with programmes, trainers and plan comparison.",
    longDescription:
      "Ignite is a gym and fitness brand platform covering programme listings, trainer profiles, membership plan comparison and enquiry capture — built with bold motion-driven sections.",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ignite-prime-experience.vercel.app/",
    githubUrl: "",
    thumbnailUrl: "",
    images: [],
    category: "Web App",
    featured: false,
    order: 4,
  },
  {
    id: "skyprice",
    title: "Flight Ticket Price Predictor",
    description: "ML model that predicts flight fares from route, airline and timing features.",
    longDescription:
      "SkyPrice trains a regression model on historical flight fare data and serves predictions through a web interface. Users pick airline, route, stops and dates, and the model returns an estimated fare with feature context.",
    techStack: ["Python", "scikit-learn", "Flask", "React"],
    liveUrl: "https://skyprice-predictor-m6qk.vercel.app/",
    githubUrl: "",
    thumbnailUrl: "",
    images: [],
    category: "AI/ML",
    featured: false,
    order: 5,
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
