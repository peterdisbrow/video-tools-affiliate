'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#E84C3D';
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem' };

export default function EmailDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/email')
      .then(r => r.json())
      .then(d => { setData(d); if (d.error) setError(d.error); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <p>Loading email data...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>Email / Subscribers</h2>

      {error && (
        <div style={{ padding: '1rem', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', color: '#92400e', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Subscribers', value: data?.subscribers || 0, icon: '👥' },
          { label: 'Unsubscribes', value: data?.unsubscribes || 0, icon: '👋' },
          { label: 'Open Rate', value: data?.openRate ? `${(data.openRate * 100).toFixed(1)}%` : 'N/A', icon: '📬' },
          { label: 'Click Rate', value: data?.clickRate ? `${(data.clickRate * 100).toFixed(1)}%` : 'N/A', icon: '🖱️' },
        ].map(s => (
          <div key={s.label} style={cardStyle}>
            <div style={{ fontSize: '1.25rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Members */}
      {data?.recentMembers?.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📋 Recent Signups</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentMembers.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.5rem', color: '#374151' }}>{m.email}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', background: m.status === 'subscribed' ? '#f0fdf4' : '#fef2f2', color: m.status === 'subscribed' ? '#166534' : '#991b1b' }}>
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', color: '#6b7280' }}>{m.signupDate?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Link */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#111827' }}>🔗 Quick Links</h3>
        <a href={data?.dashboardUrl || 'https://mailchimp.com'} target="_blank" rel="noopener" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#eff6ff', color: ACCENT, borderRadius: '8px', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
          Open Mailchimp Dashboard ↗
        </a>
      </div>
    </div>
  );
}
