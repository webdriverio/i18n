---
id: multiremote
title: تعدد الاتصالات عن بعد
---

يسمح لك WebdriverIO بتشغيل جلسات آلية متعددة في اختبار واحد. هذا مفيد عندما تختبر ميزات تتطلب عدة مستخدمين (على سبيل المثال، تطبيقات الدردشة أو تطبيقات WebRTC).

بدلاً من إنشاء عدة مثيلات عن بُعد حيث تحتاج إلى تنفيذ أوامر شائعة مثل [`newSession`](/docs/api/webdriver#newsession) أو [`url`](/docs/api/browser/url) على كل مثيل، يمكنك ببساطة إنشاء مثيل **متعدد الاتصالات** والتحكم في جميع المتصفحات في نفس الوقت.

للقيام بذلك، استخدم فقط وظيفة `multiremote()`، ومرر كائنًا مع أسماء مرتبطة بـ `capabilities` كقيم. من خلال إعطاء كل قدرة اسمًا، يمكنك بسهولة تحديد والوصول إلى ذلك المثيل الفردي عند تنفيذ الأوامر على مثيل واحد.

:::info

تعدد الاتصالات _ليس_ مخصصًا لتنفيذ جميع اختباراتك بالتوازي.
بل يهدف إلى المساعدة في تنسيق متصفحات متعددة و/أو أجهزة جوال لاختبارات تكامل خاصة (مثل تطبيقات الدردشة).

:::

جميع مثيلات متعددة الاتصالات تُرجع مصفوفة من النتائج. تمثل النتيجة الأولى القدرة المحددة أولاً في كائن القدرات، والنتيجة الثانية تمثل القدرة الثانية وهكذا.

## استخدام الوضع المستقل

هنا مثال على كيفية إنشاء مثيل متعدد الاتصالات في __الوضع المستقل__:

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

## استخدام مُشغل اختبار WDIO

لاستخدام تعدد الاتصالات في مشغل اختبار WDIO، قم فقط بتعريف كائن `capabilities` في ملف `wdio.conf.js` الخاص بك ككائن مع أسماء المتصفحات كمفاتيح (بدلاً من قائمة القدرات):

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

سيؤدي هذا إلى إنشاء جلستي WebDriver مع Chrome و Firefox. بدلاً من مجرد Chrome و Firefox، يمكنك أيضًا تشغيل جهازين جوال باستخدام [Appium](http://appium.io) أو جهاز جوال واحد ومتصفح واحد.

يمكنك أيضًا تشغيل متعدد الاتصالات بالتوازي عن طريق وضع كائن قدرات المتصفح في مصفوفة. يرجى التأكد من تضمين حقل `capabilities` في كل متصفح، لأن هذه هي الطريقة التي نميز بها كل وضع.

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

يمكنك حتى تشغيل إحدى [خدمات السحابة الخلفية](https://webdriver.io/docs/cloudservices.html) مع مثيلات Webdriver/Appium المحلية، أو مثيلات Selenium المستقلة. يكتشف WebdriverIO تلقائيًا قدرات الخدمة السحابية إذا حددت أيًا من `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، أو `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html))، أو `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) في قدرات المتصفح.

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

أي نوع من توليفات نظام التشغيل/المتصفح ممكن هنا (بما في ذلك متصفحات الجوال وسطح المكتب). يتم تنفيذ جميع الأوامر التي تستدعيها اختباراتك عبر متغير `browser` بالتوازي مع كل مثيل. هذا يساعد على تبسيط اختبارات التكامل الخاصة بك وتسريع تنفيذها.

على سبيل المثال، إذا فتحت عنوان URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ستكون نتيجة كل أمر كائنًا مع أسماء المتصفحات كمفتاح، ونتيجة الأمر كقيمة، على النحو التالي:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

لاحظ أن كل أمر يتم تنفيذه واحدًا تلو الآخر. هذا يعني أن الأمر ينتهي بمجرد أن تنفذه جميع المتصفحات. هذا مفيد لأنه يبقي إجراءات المتصفح متزامنة، مما يجعل من السهل فهم ما يحدث حاليًا.

في بعض الأحيان من الضروري القيام بأشياء مختلفة في كل متصفح من أجل اختبار شيء ما. على سبيل المثال، إذا أردنا اختبار تطبيق دردشة، يجب أن يكون هناك متصفح واحد يرسل رسالة نصية بينما ينتظر متصفح آخر استلامها، ثم يقوم بإجراء تأكيد عليها.

عند استخدام مشغل اختبار WDIO، فإنه يسجل أسماء المتصفحات مع مثيلاتها في النطاق العالمي:

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

في هذا المثال، سيبدأ مثيل `myFirefoxBrowser` في انتظار رسالة بمجرد نقر مثيل `myChromeBrowser` على زر `#send`.

يجعل تعدد الاتصالات من السهل والمريح التحكم في متصفحات متعددة، سواء كنت تريد أن تقوم بنفس الشيء بالتوازي، أو أشياء مختلفة بتناغم.

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

إذا كنت تستخدم TypeScript وترغب في الوصول إلى مثيل برنامج التشغيل من كائن multiremote مباشرةً، يمكنك أيضًا توسيع أنواع multiremote للقيام بذلك. على سبيل المثال، نظرًا للقدرات التالية:

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

يمكنك توسيع مثيل multiremote بإضافة أسماء برامج التشغيل المخصصة، على سبيل المثال:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

الآن يمكنك الوصول إلى برامج التشغيل مباشرةً، على سبيل المثال:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```