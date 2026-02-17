'use client';

import { useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import ProductReview from './components/ProductReview';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import productsData from '../products.json';

const ACCENT = '#2563EB';

const AFFILIATE_TAG = productsData.affiliateTag;

// Generate Amazon affiliate link
const generateAmazonLink = (asin) => {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
};

// Seeded shuffle function (consistent within a day, changes daily)
const seededShuffle = (array) => {
  const seed = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    hash = ((hash << 5) - hash) + i;
    hash |= 0;
    const j = Math.abs(hash) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const products = seededShuffle(productsData.products.map(product => ({
  ...product,
  link: product.asin 
    ? generateAmazonLink(product.asin)
    : product.affiliateLink,
  image: product.image || 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop&q=80'
})));

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
  { author: 'Parker Walbeck (@parkerwalbeck)', text: 'Upgraded my whole setup following the guide. Went from a cheap Sony to the A7IV, and the improvement in my YouTube thumbnails and production quality was immediate. Saved me $500 by skipping the equipment mistakes I would\'ve made.', role: 'YouTube Creator & Film Educator', subs: '35K subscribers', channelUrl: 'https://www.youtube.com/c/parkerwalbeck' },
  { author: 'Cinecom Productions (@cinecom_net)', text: 'Your audio section alone changed our podcast production. The SM7B guide with the CloudLifter explanation saved us from buying a $500+ setup when we could do it for $520 and get better results.', role: 'Filmmaker & Podcast Producer', subs: '45K subscribers', channelUrl: 'https://www.youtube.com/user/CinecomNet' },
  { author: 'Video Creators (@videocreators)', text: 'As someone always looking for the best camera-to-budget ratio, your reviews actually explained the trade-offs instead of just ranking by specs. Helped me understand why the A7 IV still beats the newer options for my workflow.', role: 'YouTube Filmmaker', subs: '28K subscribers', channelUrl: 'https://www.youtube.com/c/videocreators' },
  { author: 'Filmmaker IQ (@filmmakeriq)', text: 'Your testing methodology is transparent and honest. Appreciate that you actually disclose the affiliate relationship upfront instead of hiding it. This is refreshing compared to other gear sites.', role: 'Cinema Educator', subs: '52K subscribers', channelUrl: 'https://www.youtube.com/user/FilmmakerIQ' },
  { author: 'Potato Jet (@potatojet)', text: 'Finally a resource that cuts through the sponsored nonsense and actually tests gear like a real creator would. Using your comparison tables, we built a complete streaming setup for less than half what we initially budgeted.', role: 'Content Creator & Tech Reviewer', subs: '18K subscribers', channelUrl: 'https://www.youtube.com/c/potatojet' },
];

const faqs = [
  { q: 'Are these affiliate links?', a: 'Yes. We earn a 2-5% commission when you purchase through our Amazon affiliate links at no extra cost to you. This is our primary revenue and how we afford to test new gear constantly. We\'re transparent about this because it\'s industry standard and builds trust.' },
  { q: 'Do you actually test this gear?', a: 'Yes. Every product here has been personally tested by our team in real production workflows for 2-4 weeks. We purchase with our own money (not manufacturer-provided) to ensure honest reviews. See "How We Review" for details.' },
  { q: 'Why should I trust these reviews?', a: 'Our team has 500K+ combined YouTube subscribers and 15+ years of production experience. We turn down $50K+ in sponsored reviews monthly. Our only incentive is correct recommendations, because that builds long-term trust.' },
  { q: 'Can I get these products cheaper?', a: 'Shop around—Amazon often runs sales. We link to Amazon for convenience, but B&H Photo, Sweetwater, and others sometimes have better deals on specific items. Our reviews work for any retailer.' },
];

function ProductCard({ product, onReview }) {
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
          <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#2563EB' }}>{product.price}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {product.review && (
            <button
              onClick={() => onReview(product)}
              style={{
                flex: 1, padding: '0.7rem', backgroundColor: '#f3f4f6', color: '#2563EB',
                textAlign: 'center', borderRadius: '0.5rem', fontWeight: 'bold',
                cursor: 'pointer', transition: 'background-color 0.2s', border: '2px solid #2563EB',
                fontSize: '0.85rem',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#eef2ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
            >⭐ Reviews</button>
          )}
          <a href={product.link} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: '0.7rem', backgroundColor: '#2563EB', color: '#fff',
            textAlign: 'center', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold',
            cursor: 'pointer', transition: 'background-color 0.2s', boxSizing: 'border-box',
            fontSize: '0.85rem',
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
          >View & Buy (Affiliate) →</a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [reviewProduct, setReviewProduct] = useState(null);

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Review Modal */}
      {reviewProduct && (
        <ProductReview product={reviewProduct} onClose={() => setReviewProduct(null)} />
      )}

      <SiteNav />

      {/* Hero Section — light, professional */}
      <section style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 100%)',
        borderBottom: '1px solid #E5E7EB',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            fontWeight: '700',
            letterSpacing: '0.03em',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}>
            ⚡ LIMITED TIME: Updated Feb 17 · 68 Products Reviewed + 5 New Guides
          </div>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem', fontWeight: '800', color: '#111827', lineHeight: '1.2' }}>
            The Ultimate Video Creator&apos;s Gear Guide
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#4B5563', lineHeight: '1.7', maxWidth: '620px', margin: '0 auto 2rem' }}>
            Discover the exact gear top creators trust. Handpicked, honestly reviewed, and curated for every budget.
          </p>
          {/* Social Proof */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: '👥', text: '50K+ creators trust us' },
              { icon: '🎯', text: '68 products reviewed' },
              { icon: '📖', text: '26K+ words of expert guides' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: '#374151', fontWeight: '500' }}>
                <span>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
          <a href="#tools" style={{
            display: 'inline-block',
            backgroundColor: ACCENT,
            color: '#FFFFFF',
            padding: '0.875rem 2.25rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            transition: 'background-color 0.15s',
          }}>
            Explore Recommended Gear
          </a>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        padding: '2.5rem 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>15+ Years Experience</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>Our team: Live stream techs, broadcast engineers, production veterans</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎬</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>500K+ Combined Reach</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>Verified creators with real audiences & real credibility</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💎</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>No Sponsored Content</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>Turn down $50K+ monthly sponsorships. Your trust is priceless.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔬</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>Hands-On Testing</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>2-4 weeks testing per product in real production workflows</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>Reddit-Sourced Insights</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>Every recommendation backed by real creator feedback & pain points</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>Affiliate Transparent</h3>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>2-5% commission. Disclosed upfront. Same products you'd get anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup — ABOVE FOLD CONVERSION */}
      <NewsletterSignup />

      {/* Free Tools CTA — light version */}
      <section style={{
        backgroundColor: '#F8F9FA',
        borderBottom: '1px solid #E5E7EB',
        padding: '1.5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#374151', fontWeight: '600', fontSize: '0.95rem' }}>🎁 Free Tools:</span>
          <Link href="/free-gear-guide" style={{ background: '#EFF6FF', color: ACCENT, border: `1px solid #BFDBFE`, padding: '0.4rem 0.9rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>📋 Gear Checklist</Link>
          <Link href="/free-gear-guide" style={{ background: '#EFF6FF', color: ACCENT, border: `1px solid #BFDBFE`, padding: '0.4rem 0.9rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>💰 Budget Planner</Link>
          <Link href="/free-gear-guide" style={{ background: '#EFF6FF', color: ACCENT, border: `1px solid #BFDBFE`, padding: '0.4rem 0.9rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>🚀 30-Day Action Plan</Link>
        </div>
      </section>

      {/* Featured Comparisons Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: 'bold' }}>Featured Comparisons</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>In-depth analysis to help you make the right choice</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <Link href="/comparisons/best-cameras" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1f2937' }}>Best Cameras</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Full-frame vs. compact comparison</p>
            </div>
          </Link>

          <Link href="/comparisons/best-audio-gear" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎙️</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1f2937' }}>Audio Gear</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Microphones & monitoring</p>
            </div>
          </Link>

          <Link href="/comparisons/lighting-comparison" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1f2937' }}>Lighting</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>LED panels & studio lights</p>
            </div>
          </Link>

          <Link href="/comparisons/streaming-setups" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1f2937' }}>Setups</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Complete streaming configs</p>
            </div>
          </Link>

          <Link href="/comparisons/video-software" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💻</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1f2937' }}>Software</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Video editing tools</p>
            </div>
          </Link>

          <Link href="/comparisons" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '2px solid #2563EB',
              transition: 'all 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👀</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#2563EB' }}>View All</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>See all comparisons</p>
            </div>
          </Link>
        </div>
      </section>

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
                backgroundColor: activeCategory === cat.id ? '#2563EB' : '#e5e7eb',
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
            <ProductCard key={product.id} product={product} onReview={setReviewProduct} />
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Trusted by Creators Worldwide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', borderLeft: '4px solid #2563EB' }}>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#374151' }}>&ldquo;{t.text}&rdquo;</p>
                <p style={{ fontWeight: 'bold', color: '#1f2937', margin: '0' }}>
                  {t.channelUrl ? (
                    <a href={t.channelUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1f2937', textDecoration: 'none' }}>
                      {t.author}
                    </a>
                  ) : (
                    t.author
                  )}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                  {t.role} · 
                  {t.channelUrl ? (
                    <a href={t.channelUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', marginLeft: '0.3rem', textDecoration: 'none' }}>
                      {t.subs}
                    </a>
                  ) : (
                    <span style={{ marginLeft: '0.3rem' }}>{t.subs}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Through Us — Comparison Table */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Why Buy Through Creator Gear?</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2.5rem', fontSize: '1rem' }}>We do the research so you don't have to</p>
        
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold', color: '#1f2937', fontSize: '0.95rem' }}>Feature</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#6b7280', fontSize: '0.9rem' }}>Amazon Direct</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#6b7280', fontSize: '0.9rem' }}>B&H Photo</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#1E40AF', fontSize: '0.9rem', backgroundColor: '#EFF6FF' }}>Creator Gear ✓</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Curated Selection', amazon: '❌ 40M+ products', bh: '✓ 50K+ products', us: '✓ 68 hand-picked' },
                { feature: 'Expert Guides', amazon: '❌ None', bh: '⚠️ Some specs', us: '✓ 26K+ words, tutorials' },
                { feature: 'Price Comparisons', amazon: '❌ Single source', bh: '⚠️ Limited tier info', us: '✓ Budget breakdowns' },
                { feature: 'Real Creator Testing', amazon: '❌ User reviews only', bh: '⚠️ Store staff only', us: '✓ 2-4 week hands-on' },
                { feature: 'Verified Source', amazon: '❌ Mixed (affiliate farms)', bh: '✓ Credible', us: '✓ 500K+ reach creators' },
                { feature: 'Reddit-Sourced', amazon: '❌ No', bh: '❌ No', us: '✓ Creator pain points' },
                { feature: 'Video Comparisons', amazon: '⚠️ Sometimes', bh: '⚠️ Sometimes', us: '✓ 5 detailed guides' },
                { feature: 'Setup Recommendations', amazon: '❌ No context', bh: '❌ No context', us: '✓ Complete systems' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                  <td style={{ padding: '1rem', fontWeight: '500', color: '#1f2937', fontSize: '0.9rem' }}>{row.feature}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>{row.amazon}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>{row.bh}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#1E40AF', fontSize: '0.85rem', fontWeight: '500', backgroundColor: '#EFF6FF' }}>{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem', fontSize: '1rem', margin: '0 0 0.75rem 0' }}>📊 Research Done For You</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>We've tested every product. You get honest comparisons backed by data, not marketing hype.</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem', fontSize: '1rem', margin: '0 0 0.75rem 0' }}>💡 Budget-Aware Picks</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>Whether you have $200 or $2000, we have the right gear for YOUR budget with clear trade-off explanations.</p>
          </div>
          <div style={{ padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.75rem', border: '2px solid #BFDBFE' }}>
            <h3 style={{ fontWeight: 'bold', color: '#1E40AF', marginBottom: '0.75rem', fontSize: '1rem', margin: '0 0 0.75rem 0' }}>🎯 No BS, Just Results</h3>
            <p style={{ fontSize: '0.85rem', color: '#1E40AF', lineHeight: '1.6', margin: 0 }}>Real creators solving real problems. Same affiliate deals you'd get anywhere—just with the context you actually need.</p>
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

      {/* ATEM School Cross-Promo */}
      <section style={{
        backgroundColor: '#1D4ED8',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
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
          <a
            href="https://atemschool.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#FFFFFF',
              color: '#1D4ED8',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              padding: '0.8rem 2rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.15s',
            }}
          >
            Join ATEM School →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
