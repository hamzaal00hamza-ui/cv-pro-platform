export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}

export interface CVData {
  template: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: Language[];
}

export const CV_TEMPLATES = [
  { id: "modern", name: "عصري", description: "تصميم عصري وأنيق مناسب لجميع المجالات" },
  { id: "classic", name: "كلاسيكي", description: "تصميم تقليدي احترافي للوظائف الرسمية" },
  { id: "creative", name: "إبداعي", description: "تصميم مميز للمجالات الإبداعية" },
];
