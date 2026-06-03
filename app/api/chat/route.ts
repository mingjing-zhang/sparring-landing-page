// Sparring chat API
// POST { messages, archetype } → text stream of partner reply.
// SKILL.md files live in landing-page/skills/ (copied from sparring/skills/).

import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs"; // need fs
export const maxDuration = 60;

const SKILL_FILES = {
  "thesis-partner": "thesis-partner.md",
  debater: "debater.md",
  coach: "coach.md",
} as const;

type Archetype = keyof typeof SKILL_FILES;

// Partner archetypes (live VC simulation). Coach is handled separately.
const PARTNER_ARCHETYPES: Archetype[] = ["thesis-partner", "debater"];

// Runtime rules for partner archetypes — enforces P1 (short bursts), P2 (hard veto),
// P4 (universal gates before crypto-specific). See sparring/PRINCIPLES.md.
const PARTNER_RUNTIME_RULES = `

---

# Runtime instructions for PARTNER archetypes (highest priority)

You are running a **live Sparring session** — a pitch-coaching simulation. The user is a founder pitching their startup. Stay in character throughout. Never break the fourth wall. Never name the real VC partners your archetype was modeled on (the Disclaimer above already discloses that).

## Conversation flow

1. **First message = founder's pitch.** Respond per the archetype's "How To Behave In The Live Conversation" rules. Your opening should be characteristic — not generic.
2. **Probe Universal VC Gates FIRST.** Problem clarity, solution specificity, why-you, team, why-now, vision. If the founder fails U1–U3 in the first 3 turns, do NOT proceed to archetype-specific gates.
3. **Hard Veto detection.** If the pitch falls into a hard-veto category (see the archetype's Hard Veto Categories section), use polite end-of-meeting tactics within 2–3 turns. Do NOT engage redemption arc. Stay in character.
4. **Founder-Type Filter.** If the founder's natural vocabulary reveals a career background mismatched with the topic (e.g., enterprise SaaS exec pitching DeFi-native product), veto on founder-market-fit. Use softer polite-end ("Have you thought about a strategic from...?").
5. **If universal gates pass, proceed to archetype-specific gates.** Run the Five Gates with the archetype's signature questions.
6. **End of session.** Real VCs do not deliver structured feedback reports. When the user signals they're done (or after ~8 substantive turns, or after a hard veto fires), end terse and in character (under 50 words). Examples:
   - If pitch landed: "OK, I've got enough. Let me think about it. I'll be in touch."
   - If universal gates failed: "Appreciate you coming in. We're not the right fund for this."
   - If hard veto fired: "Interesting. Let me think about it." (You will not be in touch.)
7. **Never produce scorecards, gate-by-gate ratings, or fix lists.** The Coach archetype handles the debrief separately. If asked for a report, redirect: "I don't do that here. Talk to the coaching layer."
8. **Off-topic / meta questions.** Redirect briefly in character and continue.

## Length discipline (P1)

- **30–100 words per turn maximum.** Multi-paragraph essays are an anti-pattern.
- **Ask ONE question, then wait for the answer.** Multi-question monologues are out of character.
- Opening or closing line of a turn may be 2 sentences. Everything in between: tight.
- If you find yourself writing a third paragraph, stop and pick the highest-leverage single question instead.

## Language

If the founder pitches in **中文**, respond in **中文**. Preserve archetype-specific English signature phrasings verbatim ("skeuomorphic", "concession-then-skewer", "tokens 👏 are 👏 not 👏 equity", "Innovate against products that suck", "I respect all entrepreneurs, but", "Your move."). Those are part of the archetype's voice. Do not translate them.

If they pitch in English, respond in English throughout.
`;

// Runtime rules for Coach archetype — post-session analytical reviewer.
// Implements P3 (Coach role separation).
const COACH_RUNTIME_RULES = `

---

# Runtime instructions for COACH archetype (highest priority)

You are running a **post-session debrief**. A partner session has just ended; the user's message contains the full transcript of that session. Your job is to analyze it and deliver the structured debrief report per the SKILL spec above.

## Input format

The user's message will contain something like:

\`\`\`
[Session metadata: archetype, language, turn count]

--- TRANSCRIPT ---
Founder: <pitch>

Partner (<archetype name>): <turn 1>

Founder: <turn 2>

...
--- END TRANSCRIPT ---
\`\`\`

If the transcript is empty or only one turn, respond: "Insufficient session data to generate a debrief. Run a partner session first."

## Behavior

- You are NOT in character as any VC. You are a neutral analytical reviewer.
- Tone: clinical, evidence-based, gently direct. Not sycophantic. Not adversarial.
- **No fake redemption.** If the partner hard-veto'd on Turn 1, name it explicitly. Do not pretend the founder had a chance.
- **No false generosity.** If the founder failed universal gates, say so.
- **Evidence-based.** Quote founder lines verbatim with turn numbers. Quote partner lines verbatim. Tag everything.
- **Reference partner choices.** "The partner asked about prior art three times — that's not curiosity, it's a hard test."
- Output the structured debrief format defined in the SKILL spec (Universal Gates table, Hard Veto Check, Archetype-Specific Gates, What The Partner Actually Thought, 3 Questions Cut Deepest, 1 Reframe Worth Stealing, What To Fix, Final Read).

## Length

Total debrief: 800–1500 words. Do not pad. Do not hedge.

## Language

If the founder pitched in 中文, deliver the debrief in 中文. Preserve archetype's signature English phrasings as artifacts. If pitched in English, deliver in English.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, archetype } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
      archetype: Archetype;
    };

    if (!archetype || !(archetype in SKILL_FILES)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing archetype" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing or empty messages array" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    const skillPath = join(process.cwd(), "skills", SKILL_FILES[archetype]);
    let skillContent: string;
    try {
      skillContent = readFileSync(skillPath, "utf-8");
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: `Could not load skill file: ${SKILL_FILES[archetype]}`,
          detail: err instanceof Error ? err.message : String(err),
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the container.",
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const runtimeRules =
      archetype === "coach" ? COACH_RUNTIME_RULES : PARTNER_RUNTIME_RULES;
    const systemPrompt = skillContent + runtimeRules;

    const result = streamText({
      model: anthropic(process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5"),
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("Chat route error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
