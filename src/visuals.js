/** SVG scene decorations and animal presentation helpers
 *  Portrait viewBoxes (≈ iPhone aspect) so slice/cover keeps decorations visible.
 */

const VB = '0 0 390 780'

export function sceneDecorSVG(decor) {
  switch (decor) {
    case 'trees':
      return forestScene()
    case 'flowers':
      return meadowScene()
    case 'barn':
      return barnScene()
    case 'garden':
      return gardenScene()
    case 'water':
      return aquariumScene()
    case 'home':
      return livingRoomScene()
    default:
      return ''
  }
}

function forestScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyForest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81D4FA"/>
          <stop offset="42%" stop-color="#E1F5FE"/>
          <stop offset="42%" stop-color="#66BB6A"/>
          <stop offset="100%" stop-color="#1B5E20"/>
        </linearGradient>
        <radialGradient id="sunForest" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF9C4"/><stop offset="100%" stop-color="#FFB300"/>
        </radialGradient>
      </defs>
      <rect width="390" height="780" fill="url(#skyForest)"/>
      <!-- distant hills -->
      <ellipse cx="60" cy="340" rx="140" ry="50" fill="#81C784" opacity="0.75"/>
      <ellipse cx="280" cy="350" rx="160" ry="55" fill="#4CAF50" opacity="0.65"/>
      <ellipse cx="195" cy="360" rx="200" ry="40" fill="#43A047" opacity="0.45"/>
      <circle class="sun-orb" cx="320" cy="90" r="42" fill="url(#sunForest)"/>
      ${cloud(70, 100, 0.9)}
      ${cloud(180, 130, 0.65)}
      ${cloud(100, 160, 0.5)}
      <!-- forest row -->
      ${pine(10, 280, 1.15)}
      ${leafyTree(70, 300, 1)}
      ${pine(140, 270, 1.3)}
      ${leafyTree(210, 295, 0.9)}
      ${pine(280, 275, 1.2)}
      ${leafyTree(330, 305, 0.85)}
      <!-- mid bushes -->
      <ellipse cx="50" cy="480" rx="40" ry="22" fill="#2E7D32"/>
      <ellipse cx="90" cy="485" rx="28" ry="16" fill="#388E3C"/>
      <ellipse cx="300" cy="490" rx="45" ry="20" fill="#1B5E20"/>
      <ellipse cx="340" cy="495" rx="30" ry="14" fill="#2E7D32"/>
      <!-- mushrooms & ferns near path -->
      <g transform="translate(160,500)">
        <ellipse cx="0" cy="28" rx="18" ry="7" fill="#33691E" opacity="0.45"/>
        <path d="M-10,28 Q-18,8 -4,4 Q4,14 2,28" fill="#558B2F"/>
        <path d="M10,28 Q18,10 6,4 Q0,16 4,28" fill="#689F38"/>
        <ellipse cx="28" cy="14" rx="14" ry="9" fill="#E53935"/>
        <rect x="24" y="14" width="8" height="18" rx="2" fill="#FFECB3"/>
        <circle cx="22" cy="10" r="2" fill="#fff"/><circle cx="30" cy="13" r="1.6" fill="#fff"/>
      </g>
      <g transform="translate(230,520)">
        <ellipse cx="14" cy="10" rx="11" ry="7" fill="#C62828"/>
        <rect x="11" y="10" width="6" height="14" rx="2" fill="#FFF8E1"/>
      </g>
      <!-- foreground moss -->
      <ellipse cx="195" cy="720" rx="240" ry="80" fill="#1B5E20" opacity="0.35"/>
      ${grassTuft(40, 560)} ${grassTuft(120, 570)} ${grassTuft(260, 565)} ${grassTuft(340, 575)}
    </svg>`
}

function meadowScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyMeadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4FC3F7"/>
          <stop offset="45%" stop-color="#E1F5FE"/>
          <stop offset="45%" stop-color="#AED581"/>
          <stop offset="100%" stop-color="#558B2F"/>
        </linearGradient>
        <radialGradient id="sunMeadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDE7"/><stop offset="100%" stop-color="#FFCA28"/>
        </radialGradient>
      </defs>
      <rect width="390" height="780" fill="url(#skyMeadow)"/>
      <ellipse cx="80" cy="360" rx="150" ry="40" fill="#9CCC65" opacity="0.55"/>
      <ellipse cx="300" cy="370" rx="130" ry="35" fill="#8BC34A" opacity="0.5"/>
      <circle class="sun-orb" cx="310" cy="85" r="46" fill="url(#sunMeadow)"/>
      ${cloud(60, 95, 0.9)}
      ${cloud(170, 125, 0.7)}
      ${cloud(90, 155, 0.45)}
      <!-- dense flower meadow -->
      ${flower(30, 430, '#FF7043', '#FFEB3B', 1.15)}
      ${flower(75, 460, '#EC407A', '#FFF59D', 1)}
      ${flower(120, 420, '#AB47BC', '#FFE082', 1.2)}
      ${flower(165, 470, '#42A5F5', '#FFEE58', 0.95)}
      ${flower(210, 435, '#FFA726', '#FFF59D', 1.1)}
      ${flower(255, 465, '#EF5350', '#FFEB3B', 0.9)}
      ${flower(300, 425, '#7E57C2', '#FFE082', 1.15)}
      ${flower(345, 455, '#26A69A', '#FFF59D', 1)}
      ${flower(50, 520, '#F06292', '#FFF59D', 0.85)}
      ${flower(140, 530, '#5C6BC0', '#FFEE58', 0.9)}
      ${flower(230, 515, '#FF8A65', '#FFEB3B', 1)}
      ${flower(320, 525, '#66BB6A', '#FFF59D', 0.85)}
      ${grassTuft(40, 500)} ${grassTuft(100, 545)} ${grassTuft(190, 500)}
      ${grassTuft(270, 540)} ${grassTuft(350, 505)}
      <!-- butterflies -->
      <g class="flutter" transform="translate(195,200)">
        <ellipse cx="0" cy="0" rx="14" ry="9" fill="#7E57C2"/>
        <ellipse cx="20" cy="0" rx="14" ry="9" fill="#B39DDB"/>
        <circle cx="10" cy="0" r="4" fill="#4527A0"/>
      </g>
      <g class="flutter" style="animation-delay:-1.5s" transform="translate(100,240)">
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="#FF8A65"/>
        <ellipse cx="15" cy="0" rx="10" ry="6" fill="#FFCCBC"/>
        <circle cx="7.5" cy="0" r="3" fill="#BF360C"/>
      </g>
      <ellipse cx="195" cy="720" rx="240" ry="70" fill="#33691E" opacity="0.25"/>
    </svg>`
}

function barnScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyBarn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFD54F"/>
          <stop offset="40%" stop-color="#FFF8E1"/>
          <stop offset="40%" stop-color="#D7CCC8"/>
          <stop offset="100%" stop-color="#6D4C41"/>
        </linearGradient>
      </defs>
      <rect width="390" height="780" fill="url(#skyBarn)"/>
      <circle class="sun-orb" cx="70" cy="90" r="40" fill="#FFCA28"/>
      ${cloud(160, 100, 0.7)}
      ${cloud(250, 140, 0.5)}
      <!-- red barn -->
      <g transform="translate(200,250)">
        <polygon points="90,10 170,70 10,70" fill="#5D4037"/>
        <polygon points="90,0 155,58 25,58" fill="#6D4C41"/>
        <rect x="20" y="58" width="140" height="120" fill="#E53935"/>
        <rect x="20" y="150" width="140" height="28" fill="#C62828"/>
        <rect x="20" y="95" width="140" height="8" fill="#FFECB3" opacity="0.9"/>
        <rect x="86" y="58" width="8" height="120" fill="#FFECB3" opacity="0.85"/>
        <rect x="62" y="100" width="46" height="78" fill="#5D4037"/>
        <path d="M62,100 L90,138 L118,100" fill="none" stroke="#FFECB3" stroke-width="4"/>
        <rect x="36" y="74" width="26" height="20" fill="#81D4FA" stroke="#fff" stroke-width="2"/>
        <rect x="118" y="74" width="26" height="20" fill="#81D4FA" stroke="#fff" stroke-width="2"/>
      </g>
      <!-- hay -->
      <g transform="translate(30,430)">
        <ellipse cx="40" cy="36" rx="42" ry="24" fill="#F9A825"/>
        <ellipse cx="40" cy="24" rx="42" ry="18" fill="#FBC02D"/>
        <path d="M8,22 Q40,8 72,22" fill="none" stroke="#F57F17" stroke-width="2.5"/>
        <path d="M12,34 Q40,22 68,34" fill="none" stroke="#F57F17" stroke-width="2.5"/>
      </g>
      <g transform="translate(100,460)">
        <ellipse cx="28" cy="26" rx="30" ry="18" fill="#FFB300"/>
        <ellipse cx="28" cy="16" rx="30" ry="14" fill="#FFC107"/>
      </g>
      <!-- fence -->
      <g fill="#8D6E63">
        <rect x="30" y="520" width="9" height="55"/>
        <rect x="80" y="520" width="9" height="55"/>
        <rect x="130" y="520" width="9" height="55"/>
        <rect x="180" y="520" width="9" height="55"/>
        <rect x="30" y="532" width="160" height="7"/>
        <rect x="30" y="552" width="160" height="7"/>
      </g>
      <!-- rooster / chicken coop hint -->
      <g transform="translate(300,480)">
        <rect width="60" height="40" rx="4" fill="#A1887F"/>
        <polygon points="0,0 30,-18 60,0" fill="#8D6E63"/>
        <rect x="22" y="16" width="16" height="24" fill="#5D4037"/>
      </g>
      <ellipse cx="195" cy="730" rx="230" ry="70" fill="#5D4037" opacity="0.25"/>
    </svg>`
}

function gardenScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyGarden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4DD0E1"/>
          <stop offset="44%" stop-color="#E0F7FA"/>
          <stop offset="44%" stop-color="#AED581"/>
          <stop offset="100%" stop-color="#558B2F"/>
        </linearGradient>
      </defs>
      <rect width="390" height="780" fill="url(#skyGarden)"/>
      <circle class="sun-orb" cx="300" cy="80" r="44" fill="#FFEB3B"/>
      ${cloud(60, 95, 0.85)}
      ${cloud(160, 125, 0.55)}
      <!-- picket fence -->
      <g transform="translate(10,320)" opacity="0.9">
        ${Array.from({ length: 14 }, (_, i) =>
          `<rect x="${i * 27}" y="16" width="14" height="50" rx="2" fill="#FFF8E1"/>
           <polygon points="${i * 27},16 ${i * 27 + 7},2 ${i * 27 + 14},16" fill="#FFFDE7"/>`
        ).join('')}
        <rect x="0" y="32" width="370" height="6" fill="#FFE082"/>
        <rect x="0" y="48" width="370" height="5" fill="#FFE082"/>
      </g>
      <!-- sunflowers -->
      <g transform="translate(30,360)">
        <rect x="28" y="70" width="10" height="80" fill="#558B2F"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4
          const x = 33 + Math.cos(a) * 22
          const y = 62 + Math.sin(a) * 22
          return `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#F9A825" transform="rotate(${i * 45},${x},${y})"/>`
        }).join('')}
        <circle cx="33" cy="62" r="16" fill="#5D4037"/>
        <circle cx="33" cy="62" r="9" fill="#3E2723"/>
      </g>
      <g transform="translate(110,390)">
        <rect x="18" y="55" width="8" height="65" fill="#689F38"/>
        <circle cx="22" cy="48" r="20" fill="#FFB300"/>
        <circle cx="22" cy="48" r="11" fill="#4E342E"/>
      </g>
      <!-- veggie beds -->
      <g transform="translate(200,480)">
        <ellipse cx="16" cy="10" rx="20" ry="12" fill="#7CB342"/>
        <ellipse cx="16" cy="4" rx="12" ry="8" fill="#9CCC65"/>
        <path d="M12,18 L12,48 L20,48 L16,18 Z" fill="#FF7043"/>
      </g>
      <g transform="translate(260,490)">
        <ellipse cx="22" cy="18" rx="28" ry="20" fill="#66BB6A"/>
        <ellipse cx="22" cy="12" rx="16" ry="12" fill="#A5D6A7"/>
      </g>
      <g transform="translate(320,470)">
        <ellipse cx="14" cy="28" rx="12" ry="24" fill="#EF5350"/>
        <ellipse cx="14" cy="8" rx="14" ry="8" fill="#43A047"/>
      </g>
      <g transform="translate(180,520)">
        <ellipse cx="14" cy="10" rx="18" ry="11" fill="#8BC34A"/>
        <path d="M10,18 L10,42 L18,42 L14,18 Z" fill="#FF8A65"/>
      </g>
      <!-- watering can -->
      <g transform="translate(90,500)">
        <ellipse cx="28" cy="24" rx="24" ry="16" fill="#42A5F5"/>
        <rect x="44" y="14" width="22" height="8" rx="2" fill="#1E88E5"/>
        <path d="M6,18 Q-6,10 2,4" fill="none" stroke="#1E88E5" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g class="flutter" transform="translate(240,200)">
        <ellipse cx="0" cy="2" rx="11" ry="6" fill="#FFC107"/>
        <ellipse cx="16" cy="2" rx="11" ry="6" fill="#FFECB3"/>
        <circle cx="8" cy="2" r="3" fill="#37474F"/>
      </g>
      ${grassTuft(40, 560)} ${grassTuft(150, 570)} ${grassTuft(280, 555)}
    </svg>`
}

function aquariumScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="waterBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81D4FA"/>
          <stop offset="35%" stop-color="#29B6F6"/>
          <stop offset="70%" stop-color="#0288D1"/>
          <stop offset="100%" stop-color="#01579B"/>
        </linearGradient>
        <linearGradient id="waterLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E1F5FE" stop-opacity="0.5"/>
          <stop offset="40%" stop-color="#4FC3F7" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#01579B" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="sandG" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stop-color="#FFE082"/><stop offset="100%" stop-color="#FFB300"/>
        </radialGradient>
      </defs>
      <rect width="390" height="780" fill="url(#waterBody)"/>
      <rect width="390" height="780" fill="url(#waterLight)"/>
      <path d="M70,0 L130,400 L100,400 Z" fill="#E1F5FE" opacity="0.12"/>
      <path d="M200,0 L280,420 L230,420 Z" fill="#E1F5FE" opacity="0.1"/>
      <path d="M320,0 L360,300 L340,300 Z" fill="#E1F5FE" opacity="0.08"/>
      <!-- sand -->
      <ellipse cx="195" cy="720" rx="260" ry="90" fill="url(#sandG)"/>
      <ellipse cx="70" cy="680" rx="50" ry="16" fill="#FFCC80" opacity="0.55"/>
      <ellipse cx="310" cy="690" rx="60" ry="18" fill="#FFB74D" opacity="0.45"/>
      <!-- bubbles -->
      <g class="bubble-rise" opacity="0.8">
        <circle cx="60" cy="500" r="12" fill="#B3E5FC"/><circle cx="56" cy="496" r="4" fill="#E1F5FE"/>
      </g>
      <g class="bubble-rise d1" opacity="0.65">
        <circle cx="160" cy="560" r="8" fill="#B3E5FC"/>
      </g>
      <g class="bubble-rise d2" opacity="0.85">
        <circle cx="280" cy="480" r="14" fill="#B3E5FC"/><circle cx="275" cy="475" r="4.5" fill="#E1F5FE"/>
      </g>
      <g class="bubble-rise" style="animation-delay:-3s" opacity="0.55">
        <circle cx="340" cy="600" r="7" fill="#B3E5FC"/>
      </g>
      <!-- seaweed -->
      <path class="seaweed-sway" d="M40,700 Q65,580 42,460 Q20,360 55,280" fill="none" stroke="#2E7D32" stroke-width="14" stroke-linecap="round"/>
      <path class="seaweed-sway s2" d="M95,710 Q125,580 90,450 Q70,360 110,290" fill="none" stroke="#43A047" stroke-width="10" stroke-linecap="round"/>
      <path class="seaweed-sway" style="animation-delay:-2s" d="M350,710 Q325,580 345,450 Q360,360 320,290" fill="none" stroke="#1B5E20" stroke-width="12" stroke-linecap="round"/>
      <!-- coral -->
      <g transform="translate(240,560)">
        <path d="M30,100 Q12,50 30,0 Q46,45 62,0 Q76,50 62,100 Z" fill="#FF8A65"/>
        <path d="M0,100 Q-12,55 8,20" fill="none" stroke="#FF7043" stroke-width="10" stroke-linecap="round"/>
        <path d="M80,100 Q96,55 70,25" fill="none" stroke="#FFAB91" stroke-width="8" stroke-linecap="round"/>
      </g>
      <g transform="translate(150,600)">
        <circle cx="14" cy="28" r="20" fill="#CE93D8" opacity="0.9"/>
        <circle cx="38" cy="34" r="14" fill="#BA68C8" opacity="0.85"/>
        <circle cx="0" cy="40" r="12" fill="#AB47BC" opacity="0.8"/>
      </g>
      <!-- pebbles -->
      <ellipse cx="120" cy="680" rx="16" ry="9" fill="#78909C"/>
      <ellipse cx="150" cy="685" rx="11" ry="7" fill="#90A4AE"/>
      <ellipse cx="220" cy="675" rx="14" ry="8" fill="#607D8B"/>
      <ellipse cx="300" cy="682" rx="12" ry="7" fill="#78909C"/>
    </svg>`
}

