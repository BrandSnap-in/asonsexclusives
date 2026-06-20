/**
 * A.Sons EXCLUSIVES — script.js
 * Premium Multi-Brand Watch Retailer, Ghaziabad
 * Vanilla JS | No dependencies
 */

'use strict';

/* ═══════════════════════════════════════════
   1. NAVIGATION
═══════════════════════════════════════════ */
(function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const overlay    = document.getElementById('nav-overlay');

  if (!nav || !hamburger || !navLinks) return;

  // Sticky class on scroll
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  const openMenu = () => {
    hamburger.classList.add('is-open');
    navLinks.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) closeMenu();
  });
})();


/* ═══════════════════════════════════════════
   2. SCROLL REVEAL — INTERSECTION OBSERVER
═══════════════════════════════════════════ */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ═══════════════════════════════════════════
   3. COUNTER ANIMATION (Trust section)
═══════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseFloat(el.dataset.count);
    const decimal  = el.dataset.decimal === 'true';
    const duration = 1600;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      el.textContent = decimal ? value.toFixed(1) : Math.round(value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();


/* ═══════════════════════════════════════════
   4. REVIEW RATING BARS — ANIMATE ON REVEAL
═══════════════════════════════════════════ */
(function initRatingBars() {
  const bars = document.querySelectorAll('.reviews__bar-fill');
  if (!bars.length) return;

  if (!('IntersectionObserver' in window)) {
    bars.forEach(b => b.classList.add('is-animated'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => obs.observe(b));
})();


/* ═══════════════════════════════════════════
   5. CLOCK HANDS — SYNC TO REAL TIME
═══════════════════════════════════════════ */
(function initClock() {
  const hourHand   = document.querySelector('.about__clock-hand--hour');
  const minuteHand = document.querySelector('.about__clock-hand--minute');
  if (!hourHand || !minuteHand) return;

  const updateClock = () => {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const minuteDeg = m * 6 + s * 0.1;
    const hourDeg   = h * 30 + m * 0.5;

    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform   = `rotate(${hourDeg}deg)`;
  };

  updateClock();
  setInterval(updateClock, 1000);
})();


/* ═══════════════════════════════════════════
   6. PARTICLE AMBIENT EFFECT (Hero)
═══════════════════════════════════════════ */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COUNT = window.innerWidth < 600 ? 8 : 16;

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('span');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur = 8 + Math.random() * 12;

    Object.assign(dot.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: 'rgba(212,175,55,' + (Math.random() * 0.3 + 0.05) + ')',
      left: x + '%',
      top: (Math.random() * 100) + '%',
      animation: `float-particle ${dur}s ${delay}s ease-in-out infinite alternate`,
      pointerEvents: 'none'
    });

    container.appendChild(dot);
  }

  // Inject keyframes once
  if (!document.getElementById('particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
      @keyframes float-particle {
        0%   { transform: translateY(0) scale(1); opacity: 0.3; }
        50%  { opacity: 0.8; }
        100% { transform: translateY(-60px) scale(0.7); opacity: 0.1; }
      }
    `;
    document.head.appendChild(style);
  }
})();


/* ═══════════════════════════════════════════
   7. WHATSAPP FORM SUBMISSION
═══════════════════════════════════════════ */
(function initWhatsAppForm() {
  const btn = document.getElementById('whatsapp-submit');
  const errorEl = document.getElementById('form-error');

  if (!btn || !errorEl) return;

  const getVal = id => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  const showError = (msg) => {
    errorEl.textContent = msg;
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const clearError = () => { errorEl.textContent = ''; };

  btn.addEventListener('click', () => {
    clearError();

    const name    = getVal('name');
    const phone   = getVal('phone');
    const email   = getVal('email');
    const brand   = getVal('brand');
    const type    = getVal('type');
    const budget  = getVal('budget');
    const message = getVal('message');

    // Validate required fields
    if (!name) {
      showError('Please enter your full name.');
      document.getElementById('name').focus();
      return;
    }
    if (!phone) {
      showError('Please enter your phone number.');
      document.getElementById('phone').focus();
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      showError('Please enter a valid 10-digit phone number.');
      document.getElementById('phone').focus();
      return;
    }

    // Build WhatsApp message
    const lines = [
      'Hello A.Sons Exclusives,',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email   ? `Email: ${email}`            : 'Email: —',
      brand   ? `Interested Brand: ${brand}` : 'Interested Brand: Not specified',
      type    ? `Watch Type: ${type}`        : 'Watch Type: Not specified',
      budget  ? `Budget: ${budget}`          : 'Budget: Not specified',
      '',
      'Message:',
      message || '(No additional message)',
      '',
      'I would like more information regarding available watches.',
      '',
      'Thank you.'
    ];

    const text = lines.join('\n');
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/919717989108?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    // Provide user feedback
    btn.textContent = '✓ Opening WhatsApp…';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = `<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.133 1.535 5.872L0 24l6.271-1.644A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.009-1.37l-.36-.213-3.722.976.993-3.631-.234-.373A9.815 9.815 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/></svg> Send WhatsApp Enquiry`;
      btn.disabled = false;
    }, 4000);
  });
})();


/* ═══════════════════════════════════════════
   8. FAQ ACCORDION — CLOSE OTHERS ON OPEN
═══════════════════════════════════════════ */
(function initFAQ() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach(other => {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });
})();


/* ═══════════════════════════════════════════
   9. FOOTER YEAR
═══════════════════════════════════════════ */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ═══════════════════════════════════════════
   10. ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  if (!sections.length || !links.length) return;

  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      const href = link.getAttribute('href');
      link.style.color = (href === '#' + current) ? 'var(--c-gold)' : '';
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();
