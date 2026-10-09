---
id: autocompletion
title: Autovervollständigung
description: "Erhalten Sie Autovervollständigung und Inline-API-Dokumentation für WebdriverIO-Befehle in IntelliJ, WebStorm und Visual Studio Code."
---

## IntelliJ

Die Autovervollständigung funktioniert in IDEA und WebStorm ohne zusätzliche Konfiguration.

Wenn Sie schon eine Weile Programmcode schreiben, mögen Sie wahrscheinlich die Autovervollständigung. Sie ist in vielen Code-Editoren standardmäßig verfügbar.

![Autocompletion](/img/autocompletion/0.png)

Typdefinitionen auf Basis von [JSDoc](http://usejsdoc.org/) werden zur Dokumentation des Codes verwendet. Sie helfen dabei, zusätzliche Details zu Parametern und deren Typen zu sehen.

![Autocompletion](/img/autocompletion/1.png)

Verwenden Sie die Standard-Tastenkombination <kbd>⇧ + ⌥ + SPACE</kbd> auf der IntelliJ-Plattform, um die verfügbare Dokumentation anzuzeigen:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

In Visual Studio Code ist die Typunterstützung in der Regel automatisch integriert, sodass keine weiteren Schritte erforderlich sind.

![Autocompletion](/img/autocompletion/14.png)

Wenn Sie reines JavaScript verwenden und eine ordnungsgemäße Typunterstützung wünschen, müssen Sie eine `jsconfig.json` im Stammverzeichnis Ihres Projekts erstellen und auf die verwendeten wdio-Pakete verweisen, z. B.:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```