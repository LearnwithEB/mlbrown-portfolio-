/* ============================================================
   SCRIPT.JS — ML Brown Portfolio
   Shared behavior for all pages (vanilla JavaScript, no libraries).

   1. Hamburger menu — opens/closes the slide-in nav panel
   2. Back to Top button — appears after 300px of scroll
   3. Forms — front-end confirmation message (see note below)
   4. Video lightbox — featured talk on the speaking page
   ============================================================ */

// ---------- 1. Hamburger menu ----------
const menuButton = document.getElementById('menuButton');
const navPanel = document.getElementById('navPanel');
const navOverlay = document.getElementById('navOverlay');

function setMenu(open) {
  menuButton.classList.toggle('open', open);
  navPanel.classList.toggle('open', open);
  navOverlay.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', open);
}

if (menuButton && navPanel && navOverlay) {
  menuButton.addEventListener('click', () => {
    setMenu(!navPanel.classList.contains('open'));
  });
  navOverlay.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}

// ---------- 2. Back to Top ----------
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- 3. Forms ----------
// NOTE: These forms are front-end only. To receive real submissions,
// connect them to a service such as Formspree (https://formspree.io):
// set the form's `action` to your Formspree URL, set method="POST",
// and delete the preventDefault handler below.
document.querySelectorAll('form[data-confirm]').forEach((form) => {
  const confirmEl = document.getElementById(form.dataset.confirm);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (confirmEl) {
      confirmEl.classList.add('show');
      setTimeout(() => confirmEl.classList.remove('show'), 6000);
    }
    form.reset();
  });
});

// ---------- 4. Video lightbox ----------
// The featured-talk thumbnail opens a lightbox. To show a real video,
// set data-youtube-id="VIDEO_ID" on the .video-thumb element (the part
// after "watch?v=" in the YouTube URL). Until then a placeholder
// message is shown.
const videoThumb = document.getElementById('videoThumb');
const lightbox = document.getElementById('videoLightbox');
const lightboxBody = document.getElementById('lightboxBody');
const lightboxClose = document.getElementById('lightboxClose');

if (videoThumb && lightbox) {
  videoThumb.addEventListener('click', () => {
    const id = videoThumb.dataset.youtubeId;
    lightboxBody.innerHTML = id
      ? '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1" ' +
        'title="Featured talk" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      : '<p style="font-family: var(--accent-font); font-size: 12px; letter-spacing: 0.15em; ' +
        'text-transform: uppercase; color: var(--muted-text);">Recording coming soon</p>';
    lightbox.classList.add('open');
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxBody.innerHTML = ''; // stops playback
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
