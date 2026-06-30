const categoryFilters = [
  { key: 'all', label: 'All projects' },
  { key: 'own-projects', label: 'Own projects' },
  { key: 'college-assignments', label: 'College assignments' },
  { key: 'cad-exercises', label: 'CAD exercises' }
];

const detailFilters = [
  { key: 'digital', label: 'Digital' },
  { key: 'physical', label: 'Fysical' },
  { key: 'electrical', label: 'Electrical' },
  { key: '3d-printer', label: '3D-printer' },
  { key: 'lasercutter', label: 'Lasercutter' },
  { key: 'cnc', label: 'CNC' },
  { key: 'pcb', label: 'PCB' },
  { key: 'programming', label: 'Programming' },
  { key: 'design', label: 'Design' }
];

let allProjects = [];
let activeCategory = 'all';
let activeDetailFilters = [];

function formatCategoryLabel(category) {
  const filter = categoryFilters.find(item => item.key === category);
  return filter ? filter.label : category;
}

function buildFallbackImage(title, category) {
  const palette = {
    'own-projects': ['#f1f4f0', '#8f9c93'],
    'college-assignments': ['#e5eadf', '#7c867f'],
    'cad-exercises': ['#dde3db', '#728076'],
    default: ['#edf0ec', '#879088']
  };

  const colors = palette[category] || palette.default;
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0c0d0c" />
          <stop offset="100%" stop-color="#171917" />
        </linearGradient>
        <radialGradient id="glow" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.85" />
          <stop offset="60%" stop-color="${colors[1]}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${colors[1]}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="url(#bg)" />
      <circle cx="260" cy="270" r="240" fill="url(#glow)" />
      <circle cx="640" cy="630" r="200" fill="${colors[1]}" fill-opacity="0.16" />
      <path d="M120 610 C250 500, 350 700, 520 560 S700 450, 760 520" fill="none" stroke="${colors[0]}" stroke-width="6" stroke-opacity="0.28" />
      <path d="M70 190 C200 120, 290 130, 410 180 S610 300, 740 230" fill="none" stroke="${colors[1]}" stroke-width="4" stroke-opacity="0.24" />
      <text x="80" y="685" fill="#f4f7f3" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="700" letter-spacing="4">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderFilters() {
  const filterContainer = document.getElementById('category-bar');
  if (!filterContainer) {
    return;
  }

  filterContainer.innerHTML = categoryFilters.map(filter => `
    <button type="button" class="category-button ${filter.key === activeCategory ? 'is-active' : ''}" data-category="${filter.key}">
      ${filter.label}
    </button>
  `).join('');

  filterContainer.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProjects();
    });
  });

  const detailContainer = document.getElementById('detail-filter-bar');
  if (!detailContainer) {
    return;
  }

  detailContainer.innerHTML = detailFilters.map(filter => `
    <button type="button" class="detail-filter-button ${activeDetailFilters.includes(filter.key) ? 'is-active' : ''}" data-detail="${filter.key}">
      ${filter.label}
    </button>
  `).join('');

  detailContainer.querySelectorAll('.detail-filter-button').forEach(button => {
    button.addEventListener('click', () => {
      const selectedKey = button.dataset.detail;

      if (selectedKey === 'all') {
        activeDetailFilters = [];
      } else if (activeDetailFilters.includes(selectedKey)) {
        activeDetailFilters = activeDetailFilters.filter(key => key !== selectedKey);
      } else {
        activeDetailFilters = [...activeDetailFilters, selectedKey];
      }

      renderFilters();
      renderProjects();
    });
  });
}

function renderProjects() {
  const grid = document.getElementById('work-grid');
  if (!grid) {
    return;
  }

  const projects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.workCategory === activeCategory;
    const projectTags = Array.isArray(project.tags) ? project.tags : [];
    const matchesDetailFilters = activeDetailFilters.length === 0
      || activeDetailFilters.some(filterKey => projectTags.includes(filterKey));

    return matchesCategory && matchesDetailFilters;
  });

  if (projects.length === 0) {
    grid.innerHTML = '<p class="work-empty"><strong>No projects found.</strong> Try a different category or remove some detail filters.</p>';
    return;
  }

  grid.innerHTML = projects.map(project => {
    const fallbackImage = buildFallbackImage(project.title, project.workCategory);
    const imageSource = project.image || fallbackImage;
    const categoryLabel = formatCategoryLabel(project.workCategory);
    const detailLabels = (Array.isArray(project.tags) ? project.tags : [])
      .map(tag => detailFilters.find(filter => filter.key === tag)?.label || tag)
      .slice(0, 3)
      .join(' · ');

    return `
      <a class="work-tile" href="${project.page}" aria-label="Open ${project.title}">
        <img
          src="${imageSource}"
          alt="${project.title} teaser image"
          loading="lazy"
          data-fallback="${fallbackImage}"
        >
        <div class="work-overlay">
          <p class="work-overlay-tag">${categoryLabel}</p>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${detailLabels ? `<p class="work-overlay-meta">${detailLabels}</p>` : ''}
        </div>
      </a>
    `;
  }).join('');

  grid.querySelectorAll('img[data-fallback]').forEach(image => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.src !== fallback) {
        image.src = fallback;
      }
    });
  });
}

async function loadProjects() {
  try {
    const response = await fetch('./projects.json');
    const data = await response.json();
    allProjects = Array.isArray(data) ? data : data.projects || [];
    allProjects = allProjects.map(project => ({
      ...project,
      workCategory: project.workCategory || 'own-projects',
      tags: Array.isArray(project.tags) ? project.tags : []
    }));

    renderFilters();
    renderProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
    const grid = document.getElementById('work-grid');
    if (grid) {
      grid.innerHTML = '<p class="work-empty">Unable to load projects.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
