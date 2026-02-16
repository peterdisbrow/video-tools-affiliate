'use client';

import { useState } from 'react';
import Link from 'next/link';
import productsData from '../products.json';

const AFFILIATE_TAG = productsData.affiliateTag;

// Generate Amazon affiliate link
const generateAmazonLink = (asin) => {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
};

const products = productsData.products.map(product => ({
  ...product,
  link: product.asin 
    ? generateAmazonLink(product.asin)
    : product.affiliateLink,
  image: product.image || 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop&q=80'
}));
  { id: 2, name: 'Canon EOS R6 Mark II', category: 'cameras', price: '$2,499', rating: 4.7, link: 'https://www.amazon.com/Canon-Mirrorless-Full-Frame-Compact-Lightweight/dp/B0BNG9554T', image: 'https://www.usa.canon.com/content/dam/internet/us/products/cameras/eos-interchangeable-lens-cameras/mirrorless/eos-r6-mark-ii/documents/canon-eos-r6-mark-ii-camera-body-hero-angle-front-right.jpg', description: 'Blazing-fast 40fps continuous shooting, 6K oversampled 4K video, and Canon\\'s legendary Dual Pixel autofocus. Perfect for run-and-gun creators who need speed and reliability.' },
  { id: 3, name: 'DJI Osmo Pocket 3', category: 'cameras', price: '$749', rating: 4.6, link: 'https://www.amazon.com/DJI-Osmo-Pocket-Stabilization-Handheld/dp/B0C6XMPZ23', image: 'https://image.dji.net/image/upload/v1695496622/product/osmo-pocket-3/osmo-pocket-3-white-background.png', description: 'Ultra-compact gimbal camera with a 1-inch CMOS sensor, 4K/120fps, and a 2-inch rotatable touchscreen. The ultimate vlogging companion that fits in your pocket.' },
  // Audio
  { id: 4, name: 'Rode NT-USB+ Microphone', category: 'audio', price: '$169', rating: 4.7, link: 'https://www.amazon.com/Rode-NT-USB-Condenser-Microphone-Streaming/dp/B09P7X1X39', image: 'https://rode.com/en/microphones/usb-microphones/nt-usb-plus/nt-usb-plus-product-2x-rotated-1200px.jpg', description: 'Studio-quality USB condenser mic with built-in DSP, high-res audio output, and zero-latency monitoring. Plug-and-play excellence for podcasters and streamers.' },
  { id: 5, name: 'Shure SM7B Microphone', category: 'audio', price: '$399', rating: 4.9, link: 'https://www.amazon.com/Shure-SM7B-Cardioid-Dynamic-Microphone/dp/B0002E4Z8M', image: 'https://cdn.shure.com/ad_product_page/media/original_images/sm7b_alt_01_f_w.jpg', description: 'The industry-standard dynamic microphone used by top podcasters and broadcasters worldwide. Exceptional voice isolation, warm tone, and built-in pop filter.' },
  { id: 6, name: 'Audio-Technica AT2020', category: 'audio', price: '$99', rating: 4.7, link: 'https://www.amazon.com/Audio-Technica-AT2020-Cardioid-Condenser-Microphone/dp/B00B87Qkom', image: 'https://www.audio-technica.com/pub/media/catalog/product/cache/404427744563e83d9d91632f808a0221/a/t/at2020_front_angle_angle.jpg', description: 'Best-in-class entry-level condenser mic with a custom-engineered low-mass diaphragm for extended frequency response. Unbeatable quality at this price point.' },
  // Lighting
  { id: 7, name: 'Neewer LED Panel Light', category: 'lighting', price: '$45', rating: 4.5, link: 'https://www.amazon.com/Neewer-Bi-color-Dimmable-Professional-Photography/dp/B07Q7G7JGP', image: 'https://m.media-amazon.com/images/I/61-G9zYkYJL._AC_SL1500_.jpg', description: 'Bi-color dimmable LED panel with 3200K-5600K range and CRI 97+. Budget-friendly lighting that delivers professional results for YouTube and product shoots.' },
  { id: 8, name: 'Aputure Amaran 200d', category: 'lighting', price: '$289', rating: 4.8, link: 'https://www.bhphotovideo.com/c/product/1641666-REG/aputure_amaran_200d_led_light.html', image: 'https://www.bhphotovideo.com/images/images2500x2500/aputure_amaran_200d_led_light_1641666_1667911570_1667911573_1707810235_1641666.jpg', description: 'Professional-grade 200W daylight LED with Bowens mount compatibility. Ultra-quiet fan, app control, and stunning output for studio and on-location work.' },
  { id: 9, name: 'Godox SL60W LED', category: 'lighting', price: '$129', rating: 4.6, link: 'https://www.amazon.com/Godox-SL60W-Bi-Color-Professional-Photography/dp/B08DXHLVWD', image: 'https://godox.com/wp-content/uploads/2022/01/SL60W-1-768x768.jpg', description: 'Reliable 60W continuous LED light with 5600K daylight balance and wireless remote. The workhorse light that thousands of YouTube studios rely on daily.' },
  // Software
  { id: 10, name: 'Adobe Premiere Pro', category: 'software', price: '$54.99/mo', rating: 4.8, link: 'https://www.adobe.com/products/premiere.html', image: 'https://img.creativecow.net/user/103083/tn/premiere_pro_cc_large.jpg', description: 'Industry-standard video editing with AI-powered tools, seamless Creative Cloud integration, and support for virtually every format. The editor professionals choose.' },
  { id: 11, name: 'DaVinci Resolve', category: 'software', price: 'Free/$295', rating: 4.7, link: 'https://www.blackmagicdesign.com/products/davinciresolve/', image: 'https://www.blackmagicdesign.com/products/davinciresolve/images/hero-stage-img.jpg', description: 'Hollywood-grade editing, color grading, VFX, and audio post-production in one app. The free version is shockingly powerful — used on major film productions.' },
  { id: 12, name: 'Final Cut Pro', category: 'software', price: '$299', rating: 4.6, link: 'https://www.apple.com/final-cut-pro/', image: 'https://www.apple.com/v/final-cut-pro/b/images/overview/hero/hero_large_2x_20230912.jpg', description: 'Apple\\'s flagship editor optimized for Mac hardware. Magnetic timeline, blazing-fast rendering on Apple Silicon, and ProRes support make it a creator favorite.' },
  // Streaming
  { id: 13, name: 'Elgato Stream Deck', category: 'streaming', price: '$99', rating: 4.7, link: 'https://www.amazon.com/Elgato-Stream-Deck-Official-Customizable/dp/B06XRNRWZY', image: 'https://cdn.shopify.com/s/files/1/0096/2564/4578/files/StreamDeck_MK2_Black_Front.png?v=1617119642', description: '15 customizable LCD keys for one-touch control of your stream, smart home, and apps. Drag-and-drop setup with thousands of integrations via plugins.' },
  { id: 14, name: 'Rode Wireless GO II', category: 'streaming', price: '$299', rating: 4.8, link: 'https://www.amazon.com/RODE-Wireless-Microphone-System-Content/dp/B08NFQD3LL', image: 'https://rode.com/en/microphones/wireless/wireless-go-ii/wireless-go-ii-product-2x-rotated-1200px.jpg', description: 'Dual-channel wireless mic system with built-in recording, 200m range, and broadcast-grade audio. Clip-on simplicity with professional results for interviews and vlogs.' },
  { id: 15, name: 'Logitech C920 Webcam', category: 'streaming', price: '$69', rating: 4.5, link: 'https://www.amazon.com/Logitech-Widescreen-Calling-Recording-Desktop/dp/B006JH8T3S', image: 'https://www.logitech.com/assets/65987/10/c920-hd-pro-webcam.png', description: 'The webcam that defined the category. Full HD 1080p at 30fps with dual mics and automatic light correction. Reliable, affordable, and universally compatible.' },
  // Accessories
  { id: 16, name: 'Peak Design Travel Tripod', category: 'accessories', price: '$299', rating: 4.8, link: 'https://www.amazon.com/Peak-Design-Travel-Tripod-Aluminum/dp/B00JXCLO1U', image: 'https://images.prismic.io/peakdesign/f0260329-c15d-4f7f-9976-230d2123667f_TravelTripod_Campaign_48.jpg?auto=compress,format&rect=0,0,1920,1920&w=1000&h=1000', description: 'Revolutionary compact tripod that packs down to the size of a water bottle. Premium aluminum build, quick-deploy legs, and a phone mount included. Travel creators love it.' },
  { id: 17, name: 'DJI RS 3 Gimbal', category: 'accessories', price: '$449', rating: 4.6, link: 'https://www.amazon.com/DJI-RS-3-Stabilizer-Lightweight/dp/B0B5YFLWJD', image: 'https://image.dji.net/image/upload/v1652507435/product/rs-3/rs3-white-background-front-view.png', description: 'Lightweight 3-axis gimbal stabilizer with a 1.8\" OLED touchscreen, SuperSmooth mode, and automated axis locks. Buttery-smooth footage for any mirrorless camera.' },
  { id: 18, name: 'Peak Design Capture Clip', category: 'accessories', price: '$29.95', rating: 4.7, link: 'https://www.amazon.com/Peak-Design-Capture-Clip-Camera/dp/B00HWRLWPG', image: 'https://images.prismic.io/peakdesign/e143e14f-5c87-4023-99e9-e20a029ff34d_CaptureClipv3_Campaign_08.jpg?auto=compress,format&rect=0,0,1920,1920&w=1000&h=1000', description: 'Instantly attach your camera to any backpack strap or belt. Arca-Swiss compatible, aircraft-grade aluminum, and a lifesaver for hiking filmmakers and travel creators.' },
];

const categories = [
  { id: 'all', name: 'All Gear' },
  { id: 'cameras', name: '📷 Cameras' },
  { id: 'audio', name: '🎙️ Audio' },
  { id: 'lighting', name: '💡 Lighting' },
  { id: 'software', name: '🖥️ Software' },
  { id: 'streaming', name: '📡 Streaming' },
  { id: 'accessories', name: '🎒 Accessories' },
];

const testimonials = [
  { author: 'Sarah Chen', text: 'This toolkit saved me thousands. Great recommendations!', role: 'YouTube Creator' },
  { author: 'Mark Rivera', text: 'Exactly what I needed to level up my production quality.', role: 'Filmmaker' },
  { author: 'Alex Thompson', text: 'Honest reviews from someone who actually uses this gear.', role: 'Content Creator' },
];

const faqs = [
  { q: 'Are these affiliate links?', a: 'Yes. I earn a small commission when you purchase through these links at no extra cost to you. This helps me keep the recommendations fresh and accurate.' },
  { q: 'Do you actually use this gear?', a: 'I recommend gear based on quality, value, and creator feedback. Links point to trusted retailers like Amazon and B&H Photo.' },
  { q: 'Why these products?', a: 'I focus on tools that offer the best balance of quality, price, and reliability for video creators at all levels.' },
  { q: 'Can I get a discount?', a: 'Some products have sales periodically. Check the retailer directly for current pricing and deals.' },
];

function ProductCard({ product }) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        setShowDesc(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        setShowDesc(false);
      }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <img
          src={product.image}
          alt={product.name}
          loading=\"lazy\"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '9999px',
          fontSize: '0.8rem', fontWeight: '600', color: '#f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>★ {product.rating}</span>
      </div>
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937', margin: '0 0 0.5rem 0' }}>{product.name}</h3>
        <p style={{
          fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '0.75rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: showDesc ? 6 : 2,
          WebkitBoxOrient: 'vertical',
          transition: 'all 0.3s',
          margin: '0 0 0.75rem 0',
          flex: 1,
        }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 'bold', color: '#667eea' }}>{product.price}</span>
        </div>
        <a href={product.link} target=\"_blank\" rel=\"noopener noreferrer\" style={{
          display: 'block', width: '100%', padding: '0.7rem', backgroundColor: '#667eea', color: '#fff',
          textAlign: 'center', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold',
          cursor: 'pointer', transition: 'background-color 0.2s', boxSizing: 'border-box',
        }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6fd6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
        >View & Buy →</a>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Navigation */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href=\"/\" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>🎬 Creator Gear</Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href=\"#tools\" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Tools</a>
            <Link href=\"/blog\" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>Blog</Link>
            <a href=\"#faq\" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500' }}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '5rem 2rem', textAlign: 'center' }}>\n        <div style={{ maxWidth: '800px', margin: '0 auto' }}>\n          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Level Up Your Content: The Ultimate Video Creator&apos;s Toolkit</h1>\n          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95, lineHeight: '1.6' }}>Discover the exact gear and software top creators trust. Handpicked recommendations with affiliate links – your trusted source for smart purchasing decisions.</p>\n          <a href=\"#tools\" style={{ display: 'inline-block', backgroundColor: '#fff', color: '#667eea', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }}>Explore Recommended Gear</a>\n        </div>
      </section>

      {/* Products Section */}
      <section id=\"tools\" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Gear by Category</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>18 handpicked tools across 6 categories</p>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', overflow: 'auto', paddingBottom: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === cat.id ? '#667eea' : '#e5e7eb',
                color: activeCategory === cat.id ? '#fff' : '#374151',
                fontWeight: activeCategory === cat.id ? 'bold' : '500',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
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
                <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: '#374151' }}>&ldquo;{t.text}&rdquo;</p>
                <p style={{ fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{t.author}</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id=\"faq\" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#1f2937', fontWeight: 'bold' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{ width: '100%', padding: '1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{faq.q}</span>
                <span>{expandedFaq === i ? '−' : '+'}</span>
              </button>
              {expandedFaq === i && (
                <div style={{ padding: '0 1rem 1rem', color: '#374151', lineHeight: '1.6' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href=\"/\" style={{ color: '#d1d5db', textDecoration: 'none' }}>Home</Link>
            <Link href=\"/blog\" style={{ color: '#d1d5db', textDecoration: 'none' }}>Blog</Link>
            <a href=\"#tools\" style={{ color: '#d1d5db', textDecoration: 'none' }}>Tools</a>
          </div>
          <p style={{ marginBottom: '0', opacity: 0.8, margin: 0 }}>© 2026 Creator Gear. Affiliate links support this site at no extra cost to you.</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.6, margin: 0 }}>Curated recommendations for video creators, filmmakers, and content professionals.</p>
        </div>
      </footer>
    </div>
  );
}
