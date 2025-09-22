---
id: customcommands
title: دستورات سفارشی
---

اگر می‌خواهید نمونه `browser` را با مجموعه‌ای از دستورات خود گسترش دهید، متد `addCommand` مرورگر برای شما در دسترس است. می‌توانید دستور خود را به صورت ناهمگام، درست مانند آنچه در مشخصات انجام می‌دهید، بنویسید.

## پارامترها

### نام دستور

نامی که دستور را تعریف می‌کند و به حوزه مرورگر یا المان متصل می‌شود.

نوع: `String`

### تابع سفارشی

تابعی که هنگام فراخوانی دستور اجرا می‌شود. دامنه `this` یا [`WebdriverIO.Browser`](/docs/api/browser) یا [`WebdriverIO.Element`](/docs/api/element) است، بسته به اینکه دستور به حوزه مرورگر یا المان متصل شده باشد.

نوع: `Function`

### گزینه‌ها

شی حاوی گزینه‌های پیکربندی که رفتار دستور سفارشی را تغییر می‌دهد.

#### حوزه هدف

پرچمی برای تصمیم‌گیری در مورد اینکه آیا دستور به حوزه مرورگر یا المان متصل شود. اگر به `true` تنظیم شود، دستور یک دستور المان خواهد بود.

نام گزینه: `attachToElement`
نوع: `Boolean`<br />
پیش‌فرض: `false`

#### غیرفعال‌سازی implicitWait

پرچمی برای تصمیم‌گیری در مورد اینکه آیا به طور ضمنی منتظر وجود المان قبل از فراخوانی دستور سفارشی باشد.

نام گزینه: `disableElementImplicitWait`
نوع: `Boolean`<br />
پیش‌فرض: `false`

## مثال‌ها

این مثال نشان می‌دهد که چگونه یک دستور جدید اضافه کنیم که URL و عنوان فعلی را به عنوان یک نتیجه برمی‌گرداند. دامنه (`this`) یک شی [`WebdriverIO.Browser`](/docs/api/browser) است.

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

علاوه بر این، می‌توانید نمونه المان را با مجموعه‌ای از دستورات خود گسترش دهید، با ارسال `true` به عنوان آرگومان نهایی. دامنه (`this`) در این حالت یک شی [`WebdriverIO.Element`](/docs/api/element) است.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

به طور پیش‌فرض، دستورات سفارشی المان منتظر می‌مانند تا المان قبل از فراخوانی دستور سفارشی وجود داشته باشد. هرچند بیشتر اوقات این مورد مطلوب است، اما اگر نمی‌خواهید، می‌توانید آن را با `disableImplicitWait` غیرفعال کنید:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


دستورات سفارشی به شما این امکان را می‌دهند تا یک ترتیب خاص از دستوراتی که مکرراً استفاده می‌کنید را به صورت یک فراخوانی واحد بسته‌بندی کنید. می‌توانید دستورات سفارشی را در هر نقطه‌ای از مجموعه تست خود تعریف کنید؛ فقط مطمئن شوید که دستور *قبل* از اولین استفاده آن تعریف شده است. (هوک `before` در `wdio.conf.js` شما یک مکان خوب برای ایجاد آنهاست.)

پس از تعریف، می‌توانید از آنها به شرح زیر استفاده کنید:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__نکته:__ اگر یک دستور سفارشی را در حوزه `browser` ثبت کنید، آن دستور برای المان‌ها قابل دسترسی نخواهد بود. به همین ترتیب، اگر دستوری را در حوزه المان ثبت کنید، در حوزه `browser` قابل دسترسی نخواهد بود:

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

__نکته:__ اگر نیاز دارید یک دستور سفارشی را زنجیر کنید، دستور باید با `$` پایان یابد.

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

مراقب باشید که حوزه `browser` را با دستورات سفارشی زیادی بیش از حد بارگذاری نکنید.

ما توصیه می‌کنیم منطق سفارشی را در [اشیاء صفحه](pageobjects) تعریف کنید، تا به یک صفحه خاص متصل باشند.

### چند راه دور (Multiremote)

`addCommand` به روشی مشابه برای چند راه دور کار می‌کند، به جز اینکه دستور جدید به نمونه‌های فرزند منتقل می‌شود. شما باید هنگام استفاده از شی `this` مراقب باشید زیرا `browser` چند راه دور و نمونه‌های فرزند آن `this` متفاوتی دارند.

این مثال نشان می‌دهد که چگونه یک دستور جدید برای چند راه دور اضافه کنیم.

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

