---
id: coverage
title: Code-Abdeckung
---

Der Browser-Runner von WebdriverIO unterstützt die Berichterstattung zur Code-Abdeckung mit [`istanbul`](https://istanbul.js.org/). Der Testrunner instrumentiert Ihren Code automatisch und erfasst die Code-Abdeckung für Sie.

## Einrichtung

Um die Berichterstattung zur Code-Abdeckung zu aktivieren, aktivieren Sie sie über die WebdriverIO Browser-Runner-Konfiguration, z.B.:

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

Sehen Sie sich alle [Coverage-Optionen](/docs/runner#coverage-options) an, um zu erfahren, wie Sie sie richtig konfigurieren können.

## Code ignorieren

Es kann Abschnitte in Ihrer Codebasis geben, die Sie absichtlich von der Abdeckungsverfolgung ausschließen möchten. Dazu können Sie die folgenden Parsing-Hinweise verwenden:

- `/* istanbul ignore if */`: ignoriert die nächste if-Anweisung.
- `/* istanbul ignore else */`: ignoriert den else-Teil einer if-Anweisung.
- `/* istanbul ignore next */`: ignoriert das nächste Element im Quellcode (Funktionen, if-Anweisungen, Klassen, usw.).
- `/* istanbul ignore file */`: ignoriert eine gesamte Quelldatei (dies sollte am Anfang der Datei platziert werden).

:::info

Es wird empfohlen, Ihre Testdateien von der Abdeckungsberichterstattung auszuschließen, da dies zu Fehlern führen kann, z.B. beim Aufrufen von `execute` oder `executeAsync` Befehlen. Wenn Sie sie in Ihrem Bericht behalten möchten, stellen Sie sicher, dass Sie sie von der Instrumentierung ausschließen:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::