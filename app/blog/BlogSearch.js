'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { blogPosts } from './blogData';

// Fuzzy search utility - simple substring match with scoring
function fuzzyScore(query, text) {
  if (!query || !text) return 0;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  
  // Exact match scores highest
  if (t === q) return 100;
  
  // Start of string match
  if (t.startsWith(q)) return 80;
  
  // Word boundary match
  if (t.includes(` ${q}`)) return 60;
  
  // Substring match
  const index = t.indexOf(q);
  if (index !== -1) return 50 - (index / t.length) * 10;
  
  // No match
  return 0;
}

// Extract content snippet from HTML
function extractSnippet(htmlContent, query, length = 60) {
  // Remove HTML tags
  const text = htmlContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (!query) return text.substring(0, length) + '...';
  
  const lowerText = text.toLowerCase();
  const queryLower = query.toLowerCase();
  const index = lowerText.indexOf(queryLower);
  
  if (index === -1) {
    return text.substring(0, length) + '...';
  }
  
  const start = Math.max(0, index - 30);
  const end = Math.min(text.length, index + query.length + 30);
  
  return '...' + text.substring(start, end) + '...';
}

// Build search index
function buildSearchIndex(posts) {
  return posts.map((post) => ({
    ...post,
    searchText: `${post.title} ${post.excerpt} ${post.category} ${post.metaDescription || ''} ${post.content || ''}`
      .toLowerCase(),
    searchTokens: [
      ...post.title.toLowerCase().split(/\s+/),
      ...post.category.toLowerCase().split(/\s+/),
      ...post.excerpt.toLowerCase().split(/\s+/),
    ].filter(Boolean),
  }));
}

// Performance: Create search index once
const searchIndex = buildSearchIndex(blogPosts);

export default function BlogSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Memoized search results with debounce effect
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.trim().toLowerCase();
    
    const scored = searchIndex
      .map((post) => {
        // Score based on title match (highest priority)
        const titleScore = fuzzyScore(q, post.title) * 3;
        
        // Score based on category match
        const categoryScore = fuzzyScore(q, post.category) * 2;
        
        // Score based on excerpt
        const excerptScore = fuzzyScore(q, post.excerpt);
        
        // Score based on general search text
        const textScore = post.searchText.includes(q) ? 10 : 0;
        
        const totalScore = titleScore + categoryScore + excerptScore + textScore;
        
        return {
          ...post,
          score: totalScore,
        };
      })
      .filter((post) => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Limit to 8 results
    
    return scored;
  }, [query]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!isOpen && results.length > 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        setSelectedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/blog/${results[selectedIndex].slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search posts by title, category, product... (e.g., 'Sony', 'audio', 'wireless')"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.trim().length > 0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            fontSize: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            transition: 'all 0.2s ease',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.matches(':focus')) {
              e.currentTarget.style.borderColor = '#d1d5db';
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.matches(':focus')) {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }
          }}
          onKeyUp={(e) => {
            if (e.currentTarget.matches(':focus')) {
              e.currentTarget.style.borderColor = '#E84C3D';
            }
          }}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px 8px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E84C3D')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
            title="Clear search"
          >
            ✕
          </button>
        )}

        {/* Search Icon */}
        {!query && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              pointerEvents: 'none',
              fontSize: '1.1rem',
            }}
          >
            🔍
          </span>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '2px solid #E84C3D',
            borderTop: 'none',
            borderRadius: '0 0 0.5rem 0.5rem',
            maxHeight: '500px',
            overflowY: 'auto',
            zIndex: 50,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            animation: 'slideDown 0.2s ease forwards',
          }}
        >
          {results.map((result, index) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: index < results.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: selectedIndex === index ? '#f3f4f6' : 'transparent',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '4px',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      flex: 1,
                    }}
                  >
                    {result.title.length > 60
                      ? result.title.substring(0, 60) + '...'
                      : result.title}
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Category Tag */}
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      padding: '2px 8px',
                      borderRadius: '0.25rem',
                      textTransform: 'capitalize',
                    }}
                  >
                    {result.category}
                  </span>

                  {/* Read Time */}
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {result.readTime}
                  </span>
                </div>

                {/* Snippet */}
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    lineHeight: '1.4',
                  }}
                >
                  {extractSnippet(result.content, query, 65)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '2px solid #fee2e2',
            borderTop: 'none',
            borderRadius: '0 0 0.5rem 0.5rem',
            padding: '20px 16px',
            textAlign: 'center',
            zIndex: 50,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '0.95rem' }}>
            No posts found for <strong>"{query}"</strong>
          </p>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#9ca3af' }}>
            Try searching for categories like "cameras", "audio", "lighting" or product names like "Sony", "Rode", "Shure"
          </p>
        </div>
      )}

      {/* CSS for animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth scrolling in dropdown */
        div[style*="maxHeight: 500px"] {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
