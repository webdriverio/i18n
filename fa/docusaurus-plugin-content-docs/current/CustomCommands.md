---
id: customcommands
title: دستورات سفارشی
---

اگر می‌خواهید نمونه `browser` را با مجموعه‌ای از دستورات خود گسترش دهید، متد مرورگر `addCommand` برای شما در دسترس است. شما می‌توانید دستور خود را به صورت ناهمزمان (asynchronous) بنویسید، درست مانند مشخصات خود.

## پارامترها

### نام دستور

نامی که دستور را تعریف می‌کند و به محدوده مرورگر یا عنصر متصل می‌شود.

نوع: `String`

### تابع سفارشی

تابعی که هنگام فراخوانی دستور اجرا می‌شود. محدوده `this` یا [`WebdriverIO.Browser`](/docs/api/browser) یا [`WebdriverIO.Element`](/docs/api/element) است که بسته به اینکه دستور به محدوده مرورگر یا عنصر متصل می‌شود، متفاوت است.

نوع: `Function`

### محدوده هدف

پرچمی برای تصمیم‌گیری در مورد اتصال دستور به محدوده مرورگر یا عنصر. اگر `true` تنظیم شود، دستور یک دستور عنصر خواهد بود.

نوع: `Boolean`<br />
پیش‌فرض: `false`

## نمونه‌ها

این مثال نشان می‌دهد که چگونه دستور جدیدی را اضافه کنید که URL و عنوان فعلی را به عنوان یک نتیجه برمی‌گرداند. محدوده (`this`) یک شی [`WebdriverIO.Browser`](/docs/api/browser) است.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` به محدوده `browser` اشاره دارد
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

علاوه بر این، می‌توانید نمونه عنصر را با مجموعه‌ای از دستورات خود گسترش دهید، با ارسال `true` به عنوان آرگومان نهایی. محدوده (`this`) در این حالت یک شی [`WebdriverIO.Element`](/docs/api/element) است.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` مقدار بازگشتی $(selector) است
    await this.waitForDisplayed()
    await this.click()
}, true)
```

دستورات سفارشی به شما این امکان را می‌دهد که یک توالی خاص از دستوراتی که به طور مکرر استفاده می‌کنید را به عنوان یک فراخوانی واحد بسته‌بندی کنید. شما می‌توانید دستورات سفارشی را در هر نقطه از مجموعه تست خود تعریف کنید؛ فقط مطمئن شوید که دستور *قبل* از اولین استفاده آن تعریف شده باشد. (قلاب `before` در `wdio.conf.js` شما یک مکان خوب برای ایجاد آنهاست.)

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

__نکته:__ اگر یک دستور سفارشی را در محدوده `browser` ثبت کنید، دستور برای عناصر قابل دسترسی نخواهد بود. به همین ترتیب، اگر دستوری را در محدوده عنصر ثبت کنید، در محدوده `browser` قابل دسترسی نخواهد بود:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // خروجی "function"
console.log(typeof elem.myCustomBrowserCommand()) // خروجی "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // خروجی "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // خروجی "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // خروجی "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // خروجی "2"
```

__نکته:__ اگر نیاز به زنجیره کردن یک دستور سفارشی دارید، دستور باید با `$` پایان یابد،

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

مراقب باشید که محدوده `browser` را با دستورات سفارشی زیاد بیش از حد بارگذاری نکنید.

ما توصیه می‌کنیم منطق سفارشی را در [اشیاء صفحه](pageobjects) تعریف کنید، بنابراین آنها به یک صفحه خاص متصل می‌شوند.

### چندراه دور (Multiremote)

`addCommand` به روشی مشابه برای چندراه دور کار می‌کند، به جز اینکه دستور جدید به نمونه‌های فرزند منتقل می‌شود. هنگام استفاده از شی `this` باید مراقب باشید زیرا مرورگر چندراه دور `browser` و نمونه‌های فرزند آن دارای `this` متفاوتی هستند.

این مثال نشان می‌دهد که چگونه یک دستور جدید برای چندراه دور اضافه کنید.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` اشاره دارد به:
    //      - محدوده MultiRemoteBrowser برای مرورگر
    //      - محدوده Browser برای نمونه‌ها
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

با TypeScript، گسترش رابط‌های WebdriverIO آسان است. انواع را به دستورات سفارشی خود به این شکل اضافه کنید:

1. یک فایل تعریف نوع ایجاد کنید (به عنوان مثال، `./src/types/wdio.d.ts`)
2. الف. اگر از فایل تعریف نوع به سبک ماژول استفاده می‌کنید (با استفاده از import/export و `declare global WebdriverIO` در فایل تعریف نوع)، مطمئن شوید که مسیر فایل را در ویژگی `include` در `tsconfig.json` قرار دهید.

   ب. اگر از فایل‌های تعریف نوع محیطی استفاده می‌کنید (بدون import/export در فایل‌های تعریف نوع و `declare namespace WebdriverIO` برای دستورات سفارشی)، مطمئن شوید که `tsconfig.json` شامل هیچ بخش `include` نیست، زیرا این باعث می‌شود تمام فایل‌های تعریف نوع که در بخش `include` فهرست نشده‌اند توسط typescript شناسایی نشوند.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'ماژول‌ها (با استفاده از import/export)', value: 'modules'},
    {label: 'تعاریف نوع محیطی (بدون include در tsconfig)', value: 'ambient'},
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

3. تعاریف را برای دستورات خود مطابق با حالت اجرای خود اضافه کنید.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'ماژول‌ها (با استفاده از import/export)', value: 'modules'},
    {label: 'تعاریف نوع محیطی', value: 'ambient'},
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

## ادغام کتابخانه‌های شخص ثالث

اگر از کتابخانه‌های خارجی استفاده می‌کنید (به عنوان مثال، برای انجام تماس‌های پایگاه داده) که از promise پشتیبانی می‌کنند، یک روش مناسب برای ادغام آنها این است که متدهای API خاصی را با یک دستور سفارشی پوشش دهید.

هنگام بازگرداندن promise، WebdriverIO اطمینان حاصل می‌کند که تا زمانی که promise حل نشود، با دستور بعدی ادامه نمی‌دهد. اگر promise رد شود، دستور خطایی را نمایش می‌دهد.

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
    console.log(body) // بدنه پاسخ را برمی‌گرداند
})
```

