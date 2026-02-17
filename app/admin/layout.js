'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const ACCENT = '#2563EB';

const navItems = [
  { href: '/admin', label: '📊 Dashboard', exact: true },
  { href: '/admin/products', label: '📦 Products' },
  { href: '/admin/blog', label: '✍️ Blog Posts' },
  { href: '/admin/blog/new', label: '🤖 AI Writer' },
  { href: '/admin/homepage', label: '🏠 Homepage' },
  { href: '/admin/seo', label: '🔍 SEO' },
  { href: '/admin/analytics', label: '📈 Analytics' },
  { href: '/admin/settings', label: '⚙️ Settings' },
  { href: '/admin/email', label: '📧 Email' },
];

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'check' }),
    }).then(r => {
      if (r.ok) setAuthenticated(true);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    setAuthenticated(false);
    setPassword('');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f9fafb' }}>
        <p style={{ color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', width: '380px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
          <h2 style={{ marginBottom: '0.5rem', color: '#111827', fontSize: '1.5rem' }}>Admin Dashboard</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Enter your password to continue</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', marginBottom: '1rem', boxSizing: 'border-box', outline: 'none' }}
            autoFocus
          />
          {error && <p style={{ color: '#ef4444', margin: '0 0 1rem', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: ACCENT, color: '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ authenticated, handleLogout }}>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f9fafb' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '240px' : '0px',
          background: '#fff',
          borderRight: '1px solid #e5e7eb',
          transition: 'width 0.2s',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', margin: 0, whiteSpace: 'nowrap' }}>
              🎬 Video Tools Admin
            </h1>
          </div>
          <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
            {navItems.map(item => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'block',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  marginBottom: '0.25rem',
                  textDecoration: 'none',
                  color: active ? ACCENT : '#374151',
                  background: active ? '#eff6ff' : 'transparent',
                  fontWeight: active ? '600' : '400',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e5e7eb' }}>
            <Link href="/" style={{ display: 'block', color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '0.5rem' }}>← Back to site</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0.25rem' }}>
              ☰
            </button>
            <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
              {navItems.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))?.label || 'Admin'}
            </span>
          </div>
          <div style={{ padding: '2rem 1.5rem', maxWidth: '1200px' }}>
            {children}
          </div>
        </main>
      </div>
    </AuthContext.Provider>
  );
}
