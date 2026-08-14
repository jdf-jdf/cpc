/* ==========================================================================
   AI Basics at CPC — page behaviour

   Everything here is driven by IntersectionObserver rather than scroll
   listeners, and every animated property is transform or opacity. That is
   deliberate: a large share of this audience arrives on older Android phones
   over a cellular connection, and scroll-handler jank is the difference
   between a page that works and one that gets closed.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     This page is a draft concept, so the form deliberately goes nowhere. It
     validates and confirms so the interaction can be reviewed, and it says so
     on screen — it does not POST, store, or transmit anything. Wiring it up is
     a decision for CPC, not a default this draft should quietly make.
     ------------------------------------------------------------------------ */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Scroll reveals
     ------------------------------------------------------------------------ */

  function initReveals() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) { return; }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }

        /* Stagger siblings so a grid cascades instead of snapping in as a
           single block. Capped so a long list never feels slow. */
        var siblings = entry.target.parentNode
          ? entry.target.parentNode.querySelectorAll(':scope > .reveal')
          : [];
        var index = Array.prototype.indexOf.call(siblings, entry.target);
        var delay = Math.min(index < 0 ? 0 : index, 6) * 70;

        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------------
     2. Masthead elevation — sentinel, not a scroll handler
     ------------------------------------------------------------------------ */

  function initMasthead() {
    var masthead = document.getElementById('masthead');
    if (!masthead || !('IntersectionObserver' in window)) { return; }

    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.insertBefore(sentinel, document.body.firstChild);

    new IntersectionObserver(function (entries) {
      masthead.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* ------------------------------------------------------------------------
     3. Section nav highlighting
     ------------------------------------------------------------------------ */

  function initScrollSpy() {
    var links = document.querySelectorAll('.masthead__nav a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) { return; }

    var map = {};
    var targets = [];

    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) { return; }
      map[id] = link;
      targets.push(section);
    });

    var visible = {};

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });

      var current = null;
      targets.forEach(function (section) {
        if (visible[section.id] && !current) { current = section.id; }
      });

      Array.prototype.forEach.call(links, function (link) {
        link.classList.remove('is-current');
        link.removeAttribute('aria-current');
      });

      if (current && map[current]) {
        map[current].classList.add('is-current');
        map[current].setAttribute('aria-current', 'true');
      }
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

    targets.forEach(function (section) { observer.observe(section); });
  }

  /* ------------------------------------------------------------------------
     4. Questions accordion
     ------------------------------------------------------------------------ */

  function initAccordion() {
    var triggers = document.querySelectorAll('.qa__trigger');
    if (!triggers.length) { return; }

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        var panelId = trigger.getAttribute('aria-controls');
        var panel = document.getElementById(panelId);
        if (!panel) { return; }

        var isOpen = trigger.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
          panel.classList.remove('is-animating');
          return;
        }

        trigger.setAttribute('aria-expanded', 'true');
        panel.hidden = false;

        if (!prefersReducedMotion) {
          panel.classList.add('is-animating');
          window.setTimeout(function () { panel.classList.remove('is-animating'); }, 360);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. Registration form
     ------------------------------------------------------------------------ */

  function initForm() {
    var form = document.getElementById('register-form');
    if (!form) { return; }

    var submitBtn = document.getElementById('submit-btn');
    var errorBox = document.getElementById('form-error');
    var successBox = document.getElementById('form-success');
    var successDetail = document.getElementById('success-detail');
    var againBtn = document.getElementById('register-another');

    var rules = [
      {
        id: 'f-name',
        test: function (value) { return value.trim().length > 0; }
      },
      {
        id: 'f-phone',
        test: function (value) { return (value.replace(/\D/g, '')).length >= 10; }
      },
      {
        id: 'f-email',
        test: function (value) {
          if (!value.trim()) { return true; }              /* optional */
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
        }
      },
      {
        id: 'f-center',
        test: function (value) { return value !== ''; }
      },
      {
        id: 'f-language',
        test: function (value) { return value !== ''; }
      }
    ];

    function fieldOf(input) { return input.closest('.field'); }

    function setFieldError(input, hasError) {
      var wrap = fieldOf(input);
      var message = document.getElementById(input.id + '-error');
      if (wrap) { wrap.classList.toggle('has-error', hasError); }
      if (message) { message.hidden = !hasError; }
      if (hasError) {
        input.setAttribute('aria-invalid', 'true');
        if (message) { input.setAttribute('aria-errormessage', message.id); }
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-errormessage');
      }
    }

    /* Validate on blur once, then live on input — correcting a mistake should
       clear the warning immediately rather than waiting for another submit. */
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (!input) { return; }

      input.addEventListener('blur', function () {
        if (!input.value && input.id !== 'f-email') { return; }
        setFieldError(input, !rule.test(input.value));
      });

      input.addEventListener('input', function () {
        if (fieldOf(input) && fieldOf(input).classList.contains('has-error')) {
          setFieldError(input, !rule.test(input.value));
        }
      });

      input.addEventListener('change', function () {
        if (input.tagName === 'SELECT') { setFieldError(input, !rule.test(input.value)); }
      });
    });

    function validateAll() {
      var firstBad = null;

      rules.forEach(function (rule) {
        var input = document.getElementById(rule.id);
        if (!input) { return; }
        var ok = rule.test(input.value);
        setFieldError(input, !ok);
        if (!ok && !firstBad) { firstBad = input; }
      });

      return firstBad;
    }

    function setLoading(isLoading) {
      submitBtn.classList.toggle('is-loading', isLoading);
      submitBtn.disabled = isLoading;
      submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
      var label = submitBtn.querySelector('.btn__label');
      if (label) { label.textContent = isLoading ? 'Sending…' : 'Send my registration'; }
    }

    function showError(message) {
      errorBox.textContent = message;
      errorBox.hidden = false;
    }

    function clearError() {
      errorBox.hidden = true;
      errorBox.textContent = '';
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearError();

      var firstBad = validateAll();
      if (firstBad) {
        firstBad.focus();
        showError('Please check the highlighted answers above.');
        return;
      }

      /* A short pause so the loading state is visible when demonstrating the
         flow. Nothing is sent — see the note at the top of this file. */
      setLoading(true);
      window.setTimeout(function () {
        setLoading(false);
        showSuccess();
      }, 650);
    });

    function showSuccess() {
      successDetail.textContent =
        'Nothing was sent. In a live version this would confirm the sign-up ' +
        'and say what happens next — which depends on who handles intake and ' +
        'how quickly they can respond.';

      form.hidden = true;
      successBox.hidden = false;

      /* Move focus into the confirmation so a screen reader lands on it and a
         keyboard user carries on from the right place. */
      successBox.focus();
      successBox.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center'
      });
    }

    if (againBtn) {
      againBtn.addEventListener('click', function () {
        form.reset();
        rules.forEach(function (rule) {
          var input = document.getElementById(rule.id);
          if (input) { setFieldError(input, false); }
        });
        clearError();
        successBox.hidden = true;
        form.hidden = false;
        var name = document.getElementById('f-name');
        if (name) { name.focus(); }
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. Open-questions toggle

     Counts every unresolved decision on the page and lets the presenter light
     them all up at once. The count comes from the DOM rather than a hardcoded
     number, so it stays honest as items get answered and markers removed.
     ------------------------------------------------------------------------ */

  function initDecisions() {
    var toggle = document.getElementById('decisions-toggle');
    var label = document.getElementById('decisions-label');
    var count = document.getElementById('decisions-count');
    if (!toggle) { return; }

    var total = document.querySelectorAll('.tbd').length;

    if (!total) {
      /* Every question answered — the control has nothing left to show. */
      toggle.hidden = true;
      return;
    }

    count.textContent = total;

    toggle.addEventListener('click', function () {
      var on = toggle.getAttribute('aria-pressed') === 'true';
      toggle.setAttribute('aria-pressed', on ? 'false' : 'true');
      document.body.classList.toggle('show-decisions', !on);
      label.textContent = on ? 'Highlight open questions' : 'Hide open questions';
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  function init() {
    initReveals();
    initMasthead();
    initScrollSpy();
    initAccordion();
    initForm();
    initDecisions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
