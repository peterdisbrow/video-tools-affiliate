'use client';

import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#2563EB';

export default function ComparisonsHub() {
  const comparisons = [
    {
      title: 'Best Cameras',
      description: 'Full-frame vs. compact vs. smartphone cameras. Complete breakdown for every creator type.',
      href: '/comparisons/best-cameras',
      icon: '📷',
    },
    {
      title: 'Best Audio Gear',
      description: 'Microphones, headphones, and audio equipment. Professional audio on any budget.',
      href: '/comparisons/best-audio-gear',
      icon: '🎙️',
    },
    {
      title: 'Lighting Comparison',
      description: 'LED panels, key lights, and studio lighting solutions for professional production.',
      href: '/comparisons/lighting-comparison',
      icon: '💡',
    },
    {
      title: 'Streaming Setups',
      description: 'Complete setups from $400 to $4,200+. Pre-configured for every budget level.',
      href: '/comparisons/streaming-setups',
      icon: '🎬',
    },
    {
      title: 'Video Software',
      description: 'Editing software comparison: Premiere Pro, DaVinci Resolve, Final Cut Pro, and more.',
      href: '/comparisons/video-software',
      icon: '💻',
    },
  ];

  const quickGuide = [
    { q: '🎥 Starting a YouTube Channel?', link: '/comparisons/best-cameras', label: 'Best Cameras →' },
    { q: '🎙️ Starting a Podcast?', link: '/comparisons/best-audio-gear', label: 'Best Audio Gear →' },
    { q: '🎬 Building a Streaming Setup?', link: '/comparisons/streaming-setups', label: 'Complete Setups →' },
    { q: '💡 Need Better Lighting?', link: '/comparisons/lighting-comparison', label: 'Lighting Guide →' },
    { q: '💻 Choosing Editing Software?', link: '/comparisons/video-software', label: 'Software Comparison →' },
  ];

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
            Side-by-Side Comparisons
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            Product Comparisons &amp; Buying Guides
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: '1.6' }}>
            In-depth comparisons of cameras, audio gear, lighting, software, and complete streaming setups. Honest trade-offs, every budget.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {comparisons.map((comp, idx) => (
            <Link href={comp.href} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '0.75rem',
                padding: '1.75rem',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BFDBFE';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{comp.icon}</div>
                <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.2rem', color: '#111827', fontWeight: '700' }}>
                  {comp.title}
                </h2>
                <p style={{ marginTop: 0, marginBottom: '1.25rem', color: '#6B7280', flex: 1, lineHeight: '1.6', fontSize: '0.9rem' }}>
                  {comp.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: ACCENT,
                  fontWeight: '600',
                  fontSize: '0.875rem',
                }}>
                  View Comparison →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why These Comparisons */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#F8F9FA',
          borderRadius: '0.75rem',
          border: '1px solid #E5E7EB',
          marginBottom: '2rem',
          lineHeight: '1.8',
          color: '#374151',
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem', marginBottom: '1rem', color: '#111827', fontWeight: '700' }}>
            Why These Comparisons?
          </h2>
          <p style={{ margin: '0 0 1rem' }}>
            Choosing gear can be overwhelming. Our comparisons cut through the noise with honest trade-offs and real-world testing.
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li style={{ marginBottom: '0.4rem' }}><strong>Real Creator Feedback:</strong> Based on feedback from actual creators using this gear daily</li>
            <li style={{ marginBottom: '0.4rem' }}><strong>Honest Trade-offs:</strong> Every product has pros and cons — we don&apos;t hide the cons</li>
            <li style={{ marginBottom: '0.4rem' }}><strong>Budget Transparency:</strong> We compare options at every price point, not just luxury gear</li>
            <li style={{ marginBottom: '0.4rem' }}><strong>No Sponsorships:</strong> Affiliate commissions (disclosed) — never paid to recommend specific products</li>
          </ul>
        </div>

        {/* Quick Decision Guide */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#EFF6FF',
          borderRadius: '0.75rem',
          border: '1px solid #BFDBFE',
          marginBottom: '2rem',
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.25rem', color: '#111827', fontWeight: '700' }}>
            🧭 Quick Decision Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {quickGuide.map((item, i) => (
              <div key={i}>
                <p style={{ margin: '0 0 0.35rem', fontWeight: '600', color: '#1E40AF', fontSize: '0.9rem' }}>{item.q}</p>
                <Link href={item.link} style={{ color: ACCENT, textDecoration: 'none', fontWeight: '600', fontSize: '0.875rem' }}>
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontWeight: '700' }}>
            Browse All Gear Reviews
          </h3>
          <p style={{ color: '#6B7280', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            From cameras to lighting to software, explore our full catalog
          </p>
          <Link href="/#tools" style={{
            display: 'inline-block',
            padding: '0.875rem 2rem',
            backgroundColor: ACCENT,
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '700',
            fontSize: '0.95rem',
          }}>
            View All Gear →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
