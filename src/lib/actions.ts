"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { setAdminSession, getAdminSession, clearAdminSession } from "./auth";
import { revalidatePath } from "next/cache";
import {
  getDetailedAppointmentWhatsAppLink,
  getOrderWhatsAppLink,
  getInquiryWhatsAppLink,
} from "./whatsapp";

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

    const appointment = await prisma.appointment.create({
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

    const whatsappUrl = getDetailedAppointmentWhatsAppLink({
      customerName: validated.customerName,
      phone: validated.phone,
      serviceNameAr: validated.serviceNameAr,
      preferredDate: validated.preferredDate,
      preferredTime: validated.preferredTime,
      notes: validated.notes || null,
    });

    revalidatePath("/admin/appointments");
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: "تم إرسال طلب الحجز وحفظه في النظام بنجاح",
      whatsappUrl,
      appointmentId: appointment.id,
      customerName: validated.customerName,
      serviceNameAr: validated.serviceNameAr,
    };
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

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        message: validated.message,
        status: "UNREAD",
      },
    });

    const whatsappUrl = getInquiryWhatsAppLink(
      validated.name,
      validated.phone,
      validated.message
    );

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: "تم إرسال استفسارك وتسجيله في لوحة التحكم بنجاح",
      whatsappUrl,
      inquiryId: inquiry.id,
    };
  } catch (error: any) {
    console.error("Inquiry error:", error);
    return { success: false, message: error?.errors?.[0]?.message || "حدث خطأ أثناء إرسال البيانات" };
  }
}

// Product Order Validation Schema
const orderSchema = z.object({
  customerName: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(6, "رقم الهاتف غير صحيح"),
  productName: z.string().min(1, "اسم المنتج مطلوب"),
  productId: z.string().optional(),
  productSku: z.string().optional(),
  price: z.coerce.number().optional(),
  quantity: z.coerce.number().min(1).default(1),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export async function createOrderAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      customerName: formData.get("customerName") as string,
      phone: formData.get("phone") as string,
      productName: formData.get("productName") as string,
      productId: (formData.get("productId") as string) || undefined,
      productSku: (formData.get("productSku") as string) || undefined,
      price: formData.get("price") ? parseFloat(formData.get("price") as string) : undefined,
      quantity: formData.get("quantity") ? parseInt(formData.get("quantity") as string, 10) : 1,
      address: (formData.get("address") as string) || "",
      notes: (formData.get("notes") as string) || "",
    };

    const validated = orderSchema.parse(rawData);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const totalAmount = validated.price ? validated.price * validated.quantity : null;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: validated.customerName,
        phone: validated.phone,
        productName: validated.productName,
        productId: validated.productId || null,
        productSku: validated.productSku || null,
        price: validated.price || null,
        quantity: validated.quantity,
        totalAmount,
        address: validated.address || null,
        notes: validated.notes || null,
        status: "PENDING",
      },
    });

    const whatsappUrl = getOrderWhatsAppLink({
      orderNumber,
      customerName: validated.customerName,
      phone: validated.phone,
      productName: validated.productName,
      productSku: validated.productSku || null,
      price: validated.price || null,
      quantity: validated.quantity,
      address: validated.address || null,
      notes: validated.notes || null,
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: "تم تسجيل طلبك بنجاح وحفظه في لوحة التحكم",
      orderNumber,
      whatsappUrl,
      orderId: order.id,
    };
  } catch (error: any) {
    console.error("Create order error:", error);
    return {
      success: false,
      message: error?.errors?.[0]?.message || "حدث خطأ أثناء تسجيل الطلب",
    };
  }
}

export async function updateOrderStatusAction(
  id: string,
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/orders");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update order status error:", error);
    return { success: false };
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
          name: "إدارة نظارات الفرنسي بلاس",
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

// Helper function to process image file upload (Base64) or fallback URL string
async function processImageFileOrUrl(imageFile: File | null, textUrl: string | null): Promise<string | null> {
  if (imageFile && imageFile.size > 0 && imageFile.name) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = imageFile.type || "image/png";
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }
  return textUrl || null;
}