function livingRoomScene() {
  return `
    <svg class="scene-svg" viewBox="${VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="wallHome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF8E1"/>
          <stop offset="48%" stop-color="#FFE0B2"/>
          <stop offset="48%" stop-color="#D7CCC8"/>
          <stop offset="100%" stop-color="#8D6E63"/>
        </linearGradient>
      </defs>
      <rect width="390" height="780" fill="url(#wallHome)"/>
      <g opacity="0.1" stroke="#FFCC80" stroke-width="2">
        <line x1="0" y1="60" x2="390" y2="60"/>
        <line x1="0" y1="110" x2="390" y2="110"/>
        <line x1="0" y1="160" x2="390" y2="160"/>
        <line x1="0" y1="210" x2="390" y2="210"/>
      </g>
      <!-- picture -->
      <g transform="translate(28,70)">
        <rect width="100" height="80" rx="6" fill="#6D4C41"/>
        <rect x="10" y="10" width="80" height="60" fill="#81D4FA"/>
        <circle cx="60" cy="30" r="14" fill="#FFCA28"/>
        <ellipse cx="40" cy="55" rx="26" ry="14" fill="#66BB6A"/>
        <rect x="36" y="80" width="28" height="8" fill="#5D4037"/>
      </g>
      <!-- window + curtains -->
      <g transform="translate(230,55)">
        <rect width="130" height="130" rx="10" fill="#5D4037"/>
        <rect x="10" y="10" width="50" height="50" fill="#4FC3F7"/>
        <rect x="70" y="10" width="50" height="50" fill="#81D4FA"/>
        <rect x="10" y="70" width="50" height="50" fill="#81D4FA"/>
        <rect x="70" y="70" width="50" height="50" fill="#4FC3F7"/>
        <path d="M0,0 Q18,65 0,130" fill="#EF9A9A" opacity="0.9"/>
        <path d="M130,0 Q112,65 130,130" fill="#EF9A9A" opacity="0.9"/>
      </g>
      <!-- sofa -->
      <g transform="translate(20,400)">
        <rect x="10" y="30" width="180" height="70" rx="18" fill="#EF5350"/>
        <rect x="10" y="72" width="180" height="32" rx="8" fill="#E53935"/>
        <rect x="0" y="16" width="28" height="55" rx="10" fill="#EF5350"/>
        <rect x="172" y="16" width="28" height="55" rx="10" fill="#EF5350"/>
        <rect x="36" y="36" width="60" height="28" rx="8" fill="#FFCDD2"/>
        <rect x="108" y="36" width="60" height="28" rx="8" fill="#FFCDD2"/>
        <ellipse cx="24" cy="104" rx="12" ry="6" fill="#5D4037"/>
        <ellipse cx="176" cy="104" rx="12" ry="6" fill="#5D4037"/>
      </g>
      <!-- plant -->
      <g transform="translate(220,380)">
        <ellipse cx="36" cy="30" rx="34" ry="22" fill="#66BB6A"/>
        <ellipse cx="22" cy="16" rx="18" ry="16" fill="#43A047"/>
        <ellipse cx="50" cy="14" rx="16" ry="14" fill="#2E7D32"/>
        <path d="M12,42 L60,42 L52,85 L20,85 Z" fill="#A1887F"/>
        <ellipse cx="36" cy="42" rx="24" ry="6" fill="#8D6E63"/>
      </g>
      <!-- lamp -->
      <g transform="translate(310,360)">
        <rect x="22" y="55" width="10" height="80" fill="#8D6E63"/>
        <path d="M4,55 L50,55 L40,12 L14,12 Z" fill="#FFE082"/>
        <ellipse cx="27" cy="12" rx="16" ry="5" fill="#FFECB3"/>
        <ellipse cx="27" cy="135" rx="20" ry="7" fill="#6D4C41"/>
      </g>
      <!-- bookshelf hint -->
      <g transform="translate(250,500)">
        <rect width="110" height="90" fill="#6D4C41"/>
        <rect x="6" y="8" width="28" height="70" fill="#EF5350"/>
        <rect x="40" y="8" width="28" height="70" fill="#42A5F5"/>
        <rect x="74" y="8" width="28" height="70" fill="#66BB6A"/>
        <rect y="40" width="110" height="6" fill="#5D4037"/>
      </g>
      <!-- rug -->
      <ellipse cx="195" cy="700" rx="170" ry="45" fill="#CE93D8" opacity="0.5"/>
      <ellipse cx="195" cy="700" rx="130" ry="28" fill="#BA68C8" opacity="0.4"/>
    </svg>`
}

