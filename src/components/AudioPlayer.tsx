"use client";

import { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [missingTrack, setMissingTrack] = useState(false);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setMissingTrack(true));
      setPlaying(true);
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  }

  return (
    <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2.5">
      <audio
        ref={audioRef}
        src="/audio/theme.mp3"
        loop
        onError={() => setMissingTrack(true)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-savoree-neon text-savoree-ink transition hover:brightness-110"
      >
        {playing ? "⏸" : "▶"}
      </button>
      <span className="text-xs font-bold text-white/80">
        {missingTrack ? "Add a track at /public/audio/theme.mp3" : "Kitchen Beats"}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        aria-label="Volume"
        className="ml-1 h-1.5 w-20 cursor-pointer accent-savoree-neon"
      />
    </div>
  );
}
