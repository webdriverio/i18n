---
id: frameworks
title: فریم‌ورک‌ها
description: "پیکربندی Mocha، Jasmine یا Cucumber.js به‌عنوان فریم‌ورک تست برای WDIO testrunner، یا یکپارچه‌سازی فریم‌ورک‌های شخص ثالث مانند Serenity/JS."
---

WebdriverIO Runner به‌صورت داخلی از [Mocha](http://mochajs.org/)، [Jasmine](http://jasmine.github.io/) و [Cucumber.js](https://cucumber.io/) پشتیبانی می‌کند. همچنین می‌توانید آن را با فریم‌ورک‌های متن‌باز شخص ثالث، مانند [Serenity/JS](#using-serenityjs)، یکپارچه کنید.

:::tip یکپارچه‌سازی WebdriverIO با فریم‌ورک‌های تست
برای یکپارچه‌سازی WebdriverIO با یک فریم‌ورک تست، به یک بسته‌ی آداپتور موجود در NPM نیاز دارید.
توجه داشته باشید که بسته‌ی آداپتور باید در همان مکانی نصب شود که WebdriverIO نصب شده است.
بنابراین، اگر WebdriverIO را به‌صورت سراسری نصب کرده‌اید، حتماً بسته‌ی آداپتور را نیز به‌صورت سراسری نصب کنید.
:::

یکپارچه‌سازی WebdriverIO با یک فریم‌ورک تست به شما امکان می‌دهد با استفاده از متغیر سراسری `browser`
در فایل‌های spec یا تعاریف step خود به نمونه‌ی WebDriver دسترسی داشته باشید.
توجه داشته باشید که WebdriverIO همچنین ایجاد و پایان دادن به نشست Selenium را بر عهده می‌گیرد، بنابراین لازم نیست
خودتان این کار را انجام دهید.

## استفاده از Mocha

ابتدا بسته‌ی آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

به‌طور پیش‌فرض WebdriverIO یک [کتابخانه‌ی assertion](assertion) داخلی ارائه می‌دهد که می‌توانید بلافاصله از آن استفاده کنید:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 همراه با [Mocha 12](https://mochajs.org/) عرضه می‌شود و از [رابط‌های](https://mochajs.org/#interfaces) `BDD` (پیش‌فرض)، `TDD` و `QUnit` در Mocha پشتیبانی می‌کند.

اگر مایلید specهای خود را به سبک TDD بنویسید، ویژگی `ui` را در پیکربندی `mochaOpts` خود روی `tdd` تنظیم کنید. اکنون فایل‌های تست شما باید به این شکل نوشته شوند:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

اگر می‌خواهید تنظیمات دیگری مختص Mocha تعریف کنید، می‌توانید این کار را با کلید `mochaOpts` در فایل پیکربندی خود انجام دهید. فهرست همه‌ی گزینه‌ها را می‌توانید در [وب‌سایت پروژه‌ی Mocha](https://mochajs.org/api/mocha) بیابید.

__توجه:__ WebdriverIO از استفاده‌ی منسوخ‌شده از callbackهای `done` در Mocha پشتیبانی نمی‌کند:

```js
it('should test something', (done) => {
    done() // خطای "done is not a function" را پرتاب می‌کند
})
```

### گزینه‌های Mocha

گزینه‌های زیر را می‌توان در `wdio.conf.js` برای پیکربندی محیط Mocha اعمال کرد. __توجه:__ همه‌ی گزینه‌های Mocha پشتیبانی نمی‌شوند. `parallel` همچنان متعلق به worker pool خود Mocha است و در اینجا خطا می‌دهد — WDIO testrunner خودش specها را در میان capabilityها و workerها به‌صورت موازی اجرا می‌کند. CLI در Mocha 12 نیز از yargs به `util.parseArgs` در Node منتقل شده است؛ این تغییر فقط بر فراخوانی مستقیم `mocha` تأثیر می‌گذارد، نه بر `mochaOpts` که از طریق `wdio` ارسال می‌شود. می‌توانید این گزینه‌های فریم‌ورک را به‌صورت آرگومان ارسال کنید، برای مثال:

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

<Option type="string|string[]" default="[]">

گزینه‌ی `require` زمانی مفید است که بخواهید برخی قابلیت‌های پایه را اضافه یا گسترش دهید (گزینه‌ی فریم‌ورک WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

انتشار خطاهای مدیریت‌نشده.

</Option>

#### bail

<Option type="boolean" default="false">

توقف پس از نخستین شکست تست.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

بررسی نشت متغیرهای سراسری.

</Option>

#### delay

<Option type="boolean" default="false">

به تأخیر انداختن اجرای suite ریشه.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

هر تستی را که به‌دلیل شکست hook از نوع `before` یا `beforeEach` رد شده است، به‌عنوان شکست گزارش می‌کند. WebdriverIO این گزینه را فعال می‌کند تا یک hook راه‌اندازی خراب در هر specی که رد کرده قابل مشاهده باشد. برای گزارش تنها خود hook، آن را روی `false` تنظیم کنید.

</Option>

#### fgrep

<Option type="string" default="null">

فیلتر تست با رشته‌ی داده‌شده.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

تست‌هایی که با `only` علامت‌گذاری شده‌اند باعث شکست suite می‌شوند.

</Option>

#### forbidPending

<Option type="boolean" default="false">

تست‌های در انتظار (pending) باعث شکست suite می‌شوند.

</Option>

#### fullTrace

<Option type="boolean" default="false">

نمایش کامل stacktrace هنگام شکست.

</Option>

#### global

<Option type="string[]" default="[]">

متغیرهایی که در دامنه‌ی سراسری انتظار می‌رود.

</Option>

#### grep

<Option type="RegExp|string" default="null">

فیلتر تست با عبارت باقاعده‌ی داده‌شده. Mocha 12 در این فیلتر flagهای مدرن RegExp (برای مثال `s` یا `d`) را می‌پذیرد.

</Option>

#### invert

<Option type="boolean" default="false">

معکوس کردن تطابق‌های فیلتر تست.

</Option>

#### retries

<Option type="number" default="0">

تعداد دفعات تلاش مجدد برای تست‌های ناموفق.

</Option>

#### timeout

<Option type="number" default="30000">

مقدار آستانه‌ی timeout (بر حسب میلی‌ثانیه).

</Option>

## استفاده از Jasmine

ابتدا بسته‌ی آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

سپس می‌توانید محیط Jasmine خود را با تنظیم ویژگی `jasmineOpts` در پیکربندی خود پیکربندی کنید. فهرست همه‌ی گزینه‌ها را می‌توانید در [وب‌سایت پروژه‌ی Jasmine](https://jasmine.github.io/api/edge/Configuration.html) بیابید.

### گزینه‌های Jasmine

گزینه‌های زیر را می‌توان در `wdio.conf.js` برای پیکربندی محیط Jasmine با استفاده از ویژگی `jasmineOpts` اعمال کرد. برای اطلاعات بیشتر درباره‌ی این گزینه‌های پیکربندی، [مستندات Jasmine](https://jasmine.github.io/api/edge/Configuration) را ببینید. می‌توانید این گزینه‌های فریم‌ورک را به‌صورت آرگومان ارسال کنید، برای مثال:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

این کار گزینه‌های Jasmine زیر را ارسال می‌کند:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

گزینه‌های Jasmine زیر پشتیبانی می‌شوند:

#### defaultTimeoutInterval

<Option type="number" default="60000">

بازه‌ی timeout پیش‌فرض برای عملیات Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

آرایه‌ای از مسیرهای فایل (و globها) نسبت به spec_dir که پیش از specهای jasmine بارگذاری می‌شوند.

</Option>

#### requires

<Option type="string[]" default="[]">

گزینه‌ی `requires` زمانی مفید است که بخواهید برخی قابلیت‌های پایه را اضافه یا گسترش دهید.

</Option>

#### random

<Option type="boolean" default="false">

اینکه آیا ترتیب اجرای specها تصادفی شود یا خیر. مقدار پیش‌فرض خود Jasmine برابر `true` است، اما WebdriverIO specها را به ترتیب اجرا می‌کند مگر اینکه این گزینه را تنظیم کنید.

</Option>

#### seed

<Option type="Function" default="null">

seed مورد استفاده به‌عنوان مبنای تصادفی‌سازی. مقدار null باعث می‌شود seed در ابتدای اجرا به‌صورت تصادفی تعیین شود.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

اینکه آیا spec در صورت اجرا نشدن هیچ expectationی ناموفق شود یا خیر. به‌طور پیش‌فرض specی که هیچ expectationی اجرا نکرده باشد موفق گزارش می‌شود. تنظیم این گزینه روی true باعث می‌شود چنین specی به‌عنوان شکست گزارش شود.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

توقف spec در نخستین expectation ناموفق. یک matcher همگام ناموفق، spec را بلافاصله متوقف می‌کند و یک matcher ناهمگام await‌شده، آن را هنگام تعیین وضعیت promise متوقف می‌کند. سایر specها به اجرا ادامه می‌دهند.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

تابعی برای فیلتر کردن specها.

</Option>

#### grep

<Option type="string|Regexp" default="null">

فقط تست‌هایی را اجرا می‌کند که با این رشته یا عبارت باقاعده مطابقت دارند. (فقط زمانی کاربرد دارد که تابع `specFilter` سفارشی تنظیم نشده باشد)

</Option>

#### invertGrep

<Option type="boolean" default="false">

اگر true باشد، تست‌های منطبق را معکوس می‌کند و فقط تست‌هایی را اجرا می‌کند که با عبارت به‌کاررفته در `grep` مطابقت ندارند. (فقط زمانی کاربرد دارد که تابع `specFilter` سفارشی تنظیم نشده باشد)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

فایل spec را در نخستین spec ناموفق (`it`) متوقف می‌کند: سایر specهای فایل اجرا نمی‌شوند، حتی در دیگر بلوک‌های `describe`. سایر فایل‌های spec در workerهای خودشان اجرا می‌شوند و ادامه می‌دهند.

</Option>

#### cleanStack

<Option type="boolean" default="true">

حذف خطوط مربوط به بسته‌های `node_modules` از stack trace شکست‌ها.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

برای هر expectation با `(passed, assertion)` فراخوانی می‌شود، برای مثال برای گرفتن اسکرین‌شات هنگام شکست یک expectation. اگر تابع برای یک expectation موفق خطا پرتاب کند، expectation با همان خطا ناموفق می‌شود.

</Option>

### Assertionها

در Jasmine، `expect` سراسری matcherهای Jasmine و [matcherهای WebdriverIO](/docs/api/expect-webdriverio) را با هم ترکیب می‌کند:

- matcherهای Jasmine (`toBe`، `toEqual`، `toHaveBeenCalled`، …) و matcherهایی که با `jasmine.addMatchers` اضافه می‌کنید همگام هستند. آن‌ها `undefined` برمی‌گردانند، بنابراین به `await` نیازی ندارید.
- matcherهای WebdriverIO، matcherهای ناهمگام Jasmine (`toBeResolved`، `toBeRejectedWith`، …) و matcherهایی که با `jasmine.addAsyncMatchers` اضافه می‌کنید یک promise برمی‌گردانند. همیشه آن‌ها را `await` کنید.

برای هر دو نوع از `expect()` استفاده کنید: این تابع هر matcher را برای شما به `expect` یا `expectAsync` در Jasmine ارسال می‌کند. `await expectAsync($('#logo')).toBeDisplayed()` نیز کار می‌کند. برای TypeScript، وجود `@wdio/jasmine-framework` در `types` باعث می‌شود `expectAsync()` نیز matcherهای WebdriverIO را داشته باشد.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine، همگام
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، ناهمگام
    await expect(loadData()).toBeResolved()                        // matcher ناهمگام Jasmine
})
```

`toHaveSize` در هر دو کتابخانه وجود دارد. matcher مربوط به WebdriverIO روی مقادیر WebdriverIO اجرا می‌شود: یک element، یک آرایه‌ی element یا `Element[]` (برای مثال نتیجه‌ی `$$().filter()`)، یک element از نوع multi-remote، یک browser، یک browsing context، یک mock، wrapper مربوط به `some()`، یا یک promise مانند یک `$()` زنجیره‌ای. matcher مربوط به Jasmine روی همه‌ی مقادیر دیگر اجرا می‌شود.

matcherهای نامتقارن هر دو کتابخانه، هم در matcherهای Jasmine و هم در matcherهای WebdriverIO کار می‌کنند: `jasmine.any()`، `jasmine.objectContaining()`، `jasmine.stringMatching()`، … و `expect.any()`، `expect.stringContaining()`، `expect.oneOf()`، `expect.multiRemote()`، `expect.not.stringContaining()`، …. برای استفاده از `some()`، آن را import کنید:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

بخش‌های Jest در `expect` همراه با Jasmine در دسترس نیستند: matcherهای مختص Jest مانند `toStrictEqual` یا `toHaveLength`، و `expect.soft()`. برای افزودن یک matcher سفارشی، از `expect.extend()` در یک فایل spec یا در hook مربوط به `before` استفاده کنید (به [Matcherهای سفارشی](/docs/custommatchers) مراجعه کنید)، یا از `jasmine.addMatchers` برای یک matcher همگام و `jasmine.addAsyncMatchers` برای یک matcher ناهمگام استفاده کنید.

برای TypeScript، `jasmine` را به `types` اضافه کنید، به [راه‌اندازی TypeScript](/docs/typescript) مراجعه کنید.

## استفاده از Cucumber

ابتدا بسته‌ی آداپتور را از NPM نصب کنید:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

اگر می‌خواهید از Cucumber استفاده کنید، ویژگی `framework` را با افزودن `framework: 'cucumber'` به [فایل پیکربندی](configurationfile) روی `cucumber` تنظیم کنید.

گزینه‌های Cucumber را می‌توان در فایل پیکربندی با `cucumberOpts` تعیین کرد. فهرست کامل گزینه‌ها را [اینجا](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) ببینید. این آداپتور از Cucumber 13 استفاده می‌کند. `tagExpression` حذف شده است؛ با `tags` فیلتر کنید. به [راهنمای مهاجرت v10](v10-migration#cucumber) مراجعه کنید.

برای شروع سریع با Cucumber، نگاهی به پروژه‌ی [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) ما بیندازید که همه‌ی تعاریف step مورد نیاز برای شروع را در خود دارد و بلافاصله می‌توانید نوشتن فایل‌های feature را آغاز کنید.

### گزینه‌های Cucumber

گزینه‌های زیر را می‌توان در `wdio.conf.js` برای پیکربندی محیط Cucumber با استفاده از ویژگی `cucumberOpts` اعمال کرد:

:::tip تنظیم گزینه‌ها از طریق خط فرمان
گزینه‌های `cucumberOpts`، مانند `tags` سفارشی برای فیلتر کردن تست‌ها، را می‌توان از طریق خط فرمان تعیین کرد. این کار با استفاده از قالب `cucumberOpts.{optionName}="value"` انجام می‌شود.

برای مثال، اگر می‌خواهید فقط تست‌هایی را اجرا کنید که با `@smoke` برچسب‌گذاری شده‌اند، می‌توانید از دستور زیر استفاده کنید:

```sh
# وقتی فقط می‌خواهید تست‌هایی را اجرا کنید که برچسب "@smoke" دارند
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

این دستور گزینه‌ی `tags` را در `cucumberOpts` روی `@smoke` تنظیم می‌کند و اطمینان می‌دهد که فقط تست‌های دارای این برچسب اجرا شوند.

:::

#### backtrace

<Option type="Boolean" default="true">

نمایش کامل backtrace برای خطاها.

</Option>

#### requireModule

<Option type="string[]" default="[]">

بارگذاری ماژول‌ها پیش از بارگذاری هر فایل پشتیبانی.

</Option>
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

<Option type="boolean" default="false">

لغو اجرا در نخستین شکست.

</Option>

#### name

<Option type="RegExp[]" default="[]">

فقط سناریوهایی را اجرا می‌کند که نامشان با عبارت مطابقت دارد (قابل تکرار).

</Option>

#### require

<Option type="string[]" default="[]">

بارگذاری فایل‌های حاوی تعاریف step پیش از اجرای featureها. همچنین می‌توانید یک glob برای تعاریف step خود مشخص کنید.

</Option>
مثال:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

مسیرهای محل قرارگیری کد پشتیبانی شما، برای ESM.

</Option>
مثال:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

در صورت وجود هرگونه step تعریف‌نشده یا در انتظار، ناموفق شود.

</Option>

#### tags

<Option type="String" default="">

فقط featureها یا سناریوهایی را اجرا می‌کند که برچسب‌هایشان با عبارت مطابقت دارد.
برای جزئیات بیشتر لطفاً به [مستندات Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) مراجعه کنید.

</Option>

#### timeout

<Option type="Number" default="30000">

timeout بر حسب میلی‌ثانیه برای تعاریف step.

</Option>

#### retry

<Option type="Number" default="0">

تعداد دفعات تلاش مجدد برای test caseهای ناموفق را مشخص می‌کند.

</Option>

#### retryTagFilter

<Option type="RegExp">

فقط featureها یا سناریوهایی را مجدداً اجرا می‌کند که برچسب‌هایشان با عبارت مطابقت دارد (قابل تکرار). این گزینه نیازمند تعیین '--retry' است.

</Option>

#### language

<Option type="String" default="en">

زبان پیش‌فرض برای فایل‌های feature شما

</Option>

#### order

<Option type="String" default="defined">

اجرای تست‌ها به ترتیب تعریف‌شده / تصادفی

</Option>

#### format

<Option type="string[]">

نام و مسیر فایل خروجی formatter مورد استفاده.
WebdriverIO عمدتاً فقط از [Formatterهایی](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) پشتیبانی می‌کند که خروجی را در یک فایل می‌نویسند.

</Option>

#### formatOptions

<Option type="object">

گزینه‌هایی که باید به formatterها ارائه شوند

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

افزودن برچسب‌های cucumber به نام feature یا سناریو

</Option>
***لطفاً توجه داشته باشید که این گزینه مختص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

تعاریف تعریف‌نشده را به‌عنوان هشدار در نظر می‌گیرد.

</Option>
***لطفاً توجه داشته باشید که این گزینه مختص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

تعاریف مبهم را به‌عنوان خطا در نظر می‌گیرد.

</Option>
***لطفاً توجه داشته باشید که این گزینه مختص @wdio/cucumber-framework است و توسط خود cucumber-js شناخته نمی‌شود***<br/>

#### profile

<Option type="string[]" default="[]">

profile مورد استفاده را مشخص می‌کند.

</Option>
***لطفاً توجه داشته باشید که فقط مقادیر مشخصی (worldParameters، name، retryTagFilter) در profileها پشتیبانی می‌شوند، زیرا `cucumberOpts` اولویت دارد. علاوه بر این، هنگام استفاده از یک profile، مطمئن شوید که مقادیر ذکرشده در `cucumberOpts` تعریف نشده باشند.***

### رد کردن تست‌ها در cucumber

توجه داشته باشید که اگر بخواهید یک تست را با استفاده از قابلیت‌های معمول فیلتر کردن تست cucumber که در `cucumberOpts` موجود است رد کنید، این کار را برای همه‌ی مرورگرها و دستگاه‌های پیکربندی‌شده در capabilities انجام خواهید داد. برای اینکه بتوانید سناریوها را فقط برای ترکیب‌های خاصی از capabilities رد کنید، بدون اینکه در صورت عدم نیاز یک نشست آغاز شود، webdriverio نحو برچسب ویژه‌ی زیر را برای cucumber ارائه می‌دهد:

`@skip([condition])`

که در آن condition ترکیبی اختیاری از ویژگی‌های capabilities همراه با مقادیرشان است که وقتی **همگی** مطابقت داشته باشند، باعث رد شدن سناریو یا feature برچسب‌گذاری‌شده می‌شوند. البته می‌توانید چندین برچسب به سناریوها و featureها اضافه کنید تا یک تست را تحت چندین شرط مختلف رد کنید.

همچنین می‌توانید از annotation مربوط به '@skip' برای رد کردن تست‌ها بدون تغییر `tags` استفاده کنید. در این حالت تست‌های ردشده در گزارش تست نمایش داده می‌شوند.

در اینجا چند مثال از این نحو آمده است:
- `@skip` یا `@skip()`: همیشه آیتم برچسب‌گذاری‌شده را رد می‌کند
- `@skip(browserName="chrome")`: تست روی مرورگرهای chrome اجرا نخواهد شد.
- `@skip(browserName="firefox";platformName="linux")`: تست را در اجراهای firefox روی linux رد می‌کند.
- `@skip(browserName=["chrome","firefox"])`: آیتم‌های برچسب‌گذاری‌شده برای هر دو مرورگر chrome و firefox رد می‌شوند.
- `@skip(browserName=/i.*explorer/)`: capabilityهایی با مرورگرهای منطبق با عبارت باقاعده رد می‌شوند (مانند `iexplorer`، `internet explorer`، `internet-explorer`، ...).

### Import کردن Helperهای تعریف Step

برای استفاده از helperهای تعریف step مانند `Given`، `When` یا `Then` یا hookها، باید آن‌ها را از `@cucumber/cucumber` import کنید، برای مثال به این شکل:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

حال اگر از قبل از Cucumber برای انواع دیگری از تست‌ها که به WebdriverIO مربوط نیستند و برای آن‌ها از نسخه‌ی خاصی استفاده می‌کنید بهره می‌برید، باید این helperها را در تست‌های e2e خود از بسته‌ی Cucumber مربوط به WebdriverIO import کنید، برای مثال:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

این کار اطمینان می‌دهد که از helperهای درست در فریم‌ورک WebdriverIO استفاده می‌کنید و به شما امکان می‌دهد برای انواع دیگر تست از یک نسخه‌ی مستقل Cucumber استفاده کنید.

### انتشار گزارش

Cucumber قابلیتی برای انتشار گزارش‌های اجرای تست شما در `https://reports.cucumber.io/` فراهم می‌کند که می‌توان آن را یا با تنظیم flag مربوط به `publish` در `cucumberOpts` یا با پیکربندی متغیر محیطی `CUCUMBER_PUBLISH_TOKEN` کنترل کرد. با این حال، وقتی از `WebdriverIO` برای اجرای تست استفاده می‌کنید، این روش محدودیتی دارد. این روش گزارش‌ها را برای هر فایل feature به‌طور جداگانه به‌روزرسانی می‌کند و مشاهده‌ی یک گزارش یکپارچه را دشوار می‌سازد.

برای غلبه بر این محدودیت، یک متد مبتنی بر promise به نام `publishCucumberReport` را در `@wdio/cucumber-framework` معرفی کرده‌ایم. این متد باید در hook مربوط به `onComplete` فراخوانی شود که بهترین مکان برای فراخوانی آن است. `publishCucumberReport` به‌عنوان ورودی، دایرکتوری گزارشی را نیاز دارد که گزارش‌های cucumber message در آن ذخیره می‌شوند.

می‌توانید گزارش‌های `cucumber message` را با پیکربندی گزینه‌ی `format` در `cucumberOpts` خود تولید کنید. به‌شدت توصیه می‌شود یک نام فایل پویا در گزینه‌ی format مربوط به `cucumber message` ارائه دهید تا از بازنویسی گزارش‌ها جلوگیری شود و اطمینان حاصل شود که هر اجرای تست به‌درستی ثبت می‌شود.

پیش از استفاده از این تابع، حتماً متغیرهای محیطی زیر را تنظیم کنید:
- CUCUMBER_PUBLISH_REPORT_URL: نشانی URL که می‌خواهید گزارش Cucumber را در آن منتشر کنید. اگر ارائه نشود، نشانی پیش‌فرض 'https://messages.cucumber.io/api/reports' استفاده خواهد شد.
- CUCUMBER_PUBLISH_REPORT_TOKEN: توکن احراز مجوز مورد نیاز برای انتشار گزارش. اگر این توکن تنظیم نشده باشد، تابع بدون انتشار گزارش خارج می‌شود.

در اینجا نمونه‌ای از پیکربندی‌های لازم و نمونه‌کدها برای پیاده‌سازی آمده است:

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

لطفاً توجه داشته باشید که `./reports/` دایرکتوری‌ای است که گزارش‌های `cucumber message` در آن ذخیره خواهند شد.

## استفاده از Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) یک فریم‌ورک متن‌باز است که برای سریع‌تر، مشارکتی‌تر و مقیاس‌پذیرتر کردن تست‌های پذیرش و رگرسیون سیستم‌های نرم‌افزاری پیچیده طراحی شده است.

برای مجموعه‌های تست WebdriverIO، Serenity/JS موارد زیر را ارائه می‌دهد:
- [گزارش‌دهی پیشرفته](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - می‌توانید از Serenity/JS
  به‌عنوان جایگزینی مستقیم برای هر فریم‌ورک داخلی WebdriverIO استفاده کنید تا گزارش‌های عمیق اجرای تست و مستندات زنده‌ی پروژه‌ی خود را تولید کنید.
- [APIهای Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - برای اینکه کد تست شما در میان پروژه‌ها و تیم‌ها قابل حمل و قابل استفاده‌ی مجدد باشد،
  Serenity/JS یک [لایه‌ی انتزاع](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) اختیاری روی APIهای بومی WebdriverIO در اختیار شما قرار می‌دهد.
- [کتابخانه‌های یکپارچه‌سازی](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - برای مجموعه‌های تستی که از Screenplay Pattern پیروی می‌کنند،
  Serenity/JS همچنین کتابخانه‌های یکپارچه‌سازی اختیاری ارائه می‌دهد تا به شما در نوشتن [تست‌های API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io)،
  [مدیریت سرورهای محلی](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io)، [انجام assertionها](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) و موارد دیگر کمک کنند!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### نصب Serenity/JS

برای افزودن Serenity/JS به یک [پروژه‌ی WebdriverIO موجود](https://webdriver.io/docs/gettingstarted)، ماژول‌های Serenity/JS زیر را از NPM نصب کنید:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

درباره‌ی ماژول‌های Serenity/JS بیشتر بدانید:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### پیکربندی Serenity/JS

برای فعال‌سازی یکپارچه‌سازی با Serenity/JS، WebdriverIO را به شکل زیر پیکربندی کنید:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // به WebdriverIO بگویید از فریم‌ورک Serenity/JS استفاده کند
    framework: '@serenity-js/webdriverio',

    // پیکربندی Serenity/JS
    serenity: {
        // Serenity/JS را برای استفاده از آداپتور مناسب test runner خود پیکربندی کنید
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سرویس‌های گزارش‌دهی Serenity/JS، معروف به "stage crew"، را ثبت کنید
        crew: [
            // اختیاری، نتایج اجرای تست را در خروجی استاندارد چاپ می‌کند
            '@serenity-js/console-reporter',

            // اختیاری، گزارش‌های Serenity BDD و مستندات زنده (HTML) تولید می‌کند
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // اختیاری، هنگام شکست تعامل به‌طور خودکار اسکرین‌شات می‌گیرد
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // runner مربوط به Cucumber خود را پیکربندی کنید
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در پایین ببینید
    },

    // ... یا runner مربوط به Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در پایین ببینید
    },

    // ... یا runner مربوط به Mocha
    mochaOpts: {
        // گزینه‌های پیکربندی Mocha را در پایین ببینید
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
        // Serenity/JS را برای استفاده از آداپتور مناسب test runner خود پیکربندی کنید
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // سرویس‌های گزارش‌دهی Serenity/JS، معروف به "stage crew"، را ثبت کنید
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // runner مربوط به Cucumber خود را پیکربندی کنید
    cucumberOpts: {
        // گزینه‌های پیکربندی Cucumber را در پایین ببینید
    },

    // ... یا runner مربوط به Jasmine
    jasmineOpts: {
        // گزینه‌های پیکربندی Jasmine را در پایین ببینید
    },

    // ... یا runner مربوط به Mocha
    mochaOpts: {
        // گزینه‌های پیکربندی Mocha را در پایین ببینید
    },

    runner: 'local',

    // هر پیکربندی دیگر WebdriverIO
};
```

</TabItem>
</Tabs>

بیشتر بدانید درباره‌ی:
- [گزینه‌های پیکربندی Cucumber در Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Jasmine در Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [گزینه‌های پیکربندی Mocha در Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [فایل پیکربندی WebdriverIO](configurationfile)

### تولید گزارش‌های Serenity BDD و مستندات زنده

[گزارش‌های Serenity BDD و مستندات زنده](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) توسط [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) تولید می‌شوند،
که یک برنامه‌ی Java است و توسط ماژول [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) دانلود و مدیریت می‌شود.

برای تولید گزارش‌های Serenity BDD، مجموعه‌ی تست شما باید:
- Serenity BDD CLI را دانلود کند، با فراخوانی `serenity-bdd update` که فایل `jar` مربوط به CLI را به‌صورت محلی cache می‌کند
- گزارش‌های میانی `.json` مربوط به Serenity BDD را تولید کند، با ثبت [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) طبق [دستورالعمل‌های پیکربندی](#configuring-serenityjs)
- هنگامی که می‌خواهید گزارش را تولید کنید، Serenity BDD CLI را با فراخوانی `serenity-bdd run` اجرا کند

الگویی که در همه‌ی [قالب‌های پروژه‌ی Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) به‌کار رفته است
بر استفاده از موارد زیر متکی است:
- یک اسکریپت NPM از نوع [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) برای دانلود Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) برای اجرای فرایند گزارش‌دهی حتی اگر خود مجموعه‌ی تست شکست خورده باشد (که دقیقاً زمانی است که بیش از همه به گزارش‌های تست نیاز دارید...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) به‌عنوان روشی ساده برای حذف هرگونه گزارش تست باقی‌مانده از اجرای قبلی

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

برای آشنایی بیشتر با `SerenityBDDReporter`، لطفاً به موارد زیر مراجعه کنید:
- دستورالعمل‌های نصب در [مستندات `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)،
- نمونه‌های پیکربندی در [مستندات API مربوط به `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io)،
- [نمونه‌های Serenity/JS در GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### استفاده از APIهای Screenplay Pattern در Serenity/JS

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) رویکردی نوآورانه و کاربرمحور برای نوشتن تست‌های پذیرش خودکار با کیفیت بالا است. این الگو شما را به سمت استفاده‌ی مؤثر از لایه‌های انتزاع هدایت می‌کند،
به سناریوهای تست شما کمک می‌کند تا اصطلاحات کسب‌وکار دامنه‌ی شما را منعکس کنند، و عادت‌های خوب تست‌نویسی و مهندسی نرم‌افزار را در تیم شما تشویق می‌کند.

به‌طور پیش‌فرض، وقتی `@serenity-js/webdriverio` را به‌عنوان `framework` در WebdriverIO ثبت می‌کنید،
Serenity/JS یک [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) پیش‌فرض از [actorها](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) را پیکربندی می‌کند،
که در آن هر actor می‌تواند:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

این باید برای شروع معرفی سناریوهای تستی که از Screenplay Pattern پیروی می‌کنند، حتی در یک مجموعه‌ی تست موجود، کافی باشد، برای مثال:

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

برای آشنایی بیشتر با Screenplay Pattern، موارد زیر را ببینید:
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [تست وب با Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)