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
    color: '#FFFFFF',
  },
  {
    id: 'pferd',
    name: 'Pferd',
    emoji: '🐴',
    food: 'Apfel & Heu',
    foodEmoji: '🍎',
    sound: 'horse',
    color: '#8B4513',
  },
  {
    id: 'huhn',
    name: 'Huhn',
    emoji: '🐔',
    food: 'Körner',
    foodEmoji: '🌽',
    sound: 'chicken',
    color: '#FFD700',
  },
  {
    id: 'schwein',
    name: 'Schwein',
    emoji: '🐷',
    food: 'Äpfel & Rüben',
    foodEmoji: '🥕',
    sound: 'pig',
    color: '#FFB6C1',
  },
  {
    id: 'hund',
    name: 'Hund',
    emoji: '🐶',
    food: 'Knochen & Napf',
    foodEmoji: '🦴',
    sound: 'dog',
    color: '#D2691E',
  },
  {
    id: 'katze',
    name: 'Katze',
    emoji: '🐱',
    food: 'Fisch & Milch',
    foodEmoji: '🐟',
    sound: 'cat',
    color: '#FFA500',
  },
  {
    id: 'goldfisch',
    name: 'Goldfisch',
    emoji: '🐠',
    food: 'Flocken',
    foodEmoji: '🫧',
    sound: 'fish',
    color: '#FF8C00',
  },
]

/** @type {Background[]} */
export const BACKGROUNDS = [
  {
    id: 'wald',
    name: 'Wald',
    gradient: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 45%, #2E7D32 45%, #1B5E20 100%)',
    decor: 'trees',
  },
  {
    id: 'wiese',
    name: 'Wiese',
    gradient: 'linear-gradient(180deg, #81D4FA 0%, #81D4FA 50%, #8BC34A 50%, #689F38 100%)',
    decor: 'flowers',
  },
  {
    id: 'stall',
    name: 'Bauernhof',
    gradient: 'linear-gradient(180deg, #FFE082 0%, #FFE082 40%, #A1887F 40%, #8D6E63 100%)',
    decor: 'barn',
  },
  {
    id: 'garten',
    name: 'Garten',
    gradient: 'linear-gradient(180deg, #80DEEA 0%, #80DEEA 48%, #AED581 48%, #7CB342 100%)',
    decor: 'garden',
  },
  {
    id: 'aquarium',
    name: 'Aquarium',
    gradient: 'linear-gradient(180deg, #0288D1 0%, #4FC3F7 40%, #0277BD 70%, #01579B 100%)',
    decor: 'water',
  },
  {
    id: 'wohnzimmer',
    name: 'Wohnzimmer',
    gradient: 'linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 35%, #D7CCC8 35%, #BCAAA4 100%)',
    decor: 'home',
  },
]

export const MIN_DURATION_SEC = 60
export const MAX_DURATION_SEC = 4 * 60 * 60

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
