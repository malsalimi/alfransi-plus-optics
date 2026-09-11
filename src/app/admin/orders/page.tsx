import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import { updateOrderStatusAction } from "@/lib/actions";
import { formatWhatsAppNumber } from "@/lib/whatsapp";
import {
  ShoppingBag,
  Clock,
  MessageCircle,
  Phone,
  User,
  CheckCircle2,
  Package,
  MapPin,
  Tag,
  DollarSign,
  AlertCircle,
  FileText,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [orders, appointmentsCount, productsCount, inquiriesCount] = await Promise.all([
    prisma.order
      .findMany({
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    prisma.appointment.count({ where: { status: "PENDING" } }).catch(() => 0),
    prisma.product.count().catch(() => 0),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
  ]);

  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const processingCount = orders.filter((o) => o.status === "PROCESSING").length;
  const completedCount = orders.filter((o) => o.status === "COMPLETED").length;
  const totalValue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <AdminLayout
      activeTab="orders"
      username={session.username}
      counts={{
        orders: pendingCount,
        appointments: appointmentsCount,
        products: productsCount,
        inquiries: inquiriesCount,
      }}
    >
      <div className="space-y-6">
        {/* Header Title & Quick Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
              <ShoppingBag className="w-6 h-6 text-[#16C7D9]" />
              <span>إدارة طلبات المنتجات والمبيعات</span>
            </h1>
            <p className="text-xs text-slate-300">
              استعراض ومتابعة وتحديث طلبات شراء وحجز النظارات والعدسات والسماعات الطبية
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-[#F4C400]/20 text-[#F4C400] border border-[#F4C400]/30">
              {pendingCount} معلقة
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#16C7D9]/20 text-[#16C7D9] border border-[#16C7D9]/30">
              {processingCount} قيد التجهيز
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30">
              {completedCount} مكتملة
            </span>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#0B2940] p-4 rounded-xl border border-white/5 space-y-1">
            <div className="text-[11px] text-slate-400">إجمالي الطلبات</div>
            <div className="text-2xl font-black text-white">{orders.length}</div>
          </div>
          <div className="bg-[#0B2940] p-4 rounded-xl border border-[#F4C400]/20 space-y-1">
            <div className="text-[11px] text-[#F4C400]">طلبات جديدة بانتظار التأكيد</div>
            <div className="text-2xl font-black text-[#F4C400]">{pendingCount}</div>
          </div>
          <div className="bg-[#0B2940] p-4 rounded-xl border border-[#16C7D9]/20 space-y-1">
            <div className="text-[11px] text-[#16C7D9]">طلبات قيد التجهيز والتوصيل</div>
            <div className="text-2xl font-black text-[#16C7D9]">{processingCount}</div>
          </div>
          <div className="bg-[#0B2940] p-4 rounded-xl border border-green-500/20 space-y-1">
            <div className="text-[11px] text-green-400">القيمة التقديرية للطلبات</div>
            <div className="text-2xl font-black text-green-400 font-mono">
              {totalValue.toLocaleString()} <span className="text-xs">ريال</span>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4 shadow-lg">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">لا توجد طلبات مسجلة حالياً</h3>
              <p className="text-xs text-slate-400">
                ستظهر هنا الطلبات الحقيقية التي يقدمها الزوار عبر زر "طلب وشراء المنتج" في الموقع.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-[#040D16] text-slate-400 border-b border-white/10 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4">رقم الطلب والتاريخ</th>
                    <th className="p-4">بيانات العميل</th>
                    <th className="p-4">المنتج المطلوب</th>
                    <th className="p-4">السعر والكمية</th>
                    <th className="p-4">العنوان والملاحظات</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات والرد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((item) => {
                    const formattedPhone = formatWhatsAppNumber(item.phone);
                    const whatsappMsg = encodeURIComponent(
                      `السلام عليكم أخ/ت (${item.customerName})، أتواصل معك من إدارة مركز نظارات الفرنسي بلاس بخصوص طلبك رقم (${item.orderNumber}) لمنتج: ${item.productName}.`
                    );
                    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMsg}`;

                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        {/* Order Number & Date */}
                        <td className="p-4 font-mono">
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-0.5 rounded-md font-black bg-[#16C7D9]/20 text-[#16C7D9] border border-[#16C7D9]/30">
                              #{item.orderNumber}
                            </span>
                            <div className="text-[10px] text-slate-400">
                              {new Date(item.createdAt).toLocaleDateString("ar-YE")}
                            </div>
                          </div>
                        </td>

                        {/* Customer Info */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-[#F4C400]" />
                              <span>{item.customerName}</span>
                            </div>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dir-ltr text-right font-mono text-[#16C7D9] hover:underline flex items-center gap-1 text-[11px]"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{item.phone}</span>
                            </a>
                          </div>
                        </td>

                        {/* Product Info */}
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <div className="font-bold text-white max-w-xs">{item.productName}</div>
                            {item.productSku && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                SKU: {item.productSku}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Price & Quantity */}
                        <td className="p-4 font-mono">
                          <div className="space-y-0.5">
                            <div className="text-white font-bold">
                              {item.totalAmount ? `${item.totalAmount} ريال` : "غير محدد"}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              الكمية: {item.quantity} {item.price ? `(${item.price} للقطعة)` : ""}
                            </div>
                          </div>
                        </td>

                        {/* Address & Notes */}
                        <td className="p-4 text-slate-300 max-w-xs">
                          <div className="space-y-1">
                            {item.address && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                                <MapPin className="w-3 h-3 text-[#16C7D9] shrink-0" />
                                <span className="truncate">{item.address}</span>
                              </div>
                            )}
                            {item.notes && (
                              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                <FileText className="w-3 h-3 text-[#F4C400] shrink-0" />
                                <span className="truncate" title={item.notes}>{item.notes}</span>
                              </div>
                            )}
                            {!item.address && !item.notes && <span className="text-slate-500">-</span>}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                              item.status === "COMPLETED"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : item.status === "PROCESSING"
                                ? "bg-[#16C7D9]/20 text-[#16C7D9] border-[#16C7D9]/30"
                                : item.status === "CANCELLED"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-[#F4C400]/20 text-[#F4C400] border-[#F4C400]/30"
                            }`}
                          >
                            {item.status === "PENDING"
                              ? "معلق"
                              : item.status === "PROCESSING"
                              ? "قيد التجهيز"
                              : item.status === "COMPLETED"
                              ? "مكتمل"
                              : "ملغي"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* WhatsApp Button */}
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-[#071A2B] transition-all"
                              title="تواصل وتأكيد عبر الواتساب"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>

                            {/* Status Actions */}
                            {item.status !== "PROCESSING" && item.status !== "COMPLETED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateOrderStatusAction(item.id, "PROCESSING");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2.5 py-1 bg-[#16C7D9] hover:bg-[#13b1c2] text-[#071A2B] rounded-lg text-[10px] font-extrabold transition-all"
                                  title="بدء تجهيز الطلب"
                                >
                                  تجهيز
                                </button>
                              </form>
                            )}

                            {item.status !== "COMPLETED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateOrderStatusAction(item.id, "COMPLETED");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2.5 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-[10px] font-extrabold transition-all"
                                  title="إتمام الطلب"
                                >
                                  مكتمل
                                </button>
                              </form>
                            )}

                            {item.status !== "CANCELLED" && (
                              <form
                                action={async () => {
                                  "use server";
                                  await updateOrderStatusAction(item.id, "CANCELLED");
                                }}
                              >
                                <button
                                  type="submit"
                                  className="px-2 py-1 bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white rounded-lg text-[10px] font-extrabold border border-red-500/30 transition-all"
                                  title="إلغاء الطلب"
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
