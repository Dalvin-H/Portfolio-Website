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

function createProjectGalleryLightbox() {
  const existingLightbox = document.querySelector('.project-lightbox');
  if (existingLightbox) {
    return existingLightbox;
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'project-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="project-lightbox-backdrop" data-lightbox-close></div>
    <div class="project-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Project image preview" tabindex="-1">
      <button class="project-lightbox-close" type="button" data-lightbox-close aria-label="Close image preview">×</button>
      <button class="project-lightbox-nav project-lightbox-prev" type="button" data-lightbox-prev aria-label="Previous image">←</button>
      <figure class="project-lightbox-figure">
        <img class="project-lightbox-image" alt="">
        <figcaption class="project-lightbox-caption"></figcaption>
      </figure>
      <button class="project-lightbox-nav project-lightbox-next" type="button" data-lightbox-next aria-label="Next image">→</button>
    </div>
  `;

  document.body.append(lightbox);
  return lightbox;
}

function setupProjectGalleryLightbox(galleryGrid) {
  const lightbox = createProjectGalleryLightbox();
  const dialog = lightbox.querySelector('.project-lightbox-dialog');
  const image = lightbox.querySelector('.project-lightbox-image');
  const caption = lightbox.querySelector('.project-lightbox-caption');
  const prevButton = lightbox.querySelector('[data-lightbox-prev]');
  const nextButton = lightbox.querySelector('[data-lightbox-next]');
  const closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
  const items = Array.from(galleryGrid.querySelectorAll('.project-detail-shot'));
  const itemData = items.map((item) => ({
    figure: item,
    img: item.querySelector('img'),
    caption: item.querySelector('figcaption')?.textContent || ''
  }));

  let activeIndex = 0;

  function syncControls() {
    prevButton.disabled = itemData.length <= 1;
    nextButton.disabled = itemData.length <= 1;
  }

  function showImage(index) {
    if (itemData.length === 0) {
      return;
    }

      activeIndex = (index + itemData.length) % itemData.length;
      const current = itemData[activeIndex];
      image.src = current.img.src;
      image.alt = current.img.alt || '';
      caption.textContent = current.caption;
      lightbox.dataset.index = String(activeIndex);
      syncControls();
    }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('project-lightbox-open');
    dialog.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('project-lightbox-open');
  }

  items.forEach((item, index) => {
    item.classList.add('is-clickable');
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Open image ${index + 1} in a larger preview`);
    item.dataset.galleryIndex = String(index);
  });

  galleryGrid.addEventListener('click', (event) => {
    const figure = event.target.closest('.project-detail-shot');
    if (!figure || !galleryGrid.contains(figure)) {
      return;
    }

    const index = Number.parseInt(figure.dataset.galleryIndex || '0', 10);
    openLightbox(Number.isNaN(index) ? 0 : index);
  });

  galleryGrid.addEventListener('keydown', (event) => {
    const figure = event.target.closest('.project-detail-shot');
    if (!figure || !galleryGrid.contains(figure)) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const index = Number.parseInt(figure.dataset.galleryIndex || '0', 10);
      openLightbox(Number.isNaN(index) ? 0 : index);
    }
  });

  prevButton.addEventListener('click', () => showImage(activeIndex - 1));
  nextButton.addEventListener('click', () => showImage(activeIndex + 1));
  closeButtons.forEach((button) => button.addEventListener('click', closeLightbox));

  lightbox.addEventListener('click', (event) => {
    if (event.target.matches('[data-lightbox-close]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showImage(activeIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(activeIndex + 1);
    }
  });

  syncControls();
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
    const caption = captions[index] || '';

    return `
      <figure class="project-detail-shot span-${span}" data-gallery-index="${index}" tabindex="0" role="button" aria-label="Open image ${index + 1} in a larger preview">
        <img src="${src}" alt="${slug} gallery image ${index + 1}" loading="lazy"${ratioStyle}>
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
  }).join('');

  setupProjectGalleryLightbox(galleryGrid);
}

document.addEventListener('DOMContentLoaded', () => {
  setupProjectNavbar();
  setupProjectThemeToggle();
  setupDynamicProjectGallery();
});
