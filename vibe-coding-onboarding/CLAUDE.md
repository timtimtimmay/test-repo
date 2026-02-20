# CLAUDE.md — Vibe Coding Workshop Microsite

This file provides Claude with context, build instructions, and a UX-reviewed specification for the Vibe Coding Workshop microsite. Use it as the authoritative source for all implementation decisions.

---

## Project Summary

**What we're building:** A single-file React microsite that replaces a slide deck as the facilitation surface for a 60-minute vibe coding workshop. The microsite itself is a live proof-of-concept — the facilitator built it without writing code.

**Audience:** Non-developer associates, no prior software development experience.
**Session goal:** Participants leave comfortable promoting GitHub Copilot in VS Code and able to identify appropriate vibe coding tasks.
**Deployment:** Standalone, no external API calls, hostable locally or on any static host.

---

## Session Facilitation Plan

### Pre-Session (Facilitator Checklist)

| Timing | Action |
|--------|--------|
| 48 hours before | Send setup instructions: VS Code installed, GitHub Copilot extension installed and authenticated, basic VS Code orientation |
| 24 hours before | Send a "test your setup" prompt — participants paste a simple prompt into Copilot and confirm it responds. Include a support contact. |
| 24 hours before *(if using pre-work option)* | Send the microsite link with this instruction: *"Before our session, spend ~15 minutes exploring two sections at your own pace: the Sweet Spot quadrant (section 2 — click Reveal and see where your own use cases might land) and the Playbook decision tree (section 7 — run 2–3 ideas from your own work through it). Come ready to share one idea that got a green light."* |
| Day of | Open microsite in browser, share screen, navigate via scroll or dot nav. No additional tools needed. |

### Session Flow

Two timing variants are provided. The **pre-work variant is recommended** — it frees 4 minutes from the facilitated session and reallocates them to the Anatomy section, which is where the most important new content now lives.

#### Option A — With 15-Minute Pre-Work (Recommended)

Pre-work covers Sections 2 (Sweet Spot) and 7 (Playbook) independently. Participants arrive having already explored the framework and run their own ideas through the decision tree.

| Time | Section | Facilitator Action |
|------|---------|-------------------|
| 0:00–0:05 | **Hero** | Stay silent. Let the animation land. Open with: "I built this without writing a single line of code." Pause. Then: "And here's why that worked — you'll recognise the skill." |
| 0:05–0:09 | **Sweet Spot debrief** | "You explored this before today — what surprised you? Where did your own use cases land?" Click Reveal for anyone who didn't get to it. 1–2 quick call-outs, then move on. |
| 0:09–0:21 | **Anatomy of a Vibe** | Walk the five-step loop (including Step 0). Spend the most time on Step 0 and the expertise framing. Open your actual prompt history and show the real exchanges that built this site. |
| 0:21–0:36 | **Live Build** | Switch to VS Code. Take a verbal vote. 15 minutes. If something breaks, narrate the evaluation: "Here's what I expected. Here's what I got. Here's why it doesn't match my definition of done." |
| 0:36–0:51 | **Your Turn** | Participants pick a challenge. Point out the brief structure above each starter prompt: "See the Goal / Constraints / Done breakdown? That's the pattern — use it for your own ideas next week." |
| 0:51–0:57 | **Show & Share** | 2–3 volunteers screen-share. Audience reacts. |
| 0:57–1:00 | **Playbook close** | "You ran through the decision tree before today. Who got a green light on something?" Close with a show of hands. No need to re-walk the tree. |

#### Option B — No Pre-Work (Condensed)

All content delivered in-session. Anatomy section is tighter; Playbook walk-through covers one group example only.

| Time | Section | Facilitator Action |
|------|---------|-------------------|
| 0:00–0:04 | **Hero** | Let the animation land. Open with the credibility line and the expertise reframe: "You already know what 'done' looks like in your work. That's the hardest part of this." |
| 0:04–0:11 | **Sweet Spot** | Ask participants to predict placements before clicking Reveal. The prediction step is the learning mechanism — don't skip it. |
| 0:11–0:21 | **Anatomy of a Vibe** | Walk the five-step loop. Prioritise Step 0 and the expertise framing. Show real prompt history. |
| 0:21–0:34 | **Live Build** | Switch to VS Code. 13 minutes. Narrate evaluation decisions explicitly. |
| 0:34–0:49 | **Your Turn** | Participants build. Point out the brief structure in the prompt panel. |
| 0:49–0:55 | **Show & Share** | 2–3 volunteers. Emoji reactions. |
| 0:55–1:00 | **Playbook** | Walk one use case as a group. Ask for a show of hands: "Who got a green light on something?" |

