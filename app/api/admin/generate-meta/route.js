import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

function authCheck(request) {
  const session = request.cookies.get('admin_session')?.value;
  return session && session.length === 64;
}

function getApiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  try {
    const config = JSON.parse(fs.readFileSync(path.join(process.env.HOME, '.openclaw/openclaw.json'), 'utf8'));
    return config?.env?.vars?.ANTHROPIC_API_KEY || null;
  } catch { return null; }
}

export async function POST(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { pageTitle, pageContent } = await request.json();
  const apiKey = getApiKey();
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });

  const client = new Anthropic({ apiKey });
  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: `Write a concise SEO meta description (under 160 characters) for this page:\n\nTitle: ${pageTitle}\nContent excerpt: ${(pageContent || '').slice(0, 500)}` }],
    });
    return NextResponse.json({ description: msg.content[0].text.trim() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
