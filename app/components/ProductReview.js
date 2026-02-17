'use client';

import { useEffect, useRef } from 'react';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const partial = rating - fullStars;
  const emptyStars = 5 - fullStars - (partial > 0 ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`f${i}`} style={{ color: '#f59e0b', fontSize: '1.3rem' }}>★</span>
      ))}
      {partial > 0 && (
        <span style={{ position: 'relative', fontSize: '1.3rem' }}>
          <span style={{ color: '#d1d5db' }}>★</span>
          <span style={{
            position: 'absolute', top: 0, left: 0, overflow: 'hidden',
            width: `${partial * 100}%`, color: '#f59e0b'
          }}>★</span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`e${i}`} style={{ color: '#d1d5db', fontSize: '1.3rem' }}>★</span>
      ))}
      <span style={{ marginLeft: '0.5rem', fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductReview({ product, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product || !product.review) return null;

  const { review } = product;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '1rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{
        backgroundColor: '#fff', borderRadius: '1rem', maxWidth: '600px', width: '100%',
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        animation: 'slideUp 0.3s ease-out',
      }}>
        {/* Header with image */}
        <div style={{
          position: 'relative', height: '200px', overflow: 'hidden',
          borderRadius: '1rem 1rem 0 0', backgroundColor: '#f3f4f6'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)'
          }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
              border: 'none', cursor: 'pointer', fontSize: '1.2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
          >✕</button>
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {product.name}
            </h2>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>{product.price}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Rating + Verdict */}
          <div style={{ marginBottom: '1.25rem' }}>
            <StarRating rating={review.rating} />
            <p style={{
              marginTop: '0.5rem', fontSize: '1.05rem', fontWeight: '600',
              color: '#2563EB', lineHeight: '1.4', margin: '0.5rem 0 0 0'
            }}>
              {review.verdict}
            </p>
          </div>

          {/* Pros */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#059669', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>
              ✅ What We Love
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {review.pros.map((pro, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                  fontSize: '0.9rem', color: '#374151', lineHeight: '1.4',
                  padding: '0.4rem 0.6rem', backgroundColor: '#ecfdf5', borderRadius: '0.4rem'
                }}>
                  <span style={{ color: '#059669', flexShrink: 0, marginTop: '0.1rem' }}>+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#dc2626', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>
              ⚠️ Watch Out For
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {review.cons.map((con, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                  fontSize: '0.9rem', color: '#374151', lineHeight: '1.4',
                  padding: '0.4rem 0.6rem', backgroundColor: '#fef2f2', borderRadius: '0.4rem'
                }}>
                  <span style={{ color: '#dc2626', flexShrink: 0, marginTop: '0.1rem' }}>−</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block', width: '100%', padding: '0.85rem',
              background: '#2563EB',
              color: '#fff', textAlign: 'center', borderRadius: '0.6rem',
              textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem',
              cursor: 'pointer', transition: 'opacity 0.2s', boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View & Buy (Affiliate Link) →
          </a>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
            We earn a 2-5% commission when you buy through our link — at no extra cost to you
          </p>
        </div>
      </div>
    </div>
  );
}
