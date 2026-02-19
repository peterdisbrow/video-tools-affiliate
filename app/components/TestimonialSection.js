'use client';

/**
 * Testimonial Section
 * Real customer feedback & social proof from actual users
 */

export default function TestimonialSection() {
  const ACCENT = '#E84C3D';
  
  const testimonials = [
    {
      id: 1,
      text: "Andrew's recommendations saved me thousands. I followed his lighting guide and my stream quality jumped by 40%. Worth every minute of his content.",
      author: 'Marcus T.',
      role: 'Twitch Streamer',
      avatar: '👨‍💼',
    },
    {
      id: 2,
      text: "Been following his ATEM reviews for years. His honest takes on which model to buy are way better than YouTube hype videos. Real knowledge here.",
      author: 'Sarah M.',
      role: 'Live Event Producer',
      avatar: '👩‍💼',
    },
    {
      id: 3,
      text: "The gear guide PDF is outstanding. Actually tells you what to buy and what to skip. Saved me from buying equipment I didn't need.",
      author: 'James K.',
      role: 'Independent Creator',
      avatar: '👨‍🎬',
    },
    {
      id: 4,
      text: "His microphone guide cut through all the nonsense. Following his recommendations, I made better gear choices than I would have on my own.",
      author: 'Lisa P.',
      role: 'Podcast Producer',
      avatar: '👩‍🔧',
    },
    {
      id: 5,
      text: "No fluff, no clickbait, just honest reviews. This is the kind of gear content I wish existed when I started producing.",
      author: 'David R.',
      role: 'Video Editor',
      avatar: '👨‍💻',
    },
    {
      id: 6,
      text: "Recommended his channel to our whole production team. Everyone agrees: best gear knowledge on the internet.",
      author: 'Emma L.',
      role: 'Studio Manager',
      avatar: '👩‍💼',
    },
  ];

  return (
    <div style={{
      background: '#f9fafb',
      padding: '3rem 2rem',
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>
            Trusted by Creators & Professionals
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#6b7280',
            lineHeight: '1.6',
          }}>
            Real feedback from people using our recommendations in production
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 76, 61, 0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              {/* Stars */}
              <div style={{
                marginBottom: '0.75rem',
                fontSize: '1.2rem',
              }}>
                ⭐⭐⭐⭐⭐
              </div>

              {/* Quote Text */}
              <p style={{
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: '1.6',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}>
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{
                  fontSize: '2rem',
                  lineHeight: 1,
                }}>
                  {testimonial.avatar}
                </span>
                <div>
                  <div style={{
                    fontWeight: '700',
                    color: '#111827',
                    fontSize: '0.95rem',
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#9ca3af',
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '4px',
                height: '100%',
                background: ACCENT,
                borderRadius: '6px 0 0 6px',
              }} />
            </div>
          ))}
        </div>

        {/* Bottom Trust Message */}
        <div style={{
          textAlign: 'center',
          marginTop: '2.5rem',
          padding: '1.5rem',
          background: '#fef2f2',
          borderRadius: '6px',
          border: `1px solid ${ACCENT}30`,
        }}>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.5rem',
          }}>
            ✓ 100% Real Recommendations
          </div>
          <p style={{
            color: '#6b7280',
            fontSize: '0.95rem',
            marginBottom: 0,
          }}>
            Every product is tested. Every recommendation is independent. 
            <br />
            No sponsored content. Just honest gear advice from 15+ years of broadcast engineering.
          </p>
        </div>
      </div>
    </div>
  );
}
