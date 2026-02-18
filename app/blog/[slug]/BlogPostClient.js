'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { blogPosts } from '../blogData';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import { markdownToHtml } from '../../lib/markdownToHtml';

const ACCENT = '#E84C3D';

function getRelatedProducts(category, currentSlug) {
  if (!category) return [];
  return blogPosts
    .filter(p => p.category?.toLowerCase() === category?.toLowerCase() && p.slug !== currentSlug && p.affiliateLink)
    .slice(0, 3);
}

export default function BlogPostClient({ slug, aliases = {} }) {
  const router = useRouter();
  const resolvedSlug = aliases[slug] || slug;

  useEffect(() => {
    if (aliases[slug] && aliases[slug] !== slug) {
      router.replace(`/blog/${aliases[slug]}`);
    }
  }, [slug, aliases, router]);

  const post = blogPosts.find(p => p.slug === resolvedSlug);

  const contentHtml = useMemo(() => {
    if (!post) return '';
    return markdownToHtml(post.content);
  }, [post]);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <SiteNav />
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827' }}>Post Not Found</h1>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>This post may have been removed or renamed.</p>
          <Link href="/blog" style={{ color: ACCENT, textDecoration: 'none', fontWeight: '600' }}>← Back to Blog</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(post.category, resolvedSlug);

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
          <Link href="/blog" style={{ color: '#6B7280', textDecoration: 'none' }}>Blog</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#374151' }}>{post.title.slice(0, 50)}{post.title.length > 50 ? '…' : ''}</span>
        </nav>

        {/* Post Header */}
        <header style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid #E5E7EB' }}>
          {post.category && (
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#FEF2F2',
                color: ACCENT,
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.25rem 0.75rem',
                borderRadius: '2px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {post.category}
              </span>
            </div>
          )}
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem', color: '#111827', lineHeight: '1.25' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1.25rem', color: '#6B7280', fontSize: '0.9rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Andrew Disbrow</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            {post.price && (
              <>
                <span>·</span>
                <span style={{ color: ACCENT, fontWeight: '700' }}>{post.price}</span>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '3rem' }}>
          <style>{`
            .prose-content h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #111827; padding-top: 0.5rem; border-top: 2px solid #F0F2F5; }
            .prose-content h3 { font-size: 1.2rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #111827; }
            .prose-content h4 { font-size: 1rem; font-weight: 600; margin: 1.25rem 0 0.4rem; color: #374151; }
            .prose-content p { margin-bottom: 1.25rem; }
            .prose-content ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1.25rem; }
            .prose-content ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.25rem; }
            .prose-content li { margin-bottom: 0.4rem; }
            .prose-content a { color: ${ACCENT}; text-decoration: none; font-weight: 500; border-bottom: 1px solid rgba(232,76,61,0.3); }
            .prose-content a:hover { border-bottom-color: ${ACCENT}; }
            .prose-content strong { font-weight: 700; color: #111827; }
            .prose-content blockquote { border-left: 4px solid ${ACCENT}; margin: 1.5rem 0; padding: 0.75rem 1.25rem; background: #FEF2F2; border-radius: 0 4px 4px 0; color: #374151; font-style: italic; }
            .prose-content code { background: #F0F2F5; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.9em; font-family: monospace; }
            .prose-content pre { background: #1E293B; color: #E2E8F0; padding: 1.25rem; border-radius: 4px; overflow-x: auto; margin-bottom: 1.5rem; }
            .prose-content pre code { background: none; padding: 0; color: inherit; }
            .prose-content hr { border: none; border-top: 1px solid #E5E7EB; margin: 2rem 0; }
            .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.95rem; }
            .prose-content th { background: #F8F9FA; padding: 0.75rem 1rem; border: 1px solid #E5E7EB; font-weight: 700; color: #111827; text-align: left; }
            .prose-content td { padding: 0.75rem 1rem; border: 1px solid #E5E7EB; }
            .prose-content tr:nth-child(even) td { background: #F8F9FA; }
          `}</style>
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        {/* Affiliate CTA — only if there's a real link */}
        {post.affiliateLink && !post.affiliateLink.includes('atemschool') && (
          <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', backgroundColor: '#F8F9FA', borderRadius: '4px', border: '1px solid #E5E7EB' }}>
            <a
              href={post.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: ACCENT,
                color: '#FFFFFF',
                padding: '0.875rem 2.5rem',
                borderRadius: '3px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Check Price on Amazon →
            </a>
            <p style={{ fontSize: '0.78rem', color: '#9CA3AF', marginTop: '0.75rem', margin: '0.75rem 0 0' }}>
              Affiliate link — we earn a small commission at no extra cost to you.
            </p>
          </div>
        )}

        {/* ATEM School CTA — for posts that push reseller path */}
        {post.affiliateLink && post.affiliateLink.includes('atemschool') && (
          <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '4px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              Blackmagic Certified Reseller
            </div>
            <p style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ATEM School members get exclusive pricing on Blackmagic gear — direct from an authorized reseller.
            </p>
            <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block', backgroundColor: ACCENT, color: '#fff',
              padding: '0.75rem 2rem', borderRadius: '3px', textDecoration: 'none',
              fontWeight: '700', fontSize: '0.9rem',
            }}>
              Get Member Pricing at ATEM School →
            </a>
          </div>
        )}

        {/* Newsletter */}
        <section style={{
          backgroundColor: '#F8F9FA',
          padding: '2rem',
          borderRadius: '4px',
          border: '1px solid #E5E7EB',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: '0 0 0.4rem 0' }}>
            Get gear picks + broadcast insights
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0 0 1.25rem 0' }}>
            From Andrew's 15 years in broadcast engineering. No templates, no fluff.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const email = form.email.value;
              const firstName = form.firstName?.value || '';
              try {
                const res = await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ firstName, email }),
                });
                if (res.ok) {
                  form.innerHTML = '<p style="color:#059669;font-weight:600;margin:0;">✓ You\'re in — check your email.</p>';
                }
              } catch {}
            }}
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <input name="firstName" type="text" placeholder="First name" style={{
              padding: '0.6rem 1rem', borderRadius: '3px', border: '1px solid #D1D5DB',
              fontSize: '0.875rem', width: '120px',
            }} />
            <input name="email" type="email" placeholder="your@email.com" required style={{
              padding: '0.6rem 1rem', borderRadius: '3px', border: '1px solid #D1D5DB',
              fontSize: '0.875rem', flex: '1', minWidth: '180px',
            }} />
            <button type="submit" style={{
              padding: '0.6rem 1.5rem', borderRadius: '3px', border: 'none',
              backgroundColor: ACCENT, color: '#fff', fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer',
            }}>
              Subscribe →
            </button>
          </form>
          <p style={{ color: '#9CA3AF', fontSize: '0.72rem', marginTop: '0.75rem' }}>No spam. Unsubscribe anytime.</p>
        </section>

        {/* Related Posts — same category */}
        {relatedProducts.length > 0 && (
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', borderTop: '3px solid #111827', paddingTop: '1rem', margin: '0 0 1rem 0' }}>
              More {post.category} Reading
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {relatedProducts.map((prod) => (
                <Link key={prod.slug} href={`/blog/${prod.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    border: '1px solid #E5E7EB', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer',
                  }}>
                    {prod.image && (
                      <img src={prod.image} alt={prod.title} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                    )}
                    <div style={{ padding: '0.75rem' }}>
                      <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#111827', margin: '0 0 0.25rem', lineHeight: '1.3' }}>
                        {prod.title}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: ACCENT, fontWeight: '600' }}>Read →</span>
                    </div>
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
