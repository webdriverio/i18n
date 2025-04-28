---
id: autocompletion
title: Completamento automatico
---

## IntelliJ

Il completamento automatico funziona immediatamente in IDEA e WebStorm.

Se stai scrivendo codice di programmazione da un po' di tempo, probabilmente apprezzi il completamento automatico. Il completamento automatico è disponibile senza configurazione in molti editor di codice.

![Autocompletion](/img/autocompletion/0.png)

Le definizioni di tipo basate su [JSDoc](http://usejsdoc.org/) vengono utilizzate per documentare il codice. Aiuta a vedere ulteriori dettagli sui parametri e i loro tipi.

![Autocompletion](/img/autocompletion/1.png)

Usa le scorciatoie standard <kbd>⇧ + ⌥ + SPACE</kbd> su IntelliJ Platform per vedere la documentazione disponibile:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code di solito ha il supporto per i tipi integrato automaticamente e non è necessaria alcuna azione.

![Autocompletion](/img/autocompletion/14.png)

Se utilizzi JavaScript vanilla e desideri avere un corretto supporto per i tipi, devi creare un file `jsconfig.json` nella radice del tuo progetto e fare riferimento ai pacchetti wdio utilizzati, ad esempio:

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