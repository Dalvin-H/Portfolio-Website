// Load projects from projects.json and generate gallery tiles with category tabs
let allProjects = [];
let activeCategory = 'all';

async function loadGallery() {
  try {
    const response = await fetch('./projects.json');
    allProjects = await response.json();
    
    // Get unique categories
    const categories = ['all', ...new Set(allProjects.map(p => p.category))];
    
    // Generate tabs
    const tabsContainer = document.getElementById('tabs');
    tabsContainer.innerHTML = categories.map(cat => `
      <button class="tab ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
        ${cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </button>
    `).join('');
    
    // Add click handlers to tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeCategory = tab.dataset.category;
        renderGallery();
      });
    });
    
    renderGallery();
  } catch (error) {
    console.error('Error loading projects:', error);
    const gallery = document.getElementById('gallery-grid');
    if (gallery) {
      gallery.innerHTML = '<p>Error loading projects</p>';
    }
  }
}

function renderGallery() {
  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);
  
  const gallery = document.getElementById('gallery-grid');
  gallery.innerHTML = filteredProjects.map(project => `
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
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadGallery);
