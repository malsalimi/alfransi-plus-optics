"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage to avoid showing repeatedly in same tab unless desired
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const DURATION = 5000; // 5 seconds
    const intervalTime = 50;
    const increment = (intervalTime / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          dismiss();
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const dismiss = () => {
    setIsFadingOut(true);
    sessionStorage.setItem("hasSeenSplash", "true");
    setTimeout(() => {
      setIsVisible(false);
    }, 600); // fade duration
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071A2B]/95 backdrop-blur-xl transition-all duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] bg-[#F4C400]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#009688]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={dismiss}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/15 backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 group z-10"
      >
        <span>تخطي</span>
        <X className="w-4 h-4 text-[#F4C400] group-hover:rotate-90 transition-transform" />
      </button>

      {/* Pure Floating Logo (No Card / No Box / No Background) */}
      <div className="relative flex flex-col items-center justify-center p-4 max-w-lg mx-auto text-center z-10">
        
        {/* Floating Transparent Logo directly */}
        <div className="relative mb-6 animate-float">
          <Image
            src="/brand/logo-primary.png"
            alt="نظارات الفرنسي بلاس للبصريات والسمعيات"
            width={340}
            height={160}
            priority
            className="object-contain max-w-[280px] sm:max-w-[360px] h-auto drop-shadow-[0_15px_35px_rgba(244,196,0,0.4)]"
          />
        </div>

        {/* Slogan & Subtitle */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4C400]/10 border border-[#F4C400]/30 text-[#F4C400] text-xs font-extrabold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نظارات الفرنسي بلاس للبصريات والسمعيات</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-lg">
            أناقة وإبداع .. رؤية بلا صداع
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-48 sm:w-64 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden border border-white/10 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#009688] via-[#F4C400] to-[#F4C400] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_#F4C400]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2 font-mono">
          جاري التحميل ... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
