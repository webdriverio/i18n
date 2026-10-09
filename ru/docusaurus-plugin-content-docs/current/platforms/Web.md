---
id: web
title: Веб-браузеры
description: Настройка и запуск сквозных, компонентных, визуальных тестов и тестов доступности WebdriverIO в Chrome, Firefox, Microsoft Edge и Safari.
---

WebdriverIO автоматизирует десктопные браузеры (Chrome, Chromium, Firefox, Microsoft Edge и Safari) с помощью стандартных драйверов браузеров. По умолчанию он пытается открыть сессию [WebDriver BiDi](/docs/automationProtocols) — двунаправленного преемника классического протокола WebDriver. BiDi обеспечивает такие возможности, как мокирование сети и эмуляция Web API. Чтобы отказаться от него, установите `wdio:enforceWebDriverClassic: true` в ваших capabilities. Вам не нужно устанавливать драйверы самостоятельно: укажите `browserName`, и WebdriverIO загрузит и запустит соответствующий Chromedriver, Geckodriver или Edgedriver. Он также установит Chrome, Chromium или Firefox, если локальная установка не найдена. Microsoft Edge должен быть уже установлен, а Safaridriver поставляется вместе с macOS. Тот же тестраннер может также запускать тесты внутри браузера с помощью Browser Runner. Это охватывает модульные и компонентные тесты для React, Vue, Svelte, SolidJS, Preact, Lit и Stencil.

## Быстрый старт

Создайте проект в интерактивном режиме с помощью `npm init wdio@latest .`. Флаг `--yes` выбирает настройки по умолчанию: Mocha, Chrome и page objects. Чтобы настроить проект вручную, установите тестраннер, адаптер фреймворка, репортер и `tsx` для TypeScript:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
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
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
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

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Каждая capability получает собственные рабочие процессы, поэтому спецификация запускается и в Chrome, и в Firefox. Другие допустимые значения `browserName`: `chromium`, `msedge` и `safari`. Для запуска в headless-режиме добавьте аргументы браузера, например `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Для Firefox и Edge см. [Запуск браузера в headless-режиме](/docs/capabilities#run-browser-headless); у Safari нет headless-режима.

## Выберите свой путь

Сквозное тестирование в разных браузерах:

- [Capabilities](/docs/capabilities): параметры браузера, headless-режим, каналы браузеров (Canary, Nightly, Safari Technology Preview) и параметры драйверов `wdio:*`.
- [Бинарные файлы драйверов](/docs/driverbinaries): как работает автоматическая настройка браузеров и драйверов и как указать собственные бинарные файлы.
- [Протоколы автоматизации](/docs/automationProtocols): WebDriver против WebDriver BiDi.
- [Команды WebDriver BiDi](/docs/api/webdriverBidi): низкоуровневые команды протокола BiDi, доступные в объекте `browser`.
- [Селекторы](/docs/selectors): CSS, текстовые, ARIA, глубокие (shadow DOM) и React-селекторы.
- [Автоожидание](/docs/autowait) и [Тайм-ауты](/docs/timeouts): как WebdriverIO ожидает элементы и что можно настроить.
- [Multi-remote](/docs/multiremote): управление несколькими браузерами в одном тесте, например для чатов или WebRTC-приложений.

Возможности браузера, требующие WebDriver BiDi (Chrome, Edge и Firefox; не Safari):

- [Моки и шпионы запросов](/docs/mocksandspies): перехват, изменение или подмена сетевых запросов с помощью `browser.mock()`. См. также [объект Mock](/docs/api/mock).
- [Эмуляция](/docs/emulation): эмуляция геолокации, медиа-функций, user agent, офлайн-состояния, локали, часового пояса, экрана и устройств с помощью `browser.emulate()`.

Компонентное и модульное тестирование в реальном браузере:

- [Компонентное тестирование](/docs/component-testing): как работает [Browser Runner](/docs/runner#browser-runner) на основе Vite и как его настроить.
- Руководства по фреймворкам: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Мокирование](/docs/component-testing/mocking) и [Покрытие](/docs/component-testing/coverage) для компонентных тестов.

Визуальное тестирование и тестирование доступности:

- [Визуальное тестирование](/docs/visual-testing): сравнение изображений экрана, элементов и всей страницы с помощью `@wdio/visual-service`.
- [Снапшоты](/docs/snapshot): проверки снапшотов DOM и объектов.
- [Axe Core](/docs/accessibility-testing/axe-core): запуск проверок доступности Deque axe из ваших тестов.

Масштабирование:

- [Selenium Grid](/docs/seleniumgrid), [Облачные сервисы](/docs/cloudservices) и [Docker](/docs/docker): удалённый запуск браузеров.
- [Шардинг](/docs/sharding): разделение набора тестов между CI-машинами.

Компонентный тест использует тот же файл конфигурации с другим раннером. Например, чтобы использовать пресет React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Для Browser Runner требуется `@wdio/browser-runner`. Пресету React также нужен `@vitejs/plugin-react`, а для рендеринга в руководствах рекомендуется `@testing-library/react`. Пресеты существуют для `vue`, `svelte`, `solid`, `react`, `preact` и `stencil`. Во всех остальных случаях используйте `viteConfig`.

## Устранение неполадок

- Chrome не запускается в CI с ошибкой "user data directory is already in use" или "DevToolsActivePort file doesn't exist": см. [Headless-режим и дисплейные серверы](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` или `browser.emulate()` не работает: сессия не использует WebDriver BiDi. Проверьте ваш браузер (Safari не поддерживает BiDi), вашего облачного провайдера и `wdio:enforceWebDriverClassic`.
- Драйверы или браузеры не удаётся загрузить через прокси: см. [Пользовательский хост загрузки драйверов](/docs/capabilities#custom-driver-download-host) и [Настройка прокси](/docs/proxy).
- Нестабильные тесты: см. [Повтор нестабильных тестов](/docs/retry) и [Отладка](/docs/debugging).

## Следующие шаги

- Справочник по [конфигурации](/docs/configuration) для каждого параметра `wdio.conf.ts`.
- [Настройка TypeScript](/docs/typescript) и [Фреймворки](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Паттерн Page Object](/docs/pageobjects) для структурирования больших наборов тестов.
- [MCP](/docs/mcp), чтобы позволить ИИ-агенту управлять сессией браузера через WebdriverIO.
- Другие платформы: [Мобильные приложения](/docs/platforms/mobile), [Десктопные приложения](/docs/platforms/desktop), [Расширения и редакторы](/docs/platforms/apps-and-extensions).