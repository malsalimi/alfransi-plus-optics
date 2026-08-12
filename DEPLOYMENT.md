# Production Deployment Guide: Al-Fransi Plus Optics & Audiology

## Prerequisites
- Node.js >= 18.x
- PostgreSQL database URL (or local SQLite file)
- Domain with SSL certificate (HTTPS)

## Step 1: Environment Variables
Create `.env` file on production server with variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/alfransi_db?schema=public"
JWT_SECRET="your-production-high-entropy-jwt-secret"
NEXT_PUBLIC_SITE_URL="https://alfransi-optics.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="773945678"
NEXT_PUBLIC_SECONDARY_PHONE="777266692"
```

## Step 2: Database Migration & Seeding
Run schema push and seed script:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

## Step 3: Build & Start
```bash
npm run build
npm run start
```
The platform will run on port 3000 by default behind Nginx / PM2 reverse proxy.
