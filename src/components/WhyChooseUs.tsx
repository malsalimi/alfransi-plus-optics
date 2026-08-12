"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { Sparkles, ShieldCheck, Cpu, Users, Layers, Award } from "lucide-react";

export default function WhyChooseUs() {
  const { dict } = useLocale();

  const icons = [Cpu, Award, Users, Layers];

  return (
    <section className="py-16 bg-[#071A2B] text-white border-b border-[#087E8B]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F4C400]/20 text-[#F4C400] px-3.5 py-1 rounded-full text-xs font-black">
            <Sparkles className="w-4 h-4" />
            <span>{dict.home.sections.whyUsTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {dict.home.sections.whyUsSubtitle}
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dict.home.whyUsItems.map((item: any, idx: number) => {
            const IconComp = icons[idx % icons.length] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-[#0B2940]/80 p-6 rounded-2xl border border-[#087E8B]/40 hover:border-[#F4C400] transition-all space-y-4 group shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[#087E8B]/30 text-[#F4C400] flex items-center justify-center border border-[#087E8B]/60 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#F4C400] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
