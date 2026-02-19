'use client';

/**
 * Hero Section with Urgency & Trust Signals
 * Compelling headline, subtext, CTA, social proof, and scarcity messaging
 */

export default function HeroSection() {
  const ACCENT = '#E84C3D';
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #111827 0%, #1a2332 100%)',
      color: '#fff',
      padding: '3rem 2rem',
      textAlign: 'center',
      borderBottom: `4px solid ${ACCENT}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative accent */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`,
        borderRadius: '50%',
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Urgency Badge */}
        <div style={{
          display: 'inline-block',
          background: `${ACCENT}20`,
          border: `2px solid ${ACCENT}`,
          color: ACCENT,
          padding: '0.6rem 1.2rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: '1rem',
          animation: 'pulse 2s infinite',
        }}>
          ⏰ Live Updates · 68 Products · 50K+ Creators Trust Us
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: '900',
          lineHeight: '1.15',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Stop Wasting Money on Gear
          <br />
          <span style={{ color: ACCENT }}>Get Expert Advice from a Broadcast Engineer</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '1.15rem',
          color: '#d1d5db',
          lineHeight: '1.6',
          marginBottom: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
        }}>
          15 years of production experience. Real reviews tested in actual studios—not clickbait. 50,000+ creators use our recommendations to build better productions.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          <a href="#featured" style={{
            display: 'inline-block',
            background: ACCENT,
            color: '#fff',
            padding: '0.85rem 1.75rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            border: `2px solid ${ACCENT}`,
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#d63a2f';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = ACCENT;
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Explore Gear
          </a>
          <a href="/blog" style={{
            display: 'inline-block',
            background: 'transparent',
            color: '#fff',
            padding: '0.85rem 1.75rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            border: `2px solid #fff`,
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#111827';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#fff';
          }}>
            Read Guides
          </a>
        </div>

        {/* Social Proof Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto',
          padding: '1rem 0',
          marginTop: '1.5rem',
        }}>
          <div style={{
            padding: '1rem',
            background: 'rgba(232, 76, 61, 0.1)',
            borderRadius: '6px',
            border: `1px solid ${ACCENT}30`,
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: ACCENT }}>50K+</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '600' }}>Creators Trust Us</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(232, 76, 61, 0.1)',
            borderRadius: '6px',
            border: `1px solid ${ACCENT}30`,
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: ACCENT }}>68</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '600' }}>Products Reviewed</div>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(232, 76, 61, 0.1)',
            borderRadius: '6px',
            border: `1px solid ${ACCENT}30`,
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: ACCENT }}>15+</div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: '600' }}>Years In Production</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
          .hero-subtext { font-size: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
