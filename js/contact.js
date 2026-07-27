function setupContactNavbar() {
  const topbar = document.getElementById('contact-topbar');
  const menuToggle = document.getElementById('contact-menu-toggle');
  const nav = document.getElementById('contact-nav');

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

function setupContactThemeToggle() {
  const darkModeToggle = document.getElementById('contact-dark-mode-toggle');

  if (!darkModeToggle) {
    return;
  }

  function syncThemeButton() {
    const isDarkMode = document.body.classList.contains('contact-dark-mode');
    const nextModeLabel = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    darkModeToggle.setAttribute('aria-pressed', String(isDarkMode));
    darkModeToggle.setAttribute('aria-label', nextModeLabel);
    darkModeToggle.setAttribute('title', nextModeLabel);
    darkModeToggle.textContent = isDarkMode ? '☀' : '☾';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('contact-dark-mode');
    syncThemeButton();
  });

  syncThemeButton();
}

const contactRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      contactRevealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.01,
  rootMargin: '0px 0px 240px 0px'
});

function setupContactRevealAnimations() {
  document.querySelectorAll('.reveal').forEach(section => {
    contactRevealObserver.observe(section);
  });
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

const submissionEndpoint = 'https://formsubmit.co/ajax/dalvin.heyninck1@gmail.com';

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      contactStatus.textContent = 'Please fill in all fields before sending.';
      contactStatus.className = 'contact-status error';
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim(),
      _captcha: 'false',
      _template: 'table',
      _replyto: formData.get('email').trim()
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');

    try {
      if (submitButton) {
        submitButton.disabled = true;
      }

      contactStatus.textContent = 'Sending message...';
      contactStatus.className = 'contact-status';

      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      contactForm.reset();
      contactStatus.textContent = 'Message sent successfully. Thank you! I will get back to you soon.';
      contactStatus.className = 'contact-status success';
    } catch (error) {
      contactStatus.textContent = 'Something went wrong while sending the message. Please try again.';
      contactStatus.className = 'contact-status error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupContactNavbar();
  setupContactThemeToggle();
  setupContactRevealAnimations();
});
