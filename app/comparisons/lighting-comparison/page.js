'use client';

import Link from 'next/link';

export default function LightingComparison() {
  const lighting = [
    {
      name: 'Nanlite Pavo 15X RGB',
      price: '$389',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/71KxzOF8VqL._AC_SL1500_.jpg',
      slug: 'nanlite-pavo-15x-rgb',
      pros: ['Full RGB color control', 'Silent operation', 'Compact and portable', 'Professional build quality'],
      cons: ['Higher price point', 'Requires external ballast', 'Not as bright as HMI'],
      verdict: 'Best RGB LED panel for color grading',
      bestFor: 'Film productions, professional studios',
    },
    {
      name: 'Elgato Key Light Air',
      price: '$199',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/31U+yN0gTEL._AC_SL500_.jpg',
      slug: 'elgato-key-light-air',
      pros: ['Color temperature control', 'App control', 'Mount-friendly', 'Great for streaming'],
      cons: ['Limited RGB options', 'Moderate brightness', 'Proprietary software'],
      verdict: 'Best streaming light',
      bestFor: 'Streamers, content creators, gaming',
    },
    {
      name: 'Godox SL-60W LED',
      price: '$249',
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/I/61tQAl8cVaL._AC_SL1000_.jpg',
      slug: 'godox-sl-60w-led',
      pros: ['High brightness output', 'Good color rendering', 'Affordable price', 'Lightweight'],
      cons: ['Gets hot during use', 'Fan can be noisy', 'Limited color options'],
      verdict: 'Best value bright LED for video',
      bestFor: 'Studio work, video production on budget',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Best Lighting for Video Production (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Complete comparison of LED panels, key lights, and studio lighting solutions for creators
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Tested in real studios • Independent reviews
          </p>
        </div>

        {/* Quick Verdict */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(119, 39, 126, 0.1) 100%)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 107, 53, 0.3)',
          marginBottom: '40px',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#FF6B35' }}>Quick Verdict</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Best Overall:</strong> Nanlite Pavo 15X RGB - Professional RGB panel with unlimited color grading</li>
            <li><strong>Best for Streaming:</strong> Elgato Key Light Air - Simple, reliable, app-controlled lighting</li>
            <li><strong>Best Value:</strong> Godox SL-60W - Bright LED panel at an affordable price</li>
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
              <tr style={{ borderBottom: '2px solid #FF6B35' }}>
                <th style={{ textAlign: 'left', padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>Light</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {lighting.map((light, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: idx % 2 === 0 ? '#222' : 'transparent',
                }}>
                  <td style={{ padding: '15px' }}>
                    <Link href={`/guides/${light.slug}`} style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: '600' }}>
                      {light.name} →
                    </Link>
                  </td>
                  <td style={{ padding: '15px', color: '#FF6B35', fontWeight: 'bold' }}>{light.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#FFB81C' }}>★</span> {light.rating}
                  </td>
                  <td style={{ padding: '15px', color: '#aaa' }}>RGB LED</td>
                  <td style={{ padding: '15px', color: '#aaa', fontSize: '13px' }}>{light.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Lighting Setup Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {lighting.map((light, idx) => (
            <div key={idx} style={{
              backgroundColor: '#222',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #333',
            }}>
              <img src={light.image} alt={light.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>{light.name}</h3>
                <p style={{ color: '#FF6B35', fontWeight: 'bold', marginBottom: '15px' }}>{light.price}</p>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Pros</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#aaa' }}>
                    {light.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Cons</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#aaa' }}>
                    {light.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/guides/${light.slug}`} style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '15px',
                  boxSizing: 'border-box',
                }}>
                  Full Review →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div style={{
          padding: '30px',
          backgroundColor: '#222',
          borderRadius: '8px',
          marginBottom: '40px',
          lineHeight: '1.8',
        }}>
          <h2 style={{ marginTop: 0 }}>Professional Lighting for Video Creators</h2>
          <p>Lighting is the foundation of professional-looking video. Bad lighting makes even expensive cameras look cheap. Good lighting makes budget cameras look cinematic.</p>
          
          <h3>Lighting Setup Fundamentals</h3>
          <ul>
            <li><strong>3-Point Lighting:</strong> Key light, fill light, and back light create professional depth</li>
            <li><strong>Color Temperature:</strong> Daylight (5600K) vs. Tungsten (3200K) - consistency matters</li>
            <li><strong>CRI/TLCI:</strong> Higher numbers mean more accurate color rendering (look for 95+)</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(119, 39, 126, 0.1) 100%)', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Brighten Your Content</h3>
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
            Explore Lighting Gear
          </Link>
        </div>
      </div>
    </div>
  );
}
