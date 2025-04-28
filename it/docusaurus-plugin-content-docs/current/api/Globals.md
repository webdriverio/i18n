---
id: globals
title: Globali
---

Nei tuoi file di test, WebdriverIO mette ciascuno di questi metodi e oggetti nell'ambiente globale. Non devi importare nulla per utilizzarli. Tuttavia, se preferisci importazioni esplicite, puoi fare `import { browser, $, $$, expect } from '@wdio/globals'` e impostare `injectGlobals: false` nella tua configurazione WDIO.

I seguenti oggetti globali sono impostati se non configurati diversamente:

- `browser`: [Oggetto Browser](https://webdriver.io/docs/api/browser) di WebdriverIO
- `driver`: alias di `browser` (usato quando si eseguono test mobili)
- `multiremotebrowser`: alias di `browser` o `driver` ma impostato solo per sessioni [Multiremote](/docs/multiremote)
- `$`: comando per recuperare un elemento (vedi di più in [API docs](/docs/api/browser/$))
- `$$`: comando per recuperare elementi (vedi di più in [API docs](/docs/api/browser/$$))
- `expect`: framework di asserzione per WebdriverIO (vedi [API docs](/docs/api/expect-webdriverio))

__Nota:__ WebdriverIO non ha alcun controllo sui framework utilizzati (ad esempio Mocha o Jasmine) che impostano variabili globali durante l'inizializzazione del loro ambiente.