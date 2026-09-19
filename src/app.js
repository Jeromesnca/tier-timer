import {
  ANIMALS,
  BACKGROUNDS,
  MIN_DURATION_SEC,
  MAX_DURATION_SEC,
  MIN_DURATION_MIN,
  MAX_DURATION_MIN,
  formatTime,
  formatSpokenTime,
  formatDurationLabel,
} from './data.js'
import { unlockAudio, playAnimalSound, playMunch, playCelebration, playTickSoft } from './sounds.js'
import { speakGerman, stopSpeech } from './speech.js'
import { sceneDecorSVG, animalBadgeHTML, pathMarkersHTML } from './visuals.js'

const state = {
  screen: 'setup', // setup | running | end
  backgroundId: 'wiese',
  animalId: 'kuh',
  /** Total duration in whole minutes (1–240) — single source of truth for setup */
  durationMin: 5,
  totalMs: 0,
  remainingMs: 0,
  startedAt: 0,
  paused: false,
  pauseAccum: 0,
  pauseStartedAt: 0,
  raf: 0,
  showTimeFlash: false,
  timeFlashText: '',
  celebrationDone: false,
}

function clampDurationMin(min) {
  const n = Math.round(Number(min) || MIN_DURATION_MIN)
  return Math.min(MAX_DURATION_MIN, Math.max(MIN_DURATION_MIN, n))
}

function durationSec() {
  state.durationMin = clampDurationMin(state.durationMin)
  return state.durationMin * 60
}

function getAnimal() {
  return ANIMALS.find((a) => a.id === state.animalId) || ANIMALS[0]
}

function getBackground() {
  return BACKGROUNDS.find((b) => b.id === state.backgroundId) || BACKGROUNDS[0]
}

function decorHTML(decor) {
  return `<div class="decor decor-${decor}">${sceneDecorSVG(decor)}</div>`
}

function hoursMinutesParts(mins) {
  const m = clampDurationMin(mins)
  return { hours: Math.floor(m / 60), minutes: m % 60 }
}

function setDurationFromHM(hours, minutes) {
  state.durationMin = clampDurationMin(hours * 60 + minutes)
}

function updateDurationUI(root) {
  const totalSec = durationSec()
  const { hours, minutes } = hoursMinutesParts(state.durationMin)
  const slider = root.querySelector('#duration-slider')
  const big = root.querySelector('#duration-big')
  const hint = root.querySelector('.duration-hint strong')
  const hv = root.querySelector('#hours-val')
  const mv = root.querySelector('#minutes-val')
  const fill = root.querySelector('.slider-fill')
  if (slider && Number(slider.value) !== state.durationMin) {
    slider.value = String(state.durationMin)
  }
  if (big) big.textContent = formatTime(totalSec)
  if (hint) hint.textContent = formatDurationLabel(totalSec)
  if (hv) hv.textContent = String(hours)
  if (mv) mv.textContent = String(minutes).padStart(2, '0')
  if (fill) {
    const pct =
      ((state.durationMin - MIN_DURATION_MIN) / (MAX_DURATION_MIN - MIN_DURATION_MIN)) * 100
    fill.style.width = `${pct}%`
  }
  root.querySelectorAll('[data-quick]').forEach((el) => {
    el.classList.toggle('selected', Number(el.dataset.quick) === state.durationMin)
  })
}

