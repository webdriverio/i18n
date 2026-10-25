---
id: parallel-tests
title: تست‌های موازی در یک فایل Spec
description: "تست‌های Mocha یا سناریوهای Cucumber یک فایل spec را به‌طور هم‌زمان اجرا کنید، هر کدام در browsing context مخصوص خود در WebDriver BiDi، با استفاده از mochaOpts.parallelMode یا cucumberOpts.parallelMode؛ نوعی browser pooling مشابه fullyParallel در Playwright."
---

از نسخه v10، WebdriverIO می‌تواند تست‌های یک فایل spec را به‌طور هم‌زمان اجرا کند. هر `it()` در Mocha یا هر سناریو در Cucumber، پنجره مرورگر مخصوص خود (یک [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context) در WebDriver BiDi) را در یک worker و یک نشست مرورگر دریافت می‌کند. از آن برای فایل‌های spec که تست‌های مستقل زیادی دارند استفاده کنید: این تست‌ها سریع‌تر تمام می‌شوند و به worker process یا نشست مرورگر بیشتری نیاز ندارید، زیرا هر تست فقط هزینه باز کردن یک پنجره را می‌پردازد.

این نوعی browser pooling است: تست‌ها مجموعه‌ای از پنجره‌ها را در یک مرورگر به اشتراک می‌گذارند، نه مجموعه‌ای از مرورگرها را. اگر از Playwright می‌آیید، `parallelMode: 'userContexts'` نزدیک‌ترین معادل [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) است: هر تست context ایزوله مخصوص خود را دریافت می‌کند. تفاوت در این است که Playwright تست‌های یک فایل را بین worker processهایی پخش می‌کند که هر کدام مرورگر مخصوص خود را دارند، در حالی که WebdriverIO آن‌ها را به‌طور هم‌زمان در یک worker و یک مرورگر اجرا می‌کند.

این قابلیت از [`maxInstances`](./OrganizingTestSuites.md) جداست؛ `maxInstances` کل فایل‌های spec را به‌صورت موازی اجرا می‌کند، یعنی یک worker و یک نشست برای هر spec. می‌توانید این دو را با هم ترکیب کنید: `maxInstances` تعیین می‌کند چند فایل spec هم‌زمان اجرا شوند، و `maxParallelContexts` تعیین می‌کند چند تست هم‌زمان درون هر یک از آن فایل‌ها اجرا شوند.

