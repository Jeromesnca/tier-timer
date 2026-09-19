(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`kuh`,name:`Kuh`,emoji:`🐄`,food:`Gras & Heu`,foodEmoji:`🌾`,sound:`cow`,color:`#ECEFF1`},{id:`pferd`,name:`Pferd`,emoji:`🐴`,food:`Apfel & Heu`,foodEmoji:`🍎`,sound:`horse`,color:`#D7CCC8`},{id:`huhn`,name:`Huhn`,emoji:`🐔`,food:`Körner`,foodEmoji:`🌽`,sound:`chicken`,color:`#FFF9C4`},{id:`schwein`,name:`Schwein`,emoji:`🐷`,food:`Äpfel & Rüben`,foodEmoji:`🥕`,sound:`pig`,color:`#F8BBD0`},{id:`hund`,name:`Hund`,emoji:`🐶`,food:`Knochen & Napf`,foodEmoji:`🦴`,sound:`dog`,color:`#FFE0B2`},{id:`katze`,name:`Katze`,emoji:`🐱`,food:`Fisch & Milch`,foodEmoji:`🐟`,sound:`cat`,color:`#FFE0B2`},{id:`goldfisch`,name:`Goldfisch`,emoji:`🐠`,food:`Flocken`,foodEmoji:`🫧`,sound:`fish`,color:`#FFCC80`}],t=[{id:`wald`,name:`Wald`,gradient:`linear-gradient(180deg, #B3E5FC 0%, #E1F5FE 48%, #66BB6A 48%, #1B5E20 100%)`,decor:`trees`},{id:`wiese`,name:`Wiese`,gradient:`linear-gradient(180deg, #81D4FA 0%, #E1F5FE 48%, #AED581 48%, #558B2F 100%)`,decor:`flowers`},{id:`stall`,name:`Stall`,gradient:`linear-gradient(180deg, #FFE082 0%, #FFF8E1 40%, #D7CCC8 40%, #8D6E63 100%)`,decor:`barn`},{id:`garten`,name:`Garten`,gradient:`linear-gradient(180deg, #80DEEA 0%, #E0F7FA 46%, #AED581 46%, #7CB342 100%)`,decor:`garden`},{id:`aquarium`,name:`Aquarium`,gradient:`linear-gradient(180deg, #4FC3F7 0%, #0299C7 40%, #0288D1 70%, #01579B 100%)`,decor:`water`},{id:`wohnzimmer`,name:`Wohnzimmer`,gradient:`linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 50%, #D7CCC8 50%, #A1887F 100%)`,decor:`home`}],n=14400;function r(e){let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60;return n>0?`${n}:${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`:`${String(r).padStart(2,`0`)}:${String(i).padStart(2,`0`)}`}function i(e){let t=Math.max(0,Math.round(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60);return n===0?r===1?`1 Minute`:`${r} Minuten`:r===0?n===1?`1 Stunde`:`${n} Stunden`:`${n===1?`1 Stunde`:`${n} Stunden`} ${r===1?`1 Minute`:`${r} Minuten`}`}function a(e){let t=Math.max(0,Math.ceil(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=t%60,a=[];return n===1?a.push(`eine Stunde`):n>1&&a.push(`${n} Stunden`),r===1?a.push(`eine Minute`):r>1&&a.push(`${r} Minuten`),(n===0&&r===0||n===0&&i>0&&r<5)&&(i===1?a.push(`eine Sekunde`):a.push(`${i} Sekunden`)),a.length===0?`keine Zeit mehr`:a.length===1?`Noch ${a[0]}.`:a.length===2?`Noch ${a[0]} und ${a[1]}.`:`Noch ${a[0]}, ${a[1]} und ${a[2]}.`}var o=null,s=!1,c=null;function l(){return o||(o=new(window.AudioContext||window.webkitAudioContext),c=o.createGain(),c.gain.value=.85,c.connect(o.destination)),o}function u(){return l(),c}async function d(){let e=l();if(e.state===`suspended`)try{await e.resume()}catch{}let t=e.createBuffer(1,1,22050),n=e.createBufferSource();n.buffer=t,n.connect(u()),n.start(0);let r=e.createOscillator(),i=e.createGain();return r.frequency.value=440,i.gain.value=1e-4,r.connect(i),i.connect(u()),r.start(e.currentTime),r.stop(e.currentTime+.05),s=!0,s}function f(e,t,n,r=`sine`,i=.15,a=null,o=0){let s=l(),c=s.createOscillator(),d=s.createGain();if(c.type=r,c.frequency.setValueAtTime(e,t),a!=null&&c.frequency.exponentialRampToValueAtTime(Math.max(20,a),t+n),o>0){let r=s.createOscillator(),i=s.createGain();r.frequency.value=o,i.gain.value=e*.03,r.connect(i),i.connect(c.frequency),r.start(t),r.stop(t+n+.02)}d.gain.setValueAtTime(1e-4,t),d.gain.exponentialRampToValueAtTime(i,t+.015),d.gain.setValueAtTime(i*.85,t+n*.55),d.gain.exponentialRampToValueAtTime(1e-4,t+n),c.connect(d),d.connect(u()),c.start(t),c.stop(t+n+.03)}function p(e,t,n=.08,r=800,i=`bandpass`){let a=l(),o=Math.max(1,Math.floor(a.sampleRate*t)),s=a.createBuffer(1,o,a.sampleRate),c=s.getChannelData(0);for(let e=0;e<o;e++)c[e]=(Math.random()*2-1)*(1-e/o);let d=a.createBufferSource();d.buffer=s;let f=a.createBiquadFilter();f.type=i,f.frequency.value=r,f.Q.value=1.4;let p=a.createGain();p.gain.setValueAtTime(n,e),p.gain.exponentialRampToValueAtTime(1e-4,e+t),d.connect(f),f.connect(p),p.connect(u()),d.start(e),d.stop(e+t)}function m(e,t,n,r,i=.08,a=`sawtooth`){f(e,n,r,a,i),f(t,n,r,`sine`,i*.55)}var h={cow(e){m(165,95,e,.45,.11,`sawtooth`),f(140,e+.08,.5,`triangle`,.07,75,4),f(110,e+.4,.55,`sawtooth`,.09,65),p(e+.15,.25,.03,280,`lowpass`)},horse(e){for(let t=0;t<5;t++)f(320+t*55,e+t*.055,.08,`square`,.055,280+t*30);f(620,e+.28,.35,`sawtooth`,.07,160,8),p(e+.1,.15,.035,900)},chicken(e){for(let t=0;t<5;t++)f(620+t%2*80,e+t*.07,.055,`square`,.055,420),p(e+t*.07,.04,.025,1400);f(980,e+.42,.18,`square`,.06,320)},pig(e){f(280,e,.18,`sawtooth`,.11,160),m(220,140,e+.12,.22,.08,`sawtooth`),p(e+.2,.22,.07,450,`bandpass`),f(190,e+.42,.28,`sawtooth`,.09,110)},dog(e){f(320,e,.1,`square`,.13,150),f(240,e+.02,.12,`sawtooth`,.08,120),f(300,e+.22,.12,`square`,.12,140),f(220,e+.24,.14,`sawtooth`,.07,110),f(340,e+.48,.1,`square`,.08,160)},cat(e){f(520,e,.45,`sine`,.11,880,6),f(620,e+.12,.4,`triangle`,.07,420,5),f(480,e+.35,.25,`sine`,.05,350)},fish(e){p(e,.18,.055,1400,`bandpass`),f(920,e+.04,.12,`sine`,.045,380),p(e+.18,.14,.045,1100,`bandpass`),f(760,e+.22,.1,`sine`,.035,300),p(e+.35,.12,.035,900,`highpass`)}};function g(e){if(!s)return;let t=l();t.state===`suspended`&&t.resume(),(h[e]||h.dog)(t.currentTime)}function _(){if(!s)return;let e=l();e.state===`suspended`&&e.resume();let t=e.currentTime;for(let e=0;e<8;e++){let n=t+e*.1;p(n,.07,.065,500+e%4*180,`bandpass`),f(160+e%3*35,n,.055,`triangle`,.045),e%2==0&&f(90,n+.02,.04,`sine`,.03)}}function ee(){if(!s)return;let e=l();e.state===`suspended`&&e.resume();let t=e.currentTime;[523.25,659.25,783.99,1046.5,1318.5].forEach((e,n)=>{f(e,t+n*.1,.28,`sine`,.1),f(e*2,t+n*.1,.18,`triangle`,.035)}),f(1568,t+.55,.45,`triangle`,.08);for(let e=0;e<4;e++)f(1800+e*200,t+.6+e*.08,.12,`sine`,.03)}function te(){s&&f(990,l().currentTime,.025,`sine`,.028)}var v=null;function y(){let e=(window.speechSynthesis?.getVoices?.()||[]).filter(e=>e.lang?.toLowerCase().startsWith(`de`));return v=e.find(e=>/google|enhanced|siri|anna|petra|helena|markus/i.test(e.name))||e[0]||null,v}typeof window<`u`&&window.speechSynthesis&&(y(),window.speechSynthesis.onvoiceschanged=()=>y());function b(e){if(window.speechSynthesis)try{window.speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(e);t.lang=`de-DE`,t.rate=.92,t.pitch=1.05;let n=v||y();n&&(t.voice=n),window.speechSynthesis.speak(t)}catch{}}function x(){try{window.speechSynthesis?.cancel()}catch{}}var S=`0 0 390 780`;function C(e){switch(e){case`trees`:return w();case`flowers`:return T();case`barn`:return E();case`garden`:return D();case`water`:return O();case`home`:return k();default:return``}}function w(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      ${A(70,100,.9)}
      ${A(180,130,.65)}
      ${A(100,160,.5)}
      <!-- forest row -->
      ${j(10,280,1.15)}
      ${M(70,300,1)}
      ${j(140,270,1.3)}
      ${M(210,295,.9)}
      ${j(280,275,1.2)}
      ${M(330,305,.85)}
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
      ${P(40,560)} ${P(120,570)} ${P(260,565)} ${P(340,575)}
    </svg>`}function T(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      ${A(60,95,.9)}
      ${A(170,125,.7)}
      ${A(90,155,.45)}
      <!-- dense flower meadow -->
      ${N(30,430,`#FF7043`,`#FFEB3B`,1.15)}
      ${N(75,460,`#EC407A`,`#FFF59D`,1)}
      ${N(120,420,`#AB47BC`,`#FFE082`,1.2)}
      ${N(165,470,`#42A5F5`,`#FFEE58`,.95)}
      ${N(210,435,`#FFA726`,`#FFF59D`,1.1)}
      ${N(255,465,`#EF5350`,`#FFEB3B`,.9)}
      ${N(300,425,`#7E57C2`,`#FFE082`,1.15)}
      ${N(345,455,`#26A69A`,`#FFF59D`,1)}
      ${N(50,520,`#F06292`,`#FFF59D`,.85)}
      ${N(140,530,`#5C6BC0`,`#FFEE58`,.9)}
      ${N(230,515,`#FF8A65`,`#FFEB3B`,1)}
      ${N(320,525,`#66BB6A`,`#FFF59D`,.85)}
      ${P(40,500)} ${P(100,545)} ${P(190,500)}
      ${P(270,540)} ${P(350,505)}
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
    </svg>`}function E(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      ${A(160,100,.7)}
      ${A(250,140,.5)}
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
    </svg>`}function D(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
      ${A(60,95,.85)}
      ${A(160,125,.55)}
      <!-- picket fence -->
      <g transform="translate(10,320)" opacity="0.9">
        ${Array.from({length:14},(e,t)=>`<rect x="${t*27}" y="16" width="14" height="50" rx="2" fill="#FFF8E1"/>
           <polygon points="${t*27},16 ${t*27+7},2 ${t*27+14},16" fill="#FFFDE7"/>`).join(``)}
        <rect x="0" y="32" width="370" height="6" fill="#FFE082"/>
        <rect x="0" y="48" width="370" height="5" fill="#FFE082"/>
      </g>
      <!-- sunflowers -->
      <g transform="translate(30,360)">
        <rect x="28" y="70" width="10" height="80" fill="#558B2F"/>
        ${Array.from({length:8},(e,t)=>{let n=t*Math.PI/4,r=33+Math.cos(n)*22,i=62+Math.sin(n)*22;return`<ellipse cx="${r}" cy="${i}" rx="9" ry="5" fill="#F9A825" transform="rotate(${t*45},${r},${i})"/>`}).join(``)}
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
      ${P(40,560)} ${P(150,570)} ${P(280,555)}
    </svg>`}function O(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
    </svg>`}function k(){return`
    <svg class="scene-svg" viewBox="${S}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
    </svg>`}function A(e,t,n=.85){return`
    <g class="cloud-shape" opacity="${n}" transform="translate(${e},${t})">
      <ellipse cx="0" cy="0" rx="36" ry="18" fill="#fff"/>
      <ellipse cx="28" cy="-6" rx="24" ry="16" fill="#fff"/>
      <ellipse cx="-26" cy="4" rx="20" ry="13" fill="#fff"/>
    </g>`}function j(e,t,n=1){return`
    <g transform="translate(${e},${t}) scale(${n})">
      <rect x="18" y="95" width="12" height="36" fill="#5D4037"/>
      <polygon points="24,8 55,60  -7,60" fill="#1B5E20"/>
      <polygon points="24,35 50,80  -2,80" fill="#2E7D32"/>
      <polygon points="24,60 44,100 4,100" fill="#388E3C"/>
    </g>`}function M(e,t,n=1){return`
    <g transform="translate(${e},${t}) scale(${n})">
      <rect x="26" y="75" width="14" height="50" fill="#6D4C41"/>
      <circle cx="33" cy="55" r="40" fill="#2E7D32"/>
      <circle cx="10" cy="68" r="26" fill="#388E3C"/>
      <circle cx="56" cy="65" r="28" fill="#1B5E20"/>
      <circle cx="33" cy="36" r="22" fill="#43A047"/>
    </g>`}function N(e,t,n,r,i=1){return`
    <g transform="translate(${e},${t}) scale(${i})">
      <line x1="0" y1="0" x2="0" y2="38" stroke="#558B2F" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-8" cy="10" rx="7" ry="4" fill="#7CB342" transform="rotate(-40)"/>
      <circle cx="0" cy="-12" r="10" fill="${n}"/>
      <circle cx="11" cy="-2" r="10" fill="${n}"/>
      <circle cx="6" cy="11" r="10" fill="${n}"/>
      <circle cx="-6" cy="11" r="10" fill="${n}"/>
      <circle cx="-11" cy="-2" r="10" fill="${n}"/>
      <circle cx="0" cy="0" r="7" fill="${r}"/>
    </g>`}function P(e,t){return`
    <g transform="translate(${e},${t})" stroke="#33691E" stroke-width="3" stroke-linecap="round" fill="none">
      <path d="M0,16 Q-6,2 -12,0"/>
      <path d="M0,16 Q0,-2 3,-6"/>
      <path d="M0,16 Q8,2 14,0"/>
    </g>`}function F(e,t,n=``,r=!0){return`
    <span class="animal-badge ${n} ${r?`face-right`:``}" style="--badge:${t}">
      <span class="animal-badge-inner" aria-hidden="true">${e}</span>
    </span>`}function I(e){let t=``;for(let n=0;n<7;n++){let r=(n+1)/8;t+=`<span class="path-dot ${e>=r?`lit`:``}" style="left:${8+r*72}%"></span>`}return t}var L={screen:`setup`,backgroundId:`wiese`,animalId:`kuh`,durationMin:5,totalMs:0,remainingMs:0,startedAt:0,paused:!1,pauseAccum:0,pauseStartedAt:0,raf:0,showTimeFlash:!1,timeFlashText:``,celebrationDone:!1};function R(e){let t=Math.round(Number(e)||1);return Math.min(240,Math.max(1,t))}function z(){return L.durationMin=R(L.durationMin),L.durationMin*60}function B(){return e.find(e=>e.id===L.animalId)||e[0]}function V(){return t.find(e=>e.id===L.backgroundId)||t[0]}function H(e){return`<div class="decor decor-${e}">${C(e)}</div>`}function U(e){let t=R(e);return{hours:Math.floor(t/60),minutes:t%60}}function W(e,t){L.durationMin=R(e*60+t)}function G(e){let t=z(),{hours:n,minutes:a}=U(L.durationMin),o=e.querySelector(`#duration-slider`),s=e.querySelector(`#duration-big`),c=e.querySelector(`.duration-hint strong`),l=e.querySelector(`#hours-val`),u=e.querySelector(`#minutes-val`),d=e.querySelector(`.slider-fill`);if(o&&Number(o.value)!==L.durationMin&&(o.value=String(L.durationMin)),s&&(s.textContent=r(t)),c&&(c.textContent=i(t)),l&&(l.textContent=String(n)),u&&(u.textContent=String(a).padStart(2,`0`)),d){let e=(L.durationMin-1)/239*100;d.style.width=`${e}%`}e.querySelectorAll(`[data-quick]`).forEach(e=>{e.classList.toggle(`selected`,Number(e.dataset.quick)===L.durationMin)})}function K(a){let o=B(),s=V(),c=z(),{hours:l,minutes:u}=U(L.durationMin),f=(L.durationMin-1)/239*100;a.innerHTML=`
    <div class="screen setup safe">
      <header class="setup-header">
        <h1 class="logo">🐾 Tier-Timer</h1>
        <p class="subtitle">Das Tier läuft zum Futter – so lange wie du magst!</p>
      </header>

      <section class="card">
        <h2>1. Hintergrund</h2>
        <div class="grid bg-grid" role="listbox" aria-label="Hintergrund">
          ${t.map(e=>`
            <button type="button" class="chip bg-chip ${e.id===L.backgroundId?`selected`:``}"
              data-bg="${e.id}" role="option" aria-selected="${e.id===L.backgroundId}">
              <span class="chip-preview" style="background:${e.gradient}"></span>
              <span class="chip-label">${e.name}</span>
            </button>`).join(``)}
        </div>
      </section>

      <section class="card">
        <h2>2. Tier & Futter</h2>
        <div class="grid animal-grid" role="listbox" aria-label="Tier">
          ${e.map(e=>`
            <button type="button" class="chip animal-chip ${e.id===L.animalId?`selected`:``}"
              data-animal="${e.id}" role="option" aria-selected="${e.id===L.animalId}">
              <span class="chip-emoji" aria-hidden="true">${e.emoji}</span>
              <span class="chip-label">${e.name}</span>
              <span class="chip-food">${e.foodEmoji} ${e.food}</span>
            </button>`).join(``)}
        </div>
      </section>

      <section class="card duration-card">
        <h2>3. Dauer</h2>
        <div class="duration-big-wrap">
          <div class="duration-big" id="duration-big">${r(c)}</div>
          <p class="duration-hint">Gewählt: <strong>${i(c)}</strong></p>
        </div>

        <div class="slider-block" aria-label="Dauer kontinuierlich einstellen">
          <div class="slider-track-bg">
            <div class="slider-fill" style="width:${f}%"></div>
            <input
              type="range"
              id="duration-slider"
              class="duration-slider"
              min="1"
              max="240"
              step="1"
              value="${L.durationMin}"
              aria-valuemin="1"
              aria-valuemax="240"
              aria-valuenow="${L.durationMin}"
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
            <div class="dial-value" id="hours-val">${l}</div>
            <div class="dial-unit">Std</div>
            <button type="button" class="dial-btn" data-dial="hours" data-dir="down" aria-label="Stunde minus">▼</button>
          </div>
          <div class="dial-colon">:</div>
          <div class="dial">
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="up" aria-label="Minute plus">▲</button>
            <div class="dial-value" id="minutes-val">${String(u).padStart(2,`0`)}</div>
            <div class="dial-unit">Min</div>
            <button type="button" class="dial-btn" data-dial="minutes" data-dir="down" aria-label="Minute minus">▼</button>
          </div>
        </div>

        <div class="quick-row">
          <button type="button" class="quick ${L.durationMin===1?`selected`:``}" data-quick="1">1 Min</button>
          <button type="button" class="quick ${L.durationMin===5?`selected`:``}" data-quick="5">5 Min</button>
          <button type="button" class="quick ${L.durationMin===10?`selected`:``}" data-quick="10">10 Min</button>
          <button type="button" class="quick ${L.durationMin===15?`selected`:``}" data-quick="15">15 Min</button>
          <button type="button" class="quick ${L.durationMin===30?`selected`:``}" data-quick="30">30 Min</button>
          <button type="button" class="quick ${L.durationMin===60?`selected`:``}" data-quick="60">1 Std</button>
          <button type="button" class="quick ${L.durationMin===120?`selected`:``}" data-quick="120">2 Std</button>
        </div>
        <p class="duration-range-note">1 Minute – 4 Stunden · Schieberegler für feine Einstellung</p>
      </section>

      <div class="preview-mini" style="background:${s.gradient}">
        <span class="preview-animal">${F(o.emoji,o.color)}</span>
        <span class="preview-path" aria-hidden="true">
          <span class="preview-road"></span>
        </span>
        <span class="preview-food">${o.foodEmoji}</span>
      </div>

      <button type="button" class="btn-start" id="btn-start">Start ▶</button>
    </div>
  `,a.querySelectorAll(`[data-bg]`).forEach(e=>{e.addEventListener(`click`,()=>{L.backgroundId=e.dataset.bg,$(a)})}),a.querySelectorAll(`[data-animal]`).forEach(e=>{e.addEventListener(`click`,()=>{L.animalId=e.dataset.animal,$(a)})});let p=a.querySelector(`#duration-slider`);if(p){let e=L.durationMin,t=()=>{L.durationMin=R(p.value),p.setAttribute(`aria-valuenow`,String(L.durationMin)),G(a),Math.abs(L.durationMin-e)>=2&&(te(),e=L.durationMin)};p.addEventListener(`input`,t),p.addEventListener(`change`,()=>{t(),e=L.durationMin})}function m(e,t){let{hours:n,minutes:r}=U(L.durationMin);if(e===`hours`)W(Math.min(4,Math.max(0,n+t)),n+t>=4?0:r);else{let e=r+t,i=n;e>59&&(i<4&&(i+=1),e=0),e<0&&(i>0?(--i,e=59):e=1),i===4&&(e=0),W(i,e)}L.durationMin<1&&(L.durationMin=1),G(a)}a.querySelectorAll(`.dial-btn`).forEach(e=>{let t=null,n=null,r=e.dataset.dial,i=e.dataset.dir===`up`?1:-1,a=()=>{clearTimeout(n),clearInterval(t),n=null,t=null};e.addEventListener(`pointerdown`,e=>{e.preventDefault(),m(r,i),a(),n=setTimeout(()=>{t=setInterval(()=>m(r,i),70)},350)}),e.addEventListener(`pointerup`,a),e.addEventListener(`pointerleave`,a),e.addEventListener(`pointercancel`,a)}),a.querySelectorAll(`[data-quick]`).forEach(e=>{e.addEventListener(`click`,()=>{L.durationMin=R(e.dataset.quick),G(a)})}),a.querySelector(`#btn-start`).addEventListener(`click`,async()=>{await d(),g(B().sound),L.totalMs=Math.min(n,Math.max(60,z()))*1e3,L.remainingMs=L.totalMs,L.startedAt=performance.now(),L.pauseAccum=0,L.paused=!1,L.celebrationDone=!1,L.screen=`running`,$(a),Q(a)})}function q(){return L.totalMs<=0?1:1-L.remainingMs/L.totalMs}function J(e){let t=B(),n=V(),i=Math.min(1,Math.max(0,q())),a=8+i*72;e.innerHTML=`
    <div class="screen running safe" style="background:${n.gradient}">
      ${H(n.decor)}
      <div class="countdown-wrap">
        <div class="countdown" id="countdown">${r(L.remainingMs/1e3)}</div>
        ${L.paused?`<div class="paused-badge">Pause</div>`:``}
      </div>

      <div class="scene" id="scene">
        <div class="path-track" aria-hidden="true">
          <div class="path-rail"></div>
          <div class="path-fill" style="width:${i*100}%">
            <span class="path-glow"></span>
          </div>
          <div class="path-dashes"></div>
          <div class="path-markers">${I(i)}</div>
        </div>
        <div class="path-start-flag" aria-hidden="true">🏁</div>
        <button type="button" class="animal-btn" id="animal-btn"
          style="left:${a}%"
          aria-label="${t.name} antippen für Geräusch und Restzeit">
          ${F(t.emoji,t.color,`hero ${L.paused?``:`walking`}`.trim(),!0)}
        </button>
        <div class="food-spot" aria-hidden="true">
          <span class="food-pulse"></span>
          <span class="food-emoji">${t.foodEmoji}</span>
          <span class="food-label">${t.food}</span>
        </div>
      </div>

      <div class="progress-caption" aria-hidden="true">
        <span class="progress-pct" id="progress-pct">${Math.round(i*100)}%</span><span class="progress-label">zum Futter</span>
      </div>

      <div class="time-flash ${L.showTimeFlash?`show`:``}" id="time-flash" aria-live="polite">
        ${L.timeFlashText}
      </div>

      <div class="parent-bar">
        <button type="button" class="btn-parent" id="btn-pause">${L.paused?`Weiter`:`Pause`}</button>
        <button type="button" class="btn-parent danger" id="btn-cancel">Abbrechen</button>
      </div>
    </div>
  `,e.querySelector(`#animal-btn`).addEventListener(`click`,()=>{X(e)}),e.querySelector(`#btn-pause`).addEventListener(`click`,()=>{ne(e)}),e.querySelector(`#btn-cancel`).addEventListener(`click`,()=>{re(e)})}function Y(e){let t=B(),r=V();e.innerHTML=`
    <div class="screen end safe" style="background:${r.gradient}">
      ${H(r.decor)}
      <div class="end-content">
        <div class="celebration" aria-hidden="true">
          <span class="confetti">🎉</span>
          <span class="confetti">✨</span>
          <span class="confetti">🎊</span>
          <span class="confetti">⭐</span>
        </div>
        <h1 class="end-title">Fertig!</h1>
        <p class="end-sub">${t.name} hat das Futter erreicht!</p>
        <div class="eat-scene">
          ${F(t.emoji,t.color,`eating big`,!0)}
          <span class="food-big">${t.foodEmoji}</span>
        </div>
        <p class="yum">Mjam mjam! 😋</p>
        <div class="end-actions">
          <button type="button" class="btn-start" id="btn-restart">Nochmal ▶</button>
          <button type="button" class="btn-parent" id="btn-back">Zurück</button>
        </div>
      </div>
    </div>
  `,L.celebrationDone||(L.celebrationDone=!0,g(t.sound),setTimeout(()=>_(),400),setTimeout(()=>ee(),900),b(`Fertig! Das Futter ist da!`)),e.querySelector(`#btn-restart`).addEventListener(`click`,async()=>{await d(),x(),L.totalMs=Math.min(n,Math.max(60,z()))*1e3,L.remainingMs=L.totalMs,L.startedAt=performance.now(),L.pauseAccum=0,L.paused=!1,L.celebrationDone=!1,L.screen=`running`,$(e),Q(e)}),e.querySelector(`#btn-back`).addEventListener(`click`,()=>{x(),Z(),L.screen=`setup`,$(e)})}function X(e){g(B().sound);let t=a(L.remainingMs/1e3);L.timeFlashText=r(L.remainingMs/1e3),L.showTimeFlash=!0,b(t);let n=e.querySelector(`#time-flash`);n&&(n.textContent=L.timeFlashText,n.classList.add(`show`)),clearTimeout(X._t),X._t=setTimeout(()=>{L.showTimeFlash=!1;let t=e.querySelector(`#time-flash`);t&&t.classList.remove(`show`)},2200)}function ne(e){L.paused?(L.pauseAccum+=performance.now()-L.pauseStartedAt,L.paused=!1):(L.paused=!0,L.pauseStartedAt=performance.now(),x()),J(e)}function re(e){x(),Z(),L.paused=!1,L.screen=`setup`,$(e)}function Z(){L.raf&&=(cancelAnimationFrame(L.raf),0)}function Q(e){Z();let t=n=>{if(L.screen===`running`){if(!L.paused){let t=n-L.startedAt-L.pauseAccum;if(L.remainingMs=Math.max(0,L.totalMs-t),ie(e),L.remainingMs<=0){Z(),L.screen=`end`,L.celebrationDone=!1,$(e);return}}L.raf=requestAnimationFrame(t)}};L.raf=requestAnimationFrame(t)}function ie(e){let t=e.querySelector(`#countdown`);t&&(t.textContent=r(L.remainingMs/1e3));let n=Math.min(1,Math.max(0,q())),i=8+n*72,a=e.querySelector(`#animal-btn`);a&&(a.style.left=`${i}%`);let o=e.querySelector(`.path-fill`);o&&(o.style.width=`${n*100}%`);let s=e.querySelector(`#progress-pct`);s&&(s.textContent=`${Math.round(n*100)}%`);let c=e.querySelector(`.path-markers`);c&&(c.innerHTML=I(n))}function $(e){L.screen===`setup`?K(e):L.screen===`running`?J(e):Y(e)}function ae(e){$(e)}ae(document.querySelector(`#app`)),document.addEventListener(`touchmove`,e=>{document.querySelector(`.screen.running, .screen.end`)},{passive:!0});