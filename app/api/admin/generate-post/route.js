import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

function authCheck(request) {
  const session = request.cookies.get('admin_session')?.value;
  return session && session.length === 64;
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

  let userMessage = `${SYSTEM_PROMPT}\n\n---\n\n${brainDump}`;
  if (product) userMessage += `\n\nAssociated product: ${product}`;
  if (category) userMessage += `\nCategory: ${category}`;

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      const proc = spawn('openclaw', [
        'agent',
        '-m', userMessage,
        '--session-id', `blog-writer-${Date.now()}`,
        '--json',
        '--timeout', '120',
      ], {
        env: { ...process.env, PATH: process.env.PATH + ':/opt/homebrew/bin:/usr/local/bin' },
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      proc.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      proc.on('close', (code) => {
        try {
          if (code !== 0) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: stderr || `Process exited with code ${code}` })}\n\n`));
            controller.close();
            return;
          }

          const result = JSON.parse(stdout);
          const text = result?.result?.payloads?.map(p => p.text).filter(Boolean).join('\n') || '';

          if (!text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'No response from AI' })}\n\n`));
            controller.close();
            return;
          }

          // Send the full text in chunks to simulate streaming for the UI
          const chunkSize = 50;
          for (let i = 0; i < text.length; i += chunkSize) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: text.slice(i, i + chunkSize) })}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
          controller.close();
        }
      });

      proc.on('error', (err) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: `Failed to start: ${err.message}` })}\n\n`));
        controller.close();
      });
    }
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
