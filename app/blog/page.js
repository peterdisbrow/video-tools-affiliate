'use client';

import Link from 'next/link';
import { blogPosts } from './blogData';
import { useState, useMemo } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#2563EB';

const CATEGORIES = ['all', ...Array.from(new Set(blogPosts.map(p => p.category))).sort()];

function fuzzyMatch(query, post) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.metaDescription || ''}`.toLowerCase();
  return haystack.includes(q);
}

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesQuery = fuzzyMatch(query, post);
      const matchesCat = category === 'all' || post.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

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
            Latest Reviews &amp; Guides
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            Creator Gear Blog
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Honest gear reviews, buying guides, and production tips — from 15 years of broadcast engineering.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '540px', margin: '0 auto 1.25rem', position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
              fontSize: '1rem', color: '#9CA3AF', pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search posts — try 'SM7B', 'lighting', 'wireless'..."
              style={{
                width: '100%',
                padding: '13px 40px 13px 42px',
                fontSize: '0.95rem',
                border: '2px solid #E5E7EB',
                borderRadius: '0.6rem',
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = ACCENT}
              onBlur={e => e.target.style.borderColor = '#E5E7EB'}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer',
                  color: '#9CA3AF', padding: '4px',
                }}
              >✕</button>
            )}
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: category === cat ? ACCENT : '#E5E7EB',
                  color: category === cat ? '#fff' : '#374151',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: category === cat ? '600' : '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {cat === 'all' ? 'All Posts' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results count when filtering */}
      {(query || category !== 'all') && (
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0', padding: '0 2rem' }}>
          <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
            {filtered.length === 0
              ? 'No posts found.'
              : `${filtered.length} post${filtered.length === 1 ? '' : 's'} found${query ? ` for "${query}"` : ''}${category !== 'all' ? ` in ${category}` : ''}`
            }
            {(query || category !== 'all') && (
              <button
                onClick={() => { setQuery(''); setCategory('all'); }}
                style={{ marginLeft: '0.75rem', color: ACCENT, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
              >
                Clear filters
              </button>
            )}
          </p>
        </div>
      )}

      {/* Blog Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem 3rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6B7280' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No posts match your search.</p>
            <p style={{ fontSize: '0.9rem' }}>Try different keywords or <button onClick={() => { setQuery(''); setCategory('all'); }} style={{ color: ACCENT, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>browse all posts</button>.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {filtered.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
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
                      <span style={{ color: ACCENT, fontWeight: '600', fontSize: '0.875rem' }}>Read More →</span>
                      <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
