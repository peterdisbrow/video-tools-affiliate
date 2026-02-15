'use client';

import { useState } from 'react';

const products = [
  // Cameras
  { id: 1, name: 'Sony Alpha a7 IV', category: 'cameras', price: '$2,498', rating: 4.8, link: 'https://www.bhphotovideo.com/c/product/1670807-REG/sony_ilce7m4b_a7_iv_mirrorless_digital.html', image: 'https://images.unsplash.com/photo-1606933248051-5ce98a3b6e2a?w=500&h=500&fit=crop', description: 'A versatile hybrid camera perfect for content creators, balancing stunning 33MP stills with advanced 4K video capabilities. Its rapid autofocus and robust build make it ideal for both filmmakers and photographers demanding professional reliability.' },
  { id: 2, name: 'Canon EOS R6 Mark II', category: 'cameras', price: '$2,499', rating: 4.7, link: 'https://www.amazon.com/Canon-Mirrorless-Full-Frame-Compact-Lightweight/dp/B0BNG9554T', image: 'https://images.unsplash.com/photo-1606933248051-5ce98a3b6e2a?w=500&h=500&fit=crop', description: 'A powerhouse full-frame mirrorless camera engineered for professional video production and photography. With exceptional low-light performance and impressive autofocus, it\'s the go-to choice for creators tackling demanding projects.' },
  { id: 3, name: 'DJI Osmo Pocket 3', category: 'cameras', price: '$749', rating: 4.6, link: 'https://www.amazon.com/DJI-Osmo-Pocket-Stabilization-Handheld/dp/B0C6XMPZ23', image: 'https://images.unsplash.com/photo-1503994734519-e21cc028cb29?w=500&h=500&fit=crop', description: 'A compact, pocket-sized gimbal camera that delivers cinematic stabilization without the bulk. Perfect for on-the-go creators who need professional-quality footage without carrying heavy equipment.' },
  // Audio
  { id: 4, name: 'Rode NT-USB+ Microphone', category: 'audio', price: '$169', rating: 4.7, link: 'https://www.amazon.com/Rode-NT-USB-Condenser-Microphone-Streaming/dp/B09P7X1X39', image: 'https://images.unsplash.com/photo-1590994614637-72cf2de80e61?w=500&h=500&fit=crop', description: 'A studio-grade USB microphone ideal for streamers, podcasters, and remote creators needing broadcast-quality audio. With built-in presets and intuitive controls, it delivers professional results straight out of the box.' },
  { id: 5, name: 'Shure SM7B Microphone', category: 'audio', price: '$399', rating: 4.9, link: 'https://www.amazon.com/Shure-SM7B-Cardioid-Dynamic-Microphone/dp/B0002E4Z8M', image: 'https://images.unsplash.com/photo-1516321318423-f06f70259b51?w=500&h=500&fit=crop', description: 'The industry standard for professional voice recording and streaming, prized for its clarity and noise rejection. Built to withstand heavy use, it\'s the microphone choice of top creators and sound engineers worldwide.' },
  { id: 6, name: 'Audio-Technica AT2020', category: 'audio', price: '$99', rating: 4.7, link: 'https://www.amazon.com/Audio-Technica-AT2020-Cardioid-Condenser-Microphone/dp/B00B87Qkom', image: 'https://images.unsplash.com/photo-1535085783837-1ac36fca91fb?w=500&h=500&fit=crop', description: 'A budget-friendly condenser mic that delivers studio-quality audio without breaking the bank. Its excellent off-axis rejection and cardioid pattern make it perfect for voice-overs, singing, and instrument recording.' },
  // Lighting
  { id: 7, name: 'Neewer LED Panel Light', category: 'lighting', price: '$45', rating: 4.5, link: 'https://www.amazon.com/Neewer-Bi-color-Dimmable-Professional-Photography/dp/B07Q7G7JGP', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&h=500&fit=crop', description: 'An affordable, powerful LED lighting solution perfect for budget-conscious creators. Its bi-color adjustability and dimming capabilities make it versatile for any setup or shooting condition.' },
  { id: 8, name: 'Aputure MC RGBWW LED', category: 'lighting', price: '$1,295', rating: 4.8, link: 'https://www.bhphotovideo.com/c/product/1641666-REG/aputure_mc_rgbww_light.html', image: 'https://images.unsplash.com/photo-1513821173262-3c7f7ca8d4c5?w=500&h=500&fit=crop', description: 'A premium RGB LED light offering unprecedented creative control and color accuracy for professional productions. Its compact size belies its powerful output, making it essential for filmmakers prioritizing quality lighting.' },
  { id: 9, name: 'Godox SL60W LED', category: 'lighting', price: '$599', rating: 4.6, link: 'https://www.amazon.com/Godox-SL60W-Bi-Color-Professional-Photography/dp/B08DXHLVWD', image: 'https://images.unsplash.com/photo-1513821173262-3c7f7ca8d4c5?w=500&h=500&fit=crop', description: 'A mid-range powerhouse combining high output with color flexibility and smart controls. Ideal for mid-level professionals who need reliable, feature-rich lighting without the premium price tag.' },
  // Software
  { id: 10, name: 'Adobe Premiere Pro', category: 'software', price: '$54.99/mo', rating: 4.8, link: 'https://www.adobe.com/products/premiere.html', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop', description: 'The industry-standard video editing software used by professionals worldwide for film, TV, and digital content. Its seamless integration with Adobe Creative Cloud makes it indispensable for serious creators.' },
  { id: 11, name: 'DaVinci Resolve', category: 'software', price: 'Free/$295', rating: 4.7, link: 'https://www.blackmagicdesign.com/products/davinciresolve/', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop', description: 'A professional-grade editing and color grading platform available free with advanced features in the paid Studio version. Perfect for creators seeking Hollywood-quality post-production without subscription costs.' },
  { id: 12, name: 'Final Cut Pro', category: 'software', price: '$299', rating: 4.6, link: 'https://www.apple.com/final-cut-pro/', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop', description: 'Apple\'s powerful one-time purchase editing software designed for speed and efficiency on Mac systems. With magnetic timeline and optimized performance, it\'s ideal for Mac-based creators handling 4K and 8K projects.' },
  // Streaming
  { id: 13, name: 'Elgato Stream Deck', category: 'streaming', price: '$99', rating: 4.7, link: 'https://www.amazon.com/Elgato-Stream-Deck-Official-Customizable/dp/B06XRNRWZY', image: 'https://images.unsplash.com/photo-1587829191301-4b68341245cb?w=500&h=500&fit=crop', description: 'A customizable control panel that streamlines production workflow with programmable buttons and intuitive software. Essential for streamers and content creators managing complex multistreaming setups with ease.' },
  { id: 14, name: 'Rode Wireless GO II', category: 'streaming', price: '$299', rating: 4.8, link: 'https://www.amazon.com/RODE-Wireless-Microphone-System-Content/dp/B08NFQD3LL', image: 'https://images.unsplash.com/photo-1590994614637-72cf2de80e61?w=500&h=500&fit=crop', description: 'A wireless lavalier system delivering pristine audio without tangled cables, perfect for interviews and on-the-move recording. Its dual-channel capability and built-in recording offer unmatched reliability for professional content.' },
  { id: 15, name: 'Logitech C920 Webcam', category: 'streaming', price: '$69', rating: 4.5, link: 'https://www.amazon.com/Logitech-Widescreen-Calling-Recording-Desktop/dp/B006JH8T3S', image: 'https://images.unsplash.com/photo-1577720643272-265ae5d55f39?w=500&h=500&fit=crop', description: 'A reliable, affordable USB webcam that punches above its price point with sharp 1080p footage and excellent autofocus. Great for streamers, remote meetings, and anyone needing a dependable camera solution.' },
  // Accessories
  { id: 16, name: 'Peak Design Travel Tripod', category: 'accessories', price: '$299', rating: 4.8, link: 'https://www.amazon.com/Peak-Design-Travel-Tripod-Aluminum/dp/B00JXCLO1U', image: 'https://images.unsplash.com/photo-1615253533624-44ce63c6edbf?w=500&h=500&fit=crop', description: 'An ultra-compact, ultra-sturdy tripod engineered for travel and location shooting without sacrificing stability. Its innovative design packs small but extends to full height, making it perfect for mobile creators.' },
  { id: 17, name: 'Manfrotto Nitrotech Gimbal', category: 'accessories', price: '$699', rating: 4.6, link: 'https://www.bhphotovideo.com/c/product/1539968-REG/manfrotto_mvg220ff_nitrotech_600_follow_focus.html', image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=500&h=500&fit=crop', description: 'A professional 3-axis gimbal with counterbalance technology for smooth, cinematic camera movement. Built for cinema cameras, it delivers fluid motion control essential for high-end production work.' },
  { id: 18, name: 'Peak Design Capture Clip', category: 'accessories', price: '$29.95', rating: 4.7, link: 'https://www.amazon.com/Peak-Design-Capture-Clip-Camera/dp/B00HWRLWPG', image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop', description: 'A minimalist camera carry solution that mounts securely to any strap or belt, keeping your camera accessible and ready. The universal plate system works with virtually any camera, making it a travel essential.' },
];

const categories = [
  { id: 'all', name: 'All Gear' },
  { id: 'cameras', name: 'Cameras' },
  { id: 'audio', name: 'Audio' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'software', name: 'Software' },
  { id: 'streaming', name: 'Streaming' },
  { id: 'accessories', name: 'Accessories' },
];

const testimonials = [
  { author: 'Sarah Chen', text: '"This toolkit saved me thousands. Great recommendations!"', role: 'YouTube Creator' },
  { author: 'Mark Rivera', text: '"Exactly what I needed to level up my production quality."', role: 'Filmmaker' },
  { author: 'Alex Thompson', text: '"Honest reviews from someone who actually uses this gear."', role: 'Content Creator' },
];

const faqs = [
  { q: 'Are these affiliate links?', a: 'Yes. I earn a small commission when you purchase through these links at no extra cost to you. This helps me keep the recommendations fresh and accurate.' },
  { q: 'Do you actually use this gear?', a: 'I recommend gear based on quality, value, and creator feedback. Links point to trusted retailers like Amazon and B&H Photo.' },
  { q: 'Why these products?', a: 'I focus on tools that offer the best balance of quality, price, and reliability for video creators at all levels.' },
  { q: 'Can I get a discount?', a: 'Some products have sales periodically. Check the retailer directly for current pricing and deals.' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>🎬 Creator Gear</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#tools" style={{ color: '#6b7280', textDecoration: 'none' }}>Tools</a>
            <a href="/blog" style={{ color: '#6b7280', textDecoration: 'none' }}>Blog</a>
            <a href="#faq" style={{ color: '#6b7280', textDecoration: 'none' }}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Level Up Your Content: The Ultimate Video Creator's Toolkit</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>Discover the exact gear and software top creators trust. Handpicked recommendations with affiliate links – your trusted source for smart purchasing decisions.</p>
          <a href="#tools" style={{ display: 'inline-block', backgroundColor: '#fff', color: '#667eea', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Explore Recommended Gear</a>
        </div>
      </section>

      {/* Products Section */}
      <section id="tools" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Gear by Category</h2>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflow: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.id ? '#667eea' : '#e5e7eb',
                color: activeCategory === cat.id ? '#fff' : '#374151',
                fontWeight: activeCategory === cat.id ? 'bold' : 'normal',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={product.image} alt={product.name} style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>{product.price}</span>
                <span style={{ color: '#f59e0b' }}>★ {product.rating}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', lineHeight: '1.4' }}>{product.description}</p>
              <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', padding: '0.75rem', backgroundColor: '#667eea', color: '#fff', textAlign: 'center', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto' }}>View & Buy</a>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ backgroundColor: '#fff', padding: '3rem 2rem', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Trusted by Creators Worldwide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', borderLeft: '4px solid #667eea' }}>
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#374151' }}>"{t.text}"</p>
                <p style={{ fontWeight: 'bold', color: '#1f2937' }}>{t.author}</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  fontSize: '1rem'
                }}
              >
                {faq.q} {expandedFaq === i ? '−' : '+'}
              </button>
              {expandedFaq === i && (
                <div style={{ padding: '0 1rem 1rem', color: '#374151' }}>
                  {faq.a}
                </div>
              )}
            </div>
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
