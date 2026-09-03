"use client";

import { useEffect, useRef, useState } from "react";
import ParrotIcon from "./ParrotIcon";
import {
  isSpeechSynthesisSupported,
  speakAsParrot,
  stopParrotVoice,
} from "@/lib/parrotVoice";
import { useSpeechToText } from "@/lib/useSpeechToText";

type ChatTurn = { role: "user" | "assistant"; text: string };

const GREETING: ChatTurn = {
  role: "assistant",
  text: "Squawk! Hi, I'm Pollee! Ask me anything about cooking, or say a food and I'll help you build a 123 Recipe. 🦜",
};

export default function ParrotChat({ onClose }: { onClose: () => void }) {
  const [turns, setTurns] = useState<ChatTurn[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const spokenCountRef = useRef(0);
  const voiceSupported = isSpeechSynthesisSupported();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [turns, loading]);

  // Speak any newly-added assistant turns (including the initial greeting)
  // aloud. The "already seen" count always advances, muted or not, so
  // re-enabling voice never dumps a backlog of past replies all at once.
  useEffect(() => {
    if (!voiceSupported) return;
    for (let i = spokenCountRef.current; i < turns.length; i++) {
      if (turns[i].role === "assistant" && voiceEnabled) {
        speakAsParrot(turns[i].text);
      }
    }
    spokenCountRef.current = turns.length;
  }, [turns, voiceEnabled, voiceSupported]);

  // Stop any in-progress speech when the chat panel closes.
  useEffect(() => stopParrotVoice, []);

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || loading) return;

    const nextTurns: ChatTurn[] = [...turns, { role: "user", text: message }];
    setTurns(nextTurns);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/parrot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: nextTurns.slice(0, -1) }),
      });
      const data = await res.json();
      const reply: string = res.ok
        ? data.reply
        : (data.error ?? "Squawk! Something went wrong.");
      setTurns((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setTurns((prev) => [
        ...prev,
        { role: "assistant", text: "Squawk! I couldn't connect — try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  // Speaking to Pollee sends the transcribed question automatically —
  // no need to tap send after talking.
  const {
    listening,
    toggle: toggleVoiceInput,
    supported: voiceInputSupported,
  } = useSpeechToText(sendMessage);

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-28 sm:right-6 sm:w-96">
      <div className="flex items-center justify-between gap-2 bg-savoree-green px-4 py-3">
        <div className="flex items-center gap-2">
          <ParrotIcon className="h-8 w-8" />
          <span className="font-display text-base font-semibold text-white">
            Pollee
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {voiceSupported && (
            <button
              type="button"
              onClick={() => {
                setVoiceEnabled((v) => {
                  if (v) stopParrotVoice();
                  return !v;
                });
              }}
              aria-pressed={voiceEnabled}
              aria-label={voiceEnabled ? "Mute Pollee's voice" : "Unmute Pollee's voice"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm text-white transition hover:bg-white/25"
            >
              {voiceEnabled ? "🔊" : "🔇"}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white transition hover:bg-white/25"
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
      >
        {turns.map((turn, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
              turn.role === "assistant"
                ? "self-start bg-savoree-sand text-savoree-ink"
                : "self-end bg-savoree-lime text-savoree-ink"
            }`}
          >
            {turn.text}
          </div>
        ))}
        {loading && (
          <div className="self-start rounded-2xl bg-savoree-sand px-3.5 py-2.5 text-sm text-savoree-ink/50">
            Pollee is thinking...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-savoree-ink/10 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? "Listening..." : "Ask Pollee a cooking question..."}
          className="flex-1 rounded-full border-2 border-savoree-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-savoree-lime-dark"
        />
        {voiceInputSupported && (
          <button
            type="button"
            onClick={toggleVoiceInput}
            aria-pressed={listening}
            aria-label={listening ? "Stop talking to Pollee" : "Talk to Pollee"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition ${
              listening
                ? "animate-pulse bg-savoree-coral text-white"
                : "bg-savoree-sand text-savoree-ink hover:bg-savoree-sand/70"
            }`}
          >
            🎙️
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-savoree-lime text-savoree-ink transition hover:bg-savoree-lime-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
