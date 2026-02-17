# Image Generation Instructions

## Overview
This directory contains placeholder images for all blog and guide posts. These images need to be replaced with AI-generated hero images using Nano Banana Pro (Gemini 3 Pro).

## Quick Stats
- Total images needed: 82
- Image size: 1200x630px (standard blog hero size)
- Categories: cameras, audio, lighting, software, streaming, tripods, accessories, Cameras, Streaming, Software

## Image Sources
- Blog post images: `public/images/blog/`
- Guide post images: `public/images/guides/`

## How to Generate Real Images

### Option 1: Using Nano Banana Pro API (Recommended)
```bash
npm install @google/generative-ai
node generate-images-nano-banana.js
```

### Option 2: Using Image Generation Service
Batch all prompts from image-generation-batch-manifest.json to your image generation service.

### Option 3: Manual Generation
Use image-generation-batch-manifest.json prompts with:
- Midjourney
- DALL-E 3
- Leonardo.AI
- Stability AI

## Current Status
Placeholder images are set up and ready. Blog post references are configured.

## Generated Prompts by Category

### CAMERAS (12 images)
```
Professional mirrorless camera in bright studio with dramatic lighting, tripod, and modern video production equipment. High-end broadcast quality. Shot composition: product-focused with cinematic depth of field. 1200x630px
```

### AUDIO (17 images)
```
Professional podcast recording studio with high-end microphone, audio interface, acoustic treatment. Warm professional lighting. Modern content creator setup. 1200x630px
```

### LIGHTING (16 images)
```
Professional video lighting setup with multiple LED panels, color-graded lights, reflectors, and bright creative lighting environment. Production studio aesthetic. 1200x630px
```

### SOFTWARE (3 images)
```
Modern video editing or production software interface displayed on professional monitor in cinema production environment. Editing workflow. 1200x630px
```

### STREAMING (2 images)
```
Professional streaming setup with camera, microphone, lighting, computer monitors showing streaming interface. Gaming/streaming aesthetic. 1200x630px
```

### TRIPODS (12 images)
```
Professional camera tripod with mounted cinema camera and lighting in bright production studio. Stable professional equipment. 1200x630px
```

### ACCESSORIES (14 images)
```
Professional video production accessories and gear organization in modern studio. Cable management and mounting systems. 1200x630px
```

### CAMERAS (4 images)
```
Modern video editing or production software interface displayed on professional monitor in cinema production environment. Editing workflow. 1200x630px
```

### STREAMING (1 images)
```
Modern video editing or production software interface displayed on professional monitor in cinema production environment. Editing workflow. 1200x630px
```

### SOFTWARE (1 images)
```
Modern video editing or production software interface displayed on professional monitor in cinema production environment. Editing workflow. 1200x630px
```

## Next Steps

1. ✅ Image directories created
2. ✅ Blog post data configured for images
3. ⏳ Generate real images using Nano Banana Pro
4. ⏳ Replace placeholder images with real generated images
5. ⏳ Test all images load correctly on site
6. ⏳ Deploy

## Blog Post Configuration

All blog posts in `app/blog/blogData.js` and `app/guides/blogData.js` have been updated to reference the new image paths:
- Hero images display at 1200x630px at top of post
- Images use Next.js Image component for optimization
- Alt text and titles are auto-generated from post titles

## Testing

After replacing placeholder images:
```bash
npm run build
npm run start
# Visit http://localhost:3000/blog/[slug] to verify images load
```
