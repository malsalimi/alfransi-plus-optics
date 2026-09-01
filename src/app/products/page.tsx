import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FeaturedProducts from "@/components/FeaturedProducts";
import PageHero from "@/components/PageHero";

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
        <PageHero
          title="كتالوج المنتجات والنظارات"
          subtitle="اختر إطارك الطبي الفاخر أو نظارتك الشمسية الأصلية مع توفر خدمة الاستفسار المباشر عبر الواتساب."
        />

        {/* Catalog List */}
        <FeaturedProducts products={products} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