function renderSetup(root) {
  const animal = getAnimal()
  const bg = getBackground()
  const totalSec = durationSec()
  const { hours, minutes } = hoursMinutesParts(state.durationMin)
  const sliderPct =
    ((state.durationMin - MIN_DURATION_MIN) / (MAX_DURATION_MIN - MIN_DURATION_MIN)) * 100

  root.innerHTML = `
    <div class="screen setup safe">
      <header class="setup-header">
        <h1 class="logo">🐾 Tier-Timer</h1>
        <p class="subtitle">Das Tier läuft zum Futter – so lange wie du magst!</p>
      </header>

      <section class="card">
        <h2>1. Hintergrund</h2>
        <div class="grid bg-grid" role="listbox" aria-label="Hintergrund">
          ${BACKGROUNDS.map(
            (b) => `
            <button type="button" class="chip bg-chip ${b.id === state.backgroundId ? 'selected' : ''}"
              data-bg="${b.id}" role="option" aria-selected="${b.id === state.backgroundId}">
              <span class="chip-preview" style="background:${b.gradient}"></span>
              <span class="chip-label">${b.name}</span>
            </button>`
          ).join('')}
        </div>
      </section>

      <section class="card">
        <h2>2. Tier & Futter</h2>
        <div class="grid animal-grid" role="listbox" aria-label="Tier">
          ${ANIMALS.map(
            (a) => `
            <button type="button" class="chip animal-chip ${a.id === state.animalId ? 'selected' : ''}"
              data-animal="${a.id}" role="option" aria-selected="${a.id === state.animalId}">
              <span class="chip-emoji" aria-hidden="true">${a.emoji}</span>
              <span class="chip-label">${a.name}</span>
              <span class="chip-food">${a.foodEmoji} ${a.food}</span>
            </button>`
          ).join('')}
        </div>
      </section>

      <section class="card duration-card">
        <h2>3. Dauer</h2>
        <div class="duration-big-wrap">
          <div class="duration-big" id="duration-big">${formatTime(totalSec)}</div>
          <p class="duration-hint">Gewählt: <strong>${formatDurationLabel(totalSec)}</strong></p>
        </div>

        <div class="slider-block" aria-label="Dauer kontinuierlich einstellen">
          <div class="slider-track-bg">
            <div class="slider-fill" style="width:${sliderPct}%"></div>
            <input
              type="range"
              id="duration-slider"
              class="duration-slider"
              min="${MIN_DURATION_MIN}"
              max="${MAX_DURATION_MIN}"
              step="1"
              value="${state.durationMin}"
              aria-valuemin="${MIN_DURATION_MIN}"
              aria-valuemax="${MAX_DURATION_MIN}"
              aria-valuenow="${state.durationMin}"
              aria-label="Dauer in Minuten, 1 bis 240"
            />
          </div>
          <div class="slider-labels">
            <span>1 Min</span>
            <span>1 Std</span>
            <span>2 Std</span>
            <span>4 Std</span>
          </div>
        </div>

        <div class="duration-picker" aria-label="Stunden und Minuten">
          <div class="dial">
            <button type="button" class="dial-btn" data-dial="hours" data-dir="up" aria-label="Stunde plus">▲</button>
            <div class="dial-value" id="hours-val">${hours}</div>
            <div class="dial-unit">Std</div>
            <button type="button" class="dial-btn" data-dial="hours" data-dir="down" aria-label="Stunde minus">▼</button>
          </div>
          <div class="dial-colon">:</div>
          <div class="dial">
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="up" aria-label="Minute plus">▲</button>
            <div class="dial-value" id="minutes-val">${String(minutes).padStart(2, '0')}</div>
            <div class="dial-unit">Min</div>
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="down" aria-label="Minute minus">▼</button>
          </div>
        </div>

        <div class="quick-row">
          <button type="button" class="quick ${state.durationMin === 1 ? 'selected' : ''}" data-quick="1">1 Min</button>
          <button type="button" class="quick ${state.durationMin === 5 ? 'selected' : ''}" data-quick="5">5 Min</button>
          <button type="button" class="quick ${state.durationMin === 10 ? 'selected' : ''}" data-quick="10">10 Min</button>
          <button type="button" class="quick ${state.durationMin === 15 ? 'selected' : ''}" data-quick="15">15 Min</button>
          <button type="button" class="quick ${state.durationMin === 30 ? 'selected' : ''}" data-quick="30">30 Min</button>
          <button type="button" class="quick ${state.durationMin === 60 ? 'selected' : ''}" data-quick="60">1 Std</button>
          <button type="button" class="quick ${state.durationMin === 120 ? 'selected' : ''}" data-quick="120">2 Std</button>
        </div>
        <p class="duration-range-note">1 Minute – 4 Stunden · Schieberegler für feine Einstellung</p>
      </section>

      <div class="preview-mini" style="background:${bg.gradient}">
        <span class="preview-animal">${animalBadgeHTML(animal.emoji, animal.color)}</span>
        <span class="preview-path" aria-hidden="true">
          <span class="preview-road"></span>
        </span>
        <span class="preview-food">${animal.foodEmoji}</span>
      </div>

      <button type="button" class="btn-start" id="btn-start">Start ▶</button>
    </div>
  `

  root.querySelectorAll('[data-bg]').forEach((el) => {
    el.addEventListener('click', () => {
      state.backgroundId = el.dataset.bg
      render(root)
    })
  })
  root.querySelectorAll('[data-animal]').forEach((el) => {
    el.addEventListener('click', () => {
      state.animalId = el.dataset.animal
      render(root)
    })
  })

  const slider = root.querySelector('#duration-slider')
  if (slider) {
    let lastTickMin = state.durationMin
    const onSlide = () => {
      state.durationMin = clampDurationMin(slider.value)
      slider.setAttribute('aria-valuenow', String(state.durationMin))
      updateDurationUI(root)
      // Soft tick only when the minute value jumps by ≥2 (less noisy while dragging)
      if (Math.abs(state.durationMin - lastTickMin) >= 2) {
        playTickSoft()
        lastTickMin = state.durationMin
      }
    }
    slider.addEventListener('input', onSlide)
    slider.addEventListener('change', () => {
      onSlide()
      lastTickMin = state.durationMin
    })
  }

  function nudgeDial(dial, dir) {
    const { hours: h, minutes: m } = hoursMinutesParts(state.durationMin)
    if (dial === 'hours') {
      setDurationFromHM(Math.min(4, Math.max(0, h + dir)), h + dir >= 4 ? 0 : m)
    } else {
      let nm = m + dir
      let nh = h
      if (nm > 59) {
        if (nh < 4) {
          nh += 1
          nm = 0
        } else nm = 0
      }
      if (nm < 0) {
        if (nh > 0) {
          nh -= 1
          nm = 59
        } else nm = 1 // floor at 1 min overall via clamp
      }
      if (nh === 4) nm = 0
      setDurationFromHM(nh, nm)
    }
    // Ensure at least 1 minute
    if (state.durationMin < 1) state.durationMin = 1
    updateDurationUI(root)
  }

  root.querySelectorAll('.dial-btn').forEach((el) => {
    let timer = null
    let delay = null
    const dial = el.dataset.dial
    const dir = el.dataset.dir === 'up' ? 1 : -1
    const stop = () => {
      clearTimeout(delay)
      clearInterval(timer)
      delay = null
      timer = null
    }
    const start = (e) => {
      e.preventDefault()
      nudgeDial(dial, dir)
      stop()
      delay = setTimeout(() => {
        timer = setInterval(() => nudgeDial(dial, dir), 70)
      }, 350)
    }
    el.addEventListener('pointerdown', start)
    el.addEventListener('pointerup', stop)
    el.addEventListener('pointerleave', stop)
    el.addEventListener('pointercancel', stop)
  })

  root.querySelectorAll('[data-quick]').forEach((el) => {
    el.addEventListener('click', () => {
      state.durationMin = clampDurationMin(el.dataset.quick)
      updateDurationUI(root)
    })
  })

  root.querySelector('#btn-start').addEventListener('click', async () => {
    await unlockAudio()
    const a = getAnimal()
    playAnimalSound(a.sound)
    const sec = Math.min(MAX_DURATION_SEC, Math.max(MIN_DURATION_SEC, durationSec()))
    state.totalMs = sec * 1000
    state.remainingMs = state.totalMs
    state.startedAt = performance.now()
    state.pauseAccum = 0
    state.paused = false
    state.celebrationDone = false
    state.screen = 'running'
    render(root)
    startTicker(root)
  })
}

