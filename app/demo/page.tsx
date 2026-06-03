"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Archetype = "thesis-partner" | "debater";
type Message = { id: string; role: "user" | "assistant"; content: string };
type CoachStatus = "idle" | "streaming" | "done";

const ARCHETYPES: {
  id: Archetype;
  name: string;
  tagline: string;
  modeled: string;
  seniority: string;
  accent: string;
}[] = [
  {
    id: "thesis-partner",
    name: "The Thesis Partner",
    tagline:
      "Calm, professorial. Tests prior art, idea-maze depth, native-vs-skeuomorphic, 10-year horizon. Will not raise their voice.",
    modeled: "Modeled on a16z crypto style",
    seniority: "Partner",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    id: "debater",
    name: "The Debater",
    tagline:
      "Amused-disdainful. Steelmans your case better than you did, then knifes the weakest assumption. Probes threat models, real users today, token distribution.",
    modeled: "Modeled on Dragonfly / Multicoin style",
    seniority: "Partner",
    accent: "from-purple-500 to-pink-600",
  },
];

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function DemoPage() {
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [pitch, setPitch] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  // P3: session ending + Coach debrief are separate concerns from partner chat
  const [sessionEnded, setSessionEnded] = useState(false);
  const [coachStatus, setCoachStatus] = useState<CoachStatus>("idle");
  const [coachReport, setCoachReport] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, streaming]);

  async function send(userText: string) {
    if (!archetype) return;
    setError(null);
    const userMsg: Message = { id: newId(), role: "user", content: userText };
    const assistantId = newId();
    const baseMessages = [...messages, userMsg];
    setMessages([
      ...baseMessages,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: baseMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          archetype,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        let errMsg = errBody;
        try {
          const parsed = JSON.parse(errBody);
          errMsg = parsed.error || errBody;
        } catch {
          /* not JSON */
        }
        throw new Error(errMsg);
      }

      if (!res.body) {
        throw new Error("Response has no body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Stream chunks into the last (assistant) message
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: buffer } : m))
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      // Remove the empty assistant message on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }

  // P3: end partner session — terse, no scorecard. Coach is requested separately.
  function endSession() {
    setSessionEnded(true);
  }

  // P3: request Coach debrief — serializes the full transcript and streams a structured report.
  async function requestDebrief() {
    if (!archetype || messages.length < 2) return;
    setError(null);
    setCoachStatus("streaming");
    setCoachReport("");

    const archetypeName =
      ARCHETYPES.find((a) => a.id === archetype)?.name ?? archetype;

    // Build transcript blob the Coach SKILL expects
    const transcriptLines: string[] = [];
    let founderTurn = 0;
    let partnerTurn = 0;
    messages.forEach((m) => {
      if (m.role === "user") {
        founderTurn += 1;
        transcriptLines.push(`Founder (turn ${founderTurn}): ${m.content}`);
      } else {
        partnerTurn += 1;
        transcriptLines.push(
          `Partner — ${archetypeName} (turn ${partnerTurn}): ${m.content}`
        );
      }
    });

    const transcriptBlob = [
      "[Session metadata]",
      `Archetype: ${archetypeName}`,
      `Turn count: ${messages.length}`,
      "",
      "--- TRANSCRIPT ---",
      transcriptLines.join("\n\n"),
      "--- END TRANSCRIPT ---",
      "",
      "Please produce the structured debrief per the SKILL spec.",
    ].join("\n");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: transcriptBlob }],
          archetype: "coach",
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        let errMsg = errBody;
        try {
          const parsed = JSON.parse(errBody);
          errMsg = parsed.error || errBody;
        } catch {
          /* not JSON */
        }
        throw new Error(errMsg);
      }
      if (!res.body) throw new Error("Coach response has no body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setCoachReport(buffer);
      }
      setCoachStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setCoachStatus("idle");
    }
  }

  // -------------------- Pre-session setup view --------------------

  if (!started) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pt-16">
        <DemoNav />
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-2">
            Start a Sparring session
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Pick an archetype, paste your pitch, hit start. ~10 minutes. Free
            demo, no signup. Pitch in English or 中文.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-sm text-amber-900 dark:text-amber-200">
            <strong>Disclaimer.</strong> Each archetype is modeled on the
            publicly known styles of multiple crypto VC partners (their public
            essays, podcasts, and writing). It does not represent or affiliate
            with any specific individual or fund. This is a teaching
            simulation.
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            1. Pick your archetype
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {ARCHETYPES.map((a) => (
              <button
                key={a.id}
                onClick={() => setArchetype(a.id)}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  archetype === a.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.accent}`}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {a.seniority}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {a.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {a.tagline}
                </p>
                <p className="text-xs text-slate-500">{a.modeled}</p>
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            2. Paste your pitch (or BP summary)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            2–5 minute opener as if you just walked into the partner&apos;s
            office. Cover what you do, who it&apos;s for, why now. Either
            language. The partner will probe from there.
          </p>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="Hi, I'm [name], founder of [company]. We're solving [problem] for [customer]..."
            rows={10}
            className="w-full p-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 mb-6 resize-y"
          />

          <button
            disabled={!archetype || pitch.trim().length < 50}
            onClick={() => {
              setStarted(true);
              void send(pitch);
            }}
            className="px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-blue-500/25"
          >
            Start Session →
          </button>

          {(!archetype || pitch.trim().length < 50) && (
            <p className="text-sm text-slate-500 mt-3">
              {!archetype && "Pick an archetype above. "}
              {pitch.trim().length < 50 &&
                "Pitch needs at least 50 characters."}
            </p>
          )}
        </div>
      </main>
    );
  }

  // -------------------- Chat view --------------------

  const current = ARCHETYPES.find((a) => a.id === archetype)!;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pt-16 pb-40">
      <DemoNav>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Sparring with{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {current.name}
          </span>
        </div>
      </DemoNav>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-3xl">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-6 ${m.role === "user" ? "text-right" : ""}`}
          >
            <div
              className={`inline-block max-w-[85%] p-4 rounded-2xl text-left ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-sm"
              }`}
            >
              <div className="whitespace-pre-wrap break-words text-[0.95rem] leading-relaxed">
                {m.content || (
                  <span className="text-slate-400 italic">
                    {current.name} is thinking…
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-1 px-2">
              {m.role === "user" ? "You" : current.name}
            </div>
          </div>
        ))}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {sessionEnded && coachStatus === "idle" && (
          <SessionEndPanel
            partnerName={current.name}
            onRequestDebrief={() => void requestDebrief()}
          />
        )}

        {coachStatus !== "idle" && (
          <CoachCard report={coachReport} status={coachStatus} />
        )}

        <div ref={scrollRef} />
      </div>

      {!sessionEnded && (
        <ChatInput
          disabled={streaming}
          onSend={(t) => void send(t)}
          onEnd={endSession}
        />
      )}
    </main>
  );
}

