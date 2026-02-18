
import sys
sys.path.insert(0, '.')

with open('app/blog/blogData.js', 'r') as f:
    raw = f.read()

slug = 'bitfocus-companion-stream-deck-live-production'
new_content = """<p>A church in suburban Nashville called me last year. They'd been running an ATEM Mini Pro ISO for about eight months, and their production had grown to the point where they had three camera operators, a graphics person running ProPresenter, and a volunteer managing HyperDeck playback for pre-produced video content. Each of them had their own controller, their own screen, their own world. Coordination happened by radio, by hand signals, by someone shouting across the production area.</p>

<p>I asked if they had a Stream Deck. They did — an <a href="https://www.amazon.com/dp/B09738CV2G?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Elgato Stream Deck XL</a> sitting on the switching desk running the factory Elgato app, mostly being used to mute cameras.</p>

<p>That was the problem.</p>

<p>A Stream Deck without Bitfocus Companion is a $200 box of generic buttons. With Companion, it becomes a controller that bridges your entire production. One button press: the ATEM cuts to camera three, the HyperDeck rolls the offering bumper video, the ProPresenter operator's cue fires. Nothing shouted across the room. Nothing missed because of a radio callout someone didn't hear.</p>

<h2>What Companion actually does — not the marketing version</h2>

<p>Companion is free software — download it at bitfocus.io — that runs on a computer on your local network. It's middleware: it sits between your control surface and everything else on the production network and acts as the translator.</p>

<p>The module library is what makes it powerful. Every major piece of production gear has a Companion module: ATEM switchers, <a href="https://www.amazon.com/s?k=Blackmagic+HyperDeck&tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer">Blackmagic HyperDeck recorders</a>, PTZ cameras, OBS, vMix, Dante audio controllers, ProPresenter, lighting consoles. When your gear has a module, Companion can send commands to it and receive state feedback from it. You're not just pressing buttons — the buttons respond to what's actually happening in the system. A button goes green when recording is active. Goes red when the HyperDeck is paused. The panel becomes a live status board for your production, not just a command sender.</p>

<p>The Stream Deck is the most common control surface for this — it's what most operators already have and what Companion was originally built around. But any button panel works. An iPad via the Companion web interface. A Stream Deck Mini as a secondary panel for an audio operator. A custom button panel bolted to a camera cart.</p>

<h2>The gear that doesn't talk — now it does</h2>

<p>The most valuable thing Companion does is bridge equipment that was never designed to communicate. Your ATEM and your HyperDeck both speak Blackmagic — they have some native relationship. But your ATEM and your PTZ cameras? Your HyperDeck and your audio console? Nothing. They live in separate worlds and have never been introduced.</p>

<p>Companion is the introduction. It speaks the IP control protocol of each device and translates between them. Once you've assigned triggers across devices, the coordination that used to require radio headsets or hand signals is reduced to a single button press.</p>

<p>Back to Nashville: after we built out their Companion setup, three volunteers became two. The coordination overhead dropped enough that the graphics person could be cut — not because someone lost a job, but because the production was now designed to coordinate itself. That's what good automation does in live production. It removes the cognitive load of juggling multiple systems and lets operators focus on the show.</p>

<h2>It scales exactly as far as your production demands</h2>

<p>The entry point is a single-action button. Cut to input 3. Start the HyperDeck. Mute a microphone. Those take five minutes to build and immediately make a Stream Deck more useful than anything the stock Elgato software can do.</p>

<p>From there, multi-step macros. Conditional logic. Feedback that changes button color based on live device state. Variables that pull data from your devices and display them as button labels — the current HyperDeck clip name, the ATEM input routed to a particular aux output. Scheduled triggers. The complexity ladder goes as high as your production demands and not one step further.</p>

<p>A solo operator running a small church service might have twelve buttons. A broadcast facility running Companion across a full control surface might have hundreds of triggers. Both are valid. The system doesn't impose complexity — you build exactly what you need and nothing else.</p>

<h2>The learning curve is real, but it's front-loaded</h2>

<p>The Companion interface takes time to understand. The trigger/action/feedback model is logical once you see it, but getting to that moment requires a few hours with the documentation and some hands-on experimentation. The good news: the hard part comes first. Once you have one trigger built correctly, the rest follow the same pattern, and the system gets faster to build with every button you add.</p>

<p>For integrating Companion into an ATEM-based production specifically — the button layouts that actually get used in live church services, how to structure macros for predictable outcomes, how to build the HyperDeck playback workflow that lets a single operator roll pre-produced content reliably — that's what we cover at ATEM School in depth.</p>

<div style="background:#FEF2F2;border:2px solid #FECACA;border-radius:0.75rem;padding:1.5rem;margin:2rem 0;text-align:center;">
  <p style="font-weight:700;color:#B91C1C;font-size:1.05rem;margin:0 0 0.5rem;">Want the full Companion + ATEM workflow?</p>
  <p style="color:#374151;margin:0 0 1rem;font-size:0.95rem;">ATEM School covers Bitfocus Companion integration from scratch — button layouts, macros, and real setups from live church and event productions.</p>
  <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
    <a href="https://atemschool.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#B91C1C;color:white;text-decoration:none;border-radius:0.5rem;font-weight:600;">Learn at ATEM School →</a>
    <a href="https://www.amazon.com/dp/B09738CV2G?tag=disbrowproduc-20" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:0.7rem 1.5rem;background:#fff;color:#B91C1C;text-decoration:none;border-radius:0.5rem;font-weight:600;border:2px solid #FECACA;">Elgato Stream Deck XL on Amazon →</a>
  </div>
</div>"""

# Locate slug position
slug_pos = raw.find(f'"slug": "{slug}"')
if slug_pos == -1:
    print(f"ERROR: slug {slug} not found")
    exit(1)

# Find content field after slug position
content_start_marker = '"content": "'
content_pos = raw.find(content_start_marker, slug_pos)
if content_pos == -1:
    print("ERROR: content field not found after slug")
    exit(1)

value_start = content_pos + len(content_start_marker)

# Walk through to find unescaped closing quote
i = value_start
while i < len(raw):
    if raw[i] == '\\':
        i += 2
        continue
    if raw[i] == '"':
        value_end = i
        break
    i += 1

# Escape new content for JSON string
escaped = new_content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
new_content_section = f'"content": "{escaped}"'

new_raw = raw[:content_pos] + new_content_section + raw[value_end+1:]

with open('app/blog/blogData.js', 'w') as f:
    f.write(new_raw)

print(f"✅ Updated {slug}")
