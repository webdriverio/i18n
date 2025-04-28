---
id: mock
title: كائن المحاكاة
---

كائن المحاكاة هو كائن يمثل محاكاة شبكية ويحتوي على معلومات حول الطلبات التي تطابق `url` و`filterOptions` المعطاة. يمكن الحصول عليه باستخدام أمر [`mock`](/docs/api/browser/mock).

:::info

لاحظ أن استخدام أمر `mock` يتطلب دعماً لبروتوكول Chrome DevTools.
يتوفر هذا الدعم إذا كنت تقوم بتشغيل الاختبارات محلياً في متصفح يعتمد على Chromium أو إذا
كنت تستخدم Selenium Grid الإصدار 4 أو أعلى. لا يمكن استخدام هذا الأمر عند تشغيل
الاختبارات الآلية في السحابة. اكتشف المزيد في قسم [بروتوكولات الأتمتة](/docs/automationProtocols).

:::

يمكنك قراءة المزيد عن محاكاة الطلبات والاستجابات في WebdriverIO في دليل [المحاكاة والتجسس](/docs/mocksandspies) الخاص بنا.

## الخصائص

يحتوي كائن المحاكاة على الخصائص التالية:

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `url` | `String` | عنوان URL الذي تم تمريره إلى أمر المحاكاة |
| `filterOptions` | `Object` | خيارات تصفية الموارد التي تم تمريرها إلى أمر المحاكاة |
| `browser` | `Object` | [كائن المتصفح](/docs/api/browser) المستخدم للحصول على كائن المحاكاة. |
| `calls` | `Object[]` | معلومات حول طلبات المتصفح المطابقة، وتحتوي على خصائص مثل `url` و `method` و `headers` و `initialPriority` و `referrerPolic` و `statusCode` و `responseHeaders` و `body` |

## الطرق

توفر كائنات المحاكاة أوامر متنوعة، مدرجة في قسم `mock`، تسمح للمستخدمين بتعديل سلوك الطلب أو الاستجابة.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## الأحداث

كائن المحاكاة هو مرسل أحداث (EventEmitter) ويتم إرسال عدة أحداث لحالات الاستخدام الخاصة بك.

فيما يلي قائمة بالأحداث.

### `request`

يتم إرسال هذا الحدث عند إطلاق طلب شبكة يطابق أنماط المحاكاة. يتم تمرير الطلب في استدعاء الحدث.

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

يتم إرسال هذا الحدث عندما يتم استبدال استجابة الشبكة باستخدام [`respond`](/docs/api/mock/respond) أو [`respondOnce`](/docs/api/mock/respondOnce). يتم تمرير الاستجابة في استدعاء الحدث.

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

يتم إرسال هذا الحدث عندما يتم إحباط طلب الشبكة باستخدام [`abort`](/docs/api/mock/abort) أو [`abortOnce`](/docs/api/mock/abortOnce). يتم تمرير الفشل في استدعاء الحدث.

واجهة الفشل:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

يتم إرسال هذا الحدث عند إضافة تطابق جديد، قبل `continue` أو `overwrite`. يتم تمرير التطابق في استدعاء الحدث.

واجهة التطابق:
```ts
interface MatchEvent {
    url: string // عنوان URL للطلب (بدون الأجزاء).
    urlFragment?: string // جزء من عنوان URL المطلوب يبدأ بعلامة التجزئة، إذا كان موجودًا.
    method: string // طريقة طلب HTTP.
    headers: Record<string, string> // رؤوس طلب HTTP.
    postData?: string // بيانات طلب HTTP POST.
    hasPostData?: boolean // صحيح عندما يكون للطلب بيانات POST.
    mixedContentType?: MixedContentType // نوع تصدير المحتوى المختلط للطلب.
    initialPriority: ResourcePriority // أولوية طلب المورد في وقت إرسال الطلب.
    referrerPolicy: ReferrerPolicy // سياسة المرجع للطلب، كما هو محدد في https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // ما إذا كان يتم تحميله عبر preload الرابط.
    body: string | Buffer | JsonCompatible // استجابة الجسم للمورد الفعلي.
    responseHeaders: Record<string, string> // رؤوس استجابة HTTP.
    statusCode: number // رمز حالة استجابة HTTP.
    mockedResponse?: string | Buffer // إذا كانت المحاكاة، المرسلة للحدث، قد عدلت أيضًا استجابتها.
}
```

### `continue`

يتم إرسال هذا الحدث عندما لا يتم استبدال استجابة الشبكة ولا مقاطعتها، أو إذا كانت الاستجابة قد أرسلت بالفعل بواسطة محاكاة أخرى. يتم تمرير `requestId` في استدعاء الحدث.

## أمثلة

الحصول على عدد الطلبات المعلقة:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // من المهم مطابقة جميع الطلبات وإلا ستكون القيمة الناتجة مربكة للغاية.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

إلقاء خطأ عند فشل شبكة 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // انتظار هنا، لأن بعض الطلبات قد تكون لا تزال معلقة
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

تحديد ما إذا كانت قيمة استجابة المحاكاة قد تم استخدامها:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // يتم تنشيطه للطلب الأول إلى '**/foo/**'
}).on('continue', () => {
    // يتم تنشيطه لبقية الطلبات إلى '**/foo/**'
})

secondMock.on('continue', () => {
    // يتم تنشيطه للطلب الأول إلى '**/foo/bar/**'
}).on('overwrite', () => {
    // يتم تنشيطه لبقية الطلبات إلى '**/foo/bar/**'
})
```

في هذا المثال، تم تعريف `firstMock` أولاً ولديه استدعاء واحد لـ `respondOnce`، لذلك لن يتم استخدام قيمة استجابة `secondMock` للطلب الأول، ولكن سيتم استخدامها لبقية الطلبات.