---

## Microsite Build Plan

### Technology Stack

- **Framework:** React (functional components, hooks only: useState, useEffect, useRef)
- **Styling:** Inline CSS / CSS-in-JS. No external stylesheet, no Tailwind, no CSS modules.
- **Fonts:** Google Fonts — Dela Gothic One, DM Sans, DM Mono
- **APIs used:** Clipboard API (copy prompt text), IntersectionObserver (active section tracking)
- **State:** Local component state only. No global store, no localStorage, no persistence.
- **Output:** Single deployable HTML/JS file or standard React app with no backend.

### Build Order

Build sections in this order. Each section is self-contained and can be verified independently before moving to the next.

1. **Design tokens + layout shell** — Background, font imports, full-viewport section wrapper, global resets
2. **Dot navigation** — Fixed right-rail, 7 dots, IntersectionObserver wiring, smooth-scroll, hover tooltips
3. **Section 1: Hero** — Staggered entrance animation, gradient text, subtext with four animation phases including the domain-expertise framing line (Phase 4)
4. **Section 2: Sweet Spot** — 2×2 quadrant with axes, 12 data points, reveal/reset toggle, hover tooltips
5. **Section 3: Anatomy of a Vibe** — Five clickable cards (Step 0 through Step 4), active state, detail panel below
6. **Section 4: Live Build** — Icon + headline + four suggestion buttons
7. **Section 5: Your Turn** — Six challenge cards, selection state, prompt panel with brief structure breakdown (Goal / Constraints / Done) above starter prompt text, copy button
8. **Section 6: Show & Share** — Four emoji reaction buttons with local counters
9. **Section 7: Playbook** — Five-question decision tree, GO/STOP/MAYBE result states, reset
10. **Polish pass** — Entrance animations per section, transition consistency, responsive QA

### Design Tokens

```js
const tokens = {
  bg: '#0a0a0f',
  cyan: '#22d3ee',
  purple: '#a855f7',
  orange: '#f97316',
  green: '#4ade80',
  amber: '#fbbf24',
  red: '#ef4444',
  cardBg: 'rgba(255,255,255,0.03)',
  cardBorder: 'rgba(255,255,255,0.08)',
  cardBgActive: 'rgba(255,255,255,0.07)',
  cardBorderActive: 'rgba(255,255,255,0.15)',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
};
```

### Component Architecture

```
<App>
  <DotNav sections={sections} activeSection={active} />
  <Section id="hero">         <HeroSection />         </Section>
  <Section id="sweet-spot">  <SweetSpotSection />    </Section>
  <Section id="anatomy">     <AnatomySection />       </Section>
  <Section id="live-build">  <LiveBuildSection />     </Section>
  <Section id="your-turn">   <YourTurnSection />      </Section>
  <Section id="show-share">  <ShowShareSection />     </Section>
  <Section id="playbook">    <PlaybookSection />      </Section>
</App>
```

---

## UX Expert Review — Changes and Rationale

The following modifications improve the original PRD. Each change documents the original spec, the problem identified, the recommended change, and the UX rationale.

---

### Change 1: Quadrant Axis Labels — Add Explicit Low/High Endpoint Labels

**Original spec:**
> Axis labels: "Complexity →" along the bottom, "Stakes →" rotated vertically along the left edge

**Problem identified:**
The data positions reveal that "sweet" use cases cluster near y≈0.12 (near the CSS top) and "danger" use cases near y≈0.85 (near the CSS bottom). In CSS coordinates, y=0 is the visual top. If "Stakes" increases upward (as a standard chart convention implies), then y=0.12 near the top = high stakes — contradicting the SWEET SPOT placement at top-left. The single arrow label "Stakes →" with vertical rotation creates directional ambiguity: it's unclear whether stakes increase toward the top or bottom of the chart.

**Change:**
Label both endpoints of each axis explicitly:
- X-axis: "Low Complexity" (left end) → "High Complexity" (right end)
- Y-axis: "Low Stakes" (bottom end) → "High Stakes" (top end)

Reposition data points so that Y=0 corresponds to the visual top of the container (low CSS y = low stake = bottom of logical chart). The Y position in data should be inverted: a use case with `y: 0.85` in the original (CSS near-bottom) should now visually appear at the bottom as high-stakes. Concretely: render dot vertical position as `top: (1 - y) * 100%` so that y=0.85 (high stakes) renders near the top visually, consistent with standard chart conventions.

