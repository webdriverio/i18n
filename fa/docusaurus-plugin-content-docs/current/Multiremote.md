---
id: multiremote
title: مالتی ریموت
---

WebdriverIO به شما امکان می‌دهد چندین جلسه خودکار را در یک آزمایش واحد اجرا کنید. این ویژگی هنگامی مفید است که شما در حال آزمایش ویژگی‌هایی هستید که نیاز به چندین کاربر دارند (برای مثال، اپلیکیشن‌های چت یا WebRTC).

به جای ایجاد چندین نمونه از راه دور که در آن‌ها نیاز دارید دستورات مشترکی مانند [`newSession`](/docs/api/webdriver#newsession) یا [`url`](/docs/api/browser/url) را روی هر نمونه اجرا کنید، می‌توانید به سادگی یک نمونه **multiremote** ایجاد کنید و همه مرورگرها را همزمان کنترل نمایید.

برای انجام این کار، فقط از تابع `multiremote()` استفاده کنید و یک آبجکت با نام‌هایی که به عنوان کلید و `capabilities` به عنوان مقدار تعریف شده‌اند، وارد کنید. با دادن نام به هر قابلیت، می‌توانید به راحتی آن نمونه منفرد را هنگام اجرای دستورات روی یک نمونه خاص انتخاب و به آن دسترسی پیدا کنید.

:::info

مالتی ریموت برای اجرای همه آزمایشات شما به صورت موازی _نیست_.
این ویژگی برای کمک به هماهنگی چندین مرورگر و/یا دستگاه‌های موبایل برای آزمایش‌های ویژه یکپارچه‌سازی (مانند اپلیکیشن‌های چت) طراحی شده است.

:::

همه نمونه‌های مالتی ریموت آرایه‌ای از نتایج را برمی‌گردانند. نتیجه اول نشان‌دهنده قابلیتی است که اول در آبجکت قابلیت‌ها تعریف شده، نتیجه دوم مربوط به قابلیت دوم است و همینطور ادامه دارد.

## استفاده در حالت Standalone

در اینجا مثالی از نحوه ایجاد یک نمونه مالتی ریموت در __حالت standalone__ آمده است:

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

برای استفاده از مالتی ریموت در WDIO testrunner، فقط آبجکت `capabilities` را در فایل `wdio.conf.js` خود به عنوان یک آبجکت با نام‌های مرورگرها به عنوان کلیدها (به جای لیستی از قابلیت‌ها) تعریف کنید:

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

این کار دو جلسه WebDriver با Chrome و Firefox ایجاد می‌کند. به جای فقط Chrome و Firefox، شما همچنین می‌توانید دو دستگاه موبایل با استفاده از [Appium](http://appium.io) یا یک دستگاه موبایل و یک مرورگر را راه‌اندازی کنید.

شما همچنین می‌توانید مالتی ریموت را به صورت موازی با قرار دادن آبجکت قابلیت‌های مرورگر در یک آرایه اجرا کنید. لطفاً اطمینان حاصل کنید که فیلد `capabilities` در هر مرورگر گنجانده شده باشد، زیرا این نحوه تشخیص هر حالت از یکدیگر است.

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

شما حتی می‌توانید یکی از [سرویس‌های ابری پشتیبانی شده](https://webdriver.io/docs/cloudservices.html) را همراه با نمونه‌های محلی Webdriver/Appium یا Selenium Standalone راه‌اندازی کنید. WebdriverIO به طور خودکار قابلیت‌های سرویس ابری را تشخیص می‌دهد اگر شما هریک از `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) یا `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) را در قابلیت‌های مرورگر مشخص کرده باشید.

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

هر نوع ترکیب سیستم‌عامل/مرورگر در اینجا ممکن است (شامل مرورگرهای موبایل و دسکتاپ). تمام دستوراتی که آزمایش‌های شما از طریق متغیر `browser` فراخوانی می‌کنند، به صورت موازی با هر نمونه اجرا می‌شوند. این به ساده‌سازی آزمایش‌های یکپارچه‌سازی شما و تسریع اجرای آنها کمک می‌کند.

برای مثال، اگر یک URL را باز کنید:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

نتیجه هر دستور یک آبجکت با نام‌های مرورگر به عنوان کلید و نتیجه دستور به عنوان مقدار خواهد بود، مانند این:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

توجه کنید که هر دستور یکی پس از دیگری اجرا می‌شود. این بدان معنی است که دستور زمانی به پایان می‌رسد که همه مرورگرها آن را اجرا کرده باشند. این مفید است زیرا اقدامات مرورگر را همگام نگه می‌دارد، که درک آنچه در حال حاضر در حال اتفاق افتادن است را آسان‌تر می‌کند.

گاهی اوقات لازم است در هر مرورگر کارهای متفاوتی انجام شود تا چیزی آزمایش شود. به عنوان مثال، اگر می‌خواهیم یک اپلیکیشن چت را آزمایش کنیم، باید یک مرورگر پیام متنی را ارسال کند در حالی که مرورگر دیگر منتظر دریافت آن است، و سپس یک تأیید روی آن اجرا کند.

هنگام استفاده از WDIO testrunner، نام‌های مرورگر را با نمونه‌های آنها در دامنه جهانی ثبت می‌کند:

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

مالتی ریموت کنترل چندین مرورگر را آسان و راحت می‌کند، خواه بخواهید آنها کار یکسانی را به صورت موازی انجام دهند یا کارهای متفاوتی را به صورت هماهنگ اجرا کنند.

## دسترسی به نمونه‌های مرورگر با استفاده از رشته‌ها از طریق آبجکت browser
علاوه بر دسترسی به نمونه مرورگر از طریق متغیرهای جهانی آنها (مثلاً `myChromeBrowser`، `myFirefoxBrowser`)، می‌توانید به آنها از طریق آبجکت `browser` نیز دسترسی پیدا کنید، مثلاً `browser["myChromeBrowser"]` یا `browser["myFirefoxBrowser"]`. می‌توانید لیستی از تمام نمونه‌های خود را از طریق `browser.instances` دریافت کنید. این به ویژه هنگام نوشتن مراحل آزمون قابل استفاده مجدد که می‌توانند در هر مرورگری انجام شوند، مفید است، مثلاً:

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

## توسعه انواع TypeScript

اگر از TypeScript استفاده می‌کنید و می‌خواهید به نمونه راننده از آبجکت مالتی ریموت به طور مستقیم دسترسی پیدا کنید، می‌توانید انواع مالتی ریموت را نیز برای این کار توسعه دهید. برای مثال، با توجه به قابلیت‌های زیر:

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

می‌توانید نمونه مالتی ریموت را با اضافه کردن نام‌های راننده سفارشی خود توسعه دهید، مثلاً:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

اکنون می‌توانید به راننده‌ها مستقیماً دسترسی پیدا کنید، مثلاً:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```