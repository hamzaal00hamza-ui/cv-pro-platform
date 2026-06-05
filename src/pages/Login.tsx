import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, register, loginWithGoogle } from "@/lib/auth";
import { FileText, Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";

type Mode = "login" | "register";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("يرجى ملء جميع الحقول"); return; }
    if (mode === "register" && !name.trim()) { setError("الاسم مطلوب"); return; }
    if (password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = mode === "login"
      ? login(email.trim(), password)
      : register(name.trim(), email.trim(), password);
    setLoading(false);
    if (!result.success) { setError(result.error || "حدث خطأ"); return; }
    if (result.user?.role === "admin") navigate("/admin");
    else navigate("/");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = loginWithGoogle();
    setGoogleLoading(false);
    if (result.success) navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#1a5fb4] flex items-center justify-center p-4" dir="rtl">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-[#1a5fb4]" />
            </div>
            <span className="text-2xl font-bold text-white">CV Pro</span>
          </Link>
          <p className="text-blue-200 mt-2 text-sm">منصة السيرة الذاتية الاحترافية</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m ? "bg-white shadow text-[#1a5fb4]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {m === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <div className="space-y-4">
            {mode === "register" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="أحمد محمد" className="pr-9" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" className="pr-9" dir="ltr" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pr-9 pl-9" dir="ltr" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-bold py-5 rounded-xl shadow-lg">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">أو</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <Button onClick={handleGoogle} disabled={googleLoading} variant="outline" className="w-full py-5 rounded-xl border-2 font-semibold gap-3 hover:bg-gray-50">
            {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            المتابعة عبر Google
          </Button>

          <p className="text-center text-xs text-gray-400 mt-5">
            {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="text-[#1a5fb4] font-semibold hover:underline">
              {mode === "login" ? "أنشئ حساباً" : "سجّل الدخول"}
            </button>
          </p>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          <Link to="/" className="hover:text-white transition-colors">← العودة للصفحة الرئيسية</Link>
        </p>
      </div>
    </div>
  );
}
