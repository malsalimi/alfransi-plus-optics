import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getAllProducts, getCategories, getBrands } from "@/lib/data";

export const metadata = {
  title: "كتالوج المنتجات والنظارات",
  description: "تصفح أحدث النظارات الطبية، النظارات الشمسية، العدسات اللاصقة، والسماعات السمعية لدى نظارات الفرنسي بلاس في صنعاء.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const [products, categories, brands] = await Promise.all([
    getAllProducts({
      categoryId: resolvedParams.category,
      brandId: resolvedParams.brand,
      search: resolvedParams.search,
    }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow">
        {/* Catalog Banner */}
        <div className="bg-[#071A2B] text-white py-12 border-b border-[#087E8B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              كتالوج المنتجات والنظارات
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              اختر إطارك الطبي الفاخر أو نظارتك الشمسية الأصلية مع توفر خدمة الاستفسار المباشر عبر الواتساب.
            </p>
          </div>
        </div>

        {/* Catalog List */}
        <FeaturedProducts products={products} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
