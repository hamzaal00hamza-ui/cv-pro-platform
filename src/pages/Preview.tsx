import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CVData } from "@/types/cv";
import { Download, Loader2, CheckCircle, Printer, RotateCcw, FileText, Mail, Phone, MapPin, GraduationCap, Briefcase, Wrench, Languages } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Preview() {
  const navigate = useNavigate();
  const cvRef = useRef<HTMLDivElement>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCV = localStorage.getItem("cv_data");
    const storedPayment = localStorage.getItem("payment_info");
    if (!storedCV || !storedPayment) { navigate("/create-cv"); return; }
    try {
      setCvData(JSON.parse(storedCV) as CVData);
    } catch { navigate("/create-cv"); return; }
    setIsLoading(false);
  }, [navigate]);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidthMM = (canvas.width * 25.4) / (96 * 2);
      const canvasHeightMM = (canvas.height * 25.4) / (96 * 2);
      const ratio = Math.min(pdfWidth / canvasWidthMM, pdfHeight / canvasHeightMM);
      const finalWidth = canvasWidthMM * ratio;
      const finalHeight = canvasHeightMM * ratio;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", (pdfWidth - finalWidth) / 2, 0, finalWidth, finalHeight);
      pdf.save(`CV_${cvData?.personalInfo.fullName || "resume"}.pdf`);
    } catch (e) { console.error(e); } finally { setIsDownloading(false); }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a5fb4] mx-auto mb-4" />
        <p className="text-muted-foreground">جاري تحضير سيرتك الذاتية...</p>
      </div>
    </div>
  );

  if (!cvData) return null;

  const templates: Record<string, React.FC<{ data: CVData }>> = {
    modern: ModernTemplate, classic: ClassicTemplate, creative: CreativeTemplate,
    elegant: ElegantTemplate, minimal: MinimalTemplate, tech: TechTemplate,
    executive: ExecutiveTemplate, medical: MedicalTemplate, academic: AcademicTemplate, bold: BoldTemplate,
  };
  const TemplateComponent = templates[cvData.template] || ModernTemplate;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <h3 className="font-bold text-green-800">تم إنشاء سيرتك الذاتية بنجاح!</h3>
              <p className="text-sm text-green-700">يمكنك الآن معاينة سيرتك الذاتية وتحميلها بصيغة PDF</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6 print:hidden">
            <Button onClick={downloadPDF} disabled={isDownloading} className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] font-bold gap-2">
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              تحميل PDF
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="gap-2">
              <Printer className="w-4 h-4" />طباعة
            </Button>
            <Button variant="outline" onClick={() => { localStorage.removeItem("cv_data"); localStorage.removeItem("payment_info"); navigate("/create-cv"); }} className="gap-2">
              <RotateCcw className="w-4 h-4" />إنشاء سيرة جديدة
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div ref={cvRef} className="cv-content"><TemplateComponent data={cvData} /></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────────────
const Section = ({ title, icon, children, color = "text-[#1a5fb4] border-[#1a5fb4]" }: { title: string; icon: React.ReactNode; children: React.ReactNode; color?: string }) => (
  <div className="mb-6">
    <h2 className={`text-lg font-bold border-b-2 pb-1 mb-3 flex items-center gap-2 ${color}`}>{icon}{title}</h2>
    {children}
  </div>
);

const ContactRow = ({ icon, value }: { icon: React.ReactNode; value: string }) => value ? (
  <span className="flex items-center gap-1">{icon}{value}</span>
) : null;

