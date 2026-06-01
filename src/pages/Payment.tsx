import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CVData } from "@/types/cv";
import {
  Smartphone,
  CreditCard,
  Shield,
  ChevronLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [senderPhone, setSenderPhone] = useState("");
  const [senderName, setSenderName] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("cv_data");
    if (!stored) {
      navigate("/create-cv");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as CVData;
      setCvData(parsed);
      setSenderName(parsed.personalInfo.fullName);
    } catch {
      navigate("/create-cv");
    }
  }, [navigate]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!senderPhone.trim()) newErrors.senderPhone = "رقم الهاتف المُرسل منه مطلوب";
    if (!senderName.trim()) newErrors.senderName = "اسم المُرسل مطلوب";
    if (!transactionCode.trim()) newErrors.transactionCode = "رقم العملية مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store payment info
    localStorage.setItem("payment_info", JSON.stringify({
      senderPhone,
      senderName,
      transactionCode,
      amount: 5000,
      date: new Date().toISOString(),
    }));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Redirect to preview after showing success
    setTimeout(() => {
      navigate("/preview");
    }, 2000);
  };

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a5fb4]" />
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">تم الدفع بنجاح!</h1>
          <p className="text-muted-foreground mb-4">
            تم تأكيد عملية الدفع عبر سيرياتيل كاش
          </p>
          <p className="text-sm text-muted-foreground">
            جاري تحويلك لصفحة معاينة السيرة الذاتية...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">الدفع عبر سيرياتيل كاش</h1>
            <p className="text-muted-foreground">
              أكمل عملية الدفع للحصول على سيرتك الذاتية الاحترافية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Payment Instructions */}
            <div className="lg:col-span-3 space-y-6">
              {/* Steps to Pay */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#1a5fb4]" />
                  خطوات الدفع
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1a5fb4] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">اتصل بـ #988</h3>
                      <p className="text-sm text-muted-foreground">
                        من خط سيرياتيل موبايل، اتصل بالرقم #988 لخدمة سيرياتيل كاش
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1a5fb4] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">اختر "تحويل أموال"</h3>
                      <p className="text-sm text-muted-foreground">
                        من القائمة الرئيسية، اختر خيار تحويل الأموال
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1a5fb4] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">أدخل الرقم المستقبل</h3>
                      <p className="text-sm text-muted-foreground">
                        أدخل الرقم: <strong dir="ltr" className="text-[#1a5fb4]">0981 234 567</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1a5fb4] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">أدخل المبلغ</h3>
                      <p className="text-sm text-muted-foreground">
                        أدخل المبلغ: <strong className="text-[#1a5fb4]">5,000 ليرة سورية</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1a5fb4] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">أكد العملية</h3>
                      <p className="text-sm text-muted-foreground">
                        أدخل رقم PIN الخاص بك لتأكيد العملية واحفظ رقم العملية
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#1a5fb4]" />
                  تأكيد عملية الدفع
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">اسم المُرسل *</Label>
                    <Input
                      id="senderName"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="أدخل اسمك كما ظهر في عملية التحويل"
                      className={errors.senderName ? "border-red-500" : ""}
                    />
                    {errors.senderName && <p className="text-red-500 text-xs">{errors.senderName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senderPhone">رقم الهاتف المُرسل منه *</Label>
                    <Input
                      id="senderPhone"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="مثال: 0987654321"
                      dir="ltr"
                      className={errors.senderPhone ? "border-red-500" : ""}
                    />
                    {errors.senderPhone && <p className="text-red-500 text-xs">{errors.senderPhone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionCode">رقم عملية التحويل *</Label>
                    <Input
                      id="transactionCode"
                      value={transactionCode}
                      onChange={(e) => setTransactionCode(e.target.value)}
                      placeholder="أدخل رقم العملية الذي تلقيته"
                      dir="ltr"
                      className={errors.transactionCode ? "border-red-500" : ""}
                    />
                    {errors.transactionCode && <p className="text-red-500 text-xs">{errors.transactionCode}</p>}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      تجد رقم العملية في رسالة التأكيد التي تلقيتها
                    </p>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] font-bold py-6 text-lg rounded-xl shadow-lg shadow-[#1a5fb4]/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin ml-2" />
                        جاري التحقق...
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-5 h-5 ml-2" />
                        تأكيد الدفع
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-24">
                <h2 className="text-lg font-bold mb-4">ملخص الطلب</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">السيرة الذاتية</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">القالب</span>
                    <span className="font-medium">
                      {cvData?.template === "modern" ? "عصري" : cvData?.template === "classic" ? "كلاسيكي" : "إبداعي"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">الصيغة</span>
                    <span className="font-medium">PDF</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">المجموع</span>
                    <span className="text-2xl font-bold text-[#1a5fb4]">5,000 ل.س</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600 shrink-0" />
                  <span>الدفع آمن عبر سيرياتيل كاش</span>
                </div>

                <div className="mt-4 p-3 bg-[#1a5fb4]/5 rounded-lg border border-[#1a5fb4]/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Smartphone className="w-4 h-4 text-[#1a5fb4]" />
                    <span className="font-medium">رقم سيرياتيل كاش:</span>
                  </div>
                  <p className="text-lg font-bold text-[#1a5fb4] text-center mt-1" dir="ltr">
                    0981 234 567
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ChevronLeft className="w-3 h-3" />
                  <button
                    onClick={() => navigate("/create-cv")}
                    className="hover:text-[#1a5fb4] transition-colors"
                  >
                    العودة لتعديل السيرة الذاتية
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
