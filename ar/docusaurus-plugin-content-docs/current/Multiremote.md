---
id: multiremote
title: التحكم المتعدد عن بُعد (Multi-remote)
description: "تحكّم في جلسات متعددة لمتصفحات أو أجهزة من اختبار واحد باستخدام multi-remote، سواء في الوضع المستقل أو مع مُشغّل اختبارات WDIO."
---

يتيح لك WebdriverIO تشغيل جلسات آلية متعددة في اختبار واحد. يصبح هذا مفيدًا عند اختبار ميزات تتطلب عدة مستخدمين (على سبيل المثال، تطبيقات الدردشة أو WebRTC).

بدلًا من إنشاء عدة نسخ بعيدة تحتاج فيها إلى تنفيذ أوامر مشتركة مثل [`newSession`](/docs/api/webdriver#newsession) أو [`url`](/docs/api/browser/url) على كل نسخة، يمكنك ببساطة إنشاء نسخة **multi-remote** والتحكم في جميع المتصفحات في الوقت نفسه.

للقيام بذلك، استخدم فقط الدالة `multiRemote()`، ومرّر إليها كائنًا مفاتيحه أسماء وقيمه `capabilities`. من خلال إعطاء كل capability اسمًا، يمكنك بسهولة تحديد تلك النسخة المفردة والوصول إليها عند تنفيذ الأوامر على نسخة واحدة.

:::info

MultiRemote _ليس_ مخصصًا لتنفيذ جميع اختباراتك بالتوازي.
بل يهدف إلى المساعدة في تنسيق عدة متصفحات و/أو أجهزة محمولة لاختبارات تكامل خاصة (مثل تطبيقات الدردشة).

:::

تُرجع معظم أوامر multi-remote مصفوفة من النتائج. تمثل النتيجة الأولى الـ capability المُعرَّفة أولًا في كائن الـ capabilities، والنتيجة الثانية الـ capability الثانية، وهكذا. أما `mock()` فتُرجع `MultiRemoteMock` بدلًا من مصفوفة. راجع [ما الذي تُرجعه mock()](#what-mock-returns).

## استخدام الوضع المستقل

إليك مثالًا على كيفية إنشاء نسخة multi-remote في __الوضع المستقل__:

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

    // فتح الرابط في كلا المتصفحين في الوقت نفسه
    await browser.url('http://json.org')

    // استدعاء الأوامر في الوقت نفسه
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // النقر على عنصر في الوقت نفسه
    const elem = await browser.$('#someElem')
    await elem.click()

    // النقر في متصفح واحد فقط (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## استخدام مُشغّل اختبارات WDIO

لاستخدام multi-remote في مُشغّل اختبارات WDIO، عرّف فقط كائن `capabilities` في ملف `wdio.conf.js` ككائن تكون فيه أسماء المتصفحات هي المفاتيح (بدلًا من قائمة من الـ capabilities):

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

سيؤدي هذا إلى إنشاء جلستي WebDriver باستخدام Chrome وFirefox. بدلًا من Chrome وFirefox فقط، يمكنك أيضًا تشغيل جهازين محمولين باستخدام [Appium](http://appium.io) أو جهاز محمول واحد ومتصفح واحد.

يمكنك أيضًا تشغيل multi-remote بالتوازي عن طريق وضع كائن capabilities المتصفحات داخل مصفوفة. يُرجى التأكد من تضمين الحقل `capabilities` في كل متصفح، لأن هذه هي الطريقة التي نميّز بها بين الوضعين.

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

يمكنك حتى تشغيل إحدى [الخدمات السحابية الخلفية](https://webdriver.io/docs/cloudservices.html) جنبًا إلى جنب مع نسخ Webdriver/Appium المحلية أو نسخ Selenium Standalone. يكتشف WebdriverIO تلقائيًا capabilities الخدمات السحابية الخلفية إذا حددت أيًّا من `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html))، أو `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html))، أو `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) في capabilities المتصفح.

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

أي تركيبة من نظام التشغيل/المتصفح ممكنة هنا (بما في ذلك متصفحات الأجهزة المحمولة وسطح المكتب). تُنفَّذ جميع الأوامر التي تستدعيها اختباراتك عبر المتغير `browser` بالتوازي مع كل نسخة. يساعد هذا في تبسيط اختبارات التكامل الخاصة بك وتسريع تنفيذها.

على سبيل المثال، إذا فتحت رابطًا:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

ستكون نتيجة كل أمر كائنًا تكون فيه أسماء المتصفحات هي المفاتيح، ونتيجة الأمر هي القيمة، هكذا:

```js
// مثال على مُشغّل اختبارات wdio
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // يُرجع: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // يُرجع: 'Firefox 35 on Mac OS X (Yosemite)'
```

لاحظ أن كل أمر يُنفَّذ واحدًا تلو الآخر. هذا يعني أن الأمر ينتهي بمجرد أن تنفذه جميع المتصفحات. هذا مفيد لأنه يُبقي إجراءات المتصفحات متزامنة، مما يسهّل فهم ما يحدث حاليًا.

في بعض الأحيان يكون من الضروري القيام بأشياء مختلفة في كل متصفح من أجل اختبار شيء ما. على سبيل المثال، إذا أردنا اختبار تطبيق دردشة، فلا بد من وجود متصفح يرسل رسالة نصية بينما ينتظر متصفح آخر استلامها، ثم إجراء تحقق (assertion) عليها.

عند استخدام مُشغّل اختبارات WDIO، فإنه يسجّل أسماء المتصفحات مع نسخها في النطاق العام:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// الانتظار حتى وصول الرسائل
await $('.messages').waitForExist()
// التحقق مما إذا كانت إحدى الرسائل تحتوي على رسالة Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

في هذا المثال، ستبدأ النسخة `myFirefoxBrowser` بانتظار رسالة بمجرد أن تنقر النسخة `myChromeBrowser` على الزر `#send`.

يجعل MultiRemote التحكم في متصفحات متعددة سهلًا ومريحًا، سواء أردت أن تقوم بالشيء نفسه بالتوازي، أو بأشياء مختلفة بشكل منسّق.

### ما الذي تُرجعه `$`

في متصفح multi-remote، تُرجع `$` و`custom$` و`react$` عنصر `MultiRemoteElement` واحدًا. وفي عنصر multi-remote، تُرجع `shadow$` و`nextElement` و`previousElement` و`parentElement` أيضًا عنصرًا واحدًا. تُنفَّذ أوامره على كل نسخة، وتعطيك `getInstance` عنصر متصفح واحد.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // ينقر في كل متصفح
await button.getInstance('myChromeBrowser').click()  // ينقر في Chrome فقط
```

### ما الذي تُرجعه `$$`

في متصفح multi-remote، تُرجع `$$` قيمة من نوع `MultiRemoteElementArray`. كل مُدخل فيها هو `MultiRemoteElement` يخاطب جميع النسخ في آن واحد، وتحمل المصفوفة نفسها المعلومات ذاتها التي تحملها `ElementArray` العادية. تُرجع `custom$$` و`react$$`، و`shadow$$` في عنصر multi-remote، النوع نفسه من القوائم.

```js
const messages = await $$('.messages')

messages.length      // أكبر عدد من العناصر عثرت عليه نسخة واحدة
messages[0]          // عنصر MultiRemoteElement يخاطب جميع النسخ
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // متصفح أو عنصر multi-remote الذي جُلبت منه
messages.isMultiRemote // true، لتمييزها عن ElementArray العادية

// دوال المصفوفات غير المتزامنة المساعدة متاحة، كما في المتصفح المفرد
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

عندما تعثر النسخ على أعداد مختلفة من العناصر، لا يحتوي المُدخل على عنصر للنسخة التي عثرت على عدد أقل. بالنسبة لتلك النسخة، تُطلق `getInstance()` خطأً، ويفشل أي أمر على المُدخل. استخدم `select()` مع النسخ التي تحتوي على العنصر. يتحقق مُطابِق `expect` على القائمة بأكملها من كل نسخة مع عناصرها الخاصة:

```js
// يعثر myChromeBrowser على 3 رسائل، ويعثر myFirefoxBrowser على رسالتين
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // Chrome وحده لديه رسالة ثالثة
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

قبل الإصدار v10، كانت هذه تُرجع مصفوفة عادية ما لم يتم تعيين `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`. أصبحت المصفوفة الآن هي الإعداد الافتراضي وأُزيل متغير البيئة. لم يتغير الوصول عبر الفهرس، لذا فإن الشيفرة التي كانت تقرأ `elements[0]` فقط تستمر في العمل.

:::

### ما الذي تُرجعه mock() {#what-mock-returns}

في متصفح multi-remote، تُرجع `mock()` قيمة من نوع `MultiRemoteMock`. وهي ليست مصفوفة. تُنفَّذ `respond()` و`restore()` وغيرها من دوال الـ mock على كل نسخة. تبقى الطلبات الملتقطة على الـ mock الخاص بمتصفح واحد، لذا اقرأها باستخدام `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

يُشغّل `examples/bidi/multiremote-mock.js` هذا المثال على جلستي Chrome بدون واجهة (headless).

تتبع `instances` ترتيب إنشاء الـ mocks. بعد `select()`، قد يختلف هذا الترتيب عن `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // الـ mock الخاص بـ Chrome، أيًّا كان الترتيب
```

تُطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون `name` ضمن `instances`.

لعمل mock لمتصفح واحد فقط، استدعِ `mock()` على تلك النسخة:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## الوصول إلى نسخ المتصفح باستخدام النصوص عبر كائن browser
بالإضافة إلى الوصول إلى نسخة المتصفح عبر متغيراتها العامة (مثل `myChromeBrowser` و`myFirefoxBrowser`)، يمكنك أيضًا الوصول إليها عبر كائن `browser`، مثل `browser["myChromeBrowser"]` أو `browser["myFirefoxBrowser"]`. يمكنك الحصول على قائمة بجميع نسخك عبر `browser.instances`. هذا مفيد بشكل خاص عند كتابة خطوات اختبار قابلة لإعادة الاستخدام يمكن تنفيذها في أي من المتصفحين، على سبيل المثال:

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

ملف تعريف الخطوات:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## التحققات (Assertions)

تدعم مُطابِقات `expect` متصفحات وعناصر وmocks الـ multi-remote. افتراضيًا، يجب أن تطابق كل نسخة القيمة المتوقعة:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

لتوقّع قيمة مختلفة لكل نسخة، استخدم `expect.multiRemote()` مع قيمة واحدة لكل اسم نسخة:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

للاطلاع على جميع المُطابِقات المدعومة والإعدادات المطلوبة، راجع [دليل multi-remote في expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## الوصول إلى نسخة واحدة

أسماء النسخ ليست خصائص لمتصفح multi-remote أو لعنصر multi-remote. لا يتم تعيين `browser.myChromeBrowser` و`elem.myChromeDriver`. اطلب الجلسة باستخدام `getInstance`، أو قلّص كائن multi-remote باستخدام `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

لا يزال مُشغّل الاختبارات يعيّن اسم كل نسخة كمتغير عام خاص بها عندما يُترك `injectGlobals` مفعّلًا، بحيث يمكن للاختبار استدعاء `myChromeBrowser.$('button')` دون المرور عبر `browser`. هذا المتغير العام هو الجلسة المفردة نفسها التي تُرجعها `getInstance`، وليس حقلًا في كائن multi-remote.