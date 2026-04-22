(function () {
  'use strict';

  // year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // lightbox
  var lightbox = document.getElementById('lightbox');
  var frame = document.getElementById('lightboxFrame');
  var titleEl = document.getElementById('lightboxTitle');
  var closeBtn = document.getElementById('lightboxClose');
  var lastFocused = null;

  function buildEmbed(provider, id) {
    if (provider === 'youtube') {
      return (
        '<iframe src="https://www.youtube.com/embed/' + id +
        '?autoplay=1&rel=0" title="Video player" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe>'
      );
    }
    if (provider === 'vimeo') {
      return (
        '<iframe src="https://player.vimeo.com/video/' + id +
        '?autoplay=1&byline=0&portrait=0&title=0" title="Video player" ' +
        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
      );
    }
    return '';
  }

  function openLightbox(card) {
    var provider = card.getAttribute('data-provider');
    var id = card.getAttribute('data-video-id');
    var title = card.getAttribute('data-title') || '';
    if (!provider || !id) return;

    lastFocused = document.activeElement;
    frame.innerHTML = buildEmbed(provider, id);
    titleEl.textContent = title;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    // clear iframe to stop playback
    frame.innerHTML = '';
    titleEl.textContent = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  // wire up film cards
  var cards = document.querySelectorAll('.film-card');
  cards.forEach(function (card) {
    var thumb = card.querySelector('.film-thumb');
    if (!thumb) return;
    thumb.addEventListener('click', function () { openLightbox(card); });
  });

  closeBtn.addEventListener('click', closeLightbox);

  // click outside frame closes
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Escape closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });
})();
