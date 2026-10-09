---
id: timeouts
title: زمان‌های انتظار (Timeouts)
description: "پیکربندی زمان‌های انتظار نشست WebDriver، زمان‌های انتظار waitfor در WebdriverIO و زمان‌های انتظار فریم‌ورک تست برای حفظ قابلیت اطمینان تست‌ها."
---

هر دستور در WebdriverIO یک عملیات ناهمگام (asynchronous) است. یک درخواست به سرور Selenium (یا یک سرویس ابری مانند [Sauce Labs](https://saucelabs.com)) ارسال می‌شود و پاسخ آن پس از تکمیل یا شکست عملیات، حاوی نتیجه است.

بنابراین، زمان یک جزء حیاتی در کل فرآیند تست است. وقتی یک عمل خاص به وضعیت یک عمل دیگر وابسته است، باید مطمئن شوید که آن‌ها به ترتیب درست اجرا می‌شوند. زمان‌های انتظار (Timeouts) نقش مهمی در رسیدگی به این مسائل ایفا می‌کنند.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## زمان‌های انتظار WebDriver

### زمان انتظار اسکریپت نشست

هر نشست (session) دارای یک زمان انتظار اسکریپت مرتبط است که مدت زمان انتظار برای اجرای اسکریپت‌های ناهمگام را مشخص می‌کند. به جز در مواردی که خلاف آن ذکر شده باشد، این مقدار ۳۰ ثانیه است. می‌توانید این زمان انتظار را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### زمان انتظار بارگذاری صفحه نشست

هر نشست دارای یک زمان انتظار بارگذاری صفحه مرتبط است که مدت زمان انتظار برای تکمیل بارگذاری صفحه را مشخص می‌کند. به جز در مواردی که خلاف آن ذکر شده باشد، این مقدار ۳۰۰,۰۰۰ میلی‌ثانیه است.

می‌توانید این زمان انتظار را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` نام [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts) در WebDriver است. WebdriverIO v10 فقط همین کلید را می‌پذیرد.

### زمان انتظار ضمنی نشست

هر نشست دارای یک زمان انتظار ضمنی (implicit wait) مرتبط است. این مقدار، مدت زمان انتظار برای استراتژی مکان‌یابی ضمنی عنصر را هنگام یافتن عناصر با استفاده از دستورات [`findElement`](/docs/api/webdriver#findelement) یا [`findElements`](/docs/api/webdriver#findelements) مشخص می‌کند (به ترتیب [`$`](/docs/api/browser/$) یا [`$$`](/docs/api/browser/$$)، هنگام اجرای WebdriverIO با یا بدون اجراکننده تست WDIO). به جز در مواردی که خلاف آن ذکر شده باشد، این مقدار ۰ میلی‌ثانیه است.

می‌توانید این زمان انتظار را از طریق زیر تنظیم کنید:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## زمان‌های انتظار مرتبط با WebdriverIO

### زمان انتظار `WaitFor*`

WebdriverIO دستورات متعددی برای انتظار برای رسیدن عناصر به یک وضعیت خاص (مثلاً فعال، قابل مشاهده، موجود) ارائه می‌دهد. این دستورات یک آرگومان انتخابگر (selector) و یک عدد زمان انتظار دریافت می‌کنند که تعیین می‌کند نمونه چه مدت باید منتظر بماند تا آن عنصر به وضعیت مورد نظر برسد. گزینه `waitforTimeout` به شما امکان می‌دهد زمان انتظار سراسری را برای همه دستورات `waitFor*` تنظیم کنید، بنابراین نیازی نیست همان زمان انتظار را بارها و بارها تنظیم کنید. _(به حرف کوچک `f` توجه کنید!)_

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

## زمان‌های انتظار مرتبط با فریم‌ورک

فریم‌ورک تستی که با WebdriverIO استفاده می‌کنید باید با زمان‌های انتظار سروکار داشته باشد، به‌ویژه از آنجا که همه چیز ناهمگام است. این امر تضمین می‌کند که در صورت بروز مشکل، فرآیند تست متوقف و گیر نکند.

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

در Cucumber، زمان انتظار برای یک تعریف گام (step definition) واحد اعمال می‌شود. با این حال، اگر می‌خواهید زمان انتظار را افزایش دهید چون تست شما بیشتر از مقدار پیش‌فرض طول می‌کشد، باید آن را در گزینه‌های فریم‌ورک تنظیم کنید.

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