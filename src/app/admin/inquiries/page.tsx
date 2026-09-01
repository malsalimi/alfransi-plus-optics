import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatWhatsAppNumber } from "@/lib/whatsapp";
import {
  MessageCircle,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function markInquiryReadAction(id: string) {
  "use server";
  try {
    await prisma.contactInquiry.update({
      where: { id },
      data: { status: "READ" },
    });
    revalidatePath("/admin/inquiries");
  } catch (error) {
    console.error("Failed to mark inquiry read:", error);
  }
}

export default async function AdminInquiriesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [inquiries, pendingAppointmentsCount, totalProductsCount, unreadInquiriesCount] =
    await Promise.all([
      prisma.contactInquiry.findMany({
        orderBy: { createdAt: "desc" },
      }).catch(() => []),
      prisma.appointment.count({ where: { status: "PENDING" } }).catch(() => 0),
      prisma.product.count().catch(() => 0),
      prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
    ]);

  return (
    <AdminLayout
      activeTab="inquiries"
      username={session.username}
      counts={{
        appointments: pendingAppointmentsCount,
        products: totalProductsCount,
        inquiries: unreadInquiriesCount,
      }}
    >
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <span>استفسارات ورسائل العملاء</span>
            </h1>
            <p className="text-xs text-slate-300">
              إدارة الرسائل والاستفسارات الواردة عبر نموذج الاتصال والواتساب
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
              {unreadInquiriesCount} غير مقروءة
            </span>
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 text-slate-300 border border-white/10">
              إجمالي {inquiries.length} رسالة
            </span>
          </div>
        </div>

        {/* Inquiries Cards / Table */}
        {inquiries.length === 0 ? (
          <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-12 text-center space-y-3">
            <MessageCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">لا توجد رسائل حالياً</h3>
            <p className="text-xs text-slate-400">ستظهر هنا الرسائل التي يرسلها العملاء عبر صفحة "تواصل معنا".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((item) => {
              const formattedPhone = formatWhatsAppNumber(item.phone);
              const isUnread = item.status === "UNREAD";
              const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                `السلام عليكم، الأخ/ت (${item.name})، أتواصل معك من إدارة مركز نظارات الفرنسي بلاس بخصوص استفسارك:\n"${item.message}"`
              )}`;

              return (
                <div
                  key={item.id}
                  className={`bg-[#0B2940] rounded-2xl border p-6 transition-all space-y-4 ${
                    isUnread
                      ? "border-[#25D366]/60 shadow-lg shadow-[#25D366]/5"
                      : "border-[#087E8B]/30 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F4C400] font-black">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{item.name}</span>
                          {isUnread && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#25D366] text-[#071A2B]">
                              جديد
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400 dir-ltr text-right font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#16C7D9]" />
                          <span>{item.phone}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#16C7D9]" />
                      <span>{new Date(item.createdAt).toLocaleDateString("ar-YE")}</span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="bg-[#040D16] p-4 rounded-xl text-xs text-slate-200 leading-relaxed border border-white/5">
                    "{item.message}"
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-[#25D366] hover:bg-[#1eb956] text-[#071A2B] shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>الرد عبر الواتساب</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {isUnread && (
                      <form action={markInquiryReadAction.bind(null, item.id)}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#16C7D9]" />
                          <span>تحديد كمقروء</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
