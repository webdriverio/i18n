---
id: web-extensions
title: تست افزونه‌های وب
description: "بارگذاری یک افزونهٔ وب در Chrome یا Firefox برای یک نشست WebdriverIO، شامل نصب و حذف آن در میانهٔ نشست با BiDi."
---

WebdriverIO ابزاری ایده‌آل برای خودکارسازی مرورگر است. افزونه‌های وب (Web Extensions) بخشی از مرورگر هستند و می‌توان آن‌ها را به همان روش خودکارسازی کرد. هر زمان که افزونهٔ وب شما از content scriptها برای اجرای JavaScript روی وب‌سایت‌ها استفاده می‌کند یا یک مودال popup ارائه می‌دهد، می‌توانید با استفاده از WebdriverIO یک تست e2e برای آن اجرا کنید.

با استفاده از تنظیمات capability زیر، افزونه را پیش از اولین ناوبری بارگذاری کنید. برای نصب و حذف یک افزونه در میانهٔ یک نشست [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension)، از [`installExtension`](/docs/api/browser/installExtension) و [`uninstallExtension`](/docs/api/browser/uninstallExtension) استفاده کنید.

## بارگذاری یک افزونهٔ وب در مرورگر

در اولین گام باید افزونهٔ مورد تست را به‌عنوان بخشی از نشست خود در مرورگر بارگذاری کنیم. این کار در Chrome و Firefox به شکل متفاوتی انجام می‌شود.

:::info

این مستندات افزونه‌های وب Safari را پوشش نمی‌دهند، زیرا پشتیبانی آن از این قابلیت بسیار عقب‌تر است و تقاضای کاربران نیز زیاد نیست. Safari همچنین نشست WebDriver BiDi ندارد، بنابراین [`installExtension`](/docs/api/browser/installExtension) شامل Safari نمی‌شود. اگر در حال ساخت یک افزونهٔ وب برای Safari هستید، لطفاً [یک issue ثبت کنید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) و در افزودن آن به این بخش همکاری کنید.

:::

### Chrome

بارگذاری یک افزونهٔ وب در Chrome را می‌توان با ارائهٔ یک رشتهٔ کدگذاری‌شده با `base64` از فایل `crx` یا با ارائهٔ مسیر پوشهٔ افزونهٔ وب انجام داد. ساده‌ترین روش، انجام حالت دوم با تعریف capabilityهای Chrome به شکل زیر است:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // با فرض اینکه wdio.conf.js در دایرکتوری ریشه قرار دارد و فایل‌های کامپایل‌شدهٔ
            // افزونهٔ وب در پوشهٔ `./dist` قرار دارند
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

اگر مرورگری غیر از Chrome را خودکارسازی می‌کنید، مثلاً Brave، Edge یا Opera، به احتمال زیاد گزینه‌های مرورگر با مثال بالا مطابقت دارند و فقط از نام capability متفاوتی استفاده می‌شود، مثلاً `ms:edgeOptions`.

:::

