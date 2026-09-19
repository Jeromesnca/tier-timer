let preferredVoice = null

function pickGermanVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || []
  const de = voices.filter((v) => v.lang?.toLowerCase().startsWith('de'))
  preferredVoice =
    de.find((v) => /google|enhanced|siri|anna|petra|helena|markus/i.test(v.name)) ||
    de[0] ||
    null
  return preferredVoice
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickGermanVoice()
  window.speechSynthesis.onvoiceschanged = () => pickGermanVoice()
}

export function speakGerman(text) {
  if (!window.speechSynthesis) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'de-DE'
    u.rate = 0.92
    u.pitch = 1.05
    const voice = preferredVoice || pickGermanVoice()
    if (voice) u.voice = voice
    window.speechSynthesis.speak(u)
  } catch (_) {
    /* speech unavailable */
  }
}

export function stopSpeech() {
  try {
    window.speechSynthesis?.cancel()
  } catch (_) {
    /* ignore */
  }
}
