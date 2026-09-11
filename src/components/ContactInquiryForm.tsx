"use client";

import React, { useActionState, useEffect } from "react";
import { useLocale } from "@/context/LocaleContext";
import { createInquiryAction } from "@/lib/actions";
import { MessageSquare, User, Phone, Send, CheckCircle2, AlertCircle, MessageCircle, ExternalLink, RefreshCw } from "lucide-react";

export default function ContactInquiryForm() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";
  const [state, formAction, isPending] = useActionState(createInquiryAction, null);

  useEffect(() => {
    if (state?.success && state?.whatsappUrl) {
      const timer = setTimeout(() => {
        try {
          window.open(state.whatsappUrl, "_blank");
        } catch (e) {
          // popup blocked, fallback button is visible
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-xl mx-auto text-slate-800">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#087E8B] text-white mx-auto flex items-center justify-center shadow-md">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black text-[#071A2B]">
          {isArabic ? "أرسل استفسارك مباشرة" : "Send Us an Inquiry"}
        </h3>
        <p className="text-xs text-slate-500">
          {isArabic
            ? "سيتم تسجيل رسالتك في لوحة تحكم الإدارة وتوجيهك لمحادثة الواتساب للرد السريع"
            : "Your message is recorded in our admin panel and forwarded to WhatsApp for rapid response"}
        </p>
      </div>

      {state?.success ? (
        <div className="bg-[#25D366]/10 border border-[#25D366]/40 p-6 sm:p-8 rounded-2xl text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#25D366]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">
              {isArabic ? "تم استلام رسالتك بنجاح!" : "Message Received Successfully!"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              {isArabic
                ? "تم تسجيل استفسارك وحفظه في لوحة تحكم إدارة المركز. تم فتح محادثة الواتساب، أو اضغط الزر بالأسفل للتواصل المباشر مع فريق الخدمة."
                : "Your inquiry is saved in our system. A WhatsApp window was opened, or click below to message us directly."}
            </p>
          </div>

          {state.whatsappUrl && (
            <div className="pt-2 space-y-3">
              <a
                href={state.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-2xl font-black text-sm shadow-xl shadow-[#25D366]/30 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>
                  {isArabic
                    ? "إرسال الاستفسار عبر الواتساب (773945678)"
                    : "Send Inquiry via WhatsApp (773945678)"}
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-slate-500">
                {isArabic
                  ? "✓ تم حفظ الرسالة في لوحة تحكم إدارة نظارات الفرنسي بلاس"
                  : "✓ Saved to Al-Fransi Plus admin dashboard"}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200/60">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isArabic ? "إرسال رسالة أخرى" : "Send another message"}</span>
            </button>
          </div>
        </div>
      ) : (
        <form action={formAction} className="space-y-4 text-xs">
          {state?.message && !state.success && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{isArabic ? "الاسم الكامل *" : "Full Name *"}</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={isArabic ? "أدخل اسمك الكريم..." : "Enter full name..."}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{isArabic ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder={isArabic ? "مثال: 773945678" : "e.g. 773945678"}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all dir-ltr text-right"
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{isArabic ? "تفاصيل الاستفسار أو الرسالة *" : "Your Inquiry or Message *"}</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={isArabic ? "اكتب استفسارك عن النظارات أو فحص النظر أو السماعات الطبية..." : "Type your inquiry here..."}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#087E8B] hover:bg-[#06646f] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-[#087E8B]/25 transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>
              {isPending
                ? (isArabic ? "جاري الإرسال والتسجيل..." : "Submitting...")
                : (isArabic ? "إرسال الاستفسار وتوثيقه" : "Send & Log Inquiry")}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
