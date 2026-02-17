import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session.length !== 64) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action } = await request.json();
  const cwd = process.cwd();

  try {
    if (action === 'git-status') {
      const status = execSync('git status --short', { cwd, timeout: 5000 }).toString();
      const lastCommit = execSync('git log -1 --format="%h %s (%ar)"', { cwd, timeout: 5000 }).toString().trim();
      const branch = execSync('git branch --show-current', { cwd, timeout: 5000 }).toString().trim();
      return NextResponse.json({ status, lastCommit, branch });
    }

    if (action === 'rebuild-sitemap') {
      // Generate a basic sitemap
      const blogDataPath = path.join(cwd, 'app/blog/blogData.js');
      const content = fs.readFileSync(blogDataPath, 'utf8');
      const slugs = [...content.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);
      
      const baseUrl = 'https://videocreatorgear.com';
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/products</loc><priority>0.9</priority></url>
  <url><loc>${baseUrl}/blog</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/guides</loc><priority>0.8</priority></url>
  <url><loc>${baseUrl}/comparisons</loc><priority>0.7</priority></url>
  <url><loc>${baseUrl}/about</loc><priority>0.5</priority></url>
${slugs.map(s => `  <url><loc>${baseUrl}/blog/${s}</loc><priority>0.6</priority></url>`).join('\n')}
</urlset>`;
      
      fs.writeFileSync(path.join(cwd, 'public/sitemap.xml'), sitemap);
      return NextResponse.json({ ok: true, message: `Sitemap rebuilt with ${slugs.length + 6} URLs` });
    }

    if (action === 'clear-cache') {
      const nextCache = path.join(cwd, '.next/cache');
      if (fs.existsSync(nextCache)) {
        execSync(`rm -rf "${nextCache}"`, { timeout: 10000 });
      }
      return NextResponse.json({ ok: true, message: 'Next.js cache cleared' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
