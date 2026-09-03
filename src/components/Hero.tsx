export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-savoree-sand to-savoree-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-savoree-blue-bright/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-24 h-56 w-56 rounded-full bg-savoree-amber/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-savoree-navy shadow-sm">
          🍳 Cooking made for kids
        </span>
        <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-savoree-ink sm:text-6xl">
          Delicious things
          <br />
          come in{" "}
          <span className="relative inline-block text-savoree-blue">
            3&apos;s
          </span>
          .
        </h1>
        <p className="mt-5 max-w-xl text-lg text-savoree-ink/70 sm:text-xl">
          Easy 3-step recipes from around the world, an AI helper that builds
          your grocery list, and a community of young chefs sharing their
          favorite kitchen wins.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#recipes"
            className="rounded-full bg-savoree-neon px-8 py-3.5 text-base font-bold text-savoree-ink shadow-lg shadow-savoree-neon/30 transition hover:-translate-y-0.5 hover:bg-savoree-neon-dark"
          >
            Start Cooking
          </a>
          <a
            href="#recipee-ai"
            className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-savoree-ink shadow-md transition hover:-translate-y-0.5"
          >
            Try the AI Helper ✨
          </a>
        </div>
      </div>
    </section>
  );
}
