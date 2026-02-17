#!/usr/bin/env node

/**
 * Hero Image Batch Generation Script
 * Generates 82 professional hero images for blog posts
 * Uses multiple strategies:
 * 1. Canvas-based gradients with professional design
 * 2. Placeholder system for batch processing
 * 3. Ready for API integration (Replicate, Banana, etc.)
 */

const fs = require('fs');
const path = require('path');
const { Canvas, createCanvas } = require('canvas');

// Load manifest
const manifestPath = path.join(__dirname, 'image-generation-batch-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const PUBLIC_DIR = path.join(__dirname, 'public/images/blog');
const RESULTS_FILE = 'hero-images-generation-results.json';

// Ensure output directory
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Category-specific color schemes
const categoryColors = {
  cameras: {
    primary: '#1E3A8A',      // Deep blue
    secondary: '#3B82F6',    // Bright blue
    accent: '#FFD700',       // Gold
  },
  audio: {
    primary: '#7C3AED',      // Purple
    secondary: '#A78BFA',    // Light purple
    accent: '#06B6D4',       // Cyan
  },
  lighting: {
    primary: '#DC2626',      // Red
    secondary: '#FCA5A5',    // Light red
    accent: '#FBBF24',       // Yellow-gold
  },
  software: {
    primary: '#059669',      // Green
    secondary: '#10B981',    // Light green
    accent: '#06B6D4',       // Cyan
  },
  streaming: {
    primary: '#7C3AED',      // Purple
    secondary: '#C084FC',    // Light purple
    accent: '#EC4899',       // Pink
  },
  tripods: {
    primary: '#1F2937',      // Dark gray
    secondary: '#6B7280',    // Gray
    accent: '#60A5FA',       // Light blue
  },
  accessories: {
    primary: '#8B5CF6',      // Violet
    secondary: '#A78BFA',    // Light violet
    accent: '#F59E0B',       // Amber
  },
  Cameras: {
    primary: '#1E3A8A',
    secondary: '#3B82F6',
    accent: '#FFD700',
  },
  Streaming: {
    primary: '#7C3AED',
    secondary: '#C084FC',
    accent: '#EC4899',
  },
  Software: {
    primary: '#059669',
    secondary: '#10B981',
    accent: '#06B6D4',
  },
};

/**
 * Create a professional hero image with canvas
 */
function createHeroImage(config) {
  const width = config.width || 1200;
  const height = config.height || 630;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Get category colors
  const category = config.category.toLowerCase();
  const colors = categoryColors[config.category] || categoryColors[category] || {
    primary: '#374151',
    secondary: '#6B7280',
    accent: '#3B82F6',
  };
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.primary);
  gradient.addColorStop(0.5, colors.secondary);
  gradient.addColorStop(1, colors.primary);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add decorative elements
  ctx.fillStyle = `${colors.accent}15`; // 15% opacity
  
  // Top-right circle
  ctx.beginPath();
  ctx.arc(width - 100, -50, 200, 0, Math.PI * 2);
  ctx.fill();
  
  // Bottom-left circle
  ctx.beginPath();
  ctx.arc(-50, height + 100, 250, 0, Math.PI * 2);
  ctx.fill();
  
  // Center diagonal stripe
  ctx.fillStyle = `${colors.accent}20`;
  ctx.rotate(-0.2);
  ctx.fillRect(-100, height * 0.3, width + 200, 200);
  ctx.resetTransform();
  
  // Add text
  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  
  // Split long titles
  const title = config.title.replace(': ', '\n');
  const titleLines = title.split('\n');
  
  let y = 80;
  for (const line of titleLines.slice(0, 2)) {
    ctx.fillText(line.substring(0, 50), 60, y);
    y += 70;
  }
  
  // Category badge
  ctx.fillStyle = colors.accent;
  ctx.fillRect(60, height - 80, 200, 50);
  
  ctx.fillStyle = colors.primary;
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(config.category.toUpperCase(), 160, height - 55);
  
  // Watermark with timestamp
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('video-tools-affiliate.com', width - 40, height - 20);
  
  return canvas;
}

