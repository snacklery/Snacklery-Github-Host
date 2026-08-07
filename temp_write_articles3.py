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

key_regex = re.compile(r'^(?:\*\*)?\s*([^:*]+?)\s*(?:\*\*)?\s*:\s*(.*)$')

for temp_name, (output_name, collection) in files.items():
    temp_path = base / temp_name
    if not temp_path.exists():
        raise FileNotFoundError(f'Missing {temp_name}')
    raw = temp_path.read_text(encoding='utf-8')
    lines = raw.splitlines()

    metadata = {}
    body_lines = []
    in_meta = False
    after_meta = False

    for i, line in enumerate(lines):
        stripped = line.strip()
        if i == 0 and stripped.startswith('# '):
            continue
        if stripped == '---' and not in_meta and not after_meta:
            in_meta = True
            continue
        if stripped == '---' and in_meta:
            in_meta = False
            after_meta = True
            body_lines = lines[i + 1 :]
            break
        if in_meta:
            cleaned = line.replace('**', '').strip()
            parts = cleaned.split(':', 1)
            if len(parts) != 2:
                continue
            key = parts[0].strip()
            val = parts[1].strip().strip('"').strip()
            metadata[key] = val

    if not after_meta:
        raise ValueError(f'Could not parse metadata boundaries in {temp_name}')

    title = metadata.get('SEO Title') or metadata.get('title')
    description = metadata.get('Meta Description') or metadata.get('description')
    primary = metadata.get('Primary Keyword', '')
    secondary = metadata.get('Secondary Keywords', '')
    if not title or not description:
        raise ValueError(f'Missing SEO Title or Meta Description in {temp_name}')

    keywords = []
    if primary:
        keywords.append(primary)
    if secondary:
        keywords.extend([kw.strip() for kw in secondary.split(',') if kw.strip()])

    clean_body = []
    skip_toc = False
    for line in body_lines:
        stripped = line.strip()
        if skip_toc:
            if stripped == '':
                skip_toc = False
                continue
            continue
        if stripped.startswith('**SEO Title:**') or stripped.startswith('**Meta Description:**') or stripped.startswith('**URL Slug:**') or stripped.startswith('**Primary Keyword:**') or stripped.startswith('**Secondary Keywords:**'):
            continue
        if stripped == '---':
            continue
        if stripped == '### Table of Contents':
            skip_toc = True
            continue
        clean_body.append(line)

    if clean_body and clean_body[0].startswith('## H1:'):
        clean_body[0] = '## ' + clean_body[0].split('## H1:', 1)[1].strip()
    if clean_body and clean_body[0].startswith('# PRODUCT GUIDE'):
        clean_body = clean_body[1:]
    if clean_body and clean_body[0].startswith('# INDUSTRY GUIDE'):
        clean_body = clean_body[1:]

    frontmatter = [
        '---',
        f'title: "{title.replace("\"", "\\\"")}"',
        f'description: "{description.replace("\"", "\\\"")}"',
        'author: "Snacklery"',
        'date: "2026-08-06"',
        'keywords:',
    ]
    for kw in keywords:
        frontmatter.append(f'  - "{kw.replace("\"", "\\\"")}"')
    frontmatter.append(f'category: "{"Product Guide" if collection == "product-guides" else "Industry Guide"}"')
    frontmatter.append('tags:')
    frontmatter.append(f'  - "{collection.replace("-", " ")}"')
    frontmatter.append('relatedSlugs:')
    if collection == 'product-guides':
        for slug in ['edible-cutlery', 'edible-spoons', 'edible-stirrers', 'edible-straws', 'edible-sporks']:
            frontmatter.append(f'  - "{slug}"')
    else:
        for slug in ['hotels', 'airlines', 'railways']:
            frontmatter.append(f'  - "{slug}"')
    frontmatter.append('---')

    output_path = base / output_name
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text('\n'.join(frontmatter) + '\n\n' + '\n'.join(clean_body).strip() + '\n', encoding='utf-8')
    print(f'Wrote {output_name}')
