'use client';

import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

export default function LightingComparison() {
  const lighting = [
    {
      name: 'Aputure Amaran 200d',
      price: '$289',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/61qcrx+GV3L._AC_SL1500_.jpg',
      slug: 'aputure-amaran-200d',
      pros: ['CRI 96+ / TLCI 97+ color accuracy', 'Bowens mount for modifiers', 'Ultra-quiet fan operation', 'Bluetooth app control via Sidus Link'],
      cons: ['Daylight-only (no bi-color)', 'Needs separate battery for portable use', 'Pricier than budget alternatives'],
      verdict: 'Best overall studio LED for creators',
      bestFor: 'YouTube studios, interviews, professional video',
    },
    {
      name: 'Amaran 60d S',
      price: '$99',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/61qWY7ey1gL._AC_SL1500_.jpg',
      slug: 'amaran-60d-s',
      pros: ['Incredible value at $99', 'Bowens mount compatible', 'Compact and lightweight', 'App control via Bluetooth'],
      cons: ['65W output (not for large sets)', 'Daylight-balanced only', 'No built-in battery'],
      verdict: 'Best value LED for video creators',
      bestFor: 'Budget studios, YouTube creators, beginners',
    },
    {
      name: 'Amaran F22C',
      price: '$369',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/71pMKVbZURL._AC_SL1500_.jpg',
      slug: 'amaran-f22c',
      pros: ['Full RGBWW color control', 'Ultra-thin foldable design', 'Sidus Link app control', 'Professional color accuracy'],
      cons: ['Higher price than basic panels', 'Requires external power', 'Learning curve for RGB modes'],
      verdict: 'Best flexible RGB panel for creative lighting',
      bestFor: 'Film productions, creative shoots, portable setups',
    },
    {
      name: 'Aputure MC',
      price: '$95',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/61Jx8xMnURL._AC_SL1500_.jpg',
      slug: 'aputure-mc',
      pros: ['Ultra-portable pocket size', 'Full RGBWW color', 'Magnetic mount', 'Built-in battery'],
      cons: ['Low output for key lighting', 'Short battery at full power', 'Small coverage area'],
      verdict: 'Best portable accent light',
      bestFor: 'Travel creators, accent lighting, on-the-go',
    },
    {
      name: 'Aputure LS 300X',
      price: '$1,395',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/61jfT9L3I5L._AC_SL1500_.jpg',
      slug: 'aputure-ls-300x',
      pros: ['300W bi-color output', '2700K-6500K range', 'Weather-resistant build', 'Sidus Link ecosystem'],
      cons: ['Premium price point', 'Heavy for location work', 'Requires ballast'],
      verdict: 'Best professional bi-color LED',
      bestFor: 'Professional studios, film sets, commercial work',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#111827', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: '#E84C3D', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Best Lighting for Video Production (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Complete comparison of LED panels, key lights, and studio lighting solutions for creators
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Tested in real studios • Independent reviews
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
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#E84C3D' }}>Quick Verdict</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Best Overall:</strong> Aputure Amaran 200d - Professional 200W daylight LED with stunning color accuracy</li>
            <li><strong>Best Value:</strong> Amaran 60d S - Incredible 65W LED at just $99 with Bowens mount</li>
            <li><strong>Best RGB:</strong> Amaran F22C - Flexible RGBWW panel for creative lighting</li>
            <li><strong>Best Portable:</strong> Aputure MC - Pocket-sized RGBWW with magnetic mount</li>
            <li><strong>Best Pro:</strong> Aputure LS 300X - 300W bi-color powerhouse for professional sets</li>
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
              <tr style={{ borderBottom: '2px solid #E84C3D' }}>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Light</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {lighting.map((light, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: idx % 2 === 0 ? '#222' : 'transparent',
                }}>
                  <td style={{ padding: '15px' }}>
                    <Link href={`/guides/${light.slug}`} style={{ color: '#E84C3D', textDecoration: 'none', fontWeight: '600' }}>
                      {light.name} →
                    </Link>
                  </td>
                  <td style={{ padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>{light.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span> {light.rating}
                  </td>
                  <td style={{ padding: '15px', color: '#6B7280' }}>RGB LED</td>
                  <td style={{ padding: '15px', color: '#6B7280', fontSize: '13px' }}>{light.bestFor}</td>
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
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}>
              <img src={light.image} alt={light.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>{light.name}</h3>
                <p style={{ color: '#E84C3D', fontWeight: 'bold', marginBottom: '15px' }}>{light.price}</p>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Pros</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {light.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Cons</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {light.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/guides/${light.slug}`} style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #E84C3D 0%, #B91C1C 100%)',
                  color: '#111827',
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
          backgroundColor: '#FFFFFF',
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
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#EFF6FF', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Brighten Your Content</h3>
          <Link href="/products" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: '#E84C3D',
            color: '#111827',
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
