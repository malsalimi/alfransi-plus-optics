"use client";

import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { createOrderAction } from "@/lib/actions";
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  X,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface ProductOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id?: string;
    nameAr: string;
    nameEn?: string;
    sku?: string | null;
    price?: number | null;
    imageUrl?: string | null;
  };
}

export default function ProductOrderModal({
  isOpen,
  onClose,
  product,
}: ProductOrderModalProps) {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [quantity, setQuantity] = useState(1);
  const [state, formAction, isPending] = useActionState(createOrderAction, null);

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

  if (!isOpen) return null;

  const unitPrice = product.price || 0;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071A2B]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-800 relative max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#071A2B] text-white p-5 flex items-center justify-between border-b border-[#087E8B]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F4C400]/20 text-[#F4C400] flex items-center justify-center border border-[#F4C400]/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {isArabic ? "طلب وشراء المنتج" : "Order & Purchase Product"}
              </h3>
              <p className="text-[11px] text-slate-300">
                {isArabic ? "توثيق الطلب في لوحة التحكم وتأكيده عبر الواتساب" : "Logged in admin & confirmed on WhatsApp"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Product Summary Preview */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F7FAFC] border border-slate-200">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 flex items-center justify-center">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.nameAr}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <ShoppingBag className="w-6 h-6 text-slate-400" />
              )}
            </div>

            <div className="flex-grow min-w-0 space-y-1">
              <h4 className="font-extrabold text-sm text-[#071A2B] truncate">
                {product.nameAr}
              </h4>
              <div className="flex items-center gap-3 text-xs">
                {product.sku && (
                  <span className="text-slate-400 font-mono text-[10px]">
                    SKU: {product.sku}
                  </span>
                )}
                {product.price ? (
                  <span className="font-extrabold text-[#087E8B]">
                    {product.price} ريال يمني
                  </span>
                ) : (
                  <span className="text-slate-500 text-[11px]">السعر عند التواصل</span>
                )}
              </div>
            </div>
          </div>

          {state?.success ? (
            <div className="bg-[#25D366]/10 border border-[#25D366]/40 p-6 rounded-2xl text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#25D366]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-black bg-[#25D366] text-[#071A2B]">
                  #{state.orderNumber}
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  {isArabic ? "تم تسجيل طلبك بنجاح!" : "Order Logged Successfully!"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {isArabic
                    ? "تم حفظ الطلب برقم فريد في لوحة تحكم إدارة المركز. تم تجهيز رسالة الواتساب، أو اضغط الزر للتأكيد الفوري."
                    : "Your order is saved in the dashboard. Click below to send order details via WhatsApp."}
                </p>
              </div>

              {state.whatsappUrl && (
                <div className="pt-2 space-y-3">
                  <a
                    href={state.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-5 rounded-xl font-black text-xs shadow-lg shadow-[#25D366]/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>
                      {isArabic
                        ? "إرسال وتأكيد الطلب عبر الواتساب (773945678)"
                        : "Confirm Order via WhatsApp (773945678)"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <p className="text-[10px] text-slate-500">
                    {isArabic
                      ? "✓ تم حفظ الطلب كطلب حقيقي في لوحة التحكم"
                      : "✓ Order record created in system"}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  {isArabic ? "إغلاق النافذة" : "Close Window"}
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

              {/* Hidden Inputs */}
              <input type="hidden" name="productName" value={product.nameAr} />
              {product.id && <input type="hidden" name="productId" value={product.id} />}
              {product.sku && <input type="hidden" name="productSku" value={product.sku} />}
              {product.price && <input type="hidden" name="price" value={product.price} />}
              <input type="hidden" name="quantity" value={quantity} />

              {/* Customer Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#087E8B]" />
                  <span>{isArabic ? "اسم العميل الكريم *" : "Customer Name *"}</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder={isArabic ? "أدخل اسمك الكامل..." : "Enter your full name..."}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
                />
              </div>

              {/* Customer Phone */}
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all dir-ltr text-right"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#087E8B]" />
                  <span>{isArabic ? "المدينة / العنوان بالتفصيل" : "City / Delivery Address"}</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder={isArabic ? "مثال: صنعاء - شارع تعز / أو استلام من الفرع" : "e.g. Sana'a or store pickup"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-700">
                  {isArabic ? "الكمية المطلوبة:" : "Quantity:"}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-sm w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              {product.price && (
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-500">{isArabic ? "الإجمالي التقريبي:" : "Total Amount:"}</span>
                  <span className="font-black text-[#087E8B] text-sm">
                    {totalPrice} ريال يمني
                  </span>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  {isArabic ? "ملاحظات خاصة (مقاس العدسات أو تفاصيل أخرى)" : "Additional Notes"}
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder={isArabic ? "أي تفاصيل بخصوص النظر أو اللون المفضل..." : "Any preferences..."}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#087E8B] focus:ring-2 focus:ring-[#087E8B]/20 outline-none text-slate-800 transition-all"
                ></textarea>
              </div>

              {/* Guarantee badges */}
              <div className="flex items-center justify-around py-2 text-[10px] text-slate-500 border-y border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#087E8B]" />
                  {isArabic ? "منتج أصلي 100%" : "100% Authentic"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#087E8B]" />
                  {isArabic ? "توصيل لكافة المحافظات" : "Countrywide Delivery"}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#F4C400] to-[#D99A00] hover:brightness-110 text-[#071A2B] py-3.5 rounded-xl font-black text-xs shadow-lg shadow-[#F4C400]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isPending
                    ? (isArabic ? "جاري تسجيل الطلب..." : "Processing Order...")
                    : (isArabic ? "تأكيد الطلب وحفظه في لوحة التحكم" : "Confirm & Save Order")}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
