import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'Google-Extended'],
        allow: '/',
      }
    ],
    sitemap: 'https://sashwinfoundation.com/sitemap.xml',
  };
}
