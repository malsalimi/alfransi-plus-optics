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
    ? "السلام عليكم، أريد الاستفسار عن خدمات ومعروضات مركز نظارات الفرنسي بلس."
    : "Hello, I would like to inquire about Al-Fransi Plus Optics & Audiology services.";
  
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
    message = `السلام عليكم، أريد الاستفسار عن هذا المنتج من نظارات الفرنسي بلس:\n- اسم المنتج: ${productName}`;
    if (sku) message += `\n- رمز المنتج (SKU): ${sku}`;
  } else {
    message = `Hello, I would like to inquire about this product from Al-Fransi Plus Optics:\n- Product Name: ${productName}`;
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
    message = `السلام عليكم، أود حجز موعد لفحص/خدمة (${serviceName}) في مركز نظارات الفرنسي بلس.`;
    if (customerName) message += `\n- الاسم: ${customerName}`;
  } else {
    message = `Hello, I would like to book an appointment for (${serviceName}) at Al-Fransi Plus Optics.`;
    if (customerName) message += `\n- Name: ${customerName}`;
  }

  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}
