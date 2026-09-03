// Gives Toquee a cheerful, young-British-boy-ish voice using the browser's
// built-in SpeechSynthesis API — free, no API key, no external service, and
// it's the same Web Speech family the AI Recipee voice *input* already uses.
//
// Ceiling: browser TTS voices are synthetic, not a real child's voice — a
// genuinely realistic young British boy needs a paid/keyed neural TTS
// service (ElevenLabs, Google Cloud, Azure all have good British child/young
// voices), which would need a server to keep that key secret and doesn't
// fit this site's static, serverless GitHub Pages deployment. This picks
// the best-matched free *British* voice available and tunes pitch/rate for
// a lively, kid-like read instead.

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return undefined;

  // Prefer higher-quality "natural"/neural British male voices where the
  // platform ships them (Edge's Online voices and Apple's Enhanced/Premium
  // voices are notably realistic and still free), then fall back through
  // standard British male voices.
  const preferredNames = [
    "Microsoft Ryan Online (Natural) - English (United Kingdom)",
    "Microsoft Thomas Online (Natural) - English (United Kingdom)",
    "Google UK English Male",
    "Arthur",
    "Oliver",
    "Daniel",
    "Microsoft George - English (United Kingdom)",
  ];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }

  // Any other British English voice that reads as male.
  const britishVoices = voices.filter((v) => v.lang === "en-GB" || v.lang === "en_GB");
  const britishMale = britishVoices.find(
    (v) => !/female/i.test(v.name) && !/martha|kate|serena|libby|hazel/i.test(v.name)
  );
  if (britishMale) return britishMale;
  if (britishVoices.length > 0) return britishVoices[0];

  // No British voice available on this device/browser at all — fall back
  // to any English male-ish voice rather than a silent/default voice.
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
  const voice = pickVoice() ?? null;
  utterance.voice = voice;
  // Bias pronunciation toward British English even if the matched voice
  // itself is a generic multi-accent one (most browsers honor this).
  utterance.lang = voice?.lang || "en-GB";
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
