---
id: customcommands
title: الأوامر المخصصة
description: "أضف أوامرك الخاصة للمتصفح والعناصر باستخدام addCommand، واستبدل الأوامر الموجودة، ووسّع تعريفات أنواع TypeScript."
---

إذا كنت ترغب في توسيع مثيل `browser` بمجموعة أوامرك الخاصة، فإن دالة المتصفح `addCommand` موجودة لهذا الغرض. يمكنك كتابة أمرك بطريقة غير متزامنة، تمامًا كما في ملفات الاختبار الخاصة بك.

## المعاملات

### اسم الأمر

<Option type="String">

اسم يحدد الأمر وسيتم إرفاقه بنطاق المتصفح أو العنصر.

</Option>

### الدالة المخصصة

<Option type="Function">

دالة يتم تنفيذها عند استدعاء الأمر. يكون النطاق `this` هو [`WebdriverIO.Browser`](/docs/api/browser) أو [`WebdriverIO.Element`](/docs/api/element) أو `WebdriverIO.BrowsingContext`، اعتمادًا على ما إذا كان الأمر مُرفقًا بالمتصفح أو بالعناصر أو بسياقات التصفح.

</Option>

### الخيارات

كائن يحتوي على خيارات تكوين تعدّل سلوك الأمر المخصص

#### النطاق المستهدف

<Option type="Boolean" default="false" name="attachToElement">

علامة لتحديد ما إذا كان سيتم إرفاق الأمر بنطاق المتصفح أو العنصر. إذا تم تعيينها إلى `true` فسيكون الأمر أمرًا خاصًا بالعنصر.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

