"use client";

import { useEffect, useState } from "react";
import ParrotFaceIcon from "./ParrotFaceIcon";
import ParrotChat from "./ParrotChat";

const IDLE_MESSAGES = [
  "Hello! It's a good day, isn't it?",
  "Let's cook something delicious!",
  "Squawk! Need a recipe idea?",
  "Pollee loves a good snack. Do you?",
  "3 steps is all it takes!",
];

const LANDING_MESSAGES = [
  "Hi! Pop your email in so we can start cooking!",
  "I'll be right here once you sign up. 🦜",
  "Squawk! Delicious things come in 3's — let's go!",
];

export default function ParrotMascot({ landing = false }: { landing?: boolean }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState<number | null>(null);
  const messages = landing ? LANDING_MESSAGES : IDLE_MESSAGES;

  useEffect(() => {
    // The bubble is already hidden while chatOpen is true (see render below),
    // so there's nothing to schedule until chat closes again.
    if (chatOpen) return;

    let cycle = 0;
    const showBubble = () => {
      setBubbleIndex(cycle % messages.length);
      cycle += 1;
      window.setTimeout(() => setBubbleIndex(null), 4000);
    };

    const initial = window.setTimeout(showBubble, 3000);
    const interval = window.setInterval(showBubble, 12000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [chatOpen, messages]);

  return (
    <>
      {!chatOpen && bubbleIndex !== null && (
        <div className="animate-savoree-bubble fixed bottom-24 right-5 z-40 max-w-[200px] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm font-bold text-savoree-ink shadow-xl sm:bottom-28 sm:right-8">
          {messages[bubbleIndex]}
        </div>
      )}

      <button
        type="button"
        onClick={() => setChatOpen((v) => !v)}
        aria-label={chatOpen ? "Close Pollee the parrot chat" : "Chat with Pollee the parrot"}
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-savoree-neon shadow-xl shadow-savoree-neon/40 transition hover:-translate-y-1 hover:brightness-105 sm:bottom-8 sm:right-8"
      >
        <ParrotFaceIcon className="h-11 w-11" />
      </button>

      {chatOpen && <ParrotChat onClose={() => setChatOpen(false)} />}
    </>
  );
}
