import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Al-Fransi Plus Optics & Audiology...");

  // Seed Admin User
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      name: "مدير المحل (Admin)",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // Seed Categories
  const catEyeglasses = await prisma.category.upsert({
    where: { slug: "eyeglasses" },
    update: {},
    create: {
      slug: "eyeglasses",
      nameAr: "نظارات طبية",
      nameEn: "Prescription Eyeglasses",
      descriptionAr: "إطارات طبية عصرية ومريحة بأحدث التصاميم مع حماية متكاملة للعين.",
      descriptionEn: "Stylish and lightweight prescription frames engineered for optimal comfort.",
      icon: "Glasses",
    },
  });

  const catSunglasses = await prisma.category.upsert({
    where: { slug: "sunglasses" },
    update: {},
    create: {
      slug: "sunglasses",
      nameAr: "نظارات شمسية",
      nameEn: "Sunglasses",
      descriptionAr: "نظارات شمسية أصلية بحماية 100% من الأشعة فوق البنفسجية UV400.",
      descriptionEn: "Authentic premium sunglasses featuring 100% UV400 protection.",
      icon: "Sun",
    },
  });

  const catLenses = await prisma.category.upsert({
    where: { slug: "contact-lenses" },
    update: {},
    create: {
      slug: "contact-lenses",
      nameAr: "عدسات لاصقة",
      nameEn: "Contact Lenses",
      descriptionAr: "عدسات لاصقة طبية وتجميلية ملونة ذات نفاذية عالية للأكسجين.",
      descriptionEn: "Medical prescription & aesthetic color contact lenses with high oxygen permeability.",
      icon: "Eye",
    },
  });

  const catAudiology = await prisma.category.upsert({
    where: { slug: "audiology-aids" },
    update: {},
    create: {
      slug: "audiology-aids",
      nameAr: "سماعات وحلول سمعية",
      nameEn: "Hearing Aids & Audiology",
      descriptionAr: "سماعات طبية غير مرئية وتقنيات سمعية رقمية متطورة لجميع مستويات ضعف السمع.",
      descriptionEn: "Discreet hearing aids and digital audiology solutions for all hearing loss levels.",
      icon: "Volume2",
    },
  });

  const catAccessories = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: {
      slug: "accessories",
      nameAr: "إكسسوارات ومحاليل",
      nameEn: "Accessories & Solutions",
      descriptionAr: "محاليل تنظيف العدسات، حافظات فاخرة، وسلاسل نظارات راقية.",
      descriptionEn: "Lens care solutions, designer cases, and eyewear accessories.",
      icon: "Package",
    },
  });

  // Seed Brands
  const brandRayBan = await prisma.brand.upsert({
    where: { slug: "ray-ban" },
    update: {},
    create: {
      slug: "ray-ban",
      nameAr: "ريبان (Ray-Ban)",
      nameEn: "Ray-Ban",
      descriptionAr: "العلامة الرائدة عالمياً في النظارات الشمسية والطبية الإيطالية.",
      descriptionEn: "World famous iconic Italian eyewear brand.",
    },
  });

  const brandOakley = await prisma.brand.upsert({
    where: { slug: "oakley" },
    update: {},
    create: {
      slug: "oakley",
      nameAr: "أوكلي (Oakley)",
      nameEn: "Oakley",
      descriptionAr: "نظارات رياضية وبصرية عالية التكنولوجيا ومقاومة للصدمات.",
      descriptionEn: "High-performance sports and optical frames.",
    },
  });

  const brandZeiss = await prisma.brand.upsert({
    where: { slug: "zeiss" },
    update: {},
    create: {
      slug: "zeiss",
      nameAr: "زايس (ZEISS)",
      nameEn: "ZEISS",
      descriptionAr: "الرواد الألمان في صناعة العدسات البصرية الأكثر دقة ونقاءً.",
      descriptionEn: "German precision optics and anti-reflective lens coatings.",
    },
  });

  const brandPhonak = await prisma.brand.upsert({
    where: { slug: "phonak" },
    update: {},
    create: {
      slug: "phonak",
      nameAr: "فوناك (Phonak)",
      nameEn: "Phonak Audiology",
      descriptionAr: "التقنية السويسرية الأولى في الأجهزة والسماعات الطبية للسمع.",
      descriptionEn: "Swiss leader in medical hearing instruments and audiology.",
    },
  });

  // Seed Services
  await prisma.service.upsert({
    where: { slug: "eye-exam" },
    update: {},
    create: {
      slug: "eye-exam",
      nameAr: "فحص النظر الكمبيوتري الشامل",
      nameEn: "Comprehensive Computerized Eye Exam",
      descAr: "فحص النظر وتحديد حدة الابصار وقوة العدسات المطلوبة بأحدث أجهزة الكمبيوتر الدقيقة وتحت إشراف كادر متخصص.",
      descEn: "Advanced digital autorefraction and visual acuity assessment using precision optical equipment.",
      type: "OPTICAL",
      featuresAr: JSON.stringify(["فحص الكمبيوتر الدقيق", "قياس انكسار الضوء ورؤية الألوان", "استشارة فحص فورية", "تحديد انحراف القرنية"]),
      featuresEn: JSON.stringify(["Automated Computer Refraction", "Astigmatism & Color Vision Test", "Instant Consultation", "Precision Diopter Measurement"]),
      icon: "Eye",
    },
  });

  await prisma.service.upsert({
    where: { slug: "custom-lenses" },
    update: {},
    create: {
      slug: "custom-lenses",
      nameAr: "تفصيل وتجهيز العدسات الطبية",
      nameEn: "Custom Prescription Lens Fitting",
      descAr: "قص وتجهيز العدسات الطبية المضادة للخدش والمقاومة للإشعاعات والضوء الأزرق بأعلى معايير الجودة.",
      descEn: "High-index lens custom edging, anti-scratch coating, Blue-Cut protection, and photochromic lenses.",
      type: "OPTICAL",
      featuresAr: JSON.stringify(["عدسات خفيفة ومضادة للكسر", "طلاء حماية من الشاشات Blue-Cut", "عدسات مظللة تدريجياً Photogray", "ضمان الدقة والراحة"]),
      featuresEn: JSON.stringify(["High Index Lightweight Lens", "Blue-Light Screen Filter", "Photochromic Transition", "Comfort Guarantee"]),
      icon: "Sparkles",
    },
  });

  await prisma.service.upsert({
    where: { slug: "hearing-assessment" },
    update: {},
    create: {
      slug: "hearing-assessment",
      nameAr: "تقييم السمع واختبار السماعات",
      nameEn: "Audiology Hearing Assessment & Tuning",
      descAr: "قياس درجات ضعف السمع واختبار استجابة الأذن وتجربة أفضل السماعات الطبية المناسبة لكل حالة.",
      descEn: "Pure tone audiometry, hearing loss diagnostic test, and medical hearing aid programming.",
      type: "AUDIOLOGY",
      featuresAr: JSON.stringify(["قياس عتبة السمع بالكمبيوتر", "تجربة سماعات طبية غير مرئية", "برمجة رقمية مخصصة", "صيانة وضبط السماعات"]),
      featuresEn: JSON.stringify(["Computer Audiometry", "In-the-Canal Hearing Aid Test", "Digital Audio Programming", "Maintenance & Calibration"]),
      icon: "Volume2",
    },
  });

  // Seed Sample Products
  await prisma.product.upsert({
    where: { slug: "al-fransi-titanium-optics-01" },
    update: {},
    create: {
      slug: "al-fransi-titanium-optics-01",
      nameAr: "نظارة الفرنسي تيتانيوم الترا فليكس",
      nameEn: "Al-Fransi Ultra-Flex Titanium Frame",
      descAr: "إطار نظارة طبية فاخر مصنوع من التيتانيوم الخفيف والمقاوم للكسر والمرونة العالية. مريحة جداً للاستخدام اليومي المستمر.",
      descEn: "Premium ultra-lightweight titanium prescription optical frame. Flexible, hypoallergenic, and built for all-day comfort.",
      sku: "AFP-OPT-101",
      price: 120,
      stockQuantity: 15,
      isAvailable: true,
      isFeatured: true,
      categoryId: catEyeglasses.id,
      brandId: brandRayBan.id,
      specsAr: JSON.stringify({ "المادة": "تيتانيوم فليكس", "الوزن": "12 جرام", "الشكل": "مستطيل مدرن", "الجنس": "رجالي / نسائي" }),
      specsEn: JSON.stringify({ "Material": "Flex Titanium", "Weight": "12g", "Shape": "Modern Rectangle", "Gender": "Unisex" }),
      images: {
        create: [
          {
            url: "/brand/logo-primary.png",
            altAr: "نظارة الفرنسي تيتانيوم الترا فليكس",
            altEn: "Al-Fransi Ultra-Flex Titanium Frame",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "rayban-wayfarer-classic-gold" },
    update: {},
    create: {
      slug: "rayban-wayfarer-classic-gold",
      nameAr: "نظارة ريبان شمسية كلاسيك - إطار ذهبي",
      nameEn: "Ray-Ban Classic Aviator Gold Lens",
      descAr: "نظارة شمسية أصلية بمظهر كلاسيكي جذاب وعدسات مستقطبة Polarized توفر رؤية حادة بدون انعكاسات.",
      descEn: "Authentic Ray-Ban polarized sunglasses featuring a classic gold metallic frame and crystal UV400 lenses.",
      sku: "AFP-SUN-202",
      price: 160,
      stockQuantity: 8,
      isAvailable: true,
      isFeatured: true,
      categoryId: catSunglasses.id,
      brandId: brandRayBan.id,
      specsAr: JSON.stringify({ "العدسة": "Polarized UV400", "الإطار": "معدن ذهبي خارق", "بلد الصنع": "إيطاليا" }),
      specsEn: JSON.stringify({ "Lens": "Polarized UV400", "Frame": "Gold Metal", "Made In": "Italy" }),
      images: {
        create: [
          {
            url: "/brand/logo-primary.png",
            altAr: "نظارة ريبان شمسية كلاسيك",
            altEn: "Ray-Ban Classic Aviator Gold Lens",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "phonak-audeo-lumity-digital" },
    update: {},
    create: {
      slug: "phonak-audeo-lumity-digital",
      nameAr: "سماعة فوناك الطبية الرقمية المخفية (Phonak Audéo)",
      nameEn: "Phonak Audéo Lumity Digital Hearing Aid",
      descAr: "سماعة طبية متطورة للغاية تقترن بالبلوتوث مع الهواتف، غير مرئية داخل الأذن، مزودة بمعالج ذكاء اصطناعي لتصفية الضوضاء وضمان نقاء الصوت.",
      descEn: "State-of-the-art digital medical hearing aid with Bluetooth connectivity and AI noise cancellation.",
      sku: "AFP-AUD-303",
      price: 450,
      stockQuantity: 5,
      isAvailable: true,
      isFeatured: true,
      categoryId: catAudiology.id,
      brandId: brandPhonak.id,
      specsAr: JSON.stringify({ "التقنية": "بلوتوث + ذكاء اصطناعي", "البطارية": "قابلة للشحن", "النوع": "مخفية خلف الأذن RIC" }),
      specsEn: JSON.stringify({ "Technology": "Bluetooth + AI Processing", "Battery": "Rechargeable Li-Ion", "Type": "Receiver-in-Canal (RIC)" }),
      images: {
        create: [
          {
            url: "/brand/logo-primary.png",
            altAr: "سماعة فوناك الطبية الرقمية المخفية",
            altEn: "Phonak Audéo Lumity Digital Hearing Aid",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "zeiss-blueguard-optical-lenses" },
    update: {},
    create: {
      slug: "zeiss-blueguard-optical-lenses",
      nameAr: "عدسات زايس الطبية المانعة للضوء الأزرق (ZEISS BlueGuard)",
      nameEn: "ZEISS BlueGuard Prescription Lenses",
      descAr: "عدسات طبية ألمانية فائقة النقاء تحمي العين من إجهاد الشاشات والهواتف، وتوفر رؤية واضحة جداً بدون انعكاسات مزعجة.",
      descEn: "German engineered optical lenses protecting against blue light strain with hydrophobic anti-reflective coating.",
      sku: "AFP-LEN-404",
      price: 85,
      stockQuantity: 25,
      isAvailable: true,
      isFeatured: false,
      categoryId: catLenses.id,
      brandId: brandZeiss.id,
      specsAr: JSON.stringify({ "الطلاء": "BlueGuard + Duravision Chrome", "الحماية": "100% UV & Blue Light", "بلد المنشأ": "ألمانيا" }),
      specsEn: JSON.stringify({ "Coating": "BlueGuard + Duravision", "Protection": "100% UV & Blue Light", "Origin": "Germany" }),
      images: {
        create: [
          {
            url: "/brand/logo-primary.png",
            altAr: "عدسات زايس الطبية المانعة للضوء الأزرق",
            altEn: "ZEISS BlueGuard Prescription Lenses",
            isPrimary: true,
          },
        ],
      },
    },
  });

  // Seed Business Settings
  const defaultSettings = [
    { key: "phone_primary", valueAr: "773945678", valueEn: "773945678", category: "CONTACT" },
    { key: "phone_secondary", valueAr: "777266692", valueEn: "777266692", category: "CONTACT" },
    { key: "whatsapp_number", valueAr: "773945678", valueEn: "773945678", category: "CONTACT" },
    { key: "address", valueAr: "صنعاء - منطقة سعوان - الخط العام أمام المستشفى", valueEn: "Sana'a - Sa'awan Area - Main Street opposite the Hospital", category: "LOCATION" },
    { key: "working_hours_weekdays", valueAr: "السبت - الخميس: 9:00 صباحاً - 9:30 مساءً", valueEn: "Sat - Thu: 9:00 AM - 9:30 PM", category: "HOURS" },
    { key: "working_hours_friday", valueAr: "الجمعة: 4:00 عصراً - 9:30 مساءً", valueEn: "Fri: 4:00 PM - 9:30 PM", category: "HOURS" },
    { key: "slogan", valueAr: "أناقة وإبداع .. رؤية بلا صداع", valueEn: "Elegance & Creativity .. Vision without Headache", category: "BRAND" },
  ];

  for (const setting of defaultSettings) {
    await prisma.businessSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
