"use client";

import React, { useActionState, useState, useEffect } from "react";
import { updateProductAction } from "@/lib/actions";
import { Edit, X, Glasses } from "lucide-react";

interface CategoryOption {
  id: string;
  nameAr: string;
}

interface ProductItem {
  id: string;
  nameAr: string;
  nameEn?: string | null;
  categoryId: string;
  descAr: string;
  descEn?: string | null;
  sku?: string | null;
  price?: number | null;
  stockQuantity: number;
  images?: { url: string }[];
}

export default function EditProductModal({
  product,
  categories,
}: {
  product: ProductItem;
  categories: CategoryOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(updateProductAction, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  const currentImageUrl = product.images?.[0]?.url || "";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-[#087E8B]/20 hover:bg-[#087E8B] text-[#16C7D9] hover:text-white border border-[#087E8B]/40 transition-all"
        title="تعديل المنتج"
      >
        <Edit className="w-4 h-4" />
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
                <Glasses className="w-5 h-5 text-[#F4C400]" />
                <h3 className="text-base font-extrabold text-white">تعديل بيانات المنتج</h3>
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
              <input type="hidden" name="id" value={product.id} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">اسم المنتج (بالعربية) *</label>
                  <input
                    type="text"
                    name="nameAr"
                    required
                    defaultValue={product.nameAr}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">اسم المنتج (بالإنجليزية)</label>
                  <input
                    type="text"
                    name="nameEn"
                    defaultValue={product.nameEn || ""}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none dir-ltr text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">التصنيف *</label>
                  <select
                    name="categoryId"
                    required
                    defaultValue={product.categoryId}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none"
                  >
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
                    defaultValue={product.sku || ""}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none font-mono"
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
                    defaultValue={product.price || ""}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">الكمية بالمخزن</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    defaultValue={product.stockQuantity}
                    className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">رابط صورة المنتج (Image URL)</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={currentImageUrl}
                  className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">الوصف والتفاصيل *</label>
                <textarea
                  name="descAr"
                  rows={3}
                  required
                  defaultValue={product.descAr}
                  className="w-full bg-[#040D16] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#16C7D9] outline-none resize-none"
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
                  {isPending ? "جاري التحديث..." : "حفظ التعديلات"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
