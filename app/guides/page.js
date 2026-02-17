'use client';

import Link from 'next/link';
import { blogPosts } from './blogData';

export default function GuidesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/#tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools</Link>
            <Link href="/guides" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>Guides</Link>
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

      {/* Guides Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {blogPosts.map((post) => (
            <Link href={`/guides/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
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
