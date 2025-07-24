import { MetadataRoute } from 'next';
import { routing } from '../i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  
  // Define all your routes here
  const routes = [
    '',
    '/about',
    '/contact',
    '/blog',
    // Add more routes as needed
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Add entry for each locale
    routing.locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${route}`;
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((altLocale) => [
              altLocale,
              `${baseUrl}/${altLocale}${route}`
            ])
          )
        }
      });
    });
  });

  return sitemapEntries;
} 