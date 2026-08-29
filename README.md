# AI Basics — presenter deck for CPC staff

A 27-slide beginners' AI training, built to be delivered live to a small,
internal, English-speaking CPC team. Browser-based, no build step, no
dependencies. Open `index.html` and present.

```
index.html            all 27 slides and their presenter notes
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
| <kbd>1</kbd>–<kbd>27</kbd> | Jump to a slide by number |
| <kbd>N</kbd> | Presenter notes |
| <kbd>O</kbd> | Overview of all slides |
| <kbd>F</kbd> | Fullscreen |
| <kbd>?</kbd> | Key list |
| <kbd>Esc</kbd> | Close any panel |

Slides are authored at a fixed 1280×720 and scaled to whatever screen they land
on, so the layout you rehearse is the layout the room sees — nothing reflows on
a projector. Verified on 16:9, 16:10 and 4:3.

Opening the notes narrows the stage instead of covering the slide, so you can
see both. Typing a number jumps straight to that slide, which is what you want
when someone asks about slide 17 during questions. Every slide has a deep link
(`index.html#/17`).

**Handout:** print to PDF. One slide per page with its presenter notes
underneath. The work map's colour code is printed as words as well as dots, so
it survives a black-and-white printer.

**No wifi in the room?** The two webfonts come from Google Fonts and will not
load offline. The deck falls back to the system sans and every slide still fits
the frame — it just looks less like itself. Nothing else on any slide needs the
network.

---

## This is a discussion, not a lecture

The deck is built for a small group, and four slides exist only to stop the
presenter talking:

- **Slide 3 — "What is the most embarrassing thing you have used AI for?"**
  The opener. Almost everyone in the room is already using these tools and
  almost nobody has said so at work. Once that is in the open, the rest of the
  hour is a conversation between people who all use it rather than a lecture at
  people who supposedly do not. Go first, and mean it.
- **Slide 9 — "Which of those five feels most at risk in your work?"** The best
  five minutes in the deck. Do not resolve it.
- **Slide 17 — "Where would the last thing you worked on go?"** Applies the
  traffic lights to work someone did this week.
- **Slide 25 — "What would have to be true before you would trust this with
  something a client reads?"** The answers are usually concrete — a second
  reader, a checklist, a named approver — and that list is the beginning of the
  written policy.

Discussion slides carry a red bar down the left edge; the same prompt folded
into a teaching slide gets the same bar turned on its side. Both mean the same
thing to the presenter: stop, ask, wait.

Two stretches hand the room something to do rather than something to answer:
**slides 19–22**, the paper exercise, and **slide 24**, the ten minutes on their
own work. Between the four prompts and these two, roughly a third of the session
is not you talking. In a room of eight that is the right ratio, and when you run
short it is the part to protect — the slides can be skimmed, the conversation
cannot be recovered afterwards.

**Bring paper and something to draw with.** It is the only thing the session
needs that is not a screen, and slides 19–22 do not work without it.

One trap is called out in the notes and worth repeating here. During the
icebreaker someone may admit to something the red-light slide later forbids —
pasting a client's message, uploading a document. **Do not make an example of
them.** Thank them and move on; let slide 16 do the work. Embarrass the one
person honest enough to say it and nobody tells you anything for the rest of the
session, and that was the only real information you were going to get.

---

## Before you present

Nothing is left blank. Presenter is Jo Flores, the exercise runs on Claude, and
follow-up goes to hi@joflores.com. The deck carries no date, so it can be
presented more than once without editing.

Two things that follow from those answers, both already written into the
presenter notes:

- **There is no written AI data rule at CPC to quote, so slide 16 is the rule.**
  The slide no longer defers to a policy — it states the default. If someone
  asks whether this is policy, say exactly that: nothing is written down yet,
  this is the safe default until it is, and writing it down is the first item on
  slide 25. Do not imply it has been approved somewhere it has not.
- **Using Claude today is not CPC approving Claude.** Slide 25 still asks which
  tools are approved, and those two need to stay separate out loud or the
  session accidentally announces a decision nobody made. Slide 10's notes now
  tell you to disclose up front that the deck was drafted with Claude and the
  exercise uses it — a slide that works hard to be even-handed about four
  vendors is only worth something if the room knows which one you came in with.

Check before the day that everyone can actually sign in. If accounts are not
sorted, run slide 24 on the screen with the room calling out the prompt; it
works nearly as well and beats spending the ten minutes on logins.

---

## What the session covers

