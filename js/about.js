function setupAboutNavbar() {
  const topbar = document.getElementById('about-topbar');
  const menuToggle = document.getElementById('about-menu-toggle');
  const nav = document.getElementById('about-nav');

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

function setupAboutThemeToggle() {
  const technicalToggle = document.getElementById('about-technical-toggle');
  const darkModeToggle = document.getElementById('about-dark-mode-toggle');

  if (!darkModeToggle) {
    return;
  }

  function syncThemeButton() {
    const isDarkMode = document.body.classList.contains('about-dark-mode');
    const nextModeLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    darkModeToggle.setAttribute('aria-pressed', String(isDarkMode));
    darkModeToggle.setAttribute('aria-label', nextModeLabel);
    darkModeToggle.setAttribute('title', nextModeLabel);
    darkModeToggle.textContent = isDarkMode ? '☀' : '☾';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('about-dark-mode');
    syncThemeButton();
  });

  if (technicalToggle) {
    technicalToggle.addEventListener('click', () => {
      const active = document.body.classList.toggle('about-technical-view');
      technicalToggle.setAttribute('aria-pressed', String(active));
    });
  }

  syncThemeButton();
}

const aboutRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      aboutRevealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.01,
  rootMargin: '0px 0px 240px 0px'
});

function setupAboutRevealAnimations() {
  document.querySelectorAll('.reveal').forEach(section => {
    aboutRevealObserver.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupAboutNavbar();
  setupAboutThemeToggle();
  setupAboutRevealAnimations();
});