function cloud(cx, cy, opacity = 0.85) {
  return `
    <g class="cloud-shape" opacity="${opacity}" transform="translate(${cx},${cy})">
      <ellipse cx="0" cy="0" rx="36" ry="18" fill="#fff"/>
      <ellipse cx="28" cy="-6" rx="24" ry="16" fill="#fff"/>
      <ellipse cx="-26" cy="4" rx="20" ry="13" fill="#fff"/>
    </g>`
}

function pine(x, y, scale = 1) {
  return `
    <g transform="translate(${x},${y}) scale(${scale})">
      <rect x="18" y="95" width="12" height="36" fill="#5D4037"/>
      <polygon points="24,8 55,60  -7,60" fill="#1B5E20"/>
      <polygon points="24,35 50,80  -2,80" fill="#2E7D32"/>
      <polygon points="24,60 44,100 4,100" fill="#388E3C"/>
    </g>`
}

function leafyTree(x, y, scale = 1) {
  return `
    <g transform="translate(${x},${y}) scale(${scale})">
      <rect x="26" y="75" width="14" height="50" fill="#6D4C41"/>
      <circle cx="33" cy="55" r="40" fill="#2E7D32"/>
      <circle cx="10" cy="68" r="26" fill="#388E3C"/>
      <circle cx="56" cy="65" r="28" fill="#1B5E20"/>
      <circle cx="33" cy="36" r="22" fill="#43A047"/>
    </g>`
}