اگر افزونهٔ خود را به‌صورت فایل `.crx` کامپایل می‌کنید، مثلاً با استفاده از بستهٔ NPM [crx](https://www.npmjs.com/package/crx)، می‌توانید افزونهٔ بسته‌بندی‌شده را از این طریق نیز تزریق کنید:

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

برای ایجاد یک پروفایل Firefox که شامل افزونه‌ها باشد، می‌توانید از [Firefox Profile Service](/docs/firefox-profile-service) برای راه‌اندازی نشست خود استفاده کنید. با این حال ممکن است با مشکلاتی مواجه شوید که در آن افزونهٔ توسعه‌یافتهٔ محلی شما به دلیل مشکلات امضا (signing) بارگذاری نشود. در این صورت می‌توانید افزونه را در هوک `before` از طریق فرمان [`installAddOn`](/docs/api/gecko#installaddon) نیز بارگذاری کنید، مثلاً:

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

برای تولید یک فایل `.xpi`، توصیه می‌شود از بستهٔ NPM [`web-ext`](https://www.npmjs.com/package/web-ext) استفاده کنید. می‌توانید افزونهٔ خود را با استفاده از فرمان نمونهٔ زیر بسته‌بندی کنید:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## نصب یک افزونه در طول نشست

از نسخهٔ v10، [`browser.installExtension`](/docs/api/browser/installExtension) و [`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) یک افزونهٔ وب را در میانهٔ یک نشست WebDriver BiDi نصب می‌کنند و شناسهٔ (id) آن را برمی‌گردانند. زمانی از آن‌ها استفاده کنید که افزونه نباید هنگام راه‌اندازی وجود داشته باشد، یا زمانی که یک تست واحد آن را نصب می‌کند، به کار می‌گیرد و حذف می‌کند.

تنظیمات capability و `installAddOn` که در بالا آمد، همچنان روش بارگذاری افزونه پیش از اولین ناوبری هستند. `installExtension` جایگزین آن‌ها نمی‌شود. `browser.webExtensionInstall` و `browser.webExtensionUninstall` نیز زمانی که بخواهید [payload مشخصات](https://w3c.github.io/webdriver-bidi/#command-webExtension-install) را خودتان ارسال کنید، همچنان در دسترس هستند.

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

`installExtension` سه نوع ورودی می‌پذیرد:

| ورودی | payload ارسال‌شده به مرورگر |
| --- | --- |
| مسیر یک دایرکتوری | `{ type: 'path', path }` پس از `path.resolve`. مرورگر باید بتواند آن دایرکتوری را بخواند. |
| مسیر یک فایل `.zip`، `.xpi` یا `.crx` | `{ type: 'archivePath', path }` پس از `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. بایت‌های آرشیو. هر شیء دیگری رد می‌شود. |

یک مسیر رشته‌ای همیشه روی test runner تفسیر (resolve) می‌شود. در یک نشست راه دور — یعنی hostname‌ای غیر از `localhost`، `127.0.0.1` یا `::1`، یا یک `user` و `key` ابری — آن مسیر، مسیری روی ماشین مرورگر نیست. فرمان، آرشیو را می‌خواند یا دایرکتوری را در حافظه zip می‌کند و `base64` را ارسال می‌کند. لازم نیست خودتان بین حالت محلی و راه دور تفکیک قائل شوید. نشست‌های محلی `path` یا `archivePath` را ارسال می‌کنند و بایت‌ها را نمی‌خوانند.

دایرکتوری را به ریشهٔ افزونه اشاره دهید، یعنی پوشه‌ای که شامل `manifest.json` است.

نشست باید از WebDriver BiDi پشتیبانی کند. یک نشست کلاسیک خطای `installExtension requires a WebDriver BiDi session (webExtension.install)` را پرتاب می‌کند. مرورگری که BiDi را پیاده‌سازی کرده اما این ماژول را نه، فرمان را با `unsupported operation` (یا در صورت نبود ماژول با `unknown command`) ناموفق می‌کند. یک آرشیو نامعتبر با `invalid web extension` شکست می‌خورد. حذف شناسه‌ای که مرورگر آن را نمی‌شناسد با `no such web extension` شکست می‌خورد.

`uninstallExtension` رشتهٔ شناسه‌ای را می‌گیرد که `installExtension` برگردانده است.

### Chromium

Chrome و Edge فرمان `webExtension.install` را پیاده‌سازی کرده‌اند، اما تا زمانی که مرورگر را با `--enable-unsafe-extension-debugging` و `--remote-debugging-pipe` راه‌اندازی نکنید، آن را غیرفعال نگه می‌دارند. Chrome 136 و نسخه‌های جدیدتر همچنین هر زمان که `--remote-debugging-pipe` تنظیم شده باشد، به `--user-data-dir` نیاز دارند. بدون این آرگومان‌ها، فرمان با `unknown error - Method not available` شکست می‌خورد.

`--remote-debugging-pipe` همان pipe بین درایور و مرورگر است. نشست BiDi همچنان از `webSocketUrl` استفاده می‌کند.

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

برای Edge از `ms:edgeOptions` استفاده کنید. Firefox افزونه را در یک نشست BiDi معمولی بارگذاری می‌کند و به این آرگومان‌ها نیازی ندارد.

## نکات و ترفندها

بخش زیر شامل مجموعه‌ای از نکات و ترفندهای مفید است که می‌تواند هنگام تست یک افزونهٔ وب کمک‌کننده باشد.

### تست مودال Popup در Chrome

اگر یک ورودی browser action با نام `default_popup` در [manifest افزونهٔ](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) خود تعریف کرده باشید، می‌توانید آن صفحهٔ HTML را مستقیماً تست کنید، زیرا کلیک روی آیکون افزونه در نوار بالای مرورگر کار نخواهد کرد. در عوض، باید فایل html مربوط به popup را مستقیماً باز کنید.

در Chrome این کار با دریافت شناسهٔ افزونه و باز کردن صفحهٔ popup از طریق `browser.url('...')` انجام می‌شود. رفتار آن صفحه مشابه رفتار درون popup خواهد بود. برای این کار توصیه می‌کنیم فرمان سفارشی زیر را بنویسید:

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

در فایل `wdio.conf.js` خود می‌توانید این فایل را import کرده و فرمان سفارشی را در هوک `before` ثبت کنید، مثلاً:

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

اکنون در تست خود می‌توانید از این طریق به صفحهٔ popup دسترسی پیدا کنید:

```ts
await browser.openExtensionPopup('My Web Extension')
```