---
id: desktop
title: Skrivbordsappar
description: Välj rätt WebdriverIO-konfiguration för inbyggda macOS-appar och för Electron-, Tauri- och Dioxus-appar på macOS, Windows och Linux, och kör ett första test.
---

Hur WebdriverIO automatiserar en skrivbordsapp beror på hur appen är byggd. Inbyggda macOS-appar automatiseras via [Appium](/docs/appium) med Mac2-drivrutinen (`'appium:automationName': 'Mac2'`), vilket kräver Xcode. Appar som är byggda med ett webbaserat ramverk styrs via sin inbäddade webbläsarmotor av en dedikerad WebdriverIO-tjänst. [Electron-tjänsten](/docs/desktop-testing/electron) använder Chromium via en automatiskt installerad Chromedriver och kan även anropa API:er i Electrons huvudprocess. [Tauri-tjänsten](/docs/desktop-testing/tauri) och [Dioxus-tjänsten](/docs/desktop-testing/dioxus) styr operativsystemets webview: WebView2 på Windows, WKWebView på macOS och WebKitGTK på Linux. Dessa tre tjänster kör samma testsvit på Windows, macOS och Linux. För inbyggda Windows-appar finns i dag ingen rekommenderad drivrutin: Appiums Windows Driver bygger på Microsofts WinAppDriver, som inte längre underhålls. Det finns inget dokumenterat stöd för att automatisera godtyckliga inbyggda Linux-appar.

| Apptyp | macOS | Windows | Linux | Hur |
|----------|-------|---------|-------|-----|
| Inbyggd app | Ja | Rekommenderas inte | Inte dokumenterat | Appium Mac2-drivrutin |
| Electron | Ja | Ja | Ja | `@wdio/electron-service` (Chromedriver) |
| Tauri | Ja | Ja | Ja | `@wdio/tauri-service` (inbäddat plugin, `tauri-driver` eller CrabNebula) |
| Dioxus | Ja | Ja | Ja | `@wdio/dioxus-service` (inbäddad drivrutin; extern drivrutin endast på Windows) |

## Snabbstart

`npm create wdio@latest ./` skapar grundstrukturen för alla dessa. Välj "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" och sedan ditt ramverk. Varje konfiguration nedan behöver även `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` och en `tsconfig.json` med `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // behövs endast om automatisk identifiering av utdata från Electron Forge / electron-builder misslyckas
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

Använd `browser.electron.execute((electron, ...args) => { ... })` för att köra kod i huvudprocessen och `browser.electron.mock()` för att mocka Electron-API:er.

### Inbyggd macOS-app (Appium Mac2)

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

`appium:bundleId` väljer vilken app som ska startas när sessionen startar.

### Tauri och Dioxus

Båda kräver ett tillägg på Rust-sidan i din app, så följ deras snabbstarter:

- Tauri: lägg till craten `tauri-plugin-wdio-webdriver` (den inbäddade providern) och använd sedan `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Se [Tauri-snabbstarten](/docs/desktop-testing/tauri/quick-start).
- Dioxus: lägg till craten `wdio-dioxus-bridge` och skapa ett debug-bygge (`cargo build`). Använd sedan `services: [['dioxus', { driverProvider: 'embedded' }]]` med `browserName: 'dioxus'` och `'dioxus:options': { application: './target/debug/my-app' }`. Se [Dioxus-snabbstarten](/docs/desktop-testing/dioxus/quick-start).

## Välj din väg

- [macOS](/docs/desktop-testing/macos): inbyggda macOS-appar med Appium och Mac2-drivrutinen.
- [Windows](/docs/desktop-testing/windows): nuvarande läge för automatisering av inbyggda Windows-appar.
- [Electron](/docs/desktop-testing/electron): installation, därefter [konfiguration](/docs/desktop-testing/electron/configuration) (inklusive binärsökvägar per OS), [åtkomst till Electron-API:er](/docs/desktop-testing/electron/api), [API-referens och mockning](/docs/desktop-testing/electron/api-reference), [fönsterhantering](/docs/desktop-testing/electron/window-management), [djuplänkar](/docs/desktop-testing/electron/deeplink-testing), [fristående läge](/docs/desktop-testing/electron/standalone) och [felsökning](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [plattformsstöd](/docs/desktop-testing/tauri/platform-support), [konfiguration](/docs/desktop-testing/tauri/configuration), [plugin-installation](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver på Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [användningsexempel](/docs/desktop-testing/tauri/usage-examples) och [API-referensen](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [plattformsstöd](/docs/desktop-testing/dioxus/platform-support), [konfiguration](/docs/desktop-testing/dioxus/configuration), [bridge-installation](/docs/desktop-testing/dioxus/plugin-setup), [webbläsarläge](/docs/desktop-testing/dioxus/browser-mode) (tester av enbart frontend i Chrome med mockade kommandon), [användningsexempel](/docs/desktop-testing/dioxus/usage-examples) och [API-referensen](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): tjänsterna för Electron, Tauri och Dioxus stöder multi-remote-sessioner, t.ex. två appinstanser i ett test.

## Linux

På Linux styr WebdriverIO Electron-, Tauri- och Dioxus-appar. Bra att veta:

- Headless CI: dessa appar behöver en displayserver. När ingen display finns startar testrunnern Weston, eller Xvfb som reserv. Ange `displayServerAutoInstall: true` för att installera en om ingen av dem är installerad. Alternativt kan du köra testrunnern via xvfb-run, t.ex. `xvfb-run -a npx wdio run wdio.conf.ts`. Se [Headless & displayservrar](/docs/headless-and-display-servers).
- Tauri med providern `official` behöver WebKitWebDriver (paketet `webkit2gtk-driver`). Providern `embedded` behöver ingen extern drivrutin.
- Dioxus stöder endast providern `embedded` på Linux, och för att bygga Dioxus-appar krävs utvecklingsbiblioteken för WebKitGTK.
- Electron på Ubuntu 24.04+ och andra distributioner med AppArmor aktiverat: ange tjänstalternativet `apparmorAutoInstall` om Electron inte startar.

## Felsökning

- Electron: [Vanliga problem](/docs/desktop-testing/electron/common-issues), t.ex. "DevToolsActivePort file doesn't exist" i CI.
- Tauri: [Felsökning](/docs/desktop-testing/tauri/troubleshooting), inklusive versionskonflikter mellan Edge WebDriver och WebView2.
- Dioxus: [Felsökning](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: se projektet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) för drivrutinsspecifik konfiguration, till exempel Xcode.

## Nästa steg

- [Konfigurationsreferens](/docs/configuration) för alla alternativ i `wdio.conf.ts`.
- Alternativ för [Appium-tjänsten](/docs/appium-service) för Mac2-konfigurationen.
- Andra plattformar: [Webbläsare](/docs/platforms/web), [Mobilappar](/docs/platforms/mobile), [Tillägg & editorer](/docs/platforms/apps-and-extensions).