function flower(x, y, petal, center, scale = 1) {
  return `
    <g transform="translate(${x},${y}) scale(${scale})">
      <line x1="0" y1="0" x2="0" y2="38" stroke="#558B2F" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-8" cy="10" rx="7" ry="4" fill="#7CB342" transform="rotate(-40)"/>
      <circle cx="0" cy="-12" r="10" fill="${petal}"/>
      <circle cx="11" cy="-2" r="10" fill="${petal}"/>
      <circle cx="6" cy="11" r="10" fill="${petal}"/>
      <circle cx="-6" cy="11" r="10" fill="${petal}"/>
      <circle cx="-11" cy="-2" r="10" fill="${petal}"/>
      <circle cx="0" cy="0" r="7" fill="${center}"/>
    </g>`
}

function grassTuft(x, y) {
  return `
    <g transform="translate(${x},${y})" stroke="#33691E" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M0,16 Q-6,2 -12,0"/>
      <path d="M0,16 Q0,-2 3,-6"/>
      <path d="M0,16 Q8,2 14,0"/>
    </g>`
}

/**
 * Cute circular badge around animal emoji.
 * faceRight: flip horizontally so the animal looks toward the food (right).
 */
export function animalBadgeHTML(emoji, color, extraClass = '', faceRight = true) {
  const face = faceRight ? 'face-right' : ''
  return `
    <span class="animal-badge ${extraClass} ${face}" style="--badge:${color}">
      <span class="animal-badge-inner" aria-hidden="true">${emoji}</span>
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
