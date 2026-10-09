---
id: integrate-with-percy
title: För webbapplikationer
description: "Integrera WebdriverIO-tester för webbapplikationer med BrowserStack Percy för visuell testning, från att skapa ett projekt till att köra byggen."
---

## Integrera dina WebdriverIO-tester med Percy

Innan integrationen kan du utforska [Percys exempelbygge-handledning för WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integrera dina automatiserade WebdriverIO-tester med BrowserStack Percy. Här är en översikt över integrationsstegen:

### Steg 1: Skapa ett Percy-projekt
[Logga in](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) på Percy. Skapa ett projekt av typen Web i Percy och namnge sedan projektet. När projektet har skapats genererar Percy en token. Anteckna den. Du behöver använda den för att ställa in din miljövariabel i nästa steg.

För mer information om hur du skapar ett projekt, se [Skapa ett Percy-projekt](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Steg 2: Ställ in projekttoken som en miljövariabel

Kör följande kommando för att ställa in PERCY_TOKEN som en miljövariabel:

```sh
export PERCY_TOKEN="<your token here>"   // macOS eller Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Steg 3: Installera Percy-beroenden

Installera de komponenter som krävs för att upprätta integrationsmiljön för din testsvit.

Kör följande kommando för att installera beroendena:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Steg 4: Uppdatera ditt testskript

Importera Percy-biblioteket för att använda den metod och de attribut som krävs för att ta skärmbilder.
Följande exempel använder funktionen percySnapshot() i asynkront läge:

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

När du använder WebdriverIO i [fristående läge](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), ange browser-objektet som första argument till funktionen `percySnapshot`:

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
// browser-objektet krävs i fristående läge
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Argumenten för snapshot-metoden är:

```sh
percySnapshot(name[, options])
```
### Fristående läge

```sh
percySnapshot(browser, name[, options])
```

- browser (obligatoriskt) - WebdriverIO:s browser-objekt
- name (obligatoriskt) - Snapshot-namnet; måste vara unikt för varje snapshot
- options - Se konfigurationsalternativ per snapshot

För mer information, se [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Steg 5: Kör Percy
Kör dina tester med kommandot `percy exec` enligt nedan:

Om du inte kan använda kommandot `percy:exec` eller föredrar att köra dina tester med körningsalternativen i din IDE kan du använda kommandona `percy:exec:start` och `percy:exec:stop`. För mer information, besök [Kör Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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

## Besök följande sidor för mer information:
- [Integrera dina WebdriverIO-tester med Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Sida om miljövariabler](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrera med BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) om du använder BrowserStack Automate.


| Resurs                                                                                                                                                              | Beskrivning                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Officiell dokumentation](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)   | Percys WebdriverIO-dokumentation  |
| [Exempelbygge - Handledning](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percys WebdriverIO-handledning    |
| [Officiell video](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                             | Visuell testning med Percy        |
| [Blogg](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                   | Vi introducerar Visual Reviews 2.0 |