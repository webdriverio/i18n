---
id: frameworks
title: فریم‌ورک‌ها
---

WebdriverIO Runner از [Mocha](http://mochajs.org/)، [Jasmine](http://jasmine.github.io/) و [Cucumber.js](https://cucumber.io/) به صورت پیش‌فرض پشتیبانی می‌کند. همچنین می‌توانید آن را با فریم‌ورک‌های متن‌باز شخص ثالث مانند [Serenity/JS](#using-serenityjs) یکپارچه‌سازی کنید.

:::tip یکپارچه‌سازی WebdriverIO با فریم‌ورک‌های تست
برای یکپارچه‌سازی WebdriverIO با یک فریم‌ورک تست، شما به یک بسته آداپتور موجود در NPM نیاز دارید.
توجه داشته باشید که بسته آداپتور باید در همان مکانی نصب شود که WebdriverIO نصب شده است.
بنابراین، اگر WebdriverIO را به صورت جهانی نصب کرده‌اید، مطمئن شوید که بسته آداپتور را نیز به صورت جهانی نصب کنید.
:::

یکپارچه‌سازی WebdriverIO با یک فریم‌ورک تست به شما امکان می‌دهد تا به نمونه WebDriver با استفاده از متغیر جهانی `browser` در فایل‌های مشخصات یا تعاریف گام دسترسی داشته باشید.
توجه داشته باشید که WebdriverIO همچنین مسئولیت شروع و پایان دادن به جلسه Selenium را بر عهده می‌گیرد، بنابراین نیازی نیست که خودتان این کار را انجام دهید.

## استفاده از Mocha

ابتدا، بسته آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

به طور پیش‌فرض WebdriverIO یک [کتابخانه اثبات](assertion) ارائه می‌دهد که به صورت داخلی ساخته شده است و می‌توانید بلافاصله از آن استفاده کنید:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO از رابط‌های `BDD` (پیش‌فرض)، `TDD` و `QUnit` [Mocha](https://mochajs.org/#interfaces) پشتیبانی می‌کند.

اگر دوست دارید مشخصات خود را به سبک TDD بنویسید، ویژگی `ui` را در تنظیمات `mochaOpts` خود به `tdd` تنظیم کنید. اکنون فایل‌های تست شما باید به این شکل نوشته شوند:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

اگر می‌خواهید تنظیمات خاص دیگری را برای Mocha تعریف کنید، می‌توانید این کار را با کلید `mochaOpts` در فایل پیکربندی خود انجام دهید. فهرست تمام گزینه‌ها را می‌توان در [وب‌سایت پروژه Mocha](https://mochajs.org/api/mocha) یافت.

__نکته:__ WebdriverIO از استفاده منسوخ شده از کال‌بک‌های `done` در Mocha پشتیبانی نمی‌کند:

```js
it('should test something', (done) => {
    done() // خطای "done is not a function" را پرتاب می‌کند
})
```

### گزینه‌های Mocha

گزینه‌های زیر را می‌توان در `wdio.conf.js` خود اعمال کرد تا محیط Mocha را پیکربندی کنید. __نکته:__ همه گزینه‌ها پشتیبانی نمی‌شوند، به عنوان مثال استفاده از گزینه `parallel` باعث خطا می‌شود زیرا تست‌رانر WDIO روش خود را برای اجرای آزمون‌ها به صورت موازی دارد. می‌توانید این گزینه‌های فریم‌ورک را به عنوان آرگومان ارسال کنید، مثلاً:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

این کار گزینه‌های Mocha زیر را ارسال می‌کند:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

گزینه‌های Mocha زیر پشتیبانی می‌شوند:

#### require
گزینه `require` هنگامی مفید است که می‌خواهید عملکرد اساسی را اضافه یا گسترش دهید (گزینه فریم‌ورک WebdriverIO).

نوع: `string|string[]`<br />
پیش‌فرض: `[]`

#### compilers
از ماژول(های) داده شده برای کامپایل فایل‌ها استفاده کنید. کامپایلرها قبل از نیازمندی‌ها (گزینه فریم‌ورک WebdriverIO) گنجانده می‌شوند.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### allowUncaught
خطاهای نگرفته را منتشر کنید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### bail
پس از اولین شکست تست، اجرا را متوقف کنید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### checkLeaks
نشت متغیرهای جهانی را بررسی کنید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### delay
اجرای مجموعه اصلی را به تاخیر بیندازید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### fgrep
فیلتر تست با رشته متن داده شده.

نوع: `string`<br />
پیش‌فرض: `null`

#### forbidOnly
تست‌هایی که با `only` علامت‌گذاری شده‌اند، مجموعه را با شکست مواجه می‌کنند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### forbidPending
تست‌های معلق، مجموعه را با شکست مواجه می‌کنند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### fullTrace
ردیابی کامل در هنگام شکست.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### global
متغیرهای مورد انتظار در محدوده جهانی.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### grep
فیلتر تست با عبارت منظم داده شده.

نوع: `RegExp|string`<br />
پیش‌فرض: `null`

#### invert
تطابق فیلتر تست را معکوس کنید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### retries
تعداد دفعات تلاش مجدد برای تست‌های ناموفق.

نوع: `number`<br />
پیش‌فرض: `0`

#### timeout
مقدار آستانه تایم‌اوت (به میلی‌ثانیه).

نوع: `number`<br />
پیش‌فرض: `30000`

## استفاده از Jasmine

ابتدا، بسته آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

سپس می‌توانید محیط Jasmine خود را با تنظیم یک ویژگی `jasmineOpts` در پیکربندی خود تنظیم کنید. فهرست همه گزینه‌ها را می‌توان در [وب‌سایت پروژه Jasmine](https://jasmine.github.io/api/3.5/Configuration.html) یافت.

### گزینه‌های Jasmine

گزینه‌های زیر را می‌توان در `wdio.conf.js` خود با استفاده از ویژگی `jasmineOpts` اعمال کرد تا محیط Jasmine خود را پیکربندی کنید. برای اطلاعات بیشتر در مورد این گزینه‌های پیکربندی، [مستندات Jasmine](https://jasmine.github.io/api/edge/Configuration) را بررسی کنید. می‌توانید این گزینه‌های فریم‌ورک را به عنوان آرگومان ارسال کنید، مثلاً:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

این کار گزینه‌های Mocha زیر را ارسال می‌کند:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

گزینه‌های Jasmine زیر پشتیبانی می‌شوند:

#### defaultTimeoutInterval
فاصله زمانی پیش‌فرض برای عملیات Jasmine.

نوع: `number`<br />
پیش‌فرض: `60000`

#### helpers
آرایه‌ای از مسیرهای فایل (و الگوها) نسبت به spec_dir برای گنجاندن قبل از مشخصات jasmine.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### requires
گزینه `requires` هنگامی مفید است که می‌خواهید عملکرد اساسی را اضافه یا گسترش دهید.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### random
آیا ترتیب اجرای مشخصات را به صورت تصادفی انجام دهد.

نوع: `boolean`<br />
پیش‌فرض: `true`

#### seed
بذر مورد استفاده به عنوان اساس تصادفی‌سازی. اگر null باشد، بذر به صورت تصادفی در زمان شروع اجرا تعیین می‌شود.

نوع: `Function`<br />
پیش‌فرض: `null`

#### failSpecWithNoExpectations
آیا مشخصات را در صورت عدم اجرای هیچ انتظاری، شکست دهد. به طور پیش‌فرض، مشخصاتی که هیچ انتظاری را اجرا نکرده‌اند، به عنوان قبول شده گزارش می‌شوند. تنظیم این مقدار به true چنین مشخصاتی را به عنوان شکست گزارش می‌کند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### oneFailurePerSpec
آیا باعث شود مشخصات فقط یک شکست انتظار داشته باشند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### specFilter
تابعی برای استفاده جهت فیلتر مشخصات.

نوع: `Function`<br />
پیش‌فرض: `(spec) => true`

#### grep
فقط تست‌هایی را اجرا کنید که با این رشته یا عبارت منظم مطابقت دارند. (فقط در صورتی که هیچ تابع `specFilter` سفارشی تنظیم نشده باشد قابل استفاده است)

نوع: `string|Regexp`<br />
پیش‌فرض: `null`

#### invertGrep
اگر true باشد، تست‌های مطابق را معکوس می‌کند و فقط تست‌هایی را اجرا می‌کند که با عبارت استفاده شده در `grep` مطابقت ندارند. (فقط در صورتی که هیچ تابع `specFilter` سفارشی تنظیم نشده باشد قابل استفاده است)

نوع: `boolean`<br />
پیش‌فرض: `false`

## استفاده از Cucumber

ابتدا، بسته آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

اگر می‌خواهید از Cucumber استفاده کنید، ویژگی `framework` را با افزودن `framework: 'cucumber'` به [فایل پیکربندی](configurationfile) به `cucumber` تنظیم کنید.

گزینه‌های Cucumber را می‌توان در فایل پیکربندی با `cucumberOpts` داد. فهرست کامل گزینه‌ها را [اینجا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) ببینید.

برای راه‌اندازی سریع با Cucumber، نگاهی به پروژه [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) ما بیندازید که با تمام تعاریف گام‌هایی که برای شروع نیاز دارید همراه است و می‌توانید فوراً شروع به نوشتن فایل‌های ویژگی کنید.

### گزینه‌های Cucumber

گزینه‌های زیر را می‌توان در `wdio.conf.js` خود برای پیکربندی محیط Cucumber با استفاده از ویژگی `cucumberOpts` اعمال کرد:

:::tip تنظیم گزینه‌ها از طریق خط فرمان
`cucumberOpts` مانند `tags` سفارشی برای فیلتر کردن تست‌ها، می‌تواند از طریق خط فرمان مشخص شود. این کار با استفاده از قالب `cucumberOpts.{optionName}="value"` انجام می‌شود.

به عنوان مثال، اگر می‌خواهید فقط تست‌هایی را اجرا کنید که با برچسب `@smoke` علامت‌گذاری شده‌اند، می‌توانید از دستور زیر استفاده کنید:

```sh
# وقتی فقط می‌خواهید تست‌هایی را اجرا کنید که برچسب "@smoke" را دارند
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

این دستور گزینه `tags` را در `cucumberOpts` به `@smoke` تنظیم می‌کند و اطمینان می‌دهد که فقط تست‌های دارای این برچسب اجرا می‌شوند.

:::

#### backtrace
ردیابی کامل را برای خطاها نشان دهید.

نوع: `Boolean`<br />
پیش‌فرض: `true`

#### requireModule
ماژول‌ها را قبل از نیاز به فایل‌های پشتیبانی الزامی کنید.

نوع: `string[]`<br />
پیش‌فرض: `[]`<br />
مثال:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // یا
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
پس از اولین شکست، اجرا را متوقف کنید.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### name
فقط سناریوهایی با نام مطابق با عبارت (تکرارپذیر) را اجرا کنید.

نوع: `RegExp[]`<br />
پیش‌فرض: `[]`

#### require
فایل‌هایی که حاوی تعاریف گام شما هستند را قبل از اجرای ویژگی‌ها الزامی کنید. همچنین می‌توانید یک glob برای تعاریف گام خود مشخص کنید.

نوع: `string[]`<br />
پیش‌فرض: `[]`
مثال:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
مسیرهایی که کد پشتیبانی شما در آنجا قرار دارد، برای ESM.

نوع: `String[]`<br />
پیش‌فرض: `[]`
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
اگر گام‌های تعریف نشده یا در انتظار وجود داشته باشد، با شکست مواجه شود.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### tags
فقط ویژگی‌ها یا سناریوهایی با برچسب‌های مطابق با عبارت را اجرا کنید.
لطفاً برای جزئیات بیشتر به [مستندات Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) مراجعه کنید.

نوع: `String`<br />
پیش‌فرض: ``

#### timeout
مهلت زمانی به میلی‌ثانیه برای تعاریف گام.

نوع: `Number`<br />
پیش‌فرض: `30000`

#### retry
تعداد دفعات تلاش مجدد برای موارد تست ناموفق را مشخص کنید.

نوع: `Number`<br />
پیش‌فرض: `0`

#### retryTagFilter
فقط ویژگی‌ها یا سناریوهایی با برچسب‌های مطابق با عبارت (تکرارپذیر) را مجدداً تلاش کنید. این گزینه نیاز به مشخص شدن '--retry' دارد.

نوع: `RegExp`

#### language
زبان پیش‌فرض برای فایل‌های ویژگی شما

نوع: `String`<br />
پیش‌فرض: `en`

#### order
تست‌ها را به ترتیب مشخص / تصادفی اجرا کنید

نوع: `String`<br />
پیش‌فرض: `defined`

#### format
نام و مسیر فایل خروجی فرمت‌کننده مورد استفاده.
WebdriverIO عمدتاً فقط از [فرمت‌کننده‌هایی](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) که خروجی را به یک فایل می‌نویسند پشتیبانی می‌کند.

نوع: `string[]`<br />

#### formatOptions
گزینه‌هایی که باید به فرمت‌کننده‌ها ارائه شوند

نوع: `object`<br />

#### tagsInTitle
برچسب‌های خیار را به نام ویژگی یا سناریو اضافه کنید

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه مخصوص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### ignoreUndefinedDefinitions
تعاریف تعریف نشده را به عنوان هشدار در نظر بگیرید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه مخصوص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### failAmbiguousDefinitions
تعاریف مبهم را به عنوان خطا در نظر بگیرید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه مخصوص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### tagExpression
فقط ویژگی‌ها یا سناریوهایی با برچسب‌های مطابق با عبارت را اجرا کنید.
لطفاً برای جزئیات بیشتر به [مستندات Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) مراجعه کنید.

نوع: `String`<br />
پیش‌فرض: ``

***لطفاً توجه داشته باشید که این گزینه در آینده منسوخ خواهد شد. به جای آن از ویژگی پیکربندی [`tags`](#tags) استفاده کنید***

#### profile
مشخص کنید که از کدام پروفایل استفاده شود.

نوع: `string[]`<br />
پیش‌فرض: `[]`

***لطفاً توجه داشته باشید که فقط مقادیر خاصی (worldParameters، name، retryTagFilter) در پروفایل‌ها پشتیبانی می‌شوند، زیرا `cucumberOpts` اولویت دارد. علاوه بر این، هنگام استفاده از یک پروفایل، مطمئن شوید که مقادیر ذکر شده در `cucumberOpts` اعلام نشده‌اند.***

### رد کردن تست‌ها در cucumber

توجه داشته باشید که اگر می‌خواهید با استفاده از قابلیت‌های فیلتر تست معمولی cucumber موجود در `cucumberOpts` تستی را رد کنید، این کار را برای تمام مرورگرها و دستگاه‌های پیکربندی شده در قابلیت‌ها انجام خواهید داد. به منظور قادر بودن به رد کردن سناریوها فقط برای ترکیب‌های خاص قابلیت‌ها بدون شروع یک جلسه در صورت عدم نیاز، webdriverio نحو برچسب خاص زیر را برای cucumber ارائه می‌دهد:

`@skip([condition])`

که شرط یک ترکیب اختیاری از ویژگی‌های قابلیت‌ها با مقادیر آنهاست که وقتی **همه** با ویژگی یا سناریوی برچسب‌گذاری شده مطابقت داشته باشند، باعث رد شدن آن می‌شوند. البته می‌توانید چندین برچسب به سناریوها و ویژگی‌ها اضافه کنید تا تست‌ها را تحت چندین شرایط مختلف رد کنید.

همچنین می‌توانید از یادداشت '@skip' برای رد کردن تست‌ها بدون تغییر `tagExpression` استفاده کنید. در این حالت تست‌های رد شده در گزارش تست نمایش داده می‌شوند.

در اینجا چند نمونه از این نحو آمده است:
- `@skip` یا `@skip()`: همیشه مورد برچسب‌دار را رد می‌کند
- `@skip(browserName="chrome")`: تست در مرورگرهای chrome اجرا نخواهد شد.
- `@skip(browserName="firefox";platformName="linux")`: تست را در اجراهای firefox روی linux رد می‌کند.
- `@skip(browserName=["chrome","firefox"])`: موارد برچسب‌دار برای هر دو مرورگر chrome و firefox رد خواهند شد.
- `@skip(browserName=/i.*explorer/)`: قابلیت‌های با مرورگرهایی که با عبارت منظم مطابقت دارند رد خواهند شد (مانند `iexplorer`، `internet explorer`، `internet-explorer` و ...).

### وارد کردن کمک‌کننده تعریف گام

برای استفاده از کمک‌کننده تعریف گام مانند `Given`، `When` یا `Then` یا قلاب‌ها، شما باید آنها را از `@cucumber/cucumber` وارد کنید، مثلاً به این شکل:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

حال، اگر شما قبلاً از Cucumber برای انواع دیگری از تست‌های بی‌ارتباط با WebdriverIO استفاده می‌کنید که برای آن از یک نسخه خاص استفاده می‌کنید، باید این کمک‌کننده‌ها را در تست‌های e2e خود از بسته Cucumber مربوط به WebdriverIO وارد کنید، مثلاً:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

این اطمینان می‌دهد که شما از کمک‌کننده‌های درست در چارچوب WebdriverIO استفاده می‌کنید و به شما امکان می‌دهد از یک نسخه مستقل Cucumber برای انواع دیگر تست استفاده کنید.

### انتشار گزارش

Cucumber قابلیتی را برای انتشار گزارش‌های اجرای تست شما به `https://reports.cucumber.io/` ارائه می‌دهد، که می‌تواند با تنظیم پرچم `publish` در `cucumberOpts` یا با پیکربندی متغیر محیطی `CUCUMBER_PUBLISH_TOKEN` کنترل شود. با این حال، وقتی از `WebdriverIO` برای اجرای تست استفاده می‌کنید، این روش محدودیتی دارد. این روش گزارش‌ها را به طور جداگانه برای هر فایل ویژگی به‌روز می‌کند، که مشاهده یک گزارش یکپارچه را دشوار می‌سازد.

برای غلبه بر این محدودیت، ما یک روش مبتنی بر وعده به نام `publishCucumberReport` در `@wdio/cucumber-framework` معرفی کرده‌ایم. این روش باید در قلاب `onComplete` فراخوانی شود، که مکان بهینه برای فراخوانی آن است. `publishCucumberReport` نیاز به ورودی دایرکتوری گزارش دارد که در آن گزارش‌های پیام خیار ذخیره می‌شوند.

می‌توانید گزارش‌های `cucumber message` را با پیکربندی گزینه `format` در `cucumberOpts` خود ایجاد کنید. به شدت توصیه می‌شود یک نام فایل پویا در گزینه فرمت `cucumber message` ارائه دهید تا از بازنویسی گزارش‌ها جلوگیری شود و اطمینان حاصل شود که هر اجرای تست به درستی ثبت می‌شود.

قبل از استفاده از این تابع، مطمئن شوید که متغیرهای محیطی زیر را تنظیم کرده‌اید:
- CUCUMBER_PUBLISH_REPORT_URL: URL که می‌خواهید گزارش Cucumber را در آن منتشر کنید. اگر ارائه نشود، URL پیش‌فرض 'https://messages.cucumber.io/api/reports' استفاده خواهد شد.
- CUCUMBER_PUBLISH_REPORT_TOKEN: توکن مجوز لازم برای انتشار گزارش. اگر این توکن تنظیم نشده باشد، تابع بدون انتشار گزارش خارج می‌شود.

در اینجا نمونه‌ای از پیکربندی‌های لازم و نمونه‌های کد برای پیاده‌سازی آمده است:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... سایر گزینه‌های پیکربندی
    cucumberOpts: {
        // ... پیکربندی گزینه‌های Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

لطفاً توجه داشته باشید که `./reports/` دایرکتوری است که گزارش‌های `cucumber message` در آن ذخیره خواهند شد.

## استفاده از Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) یک فریم‌ورک متن‌باز است که برای سریع‌تر، مشارکتی‌تر و مقیاس‌پذیرتر کردن آزمون پذیرش و رگرسیون سیستم‌های نرم‌افزاری پیچیده طراحی شده است.

برای مجموعه تست‌های WebdriverIO، Serenity/JS موارد زیر را ارائه می‌دهد:
- [گزارش‌دهی پیشرفته](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - می‌توانید از Serenity/JS
  به عنوان جایگزین هر فریم‌ورک داخلی WebdriverIO استفاده کنید تا گزارش‌های اجرای تست عمیق و مستندات زنده پروژه خود را تولید کنید.
- [APIهای الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - برای قابل حمل و قابل استفاده مجدد کردن کد تست خود در سراسر پروژه‌ها و تیم‌ها،
  Serenity/JS به شما یک [لایه انتزاعی](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) روی APIهای اصلی WebdriverIO می‌دهد.
- [کتابخانه‌های یکپارچه‌سازی](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - برای مجموعه تست‌هایی که از الگوی Screenplay پیروی می‌کنند،
  Serenity/JS همچنین کتابخانه‌های یکپارچه‌سازی اختیاری را برای کمک به شما در نوشتن [تست‌های API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)،
  [مدیریت سرورهای محلی](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)، [انجام تأییدها](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) و موارد دیگر ارائه می‌دهد!

![نمونه گزارش Serenity BDD](/img/serenity-bdd-reporter.png)

### نصب Serenity/JS

برای اضافه کردن Serenity/JS به یک [پروژه موجود WebdriverIO](https://webdriver.io/docs/gettingstarted)، ماژول‌های Serenity/JS زیر را از NPM نصب کنید:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

درباره ماژول‌های Serenity/JS بیشتر بیاموزید:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### پیکربندی Serenity/JS

برای فعال‌سازی یکپارچه‌سازی با Serenity/JS، WebdriverIO را به شرح زیر پیکربندی کنید:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // به WebdriverIO بگویید از فریم‌ورک Serenity/JS استفاده کند
    framework: '@serenity-js/webdriverio',

    // پیکربندی Serenity/JS
    serenity: {
        // Serenity/JS را پیکربندی کنید تا از آداپتور مناسب برای اجراکننده تست شما استفاده کند
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سرویس‌های گزارشگری Serenity/JS، یعنی "گروه صحنه" را ثبت کنید
        crew: [
            // اختیاری، نتایج اجرای تست را به خروجی استاندارد چاپ کنید
            '@serenity-js/console-reporter',

            // اختیاری، گزارش‌های Serenity BDD و مستندات زنده (HTML) تولید کنید
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // اختیاری، به طور خودکار هنگام شکست تعامل، اسکرین‌شات بگیرید
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // اجراکننده Cucumber خود را پیکربندی کنید
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در زیر ببینید
    },


    // ... یا اجراکننده Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در زیر ببینید
    },

    // ... یا اجراکننده Mocha
    mochaOpts: {
        // گزینه‌های پیکربندی Mocha را در زیر ببینید
    },

    runner: 'local',

    // هر پیکربندی دیگر WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // به WebdriverIO بگویید از فریم‌ورک Serenity/JS استفاده کند
    framework: '@serenity-js/webdriverio',

    // پیکربندی Serenity/JS
    serenity: {
        // Serenity/JS را پیکربندی کنید تا از آداپتور مناسب برای اجراکننده تست شما استفاده کند
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سرویس‌های گزارشگری Serenity/JS، یعنی "گروه صحنه" را ثبت کنید
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // اجراکننده Cucumber خود را پیکربندی کنید
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در زیر ببینید
    },


    // ... یا اجراکننده Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در زیر ببینید
    },

    // ... یا اجراکننده Mocha
    mochaOpts: {
        // گزینه‌های پیکربندی Mocha را در زیر ببینید
    },

    runner: 'local',

    // هر پیکربندی دیگر WebdriverIO
};
```

</TabItem>
</Tabs>

درباره موارد زیر بیشتر بیاموزید:
- [گزینه‌های پیکربندی Cucumber در Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Jasmine در Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Mocha در Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [فایل پیکربندی WebdriverIO](configurationfile)

### تولید گزارش‌های Serenity BDD و مستندات زنده

[گزارش‌ها و مستندات زنده Serenity BDD](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) توسط [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) تولید می‌شوند،
یک برنامه جاوا که توسط ماژول [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) دانلود و مدیریت می‌شود.

برای تولید گزارش‌های Serenity BDD، مجموعه تست شما باید:
- Serenity BDD CLI را دانلود کند، با فراخوانی `serenity-bdd update` که CLI `jar` را به صورت محلی ذخیره می‌کند
- گزارش‌های میانی Serenity BDD `.json` را تولید کند، با ثبت [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) طبق [دستورالعمل پیکربندی](#configuring-serenityjs)
- زمانی که می‌خواهید گزارش را تولید کنید، Serenity BDD CLI را فراخوانی کنید، با فراخوانی `serenity-bdd run`

الگوی مورد استفاده در تمام [قالب‌های پروژه Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) مبتنی بر استفاده از:
- یک اسکریپت NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) برای دانلود Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) برای اجرای فرآیند گزارش‌دهی حتی اگر خود مجموعه تست شکست خورده باشد (که دقیقاً زمانی است که شما بیشترین نیاز به گزارش‌های تست را دارید...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) به عنوان یک روش راحت برای حذف هر گزارش تستی که از اجرای قبلی باقی مانده است

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

برای کسب اطلاعات بیشتر درباره `SerenityBDDReporter`، لطفاً مراجعه کنید به:
- دستورالعمل‌های نصب در [مستندات `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)،
- نمونه‌های پیکربندی در [مستندات API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [نمونه‌های Serenity/JS در GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استفاده از APIهای الگوی Screenplay Serenity/JS

[الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) یک رویکرد نوآورانه و کاربرمحور برای نوشتن تست‌های پذیرش خودکار با کیفیت بالا است. این الگو شما را به سمت استفاده مؤثر از لایه‌های انتزاعی هدایت می‌کند،
کمک می‌کند تا سناریوهای تست شما لغات تجاری دامنه شما را به تصویر بکشند، و عادات خوب تست و مهندسی نرم‌افزار را در تیم شما تشویق می‌کند.

به طور پیش‌فرض، وقتی `@serenity-js/webdriverio` را به عنوان `framework` WebdriverIO خود ثبت می‌کنید،
Serenity/JS یک [گروه](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) پیش‌فرض از [بازیگران](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) را پیکربندی می‌کند،
که هر بازیگر می‌تواند:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

این باید کافی باشد تا به شما کمک کند حتی با معرفی سناریوهای تستی که از الگوی Screenplay پیروی می‌کنند به یک مجموعه تست موجود شروع کنید، مثلا:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

برای آموختن بیشتر درباره الگوی Screenplay، بررسی کنید:
- [الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [تست وب با Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)