:::warning آزمایشی
حالت موازی به قابلیت آزمایشی `'wdio:experimentalBiDiCommands'` نیاز دارد که نحوه پیاده‌سازی دستورات element را در همه تست‌ها تغییر می‌دهد، نه فقط در تست‌های موازی. به [تغییرات رفتاری دستورات element در BiDi](#behavior-changes-of-the-bidi-element-commands) مراجعه کنید.
:::

## فعال‌سازی حالت موازی

موارد زیر را نیاز دارید:

- یک نشست WebDriver BiDi (پیش‌فرض است، مگر اینکه `'wdio:enforceWebDriverClassic': true` را تنظیم کرده باشید)،
- قابلیت `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` یا `@wdio/cucumber-framework`. Jasmine از حالت موازی پشتیبانی نمی‌کند.

اگر نشست از BiDi استفاده نکند، یا این قابلیت وجود نداشته باشد، WebdriverIO یک هشدار ثبت می‌کند و تست‌ها را یکی پس از دیگری اجرا می‌کند. بدون `parallelMode`، هیچ چیزی تغییر نمی‌کند.

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

هر دو تست به‌طور هم‌زمان و هر کدام در پنجره مخصوص خود اجرا می‌شوند. `browser.url()`، `$()` و `expect()` روی پنجره تستی که آن‌ها را فراخوانی می‌کند عمل می‌کنند.

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

هر سناریوی یک فایل feature در پنجره مخصوص خود اجرا می‌شود. پروفایل‌ها (`cucumberOpts.profiles`، `cucumberOpts.file`)، specهای دارای شماره خط (`--spec ./features/login.feature:5`) و گزینه‌های `tags`، `name`، `order`، `strict`، `dryRun`، `failFast`، `retry` و `retryTagFilter` مانند اجرای ترتیبی کار می‌کنند. featureها، سناریوها، stepها و hookها مانند اجرای ترتیبی گزارش می‌شوند، همچنین با `ignoreUndefinedDefinitions`، `failAmbiguousDefinitions`، `tagsInTitle` و `scenarioLevelReporter`.

## گزینه‌ها

| گزینه | مقادیر | پیش‌فرض | توضیحات |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | تنظیم نشده (ترتیبی) | حالت موازی را فعال می‌کند و میزان اشتراک‌گذاری بین تست‌ها را انتخاب می‌کند. |
| `maxParallelContexts` | عدد | `os.cpus().length` | تعداد تست‌هایی که هم‌زمان اجرا می‌شوند. |

هر دو را در `mochaOpts` یا در `cucumberOpts` تنظیم کنید.

`maxParallelContexts` تعداد slotها را تعیین می‌کند. هر slot در هر لحظه یک تست را اجرا می‌کند، در حین اجرای تست فعلی پنجره تست بعدی خود را باز می‌کند، و پنجره قبلی را در پس‌زمینه می‌بندد. بنابراین تا ۳ × `maxParallelContexts` پنجره، به‌علاوه اولین پنجره نشست، ممکن است برای مدت کوتاهی باز باشند: هر slot می‌تواند یک پنجره فعال، یک پنجره از پیش آماده‌شده و یک پنجره در حال بسته شدن داشته باشد. حالت موازی فقط پنجره‌هایی را می‌بندد که خودش باز کرده است.

## انتخاب بین `contexts` و `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| پنجره برای هر تست | بله | بله |
| کوکی‌ها، `localStorage`، service workerها | بین همه تست‌ها مشترک | ایزوله برای هر تست ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| ورود (Login) | یک بار، اگر تست‌ها از کوکی نشست مجدداً استفاده کنند | در هر تست |
| پشتیبانی درایور | هر مرورگر دارای BiDi | به پشتیبانی از `browser.createUserContext()` نیاز دارد، در غیر این صورت اجرا شکست می‌خورد |

به‌طور پیش‌فرض `'contexts'` را انتخاب کنید. زمانی `'userContexts'` را انتخاب کنید که تست‌ها نباید کوکی‌ها یا storage یکدیگر را ببینند، برای مثال تست‌هایی که با کاربران مختلف وارد می‌شوند. مانند `'contexts'`، `'userContexts'` نیز زمانی که نشست از نوع WebDriver BiDi نباشد یا `'wdio:experimentalBiDiCommands'` در capabilities وجود نداشته باشد، با یک هشدار به اجرای ترتیبی بازمی‌گردد. اگر درایور از `browser.createUserContext` پشتیبانی نکند، اجرا به‌جای بازگشت به حالت ترتیبی، شکست می‌خورد.

تب یا پنجره‌ای که یک تست با `browser.newWindow(url)` باز می‌کند، از پنجره همان تست باز می‌شود، بنابراین کوکی‌ها و storage آن تست را دارد. برای باز کردن پنجره‌ای خارج از ایزوله‌سازی کوکی و storage تست، آن را با `browser.browsingContextCreate()` ایجاد کنید و browsing context آن را از `browser.browsingContexts()` دریافت کنید:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## آنچه هر تست در اختیار دارد

درون یک تست موازی، این دستورات روی پنجره مخصوص همان تست عمل می‌کنند:

- ناوبری: `url`، `back`، `forward`، `refresh`، `getUrl`، `getTitle`
- دستورات element: `$`، `$$`، `shadow$`، `click`، `setValue`، `getText`، دستورات `waitFor*` و موارد دیگر
- `execute`، `actions`، `addInitScript`
- کوکی‌ها: `getCookies`، `setCookies`، `deleteCookies` از پارتیشن کوکی تست استفاده می‌کنند
- `mock()`: یک mock ایجادشده در یک تست موازی فقط درخواست‌های پنجره همان تست و frameهای آن را رهگیری و ثبت می‌کند، بنابراین دو تست می‌توانند یک URL یکسان را mock کنند
- اسکرین‌شات‌ها: `saveScreenshot`، `takeElementScreenshot`

## دستوراتی که در حالت موازی خطا می‌دهند

برخی دستورات روی کل مرورگر یا کل نشست عمل می‌کنند، بنابراین نمی‌توانند پنجره یک تست خاص را هدف قرار دهند. درون یک تست موازی، این دستورات به‌جای تأثیر گذاشتن روی تست دیگر، خطا می‌دهند:

| دستورات | دلیل | جایگزین |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | پنجره سیستم‌عامل مشترک است | برای تعیین اندازه صفحه یک تست از `browser.setViewport()` استفاده کنید. تست‌های موازی یک پنجره سیستم‌عامل را به اشتراک می‌گذارند |
| `throttleNetwork`، `throttleCPU` | روی کل مرورگر اعمال می‌شوند | آن تست‌ها را بدون حالت موازی اجرا کنید |
| `closeWindow`، `switchToParentFrame` | پنجره focusشده را تغییر می‌دهند که بین همه تست‌ها مشترک است | هر تست را در پنجره مخصوص خود نگه دارید |
| `reloadSession`، `setTimeout` | نشستی را تغییر می‌دهند که بین همه تست‌ها مشترک است | آن‌ها را در hook `before` در `wdio.conf.ts` فراخوانی کنید |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | alertها به یک browsing context تعلق دارند | آن‌ها را روی contextی که `browser.url()` برمی‌گرداند فراخوانی کنید: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. به‌جای `sendAlertText(text)` از `page.acceptAlert(text)` استفاده کنید. `dismissAlert()` و `getAlertText()` نیز روی context کار می‌کنند |
| `getComputedRole`، `getComputedLabel` | WebDriver BiDi نمی‌تواند آن‌ها را بخواند | آن تست‌ها را بدون حالت موازی اجرا کنید |

`switchWindow` در نسخه v10 برای همه نشست‌های WebDriver BiDi حذف شد، نه فقط در حالت موازی. این دستور خطای ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` را می‌دهد. به‌جای سوئیچ کردن به context، شیء آن را نگه دارید.

WebdriverIO به‌طور خودکار promptها را رد می‌کند، مگر اینکه چیزی به رویداد `dialog` گوش دهد؛ بنابراین قبل از پاسخ دادن به یک prompt از درون یک تست، یک listener ثبت کنید (`browser.on('dialog', () => {})`).

همه دستورات دیگر WebDriver Classic نیز خطا می‌دهند. فقط `status`، `getTimeouts` و `getWindowHandles` مجاز هستند. اگر یک دستور WebdriverIO در حالت موازی بدون اینکه شما یک دستور Classic فراخوانی کرده باشید به WebDriver Classic بازگشت، لطفاً [آن را گزارش دهید](https://github.com/webdriverio/webdriverio/issues/new/choose).

## Hookها و timeoutها

### Mocha

- `before()` و `after()` در یک فایل spec **یک بار برای هر تست** اجرا می‌شوند، نه یک بار برای هر `describe`، زیرا هر تست پنجره مخصوص خود را دارد. هر تست `before`، `beforeEach`، خود تست، `afterEach` و `after` را در پنجره خود اجرا می‌کند. تنظیماتی را که باید یک بار برای هر فایل spec اجرا شوند، در hookهای `beforeSuite` / `afterSuite` در `wdio.conf.ts` قرار دهید. این hookها یک بار و خارج از هر پنجره تستی اجرا می‌شوند.
- از آنجا که هر تست hookهای خود را اجرا می‌کند، یک hook ناموفق فقط روی تست خودش اثر می‌گذارد. یک `before()` ناموفق یک بار برای هر تست گزارش می‌شود، نه یک بار برای `describe`. یک `beforeEach()` یا `afterEach()` ناموفق، سایر تست‌های `describe` را متوقف نمی‌کند. در اجرای ترتیبی، Mocha آن‌ها را رد می‌کند. با `failHookAffectedTests` (پیش‌فرض)، تستی که یک `before()` یا `beforeEach()` ناموفق آن را رد می‌کند، با همان متن اجرای ترتیبی شکست می‌خورد. فقط عنوان hook می‌تواند متفاوت باشد: یک `beforeEach()` ناموفق نام تست پنجره خودش را می‌آورد (`"before each" hook for "t2"`)، در حالی که اجرای ترتیبی برای همه آن‌ها نام اولین تست را می‌آورد.
- فقط `mochaOpts.timeout` اعمال می‌شود. `this.timeout()` در یک تست یا hook خطا می‌دهد، و `it(...).timeout()` یا timeout یک `describe` با یک هشدار نادیده گرفته می‌شود. به [timeoutهای Mocha و hookهای WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) مراجعه کنید.
- `mochaOpts.bail` و retryهای Mocha پشتیبانی نمی‌شوند و باعث شکست اجرا می‌شوند: `mochaOpts.retries`، `this.retries(n)` در یک `describe` و `it(...).retries(n)`. `this.retries()` در یک تست یا hook خطا می‌دهد. [retryهای WebdriverIO](./Retry.md) (`it(title, fn, retries)`) در حالت موازی کار می‌کنند.
- `.only()`، `this.skip()`، `grep`، `fgrep` و `invert` مانند اجرای ترتیبی کار می‌کنند.
- خطایی که هیچ تستی منتظر آن نیست (برای مثال یک timer که خطا می‌دهد) باعث شکست تست یا hook پنجره‌ای می‌شود که از آن آمده است، و سایر تست‌ها ادامه می‌یابند. مانند اجرای ترتیبی، یک unhandled rejection باعث شکست تست نمی‌شود، و با `mochaOpts.allowUncaught` خطا به worker پایان می‌دهد. خطایی که پس از پایان تست خود و در حالی که سایر تست‌ها هنوز در حال اجرا هستند رخ دهد، باعث شکست اجرا می‌شود و ثبت می‌گردد، اما هیچ تستی آن را نشان نمی‌دهد (اجرای ترتیبی آن را روی تستی نشان می‌دهد که در آن زمان در حال اجراست). پس از بسته شدن آخرین پنجره، چنین خطایی مانند اجرای ترتیبی به worker پایان می‌دهد. همین موضوع برای خطای یک event emitter که کد شما خارج از یک تست ایجاد کرده است، و در Node.js 22 برای خطای `queueMicrotask()` نیز صادق است، زیرا پنجره تست در آنجا مشخص نیست.
- `mochaOpts.dryRun`، `forbidPending` و `checkLeaks` هنوز در حالت موازی اعمال نمی‌شوند: تست‌ها اجرا می‌شوند، یک تست pending شکست نمی‌خورد، و نشت global گزارش نمی‌شود.

### Cucumber

- `BeforeAll` / `AfterAll` و hookهای `beforeFeature` / `afterFeature` در `wdio.conf.ts` یک بار برای هر worker اجرا می‌شوند، نه یک بار برای هر feature. `beforeFeature` / `afterFeature` فقط uri و feature اولین فایل feature را دریافت می‌کنند، که زمانی اهمیت دارد که یک worker چندین فایل feature را اجرا کند، برای مثال specهای گروه‌بندی‌شده. این hookها خارج از پنجره هر سناریویی اجرا می‌شوند، بنابراین نباید از دستوراتی استفاده کنند که به پنجره نیاز دارند.
- `Before` / `After`، `BeforeStep` / `AfterStep` و hookهای سناریو و step در `wdio.conf.ts` برای هر سناریو و در پنجره همان سناریو اجرا می‌شوند.
- مقدار پیش‌فرض `cucumberOpts.strict` در WebdriverIO برابر `false` است. یک step در وضعیت pending فقط با `strict: true` باعث شکست سناریو می‌شود.
- با `failFast`، سناریوهایی که از قبل در پنجره‌های دیگر در حال اجرا هستند پس از اولین شکست به پایان می‌رسند. سناریوهایی که شروع نشده‌اند، مانند اجرای ترتیبی، به‌عنوان skipped گزارش می‌شوند.
- با `ignoreUndefinedDefinitions: true`، یک step مبهم (با `failAmbiguousDefinitions: false`) یا یک step در وضعیت pending با `strict: true`، باعث شکست اجرا می‌شود. در این حالت اجرای ترتیبی موفق می‌شود.
- formatterهای Cucumber (`format`، `formatOptions`، `publish`) اجرا نمی‌شوند، بنابراین هیچ فایلی نمی‌نویسند.

### هر دو فریم‌ورک

پنجره یک تست به محض پایان تست بسته می‌شود. timerها یا promiseهایی را که پس از پایان تست به اجرا ادامه می‌دهند شروع نکنید.

## تغییرات رفتاری دستورات element در BiDi

`'wdio:experimentalBiDiCommands': true` پیاده‌سازی چندین دستور element را در همه تست‌های نشست، چه ترتیبی و چه موازی، جایگزین می‌کند:

- `addValue` و `clearValue` رویدادهای DOM مصنوعی ارسال می‌کنند، نه رویدادهای کلید معتبر (trusted).
- `getAttribute` از قوانین WebDriver برای مقادیر property و attribute پیروی می‌کند.
- `click` از طریق Actions API ارسال می‌شود.

مجموعه تست خود را یک بار با این قابلیت و بدون `parallelMode` اجرا کنید تا تست‌هایی را که به رفتار Classic وابسته هستند پیدا کنید.

## Reporterها

Reporterهایی که از [`@wdio/reporter`](./CustomReporter.md) ارث‌بری می‌کنند، تست‌های موازی را زیر suite درست گزارش می‌کنند و هر دستور را به تستی نسبت می‌دهند که browsing context آن، دستور را ارسال کرده است.

`@wdio/allure-reporter` با Mocha از حالت موازی پشتیبانی می‌کند. این reporter نتیجه یک تست را زمانی می‌نویسد که تست و hookهای `afterEach()` و `after()` آن پایان یابند. hookهای `before()` و `after()` در حالت موازی یک بار برای هر تست اجرا می‌شوند، بنابراین گزارش fixtureهای آن‌ها را یک بار برای هر تست نشان می‌دهد. با Cucumber، Allure هنوز از حالت موازی پشتیبانی نمی‌کند: نتایج، stepها و پیوست‌های سناریوهای هم‌پوشان ممکن است زیر سناریوی اشتباه قرار گیرند، بنابراین از آن با اجراهای ترتیبی استفاده کنید.

`@wdio/spec-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: یک بلوک `describe` در Mocha که پس از بلوک دیگری می‌آید، یا یک سناریوی Cucumber که در حین اجرای سناریوی دیگری شروع می‌شود، به‌صورت تودرتو زیر آن نمایش داده می‌شود، و با `retry` در Cucumber ممکن است تعداد موارد موفق اشتباه باشد. نتایج تست‌ها و exit code درست هستند.

`@wdio/cucumberjs-json-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: stepها و پیوست‌های سناریوهای هم‌پوشان ممکن است در سناریوی اشتباه قرار گیرند، و reporter یک هشدار ثبت می‌کند. از آن با اجراهای ترتیبی استفاده کنید.

`@wdio/html-reporter` هنوز از حالت موازی پشتیبانی نمی‌کند: لاگ‌ها، اسکرین‌شات‌ها و ویدیوهایی که یک تست پس از شروع تست دیگری ارسال می‌کند، ممکن است زیر تست اشتباه قرار گیرند. از آن با اجراهای ترتیبی استفاده کنید.

`@wdio/video-reporter` هر تست موازی را در ویدیوی مخصوص خود ضبط می‌کند. با Cucumber، ویدیوها را به Allure پیوست نمی‌کند.

یک reporter سفارشی نباید فرض کند که یک تست قبل از شروع تست بعدی پایان می‌یابد. به [Reporterها و تست‌های موازی](./CustomReporter.md#reporters-and-parallel-tests) مراجعه کنید.

## ارائه‌دهندگان ابری

ارائه‌دهندگان ابری برای هر نشست مرورگر یک ویدیو، یک مجموعه لاگ و یک وضعیت تست ثبت می‌کنند. در حالت موازی، تست‌های زیادی آن نشست را به اشتراک می‌گذارند، بنابراین داشبورد ارائه‌دهنده نمی‌تواند ویدیو، لاگ‌ها یا وضعیت موفقیت/شکست را به تفکیک تست جدا کند. `userContexts` همچنین نیاز دارد که grid ارائه‌دهنده از `browser.createUserContext` (و با Mocha از `browser.removeUserContext`) پشتیبانی کند. حالت موازی هنوز روی هیچ ارائه‌دهنده ابری آزمایش نشده است.

توصیه می‌کنیم هنگام اجرا روی یک ارائه‌دهنده ابری، حالت موازی را خاموش نگه دارید و از [`maxInstances`](./OrganizingTestSuites.md) برای اجرای موازی فایل‌های spec استفاده کنید. برای خاموش کردن آن، `parallelMode` را از گزینه‌های فریم‌ورک حذف کنید. اگر فقط `'wdio:experimentalBiDiCommands'` را حذف کنید، تست‌ها یکی پس از دیگری اجرا می‌شوند و هر اجرا یک هشدار ثبت می‌کند.

## عیب‌یابی

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

`'wdio:experimentalBiDiCommands': true` را به capability اضافه کنید. بدون آن، تست‌ها یکی پس از دیگری اجرا می‌شوند. با Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

نشست از WebDriver Classic استفاده می‌کند. `'wdio:enforceWebDriverClassic': true` را از capability حذف کنید، یا از مرورگر و درایوری با پشتیبانی از WebDriver BiDi استفاده کنید. با Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

درایور نمی‌تواند user context ایجاد کند. از `parallelMode: 'contexts'` استفاده کنید یا مرورگر و درایور را به‌روزرسانی کنید. با Cucumber، پیام به این صورت است: `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` یا `... is not supported in parallel mode`

تست دستوری از [دستوراتی که در حالت موازی خطا می‌دهند](#commands-that-throw-in-parallel-mode) را فراخوانی کرده است. از جایگزین موجود در جدول استفاده کنید.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` یا `mochaOpts.retries`، یا `this.retries(n)` / `.retries(n)` تستی را که خطا نام می‌برد حذف کنید، یا فایل spec را بدون `parallelMode` اجرا کنید. برای retry کردن یک تست در حالت موازی، از [retryهای WebdriverIO](./Retry.md) (`it(title, fn, retries)`) استفاده کنید.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

فایل spec دارای hookهای `before()` یا `after()` است. این hookها برای هر تست اجرا می‌شوند. تنظیماتی را که باید فقط یک بار اجرا شوند به `beforeSuite` / `afterSuite` در `wdio.conf.ts` منتقل کنید.

## صفحات مرتبط

- [سازماندهی مجموعه‌های تست](./OrganizingTestSuites.md): اجرای موازی فایل‌های spec با `maxInstances`
- [Sharding](./Sharding.md): تقسیم مجموعه تست بین چند ماشین
- [فریم‌ورک‌ها](./Frameworks.md): همه گزینه‌های Mocha و Cucumber
- [پروتکل‌های اتوماسیون](./AutomationProtocols.md): WebDriver BiDi و WebDriver Classic