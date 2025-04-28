---
id: runner
title: اجرا کننده
---

import CodeBlock from '@theme/CodeBlock';

یک اجرا کننده در WebdriverIO هماهنگ می‌کند که چگونه و کجا تست‌ها هنگام استفاده از testrunner اجرا می‌شوند. WebdriverIO در حال حاضر از دو نوع مختلف اجرا کننده پشتیبانی می‌کند: اجرا کننده محلی و اجرا کننده مرورگر.

## اجرا کننده محلی

[اجرا کننده محلی](https://www.npmjs.com/package/@wdio/local-runner) چارچوب شما (مانند Mocha، Jasmine یا Cucumber) را در یک فرآیند worker راه‌اندازی می‌کند و تمام فایل‌های تست شما را در محیط Node.js اجرا می‌کند. هر فایل تست در یک فرآیند worker جداگانه به ازای هر قابلیت اجرا می‌شود که امکان حداکثر همزمانی را فراهم می‌کند. هر فرآیند worker از یک نمونه مرورگر استفاده می‌کند و بنابراین جلسه مرورگر خود را اجرا می‌کند که اجازه حداکثر جداسازی را می‌دهد.

با توجه به اینکه هر تست در فرآیند مجزای خود اجرا می‌شود، امکان اشتراک داده‌ها بین فایل‌های تست وجود ندارد. دو راه برای دور زدن این محدودیت وجود دارد:

- استفاده از [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) برای اشتراک‌گذاری داده‌ها بین تمام workerها
- گروه‌بندی فایل‌های spec (اطلاعات بیشتر در [سازماندهی مجموعه تست](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

اگر مورد دیگری در `wdio.conf.js` تعریف نشده باشد، اجرا کننده محلی، اجرا کننده پیش‌فرض در WebdriverIO است.

### نصب

برای استفاده از اجرا کننده محلی می‌توانید آن را از طریق زیر نصب کنید:

```sh
npm install --save-dev @wdio/local-runner
```

### راه‌اندازی

اجرا کننده محلی، اجرا کننده پیش‌فرض در WebdriverIO است، بنابراین نیازی به تعریف آن در `wdio.conf.js` نیست. اگر می‌خواهید به صراحت آن را تنظیم کنید، می‌توانید آن را به شرح زیر تعریف کنید:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## اجرا کننده مرورگر

بر خلاف [اجرا کننده محلی](https://www.npmjs.com/package/@wdio/local-runner)، [اجرا کننده مرورگر](https://www.npmjs.com/package/@wdio/browser-runner) چارچوب را در مرورگر راه‌اندازی و اجرا می‌کند. این به شما امکان می‌دهد تست‌های واحد یا تست‌های کامپوننت را در یک مرورگر واقعی به جای JSDOM مانند بسیاری از چارچوب‌های تست دیگر اجرا کنید.

در حالی که [JSDOM](https://www.npmjs.com/package/jsdom) به طور گسترده برای اهداف تست استفاده می‌شود، در نهایت یک مرورگر واقعی نیست و نمی‌توانید محیط‌های موبایل را با آن شبیه‌سازی کنید. با این اجرا کننده، WebdriverIO به شما امکان می‌دهد تا به راحتی تست‌های خود را در مرورگر اجرا کنید و از دستورات WebDriver برای تعامل با عناصر رندر شده در صفحه استفاده کنید.

در اینجا نمایی کلی از اجرای تست‌ها در JSDOM در مقابل اجرا کننده مرورگر WebdriverIO آمده است:

| | JSDOM | اجرا کننده مرورگر WebdriverIO |
|-|-------|----------------------------|
|1.| تست‌های شما را در Node.js با استفاده از پیاده‌سازی مجدد استانداردهای وب، به ویژه استانداردهای DOM و HTML WHATWG اجرا می‌کند | تست شما را در یک مرورگر واقعی اجرا می‌کند و کد را در محیطی که کاربران شما از آن استفاده می‌کنند، اجرا می‌کند |
|2.| تعاملات با کامپوننت‌ها فقط می‌توانند از طریق JavaScript تقلید شوند | می‌توانید از [API WebdriverIO](api) برای تعامل با عناصر از طریق پروتکل WebDriver استفاده کنید |
|3.| پشتیبانی از Canvas نیاز به [وابستگی‌های اضافی](https://www.npmjs.com/package/canvas) دارد و [محدودیت‌هایی دارد](https://github.com/Automattic/node-canvas/issues) | شما به [API Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) واقعی دسترسی دارید |
|4.| JSDOM برخی [محدودیت‌ها](https://github.com/jsdom/jsdom#caveats) و APIهای وب پشتیبانی نشده دارد | تمام APIهای وب پشتیبانی می‌شوند زیرا تست در یک مرورگر واقعی اجرا می‌شود |
|5.| تشخیص خطاها در مرورگرهای مختلف غیرممکن است | پشتیبانی از همه مرورگرها از جمله مرورگرهای موبایل |
|6.| __نمی‌تواند__ حالت‌های شبه عناصر را تست کند | پشتیبانی از حالت‌های شبه مانند `:hover` یا `:active` |

این اجرا کننده از [Vite](https://vitejs.dev/) برای کامپایل کد تست شما و بارگذاری آن در مرورگر استفاده می‌کند. این با پیش‌تنظیمات برای چارچوب‌های کامپوننت زیر ارائه می‌شود:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

هر فایل تست / گروه فایل تست در یک صفحه واحد اجرا می‌شود، به این معنی که بین هر تست، صفحه مجدداً بارگذاری می‌شود تا جداسازی بین تست‌ها تضمین شود.

### نصب

برای استفاده از اجرا کننده مرورگر، می‌توانید آن را از طریق زیر نصب کنید:

```sh
npm install --save-dev @wdio/browser-runner
```

### راه‌اندازی

برای استفاده از اجرا کننده مرورگر، باید یک ویژگی `runner` را در فایل `wdio.conf.js` خود تعریف کنید، به عنوان مثال:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### گزینه‌های اجرا کننده

اجرا کننده مرورگر پیکربندی‌های زیر را اجازه می‌دهد:

#### `preset`

اگر کامپوننت‌ها را با استفاده از یکی از چارچوب‌های ذکر شده در بالا تست می‌کنید، می‌توانید یک پیش‌تنظیم تعریف کنید که همه چیز از قبل پیکربندی شده باشد. این گزینه نمی‌تواند همراه با `viteConfig` استفاده شود.

__نوع:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__مثال:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

[پیکربندی Vite](https://vitejs.dev/config/) خود را تعریف کنید. می‌توانید یک شیء سفارشی را وارد کنید یا یک فایل `vite.conf.ts` موجود را اگر از Vite.js برای توسعه استفاده می‌کنید، ایمپورت کنید. توجه داشته باشید که WebdriverIO پیکربندی‌های سفارشی Vite را برای راه‌اندازی تست حفظ می‌کند.

__نوع:__ `string` یا [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) یا `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__مثال:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // or just:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // or use a function if your vite config contains a lot of plugins
    // which you only want to resolve when value is read
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

اگر روی `true` تنظیم شود، اجرا کننده قابلیت‌ها را برای اجرای تست‌ها به صورت headless به‌روز می‌کند. به طور پیش‌فرض، این در محیط‌های CI که متغیر محیطی `CI` روی `'1'` یا `'true'` تنظیم شده است، فعال است.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`، اگر متغیر محیطی `CI` تنظیم شده باشد روی `true` تنظیم می‌شود

#### `rootDir`

دایرکتوری ریشه پروژه.

__نوع:__ `string`<br />
__پیش‌فرض:__ `process.cwd()`

#### `coverage`

WebdriverIO از گزارش پوشش تست از طریق [`istanbul`](https://istanbul.js.org/) پشتیبانی می‌کند. برای جزئیات بیشتر به [گزینه‌های پوشش](#coverage-options) مراجعه کنید.

__نوع:__ `object`<br />
__پیش‌فرض:__ `undefined`

### گزینه‌های پوشش

گزینه‌های زیر امکان پیکربندی گزارش پوشش را فراهم می‌کنند.

#### `enabled`

جمع‌آوری پوشش را فعال می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### `include`

لیست فایل‌های شامل در پوشش به عنوان الگوهای glob.

__نوع:__ `string[]`<br />
__پیش‌فرض:__ `[**]`

#### `exclude`

لیست فایل‌های خارج از پوشش به عنوان الگوهای glob.

__نوع:__ `string[]`<br />
__پیش‌فرض:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

لیست پسوندهای فایل که گزارش باید شامل آنها باشد.

__نوع:__ `string | string[]`<br />
__پیش‌فرض:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

دایرکتوری برای نوشتن گزارش پوشش.

__نوع:__ `string`<br />
__پیش‌فرض:__ `./coverage`

#### `reporter`

گزارش‌دهنده‌های پوشش برای استفاده. برای لیست دقیق تمام گزارش‌دهنده‌ها به [مستندات istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) مراجعه کنید.

__نوع:__ `string[]`<br />
__پیش‌فرض:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

بررسی آستانه‌ها برای هر فایل. برای آستانه‌های واقعی به `lines`، `functions`، `branches` و `statements` مراجعه کنید.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### `clean`

پاک کردن نتایج پوشش قبل از اجرای تست‌ها.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `true`

#### `lines`

آستانه برای خطوط.

__نوع:__ `number`<br />
__پیش‌فرض:__ `undefined`

#### `functions`

آستانه برای توابع.

__نوع:__ `number`<br />
__پیش‌فرض:__ `undefined`

#### `branches`

آستانه برای شاخه‌ها.

__نوع:__ `number`<br />
__پیش‌فرض:__ `undefined`

#### `statements`

آستانه برای دستورات.

__نوع:__ `number`<br />
__پیش‌فرض:__ `undefined`

### محدودیت‌ها

هنگام استفاده از اجرا کننده مرورگر WebdriverIO، باید توجه داشت که دیالوگ‌های مسدودکننده thread مانند `alert` یا `confirm` نمی‌توانند به صورت طبیعی استفاده شوند. این به دلیل آن است که آنها صفحه وب را مسدود می‌کنند، که به معنای آن است که WebdriverIO نمی‌تواند به ارتباط با صفحه ادامه دهد، و باعث می‌شود اجرا متوقف شود.

در چنین مواردی، WebdriverIO mock‌های پیش‌فرض با مقادیر برگشتی پیش‌فرض برای این APIها ارائه می‌دهد. این تضمین می‌کند که اگر کاربر به طور تصادفی از APIهای پاپ‌آپ وب همزمان استفاده کند، اجرا متوقف نخواهد شد. با این حال، هنوز توصیه می‌شود که کاربر این APIهای وب را برای تجربه بهتر mock کند. اطلاعات بیشتر در [Mocking](/docs/component-testing/mocking).

### مثال‌ها

حتماً مستندات مربوط به [تست کامپوننت](https://webdriver.io/docs/component-testing) را بررسی کنید و نگاهی به [مخزن مثال](https://github.com/webdriverio/component-testing-examples) برای مثال‌هایی با استفاده از این و سایر چارچوب‌های مختلف داشته باشید.