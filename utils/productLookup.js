/**
 * Product Lookup Utility for Gear Guide Affiliate Site
 * Pure JavaScript — no external dependencies
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'products.json');
const DEFAULT_TAG = 'disbrowproduc-20';
const AMAZON_BASE = 'https://www.amazon.com/dp/';

/**
 * Generate an Amazon affiliate link from an ASIN and tag.
 * @param {string} asin - Amazon Standard Identification Number
 * @param {string} [tag] - Affiliate tag (defaults to disbrowproduc-20)
 * @returns {string} Full Amazon affiliate URL
 */
function generateLink(asin, tag = DEFAULT_TAG) {
  if (!asin || typeof asin !== 'string') {
    throw new Error('A valid ASIN is required');
  }
  const cleanAsin = asin.trim().toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(cleanAsin)) {
    throw new Error(`Invalid ASIN format: "${asin}". Must be 10 alphanumeric characters.`);
  }
  return `${AMAZON_BASE}${cleanAsin}?tag=${encodeURIComponent(tag)}`;
}

/**
 * Load and return all products from products.json.
 * @returns {{ products: Array, affiliateTag: string }}
 */
function loadProducts() {
  const raw = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Save products data back to products.json.
 * @param {object} data - Full products data object
 */
function saveProducts(data) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Find a product by name (case-insensitive partial match).
 * @param {string} name - Product name to search for
 * @returns {object|null} Product object or null
 */
function getProductByName(name) {
  if (!name) return null;
  const { products } = loadProducts();
  const lower = name.toLowerCase();
  return products.find(p => p.name.toLowerCase().includes(lower)) || null;
}

/**
 * Look up a product by name and return its affiliate URL.
 * @param {string} productName - Product name to search for
 * @param {string} [affiliateTag] - Override affiliate tag
 * @returns {string|null} Affiliate URL or null if not found / no ASIN
 */
function lookupAsin(productName, affiliateTag) {
  const product = getProductByName(productName);
  if (!product) return null;
  // Some products use affiliateLink instead of ASIN (e.g. software)
  if (product.affiliateLink) return product.affiliateLink;
  if (!product.asin) return null;
  const { affiliateTag: defaultTag } = loadProducts();
  return generateLink(product.asin, affiliateTag || defaultTag || DEFAULT_TAG);
}

module.exports = {
  generateLink,
  loadProducts,
  saveProducts,
  getProductByName,
  lookupAsin,
  DEFAULT_TAG,
  AMAZON_BASE,
};
