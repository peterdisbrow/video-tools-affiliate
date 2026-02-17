'use client';

import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

export default function BestCamerasComparison() {
  const cameras = [
    {
      name: 'Sony Alpha a7 IV',
      price: '$2,498',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/81jlDvZPMnL._AC_SL1500_.jpg',
      slug: 'sony-alpha-a7-iv',
      pros: ['Outstanding autofocus', 'Excellent 4K 60fps', '10-bit recording', 'Weather-sealed'],
      cons: ['Learning curve', 'Limited battery life', 'No 4K 120fps'],
      verdict: 'Best all-around full-frame hybrid',
      bestFor: 'YouTube creators, vloggers, filmmakers',
    },
    {
      name: 'Canon EOS R6 Mark II',
      price: '$2,499',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/61S4Op1us3L._AC_SL1500_.jpg',
      slug: 'canon-eos-r6-mark-ii',
      pros: ['Best autofocus for tracking', '6K oversampled 4K', '40fps burst shooting', 'IBIS stabilization'],
      cons: ['Expensive body-only', '4K 60fps crop', 'Can overheat in 4K'],
      verdict: 'Top-tier autofocus king',
      bestFor: 'Run-and-gun video creators',
    },
    {
      name: 'DJI Osmo Pocket 3',
      price: '$749',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/51d4Esi79-L._AC_SL1285_.jpg',
      slug: 'dji-osmo-pocket-3',
      pros: ['Ultra-compact', '1-inch sensor', '4K/120fps', '3-axis gimbal'],
      cons: ['Limited manual controls', 'Small battery', 'No lens changing'],
      verdict: 'Pocketable vlogging powerhouse',
      bestFor: 'Vloggers, travel creators',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#111827', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: '#2563EB', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Best Cameras for Video Creators (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Honest comparison of the top cameras for YouTube, TikTok, and professional video production
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Based on 2,000+ creator reviews • 100% independent analysis
          </p>
        </div>

        {/* Quick Verdict */}
        <div style={{
          padding: '20px',
          background: '#EFF6FF',
          borderRadius: '8px',
          border: '1px solid #BFDBFE',
          marginBottom: '40px',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#2563EB' }}>Quick Verdict</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Best Overall:</strong> Sony Alpha a7 IV - Full-frame workhorse with outstanding autofocus</li>
            <li><strong>Best for Speed:</strong> Canon EOS R6 Mark II - Industry-leading tracking autofocus</li>
            <li><strong>Best Value:</strong> DJI Osmo Pocket 3 - Compact powerhouse for vlogging</li>
          </ul>
        </div>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto', marginBottom: '50px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #2563EB' }}>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Camera</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Key Strength</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {cameras.map((camera, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: idx % 2 === 0 ? '#222' : 'transparent',
                }}>
                  <td style={{ padding: '15px' }}>
                    <Link href={`/guides/${camera.slug}`} style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
                      {camera.name} →
                    </Link>
                  </td>
                  <td style={{ padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>{camera.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span> {camera.rating}
                  </td>
                  <td style={{ padding: '15px', color: '#6B7280' }}>{camera.verdict}</td>
                  <td style={{ padding: '15px', color: '#6B7280', fontSize: '13px' }}>{camera.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Comparison Cards */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Detailed Breakdown</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {cameras.map((camera, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <img src={camera.image} alt={camera.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>{camera.name}</h3>
                <p style={{ color: '#2563EB', fontWeight: 'bold', marginBottom: '15px' }}>{camera.price}</p>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Pros</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {camera.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Cons</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {camera.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/guides/${camera.slug}`} style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  color: '#111827',
                  textAlign: 'center',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '15px',
                  boxSizing: 'border-box',
                }}>
                  Read Full Review →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div style={{
          padding: '30px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          marginBottom: '40px',
          lineHeight: '1.8',
        }}>
          <h2 style={{ marginTop: 0 }}>How to Choose the Best Camera for Your Videos</h2>
          <p>Choosing the right camera is one of the biggest investments for content creators. Whether you're starting a YouTube channel, creating TikTok content, or shooting professional videos, the camera you pick will define your production quality for years to come.</p>
          
          <h3>Key Factors to Consider</h3>
          <ul>
            <li><strong>Sensor Size:</strong> Full-frame sensors provide better low-light performance and shallow depth-of-field control</li>
            <li><strong>Video Frame Rates:</strong> 4K 60fps has become the standard for professional content</li>
            <li><strong>Autofocus Performance:</strong> Fast, accurate autofocus is critical for run-and-gun video work</li>
            <li><strong>Stabilization:</strong> In-body image stabilization (IBIS) is essential for handheld shooting</li>
            <li><strong>Build Quality:</strong> Weather-sealing and robust construction matter for field work</li>
          </ul>

          <h3>FAQ: Camera Comparison</h3>
          <p><strong>Q: Which camera is best for YouTube?</strong><br/>
          A: The Sony Alpha a7 IV offers the best balance of autofocus, video quality, and affordability for YouTube creators.</p>
          
          <p><strong>Q: Is the Canon R6 Mark II better than Sony a7 IV?</strong><br/>
          A: They're comparable, but Canon wins on autofocus speed and Sony on overall versatility. Your choice depends on your specific workflow.</p>
          
          <p><strong>Q: Should I buy a compact camera like the DJI Osmo?</strong><br/>
          A: If you're focused on vlogging and portability, absolutely. If you need maximum flexibility, a full-frame camera is better.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#EFF6FF', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Ready to Choose Your Camera?</h3>
          <p style={{ color: '#6B7280', marginBottom: '20px' }}>All our comparison links are affiliate links. When you buy through them, we earn a small commission at no extra cost to you.</p>
          <Link href="/products" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: '#2563EB',
            color: '#111827',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '14px',
          }}>
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
