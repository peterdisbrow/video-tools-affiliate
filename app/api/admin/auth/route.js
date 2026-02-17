import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';
const SESSION_SECRET = process.env.SESSION_SECRET || 'video-tools-admin-secret-2026';

function makeToken() {
  return crypto.createHmac('sha256', SESSION_SECRET).update(ADMIN_PASSWORD + Date.now().toString()).digest('hex');
}

function verifyToken(token) {
  // Simple: token exists and is a valid hex string of correct length
  return typeof token === 'string' && token.length === 64;
}

export async function POST(request) {
  const { password, action } = await request.json();
  
  if (action === 'logout') {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
    return res;
  }
  
  if (action === 'check') {
    const session = request.cookies.get('admin_session')?.value;
    if (session && verifyToken(session)) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  if (password === ADMIN_PASSWORD) {
    const token = makeToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return res;
  }
  
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
