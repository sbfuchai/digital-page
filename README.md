# Digital Page - Production Ready

## 🚀 Quick Deploy to Render.com (FREE)

### Step 1: Create GitHub Repo
```bash
cd ~/projects/digital-page
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/digital-page.git
git push -u origin main
```

### Step 2: Deploy to Render
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Name**: `digital-page`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Disk (for file uploads):
   - Click "Add Disk" after creation
   - **Name**: `data`
   - **Mount Path**: `/opt/render/project/src/data`
   - **Size**: 1 GB
6. Click "Create Web Service"

**Live in ~5 minutes at:** `https://digital-page.onrender.com`

---

## ✅ What's Included

- **Printing**: File upload, B&W/Color options, order tracking
- **Govt Forms**: 12 West Bengal scheme forms ready to download
- **Aadhaar**: Appointment booking with calendar/time slots
- **Owner Dashboard**: `/owner` (password: `digitalpage2024`)
- **Database**: SQLite (auto-created, no setup needed)
- **File Storage**: Local disk (persistent with Render disk)

---

## 📁 Project Structure

```
digital-page/
├── app/
│   ├── api/           # API routes
│   ├── owner/         # Admin dashboard
│   ├── services/
│   │   ├── forms/     # Govt forms page
│   │   └── aadhar/    # Aadhaar booking
│   └── page.tsx       # Home
├── lib/
│   └── db.ts          # SQLite database
├── public/forms/      # Government form PDFs
└── data/              # Database & uploads (auto-created)
```

---

## 🔑 Owner Dashboard

- **URL**: `/owner`
- **Password**: `digitalpage2024`

Features:
- View print orders (pending/printed)
- View Aadhaar bookings
- Mark orders as printed
- Search & filter
- Real-time updates

---

## 🛠️ Local Development

```bash
cd ~/projects/digital-page
bun install
bun run dev
```

Open `http://localhost:3000`

---

## 📋 Environment Variables

None needed! SQLite database is file-based and auto-created.

For Render deployment, the disk ensures data persists between deploys.

---

## 🌐 Live URLs After Deploy

- **Home**: `https://digital-page.onrender.com`
- **Govt Forms**: `https://digital-page.onrender.com/services/forms`
- **Aadhaar**: `https://digital-page.onrender.com/services/aadhar`
- **Owner**: `https://digital-page.onrender.com/owner`

---

## 🆘 Troubleshooting

**Build fails?**
- Make sure `better-sqlite3` installs: `bun pm trust better-sqlite3`

**Files not persisting?**
- Ensure Render disk is mounted at `/opt/render/project/src/data`

**Database errors?**
- Delete `data/app.db` to reset (loses all data)

---

Made with ❤️ by Manish 🧭 for Digital Page
