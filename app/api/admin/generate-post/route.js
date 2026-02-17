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
  // Try reading from OpenClaw config
  try {
    const config = JSON.parse(fs.readFileSync(path.join(process.env.HOME, '.openclaw/openclaw.json'), 'utf8'));
    return config?.env?.vars?.ANTHROPIC_API_KEY || null;
  } catch { return null; }
}

const SYSTEM_PROMPT = `You are writing a blog post for a video creator gear review site. The author is Andrew Disbrow — 15 years of video production + broadcast engineering experience. Voice: direct, opinionated, first-person, no fluff. Rules: unique opening hook specific to this product, conversational headings (not "Key Features"), prose over bullet dumps, no "In conclusion", natural ending. Write a full 800-1200 word review post in markdown.`;

export async function POST(request) {
  if (!authCheck(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { brainDump, product, category } = await request.json();
  if (!brainDump) {
    return NextResponse.json({ error: 'Brain dump text is required' }, { status: 400 });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured. Set it as an environment variable.' }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  let userMessage = brainDump;
  if (product) userMessage += `\n\nAssociated product: ${product}`;
  if (category) userMessage += `\nCategory: ${category}`;

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta?.text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
