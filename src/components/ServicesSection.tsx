"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import {
  Eye,
  Glasses,
  Sparkles,
  Volume2,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function ServicesSection({ services }: { services: any[] }) {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  const defaultServices = [
    {
      id: "1",
      slug: "eye-exam",
      name: isArabic ? "فحص النظر الكمبيوتري الشامل" : "Comprehensive Computerized Eye Exam",
      desc: isArabic
        ? "فحص وتحديد حدة الإبصار وقوة العدسات المطلوبة بأحدث أجهزة الأوتوريفراكتميتر الكمبيوترية تحت إشراف أخصائيين."
        : "Automated autorefraction and visual acuity testing using digital optical equipment.",
      icon: Eye,
      type: "OPTICAL",
      features: isArabic
        ? ["فحص كمبيوتر دقيق", "قياس انحراف القرنية", "استشارة فحص فورية", "مجاني عند تفصيل النظارة"]
        : ["Digital Autorefraction", "Astigmatism Check", "Instant Consultation", "Free with Custom Glasses"],
    },
    {
      id: "2",
      slug: "custom-lenses",
      name: isArabic ? "تفصيل وتجهيز العدسات الطبية" : "Custom Prescription Lens Fitting",
      desc: isArabic
        ? "قص وتجهيز كافة أنواع العدسات الطبية خفيفة الوزن المضادة للخدش والحامية من إشعاعات الشاشات الضارة (Blue-Cut)."
        : "Custom lens edging, anti-reflective coatings, photochromic, and Blue-Cut screen filter lenses.",
      icon: Glasses,
      type: "OPTICAL",
      features: isArabic
        ? ["عدسات مضادة للضوء الأزرق", "عدسات مظللة بالتحول للشمس", "طلاء مانع للانعكاس Duravision", "ضمان الدقة وتفصيل سريع"]
        : ["Blue-Light Filter Lenses", "Photochromic Transition", "Duravision Anti-reflective", "Fast Custom Fitting"],
    },
    {
      id: "3",
      slug: "hearing-assessment",
      name: isArabic ? "قسم السمعيات وتجربة السماعات" : "Audiology & Hearing Aid Fitting",
      desc: isArabic
        ? "تقييم مستوى درجات ضعف السمع وتجربة أفضل السماعات الطبية الرقمية غير المرئية وتعديل البرمجة حسب الاحتياج."
        : "Pure tone audiometry, digital hearing loss evaluation, and custom invisible hearing aid programming.",
      icon: Volume2,
      type: "AUDIOLOGY",
      features: isArabic
        ? ["قياس درجات السمع", "سماعات رقمية غير مرئية", "اقتران بلوتوث بالهاتف", "صيانة وضبط مجاني"]
        : ["Hearing Loss Assessment", "Discreet Invisible Hearing Aids", "Bluetooth Smartphone Pairing", "Free Calibration"],
    },
  ];

  const displayList = services && services.length > 0 ? services : defaultServices;

  return (
    <section className="py-16 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#087E8B]/10 text-[#087E8B] px-3.5 py-1 rounded-full text-xs font-extrabold">
            <Sparkles className="w-4 h-4" />
            <span>{dict.home.sections.servicesTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A2B]">
            {dict.home.sections.servicesSubtitle}
          </h2>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayList.map((item, idx) => {
            let parsedFeatures: string[] = [];
            try {
              if (typeof item.featuresAr === "string") {
                parsedFeatures = JSON.parse(isArabic ? item.featuresAr : item.featuresEn || item.featuresAr);
              } else if (Array.isArray(item.features)) {
                parsedFeatures = item.features;
              }
            } catch {
              parsedFeatures = [];
            }

            const nameText = isArabic ? item.nameAr || item.name : item.nameEn || item.name;
            const descText = isArabic ? item.descAr || item.desc : item.descEn || item.desc;
            const iconStr = typeof item.icon === "string" ? item.icon.toLowerCase() : "";
            const nameLower = (nameText || "").toLowerCase();

            // Determine Lucide Icon Component
            let IconComponent = Sparkles;
            if (iconStr.includes("eye") || nameLower.includes("نظر") || nameLower.includes("فحص") || nameLower.includes("كمبيوتر") || idx === 0) {
              IconComponent = Eye;
            } else if (iconStr.includes("glass") || nameLower.includes("عدس") || nameLower.includes("تفصيل") || nameLower.includes("نظار") || idx === 1) {
              IconComponent = Glasses;
            } else if (iconStr.includes("vol") || iconStr.includes("hear") || nameLower.includes("سمع") || item.type === "AUDIOLOGY" || idx === 2) {
              IconComponent = Volume2;
            }

            return (
              <div
                key={item.id || idx}
                className="bg-[#F7FAFC] rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#087E8B] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#071A2B] text-[#F4C400] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <IconComponent className="w-6 h-6 text-[#F4C400]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#071A2B]">
                    {nameText}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {descText}
                  </p>

                  {parsedFeatures.length > 0 && (
                    <ul className="space-y-2 pt-2 text-xs text-slate-700">
                      {parsedFeatures.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#087E8B] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between">
                  <Link
                    href="/appointments"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#087E8B] hover:text-[#071A2B] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dict.actions.bookAppointment}</span>
                  </Link>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#071A2B]/10 text-[#071A2B]">
                    {item.type === "AUDIOLOGY"
                      ? isArabic
                        ? "قسم السمعيات"
                        : "Audiology"
                      : isArabic
                      ? "قسم البصريات"
                      : "Optics"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
