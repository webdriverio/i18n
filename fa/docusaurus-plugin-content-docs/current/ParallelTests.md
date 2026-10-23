---
id: parallel-tests
title: تست‌های موازی در یک فایل Spec
description: "تست‌های Mocha یا سناریوهای Cucumber یک فایل spec را به‌طور هم‌زمان اجرا کنید، هر کدام در browsing context مخصوص به خود در WebDriver BiDi، با استفاده از mochaOpts.parallelMode یا cucumberOpts.parallelMode؛ نوعی browser pooling مشابه fullyParallel در Playwright."
---

از نسخه‌ی v10، WebdriverIO می‌تواند تست‌های یک فایل spec را به‌طور هم‌زمان اجرا کند. هر `it()` در Mocha یا هر سناریو در Cucumber، پنجره‌ی مرورگر مخصوص به خود را دارد (یک [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context) در WebDriver BiDi) و همه در یک worker و یک session مرورگر اجرا می‌شوند. از این قابلیت برای فایل‌های spec با تعداد زیادی تست مستقل استفاده کنید: این تست‌ها سریع‌تر تمام می‌شوند و به worker process یا session مرورگر بیشتری نیاز ندارید، زیرا هزینه‌ی هر تست فقط باز کردن یک پنجره است.

این نوعی browser pooling است: تست‌ها مجموعه‌ای از پنجره‌ها را در یک مرورگر به‌اشتراک می‌گذارند، نه مجموعه‌ای از مرورگرها را. اگر از Playwright آمده‌اید، `parallelMode: 'userContexts'` نزدیک‌ترین معادل [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) است: هر تست context ایزوله‌ی مخصوص به خود را دارد. تفاوت در این است که Playwright تست‌های یک فایل را بین چند worker process پخش می‌کند که هر کدام مرورگر مخصوص به خود را دارند، درحالی‌که WebdriverIO آن‌ها را به‌طور هم‌زمان در یک worker و یک مرورگر اجرا می‌کند.

این قابلیت از [`maxInstances`](./OrganizingTestSuites.md) جداست، که کل فایل‌های spec را به‌صورت موازی اجرا می‌کند، با یک worker و یک session برای هر spec. می‌توانید این دو را با هم ترکیب کنید: `maxInstances` تعیین می‌کند چند فایل spec به‌طور هم‌زمان اجرا شوند، و `maxParallelContexts` تعیین می‌کند چند تست به‌طور هم‌زمان درون هر یک از آن فایل‌ها اجرا شوند.

