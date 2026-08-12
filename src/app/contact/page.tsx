import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationSection from "@/components/LocationSection";

export const metadata = {
  title: "تواصل معنا",
  description: "أرقام التواصل المباشر، الواتساب، وأوقات العمل لمركز نظارات الفرنسي بلس للبصريات والسمعيات في صنعاء.",
};

export default function ContactPage() {
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
