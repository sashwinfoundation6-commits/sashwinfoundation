import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sashwinfoundation.com';
  
  const pages = [
    '',
    '/about',
    '/projects',
    '/mishti',
    '/construction',
    '/gallery',
    '/contact',
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: (page === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: page === '' ? 1 : 0.8,
  }));
}
