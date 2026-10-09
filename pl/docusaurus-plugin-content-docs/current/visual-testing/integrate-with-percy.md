---
id: integrate-with-percy
title: Dla aplikacji webowych
description: "Zintegruj testy WebdriverIO dla aplikacji webowych z BrowserStack Percy w celu przeprowadzania testów wizualnych, od utworzenia projektu po uruchamianie buildów."
---

## Zintegruj swoje testy WebdriverIO z Percy

Przed integracją możesz zapoznać się z [samouczkiem przykładowego buildu Percy dla WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Zintegruj swoje zautomatyzowane testy WebdriverIO z BrowserStack Percy. Oto przegląd kroków integracji:

### Krok 1: Utwórz projekt Percy
[Zaloguj się](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) do Percy. W Percy utwórz projekt typu Web, a następnie nadaj mu nazwę. Po utworzeniu projektu Percy wygeneruje token. Zanotuj go. Będziesz go potrzebować do ustawienia zmiennej środowiskowej w następnym kroku.

Szczegółowe informacje na temat tworzenia projektu znajdziesz w sekcji [Utwórz projekt Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Krok 2: Ustaw token projektu jako zmienną środowiskową

Uruchom podane polecenie, aby ustawić PERCY_TOKEN jako zmienną środowiskową:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Krok 3: Zainstaluj zależności Percy

Zainstaluj komponenty wymagane do przygotowania środowiska integracji dla Twojego zestawu testów.

Aby zainstalować zależności, uruchom następujące polecenie:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Krok 4: Zaktualizuj swój skrypt testowy

Zaimportuj bibliotekę Percy, aby korzystać z metody i atrybutów wymaganych do wykonywania zrzutów ekranu.
Poniższy przykład wykorzystuje funkcję percySnapshot() w trybie asynchronicznym:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Korzystając z WebdriverIO w [trybie standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), przekaż obiekt browser jako pierwszy argument funkcji `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// obiekt browser jest wymagany w trybie standalone
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Argumenty metody snapshot to:

```sh
percySnapshot(name[, options])
```
### Tryb standalone

```sh
percySnapshot(browser, name[, options])
```

- browser (wymagany) - Obiekt browser WebdriverIO
- name (wymagany) - Nazwa snapshotu; musi być unikalna dla każdego snapshotu
- options - Zobacz opcje konfiguracji dla poszczególnych snapshotów

Aby dowiedzieć się więcej, zobacz [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Krok 5: Uruchom Percy
Uruchom swoje testy za pomocą polecenia `percy exec`, jak pokazano poniżej:

Jeśli nie możesz użyć polecenia `percy:exec` lub wolisz uruchamiać testy za pomocą opcji uruchamiania w IDE, możesz użyć poleceń `percy:exec:start` i `percy:exec:stop`. Aby dowiedzieć się więcej, odwiedź stronę [Uruchom Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Odwiedź poniższe strony, aby uzyskać więcej szczegółów:
- [Zintegruj swoje testy WebdriverIO z Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Strona dotycząca zmiennych środowiskowych](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integracja za pomocą BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), jeśli korzystasz z BrowserStack Automate.


| Zasób                                                                                                                                                               | Opis                              |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Oficjalna dokumentacja](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)    | Dokumentacja Percy dla WebdriverIO |
| [Przykładowy build - Samouczek](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Samouczek Percy dla WebdriverIO   |
| [Oficjalne wideo](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                             | Testy wizualne z Percy            |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Przedstawiamy Visual Reviews 2.0  |