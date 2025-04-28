---
id: autocompletion
title: Automatisk komplettering
---

## IntelliJ

Automatisk komplettering fungerar direkt i IDEA och WebStorm.

Om du har skrivit programkod ett tag, gillar du förmodligen automatisk komplettering. Automatisk komplettering finns tillgänglig direkt i många kodredigerare.

![Autocompletion](/img/autocompletion/0.png)

Typdefinitioner baserade på [JSDoc](http://usejsdoc.org/) används för att dokumentera kod. Det hjälper till att se fler ytterligare detaljer om parametrar och deras typer.

![Autocompletion](/img/autocompletion/1.png)

Använd standardgenvägar <kbd>⇧ + ⌥ + SPACE</kbd> på IntelliJ Platform för att se tillgänglig dokumentation:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code har vanligtvis typstöd automatiskt integrerat och det behövs ingen åtgärd.

![Autocompletion](/img/autocompletion/14.png)

Om du använder vanlig JavaScript och vill ha ordentligt typstöd måste du skapa en `jsconfig.json` i din projektrott och hänvisa till använda wdio-paket, t.ex:

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