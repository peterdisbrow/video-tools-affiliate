'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { blogPosts } from './blog/blogData';
import productsData from '../products.json';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';

const ACCENT = '#E84C3D'; // diyphotography red accent
const NAV_BG = '#1a1a1a';
const TAG = productsData.affiliateTag || 'disbrowproduc-20';

const TAB_CATEGORIES = ['All', 'Streaming', 'Lighting', 'Audio', 'Cameras', 'Accessories'];

const FEATURED_SLUGS = [
  'which-atem-mini-should-you-buy',
  'why-your-lighting-looks-bad',
  'shure-sm7b-the-truth-about-gain',
  'atem-constellation-me-explained',
  'hyperdeck-use-cases-playback-timecode',
  'bitfocus-companion-stream-deck-live-production',
  'why-your-stream-looks-terrible',
];

const TRENDING = [
  'shure-sm7b-the-truth-about-gain',
  'why-your-lighting-looks-bad',
  'which-atem-mini-should-you-buy',
  'why-your-stream-looks-terrible',
  'atem-constellation-me-explained',
];

function CategoryBadge({ cat }) {
  return (
    <span style={{
      display: 'inline-block',
      backgroundColor: ACCENT,
      color: '#fff',
      fontSize: '0.65rem',
      fontWeight: '800',
      padding: '0.15rem 0.5rem',
      borderRadius: '2px',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: '0.4rem',
    }}>{cat}</span>
  );
}

// Large feature card (hero grid)
function FeatureCard({ post }) {
  if (!post) return null;
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.querySelector('h2').style.color = ACCENT}
        onMouseLeave={e => e.currentTarget.querySelector('h2').style.color = '#fff'}
      >
        <img src={post.image} alt={post.title}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          padding: '1.5rem 1rem 0.85rem',
        }}>
          <CategoryBadge cat={post.category} />
          <h2 style={{
            fontSize: '0.95rem', fontWeight: '700', color: '#fff',
            margin: 0, lineHeight: '1.35', transition: 'color 0.15s',
          }}>{post.title}</h2>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.35rem' }}>
            {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}

