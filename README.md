# Al-Fransi Plus Optics & Audiology (نظارات الفرنسي بلاس)

A production-ready, Arabic-first business platform for **Al-Fransi Plus Optics & Audiology (نظارات الفرنسي بلاس للبصريات والسمعيات)** located in Sana'a, Yemen.

---

## Technical Stack
- **Framework**: Next.js 15 (App Router with Server Components & Server Actions)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Custom Design Tokens matching physical storefront identity
- **Database & ORM**: Prisma ORM with SQLite (Local Zero-Config) & PostgreSQL support
- **Authentication**: `jose` JWT + `bcryptjs` password hashing in HttpOnly cookies
- **Validation**: Zod schema validation
- **Localization**: Centralized RTL (Arabic, default) & LTR (English) dictionary system

---

## Features

### Public Customer Platform
- **Arabic First (RTL)**: Default language is Arabic with full English (LTR) toggle.
- **Store Identity & Hero**: Storefront visual aesthetic with logo, slogan (*"أناقة وإبداع .. رؤية بلا صداع"*), and verified phone numbers (`773945678` - `777266692`).
- **Optical & Audiology Services**: Comprehensive breakdowns of computerized eye exams, prescription lens fitting, contact lenses, and audiology hearing aid care.
- **Product Catalog**: Data-driven searchable product catalog with direct WhatsApp inquiry actions (`"أريد الاستفسار عن هذا المنتج"`).
- **Appointment Booking System**: Interactive booking form with date/time pickers and Zod Server Action processing.
- **Store Location & Contact**: Verified address (*"صنعاء - سعوان - أمام المستشفى"*), working hours, interactive Google Maps triggers, and direct phone links.
- **Floating WhatsApp Action**: Quick action button for instant customer inquiries.

### Protected Admin Management (`/admin`)
- **Secure Authentication**: Password-hashed login and JWT session cookies (`/admin/login`).
- **Dashboard Overview (`/admin/dashboard`)**: Analytics counters for total products, pending appointments, and unread inquiries.
- **Appointments Management (`/admin/appointments`)**: Review and update booking statuses (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Catalog Management (`/admin/products`)**: Manage products, stock quantities, and availability.

---

## Environment Setup & Commands

### Environment File (`.env`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="alfransi_plus_optics_audiology_secret_key_2026_super_secure"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2a$12$N7xVv2tYyN1Y98kX5A7H4.pD2U8dE6yJgX7K2M9N0O1P2Q3R4S5T6"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="773945678"
NEXT_PUBLIC_SECONDARY_PHONE="777266692"
```

### Local Development
```bash
# Push database schema & create SQLite DB
npx prisma db push

# Seed sample catalog & default admin (username: admin / password: admin123)
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```
