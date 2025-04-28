---
id: macos
title: MacOS
---

WebdriverIO kan automatisera godtyckliga MacOS-applikationer med hjälp av [Appium](https://appium.io/docs/en/2.0/). Allt du behöver är [XCode](https://developer.apple.com/xcode/) installerat på ditt system, Appium och [Mac2 Driver](https://github.com/appium/appium-mac2-driver) installerade som beroenden samt rätt inställda capabilities.

## Komma igång

För att starta ett nytt WebdriverIO-projekt, kör:

```sh
npm create wdio@latest ./
```

En installationsguide kommer att leda dig genom processen. Se till att välja _"Desktop Testing - of MacOS Applications"_ när den frågar vilken typ av testning du vill göra. Efteråt behåller du bara standardinställningarna eller modifierar baserat på dina preferenser.

Konfigurationsguiden kommer att installera alla nödvändiga Appium-paket och skapar en `wdio.conf.js` eller `wdio.conf.ts` med den nödvändiga konfigurationen för att testa på MacOS. Om du godkände att autogenerera testfiler kan du köra ditt första test via `npm run wdio`.

<CreateMacOSProjectAnimation />

Det är allt 🎉

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

__Obs:__ kalkylatorn öppnades automatiskt i början av sessionen eftersom `'appium:bundleId': 'com.apple.calculator'` definierades som capability-alternativ. Du kan byta app under sessionen när som helst.

## Mer information

För information om specifika detaljer kring testning på MacOS rekommenderar vi att du besöker projektet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).