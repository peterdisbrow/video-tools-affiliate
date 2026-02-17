import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const TRACKING_FILE = path.join(process.cwd(), 'data/tracking.json');

function readTracking() {
  try {
    if (fs.existsSync(TRACKING_FILE)) {
      return JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
    }
  } catch {}
  return { pageViews: [], clicks: [], signups: [] };
}

function writeTracking(data) {
  fs.mkdirSync(path.dirname(TRACKING_FILE), { recursive: true });
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(data), 'utf8');
}

export async function POST(request) {
  try {
    const { type, product, page, timestamp } = await request.json();
    const data = readTracking();
    const ts = timestamp || new Date().toISOString();
    const today = ts.slice(0, 10);
    
    if (type === 'pageview') {
      data.pageViews.push({ page: page || '/', ts, date: today });
      // Keep last 10000
      if (data.pageViews.length > 10000) data.pageViews = data.pageViews.slice(-10000);
    } else if (type === 'click') {
      data.clicks.push({ product: product || 'unknown', page: page || '/', ts, date: today });
      if (data.clicks.length > 10000) data.clicks = data.clicks.slice(-10000);
    } else if (type === 'signup') {
      data.signups.push({ ts, date: today });
      if (data.signups.length > 10000) data.signups = data.signups.slice(-10000);
    }
    
    writeTracking(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(request) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session.length !== 64) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const data = readTracking();
  return NextResponse.json(data);
}
