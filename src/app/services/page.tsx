import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import { getServices } from "@/lib/data";

export const metadata = {
  title: "خدمات البصريات والسمعيات",
  description: "خدمات فحص النظر الكمبيوتري، تفصيل العدسات الطبية، وتجربة أحدث السماعات الطبية الرقمية لدى مركز نظارات الفرنسي بلاس.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <ServicesSection services={services} />

        {/* Booking CTA Banner */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071A2B] rounded-3xl p-8 sm:p-12 text-center text-white border border-[#087E8B]/40 shadow-xl space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              جاهز لفحص النظر أو استشارة السمعيات؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              احجز موعدك بسهولة مع كادرنا المتخصص بأحدث الأجهزة الإلكترونية في مركز نظارات الفرنسي بلاس.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/appointments"
                className="bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] px-8 py-3.5 rounded-xl font-extrabold text-xs shadow-lg transition-all"
              >
                احجز موعدك الآن
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
