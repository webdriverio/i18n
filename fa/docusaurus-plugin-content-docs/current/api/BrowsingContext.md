---
id: browsingContext
title: شیء BrowsingContext
description: یک تب، پنجره یا فریم را به‌عنوان یک شیء نگه دارید و دستورات را مستقیماً در آن اجرا کنید، بدون اینکه نشست را به آن سوئیچ کنید.
---

یک browsing context (زمینهٔ مرور) یک تب، پنجره یا فریم است که آن را به‌عنوان یک شیء در اختیار دارید. دستوراتی که روی آن فراخوانی می‌کنید در همان تب یا فریم اجرا می‌شوند، در حالی که نشست و همهٔ contextهای دیگر در جای خود باقی می‌مانند. از نسخهٔ v10، WebdriverIO در یک نشست WebDriver BiDi به این شکل با تب‌ها، پنجره‌ها و فریم‌ها کار می‌کند و در آنجا جایگزین `switchWindow()` و `switchFrame()` می‌شود.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## دریافت یک browsing context

| فراخوانی | خروجی |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | نخستین context سطح بالای نشست، پس از پیمایش آن. `browser.url()` همیشه همین context را پیمایش می‌کند. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | یک تب جدید (`type: 'tab'`) یا پنجرهٔ جدید، پس از بارگذاری صفحهٔ آن. نشست به آن سوئیچ نمی‌کند. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | همهٔ contextهای سطح بالای باز (تب‌ها و پنجره‌ها، نه فریم‌ها)، برای مثال تبی که خود صفحه باز کرده است. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | یک فریم از یک context، از جمله فریم‌های cross-origin و تودرتو. |

شیء را نگه دارید و دستورات را روی آن فراخوانی کنید. هیچ تب یا فریم «جاری» وجود ندارد که لازم باشد بین آن‌ها سوئیچ کنید، بنابراین contextها را می‌توان به‌صورت موازی نیز به کار برد:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## نشست‌های WebDriver BiDi و Classic

browsing contextها به یک نشست WebDriver BiDi نیاز دارند که از نسخهٔ v10 برای Chrome، Edge و Firefox پیش‌فرض است. در یک نشست WebDriver Classic، برای مثال با Appium یا Safari، تنها context جاری نشست وجود دارد. در آنجا:

- `browser.url()` یک جایگزین برای مرورگر برمی‌گرداند. دستوراتی مانند `$`، `execute` یا `getTitle` روی مرورگر اجرا می‌شوند، `url`، `isFrame` و `parent` صفحهٔ جاری را توصیف می‌کنند و `contextId` برابر `undefined` است.
- `frame()`، `navigate()` و `activate()` رد (reject) می‌شوند و دستور Classic جایگزین را نام می‌برند: [`browser.switchFrame()`](/docs/api/browser/switchFrame)، [`browser.url()`](/docs/api/browser/url) یا [`browser.switchWindow()`](/docs/api/browser/switchWindow).

وقتی یک کد واحد در هر دو نوع نشست اجرا می‌شود، `browser.isBidi` را بررسی کنید.

## ویژگی‌ها

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `contextId` | `String` | شناسهٔ browsing context در WebDriver BiDi. در نشست Classic برابر `undefined` است. |
| `url` | `String` | URLی که context آخرین بار با `browser.url()`، `navigate()` یا `newWindow()` به آن پیمایش شده است. پیمایش‌هایی که خود صفحه انجام می‌دهد (لینک‌ها، `location`، `history.pushState`) تنها پس از [`getUrl()`](/docs/api/browsingContext/getUrl) نمایش داده می‌شوند. |
| `isFrame` | `Boolean` | برای فریم `true` و برای تب یا پنجره `false` است. |
| `parent` | `BrowsingContext \| undefined` | برای یک فریم، contextی که `frame()` روی آن فراخوانی شده است (یا فریم میانی، برای فریمی که عمیق‌تر تودرتو است). برای تب یا پنجره برابر `undefined` است. |
| `browser` | `Browser` | [شیء browser](/docs/api/browser) نشست. |
| `request` | `Request \| undefined` | اطلاعات بارگذاری آخرین پیمایش از طریق `browser.url()` یا `navigate()`: URL، هدرها، پاسخ، ریدایرکت‌ها و درخواست‌هایی که صفحه ارسال کرده است. |
| `sessionId` | `String` | شناسهٔ نشست، همانند `browser.sessionId`. |
| `capabilities` | `Object` | قابلیت‌های نشست، همانند `browser.capabilities`. |
| `options` | `Object` | گزینه‌های WebdriverIO، همانند `browser.options`. |
| `isBidi` | `Boolean` | آیا نشست از WebDriver BiDi استفاده می‌کند. |
| `isMobile` | `Boolean` | آیا نشست یک دستگاه موبایل را خودکارسازی می‌کند. |

## متدها

### دستورات یک browsing context

این دستورات روی contextی عمل می‌کنند که روی آن فراخوانی شده‌اند. هر کدام صفحهٔ مرجع مخصوص به خود را دارد.

| دستور | جزئیات |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | یک فریم از این context را به‌عنوان یک browsing context مستقل دریافت می‌کند. |
| [`navigate`](/docs/api/browsingContext/navigate) | این context را با همان گزینه‌های `browser.url()` پیمایش می‌کند. |
| [`refresh`](/docs/api/browsingContext/refresh) | این context را دوباره بارگذاری می‌کند. یک فریم تنها سند خودش را دوباره بارگذاری می‌کند. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | در تاریخچهٔ این تب یا پنجره جابه‌جا می‌شود. |
| [`activate`](/docs/api/browsingContext/activate) | این تب یا پنجره را به جلو می‌آورد. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | این تب یا پنجره را می‌بندد. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | عنوان یا URL سندی را که در این context نمایش داده می‌شود می‌خواند. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | به پیام کاربری (user prompt) باز در این context پاسخ می‌دهد یا آن را می‌خواند. |

