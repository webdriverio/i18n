---
id: customcommands
title: الأوامر المخصصة
---

إذا كنت ترغب في توسيع مثيل `browser` بمجموعة خاصة بك من الأوامر، فإن طريقة المتصفح `addCommand` موجودة من أجلك. يمكنك كتابة أمرك بطريقة غير متزامنة، تمامًا كما في مواصفاتك.

## المعلمات

### اسم الأمر

اسم يحدد الأمر وسيتم إرفاقه بنطاق المتصفح أو العنصر.

النوع: `String`

### الدالة المخصصة

الدالة التي يتم تنفيذها عند استدعاء الأمر. نطاق `this` هو إما [`WebdriverIO.Browser`](/docs/api/browser) أو [`WebdriverIO.Element`](/docs/api/element) اعتمادًا على ما إذا كان الأمر مرتبطًا بنطاق المتصفح أو العنصر.

النوع: `Function`

### نطاق الهدف

علامة لتحديد ما إذا كان سيتم إرفاق الأمر بنطاق المتصفح أو العنصر. إذا تم تعيينه إلى `true`، سيكون الأمر أمر عنصر.

النوع: `Boolean`<br />
الافتراضي: `false`

## أمثلة

يوضح هذا المثال كيفية إضافة أمر جديد يقوم بإرجاع عنوان URL الحالي والعنوان كنتيجة واحدة. النطاق (`this`) هو كائن [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` يشير إلى نطاق `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

بالإضافة إلى ذلك، يمكنك توسيع مثيل العنصر بمجموعتك الخاصة من الأوامر، من خلال تمرير `true` كوسيط نهائي. النطاق (`this`) في هذه الحالة هو كائن [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` هو قيمة إرجاع $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

تمنحك الأوامر المخصصة الفرصة لتجميع تسلسل محدد من الأوامر التي تستخدمها بشكل متكرر في استدعاء واحد. يمكنك تعريف أوامر مخصصة في أي نقطة في مجموعة الاختبار الخاصة بك؛ فقط تأكد من تعريف الأمر *قبل* استخدامه للمرة الأولى. (يعد خطاف `before` في ملف `wdio.conf.js` مكانًا جيدًا لإنشائها.)

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
console.log(typeof browser.myCustomBrowserCommand) // يخرج "function"
console.log(typeof elem.myCustomBrowserCommand()) // يخرج "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // يخرج "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // يخرج "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // يخرج "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // يخرج "2"
```

__ملاحظة:__ إذا كنت بحاجة إلى تسلسل أمر مخصص، يجب أن ينتهي الأمر بـ `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

كن حذرًا من عدم تحميل نطاق `browser` بالكثير من الأوامر المخصصة.

نوصي بتعريف المنطق المخصص في [كائنات الصفحة](pageobjects)، بحيث تكون مرتبطة بصفحة معينة.

### Multiremote

يعمل `addCommand` بطريقة مماثلة لـ multiremote، باستثناء أن الأمر الجديد سينتشر إلى مثيلات الأطفال. يجب أن تكون حذرًا عند استخدام كائن `this` لأن `browser` متعدد التحكم ومثيلات أطفاله لديهم `this` مختلف.

يوضح هذا المثال كيفية إضافة أمر جديد لـ multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` يشير إلى:
    //      - نطاق MultiRemoteBrowser للمتصفح
    //      - نطاق Browser للمثيلات
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
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

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## توسيع تعريفات النوع

مع TypeScript، من السهل توسيع واجهات WebdriverIO. أضف أنواعًا إلى أوامرك المخصصة كما يلي:

1. قم بإنشاء ملف تعريف النوع (مثال، `./src/types/wdio.d.ts`)
2. أ. إذا كنت تستخدم ملف تعريف نوع على طراز الوحدة (باستخدام import/export و `declare global WebdriverIO` في ملف تعريف النوع)، تأكد من تضمين مسار الملف في خاصية `include` في `tsconfig.json`.

   ب. إذا كنت تستخدم ملفات تعريف نوع على الطراز المحيط (بدون import/export في ملفات تعريف النوع و `declare namespace WebdriverIO` للأوامر المخصصة)، تأكد من أن `tsconfig.json` لا *يحتوي* على أي قسم `include`، لأن هذا سيتسبب في عدم التعرف على جميع ملفات تعريف النوع غير المدرجة في قسم `include` بواسطة typescript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'الوحدات (باستخدام import/export)', value: 'modules'},
    {label: 'تعريفات النوع المحيطة (بدون تضمين tsconfig)', value: 'ambient'},
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
    {label: 'الوحدات (باستخدام import/export)', value: 'modules'},
    {label: 'تعريفات النوع المحيطة', value: 'ambient'},
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
}
```

</TabItem>
</Tabs>

## دمج مكتبات الطرف الثالث

إذا كنت تستخدم مكتبات خارجية (مثل، للقيام باستدعاءات قاعدة البيانات) التي تدعم الوعود، فإن أحد الأساليب الجيدة لدمجها هو تغليف طرق API معينة بأمر مخصص.

عند إرجاع الوعد، يضمن WebdriverIO أنه لا يستمر في الأمر التالي حتى يتم حل الوعد. إذا تم رفض الوعد، سيطرح الأمر خطأً.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

ثم، استخدمه فقط في مواصفات اختبار WDIO الخاصة بك:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // يُرجع نص الاستجابة
})
```

