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

export async function GET(request) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session.length !== 64) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = readTracking();
  
  // Aggregate stats
  const now = new Date();
  const last30 = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  
  // Daily page views (last 30 days)
  const dailyViews = {};
  data.pageViews.filter(v => v.date >= last30).forEach(v => {
    dailyViews[v.date] = (dailyViews[v.date] || 0) + 1;
  });
  
  // Top clicked products
  const productClicks = {};
  data.clicks.forEach(c => {
    productClicks[c.product] = (productClicks[c.product] || 0) + 1;
  });
  const topProducts = Object.entries(productClicks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));
  
  // Daily clicks (last 30 days)
  const dailyClicks = {};
  data.clicks.filter(c => c.date >= last30).forEach(c => {
    dailyClicks[c.date] = (dailyClicks[c.date] || 0) + 1;
  });
  
  // Signup count
  const totalSignups = data.signups.length;
  const recentSignups = data.signups.filter(s => s.date >= last30).length;
  
  return NextResponse.json({
    totalPageViews: data.pageViews.length,
    totalClicks: data.clicks.length,
    totalSignups,
    recentSignups,
    dailyViews,
    dailyClicks,
    topProducts,
  });
}
