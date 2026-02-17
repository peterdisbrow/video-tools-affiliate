#!/usr/bin/env python3
"""
Generate hero images for blog posts using Gemini 3 Pro (Nano Banana Pro)
Processes all 82 images from the manifest with batch optimizations
"""

import json
import os
import sys
import time
from pathlib import Path
import requests
from PIL import Image
from io import BytesIO

# Configuration
MANIFEST_FILE = "image-generation-batch-manifest.json"
PUBLIC_DIR = Path("public/images/blog")
BATCH_SIZE = 5  # Process 5 images at a time for API efficiency
RETRY_ATTEMPTS = 3
RETRY_DELAY = 2  # seconds

# Nano Banana API endpoint (using Gemini 3 Pro)
API_ENDPOINT = "https://api.bananabread.io/v1/images/generate"
API_KEY = os.getenv("BANANA_API_KEY", "")

# Stats
stats = {
    "total": 0,
    "generated": 0,
    "failed": 0,
    "skipped": 0,
    "start_time": time.time()
}

def load_manifest():
    """Load the image generation manifest"""
    with open(MANIFEST_FILE, 'r') as f:
        return json.load(f)

def generate_image(prompt, width=1200, height=630):
    """Generate a single image using Gemini 3 Pro"""
    try:
        payload = {
            "prompt": prompt,
            "width": width,
            "height": height,
            "num_inference_steps": 20,  # Balanced quality/speed
            "guidance_scale": 7.5,
            "model": "gemini-3-pro",  # Nano Banana Pro model
        }
        
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(API_ENDPOINT, json=payload, headers=headers, timeout=60)
        
        if response.status_code == 200:
            image_data = response.json().get("image")
            if image_data:
                # Handle base64 or URL response
                if image_data.startswith("data:"):
                    # Base64 encoded
                    import base64
                    image_bytes = base64.b64decode(image_data.split(",")[1])
                else:
                    # URL
                    img_response = requests.get(image_data, timeout=30)
                    image_bytes = img_response.content
                
                return Image.open(BytesIO(image_bytes))
        
        print(f"  ❌ API error: {response.status_code}")
        return None
        
    except Exception as e:
        print(f"  ❌ Generation failed: {str(e)}")
        return None

def save_image(image, file_path):
    """Save image as JPG"""
    try:
        # Convert RGBA to RGB if needed
        if image.mode == 'RGBA':
            rgb_image = Image.new('RGB', image.size, (255, 255, 255))
            rgb_image.paste(image, mask=image.split()[3] if len(image.split()) == 4 else None)
            image = rgb_image
        
        # Save as JPG with quality
        image.save(file_path, 'JPEG', quality=92, optimize=True)
        return True
    except Exception as e:
        print(f"  ❌ Save failed: {str(e)}")
        return False

def process_batch(images):
    """Process a batch of images"""
    results = []
    
    for idx, img_config in enumerate(images, 1):
        stats["total"] += 1
        slug = img_config["slug"]
        local_path = Path(img_config["localPath"])
        prompt = img_config["prompt"]
        
        # Create full path
        full_path = PUBLIC_DIR / local_path.name
        
        # Check if already exists
        if full_path.exists():
            print(f"⏭️  [{idx:02d}] {slug}: Already exists, skipping")
            stats["skipped"] += 1
            results.append({"slug": slug, "status": "skipped"})
            continue
        
        print(f"🎨 [{idx:02d}] {slug}...")
        
        # Attempt generation with retries
        image = None
        for attempt in range(RETRY_ATTEMPTS):
            image = generate_image(prompt, img_config["width"], img_config["height"])
            if image:
                break
            if attempt < RETRY_ATTEMPTS - 1:
                print(f"  ⏳ Retrying... (attempt {attempt + 2}/{RETRY_ATTEMPTS})")
                time.sleep(RETRY_DELAY)
        
        if not image:
            print(f"  ❌ Failed after {RETRY_ATTEMPTS} attempts")
            stats["failed"] += 1
            results.append({"slug": slug, "status": "failed"})
            continue
        
        # Save image
        if save_image(image, full_path):
            print(f"  ✅ Saved: {full_path.name}")
            stats["generated"] += 1
            results.append({"slug": slug, "status": "success", "path": str(full_path)})
        else:
            stats["failed"] += 1
            results.append({"slug": slug, "status": "save_failed"})
    
    return results

def generate_report(all_results):
    """Generate completion report"""
    elapsed = time.time() - stats["start_time"]
    
    report = f"""
=================================
Hero Images Generation Report
=================================

📊 Statistics:
   Total:      {stats["total"]}
   Generated:  {stats["generated"]} ✅
   Skipped:    {stats["skipped"]} ⏭️
   Failed:     {stats["failed"]} ❌
   
⏱️  Time: {elapsed:.1f}s ({elapsed/60:.1f}m)

📁 Output: {PUBLIC_DIR}
   Size: {sum(f.stat().st_size for f in PUBLIC_DIR.glob('*.jpg')) / (1024*1024):.1f} MB

Status: {'✅ COMPLETE' if stats['failed'] == 0 else f'⚠️  {stats["failed"]} FAILED'}
=================================
"""
    
    return report

def main():
    """Main generation workflow"""
    print("\n🚀 Hero Image Batch Generation")
    print("="*50)
    
    # Load manifest
    print(f"📖 Loading manifest: {MANIFEST_FILE}")
    manifest = load_manifest()
    images = manifest.get("images", [])
    print(f"📋 Found {len(images)} images to process\n")
    
    # Ensure output directory exists
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    
    # Process in batches
    all_results = []
    for i in range(0, len(images), BATCH_SIZE):
        batch = images[i:i+BATCH_SIZE]
        print(f"\n📦 Batch {i//BATCH_SIZE + 1}/{(len(images)-1)//BATCH_SIZE + 1}")
        print("─" * 50)
        
        results = process_batch(batch)
        all_results.extend(results)
        
        # Rate limiting between batches
        if i + BATCH_SIZE < len(images):
            time.sleep(1)
    
    # Print report
    report = generate_report(all_results)
    print(report)
    
    # Save detailed results
    results_file = Path("hero-images-generation-results.json")
    with open(results_file, 'w') as f:
        json.dump({
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "stats": stats,
            "results": all_results
        }, f, indent=2)
    
    print(f"📄 Results saved: {results_file}")
    
    # Exit with error code if failures
    sys.exit(0 if stats["failed"] == 0 else 1)

if __name__ == "__main__":
    main()
