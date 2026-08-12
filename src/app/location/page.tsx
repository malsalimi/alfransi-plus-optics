import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationSection from "@/components/LocationSection";

export const metadata = {
  title: "موقع المحل والخريطة",
  description: "عنوان وموقع مركز نظارات الفرنسي بلس في صنعاء - سعوان، أمام المستشفى.",
};

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow">
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
