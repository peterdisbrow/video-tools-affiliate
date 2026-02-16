'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: '#1a1a2e', padding: '2rem', borderRadius: '12px', width: '320px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>🔒 Admin Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #333', background: '#0f0f23', color: '#fff', fontSize: '1rem', marginBottom: '1rem', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#ff4444', margin: '0 0 1rem' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#6c5ce7', color: '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
