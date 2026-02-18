with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'three-point-lighting-explained'
new_content = """<p>Years ago I was helping a church in North Carolina set up their first multicam streaming system. They'd bought decent cameras. The ATEM was wired and working. Everything looked right on paper.</p>

<p>The image looked terrible. Flat, dimensionless, like a security camera feed. The pastor looked like he was standing in a well-lit DMV office. You could see everything. Nothing looked interesting.</p>

<p>Their lighting was three-point — technically. Key at 45 degrees, fill opposite, backlight high and behind. The diagram said they did it right. But the fill was almost as bright as the key. The backlight was hitting the top of a bald head and blowing out. And the key itself was positioned 15 feet away with no modifier, so it was functionally the same hardness as a bare bulb.</p>

<p>The diagram tells you where to put lights. It doesn't tell you why. The why is everything.</p>

<h2>The Key Light Is the Sun</h2>

<p>Every scene in the natural world is lit by one dominant source. Human vision evolved around single-source directional light — sunlight filtered through atmosphere. That's why single-source directional lighting looks natural and three-dimensional even when it's artificial. We're wired to read it that way.</p>

<p>Your key light is the sun in your shot. It's the primary, dominant source that establishes direction, creates shadows, and gives the subject dimension. Position it so roughly two-thirds of the subject's face is illuminated and one-third falls into shadow. That shadow is not a problem to fix. The shadow is what creates depth. Without it you have a flat, even image with no sense of three-dimensionality.</p>

<p><strong>Softness is controlled by the size-to-distance ratio.</strong> A large light source close to the subject wraps around it, producing gradual shadow transitions — the look of an overcast sky, soft and natural. The same source moved far away becomes small relative to the subject and produces hard shadows with sharp edges — the look of a bare bulb in an empty room. Neither is wrong; they create different moods. Corporate interviews and church stages want soft. Dramatic narrative work might want harder. But you need to make this choice deliberately.</p>

<p>In practice: if you're using an <a href="https://www.amazon.com/s?k=Amaran+Ray+120c&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Amaran Ray 120c</a> as your key light in a home studio, place it at roughly 45 degrees and 5–6 feet from the subject with a diffusion panel or softbox attachment. That gives you a naturally soft source that reads beautifully on camera. For stage work, the <a href="https://www.amazon.com/s?k=Amaran+120c+LED&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Amaran 120c panel</a> with full RGBWW control is excellent for matching your stage wash and controlling output precisely.</p>

<h2>Fill Controls Shadow Depth — Not the Shadow Itself</h2>

<p>This is the mistake that flattened the North Carolina church's image. They thought the fill light was supposed to light the other side — to eliminate the shadow so the image wasn't too dark on one side. That thinking leads to fill lights that are too bright, which kills the depth the key light was creating.</p>

<p>The fill light's job is to control how deep the shadow is, not to remove it. The relationship between key and fill brightness is called the lighting ratio, and the ratio is the creative decision that sets the mood of the image.</p>

<p><strong>2:1 ratio</strong> — fill is half as bright as key. Very flat lighting, almost no visible shadow. Used for high-key beauty and commercial work. Reads bright and open, but without dimension.</p>

<p><strong>4:1 ratio</strong> — fill is one-quarter as bright as key. Clear shadow on the opposite side, but not dramatic. Faces look dimensional and natural. This is the right starting point for most broadcast, church stage, and interview work. I set almost every church production I build to 4:1 as the default and adjust from there.</p>

<p><strong>8:1 ratio</strong> — fill is one-eighth as bright as key. Deep, dramatic shadows. High contrast, strong directional mood. Used in narrative filmmaking and dramatic visual contexts where mood takes priority over clarity.</p>

<p>For a church stage or corporate setup, aim for 4:1. A small panel like the <a href="https://www.amazon.com/s?k=Amaran+F7x+LED&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Amaran F7x</a> at reduced output works well as fill — it's compact, inexpensive, and controllable enough to dial in exactly the ratio you want. A basic white reflector also works at this position and costs almost nothing.</p>

<h2>Why Flat Lighting Looks Wrong (Even When It's Bright)</h2>

<p>When key and fill are close in brightness — when both sides of the subject are nearly equally lit — the image looks flat. Not bad-exposure flat. Dimensionless flat. Everything is visible and nothing is interesting. Human vision evolved in a world lit by one dominant source; our brains register equally-lit scenes as subtly wrong even when we can't articulate why.</p>

<p>This is the most common error in church stage lighting I encounter. Multiple large fixtures — LED washes, front fill bars, overhead fixtures — all hitting the stage from different angles at similar intensities. The subject is bright and evenly exposed. And completely flat. The camera image looks like a surveillance feed.</p>

<p>The fix is not adding more lights. It's establishing a clear dominant direction with a meaningful key-to-fill ratio. One side of your subject should be noticeably brighter than the other. That difference — even subtle, even at a 3:1 ratio — is what creates the perception of depth on a two-dimensional screen.</p>

<h2>The Backlight Does One Job: Separation</h2>

<p>On camera, subjects and backgrounds merge unless you actively separate them. The backlight — placed high and behind the subject, aimed at the back of the head and shoulders — creates a rim of light that visually pops the subject off the background. Without it, a dark-haired subject against a dark background becomes one undefined mass.</p>

<p>The backlight should be subtle. It's not trying to be seen — it's trying to create an edge. Roughly 1:1 to 2:1 with the key on the subject's back edge is the right starting point. The <a href="https://www.amazon.com/s?k=Aputure+MC+Pro+RGB&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Aputure MC Pro</a> is a compact, portable light I use regularly as a backlight — small enough to position on a tiny stand directly behind the subject, controllable via app, and it fits in any bag for location work. Feather it so the spill doesn't contaminate your background and you're done.</p>

<h2>Three-Point Lighting in Real Production</h2>

<p><strong>Church stage:</strong> The challenge is movement. Your speaker isn't sitting still — they're walking the stage, turning to screens, moving into different zones. The solution is to light zones, not a single position. Your key light positions need to create good directional lighting across the areas where your speaker will be. This means more fixtures and deliberate design, not just three lights. I typically use 4–6 fixtures to properly key a church stage with multiple preaching zones, plus fill and backlight as secondary elements.</p>

<p><strong>Home studio:</strong> The simplest application. Subject doesn't move. Position your key with a softbox at 45 degrees, your fill at reduced output on the opposite side, and a backlight on a small stand above and behind the subject. Lock it in and it stays. The Ray 120c handles key duties naturally at this scale. The Amaran F7x or a reflector handles fill. Aputure MC Pro handles back. This is a complete, professional-quality setup for under $500 total.</p>

<p><strong>Corporate interview:</strong> Same as home studio but you're setting up and tearing down on location. Portable, battery-capable options matter. The <a href="https://www.amazon.com/s?k=Amaran+200d+S+LED&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Amaran 200d S</a> with a portable softbox is a capable field key light. Aputure MC Pro for the backlight fits in a jacket pocket and runs all day on battery.</p>

<h2>The Diagram Was a Starting Point, Not the Answer</h2>

<p>The three-point diagram tells you positions. Positions without ratios, without understanding of source size and softness, without deliberate separation — they give you flat, mediocre lighting even when technically "correct." Understanding why each light exists and what it's doing to the image is what gives you actual control. Once you have that, the diagram becomes unnecessary. You're making decisions, not following instructions.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Build a Complete Three-Point Setup</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">The lights I'd use for a home studio or church stage three-point rig. Check current pricing on Amazon.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://www.amazon.com/s?k=Amaran+Ray+120c&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Ray 120c (Key) on Amazon →</a>
    <a href="https://www.amazon.com/s?k=Aputure+MC+Pro&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">MC Pro (Back) on Amazon →</a>
  </div>
</div>

<p style="font-size:0.9rem;color:#666;text-align:center;"><em>Amazon links are affiliate links. We earn a small commission at no cost to you.</em></p>"""

slug_pos = raw.find(f'"slug": "{slug}"')
if slug_pos == -1:
    print(f"ERROR: slug {slug} not found"); exit(1)

content_start_marker = '"content": "'
content_pos = raw.find(content_start_marker, slug_pos)
if content_pos == -1:
    print("ERROR: content field not found"); exit(1)

value_start = content_pos + len(content_start_marker)
i = value_start
while i < len(raw):
    if raw[i] == '\\': i += 2; continue
    if raw[i] == '"': value_end = i; break
    i += 1

escaped = new_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
new_raw = raw[:content_pos] + f'"content": "{escaped}"' + raw[value_end+1:]

with open('app/blog/blogData.js', 'w') as f:
    f.write(new_raw)
print(f"✅ Updated {slug}")
