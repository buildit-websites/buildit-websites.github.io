/* Homepage smash intro.
   Plays once per session. ?nointro skips. Escape or Skip intro ends it.
   The BuildIT word lands on the header lockup (globe mark + name). */
(() => {
  'use strict';

  const root = document.documentElement;
  const intro = document.getElementById('intro');
  if (!intro) return;

  const logo = document.getElementById('ilogo');
  const letters = [...intro.querySelectorAll('#isent .c')];
  const words = [...intro.querySelectorAll('#isent .w')];
  const logoLetters = [...logo.querySelectorAll('.c:not(.dot)')];
  const logoStart = letters.indexOf(logoLetters[0]);
  const tag = document.getElementById('itag');
  const num = document.getElementById('icnum');
  const count = document.getElementById('icount');
  const stripsEl = document.getElementById('istrips');
  const skipBtn = document.getElementById('iskip');
  const landMark = document.getElementById('iland-mark');
  const canvas = document.getElementById('introfx');
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pageRoots = [...document.querySelectorAll('header, main, footer, .bg-stage')];

  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

  const T = {
    count: [0, 2100],
    letters: [300, 2150],
    tag: [2050, 2650],
    flip: [2850, 3550],
    wipe: [2950, 3700],
    end: 3750,
  };
  const LDUR = 520;
  const LST = (T.letters[1] - T.letters[0] - LDUR) / (letters.length - 1);
  const COLS = ['34,211,238', '167,139,250', '244,114,182', '238,242,255'];

  let strips = [];
  let W = 0;
  let H = 0;
  let dpr = 1;
  let parts = [];
  let lrects = [];
  let hit = [];
  let flip = null;
  let raf = 0;
  let t0 = 0;
  let tnow = 0;
  let frames = 0;
  let handed = false;
  let done = true;
  let restoreFocus = null;

  function syncStrips() {
    const n = window.innerWidth < 600 ? 6 : 10;
    while (stripsEl.children.length < n) stripsEl.appendChild(document.createElement('i'));
    while (stripsEl.children.length > n) stripsEl.lastElementChild.remove();
    strips = [...stripsEl.children];
  }

  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sparks(x, y, n) {
    for (let i = 0; i < n; i += 1) {
      const a = Math.PI + Math.random() * Math.PI;
      const s = 120 + Math.random() * 320;
      parts.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s * 0.9,
        l: 1,
        c: COLS[i % 4],
        /* Core is a few CSS pixels so the disc reads as a circle, not a single pixel. */
        r: 2.6 + Math.random() * 2.1,
      });
    }
  }

  function wordRect() {
    const first = logoLetters[0].getBoundingClientRect();
    const last = logoLetters[logoLetters.length - 1].getBoundingClientRect();
    return {
      left: first.left,
      top: first.top,
      height: first.height,
      width: last.right - first.left,
    };
  }

  function measure() {
    logo.style.transform = '';
    logo.classList.remove('is-solid');
    letters.forEach((span) => { span.style.transform = ''; });
    lrects = letters.map((span) => span.getBoundingClientRect());
    const word = wordRect();
    const name = document.querySelector('header .logo [data-site="name"]');
    const mark = document.querySelector('header .logo .logo__mark');
    if (!name || !mark || word.width < 1) {
      flip = null;
      return;
    }
    const dest = name.getBoundingClientRect();
    const markBox = mark.getBoundingClientRect();
    const logoBox = logo.getBoundingClientRect();
    const originX = word.left - logoBox.left + word.width / 2;
    const originY = word.top - logoBox.top + word.height / 2;
    logo.style.transformOrigin = `${originX}px ${originY}px`;
    flip = {
      s: dest.width / word.width,
      dx: (dest.left + dest.width / 2) - (word.left + word.width / 2),
      dy: (dest.top + dest.height / 2) - (word.top + word.height / 2),
    };
    if (landMark && markBox.width > 0) {
      landMark.style.left = `${markBox.left}px`;
      landMark.style.top = `${markBox.top}px`;
      landMark.style.width = `${markBox.width}px`;
      landMark.style.height = `${markBox.height}px`;
    }
  }

  function placeMark(fp) {
    if (!landMark) return;
    landMark.style.opacity = String(fp);
    landMark.style.transform = `scale(${0.62 + 0.38 * fp})`;
  }

  function frame(ts) {
    if (!t0) t0 = ts;
    tnow = ts - t0;
    const t = tnow;
    const dt = 1 / 60;
    ctx.clearRect(0, 0, W, H);
    num.textContent = String(Math.round(100 * eio(cl(t / T.count[1])))).padStart(3, '0');

    letters.forEach((span, i) => {
      const lt = (t - T.letters[0] - i * LST) / LDUR;
      if (lt < 0) {
        span.style.opacity = '0';
        return;
      }
      span.style.opacity = '1';
      let y = 0;
      let sx = 1;
      let sy = 1;
      let rot = 0;
      if (lt < 0.55) {
        const p = lt / 0.55;
        y = -(1 - p * p) * H * (i >= logoStart ? 0.8 : 0.5);
        rot = (1 - p) * (i % 2 ? -14 : 14);
      } else {
        const p = cl((lt - 0.55) / 0.45);
        if (!hit[i]) {
          hit[i] = 1;
          const r = lrects[i];
          if (r) sparks(r.left + r.width / 2, r.bottom - r.height * 0.12, i >= logoStart ? 14 : 4);
        }
        y = -Math.sin(p * Math.PI) * 24 * (1 - p);
        const q = cl(p * 3);
        sy = 1 - 0.22 * Math.sin(q * Math.PI);
        sx = 1 + 0.16 * Math.sin(q * Math.PI);
      }
      span.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg) scale(${sx.toFixed(3)},${sy.toFixed(3)})`;
      span.style.transformOrigin = '50% 100%';
    });

    const tp = cl((t - T.tag[0]) / (T.tag[1] - T.tag[0]));
    tag.style.opacity = String(tp * (1 - cl((t - T.flip[0]) / 250)));
    tag.style.transform = `translateY(${((1 - ease(tp)) * 10).toFixed(1)}px)`;

    const fp = eio(cl((t - T.flip[0]) / (T.flip[1] - T.flip[0])));
    if (fp > 0 && flip) {
      const s = 1 + (flip.s - 1) * fp;
      logo.style.transform = `translate(${flip.dx * fp}px,${flip.dy * fp}px) scale(${s})`;
      if (fp > 0.84) logo.classList.add('is-solid');
    }
    placeMark(fp > 0 && flip ? fp : 0);

    if (t > T.flip[0] - 150) {
      const fo = 1 - cl((t - T.flip[0] + 150) / 300);
      words.forEach((word) => { word.style.opacity = String(fo); });
      if (logo.lastElementChild) logo.lastElementChild.style.opacity = String(fo);
      tag.style.opacity = String(Math.min(Number(tag.style.opacity), fo));
    }
    count.style.opacity = String(1 - cl((t - T.flip[0]) / 250));
    skipBtn.style.opacity = String(1 - cl((t - T.flip[0]) / 250));

    strips.forEach((strip, i) => {
      const p = ease(cl((t - T.wipe[0] - i * 45) / (T.wipe[1] - T.wipe[0] - strips.length * 45)));
      strip.style.transform = `translateY(${(-p * 101).toFixed(2)}%)`;
    });

    if (t > T.wipe[0] - 50 && !handed) revealPage();

    ctx.globalCompositeOperation = 'lighter';
    parts.forEach((p) => {
      p.vy += 980 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.l -= dt * 1.4;
      if (p.l <= 0) return;
      const life = p.l;
      const glow = p.r * 3.2;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
      grad.addColorStop(0, `rgba(${p.c},${Math.min(1, life).toFixed(3)})`);
      grad.addColorStop(0.28, `rgba(${p.c},${(life * 0.72).toFixed(3)})`);
      grad.addColorStop(0.55, `rgba(${p.c},${(life * 0.22).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';
    parts = parts.filter((p) => p.l > 0);
    frames += 1;
    if (t >= T.end) {
      finish();
      return;
    }
    raf = window.requestAnimationFrame(frame);
  }

  function revealPage() {
    if (handed) return;
    handed = true;
    root.classList.remove('intro-reveal');
    void root.offsetWidth;
    root.classList.add('intro-reveal');
    window.dispatchEvent(new Event('buildit:intro-revealing'));
  }

  function holdPage() {
    const active = document.activeElement;
    restoreFocus = active && active !== document.body && !intro.contains(active) ? active : null;
    pageRoots.forEach((el) => { el.inert = true; });
  }

  function releasePage() {
    pageRoots.forEach((el) => { el.inert = false; });
  }

  function moveFocusOut(wasInIntro) {
    const active = document.activeElement;
    const focusLost = wasInIntro || !active || active === document.body || (active && intro.contains(active));
    if (!focusLost) return;
    if (restoreFocus && document.contains(restoreFocus)) {
      restoreFocus.focus({ preventScroll: true });
      return;
    }
    if (!wasInIntro) return;
    const main = document.getElementById('main');
    if (!main) return;
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }

  function finish() {
    if (done) return;
    const active = document.activeElement;
    const wasInIntro = !!(active && intro.contains(active));
    window.cancelAnimationFrame(raf);
    raf = 0;
    done = true;
    releasePage();
    root.classList.remove('intro-on');
    root.classList.add('introgone');
    if (!handed) revealPage();
    window.__intro = { frames, ms: tnow, fps: tnow ? frames / (tnow / 1000) : 0, done: true };
    window.dispatchEvent(new Event('buildit:intro-done'));
    moveFocusOut(wasInIntro);
    restoreFocus = null;
  }

  function reset() {
    intro.style.opacity = '';
    intro.style.transition = '';
    strips.forEach((strip) => { strip.style.transform = ''; });
    letters.forEach((span) => {
      span.style.transform = '';
      span.style.opacity = '0';
    });
    logo.style.transform = '';
    logo.classList.remove('is-solid');
    words.forEach((word) => { word.style.opacity = '1'; });
    if (logo.lastElementChild) logo.lastElementChild.style.opacity = '';
    tag.style.opacity = '0';
    tag.style.transform = '';
    count.style.opacity = '1';
    count.style.display = '';
    skipBtn.style.opacity = '1';
    if (landMark) {
      landMark.style.opacity = '0';
      landMark.style.transform = 'scale(0.62)';
    }
    parts = [];
    hit = [];
    handed = false;
    frames = 0;
    t0 = 0;
    tnow = 0;
    root.classList.remove('intro-reveal');
  }

  function soft() {
    letters.forEach((span) => {
      span.style.opacity = '1';
      span.style.transform = '';
    });
    tag.style.opacity = '1';
    count.style.display = 'none';
    if (landMark) landMark.style.opacity = '0';
    revealPage();
    intro.style.transition = 'opacity .6s ease .7s';
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => { intro.style.opacity = '0'; });
    });
    window.setTimeout(() => {
      intro.style.opacity = '';
      intro.style.transition = '';
      finish();
    }, 1350);
  }

  function play() {
    window.__introStarted = true;
    window.__introWatch = Date.now() + 9000;
    root.classList.remove('introgone');
    root.classList.add('intro-on');
    holdPage();
    done = false;
    syncStrips();
    size();
    if (reduce) {
      soft();
      return;
    }
    reset();
    void intro.offsetWidth;
    measure();
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(() => { if (!done) measure(); });
    }
    raf = window.requestAnimationFrame(frame);
  }

  function skip() {
    if (done) return;
    tnow = T.end;
    finish();
  }

  function replay() {
    if (!done) return;
    reset();
    play();
  }

  skipBtn.addEventListener('click', skip);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') skip();
  });
  const skipLink = document.querySelector('a.skip-link[href="#main"]');
  if (skipLink) skipLink.addEventListener('click', () => { if (!done) skip(); });
  window.addEventListener('resize', () => {
    if (done) return;
    size();
    if (!reduce) measure();
  });
  document.querySelectorAll('[data-replay-intro]').forEach((btn) => {
    btn.addEventListener('click', replay);
  });
  window.__replayIntro = replay;

  let seen = false;
  try { seen = sessionStorage.getItem('buildit-intro') === '1'; } catch (e) { seen = false; }
  try { sessionStorage.setItem('buildit-intro', '1'); } catch (e) { /* private mode */ }
  const skipNow = seen || /[?&]nointro/.test(window.location.search);
  if (skipNow) {
    root.classList.remove('intro-on');
    root.classList.add('introgone');
    window.__introStarted = true;
    window.__intro = { skipped: true, done: true };
    window.requestAnimationFrame(() => window.dispatchEvent(new Event('buildit:intro-revealing')));
    return;
  }

  /* Skip stays live while fonts load. The overlay is already on screen. */
  done = false;
  window.__introStarted = true;
  window.__introWatch = Date.now() + 9000;
  holdPage();
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const fontWait = new Promise((resolve) => { window.setTimeout(resolve, 1800); });
  Promise.race([fontsReady, fontWait]).then(() => {
    if (done) return;
    play();
  });
})();