// Admin Create Product Action
export async function createProductAction(prevState: any, formData: FormData) {
  try {
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const categoryId = formData.get("categoryId") as string;
    const brandId = (formData.get("brandId") as string) || null;
    const descAr = formData.get("descAr") as string;
    const descEn = (formData.get("descEn") as string) || descAr;
    const priceStr = formData.get("price") as string;
    const sku = formData.get("sku") as string;
    const stockQuantityStr = formData.get("stockQuantity") as string;
    const isAvailableStr = formData.get("isAvailable") as string | null;
    const isFeaturedStr = formData.get("isFeatured") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const textUrl = formData.get("imageUrl") as string | null;

    if (!nameAr || !categoryId || !descAr) {
      return { success: false, message: "يرجى تعبئة اسم المنتج والتصنيف والوصف" };
    }

    const imageUrl = (await processImageFileOrUrl(imageFile, textUrl)) || "/products/eyeglasses-titanium.png";

    const slug = nameAr
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-") + "-" + Date.now().toString().slice(-4);

    await prisma.product.create({
      data: {
        slug: slug || `product-${Date.now()}`,
        nameAr,
        nameEn: nameEn || nameAr,
        descAr,
        descEn,
        sku: sku && sku.trim() ? sku.trim() : null,
        price: priceStr && !isNaN(parseFloat(priceStr)) ? parseFloat(priceStr) : null,
        stockQuantity: stockQuantityStr && !isNaN(parseInt(stockQuantityStr, 10)) ? parseInt(stockQuantityStr, 10) : 10,
        categoryId,
        brandId: brandId && brandId.trim() ? brandId.trim() : null,
        isAvailable: isAvailableStr !== null ? isAvailableStr === "true" : true,
        isFeatured: isFeaturedStr === "true",
        images: {
          create: [
            {
              url: imageUrl,
              isPrimary: true,
            },
          ],
        },
      },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, message: "تمت إضافة المنتج إلى الكتالوج بنجاح وحفظه في النظام" };
  } catch (error: any) {
    console.error("Create product error:", error);
    return { success: false, message: error?.message || "حدث خطأ أثناء إضافة المنتج" };
  }
}

// Admin Update Product Action
export async function updateProductAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const categoryId = formData.get("categoryId") as string;
    const brandId = (formData.get("brandId") as string) || null;
    const descAr = formData.get("descAr") as string;
    const descEn = (formData.get("descEn") as string) || descAr;
    const priceStr = formData.get("price") as string;
    const sku = formData.get("sku") as string;
    const stockQuantityStr = formData.get("stockQuantity") as string;
    const isAvailableStr = formData.get("isAvailable") as string | null;
    const isFeaturedStr = formData.get("isFeatured") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const textUrl = formData.get("imageUrl") as string | null;

    if (!id || !nameAr || !categoryId || !descAr) {
      return { success: false, message: "يرجى تعبئة الحقول الأساسية" };
    }

    const imageUrl = await processImageFileOrUrl(imageFile, textUrl);

    const updateData: any = {
      nameAr,
      nameEn: nameEn || nameAr,
      categoryId,
      brandId: brandId && brandId.trim() ? brandId.trim() : null,
      descAr,
      descEn,
      sku: sku && sku.trim() ? sku.trim() : null,
      price: priceStr && !isNaN(parseFloat(priceStr)) ? parseFloat(priceStr) : null,
      stockQuantity: stockQuantityStr && !isNaN(parseInt(stockQuantityStr, 10)) ? parseInt(stockQuantityStr, 10) : 10,
    };

    if (isAvailableStr !== null) {
      updateData.isAvailable = isAvailableStr === "true";
    }
    if (isFeaturedStr !== null) {
      updateData.isFeatured = isFeaturedStr === "true";
    }

    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    if (imageUrl) {
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: id, isPrimary: true },
      });

      if (existingImage) {
        await prisma.productImage.update({
          where: { id: existingImage.id },
          data: { url: imageUrl },
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: id,
            url: imageUrl,
            isPrimary: true,
          },
        });
      }
    }

    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, message: "تم تحديث بيانات وتعديلات المنتج بنجاح" };
  } catch (error: any) {
    console.error("Update product error:", error);
    return { success: false, message: error?.message || "حدث خطأ أثناء التحديث" };
  }
}

