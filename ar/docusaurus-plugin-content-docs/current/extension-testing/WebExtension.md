---
id: web-extensions
title: اختبار إضافات الويب
description: "تحميل إضافة ويب في Chrome أو Firefox لجلسة WebdriverIO، بما في ذلك تثبيتها وإلغاء تثبيتها عبر BiDi أثناء الجلسة."
---

يُعد WebdriverIO الأداة المثالية لأتمتة المتصفح. وإضافات الويب (Web Extensions) جزء من المتصفح ويمكن أتمتتها بالطريقة نفسها. فكلما استخدمت إضافة الويب الخاصة بك سكربتات المحتوى (content scripts) لتشغيل JavaScript على المواقع أو لعرض نافذة منبثقة، يمكنك تشغيل اختبار e2e لذلك باستخدام WebdriverIO.

حمّل الإضافة قبل أول عملية تنقل باستخدام إعداد الإمكانيات (capabilities) الموضح أدناه. ولتثبيت إضافة وإزالتها في منتصف جلسة [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-webExtension)، استخدم [`installExtension`](/docs/api/browser/installExtension) و[`uninstallExtension`](/docs/api/browser/uninstallExtension).

## تحميل إضافة ويب في المتصفح

كخطوة أولى، علينا تحميل الإضافة قيد الاختبار في المتصفح كجزء من جلستنا. ويختلف ذلك بين Chrome وFirefox.

:::info

تستثني هذه الوثائق إضافات الويب الخاصة بـ Safari لأن دعمه لها متأخر كثيرًا والطلب عليها من المستخدمين ليس مرتفعًا. كما أن Safari لا يملك جلسة WebDriver BiDi، لذا فإن [`installExtension`](/docs/api/browser/installExtension) لا يشمل Safari. إذا كنت تبني إضافة ويب لـ Safari، يُرجى [فتح مشكلة](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) والتعاون على تضمينها هنا أيضًا.

:::

### Chrome

يمكن تحميل إضافة ويب في Chrome إما بتوفير سلسلة نصية مُرمّزة بـ `base64` لملف `crx` أو بتوفير مسار إلى مجلد إضافة الويب. الطريقة الأسهل هي الثانية، وذلك بتعريف إمكانيات Chrome على النحو التالي:

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

إذا كنت تقوم بأتمتة متصفح غير Chrome، مثل Brave أو Edge أو Opera، فمن المرجح أن خيارات المتصفح تتطابق مع المثال أعلاه، مع استخدام اسم إمكانية مختلف فقط، مثل `ms:edgeOptions`.

:::

