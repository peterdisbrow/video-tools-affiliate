'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#2563EB';
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem' };
const tabStyle = (active) => ({
  padding: '0.4rem 1rem', borderRadius: '6px', border: `1px solid ${active ? ACCENT : '#d1d5db'}`,
  background: active ? '#eff6ff' : '#fff', color: active ? ACCENT : '#374151',
  cursor: 'pointer', fontSize: '0.85rem', fontWeight: active ? '600' : '400',
});

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

function FunnelStep({ label, value, maxValue, color, icon }) {
  const pct = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ background: '#f3f4f6', borderRadius: '4px', height: '12px', overflow: 'hidden', margin: '0 1rem' }}>
        <div style={{ background: color, height: '100%', width: `${pct}%`, borderRadius: '4px' }} />
      </div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>{pct}%</div>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('30');

  useEffect(() => {
    fetch(`/api/admin/analytics?range=${range}`).then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, [range]);

  if (loading) return <p>Loading analytics...</p>;
  if (!data) return <p>No data available yet. Analytics will appear once visitors start using the site.</p>;

  const maxClick = data.topProducts?.[0]?.count || 1;
  const viewDates = Object.entries(data.dailyViews || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const clickDates = Object.entries(data.dailyClicks || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDailyView = Math.max(...viewDates.map(d => d[1]), 1);
  const maxDailyClick = Math.max(...clickDates.map(d => d[1]), 1);

  // Top pages data
  const topPages = data.topPages || [];
  const maxPageViews = topPages[0]?.count || 1;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>📈 Analytics</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[['1', 'Today'], ['7', '7 Days'], ['30', '30 Days']].map(([val, label]) => (
            <button key={val} onClick={() => { setLoading(true); setRange(val); }} style={tabStyle(range === val)}>{label}</button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Page Views', value: data.totalPageViews, icon: '👁️' },
          { label: 'Product Clicks', value: data.totalProductClicks || 0, icon: '🛒' },
          { label: 'Affiliate Clicks', value: data.totalClicks, icon: '🖱️' },
          { label: 'Signups', value: data.totalSignups, icon: '📧' },
        ].map(s => (
          <div key={s.label} style={cardStyle}>
            <div style={{ fontSize: '1.25rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <div style={{ ...cardStyle, marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', color: '#111827' }}>🔄 Conversion Funnel</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FunnelStep label="Page Views" value={data.totalPageViews} maxValue={data.totalPageViews} color="#60a5fa" icon="👁️" />
          <div style={{ fontSize: '1.5rem', color: '#d1d5db' }}>→</div>
          <FunnelStep label="Product Clicks" value={data.totalProductClicks || 0} maxValue={data.totalPageViews} color="#f59e0b" icon="🛒" />
          <div style={{ fontSize: '1.5rem', color: '#d1d5db' }}>→</div>
          <FunnelStep label="Affiliate Clicks" value={data.totalClicks} maxValue={data.totalPageViews} color="#10b981" icon="💰" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Daily Page Views */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📊 Daily Page Views</h3>
          {viewDates.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No data yet</p> :
            viewDates.map(([date, count]) => (
              <Bar key={date} value={count} max={maxDailyView} label={date} count={count} />
            ))
          }
        </div>

        {/* Daily Clicks */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🖱️ Daily Affiliate Clicks</h3>
          {clickDates.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No data yet</p> :
            clickDates.map(([date, count]) => (
              <Bar key={date} value={count} max={maxDailyClick} label={date} count={count} />
            ))
          }
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Top Pages */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📄 Top Pages</h3>
          {topPages.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No data yet</p> :
            topPages.slice(0, 15).map(p => (
              <Bar key={p.page} value={p.count} max={maxPageViews} label={p.page} count={p.count} />
            ))
          }
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
    </div>
  );
}
