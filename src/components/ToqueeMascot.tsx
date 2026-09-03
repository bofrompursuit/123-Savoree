"use client";

import { useEffect, useState } from "react";
import ToqueeIcon from "./ToqueeIcon";
import ToqueeChat from "./ToqueeChat";

const IDLE_MESSAGES = [
  "Hello! It's a good day, isn't it?",
  "Let's cook something delicious!",
  "✨ Need a recipe idea?",
  "Toquee loves cooking up a little magic!",
  "3 steps is all it takes!",
];

const LANDING_MESSAGES = [
  "Hi! Pop your email in so we can start cooking!",
  "I'll be right here once you sign up. ✨",
  "✨ Delicious things come in 3's — let's go!",
];

// How long the click-triggered spin plays before settling back to idle bob.
const SPIN_MS = 650;

export default function ToqueeMascot({ landing = false }: { landing?: boolean }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const messages = landing ? LANDING_MESSAGES : IDLE_MESSAGES;

  function handleClick() {
    setChatOpen((v) => !v);
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), SPIN_MS);
  }

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
        onClick={handleClick}
        aria-label={chatOpen ? "Close Toquee chat" : "Chat with Toquee"}
        className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center transition-transform duration-200 hover:-translate-y-1 hover:scale-110 active:scale-90 sm:bottom-8 sm:right-8"
      >
        <span className={`flex h-14 w-14 items-center justify-center ${spinning ? "animate-savoree-spin" : ""}`}>
          <ToqueeIcon className="animate-savoree-mascot-bob h-full w-full" />
        </span>
      </button>

      {chatOpen && <ToqueeChat onClose={() => setChatOpen(false)} />}
    </>
  );
}
