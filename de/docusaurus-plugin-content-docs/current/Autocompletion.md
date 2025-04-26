---
id: autocompletion
title: Autovervollständigung
---

## IntelliJ

Die Autovervollständigung funktioniert in IDEA und WebStorm ohne zusätzliche Konfiguration.

Wenn Sie schon eine Weile Programmcode schreiben, mögen Sie wahrscheinlich die Autovervollständigung. Die automatische Vervollständigung ist in vielen Code-Editoren standardmäßig verfügbar.

![Autocompletion](/img/autocompletion/0.png)

Typdefinitionen basierend auf [JSDoc](http://usejsdoc.org/) werden zur Dokumentation des Codes verwendet. Dies hilft, weitere Details über Parameter und deren Typen zu sehen.

![Autocompletion](/img/autocompletion/1.png)

Verwenden Sie die Standardtastenkombination <kbd>⇧ + ⌥ + SPACE</kbd> auf der IntelliJ-Plattform, um die verfügbare Dokumentation anzuzeigen:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code hat in der Regel automatisch integrierte Typunterstützung und es sind keine weiteren Maßnahmen erforderlich.

![Autocompletion](/img/autocompletion/14.png)

Wenn Sie vanilla JavaScript verwenden und eine ordnungsgemäße Typunterstützung haben möchten, müssen Sie eine `jsconfig.json` im Projektstamm erstellen und auf die verwendeten wdio-Pakete verweisen, z.B.:

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