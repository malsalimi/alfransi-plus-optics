import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import AppointmentForm from "@/components/AppointmentModal";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "خدمات البصريات والسمعيات",
  description: "خدمات فحص النظر الكمبيوتري، تفصيل العدسات الطبية، وتجربة أحدث السماعات الطبية الرقمية لدى مركز نظارات الفرنسي بلس.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <ServicesSection services={services} />

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentForm />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
