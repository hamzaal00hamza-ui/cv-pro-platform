import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, User } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, User as UserIcon, Bell, Shield, LogOut, Save, Eye, EyeOff } from "lucide-react";

type Tab = "profile" | "security" | "notifications";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { navigate("/login"); return; }
    setUser(u);
    setName(u.name);
    setEmail(u.email);
  }, [navigate]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  if (!user) return null;

  const tabs: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "profile", label: "الملف الشخصي", icon: UserIcon },
    { id: "security", label: "الأمان", icon: Shield },
    { id: "notifications", label: "الإشعارات", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">الإعدادات</h1>
              <p className="text-muted-foreground text-sm">إدارة حسابك وتفضيلاتك</p>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar tabs */}
            <div className="w-48 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-border p-2 space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      tab === id ? "bg-[#1a5fb4] text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />{label}
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                    <LogOut className="w-4 h-4 shrink-0" />تسجيل الخروج
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {tab === "profile" && (
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h2 className="font-bold text-lg mb-6">الملف الشخصي</h2>
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {user.role === "admin" ? "مدير" : "مستخدم"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>الاسم الكامل</Label>
                      <Input value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>البريد الإلكتروني</Label>
                      <Input value={email} onChange={e => setEmail(e.target.value)} type="email" dir="ltr" />
                    </div>
                    <Button onClick={handleSave} className={`gap-2 ${saved ? "bg-green-600 hover:bg-green-600" : "bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6]"} text-white`}>
                      <Save className="w-4 h-4" />{saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
                    </Button>
                  </div>
                </div>
              )}

              {tab === "security" && (
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h2 className="font-bold text-lg mb-6">الأمان</h2>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>كلمة المرور الحالية</Label>
                      <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" dir="ltr" />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>كلمة المرور الجديدة</Label>
                      <Input type="password" placeholder="••••••••" dir="ltr" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>تأكيد كلمة المرور</Label>
                      <Input type="password" placeholder="••••••••" dir="ltr" />
                    </div>
                    <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white gap-2"><Save className="w-4 h-4" />تغيير كلمة المرور</Button>
                  </div>
                </div>
              )}

              {tab === "notifications" && (
                <div className="bg-white rounded-xl shadow-sm border border-border p-6">
                  <h2 className="font-bold text-lg mb-6">الإشعارات</h2>
                  <div className="space-y-4">
                    {[
                      { label: "إشعارات البريد الإلكتروني", desc: "استقبل تحديثات عبر البريد" },
                      { label: "إشعارات الدفع", desc: "تنبيه عند تأكيد الدفع" },
                      { label: "النشرة الإخبارية", desc: "أحدث القوالب والميزات" },
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{n.label}</p>
                          <p className="text-xs text-muted-foreground">{n.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a5fb4]"></div>
                        </label>
                      </div>
                    ))}
                    <Button onClick={handleSave} className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white gap-2"><Save className="w-4 h-4" />حفظ الإعدادات</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
