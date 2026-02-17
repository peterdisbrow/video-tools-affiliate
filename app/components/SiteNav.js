'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const NAV_LINKS = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '2px solid #111827',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontWeight: '900',
          color: '#111827',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.1rem',
          letterSpacing: '-0.02em',
          fontSize: '1.25rem',
        }}>
          <span style={{ color: '#E84C3D' }}>GEAR</span>
          <span>GUIDE</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={linkStyle(href)}>{label}</Link>
          ))}
          <Link href="/free-gear-guide" style={{
            backgroundColor: '#E84C3D',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.82rem',
            padding: '0.4rem 1rem',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Free Tools
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? '#E84C3D' : '#111827', transition: 'background 0.15s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? '#E84C3D' : '#111827', transition: 'background 0.15s' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? '#E84C3D' : '#111827', transition: 'background 0.15s' }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-nav" style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #E5E7EB',
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              color: isActive(href) ? '#E84C3D' : '#111827',
              textDecoration: 'none',
              fontWeight: isActive(href) ? '700' : '500',
              fontSize: '1.05rem',
              padding: '0.65rem 0',
              borderBottom: '1px solid #F3F4F6',
            }}>
              {label}
            </Link>
          ))}
          <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
            color: '#111827',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.05rem',
            padding: '0.65rem 0',
            borderBottom: '1px solid #F3F4F6',
          }}>
            ATEM School ↗
          </a>
          <Link href="/free-gear-guide" onClick={() => setMenuOpen(false)} style={{
            display: 'block',
            marginTop: '0.75rem',
            backgroundColor: '#E84C3D',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.9rem',
            padding: '0.75rem 1rem',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}>
            Free Tools
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
