import { NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = '6c052ad3be';

function getMailchimpDC() {
  if (!MAILCHIMP_API_KEY) return null;
  const parts = MAILCHIMP_API_KEY.split('-');
  return parts[parts.length - 1];
}

export async function GET(request) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session.length !== 64) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dc = getMailchimpDC();
  if (!dc || !MAILCHIMP_API_KEY) {
    return NextResponse.json({ 
      error: 'Mailchimp API key not configured',
      subscribers: 0,
      recentSignups: [],
    });
  }

  try {
    const headers = {
      'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    };

    // Get list info
    const listRes = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}`, { headers });
    const listData = await listRes.json();

    // Get recent members
    const membersRes = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members?count=10&sort_field=timestamp_signup&sort_dir=DESC`,
      { headers }
    );
    const membersData = await membersRes.json();

    return NextResponse.json({
      subscribers: listData.stats?.member_count || 0,
      unsubscribes: listData.stats?.unsubscribe_count || 0,
      openRate: listData.stats?.open_rate || 0,
      clickRate: listData.stats?.click_rate || 0,
      recentMembers: (membersData.members || []).map(m => ({
        email: m.email_address,
        status: m.status,
        signupDate: m.timestamp_signup || m.timestamp_opt,
      })),
      dashboardUrl: `https://${dc}.admin.mailchimp.com/lists/members/?id=${AUDIENCE_ID}`,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message, subscribers: 0 });
  }
}
