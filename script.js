document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.container');
  const navLinks = document.querySelector('.nav-links');

  // Sticky header with body padding compensation
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleStickyScroll() {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
      document.body.classList.add('sticky-active');
    } else {
      header.classList.remove('sticky');
      document.body.classList.remove('sticky-active');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(handleStickyScroll);
      ticking = true;
    }
  });

  // Mobile nav toggle for smaller screens
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'nav-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
  toggleBtn.innerHTML = '&#9776;'; // hamburger icon
  header.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Real-time form validation feedback
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        if (input.checkValidity()) {
          input.style.borderColor = 'var(--primary-color)';
        } else {
          input.style.borderColor = 'red';
        }
      });
    });
  });

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
  const observerOptions = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.classList.add('before-visible'); // initial state
    observer.observe(el);
  });
});

