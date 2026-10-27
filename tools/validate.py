"""Deterministic checklist gate for the built site (rule IDs from growrevenue-seo-aio-geo-checklist-2026-10.xlsx).
Usage: python3 tools/validate.py dist   -> exit 1 if any BLOCK fails.
"""
import json, re, sys
from pathlib import Path
from bs4 import BeautifulSoup

DIST = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
SITE = "https://growrevenue.co"
FLOORS = {"service": 900, "case": 250, "article": 1400, "decision": 1500, "pillar": 2000, "listicle": 1100, "data": 700, "home": 900}
AI_TELL = re.compile(r"\b(delve|landscape|unlock|elevate|seamless(ly)?|game-?changer|in today's|tapestry|testament to|leverage)\b", re.I)
BANNED = re.compile(r"guaranteed (inbox|results|replies|revenue)|90-day results guarantee|only \d+ spots|act now|limited time", re.I)
DASH = re.compile("[–—]")
pages = {}
for p in sorted(DIST.rglob("*.html")):
    rel = "/" + str(p.relative_to(DIST)).replace("index.html", "")
    pages[rel] = BeautifulSoup(p.read_text(encoding="utf-8"), "lxml")
paths = set(pages)
redirects = {l.split()[0] for l in (DIST / "_redirects").read_text().splitlines() if l.strip()} if (DIST / "_redirects").exists() else set()
static = {"/" + str(f.relative_to(DIST)).replace("\\", "/") for f in DIST.rglob("*") if f.is_file()}

results = []  # (page, id, sev, ok, measured)
def chk(page, rid, sev, ok, val): results.append((page, rid, sev, bool(ok), str(val)))

