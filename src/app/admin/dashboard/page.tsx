import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, clearAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logoutAdminAction } from "@/lib/actions";
import {
  Glasses,
  Calendar,
  MessageCircle,
  Users,
  LogOut,
  CheckCircle2,
  Clock,
  LayoutDashboard,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [productsCount, appointmentsCount, inquiriesCount, recentAppointments, recentInquiries] =
    await Promise.all([
      prisma.product.count().catch(() => 0),
      prisma.appointment.count({ where: { status: "PENDING" } }).catch(() => 0),
      prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }).catch(() => []),
      prisma.contactInquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }).catch(() => []),
    ]);

  return (
    <div className="min-h-screen bg-[#071A2B] text-slate-100 flex flex-col">
      {/* Admin Navbar */}
      <header className="bg-[#0B2940] border-b border-[#087E8B]/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-[#F4C400]" />
          <div>
            <h1 className="text-base font-extrabold text-white">لوحة تحكم إدارة نظارات الفرنسي بلس</h1>
            <p className="text-[11px] text-[#16C7D9]">مرحباً، {session.username}</p>
          </div>
        </div>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>
        </form>
      </header>

      {/* Admin Subnav Tabs */}
      <div className="bg-[#040D16] border-b border-white/10 px-6 py-3 flex gap-4 text-xs font-bold">
        <Link href="/admin/dashboard" className="text-[#F4C400] underline">
          الرئيسية
        </Link>
        <Link href="/admin/appointments" className="text-slate-300 hover:text-white">
          إدارة الحجوزات ({appointmentsCount})
        </Link>
        <Link href="/admin/products" className="text-slate-300 hover:text-white">
          إدارة المنتجات ({productsCount})
        </Link>
      </div>

      {/* Dashboard Body */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">إجمالي المنتجات</span>
              <Glasses className="w-5 h-5 text-[#16C7D9]" />
            </div>
            <h3 className="text-3xl font-black text-white">{productsCount}</h3>
            <Link href="/admin/products" className="text-[11px] text-[#16C7D9] hover:underline">
              إدارة المنتجات والكتالوج →
            </Link>
          </div>

          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">طلبات حجز معلقة</span>
              <Calendar className="w-5 h-5 text-[#F4C400]" />
            </div>
            <h3 className="text-3xl font-black text-[#F4C400]">{appointmentsCount}</h3>
            <Link href="/admin/appointments" className="text-[11px] text-[#F4C400] hover:underline">
              استعراض المواعيد والتأكيد →
            </Link>
          </div>

          <div className="bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">استفسارات غير مقروءة</span>
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <h3 className="text-3xl font-black text-[#25D366]">{inquiriesCount}</h3>
            <span className="text-[11px] text-slate-400">صندوق الوارد</span>
          </div>
        </div>

        {/* Recent Appointments Table */}
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F4C400]" />
              <span>أحدث طلبات الحجز</span>
            </h3>
            <Link href="/admin/appointments" className="text-xs text-[#16C7D9] hover:underline">
              عرض الكل
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">لا توجد طلبات حجز حالياً.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">اسم العميل</th>
                    <th className="p-3">الهاتف</th>
                    <th className="p-3">الخدمة</th>
                    <th className="p-3">التاريخ والوقت</th>
                    <th className="p-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentAppointments.map((item: any) => (
                    <tr key={item.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold">{item.customerName}</td>
                      <td className="p-3 dir-ltr text-right font-mono">{item.phone}</td>
                      <td className="p-3">{item.serviceNameAr}</td>
                      <td className="p-3">{item.preferredDate} - {item.preferredTime}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4C400]/20 text-[#F4C400]">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
