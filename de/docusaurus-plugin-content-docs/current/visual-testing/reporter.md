---
id: visual-reporter
title: Visual Reporter
description: "Generieren und durchsuchen Sie den Visual Reporter, um visuelle Test-Diffs aus der JSON-Ausgabe von @wdio/visual-service lokal oder in CI zu überprüfen."
---

Der Visual Reporter ist eine neue Funktion, die im `@wdio/visual-service` ab Version [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0) eingeführt wurde. Dieser Reporter ermöglicht es Benutzern, die vom Visual Testing Service generierten JSON-Diff-Berichte zu visualisieren und in ein menschenlesbares Format umzuwandeln. Er hilft Teams, die Ergebnisse visueller Tests besser zu analysieren und zu verwalten, indem er eine grafische Oberfläche zur Überprüfung der Ausgabe bereitstellt.

Um diese Funktion zu nutzen, stellen Sie sicher, dass Sie die erforderliche Konfiguration haben, um die notwendige `output.json`-Datei zu generieren. Dieses Dokument führt Sie durch die Einrichtung, Ausführung und das Verständnis des Visual Reporters.

# Voraussetzungen

Bevor Sie den Visual Reporter verwenden, stellen Sie sicher, dass Sie den Visual Testing Service so konfiguriert haben, dass er JSON-Berichtsdateien generiert:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Generiert die output.json-Datei
            },
        ],
    ],
};
```

Ausführlichere Einrichtungsanweisungen finden Sie in der WebdriverIO [Visual Testing Dokumentation](./) oder unter [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installation

Um den Visual Reporter zu installieren, fügen Sie ihn mit npm als Entwicklungsabhängigkeit zu Ihrem Projekt hinzu:

```bash
npm install @wdio/visual-reporter --save-dev
```

Dadurch wird sichergestellt, dass die notwendigen Dateien verfügbar sind, um Berichte aus Ihren visuellen Tests zu generieren.

# Verwendung

## Erstellen des visuellen Berichts

Sobald Sie Ihre visuellen Tests ausgeführt haben und diese die `output.json`-Datei generiert haben, können Sie den visuellen Bericht entweder über die CLI oder über interaktive Eingabeaufforderungen erstellen.

### CLI-Verwendung

Sie können den CLI-Befehl verwenden, um den Bericht zu generieren, indem Sie Folgendes ausführen:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Erforderliche Optionen:

-   `--jsonOutput`: Der relative Pfad zur `output.json`-Datei, die vom Visual Testing Service generiert wurde. Dieser Pfad ist relativ zu dem Verzeichnis, aus dem Sie den Befehl ausführen.
-   `--reportFolder`: Das relative Verzeichnis, in dem der generierte Bericht gespeichert wird. Dieser Pfad ist ebenfalls relativ zu dem Verzeichnis, aus dem Sie den Befehl ausführen.

#### Optionale Optionen:

-   `--logLevel`: Auf `debug` setzen, um detaillierte Protokollierung zu erhalten, besonders nützlich bei der Fehlerbehebung.

#### Beispiel

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Dadurch wird der Bericht im angegebenen Ordner generiert und eine Rückmeldung in der Konsole ausgegeben. Zum Beispiel:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Anzeigen des Berichts

:::warning
Das direkte Öffnen von `path/to/report/index.html` in einem Browser, **ohne es über einen lokalen Server bereitzustellen**, wird **NICHT** funktionieren.
:::

Um den Bericht anzuzeigen, müssen Sie einen einfachen Server wie [sirv-cli](https://www.npmjs.com/package/sirv-cli) verwenden. Sie können den Server mit folgendem Befehl starten:

```bash
npx sirv-cli /path/to/report --single
```

Dies erzeugt Protokolle ähnlich dem folgenden Beispiel. Beachten Sie, dass die Portnummer variieren kann:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Sie können den Bericht nun anzeigen, indem Sie die angegebene URL in Ihrem Browser öffnen.

### Verwendung interaktiver Eingabeaufforderungen

Alternativ können Sie den folgenden Befehl ausführen und die Eingabeaufforderungen beantworten, um den Bericht zu generieren:

```bash
npx @wdio/visual-reporter
```

Die Eingabeaufforderungen führen Sie durch die Angabe der erforderlichen Pfade und Optionen. Am Ende fragt die interaktive Eingabeaufforderung auch, ob Sie einen Server starten möchten, um den Bericht anzuzeigen. Wenn Sie sich dafür entscheiden, den Server zu starten, startet das Tool einen einfachen Server und zeigt eine URL in den Protokollen an. Sie können diese URL in Ihrem Browser öffnen, um den Bericht anzuzeigen.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Anzeigen des Berichts

:::warning
Das direkte Öffnen von `path/to/report/index.html` in einem Browser, **ohne es über einen lokalen Server bereitzustellen**, wird **NICHT** funktionieren.
:::

Wenn Sie sich entschieden haben, den Server **nicht** über die interaktive Eingabeaufforderung zu starten, können Sie den Bericht dennoch anzeigen, indem Sie den folgenden Befehl manuell ausführen:

```bash
npx sirv-cli /path/to/report --single
```

Dies erzeugt Protokolle ähnlich dem folgenden Beispiel. Beachten Sie, dass die Portnummer variieren kann:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Sie können den Bericht nun anzeigen, indem Sie die angegebene URL in Ihrem Browser öffnen.

# Bericht-Demo

Um ein Beispiel dafür zu sehen, wie der Bericht aussieht, besuchen Sie unsere [GitHub Pages Demo](https://webdriverio.github.io/visual-testing/).

# Den visuellen Bericht verstehen

Der Visual Reporter bietet eine übersichtliche Ansicht Ihrer visuellen Testergebnisse. Für jeden Testlauf können Sie:

-   Einfach zwischen Testfällen navigieren und aggregierte Ergebnisse sehen.
-   Metadaten wie Testnamen, verwendete Browser und Vergleichsergebnisse überprüfen.
-   Diff-Bilder anzeigen, die zeigen, wo visuelle Unterschiede erkannt wurden.

Diese visuelle Darstellung vereinfacht die Analyse Ihrer Testergebnisse und erleichtert es, visuelle Regressionen zu identifizieren und zu beheben.

# CI-Integrationen

Wir arbeiten an der Unterstützung verschiedener CI-Tools wie Jenkins, GitHub Actions und so weiter. Wenn Sie uns helfen möchten, kontaktieren Sie uns bitte auf [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).