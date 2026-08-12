"use client";

import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/lib/actions";
import { ShieldCheck, User, Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/dashboard");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-[#071A2B] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0B2940] rounded-3xl p-8 border border-[#087E8B]/40 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-2xl bg-white/5 p-2 border border-[#087E8B]/40">
            <Image
              src="/brand/logo-mark.png"
              alt="Al-Fransi Plus Admin"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <h1 className="text-xl font-black text-white">لوحة تحكم إدارة نظارات الفرنسي بلس</h1>
          <p className="text-xs text-slate-300">تسجيل الدخول للموظفين المصرّح لهم</p>
        </div>

        <form action={formAction} className="space-y-4 text-xs">
          {state?.message && !state.success && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-xl border border-red-500/40 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#16C7D9]" />
              <span>اسم المستخدم</span>
            </label>
            <input
              type="text"
              name="username"
              required
              defaultValue="admin"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 focus:border-[#16C7D9] outline-none text-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#16C7D9]" />
              <span>كلمة المرور</span>
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 focus:border-[#16C7D9] outline-none text-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] py-3.5 rounded-xl font-extrabold text-sm shadow-lg transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isPending ? "جاري التحقق..." : "تسجيل الدخول"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
