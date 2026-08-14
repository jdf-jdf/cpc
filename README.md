# AI Basics at CPC — landing page

A static landing page for a free, six-week beginners' AI course run with the
[Chinese-American Planning Council](https://www.cpc-nyc.org). No build step, no
dependencies — open `index.html` or drop the folder on any static host.

```
index.html
assets/
  css/styles.css
  js/main.js
  img/cpc-logo.png
```

---

## Before this goes live

Four things need a real value. Everything else is verified against CPC's public
site and can ship as-is.

### 1. The form endpoint

`assets/js/main.js`, top of the file:

```js
var CONFIG = {
  registrationEndpoint: '',   // <- set this
```

Until it is set, the form validates normally and then shows its error state
pointing people at the phone numbers. That is deliberate: a form that silently
swallows a registration is worse than one that says "call us." Any endpoint
accepting a JSON `POST` works — Formspree, a Netlify function, a Google Apps
Script, an internal CPC intake API. The payload is:

```json
{ "name": "", "phone": "", "email": "", "center": "", "language": "", "notes": "" }
```

### 2. Session dates and seat counts

Placeholder values sit in two places and must agree with each other:

- `index.html` → the `.enroll__list` block (dates, times, seat counts)
- `index.html` → the `.place__meta` blocks under Locations (class nights)
- `index.html` → the `#f-center` `<select>` options

Currently set to a Fall 2026 cycle: Manhattan Tuesdays, Brooklyn Wednesdays,
Queens Saturdays, September 22 to October 31.

### 3. The intake phone number

The page uses CPC's real published lines: Manhattan (212) 941-0030, Brooklyn
(718) 492-0409, Queens (718) 358-8899. If the program has its own extension or
a dedicated coordinator line, swap it in — it appears in the masthead, hero,
FAQ, registration panel, footer, and `CONFIG.centerPhones`.

### 4. Program claims that need CPC sign-off

These are written as commitments and should be confirmed by whoever runs the
program before launch:

- MetroCard for each session (two fares)
- Laptop loan for every participant
- In-room interpretation in Cantonese, Mandarin, and Spanish
- Supervised childcare at Manhattan and Brooklyn
- Certificate after four of six sessions
- Weekly drop-in hours at all three centers

---

## Verified against cpc-nyc.org

Pulled from CPC's own site rather than invented:

| Item | Value |
|---|---|
| Logo | `cpc_logo_tm_x130.png`, CPC's own header mark |
| Brand red | `#ED1C24`, sampled from the logo |
| Tagline | Advancing Our Communities |
| Mission | Quoted verbatim in the footer |
| Founded | 1965 |
| Manhattan | 45 Suffolk Street, New York, NY 10002 — (212) 941-0030 |
| Brooklyn | 4101 8th Avenue, 4th Floor, Brooklyn, NY 11232 — (718) 492-0409 |
| Queens | 133-14 41st Avenue, Flushing, NY 11355 — (718) 358-8899 |
| General | info@cpc-nyc.org, (212) 941-0920 |

The logo is CPC's trademark. It is used here for a CPC program; anything
outside that needs their permission.

---

## Design system

Held in `:root` at the top of `styles.css`. If you change one value, change it
there rather than at the call site.

**Colour roles.** `--brand` (`#ED1C24`) is the logo red. At 4.24:1 on the page
ground it clears AA for large text only, so it is restricted to the logo, large
fills, and display type. `--brand-deep` (`#C81219`) carries every button, link,
and small red word — 5.72:1 on canvas, 5.90:1 behind white. Body text is
`--ink` (17.98:1); secondary text is `--ink-muted` (8.04:1). Every pairing on
the page meets WCAG AA, including muted and small text.

**Type.** 16 / 18 / 20 / 24 / 30 / 38 / 48 / 62. Body floor is 18px at every
breakpoint — above the 16px minimum, because a good share of this audience is
reading in a second language or with older eyes. Two families: Outfit for
display, Public Sans for body. Noto Sans TC is appended to both stacks purely
for Chinese glyph coverage, not as a third style.

**Spacing.** 8px base. Every margin, padding, and gap is a multiple.

**Elevation.** Three levels: surface (flat), raised (hairline + diffuse
shadow), overlay (the sticky masthead, the only element with a backdrop
filter).

**Motion.** All reveals run through `IntersectionObserver`; nothing listens to
scroll. Only `transform` and `opacity` animate. `prefers-reduced-motion` turns
the whole system off.

**States.** The form ships with empty, inline-error, loading, network-error,
and success states. The success message changes for Queens, which is on a
waitlist. "Register someone else" resets cleanly — the intake staff signing up
a family at the front desk was the case this was built around.

---

## Why it doesn't look like a tech landing page

The audience is adults in immigrant and low-income communities across NYC —
many on older Android phones, many reading in a second language, a good number
opening a laptop for the first time in session 1. So: high contrast over
atmosphere, plain sentences over marketing voice, a phone number beside every
call to action, and a print stylesheet, because people in these programs print
the page and bring it in.

The FAQ answers the questions people actually hesitate over — "is it really
free," "do I need English," "will AI take my job" — rather than the questions
that flatter the program.

---

## Checks

- HTML validates; landmarks, heading order, and skip link in place
- Accordion uses `aria-expanded` / `aria-controls`; nav sets `aria-current`
- Form errors wire up via `aria-invalid` and `aria-errormessage`
- No `100vh` (uses `dvh` conventions), no scroll listeners, no layout-animating properties
- `backdrop-filter` only on the sticky masthead
- Single column below 720px; masthead nav collapses, buttons go full width
