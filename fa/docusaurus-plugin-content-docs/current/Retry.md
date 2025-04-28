---
id: retry
title: اجرای مجدد تست‌های ناپایدار
---

شما می‌توانید برخی از تست‌ها را با testrunner وب‌درایور آی‌او مجدداً اجرا کنید که به دلیل مواردی مانند شبکه ناپایدار یا شرایط رقابتی (race conditions) ناپایدار می‌شوند. (البته توصیه نمی‌شود که صرفاً نرخ اجرای مجدد را افزایش دهید اگر تست‌ها ناپایدار می‌شوند!)

## اجرای مجدد مجموعه‌ها در Mocha

از نسخه ۳ موکا، شما می‌توانید کل مجموعه‌های تست را مجدداً اجرا کنید (همه چیز داخل یک بلوک `describe`). اگر از موکا استفاده می‌کنید، بهتر است از این مکانیسم اجرای مجدد به جای پیاده‌سازی WebdriverIO استفاده کنید که فقط به شما اجازه می‌دهد بلوک‌های تست خاصی را مجدداً اجرا کنید (همه چیز در یک بلوک `it`). برای استفاده از متد `this.retries()`، بلوک مجموعه `describe` باید از یک تابع نامحدود `function(){}` به جای تابع فلش `() => {}` استفاده کند، همانطور که در [مستندات Mocha](https://mochajs.org/#arrow-functions) توضیح داده شده است. با استفاده از Mocha همچنین می‌توانید تعداد تلاش مجدد را برای همه تست‌ها با استفاده از `mochaOpts.retries` در فایل `wdio.conf.js` خود تنظیم کنید.

در اینجا یک مثال آورده شده است:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## اجرای مجدد تست‌های تکی در Jasmine یا Mocha

برای اجرای مجدد یک بلوک تست خاص، می‌توانید تعداد اجراهای مجدد را به عنوان آخرین پارامتر پس از تابع بلوک تست اعمال کنید:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

همین کار برای هوک‌ها نیز کار می‌کند:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

همین کار برای هوک‌ها نیز کار می‌کند:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

اگر از Jasmine استفاده می‌کنید، پارامتر دوم برای timeout رزرو شده است. برای اعمال پارامتر تلاش مجدد، باید timeout را به مقدار پیش‌فرض آن `jasmine.DEFAULT_TIMEOUT_INTERVAL` تنظیم کنید و سپس تعداد تلاش‌های مجدد خود را اعمال کنید.

</TabItem>
</Tabs>

این مکانیسم تلاش مجدد فقط اجازه می‌دهد هوک‌ها یا بلوک‌های تست منفرد را مجدداً اجرا کنید. اگر تست شما با یک هوک برای راه‌اندازی برنامه همراه باشد، این هوک اجرا نمی‌شود. [Mocha ارائه می‌دهد](https://mochajs.org/#retry-tests) تلاش‌های مجدد تست بومی که این رفتار را فراهم می‌کند در حالی که Jasmine این امکان را ندارد. شما می‌توانید به تعداد تلاش‌های مجدد اجرا شده در هوک `afterTest` دسترسی داشته باشید.

## اجرای مجدد در Cucumber

### اجرای مجدد مجموعه‌های کامل در Cucumber

برای cucumber نسخه >=6 می‌توانید گزینه پیکربندی [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) را همراه با پارامتر اختیاری `retryTagFilter` ارائه دهید تا همه یا برخی از سناریوهای ناموفق شما تلاش‌های اضافی دریافت کنند تا موفق شوند. برای اینکه این ویژگی کار کند، باید `scenarioLevelReporter` را روی `true` تنظیم کنید.

### اجرای مجدد تعاریف مرحله در Cucumber

برای تعریف نرخ اجرای مجدد برای تعاریف مرحله خاص، کافی است یک گزینه تلاش مجدد را به آن اعمال کنید، مانند:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

تلاش‌های مجدد را فقط می‌توان در فایل تعاریف مرحله خود تعریف کرد، هرگز در فایل ویژگی خود.

## افزودن تلاش‌های مجدد بر اساس هر فایل specfile

قبلاً، فقط تلاش‌های مجدد در سطح تست و مجموعه در دسترس بودند، که در اکثر موارد خوب هستند.

اما در هر تستی که شامل وضعیت (مانند روی سرور یا در پایگاه داده) باشد، ممکن است وضعیت پس از اولین شکست تست نامعتبر باقی بماند. هر تلاش مجدد بعدی ممکن است به دلیل وضعیت نامعتبری که با آن شروع می‌شوند، شانسی برای موفقیت نداشته باشد.

یک نمونه جدید `browser` برای هر specfile ایجاد می‌شود، که این را به مکانی ایده‌آل برای اتصال و تنظیم هر وضعیت دیگری (سرور، پایگاه‌های داده) تبدیل می‌کند. تلاش‌های مجدد در این سطح به این معنی است که کل فرآیند راه‌اندازی به سادگی تکرار می‌شود، درست مثل اینکه برای یک specfile جدید باشد.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## اجرای یک تست خاص چندین بار

این برای جلوگیری از معرفی تست‌های ناپایدار در یک کد پایه است. با افزودن گزینه خط فرمان `--repeat`، تست‌های مشخص شده یا مجموعه‌ها را N بار اجرا می‌کند. هنگام استفاده از این پرچم خط فرمان، پرچم `--spec` یا `--suite` نیز باید مشخص شود.

هنگام افزودن تست‌های جدید به یک کد پایه، به ویژه از طریق یک فرآیند CI/CD، تست‌ها می‌توانند قبول شوند و ادغام شوند، اما بعداً ناپایدار شوند. این ناپایداری می‌تواند از تعدادی چیزها مانند مشکلات شبکه، بار سرور، اندازه پایگاه داده و غیره ناشی شود. استفاده از پرچم `--repeat` در فرآیند CD/CD شما می‌تواند به گرفتن این تست‌های ناپایدار قبل از ادغام با کد پایه اصلی کمک کند.

یک استراتژی این است که تست‌های خود را به طور منظم در فرآیند CI/CD خود اجرا کنید، اما اگر در حال معرفی یک تست جدید هستید، می‌توانید مجموعه دیگری از تست‌ها را با تست جدید مشخص شده در `--spec` همراه با `--repeat` اجرا کنید تا تست جدید را چندین بار اجرا کند. اگر تست در هر یک از این دفعات ناموفق باشد، تست ادغام نخواهد شد و باید بررسی شود چرا ناموفق بوده است.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```