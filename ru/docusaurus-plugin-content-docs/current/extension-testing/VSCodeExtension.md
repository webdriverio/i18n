---
id: vscode-extensions
title: Тестирование расширений VS Code
description: "Тестируйте расширения VS Code end-to-end в десктопной IDE или как веб-расширения с помощью WebdriverIO и сервиса VS Code."
---

WebdriverIO позволяет без труда проводить сквозное (end-to-end) тестирование ваших расширений [VS Code](https://code.visualstudio.com/) в десктопной IDE VS Code или в виде веб-расширения. Вам нужно лишь указать путь к вашему расширению, а фреймворк сделает всё остальное. С помощью [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) обо всём позаботятся за вас, и это ещё не всё:

- 🏗️ Установка VSCode (стабильной версии, insiders или указанной версии)
- ⬇️ Загрузка Chromedriver, соответствующего заданной версии VSCode
- 🚀 Возможность доступа к API VSCode из ваших тестов
- 🖥️ Запуск VSCode с пользовательскими настройками (включая поддержку VSCode на Ubuntu, MacOS и Windows)
- 🌐 Или запуск VSCode на сервере, чтобы к нему можно было получить доступ из любого браузера для тестирования веб-расширений
- 📔 Инициализация объектов страниц (page objects) с локаторами, соответствующими вашей версии VSCode

## Начало работы

Чтобы создать новый проект WebdriverIO, выполните:

```sh
npm create wdio@latest ./
```

Мастер установки проведёт вас через весь процесс. Убедитесь, что вы выбрали _"VS Code Extension Testing"_, когда вас спросят, какой тип тестирования вы хотите выполнять, а затем просто оставьте значения по умолчанию или измените их по своему усмотрению.

## Пример конфигурации

Чтобы использовать сервис, необходимо добавить `vscode` в список сервисов, при необходимости указав объект конфигурации. Это заставит WebdriverIO загрузить указанные бинарные файлы VSCode и соответствующую версию Chromedriver:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" или "stable" для последней версии VSCode
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * при необходимости вы можете указать путь, по которому WebdriverIO
     * хранит все бинарные файлы VSCode и Chromedriver, например:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Если вы укажете `wdio:vscodeOptions` с любым другим `browserName`, кроме `vscode`, например `chrome`, сервис запустит расширение как веб-расширение. При тестировании в Chrome дополнительный сервис драйвера не требуется, например:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Примечание:_ при тестировании веб-расширений в качестве `browserVersion` можно выбрать только `stable` или `insiders`.

### Настройка TypeScript

В вашем `tsconfig.json` обязательно добавьте `wdio-vscode-service` в список типов:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Использование

Затем вы можете использовать метод `getWorkbench` для доступа к объектам страниц с локаторами, соответствующими нужной вам версии VSCode:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Далее вы можете получить доступ ко всем объектам страниц, используя соответствующие методы объектов страниц. Подробнее обо всех доступных объектах страниц и их методах читайте в [документации по объектам страниц](https://webdriverio-community.github.io/wdio-vscode-service/).

### Доступ к API VSCode

Если вы хотите выполнить определённую автоматизацию через [API VSCode](https://code.visualstudio.com/api/references/vscode-api), это можно сделать, запуская удалённые команды с помощью пользовательской команды `executeWorkbench`. Эта команда позволяет удалённо выполнять код из вашего теста внутри среды VSCode и даёт доступ к API VSCode. Вы можете передавать в функцию произвольные параметры, которые затем будут переданы внутрь функции. Объект `vscode` всегда передаётся первым аргументом, за которым следуют параметры внешней функции. Обратите внимание, что вы не можете обращаться к переменным за пределами области видимости функции, поскольку колбэк выполняется удалённо. Вот пример:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // выводит: "I am an API call!"
```

Полную документацию по объектам страниц смотрите в [документации](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Различные примеры использования можно найти в [наборе тестов этого проекта](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Дополнительная информация

Подробнее о том, как настроить [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) и как создавать собственные объекты страниц, можно узнать в [документации сервиса](/docs/wdio-vscode-service). Также вы можете посмотреть следующий доклад [Christian Bromann](https://twitter.com/bromann) на тему [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>