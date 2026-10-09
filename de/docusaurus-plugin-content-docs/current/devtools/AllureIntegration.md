---
id: allure
title: Allure-Integration
description: "Hängen Sie DevTools-Trace-Mode-Artefakte wie Trace-Zips, Screenshots und Videos automatisch an Ihren Allure-Report an."
---

Trace-Mode-Artefakte — das Trace-Zip sowie der Screenshot und das Video jedes einzelnen Tests — werden automatisch an einen Allure-Report angehängt, sodass Sie sie direkt aus dem Report heraus öffnen können. Unter [Trace Mode](/docs/devtools/wdio/trace-mode) erfahren Sie, wie Sie den Trace Mode aktivieren und diese Artefakte erzeugen.

Wenn ein Allure-Reporter vorhanden ist, werden Trace-Mode-Artefakte automatisch an den Allure-Report angehängt — ganz ohne zusätzliche Konfiguration:

- **`traceGranularity: 'test'`** — das `trace.zip` jedes Tests (`application/zip`, ein Download, der sich in `show-trace` öffnet), der `screenshot` (`image/png`, inline) und das `video` (`video/webm`, inline) werden an die Karte des jeweiligen Tests angehängt. Dies ist die Granularität, die Sie für einen Allure-Report pro Test verwenden sollten.
- **`traceGranularity: 'session'` / `'spec'`** — ein Trace, der eine gesamte Session/Spec umfasst, wird auf die Festplatte geschrieben und im [Artefakt-Manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) aufgeführt, aber **nicht** an einzelne Testkarten angehängt: Ein Session-/Spec-Trace wird erst abgeschlossen, nachdem alle zugehörigen Tests gelaufen sind. Zu diesem Zeitpunkt sind deren Allure-Karten bereits geschlossen, und es gibt keinen offenen Test mehr, an den angehängt werden könnte. Um ihn dennoch sichtbar zu machen, verarbeiten Sie das Manifest in Ihrem eigenen `onComplete`-Hook nach.

Unterstützung pro Adapter:

| Adapter | Anhängemechanismus |
|---|---|
| **WebdriverIO** | Vollständig unterstützt über `addAttachment` von `@wdio/allure-reporter`. |
| **Selenium** | Über `attachment()` von `allure-js-commons` — laufzeitunabhängig, hängt unter jedem Allure-Runner-Adapter an, sofern eine aktive `allure-js-commons`-Laufzeit vorhanden ist. |
| **Nightwatch** | **Nur Erzeugung** — Dateien und Manifest werden geschrieben, aber nicht inline angehängt (keine Live-Allure-Attach-API). |

**Eingebetteter Trace Viewer.** Da das Archiv ein portables, standardisiertes Trace-Viewer-Dateiformat verwendet, kann der **eingebettete Trace Viewer** eines Allure-Reports (Allure ≥ 2.35) das angehängte `trace.zip` direkt im Report öffnen.

**Rauschen im Report.** Im Trace Mode erstellt die Aufzeichnung pro Aktion einen `takeScreenshot`, um die Zeitleiste aufzubauen; Allure protokolliert jeden WebDriver-Befehl als Schritt und einen Screenshot pro `takeScreenshot`. Unterdrücken Sie diese Flut mit den eigenen Optionen des Reporters — die Trace-, Screenshot- und Video-Anhänge sind davon nicht betroffen:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```