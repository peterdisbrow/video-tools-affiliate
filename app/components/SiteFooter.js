import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer style={{
      backgroundColor: '#F8F9FA',
      borderTop: '1px solid #E5E7EB',
      padding: '3rem 2rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
              🎬 Creator Gear
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', maxWidth: '240px', lineHeight: '1.5', margin: 0 }}>
              Honest gear reviews by creators, for creators. No fluff, no sponsored bias.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: '600', color: '#374151', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/comparisons" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>Comparisons</Link>
                <Link href="/guides" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>Guides</Link>
                <Link href="/blog" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>Blog</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '600', color: '#374151', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/about" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>About</Link>
                <Link href="/how-we-review" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>How We Review</Link>
                <Link href="/free-gear-guide" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.875rem' }}>Free Guides</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid #E5E7EB',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: 0 }}>
            © 2026 Creator Gear. Affiliate links support this site at no extra cost to you.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: 0 }}>
            Curated recommendations for video creators &amp; filmmakers.
          </p>
        </div>
      </div>
    </footer>
  );
}
