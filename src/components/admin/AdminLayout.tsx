"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutAdminAction } from "@/lib/actions";
import {
  LayoutDashboard,
  Calendar,
  Glasses,
  MessageCircle,
  LogOut,
  ExternalLink,
  Store,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: "dashboard" | "appointments" | "products" | "inquiries";
  username: string;
  counts?: {
    appointments?: number;
    products?: number;
    inquiries?: number;
  };
}

export default function AdminLayout({
  children,
  activeTab,
  username,
  counts = {},
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم الرئيسية",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "appointments",
      label: "طلبات الحجوزات",
      href: "/admin/appointments",
      icon: Calendar,
      badge: counts.appointments ? counts.appointments : null,
      badgeColor: "bg-[#F4C400] text-[#071A2B]",
    },
    {
      id: "products",
      label: "إدارة المنتجات",
      href: "/admin/products",
      icon: Glasses,
      badge: counts.products ? counts.products : null,
      badgeColor: "bg-[#087E8B] text-white",
    },
    {
      id: "inquiries",
      label: "رسائل واستفسارات العملاء",
      href: "/admin/inquiries",
      icon: MessageCircle,
      badge: counts.inquiries ? counts.inquiries : null,
      badgeColor: "bg-[#25D366] text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-[#071A2B] text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Header Bar */}
      <header className="bg-[#0B2940] border-b border-[#087E8B]/40 sticky top-0 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="قائمة الملاحة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="relative h-10 w-auto">
              <Image
                src="/brand/logo-header.png"
                alt="نظارات الفرنسي بلس"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-black bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/30">
              لوحة الإدارة
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all border border-white/10"
          >
            <Store className="w-4 h-4 text-[#16C7D9]" />
            <span>عرض الموقع العام</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{username}</div>
              <div className="text-[10px] text-[#16C7D9]">مدير النظام</div>
            </div>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-red-500/30"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area with Navigation */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Navigation Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`fixed md:sticky md:top-[65px] z-30 inset-y-0 right-0 w-64 bg-[#0B2940] border-l border-[#087E8B]/30 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0 top-[65px] h-[calc(100vh-65px)]" : "translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
              قائمة الملاحة
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                      isActive
                        ? "bg-[#087E8B] text-white shadow-lg border border-[#16C7D9]/40"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-[#F4C400]" : "text-slate-400 group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          item.badgeColor || "bg-[#F4C400] text-[#071A2B]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex md:hidden items-center justify-between px-3 py-2 rounded-xl bg-white/5 text-xs text-slate-300 font-bold"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#16C7D9]" />
                <span>زيارة الموقع العام</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="text-[10px] text-slate-400 text-center space-y-1">
              <p>نظام إدارة نظارات الفرنسي بلس v1.0</p>
              <p className="text-[#087E8B]">للبصريات والسمعيات - صنعاء</p>
            </div>
          </div>
        </aside>

        {/* Page Content Body */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
