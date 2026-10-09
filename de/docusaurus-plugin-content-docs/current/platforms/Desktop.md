---
id: desktop
title: Desktop-Apps
description: Wählen Sie das passende WebdriverIO-Setup für native macOS-Apps sowie für Electron-, Tauri- und Dioxus-Apps unter macOS, Windows und Linux und führen Sie einen ersten Test aus.
---

Wie WebdriverIO eine Desktop-App automatisiert, hängt davon ab, wie die App erstellt wurde. Native macOS-Apps werden über [Appium](/docs/appium) mit dem Mac2-Treiber (`'appium:automationName': 'Mac2'`) automatisiert, der Xcode voraussetzt. Apps, die mit einem webbasierten Framework erstellt wurden, werden über ihre eingebettete Browser-Engine von einem eigenen WebdriverIO-Service gesteuert. Der [Electron-Service](/docs/desktop-testing/electron) nutzt Chromium über einen automatisch installierten Chromedriver und kann außerdem APIs des Electron-Hauptprozesses aufrufen. Der [Tauri-Service](/docs/desktop-testing/tauri) und der [Dioxus-Service](/docs/desktop-testing/dioxus) steuern die Webview des Betriebssystems: WebView2 unter Windows, WKWebView unter macOS und WebKitGTK unter Linux. Diese drei Services führen dieselbe Testsuite unter Windows, macOS und Linux aus. Für native Windows-Apps gibt es derzeit keinen empfohlenen Treiber: Der Windows Driver von Appium basiert auf Microsofts WinAppDriver, der nicht mehr gepflegt wird. Für die Automatisierung beliebiger nativer Linux-Apps gibt es keine dokumentierte Unterstützung.

| App-Typ | macOS | Windows | Linux | Wie |
|----------|-------|---------|-------|-----|
| Native App | Ja | Nicht empfohlen | Nicht dokumentiert | Appium Mac2-Treiber |
| Electron | Ja | Ja | Ja | `@wdio/electron-service` (Chromedriver) |
| Tauri | Ja | Ja | Ja | `@wdio/tauri-service` (eingebettetes Plugin, `tauri-driver` oder CrabNebula) |
| Dioxus | Ja | Ja | Ja | `@wdio/dioxus-service` (eingebetteter Treiber; externer Treiber nur unter Windows) |

## Schnellstart

`npm create wdio@latest ./` erstellt das Grundgerüst für all diese Varianten. Wählen Sie „Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications“ und anschließend Ihr Framework. Jedes der folgenden Setups benötigt außerdem `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` sowie eine `tsconfig.json` mit `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // nur erforderlich, wenn die automatische Erkennung der Electron Forge- / electron-builder-Ausgabe fehlschlägt
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

Verwenden Sie `browser.electron.execute((electron, ...args) => { ... })`, um Code im Hauptprozess auszuführen, und `browser.electron.mock()`, um Electron-APIs zu mocken.

### Native macOS-App (Appium Mac2)

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

`appium:bundleId` legt fest, welche App beim Start der Session gestartet wird.

### Tauri und Dioxus

Beide erfordern eine Ergänzung auf der Rust-Seite Ihrer App, folgen Sie daher den jeweiligen Schnellstart-Anleitungen:

- Tauri: Fügen Sie das Crate `tauri-plugin-wdio-webdriver` (den eingebetteten Provider) hinzu und verwenden Sie dann `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Siehe den [Tauri-Schnellstart](/docs/desktop-testing/tauri/quick-start).
- Dioxus: Fügen Sie das Crate `wdio-dioxus-bridge` hinzu und erstellen Sie einen Debug-Build (`cargo build`). Verwenden Sie dann `services: [['dioxus', { driverProvider: 'embedded' }]]` mit `browserName: 'dioxus'` und `'dioxus:options': { application: './target/debug/my-app' }`. Siehe den [Dioxus-Schnellstart](/docs/desktop-testing/dioxus/quick-start).

