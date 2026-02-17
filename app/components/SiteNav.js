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
    color: isActive(href) ? '#E84C3D' : '#374151',
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
          <span style={{ color: '#E84C3D', fontWeight: '900' }}>GG</span><span style={{ marginLeft: '0.3rem' }}>Gear Guide</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          <Link href="/comparisons" style={linkStyle('/comparisons')}>Comparisons</Link>
          <Link href="/guides" style={linkStyle('/guides')}>Guides</Link>
          <Link href="/blog" style={linkStyle('/blog')}>Blog</Link>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style={{
            color: '#374151',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#E84C3D'}
          onMouseLeave={e => e.currentTarget.style.color = '#374151'}
          >
            ATEM School ↗
          </a>
          <Link href="/free-gear-guide" style={{
            backgroundColor: '#E84C3D',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.85rem',
            padding: '0.45rem 1rem',
            borderRadius: '3px',
            transition: 'background-color 0.15s',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            Free Tools
          </Link>
        </div>
      </div>
    </nav>
  );
}
