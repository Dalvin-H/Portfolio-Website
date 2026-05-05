import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Data file path
const dataDir = path.join(__dirname, '../data');
const projectsFile = path.join(dataDir, 'projects.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize projects file if it doesn't exist
if (!fs.existsSync(projectsFile)) {
  fs.writeFileSync(projectsFile, JSON.stringify({ projects: [] }, null, 2));
}

// Helper functions
const readProjects = () => {
  try {
    return JSON.parse(fs.readFileSync(projectsFile, 'utf-8'));
  } catch {
    return { projects: [] };
  }
};

const writeProjects = (data) => {
  fs.writeFileSync(projectsFile, JSON.stringify(data, null, 2));
};

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch {
    return null;
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = decoded;
  next();
};

// Routes

// Public: Get all projects
app.get('/api/projects', (req, res) => {
  const data = readProjects();
  res.json(data.projects);
});

// Public: Get single project
app.get('/api/projects/:id', (req, res) => {
  const data = readProjects();
  const project = data.projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Admin: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return res.status(500).json({ error: 'Admin credentials not configured' });
  }

  if (email !== adminEmail) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  bcrypt.compare(password, adminPasswordHash, (err, isMatch) => {
    if (err || !isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(email);
    res.json({ token, email });
  });
});

// Admin: Create project
app.post('/api/projects', authMiddleware, (req, res) => {
  const { title, description, image, link, tags } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }

  const data = readProjects();
  const newProject = {
    id: Date.now().toString(),
    title,
    description,
    image: image || '',
    link: link || '',
    tags: tags || [],
    createdAt: new Date().toISOString()
  };

  data.projects.push(newProject);
  writeProjects(data);

  res.status(201).json(newProject);
});

// Admin: Update project
app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const { title, description, image, link, tags } = req.body;
  const data = readProjects();
  const projectIndex = data.projects.findIndex(p => p.id === req.params.id);

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const updated = {
    ...data.projects[projectIndex],
    title: title || data.projects[projectIndex].title,
    description: description || data.projects[projectIndex].description,
    image: image !== undefined ? image : data.projects[projectIndex].image,
    link: link !== undefined ? link : data.projects[projectIndex].link,
    tags: tags || data.projects[projectIndex].tags,
    updatedAt: new Date().toISOString()
  };

  data.projects[projectIndex] = updated;
  writeProjects(data);

  res.json(updated);
});

// Admin: Delete project
app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  const data = readProjects();
  const projectIndex = data.projects.findIndex(p => p.id === req.params.id);

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const deleted = data.projects.splice(projectIndex, 1);
  writeProjects(data);

  res.json(deleted[0]);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
