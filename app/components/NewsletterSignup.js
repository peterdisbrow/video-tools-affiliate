'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section style={{
        background: '#EFF6FF',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            You&apos;re In!
          </h2>
          <p style={{ color: '#374151', fontSize: '1.1rem' }}>
            Check your email for exclusive gear guides!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      background: '#F8F9FA', borderBottom: '1px solid #E5E7EB',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#111827', fontSize: '1.6rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          📬 Get Gear Guides + Exclusive Deals
        </h2>
        <p style={{ color: '#374151', marginBottom: '1rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
          Join 8,000+ creators getting gear guides and exclusive deals delivered weekly:
        </p>
        <ul style={{
          color: '#374151',
          lineHeight: '1.8',
          listStyle: 'none',
          padding: '0 0 1.5rem 0',
          margin: 0,
          fontSize: '0.9rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          textAlign: 'left',
          marginBottom: '1.5rem'
        }}>
          <li>✅ Weekly gear deals (curated, not auto-posted)</li>
          <li>✅ "Gear I Regret Buying" column (honest failures)</li>
          <li>✅ Budget setup guides ($500, $2K, $5K tiers)</li>
          <li>✅ Creator interviews & real workflows</li>
        </ul>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Sent every Tuesday. Unsubscribe anytime. No spam, ever.
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB',
              fontSize: '1rem', width: '150px', outline: 'none',
            }}
          />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            required
            style={{
              padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB',
              fontSize: '1rem', flex: '1', minWidth: '200px', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none',
              backgroundColor: '#2563EB', color: '#FFFFFF', fontWeight: 'bold',
              fontSize: '1rem', cursor: status === 'loading' ? 'wait' : 'pointer',
              whiteSpace: 'nowrap', transition: 'background-color 0.2s',
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Free Guides'}
          </button>
        </form>
        {status === 'error' && (
          <p style={{ color: '#DC2626', marginTop: '0.75rem', fontSize: '0.9rem' }}>{errorMsg}</p>
        )}
        <p style={{ color: '#9CA3AF', fontSize: '0.8rem', marginTop: '1rem' }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
