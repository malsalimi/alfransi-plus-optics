"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import {
  Menu,
  X,
  Phone,
  Globe,
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { getGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Header() {
  const { locale, setLocale, dict } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArabic = locale === "ar";
  const toggleLocale = () => setLocale(isArabic ? "en" : "ar");

  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/services", label: dict.nav.services },
    { href: "/products", label: dict.nav.products },
    { href: "/brands", label: dict.nav.brands },
    { href: "/appointments", label: dict.nav.appointments },
    { href: "/contact", label: dict.nav.contact },
    { href: "/location", label: dict.nav.location },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#071A2B] text-white shadow-xl border-b border-[#087E8B]/30">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#071A2B] via-[#087E8B] to-[#071A2B] text-xs font-medium py-1.5 px-4 text-slate-200 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F4C400] font-semibold">
              <Phone className="w-3.5 h-3.5" />
              <a href="tel:773945678" className="hover:underline dir-ltr">
                773945678
              </a>
              <span className="text-slate-400">|</span>
              <a href="tel:777266692" className="hover:underline dir-ltr">
                777266692
              </a>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#16C7D9]" />
              {dict.brand.address}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#F4C400]" />
              {dict.contact.hoursWeekdays}
            </span>
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 bg-white/10 hover:bg-[#F4C400] hover:text-[#071A2B] px-2.5 py-0.5 rounded-full transition-colors font-bold text-xs"
              aria-label="Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{isArabic ? "English" : "العربية"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl bg-white/5 p-1 border border-[#087E8B]/40 group-hover:border-[#F4C400] transition-all">
            <Image
              src="/brand/logo-mark.png"
              alt={dict.brand.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide leading-tight group-hover:text-[#F4C400] transition-colors">
              {isArabic ? dict.brand.name : "Al-Fransi Plus"}
            </span>
            <span className="text-xs text-[#16C7D9] font-medium tracking-tight">
              {isArabic ? "للبصريات والسمعيات" : "Optics & Audiology"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#087E8B] text-white shadow-md shadow-[#087E8B]/30"
                    : "text-slate-200 hover:text-[#F4C400] hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={getGeneralWhatsAppLink(isArabic)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-[#25D366]/40"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{dict.actions.whatsappUs}</span>
          </a>

          <Link
            href="/appointments"
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#F4C400] to-[#D99A00] text-[#071A2B] hover:brightness-110 px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg shadow-[#F4C400]/20 transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>{dict.actions.bookAppointment}</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 text-slate-200 hover:text-white hover:bg-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071A2B] border-b border-[#087E8B]/40 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? "bg-[#087E8B] text-white"
                      : "text-slate-200 hover:bg-white/5 hover:text-[#F4C400]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#F4C400] text-[#071A2B] font-extrabold py-3 rounded-xl shadow-md text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{dict.actions.bookAppointment}</span>
            </Link>

            <a
              href={getGeneralWhatsAppLink(isArabic)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{dict.actions.whatsappUs}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
