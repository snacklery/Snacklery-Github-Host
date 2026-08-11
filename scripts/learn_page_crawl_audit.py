import re
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser

BASE = "https://www.snacklery.com"
USER_AGENT = "Mozilla/5.0 (compatible; AuditBot/1.0; +https://www.snacklery.com)"

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.canonical = None
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == "a" and "href" in attr:
            self.links.append(attr["href"])
        elif tag == "link" and attr.get("rel", "").lower() == "canonical" and "href" in attr:
            self.canonical = attr["href"].strip()
        elif tag == "meta" and attr.get("name", "").lower() == "robots" and "content" in attr:
            if "noindex" in attr["content"].lower().split(","):
                self.noindex = True


def fetch(url, max_retries=2):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(max_retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return resp.status, resp.read().decode("utf-8", errors="replace")
        except Exception as exc:
            if attempt == max_retries:
                return None, str(exc)
            time.sleep(1)
    return None, "failed"


def normalize_url(url, base=BASE):
    if not url:
        return None
    url = url.strip()
    if url.startswith("//"):
        url = "https:" + url
    if url.startswith("/"):
        return urllib.parse.urljoin(base, url)
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme in ("http", "https") and parsed.netloc.endswith("snacklery.com"):
        return urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", parsed.query, ""))
    return None


def in_site(url):
    if not url:
        return False
    n = normalize_url(url)
    return n is not None and urllib.parse.urlparse(n).netloc.endswith("snacklery.com")


def parse_sitemap(url):
    status, content = fetch(url)
    if status != 200:
        raise RuntimeError(f"Failed to fetch sitemap {url}: {status}")
    urls = re.findall(r"<loc>([^<]+)</loc>", content)
    return sorted(set(urls))


def link_targets(html, base_url):
    parser = LinkParser()
    parser.feed(html)
    raw_links = parser.links
    resolved = []
    for href in raw_links:
        if not href or href.strip().startswith("javascript:"):
            continue
        normalized = normalize_url(href, base=base_url)
        if normalized:
            resolved.append(normalized)
    return parser.canonical, parser.noindex, sorted(set(resolved))


def page_info(url):
    status, html = fetch(url)
    if status is None:
        return {"status": None, "error": html, "canonical": None, "noindex": False, "links": []}
    canonical, noindex, links = link_targets(html, base_url=url)
    return {"status": status, "canonical": canonical, "noindex": noindex, "links": links}


def reachable_from(start, target, adjacency, max_depth=None):
    seen = {start}
    frontier = [(start, 0)]
    while frontier:
        current, depth = frontier.pop(0)
        if current == target:
            return True, depth
        if max_depth is not None and depth >= max_depth:
            continue
        for nxt in adjacency.get(current, []):
            if nxt not in seen:
                seen.add(nxt)
                frontier.append((nxt, depth + 1))
    return False, None


def main():
    sitemap_url = BASE + "/sitemap.xml"
    sitemap_urls = parse_sitemap(sitemap_url)

    learn_urls = [u for u in sitemap_urls if urllib.parse.urlparse(u).path.startswith("/learn")]
    home_url = BASE + "/"
    learn_hub_url = BASE + "/learn"

    pages_to_check = sorted(set([home_url, learn_hub_url] + learn_urls))
    results = {}
    link_graph = {}

    print(f"Parsed {len(sitemap_urls)} sitemap URLs, {len(learn_urls)} learn URLs")

    for page in pages_to_check:
        info = page_info(page)
        results[page] = info
        link_graph[page] = [link for link in info["links"] if link.startswith(BASE)]
        print(f"Fetched {page} -> {info['status']}")
        time.sleep(0.2)

    # Check internal link targets and broken links for each learn page
    broken_links = {}
    for page in learn_urls:
        page_links = link_graph.get(page, [])
        bad = []
        for target in page_links:
            status, _ = fetch(target)
            if status is None or status >= 400:
                bad.append((target, status))
                print(f"Broken link from {page} -> {target}: {status}")
            time.sleep(0.1)
        if bad:
            broken_links[page] = bad

    inbound = {page: [] for page in pages_to_check}
    for src, targets in link_graph.items():
        for tgt in targets:
            if tgt in inbound:
                inbound[tgt].append(src)

    issues = {
        "ready": [],
        "needs_fixing": [],
        "missing_internal_links": [],
        "broken_links": [],
        "orphan_pages": [],
    }

    for page in learn_urls:
        info = results[page]
        page_issues = []
        if info["status"] != 200:
            page_issues.append("HTTP status not 200")
        if page not in sitemap_urls:
            page_issues.append("Missing from sitemap")
        if info["canonical"] != page:
            page_issues.append(f"Canonical mismatch ({info['canonical']})")
        if info["noindex"]:
            page_issues.append("Contains noindex")
        if len(inbound.get(page, [])) == 0:
            page_issues.append("No incoming internal links")
        if not reachable_from(learn_hub_url, page, link_graph)[0]:
            page_issues.append("Not reachable from Learn Hub")
        reachable_3, depth = reachable_from(home_url, page, link_graph, max_depth=3)
        if not reachable_3:
            page_issues.append("Not reachable from homepage within 3 clicks")
        if page in broken_links:
            page_issues.append("Has broken internal links")

        if page_issues:
            issues["needs_fixing"].append((page, page_issues))
        else:
            issues["ready"].append(page)

        if len(inbound.get(page, [])) == 0:
            issues["missing_internal_links"].append(page)
        if page in broken_links:
            issues["broken_links"].append((page, broken_links[page]))

    orphan_pages = [page for page, incomings in inbound.items() if page in learn_urls and len(incomings) == 0]
    issues["orphan_pages"] = orphan_pages

    print("\n=== AUDIT RESULTS ===\n")
    print("Ready for indexing:")
    for item in issues["ready"]:
        print("-", item)
    print("\nNeeds fixing:")
    for page, details in issues["needs_fixing"]:
        print("-", page)
        for d in details:
            print("   -", d)
    print("\nMissing internal links:")
    for item in issues["missing_internal_links"]:
        print("-", item)
    print("\nBroken links:")
    for page, bads in issues["broken_links"]:
        print("-", page)
        for tgt, status in bads:
            print(f"    -> {tgt} => {status}")

if __name__ == "__main__":
    main()
