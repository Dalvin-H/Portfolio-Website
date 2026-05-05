import { storage } from './storage.js';

let currentEditingId = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();

  // Login form
  document.getElementById('login-form').addEventListener('submit', handleLogin);

  // First setup button
  document.getElementById('first-setup-btn').addEventListener('click', handleFirstSetup);

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

  // Export button
  document.getElementById('export-btn').addEventListener('click', handleExport);

  // Import button
  document.getElementById('import-btn').addEventListener('click', handleImport);

  // Change password button
  document.getElementById('change-password-btn').addEventListener('click', handleChangePassword);

  // Load initial data
  loadProjects();
});

// Check if user is logged in
function checkAuthStatus() {
  const password = sessionStorage.getItem('portfolio_admin_logged_in');
  const adminPassword = storage.getAdminPassword();

  if (password) {
    showDashboard();
  } else if (!adminPassword) {
    // First time - no password set yet, show setup
    showLoginWithSetup();
  } else {
    // Password exists, show normal login
    showLogin();
  }
}

// Show login with first-time setup option
function showLoginWithSetup() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('dashboard-container').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'none';
  
  // Show the first setup section
  document.getElementById('first-setup-section').style.display = 'block';
  document.getElementById('login-help-text').textContent = 'First time? Set your admin password below';
  document.getElementById('login-form').style.display = 'none';
}

// Handle first setup
function handleFirstSetup() {
  const password = document.getElementById('first-setup-password').value;
  const messageEl = document.getElementById('setup-message');

  if (!password) {
    messageEl.textContent = 'Please enter a password';
    messageEl.className = 'error';
    return;
  }

  if (password.length < 4) {
    messageEl.textContent = 'Password must be at least 4 characters';
    messageEl.className = 'error';
    return;
  }

  storage.setAdminPassword(password);
  messageEl.textContent = 'Password set! Logging you in...';
  messageEl.className = 'success';

  // Auto-login
  setTimeout(() => {
    sessionStorage.setItem('portfolio_admin_logged_in', 'true');
    document.getElementById('admin-status').textContent = 'Logged in';
    showDashboard();
    loadProjects();
  }, 1000);
}

// Login handler
function handleLogin(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const adminPassword = storage.getAdminPassword();
  const errorEl = document.getElementById('login-error');

  if (!adminPassword) {
    errorEl.textContent = 'Admin password not set! Use setup to create one first.';
    return;
  }

  if (password === adminPassword) {
    sessionStorage.setItem('portfolio_admin_logged_in', 'true');
    document.getElementById('admin-status').textContent = 'Logged in';
    showDashboard();
    loadProjects();
  } else {
    errorEl.textContent = 'Invalid password';
  }
}

// Logout handler
function handleLogout() {
  sessionStorage.removeItem('portfolio_admin_logged_in');
  document.getElementById('login-form').reset();
  document.getElementById('admin-status').textContent = 'Not logged in';
  showLogin();
}

// Show/hide sections
function showLogin() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('dashboard-container').style.display = 'none';
  document.getElementById('logout-btn').style.display = 'none';
  
  // Show normal login, hide setup
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('first-setup-section').style.display = 'none';
  document.getElementById('login-help-text').textContent = 'Enter your admin password to manage projects';
}

function showDashboard() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('dashboard-container').style.display = 'grid';
  document.getElementById('logout-btn').style.display = 'inline-block';
}

// Load all projects
function loadProjects() {
  try {
    const projects = storage.getProjects();
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
            <button class="btn btn-sm btn-secondary" onclick="window.editProject('${project.id}')">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="window.deleteProject('${project.id}')">Delete</button>
          </div>
        </div>
        <p>${project.description}</p>
        ${project.image ? `<p><strong>Image:</strong> <a href="${project.image}" target="_blank" rel="noopener">${project.image.substring(0, 50)}...</a></p>` : ''}
        ${project.link ? `<p><strong>Link:</strong> <a href="${project.link}" target="_blank" rel="noopener">${project.link}</a></p>` : ''}
        ${project.tags && project.tags.length > 0 ? `<p><strong>Tags:</strong> ${project.tags.join(', ')}</p>` : ''}
        <p class="meta">Created: ${new Date(project.createdAt).toLocaleDateString()}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load projects:', error);
    document.getElementById('projects-list').innerHTML = '<p class="error">Failed to load projects</p>';
  }
}

// Edit project
window.editProject = (id) => {
  try {
    const project = storage.getProject(id);
    if (!project) {
      alert('Project not found');
      return;
    }

    currentEditingId = id;

    document.getElementById('project-id').value = id;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-image').value = project.image || '';
    document.getElementById('project-link').value = project.link || '';
    document.getElementById('project-tags').value = project.tags ? project.tags.join(', ') : '';

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
window.deleteProject = (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return;

  try {
    storage.deleteProject(id);
    loadProjects();
    // Notify gallery to refresh
    window.dispatchEvent(new Event('projects-updated'));
  } catch (error) {
    alert('Failed to delete project: ' + error.message);
  }
};

// Handle project form submit
function handleProjectSubmit(e) {
  e.preventDefault();

  const projectData = {
    title: document.getElementById('project-title').value,
    description: document.getElementById('project-description').value,
    image: document.getElementById('project-image').value || '',
    link: document.getElementById('project-link').value || '',
    tags: document.getElementById('project-tags').value
      .split(',')
      .map(t => t.trim())
      .filter(t => t)
  };

  const messageEl = document.getElementById('form-message');

  try {
    if (currentEditingId) {
      storage.updateProject(currentEditingId, projectData);
      messageEl.textContent = 'Project updated successfully!';
      messageEl.className = 'success';
    } else {
      storage.addProject(projectData);
      messageEl.textContent = 'Project created successfully!';
      messageEl.className = 'success';
    }

    setTimeout(() => {
      resetForm();
      loadProjects();
      window.dispatchEvent(new Event('projects-updated'));
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

// Export projects
function handleExport() {
  const data = storage.exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Import projects
function handleImport() {
  const jsonText = document.getElementById('import-data').value.trim();
  const messageEl = document.getElementById('import-message');

  if (!jsonText) {
    messageEl.textContent = 'Please paste JSON data';
    messageEl.className = 'error';
    return;
  }

  if (storage.importData(jsonText)) {
    messageEl.textContent = 'Projects imported successfully!';
    messageEl.className = 'success';
    document.getElementById('import-data').value = '';
    loadProjects();
    window.dispatchEvent(new Event('projects-updated'));
  } else {
    messageEl.textContent = 'Failed to import: Invalid JSON format';
    messageEl.className = 'error';
  }
}

// Change password
function handleChangePassword() {
  const newPassword = document.getElementById('new-password').value;
  const messageEl = document.getElementById('password-message');

  if (!newPassword) {
    messageEl.textContent = 'Please enter a password';
    messageEl.className = 'error';
    return;
  }

  if (newPassword.length < 4) {
    messageEl.textContent = 'Password must be at least 4 characters';
    messageEl.className = 'error';
    return;
  }

  storage.setAdminPassword(newPassword);
  messageEl.textContent = 'Password changed successfully! Log in again to use the new password.';
  messageEl.className = 'success';
  document.getElementById('new-password').value = '';
  
  setTimeout(() => {
    handleLogout();
  }, 2000);
}
