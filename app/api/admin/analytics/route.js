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
  return { pageViews: [], clicks: [], signups: [], productClicks: [] };
}

export async function GET(request) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session.length !== 64) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rangeDays = parseInt(searchParams.get('range') || '30', 10);
  
  const data = readTracking();
  const now = new Date();
  const cutoff = new Date(now - rangeDays * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  
  // Filter by range
  const rangeViews = data.pageViews.filter(v => v.date >= cutoff);
  const rangeClicks = data.clicks.filter(c => c.date >= cutoff);
  const rangeProductClicks = (data.productClicks || []).filter(c => c.date >= cutoff);
  const rangeSignups = data.signups.filter(s => s.date >= cutoff);

  // Daily page views
  const dailyViews = {};
  rangeViews.forEach(v => {
    dailyViews[v.date] = (dailyViews[v.date] || 0) + 1;
  });
  
  // Top clicked products
  const productClickMap = {};
  rangeClicks.forEach(c => {
    productClickMap[c.product] = (productClickMap[c.product] || 0) + 1;
  });
  const topProducts = Object.entries(productClickMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));
  
  // Daily clicks
  const dailyClicks = {};
  rangeClicks.forEach(c => {
    dailyClicks[c.date] = (dailyClicks[c.date] || 0) + 1;
  });

  // Top pages
  const pageMap = {};
  rangeViews.forEach(v => {
    const page = v.page || v.path || '/';
    pageMap[page] = (pageMap[page] || 0) + 1;
  });
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([page, count]) => ({ page, count }));
  
  return NextResponse.json({
    totalPageViews: rangeViews.length,
    totalClicks: rangeClicks.length,
    totalProductClicks: rangeProductClicks.length,
    totalSignups: rangeSignups.length,
    recentSignups: rangeSignups.length,
    dailyViews,
    dailyClicks,
    topProducts,
    topPages,
  });
}