## Wählen Sie Ihren Weg

- [macOS](/docs/desktop-testing/macos): native macOS-Apps mit Appium und dem Mac2-Treiber.
- [Windows](/docs/desktop-testing/windows): aktueller Stand der Automatisierung nativer Windows-Apps.
- [Electron](/docs/desktop-testing/electron): Einrichtung, dann [Konfiguration](/docs/desktop-testing/electron/configuration) (einschließlich Binärpfaden pro Betriebssystem), [Zugriff auf Electron-APIs](/docs/desktop-testing/electron/api), [API-Referenz und Mocking](/docs/desktop-testing/electron/api-reference), [Fensterverwaltung](/docs/desktop-testing/electron/window-management), [Deeplinks](/docs/desktop-testing/electron/deeplink-testing), [Standalone-Modus](/docs/desktop-testing/electron/standalone) und [Debugging](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [Plattformunterstützung](/docs/desktop-testing/tauri/platform-support), [Konfiguration](/docs/desktop-testing/tauri/configuration), [Plugin-Einrichtung](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver unter Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [Anwendungsbeispiele](/docs/desktop-testing/tauri/usage-examples) und die [API-Referenz](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [Plattformunterstützung](/docs/desktop-testing/dioxus/platform-support), [Konfiguration](/docs/desktop-testing/dioxus/configuration), [Bridge-Einrichtung](/docs/desktop-testing/dioxus/plugin-setup), [Browser-Modus](/docs/desktop-testing/dioxus/browser-mode) (reine Frontend-Tests in Chrome mit gemockten Befehlen), [Anwendungsbeispiele](/docs/desktop-testing/dioxus/usage-examples) und die [API-Referenz](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): Die Services für Electron, Tauri und Dioxus unterstützen Multi-remote-Sessions, z. B. zwei App-Instanzen in einem Test.

## Linux

Unter Linux steuert WebdriverIO Electron-, Tauri- und Dioxus-Apps. Wissenswertes:

- Headless-CI: Diese Apps benötigen einen Display-Server. Wenn kein Display vorhanden ist, startet der Testrunner Weston oder ersatzweise Xvfb. Setzen Sie `displayServerAutoInstall: true`, um einen zu installieren, falls keiner von beiden installiert ist. Alternativ können Sie den Testrunner mit xvfb-run umschließen, z. B. `xvfb-run -a npx wdio run wdio.conf.ts`. Siehe [Headless & Display-Server](/docs/headless-and-display-servers).
- Tauri mit dem `official`-Provider benötigt WebKitWebDriver (Paket `webkit2gtk-driver`). Der `embedded`-Provider benötigt keinen externen Treiber.
- Dioxus unterstützt unter Linux nur den `embedded`-Provider, und zum Erstellen von Dioxus-Apps sind die WebKitGTK-Entwicklungsbibliotheken erforderlich.
- Electron unter Ubuntu 24.04+ und anderen Distributionen mit aktiviertem AppArmor: Setzen Sie die Service-Option `apparmorAutoInstall`, falls Electron nicht startet.

## Fehlerbehebung

- Electron: [Häufige Probleme](/docs/desktop-testing/electron/common-issues), z. B. „DevToolsActivePort file doesn't exist“ in der CI.
- Tauri: [Fehlerbehebung](/docs/desktop-testing/tauri/troubleshooting), einschließlich Versionskonflikten zwischen Edge WebDriver und WebView2.
- Dioxus: [Fehlerbehebung](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: Siehe das Projekt [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) für treiberspezifische Einrichtung wie Xcode.

## Nächste Schritte

- [Konfigurations](/docs/configuration)-Referenz für jede `wdio.conf.ts`-Option.
- Optionen des [Appium-Service](/docs/appium-service) für das Mac2-Setup.
- Andere Plattformen: [Webbrowser](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Erweiterungen & Editoren](/docs/platforms/apps-and-extensions).