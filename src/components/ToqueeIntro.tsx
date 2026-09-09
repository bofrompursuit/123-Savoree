"use client";

import { useEffect, useRef, useState } from "react";
import ToqueeIcon from "./ToqueeIcon";

const SESSION_KEY = "savoree_intro_played";
const FADE_MS = 400;

// Timeline, in ms from mount. Toquee swoops in slowly from off-screen to
// dead center — arriving bigger, for a beat in the spotlight — then eases
// back down to normal size and orbits the screen twice (translation only,
// no self-spin), then shrinks away toward the bottom-right corner. All
// driven by a single rAF loop (not CSS keyframes) so the sparkle trail can
// be spawned at the mascot's actual live position each frame. Every value
// here is in vw/vh-relative units (computed fresh each frame from the
// current viewport), so the same timeline works on phones and desktops.
const SWOOP_MS = 1500;
const MOMENT_MS = 700;
const TRANSITION_MS = 450;
const LOOP_REVS = 2;
const LOOP_REV_MS = 1300;
const LOOP_MS = LOOP_REV_MS * LOOP_REVS;
const CORNER_MS = 900;
const SWOOP_END = SWOOP_MS;
const MOMENT_END = SWOOP_END + MOMENT_MS;
const TRANSITION_END = MOMENT_END + TRANSITION_MS;
const LOOP_END = TRANSITION_END + LOOP_MS;
const TOTAL_MS = LOOP_END + CORNER_MS;

// How much bigger than normal Toquee is during his center-stage moment.
const MOMENT_SCALE = 1.35;

// How far (in px) from the viewport's bottom-right corner Toquee shrinks
// away to — roughly where the real chat FAB sits.
const CORNER_MARGIN = 70;

// Sparkles spawn for nearly the whole ride, stopping just before the very
// end so none linger after Toquee has vanished into the corner.
const PARTICLE_ACTIVE_MS = TOTAL_MS - 150;
const PARTICLE_INTERVAL_MS = 55;

const SPARK_COLORS = ["#00C2FF", "#FFB020", "#FF6B5C", "#38BDF8"];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

type Transform = { x: number; y: number; rotate: number; scale: number; opacity: number };

function computeTransform(elapsed: number, vw: number, vh: number): Transform {
  // The orbit's radius and its starting point (angle PI = left-middle),
  // shared across phases so swoop-in hands off to the loop, and the loop
  // hands off to the corner-shrink, with no jump at either boundary.
  const rx = vw * 0.38;
  const ry = vh * 0.32;
  const loopStartX = -rx;
  const loopStartY = 0;

  if (elapsed < SWOOP_END) {
    // Swoop from off-screen to dead center, arriving already at his
    // bigger "moment" scale.
    const t = easeOutCubic(clamp01(elapsed / SWOOP_MS));
    const startX = -vw * 0.78;
    const startY = vh * 0.22;
    const arc = -vh * 0.1 * Math.sin(t * Math.PI);
    return {
      x: startX * (1 - t),
      y: startY * (1 - t) + arc,
      rotate: -16 * (1 - t),
      scale: 0.5 + (MOMENT_SCALE - 0.5) * t,
      opacity: Math.min(1, elapsed / 180),
    };
  }

  if (elapsed < MOMENT_END) {
    // Hold center-stage for a beat, with a gentle breathing pulse.
    const t = clamp01((elapsed - SWOOP_END) / MOMENT_MS);
    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: MOMENT_SCALE + 0.05 * Math.sin(t * Math.PI * 2),
      opacity: 1,
    };
  }

  if (elapsed < TRANSITION_END) {
    // Ease back down to normal size and glide out to the orbit's start.
    const t = easeOutCubic(clamp01((elapsed - MOMENT_END) / TRANSITION_MS));
    return {
      x: loopStartX * t,
      y: loopStartY * t,
      rotate: 0,
      scale: MOMENT_SCALE + (1 - MOMENT_SCALE) * t,
      opacity: 1,
    };
  }

  if (elapsed < LOOP_END) {
    const t = clamp01((elapsed - TRANSITION_END) / LOOP_MS);
    const theta = Math.PI + t * Math.PI * 2 * LOOP_REVS;
    return {
      x: rx * Math.cos(theta),
      y: ry * Math.sin(theta),
      rotate: 0,
      scale: 1,
      opacity: 1,
    };
  }

  const t = easeInCubic(clamp01((elapsed - LOOP_END) / CORNER_MS));
  const targetX = vw * 0.5 - CORNER_MARGIN;
  const targetY = vh * 0.5 - CORNER_MARGIN;
  return {
    x: loopStartX + (targetX - loopStartX) * t,
    y: loopStartY + (targetY - loopStartY) * t,
    rotate: 20 * t,
    scale: 1 - t,
    opacity: 1 - t,
  };
}

type Particle = { id: number; x: number; y: number; size: number; color: string };

export default function ToqueeIntro() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mascotRef = useRef<HTMLDivElement>(null);
  const particleId = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "true";
    if (reducedMotion || alreadyPlayed) return;

    window.sessionStorage.setItem(SESSION_KEY, "true");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading sessionStorage/matchMedia is a client-only affordance, not derivable during SSR
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const mascot = mascotRef.current;
    if (!mascot) return;

    const start = performance.now();
    let rafId = 0;
    let lastParticleAt = -Infinity;

    function finish() {
      setFading(true);
      window.setTimeout(() => setVisible(false), FADE_MS);
    }

    function tick(now: number) {
      const elapsed = now - start;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { x, y, rotate, scale, opacity } = computeTransform(elapsed, vw, vh);
      mascot!.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
      mascot!.style.opacity = String(opacity);

      if (elapsed < PARTICLE_ACTIVE_MS && elapsed - lastParticleAt >= PARTICLE_INTERVAL_MS) {
        lastParticleAt = elapsed;
        const jitterX = (Math.random() - 0.5) * 40;
        const jitterY = (Math.random() - 0.5) * 40;
        const id = particleId.current++;
        const color = SPARK_COLORS[id % SPARK_COLORS.length];
        const size = 6 + Math.random() * 8;
        setParticles((prev) => [
          ...prev,
          { id, x: vw / 2 + x + jitterX, y: vh / 2 + y + jitterY, size, color },
        ]);
        window.setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 650);
      }

      if (elapsed < TOTAL_MS) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-savoree-navy transition-opacity ease-out"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-savoree-intro-particle fixed rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size}px ${p.color}`,
          }}
        />
      ))}

      <div
        ref={mascotRef}
        className="fixed left-1/2 top-1/2 w-[min(48vmin,300px)]"
        style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
      >
        <ToqueeIcon className="h-full w-full" excited />
      </div>
    </div>
  );
}
