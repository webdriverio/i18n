---
id: timeouts
title: مهلت‌های زمانی
---

هر دستور در WebdriverIO یک عملیات ناهمگام است. درخواستی به سرور Selenium (یا یک سرویس ابری مانند [Sauce Labs](https://saucelabs.com)) ارسال می‌شود، و پاسخ آن حاوی نتیجه است که وقتی عمل به اتمام رسیده یا شکست خورده است.

بنابراین، زمان یک جزء مهم در کل فرآیند تست است. هنگامی که یک عمل خاص به وضعیت عمل دیگری بستگی دارد، باید اطمینان حاصل کنید که آنها در ترتیب درست اجرا می‌شوند. مهلت‌های زمانی نقش مهمی در برخورد با این مسائل دارند.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## مهلت‌های زمانی WebDriver

### مهلت زمانی اسکریپت جلسه

یک جلسه دارای مهلت زمانی اسکریپت مرتبط است که زمان انتظار برای اجرای اسکریپت‌های ناهمگام را مشخص می‌کند. به‌طور پیش‌فرض، این مقدار ۳۰ ثانیه است. شما می‌توانید این مهلت زمانی را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### مهلت زمانی بارگذاری صفحه جلسه

یک جلسه دارای مهلت زمانی بارگذاری صفحه مرتبط است که زمان انتظار برای تکمیل بارگذاری صفحه را مشخص می‌کند. به‌طور پیش‌فرض، این مقدار ۳۰۰,۰۰۰ میلی‌ثانیه است.

شما می‌توانید این مهلت زمانی را به این صورت تنظیم کنید:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> کلمه کلیدی `pageLoad` بخشی از [مشخصات](https://www.w3.org/TR/webdriver/#set-timeouts) رسمی WebDriver است، اما ممکن است برای مرورگر شما [پشتیبانی](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) نشود (نام قبلی `page load` است).

### مهلت زمانی انتظار ضمنی جلسه

یک جلسه دارای مهلت زمانی انتظار ضمنی مرتبط است. این مهلت زمان انتظار برای استراتژی مکان‌یابی ضمنی عنصر را هنگام یافتن عناصر با استفاده از دستورات [`findElement`](/docs/api/webdriver#findelement) یا [`findElements`](/docs/api/webdriver#findelements) (به ترتیب [`$`](/docs/api/browser/$) یا [`$$`](/docs/api/browser/$$) هنگام اجرای WebdriverIO با یا بدون WDIO testrunner) مشخص می‌کند. به‌طور پیش‌فرض، این مقدار ۰ میلی‌ثانیه است.

شما می‌توانید این مهلت زمانی را از طریق زیر تنظیم کنید:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## مهلت‌های زمانی مربوط به WebdriverIO

### مهلت زمانی `WaitFor*`

WebdriverIO دستورات متعددی برای انتظار تا زمان رسیدن عناصر به وضعیت خاصی (مثلاً فعال، قابل مشاهده، موجود) فراهم می‌کند. این دستورات یک آرگومان گزینشگر و یک عدد مهلت زمانی می‌گیرند که تعیین می‌کند نمونه چه مدت باید منتظر بماند تا آن عنصر به وضعیت مورد نظر برسد. گزینه `waitforTimeout` به شما امکان می‌دهد مهلت زمانی جهانی را برای تمام دستورات `waitFor*` تنظیم کنید، بنابراین نیازی به تنظیم مجدد همان مهلت زمانی ندارید. _(توجه کنید که `f` کوچک است!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

اکنون می‌توانید در آزمایش‌های خود این کار را انجام دهید:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// در صورت نیاز می‌توانید مهلت زمانی پیش‌فرض را بازنویسی کنید
await myElem.waitForDisplayed({ timeout: 10000 })
```

## مهلت‌های زمانی مربوط به فریم‌ورک

فریم‌ورک تستی که با WebdriverIO استفاده می‌کنید باید با مهلت‌های زمانی سروکار داشته باشد، خصوصاً از آنجایی که همه چیز ناهمگام است. این اطمینان حاصل می‌کند که اگر مشکلی پیش بیاید، فرآیند تست متوقف نمی‌شود.

به طور پیش‌فرض، مهلت زمانی ۱۰ ثانیه است، به این معنی که یک تست واحد نباید بیش از این مدت طول بکشد.

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

در Cucumber، مهلت زمانی برای یک تعریف گام واحد اعمال می‌شود. با این حال، اگر می‌خواهید مهلت زمانی را افزایش دهید زیرا تست شما بیش از مقدار پیش‌فرض طول می‌کشد، باید آن را در گزینه‌های فریم‌ورک تنظیم کنید.

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