---
id: customcommands
title: دستورات سفارشی
description: "دستورات سفارشی خود را برای مرورگر و عناصر با addCommand اضافه کنید، دستورات موجود را بازنویسی کنید و تعاریف نوع TypeScript را گسترش دهید."
---

اگر می‌خواهید نمونهٔ `browser` را با مجموعه‌ای از دستورات خودتان گسترش دهید، متد `addCommand` مرورگر در اختیار شماست. می‌توانید دستور خود را به‌صورت ناهمگام (asynchronous) بنویسید، درست همان‌طور که در specهای خود می‌نویسید.

## پارامترها

### نام دستور

<Option type="String">

نامی که دستور را تعریف می‌کند و به حوزهٔ (scope) مرورگر یا عنصر متصل خواهد شد.

</Option>

### تابع سفارشی

<Option type="Function">

تابعی که هنگام فراخوانی دستور اجرا می‌شود. حوزهٔ `this` بسته به اینکه دستور به مرورگر، عناصر یا زمینه‌های مرور (browsing contexts) متصل شود، [`WebdriverIO.Browser`](/docs/api/browser)، [`WebdriverIO.Element`](/docs/api/element) یا `WebdriverIO.BrowsingContext` است.

</Option>

### گزینه‌ها

شیئی با گزینه‌های پیکربندی که رفتار دستور سفارشی را تغییر می‌دهد

#### حوزهٔ هدف

<Option type="Boolean" default="false" name="attachToElement">

پرچمی برای تعیین اینکه دستور به حوزهٔ مرورگر متصل شود یا به حوزهٔ عنصر. اگر روی `true` تنظیم شود، دستور یک دستور عنصر خواهد بود.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

