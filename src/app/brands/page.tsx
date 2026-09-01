import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrandsSection from "@/components/BrandsSection";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "الماركات العالمية",
  description: "أفضل الماركات العالمية الأصلية للنظارات والعدسات والحلول السمعية متوفرة لدى نظارات الفرنسي بلاس.",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow pb-12">
        <PageHero
          title="الماركات العالمية المعتمدة"
          subtitle="أفخم الماركات العالمية الأصلية للإطارات النظارات الطبية والعدسات والحلول السمعية المتطورة."
        />
        <div className="pt-8">
          <BrandsSection brands={brands} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
