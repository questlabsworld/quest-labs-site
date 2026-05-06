# /flip Page Audit — May 2026
> `questlabs.world/flip` → 301 redirects to `/program`

---

## Summary

The page has strong bones — compelling copy, a working waitlist form, good section-level anchor navigation, and a fully built modal system. But several structural decisions actively work against conversion: the most compelling content is commented out, the primary hero CTA leads to a dead end, and the page asks visitors to join before it has explained what they're joining.

---

## 🔴 Critical — Flow & Conversion

### 1. "Join a Cohort" lands on a dead end
The hero's primary CTA (`Join a Cohort →`) links to `#cohort` — which renders the Cohort 01 announcement: **"The founding cohort is full and in motion."** Below it is an **empty `<div class="prog-next-ctas">`** with no buttons, no text, nothing. A first-time visitor clicks the most prominent button on the page and hits a wall.

**Fix:** Change `href="#cohort"` → `href="#waitlist"` on the primary hero CTA. The waitlist is the actual action available.

### 2. Waitlist appears before the page has made its case
Current order: Hero → Premise → Quote → **Waitlist form** → Quote → Tiers → Journey

A visitor who hasn't yet seen the tiers or the 12-week arc is asked to reserve a spot. That's asking for commitment before delivering value. The waitlist conversion will be higher if it appears *after* the tiers and journey — once the visitor has understood what they're joining.

**Recommended order:**
1. Hero
2. The Premise (what is this?)
3. Tiers (how deep do you want to go?)
4. 12-Week Journey arc (what actually happens)
5. Testimonials (social proof)
6. Cohort status + Waitlist form
7. Closing

### 3. Most compelling content is commented out
Two entire sections are wrapped in `<!-- -->`:

**The 12-week arc grid** (lines 194–313) — interactive cards for all 12 weeks, each with a world, a question, and a modal that opens to the full session prompt. This is the most differentiating content on the site. A visitor reading it would understand the program viscerally, not just intellectually. It's hidden.

**The archetypes grid** (lines 318–374) — the five Black Menagerie animals, each with descriptions and an interactive modal. This is a hook for the Black Menagerie product *and* a way to make FLIP feel alive. Also hidden.

The modal system powering both of these (~250 lines of JS, 17 modal datasets) is fully built and working. The infrastructure exists — the content just needs to be uncommented.

**Note:** `#arc` is linked from nowhere currently, but if you uncomment the arc section, you'd want to add it as a hero CTA option.

---

## 🟠 High — Structure & Navigation

### 4. Tiers have no action
The three tier cards (Witness / Traveler / Questor) each end with a `.prog-tier-cta` div containing a short description ("Perfect if your time is limited →") but it's a `<div>`, not a link or button. There's no way to act on the tier you want. No pricing is shown either.

Each tier card should have a button or link — at minimum a scroll to `#waitlist`. Ideally, clicking a tier pre-fills or labels the waitlist form with the tier selected.

### 5. No CTA after the Journey section
The Hero's Journey section (Descent → Crossing → Emergence, 12 stages) is the second-longest section on the page. Someone who reads all the way through is primed and ready — and then hits the closing quote with no action available. There's no `→ Join the waitlist`, no button, nothing.

Add a CTA block between the closing quote and the page bridge.

### 6. Page is very long with no wayfinding
At 1,565 lines (and more if the arc/archetypes are uncommented), this is a long scroll. There are 6 anchored sections (`#what`, `#cohort`, `#waitlist`, `#tiers`, `#journey`, and `#arc` if uncommented) but no persistent section indicator or progress marker to tell a visitor where they are mid-scroll.

Consider a sticky mini-nav or dot indicators on the right rail for desktop, showing which section is in view.

---

## 🟡 Medium — CTAs & Links

### 7. Three competing hero CTAs with three different visual weights
```
[Join a Cohort →]     ← filled violet button
[Explore the Arc]     ← ghost/outline button
Choose Your Path      ← nearly invisible grey text link
```
Three styles = no clear hierarchy. The ghost button and ghost text link compete with each other. If "Choose Your Path" is worth showing, it should at least be a visible ghost button. If it's secondary, it can be a text link — but only one of the two secondary options should use each treatment.

### 8. `#arc` anchor is dead
The hero CTA "Explore the Arc" links to `#journey` (Hero's Journey section), which is correct. But the commented-out section uses `id="arc"`. If the arc grid gets uncommented, consider linking the hero CTA to `#arc` instead, since the interactive grid is the more engaging of the two arc presentations.

### 9. Footer label inconsistency
The page footer still shows `Bet on Us` (`href="/bet"`) — this should read `Sponsor` to match the nav. The footer also only has 3 links (Bet on Us, About, Contact) while most pages have the full footer set.

---

## 🟡 Medium — Technical

### 10. Netlify form may not be wired
The waitlist form uses `data-netlify="true"` and `method="POST"`. Netlify Forms only work when the site is **deployed on Netlify** — the form handler is injected at build time by Netlify's CDN. If the site is hosted elsewhere (or on a local dev server), form submissions silently fail: the `fetch('/')` POST returns a 200 but nothing is saved.

**To verify:** Check your deployment platform. If it's not Netlify, you'll need a form backend (Formspree, a serverless function, or Netlify deployment). The same issue affects `contact.astro` and the educators signup form.

### 11. Inline styles throughout
~15+ elements use `style=""` attributes directly in the HTML (blockquotes, phase labels, the "When & Where" block, comments, bridge links). This makes the page harder to maintain and override. These should move to CSS classes — especially the phase labels in the Journey section, which repeat `style="font-family:'Space Mono'..."` three times identically.

### 12. Font sizes — now fixed
`prog-section-label`, `prog-hero-eyebrow`, `prog-btn`, and several other elements were below 13px. All fixed in this session.

---

## ✅ What's Working Well

- **Waitlist form UX is solid** — the JS confirmation state (hides form, shows success message + sandbox link) works correctly.
- **Scroll-reveal animations** are well-paced and use IntersectionObserver correctly.
- **Modal system is fully built** — all 17 modal datasets (12 weeks + 5 archetypes) are complete with prompts. Ready to use as soon as the arc/archetype sections are uncommented.
- **Testimonials are well-placed** — Stephanie and Etienne quotes break up the density effectively.
- **Anchor navigation works** — `#waitlist`, `#tiers`, `#journey` all resolve correctly.
- **The `/flip` → `/program` redirect** is a clean 301.
- **SEO description** added and accurate.

---

## Priority Fix List

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| 1 | Change hero CTA `href="#cohort"` → `href="#waitlist"` | 2 min | High |
| 2 | Uncomment 12-week arc section | 5 min | Very High |
| 3 | Uncomment archetypes section | 5 min | High |
| 4 | Reorder page: Tiers + Journey before Waitlist | 30 min | High |
| 5 | Add CTA button to each tier card | 15 min | High |
| 6 | Add CTA block after Journey section | 10 min | Medium |
| 7 | Verify Netlify form or swap to working backend | varies | Critical (silent failure) |
| 8 | Remove empty `prog-next-ctas` div or fill it | 5 min | Low |
| 9 | Fix footer "Bet on Us" → "Sponsor" | 2 min | Low |
| 10 | Move repeated inline phase label styles to CSS class | 20 min | Low |
