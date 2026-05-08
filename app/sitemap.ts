import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sashwinfoundation.com';
  
  const pages = [
    { url: '', priority: 1, changeFrequency: 'daily' },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/mishti', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/construction', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/gallery', priority: 0.8, changeFrequency: 'daily' },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/interiors', priority: 0.8, changeFrequency: 'weekly' },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as "daily" | "weekly" | "monthly" | "always" | "hourly" | "yearly" | "never",
    priority: page.priority,
  }));
}
