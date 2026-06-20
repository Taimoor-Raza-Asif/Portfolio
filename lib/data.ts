export const personalInfo = {
  name: 'Taimoor Raza Asif',
  title: 'AI Engineer & Software Developer',
  tagline: 'Building intelligent systems that automate the real world.',
  bio: 'Software Engineer focused on AI-driven automation and Retrieval-Augmented Generation (RAG). I build custom AI agents, intelligent scrapers, and automation systems that actually work at scale.',
  aboutText:
    "I'm a Software Engineer studied at FAST-NUCES Islamabad (2022–2026), specializing in AI systems and full-stack development. I've shipped RAG pipelines, AI agents, WhatsApp bots, and full-stack platforms — not just academic projects, but tools solving real problems.",
  location: 'Islamabad, Pakistan',
  email: 'taimoorrazaasif581@gmail.com',
  phone: '+92319-1938242',
  github: 'https://github.com/Taimoor-Raza-Asif',
  linkedin: 'https://www.linkedin.com/in/taimoor-raza-asif-05b333264/',
  credly: 'https://www.credly.com/users/taimoor-raza-asif',
  hubstaff: 'https://hubstafftalent.net/profiles/taimoor-raza-asif/portfolio',
  courses: ['Applied AI', 'Natural Language Processing', 'Process Mining'],
  stats: [
    { label: 'Projects', value: '11+' },
    { label: 'Live Demos', value: '6' },
    { label: 'Tech Stacks', value: '5+' },
  ],
  roles: ['AI Engineer', 'RAG Developer', 'Automation Specialist', 'Full Stack Developer'],
}

export const skillCategories = [
  {
    label: 'Languages',
    icon: '{ }',
    skills: ['Python', 'JavaScript', 'C++'],
    accent: 'cyan',
  },
  {
    label: 'AI / LLM',
    icon: '🤖',
    skills: ['RAG', 'LangChain', 'Prompt Engineering', 'Vector Databases', 'OpenAI API', 'Gemini API'],
    accent: 'cyan',
  },
  {
    label: 'Databases',
    icon: '🗄️',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'MS SQL Server', 'Vector DBs'],
    accent: 'purple',
  },
  {
    label: 'Automation',
    icon: '⚡',
    skills: ['n8n', 'Webhooks', 'REST APIs', 'JSON Workflows'],
    accent: 'cyan',
  },
  {
    label: 'DevOps',
    icon: '🚀',
    skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'Postman'],
    accent: 'purple',
  },
]

export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  category: string
  youtubeId?: string
  thumbnail?: string
  driveLink?: string
  github?: string
  liveDemo?: string
  privateRepo?: boolean
  featured?: boolean
  features?: string[]
}

