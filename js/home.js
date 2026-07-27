function setupHomeNavbar() {
  const topbar = document.getElementById('home-topbar');
  const menuToggle = document.getElementById('home-menu-toggle');
  const nav = document.getElementById('home-nav');

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

function setupHomeThemeToggle() {
  const darkModeToggle = document.getElementById('home-dark-mode-toggle');

  if (!darkModeToggle) {
    return;
  }

  function syncThemeButton() {
    const isDarkMode = document.body.classList.contains('home-dark-mode');
    const nextModeLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    darkModeToggle.setAttribute('aria-pressed', String(isDarkMode));
    darkModeToggle.setAttribute('aria-label', nextModeLabel);
    darkModeToggle.setAttribute('title', nextModeLabel);
    darkModeToggle.textContent = isDarkMode ? '☀' : '☾';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('home-dark-mode');
    syncThemeButton();
  });

  syncThemeButton();
}

const homeRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      homeRevealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.01,
  rootMargin: '0px 0px 240px 0px'
});

function setupHomeRevealAnimations() {
  document.querySelectorAll('.reveal').forEach(section => {
    homeRevealObserver.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupHomeNavbar();
  setupHomeThemeToggle();
  setupHomeRevealAnimations();
});
