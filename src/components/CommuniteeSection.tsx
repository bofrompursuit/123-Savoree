"use client";

import { useState } from "react";
import { communityPosts } from "@/data/community";
import CommunityCard from "./CommunityCard";
import SubmissionModal from "./SubmissionModal";

const topRow = communityPosts.slice(0, 4);
const bottomRow = communityPosts.slice(4, 8);

function MarqueeRow({
  posts,
  direction,
}: {
  posts: typeof communityPosts;
  direction: "left" | "right";
}) {
  const loop = [...posts, ...posts];
  const animationClass =
    direction === "left"
      ? "animate-savoree-marquee"
      : "animate-savoree-marquee-reverse";

  return (
    <div
      className={`flex w-max gap-5 hover:[animation-play-state:paused] active:[animation-play-state:paused] ${animationClass}`}
    >
      {loop.map((post, index) => (
        <div key={`${post.id}-${index}`} className="w-72 shrink-0">
          <CommunityCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default function CommuniteeSection() {
  const [submissionOpen, setSubmissionOpen] = useState(false);

  return (
    <section id="communitee" className="bg-savoree-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <span className="text-sm font-bold uppercase tracking-wide text-savoree-green-dark">
              Communitee
            </span>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Young Chefs Showing Off
            </h2>
            <p className="mt-2 max-w-lg text-savoree-ink/70">
              Quick recipes, 15-second skills, kitchen safety hacks, and food
              challenges — all shared by kids like you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionOpen(true)}
            className="shrink-0 rounded-full bg-savoree-lime px-6 py-3 text-sm font-bold text-savoree-ink shadow-md shadow-savoree-lime/30 transition hover:bg-savoree-lime-dark"
          >
            + Share Your Win
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <div className="relative overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-savoree-cream to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-savoree-cream to-transparent sm:w-24" />
          <MarqueeRow posts={topRow} direction="left" />
        </div>
        <div className="relative overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-savoree-cream to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-savoree-cream to-transparent sm:w-24" />
          <MarqueeRow posts={bottomRow} direction="right" />
        </div>
      </div>

      <SubmissionModal
        open={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
      />
    </section>
  );
}
