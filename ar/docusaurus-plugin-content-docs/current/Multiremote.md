---
id: multiremote
title: متعدد عن بعد
---

يسمح لك WebdriverIO بتشغيل جلسات آلية متعددة في اختبار واحد. وهذا يصبح مفيدًا عند اختبار ميزات تتطلب مستخدمين متعددين (على سبيل المثال، تطبيقات الدردشة أو تطبيقات WebRTC).

بدلاً من إنشاء عدة حالات بعيدة حيث تحتاج إلى تنفيذ أوامر مشتركة مثل [`newSession`](/docs/api/webdriver#newsession) أو [`url`](/docs/api/browser/url) على كل حالة، يمكنك ببساطة إنشاء حالة **متعددة عن بعد** والتحكم في جميع المتصفحات في نفس الوقت.

للقيام بذلك، ما عليك سوى استخدام وظيفة `multiremote()`، وتمرير كائن بأسماء مرتبطة بـ `capabilities` كقيم. من خلال إعطاء كل قدرة اسمًا، يمكنك بسهولة تحديد والوصول إلى تلك الحالة الفردية عند تنفيذ الأوامر على حالة واحدة.

:::info

لم يتم تصميم Multiremote لتنفيذ جميع اختباراتك بشكل متوازٍ.
بل هو مخصص للمساعدة في تنسيق متصفحات متعددة و/أو أجهزة محمولة لاختبارات تكامل خاصة (مثل تطبيقات الدردشة).

:::

جميع حالات multiremote تعيد مصفوفة من النتائج. تمثل النتيجة الأولى القدرة المحددة أولاً في كائن القدرات والنتيجة الثانية تمثل القدرة الثانية وهكذا.

## استخدام الوضع المستقل

فيما يلي مثال على كيفية إنشاء حالة متعددة عن بعد في __وضع مستقل__:

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

لاستخدام multiremote في WDIO testrunner، قم فقط بتعريف كائن `capabilities` في ملف `wdio.conf.js` ككائن باستخدام أسماء المتصفحات كمفاتيح (بدلاً من قائمة بالقدرات):

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

هذا سينشئ جلستين WebDriver مع Chrome و Firefox. بدلاً من Chrome و Firefox فقط، يمكنك أيضًا تشغيل جهازين محمولين باستخدام [Appium](http://appium.io) أو جهاز محمول واحد ومتصفح واحد.

يمكنك أيضًا تشغيل multiremote بالتوازي عن طريق وضع كائن قدرات المتصفح في مصفوفة. يرجى التأكد من تضمين حقل `capabilities` في كل متصفح، لأن هذه هي الطريقة التي نميز بها كل وضع.

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

يمكنك حتى تشغيل أحد [خدمات السحابة الخلفية](https://webdriver.io/docs/cloudservices.html) مع Webdriver/Appium المحلي، أو حالات Selenium Standalone. يكتشف WebdriverIO تلقائيًا قدرات النظام الأساسي السحابي إذا قمت بتحديد أي من `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، أو `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html))، أو `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) في قدرات المتصفح.

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

أي نوع من مجموعة نظام التشغيل/المتصفح ممكن هنا (بما في ذلك المتصفحات المحمولة وسطح المكتب). يتم تنفيذ جميع الأوامر التي تستدعيها اختباراتك عبر متغير `browser` بالتوازي مع كل حالة. هذا يساعد على تبسيط اختبارات التكامل وتسريع تنفيذها.

على سبيل المثال، إذا فتحت عنوان URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ستكون نتيجة كل أمر عبارة عن كائن مع أسماء المتصفحات كمفتاح، ونتيجة الأمر كقيمة، على النحو التالي:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

لاحظ أن كل أمر يتم تنفيذه واحدًا تلو الآخر. هذا يعني أن الأمر ينتهي بمجرد تنفيذ جميع المتصفحات له. هذا مفيد لأنه يبقي إجراءات المتصفح متزامنة، مما يجعل من السهل فهم ما يحدث حاليًا.

في بعض الأحيان من الضروري القيام بأشياء مختلفة في كل متصفح من أجل اختبار شيء ما. على سبيل المثال، إذا أردنا اختبار تطبيق دردشة، يجب أن يكون هناك متصفح واحد يرسل رسالة نصية بينما ينتظر متصفح آخر لاستلامها، ثم إجراء تأكيد عليها.

عند استخدام WDIO testrunner، يقوم بتسجيل أسماء المتصفحات مع حالاتها في النطاق العالمي:

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

في هذا المثال، ستبدأ حالة `myFirefoxBrowser` في انتظار رسالة بمجرد نقر حالة `myChromeBrowser` على زر `#send`.

يجعل Multiremote من السهل والملائم التحكم في متصفحات متعددة، سواء كنت تريدهم أن يفعلوا نفس الشيء بالتوازي، أو أشياء مختلفة بشكل متناغم.

## الوصول إلى حالات المتصفح باستخدام السلاسل النصية عبر كائن المتصفح
بالإضافة إلى الوصول إلى حالة المتصفح عبر المتغيرات العالمية (مثل `myChromeBrowser`، `myFirefoxBrowser`)، يمكنك أيضًا الوصول إليها عبر كائن `browser`، على سبيل المثال `browser["myChromeBrowser"]` أو `browser["myFirefoxBrowser"]`. يمكنك الحصول على قائمة بجميع حالاتك عبر `browser.instances`. هذا مفيد بشكل خاص عند كتابة خطوات اختبار قابلة لإعادة الاستخدام يمكن إجراؤها في أي من المتصفحات، على سبيل المثال:

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

إذا كنت تستخدم TypeScript وترغب في الوصول إلى حالة السائق من كائن متعدد عن بُعد مباشرة، يمكنك أيضًا توسيع أنواع متعددة عن بُعد للقيام بذلك. على سبيل المثال، بالنظر إلى القدرات التالية:

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

يمكنك توسيع الحالة متعددة عن بُعد بإضافة أسماء السائق المخصصة الخاصة بك، على سبيل المثال:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

الآن يمكنك الوصول إلى السائقين مباشرة عبر، على سبيل المثال:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```