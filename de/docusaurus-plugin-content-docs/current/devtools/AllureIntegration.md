---
id: allure
title: Allure-Integration
description: "Hängen Sie Artefakte des DevTools-Trace-Modus wie Trace-Zips, Screenshots und Videos automatisch an Ihren Allure-Bericht an."
---

Artefakte des Trace-Modus — das Trace-Zip sowie der Screenshot und das Video jedes einzelnen Tests — werden automatisch an einen Allure-Bericht angehängt, sodass Sie sie direkt aus dem Bericht heraus öffnen können. Unter [Trace Mode](/docs/devtools/wdio/trace-mode) erfahren Sie, wie Sie den Trace-Modus aktivieren und diese Artefakte erzeugen.

Wenn ein Allure-Reporter vorhanden ist, werden Artefakte des Trace-Modus automatisch an den Allure-Bericht angehängt — ohne zusätzliche Verdrahtung:

- **`traceGranularity: 'test'`** — `trace.zip` (`application/zip`, ein Download, der sich in `show-trace` öffnet), `screenshot` (`image/png`, inline) und `video` (`video/webm`, inline) jedes Tests werden an die Karte des jeweiligen Tests angehängt. Dies ist die Granularität, die Sie für einen Allure-Bericht pro Test verwenden sollten. Für die Kodierung des `video` pro Test wird `ffmpeg` im `PATH` benötigt.
- **`traceGranularity: 'session'` / `'spec'`** — ein Trace, der eine ganze Session bzw. Spec umfasst, wird auf die Festplatte geschrieben und im [Artefakt-Manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) aufgeführt, aber **nicht** an einzelne Testkarten angehängt: Ein Session-/Spec-Trace wird erst finalisiert, nachdem alle zugehörigen Tests gelaufen sind. Zu diesem Zeitpunkt sind deren Allure-Karten bereits geschlossen, und es gibt keinen offenen Test mehr, an den angehängt werden könnte. Um ihn dennoch sichtbar zu machen, verarbeiten Sie das Manifest in Ihrem eigenen `onComplete`-Hook nach.

Unterstützung pro Adapter:

| Adapter | Anhängemechanismus |
|---|---|
| **WebdriverIO** | Vollwertig über `addAttachment` von `@wdio/allure-reporter`. |
| **Selenium** | Über `attachment()` von `allure-js-commons` — laufzeitunabhängig, hängt unter jedem Allure-Runner-Adapter an, sofern eine aktive `allure-js-commons`-Laufzeit vorhanden ist. |
| **Nightwatch** | **Nur Erzeugung** — Dateien und Manifest werden geschrieben, aber nicht inline angehängt (keine Live-Allure-Attach-API). |

**Eingebetteter Trace-Viewer.** Da das Archiv ein portables, standardisiertes Trace-Viewer-Format auf der Festplatte verwendet, kann der **eingebettete Trace-Viewer** eines Allure-Berichts (Allure ≥ 2.35) das angehängte `trace.zip` direkt im Bericht öffnen.

**Rauschen im Bericht.** Im Trace-Modus erstellt die Aufzeichnung pro Aktion einen `takeScreenshot`, um die Zeitleiste aufzubauen; Allure protokolliert jeden WebDriver-Befehl als Schritt und einen Screenshot pro `takeScreenshot`. Unterdrücken Sie diese Flut mit den eigenen Optionen des Reporters — die Trace-, Screenshot- und Video-Anhänge sind davon nicht betroffen:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```