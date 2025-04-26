---
id: watcher
title: Test-Dateien überwachen
---

Mit dem WDIO Testrunner können Sie Dateien überwachen, während Sie an ihnen arbeiten. Sie werden automatisch neu ausgeführt, wenn Sie entweder etwas in Ihrer App oder in Ihren Testdateien ändern. Durch Hinzufügen eines `--watch` Flags beim Aufruf des `wdio` Befehls wartet der Testrunner nach der Ausführung aller Tests auf Dateiänderungen, z.B.

```sh
wdio wdio.conf.js --watch
```

Standardmäßig überwacht er nur Änderungen in Ihren `specs` Dateien. Durch Festlegen einer `filesToWatch` Eigenschaft in Ihrer `wdio.conf.js`, die eine Liste von Dateipfaden enthält (Globbing wird unterstützt), werden auch diese Dateien auf Änderungen überwacht, um die gesamte Suite erneut auszuführen. Dies ist nützlich, wenn Sie automatisch alle Ihre Tests erneut ausführen möchten, wenn Sie Ihren Anwendungscode geändert haben, z.B.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Versuchen Sie, Tests so weit wie möglich parallel auszuführen. E2E-Tests sind von Natur aus langsam. Das erneute Ausführen von Tests ist nur nützlich, wenn Sie die individuelle Testlaufzeit kurz halten können. Um Zeit zu sparen, hält der Testrunner WebDriver-Sitzungen am Leben, während er auf Dateiänderungen wartet. Stellen Sie sicher, dass Ihr WebDriver-Backend so modifiziert werden kann, dass es die Sitzung nicht automatisch schließt, wenn nach einer bestimmten Zeit kein Befehl ausgeführt wurde.
:::