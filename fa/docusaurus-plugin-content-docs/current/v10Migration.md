---
id: v10-migration
title: از v9 به v10
description: به‌روزرسانی یک پروژهٔ WebdriverIO v9 به v10، شامل همهٔ تغییرات ناسازگار و یک skill برای عامل کدنویسی که این راهنما را اعمال می‌کند.
---

این راهنما تغییرات ناسازگار (breaking changes) نسخهٔ `v10` از WebdriverIO و کارهایی را که باید برای هر کدام انجام دهید گردآوری کرده است.

برخلاف نسخه‌های اصلی قبلی، بیشتر این تغییرات را نمی‌توان با [codemod](https://github.com/webdriverio/codemod) وب‌درایورآی‌او اعمال کرد، چون به معنای واقعی تست‌های شما بستگی دارند. [امضاهای قدیمی دستورات](#legacy-command-signatures) در ادامه، جایگزینی‌های مکانیکی هستند. هر بخش دیگر توضیح می‌دهد که چگونه مکان‌های تحت تأثیر را در مجموعهٔ تست خود پیدا کنید.

## مهاجرت با یک عامل کدنویسی

skill مهاجرت به v10 را به عامل خود بدهید و از آن بخواهید مجموعهٔ تست را با پیروی از این صفحه به WebdriverIO v10 مهاجرت دهد. این skill همان روال کار است: چه چیزی را جستجو کند، کدام codemod را اجرا کند و چه زمانی متوقف شود. این صفحه منبع مرجع برای هر تغییر ناسازگار است.

آن را از داخل پروژه‌ای که در حال ارتقای آن هستید نصب کنید. [skills CLI](https://skills.sh) فایل [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) را از این مخزن می‌خواند و آن را در پوشهٔ skill عامل‌هایی که انتخاب می‌کنید می‌نویسد:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` این skill را نصب می‌کند. skillهای مربوط به کار روی مخزن WebdriverIO به‌عنوان داخلی علامت‌گذاری شده‌اند و پیشنهاد داده نمی‌شوند. CLI می‌پرسد برای کدام عامل‌ها نصب شود و skill را در پوشهٔ پروژهٔ هر عامل می‌نویسد. همچنین می‌توانید آن فایل را به گفتگو پیوست کنید.

سلکتورهای سخت‌گیرانه (strict) و فهرست‌های بدون پیشوند `specs` / `exclude` در capabilityها فقط هنگام اجرای مجموعهٔ تست آشکار می‌شوند. skill نمی‌تواند فقط از روی کد منبع دربارهٔ آن‌ها تصمیم بگیرد.

## Node.js

WebdriverIO v10 به Node.js نسخهٔ 22.23.4، 24.22.1 یا 26.12.1، یا نسخه‌ای جدیدتر از این خطوط نیاز دارد. این‌ها نخستین نسخه‌هایی هستند که [مخزن CA به‌روزشده](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) را برای مورد نفوذ به CA میانی eMudhra دارند. Node.js 18 و 20 دیگر پشتیبانی نمی‌شوند و Node.js 23 و 25 نیز پشتیبانی نمی‌شوند. CI نسخه‌های Node.js 22، 24 و 26 را پوشش می‌دهد.

## تست‌های کامپوننت

browser runner همچنان در Chrome 90، Edge 90، Firefox 90 و Safari 14.1 یا جدیدتر اجرا می‌شود. [پشتیبانی مرورگر](/docs/component-testing#browser-support) را ببینید.

کدی که به `browser.execute` داده می‌شود در سطح ES2021 باقی می‌ماند تا بتواند در مرورگرهای قدیمی‌تر تحت تست اجرا شود. این حداقل تغییری نکرده است.

## Mocha

`@wdio/mocha-framework` و `@wdio/browser-runner` به [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) وابسته‌اند. Mocha 12 به Node.js `^20.19.0 || >=22.12.0` نیاز دارد که با حداقل نسخهٔ Node.js 22.23.4 در v10 پوشش داده می‌شود.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` حذف شده است. Mocha پرچم `--compilers` را که مدت‌ها منسوخ بود حذف کرد، بنابراین نگاشت‌های compiler باقی‌مانده نادیده گرفته می‌شوند. transpilerها یا سایر فایل‌های راه‌اندازی را با `mochaOpts.require` بارگذاری کنید.

WebdriverIO از timeout در Mocha پیروی می‌کند: `this.timeout()` در یک تست یا hook، و `mochaOpts.timeout: 0` که timeout را غیرفعال می‌کند. در v9، WebdriverIO مقدار `this.timeout()` را در یک تست نادیده می‌گرفت، و از نسخهٔ 9.22 به بعد `mochaOpts.timeout: 0` باعث شکست همهٔ تست‌ها می‌شد ("Timeout after -3ms"). آرگومان `retry` در WebdriverIO پس از timeout تست را دوباره اجرا نمی‌کند. [timeoutهای Mocha و hookهای WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) را ببینید، همچنین برای `mochaOpts.parallelMode`. جدید در v10: [تست‌های موازی در یک فایل spec](./ParallelTests.md) با `mochaOpts.parallelMode` یا `cucumberOpts.parallelMode`.

مقدار پیش‌فرض `failHookAffectedTests` برابر `true` است. یک hook ناموفق `before` یا `beforeEach` باعث شکست تست‌هایی می‌شود که آن hook از اجرایشان جلوگیری کرده است. برای گزارش فقط خود hook، `mochaOpts.failHookAffectedTests` را روی `false` تنظیم کنید.

عنوان یک hook شامل توضیح یا نام تابع hook است، همانند Mocha: `"before each" hook: login for "my test"` برای `beforeEach('login', fn)` یا `beforeEach(function login () {})`، یا بدون نام برای یک hook ناشناس: `"before each" hook for "my test"`. در v9 این عنوان شامل `wrappedHook`، یعنی نام wrapper در WebdriverIO بود. این عنوان را در خطای تستی که یک hook ناموفق از اجرایش جلوگیری کرده، و در نام hookهای سطح ریشه، مثلاً در Allure، می‌بینید.

از `expect-webdriverio` 8 استفاده کنید، [expect-webdriverio 8](#expect-webdriverio-8) را ببینید. Mocha ممکن است این بسته را دو بار در یک فرایند بارگذاری کند؛ این بسته وضعیت assertion را بین آن نسخه‌ها به اشتراک می‌گذارد ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغییرات Mocha 12 که ممکن است از طریق `mochaOpts` نمود پیدا کنند:

- `grep` پرچم‌های مدرن RegExp را می‌پذیرد.
- `ui` همچنان `bdd`، `tdd`، `qunit` یا `exports` است. رابط‌های سفارشی باید پسوند `*-bdd`، `*-tdd` یا `*-qunit` را حفظ کنند.
- `parallel` همچنان پشتیبانی نمی‌شود. موازی‌سازی specها در اختیار WDIO است؛ اگر worker pool در Mocha را فعال کنید خطا می‌دهد.

Mocha 12 در درجهٔ اول ESM است (`"type": "module"`). `require('mocha')` به‌صورت برنامه‌نویسی همچنان در Node 22 از طریق `require(esm)` کار می‌کند. CLI مربوط به Mocha در WDIO (`wdio run … --mochaOpts.*`) تغییری نکرده است؛ CLI خود Mocha اکنون به‌جای yargs از `util.parseArgs` استفاده می‌کند.

## Cucumber

`@wdio/cucumber-framework` به [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) وابسته است.

Cucumber 13 به Node.js 22، 24 یا 26 یا جدیدتر نیاز دارد. روی Node.js 20، 23 یا 25 اجرا نمی‌شود. بستهٔ framework بازهٔ v10 را اعلام می‌کند که Node.js 23 و 25 را نیز مستثنی می‌کند.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` نام مستعار ندارد. تنظیم آن خطا می‌دهد، تا یک فیلتر باقی‌مانده نتواند بی‌صدا همهٔ سناریوها را اجرا کند.

Cucumber 13 دیگر `Cli` را export نمی‌کند. اجراهای برنامه‌نویسی از طریق `runCucumber` از `@cucumber/cucumber/api` انجام می‌شوند که adapter از قبل از آن استفاده می‌کند.

سایر تغییرات ناسازگار Cucumber 13 (مسیرهای مبهم formatter، workerهای موازی، `BeforeAll` / `AfterAll`) در [راهنمای ارتقای Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) توضیح داده شده‌اند.

### uid فیچر

uid یک فیچر Cucumber، مسیر فایل فیچر از `rootDir` است، نه نام فایل: `features/admin/login.feature:1:1` به‌جای `login.feature:1:1`. دو فایل فیچر با نام یکسان در پوشه‌های مختلف دیگر uid مشترک ندارند. `parent` و `fullTitle` یک سناریو از این uid استفاده می‌کنند. کاراکترهای `%`، `:` و `#` در مسیر به‌صورت `%25`، `%3A` و `%23` کدگذاری می‌شوند، بنابراین `uid.split(':')[1]` همچنان شمارهٔ خط است و `#` فقط شروع شمارهٔ بخش را نشان می‌دهد. در specهای گروه‌بندی‌شده با ترتیب تصادفی، فیچری که دوباره شروع می‌شود uid مجموعهٔ `<uid>#2` را دارد.

با `scenarioLevelReporter: true`، مقدار `historyId` در Allure از `fullTitle` می‌آید، بنابراین تاریخچهٔ Allure هر سناریو با این تغییر از نو شروع می‌شود. همچنین وقتی `rootDir` یا مسیر فایل فیچر تغییر کند نیز از نو شروع می‌شود. برای حفظ یک تاریخچهٔ واحد برای فایل‌های config در پوشه‌های مختلف، `rootDir` یکسانی را در هر کدام تنظیم کنید.

## Jasmine

`@wdio/jasmine-framework` به [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) وابسته است. Jasmine 6 روی Node.js 20، 22 و 24 تست شده است. حداقل نسخهٔ Node.js 22.23.4 در v10 از قبل این بازه را پوشش می‌دهد.

`jasmineNodeOpts` حذف شد. Jasmine را با `jasmineOpts` پیکربندی کنید. تنظیم `jasmineNodeOpts` خطا می‌دهد:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` دیگر خوانده نمی‌شود. از `jasmineOpts.stopOnSpecFailure` استفاده کنید. یک `failFast` باقی‌مانده مجموعهٔ تست را متوقف نمی‌کند. `failFast` در Cucumber گزینهٔ متفاوتی است و همچنان کار می‌کند.

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` حذف شد. از `jasmineOpts.oneFailurePerSpec` استفاده کنید. تنظیم کلید قدیمی خطا می‌دهد:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

matcherهای همگام Jasmine دوباره همگام شده‌اند. در v9، `expect` سراسری همان `expectAsync` در Jasmine بود، بنابراین `expect(1).toBe(1)` یک promise برمی‌گرداند. در v10، matcherهای داخلی Jasmine و matcherهایی که با `jasmine.addMatchers` اضافه می‌کنید `undefined` برمی‌گردانند. matcherهای WebdriverIO، matcherهای ناهمگام Jasmine و matcherهای `jasmine.addAsyncMatchers` همچنان یک promise برمی‌گردانند، پس همچنان آن‌ها را `await` کنید. لازم نیست `await expect($('#logo')).toBeDisplayed()` را به `expectAsync()` تغییر دهید: `expect` سراسری matcherهای WebdriverIO را خودش به `expectAsync` می‌فرستد. `await expect(1).toBe(1)` همچنان کار می‌کند.

یک assertion همگام ناموفق بدون `await` اکنون باعث شکست spec می‌شود. در v9، این یک promise ردشده بود: اگر هیچ چیز آن را await نمی‌کرد، spec می‌توانست موفق شود و فقط یک unhandled rejection در لاگ باقی می‌ماند. پس از ارتقا، به specهایی که شروع به شکست می‌کنند نگاه کنید. آن‌ها در v9 یک شکست پنهان داشتند و راه‌حل در خود تست یا در برنامه است، نه در فراخوانی `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: حتی وقتی `onSave` فراخوانی نشده بود موفق می‌شد
    // v10: وقتی `onSave` فراخوانی نشده باشد شکست می‌خورد
    expect(onSave).toHaveBeenCalled()
})
```

نتیجهٔ یک matcher همگام اکنون `undefined` است، بنابراین `.then()` یا `.catch()` روی آن یک `TypeError` پرتاب می‌کند:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

اثرات دیگر این تغییر:

- `oneFailurePerSpec` اکنون spec را در نخستین assertion ناموفق متوقف می‌کند: برای یک matcher همگام بلافاصله، و برای یک matcher ناهمگام await‌شده هنگامی که promise تعیین تکلیف شود.
- matcherهای spy در Jasmine بدون `await` کار می‌کنند. در v9، `toHaveBeenCalled`، `toHaveSpyInteractions` و `toHaveNoOtherSpyInteractions` با خطای "Does not take arguments" شکست می‌خوردند و یک spy فراخوانی‌نشده بدون `await` موفق می‌شد.
- `jasmine.addMatchers` دیگر جایگزین نمی‌شود، بنابراین Jasmine دیگر هشدار "Monkey patching detected" را نشان نمی‌دهد.

`toHaveSize` دو معنا دارد. روی یک مقدار WebdriverIO، matcher مربوط به WebdriverIO است و اندازهٔ عنصر را بررسی می‌کند: یک عنصر، یک آرایهٔ عنصر (شامل نتیجهٔ `$$().filter()`)، یک `Element[]`، یک عنصر multi-remote، یک مرورگر، یک browsing context، یک mock، wrapper مربوط به `some()`، یا یک promise مانند `$()` زنجیره‌ای. روی هر مقدار دیگری، matcher مربوط به Jasmine است و طول را بررسی می‌کند. در v9، همیشه matcher مربوط به Jasmine اجرا می‌شد.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، همگام
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، ناهمگام
```

typeها از همین قواعد پیروی می‌کنند. `@wdio/jasmine-framework` اکنون `expect` سراسری را با matcherهای Jasmine، به‌علاوهٔ matcherهای WebdriverIO و matcherهای ناهمگام Jasmine که یک promise برمی‌گردانند، تایپ می‌کند. `expect-webdriverio/jasmine-wdio-expect-async` را از `types` در `tsconfig.json` خود حذف کنید، چون همهٔ matcherها را ناهمگام تایپ می‌کند. اگر `jasmine` وجود ندارد آن را اضافه کنید:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` و `expect.multiRemote()` اکنون در specهای Jasmine نیز کار می‌کنند. پیش از این، در زمان اجرا روی `expect` مربوط به Jasmine وجود نداشتند.

## expect-webdriverio 8

`@wdio/globals`، `@wdio/runner` و `@wdio/browser-runner` به `expect-webdriverio` 8 به‌عنوان peer dependency نیاز دارند. در v9، این `expect-webdriverio` 5، 6 یا 7 بود. اگر `package.json` شما `expect-webdriverio` را فهرست کرده است، آن را در همان تغییری که بسته‌های `@wdio/*` را به‌روز می‌کنید به نسخهٔ 8 ارتقا دهید.

`expect-webdriverio` 8 تغییرات ناسازگار خودش را دارد. [راهنمای مهاجرت v7 به v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) آن هر تغییر و جایگزینش را فهرست می‌کند. اگر از `expect-webdriverio` 5 یا 6 می‌آیید، [راهنمای مهاجرت v5 به v6](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6) آن را نیز بخوانید: نسخهٔ 8 APIهایی را که از 5.6.9 تا 6.0.0 منسوخ شده بودند حذف می‌کند. نسخهٔ 7 راهنمای مهاجرت ندارد. این نسخه پشتیبانی از multi-remote را اضافه می‌کند و `toMatchSnapshot()` و `toMatchInlineSnapshot()` روی `$$()` اکنون `outerHTML` هر عنصر را ذخیره می‌کنند: آن snapshotها را به‌روز کنید. این تغییرات بیشترین احتمال تأثیر بر یک مجموعهٔ تست را دارند:

- `toHaveText` روی `$$()` عناصر را اندیس به اندیس مقایسه می‌کند. یک آرایهٔ مورد انتظار با ترتیبی متفاوت از صفحه شکست می‌خورد. از ترتیب صفحه، `expect.oneOf()` یا `expect.arrayContaining()` استفاده کنید.
- آرایه‌ای از مقادیر مورد انتظار روی یک عنصر واحد باعث شکست `toHaveText`، `toHaveHTML`، `toHaveComputedLabel`، `toHaveComputedRole` و `toHaveElementClass` می‌شود. از `expect.oneOf()` استفاده کنید. برای `toHaveElementClass`، آرایه به معنای «هر یک از این کلاس‌ها را دارد» بود: از `expect.oneOf()` استفاده کنید، یا وقتی عنصر باید همهٔ آن‌ها را داشته باشد، برای هر کلاس یک assertion بنویسید.
- یک matcher فهرستی (`expect.arrayContaining()`، `expect.arrayOf()`) روی یک عنصر واحد، یا همراه با `some()`، خطا پرتاب می‌کند. روی `$$()`، مقادیر همهٔ عناصر را یک‌جا مقایسه می‌کند.
- یک attribute یا property غایب هرگز تطبیق پیدا نمی‌کند، حتی با matcherی که هیچ مقداری را می‌پذیرد، مانند `expect.not.stringContaining()`.
- `URL`، `Set`، `Map` و مقادیر باینری بر اساس محتوایشان مقایسه می‌شوند. assertionی که به اشتباه موفق می‌شد اکنون ممکن است شکست بخورد.
- typeهای کمکی دیگر سراسری نیستند. فایلی که از `Test`، `TestResult`، `Scenario` یا `WdioCustomMatchers` بدون import استفاده می‌کند با `Cannot find name` شکست می‌خورد: از `Frameworks.Test`، `Frameworks.TestResult` و `Frameworks.Scenario` از `@wdio/types`، و از `ExpectWebdriverIO.Matchers` استفاده کنید.
- `setFeatureFlags()` و گزینهٔ `featureFlags` حذف شدند.
- این APIهای منسوخ حذف شدند: `setOptions` (از `setDefaultOptions` استفاده کنید)، `getConfig` (از `getDefaultOptions` استفاده کنید)، `matchers` (از `wdioCustomMatchers` استفاده کنید)، `toHaveAttr` (از `toHaveAttribute` استفاده کنید)، `toHaveClass` (از `toHaveElementClass` استفاده کنید)، `toBeRequestedWithResponse()` (از `toBeRequestedWith({ response })` استفاده کنید)، و `expect-webdriverio/types` (از `expect-webdriverio/expect-global` استفاده کنید).
- hookهای `beforeAssertion` و `afterAssertion` نام نام مستعاری را که تست فراخوانی کرده دریافت می‌کنند، برای `toBeExisting`، `toBePresent`، `toHaveLink`، `toHaveValue` و `toBeRequested`. در v9، نام matcher پشت نام مستعار را دریافت می‌کردند، مثلاً `toExist` برای `toBeExisting`.
- روی یک مرورگر multi-remote، نتیجهٔ `$$()` را به `expect` بدهید. یک آرایهٔ ساده مانند `[...elements]` یا `Array.from(elements)` به‌عنوان عناصر شناخته نمی‌شود و assertion شکست می‌خورد.

روی یک مرورگر multi-remote، یک assertion همهٔ نمونه‌ها را بررسی می‌کند و `expect.multiRemote()` برای هر نمونه یک مقدار مورد انتظار می‌دهد. [assertionهای Multiremote](/docs/multiremote#assertions) را ببینید.

## بسته‌های درایور

WebdriverIO v10 مرورگرهای Firefox، Edge و Safari را با `geckodriver` 8، `edgedriver` 8 و `safaridriver` 3 اجرا می‌کند. در v9، از `geckodriver` و `edgedriver` نسخهٔ 6 یا 7، و `safaridriver` نسخهٔ 1 یا 2 استفاده می‌کرد. WebdriverIO آن‌ها را نصب می‌کند، بنابراین لازم نیست خودتان آن‌ها را فهرست کنید. اگر `package.json` شما یکی از آن‌ها را فهرست کرده است، آن را در همان تغییری که بسته‌های `@wdio/*` را به‌روز می‌کنید به‌روز کنید.

`geckodriver` و `edgedriver` بستهٔ `@wdio/logger` را به‌عنوان peer dependency می‌گیرند، بنابراین از طریق logger نصب WebdriverIO شما لاگ می‌کنند. در v9، `geckodriver` و `edgedriver` نسخهٔ خودشان از `@wdio/logger` را می‌آوردند و آن نسخهٔ دوم فایل لاگ را در `outputDir` خالی می‌کرد. `npm ls @wdio/logger` را اجرا کنید: همهٔ نسخه‌ها باید نسخهٔ 10 باشند. plugin یا serviceی که هنوز به نسخهٔ 9 وابسته است همین اثر را دارد.

[یادداشت‌های ارتقای درایور](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) همهٔ تغییرات را فهرست می‌کنند. این تغییرات می‌توانند بر یک پروژهٔ WebdriverIO اثر بگذارند:

- دانلودهای درایور از `HTTPS_PROXY` و `HTTP_PROXY` استفاده می‌کنند. در v9، دانلودهای `geckodriver` و `edgedriver` آن‌ها را نادیده می‌گرفتند. اگر یک proxy در محیط شما تنظیم شده ولی باید مستقیماً به CDN درایور دسترسی داشت، میزبان آن را به `NO_PROXY` اضافه کنید.
- `geckodriver` دیگر `GECKODRIVER_FILEPATH` را نمی‌خواند. از `GECKODRIVER_PATH` استفاده کنید.
- `wdio:edgedriverOptions` و `wdio:safaridriverOptions` همانند `wdio:chromedriverOptions` گزینهٔ `spawnOpts` را می‌پذیرند.

## دانلود مرورگرها

در v9، WebdriverIO فایل‌های zip مربوط به Chrome، Chromium و Chromedriver را خودش استخراج می‌کرد. در v10 از دستور سیستمی `unzip` روی Linux و macOS (و `tar.exe` یا PowerShell روی Windows) استفاده می‌کند. imageهای سبک Docker مانند `node:24-slim` آن را ندارند: آن را نصب کنید، [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser) را ببینید.

در v9، دانلودهای Chrome، Chromium، Firefox و Chromedriver از `HTTPS_PROXY` و `HTTP_PROXY` استفاده می‌کردند. در v10 فقط زمانی از آن‌ها استفاده می‌کنند که `proxy-agent` در پروژهٔ شما نصب شده باشد، یا Node.js با `NODE_USE_ENV_PROXY=1` اجرا شود. WebdriverIO وقتی یک متغیر proxy تنظیم شده ولی دانلود آن را نادیده می‌گیرد، یک هشدار لاگ می‌کند. [Proxy برای دانلود مرورگر و درایور](/docs/proxy#proxy-for-browser-and-driver-downloads) را ببینید.

## Global مربوط به Multi-remote

global با حروف کوچک `multiremotebrowser` حذف شد، هم از `@wdio/globals` و هم از globalهای `eslint-plugin-wdio`. از `multiRemoteBrowser` استفاده کنید.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilityها

`specs` و `exclude` در capabilityها دیگر خوانده نمی‌شوند. از `wdio:specs` و `wdio:exclude` استفاده کنید.

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

کلیدهای سطح بالای config همچنان `specs` و `exclude` هستند. یک فهرست بدون پیشوند باقی‌مانده روی یک capability، فایلی برای آن capability انتخاب نمی‌کند. در این صورت capability از `specs` و `exclude` سطح بالا استفاده می‌کند.

نام‌های مستعار `tunnelIdentifier` و `parentTunnel` از typeهای گزینه‌های Sauce Labs حذف شدند. از `tunnelName` و `tunnelOwner` استفاده کنید.

## TypeScript

typeهای `Element`، `MultiRemoteBrowser` و `MultiRemoteElement` که توسط `webdriverio` export می‌شدند حذف شدند. از namespace سراسری `WebdriverIO` استفاده کنید.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` اکنون `then` را اعلام می‌کند، و `ChainablePromiseArray` متدهای `then`، `catch` و `finally` را اعلام می‌کند. typeهای زنجیره‌ای مقدار پیش از `await` را توصیف می‌کنند. دیگر با مقدار await‌شده سازگار نیستند:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

مقدار await‌شده را به‌صورت `WebdriverIO.Element` یا `WebdriverIO.ElementArray` تایپ کنید:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

هر دو type زنجیره‌ای اکنون با `T extends PromiseLike<unknown>` تطبیق دارند. یک conditional type که `PromiseLike` را بررسی می‌کند، برای `$()` و `$$()` شاخهٔ متفاوتی نسبت به v9 را انتخاب می‌کند. برای مثال، `Awaited<ChainablePromiseElement>` اکنون `WebdriverIO.Element` است، و `Awaited<ChainablePromiseArray>` برابر `WebdriverIO.ElementArray` است.

type مربوط به propertyهای یک `$$()` که await نشده تغییر کرده است. آن‌ها بلافاصله، پیش از resolve شدن query، در دسترس‌اند، بنابراین آن‌ها را بدون `await` یا `.then()` بخوانید:

| Property | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | والد، نه یک promise (پایین‌تر را ببینید) |
| `foundWith` | ندارد | دستوری که فهرست را پیدا کرده، مثلاً `$$` یا `custom$$` |
| `props` | ندارد | آرگومان‌های اضافی آن دستور |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

در یک query زنجیره‌ای مانند `$('form').$$('input')`، مقدار `parent` تا زمان resolve شدن فهرست، `$('form')` زنجیره‌ای است و پس از آن عنصر resolve‌شده است. پیش از استفاده از `parent` به‌عنوان یک عنصر، فهرست را await کنید.

در زمان اجرا، `filter()`، `filterSeries()` و `slice()` روی یک فهرست `$$()` یک فهرست عنصر برمی‌گردانند، نه یک آرایهٔ ساده. نتیجه `selector`، `foundWith`، `parent` و `props` فهرست منبع را حفظ می‌کند. در v9، `filter()` یک آرایهٔ ساده بدون این propertyها برمی‌گرداند. typeها هنوز این را نشان نمی‌دهند: `filter()` و `filterSeries()` طوری اعلام شده‌اند که `Promise<WebdriverIO.Element[]>` برگردانند، و `slice()` مقدار `WebdriverIO.Element[]` را برمی‌گرداند، بنابراین TypeScript هنگام خواندن این propertyها روی نتیجه خطا گزارش می‌کند.

WebdriverIO query را برای خود فهرست مشتق‌شده دوباره اجرا نمی‌کند: اندیسی فراتر از انتهای آن منتظر تطبیق‌های بیشتر نمی‌ماند و هرگز عنصری را که فیلتر کنار گذاشته برنمی‌گرداند. اعضای آن همچنان عناصر query منبع هستند، با `selector` و `index` اصلی خود. اگر عضوی stale شود، WebdriverIO آن را دوباره از query منبع در همان اندیس دریافت می‌کند که اگر صفحه تغییر کرده باشد ممکن است عنصر دیگری باشد. کدی که query یک فهرست را از propertyهای فهرست دوباره اجرا می‌کند، مثلاً `parent[foundWith](selector, ...props)`، فهرست کامل را می‌گیرد، نه فهرست فیلترشده را.

بسته‌های منتشرشده `typeScriptVersion` را روی 6.0.3 تنظیم می‌کنند، مطابق با نسخهٔ TypeScript که این مخزن با آن کامپایل می‌شود.

`browser.mock()` هم `URLPattern` از `urlpattern-polyfill` و هم `URLPattern` بومی (سراسری در Node.js 24، و تایپ‌شده توسط کتابخانهٔ `dom` در TypeScript 6) را می‌پذیرد.

TypeScript 6 گزینه‌های `"moduleResolution": "node"` و `"baseUrl"` را منسوخ می‌کند و `strict` را پیش‌فرض قرار می‌دهد. `create-wdio` اکنون برای پروژه‌های ESM مقدار `"moduleResolution": "bundler"` و برای پروژه‌های CommonJS مقدار `"NodeNext"` را تولید می‌کند. اگر TypeScript را در یک پروژهٔ موجود به‌روز می‌کنید، این گزینه‌ها را در `tsconfig.json` خود تغییر دهید.

برای یک پروژهٔ ESM:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

برای یک پروژهٔ CommonJS، همانند `create-wdio` برای هر دو گزینه از `NodeNext` استفاده کنید:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 همچنین مقدار پیش‌فرض `types` را به `[]` تغییر می‌دهد، بنابراین دیگر همهٔ بسته‌های نصب‌شدهٔ `@types/*` را بارگذاری نمی‌کند. اگر `tsconfig.json` شما فهرست `types` ندارد، globalهایی مانند `describe` و `it` در Mocha با `Cannot find name` شکست می‌خورند. همانند `create-wdio` بسته‌های type مورد استفادهٔ تست‌هایتان را فهرست کنید. برای مثال، با Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` مقادیر `compilerOptions.target` و `compilerOptions.lib` را `es2024` می‌نویسد. بررسی type آن فایل به TypeScript 5.7 یا جدیدتر نیاز دارد. `tsx` که config و تست‌ها را اجرا می‌کند بررسی type انجام نمی‌دهد، بنابراین یک compiler قدیمی‌تر فقط زمانی اهمیت دارد که خودتان `tsc` را اجرا کنید.

یک `tsconfig.json` موجود بازنویسی نمی‌شود. یک config تولیدشده که config دیگری را extend می‌کند، `target` و `lib` والد را حفظ می‌کند.

در hook مربوط به `afterAssertion`، type مقدار `params.result` اکنون `{ pass, message }` است، همان‌طور که matcherها آن را می‌دهند. در v9، type برابر `{ result, message }` بود، اما `params.result.result` در زمان اجرا همیشه `undefined` بود. `params.result.pass` را بخوانید:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` زمانی `true` است که مقدار با مقدار مورد انتظار تطبیق داشته باشد، حتی با `.not`. بنابراین با `.not`، assertion زمانی موفق است که `pass` برابر `false` باشد. hook نشان نمی‌دهد که آیا تست از `.not` استفاده کرده است یا نه.

## hookهای دستورات

یک دستور عنصر، hookهای `beforeCommand` و `afterCommand` را یک بار، با آرگومان‌های دستور، اجرا می‌کند. در v9، آن‌ها را 2 یا 3 بار اجرا می‌کرد و نخستین فراخوانی `[]` را به‌عنوان `args` دریافت می‌کرد. دستوری که درون دستور دیگری اجرا می‌شود (مثلاً `getElementText` در `getText`) همچنان جفت hook خودش را دارد. hookها برای تابع رویداد `emit` اجرا نمی‌شوند. hookی که دستورات را می‌شمارد یا زمانشان را اندازه می‌گیرد، هر دستور را یک بار می‌بیند.

برای یک دستور عنصر، `beforeCommand` پیش از آنکه WebdriverIO منتظر عنصر بماند اجرا می‌شود، بنابراین عنصر ممکن است در آن لحظه هنوز وجود نداشته باشد. `afterCommand` پس از انتظار و هر تلاش مجدد، با نتیجه یا خطای آخرین تلاش اجرا می‌شود. hookی که به عنصر پیداشده نیاز دارد از `afterCommand` استفاده می‌کند.

دستوری که با `overwriteCommand()` تغییر کرده، و یک query زنجیره‌ای روی یک promise (`$('a').$('b')`)، همچنان ممکن است hookها را بیش از یک بار اجرا کنند.

## Reporterها

رویداد `result` مرورگر به‌صورت `client:afterCommand` به reporterها فرستاده می‌شود. آن payload و type مربوط به `AfterCommandArgs` دیگر property به نام `name` ندارند. به‌جای آن `command` را بخوانید. دستورات سفارشی از قبل `command` را می‌فرستادند.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` در `@wdio/allure-reporter` حذف شد. هیچ اثری نداشت. ردیف‌های محیط را با [`reportedEnvironmentVars`](/docs/allure-reporter) در گزینه‌های Allure reporter تنظیم کنید.

### Cucumber JSON reporter

`wdio-cucumberjs-json-reporter` به‌صورت [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter) به مخزن WebdriverIO منتقل شد. بستهٔ community فقط برای v9 است: `@wdio/reporter` 9 و `@wdio/logger` 9 را نصب می‌کند.

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` همان باقی می‌ماند: WebdriverIO برای این نام `@wdio/cucumberjs-json-reporter` را بارگذاری می‌کند. importهای فایل‌های step خود را جایگزین کنید:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

گزینه‌ها همان هستند. فایل‌های JSON با دقت بیشتری از فرمت Cucumber JSON پیروی می‌کنند. ابزارها و اسکریپت‌هایی را که آن‌ها را می‌خوانند بررسی کنید:

- `id` سناریو `<feature id>;<scenario id>` است، و برای سناریویی در یک `Rule:` برابر `<feature id>;<rule id>;<scenario id>` است، همانند فرمت Cucumber JSON. پیش از این، بخش‌ها جداکننده نداشتند.
- `id` فیچر کاراکترهایی مانند `:` و `/` را حفظ می‌کند (فقط فاصله‌ها به `-` تبدیل می‌شوند)، همانند فرمت Cucumber JSON. نام فایل‌های JSON تغییر نمی‌کند، اما بخش فیچری که بیش از 200 بایت باشد (مثلاً شامل تعداد زیادی کاراکتر غیر ASCII) بریده می‌شود و با یک hash پایان می‌یابد (Linux در نام فایل 255 بایت را مجاز می‌داند)، و یک نام دستگاه Windows مانند `con` با `_` شروع می‌شود.
- `keyword` فیچر و سناریو همان کلیدواژه‌های فایل هستند، مثلاً `Scenario Outline` یا `Fonctionnalité`، همانند فرمت Cucumber JSON. پیش از این، همیشه `Feature` و `Scenario` بودند.
- سناریوها و stepها یک `line` دارند.
- تگ‌ها `{ name, line }` هستند، همانند فرمت Cucumber JSON؛ تگ‌های یک سناریو خط فایل فیچر را می‌گیرند. پیش از این، آن‌ها اشیای داخلی Cucumber با `location`، `id` یا `astNodeId` (تصادفی در هر اجرا) بودند و تگ‌های یک سناریو خط نداشتند.
- hookها stepهایی با `hidden: true` و بدون `name` هستند. پیش از این، یک hook دارای `name` خالی بود.
- یک آرگومان doc string به‌صورت `{ content, line }` است. پیش از این، متن خود doc string بود.
- hookی که Cucumber از آن صرف‌نظر می‌کند (پس از یک hook ناموفق، یا hookی که `'skipped'` برمی‌گرداند) وضعیت `skipped` دارد، و hookی که `'pending'` برمی‌گرداند وضعیت `pending` دارد، همانند فرمت Cucumber JSON. پیش از این، وضعیت آن‌ها `passed` بود.
- وضعیت یک step مبهم `ambiguous` است، همانند فرمت Cucumber JSON، و `error_message` آن step definitionهای تطبیق‌یافته را فهرست می‌کند. پیش از این، `skipped` بدون دلیل، یا با `cucumberOpts.failAmbiguousDefinitions` برابر `failed` بود.
- وضعیت یک step تعریف‌نشده `undefined` است. پیش از این، `failed` بود، یا با `cucumberOpts.ignoreUndefinedDefinitions` برابر `pending` بود.
- سناریویی که Cucumber دوباره اجرا می‌کند (`cucumberOpts.retry`) فقط stepهای آخرین تلاش خود را دارد. پیش از این، stepهای همهٔ تلاش‌ها را داشت.
- با `cucumberOpts.tagsInTitle`، نام‌های فیچر و سناریو، idها و نام فایل‌ها هیچ تگی ندارند.
- وقتی یک worker چندین فایل فیچر اجرا می‌کند (specهای گروه‌بندی‌شده)، reporter برای هر فیچر یک فایل می‌نویسد. پیش از این، همهٔ سناریوها در فایل نخستین فیچر قرار می‌گرفتند.
- در یک نشست multi-remote، metadata از نخستین نمونه می‌آید.

این موارد پیش از این وجود نداشتند یا اشتباه بودند: stepهای `*`، کلیدواژهٔ stepهای `But`، پیوست‌ها از hook مربوط به `before` در WebdriverIO، شیئی که به‌صورت `text/plain` پیوست شده (اکنون متن JSON است، نه `[object Object]`)، و رشتهٔ JSONی که به‌صورت `application/json` پیوست شده (همان‌طور که هست باقی می‌ماند و بار دوم کدگذاری نمی‌شود). کلیدواژه‌های step از سرآیند `# language:` فایل فیچر پیروی می‌کنند، سپس از `cucumberOpts.language` (گزینهٔ `language` در reporter فقط زمانی که `cucumberOpts.language` تنظیم نشده باشد). با `cucumberOpts.scenarioLevelReporter: true`، reporter هیچ فایلی نمی‌نویسد و یک هشدار لاگ می‌کند: این فرمت به stepها نیاز دارد.

### Video reporter

`wdio-video-reporter` به‌صورت [`@wdio/video-reporter`](/docs/video-reporter) به مخزن WebdriverIO منتقل شد. بستهٔ community فقط برای v9 است: `@wdio/reporter` 9 و `@wdio/logger` 9 را نصب می‌کند.

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

بستهٔ community خودش ffmpeg را نصب می‌کرد. `@wdio/video-reporter` این کار را نمی‌کند: [ffmpeg را نصب کنید](/docs/video-reporter#install-ffmpeg) روی هر ماشینی که تست‌ها را اجرا می‌کند، همچنین در CI و در imageهای Docker، یا گزینهٔ `ffmpegPath` یا متغیر محیطی `FFMPEG_PATH` را تنظیم کنید. بدون ffmpeg، reporter یک هشدار لاگ می‌کند و هیچ ویدیویی نمی‌سازد.

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` همان باقی می‌ماند: WebdriverIO برای این نام `@wdio/video-reporter` را بارگذاری می‌کند. importها از `wdio-video-reporter` را با `@wdio/video-reporter` جایگزین کنید. گزینه‌ها همان هستند، با این تغییرات:

- `snapshotCommands` از آخرین بخش endpointهای W3C WebDriver استفاده می‌کند. پیش‌فرض قدیمی نام‌های JSON Wire Protocol مانند `buttonup`، `moveto`، `keys` یا `accept_alert` را نیز فهرست می‌کرد. این نام‌ها هرگز با یک دستور v10 تطبیق پیدا نمی‌کنند. از نام‌های [فهرست پیش‌فرض](/docs/video-reporter#snapshotcommands) استفاده کنید، مثلاً `actions`، `value` یا `accept`.
- در یک نشست WebDriver BiDi، reporter پس از `url`، `back`، `forward`، `refresh` و `actions` نیز یک فریم می‌گیرد.
- در یک نشست WebDriver BiDi، reporter فریم‌ها را با WebDriver BiDi می‌گیرد، و دستور بعدی منتظر فریم دستور قبلی می‌ماند (حدود 50 تا 70 میلی‌ثانیه در Chrome)، تا هر فریم صفحهٔ دستور خودش را نشان دهد. پیش از این، در Chrome، یک screenshot در ابتدای یک navigation در WebDriver BiDi می‌توانست تست را 10 ثانیه منتظر نگه دارد.
- در یک نشست multi-remote، فقط دستورات نخستین نمونه فریم می‌گیرند. پیش از این، دستورات هر نمونه فریمی از نخستین نمونه می‌گرفتند.
- یک دستور `GET` فقط صفحه را می‌خواند، بنابراین هیچ فریمی نمی‌دهد، مگر با `recordAllActions`. پیش از این، `getUrl`، `getSize` یا `getValue` یک فریم می‌دادند، چون آخرین بخش endpoint آن‌ها (`url`، `rect`، `value`) در `snapshotCommands` قرار دارد.
- تاریخ در نام فایل‌های ویدیو روی هر ماشینی `YYYY-MM-DD--HH-MM-SS-mmm` است. پیش از این، از locale ماشین استفاده می‌کرد.
- `videoFormat` مقادیر `webm` (پیش‌فرض) و `mp4` را می‌پذیرد. پیش از این، `videoFormat: 'default'` ویدیوهای mp4 می‌ساخت؛ اکنون یک هشدار لاگ می‌کند و ویدیوهای webm می‌سازد. از `videoFormat: 'mp4'` استفاده کنید.
- با Allure reporter، تستی که ویدیو ندارد دیگر یک پیوست ویدیوی خالی دریافت نمی‌کند.

### HTML reporter

`wdio-html-nice-reporter` به‌صورت [`@wdio/html-reporter`](/docs/html-reporter) به مخزن WebdriverIO منتقل شد. بستهٔ قدیمی فقط برای v9 است.

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

نام reporter برابر `html` است. نام را در `reporters` و importها تغییر دهید:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

گزینه‌ها همان هستند. این موارد را نیز تغییر دهید:

- `ReportEvents` از `@wdio/html-reporter` می‌آید. تست‌هایی که هنوز از `@rpii/wdio-report-events` استفاده می‌کنند کار می‌کنند، چون هر دو همان رویدادها را می‌فرستند.
- اسکریپت خط فرمان `node_modules/@wdio/html-reporter/build/makeReport.js` است. قبلاً `node_modules/wdio-html-nice-reporter/lib/makeReport.js` بود.
- با Cucumber، گزارش سناریوها را می‌شمارد، نه stepها را، و فقط آخرین تلاش یک سناریوی تکرارشده را می‌شمارد.

## `$` سخت‌گیرانه است

`$` اکنون نمایانگر __دقیقاً یک__ عنصر است. اگر selector به بیش از یک عنصر resolve شود، دستور به‌جای استفادهٔ بی‌صدا از نخستین تطبیق، یک `StrictSelectorError` پرتاب می‌کند:

```js
// v9 — روی نخستین دکمه کلیک می‌کند، حتی اگر 12 دکمه وجود داشته باشد
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

این با [locatorهای Playwright](https://playwright.dev/docs/locators#strictness) مطابقت دارد. Cypress متفاوت است: queryهای آن ممکن است به چند عنصر resolve شوند و این دستورات عملیاتی مانند [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هستند که به‌طور پیش‌فرض یک subject چندعنصری را رد می‌کنند. selectorی که بی‌صدا به چند عنصر resolve می‌شود تقریباً همیشه یک باگ پنهان است: امروز موفق می‌شود و به محض اینکه کسی دکمهٔ دومی به صفحه اضافه کند با عنصر اشتباه تعامل می‌کند.

این قاعده بر هر مرحله از یک زنجیره (`$('form').$('input')`) و بر هر نوع selector که `$` می‌پذیرد اعمال می‌شود — selectorهای رشته‌ای (شامل آن‌هایی که از shadow DOM عبور می‌کنند)، توابع JS، selectorهای موبایل و ارجاع‌های custom strategy.

### چه چیزی تغییر نکرد

- `$$` همچنان صفر یا چند عنصر برمی‌گرداند.
- دستورات کمکی اختصاصی `custom$`، `shadow$` و `react$` سخت‌گیرانه نیستند — همچنان نخستین تطبیق خود را برمی‌گردانند، همانند همتایان `$$` آن‌ها.
- selectorی که با هیچ چیز تطبیق ندارد همچنان یک عنصر با resolve تنبل (lazy) برمی‌گرداند، بنابراین `waitForExist` و [انتظار خودکار](/docs/autowait) مانند قبل رفتار می‌کنند.
- ارسال یک ارجاع عنصر، مثلاً `$(await browser.getActiveElement())`، همیشه به یک گرهٔ واحد اشاره می‌کند و هرگز بررسی نمی‌شود.

### چگونه مجموعهٔ تست خود را بازبینی کنید

هیچ codemodی برای این وجود ندارد: فقط شما می‌توانید تشخیص دهید که آیا تطبیق دوم یک باگ است یا عمدی. دو رویکرد عملی:

1. __مجموعهٔ تست خود را اجرا کنید.__ هر تخطی با selector و تعداد تطبیق‌ها خطا پرتاب می‌کند که معمولاً برای رفع آن در همان لحظه کافی است.
2. __selectorهای کلی را از پیش بررسی کنید.__ برای هر `$(...)` عمومی در page objectهای خود، چاپ کنید که واقعاً با چند عنصر تطبیق دارد:

   ```js
   console.log(await $$('button').length) // 12 ← `$('button')` بیش از حد کلی است
   ```

سپس یا selector را محدودتر کنید — ترجیحاً به سمت یک query کاربرمحور مانند `$('button=Submit')` یا `$('aria/Submit')`، [Selectorها](/docs/selectors) را ببینید — یا به‌صراحت بیان کنید که نخستین تطبیق را می‌خواهید:

```js
await $('button[type="submit"]').click()
// ...یا، اگر واقعاً منظورتان همان نخستین مورد است
await $$('button')[0].click()
```

### غیرفعال کردن

برای یک query واحد:

```js
await $('button', { strict: false }).click()
```

برای کل یک پروژه، با بازگرداندن رفتار v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

یک عنصر به خاطر می‌سپارد که چگونه query شده است، بنابراین دریافت مجدد آن — پس از یک ارجاع stale به عنصر، یا از طریق `waitForExist` — سخت‌گیری فراخوانی اصلی را حفظ می‌کند.

:::info

در پشت صحنه، یک `$` سخت‌گیرانه به‌جای `findElement` یک درخواست `findElements` ارسال می‌کند، چون شمردن تطبیق‌ها تنها راه اعمال این قاعده است. در هر دو حالت این یک رفت‌وبرگشت واحد است، اما برای serviceهای سفارشی و mockهای WebDriver که بر اساس دستور `findElement` کار می‌کنند قابل مشاهده است.

:::

## فهرست‌های عنصر پیش از `await`

از v10، `$$()` یک [`ElementArray`](/docs/api/browser/$$) برمی‌گرداند: یک آرایهٔ واقعی که می‌توانید آن را `await` کنید. در v9، یک `$$()` که await نکرده بودید یک promise بود.

| `$$('li')` پیش از `await` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`، `catch`، `finally` | تابع | تابع، تا زمانی که فهرست بارگذاری شود |

تا زمانی که فهرست بارگذاری نشده، `length` یک promise است، و `[...list]`، `Array.from(list)` و `for...of` خطای `Cannot synchronously iterate over an element list that has not resolved yet` را پرتاب می‌کنند.

همین موضوع برای `custom$$`، `shadow$$` و `react$$`، و برای `$$()` روی یک مرورگر multi-remote صادق است. یک `$()` که await نکرده‌اید همچنان یک promise است.

`await` همان فهرست را، بارگذاری‌شده و بدون `then`، می‌دهد. در این صورت `length` یک عدد است و `for...of`، `[...list]` و `Array.from()` کار می‌کنند. پیش از `await`، می‌توانید از `for await`، یک اندیس (`$$('li')[0]`)، `at()`، `slice()` و متدهای پیمایش ناهمگام (`map`، `filter`، `forEach`، ...) استفاده کنید. این متدها یک promise می‌دهند: پیش از خواندن یک اندیس، نتیجهٔ `filter()` را `await` کنید.

اندیسی فراتر از انتهای یک فهرست `$$(selector)`، حتی پس از `await`، برابر `undefined` نیست. عنصری است که منتظر می‌ماند تا فهرست به آن اندیس برسد، همان‌طور که `$$('li')[5]` پیش از `await` عمل می‌کند: `isExisting()` مقدار `false` می‌دهد و دستوری مانند `getText()` خطای `Index out of bounds` پرتاب می‌کند، هر دو پس از `waitforTimeout`. در v9، `(await $$('li'))[5]` برابر `undefined` بود. بنابراین `if (list[5])` همیشه true است و `list.at(5)` هرگز `undefined` نیست. اندیس را با `length` مقایسه کنید که منتظر نمی‌ماند:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

پس از `await`، یک اندیس منفی، و فهرستی از `slice()` یا `filter()`، فراتر از انتها `undefined` می‌دهند. پیش از `await`، `list[i]` با یک اندیس صحیح 0 یا بیشتر، و `at()`، یک promise می‌دهند که همیشه truthy است.

کدی که یک مقدار را فقط زمانی await می‌کند که یک `Promise` باشد، یا `length` را بدون `await` می‌خواند، خطا پرتاب نمی‌کند. بلکه یک promise را به‌عنوان طول می‌خواند: `list.length > 0` و حلقه‌ای مانند `for (let i = 0; i < list.length; i++)` مقدار `false` می‌بینند، اما `if (list.length)` و `list.length !== 0` مقدار `true` می‌بینند. همیشه مقدار را `await` کنید. `await` روی مقداری که از قبل بارگذاری شده همان مقدار را می‌دهد:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## امضاهای قدیمی دستورات

v9 همچنان شکل‌های موقعیتی قدیمی‌تر را می‌پذیرفت و هشدار می‌داد. v10 فقط شیء گزینه‌ها را می‌پذیرد.

[codemod](https://github.com/webdriverio/codemod) نسخهٔ v10، `addCommand` و `overwriteCommand` را وقتی آرگومان سوم یک boolean است، `getHTML(true)` و `getHTML(false)` را، و `getCookies` را وقتی فیلتر یک رشته یا آرایه‌ای تک‌عضوی است بازنویسی می‌کند. فراخوانی `getCookies` با بیش از یک نام بدون تغییر رها می‌شود، چون یک فیلتر با یک نام تطبیق دارد.

ابتدا codemod را نصب کنید. WebdriverIO به آن وابسته نیست.

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

برای فایل‌های TypeScript از `--parser=tsx` استفاده کنید.

### `addCommand` و `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

یک آرگومان سوم boolean یک خطای TypeScript است. در زمان اجرا خطا پرتاب می‌کند:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` و `instances` به همان شیء گزینه‌ها تعلق دارند. برای الحاق یک دستور به مرورگر، آرگومان سوم را حذف کنید.

### `getCookies`

فیلترهای رشته‌ای و آرایهٔ رشته‌ای رد می‌شوند. یک [شیء cookie filter](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) ارسال کنید. هر فراخوانی یک نام را فیلتر می‌کند؛ برای نام دیگر دوباره آن را فراخوانی کنید.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` بدون آرگومان همچنان همهٔ cookieهای قابل مشاهده برای صفحه را برمی‌گرداند.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` بدون آرگومان همچنان تگ خود عنصر را شامل می‌شود.

### `newWindow`

`windowName` و `windowFeatures` حذف شده‌اند. آن‌ها فقط برای WebDriver Classic اعمال می‌شدند. دستور همچنان `type` را می‌پذیرد:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

برای باز کردن یک tab از `type: 'tab'` استفاده کنید.

در یک نشست WebDriver BiDi، `newWindow()` [browsing context](/docs/api/browsingContext) جدید را برمی‌گرداند و به آن سوئیچ نمی‌کند. در v9 سوئیچ می‌کرد. بنابراین `browser.closeWindow()` پس از `newWindow()` اکنون tab نخست را می‌بندد، نه tab جدید را. دستورات مربوط به tab جدید را روی contextی که `newWindow()` برمی‌گرداند اجرا کنید و آن را با `closeWindow()` روی همان context ببندید:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

در TypeScript، type نتیجه `WebdriverIO.BrowsingContext | { handle, type }` است، چون یک نشست WebDriver Classic شناسهٔ (handle) پنجره را برمی‌گرداند. در یک نشست BiDi، آن را محدود کنید: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`.

مرورگر روی tab نخست باقی می‌ماند. فراخوانی `switchWindow()` را که به آن بازمی‌گشت حذف کنید: `switchWindow` در یک نشست BiDi خطا پرتاب می‌کند. برای مدل browsing context، [`switchToFrame`](#switchtoframe) را ببینید.

### `startActivity`

فقط شیء گزینه‌ها پذیرفته می‌شود. `appWaitPackage`، `appWaitActivity` و `optionalIntentArguments` حذف شده‌اند. آن‌ها فقط برای endpoint حذف‌شدهٔ HTTP در Appium اعمال می‌شدند. `mobile: startActivity` آن‌ها را نمی‌پذیرد و ارسال آن‌ها خطا پرتاب می‌کند.

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## دستورات حذف‌شده

`browser.throttle` و دستورات منسوخ `touchAction` حذف شده‌اند.

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions API](/docs/api/browser/action) با یک pointer لمسی، یا دستورات موبایل [`tap`](/docs/api/mobile/tap) و [`swipe`](/docs/api/mobile/swipe) |

یک حرکت لمسی با Actions API:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` حذف شده است. این دستور یک فایل محلی را zip می‌کرد و آن را به endpoint مربوط به `file` در Selenium ارسال می‌کرد که بخشی از WebDriver یا WebDriver BiDi نیست. یک file input را با [`element.setFiles()`](/docs/api/element/setFiles) تنظیم کنید.

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` به یک نشست BiDi نیاز دارد. مسیرها توسط مرورگر باز می‌شوند. یک مسیر نسبی نسبت به `process.cwd()` resolve می‌شود. آماده‌سازی فایل در Selenium Grid بخشی از v10 نیست. مجموعهٔ تستی که برای ارسال بایت‌ها به یک node به `uploadFile` وابسته بود، باید فایل را جایی قرار دهد که مرورگر بتواند آن را بخواند، سپس `setFiles` را فراخوانی کند.

در یک نشست محلی classic، `element.setValue('/local/path')` همچنان مسیری را تایپ می‌کند که مرورگر محلی از قبل می‌تواند ببیند. endpoint خام Selenium همچنان به‌صورت `browser.file()` برای کاربران Grid که مستقیماً آن را فراخوانی می‌کنند باقی می‌ماند.

## `executeAsync`

`browser.executeAsync` و `element.executeAsync` حذف شده‌اند. یک تابع `async` به [`execute`](/docs/api/browser/execute) بدهید. مقدار بازگشتی تابع، شامل یک promise بازگشتی، نتیجهٔ دستور است. timeout مربوط به `script` همچنان اعمال می‌شود، حتی در یک نشست WebDriver BiDi: اسکریپتی که بیشتر اجرا شود با خطای `script timeout` شکست می‌خورد. برای timeout مربوط به `script` طولانی‌تر از [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (به‌طور پیش‌فرض 180 ثانیه)، هر دو را افزایش دهید.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

callback مربوط به `done` در WebDriver را کنار بگذارید. یک اسکریپت رشته‌ای که انتظار داشت آن callback آخرین آرگومانش باشد، باید به‌جای آن یک promise برگرداند. در زمان اجرا، `executeAsync` یک تابع نیست.

## `switchToFrame`

`browser.switchToFrame` دیگر یک دستور عمومی نیست.

در یک نشست WebDriver BiDi، `switchFrame` و `switchWindow` خطا پرتاب می‌کنند. یک tab، یک پنجره و یک frame، هر کدام یک `WebdriverIO.BrowsingContext` هستند که در اختیار دارید. `browser.url()` به context سطح بالای اولیهٔ نشست navigate می‌کند و آن را برمی‌گرداند. `browser.newWindow()` context جدید را برمی‌گرداند و به آن سوئیچ نمی‌کند. `context.frame()` یک frame فرزند برمی‌گرداند. `context.parent` همان frameی است که آن را از آن باز کرده‌اید.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` رشتهٔ URL سند است. یک context در اختیار را با `context.navigate(url)` navigate کنید. metadata بارگذاری از `browser.url()` در `context.request` قرار دارد.

در یک نشست Classic، همچنان `switchFrame` را با یک عنصر، یا `null` برای frame بالایی، فراخوانی کنید. یک رشته یا یک تابع در آنجا رد می‌شود.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

کلید `page load` از JSON Wire Protocol رد می‌شود. از `pageLoad` استفاده کنید.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` و `script` تغییری نکرده‌اند.

## دسترسی به نمونه‌های Multi-remote

یک مرورگر multi-remote دیگر هر نشست را به‌عنوان property جداگانهٔ خود ذخیره نمی‌کند. همین موضوع برای یک عنصر multi-remote نیز صادق است. `getInstance` و `select` روش‌های دسترسی به یک نشست هستند.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

یک augmentation در TypeScript که `myChromeBrowser: WebdriverIO.Browser` را به `WebdriverIO.MultiRemoteBrowser` اضافه می‌کند، دیگر با یک property زمان اجرا تطبیق ندارد. آن augmentation را حذف کنید و `getInstance` را فراخوانی کنید.

با testrunner و `injectGlobals` فعال، نام نمونه همچنان یک global است (`myChromeBrowser.url(...)`). آن global همان نشست واحد است. `browser.myChromeBrowser` نیست.

نتایج دستورات به ترتیب capabilityها باقی می‌مانند: نخستین مدخل به نخستین کلید در شیء capabilities تعلق دارد.

`browser.$$()` روی یک مرورگر multi-remote یک `WebdriverIO.MultiRemoteElementArray` برمی‌گرداند، نه یک `MultiRemoteElement[]` ساده. همچنان یک آرایه است، بنابراین خواندن اندیسی مانند `elements[0]` همچنان کار می‌کند.

متدهای `map`، `filter`، `forEach`، `find`، `findIndex`، `some`، `every` و `reduce` آن، همانند `WebdriverIO.ElementArray`، ناهمگام هستند و حتی پس از `await` یک promise برمی‌گردانند. همین موضوع برای فهرست‌هایی که `custom$$()`، `react$$()` و `shadow$$()` برمی‌گردانند صادق است. در v9 این‌ها متدهای همگام یک آرایهٔ ساده بودند:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`، `react$()` و، روی یک عنصر، `shadow$()`، `nextElement()`، `previousElement()` و `parentElement()` همانند `$()` یک `WebdriverIO.MultiRemoteElement` برمی‌گردانند. در v9 آن‌ها برای هر نمونه یک عنصر در یک آرایهٔ ساده برمی‌گرداندند. عنصر یک مرورگر را با `getInstance` بخوانید:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`، `react$$()` و، روی یک عنصر، `shadow$$()` همانند `$$()` یک `WebdriverIO.MultiRemoteElementArray` برمی‌گردانند. در v9 آن‌ها برای هر نمونه یک فهرست در یک آرایهٔ ساده برمی‌گرداندند. هر مدخل به همهٔ نمونه‌ها اشاره می‌کند. نمونه‌ای که عناصر کمتری پیدا کند در آن اندیس عنصری ندارد:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` همانند `WebdriverIO.Element['selector']` دارای type مربوط به `Selector` است. در v9 دارای type مربوط به `string` بود، اما مقدار می‌توانست یک تابع یا یک ارجاع custom strategy نیز باشد. کد TypeScript که از آن به‌عنوان رشته استفاده می‌کند، مثلاً `element.selector.includes('…')`، باید ابتدا type را بررسی کند.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` و `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` حذف شده‌اند. `select()` همیشه در دسترس است و `$$()` همیشه آرایهٔ عنصر بالا را برمی‌گرداند. هر دو متغیر را حذف کنید.

## پاسخ‌های باینری mock

`mock.respond()` و `mock.respondOnce()` payloadهای `Uint8Array` و `ArrayBuffer` را می‌پذیرند، شامل یک `Buffer` پلی‌فیل‌شده در تست‌های کامپوننت بدون `Buffer` سراسری.

`mock.getBinaryResponse()` اکنون به‌صورت `Uint8Array | null` تایپ شده است. همچنان در Node.js یک `Buffer` برمی‌گرداند، اما در مرورگر یک `Uint8Array` برمی‌گرداند. برای استفاده از متدهای مختص Buffer در Node.js، ابتدا نتیجهٔ غیر null را تبدیل کنید:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## mockهای شبکه در Multi-remote

`browser.mock()` روی یک مرورگر multi-remote یک `WebdriverIO.MultiRemoteMock` برمی‌گرداند، نه آرایه‌ای از mockها. `respond`، `restore` و سایر متدهای mock روی همهٔ نمونه‌ها اجرا می‌شوند. درخواست‌های ضبط‌شده را از mock مربوط به یک مرورگر بخوانید. از type مربوط به `WebdriverIO.MultiRemoteMock` از namespace سراسری `WebdriverIO` استفاده کنید.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

`getInstance` وقتی نام یکی از `instances` نباشد خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند. mockی از `browser.select('myFirefoxBrowser', 'myChromeBrowser')` آن نمونه‌ها را به همان ترتیب فهرست می‌کند که ممکن است با `browser.instances` متفاوت باشد. فرض نکنید `mocks[0]` مرورگر خاصی است.

## پاسخ‌های mock که از backend صرف‌نظر می‌کنند

`mock.respond(..., { fetchResponse: false })` backend را فراخوانی نمی‌کند. در v9، mockی که روی `statusCode` یا `responseHeaders` نیز فیلتر می‌کرد، آن فیلتر را نادیده می‌گرفت و همچنان به همهٔ درخواست‌های تطبیق‌یافته پاسخ می‌داد. در v10، `respond()` و `respondOnce()` خطا پرتاب می‌کنند، چون آن فیلترها فقط از روی پاسخ backend قابل تعیین هستند.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

برای حفظ فیلتر، `fetchResponse` را حذف کنید تا mock پاسخ را دریافت کند، وضعیت یا headerها را بررسی کند و سپس body را جایگزین کند.

## ارجاع‌های عنصر

شناسه‌های عنصر از کلید W3C WebDriver یعنی `element-6066-11e4-a52e-4f735466cecf` و property مربوط به `elementId` استفاده می‌کنند. فیلد `ELEMENT` از JSON Wire Protocol دیگر بخشی از قرارداد عنصر نیست.

`WebdriverIO.Element` دیگر `ELEMENT` را اعلام نمی‌کند. `element.elementId` را بخوانید که نمونه‌های عنصر از قبل ارائه می‌کنند.

`browser.execute` و اسکریپت‌های داخلی که یک عنصر را به صفحه می‌فرستند (`getHTML`، `isClickable`، `isDisplayed`، `scrollIntoView` و بقیه)، فقط ارجاع W3C را ارسال می‌کنند:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

body یافتن عنصری که فقط شامل `{ ELEMENT: '...' }` باشد یک عنصر نیست. کلید W3C را شامل کنید. اگر هر دو کلید وجود داشته باشند، WebdriverIO از شناسهٔ W3C استفاده می‌کند.

Jasmine نتیجهٔ یک `$()` زنجیره‌ای را از طریق `toJSON` چاپ می‌کند. آن مقدار همان ارجاع W3C است، یعنی `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

با WebDriver BiDi، اسکریپتی که یک `NodeList` (مثلاً از `querySelectorAll`) یا یک `HTMLCollection` (مثلاً `element.children`) برمی‌گرداند، اکنون همانند WebDriver Classic فهرستی از ارجاع‌های عنصر می‌دهد. در v9 مقادیر خام BiDi را می‌داد، بنابراین `browser.execute` اشیایی برمی‌گرداند که عنصر نبودند، و یک strategy مربوط به `custom$` یا `custom$$` که `querySelectorAll(...)` را برمی‌گرداند هیچ عنصری پیدا نمی‌کرد. یک راه‌حل موقت مانند `Array.from(document.querySelectorAll(...))` همچنان کار می‌کند و می‌توانید آن را حذف کنید:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## selectorهای React

`react$` و `react$$` اکنون با React 16 تا 19 کار می‌کنند، برای برنامه‌ای که با `createRoot` یا با `ReactDOM.render` شروع می‌شود. پیش از این، `browser.react$` و `browser.react$$` با React 18 و بالاتر شکست می‌خوردند (`Could not find the root element of your application`)، و در همهٔ نسخه‌ها یک نتیجه ممکن بود از render پیش از آخرین به‌روزرسانی بیاید، بنابراین کامپوننتی که با تغییر state اضافه شده بود پیدا نمی‌شد.

در صفحه‌ای که React هنوز root را render نکرده، دستورات اکنون تا 5 ثانیه برای آن منتظر می‌مانند و سپس شکست می‌خورند. پیش از این، بلافاصله شکست می‌خوردند، بنابراین برنامه‌ای که دیر شروع می‌شد پیدا نمی‌شد.

دستورات دیگر از کتابخانهٔ [resq](https://github.com/baruchvlz/resq) استفاده نمی‌کنند و WebdriverIO دیگر آن را نصب نمی‌کند. قواعد selector تغییر نمی‌کنند ([React Selectors](/docs/selectors#react-selectors) را ببینید)، به‌جز این استثناها:

- `react$` با هر دوی `props` و `state` کامپوننتی را پیدا می‌کند که با هر دو تطبیق داشته باشد. پیش از این، وقتی `state` نیز داده می‌شد `props` را نادیده می‌گرفت.
- `react$$` هر گرهٔ DOM را یک بار می‌دهد. پیش از این، یک higher-order component و فرزندش در برخی مرورگرها همان عنصر را دو بار می‌دادند.
- fragmentی که شامل یک fragment دیگر است یک فهرست مسطح از گره‌ها می‌دهد. پیش از این، `react$` ممکن بود یک فهرست برگرداند.
- فیلتری با مقدار `null` کار می‌کند. پیش از این، با `Cannot convert undefined or null to object` شکست می‌خورد.
- بدون محدودهٔ عنصر، دستورات همهٔ rootهای React صفحه را به ترتیب سند جستجو می‌کنند، شامل rootهای درون rootهای دیگر و rootهای درون shadow rootهای باز. `react$` نخستین تطبیق را می‌دهد. پیش از این، فقط نخستین root را جستجو می‌کردند، حتی اگر React هنوز آن را render نکرده یا unmount کرده بود، و shadow rootها را جستجو نمی‌کردند. در صفحه‌ای با بیش از یک root، `react$$` اکنون ممکن است عناصر بیشتری بدهد: برای جستجو فقط در یک root، دستور را روی container آن فراخوانی کنید، مثلاً `$('#root').react$$('MyComponent')`.
- روی container یک root درون root دیگر، دستورات root داخلی را جستجو می‌کنند. پیش از این، root بیرونی را جستجو می‌کردند.
- روی browsing context یک frame، و روی عنصری از یک frame، دستورات کار می‌کنند. پیش از این، دستور context با `this.executeScript is not a function` شکست می‌خورد، و دستور عنصر با `Could not find instance of React in given element` شکست می‌خورد.

اسکریپت داخلی `webdriverio/scripts/resq` حذف شده است.

## تست کامپوننت

`@wdio/browser-runner` توابع `fn`، `spyOn` و typeهای mock را از `@vitest/spy` 5 (قبلاً 3) دوباره export می‌کند. mockی که کد شما با `new` فراخوانی می‌کند به یک پیاده‌سازی `function` یا `class` نیاز دارد. یک arrow function خطای `is not a constructor` پرتاب می‌کند، و `mockReturnValue` وقتی mock با `new` فراخوانی شود خطا پرتاب می‌کند.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

برای سایر تغییرات spy، [راهنمای مهاجرت Vitest](https://vitest.dev/guide/migration) را ببینید.

## Puppeteer

`webdriverio` بازهٔ `>=24 <26` از `puppeteer-core` را می‌پذیرد، شامل Puppeteer 25. `getPuppeteer()` و `@wdio/lighthouse-service` با این خط تست شده‌اند.

## ESLint

`eslint-plugin-wdio` به ESLint 10 نیاز دارد. ESLint 9 در تاریخ 2026-08-06 به [پایان عمر](https://eslint.org/version-support/) رسید و دیگر پشتیبانی نمی‌شود. با TypeScript، از `typescript-eslint` نسخهٔ 8.56.0 یا جدیدتر استفاده کنید.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` فقط flat config یعنی `flat/recommended` را export می‌کند. نام eslintrc یعنی `plugin:wdio/recommended` حذف شده است.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

config توصیه‌شده وقتی بستهٔ `typescript-eslint` نصب باشد، به‌جای `wdio/await-expect` به قاعدهٔ type-aware یعنی `wdio/no-floating-promise` تغییر می‌کند. نصب فقط `@typescript-eslint/eslint-plugin` کافی نیست.

```sh
npm install --save-dev typescript typescript-eslint
```

در این حالت، config هر فایلی را که تطبیق دهد با TypeScript project service تجزیه می‌کند. آن را به فایل‌های TypeScript محدود کنید و مطمئن شوید که بخشی از یک `tsconfig.json` هستند:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

یک فایل JavaScript تطبیق‌یافته که در پروژهٔ TypeScript نیست، مانند `wdio.conf.js`، با "was not found by the project service" شکست می‌خورد. برای lint کردن فایل‌های JavaScript نیز، `"allowJs": true` را تنظیم کنید، آن‌ها را به `include` در `tsconfig.json` اضافه کنید و الگو را به `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` گسترش دهید.

## frameworkهای سفارشی

`setupExpect` روی یک adapter مربوط به framework سفارشی دیگر یک `Map` از matcherها را نمی‌پذیرد، و runner دیگر یک متد `entries` به شیء matcherها اضافه نمی‌کند. با `Object.entries(wdioMatchers)` پیمایش کنید.

## پروفایل Firefox

`@wdio/firefox-profile-service` دیگر `legacy` را به‌عنوان گزینهٔ service در نظر نمی‌گیرد. آن پرچم فقط برای Firefox 55 و قدیمی‌تر اعمال می‌شد. آن را حذف کنید. یک `legacy: true` باقی‌مانده به‌عنوان preference با نام `legacy` در پروفایل نوشته می‌شود.

## پروتکل WebDriver

هر نشست یک نشست [W3C WebDriver](https://w3c.github.io/webdriver/) است. WebdriverIO با JSON Wire Protocol یا Mobile JSON Wire Protocol صحبت نمی‌کند. v9 آن دستورات را حذف کرد. v10 همچنین قالب پاسخی (envelope) را که آن پروتکل‌ها استفاده می‌کردند کنار می‌گذارد، بنابراین سروری که هنوز آن را برمی‌گرداند نمی‌تواند نشستی را شروع کند.

`browser.isW3C` حذف شده است، شامل مقداری که قبلاً در پیام `sessionStarted` مربوط به worker فرستاده می‌شد. ارسال `isW3C` به `attach` نادیده گرفته می‌شود. مجموعه دستورات BiDi روی client باقی می‌ماند. یک اتصال زندهٔ BiDi همچنان به `webSocketUrl` وابسته است.

### `browser.back()` و `browser.forward()` روی BiDi

محل‌های فراخوانی همان `await browser.back()` و `await browser.forward()` باقی می‌مانند. هیچ‌کدام از این دستورات آرگومانی نمی‌گیرند یا مقداری برنمی‌گردانند.

در یک نشست BiDi این دستورات `browsingContext.traverseHistory` را با `delta` برابر `-1` یا `1` روی browsing context سطح بالا فراخوانی می‌کنند، سپس منتظر آمادگی سندی می‌مانند که `pageLoadStrategy` به آن نگاشت می‌شود. `none` وقتی دستور پیمایش پذیرفته شود بازمی‌گردد. `eager` منتظر `browsingContext.domContentLoaded` می‌ماند. `normal`، که پیش‌فرض است، منتظر `browsingContext.load` می‌ماند. بازیابی از back-forward cache آن رویدادها را منتشر نمی‌کند؛ دستور زمانی بازمی‌گردد که `readyState` سند commit‌شده از قبل با strategy تطبیق داشته باشد. انتظار از timeout بارگذاری صفحهٔ نشست استفاده می‌کند (`timeouts.pageLoad`، در صورت عدم تنظیم 300000 میلی‌ثانیه). نشست‌های Classic همچنان به `POST /session/:sessionId/back` و `POST /session/:sessionId/forward` ارسال می‌کنند.

یک مدخل تاریخچهٔ غایب همچنان رد می‌شود. در BiDi پیام از `browsingContext.traverseHistory` می‌آید و شامل `no such history entry` است، نه متن خطای WebDriver کلاسیک. پیمایشی که هرگز به آمادگی مورد انتظار نرسد با `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` یا `browsingContext.load` رد می‌شود.

### پاسخ نشست جدید

Create Session باید body مطابق W3C را برگرداند. WebdriverIO مقادیر `value.sessionId` و `value.capabilities` را می‌خواند:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

body مطابق JSON Wire Protocol رد می‌شود. آن body مقادیر `sessionId` و `status` را کنار `value` قرار می‌دهد و capabilityها را در خود `value` قرار می‌دهد:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

در این صورت ایجاد نشست خطای `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` را پرتاب می‌کند. همین خطا وقتی `value.capabilities` غایب باشد نیز رخ می‌دهد، حتی اگر `value.sessionId` موجود باشد.

یک شیء capability مسطح در config شما همچنان معتبر است. WebdriverIO پیش از ارسال درخواست، `{ browserName: 'chrome' }` را درون `alwaysMatch` قرار می‌دهد. کلیدهای دارای پیشوند vendor که با کلیدهای خارج از مجموعهٔ capability در W3C ترکیب شده‌اند همچنان رد می‌شوند. تنظیمات vendor را در `sauce:options`، `bstack:options`، `appium:options` یا کلید پیشونددار دیگری قرار دهید.

### پاسخ‌های دستورات

نتیجهٔ یک دستور `{ "value": … }` است. HTTP 200 بدون `error` در `value` به معنای موفقیت است. یک عنصر غایب HTTP 404 با `value.error` برابر `"no such element"` است که همچنان امکان جستجوی تنبل عنصر را فراهم می‌کند. یک `status` عددی در body نادیده گرفته می‌شود، شامل `status: 0` و کد قدیمی `status: 7` ("no such element"). به‌جای آن شیء خطای W3C را ارسال کنید.

type خطای export‌شدهٔ `JSONWPCommandError` اکنون `SessionRequestError` است.

### سرورها

درایورهایی که WebdriverIO روی آن‌ها اجرا می‌شود از قبل روی اتصال client با W3C صحبت می‌کنند:

- ChromeDriver از Chrome 75 به‌طور پیش‌فرض W3C بوده است. Edge مبتنی بر Chromium با آن مطابقت دارد. ChromeDriver فعلی همچنان `goog:chromeOptions.w3c: false` را می‌پذیرد که آن نشست خاص را به پروتکل قدیمی برمی‌گرداند. WebdriverIO از آن سوئیچ پشتیبانی نمی‌کند.
- geckodriver و safaridriver اپل فقط W3C هستند. پاسخی از Safari که `platformName` یا `browserVersion` را ندارد همچنان W3C است.
- Selenium 4 و Grid 4 با W3C صحبت می‌کنند. Grid از نسخهٔ 4.9 ترجمهٔ JSON Wire Protocol را متوقف کرد.
- Appium 2 پروتکل‌های JSON Wire Protocol و Mobile JSON Wire Protocol را کنار گذاشت. Appium 3 شکل‌های پارامتر باقی‌مانده را نیز کنار گذاشت. v10 به Appium 3 نیاز دارد که در ادامه پوشش داده شده است. یک نشست موبایل که `setWindowRect` را ندارد همچنان W3C است؛ آن capability به این معناست که دستگاه نمی‌تواند اندازهٔ پنجره را تغییر دهد.

این سرورها همچنان با JSON Wire Protocol صحبت می‌کنند و پشتیبانی نمی‌شوند: Selenium 3، PhantomJS، EdgeHTML (`--jwp`)، و WinAppDriver وقتی مستقیماً به آن متصل شوید. درایور Windows در Appium به‌عنوان یک client مطابق W3C پشتیبانی می‌شود. این درایور دستورات را برای WinAppDriver ترجمه می‌کند، از جمله Get Element Property به endpoint مربوط به attribute. WebdriverIO را به Appium متصل کنید، نه به پورت WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) باعث نمی‌شود آن سرورها با v10 کار کنند. راه‌اندازی نشست همچنان به body مطابق W3C در بالا نیاز دارد و نتایج دستورات همچنان یک `status` عددی را نادیده می‌گیرند. اگر آن سرور همچنان مورد نیاز است، روی WebdriverIO 9 بمانید.

`webdriver.remote.sessionid` دیگر نشانگر یک نشست Selenium standalone نیست. Selenium Grid 4 همچنان از روی `se:cdp` تشخیص داده می‌شود.

کلید timeout مربوط به `page load` در [`setTimeout`](#settimeout) پوشش داده شده است. شناسه‌های عنصر در [ارجاع‌های عنصر](#element-references) پوشش داده شده‌اند. در دسکتاپ، `[name="..."]` یک selector از نوع CSS است. strategy مکان‌یابی `name` برای نشست‌های موبایل باقی می‌ماند.

## Appium

WebdriverIO 10 به **Appium 3** و درایورهای رسمی فعلی (UiAutomator2، XCUITest، Espresso، Windows، Mac2 و غیره) نیاز دارد. Appium 1.x و 2.x پشتیبانی نمی‌شوند. اگر نمی‌توانید سرور را ارتقا دهید روی WebdriverIO 9 بمانید.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` یک peer اختیاری `appium` با نسخهٔ `>=3` اعلام می‌کند و از راه‌اندازی سرور قدیمی‌تر خودداری می‌کند. `create-wdio` وقتی Appium وجود ندارد یا قدیمی‌تر از 3 است، `appium@^3` را نصب می‌کند.

ارائه‌دهندگان ابری که هنوز Appium 2 ارائه می‌کنند به یک image با Appium 3 نیاز دارند، یا باید روی WebdriverIO 9 بمانید.

### دستورات موبایل دیگر به HTTP بازنمی‌گردند

در v9، بسیاری از helperهای موبایل `browser.execute('mobile: …')` را امتحان می‌کردند و در صورت خطای متد ناشناخته، به یک endpoint حذف‌شدهٔ HTTP در Appium بازمی‌گشتند. در v10 این بازگشت حذف شده است: همان خطا به شما می‌گوید که به Appium 3 ارتقا دهید. دستورات موبایل WebdriverIO (`browser.lock()`، `browser.shake()`، …) یا مستقیماً `browser.execute('mobile: …')` را ترجیح دهید.

### دستورات پروتکل حذف‌شده

Appium 3 [بسیاری از endpointهای منسوخ base-driver را حذف کرد](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO دیگر متدهای client را برای بیشتر آن مسیرها ارائه نمی‌کند (برای مثال `appiumLock`، `touchPerform` و نگاشت Mobile JSON Wire Protocol). به‌جای آن از W3C Actions، دستور موبایل متناظر، یا یک متد execute با پیشوند `mobile:` در درایور استفاده کنید.

### محدودهٔ `--allow-insecure` در Appium

Appium 3 برای قابلیت‌های `--allow-insecure` به یک پیشوند محدودهٔ درایور یا `*` نیاز دارد، برای مثال `uiautomator2:adb_shell` یا `*:adb_shell`.

### capabilityهای Appium بدون پیشوند دیگر یک نشست Appium را انتخاب نمی‌کنند

`automationName`، `deviceName` و `appiumVersion` بدون پیشوند `appium:` دیگر به WebdriverIO نمی‌گویند که از درایور مرورگر صرف‌نظر کند و service مربوط به Appium را متصل کند. از capability پیشونددار استفاده کنید، یا آن را زیر `appium:options` قرار دهید:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` اکنون آن کلیدهای پیشونددار را تولید می‌کند، شامل `appium:app`، `appium:platformVersion` و `appium:udid`.

### `getValue` در موبایل property عنصر را می‌خواند

`element.getValue()` در همهٔ نشست‌ها، شامل Appium 3، Get Element Property را فراخوانی می‌کند. در یک نشست موبایل، قبلاً Get Element Attribute را فراخوانی می‌کرد.

### هم‌راستا شدن امضای `stopRecordingScreen` با `startRecordingScreen`

`driver.stopRecordingScreen` اکنون به‌جای 4 آرگومان قبلی، فقط یک آرگومان `options` می‌پذیرد که با `driver.startRecordingScreen` هم‌راستاست. آرگومان‌های جداگانه را درون یک شیء قرار دهید:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## نام‌گذاری Multi-remote

APIهایی که به‌صورت `multiremote` یا `Multiremote` نوشته می‌شدند اکنون به‌صورت camelCase / PascalCase یعنی `multiRemote` / `MultiRemote` هستند. نام‌های قدیمی نام مستعار ندارند.

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| `isMultiremote` روی مرورگر، و نتایج `$` و `$$` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporterها) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`، `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`، `isParallelMultiRemote` |
| `isMultiremote` در `Workers.WorkerMessage`، `WorkerInstance` (`@wdio/local-runner`) و `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

`multiremote` و `Multiremote` را (با حساسیت به حروف بزرگ و کوچک) جستجو کنید و همهٔ تطبیق‌ها را جایگزین کنید. گزارش‌های Allure نیز تست‌های multi-remote را به‌جای `isMultiremote` با `isMultiRemote` برچسب‌گذاری می‌کنند.

## نمایشگرهای مجازی در Linux

`@wdio/xvfb` با `@wdio/display-server` جایگزین شده است. testrunner به‌جای قرار دادن هر worker در `xvfb-run`، یک display server برای کل اجرا، پیش از hook مربوط به `onPrepare` هر service، راه‌اندازی می‌کند. Weston را در حالت headless ترجیح می‌دهد و در غیر این صورت به Xvfb بازمی‌گردد. برای جزئیات [Headless و Display Serverها](/docs/headless-and-display-servers) را ببینید.

نام گزینه‌ها تغییر کرده است. نام‌های قدیمی در v10 همچنان کار می‌کنند اما یک هشدار منسوخ‌شدن لاگ می‌کنند و در v11 حذف خواهند شد. اگر هر دو نام را تنظیم کنید، نام جدید اولویت دارد:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` و `xvfbRetryDelay` هیچ اثری ندارند و آن‌ها نیز در v11 حذف خواهند شد. راه‌اندازی دیگر تکرار نمی‌شود: اگر Weston راه‌اندازی نشود، testrunner مقدار Xvfb را امتحان می‌کند، و اگر هیچ‌کدام راه‌اندازی نشوند، اجرا بدون نمایشگر ادامه می‌یابد.

configی که یکی از چهار گزینهٔ تغییرنام‌یافته را بدون جایگزینش تنظیم کند و `displayServer` را تنظیم نکند، همانند v9 همچنان از Xvfb استفاده می‌کند. مگر اینکه display server را غیرفعال کند، همچنین `Preferring Xvfb, as v9 did, because the config sets v9 display keys` را لاگ می‌کند. پس از تغییر نام گزینه‌ها، برای حفظ Xvfb مقدار `displayServer: 'xvfb'` را اضافه کنید، یا برای ترجیح Weston آن را حذف کنید. در حالت خودکار، یک دستور نصب سفارشی ابتدا برای Weston اجرا می‌شود، و دوباره برای Xvfb فقط اگر Weston همچنان در دسترس نباشد یا راه‌اندازی نشود و Xvfb همچنان غایب باشد، بنابراین `displayServer` را روی سروری تنظیم کنید که آن دستور نصب می‌کند تا از تلاش برای سرور دیگر صرف‌نظر شود.

نصب خودکار دیگر از `yum` پشتیبانی نمی‌کند که v9 روی میزبان‌های بدون `dnf` از آن استفاده می‌کرد. v10 فقط `apt-get`، `dnf`، `zypper`، `pacman`، `apk` و `xbps-install` را تشخیص می‌دهد، بنابراین روی میزبانی که فقط `yum` دارد Xvfb را خودتان نصب کنید.

یک آرایهٔ `xvfbAutoInstallCommand` در v9 از طریق یک shell اجرا می‌شد، بنابراین اجزایی مانند `&&` یا `VAR=value` کار می‌کردند. آرایه‌ها اکنون با هر دو نام گزینه بدون shell اجرا می‌شوند، بنابراین برای نحو shell از یک رشته استفاده کنید.

تغییرات دیگری که ممکن است متوجه شوید:

- همهٔ workerها یک نمایشگر مشترک دارند. در v9، هر worker نمایشگر خودش را داشت. صفحات Chrome و Edge اکنون ممکن است focus نداشته باشند، [focus پنجره](/docs/headless-and-display-servers#window-focus) را ببینید.
- شمارهٔ نمایشگر Xvfb ثابت نیست. به‌جای فرض `:99`، آن را از `DISPLAY` بخوانید.
- میزبانی که فقط `WAYLAND_DISPLAY` در آن تنظیم شده اکنون دارای نمایشگر محسوب می‌شود. v9 در آنجا workerها را تحت Xvfb اجرا می‌کرد، چون `DISPLAY` تنظیم نشده بود. v10 هیچ چیزی راه‌اندازی نمی‌کند، پنجره‌های مرورگر را روی compositor شما باز می‌کند و برای اجرا `XDG_SESSION_TYPE`، `GDK_BACKEND` و `ELECTRON_OZONE_PLATFORM_HINT` را روی `wayland` تنظیم می‌کند. برای اجرای آن‌ها تحت Xvfb مانند قبل، `WAYLAND_DISPLAY` را unset کنید و `displayServer: 'xvfb'` را تنظیم کنید.
- صفحهٔ پیش‌فرض 1920x1080 است. v9 از پیش‌فرض `xvfb-run` استفاده می‌کرد که در Debian و Ubuntu برابر 1280x1024 و در Fedora، RHEL و Arch برابر 640x480 است. برای حفظ اندازه‌ای که baselineهای شما استفاده می‌کنند، `displayServerWidth` و `displayServerHeight` را روی آن تنظیم کنید.
- مرورگرها Wayland یا X11 را از روی `XDG_SESSION_TYPE` که display server تنظیم می‌کند انتخاب می‌کنند. تحت Weston، WebdriverIO همچنین `--ozone-platform=wayland` را به Chrome و Edgeی که اجرا می‌کند اضافه می‌کند، چون Chrome و Edge پیش از 140 (Chrome for Testing پیش از 135) مقدار `XDG_SESSION_TYPE` را نادیده می‌گیرند. Weston هیچ `DISPLAY` ارائه نمی‌کند، بنابراین اگر تست‌ها یا ابزارهای شما به X11 نیاز دارند، `displayServer: 'xvfb'` را تنظیم کنید.
- اگر مستقیماً از `XvfbManager` یا نمونهٔ `xvfb` از `@wdio/xvfb` استفاده می‌کردید، به‌جای آن از `DisplayServerManager` از `@wdio/display-server` استفاده کنید. جایی که `xvfb.init()` را اجرا می‌کردید و دستورات را در `xvfb-run` قرار می‌دادید، یا فرایندها را از طریق `ProcessFactory` ایجاد می‌کردید، یک نمایشگر راه‌اندازی کنید و محیط آن را به فرایندهایی که به آن نیاز دارند بدهید. این مثال از Xvfb با 1280x1024 استفاده می‌کند، همان‌طور که v9 در Debian و Ubuntu انجام می‌داد. روی میزبانی که فقط `WAYLAND_DISPLAY` تنظیم شده، ابتدا آن را unset کنید، وگرنه `startDaemon()` هیچ چیزی راه‌اندازی نمی‌کند:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() وقتی یک نمایشگر از قبل وجود داشته باشد نیز null برمی‌گرداند
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulation

`browser.emulate()` ماژول emulation در WebDriver BiDi را برای browsing context سطح بالای فعلی به کار می‌گیرد. v9 یک preload script تزریق می‌کرد که `navigator.geolocation.getCurrentPosition`، `navigator.userAgent`، `window.matchMedia` و `navigator.onLine` را patch می‌کرد. آن اسکریپت‌ها حذف شده‌اند. `browser.emulate('clock', …)` همچنان تایمرهای جعلی را در صفحهٔ فعلی و در صفحاتی که پس از آن باز می‌شوند نصب می‌کند.

برای محدوده‌های BiDi دیگر نیازی به بارگذاری مجدد نیست.

```diff
  await browser.emulate('onLine', false)
- // فقط `navigator.onLine` تغییر می‌کرد؛ ترافیک همچنان جریان داشت
+ // browsing context آفلاین است، شامل fetch، WebSocket و WebTransport
```

- `onLine: false` تابع `emulation.setNetworkConditions` را با `{ type: 'offline' }` فراخوانی می‌کند. `true` و بازگرداندن محدوده آن را پاک می‌کنند. توان عملیاتی و تأخیر همچنان روی `browser.throttleNetwork()` باقی می‌مانند.
- `colorScheme` ویژگی رسانه‌ای `prefers-color-scheme` را تنظیم می‌کند، بنابراین `@media (prefers-color-scheme)` در CSS از `matchMedia` پیروی می‌کند.
- `userAgent` جایگزینی user-agent مرورگر است، نه یک property پچ‌شدهٔ `navigator.userAgent`.
- `geolocation` از پشتهٔ geolocation مرورگر استفاده می‌کند. یک صفحه ممکن است همچنان به `browser.setPermissions({ name: 'geolocation' }, 'granted')` نیاز داشته باشد. `{ error: 'positionUnavailable' }` به‌جای مختصات، آن خطا را گزارش می‌کند.
- `colorScheme` و `media` یک نگاشت ویژگی رسانه‌ای مشترک دارند. فراخوانی بعدی کل نگاشت را جایگزین می‌کند و بازگرداندن هر یک از محدوده‌ها آن را پاک می‌کند.
- `device` مقادیر user agent، viewport، لمس، چیدمان متن موبایل و viewport meta را از توصیف‌گر دستگاه تنظیم می‌کند. `screen` یا `orientation` را تغییر نمی‌دهد.

محدوده‌های جدید عبارت‌اند از `media`، `locale`، `timezone`، `touch`، `orientation`، `screen`، `viewportMeta`، `textLayout`، `scripting`، `scrollbar` و `forcedColors`. مرورگری که یک دستور را پیاده‌سازی نکرده، فراخوانی را با خطای خودش (`unknown command` یا `unsupported operation`) رد می‌کند. WebdriverIO به یک preload script یا CDP بازنمی‌گردد. اگر `device` در میانهٔ کار رد شود، user agent، viewport، لمس، چیدمان متن و viewport meta قبلی بازگردانده می‌شوند.

`wdio session emulate` همان محدوده‌ها را می‌پذیرد. دیگر برای جایگزینی‌ای که بلافاصله اعمال می‌شود از شما نمی‌خواهد که صفحه را دوباره بارگذاری کنید. presetهای `emulate network` و `emulate cpu` تغییری نکرده‌اند و همچنان فقط مختص Chromium هستند. [Emulation](/docs/emulation) را ببینید.

## گام‌های بعدی

- [skill مهاجرت](#migrate-with-a-coding-agent) را در پروژه کپی کنید و از یک عامل بخواهید آن را اعمال کند.
- [WebdriverIO برای عامل‌های کدنویسی](/docs/ai-agents) برای نوشتن تست‌های جدید v10.
- [Headless و Display Serverها](/docs/headless-and-display-servers) وقتی مجموعهٔ تست روی Linux اجرا می‌شود.