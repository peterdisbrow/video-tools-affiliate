#!/usr/bin/env node

/**
 * Batch Image Generation Coordinator
 * Creates smart image prompts and prepares for generation
 */

const fs = require('fs');
const path = require('path');

// Try to load blog data (which works)
let blogPosts = [];
try {
  const blogData = require('./app/blog/blogData.js');
  blogPosts = blogData.blogPosts;
  console.log(`✓ Loaded ${blogPosts.length} blog posts`);
} catch (e) {
  console.error('✗ Could not load blog posts:', e.message);
}

const promptGenerators = {
  cameras: (title) => `Professional mirrorless camera in bright studio with dramatic lighting, tripod, and modern video production equipment. High-end broadcast quality. Shot composition: product-focused with cinematic depth of field. 1200x630px`,
  audio: (title) => `Professional podcast recording studio with high-end microphone, audio interface, acoustic treatment. Warm professional lighting. Modern content creator setup. 1200x630px`,
  lighting: (title) => `Professional video lighting setup with multiple LED panels, color-graded lights, reflectors, and bright creative lighting environment. Production studio aesthetic. 1200x630px`,
  software: (title) => `Modern video editing or production software interface displayed on professional monitor in cinema production environment. Editing workflow. 1200x630px`,
  streaming: (title) => `Professional streaming setup with camera, microphone, lighting, computer monitors showing streaming interface. Gaming/streaming aesthetic. 1200x630px`,
  tripods: (title) => `Professional camera tripod with mounted cinema camera and lighting in bright production studio. Stable professional equipment. 1200x630px`,
  accessories: (title) => `Professional video production accessories and gear organization in modern studio. Cable management and mounting systems. 1200x630px`
};

// Generate batch manifest
const manifest = {
  timestamp: new Date().toISOString(),
  totalImages: blogPosts.length,
  images: []
};

blogPosts.forEach(post => {
  const generator = promptGenerators[post.category] || promptGenerators.software;
  
  manifest.images.push({
    slug: post.slug,
    title: post.title.substring(0, 60),
    category: post.category,
    imagePath: `/images/blog/${post.slug}-hero.jpg`,
    localPath: `public/images/blog/${post.slug}-hero.jpg`,
    prompt: generator(post.title),
    width: 1200,
    height: 630
  });
});

// Save manifest
fs.writeFileSync(
  'image-generation-batch-manifest.json',
  JSON.stringify(manifest, null, 2)
);

console.log(`\n✓ Generated manifest for ${manifest.totalImages} images`);
console.log(`  Location: image-generation-batch-manifest.json`);
console.log(`\nFirst 5 image prompts:`);
manifest.images.slice(0, 5).forEach((img, i) => {
  console.log(`\n${i + 1}. ${img.slug}`);
  console.log(`   Category: ${img.category}`);
  console.log(`   Size: ${img.width}x${img.height}px`);
  console.log(`   Prompt: ${img.prompt.substring(0, 80)}...`);
});

process.exit(0);
