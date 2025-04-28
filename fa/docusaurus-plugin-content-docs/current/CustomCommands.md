---
id: customcommands
title: دستورات سفارشی
---

اگر می‌خواهید نمونه `browser` را با مجموعه‌ای از دستورات خود گسترش دهید، متد مرورگر `addCommand` برای شما فراهم شده است. شما می‌توانید دستور خود را به صورت غیرهمزمان (asynchronous) بنویسید، درست مانند مشخصات آزمون.

## پارامترها

### نام دستور

نامی که دستور را تعریف می‌کند و به دامنه مرورگر یا عنصر متصل می‌شود.

نوع: `String`

### تابع سفارشی

تابعی که هنگام فراخوانی دستور اجرا می‌شود. دامنه `this` یا [`WebdriverIO.Browser`](/docs/api/browser) یا [`WebdriverIO.Element`](/docs/api/element) است، بسته به اینکه دستور به دامنه مرورگر یا عنصر متصل شود.

نوع: `Function`

### دامنه هدف

پرچمی برای تصمیم‌گیری در مورد اتصال دستور به دامنه مرورگر یا عنصر. اگر روی `true` تنظیم شود، دستور یک دستور عنصر خواهد بود.

نوع: `Boolean`<br />
پیش‌فرض: `false`

## مثال‌ها

این مثال نشان می‌دهد که چگونه یک دستور جدید اضافه کنید که URL و عنوان فعلی را به عنوان یک نتیجه برگرداند. دامنه (`this`) یک شیء [`WebdriverIO.Browser`](/docs/api/browser) است.

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

علاوه بر این، می‌توانید نمونه عنصر را با مجموعه دستورات خود گسترش دهید، با ارسال `true` به عنوان آرگومان نهایی. دامنه (`this`) در این حالت یک شیء [`WebdriverIO.Element`](/docs/api/element) است.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

دستورات سفارشی به شما این امکان را می‌دهند که یک توالی خاص از دستورات را که اغلب استفاده می‌کنید، به عنوان یک فراخوانی واحد ارائه دهید. می‌توانید دستورات سفارشی را در هر نقطه از مجموعه آزمون خود تعریف کنید؛ فقط مطمئن شوید که دستور *قبل* از اولین استفاده آن تعریف شده است. (Hook پیش از هر آزمون در `wdio.conf.js` شما یک مکان مناسب برای ایجاد آنهاست.)

پس از تعریف، می‌توانید آنها را به شرح زیر استفاده کنید:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__توجه:__ اگر یک دستور سفارشی را در دامنه `browser` ثبت کنید، دستور برای عناصر قابل دسترسی نخواهد بود. به همین ترتیب، اگر دستوری را در دامنه عنصر ثبت کنید، در دامنه `browser` قابل دسترسی نخواهد بود:

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

__توجه:__ اگر نیاز به زنجیره کردن یک دستور سفارشی دارید، دستور باید با `$` پایان یابد،

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

مراقب باشید که دامنه `browser` را با دستورات سفارشی بیش از حد بارگذاری نکنید.

ما پیشنهاد می‌کنیم منطق سفارشی را در [page objects](pageobjects) تعریف کنید، تا به یک صفحه خاص متصل شوند.

### چند راه دور (Multiremote)

`addCommand` به روشی مشابه برای چند راه دور کار می‌کند، با این تفاوت که دستور جدید به نمونه‌های فرزند منتقل می‌شود. هنگام استفاده از شیء `this` باید هوشیار باشید زیرا مرورگر چند راه دور `browser` و نمونه‌های فرزند آن `this` متفاوتی دارند.

این مثال نشان می‌دهد چگونه یک دستور جدید برای چند راه دور اضافه کنید.

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

با TypeScript، گسترش رابط‌های WebdriverIO آسان است. نوع‌ها را به دستورات سفارشی خود به این صورت اضافه کنید:

