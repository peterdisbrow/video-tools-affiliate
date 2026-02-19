'use client';

/**
 * Why Buy Through Us - Comparison
 * Shows advantages vs direct Amazon/B&H shopping
 */

export default function WhyBuyThrough() {
  const ACCENT = '#E84C3D';
  
  const comparison = [
    {
      feature: 'Expert Curation',
      ours: 'Personally tested & recommended by broadcast engineer',
      amazon: 'Browse thousands of options yourself',
      bhPhoto: 'Same',
      icon: '✓',
    },
    {
      feature: 'Honest Reviews',
      ours: 'Independent reviews based on real usage',
      amazon: 'Mix of real & fake reviews, lots of hype',
      bhPhoto: 'Professional but no personal perspective',
      icon: '⭐',
    },
    {
      feature: 'Buying Guides',
      ours: 'Detailed guides for each category (lighting, audio, etc.)',
      amazon: 'No official guides',
      bhPhoto: 'Some guides, but limited',
      icon: '📖',
    },
    {
      feature: 'Price Tracking',
      ours: 'See price drops & best timing to buy',
      amazon: 'Price history available but scattered',
      bhPhoto: 'Price history available but scattered',
      icon: '📉',
    },
    {
      feature: 'One-Stop Comparison',
      ours: 'All 68 reviewed products in one place',
      amazon: 'Search across thousands of items',
      bhPhoto: 'Limited selection vs Amazon',
      icon: '🔍',
    },
    {
      feature: 'Free Gear Guide',
      ours: 'Get a curated gear checklist & budget planner',
      amazon: 'No equivalent',
      bhPhoto: 'No equivalent',
      icon: '🎁',
    },
    {
      feature: 'Video Tutorials',
      ours: 'Learn how to actually use your gear right',
      amazon: 'Some product videos but inconsistent',
      bhPhoto: 'Some educational content',
      icon: '🎥',
    },
    {
      feature: 'Same Price',
      ours: 'Same prices as direct links — no markup',
      amazon: 'Direct pricing',
      bhPhoto: 'Direct pricing',
      icon: '💰',
    },
  ];

  return (
    <div style={{
      background: '#fff',
      padding: '3rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Urgency Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}15 0%, ${ACCENT}08 100%)`,
          border: `2px solid ${ACCENT}`,
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            color: ACCENT,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}>
            💡 Smart Buyers Know This
          </div>
          <p style={{
            fontSize: '1.1rem',
            color: '#111827',
            margin: 0,
            fontWeight: '600',
          }}>
            Same prices as Amazon & B&H. Better decisions with our 15-year expert guidance.
          </p>
        </div>

        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>
            Why Professionals Shop With Us
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#6b7280',
            lineHeight: '1.6',
          }}>
            The advantages of expert curation over generic shopping
          </p>
        </div>

        {/* Comparison Table */}
        <div style={{
          overflowX: 'auto',
          borderRadius: '8px',
          border: `1px solid #e5e7eb`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}>
            <thead>
              <tr style={{ background: '#f3f4f6', borderBottom: `2px solid #e5e7eb` }}>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '800',
                  color: '#111827',
                  borderRight: '1px solid #e5e7eb',
                }}>Feature</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '700',
                  color: '#fff',
                  background: ACCENT,
                  fontStyle: 'italic',
                }}>Gear Guide (Us)</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                }}>Amazon</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                }}>B&H Photo</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #e5e7eb',
                  background: idx % 2 === 0 ? '#fff' : '#f9fafb',
                }}>
                  <td style={{
                    padding: '1rem',
                    fontWeight: '700',
                    color: '#111827',
                    borderRight: '1px solid #e5e7eb',
                  }}>
                    <span style={{ marginRight: '0.5rem' }}>{row.icon}</span>
                    {row.feature}
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: '#047857',
                    fontWeight: '600',
                    background: `${ACCENT}08`,
                  }}>
                    <span style={{ fontWeight: '700' }}>✓</span> {row.ours}
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: '#6b7280',
                  }}>
                    {row.amazon}
                  </td>
                  <td style={{
                    padding: '1rem',
                    color: '#6b7280',
                  }}>
                    {row.bhPhoto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA Section */}
        <div style={{
          marginTop: '2.5rem',
          padding: '2rem',
          background: `linear-gradient(135deg, ${ACCENT}08 0%, ${ACCENT}04 100%)`,
          borderRadius: '8px',
          border: `2px solid ${ACCENT}20`,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '0.75rem',
          }}>
            Ready to Find Your Gear?
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
          }}>
            Browse our curated selection of 68+ products, all tested and recommended. 
            Same prices as buying direct—with the benefit of expert guidance.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a href="/gear" style={{
              display: 'inline-block',
              background: ACCENT,
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'background 0.2s',
              border: `2px solid ${ACCENT}`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d63a2f'}
            onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
              See All Gear
            </a>
            <a href="/free-gear-guide" style={{
              display: 'inline-block',
              background: '#fff',
              color: ACCENT,
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              border: `2px solid ${ACCENT}`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${ACCENT}10`}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              Get Free Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
