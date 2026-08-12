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
    ? "السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلس للاستفسار عن الخدمات والمعروضات."
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
    message = `السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلس للاستفسار عن هذا المنتج:\n- اسم المنتج: ${productName}`;
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
    message = `السلام عليكم، أتواصل معكم عبر الموقع الإلكتروني لـ مركز نظارات الفرنسي بلس لحجز موعد لخدمة (${serviceName}).`;
    if (customerName) message += `\n- الاسم: ${customerName}`;
  } else {
    message = `Hello, I am contacting you via the official Al-Fransi Plus Optics website to book an appointment for (${serviceName}).`;
    if (customerName) message += `\n- Name: ${customerName}`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}
