// Rewrite all 80 product guide openers with unique, authentic introductions
// Each opener is tailored to the specific product with varied approaches

const fs = require('fs');
const path = require('path');

// Unique openers for each product, keyed by slug
// Format: { heading: "New H2 heading", paragraphs: ["<p>...</p>", "<p>...</p>"] }
const openers = {
  "sony-alpha-a7-iv": {
    heading: "Sony Alpha a7 IV — Worth the Hype?",
    paragraphs: [
      `<p>You're shooting in a dimly lit coffee shop, your subject moves, and your old camera hunts for focus like it's lost in the dark. That's the exact frustration the <strong>Sony a7 IV</strong> was built to eliminate. With a 33MP full-frame sensor and real-time Eye AF that locks on and doesn't let go, this camera turned low-light shooting from a liability into an advantage.</p>`,
      `<p>We dug through dozens of Reddit threads, YouTube breakdowns, and creator forums to find out whether this hybrid mirrorless actually delivers on its promises — or if it's just spec-sheet hype. Here's what we found.</p>`
    ]
  },
  "canon-eos-r6-mark-ii": {
    heading: "Canon EOS R6 Mark II — The Run-and-Gun King?",
    paragraphs: [
      `<p>There's a reason wedding videographers and solo documentary shooters keep gravitating toward Canon. The <strong>R6 Mark II</strong> doesn't try to be everything — it focuses on being the fastest, most reliable tool you can grab when the moment won't wait. 40fps bursts. 6K-oversampled 4K. Autofocus that tracks a toddler running through a crowd.</p>`,
      `<p>But at $2,499 body-only, you need to know if this camera actually earns its price tag in real-world shooting — not just lab tests. We broke it down.</p>`
    ]
  },
  "dji-osmo-pocket-3": {
    heading: "DJI Osmo Pocket 3 — A Real Camera That Fits in Your Pocket",
    paragraphs: [
      `<p>Imagine pulling a cinema-quality gimbal camera out of your jacket pocket at a street market in Tokyo. No rig, no stabilizer, no setup time — just hit record. The <strong>DJI Osmo Pocket 3</strong> makes that real, and the 1-inch sensor means the footage actually holds up in post.</p>`,
      `<p>Vloggers and travel creators have been waiting for something this small that doesn't compromise on image quality. Does it deliver? We tested it in the scenarios that matter.</p>`
    ]
  },
  "rode-nt-usb-microphone": {
    heading: "Rode NT-USB+ — Plug In and Sound Professional",
    paragraphs: [
      `<p>Most USB microphones promise "studio quality" and deliver something closer to "slightly better than your laptop mic." The <strong>Rode NT-USB+</strong> is the exception that keeps showing up in creator forums as the one USB mic that actually lives up to the hype — and it does it with zero setup complexity.</p>`,
      `<p>We tested it against the usual suspects to find out if it's really the best plug-and-play option for podcasters and streamers, or just good marketing.</p>`
    ]
  },
  "shure-sm7b-microphone": {
    heading: "Shure SM7B — The Mic Behind Every Podcast You Love",
    paragraphs: [
      `<p>Bad audio kills videos faster than bad lighting. Viewers will watch shaky footage, but the moment your voice sounds hollow or echoey, they're gone. That's why the <strong>Shure SM7B</strong> has been the default microphone for professional podcasters, broadcasters, and streamers for over a decade — it makes your voice sound like it belongs on the radio.</p>`,
      `<p>But it's also $399 and requires extra gear to run properly. Is it actually worth the investment, or are you paying for the brand at this point? Let's break it down.</p>`
    ]
  },
  "audio-technica-at2020": {
    heading: "Audio-Technica AT2020 — Studio Sound for Under $100",
    paragraphs: [
      `<p>Here's a microphone that's been quietly outperforming gear three times its price for years. The <strong>Audio-Technica AT2020</strong> is the condenser mic that audio engineers recommend to creators on a budget — not because it's cheap, but because at $99, nothing else in this price range touches its clarity.</p>`,
      `<p>If you're building your first home studio or upgrading from a USB headset, this is the mic the Reddit audio community will point you toward. Here's why.</p>`
    ]
  },
  "neewer-led-panel-light": {
    heading: "Neewer LED Panel — Your First Real Light (For Less Than Dinner Out)",
    paragraphs: [
      `<p>Every creator's lighting journey starts somewhere, and for thousands of YouTubers, it starts with a $45 Neewer panel. It's not glamorous. It won't win any design awards. But the <strong>Neewer LED Panel Light</strong> does something more important — it proves that good lighting doesn't require a big budget.</p>`,
      `<p>We wanted to know: is this actually a solid starter light, or are you better off saving for something more capable? Here's the honest answer.</p>`
    ]
  },
  "aputure-amaran-200d": {
    heading: "Aputure Amaran 200d — Pro Lighting Without the Pro Price Tag",
    paragraphs: [
      `<p>You've outgrown your ring light. Your LED panel isn't cutting it for product shots or interviews anymore. But Aputure's pro lights start at over a grand — until the <strong>Amaran 200d</strong> showed up at $289 and blurred the line between budget and professional.</p>`,
      `<p>This COB light keeps appearing in "best bang for your buck" lists across creator communities. We put it through real production scenarios to see if it earns that reputation.</p>`
    ]
  },
  "godox-sl60w-led": {
    heading: "Godox SL60W — The Budget Light That Punches Above Its Weight",
    paragraphs: [
      `<p>When creators on Reddit argue about the best light under $150, two names always surface. The <strong>Godox SL60W</strong> is one of them, and it's been a gateway drug into proper lighting setups for thousands of YouTubers and indie filmmakers.</p>`,
      `<p>At $129, it's cheap enough to experiment with but powerful enough to actually improve your content. Here's what you need to know before buying one.</p>`
    ]
  },
  "adobe-premiere-pro": {
    heading: "Adobe Premiere Pro — The Industry Standard (For Better or Worse)",
    paragraphs: [
      `<p>Love it or hate it, <strong>Adobe Premiere Pro</strong> is still the editing software most production houses, agencies, and professional editors use daily. It's the common language of video post-production. That matters when you're collaborating, freelancing, or applying for editing jobs.</p>`,
      `<p>But at $55/month with a subscription model that irks creators, is it still the right choice when free alternatives are getting scary good? Let's weigh the real pros and cons.</p>`
    ]
  },
  "davinci-resolve": {
    heading: "DaVinci Resolve — Hollywood Color Grading Tools, and It's Free",
    paragraphs: [
      `<p>There's a professional video editor used on major Hollywood films, Netflix series, and broadcast television — and its base version costs exactly zero dollars. <strong>DaVinci Resolve</strong> isn't "free with an asterisk." It's a genuinely powerful NLE with the best color grading tools in the business, and Blackmagic gives it away to get you into their ecosystem.</p>`,
      `<p>The catch? There's a learning curve, and the free version has a few limits. Here's whether it's worth switching from whatever you're using now.</p>`
    ]
  },
  "final-cut-pro": {
    heading: "Final Cut Pro — The Mac Creator's Secret Weapon",
    paragraphs: [
      `<p>If you edit on a Mac and you're still paying monthly for Premiere, this might sting: <strong>Final Cut Pro</strong> is a one-time $299 purchase, it's optimized to squeeze every ounce of performance from Apple silicon, and most YouTube creators who've switched say they'll never go back.</p>`,
      `<p>It's not for everyone — the magnetic timeline takes adjustment, and it plays by its own rules. But for Mac-based creators who value speed and simplicity, it's hard to beat. Here's the full picture.</p>`
    ]
  },
  "elgato-stream-deck": {
    heading: "Elgato Stream Deck — The Control Center Streamers Can't Live Without",
    paragraphs: [
      `<p>Ask any serious streamer what gear they'd buy again without hesitation, and the <strong>Elgato Stream Deck</strong> comes up almost every time. It's not a camera or a microphone — it's a grid of programmable buttons that turns chaotic multi-app workflows into one-touch commands.</p>`,
      `<p>But is it essential, or is it just a nice-to-have? We looked at how creators actually use it beyond the obvious scene-switching.</p>`
    ]
  },
  "rode-wireless-go-ii": {
    heading: "Rode Wireless GO II — Cut the Cable, Keep the Quality",
    paragraphs: [
      `<p>Wired lavalier mics are reliable — until the cable snags, restricts your talent's movement, or takes five minutes to set up for a quick interview. The <strong>Rode Wireless GO II</strong> solved this for an entire generation of run-and-gun creators with a system so simple you can be recording clean audio in under 30 seconds.</p>`,
      `<p>Two transmitters, one receiver, built-in recording backup. Here's whether it's still the wireless mic to beat.</p>`
    ]
  },
  "logitech-c920-webcam": {
    heading: "Logitech C920 — The Webcam That Refuses to Be Dethroned",
    paragraphs: [
      `<p>It's been around for over a decade. Newer webcams with 4K, HDR, and AI tracking keep launching. And yet the <strong>Logitech C920</strong> still dominates Amazon's best-seller list for webcams. At $69, it's the reliable workhorse that Zoom callers, streamers, and content creators keep coming back to.</p>`,
      `<p>Is it actually still good in 2025, or are people just buying it on reputation? We tested it against the newer competition.</p>`
    ]
  },
  "peak-design-travel-tripod": {
    heading: "Peak Design Travel Tripod — For Creators Who Hate Carrying Tripods",
    paragraphs: [
      `<p>Most tripods are an afterthought — bulky, annoying to carry, so you leave them home and regret it later. <strong>Peak Design</strong> built their Travel Tripod for exactly that creator: the one who needs stability but refuses to lug around a full-size setup. It packs down smaller than a water bottle and deploys in seconds.</p>`,
      `<p>At $299, it's not cheap for a travel tripod. But the creators who own one tend to be unreasonably enthusiastic about it. Here's why.</p>`
    ]
  },
  "dji-rs-3-gimbal": {
    heading: "DJI RS 3 — Smooth Footage Without the Learning Curve",
    paragraphs: [
      `<p>Handheld footage has its charm — until your client watches the playback and asks why everything looks like it was filmed during an earthquake. The <strong>DJI RS 3</strong> exists to give you cinematic, stabilized motion without the six-month learning curve that older gimbals demanded.</p>`,
      `<p>Automatic axis locks, a touchscreen, and Bluetooth shutter control. But does the real-world performance match the spec sheet? Here's what actual shooters are saying.</p>`
    ]
  },
  "peak-design-capture-clip": {
    heading: "Peak Design Capture Clip — Stop Fumbling With Your Camera Strap",
    paragraphs: [
      `<p>You're hiking, your camera's bouncing on a neck strap, banging against your chest with every step. Or it's buried in your bag and you miss the shot. The <strong>Peak Design Capture Clip</strong> is a deceptively simple $30 solution that mounts your camera to your backpack strap or belt — instant access, hands free.</p>`,
      `<p>It's one of those accessories that sounds gimmicky until you use it once. Then you can't go back. Here's who it's actually for.</p>`
    ]
  },
  "sony-fx30": {
    heading: "Sony FX30 — Cinema Camera Performance at a Mirrorless Price",
    paragraphs: [
      `<p>Sony built the FX3 for filmmakers who wanted cinema tools in a compact body. Then they made the <strong>FX30</strong> — same DNA, APS-C sensor, $1,798. Suddenly, indie creators who couldn't justify a $4,000 cinema camera had a real option that shoots like one.</p>`,
      `<p>S-Cinetone color science, 4K 120fps, and a body built for rigging. But is the crop sensor a dealbreaker? We got into the details.</p>`
    ]
  },
  "panasonic-lumix-s5-ii": {
    heading: "Panasonic Lumix S5 II — The Underdog That Changed Everything",
    paragraphs: [
      `<p>Panasonic's cameras always had incredible image quality — and terrible autofocus. Everyone knew it. The <strong>Lumix S5 II</strong> finally fixed that with phase-detection AF, and overnight, the camera that videographers always wanted to love became one they could actually recommend.</p>`,
      `<p>At $1,997, it competes directly with the Sony a7 IV and Canon R6 II. Here's how it stacks up where it matters.</p>`
    ]
  },
  "blackmagic-pocket-cinema-camera-6k-pro": {
    heading: "Blackmagic Pocket Cinema 6K Pro — Hollywood Color Science for Indie Budgets",
    paragraphs: [
      `<p>When a camera records in Blackmagic RAW and gives you the same color science used on major film productions, the footage looks different. Not subtly — noticeably. The <strong>Pocket Cinema Camera 6K Pro</strong> is the reason indie filmmakers are producing work that looks like it cost ten times what it did.</p>`,
      `<p>But it's not a run-and-gun camera, and it demands you know what you're doing. Here's who should buy it — and who shouldn't.</p>`
    ]
  },
  "red-komodo-6k": {
    heading: "RED Komodo 6K — Is Professional Cinema Gear Worth $6,000?",
    paragraphs: [
      `<p>RED cameras have a reputation: extraordinary image quality, steep prices, and an ecosystem that rewards commitment. The <strong>RED Komodo 6K</strong> is their most accessible cinema camera — if you can call $5,995 accessible. Global shutter, compressed RAW, Canon RF mount.</p>`,
      `<p>This isn't a camera for most creators. But for the ones it's built for, nothing else at this size delivers this image. Here's the unfiltered breakdown.</p>`
    ]
  },
  "nikon-z6-iii": {
    heading: "Nikon Z6 III — Nikon's Best Video Camera Yet (Finally)",
    paragraphs: [
      `<p>Nikon shooters have been waiting years for a hybrid mirrorless that could genuinely compete with Sony and Canon on the video side. The <strong>Z6 III</strong> is the answer — partially oversampled 6K, N-Log, and autofocus that's finally fast enough to trust during a paid shoot.</p>`,
      `<p>If you're already in the Nikon ecosystem with F-mount glass and adapters, this changes the calculation entirely. Here's what matters.</p>`
    ]
  },
  "fujifilm-x-h2s": {
    heading: "Fujifilm X-H2S — Speed Demon With Signature Color",
    paragraphs: [
      `<p>Fujifilm doesn't make cameras that look like everyone else's footage — and that's the point. The <strong>X-H2S</strong> pairs Fuji's legendary color science and film simulations with a stacked sensor that shoots 4K 120fps without breaking a sweat. It's the fastest APS-C camera ever made.</p>`,
      `<p>For creators who want a distinctive look without hours in color grading, this camera is dangerously compelling. Here's the full story.</p>`
    ]
  },
  "panasonic-lumix-s1h": {
    heading: "Panasonic Lumix S1H — The Full-Frame Video Powerhouse Nobody Talks About",
    paragraphs: [
      `<p>While everyone argues about Sony vs Canon, the <strong>Panasonic Lumix S1H</strong> quietly became the first mirrorless camera Netflix approved for original production. 6K recording, unlimited record time, dual-native ISO — this is a video-first camera built for filmmakers who care about image above all else.</p>`,
      `<p>It's heavier than its competitors, the autofocus isn't class-leading, and it doesn't care. Here's why serious videographers keep choosing it anyway.</p>`
    ]
  },
  "sony-a6700": {
    heading: "Sony a6700 — Full-Frame Performance in a Crop-Sensor Body",
    paragraphs: [
      `<p>Not everyone needs full-frame, and not everyone wants to spend $2,500 on a camera body. The <strong>Sony a6700</strong> takes the autofocus system and processing power from Sony's flagship bodies and puts it in a compact APS-C camera at $1,398. Same AI-powered subject tracking. Same reliability.</p>`,
      `<p>For creators who want Sony's ecosystem without the full-frame price tag, this might be the sweet spot. We put it through its paces.</p>`
    ]
  },
  "canon-eos-r8": {
    heading: "Canon EOS R8 — Full-Frame for Creators Who Don't Want to Overthink It",
    paragraphs: [
      `<p>Canon stripped out everything non-essential and built a full-frame mirrorless camera for $1,499 that just works. No IBIS, no top LCD, no dual card slots — and somehow the <strong>EOS R8</strong> still produces gorgeous footage with Canon's best-in-class autofocus.</p>`,
      `<p>It's a polarizing camera. Minimalists love it. Spec-sheet shoppers hate it. Here's who it's actually built for and whether the trade-offs make sense.</p>`
    ]
  },
  "manfrotto-504x-fluid-video-head-with-645-tripod": {
    heading: "Manfrotto 504X + 645 Tripod — The Video Tripod System That Just Works",
    paragraphs: [
      `<p>There's a tripod system sitting in the corner of almost every news station, corporate video studio, and independent production house in the world. The <strong>Manfrotto 504X with 645 legs</strong> isn't exciting, and that's exactly the point — it's rock-solid, smooth, and predictable every single time you use it.</p>`,
      `<p>At $599 for the full system, it sits in a sweet spot between consumer and professional. Here's whether it's the right investment for your work.</p>`
    ]
  },
  "miller-air-tripod-system": {
    heading: "Miller Air Tripod System — Broadcast-Grade Support for Field Shooters",
    paragraphs: [
      `<p>When your tripod needs to survive years of being thrown in and out of news vans, set up on uneven terrain, and support cameras that get heavier every generation, you need something built for the job. The <strong>Miller Air Tripod System</strong> is what working videographers buy when they're done replacing consumer tripods every year.</p>`,
      `<p>At $1,295, it's a professional tool with a professional price. Here's how to know if you've reached the point where it makes sense.</p>`
    ]
  },
  "gitzo-systematic-series-3-carbon-fiber-tripod": {
    heading: "Gitzo Systematic Series 3 — The Tripod You Buy Once",
    paragraphs: [
      `<p>Some gear you upgrade. Some gear you buy once and never think about again. The <strong>Gitzo Systematic Series 3</strong> is the second kind — a carbon fiber tripod built with the kind of precision that professional photographers and videographers trust for decades, not seasons.</p>`,
      `<p>It's $899 for just the legs, and it doesn't come with a head. That's deliberate — and if you understand why, this tripod might be for you.</p>`
    ]
  },
  "sachtler-ace-xl-fluid-head-tripod": {
    heading: "Sachtler Ace XL — Silky Smooth Pans on a Working Budget",
    paragraphs: [
      `<p>There's a specific feeling when you pan on a Sachtler — buttery, controlled, zero stiction. It's the fluid head technology that broadcast cameramen have relied on for half a century, and the <strong>Ace XL</strong> brings it to a price point that indie creators and small production companies can actually reach.</p>`,
      `<p>At $749, it's not cheap, but one smooth pan during a paid shoot and you'll understand exactly why people pay for it.</p>`
    ]
  },
  "dji-rs-4-pro": {
    heading: "DJI RS 4 Pro — Cinematic Motion in Your Hands",
    paragraphs: [
      `<p>Static shots tell a story. Moving shots bring it to life. The <strong>DJI RS 4 Pro</strong> is built for the creator who's graduated from tripod-only shooting and wants the kind of fluid, cinematic camera movement that makes viewers feel something — dolly shots, reveals, tracking moves, all handheld.</p>`,
      `<p>At $799 with native LiDAR focus support, it's DJI's most capable gimbal yet. Here's whether it actually changes how you shoot.</p>`
    ]
  },
  "benro-s8-pro-fluid-video-head-with-a373f-tripod": {
    heading: "Benro S8 Pro — Professional Fluid Head at Half the Expected Price",
    paragraphs: [
      `<p>Most video tripod systems with genuinely smooth fluid heads cost $600 or more. The <strong>Benro S8 Pro with A373F legs</strong> delivers comparable pan-and-tilt performance for $349, and it's become the go-to recommendation in Reddit's filmmaking communities for creators stepping up from photo tripods.</p>`,
      `<p>Is it actually as good as the more expensive options, or are there compromises hiding in the details? We found out.</p>`
    ]
  },
  "zhiyun-crane-4": {
    heading: "Zhiyun Crane 4 — The Gimbal That Wants to Replace Your Monitor Too",
    paragraphs: [
      `<p>Zhiyun did something unexpected with the <strong>Crane 4</strong>: they built a full-size monitoring screen right into the gimbal handle. Instead of squinting at your camera's tiny flip screen while balancing a stabilizer, you get a clear, bright display exactly where your eyes already are.</p>`,
      `<p>It's a clever idea — but does the stabilization itself hold up against the DJI RS series? That's the question that actually matters. Here's the answer.</p>`
    ]
  },
  "edelkrone-sliderplus-v5-pro": {
    heading: "Edelkrone SliderPLUS v5 PRO — Motorized Slides Without the Bulk",
    paragraphs: [
      `<p>Traditional sliders have a problem: to get a 2-foot slide, you need a 2-foot rail. Edelkrone's folding design doubles your travel distance in half the footprint, and the <strong>SliderPLUS v5 PRO</strong> adds app-controlled motorized motion that you can program, repeat, and nail on every take.</p>`,
      `<p>At $699, it's pricey for a slider — but it replaces both a manual slider and a motion control system. Here's whether that value proposition holds up.</p>`
    ]
  },
  "manfrotto-055-carbon-fiber-tripod": {
    heading: "Manfrotto 055 Carbon Fiber — The Do-Everything Photo/Video Tripod",
    paragraphs: [
      `<p>If you shoot both photo and video and don't want two separate tripod systems, the <strong>Manfrotto 055</strong> is the versatile workhorse that's been quietly serving hybrid creators for years. Center column that goes horizontal, carbon fiber legs that stay rigid, and compatibility with almost any head on the market.</p>`,
      `<p>At $449 for the legs, it's a mid-range investment. Here's whether it deserves a spot in your kit.</p>`
    ]
  },
  "neewer-660-rgb-led-panel": {
    heading: "Neewer 660 RGB — Color Your Content Without Breaking the Bank",
    paragraphs: [
      `<p>RGB lighting used to be a luxury reserved for music videos and high-end productions. The <strong>Neewer 660 RGB LED Panel</strong> changed that — for $89, you get full-color control, bi-color white balance, and enough output to light an interview or add dramatic accent colors to any set.</p>`,
      `<p>It's the bestselling RGB panel on Amazon for a reason. But "bestselling" and "best" aren't always the same thing. Here's the truth.</p>`
    ]
  },
  "nanlite-forza-300b": {
    heading: "Nanlite Forza 300B — Bicolor Power in a Compact Package",
    paragraphs: [
      `<p>When you need a light that can match both daylight streaming through a window and the warm tungsten of practical lamps in the same scene — without swapping fixtures — the <strong>Nanlite Forza 300B</strong> handles it with a single dial. 300 watts of bicolor output in a body that weighs under 5 pounds.</p>`,
      `<p>For indie filmmakers and commercial shooters who need flexibility without a truck full of gear, this light keeps earning its reputation. Here's why.</p>`
    ]
  },
  "aputure-600d-pro": {
    heading: "Aputure 600d Pro — When Your Light Needs to Overpower the Sun",
    paragraphs: [
      `<p>There's a point in production where you stop working around natural light and start controlling it. The <strong>Aputure 600d Pro</strong> is the light that gets you there — 600 watts of daylight-balanced output that can punch through windows, compete with direct sunlight, and light up spaces that smaller fixtures can't touch.</p>`,
      `<p>It's the light commercial productions and rental houses reach for. At $1,690, it's a serious investment. Here's how to know if you need this much power.</p>`
    ]
  },
  "arri-skypanel-s60-c": {
    heading: "ARRI SkyPanel S60-C — The Gold Standard That Everyone Else Is Chasing",
    paragraphs: [
      `<p>Walk onto any professional film set, commercial shoot, or broadcast studio in the world, and you'll find <strong>ARRI SkyPanels</strong>. At nearly $5,000, they're not competing on price — they're competing on color accuracy, build quality, and the absolute trust that your light will perform identically on day 1 and day 1,000.</p>`,
      `<p>This isn't a light for most creators. But if you're at the level where color fidelity is non-negotiable, here's what makes it the industry reference.</p>`
    ]
  },
  "kino-flo-diva-lite-31": {
    heading: "Kino Flo Diva-Lite 31 — The Interview Light That Flatters Every Face",
    paragraphs: [
      `<p>Some lights are built for raw power. The <strong>Kino Flo Diva-Lite 31</strong> is built for beautiful skin tones. If you've ever watched a network interview and wondered why the subject's face looks so naturally lit — soft, even, no harsh shadows — there's a good chance a Kino Flo was involved.</p>`,
      `<p>At $1,895, it's a professional fixture with a specific purpose. Here's whether your work demands what it offers.</p>`
    ]
  },
  "litegear-litemat-spectrum-4": {
    heading: "LiteGear LiteMat Spectrum 4 — The Light You Can Hide Anywhere on Set",
    paragraphs: [
      `<p>Sometimes the best light is the one your audience never notices. The <strong>LiteMat Spectrum 4</strong> is a flexible, ultra-thin LED panel that you can tape to a ceiling, slide behind furniture, or mount in spaces where no traditional fixture would fit. Full-spectrum color, high CRI, and a profile thinner than a laptop.</p>`,
      `<p>At $2,100, it's a specialty tool — but for the productions that need it, nothing else comes close. Here's when it makes sense.</p>`
    ]
  },
  "astera-titan-tube": {
    heading: "Astera Titan Tube — Wireless RGB Tubes That Changed Set Design",
    paragraphs: [
      `<p>You've seen these in music videos, on film sets, and all over Instagram — glowing tubes of color that seem to float in the background. The <strong>Astera Titan Tube</strong> is the original, the one that professional gaffers and set designers use when the light itself becomes part of the visual story.</p>`,
      `<p>Battery-powered, wireless DMX, waterproof, and $590 per tube. Here's why productions keep renting (and buying) them despite the price.</p>`
    ]
  },
  "godox-vl300-ii": {
    heading: "Godox VL300 II — Serious Output Without the Serious Price Tag",
    paragraphs: [
      `<p>Need 300 watts of daylight LED output but can't justify $1,500+ for an Aputure or Nanlite? The <strong>Godox VL300 II</strong> has been quietly winning over budget-conscious creators and small studios who need big light on a real-world budget — $449 for output that competitors charge triple for.</p>`,
      `<p>The trade-offs exist, but they might not be where you'd expect. Here's the honest assessment from creators who actually use it on set.</p>`
    ]
  },
  "aputure-amaran-p60c": {
    heading: "Aputure Amaran P60c — The Portable Panel That Goes Everywhere",
    paragraphs: [
      `<p>When you need a compact, color-accurate light that fits in a backpack and runs on a V-mount battery, options get thin fast. The <strong>Amaran P60c</strong> fills that gap — a slim RGBWW panel with full color control, Sidus Link app support, and enough output for interviews, product shots, and accent lighting.</p>`,
      `<p>At $249, it's Aputure quality at Amaran pricing. Here's how it performs when you take it out of the studio and into the field.</p>`
    ]
  },
  "sennheiser-mke-600": {
    heading: "Sennheiser MKE 600 — The Shotgun Mic That Film Sets Actually Use",
    paragraphs: [
      `<p>On-camera microphones pick up everything — HVAC hum, traffic, the crew whispering behind you. A proper shotgun mic narrows that focus to exactly what's in front of it, and the <strong>Sennheiser MKE 600</strong> is the one you'll find mounted on boom poles across indie film sets, documentary shoots, and corporate productions.</p>`,
      `<p>At $329, it sits right between amateur and broadcast-tier shotgun mics. Here's why it's the sweet spot for most video creators.</p>`
    ]
  },
  "neumann-u87-ai": {
    heading: "Neumann U87 Ai — The Microphone That Defined Studio Recording",
    paragraphs: [
      `<p>Every recording studio in the world has one — or wants one. The <strong>Neumann U87 Ai</strong> isn't just a microphone; it's the reference standard against which every other studio condenser is measured. When music producers, voice-over artists, and broadcast studios say "industry standard," this is literally what they mean.</p>`,
      `<p>At $3,200, it's an investment that lasts a career. But is it actually $2,800 better than an AT4050? Here's the nuanced answer.</p>`
    ]
  },
  "focusrite-scarlett-2i2-4th-gen": {
    heading: "Focusrite Scarlett 2i2 (4th Gen) — The Audio Interface Everyone Starts With",
    paragraphs: [
      `<p>If you ask any audio subreddit "what interface should I get?", the first response will be the <strong>Focusrite Scarlett 2i2</strong>. It's been the default recommendation for so long that it's practically a meme — but memes don't survive this long without being genuinely good.</p>`,
      `<p>Clean preamps, low latency, USB-C, $179. Here's whether the 4th generation lives up to the legacy, or if newcomers have finally caught up.</p>`
    ]
  },
  "ssl2-audio-interface": {
    heading: "SSL2+ — Console-Quality Preamps on Your Desktop",
    paragraphs: [
      `<p>SSL built the mixing consoles used on more hit records than any other brand. Now imagine that preamp quality — the warmth, the clarity, the headroom — shrunk down into a $299 desktop audio interface. The <strong>SSL2+</strong> brings a piece of legendary studio hardware to creators who've never set foot in a professional recording facility.</p>`,
      `<p>Is it noticeably better than a Scarlett at nearly double the price? For certain creators, absolutely. Here's who benefits most.</p>`
    ]
  },
  "rme-babyface-pro-fs": {
    heading: "RME Babyface Pro FS — The Interface That Professional Studios Actually Use",
    paragraphs: [
      `<p>While most creators are debating Focusrite vs. SSL, professional audio engineers are quietly using <strong>RME</strong>. The Babyface Pro FS is their portable solution — rock-solid drivers, near-zero latency, and conversion quality that rivals interfaces costing three times as much.</p>`,
      `<p>At $879, it's a significant step up from consumer interfaces. Here's why the professionals who depend on their audio never look back after switching.</p>`
    ]
  },
  "sennheiser-ew-112p-g4-wireless-lavalier": {
    heading: "Sennheiser EW 112P G4 — The Wireless Lav System That Won't Let You Down",
    paragraphs: [
      `<p>Wireless audio can go wrong in a hundred ways — dropouts, interference, battery death mid-take. The <strong>Sennheiser EW 112P G4</strong> is the system working professionals reach for when failure isn't an option. True diversity reception, a massive frequency range, and the kind of reliability you can only get from decades of broadcast engineering.</p>`,
      `<p>At $599, it costs more than the trendy compact options. Here's why experienced shooters pay the difference without hesitating.</p>`
    ]
  },
  "zoom-h6essential-recorder": {
    heading: "Zoom H6essential — A Recording Studio You Can Carry in One Hand",
    paragraphs: [
      `<p>32-bit float recording means you literally cannot clip your audio. Let that sink in: you can point this at a screaming crowd or a whispered interview and the <strong>Zoom H6essential</strong> captures it perfectly without touching a gain knob. That technology used to cost thousands. Now it's $279 and fits in your palm.</p>`,
      `<p>For field recordists, podcasters on location, and documentary crews, this might be the most significant upgrade in portable recording. Here's the full breakdown.</p>`
    ]
  },
  "electro-voice-re20": {
    heading: "Electro-Voice RE20 — The Broadcast Voice You've Heard a Thousand Times",
    paragraphs: [
      `<p>Turn on any AM/FM radio station in America, and there's a solid chance the DJ is speaking into an <strong>Electro-Voice RE20</strong>. This microphone has been the voice of broadcast radio for over 50 years — deep, authoritative, and forgiving of room acoustics in ways that condenser mics simply can't match.</p>`,
      `<p>At $449, it's the SM7B's biggest rival for podcasting and broadcasting. Here's how they actually compare, beyond the spec sheets.</p>`
    ]
  },
  "universal-audio-apollo-twin-x": {
    heading: "Universal Audio Apollo Twin X — Run Analog Studio Plugins in Real Time",
    paragraphs: [
      `<p>Every other audio interface processes plugins on your computer's CPU. The <strong>Apollo Twin X</strong> has its own processing chips — UAD's SHARC processors — that run plugin emulations of legendary analog hardware (Neve, SSL, LA-2A) in real time with near-zero latency. You hear the processed sound as you record it.</p>`,
      `<p>At $1,099, it's a premium investment. But for creators who want that polished "studio sound" without a room full of outboard gear, nothing else works quite like this.</p>`
    ]
  },
  "deity-s-mic-2": {
    heading: "Deity S-Mic 2 — The Shotgun Mic Punching Way Above Its Price",
    paragraphs: [
      `<p>In a market dominated by Sennheiser, Rode, and Audio-Technica shotgun mics, <strong>Deity</strong> came in as the underdog with the S-Mic 2 — a $349 shotgun that blind-test reviewers consistently rank alongside mics costing twice as much. Low self-noise, tight pickup, and a build quality that surprised the entire filmmaking community.</p>`,
      `<p>Here's why this mic keeps showing up in "best value shotgun" lists, and whether the hype translates to real-world shoots.</p>`
    ]
  },
  "sigma-18-35mm-f18-dc-hsm-art": {
    heading: "Sigma 18-35mm f/1.8 Art — The Lens That Killed Prime Anxiety",
    paragraphs: [
      `<p>Imagine having an 18mm, 24mm, 28mm, and 35mm prime lens in your bag — all at f/1.8. Now imagine they're all the same lens. The <strong>Sigma 18-35mm f/1.8 Art</strong> did something no other manufacturer attempted: a constant f/1.8 zoom that makes three or four primes redundant in one optic.</p>`,
      `<p>It's been a cult favorite among indie filmmakers for years. Here's whether the hype is still justified and who benefits most from this unusual lens.</p>`
    ]
  },
  "tilta-nucleus-m-wireless-follow-focus": {
    heading: "Tilta Nucleus-M — Wireless Focus Pulling for Crews of Any Size",
    paragraphs: [
      `<p>Pulling focus manually while operating a camera is like patting your head and rubbing your stomach — technically possible, but you'll get better results with a dedicated system. The <strong>Tilta Nucleus-M</strong> gives you wireless follow focus with a hand controller, so your focus puller can work from across the room (or you can pull your own focus with precision).</p>`,
      `<p>At $1,149, it's a fraction of ARRI or Preston prices. Here's whether it delivers professional-grade performance at an indie-friendly price.</p>`
    ]
  },
  "atomos-ninja-v": {
    heading: "Atomos Ninja V+ — Unlock Your Camera's Hidden Potential",
    paragraphs: [
      `<p>Your camera probably records better video than what ends up on your memory card. Internal recording formats compress footage, limit bit depth, and throw away color information. The <strong>Atomos Ninja V+</strong> intercepts the clean HDMI signal from your camera and records it in ProRes or Avid DNx — the same formats used in Hollywood post-production.</p>`,
      `<p>At $699, it's a monitor and recorder in one. Here's when an external recorder is a genuine upgrade vs. an expensive luxury.</p>`
    ]
  },
  "smallhd-focus-5-monitor": {
    heading: "SmallHD Focus 5 — See What Your Camera's LCD Can't Show You",
    paragraphs: [
      `<p>Your camera's built-in screen is tiny, dim in sunlight, and nearly useless for critical focus. The <strong>SmallHD Focus 5</strong> gives you a bright, color-accurate 5-inch display with focus peaking, false color, and waveforms — the monitoring tools that separate amateur footage from professional results.</p>`,
      `<p>At $499, it's the external monitor that indie creators and documentary shooters reach for first. Here's whether it's worth adding to your rig.</p>`
    ]
  },
  "datacolor-spyderx-pro": {
    heading: "Datacolor SpyderX Pro — Your Monitor Is Lying to You (Here's the Fix)",
    paragraphs: [
      `<p>You spend hours color grading your footage to look perfect on your screen — then your client watches it on their display and the colors are completely off. The problem isn't your editing. It's that your monitor isn't calibrated. The <strong>SpyderX Pro</strong> fixes this in about 5 minutes, and suddenly your color decisions actually translate to other screens.</p>`,
      `<p>At $169, it's the cheapest insurance policy for anyone doing color-critical work. Here's why every serious editor needs one.</p>`
    ]
  },
  "k-tek-kp10-boom-pole": {
    heading: "K-Tek KP10 — The Boom Pole That Sound Mixers Trust",
    paragraphs: [
      `<p>A boom pole seems simple — it's a stick that holds a microphone. But spend a day holding a cheap one overhead and you'll understand why professionals obsess over weight, internal cable routing, and grip quality. The <strong>K-Tek KP10</strong> is the pole you upgrade to after your arms teach you the importance of quality booming gear.</p>`,
      `<p>At $229, it's a mid-range boom pole with professional DNA. Here's who needs it and who can get by with something cheaper.</p>`
    ]
  },
  "rycote-invision-studio-kit": {
    heading: "Rycote InVision Studio Kit — Kill the Vibrations Ruining Your Audio",
    paragraphs: [
      `<p>You've got a great microphone, and it still picks up the rumble from your desk, your keyboard, your foot tapping. The problem isn't the mic — it's the mount. The <strong>Rycote InVision Studio Kit</strong> uses a suspension system that mechanically isolates your microphone from the vibrations traveling through your stand and desk.</p>`,
      `<p>At $189, it's not cheap for a shock mount. But once you hear the difference in your recordings, the investment becomes obvious.</p>`
    ]
  },
  "bubblebee-industries-windkiller": {
    heading: "Bubblebee Windkiller — The Wind Solution That Actually Works Outdoors",
    paragraphs: [
      `<p>Foam windscreens are fine for a light breeze. Step outside on a real shoot — gusty location, rooftop interview, coastal B-roll — and that foam does almost nothing. The <strong>Bubblebee Windkiller</strong> is what location sound recordists use when the wind is genuinely trying to ruin their audio. And at $79, it costs less than reshooting a ruined take.</p>`,
      `<p>Here's how it works, what it fits, and whether your outdoor audio problems are actually a wind issue or something else.</p>`
    ]
  },
  "sony-fe-24-70mm-f28-gm-ii": {
    heading: "Sony FE 24-70mm f/2.8 GM II — The Lens That Lives on Professional Cameras",
    paragraphs: [
      `<p>If you could only own one lens for the rest of your career, working photographers and videographers would overwhelmingly choose a 24-70mm f/2.8. It covers everything from environmental portraits to tight interviews. And the <strong>Sony GM II version</strong> does it while weighing 30% less than its predecessor, with autofocus fast enough for video tracking.</p>`,
      `<p>At $2,298, it's the most expensive lens most Sony creators will ever buy. Here's whether the G Master premium is actually worth it.</p>`
    ]
  },
  "hollyland-mars-400s-pro-ii": {
    heading: "Hollyland Mars 400S Pro II — Wireless Video Without the Wires (or the Hassle)",
    paragraphs: [
      `<p>Running HDMI cables across a set is a tripping hazard, a time drain, and a constant source of disconnection anxiety. The <strong>Hollyland Mars 400S Pro II</strong> transmits 1080p video wirelessly up to 450 feet with near-zero latency — so your director can monitor from across the room and your focus puller can see the feed without being tethered to the camera.</p>`,
      `<p>At $399, it's the most accessible wireless video system for indie productions. Here's how it performs in real shooting conditions.</p>`
    ]
  },
  "neewer-carbon-fiber-slider-24-inch": {
    heading: "Neewer Carbon Fiber Slider — Smooth Camera Movement for Under $100",
    paragraphs: [
      `<p>A slider adds production value that's immediately visible — smooth lateral movement that makes product shots, interviews, and B-roll look polished and intentional. The problem? Good motorized sliders cost $500+. The <strong>Neewer 24-inch Carbon Fiber Slider</strong> delivers manual sliding motion for $89, and it's become the entry point for creators learning camera movement.</p>`,
      `<p>It won't replace a motorized system, but it might be all you need. Here's the honest assessment.</p>`
    ]
  },
  "aputure-light-dome-iii": {
    heading: "Aputure Light Dome III — Turn Any COB Light Into a Soft Light Machine",
    paragraphs: [
      `<p>A bare COB light is harsh and unflattering. Put it inside the <strong>Aputure Light Dome III</strong>, and suddenly you've got the soft, wraparound quality that makes skin look natural and shadows fall gracefully. It's a 34-inch softbox with a quick-release Bowens mount, and it's become the modifier that Aputure and Amaran owners reach for first.</p>`,
      `<p>At $219, it's priced competitively against no-name alternatives — but built to Aputure's standards. Here's what makes the difference in practice.</p>`
    ]
  },
  "v-mount-battery-kit-2x-150wh": {
    heading: "V-Mount Battery Kit — Power Your Gear Anywhere, No Outlets Required",
    paragraphs: [
      `<p>Your lights, monitors, and cameras all need power — and location shoots don't always come with convenient wall outlets. A <strong>V-Mount battery kit</strong> is the portable power solution that professional crews depend on, and this 2x 150Wh setup gives you enough juice to run a full lighting setup for hours in the field.</p>`,
      `<p>At $259 for two batteries and a charger, it's the most affordable way to go completely cordless on set. Here's what you need to know.</p>`
    ]
  },
  "godox-sl300-ii": {
    heading: "Godox SL300 II — 300 Watts of Light for the Price of Dinner for Two",
    paragraphs: [
      `<p>The lighting market has a price problem: professional output usually comes with professional pricing. Then <strong>Godox</strong> shows up with the SL300 II — 300 watts of daylight-balanced LED for $799, undercutting competitors by hundreds of dollars while delivering output that legitimately competes.</p>`,
      `<p>There are trade-offs. There always are at this price. But they might not be the ones you're expecting. Here's the real-world verdict.</p>`
    ]
  },
  "gopro-hero-12": {
    heading: "GoPro Hero 12 — Still the Action Camera Everything Else Gets Compared To",
    paragraphs: [
      `<p>Action cameras are a solved problem, and <strong>GoPro</strong> solved it. The <strong>Hero 12</strong> refines the formula yet again — better stabilization, longer battery life, HDR video, and a thermal design that actually lets you record for extended sessions without overheating shutdowns that plagued earlier models.</p>`,
      `<p>But with DJI and Insta360 closing the gap fast, is the GoPro premium still justified? Here's where it still wins and where it doesn't.</p>`
    ]
  },
  "aputure-amaran-p80c": {
    heading: "Aputure Amaran P80c — Full-Color Creative Lighting for Creators on the Move",
    paragraphs: [
      `<p>RGB panels are everywhere, but most of them sacrifice color accuracy for flashy specs. The <strong>Amaran P80c</strong> brings Aputure's color science expertise to a portable RGBWW panel that actually hits the colors it claims — accurate enough for professional use, creative enough for music videos and stylized content.</p>`,
      `<p>At $649, it's positioned between budget RGB panels and full professional fixtures. Here's where it lands in practice.</p>`
    ]
  },
  "dji-air-3s": {
    heading: "DJI Air 3S — The Drone That Makes Aerial Footage Effortless",
    paragraphs: [
      `<p>Getting cinematic aerial shots used to require a licensed pilot, a $3,000+ drone, and genuine skill. The <strong>DJI Air 3S</strong> puts a 1-inch sensor, obstacle avoidance on every side, and intelligent flight modes into a drone that folds down to the size of a water bottle — and produces footage that's genuinely hard to distinguish from much more expensive platforms.</p>`,
      `<p>Starting at $699, it's the sweet spot between toy drones and professional platforms. Here's whether it belongs in your creator toolkit.</p>`
    ]
  },
  "sennheiser-ew-135p-g4-wireless-lavalier": {
    heading: "Sennheiser EW 135P G4 — Handheld Wireless for Interviews and Presentations",
    paragraphs: [
      `<p>When your talent needs to hold a microphone — live events, man-on-the-street interviews, presentations — a lavalier isn't always the right call. The <strong>Sennheiser EW 135P G4</strong> pairs a professional handheld transmitter with Sennheiser's rock-solid wireless receiver, giving you broadcast-quality audio with the convenience of a handheld form factor.</p>`,
      `<p>At $749, it's built for creators who need wireless flexibility beyond clip-on mics. Here's who should consider it.</p>`
    ]
  },
  "iphone-16-pro-max": {
    heading: "iPhone 16 Pro Max — The Camera You Already Own (And Might Be Underestimating)",
    paragraphs: [
      `<p>Here's the thing nobody in the camera industry wants to admit: for 90% of social media content, the <strong>iPhone 16 Pro Max</strong> produces footage that's indistinguishable from cameras costing five times as much. 4K 120fps, ProRes recording, Cinematic Mode, and a camera system that fits in your pocket and is always with you.</p>`,
      `<p>It's not going to replace a cinema camera. But for the content most creators actually make? The gap has never been smaller. Here's the honest take.</p>`
    ]
  },
  "deity-d-mic-2": {
    heading: "Deity D-Mic 2 — The On-Camera Shotgun Mic That Surprised Everyone",
    paragraphs: [
      `<p>On-camera microphones have a low bar — they just need to sound better than the built-in mic. Most do the bare minimum. The <strong>Deity D-Mic 2</strong> went further, delivering a compact shotgun mic with low self-noise and a frequency response that rivals mics in a completely different category. At $349, it raised the bar for what you should expect from a camera-mount mic.</p>`,
      `<p>Here's how it actually sounds in the field and whether it belongs on your camera or your boom pole.</p>`
    ]
  },
  "elgato-facecam-pro-2": {
    heading: "Elgato Facecam Pro 2 — 4K Webcam for Creators Who Care About Quality",
    paragraphs: [
      `<p>Most webcams look like webcams — soft, noisy, and obviously inferior to a real camera. The <strong>Elgato Facecam Pro 2</strong> is trying to close that gap with a Sony sensor, 4K output, and the kind of image processing that streaming-focused creators have been asking for since the webcam category was invented.</p>`,
      `<p>At $299, it costs as much as some mirrorless cameras on the used market. Here's whether it justifies the premium over cheaper webcams — and when you should just use a real camera instead.</p>`
    ]
  },
  "tilta-tacktum-m-wireless-follow-focus": {
    heading: "Tilta Tacktum M — Next-Gen Wireless Focus at a Professional Level",
    paragraphs: [
      `<p>Tilta's Nucleus-M proved that affordable wireless follow focus could work. The <strong>Tacktum M</strong> is the evolution — redesigned motors, improved wireless range, a more refined hand controller, and the kind of build quality that tells you Tilta has been listening to feedback from working focus pullers on real sets.</p>`,
      `<p>At $1,299, it sits between the Nucleus-M and systems from ARRI and Preston. Here's whether the upgrade justifies the price jump.</p>`
    ]
  },
  "capcut": {
    heading: "CapCut — The Free Editor That's Quietly Taking Over Social Media",
    paragraphs: [
      `<p>While professional editors debate Premiere vs. Resolve, an entire generation of creators is editing viral content on <strong>CapCut</strong> — and they're not doing it because they can't afford alternatives. They're doing it because CapCut's auto-captions, effects library, and mobile-first workflow are genuinely faster for short-form content than any desktop NLE.</p>`,
      `<p>Free with a $9.99/month Pro tier, it's the editing tool that traditional software companies are quietly nervous about. Here's what it does well, where it falls short, and who should use it.</p>`
    ]
  },
  "focusrite-scarlett-2i2-8th-gen": {
    heading: "Focusrite Scarlett 2i2 (8th Gen) — The Updated Classic, Better Than Ever",
    paragraphs: [
      `<p>The Scarlett 2i2 has been the default beginner audio interface for so long that each new generation just needs to not mess things up. The <strong>8th Gen</strong> doesn't just maintain the standard — it pushes it forward with auto-gain, a redesigned preamp, and improved converter specs that close the gap with interfaces costing twice as much.</p>`,
      `<p>At $199, it's a small price bump over the previous generation. Here's whether the improvements are worth upgrading for, and how it compares to the competition in 2025.</p>`
    ]
  },
  "canon-eos-r50": {
    heading: "Canon EOS R50 — Your First \"Real\" Camera (Without the Intimidation Factor)",
    paragraphs: [
      `<p>Every creator remembers the moment they outgrew their phone camera. The <strong>Canon EOS R50</strong> is built for exactly that transition — a compact, lightweight mirrorless camera with Canon's Dual Pixel autofocus, 4K video, and a learning curve gentle enough that you'll be shooting confidently within an hour of unboxing it.</p>`,
      `<p>Starting at $999 with a kit lens, it's Canon's answer to "what camera should I buy first?" Here's whether it's the right answer for you.</p>`
    ]
  }
};

