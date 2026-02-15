'use client';

import Link from 'next/link';

const blogPosts = [
  {
    slug: 'best-cameras-for-youtube',
    title: 'Best Cameras for YouTube Videos in 2026',
    excerpt: 'Find the perfect YouTube camera with our comprehensive guide. We review top budget, mid-range, and professional cameras for every creator level.',
    date: '2026-02-16',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800&h=400&fit=crop'
  },
  {
    slug: 'pro-audio-budget',
    title: 'Pro Audio on a Budget: Getting Studio Quality Sound',
    excerpt: 'Learn how to achieve professional-grade audio without spending thousands. Our guide covers microphones, interfaces, and techniques for clean recordings.',
    date: '2026-02-14',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516721318423-f06f70259b51?w=800&h=400&fit=crop'
  },
  {
    slug: 'video-lighting-101',
    title: 'Video Lighting 101: Essential Techniques for Creators',
    excerpt: 'Master the fundamentals of video lighting. From three-point setups to color temperature, learn how proper lighting transforms your content quality.',
    date: '2026-02-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=400&fit=crop'
  },
  {
    slug: 'free-vs-paid-editing',
    title: 'Free vs Paid Video Editing Software: Complete Comparison',
    excerpt: 'Compare the best free and paid editing platforms available today. Discover which tool matches your skill level and production needs.',
    date: '2026-02-10',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop'
  },
  {
    slug: 'streaming-gear-essentials',
    title: 'Streaming Gear Essentials: Everything You Need to Go Live',
    excerpt: 'Build your streaming setup from the ground up. We cover cameras, audio, lighting, and software to help you broadcast like a pro.',
    date: '2026-02-08',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1587829191301-4b68341245cb?w=800&h=400&fit=crop'
  }
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/#tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools</Link>
            <Link href="/blog" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>Blog</Link>
            <Link href="/#faq" style={{ color: '#6b7280', textDecoration: 'none' }}>FAQ</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#667eea', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Latest Creator Guides</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>Expert tips, gear reviews, and production techniques to level up your content creation game.</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
              <article style={{ backgroundColor: '#fff', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>{post.date} • {post.readTime}</p>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>{post.title}</h2>
                  <p style={{ color: '#374151', lineHeight: '1.5' }}>{post.excerpt}</p>
                  <div style={{ marginTop: '1rem', color: '#667eea', fontWeight: 'bold' }}>Read More →</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>© 2026 Creator Gear. Affiliate links support this site at no extra cost to you.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Curated recommendations for video creators, filmmakers, and content professionals.</p>
      </footer>
    </div>
  );
}
