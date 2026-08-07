from pathlib import Path
import re

base = Path.cwd()
files = {
    'temp_product_guides_01.txt': ('src/content/product-guides/edible-cutlery.md', 'product-guides'),
    'temp_product_guides_02.txt': ('src/content/product-guides/edible-spoons.md', 'product-guides'),
    'temp_product_guides_03.txt': ('src/content/product-guides/edible-stirrers.md', 'product-guides'),
    'temp_product_guides_04.txt': ('src/content/product-guides/edible-straws.md', 'product-guides'),
    'temp_product_guides_05.txt': ('src/content/product-guides/edible-sporks.md', 'product-guides'),
    'temp_industry_guides_01.txt': ('src/content/industry-guides/hotels.md', 'industry-guides'),
    'temp_industry_guides_02.txt': ('src/content/industry-guides/airlines.md', 'industry-guides'),
    'temp_industry_guides_03.txt': ('src/content/industry-guides/railways.md', 'industry-guides'),
}

for temp, (out, coll) in files.items():
    path = base / temp
    if not path.exists():
        raise FileNotFoundError(f'Missing {temp}')
    text = path.read_text(encoding='utf-8')
    parts = text.split('---\n')
    if len(parts) < 3:
        raise ValueError(f'Unexpected structure in {temp}')
    body = '---\n'.join(parts[2:]).strip()
    if body.startswith('# '):
        body = '\n'.join(body.splitlines()[1:]).lstrip()
    body = re.sub(r'### Table of Contents\n(?:\d+\. .*\n)+\n', '', body)
    body = re.sub(r'\n\n---\n\n', '\n\n', body)
    if body.startswith('## H1: '):
        body = '## ' + body[len('## H1: '):]
    if body.startswith('# PRODUCT GUIDE') or body.startswith('# INDUSTRY GUIDE'):
        body = '\n'.join(body.splitlines()[1:]).lstrip()

    title = None
    desc = None
    keywords = []
    for line in parts[1].splitlines():
        if ':' not in line:
            continue
        key, val = line.split(':', 1)
        key = key.strip()
        val = val.strip().strip('"')
        if key == 'SEO Title':
            title = val
        elif key == 'Meta Description':
            desc = val
        elif key == 'Primary Keyword':
            keywords.append(val)
        elif key == 'Secondary Keywords':
            keywords.extend([k.strip() for k in val.split(',') if k.strip()])

    if not title or not desc:
        raise ValueError(f'Missing title/desc in {temp}')

    frontmatter = [
        f'title: "{title.replace("\"", "\\\"")}"',
        f'description: "{desc.replace("\"", "\\\"")}"',
        'author: "Snacklery"',
        'date: "2026-08-06"',
        'keywords:',
    ]
    for kw in keywords:
        frontmatter.append(f'  - "{kw.replace("\"", "\\\"")}"')
    frontmatter.append(f'category: "{"Product Guide" if coll == "product-guides" else "Industry Guide"}"')
    frontmatter.append('tags:')
    frontmatter.append(f'  - "{coll.replace("-", " ")}"')
    frontmatter.append('relatedSlugs:')
    if coll == 'product-guides':
        for slug in ['edible-cutlery', 'edible-spoons', 'edible-stirrers', 'edible-straws', 'edible-sporks']:
            frontmatter.append(f'  - "{slug}"')
    else:
        for slug in ['hotels', 'airlines', 'railways']:
            frontmatter.append(f'  - "{slug}"')

    outpath = base / out
    outpath.parent.mkdir(parents=True, exist_ok=True)
    outpath.write_text('---\n' + '\n'.join(frontmatter) + '\n---\n\n' + body + '\n', encoding='utf-8')
    print('Wrote', out)
