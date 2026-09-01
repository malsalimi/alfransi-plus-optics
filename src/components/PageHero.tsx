import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <div className="bg-[#071A2B] text-white py-12 border-b border-[#087E8B]/40 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#087E8B]/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
        {badge && (
          <div className="inline-block px-3 py-1 rounded-full bg-[#F4C400]/10 border border-[#F4C400]/30 text-[#F4C400] text-xs font-bold mb-1">
            {badge}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