**نکته:** نتیجه دستور سفارشی شما نتیجه promise ای است که شما برمی‌گردانید.

## بازنویسی دستورات

شما همچنین می‌توانید دستورات اصلی را با `overwriteCommand` بازنویسی کنید.

توصیه نمی‌شود این کار را انجام دهید، زیرا ممکن است منجر به رفتار غیرقابل پیش‌بینی چارچوب شود!

رویکرد کلی مشابه `addCommand` است، تنها تفاوت این است که اولین آرگومان در تابع دستور، تابع اصلی است که قصد بازنویسی آن را دارید. لطفاً نمونه‌های زیر را ببینید.

### بازنویسی دستورات مرورگر

```js
/**
 * چاپ میلی‌ثانیه‌ها قبل از مکث و بازگرداندن مقدار آن.
 * 
 * @param pause - نام دستوری که باید بازنویسی شود
 * @param this of func - نمونه اصلی مرورگر که تابع روی آن فراخوانی شد
 * @param originalPauseFunction of func - تابع مکث اصلی
 * @param ms of func - پارامترهای واقعی ارسال شده
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// سپس مانند قبل از آن استفاده کنید
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### بازنویسی دستورات عنصر

بازنویسی دستورات در سطح عنصر تقریباً یکسان است. به سادگی `true` را به عنوان آرگومان سوم به `overwriteCommand` ارسال کنید:

```js
/**
 * تلاش برای اسکرول به عنصر اگر قابل کلیک نیست.
 * { force: true } را ارسال کنید تا با JS کلیک کنید حتی اگر عنصر قابل مشاهده یا کلیک نباشد.
 * نشان می‌دهد که نوع آرگومان تابع اصلی را می‌توان با `options?: ClickOptions` حفظ کرد
 *
 * @param this of func - عنصری که تابع اصلی روی آن فراخوانی شده است
 * @param originalClickFunction of func - تابع مکث اصلی
 * @param options of func - پارامترهای واقعی ارسال شده
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // تلاش برای کلیک
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // اسکرول به عنصر و کلیک مجدد
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // کلیک با جاوااسکریپت
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    true, // فراموش نکنید که `true` را به عنوان آرگومان سوم ارسال کنید
)

// سپس مانند قبل از آن استفاده کنید
const elem = await $('body')
await elem.click()

// یا پارامترها را ارسال کنید
await elem.click({ force: true })
```

## افزودن دستورات WebDriver بیشتر

اگر از پروتکل WebDriver استفاده می‌کنید و تست‌ها را روی پلتفرمی اجرا می‌کنید که از دستورات اضافی پشتیبانی می‌کند که توسط هیچ یک از تعاریف پروتکل در [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) تعریف نشده‌اند، می‌توانید آنها را به صورت دستی از طریق رابط `addCommand` اضافه کنید. بسته `webdriver` یک wrapper دستور را ارائه می‌دهد که به شما امکان می‌دهد این نقاط پایانی جدید را به همان روش سایر دستورات ثبت کنید و همان بررسی‌های پارامتر و مدیریت خطا را ارائه دهید. برای ثبت این نقطه پایانی جدید، wrapper دستور را وارد کنید و یک دستور جدید با آن به شرح زیر ثبت کنید:

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

فراخوانی این دستور با پارامترهای نامعتبر منجر به همان مدیریت خطا به عنوان دستورات پروتکل از پیش تعریف شده می‌شود، به عنوان مثال:

```js
// فراخوانی دستور بدون پارامتر url مورد نیاز و payload
await browser.myNewCommand()

/**
 * منجر به خطای زیر می‌شود:
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

فراخوانی صحیح دستور، به عنوان مثال `browser.myNewCommand('foo', 'bar')` به درستی یک درخواست WebDriver به عنوان مثال `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` با payload مانند `{ foo: 'bar' }` ایجاد می‌کند.

:::note
پارامتر url با `:sessionId` به طور خودکار با شناسه جلسه جلسه WebDriver جایگزین می‌شود. پارامترهای url دیگر را می‌توان اعمال کرد اما باید در `variables` تعریف شوند.
:::

نمونه‌هایی از نحوه تعریف دستورات پروتکل را می‌توانید در بسته [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) مشاهده کنید.