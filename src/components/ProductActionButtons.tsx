"use client";

import React, { useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import ProductOrderModal from "@/components/ProductOrderModal";

interface ProductActionButtonsProps {
  product: {
    id: string;
    nameAr: string;
    nameEn?: string;
    sku?: string | null;
    price?: number | null;
    imageUrl?: string | null;
  };
  whatsappLink: string;
}

export default function ProductActionButtons({
  product,
  whatsappLink,
}: ProductActionButtonsProps) {
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Primary Order Button */}
      <button
        type="button"
        onClick={() => setOrderModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F4C400] to-[#D99A00] hover:brightness-110 text-[#071A2B] py-3.5 rounded-xl text-sm font-black shadow-xl shadow-[#F4C400]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>طلب وشراء المنتج الآن (تسجيل وحفظ الطلب)</span>
      </button>

      {/* WhatsApp Direct Inquiry Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-xs font-extrabold shadow-md transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>استفسار مباشر عبر واتساب المركز</span>
      </a>

      {/* Quick Order Modal */}
      <ProductOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        product={product}
      />
    </div>
  );
}
