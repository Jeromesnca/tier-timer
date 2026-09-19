/** @typedef {{ id: string, name: string, emoji: string, food: string, foodEmoji: string, sound: string, color: string }} Animal */
/** @typedef {{ id: string, name: string, gradient: string, decor: string }} Background */

/** @type {Animal[]} */
export const ANIMALS = [
  {
    id: 'kuh',
    name: 'Kuh',
    emoji: '🐄',
    food: 'Gras & Heu',
    foodEmoji: '🌾',
    sound: 'cow',
    color: '#ECEFF1',
  },
  {
    id: 'pferd',
    name: 'Pferd',
    emoji: '🐴',
    food: 'Apfel & Heu',
    foodEmoji: '🍎',
    sound: 'horse',
    color: '#D7CCC8',
  },
  {
    id: 'huhn',
    name: 'Huhn',
    emoji: '🐔',
    food: 'Körner',
    foodEmoji: '🌽',
    sound: 'chicken',
    color: '#FFF9C4',
  },
  {
    id: 'schwein',
    name: 'Schwein',
    emoji: '🐷',
    food: 'Äpfel & Rüben',
    foodEmoji: '🥕',
    sound: 'pig',
    color: '#F8BBD0',
  },
  {
    id: 'hund',
    name: 'Hund',
    emoji: '🐶',
    food: 'Knochen & Napf',
    foodEmoji: '🦴',
    sound: 'dog',
    color: '#FFE0B2',
  },
  {
    id: 'katze',
    name: 'Katze',
    emoji: '🐱',
    food: 'Fisch & Milch',
    foodEmoji: '🐟',
    sound: 'cat',
    color: '#FFE0B2',
  },
  {
    id: 'goldfisch',
    name: 'Goldfisch',
    emoji: '🐠',
    food: 'Flocken',
    foodEmoji: '🫧',
    sound: 'fish',
    color: '#FFCC80',
  },
]

/** @type {Background[]} */
export const BACKGROUNDS = [
  {
    id: 'wald',
    name: 'Wald',
    gradient: 'linear-gradient(180deg, #B3E5FC 0%, #E1F5FE 48%, #66BB6A 48%, #1B5E20 100%)',
    decor: 'trees',
  },
  {
    id: 'wiese',
    name: 'Wiese',
    gradient: 'linear-gradient(180deg, #81D4FA 0%, #E1F5FE 48%, #AED581 48%, #558B2F 100%)',
    decor: 'flowers',
  },
  {
    id: 'stall',
    name: 'Stall',
    gradient: 'linear-gradient(180deg, #FFE082 0%, #FFF8E1 40%, #D7CCC8 40%, #8D6E63 100%)',
    decor: 'barn',
  },
  {
    id: 'garten',
    name: 'Garten',
    gradient: 'linear-gradient(180deg, #80DEEA 0%, #E0F7FA 46%, #AED581 46%, #7CB342 100%)',
    decor: 'garden',
  },
  {
    id: 'aquarium',
    name: 'Aquarium',
    gradient: 'linear-gradient(180deg, #4FC3F7 0%, #0299C7 40%, #0288D1 70%, #01579B 100%)',
    decor: 'water',
  },
  {
    id: 'wohnzimmer',
    name: 'Wohnzimmer',
    gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 50%, #D7CCC8 50%, #A1887F 100%)',
    decor: 'home',
  },
]

export const MIN_DURATION_SEC = 60
export const MAX_DURATION_SEC = 4 * 60 * 60

/** Continuous control range in whole minutes */
export const MIN_DURATION_MIN = 1
export const MAX_DURATION_MIN = 4 * 60

export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/** Human-readable duration for setup hint (no "Noch") */
export function formatDurationLabel(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h === 0) return m === 1 ? '1 Minute' : `${m} Minuten`
  if (m === 0) return h === 1 ? '1 Stunde' : `${h} Stunden`
  const hPart = h === 1 ? '1 Stunde' : `${h} Stunden`
  const mPart = m === 1 ? '1 Minute' : `${m} Minuten`
  return `${hPart} ${mPart}`
}

export function formatSpokenTime(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const parts = []
  if (h === 1) parts.push('eine Stunde')
  else if (h > 1) parts.push(`${h} Stunden`)
  if (m === 1) parts.push('eine Minute')
  else if (m > 1) parts.push(`${m} Minuten`)
  if (h === 0 && m === 0) {
    if (sec === 1) parts.push('eine Sekunde')
    else parts.push(`${sec} Sekunden`)
  } else if (h === 0 && sec > 0 && m < 5) {
    if (sec === 1) parts.push('eine Sekunde')
    else parts.push(`${sec} Sekunden`)
  }
  if (parts.length === 0) return 'keine Zeit mehr'
  if (parts.length === 1) return `Noch ${parts[0]}.`
  if (parts.length === 2) return `Noch ${parts[0]} und ${parts[1]}.`
  return `Noch ${parts[0]}, ${parts[1]} und ${parts[2]}.`
}
