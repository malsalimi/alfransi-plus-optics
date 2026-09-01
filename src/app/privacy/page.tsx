import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import PageHero from "@/components/PageHero";

export const metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية بيانات العملاء لدى مركز نظارات الفرنسي بلاس.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow pb-12">
        <PageHero
          title="سياسة الخصوصية"
          subtitle="التزامنا التام بحماية خصوصية زوارنا وعملائنا الكرام وسرية جميع بياناتهم."
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6 text-slate-800">
          <p className="text-xs text-slate-600 leading-relaxed">
            يلتزم مركز نظارات الفرنسي بلاس للبصريات والسمعيات بحماية خصوصية زواره وعملائه الكرام. توضح هذه السياسة كيفية جمع البيانات واستخدامها وحمايتها:
          </p>

          <div className="space-y-4 text-xs text-slate-700">
            <h3 className="font-bold text-[#071A2B] text-sm">1. البيانات التي نجمعها:</h3>
            <p className="leading-relaxed">
              نجمع البيانات الأساسية المقدمة طوعاً من العميل عند طلب حجز موعد فحص أو إرسال استفسار عبر الموقع (مثل الاسم، رقم الهاتف، والخدمة المطلوبة).
            </p>

            <h3 className="font-bold text-[#071A2B] text-sm">2. كيفية استخدام البيانات:</h3>
            <p className="leading-relaxed">
              تُستخدم البيانات فقط لغرض التواصل مع العميل وتأكيد مواعيد الفحص البصري والسمعي وتقديم الخدمة المطلوبة بأعلى معايير الجودة.
            </p>

            <h3 className="font-bold text-[#071A2B] text-sm">3. حماية وأمان البيانات:</h3>
            <p className="leading-relaxed">
              نطبق إجراءات حماية وأمان رقمية متطورة لمنع الوصول غير المصرح به إلى بيانات العملاء، ولا يتم مشاركة أي بيانات مع أي طرف ثالث.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
