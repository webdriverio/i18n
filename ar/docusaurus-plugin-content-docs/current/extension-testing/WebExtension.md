---
id: web-extensions
title: اختبار امتدادات الويب
---

WebdriverIO هي الأداة المثالية لأتمتة المتصفح. امتدادات الويب هي جزء من المتصفح ويمكن أتمتتها بنفس الطريقة. كلما استخدم امتداد الويب الخاص بك نصوصًا برمجية للمحتوى لتشغيل JavaScript على مواقع الويب أو تقديم نافذة منبثقة، يمكنك تشغيل اختبار e2e لذلك باستخدام WebdriverIO.

## تحميل امتداد الويب إلى المتصفح

كخطوة أولى، يجب علينا تحميل الامتداد قيد الاختبار في المتصفح كجزء من جلستنا. يعمل هذا بشكل مختلف لكل من Chrome و Firefox.

:::info

تترك هذه الوثائق امتدادات Safari الويب حيث أن دعمها متأخر كثيرًا والطلب من المستخدمين ليس عاليًا. إذا كنت تقوم ببناء امتداد ويب لـ Safari، يرجى [فتح مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) والتعاون على تضمينها هنا أيضًا.

:::

### Chrome

يمكن تحميل امتداد ويب في Chrome من خلال توفير سلسلة مشفرة بـ `base64` من ملف `crx` أو من خلال توفير مسار إلى مجلد امتداد الويب. الأسهل هو ببساطة القيام بالأخير من خلال تحديد قدرات Chrome الخاصة بك على النحو التالي:

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

إذا كنت تقوم بأتمتة متصفح مختلف عن Chrome، مثل Brave أو Edge أو Opera، فمن المحتمل أن خيارات المتصفح تتطابق مع المثال أعلاه، فقط باستخدام اسم قدرة مختلف، مثل `ms:edgeOptions`.

:::

إذا قمت بتجميع الامتداد الخاص بك كملف `.crx` باستخدام حزمة NPM [crx](https://www.npmjs.com/package/crx) على سبيل المثال، يمكنك أيضًا حقن الامتداد المجمع عبر:

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

لإنشاء ملف تعريف Firefox يتضمن الامتدادات، يمكنك استخدام [خدمة ملف تعريف Firefox](/docs/firefox-profile-service) لإعداد جلستك وفقًا لذلك. ومع ذلك، قد تواجه مشكلات حيث لا يمكن تحميل الامتداد المطور محليًا بسبب مشكلات التوقيع. في هذه الحالة، يمكنك أيضًا تحميل امتداد في الخطاف `before` عبر أمر [`installAddOn`](/docs/api/gecko#installaddon)، على سبيل المثال:

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

من أجل إنشاء ملف `.xpi`، يوصى باستخدام حزمة NPM [`web-ext`](https://www.npmjs.com/package/web-ext). يمكنك تجميع الامتداد الخاص بك باستخدام أمر المثال التالي:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## نصائح وحيل

يحتوي القسم التالي على مجموعة من النصائح والحيل المفيدة التي يمكن أن تكون مفيدة عند اختبار امتداد ويب.

### اختبار النافذة المنبثقة في Chrome

إذا قمت بتحديد إدخال إجراء متصفح `default_popup` في [ملف تعريف الامتداد](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) الخاص بك، يمكنك اختبار صفحة HTML هذه مباشرة، لأن النقر على أيقونة الامتداد في شريط المتصفح العلوي لن يعمل. بدلاً من ذلك، يجب عليك فتح ملف HTML المنبثق مباشرةً.

في Chrome، يعمل هذا عن طريق استرداد معرف الامتداد وفتح الصفحة المنبثقة من خلال `browser.url('...')`. سيكون السلوك في تلك الصفحة هو نفسه داخل النافذة المنبثقة. للقيام بذلك، نوصي بكتابة الأمر المخصص التالي:

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