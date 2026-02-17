# 🔍 Blog Search - Quick Test Guide

## Local Testing

### Start Dev Server
```bash
cd /Users/peter/.openclaw/workspace/video-tools-affiliate
npm run dev
```

The blog will be available at: **http://localhost:3000/blog**

### Test Searches (Copy/Paste)

#### Product Searches
```
Sony
Canon  
DJI
Rode
Shure
Audio-Technica
Neewer
Nanlite
Godox
Aputure
```

**Expected:** Should find matching camera, microphone, and lighting products

#### Category Searches
```
cameras
audio
lighting
microphones
tripod
gimbal
editing
```

**Expected:** Should find all posts in that category

#### Pain Point Searches
```
best budget
compact
wireless
professional
beginner
4k video
streaming
content creation
```

**Expected:** Should find relevant gear for those use cases

#### Specific Features
```
4k 120fps
full frame
zoom
usb
portable
```

**Expected:** Should find posts containing those features

---

## Keyboard Navigation Test

1. **Click search box** (or press "/" on some browsers)
2. **Type query:** "sony"
3. **Press Arrow Down:** Highlights first result
4. **Press Arrow Down:** Highlights second result
5. **Press Arrow Up:** Highlights previous result
6. **Press Enter:** Navigates to highlighted post
7. **Press Escape:** Closes search and clears input

---

## UI/UX Test Checklist

- [ ] Search box appears in hero section
- [ ] Placeholder text shows: "Search posts by title, category, product..."
- [ ] Search icon (🔍) visible when empty
- [ ] Clear button (✕) appears when typing
- [ ] Dropdown opens with results as you type
- [ ] Category tags are blue and visible
- [ ] Read time displays correctly
- [ ] Snippets are truncated to ~60 characters
- [ ] "No results" message appears for bad searches
- [ ] Hover over results highlights them
- [ ] Results dropdown scrollable if >8 results
- [ ] Mobile: search box full width
- [ ] Mobile: dropdown doesn't break layout
- [ ] Animations are smooth (no jank)

---

## Performance Test

### In Browser DevTools

1. **Open DevTools** (F12)
2. **Go to Performance tab**
3. **Hit record** (circle button)
4. **Type "sony"** in search box
5. **Stop recording**
6. **Check main thread usage:**
   - Should see only 30-50ms of blocking time
   - No long tasks (>50ms)
   - Smooth 60fps animation

### Expected Results
- **First paint:** <100ms
- **Search response:** <50ms
- **Memory:** Stable, no leaks
- **CPU:** Minimal usage (<5%)

---

## Mobile Testing

### iPhone/iPad Simulator
1. **Open DevTools**
2. **Toggle device toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. **Select iPhone 12** 
4. **Test search box:**
   - Full width on mobile
   - Centered max-width 600px
   - Touch-friendly size
5. **Test results:**
   - Dropdown doesn't push page
   - Scrollable if needed
   - Category tags wrap properly

### Android Simulator
Same as above - should work identically

---

## Search Quality Test

### Should Work
```
"Sony" → Sony Alpha a7 IV
"Canon" → Canon EOS R6 Mark II
"audio" → All audio posts
"microphone" → All microphone posts
"4k" → Cameras with 4K recording
"budget" → Lower-priced gear
```

### Should Show "No Results"
```
"xyz" (gibberish)
"purple elephants"
"quantum computing"
```

### Should Handle Edge Cases
```
"sony sony sony" (repeated word)
"SONY" (uppercase)
"Sony." (special char)
"Sony         " (extra spaces)
```

---

## Common Issues & Fixes

### Issue: Search not appearing
**Solution:** 
```bash
npm run build
npm run dev
# Clear browser cache (Cmd+Shift+Delete)
# Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
```

### Issue: Slow search results
**Solution:**
- Check DevTools > Performance tab
- Look for main thread blocking
- If >200ms, there's a problem
- Clear `.next/` folder and rebuild

### Issue: Search box styling broken
**Solution:**
```bash
# Make sure BlogSearch.js exists:
ls -la /Users/peter/.openclaw/workspace/video-tools-affiliate/app/blog/BlogSearch.js

# Check import in page.js:
grep "BlogSearch" /Users/peter/.openclaw/workspace/video-tools-affiliate/app/blog/page.js
```

### Issue: Results not clickable
**Solution:**
- Check if `Link` component is imported in BlogSearch.js
- Verify blog post slugs are correct in blogData.js
- Test direct link: `/blog/sony-alpha-a7-iv`

---

## Vercel Testing (After Deploy)

Once deployed to Vercel:

1. **Visit live blog:** https://[your-vercel-url]/blog
2. **Verify search works** 
3. **Check performance:** Should still be <50ms
4. **Test on mobile:** Use device, not emulator
5. **Check SEO:** Inspect page source for meta tags

---

## Test Results Template

```markdown
## Search Feature Test Results

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Local/Vercel]

### Functional Tests
- [ ] Search box renders ✅
- [ ] Typing triggers search ✅
- [ ] Results appear instantly ✅
- [ ] Clear button works ✅
- [ ] No results message shows ✅
- [ ] Keyboard nav works ✅
- [ ] Results link to posts ✅

### Performance Tests
- [ ] Search <50ms ✅
- [ ] No 60fps drops ✅
- [ ] Mobile smooth ✅
- [ ] Memory stable ✅

### UI/UX Tests
- [ ] Desktop looks good ✅
- [ ] Mobile responsive ✅
- [ ] Animations smooth ✅
- [ ] Colors correct ✅
- [ ] Typography readable ✅

### Quality Tests
- [ ] Product search works ✅
- [ ] Category search works ✅
- [ ] Pain point search works ✅
- [ ] Edge cases handled ✅

## Notes:
[Add any observations]

## Status: ✅ PASSED
```

---

## Tips for Power Testing

1. **Test with different network speeds**
   - DevTools > Network > Throttle to "3G Fast"
   - Search should still be responsive

2. **Test with large inputs**
   - Type 100+ character searches
   - Should handle gracefully

3. **Test rapid input**
   - Spam typing without pausing
   - Debounce should prevent lag

4. **Test on old devices**
   - iPhone 6/7
   - Android 5.0+
   - Should still be smooth

5. **Accessibility Testing**
   - Use keyboard only (no mouse)
   - Should be fully navigable
   - Screen reader friendly

---

## Questions?

If search isn't working:
1. Check browser console for errors (F12)
2. Verify blog post data exists
3. Test with simple queries first
4. Clear `.next/` and rebuild
5. Check git status (no uncommitted changes)

---

**Happy testing! 🚀**