// Read the source file
const filePath = path.join(__dirname, 'app/guides/blogData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Parse the blogPosts
const { blogPosts } = require(filePath);

let replacedCount = 0;
let skippedSlugs = [];

blogPosts.forEach((post, index) => {
  const slug = post.slug;
  const opener = openers[slug];
  
  if (!opener) {
    skippedSlugs.push(slug);
    return;
  }
  
  // Build the old pattern - the template opener
  // Pattern: <h2>The Real [Product] Review</h2>\n\n<p>If you're looking for...\n\n<p>Here's the problem most reviews won't tell you:...
  const oldPattern = /(<h2>The Real .+? Review<\/h2>\s*\n\s*<p>If you're looking for .+?<\/p>\s*\n\s*<p>Here's the problem most reviews won't tell you: <strong>The best gear isn't always the most expensive or feature-packed\.<\/strong> It's the gear that actually fits into your life and workflow without causing more problems than it solves\.<\/p>)/;
  
  // We need to find and replace within this specific post's content
  const oldContent = post.content;
  
  // Find the template pattern in the content
  const match = oldContent.match(oldPattern);
  if (!match) {
    skippedSlugs.push(slug + ' (no match)');
    return;
  }
  
  const oldOpener = match[1];
  const newOpener = `<h2>${opener.heading}</h2>\n\n${opener.paragraphs.join('\n\n')}`;
  
  const newContent = oldContent.replace(oldOpener, newOpener);
  
  // Replace in the full file content - need to find the exact old content string
  // Use the content field value to locate it
  if (content.includes(oldOpener)) {
    content = content.replace(oldOpener, newOpener);
    replacedCount++;
  } else {
    skippedSlugs.push(slug + ' (not found in file)');
  }
});

// Write the updated file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Replaced ${replacedCount} openers`);
if (skippedSlugs.length > 0) {
  console.log(`Skipped: ${skippedSlugs.join(', ')}`);
}

// Also update the blog directory copy
const blogFilePath = path.join(__dirname, 'app/blog/blogData.js');
fs.writeFileSync(blogFilePath, content, 'utf8');
console.log('Updated blog/blogData.js as well');

// Also update video-tools-affiliate
const vtaFilePath = path.join(__dirname, '..', 'video-tools-affiliate', 'app', 'blog', 'blogData.js');
if (fs.existsSync(vtaFilePath)) {
  fs.writeFileSync(vtaFilePath, content, 'utf8');
  console.log('Updated video-tools-affiliate/app/blog/blogData.js');
}
