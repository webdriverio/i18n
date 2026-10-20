---
id: timeouts
title: زمان‌های انتظار (Timeouts)
description: "پیکربندی زمان‌های انتظار نشست WebDriver، زمان‌های انتظار waitfor در WebdriverIO و زمان‌های انتظار فریم‌ورک تست برای حفظ پایداری تست‌ها."
---

هر دستور در WebdriverIO یک عملیات ناهمگام (asynchronous) است. یک درخواست به سرور Selenium (یا یک سرویس ابری مانند [Sauce Labs](https://saucelabs.com)) ارسال می‌شود و پاسخ آن پس از تکمیل یا شکست عملیات، حاوی نتیجه است.

بنابراین، زمان یک جزء حیاتی در کل فرآیند تست است. وقتی یک عملیات خاص به وضعیت عملیات دیگری وابسته است، باید مطمئن شوید که آن‌ها به ترتیب درست اجرا می‌شوند. زمان‌های انتظار نقش مهمی در رسیدگی به این مسائل ایفا می‌کنند.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## زمان‌های انتظار WebDriver

### زمان انتظار اسکریپت نشست (Session Script Timeout)

هر نشست دارای یک زمان انتظار اسکریپت مرتبط است که مدت زمان انتظار برای اجرای اسکریپت‌های ناهمگام را مشخص می‌کند. مگر اینکه خلاف آن ذکر شده باشد، این مقدار ۳۰ ثانیه است. می‌توانید این زمان انتظار را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### زمان انتظار بارگذاری صفحه نشست (Session Page Load Timeout)

هر نشست دارای یک زمان انتظار بارگذاری صفحه مرتبط است که مدت زمان انتظار برای تکمیل بارگذاری صفحه را مشخص می‌کند. مگر اینکه خلاف آن ذکر شده باشد، این مقدار ۳۰۰,۰۰۰ میلی‌ثانیه است.

می‌توانید این زمان انتظار را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` نام [زمان انتظار](https://www.w3.org/TR/webdriver/#set-timeouts) در WebDriver است. WebdriverIO v10 فقط همین کلید را می‌پذیرد.

### زمان انتظار ضمنی نشست (Session Implicit Wait Timeout)

هر نشست دارای یک زمان انتظار ضمنی مرتبط است. این مقدار، مدت زمان انتظار برای استراتژی یافتن ضمنی عنصر را هنگام یافتن عناصر با استفاده از دستورات [`findElement`](/docs/api/webdriver#findelement) یا [`findElements`](/docs/api/webdriver#findelements) (به ترتیب [`$`](/docs/api/browser/$) یا [`$$`](/docs/api/browser/$$)، هنگام اجرای WebdriverIO با یا بدون اجراکننده تست WDIO) مشخص می‌کند. مگر اینکه خلاف آن ذکر شده باشد، این مقدار ۰ میلی‌ثانیه است.

می‌توانید این زمان انتظار را از طریق زیر تنظیم کنید:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## زمان‌های انتظار مرتبط با WebdriverIO

### زمان انتظار `WaitFor*`

WebdriverIO دستورات متعددی برای انتظار تا رسیدن عناصر به وضعیت خاصی (مثلاً فعال، قابل مشاهده، موجود) ارائه می‌دهد. این دستورات یک آرگومان انتخابگر (selector) و یک عدد زمان انتظار دریافت می‌کنند که تعیین می‌کند نمونه چه مدت باید منتظر بماند تا آن عنصر به آن وضعیت برسد. گزینه `waitforTimeout` به شما اجازه می‌دهد زمان انتظار سراسری را برای همه دستورات `waitFor*` تنظیم کنید، تا نیازی نباشد همان زمان انتظار را بارها و بارها تنظیم کنید. _(به حرف کوچک `f` توجه کنید!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

اکنون در تست‌های خود می‌توانید این کار را انجام دهید:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

### عنصری که صفحه آن را حذف کرده است

وقتی صفحه یک عنصر را حذف می‌کند یا دوباره رندر می‌کند، WebdriverIO آن را دوباره با انتخابگرش پیدا می‌کند و حداکثر تا `waitforTimeout` منتظر می‌ماند. اگر عنصر وجود داشته باشد، دستور روی آن اجرا می‌شود. در غیر این صورت، دستور با خطای زیر شکست می‌خورد:

- `message`: `Can't call <command> on element with selector "<selector>" because element wasn't found` (برای یک آیتم `$$()`: `… "<selector>" at index <n> …`؛ برای یک والد حذف‌شده: پیام درباره والد است)
- `cause`: خطای stale element reference درایور

`waitUntil` و `waitForEnabled` با خطای مخصوص خودشان شکست می‌خورند که این خطا را به عنوان `cause` دارد. `isDisplayed` و `isExisting` برای عنصر حذف‌شده منتظر نمی‌مانند: آن‌ها `false` برمی‌گردانند. برای فرزندِ یک والد حذف‌شده، آن‌ها منتظر می‌مانند و با این خطا شکست می‌خورند.

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## زمان‌های انتظار مرتبط با فریم‌ورک

فریم‌ورک تستی که با WebdriverIO استفاده می‌کنید باید با زمان‌های انتظار سروکار داشته باشد، به‌ویژه از آنجا که همه چیز ناهمگام است. این کار تضمین می‌کند که اگر مشکلی پیش بیاید، فرآیند تست متوقف (گیر) نشود.

به طور پیش‌فرض، زمان انتظار ۱۰ ثانیه است، به این معنی که یک تست واحد نباید بیشتر از این مدت طول بکشد.

یک تست واحد در Mocha به این شکل است:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

در Cucumber، زمان انتظار برای یک تعریف گام (step definition) واحد اعمال می‌شود. با این حال، اگر می‌خواهید زمان انتظار را افزایش دهید زیرا تست شما بیشتر از مقدار پیش‌فرض طول می‌کشد، باید آن را در گزینه‌های فریم‌ورک تنظیم کنید.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>

### زمان‌های انتظار Mocha و هوک‌های WebdriverIO

یک تست یا هوک Mocha می‌تواند زمان انتظار خود را با `this.timeout(ms)` تغییر دهد. برای دسترسی به `this`، از یک `function` استفاده کنید، نه یک تابع پیکانی (arrow function). WebdriverIO این تغییر را دنبال می‌کند، از جمله `this.timeout(0)` که زمان انتظار را غیرفعال می‌کند. با `mochaOpts.parallelMode`، فقط `mochaOpts.timeout` اعمال می‌شود: `this.timeout()` در یک تست یا هوک خطا ایجاد می‌کند، و زمان انتظار یک suite یا `it(...).timeout()` همراه با یک هشدار نادیده گرفته می‌شود. به [تست‌های موازی در یک فایل Spec](./ParallelTests.md#hooks-and-timeouts) مراجعه کنید.

زمان انتظار یک تست شامل زمان هوک `beforeTest` آن نیز می‌شود، زیرا Mocha زمان‌سنج را قبل از هوک شروع می‌کند. با [گزینه تلاش مجدد (retry)](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) در WebdriverIO، همه تلاش‌های یک تست یک زمان انتظار مشترک دارند.

وقتی زمان انتظار یک تست یا هوک به پایان می‌رسد، WebdriverIO پیش از اینکه Mocha تست بعدی را شروع کند، `afterTest` (یا `afterHook`) را اجرا می‌کند، تا آن هوک نتواند هم‌زمان با تست بعدی اجرا شود. Mocha حداکثر به اندازه یک زمان انتظار دیگرِ تست، منتظر این هوک‌ها می‌ماند.