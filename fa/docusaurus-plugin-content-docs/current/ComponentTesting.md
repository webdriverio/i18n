---
id: component-testing
title: تست کامپوننت
description: "اجرای تست‌های واحد و کامپوننت در مرورگرهای واقعی با استفاده از اجراکننده مرورگر WebdriverIO مبتنی بر Vite، شامل راه‌اندازی، ابزار تست و اشکال‌زدایی."
---

با [اجراکننده مرورگر](/docs/runner#browser-runner) WebdriverIO می‌توانید تست‌ها را درون یک مرورگر واقعی دسکتاپ یا موبایل اجرا کنید، در حالی که از WebdriverIO و پروتکل WebDriver برای خودکارسازی و تعامل با آنچه روی صفحه رندر می‌شود استفاده می‌کنید. این رویکرد در مقایسه با سایر فریم‌ورک‌های تست که فقط امکان تست در برابر [JSDOM](https://www.npmjs.com/package/jsdom) را فراهم می‌کنند، [مزایای زیادی](/docs/runner#browser-runner) دارد.

## پشتیبانی مرورگر

اجراکننده مرورگر، بسته تست (test bundle) را در مرورگر اجرا می‌کند. این بسته در Chrome 90، Edge 90، Firefox 90 و Safari 14.1 و نسخه‌های بعدی این مرورگرها اجرا می‌شود.

تست‌های end-to-end در Node.js اجرا می‌شوند. اما کدی که به [`browser.execute`](/docs/api/browser/execute) ارسال می‌شود، در مرورگر خودکارسازی‌شده اجرا می‌شود که ممکن است قدیمی‌تر از نسخه‌های بالا باشد. این کد را در سطح ES2021 نگه دارید.

## چگونه کار می‌کند؟

اجراکننده مرورگر از [Vite](https://vitejs.dev/) برای رندر کردن یک صفحه تست و مقداردهی اولیه یک فریم‌ورک تست جهت اجرای تست‌های شما در مرورگر استفاده می‌کند. در حال حاضر فقط از Mocha پشتیبانی می‌کند، اما Jasmine و Cucumber [در نقشه راه](https://github.com/orgs/webdriverio/projects/1) قرار دارند. این امکان را فراهم می‌کند که هر نوع کامپوننتی را حتی برای پروژه‌هایی که از Vite استفاده نمی‌کنند تست کنید.

سرور Vite توسط اجراکننده تست WebdriverIO راه‌اندازی می‌شود و به گونه‌ای پیکربندی شده است که بتوانید تمام گزارش‌دهنده‌ها و سرویس‌ها را همانند تست‌های e2e معمولی استفاده کنید. علاوه بر این، یک نمونه [`browser`](/docs/api/browser) را مقداردهی اولیه می‌کند که به شما امکان دسترسی به زیرمجموعه‌ای از [API WebdriverIO](/docs/api) را برای تعامل با هر عنصری روی صفحه می‌دهد. مشابه تست‌های e2e، می‌توانید از طریق متغیر `browser` که به دامنه سراسری متصل است، یا با import کردن آن از `@wdio/globals` (بسته به نحوه تنظیم [`injectGlobals`](/docs/api/globals)) به این نمونه دسترسی داشته باشید.

WebdriverIO پشتیبانی داخلی از فریم‌ورک‌های زیر دارد:

- [__Nuxt__](https://nuxt.com/): اجراکننده تست WebdriverIO یک برنامه Nuxt را تشخیص می‌دهد و به طور خودکار composableهای پروژه شما را راه‌اندازی می‌کند و به mock کردن بک‌اند Nuxt کمک می‌کند. در [مستندات Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt) بیشتر بخوانید
- [__TailwindCSS__](https://tailwindcss.com/): اجراکننده تست WebdriverIO تشخیص می‌دهد که آیا از TailwindCSS استفاده می‌کنید و محیط را به درستی در صفحه تست بارگذاری می‌کند

## راه‌اندازی

برای راه‌اندازی WebdriverIO جهت تست واحد یا کامپوننت در مرورگر، یک پروژه جدید WebdriverIO را از طریق دستور زیر ایجاد کنید:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

پس از شروع ویزارد پیکربندی، گزینه `browser` را برای اجرای تست واحد و کامپوننت انتخاب کنید و در صورت تمایل یکی از پیش‌تنظیم‌ها را برگزینید؛ در غیر این صورت اگر فقط می‌خواهید تست‌های واحد پایه را اجرا کنید، گزینه _"Other"_ را انتخاب کنید. اگر از قبل در پروژه خود از Vite استفاده می‌کنید، می‌توانید یک پیکربندی سفارشی Vite نیز تنظیم کنید. برای اطلاعات بیشتر، تمام [گزینه‌های اجراکننده](/docs/runner#runner-options) را بررسی کنید.

:::info

__نکته:__ WebdriverIO به طور پیش‌فرض تست‌های مرورگر را در CI به صورت headless اجرا می‌کند، برای مثال زمانی که متغیر محیطی `CI` روی `'1'` یا `'true'` تنظیم شده باشد. می‌توانید این رفتار را به صورت دستی با استفاده از گزینه [`headless`](/docs/runner#headless) برای اجراکننده پیکربندی کنید.

:::

در پایان این فرآیند باید یک فایل `wdio.conf.js` پیدا کنید که شامل پیکربندی‌های مختلف WebdriverIO، از جمله یک ویژگی `runner` است، برای مثال:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

با تعریف [capabilities](/docs/configuration#capabilities) مختلف می‌توانید تست‌های خود را در مرورگرهای مختلف، و در صورت تمایل به صورت موازی، اجرا کنید.

اگر هنوز مطمئن نیستید که همه چیز چگونه کار می‌کند، آموزش زیر درباره شروع کار با تست کامپوننت در WebdriverIO را تماشا کنید:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## ابزار تست (Test Harness)

اینکه چه چیزی را در تست‌های خود اجرا کنید و چگونه کامپوننت‌ها را رندر کنید کاملاً به شما بستگی دارد. با این حال توصیه می‌کنیم از [Testing Library](https://testing-library.com/) به عنوان فریم‌ورک کمکی استفاده کنید، زیرا پلاگین‌هایی برای فریم‌ورک‌های کامپوننت مختلف مانند React، Preact، Svelte و Vue ارائه می‌دهد. این ابزار برای رندر کردن کامپوننت‌ها در صفحه تست بسیار مفید است و به طور خودکار این کامپوننت‌ها را پس از هر تست پاک‌سازی می‌کند.

می‌توانید به دلخواه primitiveهای Testing Library را با دستورات WebdriverIO ترکیب کنید، برای مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__نکته:__ استفاده از متدهای render در Testing Library به حذف کامپوننت‌های ایجادشده بین تست‌ها کمک می‌کند. اگر از Testing Library استفاده نمی‌کنید، اطمینان حاصل کنید که کامپوننت‌های تست خود را به یک container متصل می‌کنید که بین تست‌ها پاک‌سازی می‌شود.

## اسکریپت‌های راه‌اندازی

می‌توانید تست‌های خود را با اجرای اسکریپت‌های دلخواه در Node.js یا در مرورگر آماده کنید، برای مثال تزریق استایل‌ها، mock کردن APIهای مرورگر یا اتصال به یک سرویس شخص ثالث. از [hookهای](/docs/configuration#hooks) WebdriverIO می‌توان برای اجرای کد در Node.js استفاده کرد، در حالی که [`mochaOpts.require`](/docs/frameworks#require) به شما امکان می‌دهد اسکریپت‌ها را پیش از بارگذاری تست‌ها در مرورگر import کنید، برای مثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // یک اسکریپت راه‌اندازی برای اجرا در مرورگر فراهم کنید
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // راه‌اندازی محیط تست در Node.js
    }
    // ...
}
```

برای مثال، اگر بخواهید تمام فراخوانی‌های [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) را در تست خود با اسکریپت راه‌اندازی زیر mock کنید:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// اجرای کد پیش از بارگذاری تمام تست‌ها
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // اجرای کد پس از بارگذاری فایل تست
}

export const mochaGlobalTeardown = () => {
    // اجرای کد پس از اجرای فایل spec
}

```

اکنون در تست‌های خود می‌توانید مقادیر پاسخ سفارشی برای تمام درخواست‌های مرورگر ارائه دهید. درباره fixtureهای سراسری در [مستندات Mocha](https://mochajs.org/#global-fixtures) بیشتر بخوانید.

## نظارت بر فایل‌های تست و برنامه

روش‌های متعددی برای اشکال‌زدایی تست‌های مرورگر وجود دارد. ساده‌ترین روش، شروع اجراکننده تست WebdriverIO با فلگ `--watch` است، برای مثال:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

این دستور در ابتدا تمام تست‌ها را اجرا می‌کند و پس از اجرای همه آن‌ها متوقف می‌شود. سپس می‌توانید فایل‌های جداگانه را تغییر دهید که در این صورت به صورت جداگانه دوباره اجرا می‌شوند. اگر [`filesToWatch`](/docs/configuration#filestowatch) را طوری تنظیم کنید که به فایل‌های برنامه شما اشاره کند، با ایجاد تغییرات در برنامه، تمام تست‌ها دوباره اجرا می‌شوند.

## اشکال‌زدایی

در حالی که (هنوز) امکان تنظیم breakpoint در IDE و شناسایی آن توسط مرورگر راه دور وجود ندارد، می‌توانید از دستور [`debug`](/docs/api/browser/debug) برای متوقف کردن تست در هر نقطه‌ای استفاده کنید. این کار به شما امکان می‌دهد DevTools را باز کنید و سپس با تنظیم breakpoint در [تب sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) تست را اشکال‌زدایی کنید.

هنگامی که دستور `debug` فراخوانی می‌شود، یک رابط repl در Node.js نیز در ترمینال خود دریافت خواهید کرد که می‌گوید:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

برای ادامه تست، کلید `Ctrl` یا `Command` + `c` را فشار دهید یا `.exit` را وارد کنید.

## اجرا با استفاده از Selenium Grid

اگر یک [Selenium Grid](https://www.selenium.dev/documentation/grid/) راه‌اندازی کرده‌اید و مرورگر خود را از طریق آن grid اجرا می‌کنید، باید گزینه `host` اجراکننده مرورگر را تنظیم کنید تا مرورگر بتواند به host صحیحی که فایل‌های تست در آن ارائه می‌شوند دسترسی پیدا کند، برای مثال:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP شبکه ماشینی که فرآیند WebdriverIO را اجرا می‌کند
        host: 'http://172.168.0.2'
    }]
}
```

این کار تضمین می‌کند که مرورگر به درستی نمونه سرور صحیحی را باز کند که روی ماشینی که تست‌های WebdriverIO را اجرا می‌کند میزبانی می‌شود.

## مثال‌ها

می‌توانید مثال‌های مختلفی برای تست کامپوننت‌ها با استفاده از فریم‌ورک‌های کامپوننت محبوب را در [مخزن مثال‌های](https://github.com/webdriverio/component-testing-examples) ما پیدا کنید.