Corrected quadrant label positions in the visual frame (after axis inversion):
- Top-left: high stakes, low complexity → **GET HELP** (amber)
- Top-right: high stakes, high complexity → **NOT THIS** (red)
- Bottom-left: low stakes, low complexity → **EASY WIN** (green)
- Bottom-right: low stakes, high complexity → **SWEET SPOT** (cyan) — this is where the interesting vibe coding territory lives: manageable complexity, low risk

**Why:**
Mental model consistency. A chart with unlabeled axes forces participants to decode directionality under cognitive load. In a workshop setting, this creates confusion during the most pedagogically important section. Explicit low/high labels remove ambiguity in under two seconds of reading.

---

### Change 2: Live Build Buttons — Restore Click and Focus States

**Original spec:**
> Buttons are hover-interactive only (no click state). On hover: background shifts to cyan-tinted, border highlights cyan, text color changes to cyan.

**Problem identified:**
Removing click and focus states from interactive elements is an accessibility violation (WCAG 2.4.7: Focus Visible) and breaks expected button affordance for all users, including keyboard navigators. Even if these buttons are intended purely as conversation starters, they still need to behave as buttons.

**Change:**
Add `:active` visual state (slight scale reduction: `transform: scale(0.97)`) and `:focus-visible` outline (2px solid cyan, 2px offset). The hover state is retained as-is. No click handler logic is needed — these remain conversation starters — but the visual feedback for click and focus must be present.

**Why:**
Users expect buttons to respond to clicks even if no data changes. The absence of any feedback creates a broken feel that undermines trust in the demo — the opposite of the session's intent. The fix is one line of CSS per state and costs nothing.

---

### Change 3: Decision Tree Question Phrasing — Positive Framing First

**Original spec:**
> Q1: Will anyone's health or safety depend on this working correctly? → Yes: STOP
> Q2: Does this need to integrate with production systems or databases? → Yes: STOP
> Q3: Is this subject to GxP or regulatory requirements? → Yes: STOP

**Problem identified:**
Three consecutive questions where "Yes" leads to a negative outcome (STOP) creates a cognitive pattern inversion. Users instinctively associate "Yes" with forward progress. Having to answer Yes to stop — three times in a row — increases cognitive load and can cause mis-clicks, especially for non-technical participants under time pressure.

**Change:**
Reframe Q1–Q3 as safety-check acknowledgments, not binary yes/no stoppers. Rephrase to make "No" the gate-opener:

| # | Revised Question | Yes | No |
|---|-----------------|-----|----|
| 1 | Is this purely internal — not affecting patient care, safety, or clinical data? | → Next | → STOP |
| 2 | Does this work independently, without connecting to production systems or regulated databases? | → Next | → STOP |
| 3 | Is this outside GxP or regulatory scope? | → Next | → STOP |
| 4 | Is this for personal productivity, prototyping, or internal demos? | → GO | → Next |
| 5 | Can you describe what you want in plain language? | → GO | → MAYBE |

**Why:**
Positive framing reduces friction in the flow. When "Yes" consistently means forward progress, users build correct mental models faster. The safety logic is identical — we've only changed the linguistic direction of the gate. This is especially important for a workshop audience who may have low confidence and are more prone to second-guessing their answers.

---

### Change 4: Challenge Card Selection — Prevent Layout Shift

**Original spec:**
> Selection reveals a prompt panel below the grid showing the starter prompt text

**Problem identified:**
Inserting a new DOM element below the grid after a click causes a visible layout shift (CLS). The grid's surrounding content jumps downward, breaking the user's spatial context and causing a disorienting scroll-away from the selected card. This is especially problematic when the grid is near the bottom of the viewport.

**Change:**
Reserve a fixed-height prompt panel below the grid at all times. When no card is selected, the panel displays a placeholder ("Select a challenge above to see the starter prompt"). When a card is selected, the content animates in (fade + slide-up, 300ms) within the already-allocated space. The panel height is fixed at a value that accommodates the longest prompt without truncation (approximately 180px).

**Why:**
Zero layout shift during interaction is a core UX quality signal. Reserving the space in advance eliminates the jump. The placeholder also makes the affordance explicit — users can see that something will appear there, which increases the likelihood they'll interact with the cards.

---

### Change 5: Dot Navigation — Accessibility

**Original spec:**
> Tooltips display section labels on hover.

**Problem identified:**
Hover-only tooltips are inaccessible to keyboard users and screen readers. Seven identical-looking dots with no visible labels fail WCAG 1.3.1 (Info and Relationships) and 2.4.6 (Headings and Labels).

**Change:**
- Add `aria-label` to each dot button (e.g., `aria-label="Navigate to Sweet Spot section"`)
- Add `role="navigation"` and `aria-label="Section navigation"` to the dot rail container
- Ensure dots are reachable via Tab key with a visible focus ring (2px solid cyan)
- Tooltip remains on hover; on focus (keyboard), show the same tooltip via a `focus` event handler

