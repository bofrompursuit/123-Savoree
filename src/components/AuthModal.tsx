"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setPhone("");
      setMode("signup");
    }, 200);
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="auth-modal-title">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="text-5xl">🎉</span>
          <h2 id="auth-modal-title" className="font-display text-2xl font-semibold">
            You&apos;re in!
          </h2>
          <p className="max-w-xs text-savoree-ink/70">
            Welcome to 123 Savoree. Get ready to cook up something delicious.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 rounded-full bg-savoree-lime px-6 py-2.5 font-semibold text-savoree-ink transition hover:bg-savoree-lime-dark"
          >
            Let&apos;s cook!
          </button>
        </div>
      ) : (
        <>
          <h2
            id="auth-modal-title"
            className="font-display text-2xl font-semibold sm:text-3xl"
          >
            {mode === "signup" ? "Join the kitchen 🧑‍🍳" : "Welcome back!"}
          </h2>
          <p className="mt-1 text-sm text-savoree-ink/60">
            {mode === "signup"
              ? "Create an account to save recipes and unlock the AI recipe helper."
              : "Sign in to pick up where you left off."}
          </p>

          <div className="mt-5 flex rounded-full bg-savoree-sand p-1">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
                mode === "signup"
                  ? "bg-savoree-lime text-savoree-ink shadow"
                  : "text-savoree-ink/60"
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-full py-2 text-sm font-bold transition ${
                mode === "signin"
                  ? "bg-savoree-lime text-savoree-ink shadow"
                  : "text-savoree-ink/60"
              }`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-savoree-ink/80">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-2xl border-2 border-savoree-ink/10 bg-white px-4 py-3 text-base outline-none transition focus:border-savoree-green"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-savoree-ink/80">
                Phone Number
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="rounded-2xl border-2 border-savoree-ink/10 bg-white px-4 py-3 text-base outline-none transition focus:border-savoree-green"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-full bg-savoree-lime px-6 py-3.5 text-base font-bold text-savoree-ink shadow-lg shadow-savoree-lime/30 transition hover:bg-savoree-lime-dark"
            >
              {mode === "signup" ? "Create Account" : "Sign In"}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
