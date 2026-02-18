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

  return {
    title: `${post.title} — Gear Guide`,
    description: post.metaDescription || post.excerpt || `${post.title} — honest gear review from a 15-year broadcast engineer.`,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || '',
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt || '',
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogPostPage({ params }) {
  return <BlogPostClient slug={params.slug} aliases={SLUG_ALIASES} />;
}
