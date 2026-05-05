# Modular Portfolio Website

A fully modular portfolio website with an admin panel to manage projects. Built with Node.js/Express backend and vanilla JavaScript frontend.

## Features

- **Public Portfolio Gallery**: Display projects as tiles with images, descriptions, and tags
- **Admin Dashboard**: Secure admin panel to create, edit, and delete projects
- **Authentication**: Email/password authentication for admin access
- **Modular Architecture**: Easy to maintain and extend
- **Responsive Design**: Works on all devices
- **Serverless Ready**: Deploy on Vercel or Netlify

## Project Structure

```
.
├── api/
│   └── index.js           # Express API server
├── public/
│   ├── index.html         # Main portfolio page
│   ├── admin/
│   │   └── index.html     # Admin dashboard
│   ├── js/
│   │   ├── api.js         # API client module
│   │   ├── gallery.js     # Gallery module
│   │   └── admin.js       # Admin dashboard module
│   └── css/
│       └── styles.css     # Global styles
├── data/
│   └── projects.json      # Project data storage
├── package.json
├── .env.example           # Environment variables template
└── vercel.json            # Vercel deployment config
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=your-hashed-password
JWT_SECRET=your-secret-key-change-this-to-something-random
NODE_ENV=production
```

**To generate a password hash**, run in Node.js:

```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('your_password', 10, (err, hash) => {
  console.log(hash);
});
```

Or use this online tool: https://bcrypt-generator.com/ (set rounds to 10)

### 3. Local Development

```bash
npm run dev
```

Visit: `http://localhost:3000`

## Usage

### Public Portfolio Page

- Visit `/` to see the project gallery
- Projects are displayed as tiles with images, descriptions, and links

### Admin Dashboard

1. Go to `/admin/`
2. Login with your email and password
3. Manage projects:
   - **View Projects**: See all current projects
   - **Add Project**: Create new projects with title, description, image URL, link, and tags
   - **Edit Project**: Click "Edit" on any project to modify it
   - **Delete Project**: Click "Delete" to remove a project

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Create new project and select your repository
4. Add environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `JWT_SECRET`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm install`
4. Set publish directory: `public`
5. Add environment variables in Netlify Dashboard
6. Deploy!

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Admin Endpoints (Require Authentication)

- `POST /api/auth/login` - Login and get JWT token
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Project Structure

Each project object has:

```json
{
  "id": "1234567890",
  "title": "Project Title",
  "description": "Project description",
  "image": "https://example.com/image.jpg",
  "link": "https://project-link.com",
  "tags": ["React", "JavaScript"],
  "createdAt": "2026-05-05T10:00:00.000Z",
  "updatedAt": "2026-05-05T10:00:00.000Z"
}
```

## Customization

- **Styles**: Edit `public/css/styles.css` to customize appearance
- **No image**: Projects without images show a placeholder
- **Tags**: Add any tags to categorize your projects
- **Links**: Optional project links

## Security Notes

- Admin credentials are stored as environment variables
- JWT tokens expire after 24 hours
- Passwords are hashed with bcrypt
- Tokens are stored in browser localStorage (only use HTTPS in production)

## Future Enhancements

- Add database (MongoDB, PostgreSQL)
- Add image upload functionality
- Add categories/filtering
- Add search functionality
- Add project detail pages
- Add analytics
- Add comments/ratings

## Support

For issues or questions, check the code comments or review the API endpoints.

---

**Domain**: www.dalvinheyninck.be