## گسترش تعاریف نوع

با TypeScript، به راحتی می‌توانید رابط‌های WebdriverIO را گسترش دهید. انواع را به دستورات سفارشی خود به این صورت اضافه کنید:

1. یک فایل تعریف نوع ایجاد کنید (به عنوان مثال، `./src/types/wdio.d.ts`)
2. الف. اگر از فایل تعریف نوع به سبک ماژول استفاده می‌کنید (با استفاده از import/export و `declare global WebdriverIO` در فایل تعریف نوع)، مطمئن شوید که مسیر فایل را در ویژگی `include` در `tsconfig.json` قرار داده‌اید.

   ب. اگر از فایل‌های تعریف نوع محیطی استفاده می‌کنید (بدون import/export در فایل‌های تعریف نوع و `declare namespace WebdriverIO` برای دستورات سفارشی)، مطمئن شوید که `tsconfig.json` *هیچ* بخش `include` ندارد، زیرا این امر باعث می‌شود همه فایل‌های تعریف نوع که در بخش `include` فهرست نشده‌اند، توسط TypeScript شناسایی نشوند.

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

3. تعاریف را برای دستورات خود بر اساس حالت اجرا اضافه کنید.

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

## یکپارچه‌سازی کتابخانه‌های شخص ثالث

اگر از کتابخانه‌های خارجی (به عنوان مثال، برای انجام تماس‌های پایگاه داده) که از پرومیس‌ها پشتیبانی می‌کنند استفاده می‌کنید، یک روش خوب برای یکپارچه‌سازی آنها این است که روش‌های API خاصی را با یک دستور سفارشی پوشش دهید.

هنگام بازگرداندن پرومیس، WebdriverIO اطمینان حاصل می‌کند که تا زمانی که پرومیس حل نشده، به دستور بعدی نمی‌رود. اگر پرومیس رد شود، دستور یک خطا پرتاب خواهد کرد.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

سپس، فقط از آن در مشخصات تست WDIO خود استفاده کنید:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**نکته:** نتیجه دستور سفارشی شما، نتیجه پرومیسی است که برمی‌گردانید.

## بازنویسی دستورات

شما همچنین می‌توانید دستورات اصلی را با `overwriteCommand` بازنویسی کنید.

توصیه نمی‌شود این کار را انجام دهید، زیرا ممکن است منجر به رفتار غیرقابل پیش‌بینی فریم‌ورک شود!

رویکرد کلی مشابه `addCommand` است، تنها تفاوت این است که اولین آرگومان در تابع دستور، تابع اصلی است که قصد بازنویسی آن را دارید. لطفاً مثال‌های زیر را ببینید.

### بازنویسی دستورات مرورگر

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

### بازنویسی دستورات المان

بازنویسی دستورات در سطح المان تقریباً مشابه است. به سادگی `true` را به عنوان آرگومان سوم به `overwriteCommand` ارسال کنید:

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

## افزودن دستورات WebDriver بیشتر

اگر از پروتکل WebDriver استفاده می‌کنید و تست‌ها را روی پلتفرمی اجرا می‌کنید که از دستورات اضافی پشتیبانی می‌کند که توسط هیچ یک از تعاریف پروتکل در [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) تعریف نشده‌اند، می‌توانید آنها را به صورت دستی از طریق رابط `addCommand` اضافه کنید. بسته `webdriver` یک پوشش دستور ارائه می‌دهد که اجازه می‌دهد این نقاط پایانی جدید را به همان روش سایر دستورات ثبت کنید و همان بررسی پارامتر و مدیریت خطا را ارائه دهید. برای ثبت این نقطه پایانی جدید، پوشش دستور را وارد کنید و یک دستور جدید با آن به شرح زیر ثبت کنید:

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

فراخوانی این دستور با پارامترهای نامعتبر منجر به همان مدیریت خطا مانند دستورات پروتکل از پیش تعریف شده می‌شود، به عنوان مثال:

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

فراخوانی صحیح دستور، به عنوان مثال `browser.myNewCommand('foo', 'bar')` به درستی یک درخواست WebDriver به عنوان مثال به `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` با محتوایی مانند `{ foo: 'bar' }` ارسال می‌کند.

:::note
پارامتر url `:sessionId` به طور خودکار با شناسه جلسه جلسه WebDriver جایگزین می‌شود. سایر پارامترهای url را می‌توان اعمال کرد اما باید در `variables` تعریف شوند.
:::

نمونه‌هایی از نحوه تعریف دستورات پروتکل را در بسته [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) ببینید.