"use client";

import React, { useActionState, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { createAppointmentAction } from "@/lib/actions";
import { Calendar, Clock, User, Phone, CheckCircle2, AlertCircle } from "lucide-react";

export default function AppointmentForm() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";
  const [state, formAction, isPending] = useActionState(createAppointmentAction, null);

  const services = [
    { ar: "فحص النظر الكمبيوتري الشامل", en: "Comprehensive Computerized Eye Exam" },
    { ar: "تفصيل وتجهيز العدسات الطبية", en: "Prescription Lens Custom Fitting" },
    { ar: "تركيب وتجربة العدسات اللاصقة", en: "Contact Lens Consultation" },
    { ar: "تقييم السمع واختبار السماعات", en: "Audiology Hearing Test & Hearing Aids" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl max-w-xl mx-auto text-slate-800">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#071A2B] text-[#F4C400] mx-auto flex items-center justify-center shadow-md">
          <Calendar className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-black text-[#071A2B]">
          {dict.appointments.formTitle}
        </h3>
        <p className="text-xs text-slate-500">
          {dict.appointments.pageSubtitle}
        </p>
      </div>

      {state?.success ? (
        <div className="bg-[#25D366]/10 border border-[#25D366]/40 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
          <CheckCircle2 className="w-12 h-12 text-[#25D366] mx-auto" />
          <h4 className="text-lg font-extrabold text-slate-900">
            {dict.appointments.successTitle}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {dict.appointments.successMessage}
          </p>
        </div>
      ) : (
        <form action={formAction} className="space-y-4 text-xs">
          {state?.message && !state.success && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Customer Name */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{dict.appointments.fullName} *</span>
            </label>
            <input
              type="text"
              name="customerName"
              required
              placeholder={isArabic ? "أدخل اسمك الكامل..." : "Enter full name..."}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
            />
          </div>

          {/* Customer Phone */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{dict.appointments.phone} *</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder={isArabic ? "مثال: 773945678" : "e.g. 773945678"}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all dir-ltr text-right"
            />
          </div>

          {/* Service Picker */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#087E8B]" />
              <span>{dict.appointments.service} *</span>
            </label>
            <select
              name="serviceNameAr"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all bg-white"
            >
              <option value="">{dict.appointments.selectServicePlaceholder}</option>
              {services.map((item, idx) => (
                <option key={idx} value={item.ar}>
                  {isArabic ? item.ar : item.en}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#087E8B]" />
                <span>{dict.appointments.preferredDate} *</span>
              </label>
              <input
                type="date"
                name="preferredDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#087E8B]" />
                <span>{dict.appointments.preferredTime} *</span>
              </label>
              <select
                name="preferredTime"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all bg-white"
              >
                <option value={dict.appointments.timeMorning}>{dict.appointments.timeMorning}</option>
                <option value={dict.appointments.timeEvening}>{dict.appointments.timeEvening}</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">
              {dict.appointments.notes}
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder={isArabic ? "أي تفاصيل أو ملاحظات خاصة بحالتك..." : "Any specific notes or questions..."}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-[#F4C400] to-[#D99A00] text-[#071A2B] hover:brightness-110 py-3.5 rounded-xl font-extrabold text-sm shadow-lg shadow-[#F4C400]/25 transition-all disabled:opacity-50 mt-2"
          >
            {isPending ? (isArabic ? "جاري الإرسال..." : "Submitting...") : dict.actions.submitAppointment}
          </button>
        </form>
      )}
    </div>
  );
}
