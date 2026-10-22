/* ============================================================
   Site details: edit these in ONE place.
   (Also update the copies in index.html <head>: title, meta,
   Open Graph and JSON-LD, which search engines read without JS.)
   ============================================================ */
const SITE = {
  name: 'BuildIT',
  email: 'finlaysontomas@gmail.com',
  emailSubject: 'Website enquiry',
  phone: '0403 993 242',
  phoneIntl: '+61403993242',
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
    // Close the mobile menu when keyboard focus leaves the header, so focus never lands behind the open menu.
    const header = toggle.closest('header');
    header.addEventListener('focusout', (e) => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.relatedTarget)) setOpen(false);
    });
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
      const tilt = card.classList.contains('work__item') ? 8 : 10; // full range in deg: work cards tilt at most 4deg each way
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(x - 0.5) * tilt}deg`);
        card.style.setProperty('--rx', `${(0.5 - y) * tilt}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- Hero intro: headline slides up line by line, then the rest fades in ---------- */
  const hero = document.querySelector('.hero');
  const heroTitle = hero && hero.querySelector('[data-split]');
  if (hero && heroTitle) {
    const source = heroTitle.innerHTML;
    heroTitle.setAttribute('aria-label', heroTitle.textContent.replace(/\s+/g, ' ').trim());
    // Split into the lines the browser actually renders, keeping the gradient span's class per line.
    const split = () => {
      heroTitle.innerHTML = source;
      const words = [];
      const walk = (node, cls) => node.childNodes.forEach((n) => {
        if (n.nodeType === 3) n.textContent.split(/\s+/).filter(Boolean).forEach((w) => words.push({ w, cls }));
        else if (n.nodeName === 'BR') words.push({ br: true });
        else if (n.nodeType === 1) walk(n, n.className || cls);
      });
      walk(heroTitle, '');
      heroTitle.textContent = '';
      const probes = words.map((o) => {
        if (o.br) { heroTitle.append(document.createElement('br')); return o; }
        const s = document.createElement('span'); s.textContent = o.w; heroTitle.append(s, ' ');
        return { ...o, el: s };
      });
      const lines = []; let top = null;
      probes.forEach((p) => {
        if (p.br) { top = null; return; }
        if (p.el.offsetTop !== top) { lines.push([]); top = p.el.offsetTop; }
        lines[lines.length - 1].push(p);
      });
      heroTitle.textContent = '';
      lines.forEach((line, i) => {
        const outer = document.createElement('span'); outer.className = 'hero__line'; outer.setAttribute('aria-hidden', 'true');
        const inner = document.createElement('span'); inner.className = 'hero__line-in'; inner.style.setProperty('--i', i);
        let run = null;
        line.forEach((p, k) => {
          const text = (k ? ' ' : '') + p.w;
          if (!run || run.cls !== p.cls) { run = { cls: p.cls, el: p.cls ? document.createElement('span') : null }; if (run.el) { run.el.className = p.cls; inner.append(run.el); } }
          if (run.el) run.el.textContent += text; else inner.append(text);
        });
        outer.append(inner); heroTitle.append(outer);
      });
      hero.style.setProperty('--hero-late', `${(lines.length - 1) * 80 + 300}ms`);
    };
    if (reduceMotion) {
      hero.classList.add('is-ready', 'is-static');
    } else {
      let started = false;
      const start = () => { if (started) return; started = true; split(); hero.classList.add('is-ready'); };
      // Wait briefly for the web font so line breaks match, but never hold the headline back.
      Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 300))]).then(() => requestAnimationFrame(start));
      if (document.fonts) document.fonts.ready.then(() => { if (started && hero.classList.contains('is-ready')) setTimeout(() => { hero.classList.add('is-static'); split(); }, 1400); });
      let lastW = window.innerWidth;
      window.addEventListener('resize', () => {
        if (!started || Math.abs(window.innerWidth - lastW) < 30) return;
        lastW = window.innerWidth; hero.classList.add('is-static'); split();
      });
    }
  }

  /* ---------- Soft WebGL glow behind the hero (CSS .bg-glow is the fallback) ---------- */
  const glow = document.querySelector('canvas.hero-glow');
  const startGlow = () => {
    const gl = glow.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' });
    if (!gl) return;
    const hex = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
    const cols = (glow.dataset.colors || '#22d3ee,#a78bfa,#f472b6').split(',').map(hex);
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, `precision mediump float;uniform vec2 r;uniform float t;uniform vec3 c0,c1,c2;
float b(vec2 u,vec2 c,float s){return exp(-dot(u-c,u-c)*s);}
void main(){vec2 u=gl_FragCoord.xy/r;u.x*=r.x/r.y;float a=r.x/r.y;
float x=b(u,vec2(a*(.18+.12*sin(t*.11)),.62+.16*cos(t*.13)),4.2);
float y=b(u,vec2(a*(.78+.12*cos(t*.09)),.74+.14*sin(t*.12)),3.6);
float z=b(u,vec2(a*(.52+.2*sin(t*.07)),.30+.12*cos(t*.1)),5.5);
vec3 c=c0*x*.30+c1*y*.34+c2*z*.16;c+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)*.012;
gl_FragColor=vec4(c,max(c.r,max(c.g,c.b)));}`));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    ['c0', 'c1', 'c2'].forEach((n, i) => gl.uniform3fv(U(n), cols[i] || cols[0]));
    const scale = window.innerWidth < 760 ? 0.35 : 0.5; // it's a blur, so half resolution is plenty
    const draw = (ms) => {
      const w = Math.max(1, glow.clientWidth * scale | 0), h = Math.max(1, glow.clientHeight * scale | 0);
      if (glow.width !== w || glow.height !== h) { glow.width = w; glow.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(U('r'), w, h); }
      gl.uniform1f(U('t'), ms / 1000 + 20); gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    draw(0); glow.classList.add('is-on');
    if (reduceMotion) { window.addEventListener('resize', () => draw(0)); return; }
    let onScreen = true, last = 0, raf = 0;
    const loop = (now) => { raf = requestAnimationFrame(loop); if (now - last < 33) return; last = now; draw(now); };
    const sync = () => { cancelAnimationFrame(raf); raf = 0; if (onScreen && !document.hidden) raf = requestAnimationFrame(loop); };
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }).observe(glow);
    document.addEventListener('visibilitychange', sync);
  };
  if (glow) {
    // Start after the page has loaded and the browser is idle, so it never competes with the first paint.
    const later = () => (window.requestIdleCallback ? requestIdleCallback(startGlow, { timeout: 1500 }) : setTimeout(startGlow, 300));
    if (document.readyState === 'complete') later(); else window.addEventListener('load', later, { once: true });
  }

  /* ---------- Business-type ticker: pause while off-screen ---------- */
  const ticker = document.querySelector('.ticker');
  if (ticker && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => ticker.classList.toggle('is-paused', !e.isIntersecting)).observe(ticker);
  }

  /* ---------- Reactive cursor dot + magnetic primary buttons (real mouse only) ---------- */
  if (!reduceMotion && finePointer) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot'; dot.setAttribute('aria-hidden', 'true');
    document.body.append(dot);
    const HOT = 'a, button, summary, .work__item';
    let tx = -100, ty = -100, x = -100, y = -100, s = 1, ts = 1, dotRaf = 0;
    const tick = () => {
      x += (tx - x) * 0.35; y += (ty - y) * 0.35; s += (ts - s) * 0.2;
      dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
      dotRaf = (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(ts - s) > 0.05) ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!dotRaf) dotRaf = requestAnimationFrame(tick); };
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      if (x < -50) { x = e.clientX; y = e.clientY; }
      tx = e.clientX; ty = e.clientY;
      const hot = !!(e.target.closest && e.target.closest(HOT));
      ts = hot ? 2.5 : 1; dot.classList.toggle('is-hot', hot); dot.classList.add('is-on');
      kick();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => dot.classList.remove('is-on'));

    document.querySelectorAll('.btn--primary').forEach((btn) => {
      let bx = 0, by = 0, gx = 0, gy = 0, raf = 0;
      const step = () => {
        bx += (gx - bx) * 0.15; by += (gy - by) * 0.15;
        btn.style.translate = `${bx.toFixed(2)}px ${by.toFixed(2)}px`;
        raf = (Math.abs(gx - bx) + Math.abs(gy - by) > 0.05) ? requestAnimationFrame(step) : 0;
        if (!raf && !gx && !gy) btn.style.translate = '';
      };
      const go = () => { if (!raf) raf = requestAnimationFrame(step); };
      const clamp = (v) => Math.max(-6, Math.min(6, v));
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gx = clamp((e.clientX - (r.left + r.width / 2)) * 0.3);
        gy = clamp((e.clientY - (r.top + r.height / 2)) * 0.3);
        go();
      });
      btn.addEventListener('pointerleave', () => { gx = 0; gy = 0; go(); });
    });
  }

  /* ---------- Cursor trail (background only) ---------- */
  const canvas = document.getElementById('trail');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Pointer over any of these = "not background", so no trail.
  const CONTENT = 'a, button, input, textarea, select, h1, h2, h3, p, li, summary, details, .card, .step, .why__item, .cta__band, .eyebrow, .logo, .nav';

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
