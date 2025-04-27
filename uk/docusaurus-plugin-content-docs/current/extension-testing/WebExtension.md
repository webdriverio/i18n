---
id: web-extensions
title: Тестування веб-розширень
---

WebdriverIO є ідеальним інструментом для автоматизації роботи з браузером. Веб-розширення є частиною браузера і можуть бути автоматизовані таким же чином. Коли ваше веб-розширення використовує content scripts для запуску JavaScript на веб-сайтах або пропонує спливаюче вікно, ви можете запустити e2e тест для цього за допомогою WebdriverIO.

## Завантаження веб-розширення в браузер

Першим кроком ми повинні завантажити розширення, яке тестується, в браузер як частину нашої сесії. Це працює по-різному для Chrome і Firefox.

:::info

У цій документації не розглядаються веб-розширення для Safari, оскільки їх підтримка значно відстає, а попит користувачів невисокий. Якщо ви розробляєте веб-розширення для Safari, будь ласка, [створіть issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) і співпрацюйте над включенням його сюди.

:::

### Chrome

Завантаження веб-розширення в Chrome можна здійснити шляхом надання рядка `base64` закодованого файлу `crx` або шляхом надання шляху до папки веб-розширення. Найпростіше це зробити, визначивши можливості Chrome наступним чином:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // враховуючи, що ваш wdio.conf.js знаходиться в кореневому каталозі, а скомпільовані
            // файли веб-розширення розташовані в папці `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Якщо ви автоматизуєте інший браузер, ніж Chrome, наприклад, Brave, Edge або Opera, ймовірно, що опції браузера співпадають з прикладом вище, лише використовуючи іншу назву можливості, наприклад, `ms:edgeOptions`.

:::

Якщо ви компілюєте своє розширення як файл `.crx`, використовуючи, наприклад, NPM-пакет [crx](https://www.npmjs.com/package/crx), ви також можете підключити зібране розширення через:

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

Щоб створити профіль Firefox, який включає розширення, ви можете використовувати [Firefox Profile Service](/docs/firefox-profile-service) для відповідного налаштування вашої сесії. Однак ви можете зіткнутися з проблемами, коли ваше локально розроблене розширення не може бути завантажене через проблеми з підписом. У цьому випадку ви також можете завантажити розширення в хуку `before` за допомогою команди [`installAddOn`](/docs/api/gecko#installaddon), наприклад:

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

Для створення файлу `.xpi` рекомендується використовувати NPM-пакет [`web-ext`](https://www.npmjs.com/package/web-ext). Ви можете зібрати своє розширення за допомогою наступної команди:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Поради та хитрощі

Наступний розділ містить набір корисних порад, які можуть допомогти при тестуванні веб-розширення.

### Тестування спливаючого вікна в Chrome

Якщо ви визначаєте запис `default_popup` в розділі browser action у [маніфесті розширення](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), ви можете тестувати цю HTML-сторінку безпосередньо, оскільки клацання на іконці розширення в верхній панелі браузера не спрацює. Замість цього вам потрібно відкрити файл popup html напряму.

У Chrome це працює шляхом отримання ID розширення та відкриття спливаючої сторінки через `browser.url('...')`. Поведінка на цій сторінці буде такою ж, як і в спливаючому вікні. Для цього ми рекомендуємо написати наступну користувацьку команду:

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

У вашому `wdio.conf.js` ви можете імпортувати цей файл і зареєструвати користувацьку команду у вашому хуку `before`, наприклад:

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

Тепер у вашому тесті ви можете отримати доступ до спливаючої сторінки через:

```ts
await browser.openExtensionPopup('My Web Extension')
```