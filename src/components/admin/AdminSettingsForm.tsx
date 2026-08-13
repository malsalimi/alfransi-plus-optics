"use client";

import React, { useActionState } from "react";
import { updateAdminSecurityAction } from "@/lib/actions";
import { KeyRound, User, Lock, ShieldCheck, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminSettingsForm({
  currentUser,
}: {
  currentUser: { username: string; name: string; role: string } | null;
}) {
  const [state, formAction, isPending] = useActionState(updateAdminSecurityAction, null);

  return (
    <div className="bg-[#0B2940] border border-[#087E8B]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-right" dir="rtl">
      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-2xl bg-[#F4C400]/20 border border-[#F4C400]/40 flex items-center justify-center text-[#F4C400]">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-white">تعديل بيانات الدخول والأمان</h2>
          <p className="text-xs text-slate-400">قم بتحديث اسم المستخدم أو كلمة المرور لحماية لوحة التحكم</p>
        </div>
      </div>

      {/* Action State Feedback */}
      {state?.message && (
        <div
          className={`p-4 rounded-2xl text-xs font-extrabold flex items-center gap-3 border ${
            state.success
              ? "bg-green-500/20 text-green-300 border-green-500/40"
              : "bg-red-500/20 text-red-300 border-red-500/40"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-6 text-xs">
        {/* Section 1: Account Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#16C7D9] flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>بيانات الحساب</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-2">اسم المدير / الموظف</label>
              <input
                type="text"
                name="name"
                defaultValue={currentUser?.name || ""}
                placeholder="أدخل اسم المدير..."
                className="w-full bg-[#040D16] border border-white/10 focus:border-[#16C7D9] rounded-2xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-2">اسم المستخدم (Username) الجديد</label>
              <input
                type="text"
                name="newUsername"
                defaultValue={currentUser?.username || "admin"}
                required
                className="w-full bg-[#040D16] border border-white/10 focus:border-[#16C7D9] rounded-2xl px-4 py-3 text-white outline-none font-mono text-left dir-ltr"
              />
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Section 2: Change Password */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#F4C400] flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>تغيير كلمة المرور (اختياري)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                name="newPassword"
                placeholder="أتركها فارغة إذا لا تريد التغيير..."
                className="w-full bg-[#040D16] border border-white/10 focus:border-[#16C7D9] rounded-2xl px-4 py-3 text-white outline-none dir-ltr"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-2">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="أعد كتابة كلمة المرور الجديدة..."
                className="w-full bg-[#040D16] border border-white/10 focus:border-[#16C7D9] rounded-2xl px-4 py-3 text-white outline-none dir-ltr"
              />
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Section 3: Identity Verification Required */}
        <div className="space-y-3 bg-[#040D16] p-5 rounded-2xl border border-amber-500/30">
          <label className="block text-[#F4C400] font-extrabold text-xs">
            كلمة المرور الحالية (مطلوبة لتأكيد حفظ التعديلات) *
          </label>
          <input
            type="password"
            name="currentPassword"
            required
            placeholder="أدخل كلمة المرور الحالية هنا..."
            className="w-full bg-[#071A2B] border border-white/20 focus:border-[#F4C400] rounded-xl px-4 py-3 text-white outline-none dir-ltr"
          />
          <p className="text-[11px] text-slate-400">
            لأغراض الأمان، يرجى إدخال كلمة المرور الحالية لتثبيت تغيير اسم المستخدم أو كلمة المرور.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] font-black text-xs shadow-xl transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isPending ? "جاري الحفظ..." : "حفظ وتثبيت التعديلات"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
