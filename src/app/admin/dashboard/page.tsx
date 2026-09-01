import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatWhatsAppNumber } from "@/lib/whatsapp";
import {
  Glasses,
  Calendar,
  MessageCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  PlusCircle,
  Eye,
  CheckCircle,
  KeyRound,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [
    productsCount,
    appointmentsCount,
    inquiriesCount,
    recentAppointments,
    recentInquiries,
  ] = await Promise.all([
    prisma.product.count().catch(() => 0),
    prisma.appointment.count({ where: { status: "PENDING" } }).catch(() => 0),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
    prisma.appointment
      .findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    prisma.contactInquiry
      .findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
  ]);

  return (
    <AdminLayout
      activeTab="dashboard"
      username={session.username}
      counts={{
        appointments: appointmentsCount,
        products: productsCount,
        inquiries: inquiriesCount,
      }}
    >
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0B2940] via-[#087E8B]/30 to-[#0B2940] p-6 sm:p-8 rounded-3xl border border-[#087E8B]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>نظام التقرير المباشر</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              مرحباً بك، {session.username} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              إليك الملخص اليومي لحركة الحجوزات والمنتجات واستفسارات العملاء في مركز نظارات الفرنسي بلاس.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة منتج جديد</span>
            </Link>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#087E8B] hover:bg-[#066570] text-white border border-[#087E8B]/60 shadow-lg transition-all"
            >
              <KeyRound className="w-4 h-4 text-[#F4C400]" />
              <span>الحساب والأمان</span>
            </Link>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#16C7D9]" />
              <span>إدارة الحجوزات</span>
            </Link>
          </div>
        </div>

        {/* Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40 shadow-lg space-y-3 relative overflow-hidden group hover:border-[#16C7D9]/60 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">كتالوج المنتجات</span>
              <div className="w-10 h-10 rounded-xl bg-[#087E8B]/20 border border-[#087E8B]/40 flex items-center justify-center text-[#16C7D9]">
                <Glasses className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-white">{productsCount}</h3>
              <p className="text-[11px] text-slate-400">إجمالي النظارات والسماعات المتاحة</p>
            </div>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#16C7D9] hover:underline pt-2"
            >
              <span>إدارة الكتالوج</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#F4C400]/40 shadow-lg space-y-3 relative overflow-hidden group hover:border-[#F4C400]/70 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">مواعيد معلقة</span>
              <div className="w-10 h-10 rounded-xl bg-[#F4C400]/20 border border-[#F4C400]/40 flex items-center justify-center text-[#F4C400]">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-[#F4C400]">{appointmentsCount}</h3>
              <p className="text-[11px] text-slate-400">طلبات حجز بانتظار التأكيد</p>
            </div>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#F4C400] hover:underline pt-2"
            >
              <span>معالجة الحجوزات</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#25D366]/40 shadow-lg space-y-3 relative overflow-hidden group hover:border-[#25D366]/70 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">رسائل غير مقروءة</span>
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-[#25D366]">{inquiriesCount}</h3>
              <p className="text-[11px] text-slate-400">استفسارات جديدة من الموقع</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline pt-2"
            >
              <span>فتح صندوق الوارد</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F4C400]" />
                <span>أحدث طلبات المواعيد</span>
              </h3>
              <Link href="/admin/appointments" className="text-xs font-bold text-[#16C7D9] hover:underline">
                عرض الكل ({appointmentsCount})
              </Link>
            </div>

            {recentAppointments.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">لا توجد طلبات حجز حالياً.</p>
            ) : (
              <div className="space-y-3">
                {recentAppointments.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#040D16] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.customerName}</span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#F4C400]/20 text-[#F4C400]">
                          {item.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.serviceNameAr} • {item.preferredDate} ({item.preferredTime})
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${formatWhatsAppNumber(item.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-[#071A2B] transition-all"
                      title="مراسلة الواتساب"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Inquiries */}
          <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>أحدث استفسارات التواصل</span>
              </h3>
              <Link href="/admin/inquiries" className="text-xs font-bold text-[#16C7D9] hover:underline">
                صندوق الرسائل ({inquiriesCount})
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">لا توجد رسائل حالياً.</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#040D16] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.status === "UNREAD" && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#25D366] text-[#071A2B]">
                            جديد
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-300 truncate max-w-xs">
                        "{item.message}"
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${formatWhatsAppNumber(item.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-[#071A2B] transition-all"
                      title="مراسلة الواتساب"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
