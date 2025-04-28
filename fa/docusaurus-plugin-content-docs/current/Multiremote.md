---
id: multiremote
title: چند راه دور
---

WebdriverIO به شما امکان می‌دهد چندین جلسه خودکار را در یک آزمایش اجرا کنید. این مورد هنگامی مفید می‌شود که ویژگی‌هایی را آزمایش می‌کنید که به چندین کاربر نیاز دارند (برای مثال، چت یا برنامه‌های WebRTC).

به جای ایجاد چند نمونه ریموت که باید دستورات مشترکی مانند [`newSession`](/docs/api/webdriver#newsession) یا [`url`](/docs/api/browser/url) را روی هر نمونه اجرا کنید، می‌توانید به سادگی یک نمونه **چند راه دور** ایجاد کرده و همه مرورگرها را همزمان کنترل کنید.

برای انجام این کار، فقط از تابع `multiremote()` استفاده کنید و یک شی با نام‌هایی که با کلید `capabilities` برای مقادیر مشخص شده‌اند را ارسال کنید. با دادن یک نام به هر قابلیت، می‌توانید به راحتی آن نمونه را انتخاب و به آن دسترسی داشته باشید، هنگامی که دستورها را روی یک نمونه اجرا می‌کنید.

:::info

چند راه دور _به معنای_ اجرای همه تست‌های شما به صورت موازی نیست.
هدف آن کمک به هماهنگی چندین مرورگر و/یا دستگاه‌های موبایل برای تست‌های ادغام خاص (مانند برنامه‌های چت) است.

:::

همه نمونه‌های چند راه دور آرایه‌ای از نتایج را برمی‌گردانند. اولین نتیجه نشان‌دهنده قابلیتی است که اول در شی قابلیت تعریف شده، نتیجه دوم قابلیت دوم و به همین ترتیب.

## استفاده از حالت مستقل

در اینجا نمونه‌ای از نحوه ایجاد یک نمونه چند راه دور در __حالت مستقل__ آمده است:

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## استفاده از WDIO Testrunner

برای استفاده از چند راه دور در WDIO testrunner، فقط شی `capabilities` را در `wdio.conf.js` خود به صورت یک شی با نام‌های مرورگر به عنوان کلید (به جای لیستی از قابلیت‌ها) تعریف کنید:

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

این کار دو جلسه WebDriver با Chrome و Firefox ایجاد می‌کند. به جای فقط Chrome و Firefox، می‌توانید دو دستگاه موبایل با استفاده از [Appium](http://appium.io) یا یک دستگاه موبایل و یک مرورگر را راه‌اندازی کنید.

همچنین می‌توانید چند راه دور را به صورت موازی با قرار دادن شی قابلیت‌های مرورگر در یک آرایه اجرا کنید. لطفاً مطمئن شوید که فیلد `capabilities` در هر مرورگر گنجانده شده است، زیرا این روشی است که ما هر حالت را از هم تشخیص می‌دهیم.

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

حتی می‌توانید یکی از [سرویس‌های ابری پشتیبان](https://webdriver.io/docs/cloudservices.html) را همراه با نمونه‌های محلی Webdriver/Appium یا Selenium Standalone راه‌اندازی کنید. WebdriverIO به طور خودکار قابلیت‌های پشتیبان ابری را تشخیص می‌دهد اگر در قابلیت‌های مرورگر یکی از موارد `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) یا `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) را مشخص کرده باشید.

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

هر نوع ترکیب سیستم عامل/مرورگر در اینجا امکان‌پذیر است (شامل مرورگرهای موبایل و دسکتاپ). تمام دستوراتی که آزمایش‌های شما از طریق متغیر `browser` فراخوانی می‌کنند، به صورت موازی با هر نمونه اجرا می‌شوند. این به بهینه‌سازی تست‌های ادغام شما و تسریع اجرای آنها کمک می‌کند.

برای مثال، اگر یک URL را باز کنید:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

نتیجه هر دستور یک شی خواهد بود با نام مرورگرها به عنوان کلید و نتیجه دستور به عنوان مقدار، مانند:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

توجه داشته باشید که هر دستور یکی یکی اجرا می‌شود. این بدان معناست که دستور زمانی به پایان می‌رسد که همه مرورگرها آن را اجرا کرده باشند. این مفید است زیرا اقدامات مرورگر را همگام نگه می‌دارد، که درک آنچه در حال حاضر در حال رخ دادن است را آسان‌تر می‌کند.

گاهی اوقات لازم است در هر مرورگر کارهای متفاوتی انجام دهید تا چیزی را آزمایش کنید. به عنوان مثال، اگر بخواهیم یک برنامه چت را آزمایش کنیم، باید یک مرورگر باشد که یک پیام متنی ارسال کند، در حالی که مرورگر دیگری منتظر دریافت آن باشد و سپس یک تأیید بر روی آن اجرا کند.

هنگام استفاده از WDIO testrunner، نام‌های مرورگر را با نمونه‌های آنها در محدوده جهانی ثبت می‌کند:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

در این مثال، نمونه `myFirefoxBrowser` پس از اینکه نمونه `myChromeBrowser` روی دکمه `#send` کلیک کرد، شروع به انتظار برای یک پیام می‌کند.

چند راه دور کنترل چندین مرورگر را آسان و راحت می‌کند، چه بخواهید همزمان کار یکسانی انجام دهند، چه کارهای متفاوتی را با هماهنگی انجام دهند.

## دسترسی به نمونه‌های مرورگر با استفاده از رشته‌ها از طریق شی مرورگر
علاوه بر دسترسی به نمونه مرورگر از طریق متغیرهای جهانی آنها (مانند `myChromeBrowser`، `myFirefoxBrowser`)، می‌توانید به آنها از طریق شی `browser` نیز دسترسی پیدا کنید، مثلاً `browser["myChromeBrowser"]` یا `browser["myFirefoxBrowser"]`. می‌توانید لیستی از تمام نمونه‌های خود را از طریق `browser.instances` دریافت کنید. این به ویژه هنگام نوشتن مراحل آزمایش قابل استفاده مجدد که می‌توانند در هر مرورگری انجام شوند، مفید است، مثلا:

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

فایل تعریف مرحله:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## گسترش انواع TypeScript

اگر از TypeScript استفاده می‌کنید و می‌خواهید به نمونه درایور از شی چند راه دور مستقیماً دسترسی داشته باشید، می‌توانید انواع چند راه دور را نیز برای این کار گسترش دهید. به عنوان مثال، با توجه به قابلیت‌های زیر:

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

می‌توانید نمونه چند راه دور را با افزودن نام‌های درایور سفارشی خود گسترش دهید، مثلاً:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

اکنون می‌توانید به درایورها به طور مستقیم دسترسی پیدا کنید، مثلاً:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```