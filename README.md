# Tier-Timer 🐄⏱️

Kindgerechte Progressive Web App (PWA): Ein Tier läuft sichtbar zum Futter – so lange wie die gewählte Zeit. Ideal für Kinder ab ca. 5 Jahren (z. B. Wartezeiten, Zähneputzen, Bildschirmzeit).

**Deutsch · mobil zuerst (iPhone Safari) · ohne Backend · ohne Tracking**

Live: https://jeromesnca.github.io/tier-timer/

## Funktionen

- **Einrichtung (Eltern):** Hintergrund, Tier + Futter, Dauer (1 Minute bis 4 Stunden)
- **Dauer-UX:** großer Schieberegler (1–240 Min, kontinuierlich), plus Std/Min-Tasten und Schnellwahl
- **Laufender Timer:** große Countdown-Anzeige, Tier bewegt sich entlang eines dicken, gut sichtbaren Pfads zum Futter (Fortschrittsbalken, Leuchtpunkt, Markierungspunkte, Prozent)
- **Antippen des Tiers:** Tierlaut + Restzeit per Sprache (`speechSynthesis`, `de-DE`) und großer Einblendung
- **Ende:** Tier erreicht das Futter, Mampf- und Feier-Sounds, Neustart / Zurück
- **PWA:** zum Home-Bildschirm hinzufügbar, offlinefähig per Service Worker

### Hintergründe
Wald, Wiese, Stall, Garten, Aquarium, Wohnzimmer (SVG/CSS-Szenen)

### Tiere & Futter
| Tier | Futter |
|------|--------|
| Kuh 🐄 | Gras & Heu 🌾 |
| Pferd 🐴 | Apfel & Heu 🍎 |
| Huhn 🐔 | Körner 🌽 |
| Schwein 🐷 | Äpfel & Rüben 🥕 |
| Hund 🐶 | Knochen & Napf 🦴 |
| Katze 🐱 | Fisch & Milch 🐟 |
| Goldfisch 🐠 | Flocken 🫧 |

## Voraussetzungen

- Node.js 18+ (empfohlen: 20+)
- npm

## Lokal starten

```bash
cd tier-timer
npm install
npm run dev
```

Dann im Browser die angezeigte URL öffnen (z. B. `http://localhost:5173`). Am besten mit dem Smartphone im selben WLAN oder mit den Entwicklertools im Mobilmodus.

### Produktions-Build

```bash
npm run build
npm run preview
```

Der fertige statische Build liegt in `dist/` und kann auf jedem Static-Host ausgeliefert werden (Netlify, Cloudflare Pages, GitHub Pages, Nginx, …).

## GitHub Pages

Dieses Repo ist für GitHub Pages unter `./` Base-Pfad gebaut (`vite.config.js` → `base: './'`). Nach Push auf `master`/`main` den Pages-Build aus dem `dist/`-Ordner bzw. der gewählten Branch/Action-Pipeline neu auslösen.

## Auf dem iPhone zum Home-Bildschirm

1. App im **Safari**-Browser öffnen (nicht Chrome/Firefox – „Zum Home-Bildschirm“ funktioniert zuverlässig in Safari).
2. Teilen-Symbol (Quadrat mit Pfeil nach oben) tippen.
3. **„Zum Home-Bildschirm“** wählen.
4. Namen ggf. belassen („Tier-Timer“) und **Hinzufügen**.

Die App öffnet sich danach im Vollbild (Standalone).

## Sounds – technischer Ansatz

Es gibt **keine Audio-Dateien** im Repo. Alle Geräusche werden **prozedural** mit der **Web Audio API** erzeugt (`src/sounds.js`):

- Tierlaute (Kuh, Pferd, Huhn, Schwein, Hund, Katze, Fisch/Blasen) mit Formanten/Vibrato
- Mampf-Geräusche und kurze Feiermelodie am Ende

**iOS / Safari:** Audio darf erst nach einer Benutzeraktion starten. Beim Tippen auf **Start** wird `AudioContext` freigeschaltet (`unlockAudio()`). Ohne diesen Unlock bleiben Sounds stumm.

**Sprache:** Restzeit und Abschluss nutzen `window.speechSynthesis` mit `lang: 'de-DE'`. Verfügbarkeit und Stimme hängen vom Gerät/OS ab; bei manchen iOS-Einstellungen kann Sprache leise sein oder eine Bestätigung brauchen.

## Einschränkungen

- Prozedurale Sounds klingen spielerisch, nicht wie echte Aufnahmen.
- `speechSynthesis` und Audio können auf iOS im Hintergrund oder bei Stumm-Schalter eingeschränkt sein.
- Portrait-first; Querformat funktioniert, ist aber nicht der Fokus.
- Kein Server, keine Accounts, keine Speicherung der letzten Auswahl (Session nur im Speicher).

## Projektstruktur

```
tier-timer/
├── index.html
├── vite.config.js          # Vite + PWA (Manifest & Service Worker)
├── public/
│   ├── favicon.svg
│   └── icons/              # 192 & 512 PNG
├── src/
│   ├── main.js
│   ├── app.js              # UI & Timer-Logik
│   ├── data.js             # Tiere, Hintergründe, Zeitformat
│   ├── visuals.js          # SVG-Szenen & Pfad-Markierungen
│   ├── sounds.js           # Web Audio (prozedural)
│   ├── speech.js           # speechSynthesis de-DE
│   └── style.css
└── README.md
```

## Lizenz

Frei nutzbar für private und pädagogische Zwecke.
