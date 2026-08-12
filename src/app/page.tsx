import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationSection from "@/components/LocationSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getServices, getFeaturedProducts, getBrands } from "@/lib/data";

export const revalidate = 60; // Revalidate cache every minute

export default async function HomePage() {
  const [services, products, brands] = await Promise.all([
    getServices(),
    getFeaturedProducts(),
    getBrands(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServicesSection services={services} />
        <FeaturedProducts products={products} />
        <BrandsSection brands={brands} />
        <WhyChooseUs />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
