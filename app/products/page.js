'use client';

import Link from 'next/link';
import { blogPosts } from '../guides/blogData';
import { useState, useMemo } from 'react';
import SocialProofBadges from '../components/SocialProofBadges';
import UrgencySignals from '../components/UrgencySignals';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#2563EB';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category));
    return ['all', ...Array.from(cats).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />

      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 100%)',
        borderBottom: '1px solid #E5E7EB',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#DBEAFE',
            color: ACCENT,
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            marginBottom: '1.25rem',
            fontWeight: '600',
            letterSpacing: '0.03em',
          }}>
            📦 {blogPosts.length} products reviewed · Honest picks for creators
          </div>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem', fontWeight: '800', color: '#111827', lineHeight: '1.2' }}>
            Video Creator Tools & Gear
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.7', maxWidth: '620px', margin: '0 auto' }}>
            Browse all {blogPosts.length} recommended tools, cameras, lighting, audio equipment, and software for video creators
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Category Filter */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: selectedCategory === cat ? ACCENT : '#e5e7eb',
                color: selectedCategory === cat ? '#fff' : '#374151',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: selectedCategory === cat ? 'bold' : '500',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredProducts.map(product => (
            <Link
              key={product.slug}
              href={`/guides/${product.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              >
                {/* Product Image */}
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                  <img
                    src={product.image || 'https://via.placeholder.com/250x200?text=' + encodeURIComponent(product.title)}
                    alt={product.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Product Info */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.75rem', color: ACCENT, textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: '600', letterSpacing: '0.03em' }}>
                    {product.category}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1.3', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                    {product.title.split(' Review')[0]}
                  </h3>
                  
                  {/* Social Proof Badges */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    <SocialProofBadges product={product} />
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem', flex: 1, lineHeight: '1.5', margin: '0 0 0.75rem 0' }}>
                    {product.excerpt}
                  </p>

                  {/* Urgency Signals */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <UrgencySignals product={product} />
                  </div>

                  {/* Rating & Price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                      <span style={{ color: '#f59e0b' }}>★</span>
                      <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: '500' }}>{product.rating.toFixed(1)}</span>
                    </div>
                    {product.price && (
                      <span style={{ fontSize: '0.9rem', color: ACCENT, fontWeight: 'bold' }}>
                        {product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 2rem', color: '#6b7280' }}>
            <p>No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <section style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid #E5E7EB', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', margin: 0 }}>All products include verified affiliate links to help support our creator community.</p>
      </section>

      <SiteFooter />
    </div>
  );
}
