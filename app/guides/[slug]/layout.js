import { blogPosts } from '../blogData';

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Guide Not Found | Gear Guide',
      description: 'This guide could not be found.',
    };
  }

  const baseUrl = 'https://video-tools-affiliate.vercel.app';
  const postUrl = `${baseUrl}/guides/${post.slug}`;
  const description = post.metaDescription || post.excerpt;
  
  // Truncate description to 160 chars for SERP preview
  const truncatedDesc = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return {
    title: `${post.title} | Gear Guide`,
    description: truncatedDesc,
    keywords: [post.category, 'video equipment', 'creator gear', 'review'],
    openGraph: {
      title: post.title,
      description: truncatedDesc,
      url: postUrl,
      type: 'article',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
      authors: ['Gear Guide'],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: truncatedDesc,
      images: [post.image],
      creator: '@creatorgearpro',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
