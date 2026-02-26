# Digital Page - Quick Deployment Guide

## Option 1: Render.com (Recommended - FREE)

### Step 1: Push to GitHub
```bash
cd ~/projects/digital-page
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/digital-page.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: digital-page
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"

Your site will be live at: `https://digital-page.onrender.com`

---

## Option 2: Railway.app (FREE)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Deploy
```bash
cd ~/projects/digital-page
railway login
railway init
railway up
```

Your site will be live at a Railway URL.

---

## Option 3: Fly.io (FREE $5 credit)

### Step 1: Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
```

### Step 2: Deploy
```bash
cd ~/projects/digital-page
fly auth signup  # or fly auth login
fly launch
fly deploy
```

---

## Option 4: Netlify (Static - Limited)

Note: Netlify is for static sites. For full functionality use Render/Railway.

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=.next
```

---

## Features

✅ Document printing with file upload
✅ West Bengal government grant forms
✅ Aadhaar appointment booking
✅ Owner dashboard with password: `digitalpage2024`
✅ SQLite database (no setup needed)
✅ File storage on disk (persistent on Render)

---

## After Deployment

1. **Owner Dashboard**: Visit `/owner`
   - Password: `digitalpage2024`

2. **Aadhaar Services**: `/services/aadhar`

3. **Government Forms**: `/services/forms`

The database (SQLite) is automatically created on first run!
