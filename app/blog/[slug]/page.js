import { blogPosts } from '../blogData';
import BlogPostClient from './BlogPostClient';

const SLUG_ALIASES = {
  'shure-sm7b': 'shure-sm7b-the-truth-about-gain',
  'sm7b': 'shure-sm7b-the-truth-about-gain',
  'atem-mini': 'which-atem-mini-should-you-buy',
  'hyperdeck': 'hyperdeck-use-cases-playback-timecode',
  'companion': 'bitfocus-companion-stream-deck-live-production',
  'stream-deck': 'bitfocus-companion-stream-deck-live-production',
  'atem-constellation': 'atem-constellation-me-explained',
  'amaran-vs-aputure': 'amaran-vs-aputure-lights',
  'amaran-ray': 'amaran-ray-series',
  'lighting': 'why-your-lighting-looks-bad',
  'stream-quality': 'why-your-stream-looks-terrible',
};

function resolveSlug(slug) {
  return SLUG_ALIASES[slug] || slug;
}

export async function generateMetadata({ params }) {
  const slug = resolveSlug(params.slug);
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found — Gear Guide',
      description: 'This post could not be found.',
    };
  }

  const canonicalUrl = `https://video-tools-affiliate.vercel.app/blog/${slug}`;
  const ogImage = post.image
    ? `https://video-tools-affiliate.vercel.app${post.image}`
    : 'https://video-tools-affiliate.vercel.app/images/blog/elgato-stream-deck-hero.jpg';

  return {
    title: `${post.title} — Gear Guide`,
    description: post.metaDescription || post.excerpt || `${post.title} — honest gear review from a 15-year broadcast engineer.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || '',
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      type: 'article',
      siteName: 'Gear Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt || '',
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient slug={params.slug} aliases={SLUG_ALIASES} />;
}
