---
id: screencast
title: Sitzungs-Screencast
description: "Browser-Sitzungen mit dem DevTools-Screencast als .webm-Videos aufzeichnen, Aufnahmeoptionen konfigurieren und die Ausgabedateien finden."
---

Zeichnet Browser-Sitzungen als `.webm`-Videos auf. Die Videos werden in der DevTools-Oberfläche neben den Snapshot- und DOM-Mutationsansichten angezeigt.

Verfügbar für alle drei Adapter – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** und **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. Der Aufnahmemodus unterscheidet sich je nach Framework (CDP-Push, wo möglich, ansonsten Polling – siehe [Browser-Unterstützung](#browser-support) weiter unten).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Einrichtung

Die Screencast-Kodierung erfordert **ffmpeg** im `PATH` sowie das Paket `fluent-ffmpeg`:

```sh
# ffmpeg installieren - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# fluent-ffmpeg installieren
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

## Optionen

| Option | Typ | Standard | Beschreibung |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Sitzungsaufzeichnung aktivieren |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Bildformat der Frames. **Nur Chrome/Chromium** – steuert das Format, das Chrome über CDP sendet. Wird im Polling-Modus (Firefox, Safari) ignoriert, in dem Screenshots immer PNG sind. Hat keinen Einfluss auf den Container des Ausgabevideos, der immer `.webm` ist |
| `quality` | `number` | `70` | JPEG-Kompressionsqualität 0–100. Gilt nur im CDP-Modus von Chrome/Chromium mit `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Maximale Frame-Breite in Pixeln. **Nur Chrome/Chromium** – Chrome skaliert die Frames vor dem Senden über CDP. Wird im Polling-Modus ignoriert |
| `maxHeight` | `number` | `720` | Maximale Frame-Höhe in Pixeln. **Nur Chrome/Chromium** – wie oben |
| `pollIntervalMs` | `number` | `200` | Screenshot-Intervall in Millisekunden für Nicht-Chrome-Browser (Polling-Modus). Niedriger = flüssigeres Video, aber mehr WebDriver-Roundtrips während der Testausführung |

## Browser-Unterstützung

Die Aufzeichnung funktioniert in allen gängigen Browsern dank automatischer Modusauswahl:

| Browser | Modus | Hinweise |
|---|---|---|
| Chrome / Chromium / Edge | **CDP-Push** | Chrome sendet Frames über das DevTools Protocol. Effizient – kein Einfluss auf das Timing der Testbefehle |
| Firefox / Safari / andere | **BiDi-Polling** | Greift darauf zurück, `browser.takeScreenshot()` im Abstand von `pollIntervalMs` aufzurufen. Funktioniert überall, wo WebDriver-Screenshots unterstützt werden; verursacht einen geringen Mehraufwand proportional zum Intervall |

Zum Wechseln des Modus ist keine Konfigurationsänderung nötig – der Service erkennt die Browser-Fähigkeiten automatisch und protokolliert, welcher Modus aktiv ist.

## Verhalten

- Die Aufzeichnung beginnt, wenn die Browser-Sitzung geöffnet wird, und endet, wenn sie geschlossen wird.
- Leere Frames am Anfang (aufgenommen vor der ersten URL-Navigation) werden automatisch entfernt, sodass Videos mit der ersten sinnvollen Seitenaktion beginnen.
- Wird `browser.reloadSession()` während des Laufs aufgerufen, schließt der Service die aktuelle Aufzeichnung ab und startet eine neue für die neue Sitzung. Jede Sitzung erzeugt ihre eigene `.webm`-Datei.
- Wenn mehrere Aufzeichnungen vorhanden sind, zeigt die DevTools-Oberfläche ein Dropdown **Recording N** an, um zwischen ihnen zu wechseln.

### Wo die Ausgabedateien abgelegt werden

Das Verzeichnis, das jeder Adapter wählt, unterscheidet sich leicht – alle nutzen denselben Resolver in `@wdio/devtools-core`, übergeben ihm aber unterschiedliche Eingaben:

| Adapter | Ausgabeort |
|---|---|
| **WebdriverIO** | `outputDir`, falls explizit in `wdio.conf.ts` gesetzt, ansonsten `rootDir` (das Verzeichnis, das die Konfiguration enthält). Vermeide es, `outputDir` nur zur Steuerung der Videopfade zu setzen – WDIO leitet auch die Worker-Logs dorthin um. |
| **Selenium** | Verzeichnis der zuletzt ausgeführten Testdatei, ersatzweise `process.cwd()`. |
| **Nightwatch** | Verzeichnis der Testdatei, ersatzweise das Verzeichnis, das `nightwatch.conf.*` enthält, danach `process.cwd()`. |

Verzeichnisse unter `node_modules/` werden auf dem Selenium-/Nightwatch-Pfad übersprungen, damit verlinkte Workspaces (Symlinks) keine Videos in einem Abhängigkeitsordner ablegen.

## Ausgabedateien

Der Live-Modus streamt die erfassten Daten über WebSocket an das Dashboard und schreibt **keine Trace-Datei auf die Festplatte** – für ein portables Artefakt verwende den [Trace-Modus](/docs/devtools/wdio/trace-mode) (`trace.zip`). Die einzige Datei, die der Live-Modus schreibt, ist das Screencast-Video, und zwar nur bei `screencast.enabled: true`. Die Dateinamen sind adapterspezifisch (der Framework-Name erscheint im Präfix):

| Adapter | Screencast-Video |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |