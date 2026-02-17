import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data/settings.json');

function authCheck(request) {
  const session = request.cookies.get('admin_session')?.value;
  return session && session.length === 64;
}

const defaultSettings = {
  siteName: 'Video Gear Guide',
  tagline: 'Honest reviews for video creators',
  contactEmail: 'andrew@videocreatorgear.com',
  maintenanceMode: false,
  affiliateTag: 'disbrowproduc-20',
  heroHeadline: 'The Only Gear Guide That Cuts the BS',
  heroSubheadline: 'Real reviews from a 15-year broadcast engineer. No sponsors. No fluff. Just the gear that actually works.',
  statsCreators: '50K',
  statsProducts: '68',
  statsReviews: '200+',
  newsletterHeadline: 'Get the Gear Guide',
  newsletterSubtext: 'Weekly picks, deals, and honest reviews. No spam.',
  featuredProductIds: [],
  seoPages: {},
};

function readSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      return { ...defaultSettings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) };
    }
  } catch {}
  return { ...defaultSettings };
}

function writeSettings(settings) {
  const dir = path.dirname(SETTINGS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
}

export async function GET(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(readSettings());
}

export async function PUT(request) {
  if (!authCheck(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updates = await request.json();
  const current = readSettings();
  const merged = { ...current, ...updates };
  writeSettings(merged);
  return NextResponse.json({ ok: true, settings: merged });
}