export const projects: Project[] = [
  {
    id: 'jamia',
    title: 'Jamia Tul Mastwaar — Institute Management System',
    description:
      'A full-scale web management system for a religious institute covering student management, fee collection, attendance, salary, leave requests, marks, donations, billing, and multi-role dashboards. Features PDF receipt generation, role-based access control, and 7 custom themes.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'JWT', 'Recharts', 'jsPDF'],
    category: 'Full Stack',
    thumbnail: '/assets/thumbnails/institute management.png',
    driveLink: 'https://drive.google.com/file/d/1K1CsFhcvJpRKQ2p1RvhgkIsqfLcxEOEj/view?usp=drive_link',
    privateRepo: true,
    featured: true,
    features: ['15+ Modules', 'RBAC', 'PDF Receipts', '7 Themes', 'Multi-Dashboard', 'MongoDB'],
  },
  {
    id: 'lumina-ai',
    title: 'Lumina AI — PDF Intelligence Assistant',
    description:
      'A RAG-powered PDF assistant that ingests PDF documents and answers detailed questions about their content. When deeper context is needed, it performs live web searches to enrich responses — combining document retrieval with real-time information.',
    tech: ['Python', 'LangChain', 'Vector Databases', 'OpenAI API', 'Web Search'],
    category: 'AI/RAG',
    youtubeId: 'QzIdrTgj8EE',
    thumbnail: '/assets/thumbnails/lumina ai.png',
  },
  {
    id: 'nuvoletro',
    title: 'Nuvoletro — Content Automation with RAG',
    description:
      'A content repurposing system that transcribes YouTube videos and uses RAG to generate platform-specific posts for LinkedIn, Twitter, and Instagram. Uses vector search for high-quality context retrieval.',
    tech: ['Python', 'LangChain', 'Vector Databases', 'OpenAI API'],
    category: 'AI/RAG',
    youtubeId: 'B0LzJP3ELBs',
  },
  {
    id: 'ilm-ora',
    title: 'ILM-ORA — Career Guidance Platform',
    description:
      'A comprehensive career guidance platform using custom Python scrapers to gather real-time university data. Integrates ML models to generate personalized career roadmaps from academic profiles.',
    tech: ['React', 'Node.js', 'Python', 'MongoDB', 'Custom Scraping'],
    category: 'Full Stack AI',
    youtubeId: 'IvvXLVki-BU',
  },
  {
    id: 'auto-docs',
    title: 'Auto-Docs — AI Documentation Generator',
    description:
      'An AI Agent using Google Gemini API to automatically generate OpenAPI 3.0 documentation from raw source code. Features Smart Long-Term Memory and SHA hashing for caching to minimize API costs.',
    tech: ['Node.js', 'Express', 'Gemini API'],
    category: 'AI Agent',
    youtubeId: '4wC8J2wL-Sg',
    github: 'https://github.com/Taimoor-Raza-Asif/api-documentation-generator',
  },
  {
    id: 'fithum',
    title: 'FitHum — Fitness App',
    description:
      'A fitness-focused application with personalized workout tracking, nutrition plans, and AI-powered recommendations to help users achieve their health goals.',
    tech: ['Full Stack'],
    category: 'Full Stack',
    youtubeId: 'v-NYTDa-i0c',
  },
  {
    id: 'legacylens',
    title: 'LegacyLens — Code Refactoring Agent',
    description:
      'An automated RAG agent that analyzes and modernizes legacy codebases by interacting directly with file systems for autonomous refactoring.',
    tech: ['Python', 'LangChain', 'Vector Databases', 'OpenAI API'],
    category: 'AI Agent',
    youtubeId: 'mM_0d6rIqs0',
    thumbnail: '/assets/thumbnails/legacylens.png',
  },
  {
    id: 'whatsapp-ai',
    title: 'WhatsApp AI Assistant',
    description:
      'A custom n8n workflow using Webhooks to intercept WhatsApp messages, process user intent via LLMs, and trigger autonomous responses.',
    tech: ['n8n', 'Webhooks', 'Node.js', 'JSON', 'API Integrations'],
    category: 'Automation',
  },
  {
    id: 'theseus',
    title: 'Theseus Website — Company Redesign',
    description:
      'Full redesign of a company website with modern UI/UX, responsive layout, and clean visual hierarchy. Built with React and Tailwind CSS for a premium look and feel.',
    tech: ['React', 'TailwindCSS'],
    category: 'Web Development',
    thumbnail: '/assets/thumbnails/theseus.png',
    liveDemo: 'https://theseus-website-two.vercel.app',
    github: 'https://github.com/Taimoor-Raza-Asif/theseus_website',
  },
  {
    id: 'skysearch',
    title: 'SkySearch — Flight Search Engine',
    description:
      'A functional flight search engine with real-time filtering, route search, and a clean booking-style UI. Includes price range charts and smart result sorting.',
    tech: ['React', 'JavaScript', 'API Integration'],
    category: 'Web Development',
    thumbnail: '/assets/thumbnails/skysearch.png',
    liveDemo: 'https://sky-search-black.vercel.app/',
    github: 'https://github.com/Taimoor-Raza-Asif/SkySearch',
  },
  {
    id: 'fintech',
    title: 'FinTech Forecast — Financial Prediction Tool',
    description:
      'A fintech dashboard for financial forecasting and data visualization using charts and predictive models. Features interactive charts, KPI cards, and trend analysis.',
    tech: ['JavaScript', 'Recharts', 'Node.js'],
    category: 'Full Stack',
    thumbnail: '/assets/thumbnails/finforcaste.png',
    github: 'https://github.com/Taimoor-Raza-Asif/fintech-forecast',
  },
  {
    id: 'ssa-converter',
    title: 'Single Static Converter — Compiler Tool',
    description:
      'A GUI tool that converts C/C++ code to Single Static Assignment (SSA) form, then to Z3 format for program equivalence checking and satisfiability analysis.',
    tech: ['Python', 'Z3 Solver', 'Tkinter'],
    category: 'Tools & Systems',
    thumbnail: '/assets/thumbnails/single static.png',
    github: 'https://github.com/Taimoor-Raza-Asif/single-static-converter',
  },
]

export const TAB_CATEGORIES: { label: string; ids: string[] | 'all' }[] = [
  { label: 'All', ids: 'all' },
  { label: 'AI / RAG', ids: ['lumina-ai', 'nuvoletro', 'ilm-ora', 'auto-docs', 'legacylens', 'whatsapp-ai'] },
  { label: 'Full Stack', ids: ['ilm-ora', 'fithum', 'fintech', 'jamia'] },
  { label: 'Web Dev', ids: ['theseus', 'skysearch'] },
  { label: 'Tools & Systems', ids: ['ssa-converter'] },
  { label: 'Automation', ids: ['whatsapp-ai'] },
]

export type ExperienceEntry = {
  title: string
  company?: string
  date: string
  description: string
  type: 'work' | 'education'
}

export const experiences: ExperienceEntry[] = [
  {
    title: 'RAG & AI Solutions Developer',
    date: 'Oct 2025 – Present',
    description:
      'Building end-to-end Retrieval-Augmented Generation pipelines and custom AI agents for production environments.',
    type: 'work',
  },
  {
    title: 'Workflow Automation Engineer (n8n Specialist)',
    date: 'Nov 2025',
    description:
      'Designed and deployed complex n8n workflows integrating webhooks, LLMs, and third-party APIs for business automation.',
    type: 'work',
  },
  {
    title: 'AI Solutions Developer',
    company: 'Auto-Docs Project',
    date: 'Nov – Dec 2025',
    description:
      'Developed the Auto-Docs AI agent using Gemini API for automated OpenAPI documentation generation with smart caching.',
    type: 'work',
  },
  {
    title: 'Full Stack AI Developer',
    company: 'ILM-ORA Platform',
    date: 'Ongoing',
    description:
      'Leading full-stack development of a career guidance platform combining custom scrapers, ML models, and a React frontend.',
    type: 'work',
  },
  {
    title: 'BSc Software Engineering',
    company: 'FAST-NUCES, Islamabad',
    date: 'Aug 2022 – Aug 2026',
    description:
      'Specializing in AI systems, data engineering, and software architecture. Relevant courses: Applied AI, NLP, Process Mining.',
    type: 'education',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
