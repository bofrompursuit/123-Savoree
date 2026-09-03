export default function ParrotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="123 Savoree parrot mascot"
    >
      {/* tail — wiggles via the animate-savoree-tail-wiggle keyframe */}
      <g className="animate-savoree-tail-wiggle">
        <path d="M50 60 C 66 66, 74 78, 70 92 C 60 84, 52 76, 48 64 Z" fill="#7EC8E8" />
        <path d="M50 60 C 60 70, 64 82, 58 94 C 50 86, 46 76, 46 64 Z" fill="#4FB6DD" />
      </g>

      {/* body */}
      <ellipse cx="46" cy="52" rx="24" ry="26" fill="#7EC8E8" />
      <ellipse cx="40" cy="58" rx="14" ry="17" fill="#ffb020" />

      {/* wing */}
      <path
        d="M56 38 C 70 40, 76 54, 68 66 C 60 68, 52 62, 52 52 Z"
        fill="#2E93C2"
      />

      {/* head */}
      <circle cx="52" cy="30" r="19" fill="#7EC8E8" />
      <path d="M40 16 C 46 8, 58 8, 63 16 C 56 14, 46 14, 40 16 Z" fill="#ff6b5c" />

      {/* eye */}
      <circle cx="58" cy="27" r="6" fill="white" />
      <circle cx="59.5" cy="27" r="3" fill="#0B1424" />

      {/* beak */}
      <path d="M66 28 C 76 29, 76 37, 67 39 C 63 35, 62 31, 66 28 Z" fill="#ffb020" />

      {/* cheek */}
      <circle cx="48" cy="34" r="4" fill="#ff9f8f" opacity="0.6" />

      {/* feet */}
      <path d="M38 76 L34 84 M38 76 L38 85 M38 76 L42 84" stroke="#ffb020" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
