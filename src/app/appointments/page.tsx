import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "حجز موعد فحص",
  description: "احجز موعد فحص النظر أو تقييم السمع بسهولة في مركز نظارات الفرنسي بلاس بصنعاء.",
};

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow pb-12">
        <PageHero
          title="حجز موعد فحص نظر أو تقييم سمع"
          subtitle="احجز موعدك بسهولة وسرعة مع أخصائيينا بأحدث الأجهزة الإلكترونية لضمان أفضل رؤية وحماية لعينيك."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <AppointmentForm />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
