---
id: integrate-with-app-percy
title: För Mobilapplikation
---

## Integrate your WebdriverIO tests with App Percy

Before integration, you can explore [App Percy's sample build tutorial for WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integrate your test suite with BrowserStack App Percy and here's an overview of the integration steps:

### Steg 1: Skapa nytt appprojekt på percy-dashboarden

[Sign in](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) to Percy and [create a new app type project](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). After you've created the project, you'll be shown a `PERCY_TOKEN` environment variable. Percy will use the `PERCY_TOKEN` to know which organisation and project to upload the screenshots to. You will need this `PERCY_TOKEN` in next steps.

### Steg 2: Ställ in projekttokenet som en miljövariabel

Kör det givna kommandot för att ställa in PERCY_TOKEN som en miljövariabel:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Steg 3: Installera Percy-paket

Installera de komponenter som krävs för att etablera integrationsmiljön för din testsvit.
För att installera beroendena, kör följande kommando:

```sh
npm install --save-dev @percy/cli
```

### Steg 4: Installera beroenden

Installera Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Steg 5: Uppdatera testskript
Se till att importera @percy/appium-app i din kod.

Nedan är ett exempel på test med percyScreenshot-funktionen. Använd denna funktion varhelst du behöver ta en skärmdump.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Vi skickar de nödvändiga argumenten till percyScreenshot-metoden.

Argumenten för screenshot-metoden är:

```sh
percyScreenshot(driver, name[, options])
```
### Steg 6: Kör ditt testskript

Kör dina tester med `percy app:exec`.

Om du inte kan använda kommandot percy app:exec eller föredrar att köra dina tester med IDE-körningsalternativ, kan du använda kommandona percy app:exec:start och percy app:exec:stop. För att lära dig mer, besök [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Detta kommando startar Percy, skapar en ny Percy-build, tar skärmdumpar och laddar upp dem till ditt projekt, och stoppar Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Besök följande sidor för mer information:
- [Integrate your WebdriverIO tests with Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Environment variable page](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrate using BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) if you are using BrowserStack Automate.


| Resource                                                                                                                                                            | Description                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Official docs](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy's WebdriverIO documentation |
| [Sample build - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy's WebdriverIO tutorial      |
| [Official video](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visual Testing with App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Meet App Percy: AI-powered automated visual testing platform for native apps    |