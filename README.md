# Artisan Web Co. — Portfolio Website

A premium web agency portfolio built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Designed for a web agency that builds websites for micro-businesses (bakeries, boutiques, cafés, salons, local shops).

## ✨ Features

- **Three.js / React Three Fiber** hero with floating 3D geometric shapes
- **Framer Motion** scroll reveals, page transitions, hover interactions
- **Lenis** smooth scroll
- **Interactive customization form** with color mood picker and feature toggle chips
- **MySQL backend** via Next.js API Routes
- **Admin dashboard** with password protection
- **Fully responsive** design with warm, artisan aesthetic

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
| Database  | MySQL (via mysql2)                                   |
| Backend   | Next.js API Routes                                   |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MySQL

1. Start your MySQL server
2. Run the schema SQL to create the database and tables:

```bash
mysql -u root -p < lib/schema.sql
```

This creates:
- `agency_portfolio` database
- `projects` table (with 6 seed projects)
- `contact_messages` table
- `customization_requests` table

### 3. Configure environment variables

Copy `.env.local` and update with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=agency_portfolio
ADMIN_PASSWORD=yourAdminPassword123
```

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
│       ├── projects/route.ts       # GET: fetch portfolio projects
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
│   ├── db.ts                       # MySQL connection pool
│   ├── utils.ts                    # cn() utility
│   └── schema.sql                  # Database schema + seed data
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
- Portfolio projects (with add form)

## 📦 Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

> **Note:** You'll need a hosted MySQL database (e.g., PlanetScale, AWS RDS) for production.

## 📄 License

MIT
