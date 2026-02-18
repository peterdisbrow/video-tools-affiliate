import { blogPosts } from './blog/blogData';

const BASE = 'https://video-tools-affiliate.vercel.app';

export default function sitemap() {
  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/gear`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/free-gear-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const postPages = blogPosts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
