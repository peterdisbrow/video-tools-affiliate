'use client';

import { useState, useEffect, useCallback } from 'react';

const CATEGORIES = ['cameras', 'audio', 'lighting', 'software', 'streaming', 'accessories'];
const AFFILIATE_TAG = 'disbrowproduc-20';
const AMAZON_BASE = 'https://www.amazon.com/dp/';

const emptyProduct = { name: '', category: 'cameras', asin: '', price: '', rating: '', description: '', image: '', affiliateLink: '' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ ...emptyProduct });
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [search, setSearch] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchProducts = useCallback(async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Real-time affiliate link preview
  const linkPreview = form.asin && /^[A-Za-z0-9]{10}$/.test(form.asin.trim())
    ? `${AMAZON_BASE}${form.asin.trim().toUpperCase()}?tag=${AFFILIATE_TAG}`
    : form.affiliateLink || '';

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) { showToast('❌ Product name is required'); return false; }
    if (!form.price.trim()) { showToast('❌ Price is required'); return false; }
    if (form.asin && !/^[A-Za-z0-9]{10}$/.test(form.asin.trim())) { showToast('❌ ASIN must be 10 alphanumeric characters'); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const product = { ...form, rating: form.rating ? parseFloat(form.rating) : 0 };
    if (product.asin) product.asin = product.asin.trim().toUpperCase();
    const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product }) });
    if (res.ok) {
      showToast(editing ? '✅ Product updated!' : '✅ Product added!');
      setForm({ ...emptyProduct });
      setEditing(false);
      fetchProducts();
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p, rating: p.rating?.toString() || '' });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id }) });
    showToast('🗑️ Product deleted');
    fetchProducts();
  };

  const handleCancel = () => { setForm({ ...emptyProduct }); setEditing(false); };

  const handleBulkImport = async () => {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    const newProducts = lines.map(line => {
      const parts = line.split(',').map(s => s.trim());
      return { name: parts[0] || 'Unnamed', category: parts[1] || 'accessories', asin: parts[2] || '', price: parts[3] || '$0', rating: parseFloat(parts[4]) || 0, description: parts[5] || '' };
    });
    await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'bulk', products: newProducts }) });
    showToast(`✅ Imported ${newProducts.length} products`);
    setBulkText('');
    setShowBulk(false);
    fetchProducts();
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ products, affiliateTag: AFFILIATE_TAG }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'products.json'; a.click();
    URL.revokeObjectURL(url);
    showToast('📦 Exported products.json');
  };

  const filtered = search ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase())) : products;

  // Styles
  const s = {
    page: { minHeight: '100vh', background: '#0a0a0a', color: '#e0e0e0', fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    card: { background: '#1a1a2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' },
    input: { width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #333', background: '#0f0f23', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' },
    select: { width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #333', background: '#0f0f23', color: '#fff', fontSize: '0.9rem' },
    btn: { padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' },
    primary: { background: '#6c5ce7', color: '#fff' },
    danger: { background: '#e74c3c', color: '#fff' },
    secondary: { background: '#2d3436', color: '#fff' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    label: { display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem', color: '#888' },
    toast: { position: 'fixed', top: '1rem', right: '1rem', background: '#1a1a2e', border: '1px solid #6c5ce7', padding: '1rem 1.5rem', borderRadius: '10px', zIndex: 9999, fontSize: '0.95rem' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' },
    th: { textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #333', color: '#888', fontWeight: 600 },
    td: { padding: '0.75rem', borderBottom: '1px solid #1a1a2e' },
  };

  return (
    <div style={s.page}>
      {toast && <div style={s.toast}>{toast}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>📦 Product Manager</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setShowBulk(!showBulk)} style={{ ...s.btn, ...s.secondary }}>📋 Bulk Import</button>
          <button onClick={handleExport} style={{ ...s.btn, ...s.secondary }}>⬇️ Export</button>
        </div>
      </div>

      {/* Product Form */}
      <div style={s.card}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>{editing ? '✏️ Edit Product' : '➕ Add Product'}</h2>
        <div style={s.grid}>
          <div>
            <label style={s.label}>Product Name *</label>
            <input name="name" value={form.name} onChange={handleChange} style={s.input} placeholder="Sony Alpha a7 IV" />
          </div>
          <div>
            <label style={s.label}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={s.select}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>ASIN</label>
            <input name="asin" value={form.asin} onChange={handleChange} style={s.input} placeholder="B09JZRWRJN" maxLength={10} />
          </div>
          <div>
            <label style={s.label}>Price *</label>
            <input name="price" value={form.price} onChange={handleChange} style={s.input} placeholder="$2,498" />
          </div>
          <div>
            <label style={s.label}>Rating (0-5)</label>
            <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} style={s.input} placeholder="4.8" />
          </div>
          <div>
            <label style={s.label}>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} style={s.input} placeholder="https://..." />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={s.label}>Affiliate Link (for non-Amazon products)</label>
            <input name="affiliateLink" value={form.affiliateLink} onChange={handleChange} style={s.input} placeholder="https://..." />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={s.label}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...s.input, resize: 'vertical' }} placeholder="Product description..." />
          </div>
        </div>

        {/* Link Preview */}
        {linkPreview && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0f0f23', borderRadius: '8px', fontSize: '0.85rem', wordBreak: 'break-all' }}>
            🔗 <strong>Affiliate Link:</strong>{' '}
            <a href={linkPreview} target="_blank" rel="noopener noreferrer" style={{ color: '#6c5ce7' }}>{linkPreview}</a>
          </div>
        )}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSave} style={{ ...s.btn, ...s.primary }}>{editing ? 'Update Product' : 'Add Product'}</button>
          {editing && <button onClick={handleCancel} style={{ ...s.btn, ...s.secondary }}>Cancel</button>}
          {form.asin && (
            <button onClick={() => { navigator.clipboard.writeText(linkPreview); showToast('📋 Link copied!'); }} style={{ ...s.btn, ...s.secondary }}>
              📋 Copy Link
            </button>
          )}
        </div>
      </div>

      {/* Bulk Import */}
      {showBulk && (
        <div style={s.card}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>📋 Bulk Import</h2>
          <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>
            One product per line: <code>Name, Category, ASIN, Price, Rating, Description</code>
          </p>
          <textarea value={bulkText} onChange={(e) => setBulkText(e.target.value)} rows={6} style={{ ...s.input, resize: 'vertical', marginBottom: '0.75rem' }}
            placeholder="Sony Alpha a7 IV, cameras, B09JZRWRJN, $2498, 4.8, Great camera" />
          <button onClick={handleBulkImport} style={{ ...s.btn, ...s.primary }}>Import</button>
        </div>
      )}

      {/* Products Table */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>📦 Products ({filtered.length})</h2>
          <input value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...s.input, width: '250px' }} placeholder="Search products..." />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Name</th>
                <th style={s.th}>Category</th>
                <th style={s.th}>ASIN</th>
                <th style={s.th}>Price</th>
                <th style={s.th}>Rating</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#16213e'} onMouseLeave={(e) => e.currentTarget.style.background = ''}>
                  <td style={s.td}>{p.name}</td>
                  <td style={s.td}><span style={{ background: '#2d3436', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>{p.category}</span></td>
                  <td style={{ ...s.td, fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.asin || '—'}</td>
                  <td style={s.td}>{p.price}</td>
                  <td style={s.td}>{'⭐'.repeat(Math.round(p.rating || 0))} {p.rating}</td>
                  <td style={s.td}>
                    <button onClick={() => handleEdit(p)} style={{ ...s.btn, ...s.secondary, padding: '0.3rem 0.6rem', marginRight: '0.3rem', fontSize: '0.8rem' }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={{ ...s.btn, ...s.danger, padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', color: '#666' }}>No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
