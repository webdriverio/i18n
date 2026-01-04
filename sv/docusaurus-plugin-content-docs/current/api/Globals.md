---
id: globals
title: Globala Variabler
---

I dina testfiler lägger WebdriverIO var och en av dessa metoder och objekt i den globala miljön. Du behöver inte importera något för att använda dem. Men om du föredrar explicita importer kan du göra `import { browser, $, $$, expect } from '@wdio/globals'` och ställa in `injectGlobals: false` i din WDIO-konfiguration.

Följande globala objekt är inställda om de inte konfigureras på annat sätt:

- `browser`: WebdriverIO [Browser object](https://webdriver.io/docs/api/browser)
- `driver`: alias för `browser` (används när man kör mobiltester)
- `multiRemoteBrowser`: alias för `browser` eller `driver` men endast inställd för [Multiremote](/docs/multiremote) sessioner
- `$`: kommando för att hämta ett element (se mer i [API docs](/docs/api/browser/$))
- `$$`: kommando för att hämta element (se mer i [API docs](/docs/api/browser/$$))
- `expect`: påståenderamverk för WebdriverIO (se [API docs](/docs/api/expect-webdriverio))

__Obs:__ WebdriverIO har ingen kontroll över använda ramverk (t.ex. Mocha eller Jasmine) som ställer in globala variabler när de startar sin miljö.