#!/usr/bin/env node

/**
 * Hero Image Generation Script
 * Generates hero images (1200x630px) for all blog and guide posts
 * Uses image generation API via Nano Banana Pro (Gemini 3)
 */

const fs = require('fs');
const path = require('path');

// Import blog data
const blogBlogPosts = require('./app/blog/blogData.js').blogPosts;
const guideBlogPosts = require('./app/guides/blogData.js').blogPosts;

// Category-specific image prompt generators
const promptGenerators = {
  cameras: (title) => {
    return `Professional high-quality product photography of a mirrorless camera or video camera setup in a bright studio. Include tripod, lighting, and modern video production environment. Style: clean, professional, magazine-quality photography. 1200x630px hero image for blog post about ${title}`;
  },
  audio: (title) => {
    return `Professional podcast or streaming studio setup with high-end microphone, audio interface, and professional acoustic treatment. Modern, clean studio aesthetic with warm professional lighting. 1200x630px hero image for blog post about ${title}`;
  },
  lighting: (title) => {
    return `Professional video production lighting setup with multiple LED lights, softboxes, and reflectors creating a well-lit studio environment. Shows professional color grading and lighting techniques. 1200x630px hero image for blog post about ${title}`;
  },
  software: (title) => {
    return `Modern video editing or production software interface displayed on a high-end computer monitor in a professional studio environment. Shows editing timeline, color correction, and creative tools. 1200x630px hero image for blog post about ${title}`;
  },
  streaming: (title) => {
    return `Professional live streaming setup with camera, lighting, microphone, and computer monitors showing streaming software and chat interface. Modern gaming/streaming aesthetic. 1200x630px hero image for blog post about ${title}`;
  },
  tripods: (title) => {
    return `Professional camera tripod with mounted camera and lighting in a bright studio or on-location video shoot. Shows stable, professional equipment setup. 1200x630px hero image for blog post about ${title}`;
  },
  accessories: (title) => {
    return `Collection of professional video production accessories including cable management, mounting systems, and gear organization in a modern studio. Shows professional setup aesthetic. 1200x630px hero image for blog post about ${title}`;
  }
};

function generateImagePrompt(post) {
  const generator = promptGenerators[post.category] || promptGenerators.software;
  return generator(post.title.substring(0, 50));
}

function getImagePath(slug, type = 'blog') {
  const filename = `${slug}-hero.jpg`;
  return `/images/${type}/${filename}`;
}

function getLocalImagePath(slug, type = 'blog') {
  const filename = `${slug}-hero.jpg`;
  return path.join(__dirname, 'public', 'images', type, filename);
}

// Generate manifest of images to create
function generateManifest() {
  const manifest = {
    timestamp: new Date().toISOString(),
    totalImages: 0,
    blog: [],
    guides: []
  };

  // Blog posts
  blogBlogPosts.forEach(post => {
    manifest.blog.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      imagePath: getImagePath(post.slug, 'blog'),
      localPath: getLocalImagePath(post.slug, 'blog'),
      prompt: generateImagePrompt(post)
    });
    manifest.totalImages++;
  });

  // Guide posts
  guideBlogPosts.forEach(post => {
    manifest.guides.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      imagePath: getImagePath(post.slug, 'guides'),
      localPath: getLocalImagePath(post.slug, 'guides'),
      prompt: generateImagePrompt(post)
    });
    manifest.totalImages++;
  });

  return manifest;
}

// Main execution
const manifest = generateManifest();
console.log(`Generated manifest for ${manifest.totalImages} images`);
console.log(`Blog images: ${manifest.blog.length}`);
console.log(`Guide images: ${manifest.guides.length}`);

// Save manifest
fs.writeFileSync(
  path.join(__dirname, 'image-generation-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('\nManifest saved to image-generation-manifest.json');
console.log('\nFirst 5 blog post prompts:');
manifest.blog.slice(0, 5).forEach((item, i) => {
  console.log(`\n${i + 1}. ${item.slug}`);
  console.log(`   Prompt: ${item.prompt.substring(0, 100)}...`);
  console.log(`   Output: ${item.imagePath}`);
});

process.exit(0);
