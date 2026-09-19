/**
 * Procedural sounds via Web Audio API (no external audio files).
 * iOS: call unlock() from a user gesture (Start button) before playing.
 */

let ctx = null
let unlocked = false

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    ctx = new AC()
  }
  return ctx
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
  // Silent buffer kickstarts iOS audio
  const buf = c.createBuffer(1, 1, 22050)
  const src = c.createBufferSource()
  src.buffer = buf
  src.connect(c.destination)
  src.start(0)
  unlocked = true
  return unlocked
}

function tone(freq, start, dur, type = 'sine', gain = 0.15, slideTo = null) {
  const c = getCtx()
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), start + dur)
  }
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

function noiseBurst(start, dur, gain = 0.08, filterFreq = 800) {
  const c = getCtx()
  const len = Math.max(1, Math.floor(c.sampleRate * dur))
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = filterFreq
  filter.Q.value = 1.2
  const g = c.createGain()
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(c.destination)
  src.start(start)
  src.stop(start + dur)
}

const PLAYERS = {
  cow(t) {
    tone(180, t, 0.35, 'sawtooth', 0.12, 90)
    tone(120, t + 0.25, 0.45, 'sawtooth', 0.1, 70)
  },
  horse(t) {
    tone(420, t, 0.12, 'square', 0.08, 280)
    tone(380, t + 0.15, 0.18, 'square', 0.07, 200)
    tone(520, t + 0.4, 0.25, 'sawtooth', 0.06, 180)
  },
  chicken(t) {
    for (let i = 0; i < 4; i++) {
      tone(700 + i * 40, t + i * 0.08, 0.07, 'square', 0.06, 500)
    }
    tone(900, t + 0.4, 0.15, 'square', 0.05, 400)
  },
  pig(t) {
    tone(250, t, 0.2, 'sawtooth', 0.1, 180)
    noiseBurst(t + 0.15, 0.2, 0.06, 400)
    tone(200, t + 0.35, 0.25, 'sawtooth', 0.09, 140)
  },
  dog(t) {
    tone(280, t, 0.12, 'square', 0.12, 180)
    tone(260, t + 0.18, 0.14, 'square', 0.11, 160)
    tone(300, t + 0.38, 0.16, 'square', 0.1, 150)
  },
  cat(t) {
    tone(600, t, 0.35, 'sine', 0.1, 900)
    tone(700, t + 0.2, 0.3, 'triangle', 0.08, 450)
  },
  fish(t) {
    noiseBurst(t, 0.15, 0.05, 1200)
    tone(880, t + 0.05, 0.1, 'sine', 0.04, 440)
    noiseBurst(t + 0.2, 0.12, 0.04, 900)
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
  for (let i = 0; i < 6; i++) {
    noiseBurst(t + i * 0.12, 0.08, 0.07, 600 + (i % 3) * 200)
    tone(180 + i * 20, t + i * 0.12, 0.06, 'triangle', 0.04)
  }
}

export function playCelebration() {
  if (!unlocked) return
  const c = getCtx()
  if (c.state === 'suspended') c.resume()
  const t = c.currentTime
  const notes = [523, 659, 784, 1047]
  notes.forEach((f, i) => tone(f, t + i * 0.12, 0.25, 'sine', 0.1))
  tone(1319, t + 0.5, 0.4, 'triangle', 0.08)
}

export function playTickSoft() {
  if (!unlocked) return
  const c = getCtx()
  tone(880, c.currentTime, 0.03, 'sine', 0.03)
}

export function isAudioUnlocked() {
  return unlocked
}
