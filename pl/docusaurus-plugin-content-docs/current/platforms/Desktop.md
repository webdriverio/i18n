---
id: desktop
title: Aplikacje desktopowe
description: Wybierz odpowiednią konfigurację WebdriverIO dla natywnych aplikacji macOS oraz dla aplikacji Electron, Tauri i Dioxus na macOS, Windows i Linux, a następnie uruchom pierwszy test.
---

Sposób, w jaki WebdriverIO automatyzuje aplikację desktopową, zależy od tego, jak aplikacja została zbudowana. Natywne aplikacje macOS są automatyzowane za pomocą [Appium](/docs/appium) ze sterownikiem Mac2 (`'appium:automationName': 'Mac2'`), który wymaga Xcode. Aplikacje zbudowane przy użyciu frameworka webowego są sterowane przez wbudowany silnik przeglądarki za pomocą dedykowanej usługi WebdriverIO. [Usługa Electron](/docs/desktop-testing/electron) korzysta z Chromium poprzez automatycznie instalowany Chromedriver i może także wywoływać API procesu głównego Electrona. [Usługa Tauri](/docs/desktop-testing/tauri) oraz [usługa Dioxus](/docs/desktop-testing/dioxus) sterują webview systemu operacyjnego: WebView2 na Windows, WKWebView na macOS i WebKitGTK na Linux. Te trzy usługi uruchamiają ten sam zestaw testów na Windows, macOS i Linux. Dla natywnych aplikacji Windows nie ma obecnie zalecanego sterownika: Windows Driver od Appium jest oparty na WinAppDriver firmy Microsoft, który nie jest już rozwijany. Nie ma udokumentowanego wsparcia dla automatyzacji dowolnych natywnych aplikacji Linux.

| Typ aplikacji | macOS | Windows | Linux | Sposób |
|----------|-------|---------|-------|-----|
| Aplikacja natywna | Tak | Niezalecane | Nieudokumentowane | Sterownik Appium Mac2 |
| Electron | Tak | Tak | Tak | `@wdio/electron-service` (Chromedriver) |
| Tauri | Tak | Tak | Tak | `@wdio/tauri-service` (wbudowana wtyczka, `tauri-driver` lub CrabNebula) |
| Dioxus | Tak | Tak | Tak | `@wdio/dioxus-service` (wbudowany sterownik; zewnętrzny sterownik tylko na Windows) |

## Szybki start

`npm create wdio@latest ./` tworzy szkielet każdej z tych konfiguracji. Wybierz „Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications”, a następnie swój framework. Każda z poniższych konfiguracji wymaga również `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` oraz pliku `tsconfig.json` z `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // potrzebne tylko, jeśli automatyczne wykrywanie wyników Electron Forge / electron-builder zawiedzie
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

Użyj `browser.electron.execute((electron, ...args) => { ... })`, aby uruchomić kod w procesie głównym, oraz `browser.electron.mock()`, aby mockować API Electrona.

### Natywna aplikacja macOS (Appium Mac2)

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

`appium:bundleId` określa aplikację uruchamianą na początku sesji.

### Tauri i Dioxus

Obie wymagają dodatku po stronie Rusta w Twojej aplikacji, więc postępuj zgodnie z ich przewodnikami szybkiego startu:

- Tauri: dodaj crate `tauri-plugin-wdio-webdriver` (wbudowany dostawca), a następnie użyj `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Zobacz [Tauri Quick Start](/docs/desktop-testing/tauri/quick-start).
- Dioxus: dodaj crate `wdio-dioxus-bridge` i utwórz build debugowy (`cargo build`). Następnie użyj `services: [['dioxus', { driverProvider: 'embedded' }]]` z `browserName: 'dioxus'` oraz `'dioxus:options': { application: './target/debug/my-app' }`. Zobacz [Dioxus Quick Start](/docs/desktop-testing/dioxus/quick-start).

## Wybierz swoją ścieżkę

