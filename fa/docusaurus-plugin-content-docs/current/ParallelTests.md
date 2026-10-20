---
id: parallel-tests
title: تست‌های موازی در یک فایل Spec
description: "تست‌های Mocha یا سناریوهای Cucumber یک فایل spec را به‌طور هم‌زمان اجرا کنید، هر کدام در browsing context مخصوص به خود در WebDriver BiDi، با استفاده از mochaOpts.parallelMode یا cucumberOpts.parallelMode؛ نوعی browser pooling مشابه fullyParallel در Playwright."
---

از نسخهٔ v10، WebdriverIO می‌تواند تست‌های یک فایل spec را به‌طور هم‌زمان اجرا کند. هر `it()` در Mocha یا هر سناریو در Cucumber، پنجرهٔ مرورگر مخصوص به خود را دارد (یک [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context) در WebDriver BiDi) و همهٔ آن‌ها در یک worker و یک نشست مرورگر اجرا می‌شوند. از این قابلیت برای فایل‌های spec با تعداد زیادی تست مستقل استفاده کنید. این تست‌ها سریع‌تر تمام می‌شوند و به worker process یا نشست مرورگر بیشتری نیاز ندارید، زیرا هر تست فقط هزینهٔ باز کردن یک پنجره را می‌پردازد.

این روش نوعی browser pooling است: تست‌ها مجموعه‌ای از پنجره‌ها را در یک مرورگر به اشتراک می‌گذارند، نه مجموعه‌ای از مرورگرها را. اگر از Playwright می‌آیید، `parallelMode: 'userContexts'` نزدیک‌ترین معادل [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) است: هر تست context ایزولهٔ مخصوص به خود را دارد. تفاوت در این است که Playwright تست‌های یک فایل را بین چند worker process پخش می‌کند که هر کدام مرورگر خود را دارند، در حالی که WebdriverIO آن‌ها را به‌طور هم‌زمان در یک worker و یک مرورگر اجرا می‌کند.

این قابلیت از [`maxInstances`](./OrganizingTestSuites.md) جداست. `maxInstances` کل فایل‌های spec را به‌صورت موازی اجرا می‌کند و برای هر spec یک worker و یک نشست در نظر می‌گیرد. می‌توانید این دو را با هم ترکیب کنید: `maxInstances` تعیین می‌کند چند فایل spec هم‌زمان اجرا شوند، و `maxParallelContexts` تعیین می‌کند چند تست هم‌زمان در هر یک از آن فایل‌ها اجرا شوند.