function progressRatio() {
  if (state.totalMs <= 0) return 1
  return 1 - state.remainingMs / state.totalMs
}

function renderRunning(root) {
  const animal = getAnimal()
  const bg = getBackground()
  const progress = Math.min(1, Math.max(0, progressRatio()))
  const leftPct = 8 + progress * 72

  root.innerHTML = `
    <div class="screen running safe" style="background:${bg.gradient}">
      ${decorHTML(bg.decor)}
      <div class="countdown-wrap">
        <div class="countdown" id="countdown">${formatTime(state.remainingMs / 1000)}</div>
        ${state.paused ? '<div class="paused-badge">Pause</div>' : ''}
      </div>

      <div class="scene" id="scene">
        <div class="path-track" aria-hidden="true">
          <div class="path-rail"></div>
          <div class="path-fill" style="width:${progress * 100}%">
            <span class="path-glow"></span>
          </div>
          <div class="path-dashes"></div>
          <div class="path-markers">${pathMarkersHTML(progress)}</div>
        </div>
        <div class="path-start-flag" aria-hidden="true">🏁</div>
        <button type="button" class="animal-btn" id="animal-btn"
          style="left:${leftPct}%"
          aria-label="${animal.name} antippen für Geräusch und Restzeit">
          ${animalBadgeHTML(animal.emoji, animal.color, state.paused ? '' : 'walking')}
        </button>
        <div class="food-spot" aria-hidden="true">
          <span class="food-pulse"></span>
          <span class="food-emoji">${animal.foodEmoji}</span>
          <span class="food-label">${animal.food}</span>
        </div>
      </div>

      <div class="progress-caption" aria-hidden="true">
        <span class="progress-pct" id="progress-pct">${Math.round(progress * 100)}%</span>
        <span class="progress-label">zum Futter</span>
      </div>

      <div class="time-flash ${state.showTimeFlash ? 'show' : ''}" id="time-flash" aria-live="polite">
        ${state.timeFlashText}
      </div>

      <div class="parent-bar">
        <button type="button" class="btn-parent" id="btn-pause">${state.paused ? 'Weiter' : 'Pause'}</button>
        <button type="button" class="btn-parent danger" id="btn-cancel">Abbrechen</button>
      </div>
    </div>
  `

  root.querySelector('#animal-btn').addEventListener('click', () => {
    onAnimalTap(root)
  })
  root.querySelector('#btn-pause').addEventListener('click', () => {
    togglePause(root)
  })
  root.querySelector('#btn-cancel').addEventListener('click', () => {
    cancelTimer(root)
  })
}

