export type Language = 'en' | 'km';

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string | string[];
}

export interface ExperienceItem {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description?: string | string[];
}

export interface Skill {
  name: string;
  logo: string;
}

export interface Skills {
  programming: Skill[];
  dataTools: Skill[];
  softSkills: string[];
}

export interface About {
  intro: string;
  bio: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: Skills;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  problemStatement?: string;
  detailedDescription?: string;
  technologies?: string[];
  tags: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
  date: string;
}

export interface Leadership {
  id: number;
  title: string;
  organization: string;
  description?: string | string[];
  detailedDescription?: string | string[];
  impact?: string;
  tags: string[];
  image: string;
  images?: string[];
  date: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image?: string;
}

export interface NavItems {
  home: string;
  about: string;
  projects: string;
  leadership: string;
  certificates: string;
  contact: string;
}

export interface Buttons {
  getInTouch: string;
  downloadCv: string;
  viewCode: string;
  viewDetails: string;
  send: string;
  success: string;
}

export interface Social {
  linkedin: string;
  github: string;
  telegram: string;
  twitter: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  quote: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;
  about: About;
  projects: Project[];
  leadership: Leadership[];
  certificates: Certificate[];
  social: Social;
  nav: NavItems;
  buttons: Buttons;
}

export interface TranslationsData {
  en: PortfolioData;
  km: PortfolioData;
}
