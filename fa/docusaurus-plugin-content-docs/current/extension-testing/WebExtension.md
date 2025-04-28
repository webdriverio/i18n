---
id: web-extensions
title: تست افزونه‌های وب
---

WebdriverIO ابزار ایده‌آل برای خودکارسازی مرورگر است. افزونه‌های وب بخشی از مرورگر هستند و می‌توانند به همان روش خودکارسازی شوند. هر زمان که افزونه وب شما از اسکریپت‌های محتوا برای اجرای جاوااسکریپت در وب‌سایت‌ها استفاده می‌کند یا مودال پاپ‌آپ ارائه می‌دهد، می‌توانید با استفاده از WebdriverIO آزمایش e2e را برای آن اجرا کنید.

## بارگذاری افزونه وب در مرورگر

به عنوان اولین قدم، باید افزونه مورد آزمایش را به عنوان بخشی از جلسه کاری‌مان در مرورگر بارگذاری کنیم. این کار برای کروم و فایرفاکس به صورت متفاوت انجام می‌شود.

:::info

این مستندات افزونه‌های وب سافاری را به دلیل پشتیبانی ضعیف و تقاضای کم کاربران حذف کرده‌اند. اگر در حال ساخت افزونه وب برای سافاری هستید، لطفاً [موضوعی را مطرح کنید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) و در گنجاندن آن در اینجا همکاری کنید.

:::

### کروم

بارگذاری افزونه وب در کروم می‌تواند از طریق ارائه یک رشته کدگذاری شده `base64` از فایل `crx` یا با ارائه مسیری به پوشه افزونه وب انجام شود. آسان‌ترین راه این است که تنها با تعریف قابلیت‌های کروم خود به صورت زیر، کار دوم را انجام دهید:

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

اگر مرورگری غیر از کروم را خودکار می‌کنید، مانند Brave، Edge یا Opera، احتمالاً گزینه‌های مرورگر با مثال بالا مطابقت دارند، فقط با استفاده از نام قابلیت متفاوت، مثلاً `ms:edgeOptions`.

:::

اگر افزونه خود را به صورت فایل `.crx` با استفاده از بسته NPM مانند [crx](https://www.npmjs.com/package/crx) کامپایل می‌کنید، می‌توانید افزونه بسته‌بندی شده را از طریق زیر تزریق کنید:

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

برای ایجاد پروفایل فایرفاکس که شامل افزونه‌ها باشد، می‌توانید از [سرویس پروفایل فایرفاکس](/docs/firefox-profile-service) برای تنظیم جلسه خود به طور مناسب استفاده کنید. با این حال، ممکن است با مشکلاتی مواجه شوید که در آن افزونه توسعه یافته محلی شما به دلیل مشکلات امضا نمی‌تواند بارگذاری شود. در این مورد می‌توانید یک افزونه را در هوک `before` از طریق دستور [`installAddOn`](/docs/api/gecko#installaddon) بارگذاری کنید، مثلا:

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

برای تولید فایل `.xpi`، استفاده از بسته NPM [`web-ext`](https://www.npmjs.com/package/web-ext) توصیه می‌شود. می‌توانید افزونه خود را با استفاده از دستور نمونه زیر بسته‌بندی کنید:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## نکات و ترفندها

بخش زیر شامل مجموعه‌ای از نکات و ترفندهای مفید است که می‌تواند هنگام آزمایش افزونه وب کمک‌کننده باشد.

### تست مودال پاپ‌آپ در کروم

اگر یک ورودی `default_popup` در عملکرد مرورگر در [مانیفست افزونه](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) خود تعریف می‌کنید، می‌توانید آن صفحه HTML را مستقیماً آزمایش کنید، زیرا کلیک کردن روی آیکون افزونه در نوار بالای مرورگر کار نمی‌کند. در عوض، باید صفحه پاپ‌آپ html را مستقیماً باز کنید.

در کروم این کار با بازیابی شناسه افزونه و باز کردن صفحه پاپ‌آپ از طریق `browser.url('...')` انجام می‌شود. رفتار در آن صفحه همانند رفتار درون پاپ‌آپ خواهد بود. برای این کار، توصیه می‌کنیم دستور سفارشی زیر را بنویسید:

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

در `wdio.conf.js` خود می‌توانید این فایل را وارد کنید و دستور سفارشی را در هوک `before` خود ثبت کنید، مثلا:

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

اکنون، در آزمایش خود، می‌توانید به صفحه پاپ‌آپ از طریق زیر دسترسی پیدا کنید:

```ts
await browser.openExtensionPopup('My Web Extension')
```