// ── 1. MODERN ─────────────────────────────────────────────────────────
function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/90">
          <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={data.personalInfo.email} />
          <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={data.personalInfo.phone} />
          <ContactRow icon={<MapPin className="w-3.5 h-3.5" />} value={data.personalInfo.address} />
        </div>
      </div>
      <div className="p-8">
        {data.personalInfo.summary && <Section title="نبذة شخصية" icon={<FileText className="w-4 h-4" />}><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></Section>}
        {data.education[0]?.institution && <Section title="التعليم" icon={<GraduationCap className="w-4 h-4" />}>{data.education.map((e, i) => <div key={i} className="mb-3"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.degree} {e.fieldOfStudy && `- ${e.fieldOfStudy}`}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600">{e.institution}</p></div>)}</Section>}
        {data.experience[0]?.company && <Section title="الخبرات العملية" icon={<Briefcase className="w-4 h-4" />}>{data.experience.map((e, i) => <div key={i} className="mb-4"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.position}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600 font-medium">{e.company}</p>{e.description && <p className="text-sm text-gray-700 mt-1">{e.description}</p>}</div>)}</Section>}
        {data.skills[0] && <Section title="المهارات" icon={<Wrench className="w-4 h-4" />}><div className="flex flex-wrap gap-2">{data.skills.filter(Boolean).map((s, i) => <span key={i} className="bg-[#1a5fb4]/10 text-[#1a5fb4] text-sm px-3 py-1 rounded-full">{s}</span>)}</div></Section>}
        {data.languages[0]?.language && <Section title="اللغات" icon={<Languages className="w-4 h-4" />}><div className="grid grid-cols-2 gap-2">{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm"><span className="font-medium text-gray-800">{l.language}</span><span className="text-gray-500 text-xs">{l.level}</span></div>)}</div></Section>}
      </div>
    </div>
  );
}

// ── 2. CLASSIC ────────────────────────────────────────────────────────
function ClassicTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white font-serif">
      <div className="border-b-4 border-gray-800 pb-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={data.personalInfo.email} />
          <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={data.personalInfo.phone} />
          <ContactRow icon={<MapPin className="w-3.5 h-3.5" />} value={data.personalInfo.address} />
        </div>
      </div>
      <div className="p-8">
        {data.personalInfo.summary && <div className="mb-6"><h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">نبذة شخصية</h2><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-3 flex justify-between"><div><h3 className="font-bold text-gray-800">{e.institution}</h3><p className="text-sm text-gray-600">{e.degree} {e.fieldOfStudy && `- ${e.fieldOfStudy}`}</p></div><span className="text-xs text-gray-500 shrink-0 mr-4">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div>)}</div>}
        {data.experience[0]?.company && <div className="mb-6"><h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">الخبرات العملية</h2>{data.experience.map((e, i) => <div key={i} className="mb-4"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.position}</h3><span className="text-xs text-gray-500 shrink-0 mr-4">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600 font-medium">{e.company}</p>{e.description && <p className="text-sm text-gray-700 mt-1">{e.description}</p>}</div>)}</div>}
        {data.skills[0] && <div className="mb-6"><h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">المهارات</h2><p className="text-sm text-gray-700">{data.skills.filter(Boolean).join(" • ")}</p></div>}
        {data.languages[0]?.language && <div><h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">اللغات</h2><div className="grid grid-cols-2 gap-2">{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm"><span className="font-medium">{l.language}</span><span className="text-gray-500 text-xs">{l.level}</span></div>)}</div></div>}
      </div>
    </div>
  );
}

