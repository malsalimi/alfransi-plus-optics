/**
 * Centralized WhatsApp Link & Message Builder
 * For Al-Fransi Plus Optics & Audiology
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "773945678";

export function formatWhatsAppNumber(phone: string): string {
  // Strip non-digits
  const digits = phone.replace(/\D/g, "");
  // If starts with 967, keep it, else prefix 967 (Yemen code)
  if (digits.startsWith("967")) return digits;
  if (digits.startsWith("0")) return "967" + digits.slice(1);
  return "967" + digits;
}

export function getGeneralWhatsAppLink(isArabic: boolean = true): string {
  const message = isArabic
    ? "السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلاس للاستفسار عن الخدمات والمعروضات."
    : "Hello, I am contacting you via the official Al-Fransi Plus Optics website to inquire about your services and products.";
  
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppLink(
  productName: string,
  sku?: string | null,
  isArabic: boolean = true
): string {
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  let message = "";

  if (isArabic) {
    message = `السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلاس للاستفسار عن هذا المنتج:\n- اسم المنتج: ${productName}`;
    if (sku) message += `\n- رمز المنتج (SKU): ${sku}`;
  } else {
    message = `Hello, I am contacting you via the official Al-Fransi Plus Optics website regarding this product:\n- Product Name: ${productName}`;
    if (sku) message += `\n- SKU Code: ${sku}`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export function getAppointmentWhatsAppLink(
  serviceName: string,
  customerName?: string,
  isArabic: boolean = true
): string {
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  let message = "";

  if (isArabic) {
    message = `السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلاس لحجز موعد لخدمة (${serviceName}).`;
    if (customerName) message += `\n- الاسم: ${customerName}`;
  } else {
    message = `Hello, I am contacting you via the official Al-Fransi Plus Optics website to book an appointment for (${serviceName}).`;
    if (customerName) message += `\n- Name: ${customerName}`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export interface DetailedAppointmentData {
  customerName: string;
  phone: string;
  serviceNameAr: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string | null;
}

export function getDetailedAppointmentWhatsAppLink(
  data: DetailedAppointmentData,
  isArabic: boolean = true
): string {
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  let message = "";

  if (isArabic) {
    message = `*طلب حجز موعد جديد - نظارات الفرنسي بلاس*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *الاسم:* ${data.customerName}\n`;
    message += `📱 *رقم الهاتف:* ${data.phone}\n`;
    message += `🩺 *الخدمة المطلوبة:* ${data.serviceNameAr}\n`;
    message += `📅 *التاريخ المفضل:* ${data.preferredDate}\n`;
    message += `⏰ *الوقت المفضل:* ${data.preferredTime}\n`;
    if (data.notes && data.notes.trim()) {
      message += `📝 *ملاحظات العميل:* ${data.notes.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 (تم تقديم هذا الحجز عبر الموقع الإلكتروني)`;
  } else {
    message = `*New Appointment Request - Al-Fransi Plus Optics*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Name:* ${data.customerName}\n`;
    message += `📱 *Phone:* ${data.phone}\n`;
    message += `🩺 *Service:* ${data.serviceNameAr}\n`;
    message += `📅 *Preferred Date:* ${data.preferredDate}\n`;
    message += `⏰ *Preferred Time:* ${data.preferredTime}\n`;
    if (data.notes && data.notes.trim()) {
      message += `📝 *Notes:* ${data.notes.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 (Submitted via official website)`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  address?: string | null;
  productName: string;
  productSku?: string | null;
  price?: number | null;
  quantity?: number;
  notes?: string | null;
}

export function getOrderWhatsAppLink(data: OrderData, isArabic: boolean = true): string {
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  let message = "";

  if (isArabic) {
    message = `*طلب شراء وحجز منتج - نظارات الفرنسي بلاس*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🔖 *رقم الطلب:* #${data.orderNumber}\n`;
    message += `👓 *المنتج:* ${data.productName}\n`;
    if (data.productSku) message += `🏷️ *رمز المنتج (SKU):* ${data.productSku}\n`;
    if (data.price) {
      const qty = data.quantity || 1;
      const total = data.price * qty;
      message += `💰 *السعر:* ${data.price} ريال × ${qty} = ${total} ريال\n`;
    }
    message += `👤 *اسم العميل:* ${data.customerName}\n`;
    message += `📱 *رقم الهاتف:* ${data.phone}\n`;
    if (data.address && data.address.trim()) {
      message += `📍 *العنوان / المدينة:* ${data.address.trim()}\n`;
    }
    if (data.notes && data.notes.trim()) {
      message += `📝 *ملاحظات إضافية:* ${data.notes.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🚀 (تم إرسال هذا الطلب عبر المتجر الإلكتروني)`;
  } else {
    message = `*New Product Order - Al-Fransi Plus Optics*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🔖 *Order No:* #${data.orderNumber}\n`;
    message += `👓 *Product:* ${data.productName}\n`;
    if (data.productSku) message += `🏷️ *SKU:* ${data.productSku}\n`;
    if (data.price) {
      const qty = data.quantity || 1;
      message += `💰 *Price:* ${data.price} YER × ${qty}\n`;
    }
    message += `👤 *Customer Name:* ${data.customerName}\n`;
    message += `📱 *Phone:* ${data.phone}\n`;
    if (data.address && data.address.trim()) {
      message += `📍 *Address:* ${data.address.trim()}\n`;
    }
    if (data.notes && data.notes.trim()) {
      message += `📝 *Notes:* ${data.notes.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🚀 (Submitted via Online Catalog)`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export function getInquiryWhatsAppLink(
  name: string,
  phone: string,
  messageText: string,
  isArabic: boolean = true
): string {
  const formattedNumber = formatWhatsAppNumber(WHATSAPP_NUMBER);
  let message = "";

  if (isArabic) {
    message = `*استفسار جديد عبر الموقع - نظارات الفرنسي بلاس*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *الاسم:* ${name}\n`;
    message += `📱 *رقم الهاتف:* ${phone}\n`;
    message += `💬 *نص الاستفسار:*\n"${messageText}"\n`;
    message += `━━━━━━━━━━━━━━━━━━━━`;
  } else {
    message = `*New Inquiry via Website - Al-Fransi Plus Optics*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `💬 *Message:*\n"${messageText}"\n`;
    message += `━━━━━━━━━━━━━━━━━━━━`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}
