/* ============================================================
   Site details: edit these in ONE place.
   (Also update the copies in each page <head>: title, meta,
   Open Graph and JSON-LD, which search engines read without JS.)
   ============================================================ */
const SITE = {
  name: 'BuildIT',
  email: 'tomas@buildit.net.au',
  emailSubject: 'Website enquiry',
  phone: '+61 403 993 241',
  phoneIntl: '+61403993241',
};

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Fill name, email and mailto links from SITE ---------- */
  document.querySelectorAll('[data-site="name"]').forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll('[data-site="email"]').forEach((el) => { el.textContent = SITE.email; });
  document.querySelectorAll('[data-site="phone"]').forEach((el) => { el.textContent = SITE.phone; });
  document.querySelectorAll('[data-tel]').forEach((el) => { el.setAttribute('href', `tel:${SITE.phoneIntl}`); });
  document.querySelectorAll('[data-mailto]').forEach((el) => {
    const subject = el.dataset.subject || SITE.emailSubject;
    el.setAttribute('href', `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`);
  });
  document.querySelectorAll('[data-site-label]').forEach((el) => { el.setAttribute('aria-label', `${SITE.name}, home`); });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1041px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    // Close the mobile menu when keyboard focus leaves the header, so focus never lands behind the open menu.
    const header = toggle.closest('header');
    header.addEventListener('focusout', (e) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.relatedTarget)) setOpen(false);
    });
  }

  /* ---------- Contact form posts to FormSubmit. Only the plan link is filled here. ---------- */
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const planInput = contactForm.querySelector('[name="plan"]');
    const wantedPlan = new URLSearchParams(window.location.search).get('plan');
    const knownPlans = ['design', 'design-hosting', 'hosting', 'social', 'charity', 'founding', 'unsure'];
    if (planInput && knownPlans.includes(wantedPlan)) planInput.value = wantedPlan;
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  }

  /* ---------- Card tilt + glow ---------- */
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
        card.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Cursor trail (background only) ---------- */
  const canvas = document.getElementById('trail');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Pointer over any of these = "not background", so no trail.
  const CONTENT = 'a, button, input, textarea, select, label, h1, h2, h3, h4, p, li, td, th, summary, details, table, form, .card, .step, .why__item, .cta__band, .eyebrow, .logo, .nav, .placeholder, .notes article, .hosting-note, .val, .mega, .level, .sticker, .marquee, .social-band, .backed, .trust-line, .form-card';

  let w = 0, h = 0, dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const points = [];     // ribbon points
  const particles = [];  // sparks
  const MAX_POINTS = 64;
  const COLORS = ['34,211,238', '167,139,250', '244,114,182'];
  let hue = 0;

  // brk = true starts a new stroke: the ribbon is not drawn from the previous point to this one.
  const addPoint = (x, y, brk = false, sparks = true) => {
    const last = points[points.length - 1];
    if (!brk && last && Math.hypot(x - last.x, y - last.y) < 2) return;
    points.push({ x, y, life: 1, brk });
    if (points.length > MAX_POINTS) points.shift();
    if (sparks && Math.random() < 0.55) {
      const a = Math.random() * Math.PI * 2, s = 0.3 + Math.random() * 1.2;
      particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, r: 1 + Math.random() * 2.2, c: COLORS[(hue++) % 3] });
    }
    wake();
  };

  // Is the viewport point (x, y) over empty background? Uses what is actually under that point,
  // so it works for touch drags too (a touch keeps its start element as e.target).
  const isBackgroundAt = (x, y) => {
    const el = document.elementFromPoint(x, y);
    return !el || !el.closest(CONTENT);
  };

  // Fast moves give samples far apart. Fill the gap with points every STEP px and break the
  // ribbon wherever a filled-in point lands on content, so no straight segment crosses a card.
  const STEP = 6;
  const MAX_GAP_MS = 80;   // only fill gaps between samples that are close in time (a real flick), not after an idle jump
  let lastSample = null;   // previous pointer sample {x, y, t}
  let pendingBreak = true; // next added point starts a new stroke

  const sample = (x, y) => {
    const now = performance.now();
    if (lastSample && now - lastSample.t > MAX_GAP_MS) { lastSample = null; pendingBreak = true; }
    if (lastSample) {
      const d = Math.hypot(x - lastSample.x, y - lastSample.y);
      if (d > STEP * 1.5) {
        const n = Math.ceil(d / STEP);
        for (let k = 1; k < n; k++) {
          const ix = lastSample.x + ((x - lastSample.x) * k) / n;
          const iy = lastSample.y + ((y - lastSample.y) * k) / n;
          if (isBackgroundAt(ix, iy)) { addPoint(ix, iy, pendingBreak, false); pendingBreak = false; }
          else pendingBreak = true;
        }
      }
    }
    if (isBackgroundAt(x, y)) { addPoint(x, y, pendingBreak); pendingBreak = false; }
    else pendingBreak = true;
    lastSample = { x, y, t: now };
  };
  const resetSample = () => { lastSample = null; pendingBreak = true; };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    sample(e.clientX, e.clientY);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', resetSample);

  // Touch: gentle trail while dragging over the background, checked at each touch point.
  window.addEventListener('touchstart', resetSample, { passive: true });
  window.addEventListener('touchend', resetSample, { passive: true });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) sample(t.clientX, t.clientY);
  }, { passive: true });

  let raf = 0;
  const wake = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); };

  // Outermost content boxes. The trail is clipped out of these so its glow never bleeds onto text.
  const contentBoxes = [...document.querySelectorAll(CONTENT)].filter((el) => !el.parentElement.closest(CONTENT));
  const clipOutContent = () => {
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    for (const el of contentBoxes) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && r.bottom > 0 && r.top < h && r.right > 0 && r.left < w) ctx.rect(r.left, r.top, r.width, r.height);
    }
    ctx.clip('evenodd');
  };

  function frame() {
    raf = 0;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    clipOutContent();
    ctx.globalCompositeOperation = 'lighter';

    // Fade ribbon points
    for (let i = points.length - 1; i >= 0; i--) {
      points[i].life -= 0.02;
      if (points[i].life <= 0) points.splice(i, 1);
    }

    // Ribbon: smooth curve through points, width & colour along its length
    if (points.length > 2) {
      for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i - 1], p1 = points[i], p2 = points[i + 1];
        if (p1.brk || p2.brk) continue;
        const t = i / points.length;
        const life = p1.life;
        const c = t < 0.5 ? COLORS[0] : (t < 0.8 ? COLORS[1] : COLORS[2]);
        ctx.beginPath();
        ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
        ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        ctx.lineCap = 'round';
        // glow pass
        ctx.strokeStyle = `rgba(${c},${0.16 * life})`;
        ctx.lineWidth = 22 * t * life + 2;
        ctx.stroke();
        // core pass
        ctx.strokeStyle = `rgba(${c},${0.75 * life})`;
        ctx.lineWidth = 4 * t * life + 0.8;
        ctx.stroke();
      }
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.018;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, `rgba(${p.c},${0.9 * p.life})`);
      g.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
    if (points.length || particles.length) wake();
  }

  // Pause when the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
    else if (!document.hidden && (points.length || particles.length)) wake();
  });
})();
