# AI Basics — presenter deck for CPC staff

A 19-slide beginners' AI training, built to be delivered live to an internal,
English-speaking CPC team. Browser-based, no build step, no dependencies. Open
`index.html` and present.

```
index.html            all 19 slides and their presenter notes
assets/
  css/deck.css
  js/deck.js
  img/cpc-logo.png
```

---

## Presenting

| Key | |
|---|---|
| <kbd>&rarr;</kbd> <kbd>Space</kbd> | Next slide |
| <kbd>&larr;</kbd> | Previous |
| <kbd>Home</kbd> <kbd>End</kbd> | First / last |
| <kbd>1</kbd>–<kbd>19</kbd> | Jump to a slide by number |
| <kbd>N</kbd> | Presenter notes |
| <kbd>O</kbd> | Overview of all slides |
| <kbd>F</kbd> | Fullscreen |
| <kbd>?</kbd> | Key list |
| <kbd>Esc</kbd> | Close any panel |

Slides are authored at a fixed 1280×720 and scaled to whatever screen they land
on, so the layout you rehearse is the layout the room sees — nothing reflows on
a projector. Verified on 16:9 and 4:3 at several resolutions.

Opening the notes narrows the stage instead of covering the slide, so you can
see both. Typing a number jumps straight to that slide, which is what you want
when someone asks about slide 9 during questions. Every slide has a deep link
(`index.html#/9`).

**Handout:** print to PDF. One slide per page with its presenter notes
underneath.

---

## Before you present

Three things to fill in, all marked on-screen in amber:

1. **Slide 1** — presenter name, date, session length.
2. **Slide 10** — check CPC's actual confidentiality and data policy and quote
   their language rather than the slide's. If a policy staff already signed
   exists, name it; the session then lands as a familiar rule applied to a new
   tool rather than a new rule to learn.
3. **Slide 14** — decide which tool the room uses for the hands-on exercise and
   whether anyone needs an account before they walk in.

Slide 16 (translation) should also be checked against CPC's language-access
obligations before you present it.

---

## What the session covers

19 slides, roughly 60–90 minutes depending on how long you run the exercise.

**1–3.** Framing, what this is and is not, a show of hands to calibrate the room.

**4–6.** What a chatbot actually is — you type, it types back, and underneath it
is guessing the next words. Why that means it makes things up. And the one rule
that follows: it drafts, you decide.

**7.** Who makes them: ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google),
Copilot (Microsoft). Deliberately no pricing, model names, or benchmark scores —
see *What is asserted* below.

**8.** The three surfaces: **Chat** (a window, touches nothing), **Cowork**
(works on your real documents and files, carries a multi-step job to a finished
deliverable), **Code** (inside software projects, for engineers). Same
underlying thing; the difference is how much it can touch. Cowork is the one
that maps to what CPC program and admin staff do.

**9–10.** Two dials, in plain language. **Which helper** — the bright intern
(fast, cheap, misses nuance) versus the PhD (slow, expensive, handles messy
problems), with pros and cons side by side. And **how hard it thinks** — quick
answer versus take-your-time, which most people don't know is a setting.

**11–13.** Green, yellow, red. Green is go without asking anyone. Yellow is use
it then check. Red is the full-bleed slide: client information never goes in.
The escalation is deliberate — red is the loudest thing in the deck.

**14–15.** Describe instead of pasting, so the red rule has a workable
alternative. Then asking well, in four parts.

**16.** Hands-on, ten minutes on a real task the participant brought.

**17–19.** What CPC still has to decide, four takeaways, questions.

Presenter notes on every slide carry the timing, the things worth saying out
loud, and the traps. They are written to be read by someone other than the
person who wrote them.

---

## What is asserted, and what is not

**CPC facts** are limited to what is published on cpc-nyc.org: the logo, the
brand red (`#ED1C24`, sampled from the mark), the mission, and the founding
year. Nothing about CPC's policies, tools, staffing, clients, or current
practice is asserted anywhere, because none of that was available to check.

**Training content** — how these tools work, what they are good and bad at, the
confidentiality guidance, prompt technique — is the substance of the session and
is stated plainly.

**Deliberately absent from the slides:** no model names, version numbers,
pricing, usage limits, or benchmark comparisons. Those change on a timescale
shorter than the life of a deck, and a slide that is quietly out of date is
worse than no slide. Slide 9 teaches the intern-versus-PhD idea instead and
says outright that the product names change; the current Anthropic tiers sit in
that slide's presenter notes for your own reference, where they are easy to
update and nobody in the room has to memorise them.

**The vendor slide (7) is written to be even-handed on purpose.** This deck was
drafted with Claude, so a comparison that flattered Anthropic would be worth
nothing to you in that room. It gives each of the four the same shape — product,
maker, one line — and then says plainly that they leapfrog each other and the
choice should turn on what CPC approves, what the data terms say, and what is
already built into the software staff open every morning. The presenter notes
tell you to disclose which tool the examples use. If CPC runs on Google
Workspace or Microsoft 365, the genuinely useful fact on that slide is that
there is probably an AI already sitting inside it.

Anything CPC has to decide is marked in amber rather than filled in with a
plausible guess.

---

## Design

**Type.** Outfit for display, Public Sans for body. Design-space scale
17/19/21/24/27/34/42/54/92 — sized so the smallest text still reads from the
back of a meeting room.

**Colour.** `#ED1C24` is CPC's logo red. Behind white it is 4.38:1, which
clears AA for large text only, so every slide using it as a ground carries
display-size type exclusively — that is why slide 9 has no small print on it. A
deeper red (`#C81219`, 5.90:1) takes anything smaller. All text pairings meet
WCAG AA.

**Spacing.** 8px base.

**Motion.** Transform and opacity only; disabled under `prefers-reduced-motion`.

**Checks.** Every slide measured against the 720px frame — none overflow. No
console errors. Navigation, notes, overview, number-jump, deep links, and print
all exercised.

---

An earlier version of this repo was a public course landing page, before the
brief was clarified. It is in the git history at `0683e07` if any of it is
useful.
