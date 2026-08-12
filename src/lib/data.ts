import { prisma } from "./prisma";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { nameAr: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getBrands() {
  try {
    return await prisma.brand.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { nameAr: "asc" },
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        category: true,
        brand: true,
        images: true,
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getAllProducts(filters?: {
  categoryId?: string;
  brandId?: string;
  search?: string;
  inStockOnly?: boolean;
}) {
  try {
    const where: any = { isActive: true };

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.brandId) {
      where.brandId = filters.brandId;
    }

    if (filters?.inStockOnly) {
      where.isAvailable = true;
      where.stockQuantity = { gt: 0 };
    }

    if (filters?.search) {
      const query = filters.search.trim();
      where.OR = [
        { nameAr: { contains: query } },
        { nameEn: { contains: query } },
        { descAr: { contains: query } },
        { sku: { contains: query } },
      ];
    }

    return await prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getBusinessSettings() {
  try {
    const settings = await prisma.businessSetting.findMany();
    const map: Record<string, { ar: string; en: string }> = {};
    for (const item of settings) {
      map[item.key] = { ar: item.valueAr, en: item.valueEn };
    }
    return map;
  } catch (error) {
    console.error("Error fetching business settings:", error);
    return {};
  }
}
