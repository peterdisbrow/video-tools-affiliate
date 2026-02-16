# Creator Gear — Product Tools

## Tool 1: Product Lookup Utility (`/utils/productLookup.js`)

Pure JavaScript utility for generating Amazon affiliate links and looking up products.

### Functions

```javascript
const { generateLink, getProductByName, lookupAsin } = require('./utils/productLookup');

// Generate affiliate link from ASIN
generateLink('B09JZRWRJN', 'disbrowproduc-20');
// → https://www.amazon.com/dp/B09JZRWRJN?tag=disbrowproduc-20

// Find product by name (partial, case-insensitive)
getProductByName('sony alpha');
// → { id: 1, name: 'Sony Alpha a7 IV', asin: 'B09JZRWRJN', ... }

// Look up product and get its affiliate URL
lookupAsin('shure sm7b');
// → https://www.amazon.com/dp/B0CCSVYWMH?tag=disbrowproduc-20
```

### Also exports
- `loadProducts()` / `saveProducts(data)` — read/write products.json
- `DEFAULT_TAG` — `'disbrowproduc-20'`

---

## Tool 2: CMS Admin Dashboard (`/app/admin/products`)

### Access
Navigate to `http://localhost:3000/admin/products`  
Default password: `admin123` (override with `NEXT_PUBLIC_ADMIN_PASSWORD` env var)

### Features
- **Add/Edit products** with full form (name, category, ASIN, price, rating, description, image)
- **Real-time affiliate link preview** as you type the ASIN
- **Copy Link** button for quick clipboard copy
- **Bulk Import** — paste CSV lines: `Name, Category, ASIN, Price, Rating, Description`
- **Export** — download current products.json
- **Search/filter** products table
- **Edit/Delete** actions on each product row

### API Route
`/api/products` handles GET (list) and POST (add/update/delete/bulk) operations.

### Security
Session-based password auth (client-side, stored in sessionStorage).  
⚠️ Internal use only — upgrade to JWT/OAuth for production deployment.

---

## File Structure
```
/utils/productLookup.js    — Lookup utility functions
/app/admin/layout.js       — Auth wrapper for admin routes
/app/admin/products/page.js — Admin dashboard
/app/api/products/route.js — Products API endpoint
/products.json             — Product data store
```
