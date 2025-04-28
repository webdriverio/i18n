---
id: timeouts
title: زمان‌های انتظار
---

هر دستور در WebdriverIO یک عملیات ناهمگام است. درخواستی به سرور Selenium (یا سرویس ابری مانند [Sauce Labs](https://saucelabs.com)) ارسال می‌شود و پاسخ آن حاوی نتیجه‌ای است که پس از تکمیل یا شکست عملیات دریافت می‌شود.

بنابراین، زمان یک جزء مهم در کل فرآیند تست است. وقتی یک عمل خاص به وضعیت عمل دیگری بستگی دارد، باید اطمینان حاصل کنید که آن‌ها به ترتیب درست اجرا می‌شوند. زمان‌های انتظار نقش مهمی در مواجهه با این مسائل دارند.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## زمان‌های انتظار WebDriver

### زمان انتظار اسکریپت جلسه

هر جلسه دارای یک زمان انتظار اسکریپت مرتبط است که مدت زمان انتظار برای اجرای اسکریپت‌های ناهمگام را مشخص می‌کند. مگر اینکه خلاف آن ذکر شود، این زمان ۳۰ ثانیه است. شما می‌توانید این زمان انتظار را به صورت زیر تنظیم کنید:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### زمان انتظار بارگذاری صفحه جلسه

هر جلسه دارای یک زمان انتظار بارگذاری صفحه مرتبط است که مدت زمان انتظار برای تکمیل بارگذاری صفحه را مشخص می‌کند. مگر اینکه خلاف آن ذکر شود، این زمان ۳۰۰,۰۰۰ میلی‌ثانیه است.

شما می‌توانید این زمان انتظار را به صورت زیر تنظیم کنید:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> کلیدواژه `pageLoad` بخشی از [مشخصات](https://www.w3.org/TR/webdriver/#set-timeouts) رسمی WebDriver است، اما ممکن است برای مرورگر شما [پشتیبانی](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) نشود (نام قبلی آن `page load` است).

### زمان انتظار ضمنی جلسه

هر جلسه دارای یک زمان انتظار ضمنی مرتبط است. این زمان، مدت انتظار برای استراتژی مکان‌یابی ضمنی عناصر هنگام یافتن عناصر با استفاده از دستورات [`findElement`](/docs/api/webdriver#findelement) یا [`findElements`](/docs/api/webdriver#findelements) (به ترتیب [`$`](/docs/api/browser/$) یا [`$$`](/docs/api/browser/$$)، هنگام اجرای WebdriverIO با یا بدون تست‌رانر WDIO) را مشخص می‌کند. مگر اینکه خلاف آن ذکر شود، این زمان ۰ میلی‌ثانیه است.

شما می‌توانید این زمان انتظار را به صورت زیر تنظیم کنید:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## زمان‌های انتظار مرتبط با WebdriverIO

### زمان انتظار `WaitFor*`

WebdriverIO چندین دستور برای انتظار عناصر برای رسیدن به وضعیت خاص (مانند فعال، قابل مشاهده، موجود) ارائه می‌دهد. این دستورات یک آرگومان انتخاب‌کننده و یک عدد زمان انتظار می‌گیرند که تعیین می‌کند نمونه چه مدت باید منتظر بماند تا آن عنصر به وضعیت مورد نظر برسد. گزینه `waitforTimeout` به شما امکان می‌دهد زمان انتظار جهانی را برای تمام دستورات `waitFor*` تنظیم کنید، بنابراین نیازی نیست همان زمان انتظار را مکرراً تنظیم کنید. _(توجه داشته باشید که حرف `f` با حروف کوچک نوشته شده است!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

در تست‌های خود، اکنون می‌توانید این کار را انجام دهید:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// همچنین می‌توانید در صورت نیاز زمان انتظار پیش‌فرض را بازنویسی کنید
await myElem.waitForDisplayed({ timeout: 10000 })
```

## زمان‌های انتظار مرتبط با چارچوب

چارچوب تستی که با WebdriverIO استفاده می‌کنید باید با زمان‌های انتظار کار کند، به خصوص از آنجایی که همه چیز ناهمگام است. این اطمینان حاصل می‌کند که اگر مشکلی پیش بیاید، فرآیند تست متوقف نمی‌شود.

به طور پیش‌فرض، زمان انتظار ۱۰ ثانیه است، به این معنی که یک تست منفرد نباید بیشتر از آن طول بکشد.

یک تست منفرد در Mocha به شکل زیر است:

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

در Cucumber، زمان انتظار برای یک تعریف مرحله منفرد اعمال می‌شود. با این حال، اگر می‌خواهید زمان انتظار را افزایش دهید زیرا تست شما بیشتر از مقدار پیش‌فرض طول می‌کشد، باید آن را در گزینه‌های چارچوب تنظیم کنید.

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