علامة لإرفاق الأمر بكل سياق تصفح: علامات التبويب والنوافذ والإطارات التي تُرجعها `browser.url()` و`browser.newWindow()` و`browser.browsingContexts()` و`context.frame()` في جلسة WebDriver BiDi. لا يمكن دمجها مع `attachToElement`. راجع [سياقات التصفح](#browsing-contexts).

</Option>

#### تعطيل implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

علامة لتحديد ما إذا كان سيتم الانتظار ضمنيًا حتى يصبح العنصر موجودًا قبل استدعاء الأمر المخصص.

</Option>

## أمثلة

يوضح هذا المثال كيفية إضافة أمر جديد يُرجع عنوان URL الحالي والعنوان كنتيجة واحدة. النطاق (`this`) هو كائن [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

بالإضافة إلى ذلك، يمكنك توسيع مثيل العنصر بمجموعة أوامرك الخاصة عن طريق تعيين `attachToElement` إلى `true`. النطاق (`this`) في هذه الحالة هو كائن [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

بشكل افتراضي، تنتظر الأوامر المخصصة للعناصر حتى يصبح العنصر موجودًا قبل استدعاء الأمر المخصص. ورغم أن هذا هو المطلوب في معظم الأحيان، إلا أنه إذا لم يكن كذلك، فيمكن تعطيله باستخدام `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

تمنحك الأوامر المخصصة الفرصة لتجميع تسلسل معين من الأوامر التي تستخدمها بشكل متكرر في استدعاء واحد. يمكنك تعريف الأوامر المخصصة في أي نقطة من مجموعة الاختبارات الخاصة بك؛ فقط تأكد من أن الأمر معرَّف *قبل* أول استخدام له. (يُعد الخطاف `before` في ملف `wdio.conf.js` مكانًا جيدًا لإنشائها.)

بمجرد تعريفها، يمكنك استخدامها على النحو التالي:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__ملاحظة:__ إذا قمت بتسجيل أمر مخصص في نطاق `browser`، فلن يكون الأمر متاحًا للعناصر. وبالمثل، إذا قمت بتسجيل أمر في نطاق العنصر، فلن يكون متاحًا في نطاق `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__ملاحظة:__ إذا كنت بحاجة إلى ربط أمر مخصص بشكل متسلسل، فيجب أن ينتهي الأمر بـ `$`،

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

احرص على عدم إثقال نطاق `browser` بالكثير من الأوامر المخصصة.

نوصي بتعريف المنطق المخصص في [كائنات الصفحات](pageobjects)، بحيث تكون مرتبطة بصفحة محددة.

### سياقات التصفح

في جلسة WebDriver BiDi، تكون كل من علامة التبويب والنافذة والإطار من نوع `WebdriverIO.BrowsingContext`. عيّن `attachToBrowsingContext` إلى `true` لإضافة أمر إليها جميعًا. النطاق (`this`) هو السياق الذي تم استدعاء الأمر عليه، و`this.browser` هو المتصفح الذي ينتمي إليه:

```js
browser.addCommand('heading', async function () {
    // `this` is the tab, window or frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

يكون الأمر متاحًا على السياقات الموجودة بالفعل وعلى كل سياق يتم إنشاؤه لاحقًا، بما في ذلك الإطارات من أصل آخر. يمكن للأمر الذي لا يكون منطقيًا إلا لعلامة تبويب أو نافذة أن يتحقق من `this.isFrame`.

يؤدي استدعاء `addCommand` و`overwriteCommand` على سياق التصفح نفسه إلى إطلاق خطأ. سجّل الأمر على المتصفح.

### Multi-remote

تعمل `addCommand` بطريقة مماثلة في وضع multi-remote، باستثناء أن الأمر الجديد سينتقل إلى المثيلات الفرعية. يجب أن تكون حذرًا عند استخدام كائن `this` نظرًا لأن `browser` في وضع multi-remote ومثيلاته الفرعية لها قيم `this` مختلفة.

يوضح هذا المثال كيفية إضافة أمر جديد في وضع multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## توسيع تعريفات الأنواع

مع TypeScript، من السهل توسيع واجهات WebdriverIO. أضف الأنواع إلى أوامرك المخصصة على النحو التالي:

1. أنشئ ملف تعريف أنواع (على سبيل المثال، `./src/types/wdio.d.ts`)
2. أ. إذا كنت تستخدم ملف تعريف أنواع بنمط الوحدات (باستخدام import/export و`declare global WebdriverIO` في ملف تعريف الأنواع)، فتأكد من تضمين مسار الملف في خاصية `include` في `tsconfig.json`.

   ب. إذا كنت تستخدم ملفات تعريف أنواع بالنمط المحيطي (ambient) (بدون import/export في ملفات تعريف الأنواع و`declare namespace WebdriverIO` للأوامر المخصصة)، فتأكد من أن `tsconfig.json` *لا* يحتوي على أي قسم `include`، لأن ذلك سيؤدي إلى عدم تعرّف TypeScript على جميع ملفات تعريف الأنواع غير المدرجة في قسم `include`.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. أضف تعريفات لأوامرك وفقًا لوضع التنفيذ الخاص بك.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## دمج مكتبات الطرف الثالث

إذا كنت تستخدم مكتبات خارجية (على سبيل المثال، لإجراء استدعاءات قاعدة البيانات) تدعم الوعود (promises)، فإن أحد الأساليب الجيدة لدمجها هو تغليف بعض دوال واجهة برمجة التطبيقات بأمر مخصص.

عند إرجاع الوعد، يضمن WebdriverIO عدم المتابعة إلى الأمر التالي حتى يتم حل الوعد. وإذا تم رفض الوعد، فسيُطلق الأمر خطأً.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

بعد ذلك، ما عليك سوى استخدامه في ملفات اختبار WDIO الخاصة بك:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**ملاحظة:** نتيجة أمرك المخصص هي نتيجة الوعد الذي تُرجعه.

## استبدال الأوامر

يمكنك أيضًا استبدال الأوامر الأصلية باستخدام `overwriteCommand`.

لا يُنصح بفعل ذلك، لأنه قد يؤدي إلى سلوك غير متوقع لإطار العمل!

النهج العام مشابه لـ `addCommand`، والفرق الوحيد هو أن الوسيط الأول في دالة الأمر هو الدالة الأصلية التي توشك على استبدالها. يُرجى الاطلاع على بعض الأمثلة أدناه.

### استبدال أوامر المتصفح

```js
/**
 * Print milliseconds before pause and return its value.
 *
 * @param pause - name of command to be overwritten
 * @param this of func - the original browser instance on which the function was called
 * @param originalPauseFunction of func - the original pause function
 * @param ms of func - the actual parameters passed
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### استبدال أوامر العناصر

استبدال الأوامر على مستوى العنصر مماثل تقريبًا. عيّن `attachToElement` إلى `true`:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 * Show that the original function argument type can be kept with `options?: ClickOptions`
 *
 * @param this of func - the element on which the original function was called
 * @param originalClickFunction of func - the original pause function
 * @param options of func - the actual parameters passed
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // attempt to click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scroll to element and click again
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicking with js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Don't forget to attach it to the element
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

### استبدال أوامر سياقات التصفح

عيّن `attachToBrowsingContext` إلى `true` لاستبدال أمر مدمج أو مخصص لكل علامة تبويب ونافذة وإطار. يكون الأمر الأصلي مرتبطًا بالسياق الذي تم استدعاؤه عليه:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## إضافة المزيد من أوامر WebDriver

إذا كنت تستخدم بروتوكول WebDriver وتشغّل الاختبارات على منصة تدعم أوامر إضافية غير معرَّفة في أي من تعريفات البروتوكول في [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)، فيمكنك إضافتها يدويًا من خلال واجهة `addCommand`. توفر حزمة `webdriver` مغلِّفًا للأوامر يتيح تسجيل نقاط النهاية الجديدة هذه بنفس طريقة الأوامر الأخرى، مع توفير نفس عمليات التحقق من المعاملات ومعالجة الأخطاء. لتسجيل نقطة النهاية الجديدة هذه، استورد مغلِّف الأوامر وسجّل أمرًا جديدًا به على النحو التالي:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

يؤدي استدعاء هذا الأمر بمعاملات غير صالحة إلى نفس معالجة الأخطاء التي تحدث مع أوامر البروتوكول المعرَّفة مسبقًا، على سبيل المثال:

```js
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

يؤدي استدعاء الأمر بشكل صحيح، على سبيل المثال `browser.myNewCommand('foo', 'bar')`، إلى إرسال طلب WebDriver بشكل صحيح إلى، على سبيل المثال، `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` مع حمولة مثل `{ foo: 'bar' }`.

:::note
سيتم استبدال معامل عنوان URL `:sessionId` تلقائيًا بمعرّف جلسة WebDriver. يمكن تطبيق معاملات عنوان URL أخرى ولكن يجب تعريفها ضمن `variables`.
:::

اطلع على أمثلة لكيفية تعريف أوامر البروتوكول في حزمة [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).