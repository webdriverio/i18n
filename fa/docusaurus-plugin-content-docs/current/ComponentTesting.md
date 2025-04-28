---
id: component-testing
title: تست کامپوننت
---

با [Browser Runner](/docs/runner#browser-runner) وب‌درایور آی‌او، شما می‌توانید تست‌ها را در یک مرورگر دسکتاپ یا موبایل واقعی اجرا کنید، درحالی که از WebdriverIO و پروتکل WebDriver برای اتوماسیون و تعامل با آنچه در صفحه رندر می‌شود، استفاده می‌کنید. این رویکرد [مزایای زیادی](/docs/runner#browser-runner) در مقایسه با سایر چارچوب‌های تست دارد که فقط اجازه تست در برابر [JSDOM](https://www.npmjs.com/package/jsdom) را می‌دهند.

## چگونه کار می‌کند؟

Browser Runner از [Vite](https://vitejs.dev/) برای رندر یک صفحه تست و راه‌اندازی یک چارچوب تست برای اجرای تست‌های شما در مرورگر استفاده می‌کند. در حال حاضر فقط از Mocha پشتیبانی می‌کند اما Jasmine و Cucumber در [نقشه راه](https://github.com/orgs/webdriverio/projects/1) قرار دارند. این امکان تست هر نوع کامپوننتی را فراهم می‌کند، حتی برای پروژه‌هایی که از Vite استفاده نمی‌کنند.

سرور Vite توسط testrunner وب‌درایور آی‌او شروع می‌شود و به گونه‌ای پیکربندی می‌شود که شما بتوانید از تمام گزارش‌دهنده‌ها و سرویس‌ها همانطور که برای تست‌های e2e معمولی استفاده می‌کردید، استفاده کنید. علاوه بر این، یک نمونه [`browser`](/docs/api/browser) را راه‌اندازی می‌کند که به شما امکان دسترسی به زیرمجموعه‌ای از [WebdriverIO API](/docs/api) را برای تعامل با هر عنصر در صفحه می‌دهد. مشابه تست‌های e2e، می‌توانید به آن نمونه از طریق متغیر `browser` متصل به فضای نام جهانی یا با وارد کردن آن از `@wdio/globals` بسته به نحوه تنظیم [`injectGlobals`](/docs/api/globals) دسترسی پیدا کنید.

WebdriverIO از چارچوب‌های زیر به صورت داخلی پشتیبانی می‌کند:

- [__Nuxt__](https://nuxt.com/): testrunner وب‌درایور آی‌او یک برنامه Nuxt را تشخیص می‌دهد و به طور خودکار composables پروژه شما را راه‌اندازی می‌کند و به شبیه‌سازی بک‌اند Nuxt کمک می‌کند. برای اطلاعات بیشتر در [مستندات Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt) مطالعه کنید
- [__TailwindCSS__](https://tailwindcss.com/): testrunner وب‌درایور آی‌او تشخیص می‌دهد که آیا از TailwindCSS استفاده می‌کنید و محیط را به درستی در صفحه تست بارگذاری می‌کند

## راه‌اندازی

برای راه‌اندازی WebdriverIO برای تست واحد یا کامپوننت در مرورگر، یک پروژه جدید WebdriverIO را از طریق دستور زیر آغاز کنید:

```bash
npm init wdio@latest ./
# یا
yarn create wdio ./
```

هنگامی که ویزارد پیکربندی شروع می‌شود، گزینه `browser` را برای اجرای تست واحد و کامپوننت انتخاب کنید و یکی از پیش‌تنظیمات را در صورت تمایل انتخاب کنید، در غیر این صورت اگر فقط می‌خواهید تست‌های واحد پایه را اجرا کنید، گزینه _"Other"_ را انتخاب کنید. همچنین می‌توانید یک پیکربندی سفارشی Vite را پیکربندی کنید اگر از Vite در پروژه خود استفاده می‌کنید. برای اطلاعات بیشتر، تمام [گزینه‌های runner](/docs/runner#runner-options) را بررسی کنید.

:::info

__نکته:__ WebdriverIO به طور پیش‌فرض تست‌های مرورگر را در CI به صورت headless اجرا می‌کند، به عنوان مثال، متغیر محیطی `CI` روی `'1'` یا `'true'` تنظیم شده است. شما می‌توانید این رفتار را با استفاده از گزینه [`headless`](/docs/runner#headless) برای runner به صورت دستی پیکربندی کنید.

:::

در پایان این فرآیند، باید یک `wdio.conf.js` را پیدا کنید که شامل پیکربندی‌های مختلف WebdriverIO است، از جمله یک ویژگی `runner`، به عنوان مثال:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

با تعریف [قابلیت‌های](/docs/configuration#capabilities) مختلف، می‌توانید تست‌های خود را در مرورگرهای مختلف، در صورت تمایل به صورت موازی اجرا کنید.

اگر هنوز مطمئن نیستید که همه چیز چگونه کار می‌کند، آموزش زیر را تماشا کنید تا با تست کامپوننت در WebdriverIO شروع کنید:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

کاملاً به شما بستگی دارد که چه چیزی را در تست‌های خود اجرا کنید و چگونه می‌خواهید کامپوننت‌ها را رندر کنید. با این حال، ما توصیه می‌کنیم از [Testing Library](https://testing-library.com/) به عنوان چارچوب ابزار استفاده کنید، زیرا افزونه‌هایی برای چارچوب‌های مختلف کامپوننت مانند React، Preact، Svelte و Vue ارائه می‌دهد. این برای رندر کردن کامپوننت‌ها در صفحه تست بسیار مفید است و به طور خودکار این کامپوننت‌ها را پس از هر تست پاک می‌کند.

شما می‌توانید اولیه‌های Testing Library را با دستورات WebdriverIO به دلخواه ترکیب کنید، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__نکته:__ استفاده از متدهای render از Testing Library به حذف کامپوننت‌های ایجاد شده بین تست‌ها کمک می‌کند. اگر از Testing Library استفاده نمی‌کنید، اطمینان حاصل کنید که کامپوننت‌های تست خود را به یک کانتینر متصل می‌کنید که بین تست‌ها پاک می‌شود.

## اسکریپت‌های راه‌اندازی

شما می‌توانید تست‌های خود را با اجرای اسکریپت‌های دلخواه در Node.js یا در مرورگر راه‌اندازی کنید، مثلاً تزریق استایل‌ها، شبیه‌سازی APIهای مرورگر یا اتصال به یک سرویس شخص ثالث. از [هوک‌های](/docs/configuration#hooks) WebdriverIO می‌توان برای اجرای کد در Node.js استفاده کرد، در حالی که [`mochaOpts.require`](/docs/frameworks#require) به شما امکان می‌دهد اسکریپت‌ها را قبل از بارگذاری تست‌ها به مرورگر وارد کنید، به عنوان مثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ارائه یک اسکریپت راه‌اندازی برای اجرا در مرورگر
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // راه‌اندازی محیط تست در Node.js
    }
    // ...
}
```

به عنوان مثال، اگر می‌خواهید تمام فراخوانی‌های [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) را در تست خود با اسکریپت راه‌اندازی زیر شبیه‌سازی کنید:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// اجرای کد قبل از بارگذاری همه تست‌ها
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // اجرای کد پس از بارگذاری فایل تست
}

export const mochaGlobalTeardown = () => {
    // اجرای کد پس از اجرای فایل تست
}

```

اکنون در تست‌های خود می‌توانید مقادیر پاسخ سفارشی برای تمام درخواست‌های مرورگر ارائه دهید. در مورد فیکسچرهای جهانی در [مستندات Mocha](https://mochajs.org/#global-fixtures) بیشتر بخوانید.

## مشاهده فایل‌های تست و برنامه

روش‌های متعددی برای اشکال‌زدایی تست‌های مرورگر خود وجود دارد. ساده‌ترین روش، شروع testrunner WebdriverIO با پرچم `--watch` است، به عنوان مثال:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

این ابتدا تمام تست‌ها را اجرا می‌کند و پس از اجرای همه آن‌ها متوقف می‌شود. سپس می‌توانید تغییراتی در فایل‌های مختلف ایجاد کنید که سپس به صورت جداگانه مجدداً اجرا می‌شوند. اگر [`filesToWatch`](/docs/configuration#filestowatch) را که به فایل‌های برنامه شما اشاره می‌کند تنظیم کنید، هنگامی که تغییراتی در برنامه شما ایجاد می‌شود، همه تست‌ها مجدداً اجرا می‌شوند.

## اشکال‌زدایی

در حالی که (هنوز) امکان تنظیم نقاط توقف در IDE شما و شناسایی آن‌ها توسط مرورگر از راه دور وجود ندارد، می‌توانید از دستور [`debug`](/docs/api/browser/debug) برای توقف تست در هر نقطه استفاده کنید. این به شما امکان می‌دهد DevTools را باز کنید تا با تنظیم نقاط توقف در [تب منابع](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) تست را اشکال‌زدایی کنید.

هنگامی که دستور `debug` فراخوانی می‌شود، یک رابط repl Node.js نیز در ترمینال شما دریافت خواهید کرد که می‌گوید:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

برای ادامه تست، `Ctrl` یا `Command` + `c` را فشار دهید یا `.exit` را وارد کنید.

## اجرا با استفاده از Selenium Grid

اگر یک [Selenium Grid](https://www.selenium.dev/documentation/grid/) راه‌اندازی کرده‌اید و مرورگر خود را از طریق آن شبکه اجرا می‌کنید، باید گزینه `host` browser runner را تنظیم کنید تا به مرورگر اجازه دهد به میزبان صحیح که فایل‌های تست در آن ارائه می‌شوند، دسترسی پیدا کند، به عنوان مثال:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // آدرس IP شبکه دستگاهی که فرآیند WebdriverIO را اجرا می‌کند
        host: 'http://172.168.0.2'
    }]
}
```

این اطمینان حاصل می‌کند که مرورگر به درستی نمونه سرور صحیح میزبانی شده روی نمونه‌ای که تست‌های WebdriverIO را اجرا می‌کند، باز می‌کند.

## نمونه‌ها

شما می‌توانید نمونه‌های مختلفی برای تست کامپوننت‌ها با استفاده از چارچوب‌های کامپوننت محبوب در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples) ما پیدا کنید.