// -------------------- Sub-components --------------------

function DemoNav({ children }: { children?: React.ReactNode }) {
  return (
    <nav
      aria-label="Demo navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
            AZ
          </div>
          <span className="text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
            Sparring
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {children}
          <Link
            href="/"
            className="text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ChatInput({
  disabled,
  onSend,
  onEnd,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
  onEnd: () => void;
}) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-40">
      <div className="container mx-auto px-4 md:px-6 py-4 max-w-3xl">
        <div className="flex gap-3 items-end">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Your response… (Enter to send · Shift+Enter for newline)"
            rows={2}
            disabled={disabled}
            className="flex-1 p-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none disabled:bg-slate-100 dark:disabled:bg-slate-900"
          />
          <button
            onClick={submit}
            disabled={disabled || !text.trim()}
            className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl transition-all"
          >
            Send
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
          <span>
            Enter to send · Shift+Enter for newline
          </span>
          <button
            onClick={onEnd}
            disabled={disabled}
            className="text-blue-600 dark:text-blue-400 hover:underline disabled:text-slate-400 disabled:no-underline"
          >
            End conversation →
          </button>
        </div>
      </div>
    </div>
  );
}

// P3: shown after partner session ends but before Coach is requested.
// The partner stays in character and exits terse; the Coach is the paid analytical layer.
function SessionEndPanel({
  partnerName,
  onRequestDebrief,
}: {
  partnerName: string;
  onRequestDebrief: () => void;
}) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-2xl flex-shrink-0">
          🎯
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Session ended.
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            {partnerName} ended the meeting. Real VCs don&apos;t deliver
            scorecards — they say &quot;let me think about it&quot; and you walk out
            guessing. <strong>The Coach watched the whole session and can tell
            you what actually happened.</strong>
          </p>
          <button
            onClick={onRequestDebrief}
            className="px-6 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-md"
          >
            Unlock the Coach debrief →
          </button>
          <p className="text-xs text-slate-500 mt-3">
            Free during MVP. Production tier: paid unlock.
          </p>
        </div>
      </div>
    </div>
  );
}

// Coach output card — streams the structured debrief inline.
function CoachCard({
  report,
  status,
}: {
  report: string;
  status: CoachStatus;
}) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
          C
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            The Coach — Structured Debrief
          </h3>
          <p className="text-xs text-slate-500">
            Neutral analytical reviewer. Not a VC. Watched the full session.
          </p>
        </div>
        {status === "streaming" && (
          <span className="ml-auto text-xs text-amber-600 dark:text-amber-400 animate-pulse">
            ● analyzing…
          </span>
        )}
      </div>
      <div className="whitespace-pre-wrap break-words text-[0.95rem] leading-relaxed text-slate-800 dark:text-slate-200">
        {report || (
          <span className="text-slate-400 italic">
            Reading the transcript…
          </span>
        )}
      </div>
    </div>
  );
}
