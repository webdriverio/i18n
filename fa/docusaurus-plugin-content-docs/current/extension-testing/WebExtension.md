---
id: web-extensions
title: تست افزونه‌های وب
---

WebdriverIO ابزار ایده‌آلی برای خودکارسازی مرورگر است. افزونه‌های وب بخشی از مرورگر هستند و می‌توانند به همان روش خودکارسازی شوند. هر زمان که افزونه وب شما از اسکریپت‌های محتوا برای اجرای جاوااسکریپت در وب‌سایت‌ها استفاده می‌کند یا یک پنجره بازشونده ارائه می‌دهد، می‌توانید با استفاده از WebdriverIO یک تست end-to-end برای آن اجرا کنید.

## بارگذاری افزونه وب در مرورگر

به عنوان اولین قدم، باید افزونه مورد آزمایش را در مرورگر به عنوان بخشی از جلسه خود بارگذاری کنیم. این کار برای کروم و فایرفاکس به شکل متفاوتی انجام می‌شود.

:::info

این مستندات افزونه‌های وب سافاری را به دلیل پشتیبانی ضعیف و تقاضای کم کاربران شامل نمی‌شود. اگر در حال ساخت افزونه وب برای سافاری هستید، لطفاً [یک مشکل ایجاد کنید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) و برای اضافه کردن آن در اینجا همکاری کنید.

:::

### کروم

بارگذاری یک افزونه وب در کروم می‌تواند از طریق ارائه یک رشته کدگذاری شده `base64` از فایل `crx` یا با ارائه مسیری به پوشه افزونه وب انجام شود. ساده‌ترین راه انجام مورد دوم است که با تعریف قابلیت‌های کروم خود به شکل زیر انجام می‌شود:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // با فرض اینکه wdio.conf.js شما در دایرکتوری اصلی قرار دارد و فایل‌های 
            // کامپایل شده افزونه وب شما در پوشه `./dist` قرار دارند
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

اگر شما مرورگری غیر از کروم مانند Brave، Edge یا Opera را خودکارسازی می‌کنید، احتمالاً گزینه‌های مرورگر با مثال بالا مطابقت دارد، فقط از نام قابلیت متفاوتی مانند `ms:edgeOptions` استفاده می‌کند.

:::

اگر افزونه خود را به صورت فایل `.crx` با استفاده از بسته NPM مانند [crx](https://www.npmjs.com/package/crx) کامپایل می‌کنید، می‌توانید افزونه بسته‌بندی شده را به این شکل اضافه کنید:

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

### فایرفاکس

برای ایجاد یک پروفایل فایرفاکس که شامل افزونه‌ها باشد، می‌توانید از [سرویس پروفایل فایرفاکس](/docs/firefox-profile-service) برای تنظیم جلسه خود استفاده کنید. با این حال، ممکن است به دلیل مشکلات امضا با مشکلاتی در بارگذاری افزونه توسعه یافته محلی مواجه شوید. در این صورت می‌توانید یک افزونه را در هوک `before` از طریق دستور [`installAddOn`](/docs/api/gecko#installaddon) بارگذاری کنید، مثلاً:

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

برای تولید یک فایل `.xpi`، استفاده از بسته NPM [`web-ext`](https://www.npmjs.com/package/web-ext) توصیه می‌شود. می‌توانید افزونه خود را با استفاده از دستور نمونه زیر بسته‌بندی کنید:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## نکات و ترفندها

بخش زیر مجموعه‌ای از نکات و ترفندهای مفید است که می‌توانند هنگام آزمایش یک افزونه وب کمک‌کننده باشند.

### تست پنجره بازشونده در کروم

اگر در [فایل manifest افزونه](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) خود یک ورودی `default_popup` در اقدامات مرورگر تعریف کرده‌اید، می‌توانید آن صفحه HTML را مستقیماً آزمایش کنید، زیرا کلیک روی آیکون افزونه در نوار بالایی مرورگر کار نخواهد کرد. در عوض، باید فایل HTML بازشونده را مستقیماً باز کنید.

در کروم، این کار با دریافت شناسه افزونه و باز کردن صفحه بازشونده از طریق `browser.url('...')` انجام می‌شود. رفتار در آن صفحه همانند رفتار درون بازشونده خواهد بود. برای این کار، توصیه می‌کنیم دستور سفارشی زیر را بنویسید:

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

در فایل `wdio.conf.js` خود می‌توانید این فایل را وارد کنید و دستور سفارشی را در هوک `before` خود ثبت کنید، به عنوان مثال:

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

حالا در تست خود می‌توانید به صفحه بازشونده از طریق این دستور دسترسی پیدا کنید:

```ts
await browser.openExtensionPopup('My Web Extension')
```
```