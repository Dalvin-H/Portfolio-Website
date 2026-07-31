function setupProjectNavbar() {
  const topbar = document.getElementById('work-topbar');
  const menuToggle = document.getElementById('work-menu-toggle');
  const nav = document.getElementById('work-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const next = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', next);
      menuToggle.setAttribute('aria-expanded', String(next));
    });
  }

  if (topbar) {
    window.addEventListener('scroll', () => {
      topbar.classList.toggle('is-scrolled', window.scrollY > 16);
    });
  }
}

function setupProjectThemeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (!darkModeToggle) {
    return;
  }

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

function getProjectSlugFromPath() {
  const fileName = window.location.pathname.split('/').pop() || '';
  return fileName.replace(/\.html$/i, '');
}

function imageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function parseIndexedList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim());
  }

  return (value || '').split('|').map((item) => item.trim());
}

function getProjectGalleryMeta(slug) {
  const allMeta = window.PROJECT_GALLERY_META || {};
  return allMeta[slug] || null;
}

function normalizeSpan(rawSpan) {
  const span = Number.parseInt(rawSpan, 10);
  if (Number.isNaN(span)) {
    return 1;
  }
  return Math.max(1, Math.min(4, span));
}

function normalizeRatio(rawRatio) {
  const match = (rawRatio || '').match(/^(\d+(?:\.\d+)?)\s*(?:\/|:)\s*(\d+(?:\.\d+)?)$/);
  if (!match) {
    return null;
  }

  const width = Number.parseFloat(match[1]);
  const height = Number.parseFloat(match[2]);
  if (width <= 0 || height <= 0) {
    return null;
  }

  return `${width} / ${height}`;
}

async function findPreferredExtension(slug) {
  const extensions = ['jpg', 'jpeg', 'png', 'webp'];

  for (const extension of extensions) {
    const src = `../images/galleries/${slug}/1.${extension}`;
    const exists = await imageExists(src);
    if (exists) {
      return extension;
    }
  }

  return null;
}

async function setupDynamicProjectGallery() {
  const galleryGrid = document.getElementById('project-detail-gallery-grid');
  const gallerySection = document.querySelector('.project-detail-gallery');

  if (!galleryGrid || !gallerySection) {
    return;
  }

  const slug = getProjectSlugFromPath();
  const discovered = [];
  const meta = getProjectGalleryMeta(slug);
  const captions = parseIndexedList(meta?.captions || galleryGrid.dataset.captions);
  const spans = parseIndexedList(meta?.spans || galleryGrid.dataset.spans);
  const ratios = parseIndexedList(meta?.ratios || galleryGrid.dataset.ratios);
  const preferredExtension = await findPreferredExtension(slug);

  if (!preferredExtension) {
    gallerySection.style.display = 'none';
    return;
  }

  let missesInRow = 0;

  for (let index = 1; index <= 80; index += 1) {
    const src = `../images/galleries/${slug}/${index}.${preferredExtension}`;
    const exists = await imageExists(src);
    if (!exists) {
      missesInRow += 1;
      if (missesInRow >= 5) {
        break;
      }
      continue;
    }
    missesInRow = 0;
    discovered.push(src);
  }

  if (discovered.length === 0) {
    gallerySection.style.display = 'none';
    return;
  }

  galleryGrid.innerHTML = discovered.map((src, index) => {
    const span = normalizeSpan(spans[index]);
    const ratio = normalizeRatio(ratios[index]);
    const ratioStyle = ratio ? ` style="--tile-ratio: ${ratio};"` : '';

    return `
      <figure class="project-detail-shot span-${span}">
        <img src="${src}" alt="${slug} gallery image ${index + 1}" loading="lazy"${ratioStyle}>
        ${captions[index] ? `<figcaption>${captions[index]}</figcaption>` : ''}
      </figure>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setupProjectNavbar();
  setupProjectThemeToggle();
  setupDynamicProjectGallery();
});
