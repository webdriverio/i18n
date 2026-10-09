---
id: integrate-with-app-percy
title: För mobilapplikationer
description: "Integrera WebdriverIO-tester för mobilappar med BrowserStack App Percy för visuell testning, med början i att ställa in din PERCY_TOKEN."
---

## Integrera dina WebdriverIO-tester med App Percy

Innan integrationen kan du utforska [App Percys exempelbygge-handledning för WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integrera din testsvit med BrowserStack App Percy. Här är en översikt över integrationsstegen:

### Steg 1: Skapa ett nytt appprojekt på Percy-instrumentpanelen

[Logga in](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) på Percy och [skapa ett nytt projekt av typen app](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). När du har skapat projektet visas en miljövariabel `PERCY_TOKEN`. Percy använder `PERCY_TOKEN` för att veta vilken organisation och vilket projekt skärmbilderna ska laddas upp till. Du behöver denna `PERCY_TOKEN` i nästa steg.

### Steg 2: Ställ in projekttoken som en miljövariabel

Kör följande kommando för att ställa in PERCY_TOKEN som en miljövariabel:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Steg 3: Installera Percy-paket

Installera de komponenter som krävs för att upprätta integrationsmiljön för din testsvit.
För att installera beroendena, kör följande kommando:

```sh
npm install --save-dev @percy/cli
```

### Steg 4: Installera beroenden

Installera Percy Appium-appen

```sh
npm install --save-dev @percy/appium-app
```

### Steg 5: Uppdatera testskriptet
Se till att importera @percy/appium-app i din kod.

Nedan finns ett exempeltest som använder funktionen percyScreenshot. Använd denna funktion överallt där du behöver ta en skärmbild.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Vi skickar de nödvändiga argumenten till metoden percyScreenshot.

Argumenten för skärmbildsmetoden är:

```sh
percyScreenshot(driver, name[, options])
```
### Steg 6: Kör ditt testskript

Kör dina tester med `percy app:exec`.

Om du inte kan använda kommandot percy app:exec eller föredrar att köra dina tester med körningsalternativen i din IDE, kan du använda kommandona percy app:exec:start och percy app:exec:stop. Läs mer på [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Detta kommando startar Percy, skapar ett nytt Percy-bygge, tar ögonblicksbilder och laddar upp dem till ditt projekt samt stoppar Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Besök följande sidor för mer information:
- [Integrera dina WebdriverIO-tester med Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Sida om miljövariabler](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integrera med BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) om du använder BrowserStack Automate.


| Resurs                                                                                                                                                            | Beskrivning                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Officiell dokumentation](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percys WebdriverIO-dokumentation |
| [Exempelbygge - Handledning](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percys WebdriverIO-handledning      |
| [Officiell video](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Visuell testning med App Percy         |
| [Blogg](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Möt App Percy: AI-driven plattform för automatiserad visuell testning av native-appar    |