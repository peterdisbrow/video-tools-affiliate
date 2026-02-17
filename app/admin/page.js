'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ACCENT = '#2563EB';

const cardStyle = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '1.5rem',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [gitInfo, setGitInfo] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/analytics').then(r => r.json()).then(setStats).catch(() => {});
    runAction('git-status');
  }, []);

  async function runAction(action) {
    const res = await fetch('/api/admin/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (action === 'git-status') {
      setGitInfo(data);
    } else {
      setActionMsg(data.message || data.error || 'Done');
      setTimeout(() => setActionMsg(''), 3000);
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>Dashboard</h2>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Page Views', value: stats?.totalPageViews || 0, icon: '👁️' },
          { label: 'Affiliate Clicks', value: stats?.totalClicks || 0, icon: '🖱️' },
          { label: 'Email Signups', value: stats?.totalSignups || 0, icon: '📧' },
          { label: 'Top Products', value: stats?.topProducts?.length || 0, icon: '⭐' },
        ].map(s => (
          <div key={s.label} style={cardStyle}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ ...cardStyle, marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>⚡ Quick Actions</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button onClick={() => runAction('rebuild-sitemap')} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
            🗺️ Rebuild Sitemap
          </button>
          <button onClick={() => runAction('clear-cache')} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
            🧹 Clear Cache
          </button>
          <button onClick={() => runAction('git-status')} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
            🔄 Refresh Git Status
          </button>
        </div>
        {actionMsg && <div style={{ padding: '0.5rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem' }}>{actionMsg}</div>}
      </div>

      {/* Git Info */}
      {gitInfo && (
        <div style={{ ...cardStyle, marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🔧 Git Status</h3>
          <div style={{ fontSize: '0.9rem', color: '#374151' }}>
            <p><strong>Branch:</strong> {gitInfo.branch}</p>
            <p><strong>Last commit:</strong> {gitInfo.lastCommit}</p>
            {gitInfo.status && (
              <div>
                <strong>Changes:</strong>
                <pre style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', overflow: 'auto', marginTop: '0.5rem' }}>{gitInfo.status || 'Clean'}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Site Links */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🔗 Site Sections</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { href: '/', label: 'Home' },
            { href: '/products', label: 'Products' },
            { href: '/blog', label: 'Blog' },
            { href: '/guides', label: 'Guides' },
            { href: '/comparisons', label: 'Comparisons' },
            { href: '/about', label: 'About' },
          ].map(link => (
            <Link key={link.href} href={link.href} target="_blank" style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #dbeafe',
              background: '#eff6ff',
              color: ACCENT,
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}>
              {link.label} ↗
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
