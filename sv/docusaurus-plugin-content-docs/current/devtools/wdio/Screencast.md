---
id: screencast
title: Skärminspelning av session
description: "Spela in webbläsarsessioner som .webm-videor med DevTools screencast, konfigurera inspelningsalternativ och hitta utdatafilerna."
---

Spelar in webbläsarsessioner som `.webm`-videor. Videorna visas i DevTools-gränssnittet tillsammans med vyerna för ögonblicksbilder och DOM-mutationer.

Tillgängligt i alla tre adaptrar – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** och **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. Inspelningsläget skiljer sig mellan ramverken (CDP push där det är möjligt, annars polling – se [Webbläsarstöd](#browser-support) nedan).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Installation

Kodning av skärminspelningar kräver **ffmpeg** i `PATH` samt paketet `fluent-ffmpeg`:

```sh
# Installera ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# Installera fluent-ffmpeg
npm install fluent-ffmpeg
```

## Konfiguration

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Alternativ

| Alternativ | Typ | Standard | Beskrivning |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Aktivera sessionsinspelning |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Bildformat för bildrutor. **Endast Chrome/Chromium** – styr formatet som Chrome skickar över CDP. Ignoreras i polling-läge (Firefox, Safari) där skärmbilder alltid är PNG. Påverkar inte videocontainern för utdata, som alltid är `.webm` |
| `quality` | `number` | `70` | JPEG-komprimeringskvalitet 0–100. Gäller endast i Chrome/Chromium CDP-läge med `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Maximal bredd på bildrutor i pixlar. **Endast Chrome/Chromium** – Chrome skalar bildrutorna innan de skickas över CDP. Ignoreras i polling-läge |
| `maxHeight` | `number` | `720` | Maximal höjd på bildrutor i pixlar. **Endast Chrome/Chromium** – samma som ovan |
| `pollIntervalMs` | `number` | `200` | Intervall för skärmbilder i millisekunder för andra webbläsare än Chrome (polling-läge). Lägre värde = jämnare video men fler WebDriver-anrop under testkörningen |

## Webbläsarstöd

Inspelning fungerar i alla större webbläsare med automatiskt val av läge:

| Webbläsare | Läge | Anmärkningar |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome skickar bildrutor över DevTools Protocol. Effektivt – ingen påverkan på tidsåtgången för testkommandon |
| Firefox / Safari / övriga | **BiDi polling** | Faller tillbaka på att anropa `browser.takeScreenshot()` med `pollIntervalMs`-intervall. Fungerar överallt där WebDriver-skärmbilder stöds; ger en liten extra belastning som är proportionell mot intervallet |

Ingen konfigurationsändring krävs för att byta läge – tjänsten identifierar webbläsarens funktioner automatiskt och loggar vilket läge som är aktivt.

## Beteende

- Inspelningen startar när webbläsarsessionen öppnas och stoppas när den stängs.
- Inledande tomma bildrutor (inspelade före den första URL-navigeringen) trimmas automatiskt bort så att videorna börjar vid den första meningsfulla sidåtgärden.
- Om `browser.reloadSession()` anropas mitt under körningen slutför tjänsten den aktuella inspelningen och startar en ny för den nya sessionen. Varje session ger en egen `.webm`-fil.
- När det finns flera inspelningar visar DevTools-gränssnittet en **Recording N**-rullgardinsmeny för att växla mellan dem.

### Var utdatafilerna hamnar

Katalogen som varje adapter väljer skiljer sig något – de delar alla samma resolver i `@wdio/devtools-core` men ger den olika indata:

| Adapter | Utdataplats |
|---|---|
| **WebdriverIO** | `outputDir` om den uttryckligen anges i `wdio.conf.ts`, annars `rootDir` (katalogen som innehåller konfigurationen). Undvik att ange `outputDir` enbart för att styra videosökvägar – WDIO omdirigerar även worker-loggar dit. |
| **Selenium** | Katalogen för testfilen som just kördes, med `process.cwd()` som reserv. |
| **Nightwatch** | Katalogen för testfilen, med katalogen som innehåller `nightwatch.conf.*` som reserv, därefter `process.cwd()`. |

Kataloger under `node_modules/` hoppas över i Selenium/Nightwatch-sökvägen så att symlänkade arbetsytor inte lägger videor i en beroendemapp.

## Utdatafiler

Live-läget strömmar insamlad data till instrumentpanelen via WebSocket och skriver **ingen trace-fil till disk** – för en portabel artefakt, använd [trace-läge](/docs/devtools/wdio/trace-mode) (`trace.zip`). Den enda fil som live-läget skriver är skärminspelningsvideon, och endast när `screencast.enabled: true`. Filnamnen är adapterspecifika (ramverkets namn ingår i prefixet):

| Adapter | Skärminspelningsvideo |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |