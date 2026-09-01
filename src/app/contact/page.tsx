import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationSection from "@/components/LocationSection";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "تواصل معنا والموقع",
  description: "أرقام التواصل المباشر، الواتساب، وأوقات العمل لمركز نظارات الفرنسي بلاس للبصريات والسمعيات في صنعاء.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow">
        <PageHero
          title="تواصل معنا وموقع المركز"
          subtitle="يسعدنا استقبال استفساراتكم وحجوزاتكم عبر الواتساب أو الهاتف أو زيارتنا مباشرة في مركزنا بصنعاء."
        />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