function renderEnd(root) {
  const animal = getAnimal()
  const bg = getBackground()

  root.innerHTML = `
    <div class="screen end safe" style="background:${bg.gradient}">
      ${decorHTML(bg.decor)}
      <div class="end-content">
        <div class="celebration" aria-hidden="true">
          <span class="confetti">🎉</span>
          <span class="confetti">✨</span>
          <span class="confetti">🎊</span>
          <span class="confetti">⭐</span>
        </div>
        <h1 class="end-title">Fertig!</h1>
        <p class="end-sub">${animal.name} hat das Futter erreicht!</p>
        <div class="eat-scene">
          ${animalBadgeHTML(animal.emoji, animal.color, 'eating big')}
          <span class="food-big">${animal.foodEmoji}</span>
        </div>
        <p class="yum">Mjam mjam! 😋</p>
        <div class="end-actions">
          <button type="button" class="btn-start" id="btn-restart">Nochmal ▶</button>
          <button type="button" class="btn-parent" id="btn-back">Zurück</button>
        </div>
      </div>
    </div>
  `

  if (!state.celebrationDone) {
    state.celebrationDone = true
    playAnimalSound(animal.sound)
    setTimeout(() => playMunch(), 400)
    setTimeout(() => playCelebration(), 900)
    speakGerman('Fertig! Das Futter ist da!')
  }

  root.querySelector('#btn-restart').addEventListener('click', async () => {
    await unlockAudio()
    stopSpeech()
    const sec = Math.min(MAX_DURATION_SEC, Math.max(MIN_DURATION_SEC, durationSec()))
    state.totalMs = sec * 1000
    state.remainingMs = state.totalMs
    state.startedAt = performance.now()
    state.pauseAccum = 0
    state.paused = false
    state.celebrationDone = false
    state.screen = 'running'
    render(root)
    startTicker(root)
  })
  root.querySelector('#btn-back').addEventListener('click', () => {
    stopSpeech()
    cancelRaf()
    state.screen = 'setup'
    render(root)
  })
}

