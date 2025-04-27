---
id: web-extensions
title: Тестирование веб-расширений
---

WebdriverIO — идеальный инструмент для автоматизации браузера. Веб-расширения являются частью браузера и могут быть автоматизированы таким же образом. Когда ваше веб-расширение использует контентные скрипты для запуска JavaScript на веб-сайтах или предлагает всплывающее окно, вы можете провести e2e-тестирование для этого с помощью WebdriverIO.

## Загрузка веб-расширения в браузер

В качестве первого шага мы должны загрузить тестируемое расширение в браузер как часть нашей сессии. Это работает по-разному для Chrome и Firefox.

:::info

В этой документации не рассматриваются веб-расширения для Safari, так как их поддержка значительно отстаёт, а потребность пользователей невелика. Если вы разрабатываете веб-расширение для Safari, пожалуйста, [создайте issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) и помогите включить его здесь.

:::

### Chrome

Загрузка веб-расширения в Chrome может быть выполнена путем предоставления строки `base64` закодированного файла `crx` или путем указания пути к папке веб-расширения. Проще всего сделать последнее, определив возможности Chrome следующим образом:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // учитывая, что ваш wdio.conf.js находится в корневом каталоге, а скомпилированные
            // файлы веб-расширения находятся в папке `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Если вы автоматизируете другой браузер, кроме Chrome, например, Brave, Edge или Opera, возможно, параметры браузера совпадают с приведенным выше примером, но используется другое имя capability, например, `ms:edgeOptions`.

:::

Если вы компилируете своё расширение как файл `.crx`, используя, например, NPM-пакет [crx](https://www.npmjs.com/package/crx), вы также можете внедрить объединенное расширение через:

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

Для создания профиля Firefox, включающего расширения, вы можете использовать [службу профилей Firefox](/docs/firefox-profile-service) для соответствующей настройки сессии. Однако вы можете столкнуться с проблемами, когда ваше локально разработанное расширение не может быть загружено из-за проблем с подписью. В этом случае вы также можете загрузить расширение в хуке `before` с помощью команды [`installAddOn`](/docs/api/gecko#installaddon), например:

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

Для генерации файла `.xpi` рекомендуется использовать NPM-пакет [`web-ext`](https://www.npmjs.com/package/web-ext). Вы можете объединить своё расширение, используя следующую команду:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Советы и приёмы

В следующем разделе содержится набор полезных советов и приёмов, которые могут быть полезны при тестировании веб-расширения.

### Тестирование всплывающего окна в Chrome

Если вы определили запись `default_popup` в действиях браузера в [манифесте расширения](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), вы можете напрямую тестировать эту HTML-страницу, так как клик по значку расширения в верхней панели браузера не сработает. Вместо этого вам нужно открыть HTML-файл всплывающего окна напрямую.

В Chrome это работает путем получения ID расширения и открытия страницы всплывающего окна через `browser.url('...')`. Поведение на этой странице будет таким же, как и во всплывающем окне. Для этого мы рекомендуем написать следующую пользовательскую команду:

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

Теперь в вашем тесте вы можете получить доступ к странице всплывающего окна через:

```ts
await browser.openExtensionPopup('Моё веб-расширение')
```