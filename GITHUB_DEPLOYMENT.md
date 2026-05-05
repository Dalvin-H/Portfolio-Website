# GitHub Pages + Cloudflare Deployment Guide

## Overview

Your portfolio is a **static website** stored on GitHub and hosted via Cloudflare. No backend required!

## Architecture

```
You (Git Push) → GitHub Repo → GitHub Pages (HOST) → Cloudflare DNS → dalvinheyninck.be
```

## Step 1: Prepare Local Repository

Your repository should already be initialized. Verify:

```bash
cd c:\Git_Projects\Portfolio-Website
git status
```

You should see tracked files:
- index.html
- admin.html
- projects.json
- js/ (storage.js, admin.js, gallery.js)
- css/styles.css
- etc.

## Step 2: Commit and Push to GitHub

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "Portfolio: Convert to static GitHub Pages compatible version

Features:
- Client-side admin panel with password protection
- localStorage for project storage
- Import/Export functionality
- Ready for GitHub Pages + Cloudflare"

# Push to main branch
git push origin main
```

**Important:** Make sure you're pushing to the `main` branch (not `master`).

## Step 3: Enable GitHub Pages

1. Go to your GitHub repository online
2. Navigate to **Settings**
3. Scroll to **Pages** section (on the left sidebar)
4. Under "Source", select **main branch**
5. Click **Save**

Your site will be available at:
```
https://yourusername.github.io/Portfolio-Website/
```

**Wait 1-2 minutes for GitHub to deploy.**

Check the **Deployments** tab to see deployment status.

## Step 4: Add Cloudflare (For Custom Domain)

### 4a. Add Domain to Cloudflare

1. Go to [Cloudflare.com](https://cloudflare.com)
2. Sign up or log in
3. Click **Add Site**
4. Enter your domain: `dalvinheyninck.be`
5. Choose **Free Plan**
6. Continue

### 4b. Update Nameservers

Cloudflare will give you 2 nameservers. Example:
```
leah.ns.cloudflare.com
mark.ns.cloudflare.com
```

1. Go to your domain registrar (wherever you bought dalvinheyninck.be)
2. Find DNS/Nameserver settings
3. Replace existing nameservers with Cloudflare's
4. Save changes

**Wait 24-48 hours for nameservers to propagate.**

### 4c. Create DNS Record in Cloudflare Dashboard

1. In Cloudflare, go to your domain
2. Click **DNS**
3. Click **Add record**
4. Fill in:
   - **Type**: CNAME
   - **Name**: www
   - **Target**: `yourusername.github.io`
   - **TTL**: Auto
   - **Proxy status**: Proxied (orange cloud) - optional
5. Click **Save**

Your site is now accessible at:
```
https://www.dalvinheyninck.be
```

### 4d. SSL/TLS Setup (Free)

1. In Cloudflare dashboard
2. Go to **SSL/TLS**
3. Set **SSL/TLS encryption mode** to "Full"
4. Done! Cloudflare provides free HTTPS

## Step 5: Test Your Site

Visit these URLs and verify they work:

- 🌐 **Main portfolio**: https://www.dalvinheyninck.be
- 🔐 **Admin panel**: https://www.dalvinheyninck.be/admin.html
- 📝 **Admin password**: Set in Settings screen

## Making Updates

After any changes:

```bash
# 1. Make changes locally
# (Edit HTML files, add projects via admin, etc)

# 2. Commit changes
git add .
git commit -m "Description of changes"

# 3. Push to GitHub
git push origin main

# 4. GitHub Pages auto-deploys (1-5 minutes)
# Check Deployments tab to confirm
```

## File Structure (Important)

```
root/
├── index.html              # Must be in root
├── admin.html              # Must be in root
├── projects.json           # Must be in root
├── css/styles.css
├── js/
│   ├── storage.js
│   ├── admin.js
│   └── gallery.js
└── ...other files...
```

**GitHub Pages automatically serves `index.html` from the root.**

## Privacy & Security

### What's Public (On GitHub)
- HTML files
- CSS
- JavaScript
- projects.json (sample data)
- Configuration files

### What's Private (In Browser)
- Admin password (sessionStorage only)
- Current projects (localStorage)
- Your credentials

### Sensitive Data
- Don't put secrets in git
- Don't commit `.env` files
- Don't commit node_modules/

## Troubleshooting

### Site not live after push?

1. Wait 2-5 minutes
2. Hard refresh (Ctrl+F5)
3. Check GitHub Settings → Pages to verify deployment status
4. Check Deployments tab for errors

### Can't access admin panel?

```
URL should be: https://www.dalvinheyninck.be/admin.html

NOT: https://www.dalvinheyninck.be/admin/
```

### Projects not showing?

1. Check browser DevTools (F12) → Console for errors
2. Check localStorage: DevTools → Application → localStorage
3. Try importing projects.json via admin Settings

### DNS not working?

1. Nameservers take 24-48 hours to propagate
2. Check Cloudflare DNS panel: is CNAME record set correctly?
3. Verify GitHub Pages is enabled in GitHub Settings
4. Test with your GitHub Pages URL first (yourusername.github.io/Portfolio-Website)

## Monthly Checks

- ✅ GitHub keeps your code backed up
- ✅ Cloudflare keeps your site fast and secure
- ✅ Projects stored in browser and projects.json
- ✅ No maintenance or updates needed

## Advanced: Custom Apex Domain

If you want `dalvinheyninck.be` (not `www.dalvinheyninck.be`):

1. In Cloudflare DNS, add 4 A records pointing to:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

2. Remove or disable the www CNAME

3. In GitHub Settings → Pages → Custom domain, enter: `dalvinheyninck.be`

## Useful Links

- 📖 [GitHub Pages Docs](https://pages.github.com/)
- 📖 [Cloudflare Docs](https://developers.cloudflare.com/)
- 🔍 [Check DNS Propagation](https://dnschecker.org/)
- 🧪 [Test Your Site Speed](https://pagespeed.web.dev/)

---

**Your portfolio is now live on the internet!** 🎉

All files are on GitHub, hosted on GitHub Pages, and accessible via your custom domain through Cloudflare.

Every time you push to GitHub, it automatically updates your live site.
