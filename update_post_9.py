
with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'church-streaming-system-5000-dollars'
new_content = """<p>Last fall, a church administrator sent me a spreadsheet. They'd done their research — YouTube videos, forum threads, gear review sites — and built a $5,000 shopping list for their new streaming setup. PTZ cameras, a consumer HDMI switcher, a laptop for streaming software, a separate audio recorder, WiFi connection.</p>

<p>Every individual item on the list was a reasonable product. The system was wrong.</p>

<p>I've seen versions of this spreadsheet more times than I can count. People spend weeks researching individual pieces of gear without understanding how those pieces work together — or fail together — in a live production environment. $5,000 is enough to build a genuinely professional church streaming system. But only if you spend it in the right places, in the right order, on the right architecture.</p>

<p>Here's exactly what I'd build.</p>

<h2>The switcher: ATEM Mini Pro ISO SDI (~$595)</h2>

<p>The <a href="https://www.amazon.com/s?k=ATEM+Mini+Pro+ISO+SDI&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini Pro ISO SDI</a> is the right switcher for this budget. Not the HDMI version — specifically the SDI model.</p>

<p>In a sanctuary, cameras are spread out. Main camera at the back center, a close-up at the side, a wide shot from an elevated position. HDMI doesn't reliably run more than 15 feet. SDI runs 300 feet without amplification. The SDI model solves a real physical problem that you will encounter every single week. The $100 price difference between HDMI and SDI versions is the best $100 in this entire build.</p>

<p>The ISO recording function is your second reason. Every camera input records as a separate file simultaneously with the program feed. You have the live switched output plus all four individual camera recordings for every service. Re-edit the message for YouTube with better cuts than what happened live. Pull clips for social. Archive every service with full camera options available. The ISO recording is your production insurance policy.</p>

<p>Built-in streaming via Ethernet eliminates the streaming computer entirely. The ATEM connects to your network and streams directly to YouTube, Facebook, or any custom RTMP destination. One fewer device in the chain. One fewer failure point. That matters on Sunday morning.</p>

<h2>Cameras: Blackmagic Studio Camera (~$1,200–1,800 each × 2)</h2>

<p>For church production, I build around <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">Blackmagic Studio Cameras</a> over mirrorless alternatives at this budget. The reason is integration: talkback, tally lights, and full camera control travel over a single SDI or fiber cable back to the ATEM. Camera operators know when they're on air. The director adjusts iris, white balance, and gain on all cameras from the switcher position without touching the cameras. Your volunteers aren't running back and forth across the sanctuary to adjust exposure when the lighting changes.</p>

<p>This is how professional broadcast works, and it works the same way in a 200-seat sanctuary.</p>

<p>I'm an authorized Blackmagic Design reseller — <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">ATEM School members get member pricing on Blackmagic cameras and equipment</a> that isn't available through general retail channels. If Blackmagic cameras are in your build, talk to us before buying anywhere else.</p>

<p>If the Blackmagic camera budget is tight, a <a href="https://www.amazon.com/dp/B0C5GCGJG3?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Sony a6700</a> with a <a href="https://www.amazon.com/s?k=Blackmagic+Mini+Converter+SDI+HDMI&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Blackmagic BiDi converter</a> for SDI output is a strong alternative. Excellent image in mixed sanctuary lighting, handles extended run times without overheating, and the Sony glass ecosystem is deep. You lose the integrated camera control, but the image quality is excellent.</p>

<h2>Audio: from the console ($0 in new equipment)</h2>

<p>This is where church streaming systems go wrong most reliably. People buy dedicated audio hardware for streaming — a separate recorder, an audio interface, a mixing solution — instead of taking a direct feed from the existing sound console.</p>

<p>Your church already has a sound system. That console has a direct stereo output or a mix-minus send that goes directly into the ATEM Mini Pro ISO's audio input. The audio your congregation hears in the room — properly gated, compressed, and mixed by your sound engineer — goes directly to the stream. No new hardware required. No separate audio recorder to sync in post.</p>

<p>You need a cable run from the console to the switcher position and the right adapter for the connector type. That's the entire audio solution. Solve the cable once and the audio workflow is done for every service going forward. The church that bought a $400 audio recorder for streaming when they had an X32 ten feet away is a story I've heard in six variations.</p>

<h2>Networking: wired Ethernet (non-negotiable)</h2>

<p>Do not stream over WiFi. This is a hard rule, not a strong preference. WiFi introduces latency variability, packet loss risk, and interference variables that a live stream cannot absorb. A single packet dropout at the wrong moment can freeze the stream visible to every online viewer.</p>

<p>A wired Cat6 run from the switcher to your network costs almost nothing. Run it once. It eliminates an entire category of streaming failures. If your facility doesn't have Ethernet near your production position, pay an electrician to run a drop. It's one of the best investments in the build.</p>

<h2>Budget allocation</h2>

<ul>
  <li><strong>ATEM Mini Pro ISO SDI:</strong> ~$595 (Amazon)</li>
  <li><strong>2× Blackmagic Studio Cameras:</strong> ~$2,400–3,600 (member pricing via <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer">atemschool.com</a>)</li>
  <li><strong>Fluid head tripods, 2×:</strong> ~$400–600</li>
  <li><strong>SDI cable runs, BiDi converters, misc hardware:</strong> ~$200–300</li>
  <li><strong>Console audio adapter/cable:</strong> ~$50</li>
</ul>

<p>Total range: $3,645–$5,145 depending on camera choice and existing infrastructure. If you land at the lower end, the remaining budget covers spare cables, a backup power strip with surge protection, and a basic monitoring setup at the switching position.</p>

<h2>What not to spend money on at this budget</h2>

<p><strong>PTZ cameras.</strong> Quality PTZ cameras for church production — ones that won't look visibly worse than your manned cameras in a cut — cost more than you'd expect. Consumer PTZ units at $500-800 will look noticeably different in the production cut. Good PTZ cameras run $1,500-2,500 each. At a $5,000 total build budget, PTZ cameras consume the budget you need for the switcher and primary cameras. Volunteer operators on well-positioned fixed cameras produce better results at this budget level.</p>

<p><strong>4K production.</strong> Your stream is going to YouTube at 1080p. Most viewers watch on a phone. 4K acquisition adds cost in storage, processing, and hardware without a visible difference to 95% of your audience. Excellent 1080p production beats mediocre 4K production, and at $5,000 you can execute 1080p very well.</p>

<p><strong>Lower thirds hardware or character generator.</strong> The ATEM Mini Pro ISO handles graphics in software via ATEM Software Control. You don't need a separate character generator at this budget. Add graphics capability through software first; add dedicated hardware when volume and complexity justify it.</p>

<h2>The test for a good system at this budget</h2>

<p>Can a volunteer who wasn't there last week sit down at the switcher, receive a brief orientation from someone who was, and run the service without the system failing? If yes, you built the right system.</p>

<p>Reliability and learnability are the professional standards for a volunteer-operated production environment. $5,000 is enough to build both — if the money goes to the right architecture and not to complexity your team can't operate confidently every week.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Get Blackmagic member pricing + ATEM Mini Pro ISO</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">As a certified Blackmagic Design reseller, ATEM School members get direct pricing on Studio Cameras and the full Blackmagic lineup. The ATEM Mini Pro ISO SDI is available on Amazon today.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Blackmagic Member Pricing at ATEM School →</a>
    <a href="https://www.amazon.com/s?k=ATEM+Mini+Pro+ISO+SDI&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">ATEM Mini Pro ISO on Amazon →</a>
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
