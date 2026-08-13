"use client";

import React, { useActionState, useState } from "react";
import { createProductAction } from "@/lib/actions";
import { PlusCircle, X, Check, Image as ImageIcon, Glasses } from "lucide-react";

interface CategoryOption {
  id: string;
  nameAr: string;
}

export default function AddProductModal({ categories }: { categories: CategoryOption[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createProductAction, null);

  React.useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] shadow-lg transition-all"
      >
        <PlusCircle className="w-4 h-4" />
        <span>إضافة منتج جديد</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0B2940] border border-[#087E8B]/60 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl text-right max-h-[90vh] overflow-y-auto" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Glasses className="w-5 h-5 text-[#F4C400]" />
                <h3 className="text-base font-extrabold text-white">إضافة منتج جديد للكتالوج</h3>
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
                  <label className="block text-slate-300 font-bold mb-1.5">اسم المنتج (بالعربية) *</label>
                  <input
                    type="text"
                    name="nameAr"
                    required
                    placeholder="مثال: نظارة طبية تيتانيوم"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">اسم المنتج (بالإنجليزية)</label>
                  <input
                    type="text"
                    name="nameEn"
                    placeholder="e.g. Titanium Frame"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none dir-ltr text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">التصنيف *</label>
                  <select
                    name="categoryId"
                    required
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none"
                  >
                    <option value="">اختر التصنيف...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">رمز المنتج (SKU)</label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="مثال: OPT-2026-01"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">السعر (ر.ي / $)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="مثال: 45000"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">الكمية بالمخزن</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    defaultValue="10"
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#16C7D9] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-[#040D16] p-3.5 rounded-2xl border border-white/10">
                <label className="block text-[#16C7D9] font-bold">صورة المنتج (رفع ملف أو استخدام رابط)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-1">اختيار ملف صورة من الجهاز:</span>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      className="w-full bg-[#071A2B] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#087E8B] file:text-white hover:file:bg-[#066570]"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-1">أو كتابة رابط صورة:</span>
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="/products/eyeglasses-titanium.png"
                      className="w-full bg-[#071A2B] border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 outline-none font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">الوصف والتفاصيل (بالعربية) *</label>
                <textarea
                  name="descAr"
                  rows={3}
                  required
                  placeholder="الوصف الفني للمنتج، الضمان، المواصفات..."
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
                  {isPending ? "جاري الإضافة..." : "حفظ وإضافة للمتجر"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
