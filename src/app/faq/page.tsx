import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ar } from "@/i18n/ar";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات شائعة حول فحص النظر، تفصيل النظارات الطبية، والحلول السمعية لدى نظارات الفرنسي بلاس.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#071A2B] text-[#F4C400] mx-auto flex items-center justify-center shadow-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#071A2B]">{ar.faq.pageTitle}</h1>
            <p className="text-xs sm:text-sm text-slate-500">{ar.faq.pageSubtitle}</p>
          </div>

          <div className="space-y-4">
            {ar.faq.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2"
              >
                <h3 className="text-base font-bold text-[#071A2B]">{item.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