**Why:**
The dot nav is the primary navigation mechanism for the microsite. Making it keyboard-accessible takes fewer than 10 lines of changes and brings the microsite into WCAG AA compliance for navigation. This is a non-negotiable baseline for a corporate internal tool.

---

### Change 6: Opacity-Reduced Text — Minimum Contrast Floor

**Original spec:**
> "not slides" and "not memos" rendered at 40% opacity
> Quadrant labels at 40–50% opacity

**Problem identified:**
Text at 40% opacity on `#0a0a0f` (near-black) evaluates to approximately #0d6b78 for cyan at 40%, yielding a contrast ratio well below the WCAG AA minimum of 4.5:1 for normal text. The same applies to the amber and green quadrant labels at 40%.

**Change:**
Set a minimum effective opacity floor of **60%** for any text that conveys meaning (quadrant labels, de-emphasized headline words). Elements that are purely decorative (e.g., axis crosshair lines) can remain at 10%.

Concretely:
- "not slides" / "not memos": raise from 40% to 60% opacity
- Quadrant labels (EASY WIN green, GET HELP amber): raise from 40% to 60%
- SWEET SPOT and NOT THIS labels: already at 50% — raise to 65%

**Why:**
WCAG AA is the baseline accessibility standard for internal enterprise tools. Beyond compliance, low-contrast text on a projected shared screen (the primary facilitation use case) degrades further due to ambient light and projector calibration. The 60% floor is a pragmatic minimum that passes contrast checks and remains legible on poor projection hardware.

---

### Change 7: IntersectionObserver Threshold — Adjust for Tall Sections

**Original spec:**
> Active section detection uses IntersectionObserver with a 0.5 threshold

**Problem identified:**
Sections 2 (Sweet Spot) and 5 (Your Turn) contain tall content that may exceed the viewport height. A 0.5 threshold requires that 50% of the section be simultaneously visible to activate it. For a section taller than the viewport, 50% visibility is impossible — the dot nav will never highlight that section.

**Change:**
Use a threshold array `[0, 0.1, 0.4, 0.5]` combined with a `rootMargin: '-10% 0px -10% 0px'` inset. A section becomes active when it occupies the central 80% of the viewport, regardless of how tall it is. Track the section with the highest intersection ratio at any given moment as the active section.

**Why:**
The dot nav is a wayfinding tool. If it fails to track the user's position through tall sections, it becomes misleading and erodes trust. The threshold array + rootMargin approach is the standard solution to this problem and adds negligible complexity.

---

### Change 8: Add Facilitated Timer Display (New Feature)

**Original spec:**
No section timing is surfaced in the UI. Timing guidance exists only in facilitation notes (which are not part of the microsite).

**Problem identified:**
Facilitators running the session alone — with no co-facilitator to watch the clock — have no pacing reference integrated into the tool they're using. A separate clock requires splitting attention.

**Change:**
Add an optional collapsed facilitator timer to the dot navigation rail. A small clock icon above the dots opens a compact overlay showing:
- Elapsed session time (starts on first user interaction, or manually)
- Suggested cumulative time for the current section (e.g., "~20 min by here")
- A subtle amber highlight when the session is running behind the suggested pace

This is toggled by clicking the clock icon and defaults to hidden, so it does not affect the participant-facing view.

**Why:**
Facilitators cited time management as a top pain point in workshops of this type. Adding a non-intrusive pacing reference directly in the facilitation tool removes the need for a separate timer tab and keeps the facilitator's screen on the microsite throughout the session. The feature is hidden by default so it doesn't affect presentations where the facilitator is not using it.

---

---

### Change 9: Hero Subtext — Activate Domain Expertise as the Core Credibility Frame

**Source:** Ethan Mollick, "Management as AI Superpower" (Jan 2026)

**Original spec:**
> Subtext: "This site was built with vibe coding. / I wrote zero lines of code to make it. / By the end of this hour, you'll build something too."

**Problem identified:**
The Hero establishes that the facilitator built this without code — strong credibility. But it doesn't tell participants *why* this is relevant to them. Non-developers in this audience likely assume vibe coding requires some technical instinct they don't have. Mollick's finding is the direct answer: his best performers were non-developers who had deep domain knowledge and knew what good output looked like. The Hero is the highest-attention moment to make this case.

**Change:**
Add a fourth animation phase (2800ms delay) after the existing three:

> "You already know what 'done' looks like in your work. / That turns out to be the hard part."

