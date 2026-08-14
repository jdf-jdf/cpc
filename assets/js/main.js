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
     Configuration — the one block to edit before launch.
     ------------------------------------------------------------------------ */

  var CONFIG = {
    /* Where the registration form POSTs. Until this is set, the form shows
       its error state and points people at the phone numbers, which is the
       honest fallback: nothing silently disappears. */
    registrationEndpoint: '',

    /* Shown in the error state and the success state. */
    fallbackPhoneDisplay: '(212) 941-0030',
    fallbackPhoneHref: '+12129410030',

    /* Per-center callback line, echoed in the success message. */
    centerPhones: {
      manhattan: '(212) 941-0030',
      brooklyn: '(718) 492-0409',
      queens: '(718) 358-8899',
      unsure: '(212) 941-0030'
    },

    centerNames: {
      manhattan: 'Manhattan',
      brooklyn: 'Brooklyn',
      queens: 'Queens',
      unsure: 'CPC'
    }
  };

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
      errorBox.innerHTML = message;
      errorBox.hidden = false;
    }

    function clearError() {
      errorBox.hidden = true;
      errorBox.textContent = '';
    }

    function phoneFallbackMessage() {
      return 'We could not send your registration just now. Please call ' +
        '<a href="tel:' + CONFIG.fallbackPhoneHref + '">' + CONFIG.fallbackPhoneDisplay +
        '</a> and we will sign you up over the phone. Your seat is not lost.';
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

      setLoading(true);

      var data = {
        name: document.getElementById('f-name').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        center: document.getElementById('f-center').value,
        language: document.getElementById('f-language').value,
        notes: document.getElementById('f-notes').value.trim()
      };

      if (!CONFIG.registrationEndpoint) {
        /* No endpoint wired up yet. Fail loudly and usefully rather than
           pretending the submission went somewhere. */
        window.setTimeout(function () {
          setLoading(false);
          showError(phoneFallbackMessage());
        }, 400);
        return;
      }

      fetch(CONFIG.registrationEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          if (!response.ok) { throw new Error('Request failed: ' + response.status); }
          return response;
        })
        .then(function () {
          setLoading(false);
          showSuccess(data);
        })
        .catch(function () {
          setLoading(false);
          showError(phoneFallbackMessage());
        });
    });

    function showSuccess(data) {
      var centerName = CONFIG.centerNames[data.center] || 'CPC';
      var centerPhone = CONFIG.centerPhones[data.center] || CONFIG.fallbackPhoneDisplay;

      successDetail.textContent = data.center === 'queens'
        ? 'The Queens group is full, so you are on the waitlist. ' + centerName +
          ' staff will call ' + data.phone + ' as soon as a seat opens, and you are ' +
          'ahead of anyone who registers after today.'
        : centerName + ' staff will call ' + data.phone +
          ' within two business days to confirm your seat.';

      var alt = successBox.querySelector('.form__success-alt');
      if (alt) {
        alt.textContent = 'If you have not heard from us by then, call ' + centerPhone +
          ' and ask for the AI Basics coordinator.';
      }

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
     Boot
     ------------------------------------------------------------------------ */

  function init() {
    initReveals();
    initMasthead();
    initScrollSpy();
    initAccordion();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
