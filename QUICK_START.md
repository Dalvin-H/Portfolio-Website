# Quick Start Guide (Static Version)

## Perfect for GitHub Pages + Cloudflare! ⚡

Your portfolio is now **fully static** - no backend needed!

## 1. Test Locally

```bash
npm install
npm run dev
```

Then visit:
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin.html

## 2. Set Admin Password

1. Open admin.html
2. You'll see login screen
3. Go to Settings → "Admin Password"
4. Set your password

**Note:** First time, no password is set. Go to settings to create one.

## 3. Add Your First Project

1. Login with your new password
2. Click "Add New Project"
3. Fill in:
   - **Title** (required)
   - **Description** (required)
   - **Image URL** (optional - use placeholder if needed)
   - **Link** (optional)
   - **Tags** (optional, comma-separated)
4. Click "Create Project"

Done! Your project appears on the main gallery instantly.

## 4. Deploy to GitHub Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial portfolio with projects"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repo on GitHub
2. Settings → Pages
3. Set source to "main branch"
4. Save

Your site is now live at: `https://yourusername.github.io/Portfolio-Website/`

### Step 3: Setup Cloudflare (Optional)

1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your domain (dalvinheyninck.be)
3. Point nameservers to Cloudflare (Cloudflare will show you how)
4. In DNS settings, create CNAME:
   - **Name**: `www`
   - **Target**: `yourusername.github.io`
   - **TTL**: Auto
5. Enable SSL/TLS (free option)

Your site is now live at: `www.dalvinheyninck.be`

## 📝 Admin Features

### Manage Projects

| Action | Steps |
|--------|-------|
| Add | Admin → Add New Project → Fill form → Create |
| Edit | Admin → Projects → Edit → Modify → Update |
| Delete | Admin → Projects → Delete → Confirm |

### Backup/Restore

1. Admin › Settings › "Data Management"
2. Click "Export Projects" to download JSON
3. Use "Import Projects" to restore

## 🎨 No Style Setup Needed!

The portfolio already has nice styling. You can customize later:
- Edit `css/styles.css` for colors/fonts
- Edit HTML files for text/layout

## ✅ That's It!

Your portfolio is:
- ✅ Running locally
- ✅ Deployed to GitHub
- ✅ Connected to your domain via Cloudflare
- ✅ Admin panel password protected
- ✅ Projects stored in browser + projects.json

## 🚀 Next Steps

1. Add your real projects
2. Update website title and colors
3. Add custom domain settings (if using Cloudflare)
4. Share your portfolio!

---

**All data is stored:**
- 📱 Browser localStorage (fast, instant)
- 📄 projects.json (backup, for first-time load)

**No backend** means:
- ✅ Free hosting (GitHub Pages)
- ✅ No server costs
- ✅ No database maintenance
- ✅ Simple & secure

