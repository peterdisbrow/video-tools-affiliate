
with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'which-atem-mini-should-you-buy'
new_content = """<p>A few months ago I did a consultation for a church in Georgia that had just bought an ATEM Mini. The $295 one. They'd watched a YouTube video that said it was "the best budget switcher," set it up in their sanctuary, and discovered immediately that they couldn't see their cameras before cutting to them. No multiview. They were switching blind.</p>

<p>That church spent $295 on a switcher they couldn't use for broadcast and had to buy a different one. I hear variations of this story regularly — someone made the wrong call at the entry point of the lineup because the spec sheet didn't make the stakes clear enough.</p>

<p>I'm going to make them clear now, as someone who sells this hardware and has built these systems for years.</p>

<h2>Skip the basic ATEM Mini — here's why</h2>

<p>The $295 <a href="https://www.amazon.com/s?k=ATEM+Mini&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini</a> is missing one thing that makes it a non-starter for almost every real broadcast application: multiview.</p>

<p>Multiview is the divided screen that shows all your camera inputs simultaneously. It's how you see what's on each camera before you cut to it. Without it, you're switching based on memory and hope — you don't know if the camera is framed correctly, if the operator moved, if there's someone in the shot they shouldn't be. For presentation switching in a small conference room where you know every angle is always the same, it might be acceptable. For live broadcast of any kind, it's not a real option.</p>

<p>The ATEM Mini is designed for a specific, narrow use case. If you need it for that use case, it works. For everyone else, start your search at the Mini Pro.</p>

<h2>The question that decides your path: how far are your cameras?</h2>

<p>Before you go further in the lineup, answer this: how far will your cameras be placed from the switcher?</p>

<p>If the answer is under 15 feet — small conference room, desktop setup, everything close together — HDMI works. The cable is cheap, widely available, and reliable at short distances.</p>

<p>If the answer is anything like a real sanctuary, event space, or multi-camera production environment, you need SDI. Here's why: HDMI wasn't built for production cable runs. Fifteen feet is the practical limit for reliable signal at 1080p without signal boosters. The connector doesn't lock — it holds through friction. In a live production where cables get stepped on and equipment gets bumped, friction isn't enough. And you can't run custom-length HDMI the way you can with SDI bulk cable and BNC connectors.</p>

<p>SDI was designed for broadcast. Runs reliably to 300 feet at 3G-SDI. BNC connectors lock and won't pull out accidentally. You can terminate your own custom lengths with basic tools. For any production where cameras are spread across a stage or sanctuary, SDI isn't the professional upgrade — it's the basic requirement.</p>

<h2>Always get the ISO version</h2>

<p>Once you're in the SDI models, the ISO question is simple: always yes.</p>

<p>The ISO version records every camera input as a separate file simultaneously with the program feed. Your three-camera service becomes four files — camera 1, camera 2, camera 3, and the switched program. For live streaming, this seems optional. For everything that happens after the stream, it's not.</p>

<p>Missed a reaction shot? It's in the ISO. A moment you want to clip for social? Check the ISO. Want to re-edit the message for your sermon archive with better camera cuts than what happened live? Every angle is there. The ISO recording is your insurance policy and your post-production raw material in one.</p>

<p>The price difference between the standard and ISO versions is modest relative to what you're protecting and creating. Get the ISO.</p>

<h2>Four inputs or eight?</h2>

<p>Now it's just a camera count question.</p>

<p>The <a href="https://www.amazon.com/dp/B08BQMDF58?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini Pro ISO SDI</a> gives you four inputs with multiview, built-in streaming over Ethernet, and ISO recording of every source. For a small-to-medium church running a main camera, a close shot on the pulpit, and a worship team angle — this covers it completely. Most churches I work with start here and stay here for years.</p>

<p>The <a href="https://www.amazon.com/s?k=ATEM+Mini+Extreme+ISO&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM Mini Extreme ISO</a> gives you eight inputs, SuperSource for picture-in-picture compositing, more auxiliary outputs, and significantly more routing flexibility. When you're running a wide shot, close shot, worship team angle, speaker close-up, confidence monitor feed, and a graphics return — the Extreme ISO is where you end up. Also the right call if you want room to grow without another switcher purchase.</p>

<h2>Get the G2 if budget stretches</h2>

<p>Blackmagic's G2 models are genuine generational improvements — better performance, improved reliability, refinements from years of real-world deployment. If you're buying new and the G2 is available at a price that works, get the G2. It's not a minor revision.</p>

<h2>The short decision guide</h2>

<ul>
  <li><strong>Conference room presentation switching:</strong> ATEM Mini</li>
  <li><strong>Small multicam, short cable runs, tight budget:</strong> ATEM Mini Pro ISO (HDMI)</li>
  <li><strong>Any real broadcast environment, cameras over 15 feet away:</strong> ATEM Mini Pro ISO SDI</li>
  <li><strong>Eight cameras, multiple outputs, maximum routing:</strong> ATEM Mini Extreme ISO SDI</li>
  <li><strong>Best available, budget allows:</strong> ATEM Mini Extreme ISO G2</li>
</ul>

<p>As an authorized Blackmagic Design reseller, I can help you find the right unit for your specific environment — cable runs, camera count, output destinations. ATEM School members also get direct reseller pricing on the full Mini lineup.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Need help choosing the right ATEM for your setup?</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">As a certified Blackmagic Design reseller, we spec ATEM systems for churches and productions nationwide. ATEM School members get member pricing on all hardware.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Join ATEM School (Member Pricing) →</a>
    <a href="https://www.amazon.com/dp/B08BQMDF58?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">ATEM Mini Pro ISO on Amazon →</a>
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
