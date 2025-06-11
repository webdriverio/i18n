---
id: customcommands
title: أوامر مخصصة
---

إذا كنت ترغب في توسيع كائن `browser` بمجموعة خاصة بك من الأوامر، فإن طريقة المتصفح `addCommand` موجودة هنا لمساعدتك. يمكنك كتابة الأمر الخاص بك بطريقة غير متزامنة، تمامًا كما في مواصفاتك.

## المعلمات

### اسم الأمر

اسم يحدد الأمر وسيتم إرفاقه بنطاق المتصفح أو العنصر.

النوع: `String`

### الدالة المخصصة

دالة يتم تنفيذها عند استدعاء الأمر. نطاق `this` هو إما [`WebdriverIO.Browser`](/docs/api/browser) أو [`WebdriverIO.Element`](/docs/api/element) اعتمادًا على ما إذا كان الأمر مرتبطًا بنطاق المتصفح أو العنصر.

النوع: `Function`

### نطاق الهدف

علامة لتحديد ما إذا كان سيتم إرفاق الأمر بنطاق المتصفح أو العنصر. إذا تم تعيينه على `true`، فسيكون الأمر أمر عنصر.

النوع: `Boolean`<br />
القيمة الافتراضية: `false`

## أمثلة

يوضح هذا المثال كيفية إضافة أمر جديد يقوم بإرجاع عنوان URL الحالي والعنوان كنتيجة واحدة. النطاق (`this`) هو كائن [`WebdriverIO.Browser`](/docs/api/browser).

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

بالإضافة إلى ذلك، يمكنك توسيع نموذج العنصر بمجموعتك الخاصة من الأوامر، عن طريق تمرير `true` كوسيط نهائي. النطاق (`this`) في هذه الحالة هو كائن [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

تمنحك الأوامر المخصصة فرصة لتجميع تسلسل معين من الأوامر التي تستخدمها بشكل متكرر كاستدعاء واحد. يمكنك تعريف أوامر مخصصة في أي نقطة في مجموعة الاختبار الخاصة بك؛ فقط تأكد من تعريف الأمر *قبل* استخدامه لأول مرة. (تعتبر خطاف `before` في ملف `wdio.conf.js` الخاص بك مكانًا جيدًا لإنشائها.)

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

__ملاحظة:__ إذا قمت بتسجيل أمر مخصص لنطاق `browser`، فلن يكون الأمر متاحًا للعناصر. وبالمثل، إذا قمت بتسجيل أمر لنطاق العنصر، فلن يكون متاحًا في نطاق `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__ملاحظة:__ إذا كنت بحاجة إلى ربط أمر مخصص، يجب أن ينتهي الأمر بـ `$`،

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

كن حذرًا من عدم تحميل نطاق `browser` بالكثير من الأوامر المخصصة.

نوصي بتعريف المنطق المخصص في [كائنات الصفحة](pageobjects)، بحيث ترتبط بصفحة معينة.

### متعدد التحكم عن بعد (Multiremote)

يعمل `addCommand` بطريقة مماثلة لـ multiremote، باستثناء أن الأمر الجديد سينتشر إلى نماذج الأبناء. يجب أن تكون حذرًا عند استخدام كائن `this` لأن `browser` متعدد التحكم عن بعد ونماذج أبنائه لديهم `this` مختلفة.

يوضح هذا المثال كيفية إضافة أمر جديد لـ multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

1. قم بإنشاء ملف تعريف النوع (مثل `./src/types/wdio.d.ts`)
2. أ. إذا كنت تستخدم ملف تعريف نوع على نمط الوحدة (باستخدام import/export و `declare global WebdriverIO` في ملف تعريف النوع)، تأكد من تضمين مسار الملف في خاصية `include` في `tsconfig.json`.

   ب. إذا كنت تستخدم ملفات تعريف نوع ذات نمط محيط (بدون import/export في ملفات تعريف النوع و `declare namespace WebdriverIO` للأوامر المخصصة)، تأكد من أن `tsconfig.json` *لا* يحتوي على أي قسم `include`، لأن هذا سيؤدي إلى عدم التعرف على جميع ملفات تعريف النوع غير المدرجة في قسم `include` بواسطة typescript.

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

إذا كنت تستخدم مكتبات خارجية (مثل القيام باستدعاءات قاعدة البيانات) التي تدعم الوعود (promises)، فإن نهجًا جيدًا لدمجها هو تغليف طرق API معينة بأمر مخصص.

عند إرجاع الوعد، يضمن WebdriverIO أنه لن يستمر مع الأمر التالي حتى يتم حل الوعد. إذا تم رفض الوعد، سيطرح الأمر خطأ.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

ثم، استخدمه في مواصفات اختبار WDIO الخاصة بك:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**ملاحظة:** نتيجة الأمر المخصص الخاص بك هي نتيجة الوعد الذي تعيده.

## الكتابة فوق الأوامر

يمكنك أيضًا الكتابة فوق الأوامر الأصلية باستخدام `overwriteCommand`.

لا يُنصح بالقيام بذلك، لأنه قد يؤدي إلى سلوك غير متوقع للإطار!

النهج العام مشابه لـ `addCommand`، الفرق الوحيد هو أن الوسيطة الأولى في دالة الأمر هي الدالة الأصلية التي توشك على الكتابة فوقها. يرجى الاطلاع على بعض الأمثلة أدناه.

### الكتابة فوق أوامر المتصفح

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

### الكتابة فوق أوامر العنصر

الكتابة فوق الأوامر على مستوى العنصر هي نفسها تقريبًا. ببساطة قم بتمرير `true` كوسيطة ثالثة إلى `overwriteCommand`:

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
    true, // don't forget to pass `true` as 3rd argument
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## إضافة المزيد من أوامر WebDriver

إذا كنت تستخدم بروتوكول WebDriver وتقوم بتشغيل اختبارات على منصة تدعم أوامر إضافية غير محددة بواسطة أي من تعريفات البروتوكول في [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) يمكنك إضافتها يدويًا من خلال واجهة `addCommand`. تقدم حزمة `webdriver` غلافًا للأوامر يسمح بتسجيل نقاط النهاية الجديدة هذه بنفس طريقة الأوامر الأخرى، مما يوفر نفس فحوصات المعلمات ومعالجة الأخطاء. لتسجيل نقطة النهاية الجديدة هذه، قم باستيراد غلاف الأمر وتسجيل أمر جديد باستخدامه على النحو التالي:

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

يؤدي استدعاء هذا الأمر بمعلمات غير صالحة إلى نفس معالجة الأخطاء مثل أوامر البروتوكول المحددة مسبقًا، على سبيل المثال:

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

يؤدي استدعاء الأمر بشكل صحيح، مثل `browser.myNewCommand('foo', 'bar')`، إلى إجراء طلب WebDriver بشكل صحيح إلى على سبيل المثال `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` مع حمولة مثل `{ foo: 'bar' }`.

:::note
سيتم استبدال معلمة عنوان URL `:sessionId` تلقائيًا بمعرف جلسة WebDriver. يمكن تطبيق معلمات عنوان URL الأخرى ولكن يجب تعريفها ضمن `variables`.
:::

انظر أمثلة على كيفية تعريف أوامر البروتوكول في حزمة [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).