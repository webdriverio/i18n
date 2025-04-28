---
id: mock
title: شیء Mock
---

شیء mock یک شیء است که نشان‌دهنده یک mock شبکه است و حاوی اطلاعاتی درباره درخواست‌هایی است که با `url` و `filterOptions` داده شده مطابقت داشته‌اند. این شیء را می‌توان با استفاده از دستور [`mock`](/docs/api/browser/mock) دریافت کرد.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از پروتکل Chrome DevTools است.
این پشتیبانی زمانی فراهم می‌شود که تست‌ها را به صورت محلی در مرورگر مبتنی بر Chromium اجرا کنید یا
از Selenium Grid نسخه 4 یا بالاتر استفاده کنید. این دستور __نمی‌تواند__ هنگام اجرای 
تست‌های خودکار در فضای ابری استفاده شود. اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

می‌توانید درباره mock کردن درخواست‌ها و پاسخ‌ها در WebdriverIO در راهنمای [Mocks and Spies](/docs/mocksandspies) ما بیشتر بخوانید.

## ویژگی‌ها

یک شیء mock شامل ویژگی‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `url` | `String` | آدرس URL که به دستور mock ارسال شده است |
| `filterOptions` | `Object` | گزینه‌های فیلتر منبع که به دستور mock ارسال شده است |
| `browser` | `Object` | [شیء مرورگر](/docs/api/browser) استفاده شده برای دریافت شیء mock. |
| `calls` | `Object[]` | اطلاعات درباره درخواست‌های مرورگر منطبق، شامل ویژگی‌هایی مانند `url`، `method`، `headers`، `initialPriority`، `referrerPolic`، `statusCode`، `responseHeaders` و `body` |

## متدها

اشیاء mock دستورات مختلفی را ارائه می‌دهند که در بخش `mock` فهرست شده‌اند و به کاربران امکان می‌دهند رفتار درخواست یا پاسخ را تغییر دهند.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## رویدادها

شیء mock یک EventEmitter است و چندین رویداد برای موارد استفاده شما منتشر می‌شود.

در اینجا فهرستی از رویدادها آمده است.

### `request`

این رویداد زمانی منتشر می‌شود که یک درخواست شبکه که با الگوهای mock مطابقت دارد، راه‌اندازی می‌شود. درخواست در callback رویداد ارسال می‌شود.

رابط درخواست:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

این رویداد زمانی منتشر می‌شود که پاسخ شبکه با [`respond`](/docs/api/mock/respond) یا [`respondOnce`](/docs/api/mock/respondOnce) بازنویسی می‌شود. پاسخ در callback رویداد ارسال می‌شود.

رابط پاسخ:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

این رویداد زمانی منتشر می‌شود که درخواست شبکه با [`abort`](/docs/api/mock/abort) یا [`abortOnce`](/docs/api/mock/abortOnce) لغو می‌شود. اطلاعات خطا در callback رویداد ارسال می‌شود.

رابط خطا:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

این رویداد زمانی منتشر می‌شود که یک مطابقت جدید اضافه می‌شود، قبل از `continue` یا `overwrite`. اطلاعات مطابقت در callback رویداد ارسال می‌شود.

رابط مطابقت:
```ts
interface MatchEvent {
    url: string // آدرس URL درخواست (بدون قطعه).
    urlFragment?: string // قطعه‌ای از URL درخواستی که با هش شروع می‌شود، اگر موجود باشد.
    method: string // روش درخواست HTTP.
    headers: Record<string, string> // سرایندهای درخواست HTTP.
    postData?: string // داده‌های درخواست HTTP POST.
    hasPostData?: boolean // هنگامی که درخواست دارای داده POST است، true خواهد بود.
    mixedContentType?: MixedContentType // نوع خروجی محتوای مخلوط درخواست.
    initialPriority: ResourcePriority // اولویت درخواست منبع در زمان ارسال درخواست.
    referrerPolicy: ReferrerPolicy // سیاست ارجاع‌دهنده درخواست، همانطور که در https://www.w3.org/TR/referrer-policy/ تعریف شده است.
    isLinkPreload?: boolean // آیا از طریق پیش‌بارگذاری پیوند بارگذاری می‌شود.
    body: string | Buffer | JsonCompatible // بدنه پاسخ منبع واقعی.
    responseHeaders: Record<string, string> // سرایندهای پاسخ HTTP.
    statusCode: number // کد وضعیت پاسخ HTTP.
    mockedResponse?: string | Buffer // اگر mock که رویداد را منتشر می‌کند، همچنین پاسخ آن را تغییر داده باشد.
}
```

### `continue`

این رویداد زمانی منتشر می‌شود که پاسخ شبکه نه بازنویسی شده و نه قطع شده باشد، یا اگر پاسخ قبلاً توسط یک mock دیگر ارسال شده باشد. `requestId` در callback رویداد ارسال می‌شود.

## مثال‌ها

دریافت تعداد درخواست‌های در انتظار:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // مهم است که همه درخواست‌ها را مطابقت دهید، در غیر این صورت، مقدار نتیجه می‌تواند بسیار گیج‌کننده باشد.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

پرتاب خطا در صورت شکست شبکه با کد 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // انتظار در اینجا، زیرا برخی درخواست‌ها ممکن است هنوز در انتظار باشند
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

تعیین اینکه آیا مقدار پاسخ mock استفاده شده است:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // برای اولین درخواست به '**/foo/**' فعال می‌شود
}).on('continue', () => {
    // برای بقیه درخواست‌ها به '**/foo/**' فعال می‌شود
})

secondMock.on('continue', () => {
    // برای اولین درخواست به '**/foo/bar/**' فعال می‌شود
}).on('overwrite', () => {
    // برای بقیه درخواست‌ها به '**/foo/bar/**' فعال می‌شود
})
```

در این مثال، `firstMock` ابتدا تعریف شده و یک فراخوانی `respondOnce` دارد، بنابراین مقدار پاسخ `secondMock` برای اولین درخواست استفاده نمی‌شود، اما برای بقیه درخواست‌ها استفاده خواهد شد.