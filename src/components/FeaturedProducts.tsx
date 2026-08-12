"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Sparkles, MessageCircle, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { getProductWhatsAppLink } from "@/lib/whatsapp";

export default function FeaturedProducts({ products }: { products: any[] }) {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  const defaultProducts = [
    {
      id: "1",
      slug: "al-fransi-titanium-optics-01",
      nameAr: "نظارة الفرنسي تيتانيوم الترا فليكس",
      nameEn: "Al-Fransi Ultra-Flex Titanium Frame",
      descAr: "إطار نظارة طبية فاخر مصنوع من التيتانيوم المرن والمقاوم للكسر.",
      descEn: "Premium ultra-lightweight titanium prescription optical frame.",
      sku: "AFP-OPT-101",
      price: 120,
      isAvailable: true,
      categoryName: isArabic ? "نظارات طبية" : "Eyeglasses",
      brandName: "Ray-Ban",
      imageUrl: "/brand/logo-primary.png",
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
      categoryName: isArabic ? "نظارات شمسية" : "Sunglasses",
      brandName: "Ray-Ban",
      imageUrl: "/brand/logo-primary.png",
    },
    {
      id: "3",
      slug: "phonak-audeo-lumity-digital",
      nameAr: "سماعة فوناك الطبية الرقمية المخفية",
      nameEn: "Phonak Audéo Lumity Digital Hearing Aid",
      descAr: "سماعة طبية متطورة للغاية تقترن بالبلوتوث مع الهواتف، غير مرئية داخل الأذن.",
      descEn: "Digital medical hearing aid with Bluetooth connectivity and AI noise cancellation.",
      sku: "AFP-AUD-303",
      price: 450,
      isAvailable: true,
      categoryName: isArabic ? "سمعيات" : "Audiology",
      brandName: "Phonak",
      imageUrl: "/brand/logo-primary.png",
    },
    {
      id: "4",
      slug: "zeiss-blueguard-optical-lenses",
      nameAr: "عدسات زايس الطبية المانعة للضوء الأزرق",
      nameEn: "ZEISS BlueGuard Prescription Lenses",
      descAr: "عدسات طبية ألمانية فائقة النقاء تحمي العين من إجهاد الشاشات والهواتف.",
      descEn: "German engineered optical lenses protecting against blue light strain.",
      sku: "AFP-LEN-404",
      price: 85,
      isAvailable: true,
      categoryName: isArabic ? "عدسات" : "Lenses",
      brandName: "ZEISS",
      imageUrl: "/brand/logo-primary.png",
    },
  ];

  const displayProducts = products && products.length > 0 ? products : defaultProducts;

  return (
    <section className="py-16 bg-[#F7FAFC] border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#F4C400]/20 text-[#071A2B] px-3.5 py-1 rounded-full text-xs font-black">
              <Sparkles className="w-4 h-4 text-[#D99A00]" />
              <span>{dict.home.sections.productsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B]">
              {dict.home.sections.productsSubtitle}
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#071A2B] hover:bg-[#087E8B] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <span>{dict.actions.allProducts}</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, idx) => {
            const name = isArabic ? product.nameAr || product.name : product.nameEn || product.name;
            const desc = isArabic ? product.descAr || product.desc : product.descEn || product.desc;
            const primaryImage = product.images?.[0]?.url || product.imageUrl || "/brand/logo-primary.png";
            const category = product.category?.nameAr || product.categoryName || "";
            const brand = product.brand?.nameAr || product.brandName || "";
            const whatsappLink = getProductWhatsAppLink(name, product.sku, isArabic);

            return (
              <div
                key={product.id || idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#087E8B] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image Box */}
                  <div className="relative w-full h-48 bg-slate-900/5 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    <Image
                      src={primaryImage}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#087E8B] text-white shadow-sm">
                        {dict.products.inStock}
                      </span>
                    </div>

                    {category && (
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-200 backdrop-blur">
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
      </div>
    </section>
  );
}
