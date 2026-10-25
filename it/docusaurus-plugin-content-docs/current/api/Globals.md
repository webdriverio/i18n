---
id: globals
title: Variabili globali
---

Nei tuoi file di test, WebdriverIO inserisce ciascuno di questi metodi e oggetti nell'ambiente globale. Non è necessario importare nulla per utilizzarli. Tuttavia, se preferisci gli import espliciti, puoi usare `import { browser, $, $$, expect } from '@wdio/globals'` e impostare `injectGlobals: false` nella tua configurazione WDIO.

I seguenti oggetti globali vengono impostati, salvo diversa configurazione:

- `browser`: [oggetto Browser](https://webdriver.io/docs/api/browser) di WebdriverIO
- `driver`: alias di `browser` (utilizzato durante l'esecuzione di test mobile)
- `multiRemoteBrowser`: alias di `browser` o `driver`, ma impostato solo per le sessioni [multi-remote](/docs/multiremote)
- `$`: comando per recuperare un elemento (vedi maggiori dettagli nella [documentazione API](/docs/api/browser/$))
- `$$`: comando per recuperare più elementi (vedi maggiori dettagli nella [documentazione API](/docs/api/browser/$$))
- `expect`: framework di asserzione per WebdriverIO (vedi la [documentazione API](/docs/api/expect-webdriverio))

__Nota:__ WebdriverIO non ha alcun controllo sui framework utilizzati (ad es. Mocha o Jasmine) che impostano variabili globali durante l'inizializzazione del loro ambiente.