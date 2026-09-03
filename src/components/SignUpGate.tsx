"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import ParrotFaceIcon from "./ParrotFaceIcon";
import { BASE_PATH } from "@/lib/basePath";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpGate({
  onUnlock,
}: {
  onUnlock: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from("signups")
        .insert({ email: email.trim().toLowerCase() });

      // Ignore duplicate-email conflicts (unique constraint) — they've
      // already signed up before, so still let them in.
      if (error && error.code !== "23505") {
        setStatus("error");
        setErrorMessage("Something went wrong — please try again.");
        return;
      }
    } else {
      console.warn(
        "[SignUpGate] Supabase isn't configured (NEXT_PUBLIC_SUPABASE_URL / " +
          "NEXT_PUBLIC_SUPABASE_ANON_KEY missing) — unlocking without saving the email.",
      );
    }

    onUnlock(email.trim());
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
          <ParrotFaceIcon className="h-12 w-12" />
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-savoree-blue text-xl font-bold text-white">
            123
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-savoree-ink sm:text-4xl">
          123 Savoree
        </h1>
        <p className="mt-2 text-savoree-ink/70">
          Delicious things come in 3&apos;s. Enter your email to start
          cooking.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
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
          We&apos;ll only use your email to save your recipes — no spam.
        </p>
      </div>
    </div>
  );
}
