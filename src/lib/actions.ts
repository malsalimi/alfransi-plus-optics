"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { setAdminSession, clearAdminSession } from "./auth";
import { revalidatePath } from "next/cache";

// Appointment Validation Schema
const appointmentSchema = z.object({
  customerName: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(6, "رقم الهاتف غير صحيح"),
  serviceNameAr: z.string().min(2, "يرجى اختيار الخدمة"),
  serviceNameEn: z.string().min(2, "Select a service"),
  preferredDate: z.string().min(1, "يرجى تحديد التاريخ"),
  preferredTime: z.string().min(1, "يرجى تحديد الوقت"),
  notes: z.string().optional(),
});

export async function createAppointmentAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      customerName: formData.get("customerName") as string,
      phone: formData.get("phone") as string,
      serviceNameAr: formData.get("serviceNameAr") as string,
      serviceNameEn: (formData.get("serviceNameEn") as string) || (formData.get("serviceNameAr") as string),
      preferredDate: formData.get("preferredDate") as string,
      preferredTime: formData.get("preferredTime") as string,
      notes: (formData.get("notes") as string) || "",
    };

    const validated = appointmentSchema.parse(rawData);

    await prisma.appointment.create({
      data: {
        customerName: validated.customerName,
        phone: validated.phone,
        serviceNameAr: validated.serviceNameAr,
        serviceNameEn: validated.serviceNameEn,
        preferredDate: validated.preferredDate,
        preferredTime: validated.preferredTime,
        notes: validated.notes || null,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/appointments");
    return { success: true, message: "تم إرسال طلب الحجز بنجاح" };
  } catch (error: any) {
    console.error("Appointment error:", error);
    return { success: false, message: error?.errors?.[0]?.message || "حدث خطأ أثناء إرسال البيانات" };
  }
}

// Contact Inquiry Validation Schema
const inquirySchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(6, "رقم الهاتف غير صحيح"),
  message: z.string().min(5, "يرجى كتابة نص استفسارك"),
});

export async function createInquiryAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const validated = inquirySchema.parse(rawData);

    await prisma.contactInquiry.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        message: validated.message,
        status: "UNREAD",
      },
    });

    revalidatePath("/admin/inquiries");
    return { success: true, message: "تم إرسال استفسارك بنجاح" };
  } catch (error: any) {
    console.error("Inquiry error:", error);
    return { success: false, message: error?.errors?.[0]?.message || "حدث خطأ أثناء إرسال البيانات" };
  }
}

// Admin Login Action
export async function loginAdminAction(prevState: any, formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, message: "يرجى إدخال اسم المستخدم وكلمة المرور" };
    }

    let user = await prisma.user.findUnique({
      where: { username },
    });

    // Auto-create default admin account on demand if DB was fresh
    if (!user && username === "admin" && password === "admin123") {
      const passwordHash = await bcrypt.hash("admin123", 10);
      user = await prisma.user.create({
        data: {
          username: "admin",
          name: "إدارة نظارات الفرنسي بلس",
          passwordHash,
          role: "ADMIN",
        },
      });
    }

    if (!user) {
      return { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" };
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" };
    }

    await setAdminSession({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return { success: true, message: "تم الدخول بنجاح" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "فشل الدخول إلى النظام" };
  }
}

// Logout Action
export async function logoutAdminAction() {
  await clearAdminSession();
  revalidatePath("/admin");
}

// Admin Appointment Status Update Action
export async function updateAppointmentStatusAction(id: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/appointments");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Admin Delete Product Action
export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
