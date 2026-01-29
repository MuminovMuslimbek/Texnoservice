// app/sitemap.xml/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const locales = ["uz", "ru", "en"];
    const pages = ["", "services/washing-machine", "services/gas-stove"];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    locales.forEach((locale) => {
        pages.forEach((page) => {
            sitemap += `
        <url>
          <loc>https://yourdomain.com/${locale}/${page}</loc>
          <priority>0.8</priority>
        </url>
      `;
        });
    });

    sitemap += `</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
