---
id: mobile
title: Applications mobiles
description: Configurez et exécutez des tests WebdriverIO pour des applications natives, hybrides et web mobiles sur des émulateurs Android, des simulateurs iOS, des appareils réels et des clouds d'appareils.
---

WebdriverIO automatise Android et iOS via [Appium](/docs/appium), qui utilise le protocole WebDriver. Vos tests utilisent le même objet `browser` (avec l'alias `driver`), les mêmes sélecteurs `$`/`$$` et les mêmes matchers `expect` que les tests de navigateur. Appium achemine chaque session vers un driver de plateforme choisi via `appium:automationName`. Pour Android, il s'agit de `UiAutomator2`, avec Espresso comme alternative qui débloque des stratégies de sélecteurs supplémentaires. Pour iOS et iPadOS, il s'agit de `XCUITest`. Avec ces drivers, vous pouvez tester des applications natives ainsi que le web mobile dans Chrome sur Android ou Safari sur iOS. Vous pouvez également tester des applications hybrides, en basculant entre le contexte natif et les webviews intégrées. Les sessions peuvent s'exécuter sur des émulateurs Android, des simulateurs iOS, des appareils réels ou des clouds d'appareils tels que Sauce Labs, BrowserStack, TestingBot et TestMu AI. Le [`@wdio/appium-service`](/docs/appium-service) démarre et arrête un serveur Appium local pour vous. En plus de l'API Appium brute, WebdriverIO ajoute des [commandes mobiles](/docs/api/mobile) multiplateformes telles que `tap`, `swipe`, `longPress`, `scrollIntoView` et `switchContext`.

## Démarrage rapide

Prérequis : Android Studio avec un SDK Android et un émulateur pour Android ; Xcode et un simulateur sur macOS pour iOS. `npx appium-installer` vous guide dans la configuration de l'environnement, et `npm init wdio@latest .` génère la structure d'un projet mobile (choisissez Android ou iOS). Pour une configuration manuelle :

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

`~` est le sélecteur d'accessibility id : il correspond à `content-description` sur Android et à `accessibilityIdentifier` sur iOS, et constitue la stratégie multiplateforme recommandée. Remplacez les identifiants d'exemple, le titre de la webview et le chemin de l'application par les vôtres.

Les autres cibles ne modifient que les capabilities :

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app pour les simulateurs, .ipa signé pour les appareils réels
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

Pour le web mobile sur iOS, utilisez `platformName: 'iOS'`, `browserName: 'Safari'` et `'appium:automationName': 'XCUITest'`.

## Choisissez votre parcours

- [Configuration d'Appium](/docs/appium) : les plateformes couvertes par Appium (iOS, Android, Tizen, applications TV) et comment installer la chaîne d'outils.
- [Service Appium](/docs/appium-service) : les options du service (`args`, `command`, `logPath`), `npx start-appium-inspector` pour ouvrir l'Appium Inspector, et un optimiseur bêta pour les sélecteurs XPath lents.
- [Commandes mobiles](/docs/api/mobile) : gestes et utilitaires multiplateformes. Couvre les applications hybrides avec [`getContexts`](/docs/api/mobile/getContexts) et [`switchContext`](/docs/api/mobile/switchContext), ainsi que les capabilities de webview pour iOS.
- [Sélecteurs mobiles](/docs/selectors#mobile-selectors) : accessibility id, Android UiAutomator, matchers data/view d'Espresso, ainsi que les predicate strings et class chains iOS.
- [Commandes du protocole Appium](/docs/api/appium) : les endpoints Appium bruts disponibles sur `driver`.
- [Applications Flutter](/docs/flutter-testing/introduction) : pourquoi Flutter nécessite l'Appium Flutter Driver, puis [préparer l'application](/docs/flutter-testing/preparing-flutter-application), [configurer Appium](/docs/flutter-testing/base-appium-configuration), [configurer WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) et [écrire des tests](/docs/flutter-testing/writing-tests).
- [Services cloud](/docs/cloudservices) : connectez-vous à Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto ou RobotActions pour exécuter vos tests sur des appareils réels hébergés.
- [Tests visuels](/docs/visual-testing) : comparaison d'images pour les applications natives, les applications hybrides et les navigateurs mobiles. Pour Percy sur mobile, consultez [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote) : coordonnez plusieurs appareils ou navigateurs dans un même test.

Émuler le viewport d'un appareil dans un navigateur de bureau avec [`browser.emulate('device', ...)`](/docs/emulation) ne constitue pas un test mobile. Les moteurs des navigateurs de bureau diffèrent de ceux des navigateurs mobiles ; utilisez donc plutôt Appium avec un véritable navigateur mobile.

## Dépannage

- La session ne démarre pas : assurez-vous que le driver Appium correspondant à votre `appium:automationName` est installé et que l'émulateur ou le simulateur est en cours d'exécution. Utilisez `port: 4723`, sauf si vous avez modifié le port d'Appium.
- iOS ne trouve pas de webview : essayez `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` ou `appium:includeSafariInWebviews` (voir [Applications hybrides](/docs/api/mobile#hybrid-apps)).
- La webview Android met du temps à apparaître : ajustez `androidWebviewConnectionRetryTime` et `androidWebviewConnectTimeout` sur `getContexts`/`switchContext`.
- Les widgets Flutter ne sont pas trouvés avec les sélecteurs natifs : c'est normal. Utilisez le driver Flutter et les finders décrits dans le [guide Flutter](/docs/flutter-testing/introduction).

## Étapes suivantes

- Références de [Configuration](/docs/configuration) et des [Capabilities](/docs/capabilities).
- [Pattern Page Object](/docs/pageobjects) pour partager des écrans entre les specs Android et iOS.
- [MCP](/docs/mcp) pour permettre à un agent IA de piloter des sessions iOS et Android via Appium.
- Autres plateformes : [Navigateurs web](/docs/platforms/web), [Applications de bureau](/docs/platforms/desktop), [Extensions et éditeurs](/docs/platforms/apps-and-extensions).