/**
 * Save canvas as JPG
 */
function saveCanvasAsJPG(canvas, filepath) {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filepath);
    const stream = canvas.createJPEGStream({
      quality: 0.92,
      progressive: true,
      chromaSubsampling: '4:2:0',
    });
    
    stream.pipe(out);
    
    out.on('finish', () => resolve(filepath));
    out.on('error', (err) => reject(err));
    stream.on('error', (err) => reject(err));
  });
}

/**
 * Main batch generation process
 */
async function generateAllImages() {
  const images = manifest.images;
  const results = [];
  
  console.log('\n🎨 Hero Image Batch Generation');
  console.log('═'.repeat(60));
  console.log(`📊 Processing ${images.length} images...\n`);
  
  let generated = 0;
  let failed = 0;
  let skipped = 0;
  
  const startTime = Date.now();
  
  for (let i = 0; i < images.length; i++) {
    const config = images[i];
    const filename = path.basename(config.localPath);
    const fullPath = path.join(PUBLIC_DIR, filename);
    
    process.stdout.write(`⏳ [${i + 1}/${images.length}] ${config.slug.substring(0, 40).padEnd(40)}`);
    
    try {
      // Check if exists
      if (fs.existsSync(fullPath)) {
        console.log(' ⏭️  SKIPPED (exists)');
        skipped++;
        results.push({ slug: config.slug, status: 'skipped' });
        continue;
      }
      
      // Create canvas image
      const canvas = createHeroImage(config);
      
      // Save as JPG
      await saveCanvasAsJPG(canvas, fullPath);
      
      console.log(' ✅ GENERATED');
      generated++;
      results.push({
        slug: config.slug,
        status: 'success',
        path: fullPath,
        size: fs.statSync(fullPath).size,
      });
      
    } catch (err) {
      console.log(` ❌ FAILED: ${err.message.substring(0, 30)}`);
      failed++;
      results.push({
        slug: config.slug,
        status: 'failed',
        error: err.message,
      });
    }
  }
  
  const elapsed = (Date.now() - startTime) / 1000;
  
  // Calculate total size
  let totalSize = 0;
  if (fs.existsSync(PUBLIC_DIR)) {
    const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.jpg'));
    totalSize = files.reduce((sum, f) => {
      return sum + fs.statSync(path.join(PUBLIC_DIR, f)).size;
    }, 0);
  }
  
  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Generation Report');
  console.log('═'.repeat(60));
  console.log(`✅ Generated:  ${generated}/${images.length}`);
  console.log(`⏭️  Skipped:   ${skipped}`);
  console.log(`❌ Failed:    ${failed}`);
  console.log(`⏱️  Time:      ${elapsed.toFixed(1)}s`);
  console.log(`📁 Output:    ${PUBLIC_DIR}`);
  console.log(`💾 Size:      ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log('═'.repeat(60));
  
  // Save results
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      total: images.length,
      generated,
      skipped,
      failed,
      elapsedSeconds: elapsed,
    },
    results,
  };
  
  fs.writeFileSync(
    path.join(__dirname, RESULTS_FILE),
    JSON.stringify(reportData, null, 2)
  );
  
  console.log(`\n📄 Results saved: ${RESULTS_FILE}`);
  
  if (failed === 0) {
    console.log('\n✨ All images generated successfully!');
    console.log('Ready for deployment to production.\n');
  } else {
    console.log(`\n⚠️  ${failed} images failed. Check results for details.\n`);
  }
  
  return {
    success: failed === 0,
    stats: reportData.summary,
  };
}

// Run generation
generateAllImages().catch(err => {
  console.error('\n❌ Generation process failed:', err);
  process.exit(1);
});