:::warning آزمایشی
حالت موازی به capability آزمایشی `'wdio:experimentalBiDiCommands'` نیاز دارد. این capability نحوهٔ پیاده‌سازی دستورات element را در همهٔ تست‌ها تغییر می‌دهد، نه فقط در تست‌های موازی. بخش [تغییرات رفتاری دستورات element در BiDi](#behavior-changes-of-the-bidi-element-commands) را ببینید.
:::

## فعال‌سازی حالت موازی

به موارد زیر نیاز دارید:

- یک نشست WebDriver BiDi (حالت پیش‌فرض، مگر اینکه `'wdio:enforceWebDriverClassic': true` را تنظیم کرده باشید)،
- capability‌ای با مقدار `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` یا `@wdio/cucumber-framework`. Jasmine از حالت موازی پشتیبانی نمی‌کند.

اگر نشست از BiDi استفاده نکند یا این capability وجود نداشته باشد، WebdriverIO یک هشدار ثبت می‌کند و تست‌ها را یکی پس از دیگری اجرا می‌کند. بدون `parallelMode` هیچ چیزی تغییر نمی‌کند.

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

هر دو تست به‌طور هم‌زمان و هر کدام در پنجرهٔ خود اجرا می‌شوند. `browser.url()`، `$()` و `expect()` روی پنجرهٔ همان تستی عمل می‌کنند که آن‌ها را فراخوانی کرده است.

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

هر سناریوی یک فایل feature در پنجرهٔ مخصوص به خود اجرا می‌شود. پروفایل‌ها (`cucumberOpts.profiles`، `cucumberOpts.file`) و گزینه‌های `tags`، `name`، `strict`، `dryRun`، `failFast`، `retry` و `retryTagFilter` مانند اجرای ترتیبی کار می‌کنند.

## گزینه‌ها

| گزینه | مقادیر | پیش‌فرض | توضیحات |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | تنظیم‌نشده (ترتیبی) | حالت موازی را فعال می‌کند و میزان اشتراک‌گذاری بین تست‌ها را تعیین می‌کند. |
| `maxParallelContexts` | عدد | `os.cpus().length` | تعداد تست‌هایی که هم‌زمان اجرا می‌شوند. |

هر دو را در `mochaOpts` یا `cucumberOpts` تنظیم کنید.

`maxParallelContexts` تعداد اسلات‌ها را تعیین می‌کند. هر اسلات در هر لحظه یک تست را اجرا می‌کند، در حین اجرای تست فعلی پنجرهٔ تست بعدی را باز می‌کند و پنجرهٔ قبلی را در پس‌زمینه می‌بندد. بنابراین تا ۳ × `maxParallelContexts` پنجره، به‌علاوهٔ پنجرهٔ اول نشست، ممکن است برای مدت کوتاهی باز باشند: هر اسلات می‌تواند یک پنجرهٔ فعال، یک پنجرهٔ از پیش آماده‌شده و یک پنجرهٔ در حال بسته شدن داشته باشد. حالت موازی فقط پنجره‌هایی را می‌بندد که خودش باز کرده است.

## انتخاب بین `contexts` و `userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| پنجره برای هر تست | بله | بله |
| کوکی‌ها، `localStorage`، service workerها | مشترک بین همهٔ تست‌ها | ایزوله برای هر تست ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| ورود (Login) | یک بار، اگر تست‌ها از کوکی نشست دوباره استفاده کنند | در هر تست |
| پشتیبانی درایور | هر مرورگر دارای BiDi | به پشتیبانی از `browser.createUserContext()` نیاز دارد، در غیر این صورت اجرا شکست می‌خورد |

به‌طور پیش‌فرض `'contexts'` را انتخاب کنید. زمانی `'userContexts'` را انتخاب کنید که تست‌ها نباید کوکی‌ها یا storage یکدیگر را ببینند، برای مثال تست‌هایی که با کاربران مختلف وارد می‌شوند. مانند `'contexts'`، اگر نشست WebDriver BiDi نباشد یا `'wdio:experimentalBiDiCommands'` در capabilities وجود نداشته باشد، `'userContexts'` نیز با یک هشدار به اجرای ترتیبی برمی‌گردد. اگر درایور از `browser.createUserContext` پشتیبانی نکند، اجرا به‌جای بازگشت به حالت ترتیبی، شکست می‌خورد.

`browser.newWindow()` پنجره را در user context پیش‌فرض باز می‌کند، بنابراین پنجره‌ای که به این روش باز شود خارج از ایزوله‌سازی کوکی و storage تست قرار دارد.

## آنچه به هر تست تعلق دارد

درون یک تست موازی، این دستورات روی پنجرهٔ خود تست عمل می‌کنند:

- ناوبری: `url`، `back`، `forward`، `refresh`، `getUrl`، `getTitle`
- دستورات element: `$`، `$$`، `shadow$`، `click`، `setValue`، `getText`، دستورات `waitFor*` و موارد دیگر
- `execute`، `actions`، `addInitScript`
- کوکی‌ها: `getCookies`، `setCookies`، `deleteCookies` از پارتیشن کوکی تست استفاده می‌کنند
- `mock()`: یک mock که در یک تست موازی ایجاد شود، فقط درخواست‌های پنجرهٔ همان تست و frameهای آن را رهگیری و ثبت می‌کند، بنابراین دو تست می‌توانند یک URL یکسان را mock کنند
- اسکرین‌شات‌ها: `saveScreenshot`، `takeElementScreenshot`

## دستوراتی که در حالت موازی خطا می‌دهند

برخی دستورات روی کل مرورگر یا کل نشست عمل می‌کنند، بنابراین نمی‌توانند پنجرهٔ یک تست خاص را هدف بگیرند. درون یک تست موازی، این دستورات به‌جای تأثیر گذاشتن روی تست دیگر، خطا می‌دهند:

| دستورات | دلیل | جایگزین |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | پنجرهٔ سیستم‌عامل مشترک است | برای تعیین اندازهٔ صفحهٔ یک تست از `browser.setViewport()` استفاده کنید. تست‌های موازی یک پنجرهٔ سیستم‌عامل مشترک دارند |
| `throttleNetwork`، `throttleCPU` | روی کل مرورگر اعمال می‌شوند | آن تست‌ها را بدون حالت موازی اجرا کنید |
| `closeWindow`، `switchToParentFrame` | پنجرهٔ فعال را تغییر می‌دهند که بین همهٔ تست‌ها مشترک است | هر تست را در پنجرهٔ خودش نگه دارید |
| `reloadSession`، `setTimeout` | نشستی را تغییر می‌دهند که بین همهٔ تست‌ها مشترک است | آن‌ها را در هوک `before` در `wdio.conf.ts` فراخوانی کنید |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | alertها به یک browsing context تعلق دارند | آن‌ها را روی context‌ای که `browser.url()` برمی‌گرداند فراخوانی کنید: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. به‌جای `sendAlertText(text)` از `page.acceptAlert(text)` استفاده کنید. `dismissAlert()` و `getAlertText()` نیز روی context کار می‌کنند |
| `getComputedRole`، `getComputedLabel` | WebDriver BiDi نمی‌تواند آن‌ها را بخواند | آن تست‌ها را بدون حالت موازی اجرا کنید |

`switchWindow` در v10 برای همهٔ نشست‌های WebDriver BiDi حذف شد، نه فقط در حالت موازی. این دستور خطای ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` را می‌دهد. به‌جای سوئیچ کردن به context، شیء آن را نگه دارید.

WebdriverIO به‌طور خودکار promptها را رد می‌کند، مگر اینکه چیزی به رویداد `dialog` گوش دهد. بنابراین پیش از پاسخ دادن به یک prompt از درون تست، یک listener ثبت کنید (`browser.on('dialog', () => {})`).

همهٔ دستورات دیگر WebDriver Classic نیز خطا می‌دهند. فقط `status`، `getTimeouts` و `getWindowHandles` مجاز هستند. اگر یک دستور WebdriverIO در حالت موازی بدون اینکه شما دستور Classic فراخوانی کرده باشید به WebDriver Classic برگشت، لطفاً [آن را گزارش دهید](https://github.com/webdriverio/webdriverio/issues/new/choose).

## هوک‌ها و timeoutها

### Mocha

- `before()` و `after()` در یک فایل spec **یک بار برای هر تست** اجرا می‌شوند، نه یک بار برای هر `describe`، زیرا هر تست پنجرهٔ مخصوص به خود را دارد. هر تست `before`، `beforeEach`، خود تست، `afterEach` و `after` را در پنجرهٔ خودش اجرا می‌کند. تنظیماتی را که باید یک بار برای هر فایل spec اجرا شوند، در هوک‌های `beforeSuite` / `afterSuite` در `wdio.conf.ts` قرار دهید. این هوک‌ها یک بار و خارج از هر پنجرهٔ تست اجرا می‌شوند.
- فقط `mochaOpts.timeout` اعمال می‌شود. `this.timeout()` در یک تست یا هوک خطا می‌دهد، و `it(...).timeout()` یا timeout یک `describe` با یک هشدار نادیده گرفته می‌شود. بخش [timeoutهای Mocha و هوک‌های WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) را ببینید.
- `mochaOpts.bail` و `mochaOpts.retries` پشتیبانی نمی‌شوند و باعث شکست اجرا می‌شوند. `this.retries()` خطا می‌دهد.
- `.only()`، `this.skip()`، `grep`، `fgrep` و `invert` مانند اجرای ترتیبی کار می‌کنند.

### Cucumber

- `BeforeAll` / `AfterAll` و هوک‌های `beforeFeature` / `afterFeature` در `wdio.conf.ts` یک بار برای هر worker اجرا می‌شوند، نه یک بار برای هر feature. `beforeFeature` / `afterFeature` فقط uri و feature اولین فایل feature را دریافت می‌کنند؛ این موضوع زمانی اهمیت دارد که یک worker چندین فایل feature را اجرا کند، برای مثال specهای گروه‌بندی‌شده. این هوک‌ها خارج از پنجرهٔ هر سناریو اجرا می‌شوند، بنابراین نباید از دستوراتی استفاده کنند که به پنجره نیاز دارند.
- `Before` / `After`، `BeforeStep` / `AfterStep` و هوک‌های سناریو و step در `wdio.conf.ts` برای هر سناریو و در پنجرهٔ همان سناریو اجرا می‌شوند.
- `cucumberOpts.strict` در WebdriverIO به‌طور پیش‌فرض `false` است. یک step در حالت pending فقط با `strict: true` باعث شکست سناریو می‌شود.

### هر دو فریم‌ورک

پنجرهٔ یک تست به محض پایان تست بسته می‌شود. تایمرها یا promiseهایی را شروع نکنید که پس از پایان تست همچنان در حال اجرا باقی بمانند.

## تغییرات رفتاری دستورات element در BiDi

`'wdio:experimentalBiDiCommands': true` پیاده‌سازی چندین دستور element را در همهٔ تست‌های نشست، چه ترتیبی و چه موازی، جایگزین می‌کند:

- `addValue` و `clearValue` رویدادهای DOM مصنوعی ارسال می‌کنند، نه رویدادهای کلید trusted.
- `getAttribute` از قواعد WebDriver برای مقادیر property و attribute پیروی می‌کند.
- `click` از طریق Actions API ارسال می‌شود.

مجموعه تست‌های خود را یک بار با این capability و بدون `parallelMode` اجرا کنید تا تست‌هایی را که به رفتار Classic وابسته هستند پیدا کنید.

## گزارشگرها (Reporters)

گزارشگرهایی که [`@wdio/reporter`](./CustomReporter.md) را extend می‌کنند، تست‌های موازی را زیر suite درست گزارش می‌دهند و هر دستور را به تستی پیوند می‌دهند که browsing context آن، دستور را ارسال کرده است.

`@wdio/allure-reporter` و `@wdio/junit-reporter` هنوز از حالت موازی پشتیبانی نمی‌کنند. این گزارشگرها در هر worker فقط یک تست فعلی را دنبال می‌کنند، بنابراین وقتی تست‌ها هم‌پوشانی دارند، نتایج، stepها و پیوست‌های Allure، و propertyها و لاگ‌های worker در JUnit ممکن است زیر تست اشتباه قرار گیرند. از آن‌ها در اجراهای ترتیبی استفاده کنید. با `addConsoleLogs`، `@wdio/spec-reporter` خروجی کنسول تست‌های هم‌پوشان را به‌طور قابل اعتماد به تست مربوطه نسبت نمی‌دهد.

یک گزارشگر سفارشی نباید فرض کند که یک تست پیش از شروع تست بعدی تمام می‌شود. بخش [گزارشگرها و تست‌های موازی](./CustomReporter.md#reporters-and-parallel-tests) را ببینید.

## عیب‌یابی

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

`'wdio:experimentalBiDiCommands': true` را به capability اضافه کنید. بدون آن، تست‌ها یکی پس از دیگری اجرا می‌شوند. در Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

نشست از WebDriver Classic استفاده می‌کند. `'wdio:enforceWebDriverClassic': true` را از capability حذف کنید، یا از مرورگر و درایوری با پشتیبانی WebDriver BiDi استفاده کنید. در Cucumber، پیام به این صورت است: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

درایور نمی‌تواند user context ایجاد کند. از `parallelMode: 'contexts'` استفاده کنید یا مرورگر و درایور را به‌روزرسانی کنید. در Cucumber، پیام به این صورت است: `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` or `... is not supported in parallel mode`

تست یکی از دستورات بخش [دستوراتی که در حالت موازی خطا می‌دهند](#commands-that-throw-in-parallel-mode) را فراخوانی کرده است. از جایگزین ذکرشده در جدول استفاده کنید.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` یا `mochaOpts.retries` را حذف کنید، یا فایل spec را بدون `parallelMode` اجرا کنید.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

فایل spec دارای هوک‌های `before()` یا `after()` است. این هوک‌ها برای هر تست اجرا می‌شوند. تنظیماتی را که فقط باید یک بار اجرا شوند، به `beforeSuite` / `afterSuite` در `wdio.conf.ts` منتقل کنید.

## صفحات مرتبط

- [سازمان‌دهی مجموعه تست‌ها](./OrganizingTestSuites.md): اجرای موازی فایل‌های spec با `maxInstances`
- [Sharding](./Sharding.md): تقسیم مجموعه تست‌ها بین چند ماشین
- [فریم‌ورک‌ها](./Frameworks.md): همهٔ گزینه‌های Mocha و Cucumber
- [پروتکل‌های اتوماسیون](./AutomationProtocols.md): WebDriver BiDi و WebDriver Classic