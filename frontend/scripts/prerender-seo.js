/**
 * Pré-génération SEO : écrit un fichier HTML par route, avec ses propres balises
 * meta / Open Graph / canonical, afin que les robots qui n'exécutent pas
 * JavaScript (LinkedIn, Facebook, WhatsApp, Slack…) affichent le bon aperçu.
 * Les mêmes valeurs sont produites côté client par react-helmet-async.
 * Exécuté automatiquement après `yarn build`.
 */
const fs = require('fs');
const path = require('path');

const seo = require('../src/data/seo.json');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const INDEX = path.join(BUILD_DIR, 'index.html');
const template = fs.readFileSync(INDEX, 'utf8');
const { origin, ogImage, locale, name: siteName } = seo.site;

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const metaBlock = (page, url) => `
        <meta name="description" content="${escape(page.description)}" />
        <meta name="keywords" content="${escape(page.keywords)}" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="${siteName}" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="${locale}" />
        <meta property="og:title" content="${escape(page.title)}" />
        <meta property="og:description" content="${escape(page.description)}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="${url}" />
        <meta property="og:site_name" content="${siteName}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escape(page.title)}" />
        <meta name="twitter:description" content="${escape(page.description)}" />
        <meta name="twitter:image" content="${ogImage}" />
        <link rel="canonical" href="${url}" />`;

const buildPage = (page) => {
  const url = `${origin}${page.path === '/' ? '/' : page.path}`;
  let html = template;

  html = /<title>[\s\S]*?<\/title>/.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    : html.replace('</head>', `        <title>${escape(page.title)}</title>\n    </head>`);

  return html.replace('</head>', `${metaBlock(page, url)}\n    </head>`);
};

let count = 0;
Object.values(seo.pages).forEach((page) => {
  const html = buildPage(page);

  if (page.path === '/') {
    fs.writeFileSync(INDEX, html);
  } else {
    const dir = path.join(BUILD_DIR, page.path.replace(/^\//, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  count += 1;
});

console.log(`[seo] ${count} pages pré-générées avec leurs balises meta.`);
