'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { blogPosts } from './blog/blogData';
import productsData from '../products.json';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';

const ACCENT = '#2563EB';
const ACCENT_DARK = '#1D4ED8';
const TAG = productsData.affiliateTag || 'disbrowproduc-20';

// Category config
const CATEGORIES = [
  { id: 'all', label: 'All Posts', emoji: '📖' },
  { id: 'streaming', label: 'Streaming', emoji: '📡' },
  { id: 'lighting', label: 'Lighting', emoji: '💡' },
  { id: 'audio', label: 'Audio', emoji: '🎙️' },
  { id: 'cameras', label: 'Cameras', emoji: '📷' },
  { id: 'accessories', label: 'Accessories', emoji: '🎒' },
];

// Featured posts — human-written, show first
const FEATURED_SLUGS = [
  'which-atem-mini-should-you-buy',
  'atem-constellation-me-explained',
  'why-your-lighting-looks-bad',
  'shure-sm7b-the-truth-about-gain',
  'hyperdeck-use-cases-playback-timecode',
  'why-your-stream-looks-terrible',
  'bitfocus-companion-stream-deck-live-production',
];

function PostCard({ post, size = 'normal' }) {
  const isLarge = size === 'large';
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article style={{
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        height: '100%',
        display: 'flex',
        flexDirection: isLarge ? 'row' : 'column',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      >
        <div style={{
          flexShrink: 0,
          width: isLarge ? '45%' : '100%',
          height: isLarge ? '100%' : '200px',
          minHeight: isLarge ? '280px' : 'auto',
          overflow: 'hidden',
          backgroundColor: '#F3F4F6',
        }}>
          <img
            src={post.image || '/images/blog/default-hero.jpg'}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ padding: isLarge ? '2rem' : '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            {post.category && (
              <span style={{
                backgroundColor: '#EFF6FF', color: ACCENT,
                fontSize: '0.7rem', fontWeight: '700',
                padding: '0.2rem 0.65rem', borderRadius: '9999px',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {post.category}
              </span>
            )}
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{post.readTime}</span>
          </div>
          <h2 style={{
            fontSize: isLarge ? '1.4rem' : '1.05rem',
            fontWeight: '700',
            color: '#111827',
            lineHeight: '1.35',
            margin: '0 0 0.65rem',
          }}>
            {post.title}
          </h2>
          <p style={{
            color: '#6B7280', fontSize: isLarge ? '0.95rem' : '0.875rem',
            lineHeight: '1.6', flex: 1, margin: '0 0 1rem',
          }}>
            {post.excerpt}
          </p>
          <span style={{ color: ACCENT, fontWeight: '600', fontSize: '0.875rem' }}>
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredPost = blogPosts.find(p => p.slug === FEATURED_SLUGS[0]);
  const recentFeatured = FEATURED_SLUGS.slice(1, 4).map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);

  const filteredPosts = useMemo(() => {
    const base = activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter(p => p.category === activeCategory);
    // Featured first, then rest
    return base.filter(p => !FEATURED_SLUGS.includes(p.slug)).slice(0, 12);
  }, [activeCategory]);

  // Top products
  const topProducts = productsData.products
    .filter(p => p.asin)
    .sort((a, b) => (b.redditMentions || 0) - (a.redditMentions || 0))
    .slice(0, 4)
    .map(p => ({ ...p, link: `https://www.amazon.com/dp/${p.asin}?tag=${TAG}` }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />

      {/* ─── HERO: Featured Post ─── */}
      {featuredPost && (
        <section style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #E5E7EB', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ✍️ Latest from Andrew
              </span>
            </div>
            <PostCard post={featuredPost} size="large" />
          </div>
        </section>
      )}

      {/* ─── AUTHOR CREDIBILITY BAR ─── */}
      <div style={{
        backgroundColor: ACCENT_DARK, color: '#fff',
        padding: '0.9rem 2rem',
        textAlign: 'center',
        fontSize: '0.9rem',
      }}>
        <span style={{ opacity: 0.85 }}>Written by </span>
        <strong>Andrew Disbrow</strong>
        <span style={{ opacity: 0.85 }}> — 15 years broadcast engineering · Blackmagic Design reseller · </span>
        <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer"
          style={{ color: '#93C5FD', fontWeight: '600', textDecoration: 'none' }}>
          Founder, ATEM School
        </a>
      </div>

      {/* ─── RECENT FEATURED POSTS ─── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: 0 }}>
            🔥 Essential Guides
          </h2>
          <Link href="/blog" style={{ color: ACCENT, fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}>
            View all posts →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {recentFeatured.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>

      {/* ─── BROWSE BY CATEGORY + POSTS ─── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1.25rem' }}>
          📚 Browse by Topic
        </h2>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: activeCategory === cat.id ? ACCENT : '#F3F4F6',
              color: activeCategory === cat.id ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeCategory === cat.id ? '700' : '500',
              transition: 'all 0.15s',
            }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredPosts.map(post => <PostCard key={post.slug} post={post} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/blog" style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: ACCENT,
            color: '#fff',
            borderRadius: '0.5rem',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '0.95rem',
          }}>
            Read All {blogPosts.length} Posts →
          </Link>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section style={{
        backgroundColor: '#F8F9FA',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📬</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
            Get the Gear Guide
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Honest picks, broadcast insights, and gear recommendations from 15 years in production. No fluff.
          </p>
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            style={{ display: 'flex', gap: '0.75rem', maxWidth: '420px', margin: '0 auto' }}
            onSubmit={e => { e.preventDefault(); alert('Thanks! We\'ll be in touch.'); }}
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              style={{
                flex: 1, padding: '0.7rem 1rem',
                border: '2px solid #E5E7EB', borderRadius: '0.5rem',
                fontSize: '0.95rem', outline: 'none',
              }}
            />
            <button type="submit" style={{
              padding: '0.7rem 1.25rem',
              backgroundColor: ACCENT, color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ─── TOP GEAR (secondary) ─── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: 0 }}>
            🏆 Most Recommended Gear
          </h2>
          <Link href="/products" style={{ color: ACCENT, fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }}>
            View all gear →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {topProducts.map(product => (
            <a key={product.id} href={product.link} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#fff', borderRadius: '0.75rem',
                border: '1px solid #E5E7EB', padding: '1.25rem',
                display: 'flex', gap: '1rem', alignItems: 'center',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <img src={product.image} alt={product.name}
                  style={{ width: '64px', height: '64px', objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: ACCENT, fontWeight: '600', textTransform: 'capitalize', marginBottom: '0.2rem' }}>
                    {product.category}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', marginBottom: '0.25rem', lineHeight: '1.3' }}>
                    {product.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '600' }}>
                    {'★'.repeat(Math.round(product.rating))} <span style={{ color: '#374151' }}>{product.price}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── ATEM SCHOOL BANNER ─── */}
      <section style={{ backgroundColor: ACCENT_DARK, padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            Want to go deeper?
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            Learn Broadcast Production at ATEM School
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', marginBottom: '0.5rem', lineHeight: '1.6' }}>
            Training for Blackmagic ATEM switchers, live production, and professional broadcast workflows — from someone who's been doing this for 15 years.
          </p>
          <p style={{ fontSize: '1rem', color: '#FCD34D', fontWeight: '600', marginBottom: '1.75rem' }}>
            ★ Members get exclusive pricing on gear purchases.
          </p>
          <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', backgroundColor: '#FFFFFF', color: ACCENT_DARK,
            textDecoration: 'none', fontWeight: '700', fontSize: '1rem',
            padding: '0.8rem 2rem', borderRadius: '0.5rem',
          }}>
            Join ATEM School →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
