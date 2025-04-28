---
id: retry
title: آزمایش مجدد تست‌های ناپایدار
---

با استفاده از تست‌رانر WebdriverIO می‌توانید تست‌های خاصی را که به دلایلی مانند شبکه ناپایدار یا شرایط رقابتی (race conditions) ناپایدار هستند، مجدداً اجرا کنید. (با این حال، توصیه نمی‌شود که در صورت ناپایدار شدن تست‌ها، صرفاً نرخ اجرای مجدد را افزایش دهید!)

## اجرای مجدد مجموعه‌های تست در Mocha

از نسخه ۳ Mocha، می‌توانید کل مجموعه‌های تست (همه چیز داخل یک بلوک `describe`) را مجدداً اجرا کنید. اگر از Mocha استفاده می‌کنید، بهتر است به جای پیاده‌سازی WebdriverIO که فقط اجازه می‌دهد بلوک‌های تست خاصی (همه چیز داخل یک بلوک `it`) را مجدداً اجرا کنید، از این مکانیزم اجرای مجدد استفاده کنید. برای استفاده از روش `this.retries()`، بلوک مجموعه `describe` باید از یک تابع نامحدود `function(){}` به جای تابع فلش `() => {}` استفاده کند، همانطور که در [مستندات Mocha](https://mochajs.org/#arrow-functions) توضیح داده شده است. با استفاده از Mocha همچنین می‌توانید تعداد تکرار را برای همه تست‌ها با استفاده از `mochaOpts.retries` در فایل `wdio.conf.js` خود تنظیم کنید.

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

اگر از Jasmine استفاده می‌کنید، پارامتر دوم برای زمان انتظار (timeout) رزرو شده است. برای اعمال پارامتر تکرار، باید زمان انتظار را به مقدار پیش‌فرض آن `jasmine.DEFAULT_TIMEOUT_INTERVAL` تنظیم کنید و سپس تعداد تکرار خود را اعمال کنید.

</TabItem>
</Tabs>

این مکانیزم تکرار فقط اجازه می‌دهد هوک‌ها یا بلوک‌های تست تکی را مجدداً اجرا کنید. اگر تست شما با یک هوک برای راه‌اندازی برنامه‌تان همراه است، این هوک اجرا نمی‌شود. [Mocha ارائه می‌دهد](https://mochajs.org/#retry-tests) تکرارهای تست بومی که این رفتار را فراهم می‌کند در حالی که Jasmine این قابلیت را ندارد. شما می‌توانید به تعداد تکرارهای اجرا شده در هوک `afterTest` دسترسی داشته باشید.

## اجرای مجدد در Cucumber

### اجرای مجدد مجموعه‌های کامل در Cucumber

برای کیوکامبر نسخه >=۶ می‌توانید گزینه پیکربندی [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) را همراه با پارامتر اختیاری `retryTagFilter` ارائه دهید تا همه یا برخی از سناریوهای ناموفق شما تکرارهای اضافی دریافت کنند تا زمانی که موفق شوند. برای کارکرد این ویژگی باید `scenarioLevelReporter` را روی `true` تنظیم کنید.

### اجرای مجدد تعاریف مرحله در Cucumber

برای تعریف نرخ اجرای مجدد برای تعاریف مرحله خاص، کافی است یک گزینه تکرار را به آن اعمال کنید، مانند:

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

تکرارها فقط می‌توانند در فایل تعاریف مرحله شما تعریف شوند، هرگز در فایل ویژگی شما.

## افزودن تکرارها بر اساس فایل specfile

قبلاً، فقط تکرارهای سطح تست و مجموعه در دسترس بودند، که در اکثر موارد مناسب هستند.

اما در هر آزمایشی که شامل وضعیت (مانند وضعیت در سرور یا پایگاه داده) باشد، ممکن است وضعیت پس از اولین شکست تست نامعتبر باقی بماند. هرگونه تکرار بعدی ممکن است به دلیل وضعیت نامعتبری که با آن شروع می‌شوند، شانسی برای گذراندن نداشته باشند.

یک نمونه جدید `browser` برای هر فایل specfile ایجاد می‌شود، که این امر آن را به مکانی ایده‌آل برای اتصال و تنظیم هر وضعیت دیگر (سرور، پایگاه‌های داده) تبدیل می‌کند. تکرارها در این سطح به این معنی است که کل فرآیند راه‌اندازی به سادگی تکرار می‌شود، درست مانند زمانی که برای یک فایل specfile جدید باشد.

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

این برای جلوگیری از معرفی تست‌های ناپایدار در یک کد پایه کمک می‌کند. با افزودن گزینه خط فرمان `--repeat`، تست‌های مشخص شده یا مجموعه‌ها را N بار اجرا می‌کند. هنگام استفاده از این پرچم خط فرمان، پرچم `--spec` یا `--suite` نیز باید مشخص شود.

هنگام افزودن تست‌های جدید به یک کد پایه، به ویژه از طریق فرآیند CI/CD، تست‌ها ممکن است قبول شوند و ادغام شوند اما بعداً ناپایدار شوند. این ناپایداری می‌تواند از مسائل مختلفی مانند مشکلات شبکه، بار سرور، اندازه پایگاه داده و غیره ناشی شود. استفاده از پرچم `--repeat` در فرآیند CD/CD شما می‌تواند به شناسایی این تست‌های ناپایدار قبل از ادغام آن‌ها با کد پایه اصلی کمک کند.

یک استراتژی برای استفاده این است که تست‌های خود را به طور معمول در فرآیند CI/CD اجرا کنید، اما اگر یک تست جدید معرفی می‌کنید، می‌توانید مجموعه دیگری از تست‌ها را با تست جدید مشخص شده در `--spec` همراه با `--repeat` اجرا کنید تا تست جدید x بار اجرا شود. اگر تست در هر یک از این دفعات شکست بخورد، تست ادغام نمی‌شود و باید دلیل شکست آن بررسی شود.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```