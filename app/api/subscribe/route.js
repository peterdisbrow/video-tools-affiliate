import { NextResponse } from 'next/server';

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || '6c052ad3be';
const REGION = process.env.MAILCHIMP_REGION || 'us2';

export async function POST(request) {
  try {
    if (!API_KEY) {
      console.error('MAILCHIMP_API_KEY not set');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const { firstName, email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const res = await fetch(
      `https://${REGION}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName || '',
          },
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    if (data.title === 'Member Exists') {
      return NextResponse.json({ success: true, message: 'Already subscribed!' });
    }

    console.error('Mailchimp error:', data);
    return NextResponse.json(
      { error: data.detail || 'Subscription failed. Please try again.' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
