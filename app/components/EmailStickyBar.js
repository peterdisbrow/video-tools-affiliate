'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ACCENT = '#E84C3D';

export default function EmailStickyBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog';

  useEffect(() => {
    if (!isBlogPost) return;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('sticky_bar_dismissed')) return;
    if (localStorage.getItem('email_subscribed')) return;

    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, [isBlogPost]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9998,
      backgroundColor: ACCENT, color: '#fff',
      padding: '0.75rem 1rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '1rem', flexWrap: 'wrap',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
    }}>
      <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
        🎁 Free gear guide + budget planner →
      </span>
      <a href="/free-gear-guide" style={{
        backgroundColor: '#fff', color: ACCENT, padding: '0.45rem 1rem',
        borderRadius: '3px', textDecoration: 'none', fontWeight: '700',
        fontSize: '0.82rem', whiteSpace: 'nowrap',
      }}>
        Get It Free
      </a>
      <button
        onClick={() => { setShow(false); sessionStorage.setItem('sticky_bar_dismissed', '1'); }}
        style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
          fontSize: '1.25rem', cursor: 'pointer', padding: '0 0.25rem', lineHeight: 1,
        }}
      >×</button>
    </div>
  );
}