:::warning آزمایشی
حالت موازی به capability آزمایشی `'wdio:experimentalBiDiCommands'` نیاز دارد، که نحوه‌ی پیاده‌سازی دستورات element را در همه‌ی تست‌ها تغییر می‌دهد، نه فقط در تست‌های موازی. به [تغییرات رفتاری دستورات element در BiDi](#behavior-changes-of-the-bidi-element-commands) مراجعه کنید.
:::

## فعال‌سازی حالت موازی

موارد زیر را نیاز دارید:

- یک session از نوع WebDriver BiDi (حالت پیش‌فرض، مگر اینکه `'wdio:enforceWebDriverClassic': true` را تنظیم کرده باشید)،
- capability‏ `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` یا `@wdio/cucumber-framework`. Jasmine از حالت موازی پشتیبانی نمی‌کند.

اگر session از BiDi استفاده نکند، یا capability وجود نداشته باشد، WebdriverIO یک هشدار ثبت می‌کند و تست‌ها را یکی پس از دیگری اجرا می‌کند. بدون `parallelMode`، هیچ چیزی تغییر نمی‌کند.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

فایل spec به هیچ تغییری نیاز ندارد:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

هر دو تست به‌طور هم‌زمان و هر کدام در پنجره‌ی مخصوص به خود اجرا می‌شوند. `browser.url()`، `$()` و `expect()` روی پنجره‌ی تستی عمل می‌کنند که آن‌ها را فراخوانی کرده است.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

هر سناریو از یک فایل feature در پنجره‌ی مخصوص به خود اجرا می‌شود. پروفایل‌ها (`cucumberOpts.profiles`، `cucumberOpts.file`)، specهای دارای شماره‌ی خط (`--spec ./features/login.feature:5`) و گزینه‌های `tags`، `name`، `order`، `strict`، `dryRun`، `failFast`، `retry` و `retryTagFilter` مانند اجرای ترتیبی کار می‌کنند. featureها، سناریوها، stepها و hookها مانند اجرای ترتیبی گزارش می‌شوند، همچنین با `ignoreUndefinedDefinitions`، `failAmbiguousDefinitions`، `tagsInTitle` و `scenarioLevelReporter`.

## گزینه‌ها

| گزینه | مقادیر | پیش‌فرض | توضیحات |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | تنظیم‌نشده (ترتیبی) | حالت موازی را فعال می‌کند و تعیین می‌کند تست‌ها چه مقدار را به‌اشتراک بگذارند. |
| `maxParallelContexts` | عدد | `os.cpus().length` | تعداد تست‌هایی که به‌طور هم‌زمان اجرا می‌شوند. |

هر دو را در `mochaOpts` یا `cucumberOpts` تنظیم کنید.

`maxParallelContexts` تعداد slotها را تعیین می‌کند. هر slot در هر لحظه یک تست را اجرا می‌کند، در حین اجرای تست فعلی پنجره‌ی تست بعدی را باز می‌کند، و پنجره‌ی قبلی را در پس‌زمینه می‌بندد. بنابراین تا ۳ × `maxParallelContexts` پنجره، به‌علاوه‌ی پنجره‌ی اول session، می‌توانند برای مدت کوتاهی باز باشند: هر slot می‌تواند یک پنجره‌ی فعال، یک پنجره‌ی ازپیش‌آماده‌شده و یک پنجره‌ی در حال بسته شدن داشته باشد. حالت موازی فقط پنجره‌هایی را می‌بندد که خودش باز کرده است.

## انتخاب بین `contexts` و `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| پنجره برای هر تست | بله | بله |
| کوکی‌ها، `localStorage`، service workerها | بین همه‌ی تست‌ها مشترک | ایزوله برای هر تست ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| ورود (Login) | یک بار، اگر تست‌ها از کوکی session دوباره استفاده کنند | در هر تست |
| پشتیبانی driver | هر مرورگر دارای BiDi | به پشتیبانی از `browser.createUserContext()` نیاز دارد، در غیر این صورت اجرا شکست می‌خورد |

به‌طور پیش‌فرض `'contexts'` را انتخاب کنید. زمانی `'userContexts'` را انتخاب کنید که تست‌ها نباید کوکی‌ها یا storage یکدیگر را ببینند، برای مثال تست‌هایی که با کاربران مختلف وارد می‌شوند. مانند `'contexts'`، اگر session از نوع WebDriver BiDi نباشد یا `'wdio:experimentalBiDiCommands'` در capabilities وجود نداشته باشد، `'userContexts'` نیز با یک هشدار به اجرای ترتیبی بازمی‌گردد. اگر driver از `browser.createUserContext` پشتیبانی نکند، اجرا به‌جای بازگشت به حالت ترتیبی، شکست می‌خورد.

`browser.newWindow()` پنجره را در user context پیش‌فرض باز می‌کند، بنابراین پنجره‌ای که به این روش باز شود خارج از ایزوله‌سازی کوکی و storage تست قرار می‌گیرد.

## آنچه هر تست در اختیار دارد

درون یک تست موازی، این دستورات روی پنجره‌ی مخصوص همان تست عمل می‌کنند:

- ناوبری: `url`، `back`، `forward`، `refresh`، `getUrl`، `getTitle`
- دستورات element: `$`، `$$`، `shadow$`، `click`، `setValue`، `getText`، دستورات `waitFor*` و موارد دیگر
- `execute`، `actions`، `addInitScript`
- کوکی‌ها: `getCookies`، `setCookies`، `deleteCookies` از پارتیشن کوکی تست استفاده می‌کنند
- `mock()`: یک mock که در یک تست موازی ایجاد شود، فقط درخواست‌های پنجره‌ی همان تست و frameهای آن را رهگیری و ثبت می‌کند، بنابراین دو تست می‌توانند یک URL یکسان را mock کنند
- اسکرین‌شات‌ها: `saveScreenshot`، `takeElementScreenshot`

## دستوراتی که در حالت موازی خطا می‌دهند

برخی دستورات روی کل مرورگر یا کل session عمل می‌کنند، بنابراین نمی‌توانند پنجره‌ی یک تست خاص را هدف قرار دهند. درون یک تست موازی، این دستورات به‌جای تأثیر گذاشتن بر تست دیگر، خطا پرتاب می‌کنند:

| دستورات | دلیل | جایگزین |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | پنجره‌ی سیستم‌عامل مشترک است | از `browser.setViewport()` برای تعیین اندازه‌ی صفحه‌ی یک تست استفاده کنید. تست‌های موازی یک پنجره‌ی سیستم‌عامل مشترک دارند |
| `throttleNetwork`، `throttleCPU` | روی کل مرورگر اعمال می‌شوند | آن تست‌ها را بدون حالت موازی اجرا کنید |
| `closeWindow`، `switchToParentFrame` | پنجره‌ی فوکوس‌شده را تغییر می‌دهند، که بین همه‌ی تست‌ها مشترک است | هر تست را در پنجره‌ی مخصوص به خود نگه دارید |
| `reloadSession`، `setTimeout` | sessionی را تغییر می‌دهند که بین همه‌ی تست‌ها مشترک است | آن‌ها را در hook‏ `before` در `wdio.conf.ts` فراخوانی کنید |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | alertها متعلق به یک browsing context هستند | آن‌ها را روی contextی که `browser.url()` برمی‌گرداند فراخوانی کنید: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. به‌جای `sendAlertText(text)` از `page.acceptAlert(text)` استفاده کنید. `dismissAlert()` و `getAlertText()` نیز روی context کار می‌کنند |
| `getComputedRole`، `getComputedLabel` | WebDriver BiDi نمی‌تواند آن‌ها را بخواند | آن تست‌ها را بدون حالت موازی اجرا کنید |

`switchWindow` در نسخه‌ی v10 برای همه‌ی sessionهای WebDriver BiDi حذف شده است، نه فقط در حالت موازی. این دستور خطای ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` را پرتاب می‌کند. به‌جای جابه‌جا شدن به context، شیء آن را نگه دارید.

WebdriverIO به‌طور خودکار promptها را رد می‌کند، مگر اینکه چیزی به رویداد `dialog` گوش دهد؛ بنابراین قبل از پاسخ دادن به یک prompt از درون تست، یک listener ثبت کنید (`browser.on('dialog', () => {})`).

همه‌ی دستورات دیگر WebDriver Classic نیز خطا پرتاب می‌کنند. فقط `status`، `getTimeouts` و `getWindowHandles` مجاز هستند. اگر یک دستور WebdriverIO در حالت موازی بدون اینکه شما دستور Classic را فراخوانی کرده باشید به WebDriver Classic بازگشت، لطفاً [آن را گزارش دهید](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hookها و timeoutها

### Mocha

- `before()` و `after()` در یک فایل spec **یک بار برای هر تست** اجرا می‌شوند، نه یک بار برای هر `describe`، زیرا هر تست پنجره‌ی مخصوص به خود را دارد. هر تست، `before`، `beforeEach`، خود تست، `afterEach` و `after` را در پنجره‌ی خود اجرا می‌کند. تنظیماتی را که باید یک بار برای هر فایل spec اجرا شوند، در hookهای `beforeSuite` / `afterSuite` در `wdio.conf.ts` قرار دهید. این hookها یک بار و خارج از هر پنجره‌ی تست اجرا می‌شوند.
- فقط `mochaOpts.timeout` اعمال می‌شود. `this.timeout()` در یک تست یا hook خطا پرتاب می‌کند، و `it(...).timeout()` یا timeout یک `describe` با یک هشدار نادیده گرفته می‌شود. به [timeoutهای Mocha و hookهای WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) مراجعه کنید.
- `mochaOpts.bail` و `mochaOpts.retries` پشتیبانی نمی‌شوند و باعث شکست اجرا می‌شوند. `this.retries()` خطا پرتاب می‌کند.
- `.only()`، `this.skip()`، `grep`، `fgrep` و `invert` مانند اجرای ترتیبی کار می‌کنند.

### Cucumber

- `BeforeAll` / `AfterAll` و hookهای `beforeFeature` / `afterFeature` در `wdio.conf.ts` یک بار برای هر worker اجرا می‌شوند، نه یک بار برای هر feature. `beforeFeature` / `afterFeature` فقط uri و feature اولین فایل feature را دریافت می‌کنند، که وقتی یک worker چند فایل feature را اجرا می‌کند (برای مثال specهای گروه‌بندی‌شده) اهمیت دارد. این hookها خارج از پنجره‌ی هر سناریو اجرا می‌شوند، بنابراین نباید از دستوراتی استفاده کنند که به پنجره نیاز دارند.
- `Before` / `After`، `BeforeStep` / `AfterStep` و hookهای سناریو و step در `wdio.conf.ts` برای هر سناریو و در پنجره‌ی همان سناریو اجرا می‌شوند.
- مقدار پیش‌فرض `cucumberOpts.strict` در WebdriverIO برابر `false` است. یک step در حالت pending فقط با `strict: true` باعث شکست سناریو می‌شود.
- با `failFast`، سناریوهایی که در حال اجرا در پنجره‌های دیگر هستند پس از اولین شکست به پایان می‌رسند. سناریوهایی که شروع نشده‌اند، مانند اجرای ترتیبی، به‌عنوان skipped گزارش می‌شوند.
- با `ignoreUndefinedDefinitions: true`، یک step مبهم (با `failAmbiguousDefinitions: false`)، یا یک step در حالت pending با `strict: true`، باعث شکست اجرا می‌شود. در این حالت، اجرای ترتیبی موفق خواهد بود.
- formatterهای Cucumber (`format`، `formatOptions`، `publish`) اجرا نمی‌شوند، بنابراین هیچ فایلی نمی‌نویسند.

### هر دو فریم‌ورک

پنجره‌ی یک تست به محض پایان تست بسته می‌شود. timerها یا promiseهایی را که پس از پایان تست به اجرای خود ادامه می‌دهند، شروع نکنید.

## تغییرات رفتاری دستورات element در BiDi

`'wdio:experimentalBiDiCommands': true` پیاده‌سازی چندین دستور element را در همه‌ی تست‌های session، چه ترتیبی و چه موازی، تغییر می‌دهد:

- `addValue` و `clearValue` رویدادهای DOM مصنوعی ارسال می‌کنند، نه رویدادهای کلید معتبر (trusted).
- `getAttribute` از قوانین WebDriver برای مقادیر property و attribute پیروی می‌کند.
- `click` از طریق Actions API ارسال می‌شود.

مجموعه‌ی تست خود را یک بار با این capability و بدون `parallelMode` اجرا کنید تا تست‌هایی را که به رفتار Classic وابسته هستند پیدا کنید.

## Reporterها

Reporterهایی که [`@wdio/reporter`](./CustomReporter.md) را extend می‌کنند، تست‌های موازی را زیر suite درست گزارش می‌دهند و هر دستور را به تستی که browsing context آن، دستور را ارسال کرده است، پیوست می‌کنند.

`@wdio/allure-reporter` از حالت موازی با Mocha پشتیبانی می‌کند. این reporter نتیجه‌ی هر تست را هنگام پایان آن می‌نویسد. hookهای `before()` و `after()` در حالت موازی یک بار برای هر تست اجرا می‌شوند، بنابراین گزارش fixtureهای آن‌ها را یک بار برای هر تست نشان می‌دهد. با Cucumber، Allure هنوز از حالت موازی پشتیبانی نمی‌کند: نتایج، stepها و پیوست‌های سناریوهای هم‌پوشان ممکن است زیر سناریوی اشتباه قرار بگیرند، بنابراین از آن با اجراهای ترتیبی استفاده کنید.

`@wdio/spec-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: یک بلوک `describe` در Mocha که بعد از بلوک دیگری می‌آید، یا یک سناریوی Cucumber که در حین اجرای سناریوی دیگری شروع می‌شود، به‌صورت تودرتو زیر آن نمایش داده می‌شود، و با `retry` در Cucumber ممکن است تعداد تست‌های موفق اشتباه باشد. نتایج تست‌ها و exit code صحیح هستند.

`@wdio/cucumberjs-json-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: stepها و پیوست‌های سناریوهای هم‌پوشان ممکن است در سناریوی اشتباه قرار بگیرند، و reporter یک هشدار ثبت می‌کند. از آن با اجراهای ترتیبی استفاده کنید.

`@wdio/html-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: لاگ‌ها، اسکرین‌شات‌ها و ویدیوهایی که یک تست پس از شروع تست دیگر ارسال می‌کند، ممکن است زیر تست اشتباه قرار بگیرند. از آن با اجراهای ترتیبی استفاده کنید.

یک reporter سفارشی نباید فرض کند که هر تست قبل از شروع تست بعدی به پایان می‌رسد. به [Reporterها و تست‌های موازی](./CustomReporter.md#reporters-and-parallel-tests) مراجعه کنید.

## ارائه‌دهندگان ابری

ارائه‌دهندگان ابری برای هر session مرورگر یک ویدیو، یک مجموعه لاگ و یک وضعیت تست ثبت می‌کنند. در حالت موازی، تست‌های زیادی آن session را به‌اشتراک می‌گذارند، بنابراین داشبورد ارائه‌دهنده نمی‌تواند ویدیو، لاگ‌ها یا وضعیت موفق/ناموفق را به تفکیک تست جدا کند. `userContexts` همچنین نیاز دارد که grid ارائه‌دهنده از `browser.createUserContext` (و با Mocha، از `browser.removeUserContext`) پشتیبانی کند. حالت موازی هنوز روی هیچ ارائه‌دهنده‌ی ابری تست نشده است.

توصیه می‌کنیم هنگام اجرا روی یک ارائه‌دهنده‌ی ابری، حالت موازی را خاموش نگه دارید و از [`maxInstances`](./OrganizingTestSuites.md) برای اجرای موازی فایل‌های spec استفاده کنید. برای خاموش کردن آن، `parallelMode` را از گزینه‌های فریم‌ورک حذف کنید. اگر فقط `'wdio:experimentalBiDiCommands'` را حذف کنید، تست‌ها یکی پس از دیگری اجرا می‌شوند و هر اجرا یک هشدار ثبت می‌کند.

## عیب‌یابی

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

`'wdio:experimentalBiDiCommands': true` را به capability اضافه کنید. بدون آن، تست‌ها یکی پس از دیگری اجرا می‌شوند. با Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

session از WebDriver Classic استفاده می‌کند. `'wdio:enforceWebDriverClassic': true` را از capability حذف کنید، یا از مرورگر و driverی با پشتیبانی WebDriver BiDi استفاده کنید. با Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

driver نمی‌تواند user context ایجاد کند. از `parallelMode: 'contexts'` استفاده کنید یا مرورگر و driver را به‌روزرسانی کنید. با Cucumber، پیام به این صورت است: `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` یا `... is not supported in parallel mode`

تست، دستوری از [دستوراتی که در حالت موازی خطا می‌دهند](#commands-that-throw-in-parallel-mode) را فراخوانی کرده است. از جایگزین موجود در جدول استفاده کنید.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` یا `mochaOpts.retries` را حذف کنید، یا فایل spec را بدون `parallelMode` اجرا کنید.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

فایل spec دارای hookهای `before()` یا `after()` است. این hookها برای هر تست اجرا می‌شوند. تنظیماتی را که باید فقط یک بار اجرا شوند، به `beforeSuite` / `afterSuite` در `wdio.conf.ts` منتقل کنید.

## صفحات مرتبط

- [سازمان‌دهی مجموعه‌های تست](./OrganizingTestSuites.md): اجرای موازی فایل‌های spec با `maxInstances`
- [Sharding](./Sharding.md): تقسیم مجموعه‌ی تست بین چند ماشین
- [فریم‌ورک‌ها](./Frameworks.md): همه‌ی گزینه‌های Mocha و Cucumber
- [پروتکل‌های اتوماسیون](./AutomationProtocols.md): WebDriver BiDi و WebDriver Classic