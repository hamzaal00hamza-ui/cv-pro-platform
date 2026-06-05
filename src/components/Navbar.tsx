import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Menu, X, Settings, LogOut, User, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout, User as AuthUser } from "@/lib/auth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1a5fb4]">CV Pro</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {isHome ? (
              <>
                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">المميزات</a>
                <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">الأسعار</a>
                <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">كيفية العمل</a>
              </>
            ) : (
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">الصفحة الرئيسية</Link>
            )}
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  {currentUser.role === "admin" && <Shield className="w-3.5 h-3.5 text-purple-500" />}
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    {currentUser.role === "admin" && (
                      <Link to="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors">
                        <Shield className="w-4 h-4" />لوحة الإدمن
                      </Link>
                    )}
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4" />الإعدادات
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="gap-2 border-[#1a5fb4] text-[#1a5fb4] hover:bg-[#1a5fb4]/5">
                  <User className="w-4 h-4" />تسجيل الدخول
                </Button>
              </Link>
            )}
            <Link to="/create-cv">
              <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] text-white font-semibold px-6">
                أنشئ سيرتك الذاتية
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          {isHome ? (
            <>
              <a href="#features" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>المميزات</a>
              <a href="#pricing" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>الأسعار</a>
              <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>كيفية العمل</a>
            </>
          ) : (
            <Link to="/" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>الصفحة الرئيسية</Link>
          )}

          {currentUser ? (
            <>
              <div className="flex items-center gap-2 py-2 border-t border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-full flex items-center justify-center text-white text-sm font-bold">{currentUser.name.charAt(0)}</div>
                <span className="font-medium text-sm">{currentUser.name}</span>
              </div>
              {currentUser.role === "admin" && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-purple-700 py-1"><Shield className="w-4 h-4" />لوحة الإدمن</Link>
              )}
              <Link to="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-gray-600 py-1"><Settings className="w-4 h-4" />الإعدادات</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex items-center gap-2 text-sm text-red-600 py-1"><LogOut className="w-4 h-4" />تسجيل الخروج</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full gap-2 border-[#1a5fb4] text-[#1a5fb4]"><User className="w-4 h-4" />تسجيل الدخول</Button>
            </Link>
          )}
          <Link to="/create-cv" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-semibold">أنشئ سيرتك الذاتية</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
