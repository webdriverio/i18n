---
id: globals
title: Globalne
---

W plikach testowych WebdriverIO umieszcza każdą z tych metod i obiektów w środowisku globalnym. Nie musisz nic importować, aby ich używać. Jednakże, jeśli wolisz jawne importy, możesz użyć `import { browser, $, $$, expect } from '@wdio/globals'` i ustawić `injectGlobals: false` w konfiguracji WDIO.

Następujące obiekty globalne są ustawione, jeśli nie skonfigurowano inaczej:

- `browser`: [Obiekt Browser](https://webdriver.io/docs/api/browser) WebdriverIO
- `driver`: alias do `browser` (używany podczas uruchamiania testów mobilnych)
- `multiremotebrowser`: alias do `browser` lub `driver`, ale ustawiany tylko dla sesji [Multiremote](/docs/multiremote)
- `$`: polecenie do pobierania elementu (więcej w [dokumentacji API](/docs/api/browser/$))
- `$$`: polecenie do pobierania elementów (więcej w [dokumentacji API](/docs/api/browser/$$))
- `expect`: framework asercji dla WebdriverIO (zobacz [dokumentację API](/docs/api/expect-webdriverio))

__Uwaga:__ WebdriverIO nie ma kontroli nad używanymi frameworkami (np. Mocha lub Jasmine) ustawiającymi zmienne globalne podczas uruchamiania ich środowiska.