import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CVData, CV_TEMPLATES } from "@/types/cv";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Languages,
  Palette,
  CheckCircle,
  Loader2,
} from "lucide-react";

const INITIAL_DATA: CVData = {
  template: "modern",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
  },
  education: [{ institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" }],
  experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
  skills: [""],
  languages: [{ language: "", level: "متوسط" }],
};

const STEPS = [
  { id: 0, label: "المعلومات الشخصية", icon: User },
  { id: 1, label: "التعليم", icon: GraduationCap },
  { id: 2, label: "الخبرات", icon: Briefcase },
  { id: 3, label: "المهارات", icon: Wrench },
  { id: 4, label: "اللغات", icon: Languages },
  { id: 5, label: "القالب", icon: Palette },
];

export default function CreateCV() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CVData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // BUG FIX: removed unused trpc imports (createUser, createCV not needed here)

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  }, []);

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" }],
    }));
  }, []);

  const updateEducation = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  }, []);

  const removeEducation = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", startDate: "", endDate: "", description: "" }],
    }));
  }, []);

  const updateExperience = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  }, []);

  const removeExperience = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  const addSkill = useCallback(() => {
    setData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  }, []);

  const updateSkill = useCallback((index: number, value: string) => {
    setData((prev) => {
      const updated = [...prev.skills];
      updated[index] = value;
      return { ...prev, skills: updated };
    });
  }, []);

  const removeSkill = useCallback((index: number) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  }, []);

  const addLanguage = useCallback(() => {
    setData((prev) => ({
      ...prev,
      languages: [...prev.languages, { language: "", level: "متوسط" }],
    }));
  }, []);

  const updateLanguage = useCallback((index: number, field: string, value: string) => {
    setData((prev) => {
      const updated = [...prev.languages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, languages: updated };
    });
  }, []);

  const removeLanguage = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  }, []);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.personalInfo.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
      if (!data.personalInfo.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
      // BUG FIX: added basic email format validation
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email))
        newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
      if (!data.personalInfo.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (step === 1) {
      data.education.forEach((edu, i) => {
        if (!edu.institution.trim()) newErrors[`edu_${i}_inst`] = "المؤسسة التعليمية مطلوبة";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setErrors({});
      setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      localStorage.setItem("cv_data", JSON.stringify(data));
      navigate("/payment");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">إنشاء السيرة الذاتية</h1>
            <p className="text-muted-foreground">
              أكمل الخطوات التالية لإنشاء سيرتك الذاتية الاحترافية
            </p>
          </div>

          {/* BUG FIX: Steps Progress — fixed with relative wrapper so connector lines work */}
          <div className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-border">
            <div className="relative flex items-center justify-between">
              {/* Connector line behind circles */}
              <div className="absolute top-5 right-5 left-5 h-0.5 bg-muted -z-0" />
              <div
                className="absolute top-5 right-5 h-0.5 bg-[#1a5fb4] transition-all duration-500 -z-0"
                style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 1.25rem)` }}
              />

              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isCompleted = i < step;

                return (
                  <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white shadow-lg shadow-[#1a5fb4]/25"
                          : isCompleted
                          ? "bg-[#1a5fb4]/10 text-[#1a5fb4]"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs hidden sm:block ${
                        isActive ? "font-bold text-[#1a5fb4]" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-border min-h-[400px]">
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-[#1a5fb4]" />
                  المعلومات الشخصية
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل *</Label>
                    <Input
                      id="fullName"
                      value={data.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      placeholder="أحمد محمد"
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      placeholder="ahmed@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      value={data.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      placeholder="+963 912 345 678"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input
                      id="address"
                      value={data.personalInfo.address}
                      onChange={(e) => updatePersonalInfo("address", e.target.value)}
                      placeholder="دمشق، سوريا"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">نبذة شخصية</Label>
                  <Textarea
                    id="summary"
                    value={data.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                    placeholder="اكتب نبذة مختصرة عن نفسك ومهاراتك..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#1a5fb4]" />
                    التعليم
                  </h2>
                  <Button variant="outline" size="sm" onClick={addEducation} className="gap-1">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>

                {data.education.map((edu, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-4 relative">
                    {data.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>المؤسسة التعليمية *</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="جامعة دمشق"
                          className={errors[`edu_${index}_inst`] ? "border-red-500" : ""}
                        />
                        {errors[`edu_${index}_inst`] && (
                          <p className="text-red-500 text-xs">{errors[`edu_${index}_inst`]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>الشهادة</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="بكالوريوس"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>التخصص</Label>
                        <Input
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                          placeholder="علوم الحاسوب"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>من</Label>
                          <Input
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>إلى</Label>
                          <Input
                            type="date"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#1a5fb4]" />
                    الخبرات العملية
                  </h2>
                  <Button variant="outline" size="sm" onClick={addExperience} className="gap-1">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>

                {data.experience.map((exp, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-4 relative">
                    {data.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>الشركة</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                          placeholder="شركة التقنية"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>المسمى الوظيفي</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(index, "position", e.target.value)}
                          placeholder="مهندس برمجيات"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>من</Label>
                          <Input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>إلى</Label>
                          <Input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>وصف الوظيفة</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(index, "description", e.target.value)}
                          placeholder="اكتب وصفاً مختصراً لمهامك وإنجازاتك..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#1a5fb4]" />
                    المهارات
                  </h2>
                  <Button variant="outline" size="sm" onClick={addSkill} className="gap-1">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder={`المهارة ${index + 1}`}
                      />
                      {data.skills.length > 1 && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Languages className="w-5 h-5 text-[#1a5fb4]" />
                    اللغات
                  </h2>
                  <Button variant="outline" size="sm" onClick={addLanguage} className="gap-1">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                </div>

                {data.languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Input
                      value={lang.language}
                      onChange={(e) => updateLanguage(index, "language", e.target.value)}
                      placeholder="اللغة"
                      className="flex-1"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(index, "level", e.target.value)}
                      className="border border-input rounded-md px-3 py-2 text-sm bg-background"
                    >
                      <option value="مبتدئ">مبتدئ</option>
                      <option value="متوسط">متوسط</option>
                      <option value="متقدم">متقدم</option>
                      <option value="طلاقة">طلاقة</option>
                    </select>
                    {data.languages.length > 1 && (
                      <button
                        onClick={() => removeLanguage(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#1a5fb4]" />
                  اختر القالب
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {CV_TEMPLATES.map((template) => {
                    const colors: Record<string, string> = {
                      modern: "from-[#1a5fb4] to-[#3b82f6]", classic: "from-[#374151] to-[#6b7280]",
                      creative: "from-[#7c3aed] to-[#a78bfa]", elegant: "from-[#92400e] to-[#d97706]",
                      minimal: "from-[#0f172a] to-[#334155]", tech: "from-[#065f46] to-[#10b981]",
                      executive: "from-[#1e1b4b] to-[#4338ca]", medical: "from-[#0c4a6e] to-[#0284c7]",
                      academic: "from-[#4a1942] to-[#be185d]", bold: "from-[#7f1d1d] to-[#ef4444]",
                    };
                    return (
                      <div
                        key={template.id}
                        onClick={() => setData((prev) => ({ ...prev, template: template.id }))}
                        className={`border-2 rounded-xl p-3 cursor-pointer transition-all hover:shadow-md ${
                          data.template === template.id
                            ? "border-[#1a5fb4] bg-[#1a5fb4]/5 shadow-md"
                            : "border-border hover:border-[#1a5fb4]/50"
                        }`}
                      >
                        <div className={`h-24 rounded-lg mb-2 flex items-center justify-center bg-gradient-to-br ${colors[template.id] || "from-gray-400 to-gray-600"}`}>
                          <div className="bg-white/20 backdrop-blur-sm rounded p-1.5 w-14 h-18 flex flex-col gap-1">
                            <div className="w-full h-1.5 bg-white/60 rounded" />
                            <div className="w-3/4 h-1 bg-white/40 rounded" />
                            <div className="w-full h-0.5 bg-white/30 rounded mt-1" />
                            <div className="w-full h-0.5 bg-white/30 rounded" />
                            <div className="w-2/3 h-0.5 bg-white/30 rounded" />
                          </div>
                        </div>
                        <h3 className="font-bold text-center text-sm">{template.name}</h3>
                        <p className="text-xs text-muted-foreground text-center mt-0.5 leading-snug">{template.description}</p>
                        {data.template === template.id && (
                          <div className="flex items-center justify-center mt-2">
                            <CheckCircle className="w-4 h-4 text-[#1a5fb4]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 0}
                className="gap-1"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>

              <div className="text-sm text-muted-foreground">
                الخطوة {step + 1} من {STEPS.length}
              </div>

              {step < STEPS.length - 1 ? (
                <Button onClick={handleNext} className="gap-1 bg-[#1a5fb4] hover:bg-[#164ea3]">
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-1 bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      متابعة للدفع
                      <ChevronLeft className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
