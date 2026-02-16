'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { blogPosts } from '../blogData';

// Category mapping for smart related posts
const categories = {
  cameras: ['best-cameras-for-youtube', 'best-cameras-under-1000', 'best-cameras-under-2000', 'best-cameras-under-5000'],
  lighting: ['video-lighting-101', 'best-video-lights-under-300', 'best-video-lights-under-800', 'best-video-lights-under-2000'],
  audio: ['pro-audio-budget', 'best-microphones-under-200', 'best-microphones-under-500', 'best-audio-interfaces-under-300'],
  tripods: ['best-tripods-under-200', 'best-tripods-under-500', 'best-tripods-under-1500', 'stabilization-techniques'],
  general: ['free-vs-paid-editing', 'streaming-gear-essentials', 'youtube-equipment-timeline', 'diy-green-screen-setup'],
};

function getRelatedPosts(slug) {
  // Find which category current post belongs to
  let currentCategory = 'general';
  for (const [cat, slugs] of Object.entries(categories)) {
    if (slugs.includes(slug)) { currentCategory = cat; break; }
  }
  // Get same-category posts first, then others
  const sameCat = categories[currentCategory].filter(s => s !== slug);
  const otherCats = Object.entries(categories)
    .filter(([cat]) => cat !== currentCategory)
    .flatMap(([, slugs]) => slugs);
  const orderedSlugs = [...sameCat, ...otherCats].slice(0, 4);
  return orderedSlugs.map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Creator Gear`;
      // Set meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.metaDescription || post.excerpt;
    }
  }, [post]);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Post Not Found</h1>
          <Link href="/blog" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/#tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools</Link>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
            <Link href="/#faq" style={{ color: '#6b7280', textDecoration: 'none' }}>FAQ</Link>
          </div>
        </div>
      </nav>

      {/* Featured Image */}
      <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Post Header */}
        <header style={{ marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#6b7280', fontSize: '0.95rem' }}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Content */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '3rem' }}>
          <style>{`
            article h2 { font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; color: #1f2937; }
            article h3 { font-size: 1.2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #1f2937; }
            article p { margin-bottom: 1rem; }
            article ul, article ol { margin-left: 1.5rem; margin-bottom: 1rem; }
            article li { margin-bottom: 0.5rem; }
            article a { color: #667eea; text-decoration: none; font-weight: 500; }
            article a:hover { text-decoration: underline; }
            article strong { font-weight: 600; }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related Products Box */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <section style={{ backgroundColor: '#f0f4ff', padding: '2rem', borderRadius: '0.75rem', marginBottom: '3rem', border: '1px solid #d4deff' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>🛒 Products Mentioned in This Post</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {post.relatedProducts.map((product, i) => (
                <li key={i} style={{ marginBottom: '0.75rem', padding: '0.5rem 0', borderBottom: i < post.relatedProducts.length - 1 ? '1px solid #e0e7ff' : 'none' }}>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }}>
                    {product.name} <span style={{ fontSize: '0.85rem' }}>→ Check Price on Amazon</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Continue Reading - Smart Related */}
        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>📖 Continue Reading</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {relatedPosts.map((relPost, i) => (
              <Link key={i} href={`/blog/${relPost.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', transition: 'background-color 0.2s', cursor: 'pointer', height: '100%' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f4ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}>
                  <p style={{ fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{relPost.title}</p>
                  <span style={{ color: '#667eea', fontSize: '0.85rem' }}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>© 2026 Creator Gear. Affiliate links support this site at no extra cost to you.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Curated recommendations for video creators, filmmakers, and content professionals.</p>
      </footer>
    </div>
  );
}