1. یک فایل تعریف نوع ایجاد کنید (به عنوان مثال، `./src/types/wdio.d.ts`)
2. الف. اگر از فایل تعریف نوع به سبک ماژول استفاده می‌کنید (با استفاده از import/export و `declare global WebdriverIO` در فایل تعریف نوع)، مطمئن شوید که مسیر فایل را در خاصیت `include` در `tsconfig.json` قرار داده‌اید.

   ب. اگر از فایل‌های تعریف نوع به سبک فراگیر استفاده می‌کنید (بدون import/export در فایل‌های تعریف نوع و با `declare namespace WebdriverIO` برای دستورات سفارشی)، مطمئن شوید که `tsconfig.json` *هیچ* بخش `include` ندارد، زیرا این باعث می‌شود تمامی فایل‌های تعریف نوع که در بخش `include` ذکر نشده‌اند توسط typescript شناخته نشوند.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'ماژول‌ها (با استفاده از import/export)', value: 'modules'},
    {label: 'تعاریف نوع فراگیر (بدون include در tsconfig)', value: 'ambient'},
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

3. تعاریف را برای دستورات خود بر اساس حالت اجرای خود اضافه کنید.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'ماژول‌ها (با استفاده از import/export)', value: 'modules'},
    {label: 'تعاریف نوع فراگیر', value: 'ambient'},
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

اگر از کتابخانه‌های خارجی (به عنوان مثال، برای انجام فراخوانی‌های پایگاه داده) که از promise پشتیبانی می‌کنند استفاده می‌کنید، یک روش خوب برای یکپارچه‌سازی آنها، پوشاندن روش‌های API خاص با یک دستور سفارشی است.

هنگام بازگرداندن promise، WebdriverIO اطمینان حاصل می‌کند که تا زمانی که promise حل نشود، با دستور بعدی ادامه نمی‌دهد. اگر promise رد شود، دستور خطا خواهد داد.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

سپس، فقط از آن در مشخصات آزمون WDIO خود استفاده کنید:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**توجه:** نتیجه دستور سفارشی شما، نتیجه promise‌ای است که برمی‌گردانید.

## بازنویسی دستورات

شما همچنین می‌توانید دستورات اصلی را با `overwriteCommand` بازنویسی کنید.

توصیه نمی‌شود این کار را انجام دهید، زیرا ممکن است منجر به رفتار غیرقابل پیش‌بینی چارچوب شود!

رویکرد کلی مشابه `addCommand` است، تنها تفاوت این است که اولین آرگومان در تابع دستور، تابع اصلی است که قصد بازنویسی آن را دارید. لطفاً به برخی مثال‌های زیر توجه کنید.

### بازنویسی دستورات مرورگر

```js
/**
 * print milliseconds before pause and return its value.
 */
// 'pause'            - name of command to be overwritten
// origPauseFunction  - original pause function
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### بازنویسی دستورات عنصر

بازنویسی دستورات در سطح عنصر تقریباً یکسان است. به سادگی `true` را به عنوان آرگومان سوم به `overwriteCommand` ارسال کنید:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 */
// 'click'            - name of command to be overwritten
// origClickFunction  - original click function
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // attempt to click
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // scroll to element and click again
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // clicking with js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // don't forget to pass `true` as 3rd argument

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## افزودن دستورات WebDriver بیشتر

اگر از پروتکل WebDriver استفاده می‌کنید و آزمون‌ها را روی پلتفرمی اجرا می‌کنید که از دستورات اضافی پشتیبانی می‌کند که توسط هیچ یک از تعاریف پروتکل در [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) تعریف نشده‌اند، می‌توانید به صورت دستی آن‌ها را از طریق رابط `addCommand` اضافه کنید. بسته `webdriver` یک wrapper دستور ارائه می‌دهد که به شما امکان می‌دهد این نقاط پایانی جدید را به همان روش دستورات دیگر ثبت کنید و همان بررسی‌های پارامتر و مدیریت خطا را فراهم می‌کند. برای ثبت این نقطه پایانی جدید، command wrapper را وارد کنید و یک دستور جدید با آن به شرح زیر ثبت کنید:

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

فراخوانی این دستور با پارامترهای نامعتبر منجر به همان مدیریت خطایی می‌شود که دستورات پروتکل از پیش تعریف شده دارند، به عنوان مثال:

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

فراخوانی صحیح دستور، مثلاً `browser.myNewCommand('foo', 'bar')`, به درستی یک درخواست WebDriver به عنوان مثال `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` با محتوایی مانند `{ foo: 'bar' }` انجام می‌دهد.

:::note
پارامتر url `:sessionId` به طور خودکار با شناسه جلسه WebDriver جایگزین می‌شود. سایر پارامترهای url را می‌توان اعمال کرد، اما باید در `variables` تعریف شوند.
:::

نمونه‌هایی از نحوه تعریف دستورات پروتکل را در بسته [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) ببینید.