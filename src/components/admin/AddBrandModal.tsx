"use client";

import React, { useActionState, useState, useEffect } from "react";
import { createBrandAction } from "@/lib/actions";
import { PlusCircle, X, Tag } from "lucide-react";

export default function AddBrandModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createBrandAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg transition-all"
      >
        <PlusCircle className="w-4 h-4" />
        <span>إضافة ماركة جديدة</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-[#0B2940] border border-[#087E8B]/60 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl text-right max-h-[90vh] overflow-y-auto"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Tag className="w-5 h-5 text-[#F4C400]" />
                <h3 className="text-base font-extrabold text-white">إضافة ماركة جديدة للكتالوج</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error / Success Feedback */}
            {state?.message && (
              <div
                className={`p-3 rounded-xl text-xs font-bold ${
                  state.success
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {state.message}
              </div>
            )}

            {/* Form */}
            <form action={formAction} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">اسم الماركة (بالعربية) *</label>
                  <input
                    type="text"
                    name="nameAr"
                    required
                    placeholder="مثال: ريبان الإيطالية"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">اسم الماركة (بالإنجليزية)</label>
                  <input
                    type="text"
                    name="nameEn"
                    placeholder="Ray-Ban"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none dir-ltr text-right"
                  />
                </div>
              </div>

              {/* Image Input File or URL */}
              <div className="space-y-3 bg-[#040D16] p-3.5 rounded-2xl border border-white/10">
                <label className="block text-[#16C7D9] font-bold">شعار / صورة الماركة (رفع ملف أو استخدام رابط)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-1">رفع ملف صورة من الجهاز:</span>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      className="w-full bg-[#071A2B] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#087E8B] file:text-white hover:file:bg-[#066570]"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-1">أو رابط الصورة:</span>
                    <input
                      type="text"
                      name="logoUrl"
                      placeholder="/brands/rayban-logo.png"
                      className="w-full bg-[#071A2B] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 outline-none font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">وصف ونبذة عن الماركة</label>
                <textarea
                  name="descriptionAr"
                  rows={3}
                  placeholder="العلامة العالمية الإيطالية الرائدة في النظارات الشمسية..."
                  className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] font-extrabold shadow-lg disabled:opacity-50"
                >
                  {isPending ? "جاري الإضافة..." : "حفظ الماركة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
