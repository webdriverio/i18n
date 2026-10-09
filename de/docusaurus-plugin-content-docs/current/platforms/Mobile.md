---
id: mobile
title: Mobile Apps
description: Einrichten und Ausführen von WebdriverIO-Tests für native, hybride und mobile Web-Apps auf Android- und iOS-Emulatoren, Simulatoren, echten Geräten und Device Clouds.
---

WebdriverIO automatisiert Android und iOS über [Appium](/docs/appium), das das WebDriver-Protokoll spricht. Ihre Tests verwenden dasselbe `browser`-Objekt (mit dem Alias `driver`), dieselben `$`/`$$`-Selektoren und `expect`-Matcher wie Browser-Tests. Appium leitet jede Session an einen Plattform-Treiber weiter, der über `appium:automationName` ausgewählt wird. Für Android ist das `UiAutomator2`, mit Espresso als Alternative, die zusätzliche Selektor-Strategien ermöglicht. Für iOS und iPadOS ist es `XCUITest`. Mit diesen Treibern können Sie native Apps sowie mobiles Web in Chrome auf Android oder Safari auf iOS testen. Sie können auch hybride Apps testen und dabei zwischen dem nativen Kontext und eingebetteten Webviews wechseln. Sessions können auf Android-Emulatoren, iOS-Simulatoren, echten Geräten oder Device Clouds wie Sauce Labs, BrowserStack, TestingBot und TestMu AI ausgeführt werden. Der [`@wdio/appium-service`](/docs/appium-service) startet und stoppt einen lokalen Appium-Server für Sie. Zusätzlich zur reinen Appium-API bietet WebdriverIO plattformübergreifende [mobile Befehle](/docs/api/mobile) wie `tap`, `swipe`, `longPress`, `scrollIntoView` und `switchContext`.

## Schnellstart

Voraussetzungen: Android Studio mit einem Android SDK und einem Emulator für Android; Xcode und ein Simulator unter macOS für iOS. `npx appium-installer` führt Sie durch die Einrichtung der Umgebung, und `npm init wdio@latest .` erstellt ein Grundgerüst für ein mobiles Projekt (wählen Sie Android oder iOS). Für die manuelle Einrichtung:

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

`~` ist der Accessibility-ID-Selektor: Er entspricht `content-description` auf Android und `accessibilityIdentifier` auf iOS und ist die bevorzugte plattformübergreifende Strategie. Ersetzen Sie die Beispiel-IDs, den Webview-Titel und den App-Pfad durch Ihre eigenen.

Für andere Ziele ändern sich nur die Capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app für Simulatoren, signierte .ipa für echte Geräte
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

Für mobiles Web auf iOS verwenden Sie `platformName: 'iOS'`, `browserName: 'Safari'` und `'appium:automationName': 'XCUITest'`.

## Wählen Sie Ihren Weg

- [Appium-Einrichtung](/docs/appium): welche Plattformen Appium abdeckt (iOS, Android, Tizen, TV-Apps) und wie Sie die Toolchain installieren.
- [Appium Service](/docs/appium-service): Service-Optionen (`args`, `command`, `logPath`), `npx start-appium-inspector` zum Öffnen des Appium Inspectors sowie ein Beta-Optimierer für langsame XPath-Selektoren.
- [Mobile Befehle](/docs/api/mobile): plattformübergreifende Gesten und Hilfsfunktionen. Behandelt hybride Apps mit [`getContexts`](/docs/api/mobile/getContexts) und [`switchContext`](/docs/api/mobile/switchContext) sowie die Webview-Capabilities für iOS.
- [Mobile Selektoren](/docs/selectors#mobile-selectors): Accessibility-ID, Android UiAutomator, Espresso Data/View Matcher sowie iOS Predicate Strings und Class Chains.
- [Appium-Protokollbefehle](/docs/api/appium): die reinen Appium-Endpunkte, die auf `driver` verfügbar sind.
- [Flutter-Apps](/docs/flutter-testing/introduction): warum Flutter den Appium Flutter Driver benötigt, dann [die App vorbereiten](/docs/flutter-testing/preparing-flutter-application), [Appium konfigurieren](/docs/flutter-testing/base-appium-configuration), [WebdriverIO einrichten](/docs/flutter-testing/setting-up-webdriverio) und [Tests schreiben](/docs/flutter-testing/writing-tests).
- [Cloud-Dienste](/docs/cloudservices): Verbindung zu Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto oder RobotActions, um Tests auf gehosteten echten Geräten auszuführen.
- [Visuelles Testen](/docs/visual-testing): Bildvergleich für native Apps, hybride Apps und mobile Browser. Für Percy auf Mobilgeräten siehe [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-Remote](/docs/multiremote): mehrere Geräte oder Browser in einem Test koordinieren.

Das Emulieren eines Geräte-Viewports in einem Desktop-Browser mit [`browser.emulate('device', ...)`](/docs/emulation) ist kein mobiles Testen. Desktop-Browser-Engines unterscheiden sich von mobilen, verwenden Sie daher stattdessen Appium mit einem echten mobilen Browser.

## Fehlerbehebung

- Session startet nicht: Stellen Sie sicher, dass der Appium-Treiber für Ihren `appium:automationName` installiert ist und der Emulator oder Simulator läuft. Verwenden Sie `port: 4723`, sofern Sie den Appium-Port nicht geändert haben.
- iOS findet keine Webview: Probieren Sie `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` oder `appium:includeSafariInWebviews` (siehe [Hybride Apps](/docs/api/mobile#hybrid-apps)).
- Android-Webview erscheint nur langsam: Passen Sie `androidWebviewConnectionRetryTime` und `androidWebviewConnectTimeout` bei `getContexts`/`switchContext` an.
- Flutter-Widgets werden mit nativen Selektoren nicht gefunden: Das ist zu erwarten. Verwenden Sie den Flutter-Treiber und die Finder, die im [Flutter-Leitfaden](/docs/flutter-testing/introduction) beschrieben sind.

## Nächste Schritte

- Referenzen zu [Konfiguration](/docs/configuration) und [Capabilities](/docs/capabilities).
- [Page Object Pattern](/docs/pageobjects), um Screens zwischen Android- und iOS-Specs zu teilen.
- [MCP](/docs/mcp), um einen KI-Agenten iOS- und Android-Sessions über Appium steuern zu lassen.
- Andere Plattformen: [Webbrowser](/docs/platforms/web), [Desktop-Apps](/docs/platforms/desktop), [Erweiterungen & Editoren](/docs/platforms/apps-and-extensions).