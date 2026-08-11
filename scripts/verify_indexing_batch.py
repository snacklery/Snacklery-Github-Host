import re
import urllib.request
import ssl
from urllib.error import HTTPError, URLError

urls = [
    'https://www.snacklery.com/learn',
    'https://www.snacklery.com/learn/product-guides',
    'https://www.snacklery.com/learn/industry-guides',
    'https://www.snacklery.com/learn/comparisons',
    'https://www.snacklery.com/learn/buying-guide',
    'https://www.snacklery.com/learn/sustainability',
    'https://www.snacklery.com/learn/faq',
    'https://www.snacklery.com/learn/blog',
    'https://www.snacklery.com/learn/product-guides/edible-cutlery',
    'https://www.snacklery.com/learn/product-guides/edible-spoons',
    'https://www.snacklery.com/learn/product-guides/edible-sporks',
    'https://www.snacklery.com/learn/product-guides/edible-stirrers',
    'https://www.snacklery.com/learn/product-guides/edible-straws',
    'https://www.snacklery.com/learn/industry-guides/airlines',
    'https://www.snacklery.com/learn/industry-guides/hospitals',
    'https://www.snacklery.com/learn/industry-guides/hotels',
    'https://www.snacklery.com/learn/industry-guides/cafes',
    'https://www.snacklery.com/learn/industry-guides/caterers',
    'https://www.snacklery.com/learn/industry-guides/railways',
    'https://www.snacklery.com/learn/comparisons/edible-vs-plastic',
    'https://www.snacklery.com/learn/comparisons/edible-vs-paper',
    'https://www.snacklery.com/learn/comparisons/edible-vs-wooden',
]
source_pages = ['https://www.snacklery.com/', 'https://www.snacklery.com/learn'] + urls

ctx = ssl.create_default_context()
ctx.check_hostname = True
ctx.verify_mode = ssl.CERT_REQUIRED

sitemap_url = 'https://www.snacklery.com/sitemap.xml'
print('Fetching sitemap', sitemap_url)
try:
    sitemap_raw = urllib.request.urlopen(sitemap_url, timeout=30, context=ctx).read().decode('utf-8', errors='replace')
except Exception as exc:
    print('SITEMAP_ERROR', exc)
    sitemap_raw = ''
locs = set(re.findall(r'<loc>([^<]+)</loc>', sitemap_raw))
print('SITEMAP_URLS', len(locs))
print()

page_html = {}
for page in source_pages:
    try:
        req = urllib.request.Request(page, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=30, context=ctx)
        html = resp.read().decode('utf-8', errors='replace')
        page_html[page] = html
        print('FETCHED', page, resp.getcode())
    except Exception as exc:
        page_html[page] = None
        print('FAILED', page, exc)
print()

results = []
for url in urls:
    html = page_html.get(url)
    if html is None:
        status = 'FETCH_FAILED'
        title = ''
        canonical = ''
        has_canonical = False
        robots = ''
        noindex = False
    else:
        status = 200
        title_match = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
        title = title_match.group(1).strip() if title_match else ''
        canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*>', html, re.I)
        has_canonical = bool(canonical_match)
        canonical = ''
        if canonical_match:
            href_match = re.search(r'href=["\']([^"\']+)["\']', canonical_match.group(0), re.I)
            canonical = href_match.group(1) if href_match else ''
        robots_match = re.search(r'<meta[^>]+name=["\']robots["\'][^>]*>', html, re.I)
        robots = robots_match.group(0) if robots_match else ''
        noindex = bool(re.search(r'noindex|nofollow', robots, re.I))
    linked = False
    for source in source_pages:
        if source == url:
            continue
        src_html = page_html.get(source)
        if not src_html:
            continue
        if url in src_html:
            linked = True
            break
    results.append({
        'url': url,
        'title': title,
        'status': status,
        'in_sitemap': url in locs,
        'has_canonical': has_canonical,
        'canonical': canonical,
        'noindex': noindex,
        'internal_linked': linked,
    })

print('URL,STATUS,SITEMAP,CANONICAL,NOINDEX,INTERNAL_LINKED,TITLE')
for r in results:
    print(r['url'], r['status'], 'SITEMAP' if r['in_sitemap'] else 'NOSITEMAP', 'CAN' if r['has_canonical'] else 'NOCAN', 'NOINDEX' if r['noindex'] else 'OK', 'LINKED' if r['internal_linked'] else 'ORPHAN', repr(r['title']))
