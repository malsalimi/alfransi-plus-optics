import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "الشروط والأحكام",
  description: "الشروط والأحكام الخاصة باستعمال منصة وخدمات مركز نظارات الفرنسي بلاس.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-800">
          <h1 className="text-3xl font-extrabold text-[#071A2B]">الشروط والأحكام</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            أهلاً بكم في المنصة الرقمية الرسمية لمركز نظارات الفرنسي بلاس للبصريات والسمعيات. تصفح الموقع واستخدام الخدمات يخضع للشروط التالية:
          </p>

          <div className="space-y-4 text-xs text-slate-700">
            <h3 className="font-bold text-[#071A2B] text-sm">1. المواعيد والحجوزات:</h3>
            <p className="leading-relaxed">
              جميع طلبات حجز المواعيد عبر الموقع تعتبر طلبات مبدئية، وتصبح مؤكدة فور تواصل فريق المركز هاتفياً مع العميل.
            </p>

            <h3 className="font-bold text-[#071A2B] text-sm">2. المنتجات والأسعار:</h3>
            <p className="leading-relaxed">
              جميع المعروضات والمنتجات المعروضة في الكتالوج هي منتجات أصلية متوفرة بالمركز، ويحق للمركز تحديث قائمة التوفر والأسعار.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
