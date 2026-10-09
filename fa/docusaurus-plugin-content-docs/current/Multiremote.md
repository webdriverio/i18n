---
id: multiremote
title: چندریموت (Multi-remote)
description: "با multi-remote، چندین نشست مرورگر یا دستگاه را از یک تست واحد کنترل کنید؛ چه در حالت مستقل (standalone) و چه با WDIO testrunner."
---

WebdriverIO به شما امکان می‌دهد چندین نشست خودکار را در یک تست واحد اجرا کنید. این قابلیت زمانی کاربردی است که ویژگی‌هایی را تست می‌کنید که به چند کاربر نیاز دارند (برای مثال، برنامه‌های چت یا WebRTC).

به‌جای ایجاد چند نمونه‌ی ریموت که باید دستورات مشترکی مانند [`newSession`](/docs/api/webdriver#newsession) یا [`url`](/docs/api/browser/url) را روی هر کدام جداگانه اجرا کنید، می‌توانید به‌سادگی یک نمونه‌ی **multi-remote** بسازید و همه‌ی مرورگرها را هم‌زمان کنترل کنید.

برای این کار، کافی است از تابع `multiRemote()` استفاده کنید و یک شیء به آن بدهید که کلیدهایش نام‌ها و مقادیرش `capabilities` باشند. با نام‌گذاری هر capability، می‌توانید هنگام اجرای دستورات روی یک نمونه‌ی خاص، به‌راحتی آن نمونه را انتخاب کرده و به آن دسترسی داشته باشید.

:::info

MultiRemote برای اجرای موازی همه‌ی تست‌های شما _در نظر گرفته نشده است_.
هدف آن کمک به هماهنگ‌سازی چندین مرورگر و/یا دستگاه موبایل برای تست‌های یکپارچه‌سازی خاص است (مثلاً برنامه‌های چت).

:::

بیشتر دستورات multi-remote آرایه‌ای از نتایج برمی‌گردانند. نتیجه‌ی اول مربوط به capability است که اول در شیء capability تعریف شده، نتیجه‌ی دوم مربوط به capability دوم و به همین ترتیب. `mock()` به‌جای آرایه، یک `MultiRemoteMock` برمی‌گرداند. به [آنچه mock() برمی‌گرداند](#what-mock-returns) مراجعه کنید.

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

    // باز کردن url در هر دو مرورگر به‌طور هم‌زمان
    await browser.url('http://json.org')

    // فراخوانی دستورات به‌طور هم‌زمان
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // کلیک روی یک المان به‌طور هم‌زمان
    const elem = await browser.$('#someElem')
    await elem.click()

    // کلیک فقط با یک مرورگر (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## استفاده از WDIO Testrunner

برای استفاده از multi-remote در WDIO testrunner، کافی است شیء `capabilities` را در فایل `wdio.conf.js` به‌صورت یک شیء با نام مرورگرها به‌عنوان کلید تعریف کنید (به‌جای فهرستی از capabilityها):

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

همچنین می‌توانید با قرار دادن شیء capabilityهای مرورگر در یک آرایه، multi-remote را به‌صورت موازی اجرا کنید. لطفاً مطمئن شوید که فیلد `capabilities` در هر مرورگر وجود داشته باشد، زیرا تمایز بین هر حالت از این طریق انجام می‌شود.

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

حتی می‌توانید یکی از [بک‌اندهای سرویس‌های ابری](https://webdriver.io/docs/cloudservices.html) را همراه با نمونه‌های محلی Webdriver/Appium یا Selenium Standalone راه‌اندازی کنید. اگر در capabilityهای مرورگر یکی از `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) یا `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) را مشخص کرده باشید، WebdriverIO به‌طور خودکار capabilityهای بک‌اند ابری را تشخیص می‌دهد.

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

هر نوع ترکیبی از سیستم‌عامل/مرورگر در اینجا امکان‌پذیر است (از جمله مرورگرهای موبایل و دسکتاپ). تمام دستوراتی که تست‌های شما از طریق متغیر `browser` فراخوانی می‌کنند، به‌صورت موازی روی هر نمونه اجرا می‌شوند. این کار به ساده‌سازی تست‌های یکپارچه‌سازی و افزایش سرعت اجرای آن‌ها کمک می‌کند.

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

توجه کنید که هر دستور یکی پس از دیگری اجرا می‌شود. این یعنی دستور زمانی به پایان می‌رسد که همه‌ی مرورگرها آن را اجرا کرده باشند. این ویژگی مفید است زیرا اقدامات مرورگرها را همگام نگه می‌دارد و درک آنچه در حال رخ دادن است را آسان‌تر می‌کند.

گاهی برای تست چیزی لازم است در هر مرورگر کارهای متفاوتی انجام شود. برای نمونه، اگر بخواهیم یک برنامه‌ی چت را تست کنیم، باید یک مرورگر پیامی متنی ارسال کند در حالی که مرورگر دیگر منتظر دریافت آن می‌ماند و سپس یک assertion روی آن اجرا شود.

هنگام استفاده از WDIO testrunner، نام مرورگرها همراه با نمونه‌هایشان در حوزه‌ی سراسری (global scope) ثبت می‌شوند:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// صبر کن تا پیام‌ها برسند
await $('.messages').waitForExist()
// بررسی کن که آیا یکی از پیام‌ها شامل پیام Chrome است
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

در این مثال، نمونه‌ی `myFirefoxBrowser` به محض اینکه نمونه‌ی `myChromeBrowser` روی دکمه‌ی `#send` کلیک کند، شروع به انتظار برای یک پیام می‌کند.

MultiRemote کنترل چندین مرورگر را آسان و راحت می‌کند، چه بخواهید آن‌ها کار یکسانی را به‌صورت موازی انجام دهند و چه کارهای متفاوتی را به‌صورت هماهنگ.

### آنچه `$` برمی‌گرداند

روی یک مرورگر multi-remote، دستورات `$`، `custom$` و `react$` یک `MultiRemoteElement` برمی‌گردانند. روی یک المان multi-remote، دستورات `shadow$`، `nextElement`، `previousElement` و `parentElement` نیز یک مورد از آن برمی‌گردانند. دستورات آن روی همه‌ی نمونه‌ها اجرا می‌شوند و `getInstance` المان مربوط به یک مرورگر را می‌دهد.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // در همه‌ی مرورگرها کلیک می‌کند
await button.getInstance('myChromeBrowser').click()  // فقط در Chrome کلیک می‌کند
```

### آنچه `$$` برمی‌گرداند

روی یک مرورگر multi-remote، دستور `$$` یک `MultiRemoteElementArray` برمی‌گرداند. هر عضو آن یک `MultiRemoteElement` است که هم‌زمان همه‌ی نمونه‌ها را هدف قرار می‌دهد و خود آرایه همان اطلاعات یک `ElementArray` معمولی را در بر دارد. دستورات `custom$$`، `react$$` و روی یک المان multi-remote، `shadow$$` همین نوع فهرست را برمی‌گردانند.

```js
const messages = await $$('.messages')

messages.length      // بیشترین تعداد المان‌هایی که یک نمونه پیدا کرده است
messages[0]          // یک MultiRemoteElement که همه‌ی نمونه‌ها را هدف قرار می‌دهد
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // مرورگر یا المان multi-remote که از آن دریافت شده است
messages.isMultiRemote // true، تا بتوان آن را از یک ElementArray ساده تشخیص داد

// توابع کمکی async آرایه، مانند یک مرورگر تکی، در دسترس هستند
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

وقتی نمونه‌ها تعداد متفاوتی المان پیدا می‌کنند، یک عضو برای نمونه‌ای که المان‌های کمتری پیدا کرده، المانی ندارد. برای آن نمونه، `getInstance()` خطا پرتاب می‌کند و اجرای دستور روی آن عضو با شکست مواجه می‌شود. از `select()` همراه با نمونه‌هایی که آن المان را دارند استفاده کنید. یک matcher از نوع `expect` روی کل فهرست، هر نمونه را با المان‌های خودش بررسی می‌کند:

```js
// myChromeBrowser سه پیام پیدا می‌کند، myFirefoxBrowser دو پیام
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // فقط Chrome پیام سوم را دارد
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

پیش از نسخه‌ی v10، این دستور یک آرایه‌ی ساده برمی‌گرداند، مگر اینکه `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` تنظیم شده بود. اکنون این آرایه حالت پیش‌فرض است و متغیر محیطی حذف شده است. دسترسی از طریق اندیس تغییری نکرده است، بنابراین کدی که فقط `elements[0]` را می‌خواند همچنان کار می‌کند.

:::

### آنچه mock() برمی‌گرداند {#what-mock-returns}

روی یک مرورگر multi-remote، دستور `mock()` یک `MultiRemoteMock` برمی‌گرداند. این یک آرایه نیست. `respond()`، `restore()` و سایر متدهای mock روی همه‌ی نمونه‌ها اجرا می‌شوند. درخواست‌های ضبط‌شده روی mock مربوط به هر مرورگر باقی می‌مانند، بنابراین آن‌ها را با `getInstance` بخوانید:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

فایل `examples/bidi/multiremote-mock.js` این کد را روی دو نشست headless Chrome اجرا می‌کند.

`instances` از ترتیب ایجاد mockها پیروی می‌کند. پس از `select()`، این ترتیب ممکن است با `browser.instances` متفاوت باشد:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // mock مربوط به Chrome، صرف‌نظر از ترتیب
```

اگر `name` در `instances` نباشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند.

برای mock کردن فقط یک مرورگر، `mock()` را روی همان نمونه فراخوانی کنید:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## دسترسی به نمونه‌های مرورگر با استفاده از رشته‌ها از طریق شیء browser
علاوه بر دسترسی به نمونه‌ی مرورگر از طریق متغیرهای سراسری آن‌ها (مثلاً `myChromeBrowser`، `myFirefoxBrowser`)، می‌توانید از طریق شیء `browser` نیز به آن‌ها دسترسی داشته باشید، مثلاً `browser["myChromeBrowser"]` یا `browser["myFirefoxBrowser"]`. می‌توانید فهرست همه‌ی نمونه‌های خود را از طریق `browser.instances` دریافت کنید. این قابلیت به‌ویژه هنگام نوشتن گام‌های تست قابل استفاده‌ی مجدد که می‌توانند در هر یک از مرورگرها اجرا شوند مفید است، برای مثال:

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

فایل تعریف گام‌ها (Step definition):
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Assertionها

matcherهای `expect` از مرورگرها، المان‌ها و mockهای multi-remote پشتیبانی می‌کنند. به‌طور پیش‌فرض، همه‌ی نمونه‌ها باید با مقدار مورد انتظار مطابقت داشته باشند:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

برای انتظار مقدار متفاوت برای هر نمونه، از `expect.multiRemote()` با یک مقدار به ازای هر نام نمونه استفاده کنید:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

برای مشاهده‌ی همه‌ی matcherهای پشتیبانی‌شده و پیکربندی موردنیاز، به [راهنمای multi-remote در expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md) مراجعه کنید.

## دسترسی به یک نمونه

نام نمونه‌ها، ویژگی (property) مرورگر multi-remote یا المان multi-remote نیستند. `browser.myChromeBrowser` و `elem.myChromeDriver` تنظیم نمی‌شوند. نشست را با `getInstance` درخواست کنید، یا شیء multi-remote را با `select` محدود کنید:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

وقتی `injectGlobals` فعال باقی بماند، testrunner همچنان نام هر نمونه را به‌عنوان یک متغیر سراسری مستقل تعریف می‌کند، بنابراین یک تست می‌تواند بدون استفاده از `browser`، مستقیماً `myChromeBrowser.$('button')` را فراخوانی کند. آن متغیر سراسری همان نشست تکی حاصل از `getInstance` است، نه فیلدی روی شیء multi-remote.