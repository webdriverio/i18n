---
id: mock
title: شیء ماک (Mock)
---

شیء ماک یک شیء است که نماینده یک ماک شبکه است و حاوی اطلاعاتی درباره درخواست‌هایی است که با `url` و `filterOptions` مشخص شده مطابقت دارند. این شیء را می‌توان با استفاده از دستور [`mock`](/docs/api/browser/mock) دریافت کرد.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از پروتکل Chrome DevTools است.
این پشتیبانی زمانی فراهم می‌شود که تست‌ها را به صورت محلی در مرورگر مبتنی بر Chromium اجرا کنید یا از
Selenium Grid نسخه 4 یا بالاتر استفاده کنید. این دستور __نمی‌تواند__ هنگام اجرای
تست‌های خودکار در فضای ابری استفاده شود. اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

شما می‌توانید درباره ماک کردن درخواست‌ها و پاسخ‌ها در WebdriverIO در راهنمای [Mocks and Spies](/docs/mocksandspies) ما بیشتر بخوانید.

## ویژگی‌ها

یک شیء ماک دارای ویژگی‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `url` | `String` | آدرس URL که به دستور mock ارسال شده است |
| `filterOptions` | `Object` | گزینه‌های فیلتر منابع که به دستور mock ارسال شده‌اند |
| `browser` | `Object` | [شیء مرورگر](/docs/api/browser) استفاده شده برای دریافت شیء mock |
| `calls` | `Object[]` | اطلاعاتی درباره درخواست‌های مرورگر منطبق، شامل ویژگی‌هایی مانند `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` و `body` |

## متدها

اشیاء ماک دستورات مختلفی را ارائه می‌دهند که در بخش `mock` لیست شده‌اند و به کاربران امکان می‌دهند رفتار درخواست یا پاسخ را تغییر دهند.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## رویدادها

شیء ماک یک EventEmitter است و چندین رویداد برای موارد استفاده شما منتشر می‌شود.

در اینجا فهرستی از رویدادها آمده است.

### `request`

این رویداد هنگام راه‌اندازی یک درخواست شبکه که با الگوهای ماک مطابقت دارد، منتشر می‌شود. درخواست در callback رویداد ارسال می‌شود.

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

این رویداد هنگامی که پاسخ شبکه با [`respond`](/docs/api/mock/respond) یا [`respondOnce`](/docs/api/mock/respondOnce) بازنویسی می‌شود، منتشر می‌شود. پاسخ در callback رویداد ارسال می‌شود.

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

این رویداد زمانی منتشر می‌شود که درخواست شبکه با [`abort`](/docs/api/mock/abort) یا [`abortOnce`](/docs/api/mock/abortOnce) لغو شود. شکست در callback رویداد ارسال می‌شود.

رابط شکست:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

این رویداد زمانی منتشر می‌شود که یک تطابق جدید اضافه می‌شود، قبل از `continue` یا `overwrite`. تطابق در callback رویداد ارسال می‌شود.

رابط تطابق:
```ts
interface MatchEvent {
    url: string // URL درخواست (بدون fragment).
    urlFragment?: string // قطعه‌ای از URL درخواست شده که با هش شروع می‌شود، اگر وجود داشته باشد.
    method: string // متد درخواست HTTP.
    headers: Record<string, string> // هدرهای درخواست HTTP.
    postData?: string // داده‌های درخواست HTTP POST.
    hasPostData?: boolean // هنگامی که درخواست دارای داده POST است، مقدار true می‌شود.
    mixedContentType?: MixedContentType // نوع export محتوای ترکیبی درخواست.
    initialPriority: ResourcePriority // اولویت درخواست منبع در زمان ارسال درخواست.
    referrerPolicy: ReferrerPolicy // سیاست ارجاع درخواست، همانطور که در https://www.w3.org/TR/referrer-policy/ تعریف شده است.
    isLinkPreload?: boolean // آیا از طریق link preload بارگیری می‌شود.
    body: string | Buffer | JsonCompatible // پاسخ بدنه منبع واقعی.
    responseHeaders: Record<string, string> // هدرهای پاسخ HTTP.
    statusCode: number // کد وضعیت پاسخ HTTP.
    mockedResponse?: string | Buffer // اگر ماک، منتشرکننده رویداد، همچنین پاسخ خود را اصلاح کرده باشد.
}
```

### `continue`

این رویداد زمانی منتشر می‌شود که پاسخ شبکه نه بازنویسی و نه قطع شده باشد، یا اگر پاسخ قبلاً توسط ماک دیگری ارسال شده باشد. `requestId` در callback رویداد ارسال می‌شود.

## مثال‌ها

دریافت تعداد درخواست‌های در انتظار:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // مهم است که تمام درخواست‌ها را مطابقت دهید، در غیر این صورت، مقدار حاصل می‌تواند بسیار گیج‌کننده باشد.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

پرتاب خطا در خرابی شبکه 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // در اینجا منتظر می‌ماند، زیرا برخی درخواست‌ها ممکن است هنوز در انتظار باشند
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

تعیین اینکه آیا مقدار پاسخ ماک استفاده شده است:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // برای اولین درخواست به '**/foo/**' فعال می‌شود
}).on('continue', () => {
    // برای سایر درخواست‌ها به '**/foo/**' فعال می‌شود
})

secondMock.on('continue', () => {
    // برای اولین درخواست به '**/foo/bar/**' فعال می‌شود
}).on('overwrite', () => {
    // برای سایر درخواست‌ها به '**/foo/bar/**' فعال می‌شود
})
```

در این مثال، `firstMock` ابتدا تعریف شده و یک فراخوانی `respondOnce` دارد، بنابراین مقدار پاسخ `secondMock` برای اولین درخواست استفاده نخواهد شد، اما برای بقیه آنها استفاده خواهد شد.