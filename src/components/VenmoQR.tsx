"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const VENMO_USERNAME = "beau_moldenhauer";
const VENMO_URL = `https://venmo.com/u/${VENMO_USERNAME}`;

export default function VenmoQR() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, VENMO_URL, {
      width: 120,
      margin: 1,
      color: { dark: "#1c2b22", light: "#ffffff" },
    }).catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-4">
      <canvas
        ref={canvasRef}
        className="h-[120px] w-[120px] shrink-0 rounded-xl bg-white p-2"
      />
      <div>
        <p className="font-display text-lg font-semibold text-white">
          Support 123 Savoree
        </p>
        <p className="mt-1 text-sm text-white/70">
          Scan to donate on Venmo
        </p>
        <a
          href={VENMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-bold text-savoree-green-bright hover:underline"
        >
          @{VENMO_USERNAME}
        </a>
      </div>
    </div>
  );
}