پرچمی برای متصل کردن دستور به هر زمینهٔ مرور: تب‌ها، پنجره‌ها و فریم‌هایی که `browser.url()`، `browser.newWindow()`، `browser.browsingContexts()` و `context.frame()` در یک نشست WebDriver BiDi برمی‌گردانند. این گزینه را نمی‌توان با `attachToElement` ترکیب کرد. به [زمینه‌های مرور](#browsing-contexts) مراجعه کنید.

</Option>

#### غیرفعال کردن implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

پرچمی برای تعیین اینکه آیا پیش از فراخوانی دستور سفارشی، به‌طور ضمنی منتظر وجود عنصر بماند یا نه.

</Option>

## مثال‌ها

این مثال نشان می‌دهد چگونه یک دستور جدید اضافه کنید که URL و عنوان فعلی را به‌عنوان یک نتیجه برمی‌گرداند. حوزه (`this`) یک شیء [`WebdriverIO.Browser`](/docs/api/browser) است.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` به حوزهٔ `browser` اشاره دارد
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

علاوه بر این، می‌توانید با تنظیم `attachToElement` روی `true`، نمونهٔ عنصر را با مجموعه‌ای از دستورات خودتان گسترش دهید. در این حالت حوزه (`this`) یک شیء [`WebdriverIO.Element`](/docs/api/element) است.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` مقدار بازگشتی $(selector) است
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

به‌طور پیش‌فرض، دستورات سفارشی عنصر پیش از فراخوانی دستور سفارشی منتظر وجود عنصر می‌مانند. هرچند در بیشتر مواقع این رفتار مطلوب است، اما در غیر این صورت می‌توان آن را با `disableImplicitWait` غیرفعال کرد:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` مقدار بازگشتی $(selector) است
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

دستورات سفارشی به شما این امکان را می‌دهند که توالی مشخصی از دستوراتی را که به‌طور مکرر استفاده می‌کنید، به‌صورت یک فراخوانی واحد بسته‌بندی کنید. می‌توانید دستورات سفارشی را در هر نقطه‌ای از مجموعهٔ تست خود تعریف کنید؛ فقط مطمئن شوید که دستور *پیش از* اولین استفاده تعریف شده باشد. (هوک `before` در فایل `wdio.conf.js` یکی از مکان‌های مناسب برای ایجاد آن‌هاست.)

پس از تعریف، می‌توانید به شکل زیر از آن‌ها استفاده کنید:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__توجه:__ اگر یک دستور سفارشی را در حوزهٔ `browser` ثبت کنید، آن دستور برای عناصر در دسترس نخواهد بود. به همین ترتیب، اگر دستوری را در حوزهٔ عنصر ثبت کنید، در حوزهٔ `browser` در دسترس نخواهد بود:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // خروجی: "function"
console.log(typeof elem.myCustomBrowserCommand()) // خروجی: "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // خروجی: "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // خروجی: "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // خروجی: "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // خروجی: "2"
```

__توجه:__ اگر نیاز دارید یک دستور سفارشی را زنجیره‌ای کنید، نام دستور باید با `$` پایان یابد،

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

مراقب باشید حوزهٔ `browser` را با دستورات سفارشی بیش از حد سربار نکنید.

توصیه می‌کنیم منطق سفارشی را در [page objectها](pageobjects) تعریف کنید تا به یک صفحهٔ مشخص وابسته باشند.

### زمینه‌های مرور {#browsing-contexts}

در یک نشست WebDriver BiDi، هر تب، پنجره و فریم یک `WebdriverIO.BrowsingContext` است. برای افزودن یک دستور به همهٔ آن‌ها، `attachToBrowsingContext` را روی `true` تنظیم کنید. حوزه (`this`) زمینه‌ای است که دستور روی آن فراخوانی شده و `this.browser` مرورگری است که آن زمینه به آن تعلق دارد:

```js
browser.addCommand('heading', async function () {
    // `this` همان تب، پنجره یا فریم است
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

این دستور روی زمینه‌هایی که از قبل وجود دارند و روی هر زمینه‌ای که بعداً ایجاد شود، از جمله فریم‌هایی از یک origin دیگر، در دسترس است. دستوری که فقط برای یک تب یا پنجره معنا دارد می‌تواند `this.isFrame` را بررسی کند.

فراخوانی `addCommand` و `overwriteCommand` روی خود یک زمینهٔ مرور خطا ایجاد می‌کند. دستور را روی مرورگر ثبت کنید.

### Multi-remote

`addCommand` در حالت multi-remote نیز به شکل مشابهی کار می‌کند، با این تفاوت که دستور جدید به نمونه‌های فرزند نیز منتقل می‌شود. هنگام استفاده از شیء `this` باید دقت کنید، زیرا `browser` در حالت multi-remote و نمونه‌های فرزند آن `this` متفاوتی دارند.

این مثال نشان می‌دهد چگونه یک دستور جدید برای multi-remote اضافه کنید.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` اشاره دارد به:
    //      - حوزهٔ MultiRemoteBrowser برای browser
    //      - حوزهٔ Browser برای نمونه‌ها
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

## گسترش تعاریف نوع

با TypeScript، گسترش اینترفیس‌های WebdriverIO آسان است. انواع (types) را به این شکل به دستورات سفارشی خود اضافه کنید:

1. یک فایل تعریف نوع ایجاد کنید (مثلاً `./src/types/wdio.d.ts`)
2. a. اگر از فایل تعریف نوع به سبک ماژول استفاده می‌کنید (استفاده از import/export و `declare global WebdriverIO` در فایل تعریف نوع)، مطمئن شوید که مسیر فایل را در ویژگی `include` فایل `tsconfig.json` قرار داده‌اید.

   b. اگر از فایل‌های تعریف نوع به سبک ambient استفاده می‌کنید (بدون import/export در فایل‌های تعریف نوع و با `declare namespace WebdriverIO` برای دستورات سفارشی)، مطمئن شوید که `tsconfig.json` هیچ بخش `include` *ندارد*، زیرا این باعث می‌شود همهٔ فایل‌های تعریف نوعی که در بخش `include` فهرست نشده‌اند توسط TypeScript شناسایی نشوند.

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

3. تعاریف دستورات خود را مطابق با حالت اجرای خود اضافه کنید.

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

## یکپارچه‌سازی کتابخانه‌های شخص ثالث

اگر از کتابخانه‌های خارجی (مثلاً برای فراخوانی‌های پایگاه داده) استفاده می‌کنید که از promiseها پشتیبانی می‌کنند، یک رویکرد خوب برای یکپارچه‌سازی آن‌ها این است که برخی متدهای API را درون یک دستور سفارشی قرار دهید.

هنگام بازگرداندن promise، WebdriverIO اطمینان حاصل می‌کند که تا زمان resolve شدن promise به دستور بعدی نمی‌رود. اگر promise رد (reject) شود، دستور یک خطا پرتاب می‌کند.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

سپس، کافی است از آن در specهای تست WDIO خود استفاده کنید:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // بدنهٔ پاسخ را برمی‌گرداند
})
```

**توجه:** نتیجهٔ دستور سفارشی شما، نتیجهٔ promise‌ای است که برمی‌گردانید.

## بازنویسی دستورات

همچنین می‌توانید دستورات بومی را با `overwriteCommand` بازنویسی کنید.

انجام این کار توصیه نمی‌شود، زیرا ممکن است به رفتار غیرقابل پیش‌بینی فریم‌ورک منجر شود!

رویکرد کلی مشابه `addCommand` است، تنها تفاوت این است که اولین آرگومان در تابع دستور، تابع اصلی‌ای است که قصد بازنویسی آن را دارید. لطفاً چند مثال را در ادامه ببینید.

### بازنویسی دستورات مرورگر

```js
/**
 * چاپ میلی‌ثانیه‌ها پیش از توقف و بازگرداندن مقدار آن.
 *
 * @param pause - نام دستوری که باید بازنویسی شود
 * @param this of func - نمونهٔ اصلی مرورگر که تابع روی آن فراخوانی شده است
 * @param originalPauseFunction of func - تابع اصلی pause
 * @param ms of func - پارامترهای واقعی ارسال‌شده
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

بازنویسی دستورات در سطح عنصر تقریباً یکسان است. `attachToElement` را روی `true` تنظیم کنید:

```js
/**
 * اگر عنصر قابل کلیک نیست، تلاش برای اسکرول به سمت آن.
 * برای کلیک با JS حتی اگر عنصر قابل مشاهده یا قابل کلیک نباشد، { force: true } را ارسال کنید.
 * نشان می‌دهد که نوع آرگومان تابع اصلی را می‌توان با `options?: ClickOptions` حفظ کرد
 *
 * @param this of func - عنصری که تابع اصلی روی آن فراخوانی شده است
 * @param originalClickFunction of func - تابع اصلی pause
 * @param options of func - پارامترهای واقعی ارسال‌شده
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

        // کلیک با js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // فراموش نکنید آن را به عنصر متصل کنید
)

// سپس مانند قبل از آن استفاده کنید
const elem = await $('body')
await elem.click()

// یا پارامترها را ارسال کنید
await elem.click({ force: true })
```

### بازنویسی دستورات زمینهٔ مرور

برای بازنویسی یک دستور داخلی یا سفارشی در هر تب، پنجره و فریم، `attachToBrowsingContext` را روی `true` تنظیم کنید. دستور اصلی به زمینه‌ای که روی آن فراخوانی شده متصل (bind) می‌شود:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## افزودن دستورات WebDriver بیشتر

اگر از پروتکل WebDriver استفاده می‌کنید و تست‌ها را روی پلتفرمی اجرا می‌کنید که از دستورات اضافه‌ای پشتیبانی می‌کند که در هیچ‌یک از تعاریف پروتکل در [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) تعریف نشده‌اند، می‌توانید آن‌ها را به‌صورت دستی از طریق اینترفیس `addCommand` اضافه کنید. بستهٔ `webdriver` یک wrapper دستور ارائه می‌دهد که امکان ثبت این endpointهای جدید را به همان روش سایر دستورات فراهم می‌کند و همان بررسی‌های پارامتر و مدیریت خطا را ارائه می‌دهد. برای ثبت این endpoint جدید، wrapper دستور را import کرده و یک دستور جدید را به شکل زیر با آن ثبت کنید:

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

فراخوانی این دستور با پارامترهای نامعتبر منجر به همان مدیریت خطای دستورات پروتکل از پیش تعریف‌شده می‌شود، برای مثال:

```js
// فراخوانی دستور بدون پارامتر url الزامی و payload
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

فراخوانی صحیح دستور، مثلاً `browser.myNewCommand('foo', 'bar')`، به‌درستی یک درخواست WebDriver به آدرسی مانند `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` با payloadی مانند `{ foo: 'bar' }` ارسال می‌کند.

:::note
پارامتر url با نام `:sessionId` به‌طور خودکار با شناسهٔ نشست WebDriver جایگزین می‌شود. سایر پارامترهای url را نیز می‌توان اعمال کرد، اما باید در `variables` تعریف شوند.
:::

نمونه‌هایی از نحوهٔ تعریف دستورات پروتکل را در بستهٔ [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) ببینید.