import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import AddProductModal from "@/components/admin/AddProductModal";
import { deleteProductAction } from "@/lib/actions";
import { Glasses, Trash2, Tag, CheckCircle2, XCircle } from "lucide-react";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [products, categories, pendingAppointmentsCount, unreadInquiriesCount] = await Promise.all([
    prisma.product
      .findMany({
        include: { category: true, brand: true, images: true },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    prisma.category.findMany().catch(() => []),
    prisma.appointment.count({ where: { status: "PENDING" } }).catch(() => 0),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }).catch(() => 0),
  ]);

  return (
    <AdminLayout
      activeTab="products"
      username={session.username}
      counts={{
        appointments: pendingAppointmentsCount,
        products: products.length,
        inquiries: unreadInquiriesCount,
      }}
    >
      <div className="space-y-6">
        {/* Header Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B2940] p-6 rounded-2xl border border-[#087E8B]/40">
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
              <Glasses className="w-6 h-6 text-[#16C7D9]" />
              <span>إدارة كتالوج المنتجات للنظارات والسماعات</span>
            </h1>
            <p className="text-xs text-slate-300">
              إضافة، تعديل، وحذف المعروضات من الكتالوج العام للمحل
            </p>
          </div>

          <AddProductModal categories={categories} />
        </div>

        {/* Products Table Card */}
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4 shadow-lg">
          {products.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Glasses className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">لا توجد منتجات مسجلة في الكتالوج حالياً</h3>
              <p className="text-xs text-slate-400">اضغط على "إضافة منتج جديد" لرفع أول نضارة أو سماعة للمتجر.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-[#040D16] text-slate-400 border-b border-white/10 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4">اسم المنتج</th>
                    <th className="p-4">رمز SKU</th>
                    <th className="p-4">التصنيف</th>
                    <th className="p-4">الماركة</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4">الكمية بالمخزن</th>
                    <th className="p-4">التوفر</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#16C7D9]"></span>
                          <span>{item.nameAr}</span>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-slate-300 dir-ltr text-right">
                        {item.sku || "-"}
                      </td>

                      <td className="p-4 text-slate-300">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-medium">
                          {item.category?.nameAr || "-"}
                        </span>
                      </td>

                      <td className="p-4 text-slate-300">
                        {item.brand?.nameAr || "-"}
                      </td>

                      <td className="p-4 font-bold text-[#F4C400]">
                        {item.price ? `${item.price.toLocaleString()} ر.ي` : "حسب الفحص"}
                      </td>

                      <td className="p-4 font-bold text-slate-200">
                        {item.stockQuantity} قطعة
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                          {item.isAvailable ? "متوفر بالفرع" : "غير متوفر"}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <form
                          action={async () => {
                            "use server";
                            await deleteProductAction(item.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 transition-all"
                            title="حذف المنتج من الكتالوج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
