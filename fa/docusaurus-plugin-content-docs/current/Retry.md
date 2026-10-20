---
id: retry
title: تکرار تست‌های ناپایدار
description: "تست‌های ناپایدار را در Mocha، Jasmine یا Cucumber دوباره اجرا کنید، کل فایل‌های spec را مجدداً اجرا کنید و یک تست خاص را چندین بار اجرا کنید تا ناپایداری را تشخیص دهید."
---

شما می‌توانید با استفاده از testrunner در WebdriverIO، تست‌های خاصی را که به دلایلی مانند شبکه‌ی ناپایدار یا شرایط رقابتی (race conditions) ناپایدار هستند، دوباره اجرا کنید. (با این حال، توصیه نمی‌شود که در صورت ناپایدار شدن تست‌ها، صرفاً نرخ اجرای مجدد را افزایش دهید!)

## اجرای مجدد suiteها در Mocha

از نسخه‌ی ۳ Mocha، می‌توانید کل test suiteها (همه‌چیز درون یک بلوک `describe`) را دوباره اجرا کنید. اگر از Mocha استفاده می‌کنید، بهتر است این مکانیزم تکرار را به جای پیاده‌سازی WebdriverIO ترجیح دهید که فقط امکان اجرای مجدد بلوک‌های تست خاص (همه‌چیز درون یک بلوک `it`) را فراهم می‌کند. برای استفاده از متد `this.retries()`، بلوک suite یعنی `describe` باید از یک تابع unbound به صورت `function(){}` به جای تابع arrow به صورت `() => {}` استفاده کند، همان‌طور که در [مستندات Mocha](https://mochajs.org/#arrow-functions) توضیح داده شده است. با استفاده از Mocha همچنین می‌توانید تعداد تکرار را برای همه‌ی specها با استفاده از `mochaOpts.retries` در فایل `wdio.conf.js` خود تنظیم کنید.

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

برای اجرای مجدد یک بلوک تست خاص، کافی است تعداد اجراهای مجدد را به عنوان آخرین پارامتر بعد از تابع بلوک تست قرار دهید:

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

همین روش برای hookها نیز کار می‌کند:

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

همین روش برای hookها نیز کار می‌کند:

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

اگر از Jasmine استفاده می‌کنید، پارامتر دوم برای timeout رزرو شده است. برای اعمال پارامتر تکرار، باید timeout را روی مقدار پیش‌فرض آن یعنی `jasmine.DEFAULT_TIMEOUT_INTERVAL` تنظیم کنید و سپس تعداد تکرار خود را اعمال کنید.

</TabItem>
</Tabs>

این مکانیزم تکرار فقط امکان تکرار hookها یا بلوک‌های تست تکی را فراهم می‌کند. اگر تست شما همراه با یک hook برای راه‌اندازی برنامه‌تان باشد، آن hook اجرا نمی‌شود. [Mocha](https://mochajs.org/#retry-tests) قابلیت تکرار بومی تست‌ها را ارائه می‌دهد که این رفتار را فراهم می‌کند، در حالی که Jasmine چنین قابلیتی ندارد. می‌توانید در hook مربوط به `afterTest` به تعداد تکرارهای اجرا شده دسترسی داشته باشید.

در Mocha، همه‌ی تلاش‌های یک تست یا hook از timeout مشترکی استفاده می‌کنند: Mocha تایمر را یک بار شروع می‌کند و زمانی که مجموع همه‌ی تلاش‌ها بیشتر از timeout طول بکشد، تست را ناموفق اعلام می‌کند. بنابراین این مکانیزم، تست یا hookی را که شکست می‌خورد (مثلاً یک assertion یا command ناموفق) تکرار می‌کند، اما تست یا hookی را که به timeout خود می‌رسد تکرار نمی‌کند، زیرا تلاش بعدی نمی‌تواند به موقع به پایان برسد. خطای timeout یک تست یا hook که با تکرارهای WebdriverIO اجرا می‌شود، تلاشی را که دچار timeout شده نام می‌برد، برای مثال `(WDIO attempt 2/3)`. برای تست‌هایی که ممکن است دچار timeout شوند، از [تکرارهای Mocha](https://mochajs.org/#retry-tests) (`this.retries()`) استفاده کنید: Mocha هر تلاش را دوباره با یک timeout کامل اجرا می‌کند.

## اجرای مجدد در Cucumber

### اجرای مجدد کامل suiteها در Cucumber

برای cucumber نسخه‌ی ۶ به بالا، می‌توانید گزینه‌ی پیکربندی [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) را همراه با پارامتر اختیاری `retryTagFilter` ارائه دهید تا همه یا برخی از سناریوهای ناموفق شما تا زمان موفقیت، تکرارهای اضافی داشته باشند. برای اینکه این ویژگی کار کند، باید `scenarioLevelReporter` را روی `true` تنظیم کنید.

### اجرای مجدد Step Definitionها در Cucumber

برای تعریف نرخ اجرای مجدد برای step definitionهای خاص، کافی است یک گزینه‌ی retry به آن اعمال کنید، مانند:

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

اجراهای مجدد فقط می‌توانند در فایل step definitionهای شما تعریف شوند، هرگز در فایل feature.

## افزودن تکرار بر اساس هر فایل spec

پیش از این، فقط تکرارهای سطح تست و سطح suite در دسترس بودند که در بیشتر موارد کافی هستند.

اما در هر تستی که شامل state باشد (مانند state روی یک سرور یا در یک پایگاه داده)، ممکن است state پس از اولین شکست تست، نامعتبر باقی بماند. هرگونه تکرار بعدی ممکن است به دلیل state نامعتبری که با آن شروع می‌شود، هیچ شانسی برای موفقیت نداشته باشد.

یک نمونه‌ی جدید از `browser` برای هر فایل spec ایجاد می‌شود، که این امر آن را به مکانی ایده‌آل برای hook کردن و راه‌اندازی هر state دیگری (سرور، پایگاه‌های داده) تبدیل می‌کند. تکرار در این سطح به این معناست که کل فرآیند راه‌اندازی به سادگی تکرار خواهد شد، درست مانند اینکه برای یک فایل spec جدید باشد.

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

## اجرای یک تست خاص به دفعات متعدد

این کار به جلوگیری از ورود تست‌های ناپایدار به کدبیس کمک می‌کند. با افزودن گزینه‌ی cli یعنی `--repeat`، specها یا suiteهای مشخص شده N بار اجرا می‌شوند. هنگام استفاده از این فلگ cli، فلگ `--spec` یا `--suite` نیز باید مشخص شود.

هنگام افزودن تست‌های جدید به یک کدبیس، به‌ویژه از طریق فرآیند CI/CD، تست‌ها ممکن است موفق شوند و merge شوند، اما بعداً ناپایدار شوند. این ناپایداری می‌تواند ناشی از عوامل متعددی مانند مشکلات شبکه، بار سرور، اندازه‌ی پایگاه داده و غیره باشد. استفاده از فلگ `--repeat` در فرآیند CD/CD شما می‌تواند به شناسایی این تست‌های ناپایدار قبل از merge شدن آن‌ها به کدبیس اصلی کمک کند.

یکی از استراتژی‌های قابل استفاده این است که تست‌های خود را به‌طور معمول در فرآیند CI/CD اجرا کنید، اما اگر در حال معرفی یک تست جدید هستید، می‌توانید مجموعه‌ی دیگری از تست‌ها را با spec جدید مشخص شده در `--spec` همراه با `--repeat` اجرا کنید تا تست جدید x بار اجرا شود. اگر تست در هر یک از این دفعات شکست بخورد، تست merge نخواهد شد و باید بررسی شود که چرا شکست خورده است.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```