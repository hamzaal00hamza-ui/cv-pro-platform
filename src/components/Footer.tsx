import { FileText, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#3b82f6] to-[#1a5fb4] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CV Pro</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة احترافية لإنشاء السير الذاتية بتصاميم عصرية ومبتكرة. نساعدك في الحصول على وظيفة أحلامك بسيرة ذاتية متميزة.
            </p>
          </div>

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
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#3b82f6]" />
                <span dir="ltr">+963 987 654 321</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#3b82f6]" />
                <span>support@cvpro.sy</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#3b82f6]" />
                <span>دمشق، سوريا</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 CV Pro. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
