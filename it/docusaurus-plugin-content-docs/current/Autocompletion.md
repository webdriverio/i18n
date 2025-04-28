---
id: autocompletion
title: Autocompletamento
---

## IntelliJ

L'autocompletamento funziona automaticamente in IDEA e WebStorm.

Se stai scrivendo codice di programmazione da un po' di tempo, probabilmente apprezzi l'autocompletamento. L'autocompletamento è disponibile di default in molti editor di codice.

![Autocompletion](/img/autocompletion/0.png)

Le definizioni di tipo basate su [JSDoc](http://usejsdoc.org/) sono utilizzate per documentare il codice. Questo aiuta a vedere maggiori dettagli sui parametri e i loro tipi.

![Autocompletion](/img/autocompletion/1.png)

Usa le scorciatoie standard <kbd>⇧ + ⌥ + SPACE</kbd> sulla piattaforma IntelliJ per vedere la documentazione disponibile:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code solitamente ha il supporto per i tipi integrato automaticamente e non è necessaria alcuna azione.

![Autocompletion](/img/autocompletion/14.png)

Se utilizzi JavaScript puro e vuoi avere un corretto supporto dei tipi, devi creare un file `jsconfig.json` nella radice del tuo progetto e fare riferimento ai pacchetti wdio utilizzati, ad esempio:

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