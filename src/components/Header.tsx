"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import ToqueeIcon from "./ToqueeIcon";

const navLinks = [
  { href: "#recipes", label: "Recipes" },
  { href: "#recipee-ai", label: "AI Recipee" },
  { href: "#communitee", label: "Communitee" },
];

export default function Header() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-savoree-ink/5 bg-savoree-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <ToqueeIcon className="animate-savoree-mascot-bob h-9 w-9 sm:h-10 sm:w-10" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-savoree-blue text-lg font-bold text-white sm:h-10 sm:w-10">
              123
            </span>
            <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Savoree
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-savoree-ink/70 transition hover:text-savoree-navy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="rounded-full bg-savoree-neon px-4 py-2 text-sm font-bold text-savoree-ink shadow-md shadow-savoree-neon/30 transition hover:bg-savoree-neon-dark sm:px-5 sm:py-2.5"
          >
            Sign Up
          </button>
        </div>
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
