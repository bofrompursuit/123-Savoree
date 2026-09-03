import AudioPlayer from "./AudioPlayer";
import VenmoQR from "./VenmoQR";

export default function Footer() {
  return (
    <footer className="bg-savoree-ink px-4 py-12 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-savoree-green-bright text-sm font-bold text-white">
                123
              </span>
              <span className="font-display text-xl font-semibold">
                Savoree
              </span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              Delicious things come in 3&apos;s. Cooking made simple for kids
              and beginner chefs everywhere.
            </p>
          </div>

          <AudioPlayer />
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} 123 Savoree. Made for young chefs.
          </p>
          <VenmoQR />
        </div>
      </div>
    </footer>
  );
}
