import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BrandsSection from "@/components/BrandsSection";
import { getBrands } from "@/lib/data";

export const metadata = {
  title: "الماركات العالمية",
  description: "أفضل الماركات العالمية الأصلية للنظارات والعدسات والحلول السمعية متوفرة لدى نظارات الفرنسي بلاس.",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <BrandsSection brands={brands} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
