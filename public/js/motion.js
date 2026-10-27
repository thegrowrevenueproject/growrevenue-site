// Motion layer: reveal on scroll, split headlines, parallax, tilt, cursor, counters, word rotator, lazy video.
(() => {
  const d = document, root = d.documentElement;
  root.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // header state
  const top = d.querySelector('.top');
  const onScrollHeader = () => top && top.classList.toggle('scrolled', scrollY > 30);
  requestAnimationFrame(onScrollHeader); addEventListener('scroll', onScrollHeader, { passive: true });

  // split headings into words
  d.querySelectorAll('[data-split]').forEach((el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.append(t); return; }
            const w = d.createElement('span'); w.className = 'w';
            const i = d.createElement('span'); i.textContent = t; w.append(i); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('rotator')) walk(n);
      });
    };
    walk(el); el.classList.add('split');
    el.querySelectorAll('.w > span').forEach((s, k) => (s.style.transitionDelay = k * 0.05 + 's'));
  });

  // reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  d.querySelectorAll('.reveal, .split').forEach((el) => (reduce ? el.classList.add('in') : io.observe(el)));

  // counters
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    if (reduce) return;
    const t0 = performance.now(), dur = 1600;
    const dec = +(el.dataset.dec || 0); const step = (t) => { const p = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - p, 3)); el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .4 });
  d.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

  // word rotator
  d.querySelectorAll('.rotator').forEach((r) => {
    const items = [...r.children]; let i = 0; items[0].classList.add('on');
    if (reduce || items.length < 2) return;
    setInterval(() => { items[i].classList.remove('on'); i = (i + 1) % items.length; items[i].classList.add('on'); }, 2400);
  });

  // lazy videos: load when near the viewport, pause when off screen
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.dataset.loaded) { v.querySelectorAll('source[data-src]').forEach((s) => (s.src = s.dataset.src)); v.load(); v.dataset.loaded = '1'; }
      if (!reduce) v.play().catch(() => {});
    } else v.pause();
  }), { rootMargin: '200px' });
  d.querySelectorAll('video[data-lazy]').forEach((v) => vio.observe(v));

  if (reduce) return;

  // parallax
  const px = [...d.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const para = () => {
    const vh = innerHeight;
    px.forEach((el) => {
      const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      const s = parseFloat(el.dataset.parallax) || 0.15, c = r.top + r.height / 2 - vh / 2;
      el.style.translate = `0 ${(-c * s).toFixed(1)}px`;
    });
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(para); } }, { passive: true }); para();

  if (!fine) return;

  // tilt
  d.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });

  // magnetic buttons
  d.querySelectorAll('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * .15}px ${(e.clientY - r.top - r.height / 2) * .25}px`; });
    b.addEventListener('pointerleave', () => (b.style.translate = ''));
  });

  // cursor
  const dot = d.createElement('div'), ring = d.createElement('div');
  dot.className = 'cursor-dot'; ring.className = 'cursor-ring'; d.body.append(dot, ring);
  let mx = -100, my = -100, rx = -100, ry = -100;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; }, { passive: true });
  const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); };
  loop();
  d.addEventListener('pointerover', (e) => ring.classList.toggle('big', !!e.target.closest('a, button, [data-tilt], summary')));
})();
