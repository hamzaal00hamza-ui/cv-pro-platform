import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  Palette,
  Download,
  Shield,
  Zap,
  Star,
  ChevronLeft,
  Sparkles,
  Layout,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a5fb4]/5 via-transparent to-[#3b82f6]/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1a5fb4]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#1a5fb4]/10 text-[#1a5fb4] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              أنشئ سيرتك الذاتية باحترافية
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              سيرة ذاتية احترافية
              <br />
              <span className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] bg-clip-text text-transparent">
                تفتح لك أبواب المستقبل
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              صمم سيرتك الذاتية بأحدث القوالب الاحترافية خلال دقائق. احصل على سيرة ذاتية مميزة تلفت انتباه أصحاب العمل وتزيد فرصك في الحصول على وظيفتك المثالية.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/create-cv">
                <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#1a5fb4]/25 hover:shadow-xl hover:shadow-[#1a5fb4]/30 transition-all hover:-translate-y-1">
                  ابدأ الآن مجاناً
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                فقط 5,000 ليرة سورية للتحميل
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <div className="text-2xl font-bold text-[#1a5fb4]">+1000</div>
                <div className="text-xs text-muted-foreground mt-1">سيرة ذاتية</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <div className="text-2xl font-bold text-[#1a5fb4]">3</div>
                <div className="text-xs text-muted-foreground mt-1">قوالب احترافية</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
                <div className="text-2xl font-bold text-[#1a5fb4]">100%</div>
                <div className="text-xs text-muted-foreground mt-1">راضٍ عن الخدمة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">مميزات منصتنا</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              كل ما تحتاجه لإنشاء سيرة ذاتية احترافية في مكان واحد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Palette className="w-6 h-6" />}
              title="قوالب متنوعة"
              description="اختر من بين مجموعة من القوالب الاحترافية المصممة بعناية"
              color="from-[#1a5fb4] to-[#3b82f6]"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="سريع وسهل"
              description="أنشئ سيرتك الذاتية في دقائق بخطوات بسيطة وواضحة"
              color="from-[#16a34a] to-[#22c55e]"
            />
            <FeatureCard
              icon={<Download className="w-6 h-6" />}
              title="تحميل PDF"
              description="احصل على سيرتك الذاتية بصيغة PDF عالية الجودة"
              color="from-[#ea580c] to-[#f97316]"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="آمن وموثوق"
              description="بياناتك محمية وآمنة مع نظام دفع موثوق عبر سيرياتيل كاش"
              color="from-[#9333ea] to-[#a855f7]"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">كيفية العمل</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              ثلاث خطوات بسيطة تفصلك عن سيرة ذاتية احترافية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              icon={<FileText className="w-8 h-8" />}
              title="أدخل بياناتك"
              description="املأ النموذج ببياناتك الشخصية والتعليمية والمهنية بخطوات منظمة"
            />
            <StepCard
              number="02"
              icon={<Layout className="w-8 h-8" />}
              title="اختر القالب"
              description="اختر القالب الذي يناسب شخصيتك ومجال عملك من بين قوالبنا الاحترافية"
            />
            <StepCard
              number="03"
              icon={<Download className="w-8 h-8" />}
              title="ادفع وحمّل"
              description="أكمل الدفع عبر سيرياتيل كاش واحصل على سيرتك الذاتية فوراً"
            />
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">قوالب احترافية</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              اختر من بين تصاميمنا الاحترافية المختلفة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TemplatePreview
              name="عصري"
              description="تصميم عصري وأنيق مناسب لجميع المجالات"
              gradient="from-[#1a5fb4] to-[#3b82f6]"
              features={["تصميم نظيف", "ألوان جذابة", "سهل القراءة"]}
            />
            <TemplatePreview
              name="كلاسيكي"
              description="تصميم تقليدي احترافي للوظائف الرسمية"
              gradient="from-[#374151] to-[#6b7280]"
              features={["أسلوب رسمي", "تخطيط منظم", "مناسب للشركات"]}
            />
            <TemplatePreview
              name="إبداعي"
              description="تصميم مميز للمجالات الإبداعية"
              gradient="from-[#7c3aed] to-[#a78bfa]"
              features={["ألوان مميزة", "تصميم فريد", "للمجالات الإبداعية"]}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">السعر</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              سعر بسيط وميسور لسيرة ذاتية احترافية
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#1a5fb4] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white text-center py-2 text-sm font-bold">
                الأكثر طلباً
              </div>
              <div className="p-8 pt-12">
                <h3 className="text-xl font-bold text-center mb-2">باقة السيرة الذاتية</h3>
                <p className="text-muted-foreground text-center text-sm mb-6">
                  سيرة ذاتية احترافية بصيغة PDF
                </p>

                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-[#1a5fb4]">5,000</span>
                  <span className="text-lg text-muted-foreground mr-1">ليرة سورية</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <PricingFeature text="3 قوالب احترافية" />
                  <PricingFeature text="تحميل بصيغة PDF" />
                  <PricingFeature text="تصميم عالي الجودة" />
                  <PricingFeature text="سيرة ذاتية لمدى الحياة" />
                  <PricingFeature text="دعم فني متواصل" />
                </ul>

                <Link to="/create-cv">
                  <Button className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#1a5fb4]/25">
                    ابدأ الآن
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>دفع آمن عبر سيرياتيل كاش</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ابدأ رحلتك المهنية اليوم
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            لا تنتظر الفرصة، اصنعها بنفسك بسيرة ذاتية احترافية تبرز مهاراتك وخبراتك
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/create-cv">
              <Button className="bg-white text-[#1a5fb4] hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-xl">
                أنشئ سيرتك الذاتية
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>تستغرق أقل من 10 دقائق</span>
            </div>
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
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border text-center hover:shadow-md transition-all hover:-translate-y-1 relative">
      <div className="absolute -top-4 right-6 bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full">
        الخطوة {number}
      </div>
      <div className="w-16 h-16 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-xl flex items-center justify-center text-white mx-auto mb-4 mt-2">
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function TemplatePreview({ name, description, gradient, features }: { name: string; description: string; gradient: string; features: string[] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
      <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-32 h-40 flex flex-col gap-2">
          <div className="w-full h-2 bg-white/60 rounded" />
          <div className="w-3/4 h-2 bg-white/40 rounded" />
          <div className="w-full h-1 bg-white/30 rounded mt-2" />
          <div className="w-full h-1 bg-white/30 rounded" />
          <div className="w-2/3 h-1 bg-white/30 rounded" />
          <div className="w-full h-1 bg-white/30 rounded mt-2" />
          <div className="w-5/6 h-1 bg-white/30 rounded" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {features.map((f, i) => (
            <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <Star className="w-4 h-4 text-[#1a5fb4] fill-[#1a5fb4]" />
      {text}
    </li>
  );
}
