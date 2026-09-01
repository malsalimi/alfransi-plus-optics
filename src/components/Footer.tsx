"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Award,
} from "lucide-react";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";

  return (
    <footer className="bg-[#071A2B] text-slate-300 border-t border-[#087E8B]/40 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-auto overflow-hidden py-1">
                <Image
                  src="/brand/logo-footer.png"
                  alt={dict.brand.name}
                  width={240}
                  height={68}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              {dict.footer.aboutText}
            </p>

            <div className="inline-flex items-center gap-2 bg-[#F4C400]/10 text-[#F4C400] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#F4C400]/30">
              <Award className="w-4 h-4 text-[#F4C400]" />
              <span>{dict.brand.slogan}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-[#087E8B]/50 pb-2 inline-block">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.brands}
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.appointments}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F4C400] transition-colors">
                  {dict.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-[#087E8B]/50 pb-2 inline-block">
              {dict.footer.contactInfo}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#16C7D9] shrink-0 mt-0.5" />
                <span>{dict.brand.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F4C400] shrink-0" />
                <div className="flex items-center gap-2 dir-ltr">
                  <a href="tel:773945678" className="hover:underline">
                    773945678
                  </a>
                  <span>-</span>
                  <a href="tel:777266692" className="hover:underline">
                    777266692
                  </a>
                </div>
              </div>

              <a
                href={getGeneralWhatsAppLink(isArabic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] hover:underline font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{dict.actions.whatsappUs}</span>
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-b border-[#087E8B]/50 pb-2 inline-block">
              {dict.footer.workingHours}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F4C400] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{dict.contact.hoursWeekdays}</p>
                  <p className="text-slate-400 mt-1">{dict.contact.hoursFriday}</p>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/admin/login"
                  className="text-xs text-slate-400 hover:text-white underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16C7D9]" />
                  <span>{dict.nav.adminLogin}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{dict.footer.rights}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {dict.footer.privacy}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {dict.footer.terms}
            </Link>
            <span>•</span>
            <a
              href="https://heybasoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#F4C400] font-bold transition-all px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <span>تصميم وتطوير</span>
              <span className="text-[#F4C400] font-black">شركة هيبة سوفت</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
