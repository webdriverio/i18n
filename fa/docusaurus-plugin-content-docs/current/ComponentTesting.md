---
id: component-testing
title: تست کامپوننت
---

با [Browser Runner](/docs/runner#browser-runner) وب‌درایور IO شما می‌توانید تست‌ها را درون یک مرورگر واقعی دسکتاپ یا موبایل اجرا کنید در حالی که از WebdriverIO و پروتکل WebDriver برای خودکارسازی و تعامل با آنچه در صفحه نمایش داده می‌شود استفاده می‌کنید. این رویکرد [مزایای بسیاری](/docs/runner#browser-runner) نسبت به چارچوب‌های تست دیگر دارد که فقط اجازه تست در برابر [JSDOM](https://www.npmjs.com/package/jsdom) را می‌دهند.

## این چگونه کار می‌کند؟

Browser Runner از [Vite](https://vitejs.dev/) برای رندر کردن یک صفحه تست و راه‌اندازی یک چارچوب تست برای اجرای تست‌های شما در مرورگر استفاده می‌کند. در حال حاضر فقط از Mocha پشتیبانی می‌کند اما Jasmine و Cucumber [در نقشه راه](https://github.com/orgs/webdriverio/projects/1) قرار دارند. این امکان تست هر نوع کامپوننت را حتی برای پروژه‌هایی که از Vite استفاده نمی‌کنند، فراهم می‌کند.

سرور Vite توسط testrunner وب‌درایور IO شروع می‌شود و طوری پیکربندی شده است که شما می‌توانید از تمام گزارش‌دهنده‌ها و سرویس‌ها همانطور که برای تست‌های e2e عادی استفاده می‌کردید، استفاده کنید. علاوه بر این، یک نمونه [`browser`](/docs/api/browser) را راه‌اندازی می‌کند که به شما امکان دسترسی به زیرمجموعه‌ای از [API وب‌درایور IO](/docs/api) را می‌دهد تا با هر عنصری در صفحه تعامل داشته باشید. مشابه تست‌های e2e، شما می‌توانید به آن نمونه از طریق متغیر `browser` متصل به دامنه جهانی یا با وارد کردن آن از `@wdio/globals` بسته به اینکه [`injectGlobals`](/docs/api/globals) چگونه تنظیم شده است، دسترسی داشته باشید.

WebdriverIO از چارچوب‌های زیر به صورت داخلی پشتیبانی می‌کند:

- [__Nuxt__](https://nuxt.com/): testrunner WebdriverIO یک برنامه Nuxt را تشخیص می‌دهد و به طور خودکار composable های پروژه شما را راه‌اندازی می‌کند و به شبیه‌سازی backend Nuxt کمک می‌کند، اطلاعات بیشتر را در [اسناد Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt) بخوانید
- [__TailwindCSS__](https://tailwindcss.com/): testrunner WebdriverIO تشخیص می‌دهد که آیا از TailwindCSS استفاده می‌کنید و محیط را به درستی در صفحه تست بارگذاری می‌کند

## راه‌اندازی

برای تنظیم WebdriverIO برای تست واحد یا کامپوننت در مرورگر، یک پروژه جدید WebdriverIO را از طریق زیر شروع کنید:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

هنگامی که ویزارد پیکربندی شروع می‌شود، `browser` را برای اجرای تست واحد و کامپوننت انتخاب کنید و یکی از پیش‌تنظیم‌ها را در صورت تمایل انتخاب کنید، در غیر این صورت با _"Other"_ ادامه دهید اگر فقط می‌خواهید تست‌های واحد پایه را اجرا کنید. همچنین می‌توانید یک پیکربندی سفارشی Vite را پیکربندی کنید اگر از Vite در پروژه خود استفاده می‌کنید. برای اطلاعات بیشتر تمام [گزینه‌های runner](/docs/runner#runner-options) را بررسی کنید.

:::info

__نکته:__ WebdriverIO به طور پیش‌فرض تست‌های مرورگر را در CI به صورت headless اجرا می‌کند، به عنوان مثال، یک متغیر محیطی `CI` روی `'1'` یا `'true'` تنظیم شده است. شما می‌توانید این رفتار را به صورت دستی با استفاده از گزینه [`headless`](/docs/runner#headless) برای runner پیکربندی کنید.

:::

در پایان این فرآیند باید یک `wdio.conf.js` پیدا کنید که شامل پیکربندی‌های مختلف WebdriverIO است، از جمله یک ویژگی `runner`، مثلاً:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

با تعریف [قابلیت‌های](/docs/configuration#capabilities) مختلف می‌توانید تست‌های خود را در مرورگرهای مختلف، به صورت موازی در صورت تمایل اجرا کنید.

اگر هنوز مطمئن نیستید که همه چیز چگونه کار می‌کند، آموزش زیر را در مورد چگونگی شروع با تست کامپوننت در WebdriverIO تماشا کنید:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## تست هارنس

کاملاً به شما بستگی دارد که چه چیزی را در تست‌های خود اجرا کنید و چگونه می‌خواهید کامپوننت‌ها را رندر کنید. با این حال، ما توصیه می‌کنیم از [Testing Library](https://testing-library.com/) به عنوان چارچوب ابزاری استفاده کنید زیرا افزونه‌هایی برای چارچوب‌های مختلف کامپوننت، مانند React، Preact، Svelte و Vue ارائه می‌دهد. این برای رندر کردن کامپوننت‌ها در صفحه تست بسیار مفید است و به طور خودکار این کامپوننت‌ها را پس از هر تست پاک می‌کند.

شما می‌توانید ابزارهای اولیه Testing Library را با دستورات WebdriverIO به صورت دلخواه ترکیب کنید، مثلاً:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__نکته:__ استفاده از متدهای رندر از Testing Library به حذف کامپوننت‌های ایجاد شده بین تست‌ها کمک می‌کند. اگر از Testing Library استفاده نمی‌کنید، اطمینان حاصل کنید که کامپوننت‌های تست خود را به یک کانتینر متصل می‌کنید که بین تست‌ها پاک می‌شود.

## اسکریپت‌های راه‌اندازی

شما می‌توانید تست‌های خود را با اجرای اسکریپت‌های دلخواه در Node.js یا در مرورگر راه‌اندازی کنید، مثلاً تزریق استایل‌ها، شبیه‌سازی APIهای مرورگر یا اتصال به یک سرویس شخص ثالث. [هوک‌های](/docs/configuration#hooks) WebdriverIO را می‌توان برای اجرای کد در Node.js استفاده کرد در حالی که [`mochaOpts.require`](/docs/frameworks#require) به شما امکان وارد کردن اسکریپت‌ها به مرورگر قبل از بارگذاری تست‌ها را می‌دهد، مثلاً:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // provide a setup script to run in the browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // set up test environment in Node.js
    }
    // ...
}
```

به عنوان مثال، اگر می‌خواهید تمام فراخوانی‌های [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) را در تست خود با اسکریپت راه‌اندازی زیر شبیه‌سازی کنید:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// run code before all tests are loaded
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // run code after test file is loaded
}

export const mochaGlobalTeardown = () => {
    // run code after spec file was executed
}

```

اکنون در تست‌های خود می‌توانید مقادیر پاسخ سفارشی برای تمام درخواست‌های مرورگر ارائه دهید. اطلاعات بیشتر در مورد فیکسچرهای جهانی را در [اسناد Mocha](https://mochajs.org/#global-fixtures) بخوانید.

## مشاهده فایل‌های تست و برنامه

روش‌های متعددی وجود دارد که چگونه می‌توانید تست‌های مرورگر خود را اشکال‌زدایی کنید. ساده‌ترین راه شروع testrunner WebdriverIO با پرچم `--watch` است، مثلاً:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

این در ابتدا تمام تست‌ها را اجرا می‌کند و پس از اجرای همه آنها متوقف می‌شود. سپس می‌توانید تغییراتی در فایل‌های مختلف ایجاد کنید که سپس به صورت جداگانه دوباره اجرا می‌شوند. اگر [`filesToWatch`](/docs/configuration#filestowatch) را تنظیم کرده‌اید که به فایل‌های برنامه شما اشاره می‌کند، هنگام ایجاد تغییرات در برنامه شما، تمام تست‌ها را مجدداً اجرا می‌کند.

## اشکال‌زدایی

در حالی که هنوز امکان تنظیم نقاط توقف در IDE شما و شناسایی آنها توسط مرورگر راه دور وجود ندارد، می‌توانید از دستور [`debug`](/docs/api/browser/debug) برای توقف تست در هر نقطه استفاده کنید. این به شما امکان می‌دهد DevTools را باز کنید تا سپس تست را با تنظیم نقاط توقف در [تب منابع](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) اشکال‌زدایی کنید.

هنگامی که دستور `debug` فراخوانی می‌شود، همچنین یک رابط repl Node.js در ترمینال خود دریافت خواهید کرد که می‌گوید:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

`Ctrl` یا `Command` + `c` را فشار دهید یا `.exit` را وارد کنید تا با تست ادامه دهید.

## اجرا با استفاده از یک Selenium Grid

اگر یک [Selenium Grid](https://www.selenium.dev/documentation/grid/) راه‌اندازی کرده‌اید و مرورگر خود را از طریق آن شبکه اجرا می‌کنید، باید گزینه `host` browser runner را تنظیم کنید تا به مرورگر اجازه دهد به میزبان صحیح که فایل‌های تست در آن ارائه می‌شوند، دسترسی پیدا کند، مثلاً:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // network IP of the machine that runs the WebdriverIO process
        host: 'http://172.168.0.2'
    }]
}
```

این اطمینان حاصل می‌کند که مرورگر به درستی نمونه سرور صحیح میزبانی شده در نمونه‌ای که تست‌های WebdriverIO را اجرا می‌کند، باز می‌کند.

## نمونه‌ها

شما می‌توانید نمونه‌های مختلفی برای تست کامپوننت‌ها با استفاده از چارچوب‌های محبوب کامپوننت در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples) ما پیدا کنید.