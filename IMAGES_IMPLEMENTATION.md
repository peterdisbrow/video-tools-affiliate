# Hero Images Implementation Guide

## Status: Infrastructure Ready ✅

All blog and guide posts have been configured to display hero images. The infrastructure is complete and ready for image generation.

## What Was Set Up

### 1. Image Directories Created
```
public/images/
├── blog/          (82 hero images for blog posts)
└── guides/        (82 hero images for guide posts)
```

### 2. Blog Data Updated
- All posts in `app/blog/blogData.js` now include:
  - `heroImage`: Path to generated image (e.g., `/images/blog/sony-alpha-a7-iv-hero.jpg`)
  - `imageAlt`: Descriptive alt text for accessibility
  - `imageCaption`: Optional caption text
  - Fallback to original image if hero image not found

### 3. Pages Updated
- **Blog Post Page** (`app/blog/[slug]/page.js`):
  - Hero image displays at top (1200x630px, scaled to 400px height)
  - Fallback to original image if hero not found
  - Proper alt text for SEO/accessibility

- **Blog Listing Page** (`app/blog/page.js`):
  - Blog cards show hero images (200px height)
  - Fallback error handling

## Image Specifications

| Property | Value |
|----------|-------|
| Dimensions | 1200x630px (16:9 aspect ratio) |
| Format | JPG (web-optimized) |
| Quality | 85-90% (for web) |
| Total Images Needed | 164 (82 blog + 82 guides) |
| Categories | cameras, audio, lighting, software, streaming, tripods, accessories |

## Image Generation Options

### Option 1: Nano Banana Pro (Gemini 3 Pro) - RECOMMENDED
This is the specified image generation tool for this project.

**Why:**
- Free/affordable tier available
- High quality outputs
- Batch processing capability
- API access for automation

**Setup:**
```bash
npm install @google/generative-ai
```

**Example Script:**
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const manifest = JSON.parse(fs.readFileSync('image-generation-batch-manifest.json'));

for (const image of manifest.images) {
  const result = await client.generateImage({
    prompt: image.prompt,
    size: '1200x630'
  });
  
  // Save image to public/images/{type}/{slug}-hero.jpg
  await fs.promises.writeFile(image.localPath, result.image);
}
```

### Option 2: Other Services

**Leonardo.AI**
- Good for batch processing
- Supports 1200x630 dimensions
- API available

**Stability AI**
- SDXL for high quality
- Batch endpoints
- Reliable uptime

**Midjourney**
- Highest quality
- Manual process (slower)
- Not API-based for images

## Prompts Ready for Generation

All prompts are in: `image-generation-batch-manifest.json`

### Sample Prompts by Category

**CAMERAS (12 images)**
```
Professional mirrorless camera in bright studio with dramatic lighting, tripod, 
and modern video production equipment. High-end broadcast quality. 1200x630px
```

**AUDIO (17 images)**
```
Professional podcast recording studio with high-end microphone, audio interface, 
acoustic treatment. Warm professional lighting. Modern content creator setup. 1200x630px
```

**LIGHTING (16 images)**
```
Professional video lighting setup with multiple LED panels, color-graded lights, 
reflectors, and bright creative lighting environment. 1200x630px
```

**SOFTWARE (3 images)**
```
Modern video editing software interface on professional monitor in cinema environment. 
Editing workflow display. 1200x630px
```

**STREAMING (2 images)**
```
Professional streaming setup with camera, microphone, lighting, monitors showing 
streaming interface. Gaming/streaming aesthetic. 1200x630px
```

**TRIPODS (12 images)**
```
Professional camera tripod with mounted cinema camera and lighting in studio. 
Stable professional equipment. 1200x630px
```

**ACCESSORIES (14 images)**
```
Professional video production accessories and gear organization in modern studio. 
Cable management and mounting systems. 1200x630px
```

## Implementation Timeline

### Phase 1: ✅ COMPLETE
- [x] Create image directories
- [x] Update blog post data structures
- [x] Update page components to display images
- [x] Create image generation manifest
- [x] Generate image prompts

### Phase 2: NEXT
- [ ] Generate images using Nano Banana Pro or alternative
- [ ] Save images to `public/images/blog/` and `public/images/guides/`
- [ ] Test all images load correctly
- [ ] Verify image dimensions and quality

### Phase 3: DEPLOYMENT
- [ ] Build Next.js project: `npm run build`
- [ ] Test on staging: `npm run start`
- [ ] Verify image loading on all blog posts
- [ ] Deploy to production

## File Locations & Mappings

**Manifest Files:**
- `image-generation-batch-manifest.json` - All images with prompts
- `image-mappings.json` - Direct path mappings
- `blog-image-updates.json` - Blog post updates

**Blog Data:**
- `app/blog/blogData.js` - Contains heroImage paths for all posts

**Configuration:**
- `IMAGE_GENERATION_README.md` - Quick generation guide
- `IMAGES_IMPLEMENTATION.md` - This file

## Testing

### Before Generation
```bash
cd /Users/peter/.openclaw/workspace/video-tools-affiliate
npm run build  # Should succeed even with missing images
```

### After Generation
```bash
# Check image files exist
ls public/images/blog/ | wc -l  # Should show 82
ls public/images/guides/ | wc -l  # Should show 82

# Test locally
npm run start
# Visit http://localhost:3000/blog/sony-alpha-a7-iv
# Verify hero image displays at top
```

### Image Quality Checklist
- [ ] All images 1200x630px
- [ ] JPG format, optimized for web
- [ ] Relevant to post category/topic
- [ ] Professional quality
- [ ] No watermarks or text overlays
- [ ] Consistent visual style across category

## Troubleshooting

**Images not displaying?**
1. Check image files exist: `ls public/images/blog/`
2. Verify file paths match blogData.js
3. Check browser console for 404 errors
4. Verify image dimensions (1200x630)

**File format issues?**
1. Ensure JPG format (not PNG for large files)
2. Optimize with ImageOptim or similar
3. Resize to exact 1200x630px if needed

**Generation failed?**
1. Check API quotas/limits
2. Verify batch manifest is valid
3. Test single image generation first
4. Check error logs for specific issues

## Next Steps

1. **Immediate (by morning):**
   - Generate all 164 hero images using Nano Banana Pro
   - Place in `public/images/blog/` and `public/images/guides/`
   - Test 5-10 blog posts to verify display

2. **Testing:**
   - Build project: `npm run build`
   - Test locally: `npm run start`
   - Visit blog posts and verify images display

3. **Deployment:**
   - Commit images to git
   - Push to production
   - Monitor for any image loading issues

## Stats

- **Total Images**: 164 (82 blog + 82 guides)
- **Total Dimensions**: 1200x630px each
- **Approximate File Size**: 50-100KB per image (JPG optimized)
- **Total Storage**: ~8-16MB
- **Generation Time**: Depends on service (typically 30 sec - 5 min per image with API)

## Contact & Support

For issues or questions about image implementation:
1. Check `image-generation-batch-manifest.json` for prompts
2. Review this guide for troubleshooting
3. Check image-mappings.json for exact path mapping
