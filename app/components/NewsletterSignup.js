'use client';

import { useState } from 'react';

const ACCENT = '#E84C3D';

/**
 * NewsletterSignup
 * Props:
 *   compact  — sidebar mode: stacked, small, fits in ~220px column
 *   inline   — pre-footer mode: horizontal row, dark bg assumed
 *   (none)   — default standalone section (kept for any other uses)
 */
export default function NewsletterSignup({ compact = false, inline = false }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');
  const [status, setStatus]       = useState('idle');
  const [errorMsg, setErrorMsg]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !email.includes('@')) {
      setErrorMsg('Enter a valid email.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res  = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await res.json();
      if (res.ok) setStatus('success');
      else { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); }
    } catch {
      setErrorMsg('Network error. Try again.');
      setStatus('error');
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (status === 'success') {
    if (compact) {
      return (
        <div style={{ border: `2px solid #22c55e`, borderRadius: '4px', padding: '1rem', marginBottom: '2rem', backgroundColor: '#F0FDF4', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>✅</div>
          <p style={{ fontSize: '0.82rem', fontWeight: '700', color: '#166534', margin: 0 }}>You&apos;re in! Check your email.</p>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
        <p style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0 }}>You&apos;re in! Check your email for the guide.</p>
      </div>
    );
  }

  // ── Compact (sidebar) ────────────────────────────────────────────────────
  if (compact) {
    return (
      <div style={{ border: `2px solid #E5E7EB`, borderRadius: '4px', padding: '1.25rem', marginBottom: '2rem', backgroundColor: '#FEF2F2' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', color: ACCENT }}>
          🎁 Free Download
        </div>
        <p style={{ fontSize: '0.88rem', fontWeight: '700', color: '#111827', lineHeight: '1.4', margin: '0 0 0.3rem' }}>
          15 years of production — here&apos;s what I&apos;d actually buy.
        </p>
        <p style={{ fontSize: '0.78rem', color: '#6B7280', lineHeight: '1.5', margin: '0 0 0.75rem' }}>
          Free checklist + budget planner.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            required
            style={inputStyle}
          />
          <button type="submit" disabled={status === 'loading'} style={btnStyle(status)}>
            {status === 'loading' ? 'Sending…' : 'Get Free Guides →'}
          </button>
        </form>
        {status === 'error' && <p style={{ color: '#DC2626', fontSize: '0.72rem', marginTop: '0.4rem', marginBottom: 0 }}>{errorMsg}</p>}
        <p style={{ fontSize: '0.68rem', color: '#9CA3AF', textAlign: 'center', marginTop: '0.4rem', marginBottom: 0 }}>No spam. Unsubscribe anytime.</p>
      </div>
    );
  }

  // ── Inline (pre-footer, dark bg) ─────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center',
    }}>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        style={{ ...inputStyleDark, width: '140px' }}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
        required
        style={{ ...inputStyleDark, minWidth: '220px' }}
      />
      <button type="submit" disabled={status === 'loading'} style={btnStyle(status)}>
        {status === 'loading' ? 'Sending…' : 'Get Free Guides →'}
      </button>
      {status === 'error' && (
        <p style={{ width: '100%', textAlign: 'center', color: '#FCA5A5', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>{errorMsg}</p>
      )}
    </form>
  );
}

// ── Shared styles ────────────────────────────────────────────────────────────

const inputStyle = {
  padding: '0.55rem 0.75rem',
  borderRadius: '3px',
  border: '1px solid #D1D5DB',
  fontSize: '0.82rem',
  width: '100%',
  outline: 'none',
  backgroundColor: '#fff',
  color: '#111827',
};

const inputStyleDark = {
  padding: '0.7rem 1rem',
  borderRadius: '4px',
  border: '1px solid #374151',
  fontSize: '0.9rem',
  outline: 'none',
  backgroundColor: '#1F2937',
  color: '#fff',
};

const btnStyle = (status) => ({
  padding: '0.7rem 1.4rem',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: ACCENT,
  color: '#fff',
  fontWeight: '700',
  fontSize: '0.9rem',
  cursor: status === 'loading' ? 'wait' : 'pointer',
  whiteSpace: 'nowrap',
  opacity: status === 'loading' ? 0.75 : 1,
});
