---
id: integrate-with-percy
title: För Webbapplikation
---

## Integrera dina WebdriverIO-tester med Percy

Innan integration kan du utforska [Percy's exempelbyggtutorial för WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integrera dina WebdriverIO automatiserade tester med BrowserStack Percy, här är en översikt över integrationsstegen:

### Steg 1: Skapa ett Percy-projekt
[Logga in](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) på Percy. I Percy, skapa ett projekt av typen Web och namnge projektet. Efter att projektet har skapats genererar Percy en token. Anteckna den. Du måste använda den för att ställa in din miljövariabel i nästa steg.

För detaljer om att skapa ett projekt, se [Skapa ett Percy-projekt](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Steg 2: Ställ in projekttoken som en miljövariabel

Kör följande kommando för att ställa in PERCY_TOKEN som en miljövariabel:

```sh
export PERCY_TOKEN="<your token here>"   // macOS eller Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Steg 3: Installera Percy-beroenden

Installera de komponenter som krävs för att etablera integrationsmiljön för din testsvit.

För att installera beroendena, kör följande kommando:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Steg 4: Uppdatera ditt testskript

Importera Percy-biblioteket för att använda metoden och attributen som krävs för att ta skärmdumpar.
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

När du använder WebdriverIO i [standalone-läge](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), tillhandahåll browserobjektet som det första argumentet till `percySnapshot`-funktionen:

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
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Snapshotmetodens argument är:

```sh
percySnapshot(name[, options])
```
### Standalone-läge

```sh
percySnapshot(browser, name[, options])
```

- browser (krävs) - WebdriverIO-browserobjektet
- name (krävs) - Snapshot-namnet; måste vara unikt för varje snapshot
- options - Se konfigurationsalternativ per snapshot

För att lära dig mer, se [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Steg 5: Kör Percy
Kör dina tester med kommandot `percy exec` som visas nedan:

Om du inte kan använda kommandot `percy:exec` eller föredrar att köra dina tester med IDE-köralternativ, kan du använda kommandona `percy:exec:start` och `percy:exec:stop`. För att lära dig mer, besök [Kör Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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
- [Miljövariabelsidan](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrera med BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) om du använder BrowserStack Automate.


| Resurs                                                                                                                                                               | Beskrivning                         |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| [Officiell dokumentation](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)     | Percy's WebdriverIO-dokumentation   |
| [Exempelbygge - Handledning](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percy's WebdriverIO-handledning     |
| [Officiell video](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visuell testning med Percy          |
| [Blogg](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Introduktion till Visual Reviews 2.0 |