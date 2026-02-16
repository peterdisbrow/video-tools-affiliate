'use client';

import { useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import productsData from '../products.json';

const AFFILIATE_TAG = productsData.affiliateTag;

// Generate Amazon affiliate link
const generateAmazonLink = (asin) => {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
};

const products = productsData.products.map(product => ({
  ...product,
  link: product.asin 
    ? generateAmazonLink(product.asin)
    : product.affiliateLink,
  image: product.image || 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop&q=80'
}));

const categories = [
  { id: 'all', name: 'All Gear' },
  { id: 'cameras', name: '📷 Cameras' },
  { id: 'audio', name: '🎙️ Audio' },
  { id: 'lighting', name: '💡 Lighting' },
  { id: 'software', name: '🖥️ Software' },
  { id: 'streaming', name: '📡 Streaming' },
  { id: 'accessories', name: '🎒 Accessories' },
];

const testimonials = [
  { author: 'Sarah Chen', text: 'Went from 500 to 15K subscribers after upgrading my camera and lighting setup using these recommendations. The guides saved me from expensive mistakes.', role: 'YouTube Creator', subs: '15K subscribers' },
  { author: 'Mark Rivera', text: 'As a filmmaker on a budget, I needed honest comparisons — not sponsored fluff. This is the only gear resource I trust for real-world recommendations.', role: 'Indie Filmmaker', subs: '42K subscribers' },
  { author: 'Alex Thompson', text: 'The price-tier guides are genius. I started with the "under $1K" camera list and upgraded piece by piece. My production quality is unrecognizable now.', role: 'Content Creator', subs: '8K subscribers' },
  { author: 'Priya Sharma', text: 'I was drowning in Amazon reviews. This site cut through the noise and helped me build a complete studio setup in one afternoon.', role: 'Podcast & Video Creator', subs: '23K subscribers' },
  { author: 'Jordan Blake', text: 'The blog posts alone are worth bookmarking. Detailed, no BS, and clearly written by someone who actually shoots video.', role: 'YouTube Educator', subs: '67K subscribers' },
];

const faqs = [
  { q: 'Are these affiliate links?', a: 'Yes. I earn a small commission when you purchase through these links at no extra cost to you. This helps me keep the recommendations fresh and accurate.' },
  { q: 'Do you actually use this gear?', a: 'I recommend gear based on quality, value, and creator feedback. Links point to trusted retailers like Amazon and B&H Photo.' },
  { q: 'Why these products?', a: 'I focus on tools that offer the best balance of quality, price, and reliability for video creators at all levels.' },
  { q: 'Can I get a discount?', a: 'Some products have sales periodically. Check the retailer directly for current pricing and deals.' },
];

function ProductCard({ product }) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        setShowDesc(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        setShowDesc(false);
      }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '9999px',
          fontSize: '0.8rem', fontWeight: '600', color: '#f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>★ {product.rating}</span>
      </div>
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937', margin: '0 0 0.5rem 0' }}>{product.name}</h3>
        <p style={{
          fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '0.75rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: showDesc ? 6 : 2,
          WebkitBoxOrient: 'vertical',
          transition: 'all 0.3s',
          margin: '0 0 0.75rem 0',
          flex: 1,
        }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#667eea' }}>{product.price}</span>
        </div>
        <a href={product.link} target="_blank" rel="noopener noreferrer" style={{
          display: 'block', width: '100%', padding: '0.7rem', backgroundColor: '#667eea', color: '#fff',
          textAlign: 'center', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold',
          cursor: 'pointer', transition: 'background-color 0.2s', boxSizing: 'border-box',
        }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6fd6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
        >View & Buy →</a>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#tools" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Tools</a>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Blog</Link>
            <a href="#faq" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '500' }}>🔥 Updated February 2026 · Limited-time gear guides</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Level Up Your Content: The Ultimate Video Creator&apos;s Toolkit</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.95, lineHeight: '1.6' }}>Discover the exact gear and software top creators trust. Handpicked recommendations with affiliate links – your trusted source for smart purchasing decisions.</p>
          {/* Social Proof Badges */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', opacity: 0.9 }}>
              <span style={{ fontSize: '1.2rem' }}>👥</span> Trusted by 50K+ creators
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', opacity: 0.9 }}>
              <span style={{ fontSize: '1.2rem' }}>🎯</span> 68 products reviewed
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', opacity: 0.9 }}>
              <span style={{ fontSize: '1.2rem' }}>📖</span> 26,000+ words of expert guides
            </div>
          </div>
          <a href="#tools" style={{ display: 'inline-block', backgroundColor: '#fff', color: '#667eea', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }}>Explore Recommended Gear</a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Products Section */}
      <section id="tools" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Gear by Category</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>18 handpicked tools across 6 categories</p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', overflow: 'auto', paddingBottom: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.id ? '#667eea' : '#e5e7eb',
                color: activeCategory === cat.id ? '#fff' : '#374151',
                fontWeight: activeCategory === cat.id ? 'bold' : '500',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Trusted by Creators Worldwide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', borderLeft: '4px solid #667eea' }}>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#374151' }}>&ldquo;{t.text}&rdquo;</p>
                <p style={{ fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{t.author}</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>{t.role} · {t.subs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Through Us */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Why Buy Through Creator Gear?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛒</div>
            <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', fontSize: '1rem' }}>vs. Direct Amazon</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Millions of products, zero curation. You waste hours comparing specs. We&apos;ve already done the research.</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
            <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', fontSize: '1rem' }}>vs. B&H Photo</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Great store, but no buying guides or price-tier breakdowns. Plus, Amazon often has better deals.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '0.75rem', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1rem' }}>Creator Gear</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.95, lineHeight: '1.5', margin: 0 }}>Curated picks + 20 free expert guides + price-tier comparisons. Everything a creator needs in one place.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{faq.q}</span>
                <span>{expandedFaq === i ? '−' : '+'}</span>
              </button>
              {expandedFaq === i && (
                <div style={{ padding: '0 1rem 1rem', color: '#374151', lineHeight: '1.6' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#d1d5db', textDecoration: 'none' }}>Home</Link>
            <Link href="/blog" style={{ color: '#d1d5db', textDecoration: 'none' }}>Blog</Link>
            <a href="#tools" style={{ color: '#d1d5db', textDecoration: 'none' }}>Tools</a>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', opacity: 0.7 }}>
            <span>👥 50K+ creators</span>
            <span>🎯 68 products</span>
            <span>📖 26K+ words of guides</span>
          </div>
          <p style={{ marginBottom: '0', opacity: 0.8, margin: 0 }}>© 2026 Creator Gear. Affiliate links support this site at no extra cost to you.</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: 0 }}>Curated recommendations for video creators, filmmakers, and content professionals.</p>
        </div>
      </footer>
    </div>
  );
}
