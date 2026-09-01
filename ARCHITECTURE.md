# Architecture Specification: Al-Fransi Plus Optics & Audiology

## Overview
Al-Fransi Plus Optics & Audiology (نظارات الفرنسي بلاس) is an Arabic-first, production-ready enterprise business web platform built on Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, and Prisma ORM.

## System Topology
```
+-------------------------------------------------------------------+
|                        Client Browser                             |
|          (RTL Arabic / LTR English Switcher, Responsive UI)        |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
|                   Next.js 15 App Router                           |
|  - Middleware & Cookie-based Locale/Auth Context                  |
|  - Server Components (SEO & Data Fetching)                        |
|  - Server Actions (Forms, Booking, Inquiries, Admin Auth)         |
+---------------------------------+---------------------------------+
                                  |
                                  v
+---------------------------------+---------------------------------+
|                      Prisma ORM Layer                             |
|  - SQLite (Local Dev Zero-Config) / PostgreSQL (Production)       |
|  - Schema Models: User, Product, Category, Brand, Service,        |
|    Appointment, ContactInquiry, BusinessSetting                  |
+-------------------------------------------------------------------+
```

## Directory Structure
```
alfransi-plus-optics/
├── prisma/
│   ├── schema.prisma      # Cross-database Prisma schema
│   └── seed.ts            # Business & catalog seed script
├── public/
│   ├── brand/             # Organized brand assets (logo, mark, favicon)
│   └── favicon.png
├── src/
│   ├── app/               # Next.js 15 App Router pages
│   │   ├── page.tsx       # Home Page
│   │   ├── services/      # Optical & Audiology Services Page
│   │   ├── products/      # Products Catalog & Detail Pages ([slug])
│   │   ├── brands/        # Official Brands Showcase Page
│   │   ├── appointments/  # Appointments Booking Request Page
│   │   ├── contact/       # Contact & Inquiries Page
│   │   ├── location/      # Location & Directions Page
│   │   ├── faq/           # Frequently Asked Questions Page
│   │   ├── privacy/       # Privacy Policy Page
│   │   ├── terms/         # Terms of Service Page
│   │   └── admin/         # Secure Admin Dashboard & Management Pages
│   ├── components/        # Reusable UI Components
│   │   ├── Header.tsx     # Responsive Header with AR/EN & CTAs
│   │   ├── Footer.tsx     # Comprehensive Business Footer
│   │   ├── Hero.tsx       # Storefront Visual Hero Section
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BrandsSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── LocationSection.tsx
│   │   ├── AppointmentModal.tsx
│   │   └── WhatsAppButton.tsx
│   ├── context/
│   │   └── LocaleContext.tsx # Centralized RTL/LTR i18n Context
│   ├── i18n/
│   │   ├── ar.ts          # Arabic Translation Dictionaries
│   │   ├── en.ts          # English Translation Dictionaries
│   │   └── index.ts
│   └── lib/
│       ├── actions.ts     # Zod validated Server Actions
│       ├── auth.ts        # JOSE JWT & bcrypt authentication
│       ├── data.ts        # Database repositories
│       ├── prisma.ts      # Prisma client singleton
│       └── whatsapp.ts    # Centralized WhatsApp URL builders
├── .env                   # Local configuration
├── .env.example           # Environment template
├── package.json
└── README.md
```
