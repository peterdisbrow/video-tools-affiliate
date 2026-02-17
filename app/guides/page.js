'use client';

import Link from 'next/link';
import { blogPosts } from './blogData';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#E84C3D';

export default function GuidesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />

      {/* Page Header */}
      <section style={{
        backgroundColor: '#F8F9FA',
        borderBottom: '1px solid #E5E7EB',
        padding: '3.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#EFF6FF',
            color: ACCENT,
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            In-Depth Creator Guides
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            Creator Guides
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: '1.6' }}>
            Deep-dive articles, real-world stories, and practical advice for video creators at every level.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {blogPosts.map((post) => (
            <Link href={`/guides/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
              <article
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid #E5E7EB',
                  transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.1)';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.65rem' }}>
                    {post.category && (
                      <span style={{
                        backgroundColor: '#EFF6FF',
                        color: ACCENT,
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}>
                        {post.category}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{post.date}</span>
                  </div>
                  <h2 style={{
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    marginBottom: '0.6rem',
                    color: '#111827',
                    lineHeight: '1.4',
                    margin: '0 0 0.6rem 0',
                  }}>
                    {post.title}
                  </h2>
                  <p style={{ color: '#6B7280', lineHeight: '1.55', fontSize: '0.9rem', flex: 1, margin: '0 0 1rem 0' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: ACCENT, fontWeight: '600', fontSize: '0.875rem' }}>Read Guide →</span>
                    <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
