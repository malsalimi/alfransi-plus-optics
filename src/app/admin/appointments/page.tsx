import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateAppointmentStatusAction } from "@/lib/actions";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminAppointmentsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="min-h-screen bg-[#071A2B] text-slate-100 flex flex-col">
      <header className="bg-[#0B2940] border-b border-[#087E8B]/40 px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-extrabold text-white">إدارة طلبات الحجز المباشر</h1>
        <Link href="/admin/dashboard" className="text-xs text-[#16C7D9] hover:underline">
          العودة للوحة التحكم
        </Link>
      </header>

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F4C400]" />
            <span>قائمة الحجوزات ({appointments.length})</span>
          </h2>

          {appointments.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">لا توجد حجوزات مسجلة حالياً.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">اسم العميل</th>
                    <th className="p-3">رقم الهاتف</th>
                    <th className="p-3">الخدمة</th>
                    <th className="p-3">التاريخ والوقت</th>
                    <th className="p-3">الملاحظات</th>
                    <th className="p-3">الحالة الحالية</th>
                    <th className="p-3 text-center">تحديث الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {appointments.map((item: any) => (
                    <tr key={item.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold">{item.customerName}</td>
                      <td className="p-3 dir-ltr text-right font-mono">{item.phone}</td>
                      <td className="p-3">{item.serviceNameAr}</td>
                      <td className="p-3">{item.preferredDate} - {item.preferredTime}</td>
                      <td className="p-3 text-slate-400 max-w-xs truncate">{item.notes || "-"}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            item.status === "CONFIRMED"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : item.status === "COMPLETED"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : item.status === "CANCELLED"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/30"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <form
                            action={async () => {
                              "use server";
                              await updateAppointmentStatusAction(item.id, "CONFIRMED");
                            }}
                          >
                            <button
                              type="submit"
                              className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-[10px] font-bold"
                            >
                              تأكيد
                            </button>
                          </form>

                          <form
                            action={async () => {
                              "use server";
                              await updateAppointmentStatusAction(item.id, "COMPLETED");
                            }}
                          >
                            <button
                              type="submit"
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                            >
                              إكمال
                            </button>
                          </form>

                          <form
                            action={async () => {
                              "use server";
                              await updateAppointmentStatusAction(item.id, "CANCELLED");
                            }}
                          >
                            <button
                              type="submit"
                              className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold"
                            >
                              إلغاء
                            </button>
                          </form>
                        </div>
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
