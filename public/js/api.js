// API Client Module
const API_BASE = '/api';

export const api = {
  // Projects
  getProjects: async () => {
    const res = await fetch(`${API_BASE}/projects`);
    return res.json();
  },

  getProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  createProject: async (project, token) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create project');
    }
    return res.json();
  },

  updateProject: async (id, project, token) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(project)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update project');
    }
    return res.json();
  },

  deleteProject: async (id, token) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete project');
    }
    return res.json();
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    return res.json();
  }
};

// Auth helper
export const auth = {
  setToken: (token) => {
    localStorage.setItem('portfolio_token', token);
  },

  getToken: () => {
    return localStorage.getItem('portfolio_token');
  },

  clearToken: () => {
    localStorage.removeItem('portfolio_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('portfolio_token');
  }
};
