---
id: v10-migration
title: از v9 به v10
description: به‌روزرسانی یک پروژهٔ WebdriverIO v9 به v10، شامل تمام تغییرات ناسازگار و یک مهارت (skill) برای عامل کدنویسی که این راهنما را اعمال می‌کند.
---

این راهنما تغییرات ناسازگار (breaking changes) WebdriverIO `v10` و کارهایی را که باید برای هر کدام انجام دهید گردآوری می‌کند.

برخلاف نسخه‌های اصلی قبلی، بیشتر این تغییرات را نمی‌توان با [codemod](https://github.com/webdriverio/codemod) WebdriverIO اعمال کرد، زیرا به معنای واقعی تست‌های شما بستگی دارند. [امضاهای قدیمی دستورات](#legacy-command-signatures) در ادامه، جایگزینی‌های مکانیکی هستند. هر بخش دیگر توضیح می‌دهد که چگونه مکان‌های تحت تأثیر را در مجموعهٔ تست خود پیدا کنید.

## مهاجرت با یک عامل کدنویسی

مهارت مهاجرت v10 را به عامل (agent) خود بدهید و از آن بخواهید مجموعهٔ تست را با پیروی از این صفحه به WebdriverIO v10 مهاجرت دهد. این مهارت، روال کار است: چه چیزی را جستجو کند، کدام codemod را اجرا کند و چه زمانی متوقف شود. این صفحه مرجع اصلی برای هر تغییر ناسازگار است.

آن را از داخل پروژه‌ای که در حال ارتقای آن هستید نصب کنید. [CLI مهارت‌ها](https://skills.sh) فایل [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) را از این مخزن می‌خواند و آن را در پوشهٔ مهارت عامل‌هایی که انتخاب می‌کنید می‌نویسد:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` این مهارت را نصب می‌کند. مهارت‌های مربوط به کار روی مخزن WebdriverIO به‌عنوان داخلی علامت‌گذاری شده‌اند و ارائه نمی‌شوند. CLI می‌پرسد برای کدام عامل‌ها نصب شود و مهارت را در پوشهٔ پروژهٔ هر عامل می‌نویسد. همچنین می‌توانید آن فایل را به گفتگو پیوست کنید.

انتخابگرهای سخت‌گیرانه (strict) و فهرست‌های بدون پیشوند `specs` / `exclude` در capabilityها فقط هنگام اجرای مجموعهٔ تست آشکار می‌شوند. این مهارت نمی‌تواند تنها از روی کد منبع دربارهٔ آن‌ها تصمیم بگیرد.

## Node.js

WebdriverIO v10 به Node.js نسخهٔ 22.19.0 یا بالاتر نیاز دارد. Node.js 18 و 20 دیگر پشتیبانی نمی‌شوند. CI نسخه‌های Node.js 22، 24 و 26 را پوشش می‌دهد.

## تست‌های کامپوننت

اجراکنندهٔ مرورگر همچنان در Chrome 90، Edge 90، Firefox 90 و Safari 14.1 یا جدیدتر اجرا می‌شود. [پشتیبانی مرورگر](/docs/component-testing#browser-support) را ببینید.

کدی که به `browser.execute` داده می‌شود در سطح ES2021 باقی می‌ماند تا بتواند در مرورگرهای قدیمی‌تر تحت تست اجرا شود. این حداقل تغییری نکرده است.

## Mocha

`@wdio/mocha-framework` و `@wdio/browser-runner` به [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) وابسته‌اند. Mocha 12 به Node.js `^20.19.0 || >=22.12.0` نیاز دارد که با حداقل نسخهٔ 22.19.0 در v10 پوشش داده می‌شود.

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` حذف شده است. Mocha پرچم `--compilers` را که مدت‌ها منسوخ بود حذف کرد، بنابراین نگاشت‌های کامپایلر باقی‌مانده نادیده گرفته می‌شوند. ترنسپایلرها یا سایر فایل‌های راه‌اندازی را با `mochaOpts.require` بارگذاری کنید.

مقدار پیش‌فرض `failHookAffectedTests` برابر `true` است. یک هوک `before` یا `beforeEach` ناموفق، تست‌هایی را که آن هوک رد کرده است ناموفق می‌کند. برای اینکه فقط خود هوک گزارش شود، `mochaOpts.failHookAffectedTests` را `false` قرار دهید.

از `expect-webdriverio` 8 استفاده کنید، [expect-webdriverio 8](#expect-webdriverio-8) را ببینید. Mocha ممکن است این بسته را دو بار در یک فرایند بارگذاری کند؛ این بسته وضعیت assertion را بین آن نسخه‌ها به اشتراک می‌گذارد ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221)).

تغییرات Mocha 12 که ممکن است از طریق `mochaOpts` اثر بگذارند:

- `grep` پرچم‌های مدرن RegExp را می‌پذیرد.
- `ui` همچنان `bdd`، `tdd`، `qunit` یا `exports` است. رابط‌های سفارشی باید پسوند `*-bdd`، `*-tdd` یا `*-qunit` را حفظ کنند.
- `parallel` همچنان پشتیبانی نمی‌شود. موازی‌سازی specها بر عهدهٔ WDIO است؛ اگر آن را فعال کنید، worker pool مربوط به Mocha خطا می‌دهد.

Mocha 12 در درجهٔ اول ESM است (`"type": "module"`). `require('mocha')` برنامه‌نویسی همچنان در Node 22 از طریق `require(esm)` کار می‌کند. CLI مربوط به Mocha در WDIO (`wdio run … --mochaOpts.*`) تغییری نکرده است؛ CLI خود Mocha اکنون به‌جای yargs از `util.parseArgs` استفاده می‌کند.

## Cucumber

`@wdio/cucumber-framework` به [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) وابسته است.

Cucumber 13 به Node.js 22، 24 یا 26 یا بالاتر نیاز دارد. روی Node.js 20، 23 یا 25 اجرا نمی‌شود. بستهٔ framework همین بازه را اعلام می‌کند که از حداقل نسخهٔ 22.19.0 در v10 شروع می‌شود.

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` نام مستعار ندارد. تنظیم آن خطا پرتاب می‌کند، تا یک فیلتر باقی‌مانده نتواند بی‌صدا همهٔ سناریوها را اجرا کند.

Cucumber 13 دیگر `Cli` را export نمی‌کند. اجراهای برنامه‌نویسی از طریق `runCucumber` از `@cucumber/cucumber/api` انجام می‌شوند که آداپتر از قبل از آن استفاده می‌کند.

سایر تغییرات ناسازگار Cucumber 13 (مسیرهای مبهم formatter، workerهای موازی، `BeforeAll` / `AfterAll`) در [راهنمای ارتقای Cucumber](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) توضیح داده شده‌اند.

## Jasmine

`@wdio/jasmine-framework` به [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) وابسته است. Jasmine 6 روی Node.js 20، 22 و 24 تست شده است. حداقل نسخهٔ 22.19.0 در v10 این بازه را پوشش می‌دهد.

`jasmineNodeOpts` حذف شد. Jasmine را با `jasmineOpts` پیکربندی کنید. تنظیم `jasmineNodeOpts` خطا پرتاب می‌کند:

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

`jasmineOpts.stopSpecOnExpectationFailure` حذف شد. از `jasmineOpts.oneFailurePerSpec` استفاده کنید. تنظیم کلید قدیمی خطا پرتاب می‌کند:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

matcherهای همگام Jasmine دوباره همگام هستند. در v9، `expect` سراسری همان `expectAsync` در Jasmine بود، بنابراین `expect(1).toBe(1)` یک promise برمی‌گرداند. در v10، matcherهای داخلی Jasmine و matcherهایی که با `jasmine.addMatchers` اضافه می‌کنید `undefined` برمی‌گردانند. matcherهای WebdriverIO، matcherهای ناهمگام Jasmine و matcherهای `jasmine.addAsyncMatchers` همچنان یک promise برمی‌گردانند، پس به `await` کردن آن‌ها ادامه دهید. لازم نیست `await expect($('#logo')).toBeDisplayed()` را به `expectAsync()` تغییر دهید: `expect` سراسری matcherهای WebdriverIO را برای شما به `expectAsync` می‌فرستد. `await expect(1).toBe(1)` همچنان کار می‌کند.

یک assertion همگام ناموفق بدون `await` اکنون spec را ناموفق می‌کند. در v9، این یک promise ردشده بود: اگر چیزی آن را await نمی‌کرد، spec می‌توانست موفق شود و فقط یک unhandled rejection در لاگ ثبت می‌شد. پس از ارتقا، به specهایی که شروع به شکست می‌کنند نگاه کنید. آن‌ها در v9 یک شکست پنهان داشتند و راه‌حل در خود تست یا در برنامه است، نه در فراخوانی `expect`:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: حتی وقتی `onSave` فراخوانی نشده بود موفق می‌شد
    // v10: وقتی `onSave` فراخوانی نشده باشد ناموفق می‌شود
    expect(onSave).toHaveBeenCalled()
})
```

نتیجهٔ یک matcher همگام اکنون `undefined` است، بنابراین `.then()` یا `.catch()` روی آن یک `TypeError` پرتاب می‌کند:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

سایر اثرات این تغییر:

- `oneFailurePerSpec` اکنون spec را در اولین assertion ناموفق متوقف می‌کند: برای matcher همگام بلافاصله، و برای matcher ناهمگام await‌شده هنگامی که promise به نتیجه می‌رسد.
- matcherهای spy در Jasmine بدون `await` کار می‌کنند. در v9، `toHaveBeenCalled`، `toHaveSpyInteractions` و `toHaveNoOtherSpyInteractions` با خطای "Does not take arguments" شکست می‌خوردند و یک spy فراخوانی‌نشده بدون `await` موفق می‌شد.
- `jasmine.addMatchers` دیگر جایگزین نمی‌شود، بنابراین Jasmine دیگر هشدار "Monkey patching detected" را نشان نمی‌دهد.

`toHaveSize` دو معنا دارد. روی یک مقدار WebdriverIO، این matcher مربوط به WebdriverIO است و اندازهٔ عنصر را بررسی می‌کند: یک عنصر، یک آرایهٔ عناصر (شامل نتیجهٔ `$$().filter()`)، یک `Element[]`، یک عنصر multi-remote، یک مرورگر، یک browsing context، یک mock، پوشش `some()`، یا یک promise مانند `$()` زنجیره‌ای. روی هر مقدار دیگری، matcher مربوط به Jasmine است و طول را بررسی می‌کند. در v9، همیشه matcher مربوط به Jasmine اجرا می‌شد.

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine، همگام
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO، ناهمگام
```

تایپ‌ها از همین قواعد پیروی می‌کنند. `@wdio/jasmine-framework` اکنون `expect` سراسری را با matcherهای Jasmine، به‌علاوهٔ matcherهای WebdriverIO و matcherهای ناهمگام Jasmine که یک promise برمی‌گردانند، تایپ می‌کند. `expect-webdriverio/jasmine-wdio-expect-async` را از `types` در `tsconfig.json` خود حذف کنید، زیرا همهٔ matcherها را ناهمگام تایپ می‌کند. اگر `jasmine` وجود ندارد، آن را اضافه کنید:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` و `expect.multiRemote()` اکنون در specهای Jasmine هم کار می‌کنند. پیش از این، آن‌ها در زمان اجرا روی `expect` مربوط به Jasmine وجود نداشتند.

## expect-webdriverio 8

`@wdio/globals`، `@wdio/runner` و `@wdio/browser-runner` به `expect-webdriverio` 8 به‌عنوان وابستگی همتا (peer dependency) نیاز دارند. در v9، این `expect-webdriverio` 7 بود. اگر `package.json` شما `expect-webdriverio` را فهرست کرده است، آن را در همان تغییری که بسته‌های `@wdio/*` را به‌روز می‌کنید به نسخهٔ 8 ارتقا دهید.

`expect-webdriverio` 8 تغییرات ناسازگار خاص خود را دارد. [راهنمای مهاجرت v7 به v8](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) آن، هر تغییر و جایگزین آن را فهرست می‌کند. این تغییرات به احتمال زیاد بر یک مجموعهٔ تست اثر می‌گذارند:

- `toHaveText` روی `$$()` عناصر را اندیس به اندیس مقایسه می‌کند. آرایهٔ مورد انتظار با ترتیبی متفاوت از صفحه ناموفق می‌شود. از ترتیب صفحه، `expect.oneOf()` یا `expect.arrayContaining()` استفاده کنید.
- آرایه‌ای از مقادیر مورد انتظار روی یک عنصر واحد، `toHaveText`، `toHaveHTML`، `toHaveComputedLabel` و `toHaveComputedRole` را ناموفق می‌کند. از `expect.oneOf()` استفاده کنید.
- `setFeatureFlags()` و گزینهٔ `featureFlags` حذف شدند.
- این APIهای منسوخ حذف شدند: `setOptions` (از `setDefaultOptions` استفاده کنید)، `getConfig` (از `getDefaultOptions` استفاده کنید)، `matchers` (از `wdioCustomMatchers` استفاده کنید)، `toHaveAttr` (از `toHaveAttribute` استفاده کنید)، `toHaveClass` (از `toHaveElementClass` استفاده کنید)، `toBeRequestedWithResponse()` (از `toBeRequestedWith({ response })` استفاده کنید)، و `expect-webdriverio/types` (از `expect-webdriverio/expect-global` استفاده کنید).
- هوک‌های `beforeAssertion` و `afterAssertion` برای `toBeExisting`، `toBePresent`، `toHaveLink`، `toHaveValue` و `toBeRequested`، نام نام مستعاری را که تست فراخوانی کرده دریافت می‌کنند. در v9، آن‌ها نام matcher پشت نام مستعار را دریافت می‌کردند، برای مثال `toExist` برای `toBeExisting`.
- روی یک مرورگر multi-remote، نتیجهٔ `$$()` را به `expect` بدهید. یک آرایهٔ ساده مانند `[...elements]` یا `Array.from(elements)` به‌عنوان عناصر شناخته نمی‌شود و assertion ناموفق می‌شود.

روی یک مرورگر multi-remote، یک assertion همهٔ نمونه‌ها را بررسی می‌کند و `expect.multiRemote()` برای هر نمونه یک مقدار مورد انتظار می‌دهد. [Assertionهای Multiremote](/docs/multiremote#assertions) را ببینید.

## متغیر سراسری Multi-remote

متغیر سراسری با حروف کوچک `multiremotebrowser` از `@wdio/globals` و همچنین از متغیرهای سراسری `eslint-plugin-wdio` حذف شد. از `multiRemoteBrowser` استفاده کنید.

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

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

کلیدهای سطح بالای پیکربندی همچنان `specs` و `exclude` هستند. یک فهرست بدون پیشوند باقی‌مانده روی یک capability، فایل‌ها را برای آن capability انتخاب نمی‌کند. در این صورت capability از `specs` و `exclude` سطح بالا استفاده می‌کند.

نام‌های مستعار `tunnelIdentifier` و `parentTunnel` از تایپ‌های گزینه‌های Sauce Labs حذف شدند. از `tunnelName` و `tunnelOwner` استفاده کنید.

## TypeScript

تایپ‌های `Element`، `MultiRemoteBrowser` و `MultiRemoteElement` که توسط `webdriverio` export می‌شدند حذف شدند. از فضای نام سراسری `WebdriverIO` استفاده کنید.

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` اکنون `then` را اعلام می‌کند و `ChainablePromiseArray`، `then`، `catch` و `finally` را اعلام می‌کند. تایپ‌های زنجیره‌ای مقدار پیش از `await` را توصیف می‌کنند. آن‌ها دیگر با مقدار await‌شده سازگار نیستند:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

مقدار await‌شده را با `WebdriverIO.Element` یا `WebdriverIO.ElementArray` تایپ کنید:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

هر دو تایپ زنجیره‌ای اکنون با `T extends PromiseLike<unknown>` تطابق دارند. یک تایپ شرطی که `PromiseLike` را بررسی می‌کند، برای `$()` و `$$()` شاخهٔ متفاوتی نسبت به v9 را انتخاب می‌کند. برای مثال، `Awaited<ChainablePromiseElement>` اکنون `WebdriverIO.Element` است و `Awaited<ChainablePromiseArray>`، `WebdriverIO.ElementArray` است.

تایپ ویژگی‌های یک `$$()` await‌نشده تغییر کرد. این ویژگی‌ها بلافاصله و پیش از حل شدن کوئری در دسترس هستند، پس آن‌ها را بدون `await` یا `.then()` بخوانید:

| ویژگی | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | والد، نه یک promise (ادامه را ببینید) |
| `foundWith` | ندارد | دستوری که فهرست را پیدا کرده، مثلاً `$$` یا `custom$$` |
| `props` | ندارد | آرگومان‌های اضافی آن دستور |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

در یک کوئری زنجیره‌ای مانند `$('form').$$('input')`، `parent` تا زمانی که فهرست حل شود همان `$('form')` زنجیره‌ای است و پس از آن، عنصر حل‌شده است. پیش از استفاده از `parent` به‌عنوان یک عنصر، فهرست را await کنید.

در زمان اجرا، `filter()`، `filterSeries()` و `slice()` روی یک فهرست `$$()` یک فهرست عناصر برمی‌گردانند، نه یک آرایهٔ ساده. نتیجه، `selector`، `foundWith`، `parent` و `props` فهرست منبع را حفظ می‌کند. در v9، `filter()` یک آرایهٔ ساده بدون این ویژگی‌ها برمی‌گرداند. تایپ‌ها هنوز این را نشان نمی‌دهند: `filter()` و `filterSeries()` طوری اعلام شده‌اند که `Promise<WebdriverIO.Element[]>` برگردانند و `slice()`، `WebdriverIO.Element[]` برمی‌گرداند، بنابراین TypeScript هنگام خواندن این ویژگی‌ها روی نتیجه خطا گزارش می‌کند.

WebdriverIO کوئری را برای خود فهرست مشتق‌شده دوباره اجرا نمی‌کند: اندیسی فراتر از انتهای آن منتظر تطابق‌های بیشتر نمی‌ماند و هرگز عنصری را که فیلتر حذف کرده برنمی‌گرداند. اعضای آن همچنان عناصر کوئری منبع هستند، با `selector` و `index` اصلی‌شان. اگر یک عضو stale شود، WebdriverIO آن را دوباره از کوئری منبع در همان اندیس واکشی می‌کند، که اگر صفحه تغییر کرده باشد ممکن است عنصر دیگری باشد. کدی که کوئری یک فهرست را از روی ویژگی‌های فهرست دوباره اجرا می‌کند، برای مثال `parent[foundWith](selector, ...props)`، فهرست کامل را دریافت می‌کند، نه فهرست فیلترشده را.

بسته‌های منتشرشده `typeScriptVersion` را روی 6.0.3 تنظیم می‌کنند که با نسخهٔ TypeScript که این مخزن با آن کامپایل می‌شود مطابقت دارد.

`browser.mock()` هم `URLPattern` از `urlpattern-polyfill` و هم `URLPattern` بومی (سراسری در Node.js 24 و تایپ‌شده توسط کتابخانهٔ `dom` در TypeScript 6) را می‌پذیرد.

TypeScript 6، `"moduleResolution": "node"` و `"baseUrl"` را منسوخ می‌کند و `strict` را پیش‌فرض قرار می‌دهد. `create-wdio` اکنون برای پروژه‌های ESM، `"moduleResolution": "bundler"` و برای پروژه‌های CommonJS، `"NodeNext"` تولید می‌کند. اگر TypeScript را در یک پروژهٔ موجود به‌روز می‌کنید، این گزینه‌ها را در `tsconfig.json` خود تغییر دهید.

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

برای یک پروژهٔ CommonJS، مانند `create-wdio`، برای هر دو گزینه از `NodeNext` استفاده کنید:

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

TypeScript 6 همچنین مقدار پیش‌فرض `types` را به `[]` تغییر می‌دهد، بنابراین دیگر همهٔ بسته‌های نصب‌شدهٔ `@types/*` را بارگذاری نمی‌کند. اگر `tsconfig.json` شما فهرست `types` ندارد، متغیرهای سراسری مانند `describe` و `it` در Mocha با خطای `Cannot find name` شکست می‌خورند. مانند `create-wdio`، بسته‌های تایپی را که تست‌هایتان استفاده می‌کنند فهرست کنید. برای مثال، با Mocha:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` مقادیر `compilerOptions.target` و `compilerOptions.lib` را `es2024` می‌نویسد. بررسی تایپ این فایل به TypeScript 5.7 یا جدیدتر نیاز دارد. `tsx` که پیکربندی و تست‌ها را اجرا می‌کند بررسی تایپ انجام نمی‌دهد، بنابراین کامپایلر قدیمی‌تر فقط زمانی اهمیت دارد که خودتان `tsc` را اجرا کنید.

یک `tsconfig.json` موجود بازنویسی نمی‌شود. پیکربندی تولیدشده‌ای که از پیکربندی دیگری ارث‌بری می‌کند، `target` و `lib` والد را حفظ می‌کند.

در هوک `afterAssertion`، تایپ `params.result` اکنون `{ pass, message }` است، همان‌طور که matcherها آن را می‌دهند. در v9، تایپ `{ result, message }` بود، اما `params.result.result` در زمان اجرا همیشه `undefined` بود. `params.result.pass` را بخوانید:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` زمانی `true` است که مقدار با مقدار مورد انتظار مطابقت داشته باشد، حتی با `.not`. بنابراین با `.not`، assertion زمانی موفق است که `pass` برابر `false` باشد. هوک نمی‌گوید که آیا تست از `.not` استفاده کرده است یا نه.

## گزارشگرها

رویداد `result` مرورگر به‌صورت `client:afterCommand` به گزارشگرها ارسال می‌شود. آن payload و تایپ `AfterCommandArgs` دیگر ویژگی `name` ندارند. به‌جای آن `command` را بخوانید. دستورات سفارشی از قبل `command` را ارسال می‌کردند.

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`addEnvironment(name, value)` در `@wdio/allure-reporter` حذف شد. هیچ اثری نداشت. ردیف‌های محیط را با [`reportedEnvironmentVars`](/docs/allure-reporter) در گزینه‌های گزارشگر Allure تنظیم کنید.

## `$` سخت‌گیرانه است

`$` اکنون نمایانگر __دقیقاً یک__ عنصر است. اگر انتخابگر به بیش از یک عنصر حل شود، دستور به‌جای استفادهٔ بی‌صدا از اولین تطابق، یک `StrictSelectorError` پرتاب می‌کند:

```js
// v9 — روی اولین دکمه کلیک می‌کند، حتی اگر ۱۲ دکمه وجود داشته باشد
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

این با [locatorهای Playwright](https://playwright.dev/docs/locators#strictness) مطابقت دارد. Cypress متفاوت است: کوئری‌های آن ممکن است به چند عنصر حل شوند و این دستورات اقدام مانند [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هستند که به‌طور پیش‌فرض سوژهٔ چندعنصری را رد می‌کنند. انتخابگری که بی‌صدا به چند عنصر حل می‌شود تقریباً همیشه یک باگ پنهان است: امروز موفق می‌شود و به‌محض اینکه کسی دکمهٔ دومی به صفحه اضافه کند، با عنصر اشتباه تعامل می‌کند.

این قاعده برای هر مرحله از یک زنجیره (`$('form').$('input')`) و برای هر نوع انتخابگری که `$` می‌پذیرد اعمال می‌شود — انتخابگرهای رشته‌ای (شامل آن‌هایی که از shadow DOM عبور می‌کنند)، توابع JS، انتخابگرهای موبایل و ارجاع‌های استراتژی سفارشی.

### چه چیزی تغییر نکرد

- `$$` همچنان صفر یا چند عنصر برمی‌گرداند. از v10 آن فهرست یک [`ElementArray`](/docs/api/browser/$$) است: یک آرایهٔ واقعی که می‌توانید `await` کنید، با `for await` و `map` / `filter` ناهمگام که پیش از حل شدن در دسترس‌اند. `await $$('button').length` تعداد است. `$$('button').length > 0` این‌طور نیست، زیرا `length` تا زمان حل شدن فهرست یک promise است. `for (const el of $$('button'))` تا زمانی که فهرست را await نکرده باشید خطا پرتاب می‌کند؛ از `for await`، یا `for...of` پس از `await` استفاده کنید.
- دستورات کمکی اختصاصی `custom$`، `shadow$` و `react$` سخت‌گیرانه نیستند — آن‌ها همچنان اولین تطابق خود را برمی‌گردانند، همان‌طور که همتاهای `$$` آن‌ها.
- انتخابگری که با هیچ چیز تطابق ندارد همچنان یک عنصر با حل تنبل (lazy) برمی‌گرداند، بنابراین `waitForExist` و [انتظار خودکار](/docs/autowait) مانند قبل رفتار می‌کنند.
- ارسال یک ارجاع عنصر، مثلاً `$(await browser.getActiveElement())`، همیشه به یک گره واحد اشاره دارد و هرگز بررسی نمی‌شود.

### چگونه مجموعهٔ تست خود را بازبینی کنید

هیچ codemodی برای این وجود ندارد: فقط شما می‌توانید تشخیص دهید که تطابق دوم یک باگ است یا عمدی. دو رویکرد عملی:

1. __مجموعهٔ تست خود را اجرا کنید.__ هر تخلف با انتخابگر و تعداد تطابق‌ها خطا پرتاب می‌کند، که معمولاً برای رفع فوری آن کافی است.
2. __انتخابگرهای کلی را از پیش بررسی کنید.__ برای هر `$(...)` عمومی در page objectهای خود، چاپ کنید که واقعاً با چند عنصر تطابق دارد:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` بیش از حد کلی است
   ```

سپس یا انتخابگر را محدودتر کنید — ترجیحاً به سمت یک کوئری کاربرمحور مانند `$('button=Submit')` یا `$('aria/Submit')`، [انتخابگرها](/docs/selectors) را ببینید — یا صراحتاً بیان کنید که اولین تطابق را می‌خواهید:

```js
await $('button[type="submit"]').click()
// ...یا، اگر واقعاً منظورتان اولین مورد است
await $$('button')[0].click()
```

### غیرفعال‌سازی

برای یک کوئری واحد:

```js
await $('button', { strict: false }).click()
```

برای کل پروژه، بازگرداندن رفتار v9:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

یک عنصر به خاطر می‌سپارد که چگونه کوئری شده است، بنابراین واکشی مجدد آن — پس از یک stale element reference یا از طریق `waitForExist` — سخت‌گیری فراخوانی اصلی را حفظ می‌کند.

:::info

در پشت صحنه، یک `$` سخت‌گیرانه به‌جای `findElement` یک درخواست `findElements` ارسال می‌کند، زیرا شمارش تطابق‌ها تنها راه اعمال این قاعده است. در هر دو حالت این یک رفت‌وبرگشت واحد است، اما برای سرویس‌های سفارشی و mockهای WebDriver که بر اساس دستور `findElement` کار می‌کنند قابل مشاهده است.

:::

## امضاهای قدیمی دستورات

v9 همچنان شکل‌های موقعیتی قدیمی‌تر را می‌پذیرفت و هشدار می‌داد. v10 فقط شیء گزینه‌ها را می‌پذیرد.

[codemod](https://github.com/webdriverio/codemod) نسخهٔ v10، `addCommand` و `overwriteCommand` را وقتی آرگومان سوم boolean باشد، `getHTML(true)` و `getHTML(false)` را، و `getCookies` را وقتی فیلتر یک رشته یا یک آرایهٔ تک‌عنصری باشد بازنویسی می‌کند. یک فراخوانی `getCookies` با بیش از یک نام بدون تغییر باقی می‌ماند، زیرا یک فیلتر با یک نام تطابق دارد.

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

آرگومان سوم boolean یک خطای TypeScript است. در زمان اجرا خطا پرتاب می‌کند:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` و `instances` به همان شیء گزینه‌ها تعلق دارند. برای متصل کردن یک دستور به مرورگر، آرگومان سوم را حذف کنید.

### `getCookies`

فیلترهای رشته‌ای و آرایهٔ رشته‌ای رد می‌شوند. یک [شیء فیلتر کوکی](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) ارسال کنید. هر فراخوانی یک نام را فیلتر می‌کند؛ برای نام دیگر دوباره آن را فراخوانی کنید.

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

`getCookies()` بدون آرگومان همچنان همهٔ کوکی‌های قابل مشاهده برای صفحه را برمی‌گرداند.

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

`getHTML()` بدون آرگومان همچنان تگ خود عنصر را شامل می‌شود.

### `newWindow`

`windowName` و `windowFeatures` حذف شده‌اند. آن‌ها فقط در WebDriver Classic اعمال می‌شدند. دستور همچنان `type` را می‌پذیرد:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

برای باز کردن یک تب از `type: 'tab'` استفاده کنید.

### `startActivity`

فقط شیء گزینه‌ها پذیرفته می‌شود. `appWaitPackage`، `appWaitActivity` و `optionalIntentArguments` حذف شده‌اند. آن‌ها فقط در endpoint حذف‌شدهٔ HTTP در Appium اعمال می‌شدند. `mobile: startActivity` آن‌ها را نمی‌پذیرد و ارسال آن‌ها خطا پرتاب می‌کند.

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
| `browser.touchAction(...)` / `element.touchAction(...)` | [Actions API](/docs/api/browser/action) با یک اشاره‌گر لمسی، یا دستورات موبایل [`tap`](/docs/api/mobile/tap) و [`swipe`](/docs/api/mobile/swipe) |

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

`browser.uploadFile()` حذف شده است. این دستور یک فایل محلی را zip می‌کرد و آن را به endpoint `file` در Selenium ارسال می‌کرد که بخشی از WebDriver یا WebDriver BiDi نیست. یک ورودی فایل را با [`element.setFiles()`](/docs/api/element/setFiles) تنظیم کنید.

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` به یک نشست BiDi نیاز دارد. مسیرها توسط مرورگر باز می‌شوند. یک مسیر نسبی نسبت به `process.cwd()` حل می‌شود. انتقال فایل در Selenium Grid بخشی از v10 نیست. مجموعهٔ تستی که برای ارسال بایت‌ها به یک node به `uploadFile` وابسته بود، باید فایل را جایی قرار دهد که مرورگر بتواند آن را بخواند و سپس `setFiles` را فراخوانی کند.

در یک نشست محلی classic، `element.setValue('/local/path')` همچنان مسیری را تایپ می‌کند که مرورگر محلی از قبل می‌تواند ببیند. endpoint خام Selenium برای کاربران Grid که مستقیماً آن را فراخوانی می‌کنند همچنان `browser.file()` است.

## `executeAsync`

`browser.executeAsync` و `element.executeAsync` حذف شده‌اند. یک تابع `async` به [`execute`](/docs/api/browser/execute) ارسال کنید. مقدار بازگشتی تابع، شامل یک promise بازگشتی، نتیجهٔ دستور است. timeout مربوط به `script` همچنان اعمال می‌شود.

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

callback `done` در WebDriver را کنار بگذارید. یک اسکریپت رشته‌ای که آن callback را به‌عنوان آخرین آرگومان انتظار داشت، باید به‌جای آن یک promise برگرداند. در زمان اجرا، `executeAsync` یک تابع نیست.

## `switchToFrame`

`browser.switchToFrame` دیگر یک دستور عمومی نیست.

در یک نشست WebDriver BiDi، `switchFrame` و `switchWindow` خطا پرتاب می‌کنند. یک تب، یک پنجره و یک frame، یک `WebdriverIO.BrowsingContext` هستند که در اختیار دارید. `browser.url()` در context سطح بالای اولیهٔ نشست پیمایش می‌کند و آن را برمی‌گرداند. `browser.newWindow()` context جدید را برمی‌گرداند و به آن سوئیچ نمی‌کند. `context.frame()` یک frame فرزند را برمی‌گرداند. `context.parent` همان frameی است که آن را از آن باز کرده‌اید.

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` رشتهٔ URL سند است. یک context در اختیار را با `context.navigate(url)` پیمایش کنید. فرادادهٔ بارگذاری از `browser.url()`، `context.request` است.

در یک نشست Classic، به فراخوانی `switchFrame` با یک عنصر، یا `null` برای frame بالایی ادامه دهید. یک رشته یا یک تابع در آنجا رد می‌شود.

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

کلید `page load` در JSON Wire Protocol رد می‌شود. از `pageLoad` استفاده کنید.

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` و `script` تغییری نکرده‌اند.

## دسترسی به نمونه‌های Multi-remote

یک مرورگر multi-remote دیگر هر نشست را به‌عنوان ویژگی مجزای خود ذخیره نمی‌کند. همین موضوع برای یک عنصر multi-remote نیز صادق است. `getInstance` و `select` راه دسترسی به یک نشست هستند.

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

یک augmentation در TypeScript که `myChromeBrowser: WebdriverIO.Browser` را به `WebdriverIO.MultiRemoteBrowser` اضافه می‌کند، دیگر با یک ویژگی زمان اجرا مطابقت ندارد. آن augmentation را حذف کنید و `getInstance` را فراخوانی کنید.

با testrunner و فعال ماندن `injectGlobals`، نام نمونه همچنان یک متغیر سراسری است (`myChromeBrowser.url(...)`). آن متغیر سراسری همان نشست واحد است. این `browser.myChromeBrowser` نیست.

نتایج دستورات به ترتیب capabilityها باقی می‌مانند: اولین ورودی متعلق به اولین کلید در شیء capabilities است.

`browser.$$()` روی یک مرورگر multi-remote یک `WebdriverIO.MultiRemoteElementArray` برمی‌گرداند، نه یک `MultiRemoteElement[]` ساده. همچنان یک آرایه است، بنابراین خواندن با اندیس مانند `elements[0]` همچنان کار می‌کند.

متدهای `map`، `filter`، `forEach`، `find`، `findIndex`، `some`، `every` و `reduce` آن، مانند یک `WebdriverIO.ElementArray`، ناهمگام هستند و حتی پس از `await` یک promise برمی‌گردانند. همین موضوع برای فهرست‌هایی که `custom$$()`، `react$$()` و `shadow$$()` برمی‌گردانند صادق است. در v9 این‌ها متدهای همگام یک آرایهٔ ساده بودند:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`، `react$()` و، روی یک عنصر، `shadow$()`، `nextElement()`، `previousElement()` و `parentElement()`، مانند `$()`، یک `WebdriverIO.MultiRemoteElement` واحد برمی‌گردانند. در v9 آن‌ها برای هر نمونه یک عنصر در یک آرایهٔ ساده برمی‌گرداندند. عنصر یک مرورگر را با `getInstance` بخوانید:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`، `react$$()` و، روی یک عنصر، `shadow$$()`، مانند `$$()`، یک `WebdriverIO.MultiRemoteElementArray` واحد برمی‌گردانند. در v9 آن‌ها برای هر نمونه یک فهرست در یک آرایهٔ ساده برمی‌گرداندند. هر ورودی به همهٔ نمونه‌ها اشاره دارد. نمونه‌ای که عناصر کمتری پیدا می‌کند، در آن اندیس عنصری ندارد:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']`، مانند `WebdriverIO.Element['selector']`، تایپ `Selector` دارد. در v9 تایپ `string` داشت، اما مقدار می‌توانست یک تابع یا یک ارجاع استراتژی سفارشی نیز باشد. کد TypeScript که از آن به‌عنوان رشته استفاده می‌کند، برای مثال `element.selector.includes('…')`، باید ابتدا تایپ را بررسی کند.

`WDIO_ENABLE_MULTI_REMOTE_SELECT` و `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` حذف شده‌اند. `select()` همیشه در دسترس است و `$$()` همیشه آرایهٔ عناصر فوق را برمی‌گرداند. هر دو متغیر را حذف کنید.

## پاسخ‌های باینری mock

`mock.respond()` و `mock.respondOnce()` محموله‌های `Uint8Array` و `ArrayBuffer` را می‌پذیرند، شامل یک `Buffer` polyfill‌شده در تست‌های کامپوننت بدون `Buffer` سراسری.

`mock.getBinaryResponse()` اکنون با تایپ `Uint8Array | null` تعریف شده است. همچنان در Node.js یک `Buffer` برمی‌گرداند، اما در مرورگر یک `Uint8Array` برمی‌گرداند. برای استفاده از متدهای خاص Buffer در Node.js، ابتدا نتیجهٔ غیر null را تبدیل کنید:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## mockهای شبکه در Multi-remote

`browser.mock()` روی یک مرورگر multi-remote یک `WebdriverIO.MultiRemoteMock` برمی‌گرداند، نه آرایه‌ای از mockها. `respond`، `restore` و سایر متدهای mock روی همهٔ نمونه‌ها اجرا می‌شوند. درخواست‌های ضبط‌شده را از mock مربوط به یک مرورگر بخوانید. از تایپ `WebdriverIO.MultiRemoteMock` در فضای نام سراسری `WebdriverIO` استفاده کنید.

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

وقتی نام یکی از `instances` نباشد، `getInstance` خطای `Multi-remote object has no instance named "<name>"` را پرتاب می‌کند. یک mock از `browser.select('myFirefoxBrowser', 'myChromeBrowser')` آن نمونه‌ها را به همان ترتیب فهرست می‌کند که ممکن است با `browser.instances` متفاوت باشد. فرض نکنید که `mocks[0]` یک مرورگر خاص است.

## پاسخ‌های mock که backend را دور می‌زنند

`mock.respond(..., { fetchResponse: false })` backend را فراخوانی نمی‌کند. در v9، mockی که همچنین بر اساس `statusCode` یا `responseHeaders` فیلتر می‌کرد، آن فیلتر را نادیده می‌گرفت و همچنان به همهٔ درخواست‌های منطبق پاسخ می‌داد. در v10، `respond()` و `respondOnce()` خطا پرتاب می‌کنند، زیرا آن فیلترها فقط از روی پاسخ backend قابل تصمیم‌گیری هستند.

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

برای حفظ فیلتر، `fetchResponse` را حذف کنید تا mock پاسخ را واکشی کند، وضعیت یا هدرها را بررسی کند و سپس بدنه را جایگزین کند.

## ارجاع‌های عنصر

شناسه‌های عنصر از کلید W3C WebDriver یعنی `element-6066-11e4-a52e-4f735466cecf` و ویژگی `elementId` استفاده می‌کنند. فیلد `ELEMENT` در JSON Wire Protocol دیگر بخشی از قرارداد عنصر نیست.

`WebdriverIO.Element` دیگر `ELEMENT` را اعلام نمی‌کند. `element.elementId` را بخوانید که نمونه‌های عنصر از قبل در اختیار می‌گذارند.

`browser.execute` و اسکریپت‌های داخلی که یک عنصر را به صفحه می‌فرستند (`getHTML`، `isClickable`، `isDisplayed`، `scrollIntoView` و بقیه)، فقط ارجاع W3C را ارسال می‌کنند:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

بدنهٔ find-element که فقط شامل `{ ELEMENT: '...' }` باشد یک عنصر نیست. کلید W3C را اضافه کنید. اگر هر دو کلید وجود داشته باشند، WebdriverIO از شناسهٔ W3C استفاده می‌کند.

Jasmine نتیجهٔ یک `$()` زنجیره‌ای را از طریق `toJSON` چاپ می‌کند. آن مقدار همان ارجاع W3C است، یعنی `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`.

با WebDriver BiDi، اسکریپتی که یک `NodeList` (برای مثال از `querySelectorAll`) یا یک `HTMLCollection` (برای مثال `element.children`) برمی‌گرداند، اکنون مانند WebDriver Classic فهرستی از ارجاع‌های عنصر می‌دهد. در v9 مقادیر خام BiDi را می‌داد، بنابراین `browser.execute` اشیائی برمی‌گرداند که عنصر نبودند، و یک استراتژی `custom$` یا `custom$$` که `querySelectorAll(...)` را برمی‌گرداند هیچ عنصری پیدا نمی‌کرد. راه‌حل موقتی مانند `Array.from(document.querySelectorAll(...))` همچنان کار می‌کند و می‌توانید آن را حذف کنید:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## انتخابگرهای React

`react$` و `react$$` اکنون با React 16 تا 19 کار می‌کنند، برای برنامه‌ای که با `createRoot` یا با `ReactDOM.render` شروع می‌شود. پیش از این، `browser.react$` و `browser.react$$` با React 18 و بالاتر شکست می‌خوردند (`Could not find the root element of your application`) و در همهٔ نسخه‌ها نتیجه می‌توانست از رندر پیش از آخرین به‌روزرسانی باشد، بنابراین کامپوننتی که یک تغییر state اضافه کرده بود پیدا نمی‌شد.

در صفحه‌ای که React هنوز یک root رندر نکرده است، دستورات اکنون تا ۵ ثانیه برای آن صبر می‌کنند و سپس شکست می‌خورند. پیش از این، آن‌ها بلافاصله شکست می‌خوردند، بنابراین برنامه‌ای که دیر شروع می‌شد پیدا نمی‌شد.

دستورات دیگر از کتابخانهٔ [resq](https://github.com/baruchvlz/resq) استفاده نمی‌کنند و WebdriverIO دیگر آن را نصب نمی‌کند. قواعد انتخابگر تغییر نمی‌کنند ([انتخابگرهای React](/docs/selectors#react-selectors) را ببینید)، به‌جز این استثناها:

- `react$` با هر دو `props` و `state` کامپوننتی را پیدا می‌کند که با هر دو تطابق دارد. پیش از این، وقتی `state` نیز داده می‌شد، `props` را نادیده می‌گرفت.
- `react$$` هر گرهٔ DOM را یک بار می‌دهد. پیش از این، یک کامپوننت مرتبهٔ بالاتر و فرزند آن در برخی مرورگرها یک عنصر را دو بار می‌دادند.
- یک fragment که شامل یک fragment است، یک فهرست مسطح از گره‌ها می‌دهد. پیش از این، `react$` می‌توانست یک فهرست برگرداند.
- فیلتری با مقدار `null` کار می‌کند. پیش از این، با خطای `Cannot convert undefined or null to object` شکست می‌خورد.
- بدون دامنهٔ عنصر، دستورات همهٔ rootهای React صفحه را به ترتیب سند جستجو می‌کنند، همچنین rootهای درون rootهای دیگر و rootها در shadow rootهای باز. `react$` اولین تطابق را می‌دهد. پیش از این، آن‌ها فقط اولین root را جستجو می‌کردند، حتی rootی که React هنوز رندر نکرده یا unmount کرده بود، و shadow rootها را جستجو نمی‌کردند. در صفحه‌ای با بیش از یک root، `react$$` اکنون ممکن است عناصر بیشتری بدهد: برای جستجوی فقط یک root، دستور را روی container آن فراخوانی کنید، برای مثال `$('#root').react$$('MyComponent')`.
- روی container یک root درون root دیگر، دستورات root درونی را جستجو می‌کنند. پیش از این، root بیرونی را جستجو می‌کردند.
- روی browsing context یک frame، و روی یک عنصر از یک frame، دستورات کار می‌کنند. پیش از این، دستور context با `this.executeScript is not a function` و دستور عنصر با `Could not find instance of React in given element` شکست می‌خوردند.

اسکریپت داخلی `webdriverio/scripts/resq` حذف شده است.

## تست کامپوننت

`@wdio/browser-runner`، `fn`، `spyOn` و تایپ‌های mock را از `@vitest/spy` 5 (پیش‌تر 3) دوباره export می‌کند. mockی که کد شما با `new` فراخوانی می‌کند به پیاده‌سازی `function` یا `class` نیاز دارد. یک arrow function خطای `is not a constructor` پرتاب می‌کند و `mockReturnValue` وقتی mock با `new` فراخوانی شود خطا پرتاب می‌کند.

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

برای سایر تغییرات spy، [راهنمای مهاجرت Vitest](https://vitest.dev/guide/migration) را ببینید.

## Puppeteer

`webdriverio`، `puppeteer-core` با بازهٔ `>=24 <26` را می‌پذیرد، شامل Puppeteer 25. `getPuppeteer()` و `@wdio/lighthouse-service` روی همین خط تست شده‌اند.

## ESLint

`eslint-plugin-wdio` به ESLint 10 نیاز دارد. ESLint 9 در تاریخ 2026-08-06 به [پایان عمر](https://eslint.org/version-support/) رسید و دیگر پشتیبانی نمی‌شود. با TypeScript، از `typescript-eslint` نسخهٔ 8.56.0 یا بالاتر استفاده کنید.

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` فقط پیکربندی flat یعنی `flat/recommended` را export می‌کند. نام eslintrc یعنی `plugin:wdio/recommended` حذف شده است.

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

پیکربندی recommended وقتی بستهٔ `typescript-eslint` نصب باشد، به‌جای `wdio/await-expect` به قاعدهٔ آگاه از تایپ `wdio/no-floating-promise` تغییر می‌کند. نصب فقط `@typescript-eslint/eslint-plugin` کافی نیست.

```sh
npm install --save-dev typescript typescript-eslint
```

در آن حالت، پیکربندی هر فایلی را که با آن تطابق دارد با سرویس پروژهٔ TypeScript تجزیه می‌کند. آن را به فایل‌های TypeScript محدود کنید و مطمئن شوید که آن‌ها بخشی از یک `tsconfig.json` هستند:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

یک فایل JavaScript منطبق که در پروژهٔ TypeScript نیست، مانند `wdio.conf.js`، با خطای "was not found by the project service" شکست می‌خورد. برای lint کردن فایل‌های JavaScript نیز، `"allowJs": true` را تنظیم کنید، آن‌ها را به `include` در `tsconfig.json` اضافه کنید و الگو را به `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` گسترش دهید.

## frameworkهای سفارشی

`setupExpect` در یک آداپتر framework سفارشی دیگر یک `Map` از matcherها را نمی‌پذیرد و اجراکننده دیگر متد `entries` را به شیء matcherها اضافه نمی‌کند. با `Object.entries(wdioMatchers)` پیمایش کنید.

## پروفایل Firefox

`@wdio/firefox-profile-service` دیگر `legacy` را به‌عنوان یک گزینهٔ سرویس در نظر نمی‌گیرد. آن پرچم فقط برای Firefox 55 و قدیمی‌تر اعمال می‌شد. آن را حذف کنید. یک `legacy: true` باقی‌مانده به‌عنوان یک ترجیح (preference) با نام `legacy` در پروفایل نوشته می‌شود.

## پروتکل WebDriver

هر نشست یک نشست [W3C WebDriver](https://w3c.github.io/webdriver/) است. WebdriverIO با JSON Wire Protocol یا Mobile JSON Wire Protocol صحبت نمی‌کند. v9 آن دستورات را حذف کرد. v10 همچنین پوشش پاسخی را که آن پروتکل‌ها استفاده می‌کردند حذف می‌کند، بنابراین سروری که هنوز آن را برمی‌گرداند نمی‌تواند نشستی را شروع کند.

`browser.isW3C` حذف شده است، شامل مقداری که پیش‌تر در پیام `sessionStarted` مربوط به worker ارسال می‌شد. ارسال `isW3C` به `attach` نادیده گرفته می‌شود. مجموعهٔ دستورات BiDi روی کلاینت باقی می‌ماند. یک اتصال زندهٔ BiDi همچنان به `webSocketUrl` بستگی دارد.

### `browser.back()` و `browser.forward()` روی BiDi

محل‌های فراخوانی همچنان `await browser.back()` و `await browser.forward()` هستند. هیچ‌کدام از این دستورات آرگومانی نمی‌گیرند یا مقداری برنمی‌گردانند.

در یک نشست BiDi این دستورات `browsingContext.traverseHistory` را با `delta` برابر `-1` یا `1` روی browsing context سطح بالا فراخوانی می‌کنند، سپس منتظر آمادگی سندی می‌مانند که `pageLoadStrategy` به آن نگاشت می‌شود. `none` وقتی دستور پیمایش پذیرفته شد بازمی‌گردد. `eager` منتظر `browsingContext.domContentLoaded` می‌ماند. `normal`، که پیش‌فرض است، منتظر `browsingContext.load` می‌ماند. بازیابی از back-forward cache آن رویدادها را منتشر نمی‌کند؛ دستور وقتی بازمی‌گردد که `readyState` سند commit‌شده از قبل با استراتژی مطابقت داشته باشد. انتظار از timeout بارگذاری صفحهٔ نشست استفاده می‌کند (`timeouts.pageLoad`، در صورت عدم تنظیم 300000 میلی‌ثانیه). نشست‌های Classic همچنان به `POST /session/:sessionId/back` و `POST /session/:sessionId/forward` ارسال می‌کنند.

یک ورودی تاریخچهٔ ناموجود همچنان رد می‌شود. روی BiDi پیام از `browsingContext.traverseHistory` می‌آید و شامل `no such history entry` است، نه متن خطای classic در WebDriver. پیمایشی که هرگز به آمادگی مورد انتظار نرسد با `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` یا `browsingContext.load` رد می‌شود.

### پاسخ نشست جدید

Create Session باید بدنهٔ W3C را برگرداند. WebdriverIO مقادیر `value.sessionId` و `value.capabilities` را می‌خواند:

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

بدنهٔ JSON Wire Protocol رد می‌شود. آن بدنه `sessionId` و `status` را کنار `value` قرار می‌دهد و capabilityها را در خود `value` قرار می‌دهد:

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

در این صورت ایجاد نشست خطای `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` را پرتاب می‌کند. همین خطا وقتی `value.capabilities` وجود نداشته باشد نیز رخ می‌دهد، حتی اگر `value.sessionId` وجود داشته باشد.

یک شیء capability مسطح در پیکربندی شما همچنان معتبر است. WebdriverIO پیش از ارسال درخواست، `{ browserName: 'chrome' }` را در `alwaysMatch` قرار می‌دهد. کلیدهای دارای پیشوند فروشنده که با کلیدهای خارج از مجموعهٔ capability در W3C ترکیب شده‌اند همچنان رد می‌شوند. تنظیمات فروشنده را در `sauce:options`، `bstack:options`، `appium:options` یا یک کلید پیشونددار دیگر قرار دهید.

### پاسخ‌های دستورات

نتیجهٔ یک دستور `{ "value": … }` است. HTTP 200 بدون `error` در `value` به معنای موفقیت است. یک عنصر ناموجود HTTP 404 با `value.error` برابر `"no such element"` است که همچنان امکان جستجوی تنبل عنصر را فراهم می‌کند. یک `status` عددی در بدنه نادیده گرفته می‌شود، شامل `status: 0` و کد قدیمی `status: 7` ("no such element"). به‌جای آن شیء خطای W3C را ارسال کنید.

تایپ خطای export‌شدهٔ `JSONWPCommandError` اکنون `SessionRequestError` است.

### سرورها

درایورهایی که WebdriverIO با آن‌ها اجرا می‌شود از قبل در اتصال کلاینت به W3C صحبت می‌کنند:

- ChromeDriver از Chrome 75 به‌طور پیش‌فرض W3C بوده است. Edge مبتنی بر Chromium با آن مطابقت دارد. ChromeDriver فعلی همچنان `goog:chromeOptions.w3c: false` را می‌پذیرد که آن نشست را به پروتکل قدیمی برمی‌گرداند. WebdriverIO از این سوئیچ پشتیبانی نمی‌کند.
- geckodriver و safaridriver اپل فقط W3C هستند. پاسخ Safari که `platformName` یا `browserVersion` را حذف می‌کند همچنان W3C است.
- Selenium 4 و Grid 4 به W3C صحبت می‌کنند. Grid از نسخهٔ 4.9 ترجمهٔ JSON Wire Protocol را متوقف کرد.
- Appium 2، JSON Wire Protocol و Mobile JSON Wire Protocol را حذف کرد. Appium 3 همچنین شکل‌های پارامتر باقی‌مانده را حذف کرد. v10 به Appium 3 نیاز دارد که در ادامه پوشش داده شده است. یک نشست موبایل که `setWindowRect` را حذف می‌کند همچنان W3C است؛ آن capability به این معناست که دستگاه نمی‌تواند اندازهٔ پنجره را تغییر دهد.

این سرورها همچنان به JSON Wire Protocol صحبت می‌کنند و پشتیبانی نمی‌شوند: Selenium 3، PhantomJS، EdgeHTML (`--jwp`) و WinAppDriver با اتصال مستقیم. درایور Windows در Appium به‌عنوان یک کلاینت W3C پشتیبانی می‌شود. این درایور دستورات را به WinAppDriver ترجمه می‌کند، از جمله Get Element Property به endpoint مربوط به attribute. WebdriverIO را به Appium متصل کنید، نه به پورت WinAppDriver.

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) آن سرورها را با v10 کارآمد نمی‌کند. راه‌اندازی نشست همچنان به بدنهٔ W3C فوق نیاز دارد و نتایج دستورات همچنان `status` عددی را نادیده می‌گیرند. اگر آن سرور همچنان مورد نیاز است، روی WebdriverIO 9 بمانید.

`webdriver.remote.sessionid` دیگر یک نشست Selenium standalone را مشخص نمی‌کند. Selenium Grid 4 همچنان از طریق `se:cdp` تشخیص داده می‌شود.

کلید timeout `page load` در بخش [`setTimeout`](#settimeout) پوشش داده شده است. شناسه‌های عنصر در بخش [ارجاع‌های عنصر](#element-references) پوشش داده شده‌اند. در دسکتاپ، `[name="..."]` یک انتخابگر CSS است. استراتژی مکان‌یاب `name` برای نشست‌های موبایل باقی می‌ماند.

## Appium

WebdriverIO 10 به **Appium 3** و درایورهای رسمی فعلی (UiAutomator2، XCUITest، Espresso، Windows، Mac2 و غیره) نیاز دارد. Appium 1.x و 2.x پشتیبانی نمی‌شوند. اگر نمی‌توانید سرور را ارتقا دهید، روی WebdriverIO 9 بمانید.

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` یک peer اختیاری `appium` با نسخهٔ `>=3` اعلام می‌کند و از راه‌اندازی سرور قدیمی‌تر خودداری می‌کند. `create-wdio` وقتی Appium وجود نداشته باشد یا قدیمی‌تر از 3 باشد، `appium@^3` را نصب می‌کند.

فروشندگان ابری که همچنان Appium 2 ارائه می‌دهند به یک image با Appium 3 نیاز دارند، یا شما باید روی WebdriverIO 9 بمانید.

### دستورات موبایل دیگر به HTTP بازنمی‌گردند

در v9، بسیاری از کمک‌کننده‌های موبایل `browser.execute('mobile: …')` را امتحان می‌کردند و در صورت خطای متد ناشناخته، به یک endpoint حذف‌شدهٔ HTTP در Appium بازمی‌گشتند. در v10 این بازگشت حذف شده است: همان خطا به شما می‌گوید به Appium 3 ارتقا دهید. دستورات موبایل WebdriverIO (`browser.lock()`، `browser.shake()`، …) یا مستقیماً `browser.execute('mobile: …')` را ترجیح دهید.

### دستورات پروتکل حذف‌شده

Appium 3 [بسیاری از endpointهای منسوخ base-driver را حذف کرد](https://appium.io/docs/en/latest/guides/migrating-2-to-3/). WebdriverIO دیگر متدهای کلاینت را برای بیشتر آن مسیرها ارائه نمی‌دهد (برای مثال `appiumLock`، `touchPerform` و نگاشت Mobile JSON Wire Protocol). به‌جای آن از W3C Actions، دستور موبایل متناظر، یا یک متد execute با `mobile:` در درایور استفاده کنید.

### دامنهٔ `--allow-insecure` در Appium

Appium 3 برای قابلیت‌های `--allow-insecure` به پیشوند دامنهٔ درایور یا `*` نیاز دارد، برای مثال `uiautomator2:adb_shell` یا `*:adb_shell`.

### capabilityهای بدون پیشوند Appium دیگر نشست Appium را انتخاب نمی‌کنند

`automationName`، `deviceName` و `appiumVersion` بدون پیشوند `appium:` دیگر به WebdriverIO نمی‌گویند که درایور مرورگر را رد کند و سرویس Appium را متصل کند. از capability پیشونددار استفاده کنید یا آن را زیر `appium:options` قرار دهید:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` اکنون همان کلیدهای پیشونددار را تولید می‌کند، شامل `appium:app`، `appium:platformVersion` و `appium:udid`.

### `getValue` در موبایل ویژگی (property) عنصر را می‌خواند

`element.getValue()` در هر نشستی، از جمله Appium 3، Get Element Property را فراخوانی می‌کند. در یک نشست موبایل پیش‌تر Get Element Attribute را فراخوانی می‌کرد.

### امضای `stopRecordingScreen` هم‌راستا با `startRecordingScreen`

`driver.stopRecordingScreen` اکنون به‌جای ۴ آرگومان قبلی فقط یک آرگومان `options` می‌پذیرد که با `driver.startRecordingScreen` هم‌راستاست. آرگومان‌های جداگانه را داخل یک شیء قرار دهید:

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
| `runner.isMultiremote` (گزارشگرها) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`، `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`، `isParallelMultiRemote` |
| `isMultiremote` در `Workers.WorkerMessage`، `WorkerInstance` (`@wdio/local-runner`) و `SpecReporter#getTestLink()` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

`multiremote` و `Multiremote` را (با حساسیت به حروف بزرگ و کوچک) جستجو کنید و همهٔ تطابق‌ها را جایگزین کنید. گزارش‌های Allure نیز تست‌های multi-remote را به‌جای `isMultiremote` با `isMultiRemote` برچسب‌گذاری می‌کنند.

## نمایشگرهای مجازی در Linux

`@wdio/xvfb` با `@wdio/display-server` جایگزین شده است. testrunner به‌جای پوشاندن هر worker در `xvfb-run`، یک display server برای کل اجرا، پیش از هوک `onPrepare` هر سرویس، راه‌اندازی می‌کند. Weston را در حالت headless ترجیح می‌دهد و در غیر این صورت به Xvfb بازمی‌گردد. برای جزئیات، [Headless و Display Serverها](/docs/headless-and-display-servers) را ببینید.

گزینه‌ها تغییر نام داده‌اند. نام‌های قدیمی همچنان در v10 کار می‌کنند اما یک هشدار منسوخ‌شدن ثبت می‌کنند و در v11 حذف خواهند شد. اگر هر دو نام را تنظیم کنید، نام جدید اولویت دارد:

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

`xvfbMaxRetries` و `xvfbRetryDelay` هیچ اثری ندارند و آن‌ها نیز در v11 حذف خواهند شد. راه‌اندازی دیگر تکرار نمی‌شود: اگر Weston راه‌اندازی نشود، testrunner Xvfb را امتحان می‌کند و اگر هیچ‌کدام راه‌اندازی نشوند، اجرا بدون نمایشگر ادامه می‌یابد.

پیکربندی‌ای که یکی از چهار گزینهٔ تغییرنام‌یافته را بدون جایگزین آن تنظیم کند و `displayServer` را تنظیم نکند، مانند v9 همچنان از Xvfb استفاده می‌کند. مگر اینکه display server را خاموش کند، همچنین پیام `Preferring Xvfb, as v9 did, because the config sets v9 display keys` را ثبت می‌کند. پس از تغییر نام گزینه‌ها، برای حفظ Xvfb، `displayServer: 'xvfb'` را اضافه کنید یا برای ترجیح Weston آن را حذف کنید. در حالت خودکار، یک دستور نصب سفارشی ابتدا برای Weston اجرا می‌شود و فقط اگر Weston همچنان در دسترس نباشد یا راه‌اندازی نشود و Xvfb همچنان وجود نداشته باشد، دوباره برای Xvfb اجرا می‌شود؛ بنابراین `displayServer` را روی سروری که نصب می‌کند تنظیم کنید تا از تلاش برای سرور دیگر صرف‌نظر شود.

نصب خودکار دیگر از `yum` که v9 روی میزبان‌های بدون `dnf` استفاده می‌کرد پشتیبانی نمی‌کند. v10 فقط `apt-get`، `dnf`، `zypper`، `pacman`، `apk` و `xbps-install` را تشخیص می‌دهد، بنابراین روی میزبانی که فقط `yum` دارد، Xvfb را خودتان نصب کنید.

یک آرایهٔ `xvfbAutoInstallCommand` در v9 از طریق یک shell اجرا می‌شد، بنابراین عناصری مانند `&&` یا `VAR=value` کار می‌کردند. آرایه‌ها اکنون تحت هر دو نام گزینه بدون shell اجرا می‌شوند، پس برای نحو shell از یک رشته استفاده کنید.

سایر تغییراتی که ممکن است متوجه شوید:

- همهٔ workerها یک نمایشگر را به اشتراک می‌گذارند. در v9، هر worker نمایشگر مخصوص خود را داشت. صفحات Chrome و Edge اکنون ممکن است فوکوس نداشته باشند، [فوکوس پنجره](/docs/headless-and-display-servers#window-focus) را ببینید.
- شمارهٔ نمایشگر Xvfb ثابت نیست. به‌جای فرض `:99`، آن را از `DISPLAY` بخوانید.
- میزبانی که فقط `WAYLAND_DISPLAY` در آن تنظیم شده است اکنون دارای نمایشگر محسوب می‌شود. v9 در آنجا workerها را تحت Xvfb اجرا می‌کرد، زیرا `DISPLAY` تنظیم نشده بود. v10 چیزی راه‌اندازی نمی‌کند، پنجره‌های مرورگر را روی compositor شما باز می‌کند و `XDG_SESSION_TYPE`، `GDK_BACKEND` و `ELECTRON_OZONE_PLATFORM_HINT` را برای اجرا روی `wayland` تنظیم می‌کند. برای اجرای آن‌ها مانند قبل تحت Xvfb، `WAYLAND_DISPLAY` را حذف کنید و `displayServer: 'xvfb'` را تنظیم کنید.
- صفحهٔ پیش‌فرض 1920x1080 است. v9 از پیش‌فرض `xvfb-run` استفاده می‌کرد که در Debian و Ubuntu برابر 1280x1024 و در Fedora، RHEL و Arch برابر 640x480 است. برای حفظ اندازه‌ای که baselineهای شما استفاده می‌کنند، `displayServerWidth` و `displayServerHeight` را روی آن تنظیم کنید.
- مرورگرها Wayland یا X11 را از `XDG_SESSION_TYPE` که display server تنظیم می‌کند انتخاب می‌کنند. تحت Weston، WebdriverIO همچنین `--ozone-platform=wayland` را به Chrome و Edge که راه‌اندازی می‌کند اضافه می‌کند، زیرا Chrome و Edge پیش از 140 (Chrome for Testing پیش از 135) `XDG_SESSION_TYPE` را نادیده می‌گیرند. Weston هیچ `DISPLAY` فراهم نمی‌کند، بنابراین اگر تست‌ها یا ابزارهای شما به X11 نیاز دارند، `displayServer: 'xvfb'` را تنظیم کنید.
- اگر مستقیماً از `XvfbManager` یا نمونهٔ `xvfb` از `@wdio/xvfb` استفاده می‌کردید، به‌جای آن از `DisplayServerManager` از `@wdio/display-server` استفاده کنید. جایی که `xvfb.init()` را اجرا می‌کردید و دستورات را در `xvfb-run` می‌پوشاندید، یا فرایندها را از طریق `ProcessFactory` ایجاد می‌کردید، یک نمایشگر راه‌اندازی کنید و محیط آن را به فرایندهایی که به آن نیاز دارند ارسال کنید. مثال از Xvfb با 1280x1024 استفاده می‌کند، همان‌طور که v9 در Debian و Ubuntu انجام می‌داد. روی میزبانی که فقط `WAYLAND_DISPLAY` تنظیم شده است، ابتدا آن را حذف کنید، وگرنه `startDaemon()` چیزی راه‌اندازی نمی‌کند:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // startDaemon() همچنین وقتی یک نمایشگر از قبل وجود دارد null برمی‌گرداند
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

## شبیه‌سازی (Emulation)

`browser.emulate()` ماژول emulation در WebDriver BiDi را برای browsing context سطح بالای فعلی به کار می‌گیرد. v9 یک اسکریپت preload تزریق می‌کرد که `navigator.geolocation.getCurrentPosition`، `navigator.userAgent`، `window.matchMedia` و `navigator.onLine` را وصله (patch) می‌کرد. آن اسکریپت‌ها حذف شده‌اند. `browser.emulate('clock', …)` همچنان تایمرهای جعلی را در صفحهٔ فعلی و در صفحاتی که پس از آن باز می‌شوند نصب می‌کند.

برای دامنه‌های BiDi دیگر بارگذاری مجدد لازم نیست.

```diff
  await browser.emulate('onLine', false)
- // فقط `navigator.onLine` تغییر می‌کرد؛ ترافیک همچنان جریان داشت
+ // browsing context آفلاین است، شامل fetch، WebSocket و WebTransport
```

- `onLine: false`، `emulation.setNetworkConditions` را با `{ type: 'offline' }` فراخوانی می‌کند. `true` و بازگرداندن دامنه آن را پاک می‌کنند. توان عملیاتی و تأخیر همچنان روی `browser.throttleNetwork()` باقی می‌مانند.
- `colorScheme` ویژگی رسانه‌ای `prefers-color-scheme` را تنظیم می‌کند، بنابراین `@media (prefers-color-scheme)` در CSS از `matchMedia` پیروی می‌کند.
- `userAgent` بازنویسی user-agent مرورگر است، نه یک ویژگی وصله‌شدهٔ `navigator.userAgent`.
- `geolocation` از پشتهٔ geolocation مرورگر استفاده می‌کند. یک صفحه ممکن است همچنان به `browser.setPermissions({ name: 'geolocation' }, 'granted')` نیاز داشته باشد. `{ error: 'positionUnavailable' }` به‌جای مختصات آن خطا را گزارش می‌کند.
- `colorScheme` و `media` یک نگاشت ویژگی رسانه‌ای مشترک دارند. فراخوانی بعدی کل نگاشت را جایگزین می‌کند و بازگرداندن هر کدام از دامنه‌ها آن را پاک می‌کند.
- `device`، user agent، viewport، لمس، چیدمان متن موبایل و viewport meta را از توصیف‌گر دستگاه تنظیم می‌کند. `screen` یا `orientation` را تغییر نمی‌دهد.

دامنه‌های جدید عبارت‌اند از `media`، `locale`، `timezone`، `touch`، `orientation`، `screen`، `viewportMeta`، `textLayout`، `scripting`، `scrollbar` و `forcedColors`. مرورگری که یک دستور را پیاده‌سازی نکرده باشد، فراخوانی را با خطای خود (`unknown command` یا `unsupported operation`) رد می‌کند. WebdriverIO به یک اسکریپت preload یا CDP بازنمی‌گردد. اگر `device` در میانهٔ کار رد شود، user agent، viewport، لمس، چیدمان متن و viewport meta قبلی بازگردانده می‌شوند.

`wdio session emulate` همان دامنه‌ها را می‌پذیرد. دیگر برای بازنویسی‌ای که بلافاصله اعمال می‌شود از شما نمی‌خواهد صفحه را دوباره بارگذاری کنید. پیش‌تنظیم‌های `emulate network` و `emulate cpu` تغییری نکرده‌اند و همچنان فقط مخصوص Chromium هستند. [شبیه‌سازی](/docs/emulation) را ببینید.

## گام‌های بعدی

- [مهارت مهاجرت](#migrate-with-a-coding-agent) را در پروژه کپی کنید و از یک عامل بخواهید آن را اعمال کند.
- [WebdriverIO برای عامل‌های کدنویسی](/docs/ai-agents) برای نوشتن تست‌های جدید v10.
- [Headless و Display Serverها](/docs/headless-and-display-servers) وقتی مجموعهٔ تست روی Linux اجرا می‌شود.