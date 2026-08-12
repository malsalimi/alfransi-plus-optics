"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";
  const link = getGeneralWhatsAppLink(isArabic);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all transform hover:scale-105 group border-2 border-white/30 focus:outline-none"
      aria-label="WhatsApp Contact"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
      </div>
      <span className="hidden sm:inline-block text-xs font-bold whitespace-nowrap">
        {dict.actions.whatsappUs}
      </span>
    </a>
  );
}
