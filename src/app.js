// Nutrition Bot UI — app.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Cards animate in via CSS (see .card--animate in styles.css).
// The JS adds a staggered delay per card so they cascade nicely on scroll.
const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
  card.style.animationDelay = `${i * 0.1}s`;
  card.classList.add('card--animate');
});
