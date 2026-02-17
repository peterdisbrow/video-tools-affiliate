'use client';

import { useState, useEffect, useRef } from 'react';

const ACCENT = '#2563EB';
const categories = ['Audio', 'Camera', 'Lighting', 'Software', 'Streaming', 'Accessories'];

export default function AIBlogWriter() {
  const [brainDump, setBrainDump] = useState('');
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [generatedMd, setGeneratedMd] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const previewRef = useRef(null);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {});
  }, []);

  const generate = async () => {
    if (!brainDump.trim()) return;
    setIsGenerating(true);
    setGeneratedMd('');
    setEditMode(false);

    try {
      const res = await fetch('/api/admin/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brainDump, product, category }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMsg(`Error: ${err.error}`);
        setIsGenerating(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                accumulated += data.text;
                setGeneratedMd(accumulated);
              }
              if (data.done) break;
              if (data.error) { setMsg(`Error: ${data.error}`); break; }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
    setIsGenerating(false);
  };

  const saveToBlog = async () => {
    if (!generatedMd.trim()) return;
    setSaving(true);

    // Auto-generate metadata
    const lines = generatedMd.split('\n');
    const titleLine = lines.find(l => l.startsWith('# ')) || lines.find(l => l.startsWith('## ')) || '';
    const title = titleLine.replace(/^#+\s*/, '').trim() || 'Untitled Post';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    const excerpt = generatedMd.replace(/[#*_`\[\]()]/g, '').slice(0, 200).trim() + '...';
    const today = new Date().toISOString().slice(0, 10);
    const metaDescription = excerpt.slice(0, 155);
    const wordCount = generatedMd.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 250))} min read`;
    const cat = category.toLowerCase() || 'general';

    // Convert markdown to basic HTML
    const content = generatedMd
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul style="list-style-position:inside;">${m}</ul>`)
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[hup])/gm, '')
      .replace(/^(.+)$/gm, (line) => {
        if (line.startsWith('<')) return line;
        return `<p>${line}</p>`;
      });

    const newPost = {
      slug,
      title,
      category: cat,
      date: today,
      readTime,
      metaDescription,
      excerpt,
      image: `/images/blog/${slug}-hero.jpg`,
      rating: 0,
      price: '',
      affiliateLink: '',
      asin: '',
      relatedProducts: [],
      content,
    };

    // Find associated product info
    if (product) {
      const p = products.find(pr => pr.name === product);
      if (p) {
        newPost.price = p.price || '';
        newPost.rating = p.rating || 0;
        newPost.asin = p.asin || '';
        newPost.affiliateLink = p.asin ? `https://www.amazon.com/dp/${p.asin}?tag=disbrowproduc-20` : '';
        newPost.image = p.image || newPost.image;
      }
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: newPost, source: 'blog' }),
      });
      if (res.ok) {
        setMsg(`✅ Saved! Blog post "${title}" published at /blog/${slug}`);
      } else {
        const err = await res.json();
        setMsg(`Error saving: ${err.error}`);
      }
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
    setSaving(false);
  };

  // Simple markdown to HTML for preview
  const renderPreview = (md) => {
    if (!md) return '';
    return md
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.*)$/gm, '<h3 style="font-size:1.1rem;font-weight:600;margin:1rem 0 0.5rem;color:#111827">$1</h3>')
      .replace(/^## (.*)$/gm, '<h2 style="font-size:1.3rem;font-weight:700;margin:1.5rem 0 0.5rem;color:#111827">$1</h2>')
      .replace(/^# (.*)$/gm, '<h1 style="font-size:1.5rem;font-weight:700;margin:1.5rem 0 0.5rem;color:#111827">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*)$/gm, '<li style="margin-left:1.5rem;margin-bottom:0.25rem">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>🤖 AI Blog Writer</h2>
        <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '400' }}>Powered by your local AI</span>
        <a href="/admin/blog" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Posts</a>
      </div>

      {msg && (
        <div style={{ padding: '0.75rem 1rem', background: msg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', border: `1px solid ${msg.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`, borderRadius: '8px', color: msg.startsWith('✅') ? '#166534' : '#991b1b', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: generatedMd ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
        {/* Input Panel */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Tell me about this post...
          </label>
          <textarea
            value={brainDump}
            onChange={e => setBrainDump(e.target.value)}
            placeholder="e.g. I want to write about the Shure SM7B vs Rode PodMic. My take is the SM7B is overrated for beginners. Most people don't have the preamp for it. Rode PodMic is better value. Target: home podcasters. Include that I've used both on broadcast sets."
            style={{
              width: '100%', minHeight: '200px', padding: '0.75rem', borderRadius: '8px',
              border: '1px solid #d1d5db', fontSize: '0.9rem', fontFamily: 'system-ui',
              resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.6',
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Product</label>
              <select
                value={product}
                onChange={e => setProduct(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', boxSizing: 'border-box' }}
              >
                <option value="">None</option>
                {products.map(p => <option key={p.id || p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', boxSizing: 'border-box' }}
              >
                <option value="">Select...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={isGenerating || !brainDump.trim()}
            style={{
              marginTop: '1rem', width: '100%', padding: '0.75rem', borderRadius: '8px',
              border: 'none', background: isGenerating ? '#9ca3af' : ACCENT, color: '#fff',
              fontSize: '1rem', fontWeight: '600', cursor: isGenerating ? 'wait' : 'pointer',
            }}
          >
            {isGenerating ? '✨ Generating...' : '🚀 Generate Post'}
          </button>
        </div>

        {/* Preview Panel */}
        {generatedMd && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                {editMode ? '✏️ Edit' : '👁️ Preview'}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', background: editMode ? '#eff6ff' : '#fff', color: editMode ? ACCENT : '#374151', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500' }}
                >
                  {editMode ? '👁️ Preview' : '✏️ Edit'}
                </button>
                <button
                  onClick={saveToBlog}
                  disabled={saving}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: 'none', background: '#16a34a', color: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  {saving ? 'Saving...' : '💾 Save to Blog'}
                </button>
              </div>
            </div>

            {editMode ? (
              <textarea
                value={generatedMd}
                onChange={e => setGeneratedMd(e.target.value)}
                style={{
                  width: '100%', minHeight: '500px', padding: '0.75rem', borderRadius: '8px',
                  border: '1px solid #d1d5db', fontSize: '0.85rem', fontFamily: 'monospace',
                  resize: 'vertical', boxSizing: 'border-box', lineHeight: '1.5',
                }}
              />
            ) : (
              <div
                ref={previewRef}
                style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#374151' }}
                dangerouslySetInnerHTML={{ __html: renderPreview(generatedMd) }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
