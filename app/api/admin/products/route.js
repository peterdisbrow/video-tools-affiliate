import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BLOG_DATA_PATH = path.join(process.cwd(), 'app/blog/blogData.js');
const GUIDES_DATA_PATH = path.join(process.cwd(), 'app/guides/blogData.js');

function authCheck(request) {
  const session = request.cookies.get('admin_session')?.value;
  return session && session.length === 64;
}

function readProducts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Extract the array from the JS export
  const match = content.match(/export const blogPosts = (\[[\s\S]*\]);?\s*$/);
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    // Try eval for JS objects with trailing commas etc
    try {
      return eval(match[1]);
    } catch { return []; }
  }
}

function writeProducts(filePath, products) {
  const header = filePath.includes('guides') 
    ? '// Guides/product data\n// Last updated by admin dashboard\n\n'
    : '// Auto-generated blog posts for video tools affiliate site\n// Last updated by admin dashboard: ' + new Date().toISOString() + '\n\n';
  const content = header + 'export const blogPosts = ' + JSON.stringify(products, null, 2) + ';\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

function gitCommit(message) {
  try {
    const cwd = process.cwd();
    execSync(`cd "${cwd}" && git add -A && git commit -m "${message}"`, { timeout: 10000 });
  } catch (e) {
    // ignore git errors
  }
}

export async function GET(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'blog';
  const filePath = source === 'guides' ? GUIDES_DATA_PATH : BLOG_DATA_PATH;
  
  const products = readProducts(filePath);
  return NextResponse.json({ products, source });
}

export async function POST(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { product, source = 'blog' } = await request.json();
  const filePath = source === 'guides' ? GUIDES_DATA_PATH : BLOG_DATA_PATH;
  
  const products = readProducts(filePath);
  products.push(product);
  writeProducts(filePath, products);
  gitCommit(`admin: add product ${product.slug}`);
  
  return NextResponse.json({ ok: true, count: products.length });
}

export async function PUT(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { slug, updates, source = 'blog' } = await request.json();
  const filePath = source === 'guides' ? GUIDES_DATA_PATH : BLOG_DATA_PATH;
  
  const products = readProducts(filePath);
  const idx = products.findIndex(p => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  
  products[idx] = { ...products[idx], ...updates };
  writeProducts(filePath, products);
  gitCommit(`admin: update product ${slug}`);
  
  return NextResponse.json({ ok: true, product: products[idx] });
}

export async function DELETE(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { slug, source = 'blog' } = await request.json();
  const filePath = source === 'guides' ? GUIDES_DATA_PATH : BLOG_DATA_PATH;
  
  let products = readProducts(filePath);
  products = products.filter(p => p.slug !== slug);
  writeProducts(filePath, products);
  gitCommit(`admin: delete product ${slug}`);
  
  return NextResponse.json({ ok: true, count: products.length });
}
