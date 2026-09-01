import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppointmentForm from "@/components/AppointmentModal";

export const metadata = {
  title: "حجز موعد فحص",
  description: "احجز موعد فحص النظر أو تقييم السمع بسهولة في مركز نظارات الفرنسي بلاس بصنعاء.",
};

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
