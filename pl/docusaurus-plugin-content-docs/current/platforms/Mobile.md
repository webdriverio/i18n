---
id: mobile
title: Aplikacje mobilne
description: Skonfiguruj i uruchamiaj testy WebdriverIO dla natywnych, hybrydowych i mobilnych aplikacji webowych na emulatorach Androida, symulatorach iOS, prawdziwych urządzeniach i w chmurach urządzeń.
---

WebdriverIO automatyzuje Androida i iOS za pomocą [Appium](/docs/appium), który komunikuje się przez protokół WebDriver. Twoje testy używają tego samego obiektu `browser` (z aliasem `driver`), selektorów `$`/`$$` oraz matcherów `expect` co testy przeglądarkowe. Appium kieruje każdą sesję do sterownika platformy wybranego przez `appium:automationName`. Dla Androida jest to `UiAutomator2`, z Espresso jako alternatywą, która udostępnia dodatkowe strategie selektorów. Dla iOS i iPadOS jest to `XCUITest`. Za pomocą tych sterowników możesz testować aplikacje natywne oraz mobilne strony internetowe w Chrome na Androidzie lub Safari na iOS. Możesz również testować aplikacje hybrydowe, przełączając się między kontekstem natywnym a osadzonymi webview. Sesje mogą działać na emulatorach Androida, symulatorach iOS, prawdziwych urządzeniach lub w chmurach urządzeń, takich jak Sauce Labs, BrowserStack, TestingBot i TestMu AI. [`@wdio/appium-service`](/docs/appium-service) uruchamia i zatrzymuje za Ciebie lokalny serwer Appium. Oprócz surowego API Appium, WebdriverIO dodaje wieloplatformowe [komendy mobilne](/docs/api/mobile), takie jak `tap`, `swipe`, `longPress`, `scrollIntoView` i `switchContext`.

## Szybki start

Wymagania wstępne: Android Studio z Android SDK i emulatorem dla Androida; Xcode i symulator na macOS dla iOS. `npx appium-installer` przeprowadzi Cię przez konfigurację środowiska, a `npm init wdio@latest .` utworzy szkielet projektu mobilnego (wybierz Android lub iOS). Aby skonfigurować ręcznie:

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

`~` to selektor accessibility id: odpowiada `content-description` na Androidzie i `accessibilityIdentifier` na iOS, i jest preferowaną strategią wieloplatformową. Zastąp przykładowe identyfikatory, tytuł webview i ścieżkę do aplikacji własnymi.

Inne cele wymagają jedynie zmiany capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app dla symulatorów, podpisany .ipa dla prawdziwych urządzeń
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

Dla mobilnych stron internetowych na iOS użyj `platformName: 'iOS'`, `browserName: 'Safari'` i `'appium:automationName': 'XCUITest'`.

## Wybierz swoją ścieżkę

- [Konfiguracja Appium](/docs/appium): jakie platformy obsługuje Appium (iOS, Android, Tizen, aplikacje TV) i jak zainstalować narzędzia.
- [Usługa Appium](/docs/appium-service): opcje usługi (`args`, `command`, `logPath`), `npx start-appium-inspector` do otwierania Appium Inspector oraz optymalizator w wersji beta dla wolnych selektorów XPath.
- [Komendy mobilne](/docs/api/mobile): wieloplatformowe gesty i funkcje pomocnicze. Obejmuje aplikacje hybrydowe z [`getContexts`](/docs/api/mobile/getContexts) i [`switchContext`](/docs/api/mobile/switchContext), a także capabilities webview dla iOS.
- [Selektory mobilne](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, matchery data/view Espresso oraz predicate strings i class chains na iOS.
- [Komendy protokołu Appium](/docs/api/appium): surowe endpointy Appium dostępne w `driver`.
- [Aplikacje Flutter](/docs/flutter-testing/introduction): dlaczego Flutter wymaga Appium Flutter Driver, a następnie [przygotuj aplikację](/docs/flutter-testing/preparing-flutter-application), [skonfiguruj Appium](/docs/flutter-testing/base-appium-configuration), [skonfiguruj WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) i [napisz testy](/docs/flutter-testing/writing-tests).
- [Usługi chmurowe](/docs/cloudservices): połącz się z Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto lub RobotActions, aby uruchamiać testy na hostowanych prawdziwych urządzeniach.
- [Testy wizualne](/docs/visual-testing): porównywanie obrazów dla aplikacji natywnych, hybrydowych i przeglądarek mobilnych. Informacje o Percy na urządzeniach mobilnych znajdziesz w [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): koordynuj wiele urządzeń lub przeglądarek w jednym teście.

Emulowanie widoku urządzenia w przeglądarce desktopowej za pomocą [`browser.emulate('device', ...)`](/docs/emulation) nie jest testowaniem mobilnym. Silniki przeglądarek desktopowych różnią się od mobilnych, więc zamiast tego używaj Appium z prawdziwą przeglądarką mobilną.

## Rozwiązywanie problemów

- Sesja się nie uruchamia: upewnij się, że sterownik Appium dla Twojego `appium:automationName` jest zainstalowany, a emulator lub symulator jest uruchomiony. Używaj `port: 4723`, chyba że zmieniłeś port Appium.
- iOS nie może znaleźć webview: spróbuj `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` lub `appium:includeSafariInWebviews` (zobacz [Aplikacje hybrydowe](/docs/api/mobile#hybrid-apps)).
- Webview na Androidzie pojawia się powoli: dostosuj `androidWebviewConnectionRetryTime` i `androidWebviewConnectTimeout` w `getContexts`/`switchContext`.
- Widżety Flutter nie są znajdowane za pomocą selektorów natywnych: to oczekiwane zachowanie. Użyj sterownika Flutter i finderów opisanych w [przewodniku Flutter](/docs/flutter-testing/introduction).

## Następne kroki

- Dokumentacja [Konfiguracji](/docs/configuration) i [Capabilities](/docs/capabilities).
- [Wzorzec Page Object](/docs/pageobjects), aby współdzielić ekrany między specyfikacjami dla Androida i iOS.
- [MCP](/docs/mcp), aby pozwolić agentowi AI sterować sesjami iOS i Android za pośrednictwem Appium.
- Inne platformy: [Przeglądarki internetowe](/docs/platforms/web), [Aplikacje desktopowe](/docs/platforms/desktop), [Rozszerzenia i edytory](/docs/platforms/apps-and-extensions).