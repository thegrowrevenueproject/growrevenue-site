// Motion layer v2. Scroll-linked: pinned hero fade, scrubbed word reveals, stacking cards,
// pinned stepper, horizontal track, media grow, image zoom, progress bar.
// Interaction: typewriter, draggable cube, flip cards, FAQ panel, googly eyes, tilt, magnetic buttons, cursor.
// Everything degrades to static, readable content without JS or with reduced motion.
(() => {
  const d = document, root = d.documentElement, $$ = (s, c = d) => [...c.querySelectorAll(s)];
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // header state + progress bar
  const top = d.querySelector('.top');
  const bar = d.createElement('div'); bar.className = 'progress'; d.body.append(bar);

  // split headings into words (entrance animation)
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
      } else if (n.nodeType === 1 && !n.matches('.rotator,[data-type]')) walk(n);
    });
    walk(el); el.classList.add('split');
    $$('.w > span', el).forEach((s, k) => (s.style.transitionDelay = k * 0.045 + 's'));
  });

  // scrubbed word reveal: words light up as the block scrolls through the viewport
  const scrub = $$('[data-scrub]').map((el) => {
    const words = [];
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = d.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.append(t); return; }
          const s = d.createElement('span'); s.className = 'sw'; s.textContent = t; words.push(s); frag.append(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el); el.classList.add('scrubbing');
    return { el, words };
  });

  // prose blocks reveal as they enter
  $$('.prose > h2, .prose > p, .prose > ul, .prose > ol, .prose > .table-wrap').forEach((el) => el.classList.add('reveal'));
  if (reduce) $$('svg.trail').forEach((s) => s.pauseAnimations && s.pauseAnimations());

  // reveal on enter
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -4% 0px' });
  $$('.reveal, .split, .fan, .clip').forEach((el) => (reduce ? el.classList.add('in') : io.observe(el)));

  // counters
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    if (reduce) return;
    const el = e.target, end = parseFloat(el.dataset.count), pre = el.dataset.pre || '', suf = el.dataset.suf || '', dec = +(el.dataset.dec || 0);
    const t0 = performance.now(), dur = 1700;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 3)); el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .4 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  // typewriter (JiroNews): types each word, deletes, moves on. Static text stays in the HTML for crawlers.
  $$('[data-type]').forEach((el) => {
    const words = el.dataset.type.split('|'); el.classList.add('typing');
    if (reduce) return;
    let w = 0, i = words[0].length, del = true;
    const tick = () => {
      const word = words[w];
      if (del) { i--; if (i <= 0) { del = false; w = (w + 1) % words.length; } }
      else { i++; if (i >= words[w].length) { del = true; el.textContent = words[w]; return setTimeout(tick, 2200); } }
      el.textContent = words[w].slice(0, Math.max(0, i)) || ' ';
      setTimeout(tick, del ? 45 : 85);
    };
    setTimeout(tick, 2600);
  });

  // lazy videos: load near the viewport, pause off screen
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.dataset.loaded) { $$('source[data-src]', v).forEach((s) => (s.src = s.dataset.src)); v.load(); v.dataset.loaded = '1'; }
      if (!reduce) v.play().catch(() => {});
    } else v.pause();
  }), { rootMargin: '300px' });
  $$('video[data-lazy]').forEach((v) => vio.observe(v));

  // case tabs (Growlio case studies)
  $$('[data-tabs]').forEach((box) => {
    const tabs = $$('[role="tab"]', box), panels = $$('[role="tabpanel"]', box);
    const show = (k) => { tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === k); t.tabIndex = j === k ? 0 : -1; }); panels.forEach((p, j) => { p.hidden = j !== k; if (j === k) { p.classList.remove('in'); requestAnimationFrame(() => p.classList.add('in')); } }); };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => show(k));
      t.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = (k + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length; show(n); tabs[n].focus(); } });
    });
    show(0);
  });

  // FAQ two-panel (Growlio): question list left, answer right. Without JS every answer shows.
  $$('[data-faq]').forEach((box) => {
    const qs = $$('.fq', box), as = $$('.fa', box); box.classList.add('live');
    const show = (k) => { qs.forEach((q, j) => q.setAttribute('aria-expanded', j === k)); as.forEach((a, j) => a.classList.toggle('on', j === k)); };
    qs.forEach((q, k) => { q.addEventListener('click', () => show(k)); if (fine) q.addEventListener('pointerenter', () => show(k)); });
    show(0);
  });

  // flip cards: tap to flip on touch, hover/focus on desktop
  $$('.fcard').forEach((c) => c.addEventListener('click', () => c.classList.toggle('flipped')));

  // ---------- scroll-linked engine ----------
  const hero = d.querySelector('[data-pin-hero]');
  const stacks = $$('[data-stack]').map((s) => ({ s, cards: [...s.children] }));
  const pins = $$('[data-pin-steps]').map((p) => ({ p, steps: $$('[data-step]', p), navs: $$('[data-step-nav]', p), fill: p.querySelector('.pin-fill') }));
  const hs = $$('[data-hscroll]').map((h) => ({ h, track: h.querySelector('.htrack') }));
  const grow = $$('[data-grow]'), zoom = $$('[data-zoom]'), px = $$('[data-parallax]');
  const waves = $$('[data-wave]'), cards3 = $$('.hcard');
  // scroll progress of an element through the viewport, 0 entering at the bottom, 1 leaving at the top
  const prog = (el) => { const r = el.getBoundingClientRect(); return clamp((innerHeight - r.top) / (innerHeight + r.height)); };

  const sizeH = () => hs.forEach(({ h, track }) => {
    if (innerWidth < 700) { h.style.height = ''; return; }
    const extra = Math.max(0, track.scrollWidth - innerWidth + 64);
    h.style.height = innerHeight + extra + 'px';
  });

  const frame = () => {
    const vh = innerHeight, y = scrollY;
    top && top.classList.toggle('scrolled', y > 30);
    bar.style.transform = `scaleX(${clamp(y / (root.scrollHeight - vh))})`;
    if (reduce) return;

    if (hero) { const p = clamp(y / vh); hero.style.setProperty('--p', p.toFixed(3)); }

    scrub.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
      const p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.42));
      const lit = Math.round(p * words.length * 1.15);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    });

    stacks.forEach(({ cards }) => cards.forEach((c, i) => {
      const next = cards[i + 1]; if (!next) return;
      const r = c.getBoundingClientRect(), n = next.getBoundingClientRect();
      const cover = clamp(1 - (n.top - r.top) / Math.max(1, r.height));
      c.style.setProperty('--cover', cover.toFixed(3));
      const stuck = r.top <= (parseFloat(getComputedStyle(c).top) || 0) + 2;
      c.style.setProperty('--fade', stuck ? clamp((r.bottom - n.top + 120) / 180).toFixed(3) : '0');
    }));

    pins.forEach(({ p, steps, navs, fill }) => {
      const r = p.getBoundingClientRect(), total = r.height - vh;
      const prog = clamp(-r.top / Math.max(1, total));
      const k = Math.min(steps.length - 1, Math.floor(prog * steps.length));
      steps.forEach((s, j) => s.classList.toggle('on', j === k));
      navs.forEach((s, j) => { s.classList.toggle('on', j === k); s.classList.toggle('done', j < k); });
      if (fill) fill.style.transform = `scaleY(${prog.toFixed(3)})`;
      p.style.setProperty('--spin', (Math.sin(prog * Math.PI * 4) * 28).toFixed(1) + 'deg');
    });

    if (innerWidth >= 700) hs.forEach(({ h, track }) => {
      const r = h.getBoundingClientRect(), total = r.height - vh;
      const prog = clamp(-r.top / Math.max(1, total));
      track.style.transform = `translate3d(${(-prog * Math.max(0, track.scrollWidth - innerWidth + 64)).toFixed(1)}px,0,0)`;
    });

    grow.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const p = clamp((vh - r.top) / (vh * 0.9));
      el.style.setProperty('--g', p.toFixed(3));
    });
    zoom.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      el.style.setProperty('--z', clamp((vh - r.top) / (vh + r.height)).toFixed(3));
    });
    // coverflow: strip cards turn toward the centre of the screen
    if (innerWidth >= 700) cards3.forEach((c) => {
      const r = c.getBoundingClientRect(); if (r.right < -100 || r.left > innerWidth + 100) return;
      const k = clamp(((r.left + r.width / 2) - innerWidth / 2) / (innerWidth / 2), -1, 1);
      c.style.setProperty('--ry', (k * -32).toFixed(1) + 'deg'); c.style.setProperty('--sc', (1 - Math.abs(k) * .08).toFixed(3));
    });
    // gentle Y-rotation wave tied to vertical position (testimonials, team, icons)
    waves.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const k = clamp(((r.top + r.height / 2) - vh / 2) / vh, -1, 1), amp = parseFloat(el.dataset.wave) || 10;
      el.style.setProperty(el.dataset.wavevar || '--wave', (k * amp).toFixed(2) + 'deg');
    });
    px.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      const s = parseFloat(el.dataset.parallax) || 0.15, c = r.top + r.height / 2 - vh / 2;
      el.style.translate = `0 ${(-c * s).toFixed(1)}px`;
    });
  };
  let ticking = false;
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; frame(); }); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { sizeH(); req(); });
  addEventListener('load', () => { sizeH(); req(); });
  sizeH(); frame();

  if (reduce) return;

  // scroll-driven 3D objects: data-spin="ry:-20:340;rx:-12:12" maps scroll progress to rotation,
  // data-idle="ry:8" adds slow drift in degrees per second, data-drag lets the pointer add rotation.
  const spins = $$('[data-spin]').map((el) => {
    const parse = (v) => Object.fromEntries((v || '').split(';').filter(Boolean).map((x) => { const [k, a, b] = x.split(':'); return [k.trim(), [+a, b === undefined ? +a : +b]]; }));
    const o = { el, t: el.querySelector('.p3d') || el, map: parse(el.dataset.spin), idle: parse(el.dataset.idle), page: el.dataset.src === 'page', dx: 0, dy: 0, vis: true, ring: el.matches('.ring3d') ? $$('.p3d > a', el) : null };
    if (el.hasAttribute('data-drag')) {
      let on = false, lx = 0, ly = 0;
      el.addEventListener('pointerdown', (e) => { on = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); el.classList.add('grabbing'); });
      el.addEventListener('pointermove', (e) => { if (!on) return; o.dy += (e.clientX - lx) * .4; o.dx = clamp(o.dx - (e.clientY - ly) * .4, -50, 50); lx = e.clientX; ly = e.clientY; });
      const up = () => { on = false; el.classList.remove('grabbing'); };
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    }
    return o;
  });
  const sio = new IntersectionObserver((es) => es.forEach((e) => { const o = spins.find((x) => x.el === e.target); if (o) o.vis = e.isIntersecting; }), { rootMargin: '100px' });
  spins.forEach((o) => sio.observe(o.el));
  const t0 = performance.now();
  const spinLoop = (now) => {
    const sec = (now - t0) / 1000;
    spins.forEach((o) => {
      if (!o.vis) return;
      const p = o.page ? clamp(scrollY / (innerHeight * 1.4)) : prog(o.el);
      const v = (k) => { const m = o.map[k]; return (m ? m[0] + (m[1] - m[0]) * p : 0) + (o.idle[k] ? o.idle[k][0] * sec : 0); };
      const ry = v('ry') + o.dy;
      o.t.style.transform = `rotateX(${(v('rx') + o.dx).toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${v('rz').toFixed(2)}deg)`;
      // ring: only tiles facing the viewer stay visible, so side tiles never sit over front ones
      if (o.ring) o.ring.forEach((a, k) => { const c = Math.cos((ry + k * 40) * Math.PI / 180), op = c > .62 ? 1 : 0; a.style.opacity = op.toFixed(2); a.style.pointerEvents = op > .5 ? '' : 'none'; a.tabIndex = op > .5 ? 0 : -1; });
    });
    requestAnimationFrame(spinLoop);
  };
  if (spins.length) requestAnimationFrame(spinLoop);

  // googly eyes follow the pointer (Growlio footer)
  const pupils = $$('.pupil');
  if (pupils.length) addEventListener('pointermove', (e) => pupils.forEach((p) => {
    const r = p.parentElement.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx), dist = Math.min(r.width * .22, Math.hypot(e.clientX - cx, e.clientY - cy) / 12);
    p.style.transform = `translate(${(Math.cos(a) * dist).toFixed(1)}px,${(Math.sin(a) * dist).toFixed(1)}px)`;
  }), { passive: true });

  if (!fine) return;

  $$('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  $$('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * .15}px ${(e.clientY - r.top - r.height / 2) * .25}px`; });
    b.addEventListener('pointerleave', () => (b.style.translate = ''));
  });

  // cursor: dot + trailing ring, grows on links, shows a label on [data-cursor]
  const dot = d.createElement('div'), ring = d.createElement('div');
  dot.className = 'cursor-dot'; ring.className = 'cursor-ring'; d.body.append(dot, ring);
  let mx = -100, my = -100, rx2 = -100, ry2 = -100;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
  const loop = () => { rx2 += (mx - rx2) * .18; ry2 += (my - ry2) * .18; ring.style.transform = `translate(${rx2}px,${ry2}px)`; requestAnimationFrame(loop); };
  loop();
  d.addEventListener('pointerover', (e) => {
    const lab = e.target.closest('[data-cursor]');
    ring.classList.toggle('label', !!lab); ring.textContent = lab ? lab.dataset.cursor : '';
    ring.classList.toggle('big', !lab && !!e.target.closest('a, button, [data-tilt], summary'));
  });
})();
