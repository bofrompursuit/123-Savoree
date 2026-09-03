"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import ToqueeIcon from "./ToqueeIcon";
import { BASE_PATH } from "@/lib/basePath";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose phone check: strip everything but digits and require 7-15 of them
// (covers local and international numbers) — matches E.164's digit range.
const PHONE_DIGITS_PATTERN = /^\d{7,15}$/;

function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  if (EMAIL_PATTERN.test(trimmed)) return true;
  const digitsOnly = trimmed.replace(/[^\d]/g, "");
  return PHONE_DIGITS_PATTERN.test(digitsOnly);
}

export default function SignUpGate({
  onUnlock,
}: {
  onUnlock: (contact: string) => void;
}) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = contact.trim();
    if (!isValidContact(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email or phone number.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("leads")
        .insert([{ contact_info: trimmed }]);

      if (error) {
        console.error("[SignUpGate] Supabase insert failed:", error);
        setStatus("error");
        setErrorMessage("Something went wrong saving that — please try again.");
        return;
      }
    } catch (err) {
      console.error("[SignUpGate] Supabase request failed:", err);
      setStatus("error");
      setErrorMessage("Something went wrong saving that — please try again.");
      return;
    }

    onUnlock(trimmed);
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-savoree-ink px-4 py-16 sm:px-6">
      <video
        src={`${BASE_PATH}/video/kids-baking.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-savoree-ink/80 via-savoree-ink/70 to-savoree-ink/90" />

      <div className="relative flex w-full max-w-md flex-col items-center rounded-3xl bg-white/95 p-8 text-center shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2">
          <ToqueeIcon className="animate-savoree-mascot-bob h-12 w-12" />
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-savoree-blue text-xl font-bold text-white">
            123
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-savoree-ink sm:text-4xl">
          123 Savoree
        </h1>
        <p className="mt-2 text-savoree-ink/70">
          Delicious things come in 3&apos;s. Enter your email or phone number
          to start cooking.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-3">
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number"
            aria-label="Email or phone number"
            className="rounded-2xl border-2 border-savoree-ink/10 bg-white px-4 py-3.5 text-base text-savoree-ink outline-none transition focus:border-savoree-neon-dark"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-savoree-neon px-6 py-3.5 text-base font-bold text-savoree-ink shadow-lg shadow-savoree-neon/30 transition hover:bg-savoree-neon-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {status === "error" && errorMessage && (
          <p className="mt-3 text-sm font-semibold text-red-600">
            {errorMessage}
          </p>
        )}

        <p className="mt-5 text-xs text-savoree-ink/40">
          We&apos;ll only use this to save your recipes — no spam.
        </p>
      </div>
    </div>
  );
}
