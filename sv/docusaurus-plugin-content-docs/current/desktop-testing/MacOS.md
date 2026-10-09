---
id: macos
title: MacOS
description: "Automatisera inbyggda macOS-applikationer med WebdriverIO med hjälp av Appium och Mac2-drivrutinen, med start från projektets installationsguide."
---

WebdriverIO kan automatisera godtyckliga MacOS-applikationer med hjälp av [Appium](https://appium.io/). Allt du behöver är att [XCode](https://developer.apple.com/xcode/) är installerat på ditt system, att Appium och [Mac2 Driver](https://github.com/appium/appium-mac2-driver) är installerade som beroenden och att rätt capabilities är inställda.

## Kom igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide leder dig genom processen. Se till att du väljer _"Desktop Testing - of MacOS Applications"_ när den frågar vilken typ av testning du vill göra. Behåll sedan standardinställningarna eller ändra dem efter dina önskemål.

Konfigurationsguiden installerar alla nödvändiga Appium-paket och skapar en `wdio.conf.js` eller `wdio.conf.ts` med den konfiguration som krävs för att testa på MacOS. Om du godkände att några testfiler genereras automatiskt kan du köra ditt första test via `npm run wdio`.

<CreateMacOSProjectAnimation />

Det var allt 🎉

## Exempel

Så här kan ett enkelt test se ut som öppnar Kalkylator-applikationen, gör en beräkning och verifierar resultatet:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Obs:__ Kalkylator-appen öppnades automatiskt i början av sessionen eftersom `'appium:bundleId': 'com.apple.calculator'` definierades som capability-alternativ. Du kan när som helst byta app under sessionen.

## Mer information

För information om detaljer kring testning på MacOS rekommenderar vi att du tittar på projektet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).