import { api, auth } from './api.js';
import { loadGallery } from './gallery.js';

let currentEditingId = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
  if (auth.isAuthenticated()) {
    showDashboard();
    loadProjects();
  }

  // Login form
  document.getElementById('login-form').addEventListener('submit', handleLogin);

  // Logout button
  document.getElementById('logout-btn').addEventListener('click', handleLogout);

  // Project form
  document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);

  // Cancel button
  document.getElementById('cancel-btn').addEventListener('click', resetForm);

  // Sidebar menu
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.section + '-section').classList.add('active');
    });
  });
});

// Login handler
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');

  try {
    const { token } = await api.login(email, password);
    auth.setToken(token);
    document.getElementById('user-email').textContent = email;
    showDashboard();
    loadProjects();
  } catch (error) {
    errorEl.textContent = error.message;
  }
}

// Logout handler
function handleLogout() {
  auth.clearToken();
  document.getElementById('login-form').reset();
  showLogin();
}

// Show/hide sections
function showLogin() {
  document.getElementById('login-container').style.display = 'block';
  document.getElementById('dashboard-container').style.display = 'none';
}

function showDashboard() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('dashboard-container').style.display = 'grid';
}

// Load all projects
async function loadProjects() {
  try {
    const projects = await api.getProjects();
    const list = document.getElementById('projects-list');

    if (projects.length === 0) {
      list.innerHTML = '<p class="no-projects">No projects yet. Create one to get started!</p>';
      return;
    }

    list.innerHTML = projects.map(project => `
      <div class="project-card">
        <div class="project-header">
          <h3>${project.title}</h3>
          <div class="project-actions">
            <button class="btn btn-sm btn-secondary" onclick="editProject('${project.id}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">Delete</button>
          </div>
        </div>
        <p>${project.description}</p>
        ${project.image ? `<p><strong>Image:</strong> <a href="${project.image}" target="_blank">${project.image.substring(0, 50)}...</a></p>` : ''}
        ${project.link ? `<p><strong>Link:</strong> <a href="${project.link}" target="_blank">${project.link}</a></p>` : ''}
        ${project.tags.length > 0 ? `<p><strong>Tags:</strong> ${project.tags.join(', ')}</p>` : ''}
        <p class="meta">Created: ${new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load projects:', error);
    document.getElementById('projects-list').innerHTML = '<p class="error">Failed to load projects</p>';
  }
}

// Edit project
window.editProject = async (id) => {
  try {
    const project = await api.getProject(id);
    currentEditingId = id;

    document.getElementById('project-id').value = id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-tags').value = project.tags.join(', ');

    document.getElementById('submit-btn').textContent = 'Update Project';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    // Switch to edit section
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-section="add-project"]').classList.add('active');
    document.getElementById('add-project-section').classList.add('active');
  } catch (error) {
    alert('Failed to load project: ' + error.message);
  }
};

// Delete project
window.deleteProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return;

  try {
    await api.deleteProject(id, auth.getToken());
    loadProjects();
    await loadGallery(); // Refresh gallery
  } catch (error) {
    alert('Failed to delete project: ' + error.message);
  }
};

// Handle project form submit
async function handleProjectSubmit(e) {
  e.preventDefault();

  const projectData = {
    title: document.getElementById('project-title').value,
    description: document.getElementById('project-description').value,
    image: document.getElementById('project-image').value,
    link: document.getElementById('project-link').value,
    tags: document.getElementById('project-tags').value
      .split(',')
      .map(t => t.trim())
      .filter(t => t)
  };

  const messageEl = document.getElementById('form-message');

  try {
    if (currentEditingId) {
      await api.updateProject(currentEditingId, projectData, auth.getToken());
      messageEl.textContent = 'Project updated successfully!';
      messageEl.className = 'success';
    } else {
      await api.createProject(projectData, auth.getToken());
      messageEl.textContent = 'Project created successfully!';
      messageEl.className = 'success';
    }

    setTimeout(() => {
      resetForm();
      loadProjects();
      loadGallery(); // Refresh gallery
    }, 1500);
  } catch (error) {
    messageEl.textContent = 'Error: ' + error.message;
    messageEl.className = 'error';
  }
}

// Reset form
function resetForm() {
  document.getElementById('project-form').reset();
  document.getElementById('project-id').value = '';
  document.getElementById('submit-btn').textContent = 'Create Project';
  document.getElementById('cancel-btn').style.display = 'none';
  document.getElementById('form-message').textContent = '';
  currentEditingId = null;
}
