// Renders the Open Graph images (1200x630) from HTML with the site's own fonts and imagery.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const pub = path.join(__dirname, '..', 'public');
const b64 = (f) => fs.readFileSync(path.join(pub, f)).toString('base64');
const mark = fs.readFileSync(path.join(pub, 'favicon.svg'), 'utf8');
const page = (title, sub, img) => `<html><head><style>
@font-face{font-family:B;src:url(data:font/woff2;base64,${b64('fonts/bricolage.woff2')}) format('woff2');font-weight:200 800}
@font-face{font-family:I;src:url(data:font/woff2;base64,${b64('fonts/instrument-italic.woff2')}) format('woff2');font-style:italic}
body{margin:0;width:1200px;height:630px;background:#07110C;font-family:B;color:#fff;display:grid;grid-template-columns:640px 560px;overflow:hidden}
.l{padding:64px 40px 56px 64px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;font-size:26px}.brand svg{width:52px;height:52px}.brand em{font-family:I;font-weight:400;color:#A6F2C8}
h1{font-size:56px;line-height:1.02;letter-spacing:-.04em;margin:0;font-weight:800}h1 em{font-family:I;font-weight:400;color:#43C483;letter-spacing:-.01em}
p{margin:0;font-size:24px;color:#A9C2B4}.r{background:url(data:image/webp;base64,${b64(img)}) center/cover;border-left:6px solid #43C483}
</style></head><body><div class="l"><div class="brand">${mark}<span>The Grow Revenue <em>Company</em></span></div><h1>${title}</h1><p>${sub}</p></div><div class="r"></div></body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [f, t, s, img] of [
    ['og/home.png', 'The revenue-driven <em>marketing company.</em>', 'Paid ads, social, content, leads and email, measured by revenue.', 'img/cine/wallchart-1600.webp'],
    ['og/default.png', 'Marketing measured by <em>revenue.</em>', 'London. Serving the US, UK, Canada and Europe.', 'img/cine/pointing-1600.webp'],
  ]) { await p.setContent(page(t, s, img)); await p.waitForTimeout(300); await p.screenshot({ path: path.join(pub, f) }); }
  await b.close();
})();
