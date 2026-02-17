'use client';

import Link from 'next/link';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';

export default function StreamingSetupsComparison() {
  const setups = [
    {
      name: 'Premium Studio Setup',
      price: '$4,200+',
      rating: 4.9,
      description: 'Full-featured streaming setup with professional audio and lighting',
      components: ['Sony Alpha a7 IV', 'Shure SM7B', 'Nanlite Pavo 15X RGB', 'Elgato Stream Deck'],
      pros: ['Hollywood-level production quality', 'Handles any type of stream', 'Expandable and upgradeable', 'Professional presence'],
      cons: ['Highest price point', 'Steep learning curve', 'Requires space', 'Complex setup'],
      bestFor: 'Professional streamers, gaming channels with 10k+ viewers',
    },
    {
      name: 'Enthusiast Creator Setup',
      price: '$1,500-2,000',
      rating: 4.7,
      description: 'Balanced setup for serious content creators',
      components: ['DJI Osmo Pocket 3', 'Rode NT-USB+', 'Elgato Key Light Air', 'Basic green screen'],
      pros: ['Great production quality', 'Reasonable investment', 'Handles 1080p/4K streaming', 'Good equipment mix'],
      cons: ['Mid-range price', 'Still requires learning', 'May need upgrades later'],
      bestFor: 'YouTube streamers, Twitch partners with 5k-10k viewers',
    },
    {
      name: 'Budget Starter Setup',
      price: '$400-600',
      rating: 4.3,
      description: 'Affordable entry point for new streamers',
      components: ['Smartphone', 'USB microphone', 'Clip light', 'Ring light'],
      pros: ['Most affordable option', 'Easy to learn', 'Quick to set up', 'Good for testing'],
      cons: ['Lower production quality', 'Limited streaming options', 'May need upgrades', 'Smartphone dependency'],
      bestFor: 'Casual streamers, hobby content creators',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#111827', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px', background: '#E84C3D', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Complete Streaming Setups Guide (2026)
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '10px', maxWidth: '600px', margin: '15px auto' }}>
            Pre-built streaming configurations for every budget and use case
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Updated Today • Real creator setups • Budget breakdowns included
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
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#E84C3D' }}>Which Setup Should You Choose?</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Starting Out?</strong> Budget Starter Setup - Test the waters with minimal investment</li>
            <li><strong>Serious About Growth?</strong> Enthusiast Creator Setup - Balance of quality and value</li>
            <li><strong>Going Professional?</strong> Premium Studio Setup - No compromises on production quality</li>
          </ul>
        </div>

        {/* Setup Cards */}
        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Recommended Setups by Budget</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {setups.map((setup, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid ' + (idx === 0 ? '#E84C3D' : '#333'),
              position: 'relative',
            }}>
              {idx === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#E84C3D',
                  color: '#111827',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 10,
                }}>
                  RECOMMENDED
                </div>
              )}

              <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
                <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '20px', color: '#E84C3D' }}>{setup.name}</h3>
                <p style={{ marginTop: 0, marginBottom: '10px', color: '#6B7280' }}>{setup.description}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#E84C3D', margin: '10px 0' }}>{setup.price}</p>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Rating: <span style={{ color: '#F59E0B' }}>★</span> {setup.rating}</p>
              </div>

              <div style={{ padding: '20px' }}>
                <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginTop: 0, marginBottom: '10px' }}>📦 What's Included</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280', marginBottom: '15px' }}>
                  {setup.components.map((comp, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{comp}</li>
                  ))}
                </ul>

                <h4 style={{ color: '#059669', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>✅ Advantages</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280', marginBottom: '15px' }}>
                  {setup.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                  ))}
                </ul>

                <h4 style={{ color: '#dc2626', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>⚠️ Considerations</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280' }}>
                  {setup.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                  ))}
                </ul>

                <p style={{ fontSize: '12px', color: '#666', marginTop: '15px', marginBottom: 0 }}>
                  Best for: <strong>{setup.bestFor}</strong>
                </p>
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
          <h2 style={{ marginTop: 0 }}>How to Build Your Perfect Streaming Setup</h2>
          <p>The best streaming setup isn't the most expensive one—it's the one that fits your budget, space, and goals. Start simple, test your content, then upgrade strategically.</p>
          
          <h3>Key Components Explained</h3>
          <ul>
            <li><strong>Camera:</strong> Mirrorless cameras give professional output. Smartphones work for casual streaming.</li>
            <li><strong>Microphone:</strong> Audio quality matters more than video quality for most audiences.</li>
            <li><strong>Lighting:</strong> Proper lighting instantly makes your stream look 10x more professional.</li>
            <li><strong>Encoder:</strong> Use OBS (free) or Streamlabs OBS for broadcasting to Twitch/YouTube.</li>
          </ul>

          <h3>Streaming Setup FAQ</h3>
          <p><strong>Q: Can I stream with just a smartphone?</strong><br/>
          A: Yes! Millions do. Smartphone cameras are solid for 1080p streaming if you have good lighting.</p>
          
          <p><strong>Q: How important is lighting?</strong><br/>
          A: Critical. Bad lighting is the #1 reason streams look amateur. Invest in lighting early.</p>
          
          <p><strong>Q: Should I go all-in on gear at first?</strong><br/>
          A: No. Start with a budget setup, validate your content, then upgrade based on what you need.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#EFF6FF', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Build Your Streaming Setup Now</h3>
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
            Shop All Streaming Gear
          </Link>
        </div>
      </div>
    </div>
  );
}
