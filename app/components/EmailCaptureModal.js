'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const ACCENT = '#E84C3D';

export default function EmailCaptureModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle');
  const pathname = usePathname();

  const shouldShow = useCallback(() => {
    if (pathname === '/free-gear-guide') return false;
    if (typeof window === 'undefined') return false;
    if (sessionStorage.getItem('email_modal_shown')) return false;
    if (localStorage.getItem('email_subscribed')) return false;
    return true;
  }, [pathname]);

  useEffect(() => {
    if (!shouldShow()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem('email_modal_shown', '1');
      setShow(true);
    };

    // Scroll trigger: 60%
    const onScroll = () => {
      const scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPct > 0.6) trigger();
    };

    // Exit intent (desktop): mouse toward top
    const onMouseLeave = (e) => {
      if (e.clientY < 10) trigger();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [shouldShow]);

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
        localStorage.setItem('email_subscribed', '1');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff', borderRadius: '8px', maxWidth: '480px', width: '100%',
          padding: '2.5rem 2rem', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        }}
      >
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: 'none', border: 'none', fontSize: '1.5rem',
            color: '#9CA3AF', cursor: 'pointer', lineHeight: 1,
          }}
        >×</button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>You&apos;re in!</h2>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>Check your email for your free gear tools.</p>
            <a href="/free-gear-guide" style={{
              display: 'inline-block', backgroundColor: ACCENT, color: '#fff',
              padding: '0.65rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: '700',
            }}>Download Now →</a>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem', lineHeight: 1.25 }}>
              15 Years of Production Work. Here&apos;s What I&apos;d Actually Buy.
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Free gear checklist + budget planner for video creators. No fluff.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text" placeholder="First name" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    padding: '0.75rem', borderRadius: '4px', border: '1px solid #D1D5DB',
                    fontSize: '0.9rem', width: '40%',
                  }}
                />
                <input
                  type="email" placeholder="Your best email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  style={{
                    padding: '0.75rem', borderRadius: '4px', border: '1px solid #D1D5DB',
                    fontSize: '0.9rem', flex: 1,
                  }}
                />
              </div>
              <button type="submit" disabled={status === 'loading'} style={{
                padding: '0.85rem', borderRadius: '4px', border: 'none',
                backgroundColor: ACCENT, color: '#fff', fontWeight: '800',
                fontSize: '1rem', cursor: 'pointer',
              }}>
                {status === 'loading' ? 'Sending...' : 'Get the Free Guide →'}
              </button>
            </form>
            {status === 'error' && <p style={{ color: '#EF4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>Something went wrong. Try again.</p>}
            <p style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '0.75rem', textAlign: 'center' }}>
              Unsubscribe anytime. No spam.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
