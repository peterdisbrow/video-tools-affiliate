import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCTS_PATH = path.join(process.cwd(), 'products.json');

function loadProducts() {
  const raw = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveProducts(data) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET — return all products
export async function GET() {
  const data = loadProducts();
  return NextResponse.json(data);
}

// POST — add or update a product
export async function POST(request) {
  const body = await request.json();
  const data = loadProducts();

  if (body.action === 'delete') {
    data.products = data.products.filter(p => p.id !== body.id);
    saveProducts(data);
    return NextResponse.json({ success: true });
  }

  if (body.action === 'bulk') {
    const maxId = data.products.reduce((m, p) => Math.max(m, p.id), 0);
    const newProducts = body.products.map((p, i) => ({ id: maxId + i + 1, ...p }));
    data.products.push(...newProducts);
    saveProducts(data);
    return NextResponse.json({ success: true, added: newProducts.length });
  }

  const product = body.product;

  if (product.id) {
    // Update existing
    const idx = data.products.findIndex(p => p.id === product.id);
    if (idx === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    data.products[idx] = { ...data.products[idx], ...product };
  } else {
    // Add new
    const maxId = data.products.reduce((m, p) => Math.max(m, p.id), 0);
    product.id = maxId + 1;
    data.products.push(product);
  }

  saveProducts(data);
  return NextResponse.json({ success: true, product });
}
