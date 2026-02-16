'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const blogData = {
  'best-cameras-for-youtube': {
    title: 'Best Cameras for YouTube Videos in 2026',
    date: '2026-02-16',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=1200&h=600&fit=crop',
    content: `<h2>Introduction</h2>
<p>Creating quality YouTube videos starts with the right camera. Whether you're just starting out or scaling up your production, choosing the right camera can make or break your channel's success.</p>
<h2>Budget Cameras: Starting Your YouTube Journey ($300-$800)</h2>
<p>You don't need to spend thousands to create engaging YouTube content. The DJI Osmo Pocket 3 ($749) is a game-changer for budget creators.</p>
<h2>Mid-Range Cameras: Serious Creators ($1,000-$2,500)</h2>
<p>When you're ready to invest more, mid-range cameras unlock professional features without pro-level budgets.</p>`,
    relatedProducts: [
      { name: 'Sony Alpha a7 IV', link: 'https://www.bhphotovideo.com/c/product/1670807-REG/sony_ilce7m4b_a7_iv_mirrorless_digital.html' },
      { name: 'Canon EOS R6 Mark II', link: 'https://www.amazon.com/Canon-Mirrorless-Full-Frame-Compact-Lightweight/dp/B0BNG9554T' },
      { name: 'DJI Osmo Pocket 3', link: 'https://www.amazon.com/DJI-Osmo-Pocket-Stabilization-Handheld/dp/B0C6XMPZ23' },
      { name: 'Peak Design Travel Tripod', link: 'https://www.amazon.com/Peak-Design-Travel-Tripod-Aluminum/dp/B00JXCLO1U' }
    ]
  },
  'pro-audio-budget': {
    title: 'Pro Audio on a Budget: Getting Studio Quality Sound',
    date: '2026-02-14',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516721318423-f06f70259b51?w=1200&h=600&fit=crop',
    content: `<h2>Why Audio Matters</h2>
<p>Viewers will forgive mediocre video quality if your audio is excellent. But they'll abandon your content immediately if the audio is bad.</p>`,
    relatedProducts: [
      { name: 'Rode NT-USB+ Microphone', link: 'https://www.amazon.com/Rode-NT-USB-Condenser-Microphone-Streaming/dp/B09P7X1X39' },
      { name: 'Shure SM7B Microphone', link: 'https://www.amazon.com/Shure-SM7B-Cardioid-Dynamic-Microphone/dp/B0002E4Z8M' }
    ]
  },
  'video-lighting-101': {
    title: 'Video Lighting 101: Essential Techniques for Creators',
    date: '2026-02-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=600&fit=crop',
    content: `<h2>Lighting is Photography</h2>
<p>Professional video starts with professional lighting. Even a smartphone camera with great lighting will outproduce an expensive cinema camera in a dark room.</p>`,
    relatedProducts: [
      { name: 'Neewer LED Panel Light', link: 'https://www.amazon.com/Neewer-Bi-color-Dimmable-Professional-Photography/dp/B07Q7G7JGP' },
      { name: 'Godox SL60W LED', link: 'https://www.amazon.com/Godox-SL60W-Bi-Color-Professional-Photography/dp/B08DXHLVWD' }
    ]
  },
  'free-vs-paid-editing': {
    title: 'Free vs Paid Video Editing Software: Complete Comparison',
    date: '2026-02-10',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: `<h2>The Software Debate</h2>
<p>Video editing software ranges from free open-source tools to professional suites costing $10k+. Where should you start?</p>`,
    relatedProducts: [
      { name: 'Adobe Premiere Pro', link: 'https://www.adobe.com/products/premiere.html' },
      { name: 'DaVinci Resolve', link: 'https://www.blackmagicdesign.com/products/davinciresolve/' },
      { name: 'Final Cut Pro', link: 'https://www.apple.com/final-cut-pro/' }
    ]
  },
  'streaming-gear-essentials': {
    title: 'Streaming Gear Essentials: Everything You Need to Go Live',
    date: '2026-02-08',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1587829191301-4b68341245cb?w=1200&h=600&fit=crop',
    content: `<h2>Building Your First Streaming Setup</h2>
<p>Live streaming has never been more accessible. With the right gear, you can broadcast professional-quality streams from your home.</p>`,
    relatedProducts: [
      { name: 'Elgato Stream Deck', link: 'https://www.amazon.com/Elgato-Stream-Deck-Official-Customizable/dp/B06XRNRWZY' },
      { name: 'Rode Wireless GO II', link: 'https://www.amazon.com/RODE-Wireless-Microphone-System-Content/dp/B08NFQD3LL' },
      { name: 'Logitech C920 Webcam', link: 'https://www.amazon.com/Logitech-Widescreen-Calling-Recording-Desktop/dp/B006JH8T3S' }
    ]
  }
};

const otherPosts = [
  { slug: 'pro-audio-budget', title: 'Pro Audio on a Budget' },
  { slug: 'video-lighting-101', title: 'Video Lighting 101' },
  { slug: 'free-vs-paid-editing', title: 'Free vs Paid Editing' },
  { slug: 'streaming-gear-essentials', title: 'Streaming Gear Essentials' },
  { slug: 'best-cameras-for-youtube', title: 'Best Cameras for YouTube' }
];

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = blogData[slug];

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
        <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Post Not Found</h1>
          <Link href="/blog" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedOtherPosts = otherPosts.filter(p => p.slug !== slug);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/#tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools</Link>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
            <Link href="/#faq" style={{ color: '#6b7280', textDecoration: 'none' }}>FAQ</Link>
          </div>
        </div>
      </nav>

      {/* Featured Image */}
      <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Post Header */}
        <header style={{ marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', color: '#6b7280', fontSize: '0.95rem' }}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Content */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151', marginBottom: '3rem' }}>
          <style>{`
            article h2 { font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; color: #1f2937; }
            article p { margin-bottom: 1rem; }
            article ul, article ol { margin-left: 1.5rem; margin-bottom: 1rem; }
            article li { margin-bottom: 0.5rem; }
            article a { color: #667eea; text-decoration: none; font-weight: 500; }
            article a:hover { text-decoration: underline; }
            article strong { font-weight: 600; }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related Products Sidebar */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <section style={{ backgroundColor: '#f0f4ff', padding: '2rem', borderRadius: '0.75rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Products Mentioned in This Post</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {post.relatedProducts.map((product, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
                    {product.name} →
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Continue Reading */}
        <section style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.75rem', borderTop: '2px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Continue Reading</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {relatedOtherPosts.map((relPost, i) => (
              <Link key={i} href={`/blog/${relPost.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', transition: 'background-color 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f4ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}>
                  <p style={{ fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>{relPost.title}</p>
                  <span style={{ color: '#667eea', fontSize: '0.9rem' }}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>© 2026 Creator Gear. Affiliate links support this site at no extra cost to you.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Curated recommendations for video creators, filmmakers, and content professionals.</p>
      </footer>
    </div>
  );
}
