'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#2563EB';
const inputStyle = { width: '100%', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.8rem', boxSizing: 'border-box' };

const SITE_PAGES = [
  { path: '/', title: 'Home' },
  { path: '/products', title: 'Products' },
  { path: '/blog', title: 'Blog' },
  { path: '/guides', title: 'Guides' },
  { path: '/comparisons', title: 'Comparisons' },
  { path: '/comparisons/best-cameras', title: 'Best Cameras' },
  { path: '/comparisons/best-audio-gear', title: 'Best Audio Gear' },
  { path: '/comparisons/lighting-comparison', title: 'Lighting Comparison' },
  { path: '/comparisons/streaming-setups', title: 'Streaming Setups' },
  { path: '/comparisons/video-software', title: 'Video Software' },
  { path: '/about', title: 'About' },
  { path: '/how-we-review', title: 'How We Review' },
  { path: '/free-gear-guide', title: 'Free Gear Guide' },
];

export default function SEOManager() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(setSettings).catch(() => {});
  }, []);

  const seoData = settings?.seoPages || {};

  const updateSeo = (path, field, value) => {
    const current = seoData[path] || {};
    setSettings(s => ({
      ...s,
      seoPages: { ...s.seoPages, [path]: { ...current, [field]: value } },
    }));
  };

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    setMsg('✅ SEO settings saved!');
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const generateMeta = async (page) => {
    setGenerating(g => ({ ...g, [page.path]: true }));
    try {
      const res = await fetch('/api/admin/generate-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageTitle: page.title, pageContent: `Page at ${page.path} on Video Creator Gear site` }),
      });
      const data = await res.json();
      if (data.description) {
        updateSeo(page.path, 'metaDescription', data.description);
      }
    } catch {}
    setGenerating(g => ({ ...g, [page.path]: false }));
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>🔍 SEO Manager</h2>
        <button onClick={save} disabled={saving} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', background: ACCENT, color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
          {saving ? 'Saving...' : '💾 Save All'}
        </button>
      </div>

      {msg && <div style={{ padding: '0.5rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg}</div>}

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600', width: '150px' }}>Page</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Meta Title</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Meta Description</th>
              <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', width: '80px' }}>AI</th>
            </tr>
          </thead>
          <tbody>
            {SITE_PAGES.map(page => {
              const data = seoData[page.path] || {};
              const missingDesc = !data.metaDescription;
              return (
                <tr key={page.path} style={{ borderBottom: '1px solid #f3f4f6', background: missingDesc ? '#fef2f2' : 'transparent' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: '500', color: '#111827' }}>{page.title}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{page.path}</div>
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <input
                      style={inputStyle}
                      value={data.metaTitle || ''}
                      onChange={e => updateSeo(page.path, 'metaTitle', e.target.value)}
                      placeholder={`${page.title} | Video Creator Gear`}
                    />
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <textarea
                      style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }}
                      value={data.metaDescription || ''}
                      onChange={e => updateSeo(page.path, 'metaDescription', e.target.value)}
                      placeholder="Enter meta description..."
                    />
                    {missingDesc && <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>⚠️ Missing</span>}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <button
                      onClick={() => generateMeta(page)}
                      disabled={generating[page.path]}
                      style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      {generating[page.path] ? '⏳' : '🤖'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