function onAnimalTap(root) {
  const animal = getAnimal()
  playAnimalSound(animal.sound)
  const spoken = formatSpokenTime(state.remainingMs / 1000)
  state.timeFlashText = formatTime(state.remainingMs / 1000)
  state.showTimeFlash = true
  speakGerman(spoken)
  const flash = root.querySelector('#time-flash')
  if (flash) {
    flash.textContent = state.timeFlashText
    flash.classList.add('show')
  }
  clearTimeout(onAnimalTap._t)
  onAnimalTap._t = setTimeout(() => {
    state.showTimeFlash = false
    const f = root.querySelector('#time-flash')
    if (f) f.classList.remove('show')
  }, 2200)
}

function togglePause(root) {
  if (!state.paused) {
    state.paused = true
    state.pauseStartedAt = performance.now()
    stopSpeech()
  } else {
    state.pauseAccum += performance.now() - state.pauseStartedAt
    state.paused = false
  }
  renderRunning(root)
}

function cancelTimer(root) {
  stopSpeech()
  cancelRaf()
  state.paused = false
  state.screen = 'setup'
  render(root)
}

function cancelRaf() {
  if (state.raf) {
    cancelAnimationFrame(state.raf)
    state.raf = 0
  }
}

function startTicker(root) {
  cancelRaf()
  const tick = (now) => {
    if (state.screen !== 'running') return
    if (!state.paused) {
      const elapsed = now - state.startedAt - state.pauseAccum
      state.remainingMs = Math.max(0, state.totalMs - elapsed)
      updateRunningDOM(root)
      if (state.remainingMs <= 0) {
        cancelRaf()
        state.screen = 'end'
        state.celebrationDone = false
        render(root)
        return
      }
    }
    state.raf = requestAnimationFrame(tick)
  }
  state.raf = requestAnimationFrame(tick)
}

function updateRunningDOM(root) {
  const cd = root.querySelector('#countdown')
  if (cd) cd.textContent = formatTime(state.remainingMs / 1000)
  const progress = Math.min(1, Math.max(0, progressRatio()))
  const leftPct = 8 + progress * 72
  const animalBtn = root.querySelector('#animal-btn')
  if (animalBtn) animalBtn.style.left = `${leftPct}%`
  const fill = root.querySelector('.path-fill')
  if (fill) fill.style.width = `${progress * 100}%`
  const pct = root.querySelector('#progress-pct')
  if (pct) pct.textContent = `${Math.round(progress * 100)}%`
  const markers = root.querySelector('.path-markers')
  if (markers) markers.innerHTML = pathMarkersHTML(progress)
}

export function render(root) {
  if (state.screen === 'setup') renderSetup(root)
  else if (state.screen === 'running') renderRunning(root)
  else renderEnd(root)
}

export function mount(root) {
  render(root)
}
