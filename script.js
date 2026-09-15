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

/* Formulaire de contact — envoi via Web3Forms (aucun back-end sur le serveur).
   Sans JS, le formulaire poste normalement et affiche la page de confirmation
   du service : la dégradation reste fonctionnelle. */
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('.form-submit');
  const original = button.innerHTML;
  status.className = 'form-status';
  status.textContent = '';
  button.disabled = true;
  button.textContent = 'Envoi en cours…';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.message || 'Échec');
    form.reset();
    status.className = 'form-status ok';
    status.textContent = 'Merci, votre message est bien parti. Réponse sous 48h.';
  } catch (error) {
    status.className = 'form-status error';
    status.textContent = "L'envoi a échoué. Réessayez, ou passez par Instagram ci-dessous.";
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
});
