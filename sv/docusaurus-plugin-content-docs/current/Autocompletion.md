---
id: autocompletion
title: Autokomplettering
description: "Få autokomplettering och inbyggd API-dokumentation för WebdriverIO-kommandon i IntelliJ, WebStorm och Visual Studio Code."
---

## IntelliJ

Autokomplettering fungerar direkt i IDEA och WebStorm.

Om du har skrivit programkod ett tag gillar du förmodligen autokomplettering. Autokomplettering finns tillgängligt direkt i många kodredigerare.

![Autocompletion](/img/autocompletion/0.png)

Typdefinitioner baserade på [JSDoc](http://usejsdoc.org/) används för att dokumentera kod. Det hjälper dig att se fler detaljer om parametrar och deras typer.

![Autocompletion](/img/autocompletion/1.png)

Använd standardgenvägarna <kbd>⇧ + ⌥ + SPACE</kbd> på IntelliJ-plattformen för att se tillgänglig dokumentation:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code har vanligtvis typstöd automatiskt integrerat och ingen åtgärd behövs.

![Autocompletion](/img/autocompletion/14.png)

Om du använder vanlig JavaScript och vill ha ordentligt typstöd måste du skapa en `jsconfig.json` i projektets rotkatalog och referera till de wdio-paket som används, t.ex.:

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