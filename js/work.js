const categoryFilters = [
  { key: 'all', label: 'All' },
  { key: 'digital', label: 'Digital' },
  { key: 'physical', label: 'Physical' },
  { key: 'practice', label: 'Practice (CAD)' },
  { key: 'research', label: 'Research' },
  { key: 'client', label: 'Client' },
  { key: 'school', label: 'School' }
];

const detailFilters = [
  'programming',
  'unity',
  'xr',
  'web',
  'electronics',
  'esp32',
  'arduino',
  'pcb-design',
  'cad',
  'fusion-360',
  '3d-printing',
  'laser-cutting',
  'cnc',
  'welding',
  'painting',
  'ai',
  'industrial'
];

const categoryFilterMap = {
  all: [...detailFilters],
  digital: ['programming', 'unity', 'xr', 'web', 'ai'],
  physical: [
    'electronics',
    'esp32',
    'arduino',
    'pcb-design',
    'cad',
    'fusion-360',
    '3d-printing',
    'laser-cutting',
    'cnc',
    'welding',
    'painting',
    'industrial'
  ],
  practice: ['programming', 'unity', 'xr', 'web', 'ai'],
  research: ['programming', 'unity', 'xr', 'web', 'ai', 'electronics', 'industrial'],
  client: ['programming', 'web', 'unity', 'xr', 'ai', 'industrial', 'cad'],
  school: ['programming', 'unity', 'xr', 'web', 'electronics', 'arduino', 'cad', '3d-printing', 'ai']
};

const projects = [
  {
    title: 'BitPrint',
    description: 'Compact educational 3D printer built completely from scratch.',
    category: 'physical',
    tags: ['electronics', 'esp32', 'cad', 'fusion-360', '3d-printing', 'industrial'],
    image: '/images/project-1/project-1-hero.png',
    page: 'projects/project-1.html',
    size: 'tall'
  },
  {
    title: 'VR Boiler Simulation',
    description: 'A real-time boiler training simulator for process education.',
    category: 'school',
    tags: ['unity', 'xr', 'programming'],
    image: '/images/project-13/project-13-hero.png',
    page: 'under-construction.html',
    size: 'wide'
  },
  {
    title: 'Industrial AR Product',
    description: 'AR-assisted maintenance guidance for industrial assemblies.',
    category: 'client',
    tags: ['xr', 'unity', 'industrial'],
    image: '/images/project-10/project-10-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Custom ESP32 Control Board',
    description: 'Embedded control board for sensor-rich fabrication systems.',
    category: 'practice',
    tags: ['electronics', 'esp32', 'pcb-design', 'programming'],
    image: '/images/project-14/project-14-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Autonomous Rover',
    description: 'Multi-sensor navigation platform with rapid prototyping workflow.',
    category: 'school',
    tags: ['arduino', 'programming', 'electronics', '3d-printing'],
    image: '/images/project-12/project-12-hero.jpg',
    page: 'under-construction.html',
    size: 'tall'
  },
  {
    title: 'Laser Cut Lamp',
    description: 'Parametric lamp design assembled from laser-cut components.',
    category: 'physical',
    tags: ['laser-cutting', 'cad', 'fusion-360', 'industrial'],
    image: '/images/project-11/project-11-hero.jpg',
    page: 'projects/project-4.html',
    size: 'normal'
  },
  {
    title: 'Tube Frame Construction',
    description: 'Welded tube-frame study for rigid lightweight structures.',
    category: 'practice',
    tags: ['welding', 'industrial', 'cad'],
    image: '/images/project-15/project-15-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Data Dashboard',
    description: 'Operational dashboard for machine metrics and diagnostics.',
    category: 'digital',
    tags: ['web', 'programming', 'ai'],
    image: '/images/project-5/project-5-hero.png',
    page: 'projects/project-5.html',
    size: 'wide'
  },
  {
    title: 'Wearable Device',
    description: 'Human-centered prototype combining embedded sensing and form.',
    category: 'client',
    tags: ['electronics', 'pcb-design', '3d-printing', 'industrial'],
    image: '/images/project-16/project-16-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Interactive Web Portfolio',
    description: 'High-performance portfolio platform with design system thinking.',
    category: 'digital',
    tags: ['web', 'programming'],
    image: '/images/project-2/project-2-hero.png',
    page: 'projects/project-2.html',
    size: 'normal'
  },
  {
    title: 'Fabrication Study Model',
    description: 'CNC and paint finish study for material behavior exploration.',
    category: 'physical',
    tags: ['cnc', 'painting', 'cad'],
    image: '/images/project-9/project-9-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Spatial XR Interaction',
    description: 'Rapid prototyping of intuitive spatial interaction patterns.',
    category: 'school',
    tags: ['xr', 'unity', 'ai'],
    image: '/images/project-3/project-3-hero.png',
    page: 'projects/project-3.html',
    size: 'normal'
  },
  {
    title: 'Factory Interface Concept',
    description: 'Placeholder tile for an upcoming industrial UI case study.',
    category: 'digital',
    tags: ['web', 'programming', 'industrial'],
    image: '/images/project-10/project-10-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Embedded Sensor Rig',
    description: 'Placeholder tile for a modular electronics platform build.',
    category: 'school',
    tags: ['electronics', 'esp32', 'arduino'],
    image: '/images/project-14/project-14-hero.jpg',
    page: 'under-construction.html',
    size: 'tall'
  },
  {
    title: 'XR Maintenance Trainer',
    description: 'Placeholder tile for hands-on training in mixed reality.',
    category: 'client',
    tags: ['xr', 'unity', 'programming'],
    image: '/images/project-13/project-13-hero.png',
    page: 'under-construction.html',
    size: 'wide'
  },
  {
    title: 'Parametric Furniture Study',
    description: 'Placeholder tile for CNC and Fusion-driven furniture forms.',
    category: 'physical',
    tags: ['cad', 'fusion-360', 'cnc'],
    image: '/images/project-15/project-15-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Wearable Health Node',
    description: 'Placeholder tile for a wearable embedded sensing prototype.',
    category: 'research',
    tags: ['electronics', 'pcb-design', 'ai'],
    image: '/images/project-16/project-16-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Kinetic Light Assembly',
    description: 'Placeholder tile for an interactive light sculpture system.',
    category: 'physical',
    tags: ['laser-cutting', '3d-printing', 'industrial'],
    image: '/images/project-11/project-11-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Data Ops Command Board',
    description: 'Placeholder tile for a real-time operations dashboard.',
    category: 'digital',
    tags: ['web', 'programming', 'ai'],
    image: '/images/project-5/project-5-hero.png',
    page: 'under-construction.html',
    size: 'wide'
  },
  {
    title: 'Prototype Paint Finishes',
    description: 'Placeholder tile for material and finish exploration tests.',
    category: 'practice',
    tags: ['painting', 'industrial', 'cad'],
    image: '/images/project-9/project-9-hero.jpg',
    page: 'under-construction.html',
    size: 'normal'
  },
  {
    title: 'Smart Fixture Toolkit',
    description: 'Placeholder tile for tooling and precision fixture concepts.',
    category: 'client',
    tags: ['electronics', 'cad', 'welding'],
    image: '/images/project-12/project-12-hero.jpg',
    page: 'under-construction.html',
    size: 'tall'
  },
  {
    title: 'Digital Twin Sandbox',
    description: 'Placeholder tile for connected systems and simulation workflows.',
    category: 'research',
    tags: ['ai', 'web', 'industrial'],
    image: '/images/project-2/project-2-hero.png',
    page: 'under-construction.html',
    size: 'normal'
  }
];

