export default function ToqueeIcon({
  className,
  excited = false,
}: {
  className?: string;
  excited?: boolean;
}) {
  const blinkClass = excited ? "animate-savoree-blink-happy" : "animate-savoree-blink";
  const lidStyle = { transformBox: "fill-box" as const, transformOrigin: "center" };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Toquee, the 123 Savoree magic chef hat mascot"
    >
      {/* floating shadow */}
      <ellipse cx="50" cy="90" rx="22" ry="5" fill="#0B1424" opacity="0.12" />

      {/* sparkles */}
      <g className="animate-savoree-sparkle-a" fill="#00C2FF" style={lidStyle}>
        <path d="M18 22 L20 28 L26 30 L20 32 L18 38 L16 32 L10 30 L16 28 Z" />
      </g>
      <g className="animate-savoree-sparkle-b" fill="#ffb020" style={lidStyle}>
        <path d="M80 34 L81.5 38 L85.5 39.5 L81.5 41 L80 45 L78.5 41 L74.5 39.5 L78.5 38 Z" />
      </g>
      <g className="animate-savoree-sparkle-a" fill="#ff6b5c" opacity="0.8" style={lidStyle}>
        <path d="M70 14 L71 17 L74 18 L71 19 L70 22 L69 19 L66 18 L69 17 Z" />
      </g>

      {/* poof undershadow — light-blue layer, offset down, gives the pouf a pronounced puffy rim */}
      <circle cx="34" cy="45" r="18" fill="#DCEEFB" />
      <circle cx="66" cy="45" r="18" fill="#DCEEFB" />
      <circle cx="42" cy="27" r="15" fill="#DCEEFB" />
      <circle cx="58" cy="27" r="15" fill="#DCEEFB" />
      <circle cx="50" cy="31" r="21" fill="#DCEEFB" />

      {/* poof main body */}
      <circle cx="34" cy="42" r="16" fill="#FFFDF7" />
      <circle cx="66" cy="42" r="16" fill="#FFFDF7" />
      <circle cx="42" cy="24" r="13" fill="#FFFDF7" />
      <circle cx="58" cy="24" r="13" fill="#FFFDF7" />
      <circle cx="50" cy="28" r="19" fill="#FFFDF7" />

      {/* pleat creases */}
      <path d="M38 18 C 35 30, 35 43, 39 54" stroke="#B8DDF5" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M50 13 C 49 28, 49 42, 50 55" stroke="#B8DDF5" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M62 18 C 65 30, 65 43, 61 54" stroke="#B8DDF5" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* band — light-blue undershadow peeking below the main band for a soft 3D lip */}
      <rect x="26" y="57" width="48" height="25" rx="12.5" fill="#DCEEFB" />
      <rect x="26" y="54" width="48" height="24" rx="12" fill="#FFFDF7" stroke="#E7EEF7" strokeWidth="1.2" />

      {/* eyes */}
      <circle cx="40" cy="60" r="6.5" fill="white" stroke="#E7EEF7" strokeWidth="1" />
      <circle cx="41.4" cy="60" r="3.4" fill="#0B1424" />
      <circle cx="43" cy="58" r="1.1" fill="white" />

      <circle cx="60" cy="60" r="6.5" fill="white" stroke="#E7EEF7" strokeWidth="1" />
      <circle cx="61.4" cy="60" r="3.4" fill="#0B1424" />
      <circle cx="63" cy="58" r="1.1" fill="white" />

      {/* eyelids — animate open/closed for idle + happy blinks */}
      <ellipse cx="40" cy="60" rx="7" ry="6.5" fill="#FFFDF7" className={blinkClass} style={lidStyle} />
      <ellipse cx="60" cy="60" rx="7" ry="6.5" fill="#FFFDF7" className={blinkClass} style={lidStyle} />

      {/* smile */}
      <path
        d="M44 71 C 48 75, 52 75, 56 71"
        stroke="#0B1424"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
