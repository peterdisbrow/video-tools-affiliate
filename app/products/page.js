'use client';

import Link from 'next/link';
import { blogPosts } from '../guides/blogData';
import { useState, useMemo } from 'react';
import SocialProofBadges from '../components/SocialProofBadges';
import UrgencySignals from '../components/UrgencySignals';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Group products by category
  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map(post => post.category));
    return ['all', ...Array.from(cats).sort()];
  }, []);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '10px' }}>
            Video Creator Tools & Gear
          </h1>
          <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '30px' }}>
            Browse all {blogPosts.length} recommended tools, cameras, lighting, audio equipment, and software for video creators
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: selectedCategory === cat ? '#2563EB' : '#333',
                color: selectedCategory === cat ? '#fff' : '#aaa',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease'
              }}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {filteredProducts.map(product => (
            <Link
              key={product.slug}
              href={`/guides/${product.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                backgroundColor: '#222',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Product Image */}
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#333' }}>
                  <img
                    src={product.image || 'https://via.placeholder.com/250x200?text=' + encodeURIComponent(product.title)}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '12px', color: '#2563EB', textTransform: 'uppercase', marginBottom: '5px' }}>
                    {product.category}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.3' }}>
                    {product.title.split(' Review')[0]}
                  </h3>
                  
                  {/* Social Proof Badges */}
                  <div style={{ marginBottom: '10px' }}>
                    <SocialProofBadges product={product} />
                  </div>

                  <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '10px', flex: 1 }}>
                    {product.excerpt}
                  </p>

                  {/* Urgency Signals */}
                  <div style={{ marginBottom: '10px' }}>
                    <UrgencySignals product={product} />
                  </div>

                  {/* Rating & Price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #333' }}>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <span style={{ color: '#FFB81C' }}>★</span>
                      <span style={{ fontSize: '13px' }}>{product.rating.toFixed(1)}</span>
                    </div>
                    {product.price && (
                      <span style={{ fontSize: '13px', color: '#2563EB', fontWeight: 'bold' }}>
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
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#aaa' }}>
            <p>No products found in this category.</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid #333', color: '#aaa' }}>
          <p>All products include verified affiliate links to help support our creator community.</p>
        </div>
      </div>
    </div>
  );
}
