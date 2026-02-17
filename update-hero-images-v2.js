#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Update hero images in blog posts - Version 2
 * Uses regex-based replacements to avoid breaking file structure
 */

const GUIDES_FILE = path.join(__dirname, 'app/guides/blogData.js');
const BLOG_FILE = path.join(__dirname, 'app/blog/blogData.js');
const IMAGES_DIR = '/Users/peter/.openclaw/workspace/video-tools-affiliate/public/images/blog';

// Mapping for 8 rewritten posts in guides
const GUIDES_IMAGE_MAP = {
  'pro-audio-on-a-budget-church-livestream': 'audio-hero.jpg',
  'video-lighting-101-product-shoot-failed': 'lighting-hero.jpg',
  'free-vs-paid-video-editing-software-mistake': 'editing-hero.jpg',
  'streaming-gear-essentials-broadcast-failed': 'streaming-hero.jpg',
  'best-budget-camera-rigs-travel-tripod-failure': 'tripod-hero.jpg',
  'diy-green-screen-setup-expensive-mistake': 'green-screen-hero.jpg',
  'youtube-equipment-timeline-5k-mistake': 'equipment-timeline-hero.jpg',
  'stabilization-techniques-gimbal-failed-mid-shoot': 'stabilization-hero.jpg',
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

// Update guides file (8 rewritten posts with specific images)
function updateGuidesFile() {
  console.log('\n📝 Updating app/guides/blogData.js...');
  
  let content = fs.readFileSync(GUIDES_FILE, 'utf8');
  let updated = 0;

  Object.entries(GUIDES_IMAGE_MAP).forEach(([slug, imageName]) => {
    // Find this specific post and update its image field only
    // Look for: "slug": "{slug}" ... "image": "..."
    
    const slugRegex = new RegExp(`"slug":\\s*"${slug.replace(/[.*+?^${}()|\\[\]\\\\]/g, '\\$&')}"`, 'g');
    
    let match;
    while ((match = slugRegex.exec(content)) !== null) {
      // Find the image field after this slug (within the next 1000 chars)
      const startIdx = match.index;
      const searchArea = content.substring(startIdx, startIdx + 1500);
      
      // Find the closing brace of this object
      let braceDepth = 0;
      let objectEnd = startIdx;
      for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') braceDepth++;
        if (content[i] === '}') {
          braceDepth--;
          if (braceDepth === 0) {
            objectEnd = i;
            break;
          }
        }
      }
      
      const objectContent = content.substring(startIdx, objectEnd + 1);
      const imagePattern = /"image":\s*"[^"]*"/;
      
      if (imagePattern.test(objectContent)) {
        const newObjectContent = objectContent.replace(imagePattern, `"image": "/images/blog/${imageName}"`);
        content = content.substring(0, startIdx) + newObjectContent + content.substring(objectEnd + 1);
        updated++;
        console.log(`  ✓ ${slug} → ${imageName}`);
      }
    }
  });

  fs.writeFileSync(GUIDES_FILE, content, 'utf8');
  console.log(`✅ Updated ${updated} posts in guides`);
}

// Update blog file (all posts with auto-mapping)
function updateBlogFile() {
  console.log('\n📝 Updating app/blog/blogData.js...');
  
  let content = fs.readFileSync(BLOG_FILE, 'utf8');
  
  // Extract all slugs
  const slugMatches = [...content.matchAll(/"slug":\s*"([^"]+)"/g)];
  console.log(`Found ${slugMatches.length} posts in blog file`);
  
  let updated = 0;
  const missingImages = [];

  slugMatches.forEach((match) => {
    const slug = match[1];
    const imageName = `${slug}-hero.jpg`;
    const imagePath_full = path.join(IMAGES_DIR, imageName);
    
    // Check if image exists
    if (!fs.existsSync(imagePath_full)) {
      missingImages.push(slug);
      return;
    }

    // Find this post object and update its image field
    const slugRegex = new RegExp(`"slug":\\s*"${slug.replace(/[.*+?^${}()|\\[\]\\\\]/g, '\\$&')}"`, 'g');
    
    const match2 = slugRegex.exec(content);
    if (match2) {
      const startIdx = match2.index;
      
      // Find the closing brace of this object
      let braceDepth = 0;
      let objectEnd = startIdx;
      for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') braceDepth++;
        if (content[i] === '}') {
          braceDepth--;
          if (braceDepth === 0) {
            objectEnd = i;
            break;
          }
        }
      }
      
      const objectContent = content.substring(startIdx, objectEnd + 1);
      const imagePattern = /"image":\s*"[^"]*"/;
      
      if (imagePattern.test(objectContent)) {
        const newObjectContent = objectContent.replace(imagePattern, `"image": "/images/blog/${imageName}"`);
        content = content.substring(0, startIdx) + newObjectContent + content.substring(objectEnd + 1);
        updated++;
      }
    }
  });

  fs.writeFileSync(BLOG_FILE, content, 'utf8');
  console.log(`✅ Updated ${updated} posts in blog file`);
  
  if (missingImages.length > 0) {
    console.warn(`⚠️  Missing images for ${missingImages.length} posts`);
  }
}

// Main
console.log('🚀 Starting hero image update v2...');
console.log(`Images available: ${getAvailableImages().length}`);

try {
  updateGuidesFile();
  updateBlogFile();
  console.log('\n✨ All updates complete!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
