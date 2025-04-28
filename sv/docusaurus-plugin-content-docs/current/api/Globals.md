---
id: globals
title: Globala variabler
---

I dina testfiler lägger WebdriverIO var och en av dessa metoder och objekt i den globala miljön. Du behöver inte importera något för att använda dem. Om du föredrar explicita importer kan du dock göra `import { browser, $, $$, expect } from '@wdio/globals'` och ställa in `injectGlobals: false` i din WDIO-konfiguration.

Följande globala objekt är inställda om inget annat har konfigurerats:

- `browser`: WebdriverIO [Browser object](https://webdriver.io/docs/api/browser)
- `driver`: alias för `browser` (används när du kör mobila tester)
- `multiremotebrowser`: alias för `browser` eller `driver` men endast inställt för [Multiremote](/docs/multiremote) sessioner
- `$`: kommando för att hämta ett element (se mer i [API docs](/docs/api/browser/$))
- `$$`: kommando för att hämta element (se mer i [API docs](/docs/api/browser/$$))
- `expect`: ramverk för bekräftelser i WebdriverIO (se [API docs](/docs/api/expect-webdriverio))

__Obs:__ WebdriverIO har ingen kontroll över använda ramverk (t.ex. Mocha eller Jasmine) som ställer in globala variabler när de bootar sin miljö.