"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Award, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

export default function BrandsSection({ brands }: { brands: any[] }) {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  const defaultBrands = [
    { id: "1", slug: "ray-ban", nameAr: "ريبان (Ray-Ban)", nameEn: "Ray-Ban", desc: "الإيطالية الشهيرة" },
    { id: "2", slug: "oakley", nameAr: "أوكلي (Oakley)", nameEn: "Oakley", desc: "النظارات الرياضية" },
    { id: "3", slug: "zeiss", nameAr: "زايس (ZEISS)", nameEn: "ZEISS", desc: "البصريات الألمانية" },
    { id: "4", slug: "phonak", nameAr: "فوناك (Phonak)", nameEn: "Phonak Audiology", desc: "السمعيات السويسرية" },
    { id: "5", slug: "gucci", nameAr: "غوتشي (Gucci)", nameEn: "Gucci Eyewear", desc: "الموضة الفاخرة" },
    { id: "6", slug: "carrera", nameAr: "كاريرا (Carrera)", nameEn: "Carrera", desc: "التصاميم الجريئة" },
  ];

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-16 bg-white border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#087E8B]/10 text-[#087E8B] px-3.5 py-1 rounded-full text-xs font-bold">
              <Award className="w-4 h-4 text-[#F4C400]" />
              <span>{dict.home.sections.brandsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B]">
              {dict.home.sections.brandsSubtitle}
            </h2>
          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#087E8B] hover:text-[#071A2B] transition-colors"
          >
            <span>{dict.actions.allBrands}</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayBrands.map((brand, idx) => {
            const name = isArabic ? brand.nameAr || brand.name : brand.nameEn || brand.name;
            return (
              <div
                key={brand.id || idx}
                className="bg-[#F7FAFC] p-5 rounded-2xl border border-slate-200 text-center space-y-2 hover:border-[#087E8B] hover:shadow-md transition-all group flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#071A2B] text-[#F4C400] flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                  {name.charAt(0)}
                </div>
                <h3 className="text-xs font-extrabold text-[#071A2B] group-hover:text-[#087E8B] transition-colors line-clamp-1">
                  {name}
                </h3>
                {brand.desc && (
                  <p className="text-[10px] text-slate-500 line-clamp-1">{brand.desc}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
