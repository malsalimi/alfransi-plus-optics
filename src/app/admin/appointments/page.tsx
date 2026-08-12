import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import { updateAppointmentStatusAction } from "@/lib/actions";
import { formatWhatsAppNumber } from "@/lib/whatsapp";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  MessageCircle,
  Phone,
  User,
  Check,
  Ban,
  FileText,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminAppointmentsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [appointments, productsCount, inquiriesCount] = await Promise.all([
    prisma.appointment
      .findMany({
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    prisma.product.count().catch(() => 0),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
  ]);

  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;

  return (
    <AdminLayout
      activeTab="appointments"
      username={session.username}
      counts={{
        appointments: pendingCount,
        products: productsCount,
        inquiries: inquiriesCount,
      }}
    >
      <div className="space-y-6">
        {/* Header Title & Quick Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-[#F4C400]" />
              <span>إدارة طلبات حجز المواعيد</span>
            </h1>
            <p className="text-xs text-slate-300">
              استعراض وتأكيد وإدارة حجوزات فحص النظر والسماعات الطبية
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/30">
              {pendingCount} معلقة
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30">
              {confirmedCount} مؤكدة
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {completedCount} مكتملة
            </span>
          </div>
        </div>

        {/* Appointments Table Card */}
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4 shadow-lg">
          {appointments.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">لا توجد طلبات حجز حالياً</h3>
              <p className="text-xs text-slate-400">ستظهر هنا المواعيد المسجلة من قبل الزوار عبر الموقع.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-[#040D16] text-slate-400 border-b border-white/10 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4">اسم العميل</th>
                    <th className="p-4">رقم الهاتف / الواتساب</th>
                    <th className="p-4">الخدمة المطلوبة</th>
                    <th className="p-4">التاريخ والوقت المفضل</th>
                    <th className="p-4">الملاحظات</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات والسريع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {appointments.map((item) => {
                    const formattedPhone = formatWhatsAppNumber(item.phone);
                    const whatsappMsg = encodeURIComponent(
                      `السلام عليكم أخ/ت (${item.customerName})، أتواصل معك من مركز نظارات الفرنسي بلس لتأكيد موعدك لـ (${item.serviceNameAr}) بتاريخ ${item.preferredDate} (${item.preferredTime}).`
                    );
                    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMsg}`;

                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F4C400]">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span>{item.customerName}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dir-ltr text-right font-mono text-[#16C7D9] hover:underline inline-flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                        </td>

                        <td className="p-4 font-semibold text-slate-200">
                          {item.serviceNameAr}
                        </td>

                        <td className="p-4 text-slate-300">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#F4C400]" />
                            <span>{item.preferredDate} ({item.preferredTime})</span>
                          </div>
                        </td>

                        <td className="p-4 text-slate-400 max-w-xs truncate">
                          {item.notes ? (
                            <span title={item.notes} className="flex items-center gap-1 text-slate-300">
                              <FileText className="w-3 h-3 text-[#16C7D9]" />
                              <span>{item.notes}</span>
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                              item.status === "CONFIRMED"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : item.status === "COMPLETED"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : item.status === "CANCELLED"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-[#F4C400]/20 text-[#F4C400] border-[#F4C400]/30"
                            }`}
                          >
                            {item.status === "PENDING"
                              ? "معلق"
                              : item.status === "CONFIRMED"
                              ? "مؤكد"
                              : item.status === "COMPLETED"
                              ? "مكتمل"
                              : "ملغي"}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* WhatsApp Button */}
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-[#071A2B] transition-all"
                              title="تواصل عبر الواتساب"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            {/* Status Actions */}
                            {item.status !== "CONFIRMED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateAppointmentStatusAction(item.id, "CONFIRMED");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2.5 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[10px] font-extrabold transition-all"
                                  title="تأكيد الموعد"
                                >
                                  تأكيد
                                </button>
                              </form>
                            )}

                            {item.status !== "COMPLETED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateAppointmentStatusAction(item.id, "COMPLETED");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-extrabold transition-all"
                                  title="إكمال الخدمة"
                                >
                                  مكتمل
                                </button>
                              </form>
                            )}

                            {item.status !== "CANCELLED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateAppointmentStatusAction(item.id, "CANCELLED");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2 py-1 bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white rounded-lg text-[10px] font-extrabold border border-red-500/30 transition-all"
                                  title="إلغاء الموعد"
                                >
                                  إلغاء
                                </button>
                              </form>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
