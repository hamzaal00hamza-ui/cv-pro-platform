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
  { id: "modern",    name: "عصري",        description: "تصميم عصري وأنيق مناسب لجميع المجالات",        color: "from-[#1a5fb4] to-[#3b82f6]" },
  { id: "classic",   name: "كلاسيكي",     description: "تصميم تقليدي احترافي للوظائف الرسمية",          color: "from-[#374151] to-[#6b7280]" },
  { id: "creative",  name: "إبداعي",      description: "تصميم مميز للمجالات الإبداعية والتقنية",        color: "from-[#7c3aed] to-[#a78bfa]" },
  { id: "elegant",   name: "أنيق",        description: "تصميم راقٍ بلمسات ذهبية للوظائف الرفيعة",       color: "from-[#92400e] to-[#d97706]" },
  { id: "minimal",   name: "مبسّط",       description: "تصميم نظيف ومبسط يركز على المحتوى",             color: "from-[#0f172a] to-[#334155]" },
  { id: "tech",      name: "تقني",        description: "مثالي لمهندسي البرمجيات والمطورين",             color: "from-[#065f46] to-[#10b981]" },
  { id: "executive", name: "تنفيذي",      description: "للمديرين والقيادات العليا",                      color: "from-[#1e1b4b] to-[#4338ca]" },
  { id: "medical",   name: "طبي",         description: "مخصص للأطباء والكوادر الصحية",                  color: "from-[#0c4a6e] to-[#0284c7]" },
  { id: "academic",  name: "أكاديمي",     description: "للأساتذة والباحثين وطلاب الدراسات العليا",       color: "from-[#4a1942] to-[#be185d]" },
  { id: "bold",      name: "جريء",        description: "تصميم جريء وملفت لمن يريد أن يتميز",            color: "from-[#7f1d1d] to-[#ef4444]" },
];
