'use client';

import Link from 'next/link';

export default function ComparisonsHub() {
  const comparisons = [
    {
      title: 'Best Cameras',
      description: 'Full-frame vs. compact vs. smartphone cameras. Complete breakdown for every creator type.',
      href: '/comparisons/best-cameras',
      icon: '📷',
      keywords: 'best cameras, camera comparison, DSLR vs mirrorless',
    },
    {
      title: 'Best Audio Gear',
      description: 'Microphones, headphones, and audio equipment. Professional audio on any budget.',
      href: '/comparisons/best-audio-gear',
      icon: '🎙️',
      keywords: 'best microphones, audio gear, podcast equipment',
    },
    {
      title: 'Lighting Comparison',
      description: 'LED panels, key lights, and studio lighting solutions for professional production.',
      href: '/comparisons/lighting-comparison',
      icon: '💡',
      keywords: 'best lighting, LED panels, studio lighting',
    },
    {
      title: 'Streaming Setups',
      description: 'Complete setups from $400 to $4,200+. Pre-configured for every budget level.',
      href: '/comparisons/streaming-setups',
      icon: '🎬',
      keywords: 'streaming setup, Twitch setup, streaming gear',
    },
    {
      title: 'Video Software',
      description: 'Editing software comparison: Premiere Pro, DaVinci Resolve, Final Cut Pro, and more.',
      href: '/comparisons/video-software',
      icon: '💻',
      keywords: 'video editing software, premiere pro, davinci resolve',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Product Comparisons & Guides
          </h1>
          <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '10px', maxWidth: '700px', margin: '15px auto' }}>
            In-depth comparisons of cameras, audio gear, lighting, software, and complete streaming setups
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Honest reviews • Updated daily • Affiliate links support our work
          </p>
        </div>

        {/* Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '60px' }}>
          {comparisons.map((comp, idx) => (
            <Link href={comp.href} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                backgroundColor: '#222',
                borderRadius: '12px',
                padding: '30px',
                border: '2px solid #333',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>{comp.icon}</div>
                <h2 style={{ marginTop: 0, marginBottom: '10px', fontSize: '22px', color: '#FF6B35' }}>{comp.title}</h2>
                <p style={{ marginTop: 0, marginBottom: '15px', color: '#aaa', flex: 1, lineHeight: '1.6' }}>
                  {comp.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FF6B35',
                  fontWeight: 'bold',
                  marginTop: 'auto',
                }}>
                  View Comparison →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Comparisons Section */}
        <div style={{
          padding: '40px',
          backgroundColor: '#222',
          borderRadius: '12px',
          border: '1px solid #333',
          marginBottom: '40px',
          lineHeight: '1.8',
        }}>
          <h2 style={{ marginTop: 0, fontSize: '28px', marginBottom: '20px' }}>Why These Comparisons?</h2>
          <p>
            Choosing gear for video creation can be overwhelming. There are thousands of products, conflicting reviews, and it's hard to know what actually matters.
          </p>
          <p>
            Our comparisons are different:
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>Real Creator Feedback:</strong> Based on feedback from actual creators using this gear daily</li>
            <li><strong>Honest Trade-offs:</strong> Every product has pros and cons. We don't hide the cons.</li>
            <li><strong>Budget Transparency:</strong> We compare options at every price point, not just luxury gear</li>
            <li><strong>No Sponsorships:</strong> We earn affiliate commissions (disclosed clearly), but we're not paid to recommend products</li>
          </ul>

          <h3>How We Review</h3>
          <ol>
            <li>Research market data from Reddit, YouTube, and creator communities</li>
            <li>Test top products in real-world conditions (or get detailed feedback from creators using them)</li>
            <li>Compare features, pricing, and practical usefulness</li>
            <li>Rate based on value for the specific creator type</li>
            <li>Update regularly as new products and feedback arrive</li>
          </ol>
        </div>

        {/* Quick Decision Guide */}
        <div style={{
          padding: '40px',
          backgroundColor: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(119, 39, 126, 0.1) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          marginBottom: '40px',
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Quick Decision Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ marginTop: 0, color: '#FF6B35' }}>🎥 Starting a YouTube Channel?</h4>
              <p>See: <Link href="/comparisons/best-cameras" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 'bold' }}>Best Cameras →</Link></p>
            </div>
            <div>
              <h4 style={{ marginTop: 0, color: '#FF6B35' }}>🎙️ Starting a Podcast?</h4>
              <p>See: <Link href="/comparisons/best-audio-gear" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 'bold' }}>Best Audio Gear →</Link></p>
            </div>
            <div>
              <h4 style={{ marginTop: 0, color: '#FF6B35' }}>🎬 Building a Streaming Setup?</h4>
              <p>See: <Link href="/comparisons/streaming-setups" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 'bold' }}>Complete Setups →</Link></p>
            </div>
            <div>
              <h4 style={{ marginTop: 0, color: '#FF6B35' }}>💡 Need Better Lighting?</h4>
              <p>See: <Link href="/comparisons/lighting-comparison" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 'bold' }}>Lighting Guide →</Link></p>
            </div>
            <div>
              <h4 style={{ marginTop: 0, color: '#FF6B35' }}>💻 Choosing Editing Software?</h4>
              <p>See: <Link href="/comparisons/video-software" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 'bold' }}>Software Comparison →</Link></p>
            </div>
          </div>
        </div>

        {/* All Products CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Browse All 80+ Products</h3>
          <p style={{ color: '#aaa', marginBottom: '20px' }}>
            From cameras to lighting to software, explore our full catalog
          </p>
          <Link href="/products" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
          }}>
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
