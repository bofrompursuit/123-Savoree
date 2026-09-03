export default function NarwhalFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Pollee the narwhal"
    >
      {/* head */}
      <circle cx="30" cy="34" r="26" fill="#7EC8E8" />

      {/* tusk */}
      <path
        d="M46 27 C 50 20, 56 11, 62 3 C 59 10, 53 17, 47 24 Z"
        fill="#ffb020"
      />
      <path
        d="M50 21 L54 16 M47 25 L51 20"
        stroke="#e08f00"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* cheek blush */}
      <circle cx="20" cy="42" r="6" fill="#ff9f8f" opacity="0.55" />

      {/* eye */}
      <circle cx="34" cy="30" r="10" fill="white" />
      <circle cx="36.5" cy="30" r="5.5" fill="#0B1424" />
      <circle cx="38.5" cy="27.5" r="1.6" fill="white" />

      {/* smile */}
      <path
        d="M24 46 C 29 51, 37 51, 42 46"
        stroke="#0B1424"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}
