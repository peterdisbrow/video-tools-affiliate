#!/usr/bin/env node

/**
 * Update Blog Post Data with New Image Paths
 * Sets all blog posts to use local generated images
 */

const fs = require('fs');
const path = require('path');

// Load blog posts
const { blogPosts } = require('./app/blog/blogData.js');

// Create updated posts with image paths
const updatedPosts = blogPosts.map(post => {
  // Keep the original image as fallback, but add our new generated image path
  return {
    ...post,
    heroImage: `/images/blog/${post.slug}-hero.jpg`,
    fallbackImage: post.image, // Keep original as fallback
    imageAlt: post.title,
    imageCaption: `${post.title} - A complete review and guide`
  };
});

// Create new blog data file with metadata about images
const newBlogData = `// Auto-generated blog posts for video tools affiliate site
// Updated: ${new Date().toISOString()}
// Note: heroImage paths point to /images/blog/ - these are AI-generated hero images

export const blogPosts = ${JSON.stringify(updatedPosts, null, 2)};

export const getImagePath = (slug) => {
  const post = blogPosts.find(p => p.slug === slug);
  return post?.heroImage || post?.fallbackImage;
};

export const categories = [
  'cameras',
  'audio', 
  'lighting',
  'streaming',
  'software',
  'tripods',
  'accessories'
];

export const getBlogPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category).sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getAllBlogSlugs = () => {
  return blogPosts.map(post => ({ params: { slug: post.slug } }));
};

export const getRelatedPosts = (currentSlug, limit = 5) => {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === current.category)
    .slice(0, limit);
};
`;

// Write the new blog data
fs.writeFileSync('app/blog/blogData.js', newBlogData);
console.log('✓ Updated app/blog/blogData.js with image paths');

// Create a summary
const imageChanges = updatedPosts.map(post => ({
  slug: post.slug,
  category: post.category,
  heroImage: post.heroImage
}));

fs.writeFileSync('blog-image-updates.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  totalUpdated: imageChanges.length,
  changes: imageChanges
}, null, 2));

console.log('✓ Created blog-image-updates.json');
console.log(`\nUpdated ${imageChanges.length} blog posts with heroImage paths`);
console.log('\nImage path format: /images/blog/{slug}-hero.jpg');
console.log('Example: /images/blog/sony-alpha-a7-iv-hero.jpg');

process.exit(0);
