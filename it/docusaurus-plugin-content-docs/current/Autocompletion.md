---
id: autocompletion
title: Completamento automatico
description: "Ottieni il completamento automatico e la documentazione API inline per i comandi WebdriverIO in IntelliJ, WebStorm e Visual Studio Code."
---

## IntelliJ

Il completamento automatico funziona immediatamente in IDEA e WebStorm.

Se scrivi codice da un po' di tempo, probabilmente apprezzi il completamento automatico. Il completamento automatico è disponibile immediatamente in molti editor di codice.

![Autocompletion](/img/autocompletion/0.png)

Le definizioni di tipo basate su [JSDoc](http://usejsdoc.org/) vengono utilizzate per documentare il codice. Aiutano a visualizzare ulteriori dettagli sui parametri e sui loro tipi.

![Autocompletion](/img/autocompletion/1.png)

Usa le scorciatoie standard <kbd>⇧ + ⌥ + SPACE</kbd> sulla piattaforma IntelliJ per visualizzare la documentazione disponibile:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code di solito ha il supporto dei tipi integrato automaticamente e non è necessaria alcuna azione.

![Autocompletion](/img/autocompletion/14.png)

Se utilizzi JavaScript puro e desideri avere un supporto dei tipi adeguato, devi creare un file `jsconfig.json` nella root del tuo progetto e fare riferimento ai pacchetti wdio utilizzati, ad esempio:

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