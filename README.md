# Bilogicons

A centralized SVG icon library and workflow hub for biological researchers.

🔗 **[Live Demo → bilogicons.vercel.app](https://bilogicons.vercel.app)**

---

## 📸 Project Preview

[![BilogIcons Landing Page](public/preview.png)](https://bilogicons.vercel.app)

*(Click the image above to visit the live site!)*

---

## 🚀 Overview

**BilogIcons** is a full-stack web application designed to help researchers organize, share, and discover custom biological illustrations. Instead of losing highly specialized vectors in isolated local folders, labs can now maintain a shared, searchable gallery of publication-ready SVG diagrams.

---

## ✨ Key Features

- **Open Gallery** — Browse and download specialized biological vectors (Microbiology, Bioinformatics, Molecular Biology, etc.).
- **Secure Lab Workspaces** — Create private environments to collaborate securely with lab members.
- **Custom SVG Uploads** — Server-side sanitized SVG uploads stored securely in the cloud.
- **Protocol Workflows** — Document and share standardized lab protocols alongside visual assets.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------------|------------------------------------------------|
| Frontend | Next.js 16 (App Router), React, TypeScript |
| Backend | Next.js API Routes, NextAuth.js |
| Database | PostgreSQL managed via Prisma ORM |
| Storage | Supabase Storage (AWS) |
| Deployment | Vercel |

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bilogicons.git
cd bilogicons

# 2. Install dependencies
npm install

# 3. Set up your .env.local with Supabase and NextAuth credentials

# 4. Generate the Prisma client
npx prisma generate

# 5. Start the development server
npm run dev
```
