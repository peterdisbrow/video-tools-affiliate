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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            You&apos;re In!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            Check your email for exclusive gear guides!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          📬 Get Free Gear Guides
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Weekly gear guides, deals, and video production tips delivered to your inbox
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
              padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none',
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
              padding: '0.75rem 1rem', borderRadius: '0.5rem', border: 'none',
              fontSize: '1rem', flex: '1', minWidth: '200px', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none',
              backgroundColor: '#f59e0b', color: '#1f2937', fontWeight: 'bold',
              fontSize: '1rem', cursor: status === 'loading' ? 'wait' : 'pointer',
              whiteSpace: 'nowrap', transition: 'background-color 0.2s',
            }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Get Free Gear Guides'}
          </button>
        </form>
        {status === 'error' && (
          <p style={{ color: '#fca5a5', marginTop: '0.75rem', fontSize: '0.9rem' }}>{errorMsg}</p>
        )}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '1rem' }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
