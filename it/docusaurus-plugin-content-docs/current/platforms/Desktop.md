---
id: desktop
title: App Desktop
description: Scegli la configurazione di WebdriverIO più adatta per le app native macOS e per le app Electron, Tauri e Dioxus su macOS, Windows e Linux, ed esegui un primo test.
---

Il modo in cui WebdriverIO automatizza un'app desktop dipende da come l'app è stata realizzata. Le app native macOS vengono automatizzate tramite [Appium](/docs/appium) con il driver Mac2 (`'appium:automationName': 'Mac2'`), che richiede Xcode. Le app realizzate con un framework basato sul web vengono pilotate attraverso il loro motore browser integrato da un servizio WebdriverIO dedicato. Il [servizio Electron](/docs/desktop-testing/electron) utilizza Chromium tramite un Chromedriver installato automaticamente e può anche richiamare le API del processo principale di Electron. Il [servizio Tauri](/docs/desktop-testing/tauri) e il [servizio Dioxus](/docs/desktop-testing/dioxus) pilotano la webview del sistema operativo: WebView2 su Windows, WKWebView su macOS e WebKitGTK su Linux. Questi tre servizi eseguono la stessa suite su Windows, macOS e Linux. Per le app native Windows al momento non esiste un driver consigliato: il Windows Driver di Appium si basa su WinAppDriver di Microsoft, che non è più mantenuto. Non esiste supporto documentato per l'automazione di app native Linux arbitrarie.

| Tipo di app | macOS | Windows | Linux | Come |
|----------|-------|---------|-------|-----|
| App nativa | Sì | Non consigliato | Non documentato | Driver Appium Mac2 |
| Electron | Sì | Sì | Sì | `@wdio/electron-service` (Chromedriver) |
| Tauri | Sì | Sì | Sì | `@wdio/tauri-service` (plugin integrato, `tauri-driver` o CrabNebula) |
| Dioxus | Sì | Sì | Sì | `@wdio/dioxus-service` (driver integrato; driver esterno solo su Windows) |

## Avvio rapido

`npm create wdio@latest ./` genera la struttura per tutte queste configurazioni. Scegli "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" e poi il tuo framework. Ogni configurazione riportata di seguito richiede inoltre `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` e un `tsconfig.json` con `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

### Electron (macOS, Windows, Linux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // necessario solo se il rilevamento automatico dell'output di Electron Forge / electron-builder non riesce
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

Usa `browser.electron.execute((electron, ...args) => { ... })` per eseguire codice nel processo principale e `browser.electron.mock()` per simulare (mock) le API di Electron.

### App nativa macOS (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

`appium:bundleId` seleziona l'app da avviare all'inizio della sessione.

### Tauri e Dioxus

Entrambi richiedono un'aggiunta lato Rust alla tua app, quindi segui le rispettive guide di avvio rapido:

- Tauri: aggiungi il crate `tauri-plugin-wdio-webdriver` (il provider integrato), quindi usa `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Consulta il [Tauri Quick Start](/docs/desktop-testing/tauri/quick-start).
- Dioxus: aggiungi il crate `wdio-dioxus-bridge` e crea una build di debug (`cargo build`). Quindi usa `services: [['dioxus', { driverProvider: 'embedded' }]]` con `browserName: 'dioxus'` e `'dioxus:options': { application: './target/debug/my-app' }`. Consulta il [Dioxus Quick Start](/docs/desktop-testing/dioxus/quick-start).

## Scegli il tuo percorso

- [macOS](/docs/desktop-testing/macos): app native macOS con Appium e il driver Mac2.
- [Windows](/docs/desktop-testing/windows): stato attuale dell'automazione delle app native Windows.
- [Electron](/docs/desktop-testing/electron): configurazione iniziale, poi [configurazione](/docs/desktop-testing/electron/configuration) (inclusi i percorsi dei binari per ciascun sistema operativo), [accesso alle API di Electron](/docs/desktop-testing/electron/api), [riferimento API e mocking](/docs/desktop-testing/electron/api-reference), [gestione delle finestre](/docs/desktop-testing/electron/window-management), [deeplink](/docs/desktop-testing/electron/deeplink-testing), [modalità standalone](/docs/desktop-testing/electron/standalone) e [debugging](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [supporto delle piattaforme](/docs/desktop-testing/tauri/platform-support), [configurazione](/docs/desktop-testing/tauri/configuration), [configurazione del plugin](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver su Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [esempi di utilizzo](/docs/desktop-testing/tauri/usage-examples) e il [riferimento API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [supporto delle piattaforme](/docs/desktop-testing/dioxus/platform-support), [configurazione](/docs/desktop-testing/dioxus/configuration), [configurazione del bridge](/docs/desktop-testing/dioxus/plugin-setup), [modalità browser](/docs/desktop-testing/dioxus/browser-mode) (test solo del frontend in Chrome con comandi simulati), [esempi di utilizzo](/docs/desktop-testing/dioxus/usage-examples) e il [riferimento API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): i servizi Electron, Tauri e Dioxus supportano sessioni multi-remote, ad esempio due istanze dell'app in un unico test.

## Linux

Su Linux, WebdriverIO pilota app Electron, Tauri e Dioxus. Cose da sapere:

- CI headless: queste app necessitano di un display server. Quando non è presente alcun display, il testrunner avvia Weston, oppure Xvfb come alternativa. Imposta `displayServerAutoInstall: true` per installarne uno se nessuno dei due è installato. In alternativa, avvia il testrunner tramite xvfb-run, ad esempio `xvfb-run -a npx wdio run wdio.conf.ts`. Consulta [Headless & Display Servers](/docs/headless-and-display-servers).
- Tauri con il provider `official` richiede WebKitWebDriver (pacchetto `webkit2gtk-driver`). Il provider `embedded` non richiede alcun driver esterno.
- Dioxus supporta solo il provider `embedded` su Linux, e la compilazione delle app Dioxus richiede le librerie di sviluppo di WebKitGTK.
- Electron su Ubuntu 24.04+ e altre distribuzioni con AppArmor abilitato: imposta l'opzione del servizio `apparmorAutoInstall` se Electron non riesce ad avviarsi.

## Risoluzione dei problemi

- Electron: [Problemi comuni](/docs/desktop-testing/electron/common-issues), ad esempio "DevToolsActivePort file doesn't exist" in CI.
- Tauri: [Risoluzione dei problemi](/docs/desktop-testing/tauri/troubleshooting), incluse le incompatibilità di versione tra Edge WebDriver e WebView2.
- Dioxus: [Risoluzione dei problemi](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: consulta il progetto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) per la configurazione specifica del driver, come Xcode.

## Passi successivi

- Riferimento della [Configurazione](/docs/configuration) per ogni opzione di `wdio.conf.ts`.
- Opzioni dell'[Appium Service](/docs/appium-service) per la configurazione Mac2.
- Altre piattaforme: [Browser web](/docs/platforms/web), [App mobili](/docs/platforms/mobile), [Estensioni ed editor](/docs/platforms/apps-and-extensions).