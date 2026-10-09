---
id: mobile
title: Mobilappar
description: Konfigurera och kör WebdriverIO-tester för native-, hybrid- och mobilwebbappar på Android- och iOS-emulatorer, simulatorer, riktiga enheter och enhetsmoln.
---

WebdriverIO automatiserar Android och iOS via [Appium](/docs/appium), som talar WebDriver-protokollet. Dina tester använder samma `browser`-objekt (med aliaset `driver`), `$`/`$$`-selektorer och `expect`-matchare som webbläsartester. Appium dirigerar varje session till en plattformsdrivrutin som väljs med `appium:automationName`. För Android är det `UiAutomator2`, med Espresso som ett alternativ som ger tillgång till extra selektorstrategier. För iOS och iPadOS är det `XCUITest`. Med dessa drivrutiner kan du testa native-appar och mobilwebb i Chrome på Android eller Safari på iOS. Du kan också testa hybridappar och växla mellan den native kontexten och inbäddade webbvyer. Sessioner kan köras på Android-emulatorer, iOS-simulatorer, riktiga enheter eller enhetsmoln som Sauce Labs, BrowserStack, TestingBot och TestMu AI. [`@wdio/appium-service`](/docs/appium-service) startar och stoppar en lokal Appium-server åt dig. Utöver det råa Appium-API:et lägger WebdriverIO till plattformsoberoende [mobilkommandon](/docs/api/mobile) som `tap`, `swipe`, `longPress`, `scrollIntoView` och `switchContext`.

## Snabbstart

Förutsättningar: Android Studio med ett Android SDK och en emulator för Android; Xcode och en simulator på macOS för iOS. `npx appium-installer` guidar dig genom konfigurationen av miljön, och `npm init wdio@latest .` skapar ett mobilprojekt (välj Android eller iOS). För att konfigurera manuellt:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` är selektorn för accessibility id: den motsvarar `content-description` på Android och `accessibilityIdentifier` på iOS, och är den föredragna plattformsoberoende strategin. Ersätt exempel-id:na, webbvyns titel och appens sökväg med dina egna.

Andra mål ändrar bara capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app för simulatorer, signerad .ipa för riktiga enheter
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

För mobilwebb på iOS, använd `platformName: 'iOS'`, `browserName: 'Safari'` och `'appium:automationName': 'XCUITest'`.

## Välj din väg

- [Appium Setup](/docs/appium): vilka plattformar Appium täcker (iOS, Android, Tizen, TV-appar) och hur du installerar verktygskedjan.
- [Appium Service](/docs/appium-service): tjänstalternativ (`args`, `command`, `logPath`), `npx start-appium-inspector` för att öppna Appium Inspector, samt en optimerare i beta för långsamma XPath-selektorer.
- [Mobile Commands](/docs/api/mobile): plattformsoberoende gester och hjälpfunktioner. Täcker hybridappar med [`getContexts`](/docs/api/mobile/getContexts) och [`switchContext`](/docs/api/mobile/switchContext), plus webbvy-capabilities för iOS.
- [Mobile Selectors](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, Espresso data/view matchers samt iOS predicate strings och class chains.
- [Appium protocol commands](/docs/api/appium): de råa Appium-endpoints som finns tillgängliga på `driver`.
- [Flutter-appar](/docs/flutter-testing/introduction): varför Flutter behöver Appium Flutter Driver, sedan [förbered appen](/docs/flutter-testing/preparing-flutter-application), [konfigurera Appium](/docs/flutter-testing/base-appium-configuration), [konfigurera WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) och [skriv tester](/docs/flutter-testing/writing-tests).
- [Cloud Services](/docs/cloudservices): anslut till Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto eller RobotActions för att köra på värdade riktiga enheter.
- [Visual Testing](/docs/visual-testing): bildjämförelse för native-appar, hybridappar och mobilwebbläsare. För Percy på mobil, se [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): koordinera flera enheter eller webbläsare i ett och samma test.

Att emulera en enhets viewport i en datorwebbläsare med [`browser.emulate('device', ...)`](/docs/emulation) är inte mobiltestning. Webbläsarmotorer för datorer skiljer sig från mobila, så använd i stället Appium med en riktig mobilwebbläsare.

## Felsökning

- Sessionen startar inte: se till att Appium-drivrutinen för din `appium:automationName` är installerad och att emulatorn eller simulatorn körs. Använd `port: 4723` om du inte har ändrat Appium-porten.
- iOS hittar ingen webbvy: prova `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` eller `appium:includeSafariInWebviews` (se [Hybrid Apps](/docs/api/mobile#hybrid-apps)).
- Android-webbvyn tar lång tid att visas: justera `androidWebviewConnectionRetryTime` och `androidWebviewConnectTimeout` på `getContexts`/`switchContext`.
- Flutter-widgets hittas inte med native-selektorer: det är förväntat. Använd Flutter-drivrutinen och de finders som beskrivs i [Flutter-guiden](/docs/flutter-testing/introduction).

## Nästa steg

- Referenserna för [Configuration](/docs/configuration) och [Capabilities](/docs/capabilities).
- [Page Object Pattern](/docs/pageobjects) för att dela skärmar mellan Android- och iOS-specar.
- [MCP](/docs/mcp) för att låta en AI-agent styra iOS- och Android-sessioner via Appium.
- Andra plattformar: [Webbläsare](/docs/platforms/web), [Skrivbordsappar](/docs/platforms/desktop), [Tillägg och editorer](/docs/platforms/apps-and-extensions).