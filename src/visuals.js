/** SVG scene decorations and animal presentation helpers */

export function sceneDecorSVG(decor) {
  switch (decor) {
    case 'trees':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#FFB300"/>
            </radialGradient>
          </defs>
          <circle class="sun-orb" cx="340" cy="48" r="28" fill="url(#sunG)"/>
          <ellipse class="cloud-shape" cx="70" cy="55" rx="36" ry="16" fill="#fff" opacity="0.85"/>
          <ellipse class="cloud-shape" cx="95" cy="55" rx="24" ry="14" fill="#fff" opacity="0.85"/>
          <ellipse class="cloud-shape c2" cx="180" cy="70" rx="40" ry="15" fill="#fff" opacity="0.7"/>
          <!-- trees -->
          <g transform="translate(30,140)">
            <rect x="18" y="55" width="10" height="40" fill="#5D4037"/>
            <circle cx="23" cy="45" r="28" fill="#2E7D32"/>
            <circle cx="10" cy="55" r="18" fill="#388E3C"/>
            <circle cx="36" cy="55" r="18" fill="#1B5E20"/>
          </g>
          <g transform="translate(90,155)">
            <rect x="14" y="40" width="8" height="32" fill="#6D4C41"/>
            <circle cx="18" cy="32" r="22" fill="#43A047"/>
            <circle cx="8" cy="40" r="14" fill="#2E7D32"/>
          </g>
          <g transform="translate(280,150)">
            <rect x="16" y="48" width="9" height="36" fill="#5D4037"/>
            <circle cx="20" cy="38" r="24" fill="#1B5E20"/>
            <circle cx="8" cy="48" r="16" fill="#2E7D32"/>
            <circle cx="32" cy="48" r="16" fill="#388E3C"/>
          </g>
        </svg>`
    case 'flowers':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="sunG2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFCA28"/>
            </radialGradient>
          </defs>
          <circle class="sun-orb" cx="330" cy="42" r="30" fill="url(#sunG2)"/>
          <ellipse class="cloud-shape" cx="80" cy="50" rx="38" ry="15" fill="#fff" opacity="0.85"/>
          <ellipse class="cloud-shape" cx="110" cy="50" rx="22" ry="12" fill="#fff" opacity="0.85"/>
          ${flower(55, 210, '#FF7043', '#FFEB3B')}
          ${flower(120, 220, '#EC407A', '#FFF59D')}
          ${flower(190, 208, '#AB47BC', '#FFE082')}
          ${flower(255, 218, '#42A5F5', '#FFEE58')}
          <g class="flutter" transform="translate(200,90)">
            <ellipse cx="0" cy="0" rx="10" ry="6" fill="#7E57C2" opacity="0.9"/>
            <ellipse cx="14" cy="0" rx="10" ry="6" fill="#B39DDB" opacity="0.9"/>
            <circle cx="7" cy="0" r="3" fill="#4527A0"/>
          </g>
        </svg>`
    case 'barn':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle class="sun-orb" cx="60" cy="45" r="26" fill="#FFCA28"/>
          <!-- barn -->
          <g transform="translate(260,120)">
            <polygon points="55,0 110,40 0,40" fill="#6D4C41"/>
            <rect x="8" y="40" width="94" height="70" fill="#E53935"/>
            <rect x="8" y="90" width="94" height="20" fill="#C62828"/>
            <rect x="40" y="60" width="30" height="50" fill="#5D4037"/>
            <rect x="20" y="52" width="18" height="16" fill="#81D4FA" stroke="#fff" stroke-width="2"/>
            <rect x="72" y="52" width="18" height="16" fill="#81D4FA" stroke="#fff" stroke-width="2"/>
          </g>
          <!-- hay bale -->
          <ellipse cx="70" cy="220" rx="28" ry="16" fill="#F9A825"/>
          <ellipse cx="70" cy="214" rx="28" ry="12" fill="#FBC02D"/>
          <!-- fence posts -->
          <g fill="#8D6E63">
            <rect x="120" y="200" width="6" height="36"/><rect x="150" y="200" width="6" height="36"/>
            <rect x="180" y="200" width="6" height="36"/><rect x="210" y="200" width="6" height="36"/>
            <rect x="120" y="210" width="96" height="5"/><rect x="120" y="224" width="96" height="5"/>
          </g>
        </svg>`
    case 'garden':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle class="sun-orb" cx="320" cy="40" r="28" fill="#FFEB3B"/>
          <ellipse class="cloud-shape" cx="90" cy="48" rx="36" ry="14" fill="#fff" opacity="0.8"/>
          <!-- sunflower -->
          <g transform="translate(50,175)">
            <rect x="18" y="40" width="8" height="50" fill="#558B2F"/>
            <circle cx="22" cy="35" r="18" fill="#F9A825"/>
            <circle cx="22" cy="35" r="10" fill="#5D4037"/>
          </g>
          <!-- carrot tops / lettuce -->
          <g transform="translate(130,200)">
            <ellipse cx="10" cy="10" rx="14" ry="8" fill="#7CB342"/>
            <ellipse cx="22" cy="6" rx="10" ry="7" fill="#8BC34A"/>
            <path d="M16,18 L16,40 L22,40 L20,18 Z" fill="#FF7043"/>
          </g>
          <g transform="translate(210,205)">
            <ellipse cx="16" cy="12" rx="20" ry="14" fill="#66BB6A"/>
            <ellipse cx="16" cy="10" rx="12" ry="8" fill="#A5D6A7"/>
          </g>
          <g class="flutter" transform="translate(250,100)">
            <ellipse cx="0" cy="2" rx="8" ry="5" fill="#FFC107"/>
            <ellipse cx="12" cy="2" rx="8" ry="5" fill="#FFECB3"/>
            <circle cx="6" cy="2" r="2.5" fill="#37474F"/>
          </g>
        </svg>`
    case 'water':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="waterLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4FC3F7" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#01579B" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill="url(#waterLight)"/>
          <g class="bubble-rise" opacity="0.7">
            <circle cx="80" cy="200" r="8" fill="#B3E5FC"/><circle cx="80" cy="200" r="5" fill="#E1F5FE"/>
          </g>
          <g class="bubble-rise d1" opacity="0.6">
            <circle cx="180" cy="230" r="6" fill="#B3E5FC"/>
          </g>
          <g class="bubble-rise d2" opacity="0.75">
            <circle cx="300" cy="210" r="10" fill="#B3E5FC"/><circle cx="300" cy="210" r="6" fill="#E1F5FE"/>
          </g>
          <!-- seaweed -->
          <path class="seaweed-sway" d="M40,260 Q55,220 40,180 Q25,140 45,100" fill="none" stroke="#2E7D32" stroke-width="8" stroke-linecap="round"/>
          <path class="seaweed-sway s2" d="M100,260 Q120,210 95,160 Q75,120 110,90" fill="none" stroke="#43A047" stroke-width="6" stroke-linecap="round"/>
          <!-- coral -->
          <g transform="translate(310,200)">
            <path d="M20,60 Q10,30 20,0 Q30,30 40,0 Q50,30 40,60 Z" fill="#FF8A65"/>
            <path d="M0,60 Q-5,35 5,10" fill="none" stroke="#FF7043" stroke-width="6" stroke-linecap="round"/>
          </g>
        </svg>`
    case 'home':
      return `
        <svg class="scene-svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <!-- picture frame -->
          <g transform="translate(40,40)">
            <rect width="70" height="55" rx="4" fill="#8D6E63"/>
            <rect x="8" y="8" width="54" height="39" fill="#81D4FA"/>
            <circle cx="40" cy="22" r="8" fill="#FFCA28"/>
            <ellipse cx="28" cy="38" rx="16" ry="8" fill="#66BB6A"/>
          </g>
          <!-- window -->
          <g transform="translate(290,35)">
            <rect width="80" height="80" rx="6" fill="#6D4C41"/>
            <rect x="8" y="8" width="30" height="30" fill="#81D4FA"/>
            <rect x="42" y="8" width="30" height="30" fill="#4FC3F7"/>
            <rect x="8" y="42" width="30" height="30" fill="#4FC3F7"/>
            <rect x="42" y="42" width="30" height="30" fill="#81D4FA"/>
          </g>
          <!-- sofa hint -->
          <g transform="translate(40,185)">
            <rect width="120" height="45" rx="12" fill="#EF5350"/>
            <rect y="30" width="120" height="20" rx="4" fill="#E53935"/>
            <rect x="-8" y="10" width="18" height="35" rx="6" fill="#EF5350"/>
            <rect x="110" y="10" width="18" height="35" rx="6" fill="#EF5350"/>
          </g>
          <!-- plant pot -->
          <g transform="translate(220,175)">
            <ellipse cx="25" cy="20" rx="22" ry="14" fill="#66BB6A"/>
            <ellipse cx="18" cy="12" rx="12" ry="10" fill="#43A047"/>
            <ellipse cx="32" cy="10" rx="10" ry="9" fill="#2E7D32"/>
            <path d="M10,28 L40,28 L35,55 L15,55 Z" fill="#A1887F"/>
          </g>
        </svg>`
    default:
      return ''
  }
}

function flower(x, y, petal, center) {
  return `
    <g transform="translate(${x},${y})">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#558B2F" stroke-width="3"/>
      <circle cx="0" cy="-8" r="7" fill="${petal}"/>
      <circle cx="7" cy="-2" r="7" fill="${petal}"/>
      <circle cx="4" cy="7" r="7" fill="${petal}"/>
      <circle cx="-4" cy="7" r="7" fill="${petal}"/>
      <circle cx="-7" cy="-2" r="7" fill="${petal}"/>
      <circle cx="0" cy="0" r="5" fill="${center}"/>
    </g>`
}

/** Cute circular badge around animal emoji */
export function animalBadgeHTML(emoji, color, extraClass = '') {
  return `
    <span class="animal-badge ${extraClass}" style="--badge:${color}">
      <span class="animal-badge-inner">${emoji}</span>
    </span>`
}

/** Footprints / progress dots along the path (0–1 progress) */
export function pathMarkersHTML(progress) {
  const n = 7
  let html = ''
  for (let i = 0; i < n; i++) {
    const t = (i + 1) / (n + 1)
    const reached = progress >= t
    html += `<span class="path-dot ${reached ? 'lit' : ''}" style="left:${8 + t * 72}%"></span>`
  }
  return html
}
