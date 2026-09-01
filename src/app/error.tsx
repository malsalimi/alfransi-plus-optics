"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

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
              alt="نظارات الفرنسي بلاس"
              width={200}
              height={50}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#F4C400]">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-extrabold text-white">عذراً، حدث خطأ مؤقت في الصفحة</h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            يبدو أن هناك تحديثاً جارياً أو مشكلة مؤقتة في الاتصال. يمكنك إعادة محاولة تحميل الصفحة أو الانتقال للرئيسية.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] font-extrabold text-xs shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة المحاولة</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-all"
          >
            <Home className="w-4 h-4 text-[#16C7D9]" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
          <span>هل تحتاج لمساعدة؟ </span>
          <a
            href="https://wa.me/967773945678"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline font-bold inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>تواصل مع الدعم عبر الواتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
}
