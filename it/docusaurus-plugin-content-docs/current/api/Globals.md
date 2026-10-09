---
id: globals
title: Globali
---

Nei tuoi file di test, WebdriverIO inserisce ciascuno di questi metodi e oggetti nell'ambiente globale. Non è necessario importare nulla per utilizzarli. Tuttavia, se preferisci importazioni esplicite, puoi usare `import { browser, $, $$, expect } from '@wdio/globals'` e impostare `injectGlobals: false` nella tua configurazione WDIO.

I seguenti oggetti globali vengono impostati se non configurato diversamente:

- `browser`: [oggetto Browser](https://webdriver.io/docs/api/browser) di WebdriverIO
- `driver`: alias di `browser` (utilizzato durante l'esecuzione di test mobile)
- `multiRemoteBrowser`: alias di `browser` o `driver` ma impostato solo per sessioni [multi-remote](/docs/multiremote)
- `$`: comando per recuperare un elemento (vedi di più nella [documentazione API](/docs/api/browser/$))
- `$$`: comando per recuperare elementi (vedi di più nella [documentazione API](/docs/api/browser/$$))
- `expect`: framework di asserzioni per WebdriverIO (vedi [documentazione API](/docs/api/expect-webdriverio))

__Nota:__ WebdriverIO non ha alcun controllo sui framework utilizzati (ad es. Mocha o Jasmine) che impostano variabili globali durante l'inizializzazione del loro ambiente.