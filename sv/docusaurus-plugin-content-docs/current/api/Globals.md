---
id: globals
title: Globala variabler
---

I dina testfiler placerar WebdriverIO var och en av dessa metoder och objekt i den globala miljön. Du behöver inte importera något för att använda dem. Om du däremot föredrar explicita importer kan du göra `import { browser, $, $$, expect } from '@wdio/globals'` och ställa in `injectGlobals: false` i din WDIO-konfiguration.

Följande globala objekt sätts om inget annat har konfigurerats:

- `browser`: WebdriverIO [Browser-objekt](https://webdriver.io/docs/api/browser)
- `driver`: alias för `browser` (används vid körning av mobiltester)
- `multiRemoteBrowser`: alias för `browser` eller `driver` men sätts endast för [multi-remote](/docs/multiremote)-sessioner
- `$`: kommando för att hämta ett element (läs mer i [API-dokumentationen](/docs/api/browser/$))
- `$$`: kommando för att hämta element (läs mer i [API-dokumentationen](/docs/api/browser/$$))
- `expect`: assertionsramverk för WebdriverIO (se [API-dokumentationen](/docs/api/expect-webdriverio))

__Obs:__ WebdriverIO har ingen kontroll över att använda ramverk (t.ex. Mocha eller Jasmine) sätter globala variabler när de initierar sin miljö.