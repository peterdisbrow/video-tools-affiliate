# Email Nurture Sequence — VideoToolsHub

## Mailchimp Setup Instructions

### 1. Create Automation
- Go to Mailchimp → Automations → Create → Classic Automation
- Trigger: "Subscribes to audience"
- Name: "New Subscriber Welcome Sequence"

### 2. Add Emails (copy from files below)
- Email 1: `email-1-welcome.html` → Send immediately (Day 0)
- Email 2: `email-2-education.html` → Delay 2 days
- Email 3: `email-3-personal.html` → Delay 3 days (Day 5)
- Email 4: `email-4-social-proof.html` → Delay 3 days (Day 8)
- Email 5: `email-5-offer.html` → Delay 4 days (Day 12)

### 3. Segments
Create two segments in Mailchimp:
- **Budget Creators**: Opened Email 1 + clicked budget planner link
- **Serious Creators**: Clicked 3+ links OR opened all 5 emails

### 4. From Name / Email
- From: VideoToolsHub
- Reply-to: hello@videotoolshub.com

### 5. Tracking
- Enable click tracking on all emails
- Tag affiliate links with `utm_source=email&utm_medium=nurture&utm_campaign=welcome_sequence`
