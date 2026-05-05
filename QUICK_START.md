# Quick Start Guide

## 1. Generate Admin Credentials

```bash
npm install
node setup.js
```

This will prompt you to enter your email and password, then output the hash to add to `.env`

## 2. Configure Environment

Copy the output from `setup.js` into `.env`:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=<hash from setup.js>
JWT_SECRET=<random secret from setup.js>
NODE_ENV=production
```

## 3. Test Locally

```bash
npm run dev
```

Then visit:
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/

## 4. Deploy to Vercel/Netlify

1. Push code to GitHub
2. Connect to Vercel or Netlify
3. Add the same environment variables
4. Deploy!

## Managing Projects

### Adding a Project

1. Go to `/admin/` and login
2. Click "Add New Project"
3. Fill in:
   - Project Title (required)
   - Description (required)
   - Image URL (optional - use placeholder like https://via.placeholder.com/400x300)
   - Project Link (optional)
   - Tags (comma-separated)
4. Click "Create Project"

### Editing a Project

1. Go to "Projects" in admin
2. Click "Edit" on any project
3. Modify the details
4. Click "Update Project"

### Deleting a Project

1. Go to "Projects" in admin
2. Click "Delete"
3. Confirm deletion

## Project Gallery

The main page (`/`) automatically displays all projects as tiles. The gallery updates when you add/edit/delete projects from the admin panel.

## Notes

- If you don't have an image URL, use a placeholder like: `https://via.placeholder.com/400x300?text=My+Project`
- Tags help organize your projects
- Project links are optional
- The admin panel only you can access with your credentials

## Troubleshooting

**Can't login to admin?**
- Check `.env` has correct `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`
- Make sure you hashed the password with `node setup.js`

**Projects not showing?**
- Check browser console for errors
- Verify `/api/projects` endpoint works

**Deployment issues?**
- Make sure environment variables are set in your hosting provider
- Check build logs for any missing dependencies

## File Structure Reference

```
Your Portfolio Website/
├── api/index.js              # Backend API
├── public/
│   ├── index.html            # Main page
│   ├── admin/index.html      # Admin panel
│   ├── js/
│   │   ├── api.js            # API client
│   │   ├── gallery.js        # Gallery code
│   │   └── admin.js          # Admin code
│   └── css/styles.css        # Styling
├── data/projects.json        # Your projects data
├── package.json              # Dependencies
├── .env                       # Your secrets (don't commit!)
└── README.md                  # Full documentation
```

---

**Ready to go!** Your modular portfolio website is set up and ready to deploy.
