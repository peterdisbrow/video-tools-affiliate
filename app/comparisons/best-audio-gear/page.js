'use client';

import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

export default function BestAudioGearComparison() {
  const audioGear = [
    {
      name: 'Shure SM7B Microphone',
      price: '$399',
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/I/51Wvs2GxZ1L._AC_SL1000_.jpg',
      slug: 'shure-sm7b-microphone',
      pros: ['Industry standard', 'Exceptional voice isolation', 'Warm, broadcast-quality tone', 'Built-in pop filter'],
      cons: ['Requires XLR interface', 'Learning curve on gain', 'Can be pricey'],
      verdict: '#1 most mentioned on Reddit for streaming',
      bestFor: 'Podcast professionals, broadcasters',
    },
    {
      name: 'Rode NT-USB+ Microphone',
      price: '$169',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/51mi31NUkvL._AC_SL1080_.jpg',
      slug: 'rode-nt-usb-microphone',
      pros: ['Broadcast-quality USB mic', 'Built-in DSP', 'Zero-latency monitoring', 'Included pop filter'],
      cons: ['Picks up background noise', 'No XLR output', 'Software required for settings'],
      verdict: 'Best USB microphone for creators',
      bestFor: 'Podcasters, streamers, content creators',
    },
    {
      name: 'Sony WH-1000XM5',
      price: '$399',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/41J1TZE83dL._AC_SL1000_.jpg',
      slug: 'sony-wh-1000xm5',
      pros: ['Industry-leading noise cancellation', 'Exceptional audio quality', '30-hour battery life', 'Seamless multi-device pairing'],
      cons: ['Premium price point', 'Heavy for travel', 'Can feel restrictive after 8h'],
      verdict: 'Best noise-canceling headphones for creators',
      bestFor: 'Audio professionals, content reviewers',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#111827', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: '#E84C3D', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Best Audio Gear for Video Creators (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Complete guide to microphones, headphones, and audio equipment for podcasters, streamers, and content creators
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Audio tested in real-world conditions • Affiliate reviewed
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
            <li><strong>Best Overall Microphone:</strong> Shure SM7B - Industry-standard dynamic mic used by top podcasters</li>
            <li><strong>Best for Streaming:</strong> Rode NT-USB+ - Broadcast-quality USB microphone with built-in DSP</li>
            <li><strong>Best Monitoring Headphones:</strong> Sony WH-1000XM5 - Exceptional audio quality with noise cancellation</li>
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
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Audio Gear</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Key Strength</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {audioGear.map((gear, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: idx % 2 === 0 ? '#222' : 'transparent',
                }}>
                  <td style={{ padding: '15px' }}>
                    <Link href={`/guides/${gear.slug}`} style={{ color: '#E84C3D', textDecoration: 'none', fontWeight: '600' }}>
                      {gear.name} →
                    </Link>
                  </td>
                  <td style={{ padding: '15px', color: '#E84C3D', fontWeight: 'bold' }}>{gear.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span> {gear.rating}
                  </td>
                  <td style={{ padding: '15px', color: '#6B7280' }}>{gear.verdict}</td>
                  <td style={{ padding: '15px', color: '#6B7280', fontSize: '13px' }}>{gear.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Audio Gear Breakdown</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {audioGear.map((gear, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}>
              <img src={gear.image} alt={gear.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>{gear.name}</h3>
                <p style={{ color: '#E84C3D', fontWeight: 'bold', marginBottom: '15px' }}>{gear.price}</p>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Pros</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {gear.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Cons</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {gear.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/guides/${gear.slug}`} style={{
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
          <h2 style={{ marginTop: 0 }}>The Ultimate Guide to Creator Audio Equipment</h2>
          <p>Professional audio is what separates amateur content from creator-level production. Good audio doesn't just happen—it's the result of choosing the right equipment and understanding how to use it.</p>
          
          <h3>Microphone Types Explained</h3>
          <ul>
            <li><strong>Dynamic Microphones:</strong> Best for podcasts and live streaming. Robust and forgiving of room noise.</li>
            <li><strong>Condenser Microphones:</strong> Capture more detail but require treated room. Better for studio recording.</li>
            <li><strong>USB Microphones:</strong> Convenient plug-and-play solution for beginners and streamers.</li>
          </ul>

          <h3>Audio Gear FAQ</h3>
          <p><strong>Q: Do I really need a professional microphone?</strong><br/>
          A: If audio quality matters to your audience (podcasts, ASMR, music), yes. For gaming or casual content, a USB mic is fine.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#EFF6FF', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Upgrade Your Audio Today</h3>
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
            Browse All Audio Gear
          </Link>
        </div>
      </div>
    </div>
  );
}
