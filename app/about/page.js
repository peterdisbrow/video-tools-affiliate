import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import TestimonialSection from '../components/TestimonialSection';
import WhyBuyThrough from '../components/WhyBuyThrough';

export const metadata = {
  title: 'About Andrew Disbrow — Gear Guide',
  description: '15 years as a broadcast engineer and Blackmagic Design reseller. Gear Guide exists because I got tired of answering the same gear questions over and over.',
};

const ACCENT = '#E84C3D';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <SiteNav />

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <div style={{ borderBottom: '3px solid #111827', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT, marginBottom: '0.75rem' }}>
            About
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '900', color: '#111827', margin: '0 0 0.75rem', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
            I've been doing this for 15 years. This site is what I wish had existed when I started.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B7280', margin: 0, lineHeight: '1.6' }}>
            — Andrew Disbrow, broadcast engineer + Blackmagic Design reseller
          </p>
        </div>

        {/* Main story */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#374151' }}>

          <p>
            I started in broadcast as a production engineer and integrator. For the past 15 years I've been building live production systems — mostly for churches, but also for corporate AV, events, and anyone who needs a reliable live video workflow. I'm an authorized Blackmagic Design reseller, which means I sell the gear directly, not just review it from a distance.
          </p>

          <p>
            That background matters because it changes what I pay attention to. I don't care about unboxing videos or spec comparisons that don't translate to real-world use. I care about whether something holds up in a live environment, whether your operator can learn it in a weekend, and whether the signal chain actually works end-to-end.
          </p>

          <p>
            Gear Guide started because I kept answering the same questions. A church AV director wants to stream for the first time and doesn't know whether to get the ATEM Mini or the Mini Pro. A creator wants to upgrade their audio but doesn't understand why their SM7B sounds bad (hint: it's probably the gain chain, not the mic). Someone buys a $400 light because a YouTuber recommended it, but the CRI is terrible and they don't know why their footage looks off.
          </p>

          <p>
            I got tired of giving the same answers in individual emails. So I wrote them down here.
          </p>

          <p>
            Everything on this site is from direct experience — gear I've sold, installed, and supported in real production environments. I'm not a journalist who reviews gear for a week. I'm the person churches call when their stream goes down on Sunday morning.
          </p>

          {/* ATEM School section */}
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '4px',
            padding: '1.75rem',
            margin: '2.5rem 0',
            color: '#fff',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              ATEM School
            </div>
            <p style={{ margin: '0 0 0.75rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
              If you want to go deeper on live production — ATEM switchers, HyperDeck recorders, Bitfocus Companion, building a real broadcast workflow — I built ATEM School for that. Members also get exclusive pricing on Blackmagic gear through my reseller account.
            </p>
            <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              backgroundColor: ACCENT,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.85rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '3px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              Learn more at atemschool.com →
            </a>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: '2.5rem 0 1rem', letterSpacing: '-0.01em' }}>
            On affiliate links
          </h2>

          <p>
            This site uses Amazon affiliate links. When you buy through them, I earn a small commission at no extra cost to you. For Blackmagic Design products, I'm a direct reseller — I earn more selling direct than through Amazon, which is why those posts point to ATEM School instead of a product listing.
          </p>

          <p>
            I don't recommend gear I haven't used or wouldn't recommend to a client. That's the only filter that matters.
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: '2.5rem 0 1rem', letterSpacing: '-0.01em' }}>
            What I focus on
          </h2>

          <p>
            Lighting is my passion — understanding the physics of light and why cheap gear looks cheap. ATEM switchers and live production workflows. Audio signal chains that actually work. The gear churches and small production teams can afford that won't embarrass them.
          </p>

          <p>
            I'm not here to review every camera that comes out. I'm here to help you build a production setup that works reliably, doesn't break the budget, and doesn't require a broadcast engineering degree to operate.
          </p>

          <p>
            If you have a specific question or want to talk about a production build, reach out.
          </p>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '2.5rem', fontSize: '0.9rem', color: '#6B7280' }}>
            <strong style={{ color: '#111827' }}>Andrew Disbrow</strong><br />
            Broadcast engineer · Blackmagic Design reseller · Founder, ATEM School<br />
            <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: 'none' }}>atemschool.com</a>
          </div>
        </div>

      </div>

      <WhyBuyThrough />
      <TestimonialSection />

      <SiteFooter />
    </div>
  );
}
