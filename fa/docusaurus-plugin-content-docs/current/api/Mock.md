---
id: mock
title: شیء Mock
---

شیء mock شیئی است که یک mock شبکه را نمایندگی می‌کند و حاوی اطلاعاتی درباره درخواست‌هایی است که با `url` و `filterOptions` داده‌شده مطابقت داشته‌اند. این شیء را می‌توان با استفاده از دستور [`mock`](/docs/api/browser/mock) دریافت کرد.

:::info

توجه داشته باشید که استفاده از دستور `mock` نیازمند پشتیبانی از پروتکل Chrome DevTools است.
این پشتیبانی در صورتی فراهم است که تست‌ها را به‌صورت محلی در مرورگری مبتنی بر Chromium اجرا کنید یا
از Selenium Grid نسخه 4 یا بالاتر استفاده کنید. این دستور __نمی‌تواند__ هنگام اجرای
تست‌های خودکار در فضای ابری استفاده شود. اطلاعات بیشتر را در بخش [پروتکل‌های اتوماسیون](/docs/automationProtocols) بیابید.

:::

می‌توانید درباره mock کردن درخواست‌ها و پاسخ‌ها در WebdriverIO در راهنمای [Mockها و Spyها](/docs/mocksandspies) بیشتر بخوانید.

## Multi-remote

در یک مرورگر [multi-remote](/docs/multiremote)، دستور [`browser.mock()`](/docs/api/browser/mock) به جای این شیء، یک `MultiRemoteMock` برمی‌گرداند. `instances` نام مرورگرها را فهرست می‌کند و `getInstance(name)` شیء `Mock` مربوط به آن مرورگر را برمی‌گرداند. `respond()`، `restore()` و سایر متدهای زیر روی همه نمونه‌ها اجرا می‌شوند. `calls` روی mock هر نمونه باقی می‌ماند: `mock.getInstance('myChromeBrowser').calls`.

اگر `name` یکی از `instances` نباشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند.

## ویژگی‌ها

یک شیء mock حاوی ویژگی‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `url` | `String` | url ارسال‌شده به دستور mock |
| `filterOptions` | `Object` | گزینه‌های فیلتر منبع ارسال‌شده به دستور mock |
| `browser` | `Object` | [شیء Browser](/docs/api/browser) که برای دریافت شیء mock استفاده شده است. |
| `calls` | `Object[]` | اطلاعات درباره درخواست‌های مطابق مرورگر، شامل ویژگی‌هایی مانند `url`، `method`، `headers`، `initialPriority`، `referrerPolic`، `statusCode`، `responseHeaders` و `body` |

## متدها

اشیای mock دستورات مختلفی را ارائه می‌دهند که در بخش `mock` فهرست شده‌اند و به کاربران اجازه می‌دهند رفتار درخواست یا پاسخ را تغییر دهند.

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

شیء mock یک EventEmitter است و چند رویداد برای موارد استفاده شما منتشر می‌شود.

در اینجا فهرستی از رویدادها آمده است.

### `request`

این رویداد هنگام آغاز یک درخواست شبکه که با الگوهای mock مطابقت دارد منتشر می‌شود. درخواست در callback رویداد ارسال می‌شود.

رابط Request:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

این رویداد زمانی منتشر می‌شود که پاسخ شبکه با [`respond`](/docs/api/mock/respond) یا [`respondOnce`](/docs/api/mock/respondOnce) بازنویسی شود. پاسخ در callback رویداد ارسال می‌شود.

رابط Response:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

این رویداد زمانی منتشر می‌شود که درخواست شبکه با [`abort`](/docs/api/mock/abort) یا [`abortOnce`](/docs/api/mock/abortOnce) لغو شود. Fail در callback رویداد ارسال می‌شود.

رابط Fail:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

این رویداد زمانی منتشر می‌شود که یک تطابق جدید اضافه شود، پیش از `continue` یا `overwrite`. Match در callback رویداد ارسال می‌شود.

رابط Match:
```ts
interface MatchEvent {
    url: string // URL درخواست (بدون fragment).
    urlFragment?: string // بخش fragment از URL درخواستی که با hash شروع می‌شود، در صورت وجود.
    method: string // متد درخواست HTTP.
    headers: Record<string, string> // هدرهای درخواست HTTP.
    postData?: string // داده‌های درخواست HTTP POST.
    hasPostData?: boolean // زمانی true است که درخواست دارای داده POST باشد.
    mixedContentType?: MixedContentType // نوع محتوای ترکیبی (mixed content) درخواست.
    initialPriority: ResourcePriority // اولویت درخواست منبع در زمان ارسال درخواست.
    referrerPolicy: ReferrerPolicy // سیاست referrer درخواست، همان‌طور که در https://www.w3.org/TR/referrer-policy/ تعریف شده است
    isLinkPreload?: boolean // اینکه آیا از طریق link preload بارگذاری شده است.
    body: string | Buffer | JsonCompatible // بدنه پاسخ منبع واقعی.
    responseHeaders: Record<string, string> // هدرهای پاسخ HTTP.
    statusCode: number // کد وضعیت پاسخ HTTP.
    mockedResponse?: string | Buffer // اگر mock منتشرکننده رویداد، پاسخ آن را نیز تغییر داده باشد.
}
```

### `continue`

این رویداد زمانی منتشر می‌شود که پاسخ شبکه نه بازنویسی شده و نه قطع شده باشد، یا اگر پاسخ قبلاً توسط mock دیگری ارسال شده باشد. `requestId` در callback رویداد ارسال می‌شود.

## مثال‌ها

دریافت تعداد درخواست‌های در انتظار:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // مهم است که همه درخواست‌ها را مطابقت دهید، در غیر این صورت مقدار حاصل می‌تواند بسیار گیج‌کننده باشد.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

پرتاب خطا هنگام شکست شبکه با کد 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // اینجا منتظر می‌مانیم، زیرا برخی درخواست‌ها ممکن است هنوز در انتظار باشند
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

تشخیص اینکه آیا مقدار respond در mock استفاده شده است یا خیر:

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

در این مثال، `firstMock` ابتدا تعریف شده و یک فراخوانی `respondOnce` دارد، بنابراین مقدار پاسخ `secondMock` برای اولین درخواست استفاده نخواهد شد، اما برای بقیه درخواست‌ها استفاده خواهد شد.