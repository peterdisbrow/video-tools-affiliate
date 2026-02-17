'use client';

import { useState, useEffect } from 'react';

const ACCENT = '#E84C3D';
const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem', boxSizing: 'border-box' };
const btnStyle = { padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' };

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/products?source=blog');
    const data = await res.json();
    setPosts(data.products || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);
  const showMsg = (m) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const startEdit = (post) => { setEditing(post.slug); setForm({ ...post }); };
  const startNew = () => {
    setEditing('new');
    setForm({ slug: '', title: '', category: '', content: '', excerpt: '', metaDescription: '', date: new Date().toISOString().slice(0, 10), readTime: '5 min read', image: '', price: '', rating: 0, affiliateLink: '', asin: '' });
  };

  const save = async () => {
    if (!form.slug) { showMsg('Slug is required'); return; }
    if (editing === 'new') {
      await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product: form, source: 'blog' }) });
      showMsg('Post added');
    } else {
      await fetch('/api/admin/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: editing, updates: form, source: 'blog' }) });
      showMsg('Post updated');
    }
    setEditing(null);
    fetchPosts();
  };

  const deletePost = async (slug) => {
    if (!confirm(`Delete ${slug}?`)) return;
    await fetch('/api/admin/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, source: 'blog' }) });
    showMsg('Post deleted');
    fetchPosts();
  };

  const filtered = posts.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()) || p.slug?.toLowerCase().includes(search.toLowerCase()));

  if (editing) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{editing === 'new' ? 'New Blog Post' : 'Edit Post'}</h2>
          <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }}>← Back</button>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['slug', 'Slug'], ['title', 'Title'], ['category', 'Category'], ['date', 'Date'], ['readTime', 'Read Time'], ['image', 'Image URL']].map(([k, l]) => (
              <div key={k}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>{l}</label>
                <input style={inputStyle} value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Excerpt</label>
            <textarea style={{ ...inputStyle, minHeight: '80px' }} value={form.excerpt || ''} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Meta Description</label>
            <textarea style={{ ...inputStyle, minHeight: '80px' }} value={form.metaDescription || ''} onChange={e => setForm({ ...form, metaDescription: e.target.value })} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Content (HTML/Markdown)</label>
            <textarea style={{ ...inputStyle, minHeight: '400px', fontFamily: 'monospace', fontSize: '0.8rem' }} value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} />
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <button onClick={save} style={{ ...btnStyle, background: ACCENT, color: '#fff' }}>💾 Save</button>
            <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: '#f3f4f6', color: '#374151' }}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>Blog Posts ({posts.length})</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href="/admin/blog/new" style={{ ...btnStyle, background: '#16a34a', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>🤖 AI Writer</a>
          <button onClick={startNew} style={{ ...btnStyle, background: ACCENT, color: '#fff' }}>+ New Post</button>
        </div>
      </div>
      {msg && <div style={{ padding: '0.5rem 1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg}</div>}
      <input placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, marginBottom: '1rem', maxWidth: '400px' }} />
      {loading ? <p>Loading...</p> : (
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Title</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Category</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.slug} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem', maxWidth: '400px' }}>
                    <div style={{ fontWeight: '500', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title?.split(':')[0]}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{p.slug}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}><span style={{ background: '#eff6ff', color: ACCENT, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{p.category}</span></td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>{p.date}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(p)} style={{ ...btnStyle, background: '#eff6ff', color: ACCENT, marginRight: '0.5rem' }}>Edit</button>
                    <button onClick={() => deletePost(p.slug)} style={{ ...btnStyle, background: '#fef2f2', color: '#ef4444' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
