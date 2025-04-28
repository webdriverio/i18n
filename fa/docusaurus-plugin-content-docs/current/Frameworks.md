---
id: frameworks
title: فریم‌ورک‌ها
---

WebdriverIO Runner از [Mocha](http://mochajs.org/)، [Jasmine](http://jasmine.github.io/)، و [Cucumber.js](https://cucumber.io/) به صورت پیش‌فرض پشتیبانی می‌کند. شما همچنین می‌توانید آن را با فریم‌ورک‌های متن‌باز شخص ثالث، مانند [Serenity/JS](#using-serenityjs) ادغام کنید.

:::tip ادغام WebdriverIO با فریم‌ورک‌های تست
برای ادغام WebdriverIO با یک فریم‌ورک تست، شما نیاز به یک بسته adapter دارید که در NPM در دسترس باشد.
توجه داشته باشید که بسته adapter باید در همان محلی نصب شود که WebdriverIO نصب شده است.
بنابراین، اگر WebdriverIO را به صورت جهانی نصب کرده‌اید، مطمئن شوید که بسته adapter را نیز به صورت جهانی نصب کنید.
:::

ادغام WebdriverIO با یک فریم‌ورک تست به شما امکان می‌دهد به نمونه WebDriver با استفاده از متغیر جهانی `browser`
در فایل‌های spec یا تعاریف قدم‌های خود دسترسی داشته باشید.
توجه کنید که WebdriverIO همچنین مسئول ایجاد و پایان دادن به جلسه Selenium خواهد بود، بنابراین نیازی نیست که خودتان این کار را انجام دهید.

## استفاده از Mocha

ابتدا، بسته adapter را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

به طور پیش‌فرض WebdriverIO یک [کتابخانه assertion](assertion) ارائه می‌دهد که به صورت داخلی ساخته شده و می‌توانید بلافاصله از آن استفاده کنید:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO از رابط‌های `BDD` (پیش‌فرض)، `TDD`، و `QUnit` [Mocha](https://mochajs.org/#interfaces) پشتیبانی می‌کند.

اگر می‌خواهید spec‌های خود را با سبک TDD بنویسید، ویژگی `ui` را در تنظیمات `mochaOpts` خود به `tdd` تنظیم کنید. اکنون فایل‌های تست شما باید به صورت زیر نوشته شوند:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

اگر می‌خواهید تنظیمات خاص Mocha دیگری را تعریف کنید، می‌توانید این کار را با کلید `mochaOpts` در فایل پیکربندی خود انجام دهید. لیستی از تمام گزینه‌ها را می‌توانید در [وب‌سایت پروژه Mocha](https://mochajs.org/api/mocha) پیدا کنید.

__نکته:__ WebdriverIO از استفاده منسوخ شده از callback های `done` در Mocha پشتیبانی نمی‌کند:

```js
it('should test something', (done) => {
    done() // خطای "done is not a function" را می‌اندازد
})
```

### گزینه‌های Mocha

گزینه‌های زیر را می‌توان در `wdio.conf.js` شما اعمال کرد تا محیط Mocha خود را پیکربندی کنید. __نکته:__ همه گزینه‌ها پشتیبانی نمی‌شوند، مثلاً اعمال گزینه `parallel` منجر به خطا می‌شود زیرا testrunner WDIO روش خاص خود را برای اجرای تست‌ها به صورت موازی دارد. می‌توانید این گزینه‌های فریم‌ورک را به عنوان آرگومان ارسال کنید، به عنوان مثال:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

این دستور گزینه‌های Mocha زیر را ارسال می‌کند:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

گزینه‌های Mocha زیر پشتیبانی می‌شوند:

#### require
گزینه `require` زمانی مفید است که می‌خواهید برخی قابلیت‌های اساسی را اضافه یا گسترش دهید (گزینه فریم‌ورک WebdriverIO).

نوع: `string|string[]`<br />
پیش‌فرض: `[]`

#### compilers
از ماژول(های) داده شده برای کامپایل فایل‌ها استفاده کنید. کامپایلرها قبل از نیازمندی‌ها اضافه می‌شوند (گزینه فریم‌ورک WebdriverIO).

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### allowUncaught
انتشار خطاهای مدیریت نشده.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### bail
توقف پس از اولین شکست تست.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### checkLeaks
بررسی نشت متغیرهای جهانی.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### delay
تاخیر در اجرای سوئیت اصلی.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### fgrep
فیلتر تست با رشته داده شده.

نوع: `string`<br />
پیش‌فرض: `null`

#### forbidOnly
تست‌های علامت‌گذاری شده با `only` باعث شکست سوئیت می‌شوند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### forbidPending
تست‌های معلق باعث شکست سوئیت می‌شوند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### fullTrace
استک‌تریس کامل در صورت شکست.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### global
متغیرهای مورد انتظار در دامنه جهانی.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### grep
فیلتر تست با عبارت منظم داده شده.

نوع: `RegExp|string`<br />
پیش‌فرض: `null`

#### invert
معکوس کردن تطابق فیلتر تست.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### retries
تعداد دفعات تلاش مجدد برای تست‌های ناموفق.

نوع: `number`<br />
پیش‌فرض: `0`

#### timeout
مقدار آستانه زمان انتظار (به میلی‌ثانیه).

نوع: `number`<br />
پیش‌فرض: `30000`

## استفاده از Jasmine

ابتدا، بسته adapter را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

سپس می‌توانید محیط Jasmine خود را با تنظیم یک ویژگی `jasmineOpts` در پیکربندی خود تنظیم کنید. لیستی از تمام گزینه‌ها را می‌توانید در [وب‌سایت پروژه Jasmine](https://jasmine.github.io/api/3.5/Configuration.html) پیدا کنید.

### گزینه‌های Jasmine

گزینه‌های زیر را می‌توان در `wdio.conf.js` شما با استفاده از ویژگی `jasmineOpts` برای پیکربندی محیط Jasmine خود اعمال کرد. برای اطلاعات بیشتر در مورد این گزینه‌های پیکربندی، [مستندات Jasmine](https://jasmine.github.io/api/edge/Configuration) را بررسی کنید. می‌توانید این گزینه‌های فریم‌ورک را به عنوان آرگومان ارسال کنید، به عنوان مثال:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

این دستور گزینه‌های Mocha زیر را ارسال می‌کند:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

گزینه‌های Jasmine زیر پشتیبانی می‌شوند:

#### defaultTimeoutInterval
فاصله زمانی انتظار پیش‌فرض برای عملیات‌های Jasmine.

نوع: `number`<br />
پیش‌فرض: `60000`

#### helpers
آرایه‌ای از مسیرهای فایل (و الگوها) نسبت به spec_dir برای اضافه کردن قبل از اجرای spec های jasmine.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### requires
گزینه `requires` زمانی مفید است که می‌خواهید برخی قابلیت‌های اساسی را اضافه یا گسترش دهید.

نوع: `string[]`<br />
پیش‌فرض: `[]`

#### random
آیا ترتیب اجرای spec تصادفی باشد.

نوع: `boolean`<br />
پیش‌فرض: `true`

#### seed
بذر مورد استفاده به عنوان اساس تصادفی‌سازی. Null باعث می‌شود بذر به صورت تصادفی در ابتدای اجرا تعیین شود.

نوع: `Function`<br />
پیش‌فرض: `null`

#### failSpecWithNoExpectations
آیا spec شکست بخورد اگر هیچ انتظاری را اجرا نکرده است. به طور پیش‌فرض، یک spec که هیچ انتظاری را اجرا نکرده به عنوان قبول شده گزارش می‌شود. تنظیم این به true چنین spec را به عنوان شکست گزارش می‌کند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### oneFailurePerSpec
آیا spec ها فقط یک شکست انتظار داشته باشند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### specFilter
تابعی برای استفاده در فیلتر کردن spec ها.

نوع: `Function`<br />
پیش‌فرض: `(spec) => true`

#### grep
فقط تست‌هایی را اجرا کنید که با این رشته یا regexp مطابقت دارند. (فقط در صورتی که تابع `specFilter` سفارشی تنظیم نشده باشد)

نوع: `string|Regexp`<br />
پیش‌فرض: `null`

#### invertGrep
اگر true باشد، تست‌های مطابق را معکوس می‌کند و فقط تست‌هایی را اجرا می‌کند که با عبارت استفاده شده در `grep` مطابقت ندارند. (فقط در صورتی که تابع `specFilter` سفارشی تنظیم نشده باشد)

نوع: `boolean`<br />
پیش‌فرض: `false`

## استفاده از Cucumber

ابتدا، بسته adapter را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

اگر می‌خواهید از Cucumber استفاده کنید، ویژگی `framework` را به `cucumber` تنظیم کنید با افزودن `framework: 'cucumber'` به [فایل پیکربندی](configurationfile).

گزینه‌های Cucumber را می‌توان در فایل پیکربندی با `cucumberOpts` ارائه کرد. لیست کامل گزینه‌ها را [اینجا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) بررسی کنید.

برای شروع سریع با Cucumber، پروژه [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) ما را بررسی کنید که با تمام تعاریف قدم که برای شروع نیاز دارید همراه است، و شما بلافاصله شروع به نوشتن فایل‌های ویژگی خواهید کرد.

### گزینه‌های Cucumber

گزینه‌های زیر را می‌توان در `wdio.conf.js` شما برای پیکربندی محیط Cucumber با استفاده از ویژگی `cucumberOpts` اعمال کرد:

:::tip تنظیم گزینه‌ها از طریق خط فرمان
گزینه‌های `cucumberOpts`، مانند `tags` سفارشی برای فیلتر کردن تست‌ها، می‌توانند از طریق خط فرمان مشخص شوند. این کار با استفاده از فرمت `cucumberOpts.{optionName}="value"` انجام می‌شود.

به عنوان مثال، اگر می‌خواهید فقط تست‌هایی را اجرا کنید که با برچسب `@smoke` برچسب‌گذاری شده‌اند، می‌توانید از دستور زیر استفاده کنید:

```sh
# زمانی که فقط می‌خواهید تست‌هایی را اجرا کنید که برچسب "@smoke" دارند
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

این دستور گزینه `tags` را در `cucumberOpts` به `@smoke` تنظیم می‌کند، و اطمینان می‌دهد که فقط تست‌هایی با این برچسب اجرا می‌شوند.

:::

#### backtrace
نمایش کامل backtrace برای خطاها.

نوع: `Boolean`<br />
پیش‌فرض: `true`

#### requireModule
ماژول‌های مورد نیاز قبل از نیاز به هر فایل پشتیبانی.

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
توقف اجرا پس از اولین شکست.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### name
فقط سناریوهایی را اجرا کنید که نام آن‌ها با عبارت مطابقت دارد (قابل تکرار).

نوع: `RegExp[]`<br />
پیش‌فرض: `[]`

#### require
فایل‌های حاوی تعاریف قدم شما را قبل از اجرای ویژگی‌ها لازم بدانید. همچنین می‌توانید یک الگو را برای تعاریف قدم خود مشخص کنید.

نوع: `string[]`<br />
پیش‌فرض: `[]`
مثال:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
مسیرهایی به محل کد پشتیبانی شما، برای ESM.

نوع: `String[]`<br />
پیش‌فرض: `[]`
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
اگر هر قدم تعریف نشده یا در حال انتظار وجود داشته باشد، شکست بخورد.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### tags
فقط ویژگی‌ها یا سناریوهایی را با برچسب‌هایی که با عبارت مطابقت دارند اجرا کنید.
لطفاً برای جزئیات بیشتر [مستندات Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) را ببینید.

نوع: `String`<br />
پیش‌فرض: ``

#### timeout
زمان انتظار به میلی‌ثانیه برای تعاریف قدم.

نوع: `Number`<br />
پیش‌فرض: `30000`

#### retry
تعداد دفعات تلاش مجدد برای موارد تست شکست خورده را مشخص کنید.

نوع: `Number`<br />
پیش‌فرض: `0`

#### retryTagFilter
فقط ویژگی‌ها یا سناریوهایی را با برچسب‌هایی که با عبارت مطابقت دارند تلاش مجدد کنید (قابل تکرار). این گزینه نیاز به مشخص شدن '--retry' دارد.

نوع: `RegExp`

#### language
زبان پیش‌فرض برای فایل‌های ویژگی شما

نوع: `String`<br />
پیش‌فرض: `en`

#### order
اجرای تست‌ها به ترتیب تعریف شده / تصادفی

نوع: `String`<br />
پیش‌فرض: `defined`

#### format
نام و مسیر فایل خروجی فرمت‌دهنده برای استفاده.
WebdriverIO به طور اصلی فقط از [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) که خروجی را به یک فایل می‌نویسند پشتیبانی می‌کند.

نوع: `string[]`<br />

#### formatOptions
گزینه‌هایی که باید به فرمت‌دهنده‌ها ارائه شوند

نوع: `object`<br />

#### tagsInTitle
افزودن برچسب‌های cucumber به نام ویژگی یا سناریو

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه خاص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### ignoreUndefinedDefinitions
تعاریف تعریف نشده را به عنوان هشدار در نظر بگیرید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه خاص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### failAmbiguousDefinitions
تعاریف مبهم را به عنوان خطا در نظر بگیرید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

***لطفاً توجه داشته باشید که این یک گزینه خاص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### tagExpression
فقط ویژگی‌ها یا سناریوهایی را با برچسب‌هایی که با عبارت مطابقت دارند اجرا کنید.
لطفاً برای جزئیات بیشتر [مستندات Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) را ببینید.

نوع: `String`<br />
پیش‌فرض: ``

***لطفاً توجه کنید که این گزینه در آینده منسوخ خواهد شد. به جای آن از ویژگی پیکربندی [`tags`](#tags) استفاده کنید***

#### profile
پروفایل مورد استفاده را مشخص کنید.

نوع: `string[]`<br />
پیش‌فرض: `[]`

***لطفاً توجه داشته باشید که فقط مقادیر خاصی (worldParameters، name، retryTagFilter) در پروفایل‌ها پشتیبانی می‌شوند، زیرا `cucumberOpts` اولویت دارد. علاوه بر این، هنگام استفاده از یک پروفایل، مطمئن شوید که مقادیر ذکر شده در `cucumberOpts` اعلام نشده‌اند.***

### رد کردن تست‌ها در cucumber

توجه کنید که اگر می‌خواهید تستی را با استفاده از قابلیت‌های فیلتر کردن تست معمولی cucumber که در `cucumberOpts` در دسترس است رد کنید، این کار را برای همه مرورگرها و دستگاه‌های پیکربندی شده در امکانات انجام می‌دهید. برای اینکه بتوانید سناریوها را فقط برای ترکیب‌های خاص امکانات بدون شروع یک جلسه در صورت عدم نیاز رد کنید، webdriverio نحو تگ خاص زیر را برای cucumber ارائه می‌دهد:

`@skip([condition])`

که شرط یک ترکیب اختیاری از ویژگی‌های امکانات با مقادیر آنهاست که وقتی **همه** با سناریو یا ویژگی برچسب‌گذاری شده مطابقت داشته باشند، باعث رد شدن آن می‌شوند. البته می‌توانید چندین برچسب به سناریوها و ویژگی‌ها اضافه کنید تا یک تست را تحت چندین شرایط مختلف رد کنید.

همچنین می‌توانید از برچسب '@skip' برای رد کردن تست‌ها بدون تغییر 'tagExpression' استفاده کنید. در این صورت تست‌های رد شده در گزارش تست نمایش داده می‌شوند.

در اینجا چند مثال از این نحو را مشاهده می‌کنید:
- `@skip` یا `@skip()`: همیشه مورد برچسب‌گذاری شده را رد می‌کند
- `@skip(browserName="chrome")`: تست در مرورگرهای chrome اجرا نخواهد شد.
- `@skip(browserName="firefox";platformName="linux")`: تست را در اجراهای firefox روی linux رد می‌کند.
- `@skip(browserName=["chrome","firefox"])`: موارد برچسب‌گذاری شده برای هر دو مرورگر chrome و firefox رد می‌شوند.
- `@skip(browserName=/i.*explorer/)`: امکاناتی با مرورگرهایی که با regexp مطابقت دارند رد می‌شوند (مانند `iexplorer`، `internet explorer`، `internet-explorer` و ...).

### وارد کردن کمک‌کننده تعریف قدم

برای استفاده از کمک‌کننده تعریف قدم مانند `Given`، `When` یا `Then` یا هوک‌ها، باید آنها را از `@cucumber/cucumber` وارد کنید، مثلاً به این صورت:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

حالا، اگر از Cucumber برای انواع دیگری از تست‌ها که با WebdriverIO بی‌ارتباط هستند و برای آنها از یک نسخه خاص استفاده می‌کنید، باید این کمک‌کننده‌ها را در تست‌های e2e خود از بسته Cucumber WebdriverIO وارد کنید، مثلاً:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

این اطمینان می‌دهد که از کمک‌کننده‌های مناسب در چارچوب WebdriverIO استفاده می‌کنید و به شما امکان می‌دهد از یک نسخه مستقل Cucumber برای انواع دیگر تست استفاده کنید.

### انتشار گزارش

Cucumber ویژگی‌ای برای انتشار گزارش‌های اجرای تست خود به `https://reports.cucumber.io/` ارائه می‌دهد، که می‌تواند با تنظیم پرچم `publish` در `cucumberOpts` یا با پیکربندی متغیر محیطی `CUCUMBER_PUBLISH_TOKEN` کنترل شود. با این حال، وقتی از `WebdriverIO` برای اجرای تست استفاده می‌کنید، محدودیتی با این رویکرد وجود دارد. این روش گزارش‌ها را به طور جداگانه برای هر فایل ویژگی به‌روز می‌کند، که مشاهده یک گزارش یکپارچه را دشوار می‌سازد.

برای غلبه بر این محدودیت، یک روش مبتنی بر promise به نام `publishCucumberReport` در `@wdio/cucumber-framework` معرفی کرده‌ایم. این روش باید در هوک `onComplete` فراخوانی شود، که مکان بهینه برای فراخوانی آن است. `publishCucumberReport` نیاز به ورودی دایرکتوری گزارش دارد که گزارش‌های پیام cucumber در آن ذخیره می‌شوند.

می‌توانید گزارش‌های `cucumber message` را با پیکربندی گزینه `format` در `cucumberOpts` خود تولید کنید. به شدت توصیه می‌شود یک نام فایل پویا در گزینه فرمت `cucumber message` ارائه دهید تا از بازنویسی گزارش‌ها جلوگیری شود و اطمینان حاصل شود که هر اجرای تست به درستی ثبت می‌شود.

قبل از استفاده از این تابع، مطمئن شوید که متغیرهای محیطی زیر را تنظیم کرده‌اید:
- CUCUMBER_PUBLISH_REPORT_URL: URL که می‌خواهید گزارش Cucumber را در آن منتشر کنید. اگر ارائه نشود، URL پیش‌فرض 'https://messages.cucumber.io/api/reports' استفاده خواهد شد.
- CUCUMBER_PUBLISH_REPORT_TOKEN: توکن مجوز مورد نیاز برای انتشار گزارش. اگر این توکن تنظیم نشده باشد، تابع بدون انتشار گزارش خارج می‌شود.

در اینجا نمونه‌ای از پیکربندی‌های لازم و نمونه‌های کد برای پیاده‌سازی آورده شده است:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... گزینه‌های پیکربندی دیگر
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

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) یک فریم‌ورک متن‌باز است که برای سریع‌تر، مشارکتی‌تر و مقیاس‌پذیرتر کردن تست پذیرش و رگرسیون سیستم‌های نرم‌افزاری پیچیده طراحی شده است.

برای سوئیت‌های تست WebdriverIO، Serenity/JS موارد زیر را ارائه می‌دهد:
- [گزارش‌دهی پیشرفته](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - می‌توانید از Serenity/JS
  به عنوان جایگزین هر فریم‌ورک داخلی WebdriverIO استفاده کنید تا گزارش‌های عمیق اجرای تست و مستندات زنده از پروژه خود تولید کنید.
- [APIهای الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - برای قابل حمل و قابل استفاده مجدد کردن کد تست خود در پروژه‌ها و تیم‌ها،
  Serenity/JS یک [لایه انتزاعی](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) اختیاری در بالای APIهای بومی WebdriverIO ارائه می‌دهد.
- [کتابخانه‌های ادغام](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - برای سوئیت‌های تست که از الگوی Screenplay پیروی می‌کنند،
  Serenity/JS همچنین کتابخانه‌های ادغام اختیاری برای کمک به نوشتن [تست‌های API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)،
  [مدیریت سرورهای محلی](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)، [انجام assertion ها](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) و موارد دیگر ارائه می‌دهد!

![نمونه گزارش Serenity BDD](/img/serenity-bdd-reporter.png)

### نصب Serenity/JS

برای افزودن Serenity/JS به یک [پروژه WebdriverIO موجود](https://webdriver.io/docs/gettingstarted)، ماژول‌های Serenity/JS زیر را از NPM نصب کنید:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

بیشتر درباره ماژول‌های Serenity/JS بیاموزید:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### پیکربندی Serenity/JS

برای فعال کردن ادغام با Serenity/JS، WebdriverIO را به صورت زیر پیکربندی کنید:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // به WebdriverIO بگویید از فریم‌ورک Serenity/JS استفاده کند
    framework: '@serenity-js/webdriverio',

    // پیکربندی Serenity/JS
    serenity: {
        // پیکربندی Serenity/JS برای استفاده از آداپتور مناسب برای test runner شما
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // ثبت سرویس‌های گزارش‌دهی Serenity/JS، همچنین معروف به "stage crew"
        crew: [
            // اختیاری، نتایج اجرای تست را به خروجی استاندارد چاپ کنید
            '@serenity-js/console-reporter',

            // اختیاری، گزارش‌ها و مستندات زنده Serenity BDD تولید کنید (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // اختیاری، به طور خودکار در صورت شکست تعامل عکس بگیرید
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // پیکربندی runner Cucumber خود
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در زیر ببینید
    },


    // ... یا runner Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در زیر ببینید
    },

    // ... یا runner Mocha
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
        // پیکربندی Serenity/JS برای استفاده از آداپتور مناسب برای test runner شما
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // ثبت سرویس‌های گزارش‌دهی Serenity/JS، همچنین معروف به "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // پیکربندی runner Cucumber خود
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در زیر ببینید
    },


    // ... یا runner Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در زیر ببینید
    },

    // ... یا runner Mocha
    mochaOpts: {
        // گزینه‌های پیکربندی Mocha را در زیر ببینید
    },

    runner: 'local',

    // هر پیکربندی دیگر WebdriverIO
};
```

</TabItem>
</Tabs>

بیشتر بیاموزید درباره:
- [گزینه‌های پیکربندی Cucumber Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Jasmine Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Mocha Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [فایل پیکربندی WebdriverIO](configurationfile)

### تولید گزارش‌ها و مستندات زنده Serenity BDD

[گزارش‌ها و مستندات زنده Serenity BDD](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) توسط [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) تولید می‌شوند،
یک برنامه جاوا که توسط ماژول [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) دانلود و مدیریت می‌شود.

برای تولید گزارش‌های Serenity BDD، سوئیت تست شما باید:
- Serenity BDD CLI را دانلود کند، با فراخوانی `serenity-bdd update` که CLI `jar` را به صورت محلی کش می‌کند
- گزارش‌های میانی Serenity BDD `.json` تولید کند، با ثبت [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) مطابق با [دستورالعمل‌های پیکربندی](#پیکربندی-serenityjs)
- Serenity BDD CLI را زمانی که می‌خواهید گزارش تولید کنید فراخوانی کنید، با فراخوانی `serenity-bdd run`

الگوی مورد استفاده توسط همه [قالب‌های پروژه Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) بر استفاده از موارد زیر متکی است:
- یک اسکریپت NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) برای دانلود Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) برای اجرای فرآیند گزارش‌دهی حتی اگر خود سوئیت تست شکست خورده باشد (که دقیقاً زمانی است که بیشتر از همه به گزارش‌های تست نیاز دارید...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) به عنوان یک روش راحت برای حذف هرگونه گزارش تست باقیمانده از اجرای قبلی

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

برای آموختن بیشتر درباره `SerenityBDDReporter`، لطفاً مراجعه کنید به:
- دستورالعمل‌های نصب در [مستندات `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)،
- نمونه‌های پیکربندی در [مستندات API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [نمونه‌های Serenity/JS در GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استفاده از APIهای الگوی Screenplay Serenity/JS

[الگوی Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) یک رویکرد نوآورانه و کاربرمحور برای نوشتن تست‌های پذیرش خودکار با کیفیت بالا است. این الگو شما را به سمت استفاده موثر از لایه‌های انتزاع هدایت می‌کند،
به سناریوهای تست شما کمک می‌کند تا اصطلاحات تجاری دامنه شما را به خود بگیرد، و عادت‌های خوب تست و مهندسی نرم‌افزار را در تیم شما تشویق می‌کند.

به طور پیش‌فرض، وقتی `@serenity-js/webdriverio` را به عنوان `framework` WebdriverIO خود ثبت می‌کنید،
Serenity/JS یک [گروه](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) پیش‌فرض از [بازیگران](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) را پیکربندی می‌کند،
که هر بازیگر می‌تواند:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

این باید برای کمک به شما در شروع معرفی سناریوهای تست که از الگوی Screenplay پیروی می‌کنند حتی به یک سوئیت تست موجود کافی باشد، برای مثال:

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