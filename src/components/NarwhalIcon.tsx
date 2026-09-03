export default function NarwhalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="123 Savoree narwhal mascot"
    >
      {/* tail fluke — wiggles via the animate-savoree-tail-wiggle keyframe */}
      <g className="animate-savoree-tail-wiggle">
        <path
          d="M18 58 C 8 50, 4 40, 8 30 C 16 38, 22 46, 28 54 Z"
          fill="#4FB6DD"
        />
        <path
          d="M18 58 C 8 66, 4 76, 8 86 C 16 78, 22 70, 28 62 Z"
          fill="#2E93C2"
        />
      </g>

      {/* body */}
      <ellipse cx="52" cy="54" rx="34" ry="22" fill="#7EC8E8" />
      {/* belly */}
      <ellipse cx="50" cy="64" rx="26" ry="11" fill="#F4FAFF" />

      {/* dorsal fin */}
      <path
        d="M48 32 C 52 20, 62 18, 66 24 C 60 26, 54 30, 50 36 Z"
        fill="#2E93C2"
      />

      {/* pectoral flipper */}
      <path
        d="M46 60 C 40 68, 34 72, 26 72 C 30 64, 36 58, 44 56 Z"
        fill="#4FB6DD"
      />

      {/* head */}
      <ellipse cx="78" cy="50" rx="18" ry="15" fill="#7EC8E8" />

      {/* tusk */}
      <path
        d="M92 46 C 100 42, 108 36, 112 26 C 106 27, 100 30, 96 34 C 99 32, 102 30, 105 29 C 100 34, 96 39, 94 45 Z"
        fill="#ffb020"
      />

      {/* eye */}
      <circle cx="86" cy="46" r="5" fill="white" />
      <circle cx="87.2" cy="46" r="2.6" fill="#0B1424" />

      {/* cheek */}
      <circle cx="74" cy="55" r="4" fill="#ff9f8f" opacity="0.55" />

      {/* smile */}
      <path
        d="M82 56 C 85 59, 89 59, 92 56"
        stroke="#0B1424"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
