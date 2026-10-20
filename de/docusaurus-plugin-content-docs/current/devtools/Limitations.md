---
id: limitations
title: Einschränkungen des Trace-Modus
description: "Erfahren Sie, was der DevTools-Trace-Modus bewusst nicht erfasst, und welche bekannten Einschränkungen es bei den WebdriverIO-, Selenium- und Nightwatch-Adaptern gibt."
---

Was der [Trace-Modus](/docs/devtools/wdio/trace-mode) bewusst auslässt, sowie die bekannten Lücken bei den einzelnen Adaptern.

## Was der Trace-Modus auslässt

- **DevTools-UI-Fenster** — es wird keine Chrome-Instanz für das Dashboard geöffnet.
- **Backend-Port-Bindung** — es wird kein localhost-Port reserviert (einheitlich bei allen drei Adaptern ab v1.2+).
- **`screencast.enabled`** — die kontinuierliche `.webm`-Aufzeichnung des Live-Modus wird im Trace-Modus ignoriert (eine Warnung wird protokolliert). Stattdessen zeichnet der Trace-Modus **standardmäßig** einen dichten [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) im Archiv auf (setzen Sie `filmstrip: false` für ein Bild pro Aktion), sowie bei Aktivierung testbezogene [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video)-Abschnitte. Die **Feinabstimmungs**-Felder des Screencasts (`quality`, `maxWidth`, `pollIntervalMs`, …) gelten weiterhin für den jeweils laufenden Recorder.
- **`wdio-trace-<sessionId>.json`-Dump** — vollständig entfernt. Das alte monolithische JSON, das der WDIO-Live-Modus früher geschrieben hat, gibt es nicht mehr; der Live-Modus streamt jetzt an das Dashboard und schreibt nichts auf die Festplatte, und die `trace.zip` ist das einzige Trace-Artefakt.

## Bekannte Einschränkungen

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` fällt auf einen **einzigen sitzungsbezogenen Abschnitt** zurück: Nightwatch führt die einzelnen `it`s intern aus, ohne einen testbezogenen Hook, den das Plugin sehen kann, sodass der Abschnitt dem ersten Test zugeordnet wird. Die Erfassung von Metadaten (Status pro Testfall im Manifest) ist davon nicht betroffen, aber die Zuordnung von Trace/Screenshot/Video pro `it` sowie die wiederholungsbewusste Aufbewahrung werden für diese Schnittstelle auf Sitzungsebene herabgestuft. Die **Exports-Object**- und **Cucumber**-Schnittstellen von Nightwatch stellen Hooks pro Szenario/Test bereit und erhalten echte testbezogene Abschnitte. (WebdriverIO mocha/cucumber und Selenium mocha sind nicht betroffen.)
- **Wiederholungsbewusste Aufbewahrung in Nightwatch** — nur `retain-on-failure` funktioniert; andere wiederholungsbewusste Richtlinien werden herabgestuft, da Nightwatch einen Testfall bei `--retries` intern erneut ausführt, ohne die testbezogenen Hooks erneut auszulösen. Siehe [Aufbewahrung](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Allure-Anhänge in Nightwatch** — testbezogene `screenshot`/`video` werden nur erzeugt (Dateien + Manifest), aber nicht inline angehängt; siehe [Allure-Integration](/docs/devtools/allure).
- **Video/Filmstrip außerhalb von Chrome** — in Browsern ohne CDP-Push-Pfad fragt der Recorder `takeScreenshot` ab, was zusätzliche WebDriver-Roundtrips verursacht und (unter Allure) das Schrittprotokoll überflutet; kombinieren Sie dies mit den Optionen des Reporters zum Unterdrücken von Schritten.