# Beginners AI Training — draft landing page concept

A layout proposal for a possible beginners' AI training with the
[Chinese-American Planning Council](https://www.cpc-nyc.org), built to be
presented to the CPC team.

**This is not a published program page.** No dates, costs, supports, policies,
or commitments on it are real, because none have been decided. Anything CPC
has not actually determined is marked on screen rather than filled in with a
plausible-looking guess.

Static site — no build step, no dependencies. Open `index.html` or drop the
folder on any static host.

```
index.html
assets/
  css/styles.css
  js/main.js
  img/cpc-logo.png
```

---

## Presenting it

The bar at the top of the page states that it is a draft. Next to it is a
**Highlight open questions** toggle: switching it on outlines every unresolved
decision and numbers them, so the room can see at a glance how much is still
open. The count is read from the page itself, so it drops as questions get
answered and markers get removed.

Suggested order: walk the page top to bottom with the toggle off so the shape
of the thing lands, then switch it on and work the "What has to be decided"
section.

The page prints, and the draft notice and markers print with it. A printed
copy with the caveat stripped off is exactly the artifact that causes a
misunderstanding later.

---

## What is real, and what is not

**Taken from cpc-nyc.org and safe to show:**

| Item | Value |
|---|---|
| Logo | CPC's own header mark (`cpc_logo_tm_x130.png`) |
| Brand red | `#ED1C24`, sampled from that logo |
| Tagline | Advancing Our Communities |
| Mission | Quoted verbatim in the footer |
| Founded | 1965 |
| Manhattan Community Center at CPC One | 45 Suffolk Street, New York, NY 10002 — (212) 941-0030 |
| Brooklyn Community Center | 4101 8th Avenue, 4th Floor, Brooklyn, NY 11232 — (718) 492-0409 |
| Queens Community Center | 133-14 41st Avenue, Flushing, NY 11355 — (718) 358-8899 |
| General | info@cpc-nyc.org, (212) 941-0920 |

Subway lines shown for each center are the nearest stations to those
addresses.

**Proposed by this draft, and open to being wrong:** the program name, the
headline, the audience definition, the six-session curriculum outline, and the
set of questions in the FAQ. These are a starting point for discussion, not
recommendations anyone has vetted against CPC's programs or funding.

**Deliberately left blank:** cost, length, schedule, sites, equipment,
language support, transit or childcare help, certificates, attendance policy,
eligibility, privacy practice, and who handles intake. Each has a marked slot
waiting for a real answer.

The sign-up form validates and confirms so the interaction can be reviewed,
but it does not POST, store, or transmit anything, and it says so on screen.
Wiring it to an endpoint is a decision for CPC rather than a default this
draft should quietly make.

---

## Design system

Held in `:root` at the top of `styles.css`. Change a value there rather than
at the call site.

**Colour roles.** `--brand` (`#ED1C24`) is the logo red. At 4.24:1 on the page
ground it clears AA for large text only, so it is limited to the logo, large
fills, and display type. `--brand-deep` (`#C81219`) carries every button,
link, and small red word — 5.72:1 on canvas, 5.90:1 behind white. `--pending`
is the "not decided yet" role used by every marker, at 6.51:1 on its own wash,
with variants for the dark and red sections. Every pairing on the page meets
WCAG AA, including muted and small text.

**Type.** 16 / 18 / 20 / 24 / 30 / 38 / 48 / 62. Body floor is 18px at every
breakpoint — above the 16px minimum, since a good share of the eventual
audience would be reading in a second language. Two families: Outfit for
display, Public Sans for body. Noto Sans TC is appended to both stacks for
Chinese glyph coverage, not as a third style.

**Spacing.** 8px base. Every margin, padding, and gap is a multiple.

**Elevation.** Three levels: surface, raised, overlay. The sticky masthead is
the only element with a backdrop filter.

**Motion.** Reveals run through `IntersectionObserver`; nothing listens to
scroll. Only `transform` and `opacity` animate. `prefers-reduced-motion` turns
the system off.

**States.** The form covers empty, inline error, loading, and confirmation.
Unfilled schedule rows are styled as empty slots so they read as intentional.

---

## Why it doesn't look like a tech landing page

If this became real, the audience would be adults in immigrant and low-income
communities across NYC — many on older Android phones, many reading in a
second language, some opening a laptop for the first time. So: high contrast
over atmosphere, plain sentences over marketing voice, and a print stylesheet.

The FAQ collects the questions people actually hesitate over — "is it really
free," "do I need English," "will AI take my job" — rather than the questions
that flatter a program. Those answers are blank on purpose. Filling them in is
a good way to pin down what the program actually is.

---

## Checks

- No horizontal overflow from 320px to 1920px; no console errors
- Landmarks, heading order, and skip link in place
- Accordion uses `aria-expanded` / `aria-controls`; nav sets `aria-current`;
  the decisions toggle uses `aria-pressed`
- Form errors wire up via `aria-invalid` and `aria-errormessage`
- No `100vh`, no scroll listeners, no layout-animating properties
- `backdrop-filter` only on the sticky masthead
- Single column below 720px
