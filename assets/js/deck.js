/* ==========================================================================
   AI Basics — deck runtime

   Slides are authored at a fixed 1280x720 and scaled to the display, so the
   layout a presenter rehearses on a laptop is exactly the layout that appears
   on the room's projector. Nothing reflows mid-session.
   ========================================================================== */

(function () {
  'use strict';

  var DESIGN_W = 1280;
  var DESIGN_H = 720;

  var stage       = document.getElementById('stage');
  var deck        = document.getElementById('deck');
  var slides      = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var curEl       = document.getElementById('cur');
  var totalEl     = document.getElementById('total');
  var progressFill= document.getElementById('progress-fill');
  var hud         = document.getElementById('hud');
  var notesPane   = document.getElementById('notespane');
  var notesTitle  = document.getElementById('notespane-title');
  var notesBody   = document.getElementById('notespane-body');
  var notesBtn    = document.getElementById('notes-btn');
  var gridEl      = document.getElementById('grid');
  var gridInner   = document.getElementById('grid-inner');
  var gridBtn     = document.getElementById('grid-btn');
  var helpEl      = document.getElementById('help');
  var helpBtn     = document.getElementById('help-btn');
  var liveStatus  = document.getElementById('livestatus');

  var index = 0;
  var hudTimer = null;
  var jumpBuffer = '';
  var jumpTimer = null;

  if (!slides.length) { return; }

  /* ------------------------------------------------------------------------
     Scale the design space to the viewport
     ------------------------------------------------------------------------ */

  function fit() {
    var scale = Math.min(
      stage.clientWidth / DESIGN_W,
      stage.clientHeight / DESIGN_H
    );
    document.documentElement.style.setProperty('--deck-scale', scale);
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(fit).observe(stage);
  } else {
    window.addEventListener('resize', fit);
  }
  fit();

  /* ------------------------------------------------------------------------
     Notes: lift each slide's <aside> into the presenter pane on demand.
     Blank lines in the source become paragraphs.
     ------------------------------------------------------------------------ */

  function notesFor(slide) {
    var aside = slide.querySelector('.notes');
    if (!aside) { return ''; }

    return aside.innerHTML
      .split(/\n\s*\n/)
      .map(function (chunk) { return chunk.trim(); })
      .filter(Boolean)
      .map(function (chunk) { return '<p>' + chunk + '</p>'; })
      .join('');
  }

  function paintNotes() {
    var slide = slides[index];
    notesTitle.textContent = (index + 1) + '. ' + (slide.getAttribute('data-title') || '');
    var html = notesFor(slide);
    notesBody.innerHTML = html || '<p>No notes for this slide.</p>';
  }

  /* ------------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------------ */

  function show(next, viaHash) {
    index = Math.max(0, Math.min(slides.length - 1, next));

    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-current', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });

    curEl.textContent = index + 1;
    progressFill.style.width = ((index + 1) / slides.length * 100) + '%';

    Array.prototype.forEach.call(gridInner.children, function (item, i) {
      item.classList.toggle('is-current', i === index);
      if (i === index) { item.setAttribute('aria-current', 'true'); }
      else { item.removeAttribute('aria-current'); }
    });

    if (!notesPane.hidden) { paintNotes(); }

    liveStatus.textContent = 'Slide ' + (index + 1) + ' of ' + slides.length +
      ': ' + (slides[index].getAttribute('data-title') || '');

    if (!viaHash) {
      var hash = '#/' + (index + 1);
      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash);
      }
    }

    wakeHud();
  }

  function next() { if (index < slides.length - 1) { show(index + 1); } }
  function prev() { if (index > 0) { show(index - 1); } }

  /* ------------------------------------------------------------------------
     Panels — only one open at a time
     ------------------------------------------------------------------------ */

  function setPanel(el, btn, open) {
    el.hidden = !open;
    if (btn) {
      btn.setAttribute(
        btn.hasAttribute('aria-expanded') ? 'aria-expanded' : 'aria-pressed',
        open ? 'true' : 'false'
      );
    }
  }

  function closeAll() {
    setPanel(notesPane, notesBtn, false);
    setPanel(gridEl, gridBtn, false);
    setPanel(helpEl, helpBtn, false);
    document.body.classList.remove('notes-open');
  }

  function toggleNotes() {
    var open = notesPane.hidden;
    closeAll();
    if (open) { paintNotes(); setPanel(notesPane, notesBtn, true); }
    /* Narrows the stage so the slide stays fully visible beside the pane. */
    document.body.classList.toggle('notes-open', open);
  }

  function toggleGrid() {
    var open = gridEl.hidden;
    closeAll();
    if (open) { setPanel(gridEl, gridBtn, true); }
  }

  function toggleHelp() {
    var open = helpEl.hidden;
    closeAll();
    if (open) { setPanel(helpEl, helpBtn, true); }
  }

  /* ------------------------------------------------------------------------
     HUD stays out of the way until the presenter reaches for it
     ------------------------------------------------------------------------ */

  function wakeHud() {
    hud.classList.add('is-awake');
    window.clearTimeout(hudTimer);
    hudTimer = window.setTimeout(function () {
      hud.classList.remove('is-awake');
    }, 2400);
  }

  document.addEventListener('mousemove', wakeHud);

  /* ------------------------------------------------------------------------
     Keyboard
     ------------------------------------------------------------------------ */

  document.addEventListener('keydown', function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) { return; }

    var onButton = event.target && event.target.tagName === 'BUTTON';
    var key = event.key;

    /* Let a focused button handle its own activation keys. */
    if (onButton && (key === ' ' || key === 'Enter')) { return; }

    switch (key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        event.preventDefault(); next(); break;

      case 'ArrowLeft':
      case 'PageUp':
        event.preventDefault(); prev(); break;

      case 'Home':
        event.preventDefault(); show(0); break;

      case 'End':
        event.preventDefault(); show(slides.length - 1); break;

      case 'n': case 'N':
        event.preventDefault(); toggleNotes(); break;

      case 'o': case 'O':
        event.preventDefault(); toggleGrid(); break;

      case 'f': case 'F':
        event.preventDefault();
        if (document.fullscreenElement) { document.exitFullscreen(); }
        else if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
        break;

      case '?':
        event.preventDefault(); toggleHelp(); break;

      case 'Escape':
        closeAll(); break;

      default:
        /* Number keys jump to a slide, for getting back to a specific one
           when someone asks about it in Q&A. */
        if (/^[0-9]$/.test(key)) {
          event.preventDefault();
          jumpBuffer += key;
          window.clearTimeout(jumpTimer);
          jumpTimer = window.setTimeout(function () {
            var n = parseInt(jumpBuffer, 10);
            jumpBuffer = '';
            if (n >= 1 && n <= slides.length) { show(n - 1); }
          }, 450);
        }
    }
  });

  /* ------------------------------------------------------------------------
     Build the overview
     ------------------------------------------------------------------------ */

  slides.forEach(function (slide, i) {
    slide.setAttribute('data-n', i + 1);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');

    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'grid__item';
    item.innerHTML = '<span class="grid__n">' + (i + 1) + '</span>' +
      '<span>' + (slide.getAttribute('data-title') || 'Slide ' + (i + 1)) + '</span>';
    item.addEventListener('click', function () {
      closeAll();
      show(i);
    });
    gridInner.appendChild(item);
  });

  totalEl.textContent = slides.length;

  /* ------------------------------------------------------------------------
     Wire up chrome
     ------------------------------------------------------------------------ */

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  notesBtn.addEventListener('click', toggleNotes);
  gridBtn.addEventListener('click', toggleGrid);
  helpBtn.addEventListener('click', toggleHelp);

  gridEl.addEventListener('click', function (event) {
    if (event.target === gridEl) { closeAll(); }
  });

  /* Tap right or left half to advance on a touchscreen. */
  stage.addEventListener('click', function (event) {
    if (event.clientX > window.innerWidth * 0.6) { next(); }
    else if (event.clientX < window.innerWidth * 0.4) { prev(); }
  });

  /* ------------------------------------------------------------------------
     Deep links, so a slide can be reopened straight from a link
     ------------------------------------------------------------------------ */

  function fromHash() {
    var match = /^#\/(\d+)$/.exec(window.location.hash);
    return match ? Math.max(0, Math.min(slides.length - 1, parseInt(match[1], 10) - 1)) : 0;
  }

  window.addEventListener('hashchange', function () { show(fromHash(), true); });

  show(fromHash(), true);
  deck.focus();
  wakeHud();
})();
