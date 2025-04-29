---
id: component-testing
title: تست کامپوننت
---

با [Browser Runner](/docs/runner#browser-runner) وب‌درایور IO، شما می‌توانید تست‌ها را در مرورگر واقعی دسکتاپ یا موبایل اجرا کنید، در حالی که از WebdriverIO و پروتکل WebDriver برای اتوماسیون و تعامل با آنچه در صفحه رندر می‌شود، استفاده می‌کنید. این رویکرد [مزایای بسیاری](/docs/runner#browser-runner) در مقایسه با چارچوب‌های تست دیگری که فقط امکان تست در برابر [JSDOM](https://www.npmjs.com/package/jsdom) را فراهم می‌کنند، دارد.

## چگونه کار می‌کند؟

Browser Runner از [Vite](https://vitejs.dev/) برای رندر صفحه تست و راه‌اندازی یک چارچوب تست برای اجرای تست‌های شما در مرورگر استفاده می‌کند. در حال حاضر فقط از Mocha پشتیبانی می‌کند اما Jasmine و Cucumber [در نقشه راه](https://github.com/orgs/webdriverio/projects/1) قرار دارند. این امکان تست هر نوع کامپوننت را حتی برای پروژه‌هایی که از Vite استفاده نمی‌کنند، فراهم می‌کند.

سرور Vite توسط testrunner وب‌درایور IO راه‌اندازی می‌شود و به گونه‌ای پیکربندی شده است که می‌توانید از تمام گزارش‌دهنده‌ها و سرویس‌ها مانند تست‌های معمولی e2e استفاده کنید. علاوه بر این، یک نمونه [`browser`](/docs/api/browser) را راه‌اندازی می‌کند که به شما امکان دسترسی به زیرمجموعه‌ای از [API وب‌درایور IO](/docs/api) برای تعامل با هر عنصر در صفحه را می‌دهد. مشابه تست‌های e2e، می‌توانید به آن نمونه از طریق متغیر `browser` متصل به دامنه جهانی یا با وارد کردن آن از `@wdio/globals` بسته به نحوه تنظیم [`injectGlobals`](/docs/api/globals) دسترسی پیدا کنید.

WebdriverIO دارای پشتیبانی داخلی برای چارچوب‌های زیر است:

- [__Nuxt__](https://nuxt.com/): testrunner وب‌درایور IO یک برنامه Nuxt را تشخیص می‌دهد و به طور خودکار composables پروژه شما را تنظیم می‌کند و به شبیه‌سازی backend Nuxt کمک می‌کند، اطلاعات بیشتر را در [مستندات Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt) بخوانید
- [__TailwindCSS__](https://tailwindcss.com/): testrunner وب‌درایور IO تشخیص می‌دهد که آیا از TailwindCSS استفاده می‌کنید و محیط را به درستی در صفحه تست بارگذاری می‌کند

## راه‌اندازی

برای تنظیم WebdriverIO برای تست واحد یا کامپوننت در مرورگر، یک پروژه جدید WebdriverIO را از طریق زیر ایجاد کنید:

```bash
npm init wdio@latest ./
# یا
yarn create wdio ./
```

پس از شروع ویزارد پیکربندی، `browser` را برای اجرای تست واحد و کامپوننت انتخاب کنید و یکی از پیش‌تنظیمات را انتخاب کنید یا اگر تمایل دارید فقط تست‌های واحد پایه را اجرا کنید، گزینه _"Other"_ را انتخاب کنید. همچنین می‌توانید یک پیکربندی سفارشی Vite را در صورتی که قبلاً از Vite در پروژه خود استفاده می‌کنید، پیکربندی کنید. برای اطلاعات بیشتر، تمام [گزینه‌های runner](/docs/runner#runner-options) را بررسی کنید.

:::info

__نکته:__ WebdriverIO به طور پیش‌فرض تست‌های مرورگر را در CI به صورت headless اجرا می‌کند، به عنوان مثال، یک متغیر محیطی `CI` به مقدار `'1'` یا `'true'` تنظیم شده است. می‌توانید این رفتار را با استفاده از گزینه [`headless`](/docs/runner#headless) برای runner به صورت دستی پیکربندی کنید.

:::

در پایان این فرآیند، باید یک `wdio.conf.js` پیدا کنید که شامل پیکربندی‌های مختلف WebdriverIO است، از جمله یک ویژگی `runner`، به عنوان مثال:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

با تعریف [قابلیت‌های](/docs/configuration#capabilities) مختلف، می‌توانید تست‌های خود را در مرورگرهای مختلف، به صورت موازی در صورت تمایل، اجرا کنید.

اگر هنوز مطمئن نیستید که همه چیز چگونه کار می‌کند، آموزش زیر را در مورد نحوه شروع با تست کامپوننت در WebdriverIO مشاهده کنید:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## ابزارک تست

کاملاً به شما بستگی دارد که چه چیزی را در تست‌های خود اجرا کنید و چگونه می‌خواهید کامپوننت‌ها را رندر کنید. با این حال، ما توصیه می‌کنیم از [Testing Library](https://testing-library.com/) به عنوان چارچوب ابزار استفاده کنید زیرا پلاگین‌هایی برای چارچوب‌های مختلف کامپوننت مانند React، Preact، Svelte و Vue ارائه می‌دهد. این برای رندر کردن کامپوننت‌ها در صفحه تست بسیار مفید است و به طور خودکار این کامپوننت‌ها را پس از هر تست پاک می‌کند.

می‌توانید هر طور که می‌خواهید، ابتدایی‌های Testing Library را با دستورات WebdriverIO ترکیب کنید، مثلاً:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__نکته:__ استفاده از متدهای رندر از Testing Library به حذف کامپوننت‌های ایجاد شده بین تست‌ها کمک می‌کند. اگر از Testing Library استفاده نمی‌کنید، مطمئن شوید که کامپوننت‌های تست خود را به یک کانتینر متصل کنید که بین تست‌ها پاک می‌شود.

## اسکریپت‌های راه‌اندازی

می‌توانید تست‌های خود را با اجرای اسکریپت‌های دلخواه در Node.js یا در مرورگر تنظیم کنید، مثلاً تزریق استایل‌ها، شبیه‌سازی APIهای مرورگر یا اتصال به یک سرویس شخص ثالث. از [هوک‌های](/docs/configuration#hooks) WebdriverIO می‌توان برای اجرای کد در Node.js استفاده کرد در حالی که [`mochaOpts.require`](/docs/frameworks#require) به شما امکان وارد کردن اسکریپت‌ها به مرورگر قبل از بارگذاری تست‌ها را می‌دهد، به عنوان مثال:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // ارائه یک اسکریپت راه‌اندازی برای اجرا در مرورگر
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // تنظیم محیط تست در Node.js
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
    // اجرای کد پس از اجرای فایل مشخصات
}

```

اکنون در تست‌های خود می‌توانید مقادیر پاسخ سفارشی برای تمام درخواست‌های مرورگر ارائه دهید. اطلاعات بیشتر در مورد فیکسچرهای جهانی را در [مستندات Mocha](https://mochajs.org/#global-fixtures) بخوانید.

## مشاهده فایل‌های تست و برنامه

روش‌های متعددی برای اشکال‌زدایی تست‌های مرورگر خود وجود دارد. ساده‌ترین راه، شروع testrunner WebdriverIO با پرچم `--watch` است، مثلاً:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

این ابتدا تمام تست‌ها را اجرا می‌کند و پس از اجرای همه آنها متوقف می‌شود. سپس می‌توانید تغییراتی در فایل‌های فردی ایجاد کنید که سپس به صورت جداگانه دوباره اجرا خواهند شد. اگر [`filesToWatch`](/docs/configuration#filestowatch) را تنظیم کرده باشید که به فایل‌های برنامه شما اشاره می‌کند، هنگام ایجاد تغییرات در برنامه شما، تمام تست‌ها را مجدداً اجرا می‌کند.

## اشکال‌زدایی

در حالی که (هنوز) امکان تعیین نقاط توقف در IDE شما و شناسایی آنها توسط مرورگر از راه دور وجود ندارد، می‌توانید از دستور [`debug`](/docs/api/browser/debug) برای توقف تست در هر نقطه استفاده کنید. این به شما امکان می‌دهد DevTools را باز کنید تا سپس با تعیین نقاط توقف در [تب منابع](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) تست را اشکال‌زدایی کنید.

زمانی که دستور `debug` فراخوانی می‌شود، همچنین یک رابط repl Node.js در ترمینال خود دریافت خواهید کرد که می‌گوید:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

دکمه `Ctrl` یا `Command` + `c` را فشار دهید یا `.exit` را وارد کنید تا به تست ادامه دهید.

## اجرا با استفاده از Selenium Grid

اگر یک [Selenium Grid](https://www.selenium.dev/documentation/grid/) راه‌اندازی کرده‌اید و مرورگر خود را از طریق آن گرید اجرا می‌کنید، باید گزینه `host` browser runner را تنظیم کنید تا به مرورگر اجازه دهد به میزبان صحیحی که فایل‌های تست در آنجا قرار دارند، دسترسی داشته باشد، مثلاً:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // آدرس IP شبکه دستگاهی که فرآیند WebdriverIO را اجرا می‌کند
        host: 'http://172.168.0.2'
    }]
}
```

این اطمینان حاصل می‌کند که مرورگر به درستی نمونه سرور درست را که در نمونه‌ای که تست‌های WebdriverIO را اجرا می‌کند، میزبانی شده است، باز می‌کند.

## نمونه‌ها

می‌توانید نمونه‌های مختلفی برای تست کامپوننت‌ها با استفاده از چارچوب‌های محبوب کامپوننت در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples) ما پیدا کنید.