// ── 3. CREATIVE (sidebar purple) ──────────────────────────────────────
function CreativeTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white flex min-h-[800px]">
      <div className="w-1/3 bg-gradient-to-b from-[#7c3aed] to-[#4c1d95] text-white p-6">
        <h1 className="text-2xl font-bold mb-6 leading-snug">{data.personalInfo.fullName}</h1>
        <div className="space-y-2 text-sm text-white/90 mb-8">
          {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="break-all">{data.personalInfo.email}</span></div>}
          {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" />{data.personalInfo.phone}</div>}
          {data.personalInfo.address && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" />{data.personalInfo.address}</div>}
        </div>
        {data.skills[0] && <div className="mb-8"><h2 className="text-base font-bold mb-3 border-b border-white/30 pb-1">المهارات</h2><div className="space-y-2">{data.skills.filter(Boolean).map((s, i) => <div key={i} className="bg-white/20 rounded-full px-3 py-1 text-sm text-center">{s}</div>)}</div></div>}
        {data.languages[0]?.language && <div><h2 className="text-base font-bold mb-3 border-b border-white/30 pb-1">اللغات</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm mb-2"><span>{l.language}</span><span className="text-white/70 text-xs">{l.level}</span></div>)}</div>}
      </div>
      <div className="w-2/3 p-6">
        {data.personalInfo.summary && <div className="mb-6"><h2 className="text-lg font-bold text-[#7c3aed] mb-3">نبذة شخصية</h2><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-lg font-bold text-[#7c3aed] mb-3">التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-3"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.degree}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600">{e.institution}</p>{e.fieldOfStudy && <p className="text-xs text-gray-500">{e.fieldOfStudy}</p>}</div>)}</div>}
        {data.experience[0]?.company && <div><h2 className="text-lg font-bold text-[#7c3aed] mb-3">الخبرات العملية</h2>{data.experience.map((e, i) => <div key={i} className="mb-4"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.position}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600 font-medium">{e.company}</p>{e.description && <p className="text-sm text-gray-700 mt-1">{e.description}</p>}</div>)}</div>}
      </div>
    </div>
  );
}

// ── 4. ELEGANT (gold accents) ─────────────────────────────────────────
function ElegantTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-[#fffdf7]">
      <div className="bg-[#1a0a00] text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #d97706 0, #d97706 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="relative">
          <h1 className="text-3xl font-bold mb-1 text-[#fbbf24]">{data.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-amber-200/80 mt-3">
            <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={data.personalInfo.email} />
            <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={data.personalInfo.phone} />
            <ContactRow icon={<MapPin className="w-3.5 h-3.5" />} value={data.personalInfo.address} />
          </div>
        </div>
      </div>
      <div className="p-8">
        {data.personalInfo.summary && <div className="mb-6"><h2 className="text-lg font-bold text-[#92400e] border-b-2 border-[#d97706] pb-1 mb-3">نبذة شخصية</h2><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-lg font-bold text-[#92400e] border-b-2 border-[#d97706] pb-1 mb-3">التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-3 pr-3 border-r-2 border-[#d97706]/40"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.degree} {e.fieldOfStudy && `- ${e.fieldOfStudy}`}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-gray-600">{e.institution}</p></div>)}</div>}
        {data.experience[0]?.company && <div className="mb-6"><h2 className="text-lg font-bold text-[#92400e] border-b-2 border-[#d97706] pb-1 mb-3">الخبرات العملية</h2>{data.experience.map((e, i) => <div key={i} className="mb-4 pr-3 border-r-2 border-[#d97706]/40"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.position}</h3><span className="text-xs text-gray-500">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#92400e] font-medium">{e.company}</p>{e.description && <p className="text-sm text-gray-700 mt-1">{e.description}</p>}</div>)}</div>}
        {data.skills[0] && <div className="mb-6"><h2 className="text-lg font-bold text-[#92400e] border-b-2 border-[#d97706] pb-1 mb-3">المهارات</h2><div className="flex flex-wrap gap-2">{data.skills.filter(Boolean).map((s, i) => <span key={i} className="bg-[#d97706]/10 text-[#92400e] border border-[#d97706]/30 text-sm px-3 py-1 rounded-full">{s}</span>)}</div></div>}
        {data.languages[0]?.language && <div><h2 className="text-lg font-bold text-[#92400e] border-b-2 border-[#d97706] pb-1 mb-3">اللغات</h2><div className="grid grid-cols-2 gap-2">{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm"><span className="font-medium">{l.language}</span><span className="text-gray-500 text-xs">{l.level}</span></div>)}</div></div>}
      </div>
    </div>
  );
}

// ── 5. MINIMAL (black & white) ────────────────────────────────────────
function MinimalTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white p-10">
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-5 text-xs text-gray-500 uppercase tracking-widest">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </div>
      {data.personalInfo.summary && <div className="mb-6"><p className="text-sm text-gray-600 leading-relaxed">{data.personalInfo.summary}</p></div>}
      {data.education[0]?.institution && <div className="mb-6"><h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-2 flex justify-between"><div><span className="font-semibold text-gray-800 text-sm">{e.institution}</span><span className="text-gray-500 text-xs mr-2">— {e.degree} {e.fieldOfStudy && `/ ${e.fieldOfStudy}`}</span></div><span className="text-xs text-gray-400">{e.startDate} {e.endDate && `– ${e.endDate}`}</span></div>)}</div>}
      {data.experience[0]?.company && <div className="mb-6"><h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">الخبرات</h2>{data.experience.map((e, i) => <div key={i} className="mb-3"><div className="flex justify-between"><span className="font-semibold text-gray-800 text-sm">{e.position} — {e.company}</span><span className="text-xs text-gray-400">{e.startDate} {e.endDate && `– ${e.endDate}`}</span></div>{e.description && <p className="text-xs text-gray-600 mt-1">{e.description}</p>}</div>)}</div>}
      {data.skills[0] && <div className="mb-6"><h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">المهارات</h2><p className="text-sm text-gray-700">{data.skills.filter(Boolean).join("  ·  ")}</p></div>}
      {data.languages[0]?.language && <div><h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">اللغات</h2><p className="text-sm text-gray-700">{data.languages.filter(l => l.language).map(l => `${l.language} (${l.level})`).join("  ·  ")}</p></div>}
    </div>
  );
}

// ── 6. TECH (dark + green) ────────────────────────────────────────────
function TechTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-[#0d1117] text-gray-100 flex min-h-[800px]">
      <div className="w-1/3 bg-[#161b22] border-l border-[#30363d] p-6">
        <div className="w-14 h-14 bg-[#10b981] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">{data.personalInfo.fullName.charAt(0)}</div>
        <h1 className="text-xl font-bold text-white mb-1">{data.personalInfo.fullName}</h1>
        <div className="space-y-2 text-xs text-gray-400 mb-8 mt-3">
          {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-[#10b981]" />{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-[#10b981]" />{data.personalInfo.phone}</div>}
          {data.personalInfo.address && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-[#10b981]" />{data.personalInfo.address}</div>}
        </div>
        {data.skills[0] && <div className="mb-6"><h2 className="text-xs font-bold text-[#10b981] uppercase tracking-widest mb-3">Skills</h2><div className="flex flex-wrap gap-1">{data.skills.filter(Boolean).map((s, i) => <span key={i} className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 text-xs px-2 py-0.5 rounded font-mono">{s}</span>)}</div></div>}
        {data.languages[0]?.language && <div><h2 className="text-xs font-bold text-[#10b981] uppercase tracking-widest mb-3">Languages</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-xs mb-1 text-gray-400"><span>{l.language}</span><span className="text-[#10b981]">{l.level}</span></div>)}</div>}
      </div>
      <div className="w-2/3 p-6">
        {data.personalInfo.summary && <div className="mb-6 bg-[#161b22] rounded-lg p-4 border border-[#30363d]"><p className="text-sm text-gray-300 leading-relaxed font-mono">{data.personalInfo.summary}</p></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-sm font-bold text-[#10b981] uppercase tracking-widest mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4" />Education</h2>{data.education.map((e, i) => <div key={i} className="mb-3 border-r-2 border-[#10b981]/30 pr-3"><div className="flex justify-between"><h3 className="font-bold text-white text-sm">{e.degree} {e.fieldOfStudy && `/ ${e.fieldOfStudy}`}</h3><span className="text-xs text-gray-500 font-mono">{e.startDate}</span></div><p className="text-xs text-[#10b981]">{e.institution}</p></div>)}</div>}
        {data.experience[0]?.company && <div><h2 className="text-sm font-bold text-[#10b981] uppercase tracking-widest mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" />Experience</h2>{data.experience.map((e, i) => <div key={i} className="mb-4 border-r-2 border-[#10b981]/30 pr-3"><div className="flex justify-between"><h3 className="font-bold text-white text-sm">{e.position}</h3><span className="text-xs text-gray-500 font-mono">{e.startDate} {e.endDate && `→ ${e.endDate}`}</span></div><p className="text-xs text-[#10b981] mb-1">{e.company}</p>{e.description && <p className="text-xs text-gray-400">{e.description}</p>}</div>)}</div>}
      </div>
    </div>
  );
}

// ── 7. EXECUTIVE (dark navy sidebar) ─────────────────────────────────
function ExecutiveTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white flex min-h-[800px]">
      <div className="w-2/5 bg-[#1e1b4b] text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white leading-snug mb-2">{data.personalInfo.fullName}</h1>
          <div className="w-12 h-0.5 bg-[#818cf8] mb-4" />
          <div className="space-y-2 text-sm text-indigo-200">
            {data.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" /><span className="break-all">{data.personalInfo.email}</span></div>}
            {data.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" />{data.personalInfo.phone}</div>}
            {data.personalInfo.address && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" />{data.personalInfo.address}</div>}
          </div>
        </div>
        {data.personalInfo.summary && <div className="mb-8"><h2 className="text-xs font-bold text-[#818cf8] uppercase tracking-widest mb-3">الملخص</h2><p className="text-sm text-indigo-100 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.skills[0] && <div className="mb-8"><h2 className="text-xs font-bold text-[#818cf8] uppercase tracking-widest mb-3">المهارات</h2><div className="space-y-1">{data.skills.filter(Boolean).map((s, i) => <div key={i} className="flex items-center gap-2 text-sm text-indigo-100"><div className="w-1.5 h-1.5 bg-[#818cf8] rounded-full" />{s}</div>)}</div></div>}
        {data.languages[0]?.language && <div><h2 className="text-xs font-bold text-[#818cf8] uppercase tracking-widest mb-3">اللغات</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm text-indigo-100 mb-1"><span>{l.language}</span><span className="text-[#818cf8] text-xs">{l.level}</span></div>)}</div>}
      </div>
      <div className="w-3/5 p-8">
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-sm font-bold text-[#4338ca] uppercase tracking-widest mb-4 flex items-center gap-2"><GraduationCap className="w-4 h-4" />التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-3"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.degree} {e.fieldOfStudy && `/ ${e.fieldOfStudy}`}</h3><span className="text-xs text-gray-400">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#4338ca]">{e.institution}</p></div>)}</div>}
        {data.experience[0]?.company && <div><h2 className="text-sm font-bold text-[#4338ca] uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4" />الخبرات العملية</h2>{data.experience.map((e, i) => <div key={i} className="mb-5 border-b border-gray-100 pb-4 last:border-0"><div className="flex justify-between mb-1"><h3 className="font-bold text-gray-900">{e.position}</h3><span className="text-xs text-gray-400 bg-[#4338ca]/5 px-2 py-0.5 rounded">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#4338ca] font-medium mb-1">{e.company}</p>{e.description && <p className="text-sm text-gray-600">{e.description}</p>}</div>)}</div>}
      </div>
    </div>
  );
}

// ── 8. MEDICAL (blue healthcare) ──────────────────────────────────────
function MedicalTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#0c4a6e] to-[#0284c7] text-white p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">{data.personalInfo.fullName.charAt(0)}</div>
          <div>
            <h1 className="text-2xl font-bold">{data.personalInfo.fullName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-sky-100 mt-2">
              <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={data.personalInfo.email} />
              <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={data.personalInfo.phone} />
              <ContactRow icon={<MapPin className="w-3.5 h-3.5" />} value={data.personalInfo.address} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        {data.personalInfo.summary && <div className="mb-6 bg-sky-50 border-r-4 border-[#0284c7] p-4 rounded-l"><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-base font-bold text-[#0c4a6e] border-b-2 border-[#0284c7] pb-1 mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4" />المؤهلات العلمية</h2>{data.education.map((e, i) => <div key={i} className="mb-3 flex justify-between"><div><h3 className="font-bold text-gray-800">{e.degree} {e.fieldOfStudy && `- ${e.fieldOfStudy}`}</h3><p className="text-sm text-[#0284c7]">{e.institution}</p></div><span className="text-xs text-gray-500 shrink-0 mr-4">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div>)}</div>}
        {data.experience[0]?.company && <div className="mb-6"><h2 className="text-base font-bold text-[#0c4a6e] border-b-2 border-[#0284c7] pb-1 mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" />الخبرات المهنية</h2>{data.experience.map((e, i) => <div key={i} className="mb-4 pr-3 border-r-2 border-sky-200"><div className="flex justify-between"><h3 className="font-bold text-gray-800">{e.position}</h3><span className="text-xs text-gray-400">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#0284c7] font-medium">{e.company}</p>{e.description && <p className="text-sm text-gray-600 mt-1">{e.description}</p>}</div>)}</div>}
        <div className="grid grid-cols-2 gap-6">
          {data.skills[0] && <div><h2 className="text-base font-bold text-[#0c4a6e] border-b-2 border-[#0284c7] pb-1 mb-3">المهارات</h2><div className="flex flex-wrap gap-1">{data.skills.filter(Boolean).map((s, i) => <span key={i} className="bg-sky-50 text-[#0284c7] border border-sky-200 text-xs px-2 py-1 rounded">{s}</span>)}</div></div>}
          {data.languages[0]?.language && <div><h2 className="text-base font-bold text-[#0c4a6e] border-b-2 border-[#0284c7] pb-1 mb-3">اللغات</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm mb-1"><span className="font-medium">{l.language}</span><span className="text-gray-500 text-xs">{l.level}</span></div>)}</div>}
        </div>
      </div>
    </div>
  );
}

// ── 9. ACADEMIC (pink/maroon) ─────────────────────────────────────────
function AcademicTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      <div className="text-center py-10 px-8 bg-gradient-to-b from-[#4a1942]/5 to-transparent border-b-2 border-[#be185d]/20">
        <h1 className="text-3xl font-bold text-[#4a1942] mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-3">
          {data.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#be185d]" />{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#be185d]" />{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#be185d]" />{data.personalInfo.address}</span>}
        </div>
      </div>
      <div className="p-8">
        {data.personalInfo.summary && <div className="mb-6"><h2 className="text-base font-bold text-[#4a1942] mb-2">ملخص أكاديمي</h2><div className="bg-[#be185d]/5 border border-[#be185d]/15 rounded-lg p-4"><p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p></div></div>}
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-base font-bold text-[#4a1942] border-b border-[#be185d]/30 pb-1 mb-3">المؤهلات الأكاديمية</h2>{data.education.map((e, i) => <div key={i} className="mb-3 grid grid-cols-4 gap-2"><div className="col-span-3"><h3 className="font-bold text-gray-800 text-sm">{e.degree} {e.fieldOfStudy && `في ${e.fieldOfStudy}`}</h3><p className="text-sm text-[#be185d]">{e.institution}</p></div><div className="text-right text-xs text-gray-500">{e.startDate} {e.endDate && <><br />{e.endDate}</>}</div></div>)}</div>}
        {data.experience[0]?.company && <div className="mb-6"><h2 className="text-base font-bold text-[#4a1942] border-b border-[#be185d]/30 pb-1 mb-3">الخبرة التدريسية والبحثية</h2>{data.experience.map((e, i) => <div key={i} className="mb-3 grid grid-cols-4 gap-2"><div className="col-span-3"><h3 className="font-bold text-gray-800 text-sm">{e.position}</h3><p className="text-sm text-[#be185d]">{e.company}</p>{e.description && <p className="text-xs text-gray-600 mt-1">{e.description}</p>}</div><div className="text-right text-xs text-gray-500">{e.startDate} {e.endDate && <><br />{e.endDate}</>}</div></div>)}</div>}
        <div className="grid grid-cols-2 gap-8">
          {data.skills[0] && <div><h2 className="text-base font-bold text-[#4a1942] border-b border-[#be185d]/30 pb-1 mb-3">التخصصات والمهارات</h2><ul className="space-y-1">{data.skills.filter(Boolean).map((s, i) => <li key={i} className="text-sm text-gray-700 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#be185d] rounded-full" />{s}</li>)}</ul></div>}
          {data.languages[0]?.language && <div><h2 className="text-base font-bold text-[#4a1942] border-b border-[#be185d]/30 pb-1 mb-3">اللغات</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm mb-1"><span className="font-medium text-gray-800">{l.language}</span><span className="text-gray-500 text-xs">{l.level}</span></div>)}</div>}
        </div>
      </div>
    </div>
  );
}

// ── 10. BOLD (red + strong) ───────────────────────────────────────────
function BoldTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white">
      <div className="bg-[#7f1d1d] p-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-1">{data.personalInfo.fullName}</h1>
        <div className="w-24 h-1 bg-[#ef4444] mb-4" />
        <div className="flex flex-wrap gap-4 text-sm text-red-100">
          <ContactRow icon={<Mail className="w-3.5 h-3.5" />} value={data.personalInfo.email} />
          <ContactRow icon={<Phone className="w-3.5 h-3.5" />} value={data.personalInfo.phone} />
          <ContactRow icon={<MapPin className="w-3.5 h-3.5" />} value={data.personalInfo.address} />
        </div>
      </div>
      {data.personalInfo.summary && <div className="bg-[#ef4444] text-white px-8 py-4"><p className="text-sm leading-relaxed">{data.personalInfo.summary}</p></div>}
      <div className="p-8">
        {data.education[0]?.institution && <div className="mb-6"><h2 className="text-xl font-black text-[#7f1d1d] uppercase mb-3">التعليم</h2>{data.education.map((e, i) => <div key={i} className="mb-3 border-r-4 border-[#ef4444] pr-4"><div className="flex justify-between"><h3 className="font-bold text-gray-900">{e.degree} {e.fieldOfStudy && `/ ${e.fieldOfStudy}`}</h3><span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#ef4444] font-bold">{e.institution}</p></div>)}</div>}
        {data.experience[0]?.company && <div className="mb-6"><h2 className="text-xl font-black text-[#7f1d1d] uppercase mb-3">الخبرات</h2>{data.experience.map((e, i) => <div key={i} className="mb-4 border-r-4 border-[#ef4444] pr-4"><div className="flex justify-between"><h3 className="font-bold text-gray-900">{e.position}</h3><span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{e.startDate} {e.endDate && `- ${e.endDate}`}</span></div><p className="text-sm text-[#ef4444] font-bold">{e.company}</p>{e.description && <p className="text-sm text-gray-700 mt-1">{e.description}</p>}</div>)}</div>}
        <div className="grid grid-cols-2 gap-6">
          {data.skills[0] && <div><h2 className="text-xl font-black text-[#7f1d1d] uppercase mb-3">المهارات</h2><div className="flex flex-wrap gap-2">{data.skills.filter(Boolean).map((s, i) => <span key={i} className="bg-[#7f1d1d] text-white text-sm px-3 py-1 rounded font-bold">{s}</span>)}</div></div>}
          {data.languages[0]?.language && <div><h2 className="text-xl font-black text-[#7f1d1d] uppercase mb-3">اللغات</h2>{data.languages.filter(l => l.language).map((l, i) => <div key={i} className="flex justify-between text-sm mb-1"><span className="font-bold text-gray-800">{l.language}</span><span className="text-[#ef4444] font-bold text-xs">{l.level}</span></div>)}</div>}
        </div>
      </div>
    </div>
  );
}
