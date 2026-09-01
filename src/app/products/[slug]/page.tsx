import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProductBySlug } from "@/lib/data";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle, ShieldCheck, Tag, CheckCircle2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "المنتج غير موجود" };

    return {
      title: `${product.nameAr} | نظارات الفرنسي بلاس`,
      description: product.descAr,
    };
  } catch {
    return { title: "تفاصيل المنتج | نظارات الفرنسي بلاس" };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images?.[0]?.url || "/brand/logo-primary.png";
  const whatsappLink = getProductWhatsAppLink(product.nameAr, product.sku, true);

  let specsMap: Record<string, string> = {};
  try {
    if (product.specsAr) {
      specsMap = JSON.parse(product.specsAr);
    }
  } catch {
    specsMap = {};
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#071A2B]">الرئيسية</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#071A2B]">المنتجات</Link>
            <span>/</span>
            <span className="font-bold text-[#071A2B]">{product.nameAr}</span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Product Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-900/5 p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={primaryImage}
                  alt={product.nameAr}
                  fill
                  className="object-contain p-6"
                  priority
                />
                <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-[#087E8B] text-white">
                  {product.isAvailable ? "متوفر بالمحل" : "غير متوفر"}
                </span>
              </div>
            </div>

            {/* Product Info & Action Details */}
            <div className="lg:col-span-6 space-y-6 text-slate-800">
              <div className="space-y-2">
                {product.brand && (
                  <span className="text-xs font-bold text-[#087E8B] flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {product.brand.nameAr}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B]">
                  {product.nameAr}
                </h1>
                {product.sku && (
                  <p className="text-xs text-slate-400 font-mono">SKU: {product.sku}</p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {product.descAr}
              </p>

              {/* Technical Specifications */}
              {Object.keys(specsMap).length > 0 && (
                <div className="space-y-3 bg-[#F7FAFC] p-4 rounded-xl border border-slate-200">
                  <h3 className="text-xs font-extrabold text-[#071A2B]">المواصفات الفنية:</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(specsMap).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-slate-400 text-[10px]">{key}</span>
                        <span className="font-bold text-slate-700">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiry Action */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl text-sm font-extrabold shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>أريد الاستفسار عن هذا المنتج عبر واتساب</span>
                </a>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#087E8B]" />
                    منتج أصلي ومضمون
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#087E8B]" />
                    فحص وفحص فوري بالفرع
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
