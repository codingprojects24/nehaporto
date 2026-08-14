# Neha's Digital Canvas

🧠 ATOMIC-LEVEL PORTFOLIO WEBSITE PROMPT
For: Neha satya sridevi vadige | Gen AI Full Stack Developer

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 0 — ROLE & MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are a senior full-stack engineer, UI/UX designer, and creative director with 20+ years of experience delivering world-class digital products for Fortune 500 companies. Your mandate is to build a portfolio website for Neha satya sridevi vadige that is:

- Visually breathtaking with a premium light-theme design language
- Fully dynamic — all content managed from a private `/admin` panel
- Technically bulletproof using React + Firebase + Cloudinary
- A masterpiece of UX — extraordinary animations, smooth interactions, pixel-perfect layout
- Unique, memorable, and employer-worthy

Do not cut corners. Do not use placeholder content. Every pixel must be intentional.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — TECH STACK (ATOMIC SPECIFICATION)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1 Frontend Framework

- React 18+ with Vite as build tool
- React Router v6 for routing
- Component architecture: Atomic Design (atoms → molecules → organisms → pages)
- State management: React Context API (no Redux needed)
- Styling: Tailwind CSS v3 + custom CSS variables for design tokens

1.2 Animation & Effects Libraries

- Framer Motion — page transitions, scroll animations, micro-interactions
- GSAP (GreenSock) — complex timeline animations for hero section
- Lottie React — for animated SVG/JSON icons where needed
- React Intersection Observer — trigger animations on scroll
- Typed.js or react-typed — typewriter effect in hero section
- Particles.js or tsParticles — subtle floating particle ambient in hero (light mode)

1.3 Backend & Database

- Firebase v10 (Modular SDK)
  - Firestore — primary database for all content
  - Firebase Auth — admin authentication (Email/Password)
  - Firebase Analytics — enabled
- Cloudinary — media storage only
  - Cloud name: `dzlssgfz9`
  - Upload preset: `nehaporto` (unsigned upload preset)
  - Usage: Upload image/video → receive secure URL → store URL in Firestore

1.4 Firebase Configuration (use exactly as given)

```js
const firebaseConfig = {
  apiKey: "AIzaSyCFVITRyrMCHlan42ElD5kiZNK858S3Vu4",
  authDomain: "nehaporto.firebaseapp.com",
  projectId: "nehaporto",
  storageBucket: "nehaporto.firebasestorage.app",
  messagingSenderId: "356039771111",
  appId: "1:356039771111:web:7b307c9705f860f6ccb342",
  measurementId: "G-SSB2Z5VP5X",
};
```

1.5 External APIs

