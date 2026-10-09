---
id: globals
title: Zmienne globalne
---

W Twoich plikach testowych WebdriverIO umieszcza każdą z tych metod i obiektów w środowisku globalnym. Nie musisz niczego importować, aby z nich korzystać. Jeśli jednak wolisz jawne importy, możesz użyć `import { browser, $, $$, expect } from '@wdio/globals'` i ustawić `injectGlobals: false` w swojej konfiguracji WDIO.

Następujące obiekty globalne są ustawiane, jeśli nie skonfigurowano inaczej:

- `browser`: [obiekt Browser](https://webdriver.io/docs/api/browser) WebdriverIO
- `driver`: alias dla `browser` (używany podczas uruchamiania testów mobilnych)
- `multiRemoteBrowser`: alias dla `browser` lub `driver`, ale ustawiany tylko dla sesji [multi-remote](/docs/multiremote)
- `$`: polecenie do pobrania elementu (więcej w [dokumentacji API](/docs/api/browser/$))
- `$$`: polecenie do pobrania elementów (więcej w [dokumentacji API](/docs/api/browser/$$))
- `expect`: framework asercji dla WebdriverIO (zobacz [dokumentację API](/docs/api/expect-webdriverio))

__Uwaga:__ WebdriverIO nie ma kontroli nad używanymi frameworkami (np. Mocha lub Jasmine), które ustawiają zmienne globalne podczas inicjalizacji swojego środowiska.