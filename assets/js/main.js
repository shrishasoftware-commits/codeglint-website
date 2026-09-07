/* Codeglint Software — site scripts (v2) */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- Mobile nav */
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!links.contains(e.target) && !burger.contains(e.target)) {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------- Sticky header state */
  var header = document.querySelector('.site-header');
  var toTop = null;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) { header.classList.toggle('scrolled', y > 12); }
    if (toTop) { toTop.classList.toggle('show', y > 620); }
  }

  /* ----------------------------------------------------- Back to top btn */
  toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.appendChild(toTop);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------- Scroll reveal */
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.section .head, .section .card, .section .card-flat, .section .plan, .section .step, ' +
      '.section .post, .section .job, .section .quote, .section .notice, .section .faq, ' +
      '.section .table-scroll, .cta-band, .stats-band > div, .hero-card'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        var delay = parseFloat(el.getAttribute('data-delay') || '0');
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    var groups = {};
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
      // stagger siblings inside the same grid row
      var parent = el.parentNode;
      var key = parent.className + '|' + (parent.getAttribute('data-k') || '');
      if (!groups[key]) { groups[key] = 0; }
      var isGrid = /\b(grid|price-grid|steps|stats-band)\b/.test(parent.className);
      el.setAttribute('data-delay', isGrid ? String(Math.min(groups[key]++ * 70, 350)) : '0');
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------- Year stamp */
  var y = document.querySelectorAll('.js-year');
  for (var i = 0; i < y.length; i++) { y[i].textContent = new Date().getFullYear(); }

  /* --------------------------------- Contact form (mailto handoff) ------ */
  var form = document.querySelector('#enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };
      var name = get('name');
      var email = get('email');
      var message = get('message');
      if (!name || !email || !message) { form.reportValidity && form.reportValidity(); return; }

      var body =
        'Name: ' + name + '\n' +
        'Company: ' + get('company') + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + get('phone') + '\n' +
        'Service: ' + get('service') + '\n' +
        'Budget: ' + get('budget') + '\n\n' +
        'Message:\n' + message + '\n';

      var href = 'mailto:codeglintsoftware@gmail.com' +
        '?subject=' + encodeURIComponent('Project enquiry from ' + name) +
        '&body=' + encodeURIComponent(body);

      var note = document.querySelector('#form-msg');
      if (note) { note.classList.add('show'); }
      window.location.href = href;
    });
  }

  /* ---------------------------------- One-open-at-a-time FAQ accordions - */
  Array.prototype.forEach.call(document.querySelectorAll('.faq'), function (group) {
    var items = group.querySelectorAll('details');
    Array.prototype.forEach.call(items, function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) { return; }
        Array.prototype.forEach.call(items, function (other) {
          if (other !== d) { other.open = false; }
        });
      });
    });
  });
})();
