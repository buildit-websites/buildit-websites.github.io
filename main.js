/* ============================================================
   Site details: edit these in ONE place.
   (Also update the copies in each page <head>: title, meta,
   Open Graph and JSON-LD, which search engines read without JS.)
   ============================================================ */
const SITE = {
  name: 'BuildIT',
  email: 'tomas@buildit.net.au',
  emailSubject: 'Website enquiry',
  phone: '0403 993 241',
  phoneIntl: '+61403993241',
  /* Spots left on the first-5 free websites offer. Change this one number when a spot is taken. */
  freeSpotsLeft: 5,
};

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Fill name, email and mailto links from SITE ---------- */
  document.querySelectorAll('[data-site="name"]').forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll('[data-site="email"]').forEach((el) => { el.textContent = SITE.email; });
  document.querySelectorAll('[data-site="phone"]').forEach((el) => { el.textContent = SITE.phone; });
  document.querySelectorAll('[data-tel]').forEach((el) => { el.setAttribute('href', `tel:${SITE.phoneIntl}`); });
  const spotsLeft = Number(SITE.freeSpotsLeft);
  const spotsCount = Number.isFinite(spotsLeft) ? spotsLeft : 0;
  document.querySelectorAll('[data-site="spots"]').forEach((el) => { el.textContent = String(spotsCount); });
  document.querySelectorAll('[data-spots-word]').forEach((el) => {
    el.textContent = spotsCount === 1 ? 'spot left' : 'spots left';
  });
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
    window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
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
    const knownPlans = ['design', 'design-hosting', 'unsure'];
    if (planInput && knownPlans.includes(wantedPlan)) planInput.value = wantedPlan;
  }

  /* ---------- Scroll reveal: view() timeline when the browser has it, otherwise IntersectionObserver ---------- */
  if (!('IntersectionObserver' in window)) document.documentElement.classList.remove('reveal-io');
  if (document.documentElement.classList.contains('reveal-io')) {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    /* Used by the header logo's total reset: hide reveals again and re-observe them. */
    window.__resetReveals = () => {
      reveals.forEach((el) => { el.classList.remove('is-visible'); io.unobserve(el); io.observe(el); });
    };
  }

  /* ---------- Magnetic buttons: three home CTAs, fine pointer only ---------- */
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      let origin = null;
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        el.style.transition = 'transform .15s ease-out';
      });
      el.addEventListener('pointermove', (e) => {
        if (!origin || (e.pointerType && e.pointerType !== 'mouse')) return;
        const dx = Math.max(-14, Math.min(14, (e.clientX - origin.x) * 0.28));
        const dy = Math.max(-12, Math.min(12, (e.clientY - origin.y) * 0.28));
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => {
        origin = null;
        el.style.transition = 'transform .55s cubic-bezier(.16,.84,.32,1)';
        el.style.transform = '';
      });
    });
  }

  /* ---------- Pinned steps: progress line on desktop, a plain stack otherwise ---------- */
  if (!reduceMotion) {
    const pinQuery = window.matchMedia('(min-width: 960px)');
    document.querySelectorAll('[data-pinned]').forEach((section) => {
      const rail = section.querySelector('.pinned__rail span');
      const steps = [...section.querySelectorAll('[data-step]')];
      const update = () => {
        if (!pinQuery.matches || !steps.length) {
          if (rail) rail.style.setProperty('--p', '0');
          steps.forEach((step) => step.classList.remove('is-current'));
          return;
        }
        const rect = section.getBoundingClientRect();
        const total = Math.max(section.offsetHeight - window.innerHeight, 1);
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = scrolled / total;
        if (rail) rail.style.setProperty('--p', p.toFixed(4));
        const index = Math.min(steps.length - 1, Math.floor(p * steps.length));
        steps.forEach((step, i) => step.classList.toggle('is-current', i === index));
      };
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      pinQuery.addEventListener('change', update);
      update();
    });
  }

  /* ---------- Hero aurora: one canvas, pauses off-screen, one still frame if motion is reduced ---------- */
  (() => {
    const canvas = document.getElementById('aurora');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const vert = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
    const frag = [
      'precision mediump float;',
      'uniform vec2 uRes;uniform float uTime;',
      'void main(){',
      'vec2 uv=gl_FragCoord.xy/uRes;',
      'float t=uTime*0.28;',
      'vec2 p1=vec2(0.2+sin(t)*0.05,0.4+cos(t*0.8)*0.04);',
      'vec2 p2=vec2(0.8+cos(t*0.65)*0.04,0.2+sin(t*0.55)*0.05);',
      'vec2 p3=vec2(0.58+sin(t*0.45)*0.05,0.78);',
      'float d1=exp(-dot(uv-p1,uv-p1)*7.2);',
      'float d2=exp(-dot(uv-p2,uv-p2)*6.0);',
      'float d3=exp(-dot(uv-p3,uv-p3)*8.5);',
      'vec3 col=vec3(0.10,0.72,0.82)*d1+vec3(0.52,0.40,0.95)*d2+vec3(0.86,0.36,0.58)*d3*0.7;',
      'float a=clamp(d1*0.55+d2*0.5+d3*0.35,0.0,0.62);',
      'gl_FragColor=vec4(col,a);',
      '}'
    ].join('');
    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a');
    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const resize = () => {
      const w = Math.max(canvas.clientWidth, 1);
      const h = Math.max(canvas.clientHeight, 1);
      canvas.width = Math.round(w * 0.5);
      canvas.height = Math.round(h * 0.5);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (time) => {
      resize();
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    if (reduceMotion) { draw(420); return; }
    let running = true;
    let raf = 0;
    let last = 0;
    const loop = (now) => {
      raf = 0;
      if (!running) return;
      if (now - last > 33) { draw(now); last = now; }
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const onScreen = canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < window.innerHeight;
      running = onScreen && !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(loop);
    };
    if ('IntersectionObserver' in window) {
      const watch = new IntersectionObserver(() => sync(), { threshold: 0.05 });
      watch.observe(canvas);
    }
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', sync);
    sync();
  })();

  /* Mouse previews and lights. A touch pointer never arms them. Reduced motion never arms them.
     Some browsers report pointer:none until a mouse actually moves, so the first mouse move counts too. */
  const isMouseEvent = (e) => !e.pointerType || e.pointerType === 'mouse';

  const measureShots = () => {
    document.querySelectorAll('.frame__view img').forEach((img) => {
      const view = img.closest('.frame__view');
      if (!view) return;
      const extra = img.getBoundingClientRect().height - view.getBoundingClientRect().height;
      if (extra > 8) {
        img.style.setProperty('--scroll', `${(-extra).toFixed(1)}px`);
        const seconds = Math.min(7.2, Math.max(3.2, extra / 110));
        view.style.setProperty('--preview-dur', `${seconds.toFixed(2)}s`);
      }
    });
  };

  const armMouse = () => {
    if (document.documentElement.classList.contains('can-preview')) return;
    document.documentElement.classList.add('can-preview');
    measureShots();
  };

  if (!reduceMotion && finePointer) armMouse();
  if (!reduceMotion && !coarsePointer) {
    window.addEventListener('pointermove', (e) => {
      if (isMouseEvent(e)) armMouse();
    }, { passive: true });
    document.querySelectorAll('.frame__view img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', measureShots, { once: true });
    });
    window.addEventListener('load', () => { if (document.documentElement.classList.contains('can-preview')) measureShots(); });
    window.addEventListener('resize', () => { if (document.documentElement.classList.contains('can-preview')) measureShots(); });
  }

  /* ---------- Card tilt, kept small so the screenshot scroll stays readable ---------- */
  if (!reduceMotion && !coarsePointer) {
    document.querySelectorAll('.work__item').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        if (!isMouseEvent(e)) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(x - 0.5) * 4}deg`);
        card.style.setProperty('--rx', `${(0.5 - y) * 4}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Aurora orbs: swell when a mouse moves through open space ---------- */
  if (!reduceMotion && !coarsePointer) {
    const orbs = [...document.querySelectorAll('.orb')];
    if (orbs.length) {
      const SOLID = 'a, button, input, textarea, select, label, summary, h1, h2, h3, h4, p, li, td, th, img, .card, .level, .nav, .cta__band, .marquee, .form-card, .pinned__step, .hero__sellrow, .hero__actions, .hero__offer, .backed, .frame, .faq__item, .placeholder, .compare-wrap, .notes article, .eyebrow';
      let px = -9999;
      let py = -9999;
      let raf = 0;
      let armed = false;
      const rest = () => {
        orbs.forEach((orb) => {
          orb.style.setProperty('--grow', '1');
          orb.style.setProperty('--bright', '1');
          orb.style.setProperty('--nx', '0px');
          orb.style.setProperty('--ny', '0px');
        });
      };
      const overBackground = (x, y) => {
        const el = document.elementFromPoint(x, y);
        return !el || !el.closest(SOLID);
      };
      const update = () => {
        raf = 0;
        if (!armed) return;
        const open = overBackground(px, py);
        orbs.forEach((orb) => {
          const r = orb.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const reach = Math.max(220, Math.min(r.width, r.height) * 0.48);
          const dist = Math.hypot(px - cx, py - cy);
          const t = open ? Math.max(0, 1 - dist / reach) : 0;
          const influence = t * t * (3 - 2 * t);
          orb.style.setProperty('--grow', (1 + influence * 0.55).toFixed(3));
          orb.style.setProperty('--bright', (1 + influence * 0.7).toFixed(3));
          orb.style.setProperty('--nx', `${(influence * Math.max(-22, Math.min(22, (px - cx) * 0.05))).toFixed(1)}px`);
          orb.style.setProperty('--ny', `${(influence * Math.max(-22, Math.min(22, (py - cy) * 0.05))).toFixed(1)}px`);
        });
      };
      const arm = () => { armed = true; };
      if (finePointer) arm();
      window.addEventListener('pointermove', (e) => {
        if (!isMouseEvent(e)) return;
        arm();
        px = e.clientX;
        py = e.clientY;
        if (!raf) raf = requestAnimationFrame(update);
      }, { passive: true });
      document.documentElement.addEventListener('pointerleave', rest);
    }
  }
})();
