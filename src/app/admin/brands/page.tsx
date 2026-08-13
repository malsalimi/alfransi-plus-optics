import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/admin/AdminLayout";
import AddBrandModal from "@/components/admin/AddBrandModal";
import EditBrandModal from "@/components/admin/EditBrandModal";
import { deleteBrandAction } from "@/lib/actions";
import { Tag, Trash2, CheckCircle2, XCircle } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [brands, pendingAppointments, unreadInquiries, totalProducts] = await Promise.all([
    prisma.brand.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.contactInquiry.count({ where: { status: "UNREAD" } }),
    prisma.product.count(),
  ]);

  return (
    <AdminLayout
      activeTab="brands"
      username={session.username}
      counts={{
        appointments: pendingAppointments,
        inquiries: unreadInquiries,
        products: totalProducts,
        brands: brands.length,
      }}
    >
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B2940] border border-[#087E8B]/40 p-6 rounded-3xl shadow-lg">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
              <Tag className="w-6 h-6 text-[#16C7D9]" />
              <span>إدارة الماركات العالمية ({brands.length})</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              إضافة وتعديل وحذف ماركات النظارات والعدسات والسماعات العالمية المعروضة بالمحل.
            </p>
          </div>

          <AddBrandModal />
        </div>

        {/* Brands Table */}
        <div className="bg-[#0B2940] border border-[#087E8B]/40 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-200">
              <thead className="bg-[#071A2B] text-slate-300 font-bold border-b border-white/10 uppercase">
                <tr>
                  <th className="p-4 text-center">الشعار / الصورة</th>
                  <th className="p-4">اسم الماركة</th>
                  <th className="p-4">الاسم بالإنجليزية</th>
                  <th className="p-4">النبذة والوصف</th>
                  <th className="p-4 text-center">الحالة</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {brands.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      لا تتوفر ماركات حالياً. انقر على "إضافة ماركة جديدة" للبدء.
                    </td>
                  </tr>
                ) : (
                  brands.map((brand) => {
                    const logo = brand.logoUrl || "/brand/logo-mark.png";
                    return (
                      <tr key={brand.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-center">
                          <div className="w-12 h-12 rounded-2xl bg-[#040D16] border border-white/10 p-1.5 flex items-center justify-center mx-auto relative overflow-hidden">
                            <Image
                              src={logo}
                              alt={brand.nameAr}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                        </td>
                        <td className="p-4 font-bold text-white text-sm">{brand.nameAr}</td>
                        <td className="p-4 font-mono text-slate-300 dir-ltr text-right">{brand.nameEn}</td>
                        <td className="p-4 text-slate-300 max-w-xs truncate">{brand.descriptionAr || "—"}</td>
                        <td className="p-4 text-center">
                          {brand.isActive ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>نشط</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-400 border border-slate-500/30">
                              <XCircle className="w-3 h-3" />
                              <span>معطل</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <EditBrandModal brand={brand} />

                            <form
                              action={async () => {
                                "use server";
                                await deleteBrandAction(brand.id);
                              }}
                            >
                              <button
                                type="submit"
                                className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 transition-all"
                                title="حذف الماركة"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
