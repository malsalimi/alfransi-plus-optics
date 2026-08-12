# Security Policy & Hardening: Al-Fransi Plus Optics & Audiology

## 1. Authentication & Session Management
- **JWT Signing**: Admin session tokens are signed with `jose` using HS256 algorithm and stored in `HttpOnly`, `SameSite=Lax` cookies (`alfransi_admin_token`).
- **Password Hashing**: Admin credentials use `bcryptjs` with salt round factor 10. No plaintext passwords are ever logged or stored.

## 2. Data Validation & Protection
- **Input Sanitation**: All public form submissions (Appointments, Contact Inquiries, Admin Actions) use `Zod` schemas.
- **ORM Parameterization**: Database queries are executed through `Prisma ORM` preventing SQL injection.

## 3. HTTP Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`

## 4. Privacy & Sensitive Information
- No medical history or confidential patient records are collected on public forms.
- Contact phone numbers and appointment requests are restricted to authenticated admin access.
