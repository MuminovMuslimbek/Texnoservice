import { locales } from '../i18n';

const baseUrl = 'https://www.yoursite.com';

// Dynamic services sluglar
const services = [
    'washing-machine',
    'gas-stove',
    'air-conditioner',
    'refrigerator',
    'dishwasher',
    'microwave'
];

export default async function GET() {
    const urls: string[] = [];

    // Har bir til uchun home page va services URL-lari
    for (const locale of locales) {
        // Home page
        urls.push(`${baseUrl}/${locale}`);

        // Har bir xizmat
        for (const service of services) {
            urls.push(`${baseUrl}/${locale}/services/${service}`);
        }
    }

    // XML sitemap yaratish
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
            )
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
