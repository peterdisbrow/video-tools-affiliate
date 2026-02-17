'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const ACCENT = '#2563EB';

export default function FreeGearGuidePage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
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
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 100%)', borderBottom: '1px solid #E5E7EB', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ color: '#2563EB', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>FREE DOWNLOAD — UPDATED FEB 2026</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#111827' }}>
            Stop Wasting Money on the Wrong Gear
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem' }}>
            Get our free YouTube Creator Gear Checklist + Budget Planner + 30-Day Action Plan.
            Built from real creator feedback and 68 product reviews.
          </p>

          {status === 'success' ? (
            <div style={{ backgroundColor: '#F8F9FA', borderRadius: '1rem', padding: '2rem', border: '2px solid #22c55e' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ color: '#16A34A', fontSize: '1.5rem', marginBottom: '0.5rem' }}>You&apos;re In!</h2>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Check your email for your free gear tools.</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/freebies/youtube-creator-gear-checklist.html" style={{ backgroundColor: '#2563EB', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>📋 Gear Checklist</a>
                <a href="/freebies/gear-budget-planner.html" style={{ background: '#2563EB', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>💰 Budget Planner</a>
                <a href="/freebies/30-day-action-plan.html" style={{ background: '#2563EB', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>🚀 30-Day Plan</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
              <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}
                style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', fontSize: '1rem', width: '140px', backgroundColor: '#F8F9FA', color: '#374151' }} />
              <input type="email" placeholder="Your best email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ padding: '1rem', borderRadius: '0.5rem', border: 'none', fontSize: '1rem', flex: 1, minWidth: '200px', backgroundColor: '#F8F9FA', color: '#374151' }} />
              <button type="submit" disabled={status === 'loading'}
                style={{ padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', whiteSpace: 'nowrap', width: '100%' }}>
                {status === 'loading' ? 'Sending...' : '📬 Get Free Tools →'}
              </button>
            </form>
          )}

          {status === 'error' && <p style={{ color: '#fca5a5', marginTop: '1rem' }}>Something went wrong. Try again.</p>}
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '1rem' }}>No spam. Unsubscribe anytime. Join 500+ creators.</p>
        </div>
      </section>

      {/* What You Get */}
      <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2rem', color: '#111827' }}>What&apos;s Inside</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#F8F9FA', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
            <h3 style={{ color: '#2563EB', marginBottom: '0.5rem' }}>Gear Checklist</h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Interactive checklist with budget tiers ($500 to $5K+). Camera, audio, lighting, software — all covered with direct product links.</p>
          </div>
          <div style={{ backgroundColor: '#F8F9FA', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💰</div>
            <h3 style={{ color: '#2563EB', marginBottom: '0.5rem' }}>Budget Planner</h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Select your gear, see the total instantly. No spreadsheet skills needed. Picks from 68 reviewed products.</p>
          </div>
          <div style={{ backgroundColor: '#F8F9FA', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚀</div>
            <h3 style={{ color: '#2563EB', marginBottom: '0.5rem' }}>30-Day Action Plan</h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Week-by-week roadmap from zero to recording. Day-by-day tasks with pro tips and product recs.</p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section style={{ backgroundColor: '#F8F9FA', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '700px', margin: '0 auto' }}>
          <div><span style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>68</span><br /><span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Products Reviewed</span></div>
          <div><span style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>25</span><br /><span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Detailed Guides</span></div>
          <div><span style={{ fontSize: '2rem', fontWeight: 800, color: '#2563EB' }}>40+</span><br /><span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Reddit Threads Analyzed</span></div>
          <div><span style={{ fontSize: '2rem', fontWeight: 800, color: '#16A34A' }}>4</span><br /><span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Budget Tiers</span></div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#111827' }}>FAQ</h2>
        {[
          { q: 'Is this really free?', a: 'Yes, 100% free. We make money through affiliate links when you buy gear through our recommendations (at no extra cost to you).' },
          { q: 'Will I get spammed?', a: 'Never. You\'ll get 5 helpful emails over 2 weeks, then occasional gear updates. Unsubscribe anytime with one click.' },
          { q: 'I\'m a complete beginner. Is this for me?', a: 'Especially for you. The guides start at $0 (smartphone + free software) and scale up as you grow.' },
          { q: 'How is this different from random Amazon lists?', a: 'We analyzed 40+ Reddit threads and real creator feedback. These are battle-tested recommendations, not sponsored picks.' },
        ].map((faq, i) => (
          <div key={i} style={{ backgroundColor: '#F8F9FA', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1rem' }}>
            <h3 style={{ color: '#2563EB', fontSize: '1rem', marginBottom: '0.5rem' }}>{faq.q}</h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section style={{ background: '#EFF6FF', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ready to Build Your Creator Setup?</h2>
        <p style={{ color: '#4B5563', marginBottom: '1.5rem' }}>Join creators who stopped guessing and started building.</p>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'inline-block', backgroundColor: '#2563EB', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 800, textDecoration: 'none', fontSize: '1.1rem' }}>
          Get Your Free Tools ↑
        </a>
      </section>

      <SiteFooter />
    </div>
  );
}
