---
id: screencast
title: Sitzungs-Screencast
description: "Browser-Sitzungen als .webm-Videos mit dem DevTools-Screencast aufzeichnen, Aufnahmeoptionen konfigurieren und die Ausgabedateien finden."
---

Zeichnet Browser-Sitzungen als `.webm`-Videos auf. Die Videos werden in der DevTools-Oberfläche neben den Snapshot- und DOM-Mutations-Ansichten angezeigt.

Verfügbar für alle drei Adapter – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** und **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. Der Aufnahmemodus unterscheidet sich je nach Framework (CDP-Push, wo möglich, ansonsten Polling – siehe [Browser-Unterstützung](#browser-support) weiter unten).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Einrichtung

Die Screencast-Kodierung erfordert die **ffmpeg**-Binärdatei im `PATH`. Der `fluent-ffmpeg`-Wrapper wird zusammen mit dem Adapter installiert, sodass nichts weiter hinzugefügt werden muss:

```sh
# Install ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian
```

Ohne ffmpeg läuft der Recorder trotzdem, aber der Kodierungsschritt protokolliert eine Warnung und schreibt keine Datei.

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
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Bildformat der Frames. **Nur Chrome/Chromium** – steuert das Format, das Chrome über CDP sendet. Wird im Polling-Modus (Firefox, Safari) ignoriert, in dem Screenshots immer PNG sind. Beeinflusst nicht den Container des Ausgabevideos, der immer `.webm` ist |
| `quality` | `number` | `70` | JPEG-Kompressionsqualität 0–100. Gilt nur im CDP-Modus von Chrome/Chromium mit `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Maximale Frame-Breite in Pixeln. **Nur Chrome/Chromium** – Chrome skaliert die Frames, bevor sie über CDP gesendet werden. Wird im Polling-Modus ignoriert |
| `maxHeight` | `number` | `720` | Maximale Frame-Höhe in Pixeln. **Nur Chrome/Chromium** – wie oben |
| `pollIntervalMs` | `number` | `200` | Screenshot-Intervall in Millisekunden für Nicht-Chrome-Browser (Polling-Modus). Niedriger = flüssigeres Video, aber mehr WebDriver-Roundtrips während der Testausführung |
| `maxBufferFrames` | `number` | `2000` | Obergrenze für im Speicher gehaltene Frames. Wird sie überschritten, wird der Puffer direkt ausgedünnt, wobei der erste und der letzte Frame erhalten bleiben |

## Browser-Unterstützung

Die Aufzeichnung funktioniert in allen gängigen Browsern dank automatischer Modusauswahl:

| Browser | Modus | Hinweise |
|---|---|---|
| Chrome / Chromium / Edge | **CDP-Push** | Chrome sendet Frames über das DevTools Protocol. Effizient – kein Einfluss auf das Timing der Testbefehle |
| Firefox / Safari / andere | **BiDi-Polling** | Greift darauf zurück, `browser.takeScreenshot()` in Intervallen von `pollIntervalMs` aufzurufen. Funktioniert überall dort, wo WebDriver-Screenshots unterstützt werden; verursacht einen kleinen Mehraufwand proportional zum Intervall |

Für den Moduswechsel ist keine Konfigurationsänderung nötig – der Service erkennt die Browser-Fähigkeiten automatisch und protokolliert, welcher Modus aktiv ist.

## Verhalten

- Die Aufzeichnung beginnt, wenn die Browser-Sitzung geöffnet wird, und endet, wenn sie geschlossen wird.
- Leere Frames am Anfang (aufgenommen vor der ersten URL-Navigation) werden automatisch entfernt, sodass Videos mit der ersten sinnvollen Seitenaktion beginnen.
- Wird `browser.reloadSession()` während eines Laufs aufgerufen, schließt der Service die aktuelle Aufzeichnung ab und startet eine neue für die neue Sitzung. Jede Sitzung erzeugt ihre eigene `.webm`-Datei.
- Wenn mehrere Aufzeichnungen vorhanden sind, zeigt die DevTools-Oberfläche ein **Recording N**-Dropdown an, um zwischen ihnen zu wechseln.

### Wo die Ausgabedateien landen

Jeder Adapter schreibt in einen `test-results/`-Ordner; das Basisverzeichnis, in dem dieser liegt, unterscheidet sich jedoch, da die Adapter zwar einen gemeinsamen Resolver nutzen, ihm aber unterschiedliche Eingaben übergeben:

| Adapter | Ausgabeort |
|---|---|
| **WebdriverIO** | `<outputDir>/test-results/`, wenn `outputDir` explizit in `wdio.conf.ts` gesetzt ist, andernfalls `<rootDir>/test-results/` (`rootDir` ist das Verzeichnis, das die Konfiguration enthält). Vermeiden Sie es, `outputDir` nur zur Steuerung der Videopfade zu setzen – WDIO leitet auch die Worker-Logs dorthin um. |
| **Selenium** | `test-results/` im Verzeichnis der gerade ausgeführten Testdatei, mit `process.cwd()` als Fallback. |
| **Nightwatch** | `test-results/` im Verzeichnis der Testdatei, mit dem Verzeichnis, das `nightwatch.conf.*` enthält, und danach `process.cwd()` als Fallback. |

Verzeichnisse unter `node_modules/` werden auf dem Selenium-/Nightwatch-Pfad übersprungen, damit verlinkte Workspaces (Symlinks) keine Videos in einem Abhängigkeitsordner ablegen, und ein nicht beschreibbares Verzeichnis führt zum nächsten Kandidaten.

## Ausgabedateien

Der Live-Modus streamt die erfassten Daten per WebSocket an das Dashboard und schreibt **keine Trace-Datei auf die Festplatte** – für ein portables Artefakt verwenden Sie den [Trace-Modus](/docs/devtools/wdio/trace-mode) (`trace.zip`). Die einzige Datei, die der Live-Modus schreibt, ist das Screencast-Video, und zwar nur bei `screencast.enabled: true`. Die Dateinamen sind adapterspezifisch (der Framework-Name erscheint im Präfix):

| Adapter | Screencast-Video |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |