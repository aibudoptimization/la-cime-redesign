const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const kids = e.target.querySelectorAll('.incl-card,.addon-card,.cabin-card,.review-card,.gallery-item,.thermal-item,.region-point,.press-logo');
      kids.forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
      });
    }
  });
}, { threshold: 0.08 });

reveals.forEach((el) => obs.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
