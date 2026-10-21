/* ============================================================
   Site details: edit these in ONE place.
   (Also update the copies in index.html <head>: title, meta,
   Open Graph and JSON-LD, which search engines read without JS.)
   ============================================================ */
const SITE = {
  name: 'BuildIt',
  email: 'finlaysontomas@gmail.com',
  emailSubject: 'Website enquiry',
};

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Fill name, email and mailto links from SITE ---------- */
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.emailSubject)}`;
  document.querySelectorAll('[data-site="name"]').forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll('[data-site="email"]').forEach((el) => { el.textContent = SITE.email; });
  document.querySelectorAll('[data-mailto]').forEach((el) => { el.setAttribute('href', mailto); });
  document.querySelectorAll('[data-site-label]').forEach((el) => { el.setAttribute('aria-label', `${SITE.name}, back to top`); });
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
    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
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
  const CONTENT = 'a, button, input, textarea, select, h1, h2, h3, p, li, .card, .step, .cta__band, .eyebrow, .logo, .nav';

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

  const addPoint = (x, y) => {
    const last = points[points.length - 1];
    if (last && Math.hypot(x - last.x, y - last.y) < 2) return;
    points.push({ x, y, life: 1 });
    if (points.length > MAX_POINTS) points.shift();
    if (Math.random() < 0.55) {
      const a = Math.random() * Math.PI * 2, s = 0.3 + Math.random() * 1.2;
      particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, r: 1 + Math.random() * 2.2, c: COLORS[(hue++) % 3] });
    }
    wake();
  };

  const isBackground = (target) => !(target instanceof Element) || !target.closest(CONTENT);

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    if (isBackground(e.target)) addPoint(e.clientX, e.clientY);
  }, { passive: true });

  // Touch: gentle trail while dragging on the background.
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t && isBackground(e.target)) addPoint(t.clientX, t.clientY);
  }, { passive: true });

  let raf = 0;
  const wake = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); };

  function frame() {
    raf = 0;
    ctx.clearRect(0, 0, w, h);
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
    if (points.length || particles.length) wake();
  }

  // Pause when the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
    else if (!document.hidden && (points.length || particles.length)) wake();
  });
})();