// List row (image left, text right)
function ListRow({ post, showImage = true }) {
  if (!post) return null;
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
        padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.querySelector('h3').style.color = ACCENT}
      onMouseLeave={e => e.currentTarget.querySelector('h3').style.color = '#111827'}
      >
        {showImage && (
          <img src={post.image} alt={post.title}
            style={{ width: '90px', height: '65px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }} />
        )}
        <div>
          <CategoryBadge cat={post.category} />
          <h3 style={{
            fontSize: '0.875rem', fontWeight: '700', color: '#111827',
            margin: 0, lineHeight: '1.35', transition: 'color 0.15s',
          }}>{post.title}</h3>
          <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
            Andrew Disbrow · {post.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('All');

  const featured3 = FEATURED_SLUGS.slice(0, 3).map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);
  const trending = TRENDING.map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);

  const latestPosts = useMemo(() => {
    const filtered = activeTab === 'All'
      ? blogPosts
      : blogPosts.filter(p => p.category?.toLowerCase() === activeTab.toLowerCase());
    return filtered.slice(0, 8);
  }, [activeTab]);

  const topProducts = productsData.products
    .filter(p => p.asin)
    .sort((a, b) => (b.redditMentions || 0) - (a.redditMentions || 0))
    .slice(0, 5);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      <style>{`
        .home-grid { display: grid; grid-template-columns: 1fr 300px; gap: 2rem; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .list-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; }
        .cat-nav { display: flex; gap: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .cat-nav::-webkit-scrollbar { display: none; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; }
        @media (max-width: 768px) {
          .home-grid { grid-template-columns: 1fr; }
          .feature-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .list-grid { grid-template-columns: 1fr; }
          .top-bar { flex-direction: column; gap: 0.25rem; text-align: center; padding: 0.5rem 1rem; }
          .sidebar-order { order: 2; }
          .main-content { order: 1; }
          .main-container { padding: 1rem !important; }
        }
        @media (max-width: 480px) {
          .feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <SiteNav />

      {/* ─── CATEGORY NAV BAR ─── */}
      <div style={{ borderBottom: '3px solid #111827', backgroundColor: '#fff' }}>
        <div className="cat-nav" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {TAB_CATEGORIES.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '0.7rem 1.1rem',
              border: 'none',
              borderBottom: activeTab === tab ? `3px solid ${ACCENT}` : '3px solid transparent',
              marginBottom: '-3px',
              backgroundColor: 'transparent',
              color: activeTab === tab ? ACCENT : '#374151',
              fontWeight: activeTab === tab ? '800' : '500',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="main-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        <div className="home-grid">

          {/* ─── MAIN CONTENT ─── */}
          <div className="main-content">
            {/* Featured 3-up grid */}
            <div className="feature-grid">
              {featured3.map(post => <FeatureCard key={post.slug} post={post} />)}
            </div>

            {/* Latest posts — list style */}
            <div style={{ borderTop: '3px solid #111827', paddingTop: '1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827' }}>
                The Latest
              </span>
              <Link href="/blog" style={{ fontSize: '0.75rem', color: ACCENT, textDecoration: 'none', fontWeight: '700' }}>
                View All →
              </Link>
            </div>

            <div className="list-grid">
              {latestPosts.map(post => <ListRow key={post.slug} post={post} />)}
            </div>

            {latestPosts.length === 0 && (
              <p style={{ color: '#9CA3AF', padding: '2rem 0' }}>No posts in this category yet.</p>
            )}
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="sidebar-order">
            {/* Trending */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ borderTop: '3px solid #111827', paddingTop: '0.75rem', marginBottom: '0.75rem', display: 'flex', gap: '1rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', borderBottom: `2px solid ${ACCENT}`, paddingBottom: '4px' }}>Trending</span>
                <span style={{ fontSize: '0.78rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF', cursor: 'pointer' }}>Popular</span>
              </div>
              {trending.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.querySelector('span.title').style.color = ACCENT}
                    onMouseLeave={e => e.currentTarget.querySelector('span.title').style.color = '#111827'}
                  >
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#E5E7EB', lineHeight: 1, flexShrink: 0, width: '28px', textAlign: 'center' }}>{i + 1}</span>
                    <div>
                      <span className="title" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#111827', lineHeight: '1.3', display: 'block', transition: 'color 0.15s' }}>
                        {post.title.length > 65 ? post.title.slice(0, 65) + '...' : post.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ATEM School promo */}
            <div style={{ backgroundColor: NAV_BG, borderRadius: '4px', padding: '1.25rem', marginBottom: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Learn Broadcast
              </div>
              <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                ATEM switchers, live production, Blackmagic workflows. Members get gear pricing.
              </p>
              <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
                display: 'block', padding: '0.6rem', backgroundColor: ACCENT,
                color: '#fff', textDecoration: 'none', fontWeight: '700',
                fontSize: '0.82rem', borderRadius: '3px',
              }}>
                Join ATEM School →
              </a>
            </div>

            {/* Newsletter */}
            <div style={{ border: '2px solid #E5E7EB', borderRadius: '4px', padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#111827' }}>
                📬 Newsletter
              </div>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                Gear picks + broadcast insights from Andrew. No fluff.
              </p>
              <input type="email" placeholder="your@email.com" style={{
                width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #E5E7EB',
                borderRadius: '3px', fontSize: '0.85rem', marginBottom: '0.5rem', boxSizing: 'border-box',
              }} />
              <button style={{
                width: '100%', padding: '0.55rem', backgroundColor: '#111827',
                color: '#fff', border: 'none', borderRadius: '3px',
                fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer',
              }}>
                Subscribe
              </button>
            </div>

            {/* Top Gear sidebar */}
            <div>
              <div style={{ borderTop: '3px solid #111827', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827' }}>Top Gear</span>
              </div>
              {topProducts.map(p => (
                <a key={p.id} href={`https://www.amazon.com/dp/${p.asin}?tag=${TAG}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', padding: '0.6rem 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.querySelector('.gear-name').style.color = ACCENT}
                    onMouseLeave={e => e.currentTarget.querySelector('.gear-name').style.color = '#111827'}
                  >
                    <img src={p.image} alt={p.name} style={{ width: '48px', height: '40px', objectFit: 'contain', flexShrink: 0 }} />
                    <div>
                      <span className="gear-name" style={{ fontSize: '0.8rem', fontWeight: '600', color: '#111827', display: 'block', lineHeight: '1.3', transition: 'color 0.15s' }}>{p.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{p.price}</span>
                    </div>
                  </div>
                </a>
              ))}
              <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', fontSize: '0.78rem', color: ACCENT, fontWeight: '700', textDecoration: 'none' }}>
                View all gear →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
