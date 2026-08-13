import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Glasses, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#071A2B] text-slate-100 flex items-center justify-center p-4 font-sans"
      dir="rtl"
    >
      <div className="max-w-lg w-full bg-[#0B2940] border border-[#087E8B]/50 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Gradient Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#087E8B] via-[#F4C400] to-[#16C7D9]"></div>

        <div className="space-y-3 pt-2">
          <div className="relative h-14 w-auto mx-auto flex items-center justify-center">
            <Image
              src="/brand/logo-header.png"
              alt="نظارات الفرنسي بلس"
              width={200}
              height={50}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          <div className="w-16 h-16 rounded-3xl bg-[#087E8B]/20 border border-[#087E8B]/40 flex items-center justify-center mx-auto text-[#F4C400]">
            <Glasses className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-black text-white">404 - الصفحة غير موجودة</h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى عنوان آخر.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] font-extrabold text-xs shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
          <span>نظارات الفرنسي بلس للبصريات والسمعيات - صنعاء</span>
        </div>
      </div>
    </div>
  );
}
