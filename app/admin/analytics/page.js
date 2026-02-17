'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#2563EB';
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem' };

function Bar({ value, max, label, count }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
        <span style={{ color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{label}</span>
        <span style={{ color: '#6b7280', fontWeight: '600' }}>{count}</span>
      </div>
      <div style={{ background: '#f3f4f6', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
        <div style={{ background: ACCENT, height: '100%', width: `${pct}%`, borderRadius: '4px', transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return <p>No data available yet. Analytics will appear once visitors start using the site.</p>;

  const maxClick = data.topProducts?.[0]?.count || 1;
  const viewDates = Object.entries(data.dailyViews || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const clickDates = Object.entries(data.dailyClicks || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDailyView = Math.max(...viewDates.map(d => d[1]), 1);
  const maxDailyClick = Math.max(...clickDates.map(d => d[1]), 1);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>Analytics</h2>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Page Views', value: data.totalPageViews, icon: '👁️' },
          { label: 'Total Clicks', value: data.totalClicks, icon: '🖱️' },
          { label: 'Total Signups', value: data.totalSignups, icon: '📧' },
          { label: 'Recent Signups (30d)', value: data.recentSignups, icon: '📈' },
        ].map(s => (
          <div key={s.label} style={cardStyle}>
            <div style={{ fontSize: '1.25rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Daily Page Views */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📊 Daily Page Views (14d)</h3>
          {viewDates.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No data yet</p> :
            viewDates.map(([date, count]) => (
              <Bar key={date} value={count} max={maxDailyView} label={date} count={count} />
            ))
          }
        </div>

        {/* Daily Clicks */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🖱️ Daily Affiliate Clicks (14d)</h3>
          {clickDates.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No data yet</p> :
            clickDates.map(([date, count]) => (
              <Bar key={date} value={count} max={maxDailyClick} label={date} count={count} />
            ))
          }
        </div>
      </div>

      {/* Top Products */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>⭐ Top Clicked Products</h3>
        {data.topProducts?.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No clicks tracked yet</p> :
          data.topProducts?.map(p => (
            <Bar key={p.name} value={p.count} max={maxClick} label={p.name} count={p.count} />
          ))
        }
      </div>
    </div>
  );
}