إذا قمت بتجميع إضافتك كملف `.crx` باستخدام حزمة NPM مثل [crx](https://www.npmjs.com/package/crx)، فيمكنك أيضًا حقن الإضافة المجمّعة عبر:

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

لإنشاء ملف تعريف (profile) لـ Firefox يتضمن إضافات، يمكنك استخدام [Firefox Profile Service](/docs/firefox-profile-service) لإعداد جلستك وفقًا لذلك. ومع ذلك، قد تواجه مشكلات حيث لا يمكن تحميل إضافتك المطوّرة محليًا بسبب مشكلات في التوقيع. في هذه الحالة، يمكنك أيضًا تحميل إضافة في خطاف `before` عبر أمر [`installAddOn`](/docs/api/gecko#installaddon)، على سبيل المثال:

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

لإنشاء ملف `.xpi`، يُوصى باستخدام حزمة NPM [`web-ext`](https://www.npmjs.com/package/web-ext). يمكنك تجميع إضافتك باستخدام الأمر التالي كمثال:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## تثبيت إضافة أثناء الجلسة

منذ الإصدار v10، يقوم [`browser.installExtension`](/docs/api/browser/installExtension) و[`browser.uninstallExtension`](/docs/api/browser/uninstallExtension) بتثبيت إضافة ويب في منتصف جلسة WebDriver BiDi وإرجاع معرّفها. استخدمهما عندما يجب ألا تكون الإضافة موجودة عند التشغيل، أو عندما يقوم الاختبار نفسه بتثبيتها واختبارها ثم إزالتها.

يظل إعداد الإمكانيات و`installAddOn` الموضحان أعلاه هما الطريقة لتحميل إضافة قبل أول عملية تنقل، ولا يحل `installExtension` محلهما. كما يظل `browser.webExtensionInstall` و`browser.webExtensionUninstall` متاحين عندما تريد إنشاء [حمولة المواصفة](https://w3c.github.io/webdriver-bidi/#command-webExtension-install) بنفسك.

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

يقبل `installExtension` ثلاثة أنواع من المدخلات:

| المُدخل | الحمولة المُرسلة إلى المتصفح |
| --- | --- |
| مسار مجلد | `{ type: 'path', path }` بعد `path.resolve`. يجب أن يكون المتصفح قادرًا على قراءة ذلك المجلد. |
| مسار ملف `.zip` أو `.xpi` أو `.crx` | `{ type: 'archivePath', path }` بعد `path.resolve`. |
| `{ base64: string }` | `{ type: 'base64', value }`. بايتات الأرشيف. يُرفض أي كائن آخر. |

يُحَل المسار النصي دائمًا على مُشغّل الاختبارات. في الجلسة البعيدة — أي اسم مضيف غير `localhost` أو `127.0.0.1` أو `::1`، أو عند استخدام `user` و`key` لخدمة سحابية — لا يكون ذلك المسار مسارًا على جهاز المتصفح. يقوم الأمر بقراءة الأرشيف، أو ضغط المجلد في الذاكرة، ثم يرسل `base64`. لست بحاجة إلى التفريق بين الجلسة المحلية والبعيدة بنفسك. أما الجلسات المحلية فترسل `path` أو `archivePath` ولا تقرأ البايتات.

وجّه مسار المجلد إلى جذر الإضافة، أي المجلد الذي يحتوي على `manifest.json`.

يجب أن تدعم الجلسة WebDriver BiDi. تُطلق الجلسة الكلاسيكية الخطأ `installExtension requires a WebDriver BiDi session (webExtension.install)`. أما المتصفح الذي يطبّق BiDi دون هذه الوحدة فيُفشل الأمر بالخطأ `unsupported operation` (أو `unknown command` عندما تكون الوحدة غير موجودة). ويفشل الأرشيف التالف بالخطأ `invalid web extension`. كما يفشل إلغاء تثبيت معرّف لا يعرفه المتصفح بالخطأ `no such web extension`.

يأخذ `uninstallExtension` سلسلة المعرّف النصية التي أرجعها `installExtension`.

### Chromium

يطبّق Chrome وEdge الأمر `webExtension.install` لكنهما يبقيانه معطّلًا حتى تبدأ المتصفح باستخدام `--enable-unsafe-extension-debugging` و`--remote-debugging-pipe`. كما يتطلب Chrome 136 والإصدارات الأحدث `--user-data-dir` كلما تم تعيين `--remote-debugging-pipe`. وبدون هذه الوسائط يفشل الأمر بالخطأ `unknown error - Method not available`.

يمثل `--remote-debugging-pipe` قناة الاتصال (pipe) بين برنامج التشغيل (driver) والمتصفح. ولا تزال جلسة BiDi تستخدم `webSocketUrl`.

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

استخدم `ms:edgeOptions` لـ Edge. أما Firefox فيحمّل الإضافة في جلسة BiDi عادية ولا يحتاج إلى هذه الوسائط.

## نصائح وحيل

يحتوي القسم التالي على مجموعة من النصائح والحيل المفيدة التي يمكن أن تساعد عند اختبار إضافة ويب.

### اختبار النافذة المنبثقة في Chrome

إذا قمت بتعريف مدخل إجراء المتصفح `default_popup` في [ملف بيان الإضافة](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)، يمكنك اختبار صفحة HTML تلك مباشرةً، إذ إن النقر على أيقونة الإضافة في الشريط العلوي للمتصفح لن يعمل. بدلًا من ذلك، عليك فتح ملف HTML الخاص بالنافذة المنبثقة مباشرةً.

يتم ذلك في Chrome عن طريق استرداد معرّف الإضافة وفتح صفحة النافذة المنبثقة عبر `browser.url('...')`. سيكون السلوك في تلك الصفحة هو نفسه داخل النافذة المنبثقة. ولتحقيق ذلك، نوصي بكتابة الأمر المخصص التالي:

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

في ملف `wdio.conf.js` يمكنك استيراد هذا الملف وتسجيل الأمر المخصص في خطاف `before`، على سبيل المثال:

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

الآن، يمكنك في اختبارك الوصول إلى صفحة النافذة المنبثقة عبر:

```ts
await browser.openExtensionPopup('My Web Extension')
```