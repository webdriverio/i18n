---
id: coverage
title: Abdeckung
description: "Erfassen Sie die Code-Abdeckung für Komponententests mit dem Browser-Runner, der Ihren Code über Vite mit istanbul instrumentiert."
---

Der Browser-Runner von WebdriverIO unterstützt die Berichterstattung über Code-Abdeckung mit [`istanbul`](https://istanbul.js.org/). Der Testrunner instrumentiert Ihren Code automatisch mit Vite und erfasst die Code-Abdeckung für Sie.

## Funktionsweise

Der `@wdio/browser-runner` verwendet Vite, um Ihre Anwendung bereitzustellen. Wenn Sie die Abdeckung aktivieren, fügt er dem Vite-Server ein Plugin hinzu, das versucht, Ihren Quellcode spontan zu instrumentieren, sobald er vom Browser angefordert wird.

:::warning Wichtig
**Navigieren Sie nicht vom Testrunner weg!**

Die Code-Abdeckung setzt voraus, dass die Dateien vom lokalen Vite-Server, der von WebdriverIO gestartet wird, bereitgestellt und instrumentiert werden.
Wenn Sie `browser.url('http://...')` oder `browser.url('file://...')` verwenden, um zu einer anderen Seite zu navigieren, verlassen Sie die instrumentierte Umgebung. Ihr Code wird zwar ausgeführt, aber **es wird keine Abdeckung erfasst**.

**Richtiger Ansatz (Komponententests):**
Rendern Sie Ihre Komponente oder importieren Sie Ihr Modul direkt in der Testdatei.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Dies wird abgedeckt
})
```

**Falscher Ansatz (E2E-Stil):**
```js
it('will not have coverage', async () => {
    // ❌ Wegnavigieren unterbricht die Instrumentierung
    await browser.url('http://localhost:3000')
})
```
:::

## Einrichtung

Um die Berichterstattung über Code-Abdeckung zu aktivieren, aktivieren Sie sie über die Konfiguration des WebdriverIO-Browser-Runners, z. B.:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Sehen Sie sich alle [Abdeckungsoptionen](/docs/runner#coverage-options) an, um zu erfahren, wie Sie sie richtig konfigurieren.

:::tip Konfigurationstipps
Wenn Sie nicht standardmäßige Dateien testen (wie Inline-Skripte in `.html`) oder wenn Ihre Dateien nicht erfasst werden, müssen Sie möglicherweise Ihre `include`- und `extension`-Optionen explizit überprüfen:

```js
coverage: {
    enabled: true,
    // Zielen Sie explizit auf Ihre Quelldateien, falls die Standardauflösung fehlschlägt
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Fügen Sie .html hinzu, wenn Sie Inline-Skripte haben
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Code ignorieren

Es kann Abschnitte Ihrer Codebasis geben, die Sie bewusst von der Abdeckungsverfolgung ausschließen möchten. Dazu können Sie die folgenden Parsing-Hinweise verwenden:

- `/* istanbul ignore if */`: ignoriert die nächste if-Anweisung.
- `/* istanbul ignore else */`: ignoriert den else-Teil einer if-Anweisung.
- `/* istanbul ignore next */`: ignoriert das nächste Element im Quellcode (Funktionen, if-Anweisungen, Klassen usw.).
- `/* istanbul ignore file */`: ignoriert eine gesamte Quelldatei (dies sollte am Anfang der Datei platziert werden).

:::info

Es wird empfohlen, Ihre Testdateien von der Abdeckungsberichterstattung auszuschließen, da dies Fehler verursachen könnte, z. B. beim Aufruf des `execute`-Befehls. Wenn Sie sie in Ihrem Bericht behalten möchten, stellen Sie sicher, dass Sie ihre Instrumentierung wie folgt ausschließen:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::