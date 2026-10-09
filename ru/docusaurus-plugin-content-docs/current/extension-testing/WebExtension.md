---
id: web-extensions
title: Тестирование веб-расширений
description: "Загрузка веб-расширения в Chrome или Firefox для сессии WebdriverIO, включая установку и удаление через BiDi во время сессии."
---

WebdriverIO — идеальный инструмент для автоматизации браузера. Веб-расширения являются частью браузера и могут быть автоматизированы точно так же. Если ваше веб-расширение использует контентные скрипты для запуска JavaScript на веб-сайтах или предоставляет всплывающее модальное окно, вы можете написать для этого e2e-тест с помощью WebdriverIO.

Загрузите расширение до первой навигации, используя настройку capabilities, описанную ниже. Чтобы установить и удалить расширение во время сессии [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension), используйте [`installExtension`](/docs/api/browser/installExtension) и [`uninstallExtension`](/docs/api/browser/uninstallExtension).

## Загрузка веб-расширения в браузер

В качестве первого шага нам нужно загрузить тестируемое расширение в браузер в рамках нашей сессии. Для Chrome и Firefox это делается по-разному.

:::info

В этой документации не рассматриваются веб-расширения Safari, так как их поддержка сильно отстаёт, а спрос со стороны пользователей невелик. Кроме того, Safari не поддерживает сессии WebDriver BiDi, поэтому [`installExtension`](/docs/api/browser/installExtension) не работает с Safari. Если вы создаёте веб-расширение для Safari, пожалуйста, [создайте issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) и помогите добавить сюда информацию и о нём.

:::

### Chrome

Загрузить веб-расширение в Chrome можно, передав закодированную в `base64` строку файла `crx` или указав путь к папке веб-расширения. Проще всего сделать последнее, определив capabilities Chrome следующим образом:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // given your wdio.conf.js is in the root directory and your compiled
            // web extension files are located in the `./dist` folder
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Если вы автоматизируете другой браузер, отличный от Chrome, например Brave, Edge или Opera, скорее всего, опции браузера совпадают с приведённым выше примером, только используется другое имя capability, например `ms:edgeOptions`.

:::

Если вы собираете своё расширение в файл `.crx`, например с помощью NPM-пакета [crx](https://www.npmjs.com/package/crx), вы также можете внедрить собранное расширение следующим образом:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

Чтобы создать профиль Firefox, включающий расширения, вы можете использовать [Firefox Profile Service](/docs/firefox-profile-service) для соответствующей настройки сессии. Однако вы можете столкнуться с проблемами, когда локально разработанное расширение не удаётся загрузить из-за проблем с подписью. В этом случае вы также можете загрузить расширение в хуке `before` с помощью команды [`installAddOn`](/docs/api/gecko#installaddon), например:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

Для создания файла `.xpi` рекомендуется использовать NPM-пакет [`web-ext`](https://www.npmjs.com/package/web-ext). Вы можете собрать своё расширение с помощью следующей команды:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Установка расширения во время сессии

Начиная с v10, [`browser.installExtension`](/docs/api/browser/installExtension) и [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) устанавливают веб-расширение во время сессии WebDriver BiDi и возвращают его id. Используйте их, когда расширение не должно присутствовать при запуске или когда один и тот же тест устанавливает его, проверяет и удаляет.

Настройка capabilities и `installAddOn`, описанные выше, остаются способом загрузки расширения до первой навигации. `installExtension` их не заменяет. `browser.webExtensionInstall` и `browser.webExtensionUninstall` остаются доступными, если вы хотите самостоятельно сформировать [payload согласно спецификации](https://w3c.github.io/webdriver-bidi/#command-webExtension-install).

```ts title="test/specs/extension.e2e.ts"
import path from 'node:path'
import url from 'node:url'
import { browser, expect } from '@wdio/globals'

const extensionPath = path.resolve(
    path.dirname(url.fileURLToPath(import.meta.url)),
    '../../dist'
)

describe('web extension', () => {
    it('installs and removes the extension', async () => {
        const extensionId = await browser.installExtension(extensionPath)
        expect(extensionId).not.toEqual('')

        await browser.url('https://webdriver.io')
        await browser.uninstallExtension(extensionId)
    })
})
```

`installExtension` принимает три типа входных данных:

| Входные данные | Payload, отправляемый в браузер |
| --- | --- |
| Путь к директории | `{ type: 'path', path }` после `path.resolve`. Браузер должен иметь возможность прочитать эту директорию. |
| Путь к `.zip`, `.xpi` или `.crx` | `{ type: 'archivePath', path }` после `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. Байты архива. Любой другой объект отклоняется. |

Строковый путь всегда разрешается на стороне test runner. В удалённой сессии — с именем хоста, отличным от `localhost`, `127.0.0.1` или `::1`, либо с облачными `user` и `key` — этот путь не является путём на машине с браузером. Команда читает архив или упаковывает директорию в zip в памяти и отправляет `base64`. Вам не нужно самостоятельно разделять логику для локальных и удалённых сессий. Локальные сессии отправляют `path` или `archivePath` и не читают байты.

Указывайте директорию корня расширения — папку, содержащую `manifest.json`.

Сессия должна поддерживать WebDriver BiDi. Классическая сессия выбрасывает ошибку `installExtension requires a WebDriver BiDi session (webExtension.install)`. Браузер, который реализует BiDi, но не этот модуль, завершает команду ошибкой `unsupported operation` (или `unknown command`, если модуль отсутствует). Некорректный архив приводит к ошибке `invalid web extension`. Удаление расширения с id, неизвестным браузеру, приводит к ошибке `no such web extension`.

`uninstallExtension` принимает строку id, которую вернул `installExtension`.

### Chromium

Chrome и Edge реализуют `webExtension.install`, но оставляют эту функцию отключённой, пока вы не запустите браузер с `--enable-unsafe-extension-debugging` и `--remote-debugging-pipe`. Chrome 136 и новее также требуют `--user-data-dir`, если установлен `--remote-debugging-pipe`. Без этих аргументов команда завершается ошибкой `unknown error - Method not available`.

`--remote-debugging-pipe` — это канал между драйвером и браузером. Сессия BiDi по-прежнему использует `webSocketUrl`.

```ts title="wdio.conf.ts"
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdio-chrome-'))

export const config: WebdriverIO.Config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--enable-unsafe-extension-debugging',
                '--remote-debugging-pipe',
                `--user-data-dir=${userDataDir}`
            ]
        }
    }]
}
```

Для Edge используйте `ms:edgeOptions`. Firefox загружает расширение в обычной сессии BiDi и не требует этих аргументов.

## Советы и рекомендации

Следующий раздел содержит набор полезных советов и рекомендаций, которые могут пригодиться при тестировании веб-расширения.

### Тестирование всплывающего модального окна в Chrome

Если вы определили запись `default_popup` для browser action в [манифесте расширения](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), вы можете протестировать эту HTML-страницу напрямую, поскольку клик по иконке расширения в верхней панели браузера работать не будет. Вместо этого вам нужно открыть HTML-файл всплывающего окна напрямую.

В Chrome это делается путём получения ID расширения и открытия страницы всплывающего окна через `browser.url('...')`. Поведение на этой странице будет таким же, как и во всплывающем окне. Для этого мы рекомендуем написать следующую пользовательскую команду:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

В вашем `wdio.conf.js` вы можете импортировать этот файл и зарегистрировать пользовательскую команду в хуке `before`, например:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

Теперь в вашем тесте вы можете открыть страницу всплывающего окна следующим образом:

```ts
await browser.openExtensionPopup('My Web Extension')
```