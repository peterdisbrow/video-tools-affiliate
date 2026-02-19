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

    if (!firstName.trim()) {
      setErrorMsg('Please enter your first name.');
      setStatus('error');
      return;
    }

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
        padding: '2.5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#111827', fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: '700' }}>
            Check Your Email!
          </h2>
          <p style={{ color: '#374151', fontSize: '1rem' }}>
            Your gear guides are on the way. Welcome to the newsletter!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      background: '#FFFFFF',
      borderBottom: '2px solid #E5E7EB',
      padding: '2.5rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>
          📬 Get Gear Guides + Exclusive Deals Delivered Weekly
        </h2>
        <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Industry-leading gear picks, unbiased reviews, and exclusive deals — straight to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #D1D5DB',
                fontSize: '0.95rem',
                width: '160px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#E84C3D'}
              onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #D1D5DB',
                fontSize: '0.95rem',
                minWidth: '220px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#E84C3D'}
              onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: '#E84C3D',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s, transform 0.1s',
              opacity: status === 'loading' ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading') e.target.style.backgroundColor = '#D43E33';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#E84C3D';
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Free Guides'}
          </button>
        </form>
        {status === 'error' && (
          <p style={{ color: '#DC2626', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: '500' }}>
            {errorMsg}
          </p>
        )}
        <p style={{ color: '#9CA3AF', fontSize: '0.75rem', marginTop: '1rem' }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
