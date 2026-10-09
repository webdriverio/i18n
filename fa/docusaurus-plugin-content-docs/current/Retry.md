---
id: retry
title: تکرار تست‌های ناپایدار
description: "تکرار تست‌های ناپایدار در Mocha، Jasmine یا Cucumber، اجرای مجدد کل فایل‌های spec و اجرای یک تست خاص به دفعات متعدد برای تشخیص ناپایداری."
---

با استفاده از testrunner در WebdriverIO می‌توانید تست‌های خاصی را که به دلایلی مانند شبکه‌ی ناپایدار یا شرایط رقابتی (race conditions) ناپایدار از آب درمی‌آیند، دوباره اجرا کنید. (با این حال، توصیه نمی‌شود که در صورت ناپایدار شدن تست‌ها، صرفاً تعداد دفعات اجرای مجدد را افزایش دهید!)

## اجرای مجدد suiteها در Mocha

از نسخه‌ی ۳ Mocha به بعد، می‌توانید کل test suiteها (همه‌ی محتوای داخل یک بلوک `describe`) را دوباره اجرا کنید. اگر از Mocha استفاده می‌کنید، بهتر است این مکانیزم تکرار را به پیاده‌سازی WebdriverIO ترجیح دهید، چون پیاده‌سازی WebdriverIO تنها امکان اجرای مجدد بلوک‌های تست خاص (همه‌ی محتوای داخل یک بلوک `it`) را فراهم می‌کند. برای استفاده از متد `this.retries()`، بلوک suite یعنی `describe` باید از یک تابع unbound به شکل `function(){}` به‌جای تابع پیکانی `() => {}` استفاده کند، همان‌طور که در [مستندات Mocha](https://mochajs.org/#arrow-functions) توضیح داده شده است. در Mocha همچنین می‌توانید با استفاده از `mochaOpts.retries` در فایل `wdio.conf.js` تعداد دفعات تکرار را برای همه‌ی specها تنظیم کنید.

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

برای اجرای مجدد یک بلوک تست خاص، کافی است تعداد دفعات اجرای مجدد را به‌عنوان آخرین پارامتر پس از تابع بلوک تست قرار دهید:

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

اگر از Jasmine استفاده می‌کنید، پارامتر دوم برای timeout رزرو شده است. برای اعمال پارامتر تکرار، باید timeout را روی مقدار پیش‌فرض آن یعنی `jasmine.DEFAULT_TIMEOUT_INTERVAL` تنظیم کنید و سپس تعداد دفعات تکرار را اعمال کنید.

</TabItem>
</Tabs>

این مکانیزم تکرار تنها امکان تکرار hookها یا بلوک‌های تست تکی را فراهم می‌کند. اگر تست شما همراه با یک hook برای راه‌اندازی برنامه‌تان باشد، این hook اجرا نمی‌شود. [Mocha](https://mochajs.org/#retry-tests) قابلیت تکرار تست به‌صورت بومی را ارائه می‌دهد که این رفتار را فراهم می‌کند، در حالی که Jasmine چنین قابلیتی ندارد. می‌توانید در hook `afterTest` به تعداد تکرارهای اجراشده دسترسی داشته باشید.

## اجرای مجدد در Cucumber

### اجرای مجدد کل suiteها در Cucumber

برای cucumber نسخه‌ی ۶ و بالاتر، می‌توانید گزینه‌ی پیکربندی [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) را همراه با پارامتر اختیاری `retryTagFilter` ارائه دهید تا همه یا برخی از سناریوهای ناموفق شما تا زمان موفقیت، تکرارهای اضافی داشته باشند. برای کارکرد این قابلیت، باید `scenarioLevelReporter` را روی `true` تنظیم کنید.

### اجرای مجدد Step Definitionها در Cucumber

برای تعریف تعداد دفعات اجرای مجدد برای step definitionهای خاص، کافی است یک گزینه‌ی retry به آن اعمال کنید، مانند:

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

اجرای مجدد تنها در فایل step definitionها قابل تعریف است و هرگز در فایل feature قابل تعریف نیست.

## افزودن تکرار بر اساس هر فایل spec

پیش از این، تنها تکرار در سطح تست و suite در دسترس بود که در بیشتر موارد کافی است.

اما در هر تستی که با state سروکار دارد (مانند state روی یک سرور یا در یک پایگاه داده)، ممکن است پس از اولین شکست تست، state در وضعیت نامعتبری باقی بماند. هر تکرار بعدی ممکن است به دلیل state نامعتبری که با آن شروع می‌شود، هیچ شانسی برای موفقیت نداشته باشد.

برای هر فایل spec یک نمونه‌ی جدید `browser` ایجاد می‌شود که این را به مکانی ایده‌آل برای hook کردن و راه‌اندازی هر state دیگری (سرور، پایگاه‌های داده) تبدیل می‌کند. تکرار در این سطح به این معناست که کل فرایند راه‌اندازی به سادگی تکرار خواهد شد، درست مانند اینکه برای یک فایل spec جدید باشد.

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

این قابلیت به جلوگیری از ورود تست‌های ناپایدار به کدبیس کمک می‌کند. با افزودن گزینه‌ی cli یعنی `--repeat`، specها یا suiteهای مشخص‌شده N بار اجرا می‌شوند. هنگام استفاده از این فلگ cli، فلگ `--spec` یا `--suite` نیز باید مشخص شود.

هنگام افزودن تست‌های جدید به یک کدبیس، به‌ویژه از طریق فرایند CI/CD، ممکن است تست‌ها موفق شوند و merge شوند اما بعداً ناپایدار شوند. این ناپایداری می‌تواند ناشی از عوامل مختلفی مانند مشکلات شبکه، بار سرور، حجم پایگاه داده و غیره باشد. استفاده از فلگ `--repeat` در فرایند CD/CD شما می‌تواند به شناسایی این تست‌های ناپایدار پیش از merge شدن آن‌ها در کدبیس اصلی کمک کند.

یکی از راهکارهای قابل استفاده این است که تست‌های خود را به‌طور معمول در فرایند CI/CD اجرا کنید، اما اگر یک تست جدید اضافه می‌کنید، می‌توانید مجموعه‌ی دیگری از تست‌ها را با spec جدید مشخص‌شده در `--spec` همراه با `--repeat` اجرا کنید تا تست جدید x بار اجرا شود. اگر تست در هر یک از این دفعات شکست بخورد، تست merge نخواهد شد و باید علت شکست آن بررسی شود.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```