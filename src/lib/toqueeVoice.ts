// Gives Toquee a cheerful, boyish voice using the browser's built-in
// SpeechSynthesis API — free, no API key, no external service, and it's the
// same Web Speech family the AI Recipee voice *input* already uses.
//
// Ceiling: browser TTS voices are synthetic, not a real child's voice — a
// genuinely realistic young-boy voice needs a paid/keyed neural TTS service
// (ElevenLabs, Google Cloud, Azure), which would need a server to keep that
// key secret and doesn't fit this site's static, serverless GitHub Pages
// deployment. This picks the best-matched free voice and tunes pitch/rate
// for a lively, kid-like read instead.

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return undefined;

  // Prefer higher-quality "natural"/neural male voices where the platform
  // ships them (Edge's Online voices are notably realistic and still free),
  // then fall back through standard male voices.
  const preferredNames = [
    "Microsoft Guy Online (Natural) - English (United States)",
    "Microsoft Christopher Online (Natural) - English (United States)",
    "Google UK English Male",
    "Daniel",
    "Oliver",
    "Alex",
    "Microsoft David - English (United States)",
    "Microsoft Mark - English (United States)",
  ];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }

  // Broader fallback: any English voice whose name suggests a male voice.
  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  const looksMale = englishVoices.find((v) => /male/i.test(v.name) && !/female/i.test(v.name));
  if (looksMale) return looksMale;

  return englishVoices[0] ?? voices[0];
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakAsToquee(text: string) {
  if (!isSpeechSynthesisSupported()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = pickVoice() ?? null;
  // A young boy's voice sits a little above adult-male pitch, not at a
  // squeaky extreme; rate is a touch brisk for a cheerful, energetic read.
  utterance.pitch = 1.25;
  utterance.rate = 1.12;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopToqueeVoice() {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
}
