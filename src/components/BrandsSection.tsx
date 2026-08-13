"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Award, ArrowLeft, ArrowRight, Tag } from "lucide-react";

export default function BrandsSection({ brands }: { brands: any[] }) {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  const defaultBrands = [
    {
      id: "1",
      slug: "ray-ban",
      nameAr: "ريبان (Ray-Ban)",
      nameEn: "Ray-Ban",
      logoUrl: "/brands/rayban-logo.png",
      desc: "الإيطالية الشهيرة",
    },
    {
      id: "2",
      slug: "oakley",
      nameAr: "أوكلي (Oakley)",
      nameEn: "Oakley",
      logoUrl: "/brands/oakley-logo.png",
      desc: "النظارات الرياضية",
    },
    {
      id: "3",
      slug: "zeiss",
      nameAr: "زايس (ZEISS)",
      nameEn: "ZEISS",
      logoUrl: "/brands/zeiss-logo.png",
      desc: "البصريات الألمانية",
    },
    {
      id: "4",
      slug: "phonak",
      nameAr: "فوناك (Phonak)",
      nameEn: "Phonak Audiology",
      logoUrl: "/brands/phonak-logo.png",
      desc: "السمعيات السويسرية",
    },
  ];

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-16 bg-white border-b border-slate-200 text-slate-800" dir={isArabic ? "rtl" : "ltr"}>
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
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#087E8B] hover:text-[#071A2B] transition-colors"
          >
            <span>تصفح كافة المعروضات والنظارات</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBrands.map((brand, idx) => {
            const name = isArabic ? brand.nameAr || brand.name : brand.nameEn || brand.name;
            const desc = isArabic ? brand.descriptionAr || brand.desc : brand.descriptionEn || brand.desc;
            const logo = brand.logoUrl || "/brand/logo-mark.png";

            return (
              <Link
                key={brand.id || idx}
                href={`/products?brand=${brand.id}`}
                className="bg-[#071A2B] p-6 rounded-3xl border border-[#087E8B]/40 text-center space-y-4 hover:border-[#F4C400] hover:shadow-2xl transition-all group flex flex-col items-center justify-between"
              >
                {/* Brand Image Logo Box */}
                <div className="w-full h-32 bg-[#0B2940] rounded-2xl p-4 flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    className="object-contain p-3"
                  />
                </div>

                {/* Brand Name & Details */}
                <div className="space-y-1 w-full">
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#F4C400] transition-colors line-clamp-1">
                    {name}
                  </h3>
                  {desc && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  )}
                </div>

                <div className="pt-2 text-[11px] font-bold text-[#16C7D9] flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>عرض منتجات الماركة</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
