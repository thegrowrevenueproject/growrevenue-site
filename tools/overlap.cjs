const { chromium } = require('playwright');
(async () => {
  const [url, w, h] = [process.argv[2], +process.argv[3], +process.argv[4]];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const found = new Map();
  for (let y = 0; y < H; y += Math.round(h * 0.35)) {
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(450);
    const res = await p.evaluate(() => {
      const out = []; const head = 80;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.textContent.trim().length > 1 ? 1 : 2 });
      let n;
      while ((n = walker.nextNode())) {
        const el = n.parentElement; if (!el || el.closest('script,style,svg,.marquee,.sr,.top,.progress,.prism,.trailc')) continue;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
        // skip text inside elements hidden by an ancestor's opacity 0 or display none
        let a = el, hidden = false; while (a && a !== document.body) { const c = getComputedStyle(a); if (+c.opacity < 0.05 || c.display === 'none' || a.hidden) { hidden = true; break; } a = a.parentElement; }
        if (hidden) continue;
        if (el.checkVisibility && !el.checkVisibility()) continue; // e.g. text inside a closed <details>
        const r = document.createRange(); r.selectNodeContents(n);
        for (const q of r.getClientRects()) {
          if (q.width < 4 || q.height < 4) continue;
          const cx = q.left + q.width / 2, cy = q.top + q.height / 2;
          if (cy < head || cy > innerHeight - 2 || cx < 0 || cx > innerWidth) continue;
          const hit = document.elementFromPoint(cx, cy);
          if (!hit || hit === el || el.contains(hit) || hit.contains(el)) continue;
          // an invisible element on top (opacity ~0, mid-fade) does not hide anything the visitor can see
          let h2 = hit, inv = false; while (h2 && h2 !== document.body) { const c2 = getComputedStyle(h2); if (+c2.opacity < 0.05 || c2.visibility === 'hidden') { inv = true; break; } h2 = h2.parentElement; }
          if (inv) continue;
          // text inside a 3D-rotated parent can report its own subtree; accept common ancestor cards
          if (hit.closest('.fcard-inner') && el.closest('.fcard-inner') === hit.closest('.fcard-inner')) continue;
          out.push({ text: n.textContent.trim().slice(0, 50), el: el.tagName + '.' + el.className.toString().slice(0, 30), by: hit.tagName + '.' + hit.className.toString().slice(0, 40), y: scrollY });
          break;
        }
      }
      return out;
    });
    res.forEach(r => { const k = r.text + '|' + r.by; if (!found.has(k)) found.set(k, r); });
  }
  console.log(url, w + 'x' + h, 'height', H, 'overlaps', found.size, 'errors', JSON.stringify(errs));
  [...found.values()].slice(0, 60).forEach(r => console.log(`  y=${r.y} "${r.text}" (${r.el}) covered by ${r.by}`));
  await b.close();
})();
