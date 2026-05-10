# Artisan Web Co. — Portfolio Website

A premium web agency portfolio built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Designed for a web agency that builds websites for micro-businesses (bakeries, boutiques, cafés, salons, local shops).

## ✨ Features

- **Three.js / React Three Fiber** hero with floating 3D geometric shapes
- **Framer Motion** scroll reveals, page transitions, hover interactions
- **Lenis** smooth scroll
- **Interactive customization form** with color mood picker and feature toggle chips
- **Neon PostgreSQL** cloud database via Next.js API Routes
- **Admin dashboard** with password protection
- **Fully responsive** design with warm, artisan aesthetic
- **Vercel-ready** serverless deployment

## 🛠️ Tech Stack

| Layer     | Technology                                           |
|-----------|------------------------------------------------------|
| Framework | Next.js 14 (App Router)                              |
| Language  | TypeScript (strict)                                  |
| Styling   | Tailwind CSS                                         |
| UI        | Custom components                                    |
| Animation | Framer Motion, GSAP + ScrollTrigger, Lenis           |
| 3D        | Three.js + React Three Fiber + Drei                  |
| Icons     | Lucide React                                         |
| Database  | Neon PostgreSQL (`@neondatabase/serverless`)         |
| Backend   | Next.js API Routes (serverless)                      |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Neon](https://neon.tech) account (for the database)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Neon PostgreSQL (Free)

1. Go to [console.neon.tech](https://console.neon.tech) and sign up (free)
2. Click **"New Project"** → name it `artisan-portfolio` → select your nearest region
3. Once created, copy the **connection string** from the dashboard. It looks like:
   ```
   postgresql://username:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Open the **SQL Editor** in Neon's dashboard
5. Paste the contents of [`lib/schema.sql`](lib/schema.sql) and click **Run**
6. This creates the 3 tables (`projects`, `contact_messages`, `customization_requests`) and seeds 6 demo projects

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Paste your Neon connection string here
DATABASE_URL=postgresql://username:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require

ADMIN_PASSWORD=yourSecureAdminPassword

# Gmail SMTP (use an App Password, not your login password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
NOTIFY_EMAIL=your_email@gmail.com
```

> **💡 Gmail App Password:** Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) to generate one.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Home page (all sections)
│   ├── layout.tsx                  # Root layout + metadata
│   ├── globals.css                 # Tailwind + custom styles
│   ├── admin/page.tsx              # Admin dashboard (protected)
│   └── api/
│       ├── contact/route.ts        # POST: save contact form
│       ├── customization/route.ts  # POST: save customization request
│       ├── projects/route.ts       # GET/DELETE: portfolio projects
│       └── admin/
│           ├── messages/route.ts   # GET: fetch contact messages
│           └── customizations/route.ts # GET: fetch customization requests
├── components/
│   ├── sections/
│   │   ├── Hero.tsx                # Hero + sticky navbar
│   │   ├── HowWeWork.tsx           # Process steps + Why Choose Us
│   │   ├── Portfolio.tsx           # Project showcase grid
│   │   ├── Customization.tsx       # Website customization form
│   │   ├── Contact.tsx             # Contact form + info
│   │   └── Footer.tsx              # Footer
│   ├── three/
│   │   └── HeroScene.tsx           # Three.js floating shapes
│   └── LenisProvider.tsx           # Smooth scroll provider
├── hooks/
│   └── useLenis.ts                 # Lenis smooth scroll hook
├── lib/
│   ├── db.ts                       # Neon PostgreSQL connection (serverless)
│   ├── mailer.ts                   # Nodemailer SMTP utility
│   ├── utils.ts                    # cn() utility
│   └── schema.sql                  # PostgreSQL schema + seed data
├── tailwind.config.ts              # Custom design system
└── README.md
```

## 🎨 Design System

| Token           | Value      | Usage              |
|-----------------|------------|---------------------|
| `background`    | `#FAF7F2`  | Warm cream base     |
| `foreground`    | `#1C1C1C`  | Near black text     |
| `primary`       | `#C1440E`  | Terracotta accent   |
| `primary-light` | `#E8886A`  | Light terracotta    |
| `accent`        | `#3B5249`  | Deep forest green   |
| `muted`         | `#8A8078`  | Muted text          |

**Fonts:** Playfair Display (headings), DM Sans (body), JetBrains Mono (code/badges)

## 🔐 Admin Dashboard

Navigate to `/admin` and enter your admin password to view:
- Contact form submissions
- Website customization requests
- Portfolio projects (with delete)

## 🌐 Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "migrate to Neon PostgreSQL"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **"Import Project"** → select your GitHub repo
2. In the **Environment Variables** section, add:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | `postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require` |
   | `ADMIN_PASSWORD` | Your admin password |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASS` | Your Gmail App Password |
   | `NOTIFY_EMAIL` | Your notification email |

3. Click **Deploy** 🚀

### Step 3: Verify

- Visit your deployed URL
- Test the contact form
- Check `/admin` dashboard
- Verify projects load from the database

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| `DATABASE_URL is not set` | Add `DATABASE_URL` to `.env.local` (local) or Vercel env vars (production) |
| Connection timeout | Ensure `?sslmode=require` is in your connection string |
| Empty projects list | Run `lib/schema.sql` in Neon's SQL Editor to seed data |
| SMTP errors | Generate a Gmail App Password (regular passwords won't work with 2FA) |
| Build fails on Vercel | Check that all env vars are set in Vercel project settings |

## 📄 License

MIT
