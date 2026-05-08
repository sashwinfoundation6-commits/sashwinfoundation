import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'Google-Extended', 'CCBot', 'PerplexityBot', 'YouBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://sashwinfoundation.com/sitemap.xml',
  };
}
