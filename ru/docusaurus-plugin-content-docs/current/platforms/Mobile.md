---
id: mobile
title: Мобильные приложения
description: Настройка и запуск тестов WebdriverIO для нативных, гибридных и мобильных веб-приложений на эмуляторах Android, симуляторах iOS, реальных устройствах и в облачных сервисах устройств.
---

WebdriverIO автоматизирует Android и iOS через [Appium](/docs/appium), который работает по протоколу WebDriver. Ваши тесты используют тот же объект `browser` (с псевдонимом `driver`), селекторы `$`/`$$` и матчеры `expect`, что и браузерные тесты. Appium направляет каждую сессию в драйвер платформы, выбранный с помощью `appium:automationName`. Для Android это `UiAutomator2`, а в качестве альтернативы доступен Espresso, который открывает дополнительные стратегии селекторов. Для iOS и iPadOS это `XCUITest`. С помощью этих драйверов можно тестировать нативные приложения и мобильный веб в Chrome на Android или Safari на iOS. Также можно тестировать гибридные приложения, переключаясь между нативным контекстом и встроенными webview. Сессии можно запускать на эмуляторах Android, симуляторах iOS, реальных устройствах или в облачных сервисах устройств, таких как Sauce Labs, BrowserStack, TestingBot и TestMu AI. [`@wdio/appium-service`](/docs/appium-service) запускает и останавливает локальный сервер Appium за вас. Помимо базового API Appium, WebdriverIO добавляет кроссплатформенные [мобильные команды](/docs/api/mobile), такие как `tap`, `swipe`, `longPress`, `scrollIntoView` и `switchContext`.

## Быстрый старт

Предварительные требования: Android Studio с Android SDK и эмулятором для Android; Xcode и симулятор на macOS для iOS. `npx appium-installer` проведёт вас через настройку окружения, а `npm init wdio@latest .` создаст каркас мобильного проекта (выберите Android или iOS). Для ручной настройки:

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

`~` — это селектор accessibility id: он соответствует `content-description` на Android и `accessibilityIdentifier` на iOS и является предпочтительной кроссплатформенной стратегией. Замените идентификаторы из примера, заголовок webview и путь к приложению на свои.

Для других целевых платформ меняются только capabilities:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app для симуляторов, подписанный .ipa для реальных устройств
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

Для мобильного веба на iOS используйте `platformName: 'iOS'`, `browserName: 'Safari'` и `'appium:automationName': 'XCUITest'`.

## Выберите свой путь

- [Настройка Appium](/docs/appium): какие платформы поддерживает Appium (iOS, Android, Tizen, TV-приложения) и как установить набор инструментов.
- [Сервис Appium](/docs/appium-service): параметры сервиса (`args`, `command`, `logPath`), `npx start-appium-inspector` для открытия Appium Inspector и бета-версия оптимизатора для медленных XPath-селекторов.
- [Мобильные команды](/docs/api/mobile): кроссплатформенные жесты и вспомогательные функции. Охватывает гибридные приложения с [`getContexts`](/docs/api/mobile/getContexts) и [`switchContext`](/docs/api/mobile/switchContext), а также capabilities webview для iOS.
- [Мобильные селекторы](/docs/selectors#mobile-selectors): accessibility id, Android UiAutomator, матчеры data/view в Espresso, а также predicate strings и class chains в iOS.
- [Команды протокола Appium](/docs/api/appium): базовые эндпоинты Appium, доступные в `driver`.
- [Flutter-приложения](/docs/flutter-testing/introduction): почему для Flutter нужен Appium Flutter Driver, а затем [подготовка приложения](/docs/flutter-testing/preparing-flutter-application), [настройка Appium](/docs/flutter-testing/base-appium-configuration), [настройка WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) и [написание тестов](/docs/flutter-testing/writing-tests).
- [Облачные сервисы](/docs/cloudservices): подключение к Sauce Labs, BrowserStack, TestingBot, TestMu AI, Perfecto или RobotActions для запуска на размещённых реальных устройствах.
- [Визуальное тестирование](/docs/visual-testing): сравнение изображений для нативных приложений, гибридных приложений и мобильных браузеров. Для Percy на мобильных устройствах см. [App Percy](/docs/visual-testing/integrate-with-app-percy).
- [Multi-remote](/docs/multiremote): координация нескольких устройств или браузеров в одном тесте.

Эмуляция области просмотра устройства в десктопном браузере с помощью [`browser.emulate('device', ...)`](/docs/emulation) не является мобильным тестированием. Движки десктопных браузеров отличаются от мобильных, поэтому вместо этого используйте Appium с реальным мобильным браузером.

## Устранение неполадок

- Сессия не запускается: убедитесь, что драйвер Appium для вашего `appium:automationName` установлен, а эмулятор или симулятор запущен. Используйте `port: 4723`, если вы не меняли порт Appium.
- iOS не находит webview: попробуйте `appium:webviewConnectRetries`, `appium:webviewConnectTimeout` или `appium:includeSafariInWebviews` (см. [Гибридные приложения](/docs/api/mobile#hybrid-apps)).
- Webview на Android появляется медленно: настройте `androidWebviewConnectionRetryTime` и `androidWebviewConnectTimeout` в `getContexts`/`switchContext`.
- Виджеты Flutter не находятся с помощью нативных селекторов: это ожидаемо. Используйте драйвер Flutter и finders, описанные в [руководстве по Flutter](/docs/flutter-testing/introduction).

## Следующие шаги

- Справочники по [конфигурации](/docs/configuration) и [capabilities](/docs/capabilities).
- [Паттерн Page Object](/docs/pageobjects) для совместного использования экранов в спецификациях для Android и iOS.
- [MCP](/docs/mcp), чтобы ИИ-агент мог управлять сессиями iOS и Android через Appium.
- Другие платформы: [Веб-браузеры](/docs/platforms/web), [Десктопные приложения](/docs/platforms/desktop), [Расширения и редакторы](/docs/platforms/apps-and-extensions).