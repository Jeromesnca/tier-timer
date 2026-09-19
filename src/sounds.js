/**
 * Procedural sounds via Web Audio API (no external audio files).
 * iOS: call unlockAudio() from a user gesture (Start button) before playing.
 */

let ctx = null
let unlocked = false
let masterGain = null

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    ctx = new AC()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.85
    masterGain.connect(ctx.destination)
  }
  return ctx
}

function dest() {
  getCtx()
  return masterGain
}

export async function unlockAudio() {
  const c = getCtx()
  if (c.state === 'suspended') {
    try {
      await c.resume()
    } catch (_) {
      /* ignore */
    }
  }
  // Silent buffer + tiny beep kickstarts iOS audio reliably
  const buf = c.createBuffer(1, 1, 22050)
  const src = c.createBufferSource()
  src.buffer = buf
  src.connect(dest())
  src.start(0)
  // Extra short nearly-silent tone helps some Safari versions
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.frequency.value = 440
  g.gain.value = 0.0001
  osc.connect(g)
  g.connect(dest())
  osc.start(c.currentTime)
  osc.stop(c.currentTime + 0.05)
  unlocked = true
  return unlocked
}

function tone(freq, start, dur, type = 'sine', gain = 0.15, slideTo = null, vibrato = 0) {
  const c = getCtx()
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), start + dur)
  }
  if (vibrato > 0) {
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = vibrato
    lfoGain.gain.value = freq * 0.03
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)
    lfo.start(start)
    lfo.stop(start + dur + 0.02)
  }
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.015)
  g.gain.setValueAtTime(gain * 0.85, start + dur * 0.55)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g)
  g.connect(dest())
  osc.start(start)
  osc.stop(start + dur + 0.03)
}

function noiseBurst(start, dur, gain = 0.08, filterFreq = 800, type = 'bandpass') {
  const c = getCtx()
  const len = Math.max(1, Math.floor(c.sampleRate * dur))
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) {
    // Softened noise (less harsh for kids)
    data[i] = (Math.random() * 2 - 1) * (1 - i / len)
  }
  const src = c.createBufferSource()
  src.buffer = buf
  const filter = c.createBiquadFilter()
  filter.type = type
  filter.frequency.value = filterFreq
  filter.Q.value = 1.4
  const g = c.createGain()
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(dest())
  src.start(start)
  src.stop(start + dur)
}

/** Formant-ish dual tone for more animal character */
function dual(f1, f2, start, dur, gain = 0.08, type = 'sawtooth') {
  tone(f1, start, dur, type, gain)
  tone(f2, start, dur, 'sine', gain * 0.55)
}

const PLAYERS = {
  cow(t) {
    // Deep "muuuh" with slow glide
    dual(165, 95, t, 0.45, 0.11, 'sawtooth')
    tone(140, t + 0.08, 0.5, 'triangle', 0.07, 75, 4)
    tone(110, t + 0.4, 0.55, 'sawtooth', 0.09, 65)
    noiseBurst(t + 0.15, 0.25, 0.03, 280, 'lowpass')
  },
  horse(t) {
    // Whinny: rising flutter then drop
    for (let i = 0; i < 5; i++) {
      tone(320 + i * 55, t + i * 0.055, 0.08, 'square', 0.055, 280 + i * 30)
    }
    tone(620, t + 0.28, 0.35, 'sawtooth', 0.07, 160, 8)
    noiseBurst(t + 0.1, 0.15, 0.035, 900)
  },
  chicken(t) {
    // Cluck-cluck-cluck bawk
    for (let i = 0; i < 5; i++) {
      tone(620 + (i % 2) * 80, t + i * 0.07, 0.055, 'square', 0.055, 420)
      noiseBurst(t + i * 0.07, 0.04, 0.025, 1400)
    }
    tone(980, t + 0.42, 0.18, 'square', 0.06, 320)
  },
  pig(t) {
    // Oink + snort
    tone(280, t, 0.18, 'sawtooth', 0.11, 160)
    dual(220, 140, t + 0.12, 0.22, 0.08, 'sawtooth')
    noiseBurst(t + 0.2, 0.22, 0.07, 450, 'bandpass')
    tone(190, t + 0.42, 0.28, 'sawtooth', 0.09, 110)
  },
  dog(t) {
    // Two clear barks
    tone(320, t, 0.1, 'square', 0.13, 150)
    tone(240, t + 0.02, 0.12, 'sawtooth', 0.08, 120)
    tone(300, t + 0.22, 0.12, 'square', 0.12, 140)
    tone(220, t + 0.24, 0.14, 'sawtooth', 0.07, 110)
    tone(340, t + 0.48, 0.1, 'square', 0.08, 160)
  },
  cat(t) {
    // Rising meow with vibrato
    tone(520, t, 0.45, 'sine', 0.11, 880, 6)
    tone(620, t + 0.12, 0.4, 'triangle', 0.07, 420, 5)
    tone(480, t + 0.35, 0.25, 'sine', 0.05, 350)
  },
  fish(t) {
    // Soft bubbles / blub
    noiseBurst(t, 0.18, 0.055, 1400, 'bandpass')
    tone(920, t + 0.04, 0.12, 'sine', 0.045, 380)
    noiseBurst(t + 0.18, 0.14, 0.045, 1100, 'bandpass')
    tone(760, t + 0.22, 0.1, 'sine', 0.035, 300)
    noiseBurst(t + 0.35, 0.12, 0.035, 900, 'highpass')
  },
}

export function playAnimalSound(soundId) {
  if (!unlocked) return
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  const fn = PLAYERS[soundId] || PLAYERS.dog
  fn(c.currentTime)
}

export function playMunch() {
  if (!unlocked) return
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  const t = c.currentTime
  for (let i = 0; i < 8; i++) {
    const when = t + i * 0.1
    noiseBurst(when, 0.07, 0.065, 500 + (i % 4) * 180, 'bandpass')
    tone(160 + (i % 3) * 35, when, 0.055, 'triangle', 0.045)
    if (i % 2 === 0) tone(90, when + 0.02, 0.04, 'sine', 0.03)
  }
}

export function playCelebration() {
  if (!unlocked) return
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  const t = c.currentTime
  // Cheerful rising arpeggio + sparkle
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]
  notes.forEach((f, i) => {
    tone(f, t + i * 0.1, 0.28, 'sine', 0.1)
    tone(f * 2, t + i * 0.1, 0.18, 'triangle', 0.035)
  })
  tone(1568, t + 0.55, 0.45, 'triangle', 0.08)
  // Soft shimmer
  for (let i = 0; i < 4; i++) {
    tone(1800 + i * 200, t + 0.6 + i * 0.08, 0.12, 'sine', 0.03)
  }
}

export function playTickSoft() {
  if (!unlocked) return
  const c = getCtx()
  tone(990, c.currentTime, 0.025, 'sine', 0.028)
}

export function isAudioUnlocked() {
  return unlocked
}
