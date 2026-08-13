"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Sparkles, MessageCircle, ArrowRight, ArrowLeft, Tag, Glasses, Sun, Shield, Eye, Volume2, Search, Filter } from "lucide-react";
import { getProductWhatsAppLink } from "@/lib/whatsapp";

export default function FeaturedProducts({
  products,
  categories,
}: {
  products: any[];
  categories?: any[];
}) {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const defaultProducts = [
    {
      id: "1",
      slug: "al-fransi-titanium-optics-01",
      nameAr: "نظارة الفرنسي تيتانيوم الترا فليكس الطبية",
      nameEn: "Al-Fransi Ultra-Flex Titanium Frame",
      descAr: "إطار نظارة طبية فاخر مصنوع من التيتانيوم المرن والمقاوم للكسر.",
      descEn: "Premium ultra-lightweight titanium prescription optical frame.",
      sku: "AFP-OPT-101",
      price: 120,
      isAvailable: true,
      categorySlug: "eyeglasses",
      categoryName: isArabic ? "نظارات طبية" : "Eyeglasses",
      brandName: "Ray-Ban",
      imageUrl: "/products/eyeglasses-titanium.png",
    },
    {
      id: "2",
      slug: "rayban-wayfarer-classic-gold",
      nameAr: "نظارة ريبان شمسية كلاسيك - إطار ذهبي",
      nameEn: "Ray-Ban Classic Aviator Gold Lens",
      descAr: "نظارة شمسية أصلية بمظهر كلاسيكي جذاب وعدسات مستقطبة Polarized UV400.",
      descEn: "Authentic Ray-Ban polarized sunglasses featuring a classic gold metallic frame.",
      sku: "AFP-SUN-202",
      price: 160,
      isAvailable: true,
      categorySlug: "sunglasses",
      categoryName: isArabic ? "نظارات شمسية" : "Sunglasses",
      brandName: "Ray-Ban",
      imageUrl: "/products/sunglasses-rayban.png",
    },
    {
      id: "3",
      slug: "bluecut-screen-protection-frame",
      nameAr: "نظارة حماية الشاشات والكمبيوتر (Blue-Cut)",
      nameEn: "Blue-Cut Digital Protection Glasses",
      descAr: "نظارات حماية مخصصة للشاشات والهواتف تمنع إجهاد العين والأشعة الزرقاء.",
      descEn: "Advanced blue-light filter computer glasses preventing digital eye strain.",
      sku: "AFP-PRO-303",
      price: 45,
      isAvailable: true,
      categorySlug: "protection-glasses",
      categoryName: isArabic ? "نظارات حماية (بلوكت)" : "Protection Glasses",
      brandName: "ZEISS",
      imageUrl: "/products/screen-bluecut.png",
    },
    {
      id: "4",
      slug: "fashion-trend-lifestyle-sunglasses",
      nameAr: "نظارة كاجوال عصرية للكشخة والاستعراض",
      nameEn: "Fashion & Trend Lifestyle Eyewear",
      descAr: "نظارات عصرية جذابة بتصميم مودرن للكشخة والأناقة اليومية والمناسبات.",
      descEn: "Stylish fashion statement eyewear designed for casual wear and trend-setting look.",
      sku: "AFP-FAS-404",
      price: 55,
      isAvailable: true,
      categorySlug: "fashion-glasses",
      categoryName: isArabic ? "نظارات كشخة واستعراض" : "Fashion Eyewear",
      brandName: "Ray-Ban",
      imageUrl: "/products/fashion-cashkha.png",
    },
    {
      id: "5",
      slug: "phonak-audeo-lumity-digital",
      nameAr: "سماعة فوناك الطبية الرقمية المخفية",
      nameEn: "Phonak Audéo Lumity Digital Hearing Aid",
      descAr: "سماعة طبية متطورة للغاية تقترن بالبلوتوث مع الهواتف، غير مرئية داخل الأذن.",
      descEn: "Digital medical hearing aid with Bluetooth connectivity and AI noise cancellation.",
      sku: "AFP-AUD-505",
      price: 450,
      isAvailable: true,
      categorySlug: "audiology-aids",
      categoryName: isArabic ? "سمعيات" : "Audiology",
      brandName: "Phonak",
      imageUrl: "/products/phonak-hearing-aid.png",
    },
  ];

  const allList = products && products.length > 0 ? products : defaultProducts;

  // Filter products by selected category & search query
  const filteredProducts = allList.filter((item) => {
    const itemCatSlug = item.category?.slug || item.categorySlug || "";
    const matchesCategory =
      selectedCategory === "ALL" || itemCatSlug === selectedCategory;

    const name = isArabic ? item.nameAr || item.name : item.nameEn || item.name;
    const desc = isArabic ? item.descAr || item.desc : item.descEn || item.desc;
    const matchesSearch =
      !searchQuery.trim() ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const filterTabs = [
    { id: "ALL", labelAr: "جميع الأقسام", labelEn: "All Categories", icon: Filter },
    { id: "eyeglasses", labelAr: "نظارات طبية", labelEn: "Prescription", icon: Glasses },
    { id: "sunglasses", labelAr: "نظارات شمسية", labelEn: "Sunglasses", icon: Sun },
    { id: "protection-glasses", labelAr: "نظارات حماية (بلوكت)", labelEn: "Screen Protection", icon: Shield },
    { id: "fashion-glasses", labelAr: "نظارات كشخة واستعراض", labelEn: "Fashion & Casual", icon: Sparkles },
    { id: "audiology-aids", labelAr: "سماعات وحلول سمعية", labelEn: "Audiology Aids", icon: Volume2 },
    { id: "contact-lenses", labelAr: "عدسات لاصقة", labelEn: "Contact Lenses", icon: Eye },
  ];

  return (
    <section className="py-12 bg-[#F7FAFC] text-slate-800" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#F4C400]/20 text-[#071A2B] px-3.5 py-1 rounded-full text-xs font-black">
              <Sparkles className="w-4 h-4 text-[#D99A00]" />
              <span>{dict.home.sections.productsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B]">
              تشكيلة المعروضات والنظارات المتوفرة بالفرع
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن نظارة، ماركة، أو SKU..."
              className="w-full bg-white border border-slate-300 focus:border-[#087E8B] rounded-2xl px-4 py-2.5 text-xs text-slate-800 outline-none shadow-sm pr-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? "bg-[#071A2B] text-[#F4C400] border-[#071A2B] shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#087E8B]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#F4C400]" : "text-[#087E8B]"}`} />
                <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200 shadow-sm">
            <Glasses className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#071A2B]">لا تتوفر منتجات في هذا القسم حالياً</h3>
            <p className="text-xs text-slate-500">اختر تصنيفاً آخر أو تواصل معنا عبر الواتساب للاستفسار عن المعروضات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => {
              const name = isArabic ? product.nameAr || product.name : product.nameEn || product.name;
              const desc = isArabic ? product.descAr || product.desc : product.descEn || product.desc;
              const primaryImage = product.images?.[0]?.url || product.imageUrl || "/brand/logo-primary.png";
              const category = product.category?.nameAr || product.categoryName || "";
              const brand = product.brand?.nameAr || product.brandName || "";
              const whatsappLink = getProductWhatsAppLink(name, product.sku, isArabic);

              return (
                <div
                  key={product.id || idx}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#087E8B] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Product Image Box */}
                    <div className="relative w-full h-48 bg-slate-900/5 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                      <Image
                        src={primaryImage}
                        alt={name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#087E8B] text-white shadow-sm">
                          {dict.products.inStock}
                        </span>
                      </div>

                      {category && (
                        <div className="absolute bottom-3 left-3">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#071A2B]/80 text-[#F4C400] backdrop-blur">
                            {category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5 space-y-2">
                      {brand && (
                        <span className="text-[11px] font-bold text-[#087E8B] flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {brand}
                        </span>
                      )}

                      <h3 className="text-base font-bold text-[#071A2B] line-clamp-1 group-hover:text-[#087E8B] transition-colors">
                        {name}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>

                      {product.sku && (
                        <p className="text-[10px] text-slate-400 font-mono pt-1 dir-ltr">
                          SKU: {product.sku}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Inquiry */}
                  <div className="p-5 pt-0 space-y-2">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{dict.actions.inquireProduct}</span>
                    </a>

                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full flex items-center justify-center gap-1 text-xs font-bold text-slate-600 hover:text-[#071A2B] py-1 transition-colors"
                    >
                      <span>{dict.actions.viewDetails}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