- Quotable API (https://api.quotable.io/random) or ZenQuotes API — rotating motivational quotes in footer; fetch on every page load with a fallback static quote

1.6 Deployment

- Build with `npm run build` → deploy to Vercel or Netlify
- Environment variables for any sensitive config via `.env`

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — DESIGN SYSTEM (ATOMIC TOKENS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2.1 Color Palette (Light Theme ONLY)

```css
:root {
  /* Primary Palette */
  --color-bg-primary: #fafbff; /* near-white with cold blue tint */
  --color-bg-secondary: #f0f4ff; /* soft lavender-white card bg */
  --color-bg-tertiary: #e8eeff; /* slightly deeper for section bg */
  --color-surface: #ffffff; /* pure white for card surfaces */
  --color-surface-glass: rgba(255, 255, 255, 0.72); /* glassmorphism base */

  /* Accent & Brand */
  --color-accent-primary: #4f6ef7; /* electric indigo-blue */
  --color-accent-secondary: #7c9dff; /* lighter blue for hover/tint */
  --color-accent-glow: rgba(79, 110, 247, 0.18); /* soft glow halo */
  --color-accent-warm: #ff7b54; /* warm coral for highlights/CTA */

  /* Text Hierarchy */
  --color-text-primary: #0f1117; /* near-black for headings */
  --color-text-secondary: #3d4462; /* medium for body */
  --color-text-muted: #8891b3; /* muted for labels/captions */
  --color-text-inverse: #ffffff; /* text on dark bg */

  /* Borders & Dividers */
  --color-border: rgba(79, 110, 247, 0.12);
  --color-border-strong: rgba(79, 110, 247, 0.28);

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(79, 110, 247, 0.08);
  --shadow-md: 0 8px 32px rgba(79, 110, 247, 0.12);
  --shadow-lg: 0 20px 60px rgba(79, 110, 247, 0.16);
  --shadow-glow: 0 0 40px rgba(79, 110, 247, 0.22);
}
```

2.2 Typography

```css
/* Import from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap");

:root {
  --font-display: "Poppins", sans-serif; /* Headings */
  --font-body: "Poppins", sans-serif; /* Body */
  --font-mono: "JetBrains Mono", monospace; /* Code/tech labels */

  /* Scale */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
  --text-6xl: 3.75rem; /* 60px */
  --text-7xl: 4.5rem; /* 72px */
  --text-hero: clamp(3rem, 7vw, 5.5rem); /* fluid hero size */
}
```

2.3 Spacing Scale
Use Tailwind's default spacing scale. Custom additions:

- Section padding top/bottom: `py-28` (7rem)
- Container max-width: `max-w-7xl mx-auto px-6`
- Card padding: `p-8`
- Grid gaps: `gap-6` to `gap-10`

2.4 Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-full: 9999px;
```

2.5 Animation Tokens

```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-xslow: 1000ms;
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — FIRESTORE DATA ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Collection: `profile`
Document ID: `main`

```json
{
  "name": "string",
  "tagline": "string",
  "bio": "string",
  "heroSubtext": "string",
  "profileImageUrl": "string (cloudinary url)",
  "resumeUrl": "string (cloudinary url)",
  "stats": [
    { "value": "6+", "label": "Months of Experience" },
    { "value": "2+", "label": "Projects Built" },
    { "value": "∞", "label": "Always Improving" },
    { "value": "100%", "label": "Dedication" }
  ],
  "email": "vadigenehasatyasridevi@gmail.com",
  "phone": "+91 73370 19534",
  "linkedin": "string",
  "github": "string",
  "instagram": "string",
  "footerQuotePrefix": "string"
}
```

Collection: `skills`
Each document:

```json
{
  "id": "auto",
  "category": "string (e.g. Frontend, AI & Tools)",
  "items": ["string array"],
  "iconName": "string",
  "order": "number",
  "colorAccent": "string (hex)"
}
```

Collection: `projects`
Each document:

```json
{
  "id": "auto",
  "title": "string",
  "description": "string",
  "longDescription": "string",
  "techStack": ["string"],
  "liveUrl": "string",
  "githubUrl": "string",
  "thumbnailUrl": "string (cloudinary url)",
  "images": ["cloudinary url array"],
  "videoUrl": "string (cloudinary url, optional)",
  "category": "string (Web App | AI/ML | Mobile | E-commerce)",
  "featured": "boolean",
  "order": "number",
  "createdAt": "timestamp"
}
```

Collection: `experience`
Each document:

```json
{
  "id": "auto",
  "company": "string",
  "role": "string",
  "type": "string (Internship | Full-time)",
  "startDate": "string",
  "endDate": "string",
  "current": "boolean",
  "description": "string",
  "companyLogoUrl": "string (cloudinary)",
  "order": "number"
}
```

Collection: `certifications`
Each document:

```json
{
  "id": "auto",
  "title": "string",
  "issuer": "string",
  "date": "string",
  "credentialUrl": "string",
  "badgeImageUrl": "string (cloudinary)",
  "order": "number"
}
```

Collection: `education`
Each document:

```json
{
  "id": "auto",
  "degree": "string",
  "institution": "string",
  "period": "string",
  "description": "string",
  "order": "number"
}
```

Collection: `gallery`
Each document:

```json
{
  "id": "auto",
  "mediaUrl": "string (cloudinary)",
  "mediaType": "image | video",
  "caption": "string",
  "section": "string (hero | about | projects | general)",
  "order": "number"
}
```

Collection: `adminAuth`
Document ID: `config`

```json
{
  "adminEmail": "string"
}
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — CLOUDINARY INTEGRATION (ATOMIC FLOW)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload Function (reusable utility)

```js
// utils/cloudinary.js
const CLOUD_NAME = "dzlssgfz9";
const UPLOAD_PRESET = "nehaporto";
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export async function uploadToCloudinary(file, resourceType = "auto") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("resource_type", resourceType);

  const endpoint =
    resourceType === "video" ? `${BASE_URL}/video/upload` : `${BASE_URL}/image/upload`;

  const response = await fetch(endpoint, { method: "POST", body: formData });
  if (!response.ok) throw new Error("Cloudinary upload failed");
  const data = await response.json();
  return data.secure_url; // ← This URL is saved to Firestore
}
```

Upload Flow (Admin Panel)

1. Admin selects file from input
2. Show upload progress bar (use XMLHttpRequest for real progress %)
3. `uploadToCloudinary(file)` called → returns `secure_url`
4. `secure_url` stored in appropriate Firestore document field
5. Main website reads Firestore URL → renders the media

Accepted Formats

- Images: JPG, PNG, WEBP, GIF, SVG
- Videos: MP4, MOV, WEBM (max 100MB)
- Auto-detect resource type using `file.type.startsWith('video/')`

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — ROUTING ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
/                  → Main Portfolio (HomePage)
/admin             → Admin Login Gate
/admin/dashboard   → Admin Dashboard (protected)
/admin/projects    → Manage Projects
/admin/skills      → Manage Skills
/admin/experience  → Manage Experience
/admin/education   → Manage Education
/admin/certifications → Manage Certifications
/admin/gallery     → Manage Gallery
/admin/profile     → Edit Profile & Bio
```

Route Protection:

- All `/admin/*` routes except `/admin` are protected by `<PrivateRoute>` component
- Check `firebase.auth().currentUser` — if null, redirect to `/admin`
- `/admin` is NOT linked in the main website navigation (no link, no hint)
- Admin page URL is only accessible by direct URL entry

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — MAIN WEBSITE PAGES (ATOMIC DETAIL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The main portfolio is a single-page app with smooth scroll-to-section navigation.
Sections in order: Hero → About → Skills → Projects → Experience → Certifications → Education → Contact → Footer

---

6.1 NAVBAR (Sticky, Glassmorphism)

Structure:

- Fixed top: `position: fixed; top: 0; z-index: 100`
- Background: `backdrop-filter: blur(20px); background: rgba(250,251,255,0.82); border-bottom: 1px solid var(--color-border)`
- Logo: "S.C" monogram in `--font-display`, bold, with accent dot after first letter
- Nav links: `Home | About | Skills | Projects | Experience | Education | Contact`
- Active link: underline with `--color-accent-primary`, animated slide-in
- CTA Button: "Download Resume" → opens Cloudinary PDF URL in new tab
- Mobile: Hamburger icon → full-screen drawer with frosted glass background
- Scroll behavior: On scroll down >80px → navbar shrinks in height (`py-3` → `py-2`), box-shadow appears. Smooth CSS transition.
- On scroll to section: active nav item updates via IntersectionObserver

---

6.2 HERO SECTION

Layout: Full viewport height (`min-h-screen`), centered vertically
Background:

- Light gradient mesh: `radial-gradient(ellipse at 20% 50%, rgba(79,110,247,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,123,84,0.06) 0%, transparent 50%), #FAFBFF`
- Floating abstract blobs: 3 soft blurred circles (pure CSS, `border-radius: 50%`, `filter: blur(80px)`, very low opacity) — animate with `@keyframes float` (slow up-down motion)
- Subtle dot-grid pattern overlay: SVG `pattern` element, opacity 0.04

Left Column (60% width on desktop):

1. Greeting chip: `<span>` with emoji 👋 + "Hey there, I'm" — slide in from left (Framer Motion, 300ms delay)
2. Name: `Neha satya sridevi vadige` in `--font-display` at `--text-hero` size, `--color-text-primary` — animate: fade up + blur-in (GSAP, stagger per word)
3. Typewriter subtitle: Cycles through: "Gen AI Full Stack Developer", "Web Application Builder", "AI Integration Specialist" — using react-typed, `--color-accent-primary` color
4. Bio paragraph: Reads from Firestore `profile.heroSubtext` — animate: fade up, 600ms delay
5. CTA Row: Two buttons side by side
   - Primary: "View My Work" → smooth scroll to #projects — bg: `--color-accent-primary`, text white, hover: lift shadow + scale(1.03)
   - Secondary: "Get In Touch" → smooth scroll to #contact — bordered, hover: fill with accent
6. Social Icons Row: GitHub, LinkedIn, Instagram — circular icon buttons, hover: `--color-accent-primary` bg + scale up, stagger reveal animation

Right Column (40% width on desktop):

- Profile image in a hexagonal clip-path frame OR a tilted square frame with accent border
- Frame: rotating dashed border using CSS `@keyframes spin` at 10s, very slow, accent color dashed border
- Badge overlay: small floating card "Available for Opportunities" with green pulsing dot
- Background shape: large soft circle behind image (`--color-bg-tertiary`)
- Image loads from Firestore `profile.profileImageUrl`
- Entry animation: scale from 0.8 + opacity 0 → 1, spring easing (Framer Motion)

Stats Row (below hero content, full width):

- 4 stat cards in a row on desktop, 2x2 grid on mobile
- Each card: number in large `--font-display` + `--color-accent-primary`, label in `--font-body` `--color-text-muted`
- Stats data from Firestore `profile.stats[]`
- Counter animation: numbers count up from 0 on scroll-into-view (react-countup or custom)
- Cards have glass morphism: `background: var(--color-surface-glass)`, `backdrop-filter: blur(10px)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-lg)`

---

6.3 ABOUT SECTION

Section heading pattern (reused globally):

- Small label: "— WHO I AM" in `--font-mono`, `--color-accent-primary`, `--text-xs`, uppercase, letter-spacing wide
- Main title: Large heading in `--font-display`
- Decorative element: thin horizontal line with centered diamond icon

Layout: Two-column (image left, text right) on desktop; stack on mobile

Left:

- Second image (can be same profile image or a different one from gallery)
- Layered card effect: 2-3 image cards slightly rotated, staggered
- Floating skill badge chips orbiting image: "React", "Python", "AI/ML" — small pills

Right:

- Bio text from `profile.bio`
- "What I Do" — 3-4 illustrated cards with icons
  - "Full Stack Web Dev"
  - "Gen AI Integration"
  - "UI/UX Design"
  - "ML Basics & Tools"
- Each card: icon (Lucide React or custom SVG), title, 1-line desc
- Cards have hover: border color change + subtle scale + icon color shift

---

6.4 SKILLS SECTION

Background: `--color-bg-secondary` (subtle contrast from main bg)

Layout: Dynamic from Firestore `skills` collection

Display:

- Category tabs at top: pill buttons for each category (Web Development | Generative AI & Tools | Python & Backend | etc.)
- Active tab: filled with `--color-accent-primary`
- Skill items displayed as:
  - Individual pill/chip tags: each skill name in a rounded pill, light accent bg, border, hover: scale up + shadow
  - On hover of each pill: tooltip shows (optional description if stored)
- Animated entry: stagger reveal using Framer Motion `staggerChildren` — each pill slides up with spring easing
- "Tech I Use" marquee/ticker at bottom: infinite horizontal scroll of tech logos/names — CSS-only `@keyframes marquee`

Skill Progress (optional visual):

- Circular progress rings per main skill category using SVG stroke-dashoffset animation
- Or: horizontal bar with animated fill-in on scroll

---

6.5 PROJECTS SECTION

Filter Tabs:

- "All | Web App | AI/ML | Mobile | E-commerce"
- Filter animates card grid with Framer Motion `AnimatePresence` — cards fade out/in during filter

Projects Grid:

- 3 columns desktop, 2 tablet, 1 mobile
- Each Project Card (glassmorphism, elevated):
  ```
  ┌──────────────────────────────┐
  │  [Thumbnail Image/Video]     │  ← 16:9 ratio, object-cover
  │                              │  ← Hover: zoom scale(1.05)
  ├──────────────────────────────┤
  │  Category Badge  [Featured?] │  ← pill + star icon if featured
  │  Project Title               │  ← --font-display, --text-xl
  │  Short description           │  ← 2 lines, truncated
  │  Tech Stack chips            │  ← small pills
  ├──────────────────────────────┤
  │  [Live Demo →]  [GitHub]     │  ← icon buttons
  └──────────────────────────────┘
  ```
- Card hover: lift shadow (`--shadow-lg`), border color → `--color-accent-primary`
- Click card → opens Project Modal (not a new page):
  - Full-screen overlay with `backdrop-filter: blur(8px)`
  - Image carousel (if multiple images)
  - Video player (if video URL present) — use native HTML5 `<video>` with controls
  - Full description, all tech stack, links
  - Close button top-right, click outside to close, ESC key closes

Featured Project (first or flagged):

- Span full width on top — wider card with side-by-side image + text layout

---

6.6 EXPERIENCE SECTION

Timeline Layout:

- Vertical timeline line in center on desktop, left-aligned on mobile
- Accent line: gradient from `--color-accent-primary` to `--color-accent-secondary`
- Each Experience Card:
  ```
  [Company Logo]  [Company Name]  [Date Range]
                  [Role / Title]
                  [Type badge: Internship]
                  [Description paragraph]
  ```
- Alternating left-right on desktop
- Timeline dot: circle icon at the line, pulse animation using `@keyframes pulse` in `--color-accent-primary`
- Entry animation: slide in from the respective side (left/right) on scroll
- "Current" badge for ongoing positions: small green pulsing dot + "Present" text

---

6.7 CERTIFICATIONS SECTION

Layout: Horizontal scrollable carousel on mobile; responsive grid on desktop

Cert Card:

```
┌─────────────────────────┐
│  [Badge Icon/Image]     │
│  Certification Title    │
│  Issuer Name            │
│  Date                   │
│  [View Certificate →]   │
└─────────────────────────┘
```

- Card background: white with left accent border (4px solid `--color-accent-primary`)
- Hover: card tilts 2deg (CSS `transform: rotate(2deg)`), shadow deepens
- Badge image from Cloudinary or fallback icon (Lucide `Award`)

---

6.8 EDUCATION SECTION

Background: subtle `--color-bg-tertiary`

Layout: Cards in a row or vertical stacked

Education Card:

```
[Year Pill]  [Degree/Level]
             [Institution Name]  ← --font-display, prominent
             [Description]
             [Duration badge]
```

- Decorative graduation cap icon per card
- Timeline connector between cards
- School names in `--font-display`

---

6.9 CONTACT SECTION

Layout: Two columns

- Left: Contact info block
  - Phone with click-to-call `tel:` link
  - Social link cards: LinkedIn, GitHub, Instagram — each card has platform color on hover
  - Animated availability badge: "Open to Opportunities" with pulsing green dot

- Right: Contact Form
  - Fields: Name, Email, Subject, Message (textarea)
  - Submit: sends email via EmailJS (optional) or stores in Firestore `messages` collection
  - Field styling: underline-only input on light bg, focus: underline becomes accent-colored
  - Submit button: full-width, gradient bg (`--color-accent-primary` → `--color-accent-secondary`), hover: slight gradient shift + scale
  - Success state: Lottie checkmark animation + success message
  - Error state: shake animation on form, error message in red

---

6.10 FOOTER

Structure:

- Columns: Logo+bio | Quick Links | Connect
- Divider line with gradient
- Bottom bar:
  - Left: `© 2026 Neha satya sridevi vadige. Every day is a chance to grow.`
  - Center: Dynamic quote (fetched from Quotable API on load)
    - Format: `"quote text" — Author Name`
    - Loading state: skeleton shimmer
    - Refreshes on each page load
  - Right: "Back to Top ↑" button — smooth scroll to top

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — ADMIN PANEL (ATOMIC DETAIL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1 Access & Security

- URL: `/admin` only — never linked from main website
- `<meta name="robots" content="noindex">` on admin page
- Firebase Auth Email/Password login
- Persistent session via `onAuthStateChanged`
- Logout button in admin sidebar
- `PrivateRoute` HOC wraps all `/admin/*` sub-routes

7.2 Admin Login Page (`/admin`)

- Clean centered card on light gray bg
- Logo + "Admin Portal" heading
- Email + Password fields
- Login button
- Error message display (wrong credentials, etc.)
- No "Sign Up" link (admin account pre-created)

7.3 Admin Dashboard Layout

- Sidebar (collapsible on mobile):
  - Logo
  - Nav links with icons (Lucide React): Dashboard, Profile, Projects, Skills, Experience, Certifications, Education, Gallery
  - Logout button at bottom
- Main Content Area: changes based on active section
- Top Bar: Section title + "View Live Site" button

7.4 Dashboard Overview Page

- Summary cards: Project count, Skills count, Experience entries, Certification count
- Quick links to each management section
- "Last Updated" timestamp from Firestore

7.5 Profile Management (`/admin/profile`)
Edit Form with live preview:

- Name, Tagline, Bio, Hero Subtext
- Profile Image upload → Cloudinary → URL saved to Firestore
- Resume PDF upload → Cloudinary → URL saved
- Stats editor: add/remove/edit stat items (value + label)
- Contact: Phone, Email, LinkedIn URL, GitHub URL, Instagram URL
- Footer text
- "Save Changes" button → updates Firestore doc → success toast
- Toast notifications: use `react-hot-toast` or custom toast component

7.6 Projects Management (`/admin/projects`)

List View:

- Table or card grid of all projects
- Columns: Thumbnail | Title | Category | Featured | Order | Actions (Edit | Delete)
- Drag-to-reorder (react-beautiful-dnd or dnd-kit) for `order` field
- "Add New Project" button

Add/Edit Project Form (modal or sub-page):

```
Project Title *
Description (short) *
Long Description (rich text or textarea) *
Category (dropdown: Web App | AI/ML | Mobile | E-commerce) *
Tech Stack (tag input — type + enter to add) *
Live URL
GitHub URL
Featured (toggle switch)
Order (number)

Thumbnail Image:
  [Drag & Drop or Click to Upload]
  → shows upload progress bar
  → shows preview after upload

Additional Images (gallery):
  [Multiple file upload]
  → shows thumbnails of uploaded images
  → delete individual images

Project Video (optional):
  [Upload MP4/WEBM]
  → shows video player preview after upload

[Save Project] [Cancel]
```

7.7 Skills Management (`/admin/skills`)

- List of skill categories with items
- Add category button
- Per category: edit name, add/remove items, set icon, set order
- Delete category (with confirmation modal)

7.8 Experience Management (`/admin/experience`)

- List view with edit/delete per entry
- Add/Edit form:
  - Company, Role, Type, Start Date, End Date, Current (toggle), Description
  - Company Logo upload → Cloudinary
  - Order

7.9 Certifications Management (`/admin/certifications`)

- List + Add/Edit/Delete
- Fields: Title, Issuer, Date, Credential URL, Badge Image (upload → Cloudinary)

7.10 Education Management (`/admin/education`)

- List + Add/Edit/Delete
- Fields: Degree, Institution, Period, Description, Order

7.11 Gallery Management (`/admin/gallery`)

- Grid view of all uploaded media
- Upload button → drag & drop zone → progress bar → Cloudinary → Firestore
- Each item: preview + caption input + section selector + delete button
- Filter by section (hero | about | projects | general)

7.12 Upload Component (Reusable)

```jsx
// components/admin/MediaUploader.jsx
// Props: onUpload(url), accept("image/*" | "video/*" | "image/*,video/*"), label
// States: idle → dragging → uploading (progress %) → success (preview) → error
// Features:
//   - Drag & drop zone with dashed border, changes color on drag-over
//   - Click to browse fallback
//   - Progress bar with actual Cloudinary upload progress
//   - Image preview thumbnail after upload
//   - Video player preview after upload
//   - "Remove" button to clear and re-upload
//   - File size validation (max 100MB for video, 10MB for image)
//   - File type validation
```

7.13 Admin UX Details

- All forms: client-side validation before submit
- All delete operations: confirmation modal "Are you sure? This cannot be undone."
- Loading spinners on all async operations
- Success/error toasts for all operations
- Unsaved changes warning: `beforeunload` event if form is dirty
- Admin theme: same light theme but with slightly different sidebar styling (deeper `--color-bg-secondary`)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — ANIMATION MASTERPLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8.1 Page Load Sequence (GSAP Timeline)

```
0ms   → Navbar fades in from top
200ms → Hero greeting chip slides in from left
400ms → Hero name animates word-by-word (blur-in + fade-up)
700ms → Typewriter starts
900ms → Bio paragraph fades up
1100ms → CTA buttons scale in with spring
1300ms → Social icons stagger in from bottom
1500ms → Profile image scales in from 0.8
1700ms → Floating profile badge bounces in
2000ms → Stats row: each counter starts counting up
```

8.2 Scroll Animations (IntersectionObserver + Framer Motion)

- All section headings: fade up + slight Y translate
- Cards: stagger reveal (50ms delay between each)
- Timeline items: slide in from left/right
- Skill pills: stagger pop-in
- Progress bars/rings: fill on scroll entry

8.3 Continuous Animations (CSS only)

- Hero background blobs: `@keyframes float` (slow oscillate, 8-12s, infinite)
- Timeline dots: `@keyframes pulse` (scale + opacity, 2s infinite)
- "Available" badge green dot: `@keyframes ping` (Tailwind animate-ping)
- Skill ticker: `@keyframes marquee` (infinite horizontal scroll)
- Profile image border: `@keyframes spin` (very slow, 15s)

8.4 Micro-interactions

- Button hover: `transform: translateY(-2px)` + shadow increase (150ms)
- Card hover: `transform: translateY(-6px)` + shadow (200ms)
- Nav link: colored underline slides in from left (300ms)
- Social icon: color fill + scale (150ms)
- Project card image: zoom on hover (400ms transition, overflow hidden)
- Mobile menu: slides down from top with easing

8.5 Custom Cursor (Desktop only)

- Small circle cursor: follows mouse with slight lag (lerp)
- On hoverable elements: cursor expands + blends (mix-blend-mode: difference)
- Implementation: `useEffect` with `mousemove` listener, `requestAnimationFrame`

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — RESPONSIVE BREAKPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Mobile:   < 640px  (sm)
Tablet:   640–1024px (md)
Desktop:  > 1024px (lg+)

Specific rules:
- Navbar: hamburger < 768px, full nav ≥ 768px
- Hero: 1 column < 768px, 2 columns ≥ 768px
- Projects grid: 1 col < 640px, 2 cols 640–1024px, 3 cols > 1024px
- Timeline: centered left < 768px, alternating ≥ 768px
- Stats: 2x2 < 640px, 4-in-a-row ≥ 640px
- Skills: wrap pills on all sizes (flex-wrap)
- Admin sidebar: hidden < 768px (toggle drawer), visible ≥ 768px
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 10 — COMPONENT FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.jsx           (Primary, Secondary, Icon variants)
│   │   ├── Badge.jsx            (Pill labels, Category tags)
│   │   ├── SectionLabel.jsx     (— LABEL heading prefix)
│   │   ├── SectionTitle.jsx     (Large section heading)
│   │   ├── SkillPill.jsx        (Individual skill tag)
│   │   ├── SocialLink.jsx       (Icon + URL)
│   │   └── Loader.jsx           (Spinner, Skeleton)
│   ├── molecules/
│   │   ├── NavBar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ExperienceCard.jsx
│   │   ├── CertCard.jsx
│   │   ├── EducationCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── ContactForm.jsx
│   │   └── QuoteDisplay.jsx
│   ├── organisms/
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── CertificationsSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── FooterSection.jsx
│   └── admin/
│       ├── AdminSidebar.jsx
│       ├── AdminTopBar.jsx
│       ├── MediaUploader.jsx
│       ├── DataTable.jsx
│       ├── ConfirmModal.jsx
│       └── Toast.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProfile.jsx
│   │   ├── AdminProjects.jsx
│   │   ├── AdminSkills.jsx
│   │   ├── AdminExperience.jsx
│   │   ├── AdminCertifications.jsx
│   │   ├── AdminEducation.jsx
│   │   └── AdminGallery.jsx
├── hooks/
│   ├── useFirestore.js
│   ├── useAuth.js
│   ├── useCloudinary.js
│   ├── useMotivationalQuote.js
│   └── useScrollSpy.js
├── context/
│   ├── AuthContext.jsx
│   └── DataContext.jsx
├── utils/
│   ├── cloudinary.js
│   ├── firebase.js
│   └── helpers.js
├── styles/
│   ├── globals.css
│   ├── animations.css
│   └── cursor.css
└── App.jsx
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 11 — PRE-LOADED CONTENT (SEED DATA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pre-populate Firestore on first run (check if docs exist, if not seed):

Profile:

- name: "Neha satya sridevi vadige"
- tagline: "Gen AI Full Stack Developer"
- bio: "I design and develop modern web applications with a focus on full-stack development and Generative AI. I love learning new technologies and applying them through hands-on projects."
- phone: "+91 73370 19534"
- email: "vadigenehasatyasridevi@gmail.com"
- linkedin: "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/"
- github: "https://github.com/vadigenehasatyasridevi-crypto"

Projects (3 pre-loaded):

1. Ice Cream Sales Prediction — ML Project (Python, Machine Learning)
2. AI-Powered User Support System — AI Web (Python, Chat Interface, Machine Learning)
3. Swarm Robotics Simulation — Robotics Simulation (Python, Simulation, Swarm Intelligence) — `https://swarmpy.vercel.app/`

Experience (2):

1. AI Hackathon by X Factor — AI Hackathon Participant (Hackathon · 2 Days)
2. NextGen — Full Stack Development Intern (Virtual Internship · Jun 2026 – Aug 2026)

Certifications (6):

1. Google AI Professional Certificate — Google · Coursera (2026)
2. AI Skills Passport — EY · Microsoft (2026)
3. AI for Beginners — HP LIFE · HP Foundation (2026)
4. AI Hackathon 2026 — X Factor (2026)
5. Enterprise Design Thinking Practitioner — IBM SkillsBuild (2026)
6. QuizOff 2026: India's Biggest AI Quiz — CampusCrew · Unstop (2026)

Education (3):

1. B.Tech Machine Learning — KIET Womens Engineering College — 2024–2028
2. Intermediate MPC — Sri Chaitanya Girls Junior College — 2021–2023
3. Secondary Education — VVS High School — 2021

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 12 — PERFORMANCE & ACCESSIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance

- Lazy load all images: `loading="lazy"` + Intersection Observer
- Code splitting: `React.lazy` + `Suspense` per section
- Cloudinary auto-optimization: append `?f_auto,q_auto,w_800` to image URLs
- Firestore: use `onSnapshot` for real-time data OR `getDocs` with caching
- Animations: `will-change: transform` only on animated elements, remove after animation
- Bundle: `vite-plugin-compression` for gzip
- Target: Lighthouse score > 90 on all metrics

Accessibility

- All images: `alt` attributes
- Form fields: `` + `htmlFor`
- Buttons: `aria-label` where icon-only
- Color contrast: all text meets WCAG AA (4.5:1 ratio on light bg)
- Focus styles: visible focus rings (`outline: 2px solid var(--color-accent-primary); outline-offset: 2px`)
- Skip to content link
- Semantic HTML: `

`, ``, `

`, `

`, ``, `

`

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# SECTION 13 — FINAL QUALITY CHECKLIST

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before delivery, verify:

- [ ] All sections display correctly from Firestore data
- [ ] Cloudinary upload → URL → Firestore flow works for images AND videos
- [ ] Admin login protects all `/admin/*` routes
- [ ] Admin can add/edit/delete all content types with media upload
- [ ] Main site reflects admin changes in real-time (or on refresh)
- [ ] Motivational quote fetches from API on every load
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] All animations play correctly and don't cause layout shift
- [ ] Mobile responsive on 375px iPhone SE and 768px iPad
- [ ] Navbar scroll behavior works
- [ ] Resume download button opens Cloudinary PDF
- [ ] Contact form submits and shows success state
- [ ] Project modal opens, image carousel works, video plays
- [ ] Footer copyright and quote display correctly
- [ ] No console errors in production build
- [ ] Lighthouse performance > 90

---

End of Atomic-Level Portfolio Prompt — Neha satya sridevi vadige

## Development

To run this project locally:

```sh
npm install
npm run dev
```
