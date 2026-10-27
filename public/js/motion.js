// Motion v4 (JiroNews structure). Nothing slides over another section.
// Scroll-linked: pinned hero flywheel, drifting results strip, process stepper, small extras.
// Viewport-linked (reversible): [data-r] reveals, word reveals, card deck.
// Time-linked: typewriter, featured carousel, ticker (CSS), deck fan.
(() => {
  const d = document, root = d.documentElement, $$ = (s, c = d) => [...c.querySelectorAll(s)];
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  const top = d.querySelector('.top');
  const bar = d.createElement('div'); bar.className = 'progress'; d.body.append(bar);

  // rolling labels on buttons and pills (hover swaps two copies of the text)
  $$('.btn, .pill').forEach((b) => {
    const t = [...b.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    if (!t) return;
    const label = t.textContent.trim(), r = d.createElement('span'); r.className = 'roll';
    r.innerHTML = '<span></span><span aria-hidden="true"></span>'; r.children[0].textContent = label; r.children[1].textContent = label;
    t.replaceWith(r);
  });

  // split headings into words for the entrance
  $$('[data-split]').forEach((el) => {
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = d.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.append(t); return; }
          const w = d.createElement('span'); w.className = 'w';
          const i = d.createElement('span'); i.textContent = t; w.append(i); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.matches('.tw,.caret')) walk(n);
    });
    walk(el); el.classList.add('split');
    $$('.w > span', el).forEach((s, k) => (s.style.transitionDelay = k * 0.045 + 's'));
  });

  // word-by-word reveal blocks
  $$('[data-words]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="wd" style="--i:${i}">${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join(' ');
  });

  // staggered children
  $$('[data-stagger]').forEach((p) => [...p.querySelectorAll('[data-r]')].forEach((c, i) => c.style.setProperty('--d', (i * +(p.dataset.stagger || 60)) / 1000 + 's')));

  // scrubbed statement
  const scrub = $$('[data-scrub]').map((el) => {
    const words = [];
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = d.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => { if (!t) return; if (/^\s+$/.test(t)) { frag.append(t); return; } const s = d.createElement('span'); s.className = 'sw'; s.textContent = t; words.push(s); frag.append(s); });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el); el.classList.add('scrubbing'); return { el, words };
  });

  // reversible reveal: in when any part is on screen, out only once fully off screen
  const rio = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)), { threshold: 0 });
  $$('[data-r], [data-words], .split, .deck').forEach((el) => (reduce ? el.classList.add('in') : rio.observe(el)));
  // one-shot reveals used on inner pages
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }));
  $$('.prose > h2, .prose > p, .prose > ul, .prose > ol, .prose > .table-wrap').forEach((el) => el.classList.add('reveal'));
  $$('.reveal').forEach((el) => (reduce ? el.classList.add('in') : io.observe(el)));

  // counters
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target); if (reduce) return;
    const el = e.target, end = parseFloat(el.dataset.count), pre = el.dataset.pre || '', suf = el.dataset.suf || '', dec = +(el.dataset.dec || 0), t0 = performance.now();
    const step = (t) => { const p = Math.min(1, (t - t0) / 1600), v = end * (1 - Math.pow(1 - p, 3)); el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .4 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  // typewriter: deletes the current text, then types the new word
  const typers = new WeakMap();
  const typeTo = (el, word, speed = 70) => {
    if (reduce) { el.textContent = word; return; }
    const job = {}; typers.set(el, job);
    const typ = (i) => { if (typers.get(el) !== job) return; el.textContent = word.slice(0, i); if (i < word.length) setTimeout(() => typ(i + 1), speed); };
    const del = () => { if (typers.get(el) !== job) return; if (el.textContent.length) { el.textContent = el.textContent.slice(0, -1); setTimeout(del, speed / 2.5); } else typ(1); };
    del();
  };

  // lazy videos
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { if (!v.dataset.loaded) { $$('source[data-src]', v).forEach((s) => (s.src = s.dataset.src)); v.load(); v.dataset.loaded = '1'; } if (!reduce) v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: '300px' });
  $$('video[data-lazy]').forEach((v) => vio.observe(v));

  // featured carousel: auto-advance, arrows, typed headline, progress bar
  $$('[data-carousel]').forEach((c) => {
    const slides = $$('.slide', c), fill = c.querySelector('.bar i'), dur = +(c.dataset.carousel || 6000);
    let k = 0, t0 = performance.now(), paused = false;
    slides.forEach((s) => { const h = s.querySelector('.tt'); if (h) h.dataset.full = h.textContent; });
    const show = (n) => {
      slides[k].classList.remove('on'); k = (n + slides.length) % slides.length; slides[k].classList.add('on'); t0 = performance.now();
      const h = slides[k].querySelector('.tt'); if (h) { h.textContent = ''; typeTo(h, h.dataset.full, 26); }
    };
    $$('.prev', c).forEach((b) => b.addEventListener('click', () => show(k - 1)));
    $$('.next', c).forEach((b) => b.addEventListener('click', () => show(k + 1)));
    c.addEventListener('pointerenter', () => (paused = true)); c.addEventListener('pointerleave', () => { paused = false; t0 = performance.now(); });
    if (reduce) return;
    const tick = (now) => { if (!paused) { const p = (now - t0) / dur; if (fill) fill.style.width = clamp(p) * 100 + '%'; if (p >= 1) show(k + 1); } requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });

  // card deck: fans in from a pile on enter, folds back on exit (CSS); fixed slots, no overlap
  $$('.deck').forEach((dk) => { $$('.dc', dk).forEach((c, i) => c.classList.add(['p1', 'p0', 'p2'][i % 3])); });

  // FAQ two-panel and flip cards
  $$('[data-faq]').forEach((box) => {
    const qs = $$('.fq', box), as = $$('.fa', box); box.classList.add('live');
    const show = (k) => { qs.forEach((q, j) => q.setAttribute('aria-expanded', j === k)); as.forEach((a, j) => a.classList.toggle('on', j === k)); };
    qs.forEach((q, k) => { q.addEventListener('click', () => show(k)); if (fine) q.addEventListener('pointerenter', () => show(k)); });
    show(0);
  });
  $$('.fcard').forEach((c) => c.addEventListener('click', () => c.classList.toggle('flipped')));

  // quick email form (posts to the same lead endpoint as the contact page)
  $$('form[data-quick]').forEach((f) => f.addEventListener('submit', async (e) => {
    e.preventDefault(); const msg = f.closest('.gb').querySelector('.msg');
    try { const r = await fetch(f.action, { method: 'POST', body: new FormData(f) }); const j = await r.json(); msg.textContent = j.ok ? 'Thanks. We will reply within one working day.' : 'Please check your email address and tick the consent box.'; }
    catch { msg.textContent = 'Something went wrong. Email kunal@growrevenue.co instead.'; }
  }));

  // ---------- hero flywheel (pinned) ----------
  const pinw = d.querySelector('[data-pinwrap]');
  const fly = pinw && (() => {
    const zone = pinw.querySelector('.prismzone'), p3 = pinw.querySelector('.prism .p3d'), faces = $$('.pf', pinw), shades = faces.map((f) => f.querySelector('.shade'));
    const chips = $$('.chan li', pinw), tw = pinw.querySelector('.tw'), words = (tw?.dataset.cycle || '').split('|');
    let active = -1, drag = 0, auto = 0, last = performance.now();
    const setActive = (i) => { if (i === active) return; active = i; chips.forEach((c, j) => c.classList.toggle('on', j === i)); if (tw && words[i]) typeTo(tw, words[i]); };
    const prism = pinw.querySelector('.prism');
    if (prism && !reduce) {
      let on = false, lx = 0;
      prism.addEventListener('pointerdown', (e) => { on = true; lx = e.clientX; prism.setPointerCapture(e.pointerId); prism.classList.add('grabbing'); });
      prism.addEventListener('pointermove', (e) => { if (on) { drag += (e.clientX - lx) * .4; lx = e.clientX; } });
      const up = () => { on = false; prism.classList.remove('grabbing'); }; prism.addEventListener('pointerup', up); prism.addEventListener('pointercancel', up);
    }
    return (now) => {
      const pinned = pinw.offsetHeight > innerHeight * 1.5;
      const r = pinw.getBoundingClientRect(), p = pinned ? clamp(-r.top / (r.height - innerHeight)) : 0;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!pinned && !reduce) auto += dt * 20;
      drag *= .95;
      const turn = pinned ? clamp(p / .82) * 300 : auto % 360;
      const wob = reduce ? 0 : Math.sin(now / 1400) * 4;
      const ry = -(turn + drag) + wob;
      if (p3) p3.style.transform = `rotateX(-9deg) rotateY(${ry.toFixed(2)}deg)`;
      faces.forEach((f, k) => { const a = (ry + k * 60) * Math.PI / 180; shades[k].style.opacity = clamp((1 - Math.cos(a)) * .32, 0, .6).toFixed(2); });
      setActive(((Math.round((turn + drag) / 60) % 6) + 6) % 6);
      if (zone) { const ex = clamp((p - .86) / .14); zone.style.transform = `translateX(${(ex * 110).toFixed(1)}px) scale(${(1 - ex * .1).toFixed(3)})`; zone.style.opacity = (1 - ex).toFixed(3); }
    };
  })();

  // ---------- scroll-linked frame ----------
  const pins = $$('[data-pin-steps]').map((p) => ({ p, steps: $$('[data-step]', p), navs: $$('[data-step-nav]', p), fill: p.querySelector('.pin-fill') }));
  const drifts = $$('[data-drift]'), grow = $$('[data-grow]'), zoom = $$('[data-zoom]'), waves = $$('[data-wave]');
  let lastY = scrollY;
  const frame = () => {
    const vh = innerHeight, y = scrollY;
    if (top) { top.classList.toggle('scrolled', y > 30); if (Math.abs(y - lastY) > 6) { top.classList.toggle('hide', y > lastY && y > 300 && !top.matches(':hover, :focus-within')); lastY = y; } }
    bar.style.transform = `scaleX(${clamp(y / (root.scrollHeight - vh))})`;
    if (reduce) return;
    scrub.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
      const lit = Math.round(clamp((vh * .88 - r.top) / (r.height + vh * .42)) * words.length * 1.15);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    });
    pins.forEach(({ p, steps, navs, fill }) => {
      const r = p.getBoundingClientRect(), prog = clamp(-r.top / Math.max(1, r.height - vh));
      const k = Math.min(steps.length - 1, Math.floor(prog * steps.length));
      steps.forEach((s, j) => s.classList.toggle('on', j === k)); navs.forEach((s, j) => { s.classList.toggle('on', j === k); s.classList.toggle('done', j < k); });
      if (fill) fill.style.transform = `scaleY(${prog.toFixed(3)})`;
      p.style.setProperty('--spin', (Math.sin(prog * Math.PI * 4) * 28).toFixed(1) + 'deg');
    });
    drifts.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const row = el.firstElementChild, max = Math.max(0, row.scrollWidth - el.clientWidth); row.style.transform = `translate3d(${(-clamp((vh - r.top) / (vh + r.height)) * max).toFixed(1)}px,0,0)`; });
    grow.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; el.style.setProperty('--g', clamp((vh - r.top) / (vh * .9)).toFixed(3)); });
    zoom.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; el.style.setProperty('--z', clamp((vh - r.top) / (vh + r.height)).toFixed(3)); });
    waves.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const k = clamp(((r.top + r.height / 2) - vh / 2) / vh, -1, 1); el.style.setProperty(el.dataset.wavevar || '--wave', (k * (parseFloat(el.dataset.wave) || 10)).toFixed(2) + 'deg'); });
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; frame(); }); } }, { passive: true });
  addEventListener('resize', frame); frame();

  // continuous loop: hero flywheel + small 3D extras (coin, gyroscope)
  const spins = $$('[data-spin]').map((el) => {
    const parse = (v) => Object.fromEntries((v || '').split(';').filter(Boolean).map((x) => { const [k, a, b] = x.split(':'); return [k.trim(), [+a, b === undefined ? +a : +b]]; }));
    return { el, t: el.querySelector('.p3d') || el, map: parse(el.dataset.spin), idle: parse(el.dataset.idle) };
  });
  const t0 = performance.now();
  const loop = (now) => {
    if (fly) fly(now);
    const sec = (now - t0) / 1000, vh = innerHeight;
    spins.forEach((o) => {
      const r = o.el.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
      const p = clamp((vh - r.top) / (vh + r.height));
      const v = (k) => (o.map[k] ? o.map[k][0] + (o.map[k][1] - o.map[k][0]) * p : 0) + (o.idle[k] && !reduce ? o.idle[k][0] * sec : 0);
      o.t.style.transform = `rotateX(${v('rx').toFixed(2)}deg) rotateY(${v('ry').toFixed(2)}deg) rotateZ(${v('rz').toFixed(2)}deg)`;
    });
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  if (reduce) return;

  // googly eyes follow the pointer
  const pupils = $$('.pupil');
  if (pupils.length) addEventListener('pointermove', (e) => pupils.forEach((p) => {
    const r = p.parentElement.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx), dist = Math.min(r.width * .22, Math.hypot(e.clientX - cx, e.clientY - cy) / 12);
    p.style.transform = `translate(${(Math.cos(a) * dist).toFixed(1)}px,${(Math.sin(a) * dist).toFixed(1)}px)`;
  }), { passive: true });

  if (!fine) return;

  // cursor: a short fading revenue line trailing the pointer (the system cursor stays as it is)
  const cv = d.createElement('canvas'); cv.className = 'trailc'; cv.setAttribute('aria-hidden', 'true'); d.body.append(cv);
  const ctx = cv.getContext('2d'); let dpr = 1, pts = [], running = false, hot = false;
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; };
  size(); addEventListener('resize', size);
  const draw = () => {
    const now = performance.now(); pts = pts.filter((p) => now - p.t < 520);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], life = 1 - (now - b.t) / 520;
      ctx.strokeStyle = hot ? `rgba(30,122,88,${life.toFixed(3)})` : `rgba(67,196,131,${(life * .85).toFixed(3)})`;
      ctx.lineWidth = .6 + life * (hot ? 4 : 3); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    const h = pts[pts.length - 1];
    if (h) { ctx.fillStyle = hot ? '#1E7A58' : '#43C483'; ctx.beginPath(); ctx.arc(h.x, h.y, hot ? 4 : 2.5, 0, Math.PI * 2); ctx.fill(); }
    if (pts.length) requestAnimationFrame(draw); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  };
  addEventListener('pointermove', (e) => { pts.push({ x: e.clientX, y: e.clientY, t: performance.now() }); if (pts.length > 40) pts.shift(); if (!running) { running = true; requestAnimationFrame(draw); } }, { passive: true });
  d.addEventListener('pointerover', (e) => (hot = !!e.target.closest('a, button, [data-spin], .prism, summary')));
})();