27 slides, roughly 60–90 minutes depending on how long the discussions run.

**1–3.** Framing, what this is and is not, then the icebreaker.

**4.** What a chatbot actually is — you type, it types back, and underneath it
is guessing the next words.

**5.** **Very fancy predictive text.** The same mechanism as your phone's
next-word suggestions, drawn as a keyboard suggestion bar, because everyone in
the room already knows that thing. Two consequences follow and the rest of the
deck leans on both: it is only as good as what it read (some textbooks, a lot of
Reddit, and no label telling you which you just got), and it will play whatever
part you set up — predicting words means predicting a role.

**6.** **It is really good at improv.** Why prediction means it invents. The
improv framing is doing a job here that "it lies" and "it is broken" both fail
at: an improviser who produces a case number on demand is not deceiving you and
is not malfunctioning, they are obeying the form, which is never to turn down an
offer. It has no move for "I do not know", and that is the shape of the thing
rather than a flaw it will grow out of.

**7.** The one rule that follows: it drafts, you decide.

**8–9.** **What we are protecting** — five things the rest of the hour exists to
defend, after the Center for Humane Technology (see below), each translated into
one line about CPC's work. Then the room says which feels most at risk. This is
the slide that gives the traffic lights a reason: without it they read as CPC
covering itself, with it they read as protecting the thing CPC is.

**10.** Who makes them: ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google),
Copilot (Microsoft). Deliberately no pricing, model names, or benchmark scores —
see *What is asserted* below.

**11.** The three surfaces: **Chat** (a window, touches nothing), **Cowork**
(works on your real documents and files, carries a multi-step job to a finished
deliverable), **Code** (inside software projects, for engineers). Same
underlying thing; the difference is how much it can touch. Cowork is the one
that maps to what CPC program and admin staff do.

**12–13.** Two dials, in plain language. **Which helper** — the bright intern
(fast, cheap, misses nuance) versus the PhD (slow, expensive, handles messy
problems), with pros and cons side by side. And **how hard it thinks** — quick
answer versus take-your-time, which most people don't know is a setting.

**14–16.** Green, yellow, red. Green is go without asking anyone. Yellow is use
it then check. Red is the full-bleed slide: client information never goes in.
The escalation is deliberate — red is the loudest thing in the deck.

**17.** **Your work, sorted.** The lights applied to four things this team
actually does — community events, legal help, grant writing, budgets — each with
one green, one yellow and one red example. Laid out so green runs along the top
and red along the bottom of all four columns.

**18.** Describing instead of pasting, so the red rule has a workable
alternative.

**19–22.** **The paper exercise.** Three prompt slides — *Draw a tree.* → *I
meant a lemon tree.* → *I meant a lemon tree in a pot.* — thirty seconds each, no
screens, then everyone holds their paper up at once. Slide 22 is the takeaway.

The room is the model here, which is the point. Nobody draws the same tree,
because an unspecified detail gets filled with your own most likely one — slide
5 arriving as something they just did rather than something they were told. And
at step two nearly everyone adds lemons to the tree already in front of them
rather than starting a new drawing, which is context: the description did not
need repeating because the conversation was already carrying it. People who
think of these tools as a search box have never met that half.

Two presenter rules, both in the notes. Do not explain the point before they
draw — the exercise dies if you do. And do not tell them at step two whether to
add to the old drawing or start fresh, because what they choose is the evidence
you use on slide 22.

**23.** Asking well, in four parts. It comes *after* the paper on purpose — the
exercise creates the "I should have said more" moment, and this slide is the
answer to it. Also where slide 5's role-playing point turns practical: you are
not typing a question, you are setting up who is answering.

**24.** Hands-on, ten minutes on a real CPC task: summarising an RFP, tightening
a grant paragraph, budget justification text, a run-of-show.

**25–27.** What CPC still has to decide, five house rules, questions.

Presenter notes on every slide carry the timing, the things worth saying out
loud, and the traps. They are written to be read by someone other than the
person who wrote them.

---

## Sources

**The Center for Humane Technology** supplies slide 8 and, through it, house
rules 3 and 4. The five pillars are theirs, from *Preserving What Makes Us
Deeply Human in the Age of AI* (2026) and humanetech.com/ai-and-humanity — in
their words: relationships, cognitive capacities, inner worlds, identities, and
work and contributions. The one-line translations on the slide are ours, written
for this room; the slide credits them and the notes name the report.

