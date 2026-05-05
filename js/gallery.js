// Load projects from projects.json and generate gallery tiles
async function loadGallery() {
  try {
    const response = await fetch('/projects.json');
    const projects = await response.json();
    const gallery = document.getElementById('gallery');

    gallery.innerHTML = projects.map(project => `
      <a href="${project.page}" class="tile">
        <div class="tile-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="tile-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    document.getElementById('gallery').innerHTML = '<p>Error loading projects</p>';
  }
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadGallery);
