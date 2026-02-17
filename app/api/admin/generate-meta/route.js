import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

function authCheck(request) {
  const session = request.cookies.get('admin_session')?.value;
  return session && session.length === 64;
}

export async function POST(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { pageTitle, pageContent } = await request.json();

  try {
    const message = `Write a concise SEO meta description (under 160 characters) for this page:\n\nTitle: ${pageTitle}\nContent excerpt: ${(pageContent || '').slice(0, 500)}`;

    const result = execSync(
      `openclaw agent -m ${JSON.stringify(message)} --session-id "meta-gen-${Date.now()}" --json --timeout 30`,
      {
        env: { ...process.env, PATH: process.env.PATH + ':/opt/homebrew/bin:/usr/local/bin' },
        timeout: 35000,
        encoding: 'utf8',
      }
    );

    const parsed = JSON.parse(result);
    const text = parsed?.result?.payloads?.map(p => p.text).filter(Boolean).join('') || '';
    return NextResponse.json({ description: text.trim() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
