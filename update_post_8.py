
with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'church-live-streaming-setup-guide'
new_content = """<p>The calls I remember most clearly are the ones that come in on Sunday morning. A church that bought the wrong gear, or bought the right gear in the wrong order, or had a system that worked fine for three months and then didn't — on a Sunday, in front of their entire online congregation. Those calls are always the same: something's wrong, the service is live in twenty minutes, and nobody knows where to start.</p>

<p>I've been doing this for fifteen years. I've built church streaming systems from scratch, I've inherited broken ones, and I've taken the panicked Sunday morning calls. This guide is about not making those calls — about building a system that holds up week after week, operated by whoever shows up to volunteer.</p>

<h2>Start with the question nobody asks: what are you actually streaming?</h2>

<p>Before you spec a single piece of gear, answer this: who is your online congregation and what do they need from the stream?</p>

<p>A church streaming primarily for members who can't attend in person has different requirements than a church intentionally building an online campus as a growth strategy. A congregation of 150 with 30-40 online viewers has different production complexity than a large church with thousands watching online who've never been in the building.</p>

<p>The temptation is to overbuild. I've seen small churches spend $50,000 on systems more complex than their volunteer team can operate reliably. The best streaming system is the one your team can run confidently, every single week, regardless of who shows up. Complexity is the enemy of reliability, and reliability is the entire product.</p>

<h2>The switcher: get this right first</h2>

<p>The switcher is the heart of the system. Everything else connects to it. Get this right before buying anything else.</p>

<p>For most churches, the decision comes down to camera count and cable runs. If your cameras are more than 15 feet from the switcher — and in almost every real sanctuary, they are — you need SDI inputs, not HDMI. SDI runs reliably to 300 feet. HDMI doesn't reliably run past 15.</p>

<p><strong>Two to four cameras, smaller venue:</strong> The <a href="https://www.amazon.com/dp/B08BQMDF58?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini Pro ISO SDI</a> is the right starting point. Four SDI inputs, built-in multiview so you see all cameras before cutting, built-in streaming encoder, and ISO recording of every camera input simultaneously. Your volunteers can learn this in a weekend. The ISO recordings mean you have every camera angle available for editing or clipping after the service.</p>

<p><strong>Four to eight cameras, mid-size venue:</strong> The <a href="https://www.amazon.com/s?k=ATEM+Mini+Extreme+ISO&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini Extreme ISO</a> gives you eight inputs, SuperSource for picture-in-picture, and more auxiliary output routing. For a church running a main camera, pulpit close-up, wide sanctuary angle, worship team camera, and a graphics return — the Extreme ISO covers it cleanly.</p>

<p><strong>Multiple simultaneous outputs (in-room screens + online stream):</strong> The moment you need your in-room screens to show something different from what's going online — and most growing churches eventually do — you need a multi-M/E switcher. The <a href="https://www.amazon.com/s?k=ATEM+2ME+Constellation+HD&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM 2 M/E Constellation HD</a> handles this cleanly: one M/E for in-room IMAG, one M/E for the online stream, one technical director managing both. As a certified Blackmagic reseller, <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">ATEM School members get direct pricing on Constellation systems</a>.</p>

<h2>Cameras: integration beats specs</h2>

<p>The cameras I build church systems around most consistently are the <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">Blackmagic Studio Camera</a> lineup. The reason is integration: talkback, tally lights, and full camera control all travel over a single SDI or fiber cable back to the ATEM. Your camera operators know when they're on air. Your director can adjust iris, white balance, and gain on every camera from the switcher position without touching the cameras. This is how broadcast was designed to work, and it works the same way in a sanctuary.</p>

<p>For churches on a tighter budget or phasing cameras in over time, the <a href="https://www.amazon.com/dp/B0C5GCGJG3?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Sony a6700</a> and <a href="https://www.amazon.com/dp/B0BHKL3GZL?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Sony FX30</a> both output clean SDI with a <a href="https://www.amazon.com/s?k=Blackmagic+Mini+Converter+SDI+HDMI&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Blackmagic BiDi converter</a> and handle extended run times well in the mixed-light environments most sanctuaries present.</p>

<p>For unmanned positions — a locked-off wide shot from the back of the house, a balcony angle, an overflow room feed — PTZ cameras controlled over IP are the right tool. They free up operators for the cameras that need human judgment. Budget $1,500-2,500 per PTZ camera for units that will hold their own against your manned cameras in a production cut.</p>

<h2>Audio: the part that kills streams</h2>

<p>Bad audio destroys a stream faster than bad video. Viewers will tolerate a slightly soft image. They will not tolerate audio that sounds like a phone speaker, audio that drops intermittently, or audio with a 60Hz hum running under everything. I've watched churches lose online congregation members permanently over audio issues.</p>

<p>The right approach: a direct feed from your front-of-house mixing console. Your sound engineer is already mixing the service. You want that mix — properly gated, compressed, and processed by someone who knows the room — going directly into your stream. Not a microphone pointed at the speaker. Not the camera's built-in mic. A direct console feed.</p>

<p>Most digital consoles — Allen &amp; Heath, Yamaha, Behringer X32/M32, Soundcraft — have direct stereo outputs or USB audio interfaces built in. Tap a stereo mix from the console into the ATEM's audio input. Sort the cable run once. After that, the audio workflow is solved for every service going forward.</p>

<h2>Internet: wired, dedicated, tested</h2>

<p>Streaming requires stable, dedicated upload bandwidth. Sharing the church WiFi with the congregation during service is not a streaming strategy. A single dropped WiFi packet at the wrong moment can freeze the stream for everyone watching online.</p>

<p>Wired Ethernet from the switcher to your network, on a dedicated VLAN away from general church traffic, with enough upload bandwidth for your target stream quality. For 1080p30 streaming to YouTube and Facebook, minimum 10 Mbps upload with headroom — ideally 20+ Mbps dedicated to streaming. Test your actual upload speed from your streaming position before building the system around it.</p>

<p>For churches where internet reliability is a real concern: a dedicated cellular backup router — 4G/5G, set to take over automatically if the primary connection drops — is one of the best reliability investments you can make. A Sunday morning stream going offline because the ISP had an outage is preventable. A stream going offline because the ISP had an outage and you had no backup is not.</p>

<h2>The operator problem — and it's the real problem</h2>

<p>The best streaming system is the one your volunteer team can run confidently, every week, with whoever shows up. That means the system needs to be learnable, the failure modes need to be recoverable without a phone call to an engineer, and there need to be written runbooks for every common scenario your team encounters.</p>

<p>This is honestly where most church systems fail — not in the gear, but in the training and documentation. When I build a system for a church, the runbooks and the volunteer training are as important as the equipment list. The $20,000 system that only two people know how to run is less reliable than the $8,000 system that twelve volunteers can operate with confidence.</p>

<p>For going deeper on operating ATEM systems in a church environment — routing, transitions, graphics integration, volunteer training, and what to do when things go wrong during a live service — that's what <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">ATEM School</a> covers. Members also get direct reseller pricing on all Blackmagic gear.</p>

<h2>The right starting point</h2>

<p>One camera. One ATEM Mini Pro ISO SDI. Audio direct from the console. Wired Ethernet. Stream to YouTube.</p>

<p>That's a complete, professional-quality church streaming system that volunteers can operate. Add cameras, add production complexity, add polish as your team's confidence and skills grow. The one-camera stream done reliably every week is better than the six-camera production that falls apart twice a month. Get the fundamentals right, then scale.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Building a church streaming system?</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">As a certified Blackmagic Design reseller, we spec and build church streaming systems nationwide. ATEM School members get direct reseller pricing on all Blackmagic hardware — switchers, cameras, and infrastructure.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Get Member Pricing at ATEM School →</a>
    <a href="https://www.amazon.com/dp/B08BQMDF58?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">ATEM Mini Pro ISO SDI on Amazon →</a>
  </div>
</div>"""

# Locate slug position
slug_pos = raw.find(f'"slug": "{slug}"')
if slug_pos == -1:
    print(f"ERROR: slug {slug} not found")
    exit(1)

content_start_marker = '"content": "'
content_pos = raw.find(content_start_marker, slug_pos)
if content_pos == -1:
    print("ERROR: content field not found after slug")
    exit(1)

value_start = content_pos + len(content_start_marker)

i = value_start
while i < len(raw):
    if raw[i] == '\\':
        i += 2
        continue
    if raw[i] == '"':
        value_end = i
        break
    i += 1

escaped = new_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
new_content_section = f'"content": "{escaped}"'

new_raw = raw[:content_pos] + new_content_section + raw[value_end+1:]

with open('app/blog/blogData.js', 'w') as f:
    f.write(new_raw)

print(f"✅ Updated {slug}")
