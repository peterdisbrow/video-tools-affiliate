'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#E84C3D';
const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem', boxSizing: 'border-box' };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' };
const btnStyle = { padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' };

export default function SiteSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(setSettings).catch(() => {});
  }, []);

  const update = (key, val) => setSettings(s => ({ ...s, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    setMsg('✅ Settings saved!');
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) { setPwMsg('Password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { setPwMsg('Passwords do not match'); return; }
    // Store in settings for simplicity (in production, use proper hashing)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword: newPassword }),
    });
    setPwMsg('✅ Password updated! (Takes effect on next login)');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwMsg(''), 5000);
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>⚙️ Site Settings</h2>
        <button onClick={save} disabled={saving} style={{ ...btnStyle, background: ACCENT, color: '#fff' }}>
          {saving ? 'Saving...' : '💾 Save Settings'}
        </button>
      </div>

      {msg && <div style={{ padding: '0.5rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg}</div>}

      {/* General */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🌐 General</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Site Name</label>
            <input style={inputStyle} value={settings.siteName || ''} onChange={e => update('siteName', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Tagline</label>
            <input style={inputStyle} value={settings.tagline || ''} onChange={e => update('tagline', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Contact Email</label>
            <input style={inputStyle} type="email" value={settings.contactEmail || ''} onChange={e => update('contactEmail', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🔧 Maintenance Mode</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.maintenanceMode || false}
              onChange={e => update('maintenanceMode', e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontSize: '0.9rem', color: '#374151' }}>Enable maintenance mode</span>
          </label>
          {settings.maintenanceMode && (
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
              ⚠️ Site is in maintenance mode
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>When enabled, visitors see a maintenance page instead of the site.</p>
      </div>

      {/* Affiliate Tag */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🏷️ Affiliate Tag</h3>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Amazon Affiliate Tag</label>
          <input style={{ ...inputStyle, maxWidth: '300px' }} value={settings.affiliateTag || ''} onChange={e => update('affiliateTag', e.target.value)} />
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>Used in all Amazon product links (e.g. disbrowproduc-20)</p>
        </div>
      </div>

      {/* Password Change */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>🔒 Change Admin Password</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '500px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>New Password</label>
            <input style={inputStyle} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Confirm Password</label>
            <input style={inputStyle} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <button onClick={changePassword} style={{ ...btnStyle, background: '#dc2626', color: '#fff', marginTop: '1rem' }}>
          🔑 Change Password
        </button>
        {pwMsg && <p style={{ fontSize: '0.85rem', color: pwMsg.startsWith('✅') ? '#166534' : '#ef4444', marginTop: '0.5rem' }}>{pwMsg}</p>}
      </div>
    </div>
  );
}
