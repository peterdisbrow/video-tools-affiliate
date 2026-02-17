'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TrackingProvider({ children }) {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pageview', page: pathname }),
    }).catch(() => {});
  }, [pathname]);

  // Track affiliate link clicks
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a[href*="amazon.com"], a[href*="tag="]');
      if (link) {
        const href = link.href;
        const productName = link.textContent?.trim()?.slice(0, 100) || href;
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'click', product: productName, page: pathname }),
        }).catch(() => {});
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [pathname]);

  // Track email signup attempts
  useEffect(() => {
    const handler = (e) => {
      const form = e.target.closest('form');
      if (form && (form.action?.includes('mailchimp') || form.querySelector('input[type="email"]'))) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'signup', page: pathname }),
        }).catch(() => {});
      }
    };
    document.addEventListener('submit', handler);
    return () => document.removeEventListener('submit', handler);
  }, [pathname]);

  return children;
}
