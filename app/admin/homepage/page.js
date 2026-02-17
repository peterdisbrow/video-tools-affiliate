'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#E84C3D';
const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem', boxSizing: 'border-box' };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' };
const btnStyle = { padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' };

export default function HomepageControls() {
  const [settings, setSettings] = useState(null);
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(setSettings).catch(() => {});
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    setMsg('✅ Saved!');
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const update = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  const toggleFeatured = (id) => {
    const ids = settings.featuredProductIds || [];
    update('featuredProductIds', ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);
  };

  const moveFeatured = (id, dir) => {
    const ids = [...(settings.featuredProductIds || [])];
    const idx = ids.indexOf(id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= ids.length) return;
    [ids[idx], ids[newIdx]] = [ids[newIdx], ids[idx]];
    update('featuredProductIds', ids);
  };

  if (!settings) return <p>Loading...</p>;

  const featuredIds = settings.featuredProductIds || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>🏠 Homepage Controls</h2>
        <button onClick={save} disabled={saving} style={{ ...btnStyle, background: ACCENT, color: '#fff' }}>
          {saving ? 'Saving...' : '💾 Save Changes'}
        </button>
      </div>

      {msg && <div style={{ padding: '0.5rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg}</div>}

      {/* Hero Section */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🎯 Hero Section</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Headline</label>
          <input style={inputStyle} value={settings.heroHeadline || ''} onChange={e => update('heroHeadline', e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Subheadline</label>
          <textarea style={{ ...inputStyle, minHeight: '80px' }} value={settings.heroSubheadline || ''} onChange={e => update('heroSubheadline', e.target.value)} />
        </div>
      </div>

      {/* Stats Bar */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📊 Stats Bar</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Creators</label>
            <input style={inputStyle} value={settings.statsCreators || ''} onChange={e => update('statsCreators', e.target.value)} placeholder="50K" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Products</label>
            <input style={inputStyle} value={settings.statsProducts || ''} onChange={e => update('statsProducts', e.target.value)} placeholder="68" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Reviews</label>
            <input style={inputStyle} value={settings.statsReviews || ''} onChange={e => update('statsReviews', e.target.value)} placeholder="200+" />
          </div>
        </div>
      </div>

      {/* Newsletter Copy */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>📧 Newsletter Signup Copy</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Headline</label>
          <input style={inputStyle} value={settings.newsletterHeadline || ''} onChange={e => update('newsletterHeadline', e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Subtext</label>
          <input style={inputStyle} value={settings.newsletterSubtext || ''} onChange={e => update('newsletterSubtext', e.target.value)} />
        </div>
      </div>

      {/* Featured Products */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>⭐ Featured Products</h3>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>Toggle products to feature on homepage. Use arrows to reorder.</p>

        {/* Currently featured */}
        {featuredIds.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Featured (in order):</div>
            {featuredIds.map((id, idx) => {
              const p = products.find(pr => pr.id === id);
              if (!p) return null;
              return (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: '#eff6ff', borderRadius: '6px', marginBottom: '0.25rem' }}>
                  <button onClick={() => moveFeatured(id, -1)} disabled={idx === 0} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: idx === 0 ? 0.3 : 1 }}>⬆️</button>
                  <button onClick={() => moveFeatured(id, 1)} disabled={idx === featuredIds.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: idx === featuredIds.length - 1 ? 0.3 : 1 }}>⬇️</button>
                  <span style={{ flex: 1, fontSize: '0.85rem', color: '#111827' }}>{p.name}</span>
                  <button onClick={() => toggleFeatured(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.8rem' }}>Remove</button>
                </div>
              );
            })}
          </div>
        )}

        {/* All products toggle */}
        <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          {products.filter(p => !featuredIds.includes(p.id)).map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>{p.name}</span>
              <button onClick={() => toggleFeatured(p.id)} style={{ ...btnStyle, background: '#eff6ff', color: ACCENT, fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>+ Feature</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
