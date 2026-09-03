"use client";

import { useState } from "react";
import Modal from "./Modal";

const categories = [
  "Quick Recipe",
  "15-Second Skill",
  "Kitchen Safety",
  "Food Challenge",
] as const;

export default function SubmissionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>(
    categories[0],
  );
  const [submitted, setSubmitted] = useState(false);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setTitle("");
      setCategory(categories[0]);
    }, 200);
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="submission-modal-title">
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <span className="text-5xl">⏳</span>
          <h2
            id="submission-modal-title"
            className="font-display text-2xl font-semibold"
          >
            Pending Approval
          </h2>
          <p className="max-w-xs text-savoree-ink/70">
            Thanks for sharing! An admin will review your post before it
            appears in Communitee.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 rounded-full bg-savoree-lime px-6 py-2.5 font-semibold text-savoree-ink transition hover:bg-savoree-lime-dark"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <h2
            id="submission-modal-title"
            className="font-display text-2xl font-semibold sm:text-3xl"
          >
            Share Your Kitchen Win 🎥
          </h2>
          <p className="mt-1 text-sm text-savoree-ink/60">
            Submit a quick recipe, skill, safety tip, or challenge. All posts
            are reviewed by an admin before going live.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-savoree-ink/80">
                Title
              </span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My 3-Step Fruit Salad"
                className="rounded-2xl border-2 border-savoree-ink/10 bg-white px-4 py-3 text-base outline-none transition focus:border-savoree-green"
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-savoree-ink/80">
                Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      category === c
                        ? "bg-savoree-lime text-savoree-ink"
                        : "bg-savoree-sand text-savoree-ink/70"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-savoree-ink/80">
                Video or Photo
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                className="rounded-2xl border-2 border-dashed border-savoree-green-dark/20 bg-white px-4 py-6 text-sm text-savoree-ink/50 outline-none file:mr-3 file:rounded-full file:border-0 file:bg-savoree-lime file:px-3.5 file:py-1.5 file:text-xs file:font-bold file:text-savoree-ink"
              />
            </label>

            <button
              type="submit"
              className="mt-2 rounded-full bg-savoree-lime px-6 py-3.5 text-base font-bold text-savoree-ink shadow-lg shadow-savoree-lime/30 transition hover:bg-savoree-lime-dark"
            >
              Submit for Review
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
