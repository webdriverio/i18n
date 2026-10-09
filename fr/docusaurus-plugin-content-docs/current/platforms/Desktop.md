---
id: desktop
title: Applications de bureau
description: Choisissez la bonne configuration WebdriverIO pour les applications macOS natives et pour les applications Electron, Tauri et Dioxus sur macOS, Windows et Linux, puis exécutez un premier test.
---

La manière dont WebdriverIO automatise une application de bureau dépend de la façon dont l'application est construite. Les applications macOS natives sont automatisées via [Appium](/docs/appium) avec le driver Mac2 (`'appium:automationName': 'Mac2'`), qui nécessite Xcode. Les applications construites avec un framework basé sur le web sont pilotées via leur moteur de navigateur intégré par un service WebdriverIO dédié. Le [service Electron](/docs/desktop-testing/electron) utilise Chromium via un Chromedriver installé automatiquement et peut également appeler les API du processus principal d'Electron. Le [service Tauri](/docs/desktop-testing/tauri) et le [service Dioxus](/docs/desktop-testing/dioxus) pilotent la webview du système d'exploitation : WebView2 sur Windows, WKWebView sur macOS et WebKitGTK sur Linux. Ces trois services exécutent la même suite de tests sur Windows, macOS et Linux. Les applications Windows natives n'ont actuellement aucun driver recommandé : le Windows Driver d'Appium est basé sur WinAppDriver de Microsoft, qui n'est plus maintenu. Il n'existe aucune prise en charge documentée pour l'automatisation d'applications Linux natives arbitraires.

| Type d'application | macOS | Windows | Linux | Comment |
|----------|-------|---------|-------|-----|
| Application native | Oui | Non recommandé | Non documenté | Driver Appium Mac2 |
| Electron | Oui | Oui | Oui | `@wdio/electron-service` (Chromedriver) |
| Tauri | Oui | Oui | Oui | `@wdio/tauri-service` (plugin intégré, `tauri-driver` ou CrabNebula) |
| Dioxus | Oui | Oui | Oui | `@wdio/dioxus-service` (driver intégré ; driver externe sur Windows uniquement) |

## Démarrage rapide

`npm create wdio@latest ./` génère toutes ces configurations. Choisissez « Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications », puis votre framework. Chaque configuration ci-dessous nécessite également `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` et un fichier `tsconfig.json` contenant `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // nécessaire uniquement si la détection automatique de la sortie d'Electron Forge / electron-builder échoue
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

Utilisez `browser.electron.execute((electron, ...args) => { ... })` pour exécuter du code dans le processus principal, et `browser.electron.mock()` pour simuler les API d'Electron.

### Application macOS native (Appium Mac2)

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

`appium:bundleId` sélectionne l'application à lancer au démarrage de la session.

### Tauri et Dioxus

Les deux nécessitent un ajout côté Rust dans votre application, suivez donc leurs guides de démarrage rapide :

- Tauri : ajoutez la crate `tauri-plugin-wdio-webdriver` (le fournisseur intégré), puis utilisez `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. Consultez le [démarrage rapide Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus : ajoutez la crate `wdio-dioxus-bridge` et créez un build de débogage (`cargo build`). Utilisez ensuite `services: [['dioxus', { driverProvider: 'embedded' }]]` avec `browserName: 'dioxus'` et `'dioxus:options': { application: './target/debug/my-app' }`. Consultez le [démarrage rapide Dioxus](/docs/desktop-testing/dioxus/quick-start).

## Choisissez votre parcours

- [macOS](/docs/desktop-testing/macos) : applications macOS natives avec Appium et le driver Mac2.
- [Windows](/docs/desktop-testing/windows) : état actuel de l'automatisation des applications Windows natives.
- [Electron](/docs/desktop-testing/electron) : installation, puis [configuration](/docs/desktop-testing/electron/configuration) (y compris les chemins des binaires par OS), [accès aux API Electron](/docs/desktop-testing/electron/api), [référence de l'API et mocking](/docs/desktop-testing/electron/api-reference), [gestion des fenêtres](/docs/desktop-testing/electron/window-management), [deeplinks](/docs/desktop-testing/electron/deeplink-testing), [mode autonome](/docs/desktop-testing/electron/standalone) et [débogage](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri) : [plateformes prises en charge](/docs/desktop-testing/tauri/platform-support), [configuration](/docs/desktop-testing/tauri/configuration), [installation du plugin](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver sur Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [exemples d'utilisation](/docs/desktop-testing/tauri/usage-examples) et la [référence de l'API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus) : [plateformes prises en charge](/docs/desktop-testing/dioxus/platform-support), [configuration](/docs/desktop-testing/dioxus/configuration), [installation du bridge](/docs/desktop-testing/dioxus/plugin-setup), [mode navigateur](/docs/desktop-testing/dioxus/browser-mode) (tests frontend uniquement dans Chrome avec des commandes simulées), [exemples d'utilisation](/docs/desktop-testing/dioxus/usage-examples) et la [référence de l'API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote) : les services Electron, Tauri et Dioxus prennent en charge les sessions multi-remote, par exemple deux instances de l'application dans un même test.

## Linux

Sur Linux, WebdriverIO pilote les applications Electron, Tauri et Dioxus. Points à connaître :

- CI headless : ces applications ont besoin d'un serveur d'affichage. Lorsqu'aucun affichage n'existe, le testrunner démarre Weston, ou Xvfb en solution de repli. Définissez `displayServerAutoInstall: true` pour en installer un si aucun des deux n'est installé. Vous pouvez également encapsuler le testrunner avec xvfb-run, par exemple `xvfb-run -a npx wdio run wdio.conf.ts`. Consultez [Headless & serveurs d'affichage](/docs/headless-and-display-servers).
- Tauri avec le fournisseur `official` nécessite WebKitWebDriver (paquet `webkit2gtk-driver`). Le fournisseur `embedded` ne nécessite aucun driver externe.
- Dioxus ne prend en charge que le fournisseur `embedded` sur Linux, et la compilation des applications Dioxus nécessite les bibliothèques de développement WebKitGTK.
- Electron sur Ubuntu 24.04+ et autres distributions avec AppArmor activé : définissez l'option de service `apparmorAutoInstall` si Electron ne parvient pas à démarrer.

## Dépannage

- Electron : [Problèmes courants](/docs/desktop-testing/electron/common-issues), par exemple « DevToolsActivePort file doesn't exist » en CI.
- Tauri : [Dépannage](/docs/desktop-testing/tauri/troubleshooting), y compris les incompatibilités de version entre Edge WebDriver et WebView2.
- Dioxus : [Dépannage](/docs/desktop-testing/dioxus/troubleshooting).
- macOS : consultez le projet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) pour la configuration spécifique au driver, comme Xcode.

## Étapes suivantes

- Référence de [configuration](/docs/configuration) pour chaque option de `wdio.conf.ts`.
- Options du [service Appium](/docs/appium-service) pour la configuration Mac2.
- Autres plateformes : [Navigateurs web](/docs/platforms/web), [Applications mobiles](/docs/platforms/mobile), [Extensions et éditeurs](/docs/platforms/apps-and-extensions).