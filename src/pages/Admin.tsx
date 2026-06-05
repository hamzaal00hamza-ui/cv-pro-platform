import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, getAllUsers, logout, User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Users, FileText, DollarSign, TrendingUp, LogOut, Settings,
  Home, Shield, Eye, Trash2, Search, ChevronDown, Bell, Menu, X
} from "lucide-react";

type Tab = "dashboard" | "users" | "cvs" | "payments" | "settings";

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const current = getCurrentUser();
    if (!current || current.role !== "admin") { navigate("/login"); return; }
    setUser(current);
    setUsers(getAllUsers());
  }, [navigate]);

  const handleLogout = () => { logout(); navigate("/login"); };

  // Mock stats
  const stats = [
    { label: "إجمالي المستخدمين", value: users.length + 12, icon: Users, color: "from-[#1a5fb4] to-[#3b82f6]", change: "+12%" },
    { label: "السير الذاتية", value: 47, icon: FileText, color: "from-[#065f46] to-[#10b981]", change: "+8%" },
    { label: "الإيرادات (ل.س)", value: "235,000", icon: DollarSign, color: "from-[#92400e] to-[#d97706]", change: "+23%" },
    { label: "المدفوعات اليوم", value: 7, icon: TrendingUp, color: "from-[#7c3aed] to-[#a78bfa]", change: "+5%" },
  ];

  const mockCVs = [
    { id: 1, name: "أحمد محمد", template: "عصري", date: "2026-06-05", status: "مكتمل" },
    { id: 2, name: "سارة أحمد", template: "أنيق", date: "2026-06-04", status: "مكتمل" },
    { id: 3, name: "محمد علي", template: "تقني", date: "2026-06-04", status: "مكتمل" },
    { id: 4, name: "فاطمة خالد", template: "أكاديمي", date: "2026-06-03", status: "مكتمل" },
  ];

  const mockPayments = [
    { id: 1, name: "أحمد محمد", phone: "0987654321", amount: 5000, ref: "SYR-001", date: "2026-06-05", status: "مؤكد" },
    { id: 2, name: "سارة أحمد", phone: "0976543210", amount: 5000, ref: "SYR-002", date: "2026-06-04", status: "مؤكد" },
    { id: 3, name: "محمد علي", phone: "0965432109", amount: 5000, ref: "SYR-003", date: "2026-06-03", status: "قيد المراجعة" },
  ];

  const navItems: { id: Tab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "dashboard", label: "لوحة التحكم", icon: Home },
    { id: "users", label: "المستخدمون", icon: Users },
    { id: "cvs", label: "السير الذاتية", icon: FileText },
    { id: "payments", label: "المدفوعات", icon: DollarSign },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-[#0f172a] text-white flex flex-col transition-all duration-300 shrink-0 min-h-screen`}>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10 h-16">
          <div className="w-9 h-9 bg-gradient-to-br from-[#3b82f6] to-[#1a5fb4] rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-white text-lg">لوحة الإدمن</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                tab === id ? "bg-[#1a5fb4] text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm">
              <Home className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>الموقع الرئيسي</span>}
            </button>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-sm">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-bold text-gray-800 text-lg">
              {navItems.find(n => n.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-gray-500 hover:text-gray-700 p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <div className="w-7 h-7 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* Dashboard */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">{s.change}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent CVs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 mb-4">آخر السير الذاتية</h2>
                <div className="space-y-3">
                  {mockCVs.slice(0, 4).map(cv => (
                    <div key={cv.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1a5fb4]/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#1a5fb4]" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-800">{cv.name}</p>
                          <p className="text-xs text-gray-500">قالب: {cv.template}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{cv.date}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{cv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users */}
          {tab === "users" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-800">المستخدمون ({users.length})</h2>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..." className="border border-gray-200 rounded-lg px-3 py-1.5 pr-9 text-sm w-48 focus:outline-none focus:border-[#1a5fb4]" />
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {users.filter(u => u.name.includes(search) || u.email.includes(search)).map(u => (
                  <div key={u.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role === "admin" ? "مدير" : "مستخدم"}</span>
                      <span className="text-xs text-gray-400">{u.createdAt.split("T")[0]}</span>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {users.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">لا يوجد مستخدمون مسجلون بعد</div>}
              </div>
            </div>
          )}

          {/* CVs */}
          {tab === "cvs" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">السير الذاتية ({mockCVs.length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {mockCVs.map(cv => (
                  <div key={cv.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#1a5fb4]/10 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-[#1a5fb4]" /></div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{cv.name}</p>
                        <p className="text-xs text-gray-500">قالب: {cv.template} · {cv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{cv.status}</span>
                      <button className="text-gray-400 hover:text-[#1a5fb4] p-1"><Eye className="w-4 h-4" /></button>
                      <button className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments */}
          {tab === "payments" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">المدفوعات ({mockPayments.length})</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {mockPayments.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500" dir="ltr">{p.phone} · {p.ref}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1a5fb4] text-sm">{p.amount.toLocaleString()} ل.س</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "مؤكد" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{p.status}</span>
                      <span className="text-xs text-gray-400">{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {tab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2"><Settings className="w-5 h-5 text-[#1a5fb4]" />إعدادات الموقع</h2>
                <div className="space-y-4">
                  {[
                    { label: "اسم الموقع", value: "CV Pro", type: "text" },
                    { label: "رقم سيرياتيل كاش", value: "0982493924", type: "text" },
                    { label: "سعر السيرة الذاتية (ل.س)", value: "5000", type: "number" },
                    { label: "البريد الإلكتروني للدعم", value: "support@cvpro.sy", type: "email" },
                  ].map((f, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">{f.label}</label>
                      <input type={f.type} defaultValue={f.value} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a5fb4]" />
                    </div>
                  ))}
                  <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-semibold px-6">حفظ الإعدادات</Button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2"><Shield className="w-5 h-5 text-[#1a5fb4]" />معلومات الحساب</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">الاسم</span><span className="font-medium">{user.name}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-500">البريد الإلكتروني</span><span className="font-medium">{user.email}</span></div>
                  <div className="flex justify-between py-2"><span className="text-gray-500">الصلاحية</span><span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">مدير</span></div>
                </div>
                <Button onClick={handleLogout} variant="outline" className="mt-4 text-red-600 border-red-200 hover:bg-red-50 gap-2"><LogOut className="w-4 h-4" />تسجيل الخروج</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
