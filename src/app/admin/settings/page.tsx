import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [currentUser, pendingAppointments, unreadInquiries, totalProducts, pendingOrders] = await Promise.all([
    prisma.user.findFirst({
      where: {
        OR: [
          { id: session.userId },
          { username: session.username },
        ],
      },
      select: { username: true, name: true, role: true },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }),
    prisma.product.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <AdminLayout
      activeTab="settings"
      username={session.username}
      counts={{
        orders: pendingOrders,
        appointments: pendingAppointments,
        inquiries: unreadInquiries,
        products: totalProducts,
      }}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Page Title Header */}
        <div className="bg-[#0B2940] border border-[#087E8B]/40 rounded-3xl p-6 sm:p-8 space-y-2 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            إعدادات الحساب والأمان
          </h1>
          <p className="text-xs text-slate-300">
            يمكنك من هنا تغيير اسم المستخدم (Username)، اسم المدير، وكلمة المرور الخاصة بلوحة تحكم نظارات الفرنسي بلاس.
          </p>
        </div>

        {/* Client Form Component */}
        <AdminSettingsForm currentUser={currentUser} />
      </div>
    </AdminLayout>
  );
}
