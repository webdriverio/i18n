---
id: multiremote
title: چند-ریموت (Multi-remote)
description: "کنترل چندین نشست مرورگر یا دستگاه از یک تست واحد با multi-remote، در حالت مستقل یا با WDIO testrunner."
---

WebdriverIO به شما اجازه می‌دهد چندین نشست خودکار را در یک تست واحد اجرا کنید. این قابلیت زمانی مفید است که در حال تست ویژگی‌هایی هستید که به چندین کاربر نیاز دارند (برای مثال، برنامه‌های چت یا WebRTC).

به‌جای ایجاد چند نمونه‌ی ریموت که باید دستورات مشترکی مانند [`newSession`](/docs/api/webdriver#newsession) یا [`url`](/docs/api/browser/url) را روی هر نمونه اجرا کنید، می‌توانید به‌سادگی یک نمونه‌ی **multi-remote** ایجاد کنید و همه‌ی مرورگرها را به‌طور همزمان کنترل کنید.

برای این کار، کافی است از تابع `multiRemote()` استفاده کنید و یک شیء ارسال کنید که کلیدهای آن نام‌ها و مقادیر آن `capabilities` هستند. با دادن یک نام به هر capability، می‌توانید هنگام اجرای دستورات روی یک نمونه‌ی واحد، آن نمونه را به‌راحتی انتخاب کرده و به آن دسترسی داشته باشید.

:::info

MultiRemote برای اجرای موازی همه‌ی تست‌های شما در نظر گرفته _نشده_ است.
هدف آن کمک به هماهنگ‌سازی چندین مرورگر و/یا دستگاه موبایل برای تست‌های یکپارچه‌سازی خاص (مانند برنامه‌های چت) است.

:::

بیشتر دستورات multi-remote آرایه‌ای از نتایج را برمی‌گردانند. نتیجه‌ی اول مربوط به capability است که اول در شیء capability تعریف شده، نتیجه‌ی دوم مربوط به capability دوم و به همین ترتیب. `mock()` به‌جای آرایه، یک `MultiRemoteMock` برمی‌گرداند. به [آنچه mock() برمی‌گرداند](#what-mock-returns) مراجعه کنید.

## استفاده از حالت مستقل (Standalone)

در اینجا مثالی از نحوه‌ی ایجاد یک نمونه‌ی multi-remote در __حالت مستقل__ آورده شده است:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // باز کردن url با هر دو مرورگر به‌طور همزمان
    await browser.url('http://json.org')

    // فراخوانی دستورات به‌طور همزمان
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // کلیک روی یک عنصر به‌طور همزمان
    const elem = await browser.$('#someElem')
    await elem.click()

    // کلیک فقط با یک مرورگر (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## استفاده از WDIO Testrunner

برای استفاده از multi-remote در WDIO testrunner، کافی است شیء `capabilities` را در فایل `wdio.conf.js` خود به‌صورت یک شیء با نام مرورگرها به‌عنوان کلید تعریف کنید (به‌جای لیستی از capabilities):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

این کار دو نشست WebDriver با Chrome و Firefox ایجاد می‌کند. به‌جای فقط Chrome و Firefox، می‌توانید با استفاده از [Appium](http://appium.io) دو دستگاه موبایل یا یک دستگاه موبایل و یک مرورگر را نیز راه‌اندازی کنید.

همچنین می‌توانید multi-remote را با قرار دادن شیء capabilities مرورگرها در یک آرایه، به‌صورت موازی اجرا کنید. لطفاً مطمئن شوید که فیلد `capabilities` در هر مرورگر وجود دارد، زیرا این‌گونه است که ما هر حالت را از دیگری تشخیص می‌دهیم.

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

حتی می‌توانید یکی از [بک‌اندهای سرویس‌های ابری](https://webdriver.io/docs/cloudservices.html) را همراه با نمونه‌های محلی Webdriver/Appium یا Selenium Standalone راه‌اندازی کنید. اگر هر یک از `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) یا `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) را در capabilities مرورگر مشخص کرده باشید، WebdriverIO به‌طور خودکار capabilities بک‌اند ابری را تشخیص می‌دهد.

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

هر نوع ترکیبی از سیستم‌عامل/مرورگر در اینجا امکان‌پذیر است (شامل مرورگرهای موبایل و دسکتاپ). تمام دستوراتی که تست‌های شما از طریق متغیر `browser` فراخوانی می‌کنند، به‌صورت موازی با هر نمونه اجرا می‌شوند. این کار به ساده‌سازی تست‌های یکپارچه‌سازی و افزایش سرعت اجرای آن‌ها کمک می‌کند.

برای مثال، اگر یک URL را باز کنید:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

نتیجه‌ی هر دستور یک شیء خواهد بود که نام مرورگرها کلید و نتیجه‌ی دستور مقدار آن است، به این شکل:

```js
// مثال wdio testrunner
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // برمی‌گرداند: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // برمی‌گرداند: 'Firefox 35 on Mac OS X (Yosemite)'
```

توجه داشته باشید که هر دستور یکی پس از دیگری اجرا می‌شود. این یعنی دستور زمانی به پایان می‌رسد که همه‌ی مرورگرها آن را اجرا کرده باشند. این ویژگی مفید است زیرا اقدامات مرورگرها را همگام نگه می‌دارد و درک آنچه در حال حاضر اتفاق می‌افتد را آسان‌تر می‌کند.

گاهی اوقات برای تست چیزی لازم است در هر مرورگر کارهای متفاوتی انجام شود. به‌عنوان مثال، اگر بخواهیم یک برنامه‌ی چت را تست کنیم، باید یک مرورگر پیام متنی ارسال کند در حالی که مرورگر دیگری منتظر دریافت آن است و سپس یک assertion روی آن اجرا شود.

هنگام استفاده از WDIO testrunner، نام مرورگرها همراه با نمونه‌هایشان در دامنه‌ی سراسری (global scope) ثبت می‌شوند:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// صبر تا رسیدن پیام‌ها
await $('.messages').waitForExist()
// بررسی اینکه آیا یکی از پیام‌ها شامل پیام Chrome است
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

در این مثال، نمونه‌ی `myFirefoxBrowser` به محض اینکه نمونه‌ی `myChromeBrowser` روی دکمه‌ی `#send` کلیک کند، شروع به انتظار برای یک پیام می‌کند.

MultiRemote کنترل چندین مرورگر را آسان و راحت می‌کند، چه بخواهید آن‌ها یک کار را به‌صورت موازی انجام دهند و چه کارهای متفاوتی را به‌صورت هماهنگ.

### آنچه `$` برمی‌گرداند

روی یک مرورگر multi-remote، دستورات `$`، `custom$` و `react$` یک `MultiRemoteElement` برمی‌گردانند. روی یک عنصر multi-remote، دستورات `shadow$`، `nextElement`، `previousElement` و `parentElement` نیز یک مورد از آن را برمی‌گردانند. دستورات آن روی همه‌ی نمونه‌ها اجرا می‌شوند و `getInstance` عنصر مربوط به یک مرورگر را می‌دهد.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // در همه‌ی مرورگرها کلیک می‌کند
await button.getInstance('myChromeBrowser').click()  // فقط در Chrome کلیک می‌کند
```

### آنچه `$$` برمی‌گرداند

روی یک مرورگر multi-remote، `$$` یک `MultiRemoteElementArray` برمی‌گرداند. هر ورودی یک `MultiRemoteElement` است که به‌طور همزمان همه‌ی نمونه‌ها را هدف قرار می‌دهد و خود آرایه همان اطلاعات یک `ElementArray` معمولی را در بر دارد. `custom$$`، `react$$` و روی یک عنصر multi-remote، `shadow$$` همین نوع لیست را برمی‌گردانند.

```js
const messages = await $$('.messages')

messages.length      // بیشترین تعداد عناصری که یک نمونه پیدا کرده است
messages[0]          // یک MultiRemoteElement که همه‌ی نمونه‌ها را هدف قرار می‌دهد
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // مرورگر یا عنصر multi-remote که از آن دریافت شده است
messages.isMultiRemote // true، تا بتوان آن را از یک ElementArray ساده تشخیص داد

// متدهای کمکی async آرایه، مانند یک مرورگر واحد، در دسترس هستند
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

وقتی نمونه‌ها تعداد متفاوتی از عناصر را پیدا می‌کنند، یک ورودی برای نمونه‌ای که تعداد کمتری پیدا کرده، عنصری ندارد. برای آن نمونه، `getInstance()` خطا پرتاب می‌کند و دستوری که روی آن ورودی اجرا شود با شکست مواجه می‌شود. از `select()` با نمونه‌هایی که آن عنصر را دارند استفاده کنید. یک matcher از نوع `expect` روی کل لیست، هر نمونه را با عناصر خودش بررسی می‌کند:

```js
// myChromeBrowser سه پیام پیدا می‌کند، myFirefoxBrowser دو پیام پیدا می‌کند
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // فقط Chrome پیام سوم را دارد
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

پیش از نسخه‌ی v10، این دستور یک آرایه‌ی ساده برمی‌گرداند مگر اینکه `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` تنظیم شده بود. اکنون این آرایه حالت پیش‌فرض است و متغیر محیطی حذف شده است. دسترسی با اندیس تغییری نکرده است، بنابراین کدی که فقط `elements[0]` را می‌خواند همچنان کار می‌کند.

:::

### آنچه mock() برمی‌گرداند {#what-mock-returns}

روی یک مرورگر multi-remote، `mock()` یک `MultiRemoteMock` برمی‌گرداند. این یک آرایه نیست. `respond()`، `restore()` و سایر متدهای mock روی همه‌ی نمونه‌ها اجرا می‌شوند. درخواست‌های ضبط‌شده روی mock مربوط به هر مرورگر باقی می‌مانند، بنابراین آن‌ها را با `getInstance` بخوانید:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

فایل `examples/bidi/multiremote-mock.js` این مثال را روی دو نشست headless Chrome اجرا می‌کند.

`instances` از ترتیبی پیروی می‌کند که mockها ایجاد شده‌اند. پس از `select()`، این ترتیب ممکن است با `browser.instances` متفاوت باشد:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // mock مربوط به Chrome، صرف‌نظر از ترتیب
```

وقتی `name` در `instances` وجود نداشته باشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند.

برای mock کردن فقط یک مرورگر، `mock()` را روی همان نمونه فراخوانی کنید:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## دسترسی به نمونه‌های مرورگر با استفاده از رشته‌ها از طریق شیء browser
علاوه بر دسترسی به نمونه‌ی مرورگر از طریق متغیرهای سراسری آن‌ها (مانند `myChromeBrowser`، `myFirefoxBrowser`)، می‌توانید از طریق شیء `browser` نیز به آن‌ها دسترسی داشته باشید، مانند `browser["myChromeBrowser"]` یا `browser["myFirefoxBrowser"]`. می‌توانید لیستی از همه‌ی نمونه‌های خود را از طریق `browser.instances` دریافت کنید. این ویژگی به‌ویژه هنگام نوشتن مراحل تست قابل استفاده‌ی مجدد که می‌توانند در هر یک از مرورگرها اجرا شوند مفید است، برای مثال:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

فایل Cucumber:
    ```feature
    When User A types a message into the chat
    ```

فایل تعریف مراحل (Step definition):
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertionها

matcherهای `expect` از مرورگرها، عناصر و mockهای multi-remote پشتیبانی می‌کنند. به‌طور پیش‌فرض، همه‌ی نمونه‌ها باید با مقدار مورد انتظار مطابقت داشته باشند:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

برای انتظار مقدار متفاوت برای هر نمونه، از `expect.multiRemote()` با یک مقدار برای هر نام نمونه استفاده کنید:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

برای مشاهده‌ی همه‌ی matcherهای پشتیبانی‌شده و پیکربندی مورد نیاز، به [راهنمای multi-remote در expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md) مراجعه کنید.

## دسترسی به یک نمونه

نام نمونه‌ها، ویژگی (property) مرورگر multi-remote یا عنصر multi-remote نیستند. `browser.myChromeBrowser` و `elem.myChromeDriver` تنظیم نشده‌اند. نشست را با `getInstance` درخواست کنید، یا شیء multi-remote را با `select` محدود کنید:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

وقتی `injectGlobals` فعال باقی بماند، testrunner همچنان هر نام نمونه را به‌عنوان یک متغیر سراسری مستقل تعریف می‌کند، بنابراین یک تست می‌تواند `myChromeBrowser.$('button')` را بدون عبور از `browser` فراخوانی کند. آن متغیر سراسری همان نشست واحدی است که از `getInstance` به دست می‌آید، نه یک فیلد روی شیء multi-remote.