const state = {
  category: 'all',
  filters: new Set(),
  page: 1,
  pageSize: 32,
  filtered: [...projects]
};

// Fixed 32-slot pattern for a stable mosaic: mostly small tiles with a few larger accents.
const TILE_LAYOUT_PATTERN = [
  'large', 'small', 'small', 'wide', 'small', 'small', 'wide', 'small',
  'large', 'small', 'small', 'small', 'wide', 'small', 'small', 'small',
  'small', 'large', 'small', 'small', 'wide', 'small', 'small', 'wide',
  'small', 'small', 'large', 'small', 'small', 'wide', 'small', 'small'
];

const grid = document.getElementById('work-grid');
const categoryBar = document.getElementById('category-bar');
const detailFilterBar = document.getElementById('detail-filter-bar');
const paginationPages = document.getElementById('pagination-pages');
const previousButton = document.getElementById('pagination-prev');
const nextButton = document.getElementById('pagination-next');

function toLabel(key) {
  return key
    .split('-')
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

function getVisibleFilters() {
  return categoryFilterMap[state.category] || detailFilters;
}

function pruneUnavailableFilters() {
  const visibleFilters = new Set(getVisibleFilters());
  state.filters.forEach(filter => {
    if (!visibleFilters.has(filter)) {
      state.filters.delete(filter);
    }
  });
}

function cardClass(index) {
  const slotSize = TILE_LAYOUT_PATTERN[index % TILE_LAYOUT_PATTERN.length];
  if (slotSize === 'large') {
    return 'work-tile tile-large';
  }
  if (slotSize === 'wide') {
    return 'work-tile tile-wide';
  }
  return 'work-tile tile-small';
}

function applyFilterState() {
  state.filtered = projects.filter(project => {
    const categoryMatch = state.category === 'all' || project.category === state.category;
    if (!categoryMatch) {
      return false;
    }

    if (state.filters.size === 0) {
      return true;
    }

    return [...state.filters].every(filter => project.tags.includes(filter));
  });

  const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  if (state.page > totalPages) {
    state.page = totalPages;
  }
}

function renderCategoryButtons() {
  categoryBar.innerHTML = categoryFilters.map(item => {
    const isActive = item.key === state.category;
    return `
      <button
        type="button"
        class="category-button ${isActive ? 'is-active' : ''}"
        data-category="${item.key}"
        aria-pressed="${isActive}"
      >
        ${item.label}
      </button>
    `;
  }).join('');

  categoryBar.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      state.category = button.dataset.category;
      pruneUnavailableFilters();
      state.page = 1;
      animateAndRender();
    });
  });
}

