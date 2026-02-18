'use client';

import { useState } from 'react';
import Link from 'next/link';
import productsData from '../../products.json';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { getRelatedForProduct } from '../data/relatedProducts';

const ACCENT = '#E84C3D';
const TAG = productsData.affiliateTag || 'disbrowproduc-20';
const amz = (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

// Find a product by partial name match
function findProduct(query) {
  const q = query.toLowerCase();
  return productsData.products.find(p =>
    p.name.toLowerCase().includes(q) || q.includes(p.name.toLowerCase())
  );
}

// Build a product entry — from products.json or fallback to search URL
function makeProduct(name, whyText, searchQuery) {
  const found = findProduct(searchQuery || name);
  if (found) {
    return {
      name: found.name,
      why: whyText,
      price: found.price,
      image: found.image,
      href: found.affiliateLink || (found.asin ? `https://www.amazon.com/dp/${found.asin}?tag=${TAG}` : amz(name)),
      productName: found.name,
    };
  }
  return {
    name,
    why: whyText,
    price: null,
    image: null,
    href: amz(searchQuery || name),
    productName: name,
  };
}

const USE_CASES = [
  { id: 'youtube', icon: '🎥', title: 'YouTube / Creator Studio', desc: 'Solo creator. At-home setup. Looks professional on camera.' },
  { id: 'church', icon: '⛪', title: 'Church Live Production', desc: 'Streaming Sunday services. ATEM-based. Multi-camera.' },
  { id: 'podcast', icon: '🎙️', title: 'Podcast & Audio', desc: 'Voice-first setup. Microphone, interface, acoustic treatment.' },
  { id: 'rungun', icon: '🏃', title: 'Run & Gun / Events', desc: 'Moving. Fast. One operator. Gimbal required.' },
  { id: 'budget', icon: '🏠', title: 'Home Studio on a Budget', desc: 'Under $1,500 total. Everything you actually need.' },
  { id: 'livestream', icon: '📡', title: 'Live Streaming Setup', desc: 'OBS or hardware encoder. Going live to YouTube/Facebook.' },
];

const KITS = {
  youtube: {
    intro: "For a YouTube studio, I start with a camera that handles both 4K and great autofocus, one solid key light with a softbox, and a mic that makes you sound like you know what you're doing. This is the exact setup I'd build today.",
    blogLink: { slug: 'why-your-lighting-looks-bad', label: 'Read: Why Your Lighting Looks Bad →' },
    products: [
      makeProduct('Sony Alpha a7 IV', "The hybrid workhorse. 4K60, incredible autofocus, and it handles photos too. This is the camera I'd buy if I were starting a channel today.", 'sony a7 iv'),
      makeProduct('Amaran 60d S', "Enough output for a desk setup, Bowens mount for a real softbox, and the CRI is above 95. One light, done right, beats four cheap panels.", 'amaran 60d'),
      makeProduct('Shure SM7B', "There's a reason every podcast studio and YouTube set has one. It rejects room noise, sounds warm, and makes bad rooms sound decent.", 'shure sm7b'),
      makeProduct('Focusrite Scarlett 2i2', "Clean preamps, enough gain for the SM7B without a CloudLifter, and it just works. Plug in and record.", 'focusrite scarlett 2i2'),
    ],
  },
  church: {
    intro: "For church production, I always start with the switcher. Get the ATEM right, then build cameras and audio around it. Every church I've built in the last five years follows this pattern.",
    blogLink: { slug: 'which-atem-mini-should-you-buy', label: 'Read: Which ATEM Mini Should You Buy? →' },
    products: [
      makeProduct('ATEM Mini Pro ISO', "Always get the ISO version. Records every camera separately so you can re-edit the sermon later. The Pro gives you multiview — you can't switch what you can't see.", 'atem mini pro iso'),
      makeProduct('Sony a6700', "Compact, incredible autofocus, 4K oversampled. I use these as camera 1 and 2 in most church builds. Affordable enough to buy two.", 'sony a6700'),
      makeProduct('Amaran 60d S', "Stage lighting supplement that won't blow the budget. High CRI means skin tones look right on camera, not green.", 'amaran 60d'),
      makeProduct('Rode Wireless GO II', "Clip it on the pastor, forget about it. Dual-channel so you can mic two people. Built-in recording as backup.", 'rode wireless go ii'),
      makeProduct('Elgato Stream Deck', "Run it with Bitfocus Companion and your volunteers can operate the entire production from one panel. One button, one action, no mistakes.", 'elgato stream deck'),
    ],
  },
  podcast: {
    intro: "Podcasting is voice-first. Get the mic and interface right — everything else is secondary. I've heard $50,000 studios that sound worse than a treated closet with good gear.",
    blogLink: { slug: 'shure-sm7b-the-truth-about-gain', label: 'Read: Shure SM7B — The Truth About Gain →' },
    products: [
      makeProduct('Shure SM7B', "The standard. Dynamic, so it rejects your room noise. Warm, present, and forgiving of bad technique. Every serious podcast uses one for a reason.", 'shure sm7b'),
      makeProduct('Focusrite Scarlett 2i2', "Clean, reliable, enough gain for the SM7B. The 4th gen fixed the preamp issue older models had. Just works.", 'focusrite scarlett 2i2'),
      makeProduct('Rode PSA1+ Boom Arm', "Smooth movement, solid clamp, internal cable routing. The boom arm you buy once.", 'rode psa1+'),
      makeProduct('Acoustic Foam Panels', "Treat your first reflection points and you'll hear the difference immediately. Cheaper than buying a better mic.", 'acoustic foam panels 12 pack studio'),
    ],
  },
  rungun: {
    intro: "Run and gun means one operator, moving fast, no second chances. Every piece of gear needs to be light, fast to set up, and reliable when you can't do a second take.",
    blogLink: null,
    products: [
      makeProduct('Sony FX30', "APS-C cinema camera with an XLR handle option. S-Cinetone out of the box, internal ND would be nice but the image quality makes up for it.", 'sony fx30'),
      makeProduct('DJI RS 4 Pro', "Smooth, fast to balance, and the LiDAR focus motor is a game-changer for solo operators. This is the gimbal I'd take on any shoot.", 'dji rs 4 pro'),
      makeProduct('Rode Wireless GO II', "Clip-on wireless that records internally as backup. When you're moving fast, you can't check audio levels constantly — the safety recording saves you.", 'rode wireless go ii'),
      makeProduct('Variable ND Filter 77mm', "Mandatory for shooting wide open in daylight. Get a good one — cheap NDs add color casts that ruin your footage.", 'variable nd filter 77mm'),
    ],
  },
  budget: {
    intro: "Under $1,500 for everything. Camera, light, audio, and you're making content that looks better than 90% of YouTube. I've built setups like this that people assumed cost five times more.",
    blogLink: { slug: 'why-your-lighting-looks-bad', label: 'Read: Why Your Lighting Looks Bad →' },
    products: [
      makeProduct('Sony a6700', "Yes, it's $1,398 for the body. But the autofocus, 4K quality, and low-light performance mean you won't need to upgrade for years. It's the investment pick.", 'sony a6700'),
      makeProduct('Amaran 60d S', "Around $120 and it outputs clean, high-CRI light through a Bowens mount. Pair it with a $30 softbox and your lighting is solved.", 'amaran 60d'),
      makeProduct('Audio-Technica AT2020', "Under $100, USB version available, and it sounds genuinely good. This is where budget podcasters should start.", 'audio-technica at2020'),
      makeProduct('Elgato Key Light Air', "Desk-mounted, app-controlled, and it won't take up floor space. Perfect for small rooms where a light stand isn't practical.", 'elgato key light air'),
    ],
  },
  livestream: {
    intro: "Live streaming is about reliability first, quality second. A beautiful stream that drops frames every 30 seconds is worse than a stable 1080p feed. Build for uptime.",
    blogLink: { slug: 'why-your-stream-looks-terrible', label: "Read: Why Your Stream Looks Terrible →" },
    products: [
      makeProduct('ATEM Mini Pro ISO', "Hardware encoding, direct Ethernet streaming, and it records ISOs. For church or event streaming, this replaces OBS and a capture card in one box.", 'atem mini pro'),
      makeProduct('Elgato Stream Deck', "Physical buttons for scene switching, audio control, and macros. Your stream shouldn't depend on finding the right OBS hotkey under pressure.", 'elgato stream deck mk.2'),
      makeProduct('Sennheiser MKE 600', "Shotgun mic for on-camera audio that actually sounds broadcast-grade. Point it at the source and it rejects everything else.", 'sennheiser mke 600'),
      makeProduct('Atomos Ninja V+', "Capture card alternative: record ProRes from your camera's HDMI out. Also works as an external monitor. Two jobs, one device.", 'atomos ninja v+'),
    ],
  },
};

function KitProductCard({ product }) {
  const related = getRelatedForProduct(product.productName);

  return (
    <div style={{
      display: 'flex', gap: '1.25rem', padding: '1.25rem',
      border: '1px solid #E5E7EB', borderRadius: '4px',
      backgroundColor: '#fff', alignItems: 'flex-start',
      flexWrap: 'wrap',
    }}>
      {product.image && (
        <div style={{ width: '120px', flexShrink: 0, textAlign: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '100px', objectFit: 'contain' }} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', margin: '0 0 0.35rem' }}>
          {product.name}
        </h4>
        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
          {product.why}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {product.price && (
            <span style={{ fontSize: '1rem', fontWeight: '800', color: '#111827' }}>{product.price}</span>
          )}
          <a href={product.href} target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: ACCENT, color: '#fff', textDecoration: 'none',
            fontWeight: '700', fontSize: '0.85rem', padding: '0.55rem 1.25rem',
            borderRadius: '3px', display: 'inline-block',
          }}>
            Buy on Amazon →
          </a>
        </div>
        {related.length > 0 && (
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.5rem', marginBottom: 0 }}>
            Pairs well with:{' '}
            {related.map((r, i) => (
              <span key={r.name}>
                {i > 0 && ' · '}
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>
                  {r.name}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

function InlineEmailCapture() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      if (res.ok) {
        setStatus('success');
        if (typeof window !== 'undefined') localStorage.setItem('email_subscribed', '1');
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div style={{ backgroundColor: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: '6px', padding: '1.5rem', textAlign: 'center', margin: '3rem 0' }}>
        <p style={{ fontWeight: '700', color: '#16A34A', margin: 0 }}>🎉 You&apos;re in! Check your email for the gear guide.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '2rem', margin: '3rem 0', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#111827', margin: '0 0 0.4rem' }}>
        Want the complete kit list as a PDF?
      </h3>
      <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        Get the free gear guide + budget planner →
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '500px', margin: '0 auto' }}>
        <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '0.65rem 0.75rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '0.9rem', width: '120px' }} />
        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
          style={{ padding: '0.65rem 0.75rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '0.9rem', flex: 1, minWidth: '180px' }} />
        <button type="submit" disabled={status === 'loading'} style={{
          padding: '0.65rem 1.25rem', borderRadius: '4px', border: 'none',
          backgroundColor: ACCENT, color: '#fff', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
        }}>
          {status === 'loading' ? '...' : 'Get the Guide →'}
        </button>
      </form>
      {status === 'error' && <p style={{ color: '#EF4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>Something went wrong. Try again.</p>}
      <p style={{ color: '#9CA3AF', fontSize: '0.72rem', marginTop: '0.75rem' }}>No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default function GearPage() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        @media (max-width: 640px) {
          .use-case-grid { grid-template-columns: 1fr !important; }
          .kit-product-card { flex-direction: column !important; }
          .kit-product-card img { width: 100% !important; max-height: 160px !important; }
        }
      `}</style>

      <SiteNav />

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: '#111827', padding: '4rem 2rem 3.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', margin: '0 0 0.75rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            The Gear That Actually Works
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: '0 0 1rem' }}>
            No affiliate fluff. No paid placements. Just what I&apos;d put in my own kit after 15 years of production.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            All links are Amazon affiliate links. We earn a commission at no extra cost to you.
          </p>
        </div>
      </section>

      {/* ─── USE CASE SELECTOR ─── */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', textAlign: 'center', marginBottom: '1.5rem' }}>
          What Are You Building?
        </h2>
        <div className="use-case-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
        }}>
          {USE_CASES.map(uc => (
            <button key={uc.id} onClick={() => scrollTo(uc.id)} style={{
              background: '#fff', border: '2px solid #E5E7EB', borderRadius: '6px',
              padding: '1.25rem', textAlign: 'center', cursor: 'pointer',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,76,61,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{uc.icon}</div>
              <div style={{ fontWeight: '700', color: '#111827', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{uc.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.4 }}>{uc.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── KIT SECTIONS ─── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
        {USE_CASES.map((uc, idx) => {
          const kit = KITS[uc.id];
          if (!kit) return null;
          return (
            <div key={uc.id}>
              <section id={uc.id} style={{ scrollMarginTop: '80px', paddingTop: '2.5rem' }}>
                <div style={{ borderTop: '3px solid #111827', paddingTop: '1rem', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827', margin: '0 0 0.5rem' }}>
                    {uc.icon} {uc.title}
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                    {kit.intro}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {kit.products.map(p => (
                    <KitProductCard key={p.name} product={p} />
                  ))}
                </div>

                {kit.blogLink && (
                  <div style={{ marginTop: '1rem' }}>
                    <Link href={`/blog/${kit.blogLink.slug}`} style={{
                      color: ACCENT, textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem',
                    }}>
                      {kit.blogLink.label}
                    </Link>
                  </div>
                )}
              </section>

              {/* Inline email capture after 3rd kit */}
              {idx === 2 && <InlineEmailCapture />}
            </div>
          );
        })}
      </div>

      {/* ─── ATEM SCHOOL CROSS-SELL ─── */}
      <section style={{ backgroundColor: '#111827', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Building a church production system?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>
            ATEM School covers everything — switcher setup, Companion integration, camera workflows, and live streaming best practices for churches and venues.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Members get direct reseller pricing on all Blackmagic Design hardware.
          </p>
          <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', backgroundColor: ACCENT, color: '#fff',
            padding: '0.85rem 2rem', borderRadius: '4px', textDecoration: 'none',
            fontWeight: '700', fontSize: '1rem',
          }}>
            Learn at ATEM School →
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