This line renders at 80% opacity, DM Sans, slightly smaller than the key commitment line above it. It is the pivot from "watch what I did" to "here's why you can do this too."

**Why:**
Confidence is a prerequisite for participation. Participants who believe vibe coding is a technical skill they lack will disengage during the hands-on sections. Naming domain expertise as the actual superpower — before any content is taught — reframes the entire session from a skills transfer into a capabilities recognition. It also gives participants a genuine, memorable answer when asked to promote Copilot to colleagues: *"You already know what good looks like in your area. That's the hard part."*

---

### Change 10: Anatomy of a Vibe — Add Step 0 "Define Done First"

**Source:** Ethan Mollick, "Management as AI Superpower" (Jan 2026)

**Original spec:**
> Steps: 1. Describe the outcome → 2. Review what it builds → 3. Refine with conversation → 4. Accept or redirect

**Problem identified:**
The loop is sound, but Step 2 ("Review what it builds — does it match your intent?") assumes participants have a clear intent to compare against. In practice, most first-time vibe coders skip this and accept whatever the AI produces, because they have no pre-stated definition of done to evaluate against. Without this anchor, the loop degrades into open-ended iteration with no exit criteria.

**Change:**
Add a new first card — Step 0 — before the existing four:

| Step | Icon | Title | Detail text |
|------|------|-------|-------------|
| 0 | 🎯 | Define done first | "Before you describe anything, write one sentence: what would this look like if it worked? How will you know it's right? Your domain expertise is the answer here — not prompting skill." |

The existing steps 1–4 are renumbered but otherwise unchanged. The card layout adapts from four to five cards in the flex row; minimum card width reduces from 160px to 140px to accommodate five at narrower viewports.

The detail panel for Step 0 uses DM Mono, consistent with the other steps, but the word "domain expertise" is rendered in cyan to visually echo the Hero framing.

**Why:**
This is the single highest-leverage pedagogical addition. Mollick's core finding is that management skills — scoping, evaluating, knowing what good looks like — *are* the AI workflow. Step 0 makes that concrete and actionable rather than motivational. It also gives participants a transferable habit: before any future vibe coding session, write one sentence defining done. This habit is what enables independent use after the workshop ends.

---

### Change 11: Your Turn — Add Brief Structure Breakdown in Prompt Panel

**Source:** Ethan Mollick, "Management as AI Superpower" (Jan 2026)

**Original spec:**
> Prompt text rendered in DM Mono. "Copy" button copies text to clipboard.

**Problem identified:**
Participants copy a pre-written prompt and paste it into Copilot. This demonstrates that vibe coding works. It does not transfer the skill of writing a prompt independently. Without seeing the structure behind the starter prompt, participants have no template to apply when they return to their own work on Monday. The prompts risk becoming one-time artifacts rather than a repeatable method.

**Change:**
Above the starter prompt text in the panel, add a "Brief structure" breakdown section showing three labelled fields:

```
GOAL          [one sentence describing the desired output]
CONSTRAINTS   [required attributes, themes, or limits]
DONE WHEN     [how you'll know it worked]
```

Each starter prompt maps to one breakdown. Example for Personal Dashboard:
- **Goal:** A single-page overview showing key metrics at a glance
- **Constraints:** Dark theme, 4 metric cards, one bar chart
- **Done when:** I can tell at a glance whether things are on track

The brief structure renders in a smaller, muted DM Mono above a thin separator line. The copy button below copies only the starter prompt text, not the breakdown. Label the breakdown section "How this prompt was built" (12px, 50% opacity) to signal it's instructional rather than functional.

**Why:**
Revealing the structure behind the prompt transforms the starter prompt from a copy-paste shortcut into a worked example. Participants see the pattern (Goal / Constraints / Done), recognise they could fill it in for any domain-specific task, and leave with a transferable method. This directly supports the session goal: participants able to identify and act on vibe coding opportunities in their own work — not just during the workshop.

---

## Known Limitations (Retained from Original PRD)

- Reaction counters are local only — do not sync across clients
- All state resets on page refresh
- Quadrant is optimized for shared-screen presentation, not individual mobile use
- Starter prompts are static; modify the `STARTER_CHALLENGES` array to customize
- Live Build section is a placeholder — the actual build happens in VS Code

## Future Enhancements (Retained from Original PRD)

| Enhancement | Rationale |
|-------------|-----------|
| Shared reaction counters via WebSocket or polling | Enables audience participation from their own devices |
| QR code on final section linking to Copilot setup docs | Immediate next action for participants |
| Post-session survey embedded in Playbook section | Captures feedback while engagement is high |
| Editable challenge prompts via admin panel | Reuse across different audiences without code changes |
