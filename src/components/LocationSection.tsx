"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const { locale, dict } = useLocale();
  const isArabic = locale === "ar";
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.google.com";

  return (
    <section className="py-16 bg-[#071A2B] text-white border-b border-[#087E8B]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Information Card Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#087E8B]/30 text-[#16C7D9] px-3.5 py-1 rounded-full text-xs font-bold border border-[#087E8B]/60">
              <MapPin className="w-4 h-4 text-[#F4C400]" />
              <span>{dict.home.sections.locationTitle}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              {dict.home.sections.locationSubtitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {dict.location.landmark}
            </p>

            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-start gap-3 bg-[#0B2940] p-4 rounded-xl border border-[#087E8B]/40">
                <MapPin className="w-5 h-5 text-[#F4C400] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">{dict.contact.addressTitle}</h4>
                  <p className="text-slate-300">{dict.brand.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0B2940] p-4 rounded-xl border border-[#087E8B]/40">
                <Clock className="w-5 h-5 text-[#16C7D9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">{dict.contact.hoursTitle}</h4>
                  <p className="text-slate-300">{dict.contact.hoursWeekdays}</p>
                  <p className="text-slate-400 mt-0.5">{dict.contact.hoursFriday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#0B2940] p-4 rounded-xl border border-[#087E8B]/40">
                <Phone className="w-5 h-5 text-[#F4C400] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">{dict.contact.phoneTitle}</h4>
                  <div className="flex items-center gap-3 font-bold text-white dir-ltr">
                    <a href="tel:773945678" className="hover:underline text-[#16C7D9]">
                      773945678
                    </a>
                    <span>-</span>
                    <a href="tel:777266692" className="hover:underline text-[#16C7D9]">
                      777266692
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] px-6 py-3 rounded-xl text-xs font-black shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>{dict.actions.getDirections}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Map Presentation Frame */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-[#0B2940] border-2 border-[#087E8B]/50 p-3 shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#087E8B]/30 text-[#F4C400] flex items-center justify-center border border-[#087E8B]/60 animate-bounce">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-sm px-4">
                <h3 className="text-lg font-extrabold text-white">{dict.brand.name}</h3>
                <p className="text-xs text-slate-300">{dict.brand.address}</p>
                <p className="text-[11px] text-[#16C7D9] font-mono dir-ltr">
                  Latitude: 15.3694° N, Longitude: 44.1910° E
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#075f69] text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-white/20 transition-colors shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{dict.actions.getDirections}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
