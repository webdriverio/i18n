---
id: mobile
title: App mobili
description: Configura ed esegui test WebdriverIO per app native, ibride e web mobile su emulatori Android, simulatori iOS, dispositivi reali e cloud di dispositivi.
---

WebdriverIO automatizza Android e iOS tramite [Appium](/docs/appium), che utilizza il protocollo WebDriver. I tuoi test usano lo stesso oggetto `browser` (con alias `driver`), gli stessi selettori `$`/`$$` e gli stessi matcher `expect` dei test per browser. Appium indirizza ogni sessione a un driver di piattaforma scelto tramite `appium:automationName`. Per Android si tratta di `UiAutomator2`, con Espresso come alternativa che sblocca ulteriori strategie di selezione. Per iOS e iPadOS è `XCUITest`. Con questi driver puoi testare app native e web mobile in Chrome su Android o Safari su iOS. Puoi anche testare app ibride, passando dal contesto nativo alle webview incorporate e viceversa. Le sessioni possono essere eseguite su emulatori Android, simulatori iOS, dispositivi reali o cloud di dispositivi come Sauce Labs, BrowserStack, TestingBot e TestMu AI. Il [`@wdio/appium-service`](/docs/appium-service) avvia e arresta per te un server Appium locale. Oltre all'API Appium di base, WebdriverIO aggiunge [comandi mobile](/docs/api/mobile) multipiattaforma come `tap`, `swipe`, `longPress`, `scrollIntoView` e `switchContext`.

## Avvio rapido

Prerequisiti: Android Studio con un Android SDK e un emulatore per Android; Xcode e un simulatore su macOS per iOS. `npx appium-installer` ti guida nella configurazione dell'ambiente, e `npm init wdio@latest .` crea la struttura di un progetto mobile (scegli Android o iOS). Per configurare manualmente:

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

`~` è il selettore accessibility id: corrisponde a `content-description` su Android e ad `accessibilityIdentifier` su iOS, ed è la strategia multipiattaforma preferita. Sostituisci gli id di esempio, il titolo della webview e il percorso dell'app con i tuoi.

Gli altri target cambiano solo le capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app per i simulatori, .ipa firmato per i dispositivi reali
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

Per il web mobile su iOS, usa `platformName: 'iOS'`, `browserName: 'Safari'` e `'appium:automationName': 'XCUITest'`.

## Scegli il tuo percorso

- [Configurazione di Appium](/docs/appium): quali piattaforme copre Appium (iOS, Android, Tizen, app TV) e come installare la toolchain.
- [Servizio Appium](/docs/appium-service): opzioni del servizio (`args`, `command`, `logPath`), `npx start-appium-inspector` per aprire l'Appium Inspector e un ottimizzatore in beta per selettori XPath lenti.
- [Comandi mobile](/docs/api/mobile): gesti e helper multipiattaforma. Copre le app ibride con [`getContexts`](/docs/api/mobile/getContexts) e [`switchContext`](/docs/api/mobile/switchContext), oltre alle capabilities delle webview per iOS.
- [Selettori mobile](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, matcher data/view di Espresso e predicate string e class chain di iOS.
- [Comandi del protocollo Appium](/docs/api/appium): gli endpoint Appium di base disponibili su `driver`.
- [App Flutter](/docs/flutter-testing/introduction): perché Flutter richiede l'Appium Flutter Driver, poi [prepara l'app](/docs/flutter-testing/preparing-flutter-application), [configura Appium](/docs/flutter-testing/base-appium-configuration), [configura WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) e [scrivi i test](/docs/flutter-testing/writing-tests).
- [Servizi cloud](/docs/cloudservices): connettiti a Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto o RobotActions per eseguire su dispositivi reali ospitati.
- [Test visivi](/docs/visual-testing): confronto di immagini per app native, app ibride e browser mobile. Per Percy su mobile, consulta [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): coordina più dispositivi o browser in un unico test.

Emulare il viewport di un dispositivo in un browser desktop con [`browser.emulate('device', ...)`](/docs/emulation) non è un test mobile. I motori dei browser desktop differiscono da quelli mobili, quindi usa invece Appium con un vero browser mobile.

## Risoluzione dei problemi

- La sessione non si avvia: assicurati che il driver Appium per il tuo `appium:automationName` sia installato e che l'emulatore o il simulatore sia in esecuzione. Usa `port: 4723` a meno che tu non abbia cambiato la porta di Appium.
- iOS non trova una webview: prova `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` o `appium:includeSafariInWebviews` (vedi [App ibride](/docs/api/mobile#hybrid-apps)).
- La webview Android tarda ad apparire: regola `androidWebviewConnectionRetryTime` e `androidWebviewConnectTimeout` su `getContexts`/`switchContext`.
- I widget Flutter non vengono trovati con i selettori nativi: è normale. Usa il driver Flutter e i finder descritti nella [guida Flutter](/docs/flutter-testing/introduction).

## Prossimi passi

- Riferimenti per [Configurazione](/docs/configuration) e [Capabilities](/docs/capabilities).
- [Page Object Pattern](/docs/pageobjects) per condividere le schermate tra le spec Android e iOS.
- [MCP](/docs/mcp) per consentire a un agente AI di pilotare sessioni iOS e Android tramite Appium.
- Altre piattaforme: [Browser web](/docs/platforms/web), [App desktop](/docs/platforms/desktop), [Estensioni ed editor](/docs/platforms/apps-and-extensions).