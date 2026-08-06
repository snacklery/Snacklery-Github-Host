const fs = require('fs');
const path = require('path');

const SITE_ROOT = process.env.SITE_ROOT || 'https://snacklery.com';
const workspaceRoot = path.resolve(__dirname, '..');
const contentDir = path.join(workspaceRoot, 'src', 'content');
const outDir = path.join(workspaceRoot, 'dist');

function collectionBase(folder) {
  switch (folder) {
    case 'product-guides':
      return '/learn/product-guides';
    case 'industry-guides':
      return '/learn/industry-guides';
    case 'blog':
      return '/learn/blog';
    case 'sustainability':
      return '/learn/sustainability';
    case 'buying-guide':
      return '/learn/buying-guide';
    case 'comparisons':
      return '/learn/comparisons';
    default:
      return '/learn';
  }
}

function readFrontmatterDate(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/m.exec(text);
  if (!m) return null;
  const block = m[1];
  const dateMatch = /\bdate:\s*(?:"|')?(\d{4}-\d{2}-\d{2})(?:"|')?/i.exec(block);
  return dateMatch ? dateMatch[1] : null;
}

function gatherPages() {
  const pages = [];
  if (!fs.existsSync(contentDir)) return pages;
  const collections = fs.readdirSync(contentDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  collections.forEach((coll) => {
    const folder = path.join(contentDir, coll);
    const files = fs.readdirSync(folder).filter((f) => f.endsWith('.md'));
    files.forEach((file) => {
      const full = path.join(folder, file);
      const slug = path.basename(file, '.md');
      const raw = fs.readFileSync(full, 'utf8');
      const date = readFrontmatterDate(raw) || fs.statSync(full).mtime.toISOString().slice(0, 10);
      const base = collectionBase(coll);
      pages.push({ loc: `${SITE_ROOT}${base}/${slug}`, lastmod: date });
    });
  });
  return pages;
}

function buildSitemap(pages) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const footer = '</urlset>\n';
  const items = pages
    .map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`) 
    .join('\n');
  return header + items + '\n' + footer;
}

function writeSitemap(xml) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(target, xml, 'utf8');
  console.log('Wrote', target);
}

function main() {
  const pages = gatherPages();
  const xml = buildSitemap(pages);
  writeSitemap(xml);
}

main();
