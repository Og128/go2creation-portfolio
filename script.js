const uxStyles = document.createElement('link'); uxStyles.rel = 'stylesheet'; uxStyles.href = 'ux.css'; document.head.appendChild(uxStyles);
const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader?.classList.add('done'), 300));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const moreBtn = document.querySelector('.load-more');
const more = document.querySelector('.gallery-more');
moreBtn?.addEventListener('click', () => {
  more.hidden = false; moreBtn.remove();
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  const source = item.querySelector('img');
  if (!lightbox) return; lightboxImage.src = source.src; lightboxImage.alt = source.alt; lightbox.showModal();
}));
lightbox?.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
