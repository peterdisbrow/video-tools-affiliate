'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import productsData from '../../products.json';
import { blogPosts } from '../blog/blogData';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#E84C3D';
const TAG = productsData.affiliateTag || 'disbrowproduc-20';

const CATEGORIES = ['All', 'Cameras', 'Lighting', 'Audio', 'Streaming', 'Accessories', 'Tripods'];

// Blog posts that pair well with each category
const GUIDE_SLUGS = {
  All: ['which-atem-mini-should-you-buy', 'why-your-lighting-looks-bad', 'shure-sm7b-the-truth-about-gain', 'why-your-stream-looks-terrible'],
  Cameras: ['which-atem-mini-should-you-buy', 'why-your-stream-looks-terrible'],
  Lighting: ['why-your-lighting-looks-bad'],
  Audio: ['shure-sm7b-the-truth-about-gain'],
  Streaming: ['why-your-stream-looks-terrible', 'which-atem-mini-should-you-buy', 'atem-constellation-me-explained', 'hyperdeck-use-cases-playback-timecode'],
  Accessories: ['bitfocus-companion-stream-deck-live-production'],
  Tripods: [],
};

function ProductCard({ product }) {
  const href = product.affiliateLink || (product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${TAG}` : null);

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '3px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ backgroundColor: '#F8F9FA', padding: '1.25rem', textAlign: 'center', borderBottom: '1px solid #F0F0F0' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', maxHeight: '160px', objectFit: 'contain' }}
        />
      </div>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: ACCENT,
          marginBottom: '0.35rem',
        }}>
          {product.category}
        </div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', margin: '0 0 0.35rem', lineHeight: '1.3' }}>
          {product.name}
        </h3>
        {product.description && (
          <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: '1.4', margin: '0 0 0.75rem', flexGrow: 1 }}>
            {product.description.length > 80 ? product.description.slice(0, 80) + '…' : product.description}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1rem', fontWeight: '800', color: '#111827' }}>{product.price}</span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: ACCENT,
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '2px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Buy →
            </a>
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>See options</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GearPage() {
  const [activeTab, setActiveTab] = useState('All');

  const products = useMemo(() => {
    const all = productsData.products.filter(p => p.asin || p.affiliateLink);
    if (activeTab === 'All') return all.sort((a, b) => (b.redditMentions || 0) - (a.redditMentions || 0));
    return all
      .filter(p => p.category?.toLowerCase() === activeTab.toLowerCase())
      .sort((a, b) => (b.redditMentions || 0) - (a.redditMentions || 0));
  }, [activeTab]);

  const relatedGuides = useMemo(() => {
    const slugs = GUIDE_SLUGS[activeTab] || GUIDE_SLUGS.All;
    return slugs.map(s => blogPosts.find(p => p.slug === s)).filter(Boolean);
  }, [activeTab]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <SiteNav />

      {/* Page header */}
      <div style={{ borderBottom: '3px solid #111827', padding: '2rem 1.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#111827', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
          Gear
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
          {products.length} picks — ranked by what creators actually use. All with verified affiliate links.
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: 0 }}>
          {CATEGORIES.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '0.7rem 1.1rem',
              border: 'none',
              borderBottom: activeTab === tab ? `3px solid ${ACCENT}` : '3px solid transparent',
              marginBottom: '-1px',
              backgroundColor: 'transparent',
              color: activeTab === tab ? ACCENT : '#374151',
              fontWeight: activeTab === tab ? '700' : '500',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
          {products.length === 0 && (
            <p style={{ color: '#9CA3AF', gridColumn: '1/-1' }}>No gear in this category yet.</p>
          )}
        </div>

        {/* Related reading */}
        {relatedGuides.length > 0 && (
          <div style={{ borderTop: '3px solid #111827', paddingTop: '1.5rem' }}>
            <h2 style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', marginBottom: '1rem' }}>
              Before You Buy — Read These First
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {relatedGuides.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'center',
                    padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '3px',
                    cursor: 'pointer',
                  }}>
                    <img src={post.image} alt={post.title} style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '700', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{post.category}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#111827', lineHeight: '1.3' }}>
                        {post.title.length > 55 ? post.title.slice(0, 55) + '…' : post.title}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{post.readTime}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
