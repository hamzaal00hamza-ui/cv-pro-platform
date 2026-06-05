import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CV_TEMPLATES } from "@/types/cv";
import { FileText, Palette, Download, Shield, Zap, Star, ChevronLeft, Sparkles, Layout, Clock, Phone, MessageCircle } from "lucide-react";

const TEMPLATE_COLORS: Record<string, string> = {
  modern: "from-[#1a5fb4] to-[#3b82f6]", classic: "from-[#374151] to-[#6b7280]",
  creative: "from-[#7c3aed] to-[#a78bfa]", elegant: "from-[#92400e] to-[#d97706]",
  minimal: "from-[#0f172a] to-[#334155]", tech: "from-[#065f46] to-[#10b981]",
  executive: "from-[#1e1b4b] to-[#4338ca]", medical: "from-[#0c4a6e] to-[#0284c7]",
  academic: "from-[#4a1942] to-[#be185d]", bold: "from-[#7f1d1d] to-[#ef4444]",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a5fb4]/5 via-transparent to-[#3b82f6]/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a5fb4]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a5fb4]/10 text-[#1a5fb4] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />أنشئ سيرتك الذاتية باحترافية
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            سيرة ذاتية احترافية<br />
            <span className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] bg-clip-text text-transparent">تفتح لك أبواب المستقبل</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            صمم سيرتك الذاتية بأحدث القوالب الاحترافية خلال دقائق. احصل على سيرة ذاتية مميزة تلفت انتباه أصحاب العمل.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link to="/create-cv">
              <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#1a5fb4]/25 hover:-translate-y-1 transition-all w-full sm:w-auto">
                ابدأ الآن <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
            <a href="/payment" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] hover:from-[#15803d] hover:to-[#16a34a] text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg w-full gap-2">
                💳 إيداع وشراء
              </Button>
            </a>
            <a href="https://wa.me/963982493924" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" className="px-6 py-6 rounded-xl border-2 border-green-500 text-green-700 hover:bg-green-50 font-bold w-full gap-2">
                💬 واتساب
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[["1000+", "سيرة ذاتية"], ["10", "قوالب احترافية"], ["100%", "راضٍ عن الخدمة"]].map(([v, l], i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <div className="text-2xl font-bold text-[#1a5fb4]">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <div className="bg-[#1a5fb4] text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span dir="ltr">0982 493 924</span></div>
          <span className="hidden sm:block text-white/40">|</span>
          <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /><a href="https://wa.me/963982493924" className="hover:underline">واتساب: 0982 493 924</a></div>
          <span className="hidden sm:block text-white/40">|</span>
          <span>الدفع عبر سيرياتيل كاش: 0982 493 924</span>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مميزات منصتنا</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">كل ما تحتاجه لإنشاء سيرة ذاتية احترافية في مكان واحد</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Palette className="w-6 h-6" />} title="10 قوالب احترافية" description="اختر من بين 10 قوالب متنوعة لكل المجالات والتخصصات" color="from-[#1a5fb4] to-[#3b82f6]" />
            <FeatureCard icon={<Zap className="w-6 h-6" />} title="سريع وسهل" description="أنشئ سيرتك الذاتية في دقائق بخطوات بسيطة وواضحة" color="from-[#16a34a] to-[#22c55e]" />
            <FeatureCard icon={<Download className="w-6 h-6" />} title="تحميل PDF" description="احصل على سيرتك الذاتية بصيغة PDF عالية الجودة" color="from-[#ea580c] to-[#f97316]" />
            <FeatureCard icon={<Shield className="w-6 h-6" />} title="دفع آمن تلقائي" description="تحقق تلقائي فوري من دفعتك عبر سيرياتيل كاش" color="from-[#9333ea] to-[#a855f7]" />
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">10 قوالب احترافية</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">قالب لكل مجال ومناسبة — اختر ما يعبر عنك</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CV_TEMPLATES.map((t) => (
              <Link to="/create-cv" key={t.id}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className={`h-28 bg-gradient-to-br ${TEMPLATE_COLORS[t.id] || "from-gray-400 to-gray-600"} flex items-center justify-center`}>
                    <div className="bg-white/20 backdrop-blur-sm rounded p-2 w-16 h-20 flex flex-col gap-1">
                      <div className="w-full h-1.5 bg-white/60 rounded" />
                      <div className="w-3/4 h-1 bg-white/40 rounded" />
                      <div className="w-full h-0.5 bg-white/30 rounded mt-1" />
                      <div className="w-full h-0.5 bg-white/30 rounded" />
                      <div className="w-2/3 h-0.5 bg-white/30 rounded" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-center group-hover:text-[#1a5fb4] transition-colors">{t.name}</h3>
                    <p className="text-xs text-muted-foreground text-center mt-0.5 leading-snug">{t.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/create-cv">
              <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-bold px-8 py-5 rounded-xl shadow-lg">
                ابدأ الآن وأنشئ سيرتك <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">كيفية العمل</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">ثلاث خطوات بسيطة تفصلك عن سيرة ذاتية احترافية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="01" icon={<FileText className="w-8 h-8" />} title="أدخل بياناتك" description="املأ النموذج ببياناتك الشخصية والتعليمية والمهنية بخطوات منظمة" />
            <StepCard number="02" icon={<Layout className="w-8 h-8" />} title="اختر القالب" description="اختر من بين 10 قوالب احترافية ما يناسب شخصيتك ومجالك" />
            <StepCard number="03" icon={<Download className="w-8 h-8" />} title="ادفع وحمّل" description="أكمل الدفع عبر سيرياتيل كاش وتحقق تلقائي فوري ثم حمّل PDF" />
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">طرق الإيداع</h2>
            <p className="text-muted-foreground">ادفع بسهولة عبر خدمات الدفع المتاحة في سوريا</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl shrink-0">🟢</div>
              <div>
                <h3 className="font-bold text-lg mb-1">سيرياتيل كاش</h3>
                <p className="text-[#1a5fb4] font-bold text-xl" dir="ltr">0982 493 924</p>
                <p className="text-sm text-muted-foreground mt-1">المبلغ: 5,000 ل.س</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl shrink-0">💬</div>
              <div>
                <h3 className="font-bold text-lg mb-1">تواصل معنا</h3>
                <a href="https://wa.me/963982493924" className="text-green-600 font-bold text-xl hover:underline" dir="ltr">0982 493 924</a>
                <p className="text-sm text-muted-foreground mt-1">واتساب متاح 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">السعر</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">سعر بسيط وميسور لسيرة ذاتية احترافية</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1a5fb4] overflow-hidden relative">
              <div className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white text-center py-2 text-sm font-bold">الأكثر طلباً</div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-center mb-2">باقة السيرة الذاتية</h3>
                <p className="text-muted-foreground text-center text-sm mb-6">سيرة ذاتية احترافية بصيغة PDF</p>
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-[#1a5fb4]">5,000</span>
                  <span className="text-lg text-muted-foreground mr-1">ليرة سورية</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["10 قوالب احترافية", "تحميل بصيغة PDF", "تحقق تلقائي من الدفع", "تصميم عالي الجودة", "دعم فني عبر واتساب"].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-[#1a5fb4] fill-[#1a5fb4]" />{f}</li>
                  ))}
                </ul>
                <Link to="/create-cv">
                  <Button className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-bold py-6 text-lg rounded-xl shadow-lg">ابدأ الآن</Button>
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" /><span>دفع آمن وتحقق تلقائي فوري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك المهنية اليوم</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">لا تنتظر الفرصة، اصنعها بنفسك بسيرة ذاتية احترافية</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/create-cv">
              <Button className="bg-white text-[#1a5fb4] hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-xl">أنشئ سيرتك الذاتية</Button>
            </Link>
            <a href="https://wa.me/963982493924" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 gap-2 px-6 py-6 rounded-xl">
                <MessageCircle className="w-5 h-5" />تواصل معنا
              </Button>
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-400"><Clock className="w-4 h-4" /><span>تستغرق أقل من 10 دقائق</span></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1 group">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-md transition-all hover:-translate-y-1 relative">
      <div className="absolute -top-4 right-6 bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full">الخطوة {number}</div>
      <div className="w-16 h-16 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-xl flex items-center justify-center text-white mx-auto mb-4 mt-2">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
