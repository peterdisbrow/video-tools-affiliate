'use client';

import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

export default function VideoSoftwareComparison() {
  const software = [
    {
      name: 'Adobe Premiere Pro',
      price: '$54.99/mo (Creative Cloud)',
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/I/41Z6N1MFRDL._AC_SL1000_.jpg',
      slug: 'adobe-premiere-pro',
      pros: ['Industry standard', 'Seamless Adobe integration', 'Advanced color grading', 'Excellent stability'],
      cons: ['Expensive subscription', 'High system requirements', 'Steep learning curve', 'Monthly cost adds up'],
      verdict: 'Industry-standard video editor',
      bestFor: 'Professional editors, studios, serious creators',
    },
    {
      name: 'DaVinci Resolve',
      price: 'Free or $295 (Studio)',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/41-2N8sqnhL._AC_SL1000_.jpg',
      slug: 'davinci-resolve',
      pros: ['Free version is powerful', 'Best color grading', 'No subscription', 'Growing market share'],
      cons: ['Free tier limited', 'Fewer plugins', 'Learning curve', 'Smaller community'],
      verdict: 'Best value for serious editing',
      bestFor: 'Budget-conscious creators, color grading specialists',
    },
    {
      name: 'Final Cut Pro',
      price: '$299.99 (one-time)',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/41-D6CqEA7L._AC_SL1000_.jpg',
      slug: 'final-cut-pro',
      pros: ['Fast performance', 'One-time purchase', 'Excellent for Mac', '4K handling'],
      cons: ['Mac only', 'Smaller plugin library', 'Less industry adoption', 'Learning curve'],
      verdict: 'Best for Mac users',
      bestFor: 'Mac users, documentary creators',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#111827', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: '#2563EB', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Best Video Editing Software (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Honest comparison of video editing software for beginners, creators, and professionals
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Real creator workflows • Pricing transparency
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
            <li><strong>Best Overall:</strong> Adobe Premiere Pro - Industry standard with everything you need</li>
            <li><strong>Best Value:</strong> DaVinci Resolve - Powerful free version with optional $295 Studio edition</li>
            <li><strong>Best for Mac:</strong> Final Cut Pro - One-time $300 purchase with excellent performance</li>
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
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Software</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Platform</th>
                <th style={{ textAlign: 'left', padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {software.map((soft, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #333',
                  backgroundColor: idx % 2 === 0 ? '#222' : 'transparent',
                }}>
                  <td style={{ padding: '15px' }}>
                    <Link href={`/guides/${soft.slug}`} style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '600' }}>
                      {soft.name} →
                    </Link>
                  </td>
                  <td style={{ padding: '15px', color: '#2563EB', fontWeight: 'bold' }}>{soft.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span> {soft.rating}
                  </td>
                  <td style={{ padding: '15px', color: '#6B7280' }}>Windows/Mac/Linux</td>
                  <td style={{ padding: '15px', color: '#6B7280', fontSize: '13px' }}>{soft.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Video Software Breakdown</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {software.map((soft, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E5E7EB',
            }}>
              <div style={{ height: '200px', backgroundColor: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px' }}>💻</span>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px' }}>{soft.name}</h3>
                <p style={{ color: '#2563EB', fontWeight: 'bold', marginBottom: '15px' }}>{soft.price}</p>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Pros</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {soft.pros.map((pro, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Cons</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                    {soft.cons.map((con, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/guides/${soft.slug}`} style={{
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
          <h2 style={{ marginTop: 0 }}>Choosing the Right Video Editing Software</h2>
          <p>The "best" video editing software depends on your workflow, budget, and platform. There's no single answer that works for everyone.</p>
          
          <h3>Key Features Explained</h3>
          <ul>
            <li><strong>Color Grading:</strong> Adjust colors, contrast, and tone to match your style</li>
            <li><strong>Effects & Transitions:</strong> Visual enhancements (though simpler is often better)</li>
            <li><strong>Performance:</strong> How fast your computer can handle 4K editing</li>
            <li><strong>Plugins & Integrations:</strong> Extend functionality with third-party tools</li>
          </ul>

          <h3>Video Software FAQ</h3>
          <p><strong>Q: Is free video editing software good enough?</strong><br/>
          A: Yes! DaVinci Resolve free is incredibly powerful. Most beginners never hit its limitations.</p>
          
          <p><strong>Q: Should I start with Adobe Premiere Pro?</strong><br/>
          A: Not necessarily. Start free or cheap, then upgrade if you outgrow it.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#EFF6FF', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Ready to Start Editing?</h3>
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
            Browse Video Software
          </Link>
        </div>
      </div>
    </div>
  );
}