### دستورات مرورگر که در یک context اجرا می‌شوند

این‌ها همان [دستورات مرورگر](/docs/api/browser) هم‌نام هستند که به‌جای نخستین context نشست، روی این context اعمال می‌شوند. آن‌ها همان آرگومان‌ها را می‌پذیرند.

| دستور | در یک browsing context |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | عناصر را در سند این context پیدا می‌کند. |
| [`execute`](/docs/api/browser/execute) | یک اسکریپت را در سند این context اجرا می‌کند. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | ورودی را به این context ارسال می‌کند، حتی وقتی یک تب پس‌زمینه باشد. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | از این context تصویر می‌گیرد. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | کوکی‌های پارتیشن ذخیره‌سازی این context را می‌خواند و تغییر می‌دهد. |
| [`setViewport`](/docs/api/browser/setViewport) | اندازهٔ viewport این تب یا پنجره را تغییر می‌دهد. |
| [`addInitScript`](/docs/api/browser/addInitScript) | یک اسکریپت را پیش از اسکریپت‌های صفحه، تنها در این تب یا پنجره اجرا می‌کند. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | تنها درخواست‌های این تب یا پنجره را mock می‌کند. یک mock با بسته شدن تب آن پایان می‌یابد. |
| [`emulate`](/docs/api/browser/emulate) | یک ویژگی دستگاه، برای مثال موقعیت جغرافیایی یا ساعت، را تنها در این تب یا پنجره شبیه‌سازی می‌کند. |
| [`restore`](/docs/api/browser/restore) | شبیه‌سازی‌ها را بازیابی می‌کند، همانند `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | همانند رفتار روی مرورگر. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // درخواست‌های `tab` پاسخ mock‌شده را دریافت می‌کنند، درخواست‌های `page` به سرور می‌رسند
})
```

### فقط سطح بالا

یک فریم تاریخچه، viewport، شبکه و شبیه‌سازی تب خود را به اشتراک می‌گذارد، بنابراین این دستورات روی یک فریم با خطای `` `<command>` is only available on a top-level browsing context `` رد می‌شوند. آن‌ها را روی تب فراخوانی کنید: `frame.parent` را دنبال کنید تا زمانی که `parent` برابر `undefined` شود، یا از contextی استفاده کنید که `frame()` را روی آن فراخوانی کرده‌اید.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### در دسترس نبودن روی browsing context

دستورات نشست، مانند `deleteSession`، `newWindow` یا `browsingContexts`، تنها روی [شیء browser](/docs/api/browser) وجود دارند. دستورات سفارشی نیز همین‌طور هستند: [`addCommand`](/docs/customcommands) و `overwriteCommand` روی یک context رد می‌شوند؛ آن‌ها را روی `browser` ثبت کنید.

### رویدادها

`on`، `once`، `off`، `emit`، `removeListener` و `removeAllListeners` شنونده‌ها را روی مرورگر ثبت می‌کنند، بنابراین رویدادها مربوط به کل نشست هستند. برای مثال، یک رویداد [`dialog`](/docs/api/dialog) برای یک پیام در هر تب یا فریمی رخ می‌دهد.

## عناصر یک browsing context

عنصری که از طریق یک context دریافت می‌کنید به همان context تعلق دارد. دستورات عنصر مانند `click`، `setValue` یا `getText` در سند همان context اجرا می‌شوند، حتی وقتی یک تب پس‌زمینه یا یک فریم باشد. این دستورات مانند درایورها از مشخصات WebDriver پیروی می‌کنند، بنابراین همان نتایج و همان خطاها (برای مثال `element click intercepted`) را برمی‌گردانند که برای عنصری از صفحهٔ جلویی برمی‌گردانند. `getComputedRole` و `getComputedLabel` برای عنصری از contextی غیر از نخستین context نشست رد می‌شوند.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // خروجی: "BOTTOM"
```

## عیب‌یابی

| خطا | علت و راه‌حل |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | [`frame()`](/docs/api/browsingContext/frame) را روی contextی که `browser.url()` یا `browser.newWindow()` برگردانده است فراخوانی کنید. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | contextی را که `browser.url()` یا `browser.newWindow()` برگردانده است نگه دارید، یا با `browser.browsingContexts()` یکی پیدا کنید. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | نشست از نوع Classic است (برای مثال Appium یا Safari). از دستور Classic که در پیام نام برده شده استفاده کنید. |
| `` `<command>` is only available on a top-level browsing context `` | دستور روی یک فریم فراخوانی شده است. آن را روی تب فریم فراخوانی کنید؛ [فقط سطح بالا](#top-level-only) را ببینید. |
| `` `addCommand` is only available on the browser, not on a browsing context `` | دستورات سفارشی را روی `browser` ثبت کنید. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | صفحه‌ای که فریم را در بر داشت به صفحهٔ دیگری پیمایش کرده است. فریم را دوباره با `frame()` روی صفحهٔ جدید دریافت کنید. |

## مطالب مرتبط

- [شیء Browser](/docs/api/browser)
- [مهاجرت به v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [دیالوگ‌ها](/docs/api/dialog)