// Gives Pollee a chirpy, parrot-ish voice using the browser's built-in
// SpeechSynthesis API — free, no API key, no external service, and it's the
// same Web Speech family the AI Recipee voice *input* already uses.

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return undefined;

  // Prefer a brighter-sounding English voice where the platform offers one;
  // the pitch/rate tweak below does most of the "parrot" character work.
  const preferredNames = [
    "Google UK English Female",
    "Samantha",
    "Victoria",
    "Karen",
  ];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }
  return voices.find((v) => v.lang.startsWith("en")) ?? voices[0];
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speakAsParrot(text: string) {
  if (!isSpeechSynthesisSupported()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = pickVoice() ?? null;
  utterance.pitch = 1.7;
  utterance.rate = 1.15;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopParrotVoice() {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
}
