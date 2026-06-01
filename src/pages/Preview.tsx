import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CVData } from "@/types/cv";
import { trpc } from "@/providers/trpc";
import {
  Download,
  Loader2,
  CheckCircle,
  Printer,
  RotateCcw,
  FileText,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Wrench,
  Languages,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Preview() {
  const navigate = useNavigate();
  const cvRef = useRef<HTMLDivElement>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [savedToDB, setSavedToDB] = useState(false);

  const createUser = trpc.user.create.useMutation();
  const createCV = trpc.cv.create.useMutation();

  useEffect(() => {
    const storedCV = localStorage.getItem("cv_data");
    const storedPayment = localStorage.getItem("payment_info");

    if (!storedCV || !storedPayment) {
      navigate("/create-cv");
      return;
    }

    try {
      const parsedCV = JSON.parse(storedCV) as CVData;
      const parsedPayment = JSON.parse(storedPayment);
      setCvData(parsedCV);
      setPaymentInfo(parsedPayment);

      // Save to database
      saveToDatabase(parsedCV, parsedPayment);
    } catch {
      navigate("/create-cv");
    }
  }, [navigate]);

  const saveToDatabase = async (cv: CVData, payment: any) => {
    try {
      const userResult = await createUser.mutateAsync({
        fullName: cv.personalInfo.fullName,
        email: cv.personalInfo.email,
        phone: cv.personalInfo.phone,
      });

      const cvResult = await createCV.mutateAsync({
        userId: userResult.id,
        template: cv.template,
        personalInfo: cv.personalInfo,
        education: cv.education,
        experience: cv.experience,
        skills: cv.skills,
        languages: cv.languages,
      });

      // Store CV ID for reference
      localStorage.setItem("cv_id", cvResult.id.toString());
      setSavedToDB(true);
    } catch (error) {
      console.error("Error saving to DB:", error);
      // Continue even if DB save fails - user already paid
      setSavedToDB(true);
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`CV_${cvData?.personalInfo.fullName || "resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!cvData || !savedToDB) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1a5fb4] mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحضير سيرتك الذاتية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <h3 className="font-bold text-green-800">تم إنشاء سيرتك الذاتية بنجاح!</h3>
              <p className="text-sm text-green-700">
                يمكنك الآن معاينة سيرتك الذاتية وتحميلها بصيغة PDF
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-6 print:hidden">
            <Button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] font-bold gap-2"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              تحميل PDF
            </Button>

            <Button
              variant="outline"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              طباعة
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("cv_data");
                localStorage.removeItem("payment_info");
                localStorage.removeItem("cv_id");
                navigate("/create-cv");
              }}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              إنشاء سيرة جديدة
            </Button>
          </div>

          {/* CV Preview */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div ref={cvRef} className="cv-content">
              {cvData.template === "modern" && <ModernTemplate data={cvData} />}
              {cvData.template === "classic" && <ClassicTemplate data={cvData} />}
              {cvData.template === "creative" && <CreativeTemplate data={cvData} />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/90">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {data.personalInfo.address}
            </span>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1a5fb4] border-b-2 border-[#1a5fb4] pb-1 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              نبذة شخصية
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education[0].institution && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1a5fb4] border-b-2 border-[#1a5fb4] pb-1 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              التعليم
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{edu.degree} - {edu.fieldOfStudy}</h3>
                  <span className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1a5fb4] border-b-2 border-[#1a5fb4] pb-1 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              الخبرات العملية
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && data.skills[0] && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1a5fb4] border-b-2 border-[#1a5fb4] pb-1 mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              المهارات
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) =>
                skill ? (
                  <span key={i} className="bg-[#1a5fb4]/10 text-[#1a5fb4] text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && data.languages[0].language && (
          <div>
            <h2 className="text-lg font-bold text-[#1a5fb4] border-b-2 border-[#1a5fb4] pb-1 mb-3 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              اللغات
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, i) =>
                lang.language ? (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-500 text-xs">{lang.level}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ClassicTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white font-serif">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {data.personalInfo.address}
            </span>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              نبذة شخصية
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education[0].institution && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              التعليم
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3 flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} - {edu.fieldOfStudy}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              الخبرات العملية
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && data.skills[0] && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              المهارات
            </h2>
            <p className="text-sm text-gray-700">
              {data.skills.filter(Boolean).join(" • ")}
            </p>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && data.languages[0].language && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
              اللغات
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, i) =>
                lang.language ? (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-500 text-xs">{lang.level}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreativeTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-[#7c3aed] to-[#a78bfa] text-white p-6 min-h-[800px]">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">{data.personalInfo.fullName}</h1>
          </div>

          <div className="space-y-3 text-sm text-white/90 mb-8">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {data.personalInfo.address}
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills.length > 0 && data.skills[0] && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">المهارات</h2>
              <div className="space-y-2">
                {data.skills.map((skill, i) =>
                  skill ? (
                    <div key={i} className="bg-white/20 rounded-full px-3 py-1 text-sm text-center">
                      {skill}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && data.languages[0].language && (
            <div>
              <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-1">اللغات</h2>
              {data.languages.map((lang, i) =>
                lang.language ? (
                  <div key={i} className="flex items-center justify-between text-sm mb-2">
                    <span>{lang.language}</span>
                    <span className="text-white/70 text-xs">{lang.level}</span>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#7c3aed] mb-3">نبذة شخصية</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && data.education[0].institution && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#7c3aed] mb-3">التعليم</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.fieldOfStudy}</p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && data.experience[0].company && (
            <div>
              <h2 className="text-lg font-bold text-[#7c3aed] mb-3">الخبرات العملية</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
