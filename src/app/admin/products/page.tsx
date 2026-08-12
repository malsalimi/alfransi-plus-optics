import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProductAction } from "@/lib/actions";
import { Glasses, Trash2, Tag, Plus } from "lucide-react";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="min-h-screen bg-[#071A2B] text-slate-100 flex flex-col">
      <header className="bg-[#0B2940] border-b border-[#087E8B]/40 px-6 py-4 flex items-center justify-between">
        <h1 className="text-base font-extrabold text-white">إدارة كتالوج المنتجات والنظارات</h1>
        <Link href="/admin/dashboard" className="text-xs text-[#16C7D9] hover:underline">
          العودة للوحة التحكم
        </Link>
      </header>

      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="bg-[#0B2940] rounded-2xl border border-[#087E8B]/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Glasses className="w-4 h-4 text-[#16C7D9]" />
              <span>المنتجات المسجلة ({products.length})</span>
            </h2>
          </div>

          {products.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">لا توجد منتجات مسجلة في الكتالوج حالياً.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right text-slate-200">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">اسم المنتج</th>
                    <th className="p-3">رمز SKU</th>
                    <th className="p-3">التصنيف</th>
                    <th className="p-3">الماركة</th>
                    <th className="p-3">الكمية بالمخزن</th>
                    <th className="p-3">التوفر</th>
                    <th className="p-3 text-center">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((item: any) => (
                    <tr key={item.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold">{item.nameAr}</td>
                      <td className="p-3 font-mono dir-ltr text-right">{item.sku || "-"}</td>
                      <td className="p-3">{item.category?.nameAr || "-"}</td>
                      <td className="p-3">{item.brand?.nameAr || "-"}</td>
                      <td className="p-3 font-bold">{item.stockQuantity} قطعة</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/20 text-green-400">
                          {item.isAvailable ? "متوفر" : "غير متوفر"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <form
                          action={async () => {
                            "use server";
                            await deleteProductAction(item.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded transition-colors"
                            title="حذف المنتج"
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
      </main>
    </div>
  );
}