- [macOS](/docs/desktop-testing/macos): natywne aplikacje macOS z Appium i sterownikiem Mac2.
- [Windows](/docs/desktop-testing/windows): obecny stan automatyzacji natywnych aplikacji Windows.
- [Electron](/docs/desktop-testing/electron): konfiguracja początkowa, a następnie [konfiguracja](/docs/desktop-testing/electron/configuration) (w tym ścieżki do plików binarnych dla poszczególnych systemów), [dostęp do API Electrona](/docs/desktop-testing/electron/api), [dokumentacja API i mockowanie](/docs/desktop-testing/electron/api-reference), [zarządzanie oknami](/docs/desktop-testing/electron/window-management), [deeplinki](/docs/desktop-testing/electron/deeplink-testing), [tryb standalone](/docs/desktop-testing/electron/standalone) oraz [debugowanie](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [obsługa platform](/docs/desktop-testing/tauri/platform-support), [konfiguracja](/docs/desktop-testing/tauri/configuration), [konfiguracja wtyczki](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver na Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [przykłady użycia](/docs/desktop-testing/tauri/usage-examples) oraz [dokumentacja API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [obsługa platform](/docs/desktop-testing/dioxus/platform-support), [konfiguracja](/docs/desktop-testing/dioxus/configuration), [konfiguracja bridge](/docs/desktop-testing/dioxus/plugin-setup), [tryb przeglądarki](/docs/desktop-testing/dioxus/browser-mode) (testy samego frontendu w Chrome z mockowanymi komendami), [przykłady użycia](/docs/desktop-testing/dioxus/usage-examples) oraz [dokumentacja API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): usługi Electron, Tauri i Dioxus obsługują sesje multi-remote, np. dwie instancje aplikacji w jednym teście.

## Linux

Na Linuksie WebdriverIO steruje aplikacjami Electron, Tauri i Dioxus. Warto wiedzieć:

- Headless CI: te aplikacje wymagają serwera wyświetlania. Gdy żaden wyświetlacz nie istnieje, testrunner uruchamia Weston, a awaryjnie Xvfb. Ustaw `displayServerAutoInstall: true`, aby zainstalować jeden z nich, jeśli żaden nie jest zainstalowany. Alternatywnie opakuj testrunner w xvfb-run, np. `xvfb-run -a npx wdio run wdio.conf.ts`. Zobacz [Headless & Display Servers](/docs/headless-and-display-servers).
- Tauri z dostawcą `official` wymaga WebKitWebDriver (pakiet `webkit2gtk-driver`). Dostawca `embedded` nie wymaga zewnętrznego sterownika.
- Dioxus obsługuje na Linuksie wyłącznie dostawcę `embedded`, a budowanie aplikacji Dioxus wymaga bibliotek deweloperskich WebKitGTK.
- Electron na Ubuntu 24.04+ i innych dystrybucjach z włączonym AppArmor: ustaw opcję usługi `apparmorAutoInstall`, jeśli Electron nie uruchamia się.

## Rozwiązywanie problemów

- Electron: [Common Issues](/docs/desktop-testing/electron/common-issues), np. „DevToolsActivePort file doesn't exist” w CI.
- Tauri: [Troubleshooting](/docs/desktop-testing/tauri/troubleshooting), w tym niezgodności wersji Edge WebDriver i WebView2.
- Dioxus: [Troubleshooting](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: zobacz projekt [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver), aby uzyskać informacje o konfiguracji specyficznej dla sterownika, np. Xcode.

## Następne kroki

- Dokumentacja [konfiguracji](/docs/configuration) dla każdej opcji `wdio.conf.ts`.
- Opcje [Appium Service](/docs/appium-service) dla konfiguracji Mac2.
- Inne platformy: [Przeglądarki internetowe](/docs/platforms/web), [Aplikacje mobilne](/docs/platforms/mobile), [Rozszerzenia i edytory](/docs/platforms/apps-and-extensions).