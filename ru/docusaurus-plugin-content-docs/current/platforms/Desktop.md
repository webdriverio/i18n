---
id: desktop
title: Десктопные приложения
description: Выберите подходящую конфигурацию WebdriverIO для нативных приложений macOS, а также для приложений Electron, Tauri и Dioxus на macOS, Windows и Linux, и запустите первый тест.
---

То, как WebdriverIO автоматизирует десктопное приложение, зависит от того, как это приложение создано. Нативные приложения macOS автоматизируются через [Appium](/docs/appium) с драйвером Mac2 (`'appium:automationName': 'Mac2'`), для которого требуется Xcode. Приложения, созданные на веб-фреймворке, управляются через встроенный в них браузерный движок с помощью специального сервиса WebdriverIO. [Сервис Electron](/docs/desktop-testing/electron) использует Chromium через автоматически устанавливаемый Chromedriver и также может вызывать API главного процесса Electron. [Сервис Tauri](/docs/desktop-testing/tauri) и [сервис Dioxus](/docs/desktop-testing/dioxus) управляют системным webview: WebView2 в Windows, WKWebView в macOS и WebKitGTK в Linux. Эти три сервиса запускают один и тот же набор тестов в Windows, macOS и Linux. Для нативных приложений Windows на данный момент нет рекомендуемого драйвера: Windows Driver от Appium построен на WinAppDriver от Microsoft, который больше не поддерживается. Документированной поддержки автоматизации произвольных нативных приложений Linux нет.

| Тип приложения | macOS | Windows | Linux | Как |
|----------|-------|---------|-------|-----|
| Нативное приложение | Да | Не рекомендуется | Не документировано | Драйвер Appium Mac2 |
| Electron | Да | Да | Да | `@wdio/electron-service` (Chromedriver) |
| Tauri | Да | Да | Да | `@wdio/tauri-service` (встроенный плагин, `tauri-driver` или CrabNebula) |
| Dioxus | Да | Да | Да | `@wdio/dioxus-service` (встроенный драйвер; внешний драйвер только в Windows) |

## Быстрый старт

`npm create wdio@latest ./` создаёт заготовку для любого из этих вариантов. Выберите "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications", а затем ваш фреймворк. Для каждой из приведённых ниже конфигураций также необходимы `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` и файл `tsconfig.json` с `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]`.

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
            // нужно только если автоопределение результатов сборки Electron Forge / electron-builder не срабатывает
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

Используйте `browser.electron.execute((electron, ...args) => { ... })` для выполнения кода в главном процессе и `browser.electron.mock()` для мокирования API Electron.

### Нативное приложение macOS (Appium Mac2)

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

`appium:bundleId` определяет приложение, запускаемое при старте сессии.

### Tauri и Dioxus

Оба требуют добавления кода на стороне Rust в ваше приложение, поэтому следуйте их руководствам по быстрому старту:

- Tauri: добавьте крейт `tauri-plugin-wdio-webdriver` (встроенный провайдер), затем используйте `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]`. См. [Быстрый старт Tauri](/docs/desktop-testing/tauri/quick-start).
- Dioxus: добавьте крейт `wdio-dioxus-bridge` и создайте отладочную сборку (`cargo build`). Затем используйте `services: [['dioxus', { driverProvider: 'embedded' }]]` с `browserName: 'dioxus'` и `'dioxus:options': { application: './target/debug/my-app' }`. См. [Быстрый старт Dioxus](/docs/desktop-testing/dioxus/quick-start).

## Выберите свой путь

- [macOS](/docs/desktop-testing/macos): нативные приложения macOS с Appium и драйвером Mac2.
- [Windows](/docs/desktop-testing/windows): текущее состояние автоматизации нативных приложений Windows.
- [Electron](/docs/desktop-testing/electron): настройка, затем [конфигурация](/docs/desktop-testing/electron/configuration) (включая пути к бинарным файлам для каждой ОС), [доступ к API Electron](/docs/desktop-testing/electron/api), [справочник API и мокирование](/docs/desktop-testing/electron/api-reference), [управление окнами](/docs/desktop-testing/electron/window-management), [диплинки](/docs/desktop-testing/electron/deeplink-testing), [автономный режим](/docs/desktop-testing/electron/standalone) и [отладка](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [поддержка платформ](/docs/desktop-testing/tauri/platform-support), [конфигурация](/docs/desktop-testing/tauri/configuration), [настройка плагина](/docs/desktop-testing/tauri/plugin-setup), [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup), [Edge WebDriver в Windows](/docs/desktop-testing/tauri/edge-webdriver-windows), [примеры использования](/docs/desktop-testing/tauri/usage-examples) и [справочник API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [поддержка платформ](/docs/desktop-testing/dioxus/platform-support), [конфигурация](/docs/desktop-testing/dioxus/configuration), [настройка моста](/docs/desktop-testing/dioxus/plugin-setup), [режим браузера](/docs/desktop-testing/dioxus/browser-mode) (тесты только фронтенда в Chrome с мокированными командами), [примеры использования](/docs/desktop-testing/dioxus/usage-examples) и [справочник API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): сервисы Electron, Tauri и Dioxus поддерживают multi-remote сессии, например два экземпляра приложения в одном тесте.

## Linux

В Linux WebdriverIO управляет приложениями Electron, Tauri и Dioxus. Что нужно знать:

- Headless CI: этим приложениям нужен дисплейный сервер. Если дисплея нет, тестраннер запускает Weston, а в качестве запасного варианта — Xvfb. Установите `displayServerAutoInstall: true`, чтобы установить один из них, если ни один не установлен. В качестве альтернативы оберните запуск тестраннера в xvfb-run, например `xvfb-run -a npx wdio run wdio.conf.ts`. См. [Headless-режим и дисплейные серверы](/docs/headless-and-display-servers).
- Tauri с провайдером `official` требует WebKitWebDriver (пакет `webkit2gtk-driver`). Провайдеру `embedded` внешний драйвер не нужен.
- Dioxus в Linux поддерживает только провайдер `embedded`, а для сборки приложений Dioxus требуются библиотеки разработки WebKitGTK.
- Electron в Ubuntu 24.04+ и других дистрибутивах с включённым AppArmor: установите опцию сервиса `apparmorAutoInstall`, если Electron не запускается.

## Устранение неполадок

- Electron: [Частые проблемы](/docs/desktop-testing/electron/common-issues), например "DevToolsActivePort file doesn't exist" в CI.
- Tauri: [Устранение неполадок](/docs/desktop-testing/tauri/troubleshooting), включая несоответствие версий Edge WebDriver и WebView2.
- Dioxus: [Устранение неполадок](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: см. проект [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) для настройки, специфичной для драйвера, например Xcode.

## Следующие шаги

- Справочник по [конфигурации](/docs/configuration) для каждой опции `wdio.conf.ts`.
- Опции [сервиса Appium](/docs/appium-service) для настройки Mac2.
- Другие платформы: [Веб-браузеры](/docs/platforms/web), [Мобильные приложения](/docs/platforms/mobile), [Расширения и редакторы](/docs/platforms/apps-and-extensions).