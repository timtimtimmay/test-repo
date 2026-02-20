# Vibe Coding Workshop Microsite — Product Requirements Document

**Owner:** Tim · Global Head of Learner Experience Enablement, Novartis
**Format:** Deployable standalone with no external API calls. Can be hosted locally as microsite.
**Session duration:** 60 minutes
**Audience:** Non-developer associates with no prior software development experience
**Session objective:** Participants leave comfortable promoting GitHub Copilot in VS Code and able to identify tasks appropriate for vibe coding

-----

## Purpose

The microsite replaces a slide deck as the primary facilitation surface for a one-hour vibe coding session. It serves a dual purpose: it is both the delivery mechanism for the session content and the first proof-of-concept that vibe coding works. The facilitator built the site without writing code, and this fact is disclosed in the opening sequence.

-----

## Architecture

**Technology:** React functional components with hooks (useState, useEffect, useRef)
**External dependencies:** Google Fonts (Dela Gothic One, DM Sans, DM Mono), Clipboard API
**Styling:** Inline CSS with CSS-in-JS patterns; no external stylesheet or Tailwind
**State management:** Local component state only; no global store, no localStorage, no persistence
**Sections:** 7 full-viewport sections, scroll-navigable with intersection observer tracking

-----

## Navigation System

A fixed right-rail dot navigation is pinned to the viewport. It displays 7 dots corresponding to the 7 sections. The active section dot expands horizontally (10px → 32px width) and highlights in cyan (#22d3ee). All dots are clickable and trigger smooth-scroll to the target section. Tooltips display section labels on hover.

Active section detection uses `IntersectionObserver` with a 0.5 threshold, meaning a section becomes active when at least half of it is visible in the viewport.

-----

## Section Specifications

### 1. Hero — “Vibes, Not Slides”

**Purpose:** Set tone, establish credibility, make the meta-argument for vibe coding

**Behavior:**

- Three-phase staggered entrance animation triggered on visibility
  - Phase 1 (400ms delay): “Vibes, not slides” headline fades up
  - Phase 2 (1200ms delay): “Demos, not memos” headline fades up
  - Phase 3 (2000ms delay): Subtext paragraph fades up
- All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` easing for a natural spring feel
- Background uses two layered radial gradients (cyan at 8% opacity, purple at 6% opacity) for atmospheric depth

**Content:**

- “Vibes” rendered with cyan-to-purple gradient text fill
- “Demos” rendered with purple-to-orange gradient text fill
- “not slides” and “not memos” rendered at 40% opacity to create visual contrast with the emphasized words
- Subtext: “This site was built with vibe coding. / I wrote zero lines of code to make it. / By the end of this hour, you’ll build something too.”
- Final line (“By the end of this hour…”) is set at 80% opacity with semibold weight to distinguish it as the key commitment

**Typography:**

- Headlines: Dela Gothic One, responsive sizing via `clamp(48px, 8vw, 96px)` and `clamp(36px, 6vw, 72px)`
- Body: DM Sans, 18px, 1.6 line-height

**Facilitation note:** The animation is self-running. The facilitator should stay silent for the first few seconds and let the animation land before speaking.

-----

### 2. The Sweet Spot — 2×2 Quadrant

**Purpose:** Teach participants which use cases are appropriate for vibe coding using a Complexity × Stakes framework

**Layout:**

- Square container sized to `min(600px, 90vw)` for responsive behavior
- Crosshair axes at 50% horizontal and vertical, rendered as 1px lines at 10% white opacity
- Axis labels: “Complexity →” along the bottom, “Stakes →” rotated vertically along the left edge

**Quadrant labels (positioned in corners):**

- Top-left: “SWEET SPOT” (cyan, 50% opacity)
- Bottom-left: “EASY WIN” (green, 40% opacity)
- Top-right: “GET HELP” (amber, 40% opacity)
- Bottom-right: “NOT THIS” (red, 50% opacity)

**Data points:** 12 use case items, each with:

- `label`: Display name (shown on hover)
- `x`, `y`: Position as percentage of container (0–1 range)
- `q`: Classification — “sweet” (cyan), “danger” (red), or “caution” (amber)

|Use Case                  |Position    |Classification|
|--------------------------|------------|--------------|
|Meeting agenda generator  |(0.15, 0.12)|sweet         |
|Team voting app           |(0.20, 0.30)|sweet         |
|Quick form tool           |(0.20, 0.35)|sweet         |
|Personal dashboard        |(0.25, 0.20)|sweet         |
|Workshop microsite        |(0.30, 0.15)|sweet         |
|Internal calculator       |(0.35, 0.30)|sweet         |
|Data visualization        |(0.35, 0.25)|sweet         |
|Prototype for stakeholders|(0.40, 0.18)|sweet         |
|Complex auth system       |(0.70, 0.70)|caution       |
|Patient data system       |(0.75, 0.85)|danger        |
|Production API            |(0.80, 0.75)|danger        |
|GxP-regulated tool        |(0.85, 0.90)|danger        |

**Interactivity:**

- All dots are hidden by default
- “Reveal Use Cases” button toggles visibility
- On reveal, dots animate in with staggered delays (60ms per item) using fade + cubic-bezier transition
- Dots are 10px circles; on hover they expand to 14px with increased glow (box-shadow)
- Hover triggers a tooltip positioned 36px above the dot showing the use case label
- Button text toggles between “Reveal Use Cases” and “Reset”

**Facilitation note:** Before clicking reveal, ask participants to predict: “Where do you think ‘patient data system’ belongs? What about ‘meeting agenda generator’?” The prediction step is the learning mechanism.

-----

### 3. Anatomy of a Vibe

**Purpose:** Demystify the vibe coding workflow as a four-step iterative loop

**Steps displayed as clickable cards:**

|Step|Icon|Title                   |Detail text                                                                                   |
|----|----|------------------------|----------------------------------------------------------------------------------------------|
|1   |💬   |Describe the outcome    |“Build me a microsite for a workshop on vibe coding with a 2x2 quadrant and animated sections”|
|2   |👀   |Review what it builds   |“Look at the output. Does it match your intent? Is anything off?”                             |
|3   |🔄   |Refine with conversation|“Make the quadrant interactive — dots should appear on click and show labels on hover”        |
|4   |✅   |Accept or redirect      |“Keep what works. Redirect what doesn’t. You’re the creative director.”                       |

**Behavior:**

- Four cards displayed in a flex row (wrapping on small screens, min 160px per card, max 200px)
- Clicking a card sets it as active; active card shows elevated background and purple border accent
- Detail panel below the cards displays the corresponding detail text with a purple-tinted background
- DM Mono font used for the detail panel to suggest code/prompt context

**Facilitation note:** This is where you show your actual prompt history. Switch to your Claude or Copilot conversation and walk through the real exchanges that built this microsite.

-----

### 4. Live Build

**Purpose:** Transition point from microsite to VS Code; facilitator demonstrates a build from scratch

**Content:**

- 🛠️ emoji at 64px as section icon
- Headline: “Live Build”
- Subtext: “Time to switch to VS Code. Give me a suggestion — what should we build in 15 minutes?”
- Four suggestion buttons: “Team poll”, “Countdown timer”, “Quiz”, “Something else?”

**Button behavior:**

- Buttons are hover-interactive only (no click state). On hover: background shifts to cyan-tinted, border highlights cyan, text color changes to cyan
- These are conversation starters, not functional selectors. The facilitator takes a verbal vote and picks one.

**Facilitation note:** The risk of a live build is what makes this section engaging. If Copilot produces something broken, that’s a useful teaching moment about vibe coding limits. Don’t pre-build a safety net.

-----

### 5. Your Turn — Starter Challenges

**Purpose:** Hands-on practice. Participants pick a challenge, copy a starter prompt, and use GitHub Copilot in VS Code.

**Challenge menu (6 options displayed in responsive grid, `minmax(240px, 1fr)`):**

|Emoji|Title             |Description                    |Starter Prompt                                                                                                                           |
|-----|------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
|📊    |Personal Dashboard|Key metrics with charts        |“Build me a single-page dashboard with 4 metric cards and a bar chart showing monthly progress. Use a clean dark theme.”                 |
|🗳️    |Team Voting App   |Vote on lunch, offsites, topics|“Create a voting app where users can add options and vote. Show results as a live bar chart. Make it colorful and fun.”                  |
|⏱️    |Meeting Timer     |Countdown with agenda sections |“Build a meeting timer with sections I can name and set times for. Show a big countdown, progress bar, and play a sound when time is up.”|
|📋    |Project Tracker   |Kanban-style task board        |“Create a kanban board with columns for To Do, In Progress, and Done. Let me drag cards between columns. Use a minimal, clean design.”   |
|🧮    |ROI Calculator    |Estimate return on initiative  |“Build an ROI calculator where I input cost, expected revenue, and timeline. Show breakeven point and ROI percentage with a clean chart.”|
|🎯    |Quiz Builder      |Team quiz on any topic         |“Build a quiz app with 5 multiple-choice questions about AI. Show score at the end with fun feedback. Make it engaging with animations.” |

**Interactivity:**

- Clicking a card selects it (toggles on repeat click); selected card gets cyan border and tinted background
- Selection reveals a prompt panel below the grid showing the starter prompt text
- “Copy” button in top-right of prompt panel copies text to clipboard via `navigator.clipboard.writeText()`
- Button text changes to “Copied!” for 2 seconds after successful copy, with cyan background fill
- Prompt text rendered in DM Mono

**Facilitation note:** Tell participants: “Pick one that interests you, copy the prompt, paste it into Copilot, and then make it yours — change the topic, add features, break things. You’re the creative director.”

-----

### 6. Show & Share

**Purpose:** Social learning. Volunteers screen-share what they built; audience reacts in real time.

**Content:**

- 🎤 emoji at 64px
- Headline: “Show & Share”
- Subtext: “Who wants to show what they built? React live while they present.”

**Reaction buttons:** Four emoji buttons displayed in a horizontal row:

- 🔥 (fire), 🎉 (celebration), 💡 (insight), 🤯 (mind-blown)
- Each button is 72×72px with rounded corners
- Click increments a per-emoji counter displayed below the emoji
- Hover scales the button to 1.1× with increased background opacity
- Counters are local state only and do not persist or sync across clients

**Facilitation note:** Counters are for energy, not measurement. If you want shared reactions across the room, use a separate tool (Slido, Mentimeter). The local counters here are for the facilitator’s screen only.

-----

### 7. Your Playbook — Decision Tree

**Purpose:** Provide a reusable framework participants can apply independently after the session

**Decision flow (5 sequential yes/no questions):**

|#|Question                                                          |If Yes|If No  |
|-|------------------------------------------------------------------|------|-------|
|1|Will anyone’s health or safety depend on this working correctly?  |→ STOP|→ Next |
|2|Does this need to integrate with production systems or databases? |→ STOP|→ Next |
|3|Is this subject to GxP or regulatory requirements?                |→ STOP|→ Next |
|4|Is this for personal productivity, prototyping, or internal demos?|→ GO  |→ Next |
|5|Could you describe what you want in plain language?               |→ GO  |→ MAYBE|

**UI states:**

- *In progress:* Shows question number (e.g., “Question 3 of 5”), question text, and Yes/No buttons
- *Result — GO (🟢):* “Vibe away!” in green with encouragement text
- *Result — STOP (🔴):* “Not a vibe coding task” in red with explanation
- *Result — MAYBE (🟡):* “Maybe — get a developer’s input” in amber with nuanced guidance
- “Try another” button resets the flow to question 1

**Facilitation note:** Walk through one example as a group, then let participants run through 2–3 of their own use cases silently. Ask for a show of hands: “Who got a green light on something they want to try next week?”

-----

## Visual Design System

**Background:** #0a0a0f (near-black with slight blue undertone)
**Primary accent:** #22d3ee (cyan)
**Secondary accent:** #a855f7 (purple)
**Tertiary accent:** #f97316 (orange)
**Success:** #4ade80 (green)
**Warning:** #fbbf24 (amber)
**Danger:** #ef4444 (red)

**Typography stack:**

- Display: Dela Gothic One (Google Fonts) — used for all section headlines
- Body: DM Sans (Google Fonts) — weights 400, 600, 700
- Code/prompts: DM Mono (Google Fonts) — used for prompt panels and technical detail

**Surfaces:** All cards and containers use low-opacity white backgrounds (2–6% opacity) with 1px borders at 5–10% white opacity. Active/selected states increase both values. No solid backgrounds anywhere except the page background.

**Animations:** All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` for a consistent spring-like feel. Duration ranges from 150ms (hover micro-interactions) to 800ms (entrance animations).

-----

## Pre-Session Requirements

These are not part of the microsite but are critical to session success:

1. **48 hours before:** Send setup instructions — VS Code installed, GitHub Copilot extension installed and authenticated, basic orientation to the VS Code interface
1. **24 hours before:** Send a “test your setup” prompt — participants paste a simple prompt into Copilot and confirm it responds. Include a support contact for setup issues.
1. **Day of:** Facilitator opens the microsite in a browser, shares screen, and navigates by scrolling or using the dot nav. No additional tools required for the microsite itself.

-----

## Known Limitations

- **Reaction counters are local only.** The Show & Share emoji counters do not sync across clients. They work as a facilitator-screen-only energy gauge, not a shared audience tool.
- **No persistence.** All state resets on page refresh. The decision tree, selected challenges, and reaction counts do not survive a reload.
- **Quadrant is not responsive below ~320px.** The square container scales down but dot positions become crowded on very small screens. Optimized for shared-screen presentation, not individual mobile use.
- **Starter prompts are static.** They cannot be edited within the microsite. If you want to customize them for your audience, modify the `STARTER_CHALLENGES` array in the source.
- **Live Build section is a placeholder.** It provides visual suggestions but the actual build happens in VS Code. The microsite has no connection to VS Code or Copilot.

-----

## Recommended Enhancements for Future Iterations

|Enhancement                                               |Rationale                                                                |
|----------------------------------------------------------|-------------------------------------------------------------------------|
|Shared reaction counters via WebSocket or polling         |Enables audience participation from their own devices during Show & Share|
|Embedded timer for each section                           |Keeps facilitation on pace without requiring a separate clock            |
|QR code on the final section linking to Copilot setup docs|Gives participants an immediate next action                              |
|Post-session survey embedded in the Playbook section      |Captures feedback while engagement is high                               |
|Editable challenge prompts via an admin panel             |Allows reuse across different audiences without code changes             |