#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Update ALL hero images in blog posts
 * - Guides: 8 rewritten posts with specific hero images
 * - Blog: 82 total posts with auto-mapped hero images
 */

const GUIDES_FILE = path.join(__dirname, 'app/guides/blogData.js');
const BLOG_FILE = path.join(__dirname, 'app/blog/blogData.js');
const IMAGES_DIR = '/Users/peter/.openclaw/workspace/video-tools-affiliate/public/images/blog';

// Mapping for 8 rewritten posts in guides
const GUIDES_IMAGE_MAP = {
  'pro-audio-on-a-budget-church-livestream': '/images/blog/audio-hero.jpg',
  'video-lighting-101-product-shoot-failed': '/images/blog/lighting-hero.jpg',
  'free-vs-paid-video-editing-software-mistake': '/images/blog/editing-hero.jpg',
  'streaming-gear-essentials-broadcast-failed': '/images/blog/streaming-hero.jpg',
  'best-budget-camera-rigs-travel-tripod-failure': '/images/blog/tripod-hero.jpg',
  'diy-green-screen-setup-expensive-mistake': '/images/blog/green-screen-hero.jpg',
  'youtube-equipment-timeline-5k-mistake': '/images/blog/equipment-timeline-hero.jpg',
  'stabilization-techniques-gimbal-failed-mid-shoot': '/images/blog/stabilization-hero.jpg',
};

// Get all available hero images
function getAvailableImages() {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    return files.filter(f => f.endsWith('-hero.jpg')).sort();
  } catch (error) {
    console.error('Error reading images dir:', error.message);
    return [];
  }
}

// Convert slug to image filename
function slugToImageName(slug) {
  return `${slug}-hero.jpg`;
}

// Update guides file (8 rewritten posts)
function updateGuidesFile() {
  console.log('\n📝 Updating app/guides/blogData.js...');
  
  let content = fs.readFileSync(GUIDES_FILE, 'utf8');
  let updated = 0;

  Object.entries(GUIDES_IMAGE_MAP).forEach(([slug, imagePath]) => {
    // Find the post object for this slug
    const slugPattern = `"slug": "${slug}"`;
    if (content.includes(slugPattern)) {
      // Replace the image field for this post
      // Look for: "image": "..." within this post object
      const postStartIdx = content.indexOf(slugPattern);
      const postEndIdx = content.indexOf('},', postStartIdx) + 2;
      const postContent = content.substring(postStartIdx, postEndIdx);
      
      // Replace image URL
      const oldImagePattern = /"image": "[^"]*"/;
      const newImagePattern = `"image": "${imagePath}"`;
      const updatedPost = postContent.replace(oldImagePattern, newImagePattern);
      
      content = content.substring(0, postStartIdx) + updatedPost + content.substring(postEndIdx);
      updated++;
      console.log(`  ✓ ${slug} → ${imagePath}`);
    }
  });

  fs.writeFileSync(GUIDES_FILE, content, 'utf8');
  console.log(`✅ Updated ${updated} posts in guides`);
}

// Update blog file (all 82 posts with auto-mapping)
function updateBlogFile() {
  console.log('\n📝 Updating app/blog/blogData.js...');
  
  let content = fs.readFileSync(BLOG_FILE, 'utf8');
  
  // Extract all posts first to get slugs
  const postMatches = [...content.matchAll(/"slug": "([^"]+)"/g)];
  console.log(`Found ${postMatches.length} posts in blog file`);
  
  let updated = 0;
  const missingImages = [];

  postMatches.forEach((match) => {
    const slug = match[1];
    const imageName = slugToImageName(slug);
    const imagePath = `/images/blog/${imageName}`;
    
    // Check if image exists
    const imagePath_full = path.join(IMAGES_DIR, imageName);
    if (!fs.existsSync(imagePath_full)) {
      missingImages.push(slug);
      return;
    }

    // Find the post object and replace its image
    const slugPattern = `"slug": "${slug}"`;
    const slugIdx = content.indexOf(slugPattern);
    if (slugIdx !== -1) {
      // Find the image field in this post (within next 500 chars)
      const searchStart = slugIdx;
      const searchEnd = content.indexOf('},', slugIdx);
      const segment = content.substring(searchStart, searchEnd);
      
      const imagePattern = /"image": "[^"]*"/;
      if (imagePattern.test(segment)) {
        const newSegment = segment.replace(imagePattern, `"image": "${imagePath}"`);
        content = content.substring(0, searchStart) + newSegment + content.substring(searchEnd);
        updated++;
      }
    }
  });

  fs.writeFileSync(BLOG_FILE, content, 'utf8');
  console.log(`✅ Updated ${updated} posts in blog file`);
  
  if (missingImages.length > 0) {
    console.warn(`⚠️  Missing images for ${missingImages.length} posts:`, missingImages);
  }
}

// Main
console.log('🚀 Starting hero image update...');
console.log(`Images available: ${getAvailableImages().length}`);

updateGuidesFile();
updateBlogFile();

console.log('\n✨ All updates complete!');
