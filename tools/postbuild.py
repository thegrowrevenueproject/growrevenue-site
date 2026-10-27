"""Post-build: truthful lastmod, sitemap.xml, llms.txt, rss.xml.

lastmod changes only when a page's main text changes (checklist T-11, Q-03).
State lives in tools/content-state.json, committed to git.
"""
import hashlib, json, os, re, sys, datetime, html
from pathlib import Path
from html.parser import HTMLParser

DIST = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
STATE = Path(__file__).with_name("content-state.json")
SITE = "https://growrevenue.co"
TODAY = datetime.date.today().isoformat()


class Main(HTMLParser):
    def __init__(self):
        super().__init__(); self.depth = 0; self.text = []; self.meta = {}; self.title = ""; self._t = False; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "main": self.depth += 1
        if tag in ("script", "style"): self.skip += 1
        if tag == "meta" and a.get("name") in ("description", "robots", "page_type"): self.meta[a["name"]] = a.get("content", "")
        if tag == "title": self._t = True
    def handle_endtag(self, tag):
        if tag == "main": self.depth -= 1
        if tag in ("script", "style"): self.skip -= 1
        if tag == "title": self._t = False
    def handle_data(self, d):
        if self._t: self.title += d
        if self.depth > 0 and not self.skip: self.text.append(d)


def pages():
    for p in sorted(DIST.rglob("index.html")):
        rel = "/" + str(p.parent.relative_to(DIST)).replace("\\", "/").strip(".") + "/"
        rel = re.sub(r"/+", "/", rel)
        m = Main(); m.feed(p.read_text(encoding="utf-8"))
        yield rel, m


state = json.loads(STATE.read_text()) if STATE.exists() else {}
entries = []
for path, m in pages():
    if "noindex" in m.meta.get("robots", ""):
        continue
    text = re.sub(r"\s+", " ", " ".join(m.text)).strip()
    h = hashlib.sha256(text.encode()).hexdigest()
    s = state.get(path)
    if not s:
        s = {"hash": h, "published": TODAY, "modified": TODAY, "words": len(text.split())}
    elif s["hash"] != h:
        old_words = s.get("words", 0) or 1
        changed = abs(len(text.split()) - old_words) / old_words
        s.update(hash=h, words=len(text.split()))
        s["modified"] = TODAY  # any text change moves lastmod; dateModified on articles uses the 5% rule
        s["material"] = TODAY if changed >= 0.05 else s.get("material", s["published"])
    state[path] = s
    entries.append((path, m, s))

STATE.write_text(json.dumps(state, indent=1, sort_keys=True))

prio = lambda p: "1.0" if p == "/" else "0.9" if p.count("/") == 2 and not p.startswith(("/case-studies/", "/privacy", "/terms", "/editorial")) else "0.6"
xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path, m, s in entries:
    xml.append(f"  <url><loc>{SITE}{path}</loc><lastmod>{s['modified']}</lastmod></url>")
xml.append("</urlset>")
(DIST / "sitemap.xml").write_text("\n".join(xml) + "\n")

order = ["/", "/paid-advertising/", "/social-media-marketing/", "/content-creation/", "/lead-generation/", "/cold-email-infrastructure/", "/funnel-audit/", "/email-marketing/", "/ai-automation/", "/email-deliverability/", "/case-studies/", "/about/", "/kunal-arora/", "/contact/"]
by = {p: m for p, m, _ in entries}
llms = ["# The Grow Revenue Company", "",
        "> Growth marketing agency that grows revenue through paid ads, social media, content creation, lead generation, cold email, funnels, email marketing, AI automation and email deliverability. Founded by Kunal Arora (123 Upwork jobs, 100% Job Success, Top Rated Plus). London, UK; clients in the US, UK, Canada and Europe.", "",
        "## Services and company"]
for p in order:
    if p in by: llms.append(f"- [{html.unescape(by[p].title.split(' | ')[0])}]({SITE}{p}): {html.unescape(by[p].meta.get('description', ''))}")
llms += ["", "## Case studies"]
for p, m, _ in entries:
    if p.startswith("/case-studies/") and p != "/case-studies/":
        llms.append(f"- [{html.unescape(m.title.split(' | ')[0])}]({SITE}{p}): {html.unescape(m.meta.get('description', ''))}")
arts = [(p, m, s) for p, m, s in entries if m.meta.get("page_type") == "article"]
if arts:
    llms += ["", "## Articles"] + [f"- [{html.unescape(m.title.split(' | ')[0])}]({SITE}{p}): {html.unescape(m.meta.get('description', ''))}" for p, m, _ in arts[:25]]
llms += ["", "## Contact", "- kunal@growrevenue.co", f"- {SITE}/contact/"]
(DIST / "llms.txt").write_text("\n".join(llms) + "\n")

rss = ['<?xml version="1.0" encoding="UTF-8"?>', '<rss version="2.0"><channel>', "<title>The Grow Revenue Company blog</title>", f"<link>{SITE}/</link>",
       "<description>Email deliverability, cold email and funnel articles by Kunal Arora.</description>", "<language>en-us</language>"]
for p, m, s in sorted(arts, key=lambda x: x[2]["published"], reverse=True):
    rss.append(f"<item><title>{html.escape(html.unescape(m.title))}</title><link>{SITE}{p}</link><guid>{SITE}{p}</guid><pubDate>{datetime.datetime.fromisoformat(s['published']).strftime('%a, %d %b %Y 00:00:00 +0000')}</pubDate><description>{html.escape(html.unescape(m.meta.get('description', '')))}</description></item>")
rss.append("</channel></rss>")
(DIST / "rss.xml").write_text("\n".join(rss) + "\n")
print(f"postbuild: {len(entries)} indexable pages, sitemap, llms.txt, rss.xml written")
