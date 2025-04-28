---
id: multiremote
title: چند راه دور
---

WebdriverIO به شما امکان می‌دهد چندین جلسه خودکار را در یک آزمایش اجرا کنید. این امر هنگام آزمایش ویژگی‌هایی که به چندین کاربر نیاز دارند (مثلاً، برنامه‌های چت یا WebRTC) مفید است.

به جای ایجاد چند نمونه راه دور که نیاز دارید دستورات مشترکی مانند [`newSession`](/docs/api/webdriver#newsession) یا [`url`](/docs/api/browser/url) را روی هر نمونه اجرا کنید، می‌توانید به سادگی یک نمونه **multiremote** ایجاد کرده و همه مرورگرها را همزمان کنترل کنید.

برای انجام این کار، فقط از تابع `multiremote()` استفاده کنید و یک شیء با نام‌هایی را که به `capabilities` برای مقادیر کلید شده‌اند، ارسال کنید. با دادن یک نام به هر قابلیت، می‌توانید به راحتی آن نمونه واحد را هنگام اجرای دستورات روی یک نمونه انتخاب و به آن دسترسی پیدا کنید.

:::info

Multiremote _برای_ اجرای همه آزمایش‌های شما به صورت موازی طراحی نشده است.
هدف آن کمک به هماهنگی چندین مرورگر و/یا دستگاه‌های موبایل برای آزمون‌های ادغام خاص (مانند برنامه‌های چت) است.

:::

همه نمونه‌های multiremote آرایه‌ای از نتایج را برمی‌گردانند. نتیجه اول نشان‌دهنده قابلیتی است که ابتدا در شیء قابلیت تعریف شده است، نتیجه دوم قابلیت دوم و غیره.

## استفاده از حالت مستقل

در اینجا نمونه‌ای از نحوه ایجاد یک نمونه multiremote در __حالت مستقل__ آورده شده است:

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

برای استفاده از multiremote در WDIO testrunner، فقط شیء `capabilities` را در `wdio.conf.js` خود به عنوان یک شیء با نام‌های مرورگر به عنوان کلیدها تعریف کنید (به جای لیستی از قابلیت‌ها):

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

این دو جلسه WebDriver با Chrome و Firefox ایجاد می‌کند. به جای فقط Chrome و Firefox، می‌توانید دو دستگاه موبایل را با استفاده از [Appium](http://appium.io) یا یک دستگاه موبایل و یک مرورگر راه‌اندازی کنید.

همچنین می‌توانید multiremote را به صورت موازی با قرار دادن شیء قابلیت‌های مرورگر در یک آرایه اجرا کنید. لطفاً مطمئن شوید که فیلد `capabilities` در هر مرورگر گنجانده شده است، زیرا این نحوه تشخیص هر حالت از یکدیگر است.

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

حتی می‌توانید یکی از [سرویس‌های پشتیبانی در ابر](https://webdriver.io/docs/cloudservices.html) را همراه با نمونه‌های محلی Webdriver/Appium یا Selenium Standalone راه‌اندازی کنید. WebdriverIO به طور خودکار قابلیت‌های پشتیبانی ابر را تشخیص می‌دهد اگر `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) یا `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) را در قابلیت‌های مرورگر مشخص کرده باشید.

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

هر نوع ترکیب سیستم عامل/مرورگر در اینجا امکان‌پذیر است (از جمله مرورگرهای موبایل و دسکتاپ). تمام دستوراتی که آزمون‌های شما از طریق متغیر `browser` فراخوانی می‌کنند به صورت موازی با هر نمونه اجرا می‌شوند. این به ساده‌سازی آزمون‌های ادغام شما و تسریع اجرای آنها کمک می‌کند.

به عنوان مثال، اگر یک URL را باز کنید:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

نتیجه هر دستور یک شیء با نام‌های مرورگر به عنوان کلید و نتیجه دستور به عنوان مقدار خواهد بود، مانند:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

توجه داشته باشید که هر دستور یکی پس از دیگری اجرا می‌شود. این بدان معناست که دستور پس از اجرای همه مرورگرها به پایان می‌رسد. این مفید است زیرا اقدامات مرورگر را همگام نگه می‌دارد، که درک آنچه در حال حاضر اتفاق می‌افتد را آسان‌تر می‌کند.

گاهی اوقات لازم است در هر مرورگر کارهای متفاوتی انجام دهید تا چیزی را آزمایش کنید. به عنوان مثال، اگر می‌خواهیم یک برنامه چت را آزمایش کنیم، باید یک مرورگر پیام متنی ارسال کند در حالی که مرورگر دیگر منتظر دریافت آن است، و سپس یک تأیید روی آن اجرا کند.

هنگام استفاده از WDIO testrunner، نام‌های مرورگر را با نمونه‌های خود در فضای نام جهانی ثبت می‌کند:

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

در این مثال، نمونه `myFirefoxBrowser` پس از اینکه نمونه `myChromeBrowser` بر روی دکمه `#send` کلیک کرد، منتظر یک پیام می‌ماند.

Multiremote کنترل چندین مرورگر را آسان و راحت می‌کند، خواه بخواهید آنها همان کار را به صورت موازی انجام دهند یا کارهای متفاوتی به صورت هماهنگ انجام دهند.

## دسترسی به نمونه‌های مرورگر با استفاده از رشته‌ها از طریق شیء مرورگر
علاوه بر دسترسی به نمونه مرورگر از طریق متغیرهای جهانی آنها (مثلاً `myChromeBrowser`، `myFirefoxBrowser`)، می‌توانید از طریق شیء `browser` نیز به آنها دسترسی پیدا کنید، مثلاً `browser["myChromeBrowser"]` یا `browser["myFirefoxBrowser"]`. شما می‌توانید لیستی از تمامی نمونه‌های خود را از طریق `browser.instances` دریافت کنید. این مخصوصاً برای نوشتن مراحل آزمون قابل استفاده مجدد که می‌تواند در هر دو مرورگر انجام شود، مفید است، به عنوان مثال:

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

اگر از TypeScript استفاده می‌کنید و می‌خواهید به طور مستقیم به نمونه درایور از شیء multiremote دسترسی پیدا کنید، می‌توانید انواع multiremote را نیز گسترش دهید. به عنوان مثال، با توجه به قابلیت‌های زیر:

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

می‌توانید نمونه multiremote را با افزودن نام‌های درایور سفارشی خود گسترش دهید، مثلاً:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

اکنون می‌توانید به درایورها مستقیماً دسترسی پیدا کنید، مثلاً:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```