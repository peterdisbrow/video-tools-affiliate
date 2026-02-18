
with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'atem-constellation-me-explained'
new_content = """<p>I was on a call last spring with a worship pastor who'd just bought an ATEM Mini Extreme ISO. The system was six months old and it was already hitting its ceiling. His problem: the screens in the sanctuary needed to show something different from what was going out online. In-room IMAG — full-screen cameras, no lower thirds — while the online stream ran a completely separate production with speaker names, graphic packages, and a different cut style for a congregation watching from home.</p>

<p>He'd read about the ATEM Constellation and its "2 M/E" configuration. He couldn't figure out what that meant. He asked me, and what I told him next is what I'm going to tell you — because once you understand it, the entire Constellation lineup makes sense immediately.</p>

<h2>M/E stands for Mix/Effects — and the name tells you everything</h2>

<p>The M/E designation describes two distinct production jobs. Understanding both unlocks why multiple M/Es matter.</p>

<p><strong>Mix bus:</strong> A fully switched program output going to a specific destination. You're mixing a production — cutting between cameras, adding graphics, building a complete picture — and sending it somewhere. Your main program feed is a mix bus.</p>

<p><strong>Effects bus:</strong> A staging area where you compose a complex shot or graphic composition that then feeds into another M/E as a source. You build the thing on the effects bus while the audience watches the mix bus. When it's ready, you bring it in cleanly.</p>

<p>Each M/E in a Constellation is a complete, fully independent production environment. Its own program output. Its own preview. Its own keyers. Its own transition section. In a 2 M/E switcher, two of these run simultaneously.</p>

<h2>The two-output scenario that forces the upgrade</h2>

<p>Back to that worship pastor. Here's his exact situation:</p>

<p>M/E 1 runs the in-room IMAG. Cameras switching between the worship team, the speaker, the congregation. Clean full-screen images with no lower thirds — the room experience.</p>

<p>M/E 2 runs the online stream. Same cameras, but with lower thirds identifying speakers, a different graphic package, additional cuts to B-roll that the in-room audience wouldn't need. A production designed for someone watching at home who's never been to the building.</p>

<p>One technical director can run both. The Constellation gives each program its own physical rows of buttons on a hardware panel. Two separate productions, two separate outputs, one operator who can manage both. This is the 2 M/E use case, and it's exactly why most churches eventually need it.</p>

<h2>The effects bus in practice — staging shots in real time</h2>

<p>The second use of an M/E is more sophisticated, but once you've seen it, you can't unsee it.</p>

<p>You're switching a live event on M/E 1 — cameras, cuts, the program going out to the world. Meanwhile on M/E 2, you're composing a complex shot: a two-box interview frame with lower thirds positioned correctly, a keyed logo, everything precisely placed. When it's ready — and only when it's ready — you take M/E 2 as a source into M/E 1.</p>

<p>This is staging. Instead of trying to build a complex visual live on your program bus while everyone's watching, you build it on a second M/E and bring it in when it's done. No audience sees the construction. They see only the finished product, cut in cleanly.</p>

<p>This is why M/E stands for Mix/Effects — the same physical bus does both jobs depending on how you're using it. One production environment running the main show. Another composing what comes next.</p>

<h2>When to move from the Mini lineup to Constellation</h2>

<p>The ATEM Mini tops out at the Extreme ISO: eight HDMI inputs, one M/E, one program output. For a lot of productions, that's enough for years.</p>

<p>The moment you need a second simultaneous program output — in-room vs. online, main stage vs. overflow room, broadcast feed vs. confidence monitors with different content — you've hit the ceiling. The Constellation is where you go next.</p>

<p>Other signals it's time: your input count is approaching eight and you're not done planning cameras. You need a dedicated graphics operator running a separate M/E while the TD switches program. You're mixing SDI sources from multiple formats and spending money on external standards converters — every Constellation input has one built in. You need aux outputs routed independently to multiple destinations.</p>

<p>For most churches and corporate AV environments doing multicam with a streaming component and in-room displays, the <a href="https://www.amazon.com/s?k=ATEM+2ME+Constellation+HD&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">ATEM 2 M/E Constellation HD</a> covers it completely. It's the workhorse of the category — the switcher I spec most often for mid-to-large venue builds.</p>

<h2>Control options: software and hardware</h2>

<p>The Constellation runs entirely through ATEM Software Control — free, Mac or PC, full access to every feature on every M/E. That's the starting point and it works well.</p>

<p>For serious productions, adding a hardware panel changes the operational feel significantly. The <a href="https://www.amazon.com/s?k=ATEM+2ME+Advanced+Panel&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">2 M/E Advanced Panel</a> gives your TD a dedicated physical row for each M/E — buttons, T-bar, source selection, aux routing — all accessible by touch in a darkened production environment without looking at a screen. Physical controls let operators stay eyes-up on program in a way software control doesn't.</p>

<p>As an authorized Blackmagic Design reseller, ATEM School members get direct pricing on Constellation hardware — both the switchers and the hardware panels. If you're spec'ing a system, reach out before buying retail.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Ready to spec a Constellation for your venue?</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">As a certified Blackmagic Design reseller, we can spec the right system for your camera count, destinations, and production goals. ATEM School members get member pricing on all Blackmagic hardware.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Get Member Pricing at ATEM School →</a>
    <a href="https://www.amazon.com/s?k=ATEM+2ME+Constellation+HD&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">ATEM Constellation on Amazon →</a>
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
