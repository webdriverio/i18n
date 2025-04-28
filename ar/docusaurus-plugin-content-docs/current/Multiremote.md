---
id: multiremote
title: متعدد التحكم عن بعد
---

يتيح لك WebdriverIO تشغيل جلسات آلية متعددة في اختبار واحد. هذا مفيد عندما تختبر ميزات تتطلب مستخدمين متعددين (على سبيل المثال، تطبيقات الدردشة أو تطبيقات WebRTC).

بدلاً من إنشاء مجموعة من المثيلات البعيدة حيث تحتاج إلى تنفيذ أوامر شائعة مثل [`newSession`](/docs/api/webdriver#newsession) أو [`url`](/docs/api/browser/url) على كل مثيل، يمكنك ببساطة إنشاء مثيل **متعدد التحكم عن بعد** والتحكم في جميع المتصفحات في نفس الوقت.

للقيام بذلك، استخدم فقط وظيفة `multiremote()`، ومرر كائنًا بأسماء مفاتيح لقيم `capabilities`. من خلال إعطاء كل قدرة اسمًا، يمكنك بسهولة تحديد والوصول إلى تلك المثيل الفردية عند تنفيذ الأوامر على مثيل واحد.

:::info

متعدد التحكم عن بعد _ليس_ مخصصًا لتنفيذ جميع اختباراتك بالتوازي.
بل يهدف إلى مساعدة تنسيق متصفحات متعددة و/أو أجهزة محمولة لاختبارات تكامل خاصة (مثل تطبيقات الدردشة).

:::

ترجع جميع مثيلات متعدد التحكم عن بعد مصفوفة من النتائج. تمثل النتيجة الأولى القدرة المحددة أولاً في كائن القدرة والنتيجة الثانية تمثل القدرة الثانية وهكذا.

## استخدام الوضع المستقل

إليك مثال حول كيفية إنشاء مثيل متعدد التحكم عن بعد في __الوضع المستقل__:

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

## استخدام WDIO Testrunner

لاستخدام متعدد التحكم عن بعد في مشغل اختبار WDIO، ما عليك سوى تعريف كائن `capabilities` في ملف `wdio.conf.js` الخاص بك ككائن مع أسماء المتصفح كمفاتيح (بدلاً من قائمة الإمكانيات):

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

سينشئ هذا جلستي WebDriver مع Chrome و Firefox. بدلاً من مجرد Chrome و Firefox، يمكنك أيضًا تشغيل جهازين محمولين باستخدام [Appium](http://appium.io) أو جهاز محمول واحد ومتصفح واحد.

يمكنك أيضًا تشغيل متعدد التحكم عن بعد بالتوازي عن طريق وضع كائن إمكانيات المتصفح في مصفوفة. يرجى التأكد من تضمين حقل `capabilities` في كل متصفح، حيث أن هذه هي الطريقة التي نميز بها كل وضع.

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

يمكنك حتى تشغيل إحدى [خدمات الخلفية السحابية](https://webdriver.io/docs/cloudservices.html) مع مثيلات Webdriver/Appium المحلية، أو مثيلات Selenium المستقلة. يكتشف WebdriverIO تلقائيًا إمكانيات الخلفية السحابية إذا قمت بتحديد أي من `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، أو `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html))، أو `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) في إمكانيات المتصفح.

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

أي مجموعة من نظام التشغيل/المتصفح ممكنة هنا (بما في ذلك المتصفحات المحمولة وسطح المكتب). يتم تنفيذ جميع الأوامر التي تستدعيها اختباراتك عبر متغير `browser` بالتوازي مع كل مثيل. هذا يساعد على تبسيط اختبارات التكامل وتسريع تنفيذها.

على سبيل المثال، إذا فتحت عنوان URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ستكون نتيجة كل أمر عبارة عن كائن مع أسماء المتصفح كمفتاح، ونتيجة الأمر كقيمة، مثل:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

لاحظ أن كل أمر يتم تنفيذه واحدًا تلو الآخر. هذا يعني أن الأمر ينتهي بمجرد أن تنفذه جميع المتصفحات. هذا مفيد لأنه يحافظ على مزامنة إجراءات المتصفح، مما يسهل فهم ما يحدث حاليًا.

في بعض الأحيان من الضروري القيام بأشياء مختلفة في كل متصفح من أجل اختبار شيء ما. على سبيل المثال، إذا أردنا اختبار تطبيق دردشة، يجب أن يكون هناك متصفح واحد يرسل رسالة نصية بينما ينتظر متصفح آخر لاستلامها، ثم يقوم بإجراء تأكيد عليها.

عند استخدام مشغل اختبار WDIO، فإنه يسجل أسماء المتصفح مع مثيلاتها في النطاق العام:

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

في هذا المثال، سيبدأ مثيل `myFirefoxBrowser` في انتظار رسالة بمجرد أن ينقر مثيل `myChromeBrowser` على زر `#send`.

يجعل متعدد التحكم عن بعد من السهل والملائم التحكم في متصفحات متعددة، سواء كنت تريدهم أن يفعلوا نفس الشيء بالتوازي، أو أشياء مختلفة بتناغم.

## الوصول إلى مثيلات المتصفح باستخدام السلاسل النصية عبر كائن المتصفح
بالإضافة إلى الوصول إلى مثيل المتصفح عبر متغيراتهم العالمية (مثل `myChromeBrowser`، `myFirefoxBrowser`)، يمكنك أيضًا الوصول إليها عبر كائن `browser`، مثل `browser["myChromeBrowser"]` أو `browser["myFirefoxBrowser"]`. يمكنك الحصول على قائمة بجميع مثيلاتك عبر `browser.instances`. هذا مفيد بشكل خاص عند كتابة خطوات اختبار قابلة لإعادة الاستخدام يمكن تنفيذها في أي من المتصفحين، على سبيل المثال:

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

ملف Cucumber:
    ```feature
    When User A types a message into the chat
    ```

ملف تعريف الخطوة:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## توسيع أنواع TypeScript

إذا كنت تستخدم TypeScript وترغب في الوصول إلى مثيل برنامج التشغيل من كائن متعدد التحكم عن بعد مباشرة، يمكنك أيضًا توسيع أنواع متعدد التحكم عن بعد للقيام بذلك. على سبيل المثال، بالنظر إلى الإمكانيات التالية:

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

يمكنك توسيع مثيل متعدد التحكم عن بعد عن طريق إضافة أسماء برامج التشغيل المخصصة، على سبيل المثال:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

الآن يمكنك الوصول إلى برامج التشغيل مباشرة، على سبيل المثال:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```