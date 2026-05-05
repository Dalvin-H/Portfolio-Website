# Portfolio Website

Simple static portfolio with gallery tiles.

## Structure

```
├── index.html              # Homepage
├── projects.json           # Project list
├── projects/
│   ├── project-1.html      # Project template
│   ├── project-2.html      # Project template
│   └── [add more here]
├── css/style.css           # Styling
└── js/gallery.js           # Gallery logic
```

## Adding a Project

1. **Create file**: Copy `projects/project-1.html` → `projects/project-3.html`
2. **Edit content**: Title, description, images, and text
3. **Update projects.json**:
```json
{
  "id": "project-3",
  "title": "Your Project",
  "description": "Brief description",
  "image": "https://via.placeholder.com/400x300",
  "page": "projects/project-3.html"
}
```
4. **Deploy**:
```bash
git add .
git commit -m "Add project"
git push origin main
```

## Local Testing

```bash
npm run dev
# Visit http://localhost:3000
```

A fully static, modular portfolio website with client-side admin panel. Works perfectly with GitHub Pages and Cloudflare!

**No backend required** - Everything runs in your browser using localStorage.

## ✨ Features

- **Public Portfolio Gallery** - Responsive tiles with images, descriptions, tags, and links
- **Admin Dashboard** - Secure client-side admin panel to manage projects
- **Client-Side Storage** - Projects stored in browser localStorage + projects.json for backup
- **GitHub Pages Ready** - Deploy directly from GitHub, no build process needed
- **Cloudflare Compatible** - Works seamlessly with Cloudflare hosting and DNS
- **Export/Import** - Backup and restore projects as JSON
- **Fully Modular** - Clean, organized code structure

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/Portfolio-Website.git
cd Portfolio-Website
npm install
```

### 2. Test Locally

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin**: http://localhost:3000/admin.html

### 3. Deploy to GitHub Pages

1. Push to GitHub:
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. Go to GitHub repo → Settings → Pages
3. Set source to "main branch"
4. Your site is now live at `https://yourusername.github.io/Portfolio-Website/`

### 4. Setup Cloudflare

1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Point nameservers to Cloudflare (instructions from Cloudflare)
4. In Cloudflare DNS settings, create a CNAME record:
   - **Name**: `www`
   - **Target**: `yourusername.github.io`
5. Turn on SSL/TLS (free option is fine)

Your site is now live at `www.dalvinheyninck.be`!

## 📁 Project Structure

```
Portfolio-Website/
├── index.html              # Main page
├── admin.html              # Admin panel
├── projects.json           # Sample data (auto-loaded on first visit)
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── storage.js          # localStorage management
│   ├── gallery.js          # Gallery display
│   └── admin.js            # Admin panel logic
├── public/                 # Static assets
└── package.json            # Dev dependencies (http-server only)
```

## 🔐 Admin Panel

### First Time Setup

1. Go to `/admin.html`
2. Click "Settings" → "Admin Password"
3. Set your admin password (minimum 4 characters)
4. Login with that password

### Managing Projects

**Add Project:**
1. Click "Add New Project"
2. Fill in title, description, image URL (optional), link (optional), tags
3. Click "Create Project"

**Edit Project:**
1. Go to "Projects"
2. Click "Edit" on any project
3. Modify and click "Update Project"

**Delete Project:**
1. Go to "Projects"
2. Click "Delete" and confirm

### Export/Import

1. Go to Settings → "Data Management"
2. **Export**: Click "Export Projects" to download as JSON
3. **Import**: Paste JSON data and click "Import Projects"

## 📊 Project Data Format

```json
{
  "projects": [
    {
      "id": "1234567890",
      "title": "Project Title",
      "description": "Project description",
      "image": "https://example.com/image.jpg",
      "link": "https://project-url.com",
      "tags": ["React", "JavaScript"],
      "createdAt": "2026-05-05T10:00:00.000Z"
    }
  ]
}
```

### Image URLs
You can use:
- **Direct URLs**: `https://example.com/image.jpg`
- **Placeholder service**: `https://via.placeholder.com/400x300?text=My+Project`
- **Image CDN**: Cloudflare Images, Imgur, etc.

## 🌐 Deployment

### GitHub Pages (Recommended)

Already set up! Just push to `main` branch and it automatically deploys.

```bash
git add .
git commit -m "Update projects"
git push origin main
```

### Custom Domain with Cloudflare

1. Add your domain to Cloudflare
2. Create CNAME record pointing to GitHub Pages
3. Enable SSL/TLS
4. Done!

## 💾 Data Storage

### How It Works

1. **First Visit**: `projects.json` is loaded into localStorage
2. **After Changes**: All changes are saved to localStorage (browser)
3. **Persistence**: Data stays even after closing/reopening browser (per browser)
4. **Backup**: Use Settings → Export to download projects.json

### Multiple Browsers/Devices

Data is stored per browser. To sync across devices:
1. Export projects from Browser A
2. Import into Browser B

## 🔒 Security Notes

- **Admin Password**: Stored in localStorage (client-side only)
- **Data**: Not sent to any server, stays 100% on your device
- **Use HTTPS**: Cloudflare provides free HTTPS
- **GitHub Private Repo**: Optional - repos can be public (projects.json is example data)

## 🎨 Customization

### Update Site Title
Edit `index.html` and `admin.html`:
```html
<title>Your Name - Portfolio</title>
```

### Change Colors
Edit `css/styles.css` and update colors like:
```css
background-color: #your-color;
color: #your-color;
```

### Modify Text
All content is in the HTML files - just edit directly.

## 📝 Example Workflow

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/Portfolio-Website.git

# 2. Test locally
npm install
npm run dev
# Visit http://localhost:3000/admin.html

# 3. Set admin password
# (in admin panel Settings)

# 4. Add your first project
# (through admin panel)

# 5. Deploy
git add .
git commit -m "Add first project"
git push origin main

# 6. Website is now live on GitHub Pages!
```

## ❓ Troubleshooting

**Admin panel not loading?**
- Make sure JavaScript is enabled
- Check browser console for errors (F12)

**Projects not showing?**
- Check that projects.json exists and is valid JSON
- In admin, check Settings → Export to verify data

**Cloudflare shows error?**
- Make sure CNAME record points to `yourusername.github.io`
- Wait 10-30 minutes for DNS to propagate
- Check Cloudflare dashboard for any errors

**Lost projects?**
- They're stored in localStorage (browser-specific)
- Export/download regularly as backup
- Check browser's Application → Storage → LocalStorage

## 📦 What's Included

- ✅ Fully static HTML/CSS/JS
- ✅ No backend required
- ✅ GitHub Pages compatible
- ✅ Cloudflare ready
- ✅ Sample projects included
- ✅ Export/import functionality
- ✅ Responsive design
- ✅ Admin authentication

## 🚫 Limitations

- **Storage**: Limited to browser's localStorage (~5-10MB per domain)
- **Multi-device**: Data not synced between devices (use export/import)
- **Scalability**: Works great for up to 100+ projects

## 🎓 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
- **Storage**: Browser localStorage + projects.json
- **Hosting**: GitHub Pages
- **DNS**: Cloudflare
- **No** Node.js, databases, or backend servers needed

## 📄 License

Feel free to use this for your portfolio!

---

**Support**: This is a static site - all code is in the repository. Check the HTML/JS files for detailed comments.

**Domain**: www.dalvinheyninck.be
