"use client";

import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/lib/actions";
import { ShieldCheck, User, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/dashboard");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-[#071A2B] text-white flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md bg-[#0B2940] rounded-3xl p-8 border border-[#087E8B]/50 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#087E8B] via-[#F4C400] to-[#16C7D9]"></div>

        <div className="text-center space-y-3 pt-2">
          <div className="relative h-14 w-auto mx-auto my-2 flex items-center justify-center">
            <Image
              src="/brand/logo-header.png"
              alt="نظارات الفرنسي بلس"
              width={220}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-lg font-extrabold text-white">لوحة تحكم إدارة نظارات الفرنسي بلس</h1>
          <p className="text-xs text-slate-300">تسجيل الدخول للموظفين والإدارة المصرّح لهم</p>
        </div>

        <form action={formAction} className="space-y-4 text-xs">
          {state?.message && !state.success && (
            <div className="bg-red-500/20 text-red-300 p-3.5 rounded-xl border border-red-500/40 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span className="font-bold">{state.message}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#16C7D9]" />
              <span>اسم المستخدم</span>
            </label>
            <input
              type="text"
              name="username"
              required
              defaultValue="admin"
              placeholder="اسم المستخدم..."
              className="w-full px-4 py-3 rounded-xl bg-[#040D16] border border-white/10 focus:border-[#16C7D9] outline-none text-white transition-all text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-200 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#16C7D9]" />
              <span>كلمة المرور</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-[#040D16] border border-white/10 focus:border-[#16C7D9] outline-none text-white transition-all text-xs pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F4C400] hover:bg-[#d99a00] text-[#071A2B] py-3.5 rounded-xl font-extrabold text-xs shadow-xl transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isPending ? "جاري التحقق والدخول..." : "تسجيل الدخول للنظام"}</span>
          </button>
        </form>

        <div className="pt-2 text-center border-t border-white/10 text-[11px] text-slate-400">
          <span>نظام الإدارة الداخلي • مركز نظارات الفرنسي بلس</span>
        </div>
      </div>
    </div>
  );
}