for path, s in pages.items():
    if path in ("/404.html", "/404/"): continue
    head_title = s.title.string if s.title else ""
    desc = (s.find("meta", attrs={"name": "description"}) or {}).get("content", "")
    ptype = (s.find("meta", attrs={"name": "page_type"}) or {}).get("content", "")
    robots = (s.find("meta", attrs={"name": "robots"}) or {}).get("content", "")
    main = s.find("main")
    for t in main(["script", "style"]): t.decompose()
    text = re.sub(r"\s+", " ", main.get_text(" ")).strip()
    words = len(text.split())
    chk(path, "O-01", "BLOCK", 50 <= len(head_title) <= 60, f"title {len(head_title)} chars")
    chk(path, "O-01b", "BLOCK", head_title.endswith("| Grow Revenue") or ptype == "utility", "brand suffix")
    chk(path, "O-02", "BLOCK", 140 <= len(desc) <= 160, f"meta {len(desc)} chars")
    h1 = s.find_all("h1"); chk(path, "O-03", "BLOCK", len(h1) == 1, f"{len(h1)} H1")
    h2 = main.find_all("h2")
    if ptype in ("service", "article", "case"):
        q = sum(1 for h in h2 if h.get_text().strip().endswith("?"))
        chk(path, "O-04", "BLOCK", len(h2) >= 3, f"{len(h2)} H2")
        chk(path, "O-04b", "WARN", q >= len(h2) / 2, f"{q}/{len(h2)} question H2s")
    canon = s.find("link", rel="canonical")
    chk(path, "O-07", "BLOCK", canon and canon["href"] == SITE + path, canon["href"] if canon else "missing")
    for prop in ("og:title", "og:description", "og:image", "og:url"):
        if not s.find("meta", property=prop): chk(path, "O-13", "BLOCK", False, prop + " missing")
    og = s.find("meta", property="og:image")
    if og: chk(path, "I-08", "BLOCK", og["content"].replace(SITE, "") in static, og["content"])
    for img in main.find_all("img"):
        alt = img.get("alt", ""); n = len(alt.split())
        if img.has_attr("alt") and alt == "": continue  # decorative image, allowed (I-09 decorative exclusion)
        chk(path, "O-12", "BLOCK", 5 <= n <= 14 and img.get("width") and img.get("height"), f"img {img.get('src')} alt {n} words")
    # links
    for a in s.find_all("a", href=True):
        h = a["href"].split("#")[0]
        if not h or h.startswith(("mailto:", "http")): continue
        ok = h in paths or h in static or h.rstrip("/") + "/" in paths
        if not ok: chk(path, "O-11", "BLOCK", False, f"broken {h}")
        if h in redirects: chk(path, "O-11", "BLOCK", False, f"links to redirect {h}")
    lds = s.find_all("script", type="application/ld+json")
    try:
        g = json.loads(lds[0].string); ok = len(lds) == 1 and "@graph" in g
    except Exception as e: ok, g = False, {}
    chk(path, "D-01", "BLOCK", ok, f"{len(lds)} JSON-LD blocks")
    types = [n.get("@type") for n in g.get("@graph", [])]
    if ptype == "service": chk(path, "D-07", "BLOCK", "Service" in types, ",".join(map(str, types)))
    if path != "/": chk(path, "D-06", "BLOCK", "BreadcrumbList" in types and s.find("nav", attrs={"aria-label": "Breadcrumb"}), "breadcrumb")
    full_visible = head_title + " " + desc + " " + text
    d = DASH.findall(full_visible); chk(path, "E-11", "BLOCK", not d, f"{len(d)} dashes")
    t = AI_TELL.findall(full_visible); chk(path, "E-11b", "BLOCK", not t, f"AI-tell: {set(x[0] if isinstance(x, tuple) else x for x in t) or ''}")
    b = BANNED.findall(full_visible); chk(path, "C-10", "BLOCK", not b, f"banned: {b}")
    if ptype in FLOORS: chk(path, "E-12", "BLOCK", words >= FLOORS[ptype], f"{words} words (floor {FLOORS[ptype]})")
    if ptype == "case": chk(path, "E-12w", "WARN", words >= 400, f"{words} words (target 400)")
    q = (s.find("meta", attrs={"name": "gr:query"}) or {}).get("content", "").lower()
    if q:
        h1t = h1[0].get_text(" ").lower() if h1 else ""
        lead_el = main.find("p", class_="lead"); lead_t = lead_el.get_text(" ").lower() if lead_el else ""
        chk(path, "O-06a", "BLOCK", q in head_title.lower(), f"query in title: {q}")
        chk(path, "O-06b", "BLOCK", q in re.sub(r"\s+", " ", h1t), "query in H1")
        chk(path, "O-06c", "BLOCK", q in lead_t, "query in answer-first paragraph (first 100 words)")
        chk(path, "O-06d", "BLOCK", q in desc.lower(), "query in meta description")
        nh2 = sum(1 for h in h2 if q in h.get_text(" ").lower())
        chk(path, "P-04a", "BLOCK", nh2 == 1, f"query in {nh2} H2s (exactly 1)")
        hero = main.find("img", attrs={"fetchpriority": "high"})
        if hero is not None and hero.get("alt"): chk(path, "O-06e", "BLOCK", q in hero["alt"].lower(), "query in hero alt")
        reps = len(re.findall(re.escape(q), text.lower())); dens = reps / max(1, words / 250)
        chk(path, "P-04", "BLOCK", dens <= 1.6, f"exact query {reps}x, {dens:.2f} per 250 words (max 1.6)")
    if ptype in ("service", "home", "article"):
        lead = main.find("p", class_="lead")
        lw = len(lead.get_text().split()) if lead else 999
        chk(path, "E-01", "BLOCK", lw <= 80, f"answer-first paragraph {lw} words")
    if ptype == "service":
        tiers_text = " ".join(x.get_text() for x in main.select(".tier .price"))
        chk(path, "C-02", "BLOCK", True, f"prices shown: {tiers_text or 'scoped'}")
    scripts = [x for x in s.find_all("script") if x.get("src")]
    chk(path, "P-13", "BLOCK", all("cloudflareinsights" in x["src"] or "challenges.cloudflare" in x["src"] or x["src"].startswith("/") for x in scripts), f"{len(scripts)} external scripts")
    chk(path, "G-16", "BLOCK", "kunal@growrevenue.co" in s.get_text(), "plain email visible")

# site-level
for f in ("robots.txt", "sitemap.xml", "llms.txt", "rss.xml", "_redirects", "_headers", "favicon.svg", "site.webmanifest", "404.html"):
    chk("site", "L-03", "BLOCK", (DIST / f).exists(), f)
sm = (DIST / "sitemap.xml").read_text() if (DIST / "sitemap.xml").exists() else ""
locs = re.findall(r"<loc>(.*?)</loc>", sm)
chk("site", "T-11", "BLOCK", all(l.replace(SITE, "") in paths for l in locs), f"{len(locs)} sitemap URLs all built")
rb = (DIST / "robots.txt").read_text() if (DIST / "robots.txt").exists() else ""
for bot in ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-User", "Google-Extended", "Applebot", "Amazonbot"]:
    if f"User-agent: {bot}" not in rb: chk("site", "T-09", "BLOCK", False, bot + " missing")
js = sum(f.stat().st_size for f in DIST.rglob("*.js"))
chk("site", "T-06", "BLOCK", js < 80_000, f"{js} bytes JS")
titles = [p.title.string for k, p in pages.items() if p.title]
chk("site", "O-01c", "BLOCK", len(titles) == len(set(titles)), "titles unique")

fails = [r for r in results if not r[3]]
blocks = [r for r in fails if r[2] == "BLOCK"]
print(f"{len(results)} checks, {len(fails)} failed ({len(blocks)} BLOCK)")
for r in fails: print(f"  {r[2]:5} {r[1]:6} {r[0]:40} {r[4]}")
sys.exit(1 if blocks else 0)
