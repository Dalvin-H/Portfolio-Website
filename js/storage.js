/**
 * Client-side Storage Module
 * Manages projects using localStorage with JSON data support
 */

const STORAGE_KEY = 'portfolio_projects';
const PASSWORD_KEY = 'portfolio_admin_password';

export const storage = {
  // Projects
  getProjects: function() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  },

  saveProjects: function(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
      return false;
    }
  },

  getProject: function(id) {
    const projects = this.getProjects();
    return projects.find(p => p.id === id);
  },

  addProject: function(project) {
    const projects = this.getProjects();
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  updateProject: function(id, updates) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveProjects(projects);
    return projects[index];
  },

  deleteProject: function(id) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    const deleted = projects.splice(index, 1);
    this.saveProjects(projects);
    return deleted[0];
  },

  // Authentication
  setAdminPassword: function(password) {
    localStorage.setItem(PASSWORD_KEY, password);
  },

  getAdminPassword: function() {
    return localStorage.getItem(PASSWORD_KEY) || '';
  },

  verifyPassword: function(password) {
    return password === this.getAdminPassword();
  },

  // Import/Export
  exportData: function() {
    const projects = this.getProjects();
    return JSON.stringify({ projects }, null, 2);
  },

  importData: function(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.projects)) {
        this.saveProjects(data.projects);
        return true;
      }
      throw new Error('Invalid format: projects array not found');
    } catch (error) {
      console.error('Import error:', error);
      return false;
    }
  },

  // Initialization with sample data
  initializeWithSampleData: function() {
    const existing = this.getProjects();
    if (existing.length === 0) {
      // Load sample projects from projects.json if available
      fetch('projects.json')
        .then(res => res.json())
        .then(data => {
          if (data.projects && Array.isArray(data.projects)) {
            this.saveProjects(data.projects);
            // Trigger refresh event
            window.dispatchEvent(new Event('projects-updated'));
          }
        })
        .catch(() => {
          // No projects.json file, that's okay
          console.log('No projects.json found, starting fresh');
        });
    }
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  storage.initializeWithSampleData();
});

// Make it available globally for debugging
window.portfolioStorage = storage;
