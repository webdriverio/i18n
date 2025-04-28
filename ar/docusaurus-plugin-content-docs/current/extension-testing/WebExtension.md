---
id: web-extensions
title: اختبار امتدادات الويب
---

تعتبر WebdriverIO الأداة المثالية لأتمتة المتصفح. امتدادات الويب هي جزء من المتصفح ويمكن أتمتتها بنفس الطريقة. عندما يستخدم امتداد الويب الخاص بك النصوص البرمجية للمحتوى لتشغيل JavaScript على مواقع الويب أو تقديم نافذة منبثقة، يمكنك تشغيل اختبار e2e لذلك باستخدام WebdriverIO.

## تحميل امتداد الويب إلى المتصفح

كخطوة أولى، علينا تحميل الامتداد المراد اختباره في المتصفح كجزء من جلستنا. يعمل هذا بشكل مختلف في Chrome و Firefox.

:::info

تستثني هذه الوثائق امتدادات Safari لأن دعمها متأخر كثيرًا والطلب عليها ليس مرتفعًا. إذا كنت تبني امتدادًا للويب لـ Safari، يرجى [رفع مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) والتعاون على تضمينها هنا أيضًا.

:::

### Chrome

يمكن تحميل امتداد الويب في Chrome من خلال توفير سلسلة مشفرة بـ `base64` لملف `crx` أو عن طريق توفير مسار إلى مجلد امتدادات الويب. الأسهل هو القيام بالأخير من خلال تحديد إمكانيات Chrome الخاصة بك على النحو التالي:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // بافتراض أن ملف wdio.conf.js في الدليل الجذر وملفات امتداد الويب المجمعة
            // موجودة في مجلد `./dist`
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

إذا كنت تقوم بأتمتة متصفح مختلف عن Chrome، مثل Brave أو Edge أو Opera، فمن المحتمل أن خيارات المتصفح تتطابق مع المثال أعلاه، فقط باستخدام اسم قدرة مختلف، مثل `ms:edgeOptions`.

:::

إذا قمت بتجميع الامتداد الخاص بك كملف `.crx` باستخدام، على سبيل المثال، حزمة [crx](https://www.npmjs.com/package/crx) من NPM، يمكنك أيضًا إضافة الامتداد المحزم عبر:

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

لإنشاء ملف تعريف Firefox الذي يتضمن الامتدادات، يمكنك استخدام [خدمة ملف تعريف Firefox](/docs/firefox-profile-service) لإعداد الجلسة الخاصة بك وفقًا لذلك. ومع ذلك، قد تواجه مشاكل حيث لا يمكن تحميل امتدادك المطور محليًا بسبب مشاكل التوقيع. في هذه الحالة، يمكنك أيضًا تحميل امتداد في خطاف `before` عبر أمر [`installAddOn`](/docs/api/gecko#installaddon)، على سبيل المثال:

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

من أجل إنشاء ملف `.xpi`، يوصى باستخدام حزمة NPM [`web-ext`](https://www.npmjs.com/package/web-ext). يمكنك حزم الامتداد الخاص بك باستخدام الأمر المثال التالي:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## نصائح وحيل

يحتوي القسم التالي على مجموعة من النصائح والحيل المفيدة التي يمكن أن تساعد عند اختبار امتداد ويب.

### اختبار النافذة المنبثقة في Chrome

إذا قمت بتحديد إدخال إجراء متصفح `default_popup` في [ملف التعريف الخاص بالامتداد](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) يمكنك اختبار صفحة HTML تلك مباشرة، لأن النقر على أيقونة الامتداد في شريط المتصفح العلوي لن يعمل. بدلاً من ذلك، يجب عليك فتح ملف HTML المنبثق مباشرة.

في Chrome، يعمل هذا عن طريق استرداد معرف الامتداد وفتح الصفحة المنبثقة من خلال `browser.url('...')`. سيكون السلوك على تلك الصفحة هو نفسه داخل النافذة المنبثقة. للقيام بذلك، نوصي بكتابة الأمر المخصص التالي:

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

في ملف `wdio.conf.js` الخاص بك، يمكنك استيراد هذا الملف وتسجيل الأمر المخصص في خطاف `before` الخاص بك، على سبيل المثال:

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

الآن، في اختبارك، يمكنك الوصول إلى الصفحة المنبثقة عبر:

```ts
await browser.openExtensionPopup('My Web Extension')
```