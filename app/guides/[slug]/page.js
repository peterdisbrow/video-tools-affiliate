'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { blogPosts } from '../blogData';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { markdownToHtml } from '../../lib/markdownToHtml';

const ACCENT = '#E84C3D';

function getRelatedPosts(slug, allPosts) {
  return allPosts.filter(p => p.slug !== slug).slice(0, 4);
}

export default function GuidesPost() {
  const params = useParams();
  const slug = params.slug;
  const post = blogPosts.find(p => p.slug === slug);

  const contentHtml = useMemo(() => {
    if (!post) return '';
    return markdownToHtml(post.content);
  }, [post]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Gear Guide`;
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
      <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
        <SiteNav />
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827' }}>Guide Not Found</h1>
          <Link href="/guides" style={{ color: ACCENT, textDecoration: 'none', fontWeight: '600' }}>← Back to Guides</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(slug, blogPosts);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />

      {/* Featured Image */}
      {post.image && (
        <div style={{ width: '100%', height: '380px', overflow: 'hidden', backgroundColor: '#F0F2F5' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#6B7280' }}>
          <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <Link href="/guides" style={{ color: '#6B7280', textDecoration: 'none' }}>Guides</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#374151' }}>{post.title.slice(0, 50)}{post.title.length > 50 ? '…' : ''}</span>
        </nav>

        {/* Post Header */}
        <header style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#EFF6FF',
              color: ACCENT,
              fontSize: '0.75rem',
              fontWeight: '600',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {post.category || 'Guide'}
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem', color: '#111827', lineHeight: '1.25' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1.25rem', color: '#6B7280', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
            {post.wordCount && <span>📝 {post.wordCount.toLocaleString()} words</span>}
          </div>
        </header>

        {/* Rendered Content */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '3rem' }}>
          <style>{`
            .prose-content h1 { font-size: 2rem; font-weight: 800; margin: 2.5rem 0 1rem; color: #111827; line-height: 1.3; }
            .prose-content h2 { font-size: 1.6rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #111827; line-height: 1.3; padding-top: 0.5rem; border-top: 1px solid #F0F2F5; }
            .prose-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #111827; }
            .prose-content h4 { font-size: 1.05rem; font-weight: 600; margin: 1.25rem 0 0.4rem; color: #374151; }
            .prose-content p { margin-bottom: 1.25rem; }
            .prose-content ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1.25rem; }
            .prose-content ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.25rem; }
            .prose-content li { margin-bottom: 0.4rem; }
            .prose-content a { color: ${ACCENT}; text-decoration: none; font-weight: 500; border-bottom: 1px solid #BFDBFE; }
            .prose-content a:hover { border-bottom-color: ${ACCENT}; }
            .prose-content strong { font-weight: 700; color: #111827; }
            .prose-content em { font-style: italic; }
            .prose-content blockquote { border-left: 4px solid ${ACCENT}; margin: 1.5rem 0; padding: 0.75rem 1.25rem; background: #EFF6FF; border-radius: 0 0.5rem 0.5rem 0; color: #1E40AF; font-style: italic; }
            .prose-content code { background: #F0F2F5; padding: 0.15em 0.4em; border-radius: 0.25rem; font-size: 0.9em; font-family: 'Courier New', monospace; color: #374151; }
            .prose-content pre { background: #1E293B; color: #E2E8F0; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin-bottom: 1.5rem; }
            .prose-content pre code { background: none; padding: 0; color: inherit; font-size: 0.9rem; }
            .prose-content hr { border: none; border-top: 1px solid #E5E7EB; margin: 2rem 0; }
            .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.95rem; }
            .prose-content th { background: #F8F9FA; padding: 0.75rem 1rem; border: 1px solid #E5E7EB; text-align: left; font-weight: 600; color: #111827; }
            .prose-content td { padding: 0.75rem 1rem; border: 1px solid #E5E7EB; }
            .prose-content tr:nth-child(even) td { background: #F8F9FA; }
            .prose-content img { border-radius: 0.75rem; margin: 1.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          `}</style>
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        {/* Related Products Box */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <section style={{
            backgroundColor: '#EFF6FF',
            padding: '1.75rem',
            borderRadius: '0.75rem',
            marginBottom: '3rem',
            border: '1px solid #BFDBFE',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: '#111827', margin: '0 0 1rem 0' }}>
              🛒 Products Mentioned in This Guide
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {post.relatedProducts.map((product, i) => (
                <li key={i} style={{
                  marginBottom: '0.6rem',
                  paddingBottom: '0.6rem',
                  borderBottom: i < post.relatedProducts.length - 1 ? '1px solid #DBEAFE' : 'none',
                }}>
                  {typeof product === 'string' ? (
                    <span style={{ color: '#374151', fontWeight: '500' }}>{product}</span>
                  ) : (
                    <a href={product.link} target="_blank" rel="noopener noreferrer" style={{
                      color: ACCENT, textDecoration: 'none', fontWeight: '600',
                    }}>
                      {product.name} <span style={{ fontSize: '0.85rem', fontWeight: '400' }}>→ Check on Amazon</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Continue Reading */}
        {relatedPosts.length > 0 && (
          <section style={{
            backgroundColor: '#F8F9FA',
            padding: '1.75rem',
            borderRadius: '0.75rem',
            border: '1px solid #E5E7EB',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827', margin: '0 0 1.25rem 0' }}>
              📖 Continue Reading
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {relatedPosts.map((relPost, i) => (
                <Link key={i} href={`/guides/${relPost.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.5rem',
                    border: '1px solid #E5E7EB',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.35rem', fontSize: '0.9rem', margin: '0 0 0.35rem 0', lineHeight: '1.4' }}>
                      {relPost.title.length > 70 ? relPost.title.slice(0, 70) + '…' : relPost.title}
                    </p>
                    <span style={{ color: ACCENT, fontSize: '0.8rem', fontWeight: '500' }}>Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <SiteFooter />
    </div>
  );
}
