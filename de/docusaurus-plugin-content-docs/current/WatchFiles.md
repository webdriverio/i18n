---
id: watcher
title: Testdateien überwachen
description: "Führen Sie Tests automatisch erneut aus, wenn sich Spec- oder Anwendungsdateien ändern, indem Sie den WDIO-Testrunner mit dem Flag --watch und filesToWatch ausführen."
---

Mit dem WDIO-Testrunner können Sie Dateien überwachen, während Sie an ihnen arbeiten. Die Tests werden automatisch erneut ausgeführt, wenn Sie etwas in Ihrer App oder in Ihren Testdateien ändern. Durch Hinzufügen des Flags `--watch` beim Aufruf des `wdio`-Befehls wartet der Testrunner auf Dateiänderungen, nachdem er alle Tests ausgeführt hat, z. B.

```sh
wdio wdio.conf.js --watch
```

Standardmäßig überwacht er nur Änderungen in Ihren `specs`-Dateien. Wenn Sie jedoch in Ihrer `wdio.conf.js` eine `filesToWatch`-Eigenschaft festlegen, die eine Liste von Dateipfaden enthält (Globbing wird unterstützt), überwacht er auch diese Dateien auf Änderungen, um die gesamte Suite erneut auszuführen. Dies ist nützlich, wenn Sie alle Ihre Tests automatisch erneut ausführen möchten, sobald Sie Ihren Anwendungscode geändert haben, z. B.

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // alle JS-Dateien in meiner App überwachen
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Versuchen Sie, Tests so weit wie möglich parallel auszuführen. E2E-Tests sind von Natur aus langsam. Das erneute Ausführen von Tests ist nur sinnvoll, wenn Sie die Laufzeit der einzelnen Tests kurz halten können. Um Zeit zu sparen, hält der Testrunner WebDriver-Sitzungen aktiv, während er auf Dateiänderungen wartet. Stellen Sie sicher, dass Ihr WebDriver-Backend so angepasst werden kann, dass es die Sitzung nicht automatisch schließt, wenn nach einer gewissen Zeit kein Befehl ausgeführt wurde.
:::