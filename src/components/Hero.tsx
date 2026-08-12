"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import {
  Sparkles,
  Calendar,
  Phone,
  Glasses,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071A2B] via-[#0B2940] to-[#071A2B] text-white py-12 lg:py-20 border-b border-[#087E8B]/30">
      {/* Background Neon Cyan Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#087E8B]/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#087E8B]/30 text-[#16C7D9] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-[#087E8B]/60 shadow-inner">
              <Sparkles className="w-4 h-4 text-[#F4C400]" />
              <span>{dict.brand.slogan}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
              {dict.home.heroTitlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C400] via-[#FFD700] to-[#16C7D9]">
                {dict.home.heroTitleHighlight}
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#16C7D9] font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                {dict.home.heroTitleSuffix}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {dict.home.heroSubtitle}
            </p>

            {/* Core Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F4C400]" />
                <span>فحص كمبيوتر دقيق</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Glasses className="w-4 h-4 text-[#16C7D9]" />
                <span>أحدث النظارات الطبية للشمسية</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Volume2 className="w-4 h-4 text-[#F4C400]" />
                <span>قسم متخصص للسمعيات</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/appointments"
                className="flex items-center gap-2 bg-gradient-to-r from-[#F4C400] to-[#D99A00] text-[#071A2B] hover:brightness-110 px-6 py-3.5 rounded-xl text-sm font-black shadow-xl shadow-[#F4C400]/25 transition-all transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                <span>{dict.actions.bookAppointment}</span>
              </Link>

              <Link
                href="/products"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl text-sm font-bold border border-white/20 transition-all"
              >
                <Eye className="w-5 h-5 text-[#16C7D9]" />
                <span>{dict.actions.exploreProducts}</span>
              </Link>

              <a
                href="tel:773945678"
                className="flex items-center gap-2 bg-[#087E8B]/40 hover:bg-[#087E8B] text-white px-5 py-3.5 rounded-xl text-sm font-bold border border-[#087E8B]/60 transition-all"
              >
                <Phone className="w-4 h-4 text-[#F4C400]" />
                <span className="dir-ltr">773945678</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Card Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#0B2940] to-[#071A2B] rounded-3xl p-6 border-2 border-[#087E8B]/50 shadow-2xl shadow-[#087E8B]/20 group">
              {/* Brand Logo Presentation */}
              <div className="relative w-full h-56 rounded-2xl bg-slate-900/60 p-4 border border-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/brand/logo-primary.png"
                  alt={dict.brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Store Identity Info Card */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">العنوان الرسمي:</span>
                  <span className="text-xs font-bold text-[#16C7D9]">
                    {dict.brand.address}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">خدماتنا:</span>
                  <span className="text-xs font-bold text-[#F4C400]">
                    بصريات • نظارات • سمعيات
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">الهاتف والواتساب:</span>
                  <span className="text-xs font-bold text-white dir-ltr">
                    773945678 - 777266692
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <h3 className="text-2xl font-black text-[#F4C400]">100%</h3>
            <p className="text-xs text-slate-300">{dict.home.stats.satisfaction}</p>
          </div>
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <h3 className="text-2xl font-black text-[#16C7D9]">+1000</h3>
            <p className="text-xs text-slate-300">{dict.home.stats.products}</p>
          </div>
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <h3 className="text-2xl font-black text-[#F4C400]">+20</h3>
            <p className="text-xs text-slate-300">{dict.home.stats.brands}</p>
          </div>
          <div className="bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/10 text-center space-y-1">
            <h3 className="text-2xl font-black text-[#16C7D9]">كادر متخصص</h3>
            <p className="text-xs text-slate-300">{dict.home.stats.experience}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
