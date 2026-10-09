---
id: mock
title: كائن المحاكاة (Mock)
---

كائن المحاكاة هو كائن يمثل محاكاة للشبكة ويحتوي على معلومات حول الطلبات التي تطابق `url` و `filterOptions` المحددة. يمكن الحصول عليه باستخدام الأمر [`mock`](/docs/api/browser/mock).

:::info

لاحظ أن استخدام الأمر `mock` يتطلب دعم بروتوكول Chrome DevTools.
يتوفر هذا الدعم إذا كنت تشغل الاختبارات محليًا في متصفح قائم على Chromium أو إذا
كنت تستخدم Selenium Grid الإصدار 4 أو أعلى. __لا__ يمكن استخدام هذا الأمر عند تشغيل
الاختبارات الآلية في السحابة. اكتشف المزيد في قسم [بروتوكولات الأتمتة](/docs/automationProtocols).

:::

يمكنك قراءة المزيد حول محاكاة الطلبات والاستجابات في WebdriverIO في دليل [المحاكاة والتجسس](/docs/mocksandspies) الخاص بنا.

## التحكم المتعدد عن بُعد (Multi-remote)

في متصفح [multi-remote](/docs/multiremote)، يُرجع [`browser.mock()`](/docs/api/browser/mock) كائن `MultiRemoteMock` بدلاً من هذا الكائن. تسرد `instances` أسماء المتصفحات، ويُرجع `getInstance(name)` كائن `Mock` الخاص بذلك المتصفح. يتم تنفيذ `respond()` و `restore()` والطرق الأخرى أدناه على كل نسخة. تبقى `calls` على كائن المحاكاة الخاص بكل نسخة: `mock.getInstance('myChromeBrowser').calls`.

يُطلق `getInstance` الخطأ `Multi-remote object has no instance named "<name>"` عندما لا يكون `name` أحد عناصر `instances`.

## الخصائص

يحتوي كائن المحاكاة على الخصائص التالية:

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `url` | `String` | عنوان URL الذي تم تمريره إلى أمر المحاكاة |
| `filterOptions` | `Object` | خيارات تصفية الموارد التي تم تمريرها إلى أمر المحاكاة |
| `browser` | `Object` | [كائن المتصفح](/docs/api/browser) المستخدم للحصول على كائن المحاكاة. |
| `calls` | `Object[]` | معلومات حول طلبات المتصفح المطابقة، تحتوي على خصائص مثل `url` و `method` و `headers` و `initialPriority` و `referrerPolic` و `statusCode` و `responseHeaders` و `body` |

## الطرق

توفر كائنات المحاكاة أوامر متنوعة، مدرجة في قسم `mock`، تتيح للمستخدمين تعديل سلوك الطلب أو الاستجابة.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## الأحداث

كائن المحاكاة هو EventEmitter ويتم إطلاق عدد من الأحداث لحالات الاستخدام الخاصة بك.

إليك قائمة بالأحداث.

### `request`

يتم إطلاق هذا الحدث عند بدء طلب شبكة يطابق أنماط المحاكاة. يتم تمرير الطلب في دالة رد النداء الخاصة بالحدث.

واجهة الطلب:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

يتم إطلاق هذا الحدث عند استبدال استجابة الشبكة باستخدام [`respond`](/docs/api/mock/respond) أو [`respondOnce`](/docs/api/mock/respondOnce). يتم تمرير الاستجابة في دالة رد النداء الخاصة بالحدث.

واجهة الاستجابة:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

يتم إطلاق هذا الحدث عند إلغاء طلب الشبكة باستخدام [`abort`](/docs/api/mock/abort) أو [`abortOnce`](/docs/api/mock/abortOnce). يتم تمرير الفشل في دالة رد النداء الخاصة بالحدث.

واجهة الفشل:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

يتم إطلاق هذا الحدث عند إضافة تطابق جديد، قبل `continue` أو `overwrite`. يتم تمرير التطابق في دالة رد النداء الخاصة بالحدث.

واجهة التطابق:
```ts
interface MatchEvent {
    url: string // عنوان URL للطلب (بدون الجزء).
    urlFragment?: string // جزء عنوان URL المطلوب بدءًا من علامة #، إن وجد.
    method: string // طريقة طلب HTTP.
    headers: Record<string, string> // ترويسات طلب HTTP.
    postData?: string // بيانات طلب HTTP POST.
    hasPostData?: boolean // تكون True عندما يحتوي الطلب على بيانات POST.
    mixedContentType?: MixedContentType // نوع المحتوى المختلط للطلب.
    initialPriority: ResourcePriority // أولوية طلب المورد في وقت إرسال الطلب.
    referrerPolicy: ReferrerPolicy // سياسة المُحيل للطلب، كما هو محدد في https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // ما إذا كان يتم التحميل عبر link preload.
    body: string | Buffer | JsonCompatible // محتوى استجابة المورد الفعلي.
    responseHeaders: Record<string, string> // ترويسات استجابة HTTP.
    statusCode: number // رمز حالة استجابة HTTP.
    mockedResponse?: string | Buffer // إذا كانت المحاكاة التي أطلقت الحدث قد عدّلت استجابته أيضًا.
}
```

### `continue`

يتم إطلاق هذا الحدث عندما لا تكون استجابة الشبكة قد تم استبدالها أو مقاطعتها، أو إذا كانت الاستجابة قد أُرسلت بالفعل بواسطة محاكاة أخرى. يتم تمرير `requestId` في دالة رد النداء الخاصة بالحدث.

## أمثلة

الحصول على عدد الطلبات المعلقة:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // من المهم مطابقة جميع الطلبات، وإلا فقد تكون القيمة الناتجة مربكة للغاية.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

إطلاق خطأ عند فشل الشبكة بالرمز 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // الانتظار هنا، لأن بعض الطلبات قد تظل معلقة
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

تحديد ما إذا تم استخدام قيمة استجابة المحاكاة:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // يُطلق للطلب الأول إلى '**/foo/**'
}).on('continue', () => {
    // يُطلق لبقية الطلبات إلى '**/foo/**'
})

secondMock.on('continue', () => {
    // يُطلق للطلب الأول إلى '**/foo/bar/**'
}).on('overwrite', () => {
    // يُطلق لبقية الطلبات إلى '**/foo/bar/**'
})
```

في هذا المثال، تم تعريف `firstMock` أولاً ولديه استدعاء واحد لـ `respondOnce`، لذلك لن يتم استخدام قيمة استجابة `secondMock` للطلب الأول، ولكن سيتم استخدامها لبقية الطلبات.