function renderDetailButtons() {
  const visibleFilters = getVisibleFilters();

  detailFilterBar.innerHTML = visibleFilters.map(key => {
    const isActive = state.filters.has(key);
    return `
      <button
        type="button"
        class="detail-filter-button ${isActive ? 'is-active' : ''}"
        data-detail="${key}"
        aria-pressed="${isActive}"
      >
        ${toLabel(key)}
      </button>
    `;
  }).join('');

  detailFilterBar.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.detail;
      if (state.filters.has(key)) {
        state.filters.delete(key);
      } else {
        state.filters.add(key);
      }
      state.page = 1;
      animateAndRender();
    });
  });
}

function renderPagination(totalPages) {
  paginationPages.innerHTML = '';

  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pagination-btn ${state.page === page ? 'is-active' : ''}`;
    button.textContent = String(page);
    button.setAttribute('aria-label', `Go to page ${page}`);
    button.addEventListener('click', () => {
      state.page = page;
      animateAndRender();
    });
    paginationPages.append(button);
  }

  previousButton.disabled = state.page <= 1;
  nextButton.disabled = state.page >= totalPages;
}

function renderProjects() {
  applyFilterState();
  renderCategoryButtons();
  renderDetailButtons();

  const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
  const startIndex = (state.page - 1) * state.pageSize;
  const pageItems = state.filtered.slice(startIndex, startIndex + state.pageSize);

  if (pageItems.length === 0) {
    grid.innerHTML = '<p class="work-empty"><strong>No projects found.</strong> Remove a filter or switch categories.</p>';
    renderPagination(totalPages);
    return;
  }

  grid.innerHTML = pageItems.map((project, index) => `
    <article class="${cardClass(index)}" style="--tile-delay:${index * 70}ms">
      <a href="${project.page}" class="work-tile-link" aria-label="Open ${project.title}">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="work-overlay">
          <p class="work-overlay-tag">${toLabel(project.category)}</p>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <span class="work-overlay-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
      <p class="work-tile-meta">${project.tags.slice(0, 3).map(toLabel).join(' · ')}</p>
    </article>
  `).join('');

  renderPagination(totalPages);
  observeFreshCards();
}

function animateAndRender() {
  grid.classList.add('is-updating');
  window.setTimeout(() => {
    renderProjects();
    grid.classList.remove('is-updating');
  }, 140);
}

function setupPaginationButtons() {
  previousButton.addEventListener('click', () => {
    if (state.page > 1) {
      state.page -= 1;
      animateAndRender();
    }
  });

  nextButton.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
    if (state.page < totalPages) {
      state.page += 1;
      animateAndRender();
    }
  });
}

function setupNavbarEffects() {
  const topbar = document.getElementById('work-topbar');
  const menuToggle = document.getElementById('work-menu-toggle');
  const nav = document.getElementById('work-nav');

  window.addEventListener('scroll', () => {
    topbar.classList.toggle('is-scrolled', window.scrollY > 16);
  });

  menuToggle.addEventListener('click', () => {
    const next = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', next);
    menuToggle.setAttribute('aria-expanded', String(next));
  });
}

function setupThemeToggles() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  function syncDarkModeButton() {
    const isDarkMode = document.body.classList.contains('work-dark-mode');
    const nextModeLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    darkModeToggle.setAttribute('aria-pressed', String(isDarkMode));
    darkModeToggle.setAttribute('aria-label', nextModeLabel);
    darkModeToggle.setAttribute('title', nextModeLabel);
    darkModeToggle.textContent = isDarkMode ? '☀' : '☾';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('work-dark-mode');
    syncDarkModeButton();
  });

  syncDarkModeButton();
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.01,
  rootMargin: '0px 0px 240px 0px'
});

function setupRevealAnimations() {
  document.querySelectorAll('.reveal').forEach(section => {
    revealObserver.observe(section);
  });
}

function observeFreshCards() {
  document.querySelectorAll('.work-tile').forEach(card => {
    revealObserver.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarEffects();
  setupThemeToggles();
  setupPaginationButtons();
  setupRevealAnimations();
  renderProjects();
});
