const categoryFilters = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Featured' },
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
  'ai'
];

const categoryFilterMap = {
  all: [...detailFilters],
  featured: [...detailFilters],
  digital: ['programming', 'unity', 'xr', 'web', 'ai', '3d-development', '3d-modeling'],
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
    'painting'
  ],
  practice: ['cad', 'fusion-360', '3d-printing'],
  research: ['programming', 'unity', 'xr', 'web', 'ai', 'electronics', 'industrial'],
  client: ['programming', 'web', 'unity', 'xr', 'ai', 'industrial', 'cad'],
  school: ['programming', 'unity', 'xr', 'web', 'electronics', 'arduino', 'cad', '3d-printing', 'ai']
};

const projects = [
  {
    title: 'BitPrint-3D',
    description: 'Compact educational 3D printer built completely from scratch.',
    category: 'school',
    tags: ['featured', 'electronics', 'esp32', 'cad', 'fusion-360', '3d-printing', 'arduino', 'pcb-design'],
    image: '/images/BitPrint_teaser.png',
    page: '/projects/bitprint.html',
    size: 'tall'
  },
    {
    title: 'Brake Pedal',
    description: 'A custom built brake pedal for the VR Braking Simulation project, using the Meta Quest 3 controller as input.',
    category: 'client',
    tags: ['featured', 'cad', '3d-printing', 'fusion-360'],
    image: '/images/pedal_teaser.png',
    page: '/projects/brake-pedal.html',
    size: 'normal'
  },
    {
    title: 'VR Braking Sim',
    description: 'A VR simulation concept for analyzing brake response in a controlled environment.',
    category: 'client',
    tags: ['featured', 'unity', 'xr', 'programming', 'web', 'ai'],
    image: '/images/missing_image.png',
    page: '/under-construction/',
    size: 'normal'
  },
  {
    title: 'Brake Pedal Instructions',
    description: 'A web based interactive 3D assembly instructions for the brake pedal project.',
    category: 'digital',
    tags: ['featured', 'web', 'programming', '3d-development', '3d-modeling'],
    image: '/images/pedal_tutorial_teaser.png',
    page: '/projects/brake-pedal-instructions.html',
    size: 'normal'
  },
    {
    title: 'Attendance NFC Scanner',
    description: 'A system for scanning NFC based student ID cards to track attendance in a classroom setting. ',
    category: 'school',
    tags: ['featured', 'arduino', 'programming', 'electronics', 'web', '3d-printing', 'cad', 'fusion-360'],
    image: '/images/NFC_scan_teaser.png',
    page: '/projects/attendance-nfc-scanner.html',
    size: 'normal'
  },
  {
    title: 'BMO',
    description: 'Better Macro Operations: a custom macro pad for creative workflows.',
    category: 'school',
    tags: ['featured', 'electronics', 'cad', 'fusion-360', '3d-printing', 'pcb-design', 'arduino'],
    image: '/images/BMO_teaser.png',
    page: '/projects/bmo.html',
    size: 'normal'
  },
  {
    title: 'VR Boiler Simulation',
    description: 'A real-time boiler training simulator for process education.',
    category: 'school',
    tags: ['featured', 'unity', 'xr', 'programming', '3d-development', '3d-modeling'],
    image: '/images/VR_boiler_teaser.png',
    page: '/projects/vr-boiler-simulation.html',
    size: 'wide'
  },
    {
    title: 'Useless Box',
    description: 'A creative twist on the classic Useless Box concept, with a custom built enclosure and mechanism.',
    category: 'school',
    tags: ['featured', 'arduino', 'programming', 'electronics', '3d-printing', 'cad', 'fusion-360', 'laser-cutting'],
    image: '/images/Useless_Box_teaser.png',
    page: '/projects/useless-box.html',
    size: 'normal'
  },
  {
    title: 'CAD Practice Models',
    description: 'A collection of practice models designed to improve CAD skills and techniques.',
    category: 'practice',
    tags: ['cad', 'fusion-360'],
    image: '/images/CAD_Practice_teaser.png',
    page: '/projects/cad-practice-1.html',
    size: 'normal'
  },
  {
    title: 'Filament Bracket',
    description: 'A compact bracket concept for storing filament spools inside an IKEA PAX wardrobe.',
    category: 'physical',
    tags: ['featured', 'cad', '3d-printing', 'fusion-360'],
    image: '/images/fila_hook_teaser.png',
    page: '/projects/filament-hook.html',
    size: 'normal'
  },
  {
    title: 'Magnetic Badge',
    description: 'A custom brand badge with a magnetic attachment for easy wearability and removal.',
    category: 'client',
    tags: ['featured', 'cad', '3d-printing'],
    image: '/images/mag_badge_teaser.png',
    page: '/projects/magnetic-badge.html',
    size: 'normal'
  },
  {
    title: 'Precision Knife Case',
    description: 'Replacement precision knife case for safe storage and transport.',
    category: 'physical',
    tags: ['cad', 'fusion-360', '3d-printing'],
    image: '/images/Precision_Knife_Case_teaser.jpg',
    page: '/projects/precision-knife-case.html',
    size: 'normal'
  },
  {
    title: 'NFC Keychain Tag',
    description: 'Custom NFC tag as an addition to the Knowledge Hub project.',
    category: 'school',
    tags: ['3d-printing', 'cad'],
    image: '/images/NFC_Tags_teaser.jpg',
    page: '/projects/nfc-tags.html',
    size: 'tall'
  },
  {
    title: 'Belt Cover',
    description: 'Custom belt cover for a practice engine.',
    category: 'client',
    tags: ['cad', 'fusion-360', '3d-printing'],
    image: '/images/Belt_Cover_teaser.jpg',
    page: '/projects/belt-cover.html',
    size: 'normal'
  },
  {
    title: 'BioLab Sample Tray',
    description: 'Custom designed and printed sample tray for easy distribution and storage.',
    category: 'client',
    tags: ['featured', 'cad', 'fusion-360', '3d-printing'],
    image: '/images/BioLab_Sample_Tray_teaser.jpg',
    page: '/projects/biolab-sample-tray.html',
    size: 'normal'
  },
  {
    title: 'FabLab LED Sign',
    description: 'Custom LED sign for the FabLab workshop, with a unique design and modular construction.',
    category: 'physical',
    tags: ['featured', 'laser-cutting', 'cad', 'fusion-360', 'electronics', '3d-printing'],
    image: '/images/FabLab_LED_teaser.png',
    page: '/projects/fablab-led-sign.html',
    size: 'wide'
  },
  {
    title: 'Helmet',
    description: 'A cosplay clone-trooper helmet.',
    category: 'physical',
    tags: ['featured', '3d-printing', 'painting'],
    image: '/images/Helmet_teaser.jpg',
    page: '/projects/helmet.html',
    size: 'normal'
  },
  {
    title: 'Knowledge Hub',
    description: 'Proof of concept centralized information screen with NFC based access to digital resources for a school environment.',
    category: 'school',
    tags: ['featured', 'programming', 'web', 'arduino', 'electronics', '3d-printing', 'cad', 'fusion-360'],
    image: '/images/Knowledge_Hub_teaser.jpg',
    page: '/projects/knowledge-hub.html',
    size: 'normal'
  },
  {
    title: 'Plant Tower',
    description: 'A modular plant tower concept for indoor gardening.',
    category: 'physical',
    tags: ['featured', 'cad', '3d-printing', 'fusion-360'],
    image: '/images/Plant_Tower_teaser.jpg',
    page: '/projects/plant-tower.html',
    size: 'normal'
  },




  {
    title: 'ILY LED',
    description: 'A custom built LED sign for the sign language I Love You (ILY) hand gesture.',
    category: 'physical',
    tags: ['electronics', '3d-printing', 'cad', 'fusion-360', 'laser-cutting'],
    image: '/images/ILY_LED_teaser.png',
    page: '/under-construction/',
    size: 'normal'
  },
  {
    title: 'SSD Case',
    description: 'A replacement case for a SSD drive, in the form of a Windows file folder icon.',
    category: 'physical',
    tags: ['cad', '3d-printing', 'fusion-360'],
    image: '/images/ssd_folder_teaser.png',
    page: '/under-construction/',
    size: 'normal'
  },

  {
    title: 'Pump Replacement Part',
    description: 'A replacement part for a motorcycle water pump.',
    category: 'client',
    tags: ['cad', '3d-printing', 'fusion-360'],
    image: '/images/pump_replace_part.png',
    page: '/under-construction/',
    size: 'normal'
  },
  {
    title: 'Mushroom Dome',
    description: 'A decorative mystical dome with a central mushroom and light.',
    category: 'physical',
    tags: ['featured', 'cad', '3d-printing', 'fusion-360', 'painting', 'laser-cutting', 'electronics'],
    image: '/images/mushroom_dome_teaser.png',
    page: '/projects/mushroom-dome.html',
    size: 'normal'
  }


];

const state = {
  category: 'featured',
  filters: new Set(),
  page: 1,
  pageSize: 32,
  filtered: [...projects]
};

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

function cardClass() {
  return 'work-tile tile-small';
}

function applyFilterState() {
  state.filtered = projects.filter(project => {
    const categoryMatch = state.category === 'all'
      || (state.category === 'featured' && project.tags.includes('featured'))
      || project.category === state.category;
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

    if (card.dataset.navBound === 'true') {
      return;
    }

    card.dataset.navBound = 'true';
    card.addEventListener('click', (event) => {
      const interactiveTarget = event.target.closest('a, button, input, textarea, select');
      if (interactiveTarget) {
        return;
      }

      const link = card.querySelector('.work-tile-link');
      if (link && link.getAttribute('href')) {
        window.location.href = link.getAttribute('href');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarEffects();
  setupThemeToggles();
  setupPaginationButtons();
  setupRevealAnimations();
  renderProjects();
});
