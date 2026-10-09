---
id: apps-and-extensions
title: Расширения и редакторы
description: Загрузите расширение браузера или расширение VS Code в сессию WebdriverIO и протестируйте его end-to-end.
---

WebdriverIO тестирует расширения браузеров и расширения редакторов, загружая их в реальное приложение-хост. Браузерные (веб-) расширения работают внутри Chrome или Firefox. Они загружаются через capabilities браузера: `--load-extension` или base64-кодированный `.crx` через `goog:chromeOptions` в Chrome, либо `browser.installAddOn()` для `.xpi` в Firefox. В сессии WebDriver BiDi также можно установить и удалить расширение прямо во время сессии с помощью `browser.installExtension()` и `browser.uninstallExtension()`. У Safari нет сессии BiDi, поэтому эта команда не поддерживает Safari. После этого вы тестируете content scripts и popup-страницы обычными командами WebDriver. Расширения VS Code тестируются с помощью сервиса от сообщества [`wdio-vscode-service`](/docs/wdio-vscode-service). Он загружает VS Code (stable, insiders или конкретную версию) и соответствующий Chromedriver, а затем запускает VS Code с вашим расширением и пользовательскими настройками. Page objects для workbench доступны через `browser.getWorkbench()`, а `browser.executeWorkbench()` выполняет код с использованием VS Code API. Этот же сервис может запускать VS Code в браузере для тестирования веб-расширений. Для плагинов Obsidian также существует сервис от сообщества.

## Быстрый старт

Сначала установите testrunner и поддержку TypeScript:

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

### Расширение Chrome

Соберите расширение в папку (здесь `./dist`) и загрузите его с помощью аргумента Chrome `--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // замените на элемент, который ваш content script добавляет на страницу
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Клик по иконке расширения на панели инструментов не работает. Чтобы протестировать `default_popup`, найдите id расширения на `chrome://extensions/` и откройте `chrome-extension://<id>/<popup>.html` с помощью `browser.url()`. В [руководстве по веб-расширениям](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) есть готовая пользовательская команда `openExtensionPopup` для этого.

### Расширение VS Code

```sh
npm install --save-dev wdio-vscode-service
```

Добавьте `"wdio-vscode-service"` в массив `types` в `tsconfig.json`.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // также возможно: "insiders" или конкретная версия, например "1.80.0"
        'wdio:vscodeOptions': {
            // указывает на директорию, где находится package.json расширения
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Чтобы протестировать расширение как веб-расширение VS Code, установите `browserName: 'chrome'` и оставьте `wdio:vscodeOptions`. В этом режиме `browserVersion` может принимать только значения `stable` или `insiders`. Команда `npm create wdio@latest ./` с выбором "VS Code Extension Testing" сгенерирует эту конфигурацию за вас.

## Выберите свой путь

- [Тестирование веб-расширений](/docs/extension-testing/web-extensions): загрузка расширений в Chrome (папка или `.crx`) и Firefox (`.xpi` через [`installAddOn`](/docs/api/gecko#installaddon)), а также установка и удаление расширения во время сессии с помощью [`installExtension`](/docs/api/browser/installExtension). Веб-расширения Safari не поддерживаются.
- [Firefox Profile Service](/docs/firefox-profile-service): создание профиля Firefox, включающего расширения.
- [Тестирование расширений VS Code](/docs/extension-testing/vscode-extensions): конфигурация, настройка TypeScript, page objects для workbench и `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): все опции сервиса, например `cachePath`, и написание собственных page objects.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): сервис от сообщества для тестирования плагинов Obsidian на разных версиях Obsidian в Windows, macOS, Linux и Android.
- [Пользовательские команды](/docs/customcommands): упаковка вспомогательных функций, таких как `openExtensionPopup`, для повторного использования.

Тесты веб-расширений выполняются в обычной сессии Chrome или Firefox, поэтому всё, что описано в разделе [Веб-браузеры](/docs/platforms/web), применимо и здесь, включая селекторы, мокирование сети и визуальное тестирование.

## Устранение неполадок

- Firefox отказывается загружать локально собранное расширение из-за подписи: установите его в хуке `before` с помощью `browser.installAddOn(extension.toString('base64'), true)` вместо загрузки через профиль. Соберите `.xpi` с помощью `npx web-ext build`.
- Используете Edge, Brave или Opera вместо Chrome: те же аргументы обычно работают с capability опций соответствующего браузера, например `ms:edgeOptions`.
- Бинарные файлы VS Code и Chromedriver загружаются в директорию кэша. Чтобы управлять местом их хранения, например для кэширования в CI, установите `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript не находит `getWorkbench` или `executeWorkbench`: добавьте `wdio-vscode-service` в `compilerOptions.types`.

## Следующие шаги

- Справочник по [конфигурации](/docs/configuration) для каждой опции `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) для тестирования полноценных десктопных приложений на базе Chromium.
- Другие платформы: [Веб-браузеры](/docs/platforms/web), [Мобильные приложения](/docs/platforms/mobile), [Десктопные приложения](/docs/platforms/desktop).