"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { colombiaRecipe, colombiaFacts, type ColombiaFact } from "@/data/colombia";
import ToqueeIcon from "./ToqueeIcon";
import RecipeModal from "./RecipeModal";

const EXCITED_BLINK_MS = 1800;

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ToqueeTravelsSection() {
  // Deterministic on the server (original order, first fact) so hydration
  // matches — shuffled client-side post-mount for the "randomize" feel.
  const [facts, setFacts] = useState<ColombiaFact[]>(colombiaFacts);
  const [activeFact, setActiveFact] = useState<ColombiaFact>(colombiaFacts[0]);
  const [excited, setExcited] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const shuffledFacts = shuffled(colombiaFacts);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomizing order is a client-only affordance, not derivable during SSR
    setFacts(shuffledFacts);
    setActiveFact(shuffledFacts[0]);
  }, []);

  function selectFact(next: ColombiaFact) {
    setActiveFact(next);
    setExcited(true);
    window.setTimeout(() => setExcited(false), EXCITED_BLINK_MS);
  }

  function surpriseMe() {
    const others = facts.filter((f) => f.label !== activeFact.label);
    selectFact(others[Math.floor(Math.random() * others.length)] ?? activeFact);
  }

  return (
    <section className="bg-savoree-navy px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className={`mx-auto mb-2 h-16 w-16 ${excited ? "animate-savoree-spin" : ""}`}>
          <ToqueeIcon excited={excited} className="animate-savoree-mascot-bob h-full w-full" />
        </div>
        <span className="text-sm font-bold uppercase tracking-wide text-savoree-blue-bright">
          ✈️ Toquee Travels
        </span>
        <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Toquee Just Landed in Colombia! 🇨🇴
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-white/70">
          Tap a card below to explore the Colombian food scene, or hit
          &ldquo;Surprise Me&rdquo; for a random fact.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {facts.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => selectFact(f)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeFact.label === f.label
                  ? "bg-savoree-neon text-savoree-ink"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl bg-white p-6 text-savoree-ink shadow-2xl sm:flex-row sm:p-8 sm:text-left">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
            <Image
              src={colombiaRecipe.image}
              alt={colombiaRecipe.title}
              fill
              sizes="(max-width: 640px) 100vw, 128px"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wide text-savoree-navy">
              {activeFact.label}
            </p>
            <p className="mt-1 text-savoree-ink/80">{activeFact.fact}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:justify-start">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-savoree-neon px-5 py-2.5 text-sm font-bold text-savoree-ink shadow-md shadow-savoree-neon/30 transition hover:bg-savoree-neon-dark"
              >
                See the Recipe: {colombiaRecipe.title}
              </button>
              <button
                type="button"
                onClick={surpriseMe}
                className="rounded-full bg-savoree-sand px-5 py-2.5 text-sm font-bold text-savoree-navy transition hover:bg-savoree-sand/70"
              >
                🎲 Surprise Me
              </button>
            </div>
          </div>
        </div>
      </div>

      <RecipeModal recipe={modalOpen ? colombiaRecipe : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
