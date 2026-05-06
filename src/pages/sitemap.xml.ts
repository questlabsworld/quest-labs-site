import type { APIRoute } from 'astro';

const SITE = 'https://questlabs.world';

const pages = [
  { path: '/',                priority: '1.0', changefreq: 'weekly'  },
  { path: '/program',         priority: '0.9', changefreq: 'weekly'  },
  { path: '/educators',       priority: '0.9', changefreq: 'weekly'  },
  { path: '/about',           priority: '0.8', changefreq: 'monthly' },
  { path: '/foundations',     priority: '0.7', changefreq: 'monthly' },
  { path: '/bet',             priority: '0.7', changefreq: 'monthly' },
  { path: '/black-menagerie', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact',         priority: '0.6', changefreq: 'yearly'  },
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const urls = pages.map(({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
