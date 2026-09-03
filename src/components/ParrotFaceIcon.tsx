export default function ParrotFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Pollee the parrot"
    >
      {/* head */}
      <circle cx="32" cy="34" r="26" fill="#2ecc71" />

      {/* feather crest */}
      <path
        d="M14 16 C 20 4, 38 4, 46 14 C 36 11, 22 11, 14 16 Z"
        fill="#ff6b5c"
      />

      {/* cheek blush */}
      <circle cx="22" cy="42" r="6" fill="#ff9f8f" opacity="0.55" />

      {/* eye */}
      <circle cx="36" cy="30" r="10" fill="white" />
      <circle cx="38.5" cy="30" r="5.5" fill="#1c2b22" />
      <circle cx="40.5" cy="27.5" r="1.6" fill="white" />

      {/* beak */}
      <path
        d="M45 33 C 60 34, 60 46, 46 49 C 40 44, 39 37, 45 33 Z"
        fill="#ffb020"
      />
      <path d="M45 41 C 50 41.5, 53 43, 53 44.5" stroke="#0d9467" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}
