export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  year?: string;
  tags?: string[];
  details?: string;
  sourceLink?: string;
  demoLink?: string;
}

export interface TimelineEntry {
  title: string;
  content: string;
  iconType?: 'zap' | 'users' | 'code' | 'trophy' | 'shield' | 'terminal' | 'graduation' | 'history' | 'briefcase' | 'rocket' | 'gamepad';
}

export interface Section {
  title: string;
  items: ContentItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  category: 'ai' | 'security' | 'cloud' | 'dev' | 'leadership' | 'data';
  link?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
  grade: string;
  skills: string[];
  link?: string;
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  link?: string;
}


export interface PortfolioData {
  hero: {
    title: string;
    role: string;
    description: string;
  };
  badge: string;
  primaryCTA: string;
  secondaryCTA: string;
  philosophyTitle: string;
  philosophyText: string;
  philosophyReveal: string;
  footerMainTitle: string;
  footerSubTitle: string;
  footerCTA: string;
  sections: Section[];
  clients?: ContentItem[];
  timeline: TimelineEntry[];
  education: Education[];
  certifications: Certification[];
  volunteering: Volunteering[];
  phone?: string;
  marqueeText: string;
}