// Admin Create Brand Action
export async function createBrandAction(prevState: any, formData: FormData) {
  try {
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const isActiveStr = formData.get("isActive") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const textUrl = formData.get("logoUrl") as string | null;

    if (!nameAr) {
      return { success: false, message: "اسم الماركة بالعربية مطلوب" };
    }

    const logoUrl = (await processImageFileOrUrl(imageFile, textUrl)) || "/brand/logo-mark.png";
    const slug = nameAr
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-") + "-" + Date.now().toString().slice(-4);

    await prisma.brand.create({
      data: {
        slug: slug || `brand-${Date.now()}`,
        nameAr,
        nameEn: nameEn || nameAr,
        logoUrl,
        descriptionAr,
        descriptionEn,
        isActive: isActiveStr !== "false",
      },
    });

    revalidatePath("/brands");
    revalidatePath("/admin/brands");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, message: "تمت إضافة الماركة بنجاح" };
  } catch (error: any) {
    console.error("Create brand error:", error);
    return { success: false, message: error?.message || "حدث خطأ أثناء إضافة الماركة" };
  }
}

// Admin Update Brand Action
export async function updateBrandAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const descriptionAr = formData.get("descriptionAr") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const isActiveStr = formData.get("isActive") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const textUrl = formData.get("logoUrl") as string | null;

    if (!id || !nameAr) {
      return { success: false, message: "بيانات الماركة غير مكتملة" };
    }

    const logoUrl = await processImageFileOrUrl(imageFile, textUrl);

    const updateData: any = {
      nameAr,
      nameEn: nameEn || nameAr,
      descriptionAr,
      descriptionEn,
    };
    if (logoUrl) updateData.logoUrl = logoUrl;
    if (isActiveStr !== null) {
      updateData.isActive = isActiveStr === "true" || isActiveStr === "on";
    }

    await prisma.brand.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/brands");
    revalidatePath("/admin/brands");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true, message: "تم تحديث بيانات الماركة بنجاح" };
  } catch (error: any) {
    console.error("Update brand error:", error);
    return { success: false, message: error?.message || "حدث خطأ أثناء تحديث الماركة" };
  }
}

// Admin Delete Brand Action
export async function deleteBrandAction(id: string) {
  try {
    await prisma.brand.delete({
      where: { id },
    });
    revalidatePath("/brands");
    revalidatePath("/admin/brands");
    revalidatePath("/admin/products");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Admin Update Account Username & Password Action
export async function updateAdminSecurityAction(prevState: any, formData: FormData) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, message: "جلسة العمل منتهية، يرجى إعادة تسجيل الدخول" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newUsername = formData.get("newUsername") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;

    if (!currentPassword) {
      return { success: false, message: "يرجى إدخال كلمة المرور الحالية لتأكيد الهوية" };
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: session.userId },
          { username: session.username }
        ]
      }
    });

    if (!user) {
      return { success: false, message: "لم يتم العثور على حساب المستخدم" };
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      return { success: false, message: "كلمة المرور الحالية غير صحيحة" };
    }

    if (newUsername && newUsername.trim() !== user.username) {
      const duplicate = await prisma.user.findUnique({
        where: { username: newUsername.trim() }
      });
      if (duplicate && duplicate.id !== user.id) {
        return { success: false, message: "اسم المستخدم الجديد مستخدم بالفعل بحساب آخر" };
      }
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return { success: false, message: "يجب أن لا تقل كلمة المرور الجديدة عن 6 خانات" };
      }
      if (newPassword !== confirmPassword) {
        return { success: false, message: "كلمتا المرور الجديدة والتأكيد غير متطابقتين" };
      }
    }

    const updatedData: any = {};
    if (name && name.trim()) updatedData.name = name.trim();
    if (newUsername && newUsername.trim()) updatedData.username = newUsername.trim();
    if (newPassword) {
      updatedData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updatedData,
    });

    // Update active JWT session with new username and id
    await setAdminSession({
      userId: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/settings");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "تم تحديث بيانات حساب الأدمن وكلمة المرور بنجاح!" };
  } catch (error: any) {
    console.error("Update admin security error:", error);
    return { success: false, message: error?.message || "حدث خطأ أثناء تحديث بيانات الحساب" };
  }
}
