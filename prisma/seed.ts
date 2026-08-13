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

  const catProtection = await prisma.category.upsert({
    where: { slug: "protection-glasses" },
    update: {},
    create: {
      slug: "protection-glasses",
      nameAr: "نظارات حماية (بلوكت)",
      nameEn: "Blue Light Screen Protection",
      descriptionAr: "نظارات حماية مخصصة للشاشات والكمبيوتر تمنع إجهاد العين والأشعة الزرقاء الضارة.",
      descriptionEn: "Blue-cut computer and gaming glasses preventing digital eye strain.",
      icon: "Shield",
    },
  });

  const catFashion = await prisma.category.upsert({
    where: { slug: "fashion-glasses" },
    update: {},
    create: {
      slug: "fashion-glasses",
      nameAr: "نظارات كشخة واستعراض",
      nameEn: "Fashion & Lifestyle Glasses",
      descriptionAr: "نظارات عصرية وكاجوال مخصصة للكشخة والأناقة اليومية بأحدث صيحات الموضة.",
      descriptionEn: "Stylish lifestyle and trend-setting fashion eyewear.",
      icon: "Sparkles",
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

  // Seed Brands with Authentic Photography
  const brandRayBan = await prisma.brand.upsert({
    where: { slug: "ray-ban" },
    update: { logoUrl: "/brands/rayban-logo.png" },
    create: {
      slug: "ray-ban",
      nameAr: "ريبان (Ray-Ban)",
      nameEn: "Ray-Ban",
      logoUrl: "/brands/rayban-logo.png",
      descriptionAr: "العلامة الرائدة عالمياً في النظارات الشمسية والطبية الإيطالية.",
      descriptionEn: "World famous iconic Italian eyewear brand.",
    },
  });

  const brandOakley = await prisma.brand.upsert({
    where: { slug: "oakley" },
    update: { logoUrl: "/brands/oakley-logo.png" },
    create: {
      slug: "oakley",
      nameAr: "أوكلي (Oakley)",
      nameEn: "Oakley",
      logoUrl: "/brands/oakley-logo.png",
      descriptionAr: "نظارات رياضية وبصرية عالية التكنولوجيا ومقاومة للصدمات.",
      descriptionEn: "High-performance sports and optical frames.",
    },
  });

  const brandZeiss = await prisma.brand.upsert({
    where: { slug: "zeiss" },
    update: { logoUrl: "/brands/zeiss-logo.png" },
    create: {
      slug: "zeiss",
      nameAr: "زايس (ZEISS)",
      nameEn: "ZEISS",
      logoUrl: "/brands/zeiss-logo.png",
      descriptionAr: "الرواد الألمان في صناعة العدسات البصرية الأكثر دقة ونقاءً.",
      descriptionEn: "German precision optics and anti-reflective lens coatings.",
    },
  });

  const brandPhonak = await prisma.brand.upsert({
    where: { slug: "phonak" },
    update: { logoUrl: "/brands/phonak-logo.png" },
    create: {
      slug: "phonak",
      nameAr: "فوناك (Phonak)",
      nameEn: "Phonak Audiology",
      logoUrl: "/brands/phonak-logo.png",
      descriptionAr: "التقنية السويسرية الأولى في الأجهزة والسماعات الطبية للسمع.",
      descriptionEn: "Swiss leader in medical hearing instruments and audiology.",
    },
  });

  // Clean up old product slugs if existing
  await prisma.product.deleteMany({
    where: {
      slug: {
        in: ["bluecut-[#087E8B]-protection-frame"],
      },
    },
  });

  // Seed Products with Real Photography
  await prisma.product.upsert({
    where: { slug: "al-fransi-titanium-optics-01" },
    update: {
      images: {
        deleteMany: {},
        create: [
          {
            url: "/products/eyeglasses-titanium.png",
            altAr: "نظارة الفرنسي تيتانيوم الترا فليكس الطبية",
            isPrimary: true,
          },
        ],
      },
    },
    create: {
      slug: "al-fransi-titanium-optics-01",
      nameAr: "نظارة الفرنسي تيتانيوم الترا فليكس الطبية",
      nameEn: "Al-Fransi Ultra-Flex Titanium Optical Frame",
      descAr: "إطار نظارة طبية فاخر مصنوع من التيتانيوم الخفيف والمقاوم للكسر والمرونة العالية. مريحة جداً للاستخدام اليومي المستمر.",
      descEn: "Premium ultra-lightweight titanium prescription optical frame. Flexible, hypoallergenic, and built for all-day comfort.",
      sku: "AFP-OPT-101",
      price: 120,
      stockQuantity: 15,
      isAvailable: true,
      isFeatured: true,
      categoryId: catEyeglasses.id,
      brandId: brandRayBan.id,
      specsAr: JSON.stringify({ "النوع": "طبية", "المادة": "تيتانيوم فليكس", "الوزن": "12 جرام", "الجنس": "رجالي / نسائي" }),
      specsEn: JSON.stringify({ "Type": "Optical", "Material": "Flex Titanium", "Weight": "12g", "Gender": "Unisex" }),
      images: {
        create: [
          {
            url: "/products/eyeglasses-titanium.png",
            altAr: "نظارة الفرنسي تيتانيوم الترا فليكس الطبية",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "rayban-wayfarer-classic-gold" },
    update: {
      images: {
        deleteMany: {},
        create: [
          {
            url: "/products/sunglasses-rayban.png",
            altAr: "نظارة ريبان شمسية كلاسيك",
            isPrimary: true,
          },
        ],
      },
    },
    create: {
      slug: "rayban-wayfarer-classic-gold",
      nameAr: "نظارة ريبان شمسية كلاسيك - إطار ذهبي",
      nameEn: "Ray-Ban Classic Aviator Gold Lens Sunglasses",
      descAr: "نظارة شمسية أصلية بمظهر كلاسيكي جذاب وعدسات مستقطبة Polarized توفر رؤية حادة بدون انعكاسات ورؤية حرة.",
      descEn: "Authentic Ray-Ban polarized sunglasses featuring a classic gold metallic frame and crystal UV400 lenses.",
      sku: "AFP-SUN-202",
      price: 160,
      stockQuantity: 8,
      isAvailable: true,
      isFeatured: true,
      categoryId: catSunglasses.id,
      brandId: brandRayBan.id,
      specsAr: JSON.stringify({ "النوع": "شمسية", "العدسة": "Polarized UV400", "الإطار": "معدن ذهبي", "بلد الصنع": "إيطاليا" }),
      specsEn: JSON.stringify({ "Type": "Sunglasses", "Lens": "Polarized UV400", "Frame": "Gold Metal", "Made In": "Italy" }),
      images: {
        create: [
          {
            url: "/products/sunglasses-rayban.png",
            altAr: "نظارة ريبان شمسية كلاسيك",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "bluecut-screen-protection-frame" },
    update: {
      images: {
        deleteMany: {},
        create: [
          {
            url: "/products/screen-bluecut.png",
            altAr: "نظارة حماية الشاشات والكمبيوتر Blue-Cut",
            isPrimary: true,
          },
        ],
      },
    },
    create: {
      slug: "bluecut-screen-protection-frame",
      nameAr: "نظارة حماية الشاشات والكمبيوتر (Blue-Cut)",
      nameEn: "Blue-Cut Digital Protection Glasses",
      descAr: "نظارة حماية مخصصة لحجب الضوء الأزرق الضار الصادر من الشاشات والهواتف، تمنع إجهاد العين والصداع أثناء العمل والمكتب.",
      descEn: "Advanced blue-light filter computer glasses preventing digital eye strain, fatigue and headaches.",
      sku: "AFP-PRO-303",
      price: 45,
      stockQuantity: 20,
      isAvailable: true,
      isFeatured: true,
      categoryId: catProtection.id,
      brandId: brandZeiss.id,
      specsAr: JSON.stringify({ "النوع": "حماية شاشات", "العدسة": "Blue-Cut 100%", "الإطار": "مريح خفيف الوزن" }),
      specsEn: JSON.stringify({ "Type": "Screen Protection", "Lens": "Blue-Cut Filter", "Frame": "Lightweight Polycarbonate" }),
      images: {
        create: [
          {
            url: "/products/screen-bluecut.png",
            altAr: "نظارة حماية الشاشات والكمبيوتر Blue-Cut",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "fashion-trend-lifestyle-sunglasses" },
    update: {
      images: {
        deleteMany: {},
        create: [
          {
            url: "/products/fashion-cashkha.png",
            altAr: "نظارة كاجوال عصرية للكشخة والاستعراض",
            isPrimary: true,
          },
        ],
      },
    },
    create: {
      slug: "fashion-trend-lifestyle-sunglasses",
      nameAr: "نظارة كاجوال عصرية للكشخة والاستعراض",
      nameEn: "Fashion & Trend Lifestyle Eyewear",
      descAr: "نظارات عصرية جذابة بتصميم مودرن للكشخة والأناقة في المناسبات والخروجات مع حماية شمسية ممتازة.",
      descEn: "Stylish fashion statement eyewear designed for casual wear, trend-setting look and daily style.",
      sku: "AFP-FAS-404",
      price: 55,
      stockQuantity: 12,
      isAvailable: true,
      isFeatured: true,
      categoryId: catFashion.id,
      brandId: brandRayBan.id,
      specsAr: JSON.stringify({ "النوع": "استعراض وكشخة", "التصميم": "مودرن تريند", "الجنس": "للشباب والجنسين" }),
      specsEn: JSON.stringify({ "Type": "Fashion / Lifestyle", "Design": "Modern Trend", "Gender": "Unisex" }),
      images: {
        create: [
          {
            url: "/products/fashion-cashkha.png",
            altAr: "نظارة كاجوال عصرية للكشخة والاستعراض",
            isPrimary: true,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "phonak-audeo-lumity-digital" },
    update: {
      images: {
        deleteMany: {},
        create: [
          {
            url: "/products/phonak-hearing-aid.png",
            altAr: "سماعة فوناك الطبية الرقمية المخفية",
            isPrimary: true,
          },
        ],
      },
    },
    create: {
      slug: "phonak-audeo-lumity-digital",
      nameAr: "سماعة فوناك الطبية الرقمية المخفية (Phonak Audéo)",
      nameEn: "Phonak Audéo Lumity Digital Hearing Aid",
      descAr: "سماعة طبية متطورة للغاية تقترن بالبلوتوث مع الهواتف، غير مرئية داخل الأذن، مزودة بمعالج ذكاء اصطناعي لتصفية الضوضاء وضمان نقاء الصوت.",
      descEn: "State-of-the-art digital medical hearing aid with Bluetooth connectivity and AI noise cancellation.",
      sku: "AFP-AUD-505",
      price: 450,
      stockQuantity: 5,
      isAvailable: true,
      isFeatured: true,
      categoryId: catAudiology.id,
      brandId: brandPhonak.id,
      specsAr: JSON.stringify({ "النوع": "سماعة طبية", "التقنية": "بلوتوث + ذكاء اصطناعي", "البطارية": "قابلة للشحن" }),
      specsEn: JSON.stringify({ "Type": "Medical Hearing Aid", "Technology": "Bluetooth + AI", "Battery": "Rechargeable" }),
      images: {
        create: [
          {
            url: "/products/phonak-hearing-aid.png",
            altAr: "سماعة فوناك الطبية الرقمية المخفية",
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
    { key: "address", valueAr: "صنعاء - منطقة سعوان - أمام نايس وير جوار شركة الأثير موبايل", valueEn: "Sana'a - Sa'awan Area - In front of Nice Wear, next to Al-Atheer Mobile", category: "LOCATION" },
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

  console.log("Database seeded successfully with real product photography!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