**ملاحظة:** نتيجة أمرك المخصص هي نتيجة الوعد الذي تُرجعه.

## الكتابة فوق الأوامر

يمكنك أيضًا الكتابة فوق الأوامر الأصلية باستخدام `overwriteCommand`.

لا يُنصح بالقيام بذلك، لأنه قد يؤدي إلى سلوك غير متوقع للإطار!

النهج العام مشابه لـ `addCommand`، الفرق الوحيد هو أن الوسيطة الأولى في دالة الأمر هي الدالة الأصلية التي أنت على وشك الكتابة فوقها. يرجى الاطلاع على بعض الأمثلة أدناه.

### الكتابة فوق أوامر المتصفح

```js
/**
 * طباعة الميلي ثانية قبل الإيقاف المؤقت وإرجاع قيمتها.
 */
// 'pause'            - اسم الأمر المراد الكتابة فوقه
// origPauseFunction  - دالة الإيقاف المؤقت الأصلية
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// ثم استخدمه كما كان من قبل
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### الكتابة فوق أوامر العنصر

الكتابة فوق الأوامر على مستوى العنصر هي نفسها تقريبًا. ببساطة قم بتمرير `true` كوسيطة ثالثة إلى `overwriteCommand`:

```js
/**
 * محاولة التمرير إلى العنصر إذا لم يكن قابلاً للنقر.
 * قم بتمرير { force: true } للنقر باستخدام JS حتى إذا لم يكن العنصر مرئيًا أو قابلاً للنقر.
 */
// 'click'            - اسم الأمر المراد الكتابة فوقه
// origClickFunction  - دالة النقر الأصلية
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // محاولة النقر
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // التمرير إلى العنصر والنقر مرة أخرى
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // النقر باستخدام js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // لا تنس تمرير `true` كوسيطة ثالثة

// ثم استخدمه كما كان من قبل
const elem = await $('body')
await elem.click()

// أو تمرير معلمات
await elem.click({ force: true })
```

## إضافة المزيد من أوامر WebDriver

إذا كنت تستخدم بروتوكول WebDriver وتقوم بتشغيل اختبارات على منصة تدعم أوامر إضافية غير محددة بأي من تعريفات البروتوكول في [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) يمكنك إضافتها يدويًا من خلال واجهة `addCommand`. توفر حزمة `webdriver` غلافًا للأوامر يسمح بتسجيل نقاط النهاية الجديدة هذه بنفس طريقة الأوامر الأخرى، مما يوفر نفس فحوصات المعلمات ومعالجة الأخطاء. لتسجيل نقطة النهاية الجديدة هذه، قم باستيراد غلاف الأمر وتسجيل أمر جديد به على النحو التالي:

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

استدعاء هذا الأمر بمعلمات غير صالحة يؤدي إلى نفس معالجة الأخطاء كأوامر البروتوكول المحددة مسبقًا، على سبيل المثال:

```js
// استدعاء الأمر بدون معلمة url مطلوبة والحمولة
await browser.myNewCommand()

/**
 * ينتج عنه الخطأ التالي:
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

استدعاء الأمر بشكل صحيح، مثل `browser.myNewCommand('foo', 'bar')`، يقوم بشكل صحيح بإجراء طلب WebDriver إلى `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` مع حمولة مثل `{ foo: 'bar' }`.

:::note
سيتم استبدال معلمة عنوان URL `:sessionId` تلقائيًا بمعرف الجلسة الخاص بجلسة WebDriver. يمكن تطبيق معلمات عنوان URL الأخرى ولكن يجب تعريفها ضمن `variables`.
:::

انظر أمثلة على كيفية تعريف أوامر البروتوكول في حزمة [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).