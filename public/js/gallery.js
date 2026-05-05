import { api } from './api.js';

// Load and display projects gallery
export async function loadGallery() {
  try {
    const projects = await api.getProjects();
    const gallery = document.getElementById('gallery');

    if (projects.length === 0) {
      gallery.innerHTML = '<p class="no-projects">No projects yet. Check back soon!</p>';
      return;
    }

    gallery.innerHTML = projects.map(project => `
      <div class="project-tile">
        ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : '<div class="project-placeholder">No Image</div>'}
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.tags.length > 0 ? `
            <div class="tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
          ${project.link ? `<a href="${project.link}" target="_blank" class="btn btn-primary">View Project</a>` : ''}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load projects:', error);
    document.getElementById('gallery').innerHTML = '<p class="error">Failed to load projects</p>';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadGallery);
