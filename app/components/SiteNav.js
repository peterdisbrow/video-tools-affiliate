'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const linkStyle = (href) => ({
    color: isActive(href) ? '#2563EB' : '#374151',
    textDecoration: 'none',
    fontWeight: isActive(href) ? '600' : '500',
    fontSize: '0.95rem',
    transition: 'color 0.15s',
  });

  return (
    <nav style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#111827',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          🎬 <span>Creator Gear</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <Link href="/comparisons" style={linkStyle('/comparisons')}>Comparisons</Link>
          <Link href="/guides" style={linkStyle('/guides')}>Guides</Link>
          <Link href="/blog" style={linkStyle('/blog')}>Blog</Link>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <Link href="/free-gear-guide" style={{
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            padding: '0.45rem 1rem',
            borderRadius: '0.5rem',
            transition: 'background-color 0.15s',
          }}>
            Free Guides
          </Link>
        </div>
      </div>
    </nav>
  );
}
