import { FileText, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1e] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#3b82f6] to-[#1a5fb4] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CV Pro</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة احترافية لإنشاء السير الذاتية بتصاميم عصرية ومبتكرة. نساعدك في الحصول على وظيفة أحلامك.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#3b82f6] transition-colors text-sm">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/create-cv" className="text-gray-400 hover:text-[#3b82f6] transition-colors text-sm">
                  إنشاء سيرة ذاتية
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-[#3b82f6] transition-colors text-sm">
                  الأسعار
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-[#3b82f6] transition-colors text-sm">
                  كيفية العمل
                </a>
              </li>
            </ul>
          </div>

          {/* طرق الدفع */}
          <div>
            <h3 className="text-lg font-bold mb-4">طرق الإيداع</h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-sm font-semibold text-white mb-1">🟢 سيرياتيل كاش</p>
                <p className="text-[#3b82f6] font-bold text-sm" dir="ltr">0982 493 924</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-sm font-semibold text-white mb-1">🔵 MTN كاش</p>
                <p className="text-[#3b82f6] font-bold text-sm" dir="ltr">0982 493 924</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">المبلغ: 5,000 ل.س</p>
            </div>
          </div>

          {/* تواصل معنا */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#3b82f6] shrink-0" />
                <span dir="ltr">0982 493 924</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4 text-[#3b82f6] shrink-0" />
                <a
                  href="https://wa.me/963982493924"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3b82f6] transition-colors"
                >
                  واتساب: 0982 493 924
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#3b82f6] shrink-0" />
                <span>support@cvpro.sy</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#3b82f6] shrink-0" />
                <span>دمشق، سوريا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © 2025 CV Pro. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
            <Phone className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span className="text-sm text-gray-300 font-medium" dir="ltr">0982 493 924</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