Their central argument sits in the notes rather than on the slide, because it is
better said out loud than read: these harms are not accidents or growing pains,
they follow from business models that optimise for engagement and dependency —
the same pattern that played out with social media. That framing tends to change
how a room hears everything after it.

Two of the five are worth dwelling on for CPC specifically. **Relationships**,
because an organisation whose entire value is human relationships with immigrant
and low-income communities has more at stake than a company selling software.
And **work**, because it is what people are quietly worried about; naming it
costs nothing and buys the room's attention for the rest of the hour.

---

## What is asserted, and what is not

**CPC facts** are limited to what is published on cpc-nyc.org: the logo, the
brand red (`#ED1C24`, sampled from the mark), the mission, and the founding
year. Nothing about CPC's policies, tools, staffing, clients, or current
practice is asserted anywhere, because none of that was available to check.

The four work areas on slide 17 — community events, legal help, grant writing,
budgets — came from the brief for this session, not from research into CPC's
programmes. The green/yellow/red sorting within them is the trainer's judgement
applied to those categories, and it is a starting point for the discussion, not
a ruling. If the room disagrees with a placement, that argument *is* the slide
working.

**Training content** — how these tools work, what they are good and bad at, the
confidentiality guidance, prompt technique — is the substance of the session and
is stated plainly.

**Slide 5 simplifies on purpose, and the notes say where.** "Very fancy
predictive text" and "a lot of it is Reddit" are true enough to teach with and
not the whole story: these models are also trained on licensed and edited
writing, and tuned heavily after training. The presenter notes tell you to
concede that point to anyone who raises it, because the useful part survives
either way — nothing on the screen tells you which part of what it read you just
got, so you check. The notes also warn against using "it is just autocomplete"
as a put-down; the room stops listening to the parts where you say it is
genuinely good.

**Deliberately absent from the slides:** no model names, version numbers,
pricing, usage limits, or benchmark comparisons. Those change on a timescale
shorter than the life of a deck, and a slide that is quietly out of date is
worse than no slide. Slide 12 teaches the intern-versus-PhD idea instead and
says outright that the product names change; the current Anthropic tiers sit in
that slide's presenter notes for your own reference, where they are easy to
update and nobody in the room has to memorise them.

**The vendor slide (10) is written to be even-handed on purpose.** This deck was
drafted with Claude, so a comparison that flattered Anthropic would be worth
nothing to you in that room. It gives each of the four the same shape — product,
maker, one line — and then says plainly that they leapfrog each other and the
choice should turn on what CPC approves, what the data terms say, and what is
already built into the software staff open every morning. The presenter notes
tell you to disclose which tool the examples use. If CPC runs on Google
Workspace or Microsoft 365, the genuinely useful fact on that slide is that
there is probably an AI already sitting inside it.

Nothing on a slide is a plausible guess. Everything CPC has yet to decide is on
slide 25 as an open question rather than stated as settled.

The deck keeps an amber marker style for anything unresolved — wrap it in
`<span class="tbd">…</span>` and it shows up highlighted on the slide, legible
from the back of the room. Nothing currently uses it. If something comes up
between now and the session that you want visible rather than forgotten, that
is what it is for.

---

## Design

**Type.** Outfit for display, Public Sans for body. Design-space scale
17/19/21/24/27/34/42/54/92 — sized so the smallest text still reads from the
back of a meeting room.

**Colour.** `#ED1C24` is CPC's logo red. Behind white it is 4.38:1, which
clears AA for large text only, so every slide using it as a ground carries
display-size type exclusively — that is why slide 16 has no small print on it. A
deeper red (`#C81219`, 5.90:1) takes anything smaller. All text pairings meet
WCAG AA; the traffic-light washes carry body text at 15:1 or better and each
light's own colour clears AA on its own wash.

Red is spent carefully. The discussion slides get a red edge and nothing more,
the work map's "never" rows get the deep red rather than the bright one, and the
only full-bleed red in the deck is the red-light slide — so it stays the loudest
thing in the session.

**Spacing.** 8px base.

**Motion.** Transform and opacity only; disabled under `prefers-reduced-motion`.

**Checks.** Every slide measured against the 720px frame — none overflow, and
none intrude on the 80px margin. Measured again with the webfonts blocked, since
that is what an offline room gets: still no overflow. Centring verified at 16:9,
16:10 and 4:3 with the notes pane open and closed. No console errors.
Navigation, notes, overview, number-jump, deep links, and print all exercised.

---

An earlier version of this repo was a public course landing page, before the
brief was clarified. It is in the git history at `0683e07` if any of it is
useful.
