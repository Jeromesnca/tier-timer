import {
  ANIMALS,
  BACKGROUNDS,
  MIN_DURATION_SEC,
  MAX_DURATION_SEC,
  formatTime,
  formatSpokenTime,
} from './data.js'
import { unlockAudio, playAnimalSound, playMunch, playCelebration } from './sounds.js'
import { speakGerman, stopSpeech } from './speech.js'

const state = {
  screen: 'setup', // setup | running | end
  backgroundId: 'wiese',
  animalId: 'kuh',
  hours: 0,
  minutes: 5,
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

function clampDuration() {
  let total = state.hours * 3600 + state.minutes * 60
  if (total < MIN_DURATION_SEC) {
    state.hours = 0
    state.minutes = 1
    total = MIN_DURATION_SEC
  }
  if (total > MAX_DURATION_SEC) {
    state.hours = 4
    state.minutes = 0
    total = MAX_DURATION_SEC
  }
  return total
}

function getAnimal() {
  return ANIMALS.find((a) => a.id === state.animalId) || ANIMALS[0]
}

function getBackground() {
  return BACKGROUNDS.find((b) => b.id === state.backgroundId) || BACKGROUNDS[0]
}

function decorHTML(decor) {
  switch (decor) {
    case 'trees':
      return `
        <div class="decor trees">
          <span class="tree t1">🌲</span><span class="tree t2">🌳</span>
          <span class="tree t3">🌲</span><span class="cloud c1">☁️</span>
          <span class="cloud c2">☁️</span><span class="sun">☀️</span>
        </div>`
    case 'flowers':
      return `
        <div class="decor flowers">
          <span class="sun">☀️</span><span class="cloud c1">☁️</span>
          <span class="flower f1">🌼</span><span class="flower f2">🌷</span>
          <span class="flower f3">🌸</span><span class="flower f4">🌼</span>
          <span class="butterfly">🦋</span>
        </div>`
    case 'barn':
      return `
        <div class="decor barn">
          <span class="sun">☀️</span>
          <div class="barn-shape" aria-hidden="true"></div>
          <span class="hay">🌾</span><span class="fence">🪵</span>
        </div>`
    case 'garden':
      return `
        <div class="decor garden">
          <span class="sun">☀️</span><span class="cloud c1">☁️</span>
          <span class="plant p1">🌻</span><span class="plant p2">🥕</span>
          <span class="plant p3">🥬</span><span class="bee">🐝</span>
        </div>`
    case 'water':
      return `
        <div class="decor water">
          <span class="bubble b1">🫧</span><span class="bubble b2">🫧</span>
          <span class="bubble b3">🫧</span><span class="seaweed s1">🌿</span>
          <span class="seaweed s2">🌿</span><span class="coral">🪸</span>
        </div>`
    case 'home':
      return `
        <div class="decor home">
          <div class="window" aria-hidden="true"></div>
          <span class="lamp">🛋️</span><span class="plant-home">🪴</span>
          <span class="picture">🖼️</span>
        </div>`
    default:
      return ''
  }
}

function renderSetup(root) {
  const animal = getAnimal()
  const bg = getBackground()
  const totalSec = clampDuration()

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

      <section class="card">
        <h2>3. Dauer</h2>
        <div class="duration-picker" aria-label="Dauer wählen">
          <div class="dial">
            <button type="button" class="dial-btn" data-dial="hours" data-dir="up" aria-label="Stunde plus">▲</button>
            <div class="dial-value" id="hours-val">${state.hours}</div>
            <div class="dial-unit">Std</div>
            <button type="button" class="dial-btn" data-dial="hours" data-dir="down" aria-label="Stunde minus">▼</button>
          </div>
          <div class="dial-colon">:</div>
          <div class="dial">
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="up" aria-label="Minute plus">▲</button>
            <div class="dial-value" id="minutes-val">${String(state.minutes).padStart(2, '0')}</div>
            <div class="dial-unit">Min</div>
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="down" aria-label="Minute minus">▼</button>
          </div>
        </div>
        <div class="quick-row">
          <button type="button" class="quick" data-quick="1">1 Min</button>
          <button type="button" class="quick" data-quick="5">5 Min</button>
          <button type="button" class="quick" data-quick="10">10 Min</button>
          <button type="button" class="quick" data-quick="15">15 Min</button>
          <button type="button" class="quick" data-quick="30">30 Min</button>
          <button type="button" class="quick" data-quick="60">1 Std</button>
        </div>
        <p class="duration-hint">Gewählt: <strong>${formatSpokenTime(totalSec).replace(/^Noch |\.$/g, '')}</strong> (1 Min – 4 Std)</p>
      </section>

      <div class="preview-mini" style="background:${bg.gradient}">
        <span class="preview-animal">${animal.emoji}</span>
        <span class="preview-path">———→</span>
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
  function nudgeDial(dial, dir) {
    if (dial === 'hours') {
      state.hours = Math.min(4, Math.max(0, state.hours + dir))
      if (state.hours === 4) state.minutes = 0
    } else {
      let m = state.minutes + dir
      if (m > 59) {
        if (state.hours < 4) {
          state.hours += 1
          m = 0
        } else m = 59
      }
      if (m < 0) {
        if (state.hours > 0) {
          state.hours -= 1
          m = 59
        } else m = 0
      }
      if (state.hours === 4) m = 0
      state.minutes = m
    }
    clampDuration()
    const hv = root.querySelector('#hours-val')
    const mv = root.querySelector('#minutes-val')
    const hint = root.querySelector('.duration-hint strong')
    if (hv) hv.textContent = String(state.hours)
    if (mv) mv.textContent = String(state.minutes).padStart(2, '0')
    if (hint) {
      hint.textContent = formatSpokenTime(clampDuration())
        .replace(/^Noch |\.$/g, '')
    }
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
        timer = setInterval(() => nudgeDial(dial, dir), 80)
      }, 380)
    }
    el.addEventListener('pointerdown', start)
    el.addEventListener('pointerup', stop)
    el.addEventListener('pointerleave', stop)
    el.addEventListener('pointercancel', stop)
  })
  root.querySelectorAll('[data-quick]').forEach((el) => {
    el.addEventListener('click', () => {
      const mins = Number(el.dataset.quick)
      state.hours = Math.floor(mins / 60)
      state.minutes = mins % 60
      clampDuration()
      render(root)
    })
  })
  root.querySelector('#btn-start').addEventListener('click', async () => {
    await unlockAudio()
    const animal = getAnimal()
    playAnimalSound(animal.sound)
    const sec = clampDuration()
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
          <div class="path-line"></div>
          <div class="path-fill" style="width:${progress * 100}%"></div>
        </div>
        <button type="button" class="animal-btn" id="animal-btn"
          style="left:${leftPct}%"
          aria-label="${animal.name} antippen für Geräusch und Restzeit">
          <span class="animal-sprite ${state.paused ? '' : 'walking'}">${animal.emoji}</span>
        </button>
        <div class="food-spot" aria-hidden="true">
          <span class="food-emoji">${animal.foodEmoji}</span>
          <span class="food-label">${animal.food}</span>
        </div>
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
        </div>
        <h1 class="end-title">Fertig!</h1>
        <p class="end-sub">${animal.name} hat das Futter erreicht!</p>
        <div class="eat-scene">
          <span class="animal-big eating">${animal.emoji}</span>
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
    const sec = clampDuration()
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
  // Only update flash overlay without full re-render if possible
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
}

export function render(root) {
  if (state.screen === 'setup') renderSetup(root)
  else if (state.screen === 'running') renderRunning(root)
  else renderEnd(root)
}

export function mount(root) {
  render(root)
}
