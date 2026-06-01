import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#1a5fb4] to-[#3b82f6] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1a5fb4]">CV Pro</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {isHome ? (
              <>
                <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">
                  المميزات
                </a>
                <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">
                  الأسعار
                </a>
                <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">
                  كيفية العمل
                </a>
              </>
            ) : (
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-[#1a5fb4] transition-colors">
                الصفحة الرئيسية
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/create-cv">
              <Button className="bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] hover:from-[#164ea3] hover:to-[#2563eb] text-white font-semibold px-6">
                أنشئ سيرتك الذاتية
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-3">
          {isHome ? (
            <>
              <a href="#features" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>
                المميزات
              </a>
              <a href="#pricing" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>
                الأسعار
              </a>
              <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>
                كيفية العمل
              </a>
            </>
          ) : (
            <Link to="/" className="block text-sm font-medium text-muted-foreground hover:text-[#1a5fb4]" onClick={() => setMobileOpen(false)}>
              الصفحة الرئيسية
            </Link>
          )}
          <Link to="/create-cv" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-gradient-to-r from-[#1a5fb4] to-[#3b82f6] text-white font-semibold">
              أنشئ سيرتك الذاتية
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
