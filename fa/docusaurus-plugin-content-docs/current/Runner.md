---
id: runner
title: رانر
description: "بین رانر محلی و رانر مرورگر انتخاب کنید و گزینه‌های رانر مرورگر مانند پیش‌تنظیم‌ها، پیکربندی Vite و پوشش کد را پیکربندی کنید."
---

import CodeBlock from '@theme/CodeBlock';

یک رانر در WebdriverIO نحوه و محل اجرای تست‌ها را هنگام استفاده از testrunner هماهنگ می‌کند. WebdriverIO در حال حاضر از دو نوع رانر پشتیبانی می‌کند: رانر محلی و رانر مرورگر.

## رانر محلی

[رانر محلی](https://www.npmjs.com/package/@wdio/local-runner) فریم‌ورک شما (مثلاً Mocha، Jasmine یا Cucumber) را درون یک پروسه worker راه‌اندازی می‌کند و تمام فایل‌های تست شما را در محیط Node.js اجرا می‌کند. هر فایل تست به ازای هر capability در یک پروسه worker جداگانه اجرا می‌شود که حداکثر همزمانی را ممکن می‌سازد. هر پروسه worker از یک نمونه مرورگر استفاده می‌کند و بنابراین جلسه مرورگر مخصوص به خود را اجرا می‌کند که حداکثر جداسازی را فراهم می‌کند.

از آنجا که هر تست در پروسه ایزوله خود اجرا می‌شود، امکان اشتراک‌گذاری داده بین فایل‌های تست وجود ندارد. دو راه برای دور زدن این محدودیت وجود دارد:

- از [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) برای اشتراک‌گذاری داده بین تمام workerها استفاده کنید
- فایل‌های spec را گروه‌بندی کنید (در [سازماندهی مجموعه تست](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially) بیشتر بخوانید)

اگر چیز دیگری در `wdio.conf.js` تعریف نشده باشد، رانر محلی رانر پیش‌فرض در WebdriverIO است.

### نصب

برای استفاده از رانر محلی می‌توانید آن را از طریق دستور زیر نصب کنید:

```sh
npm install --save-dev @wdio/local-runner
```

### راه‌اندازی

رانر محلی رانر پیش‌فرض در WebdriverIO است، بنابراین نیازی به تعریف آن در `wdio.conf.js` نیست. اگر می‌خواهید آن را به صراحت تنظیم کنید، می‌توانید آن را به صورت زیر تعریف کنید:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## رانر مرورگر

برخلاف [رانر محلی](https://www.npmjs.com/package/@wdio/local-runner)، [رانر مرورگر](https://www.npmjs.com/package/@wdio/browser-runner) فریم‌ورک را درون مرورگر راه‌اندازی و اجرا می‌کند. این امکان را به شما می‌دهد که تست‌های واحد یا تست‌های کامپوننت را به جای JSDOM، مانند بسیاری از فریم‌ورک‌های تست دیگر، در یک مرورگر واقعی اجرا کنید. باندل تست در Chrome 90، Edge 90، Firefox 90 و Safari 14.1 یا جدیدتر اجرا می‌شود. [پشتیبانی مرورگر](/docs/component-testing#browser-support) را ببینید.

در حالی که [JSDOM](https://www.npmjs.com/package/jsdom) به طور گسترده برای اهداف تست استفاده می‌شود، در نهایت یک مرورگر واقعی نیست و نمی‌توانید محیط‌های موبایل را با آن شبیه‌سازی کنید. با این رانر، WebdriverIO به شما امکان می‌دهد به راحتی تست‌های خود را در مرورگر اجرا کنید و از دستورات WebDriver برای تعامل با عناصر رندر شده در صفحه استفاده کنید.

در اینجا مروری بر اجرای تست‌ها در JSDOM در مقایسه با رانر مرورگر WebdriverIO آمده است

| | JSDOM | رانر مرورگر WebdriverIO |
|-|-------|----------------------------|
|1.| تست‌های شما را درون Node.js با استفاده از پیاده‌سازی مجدد استانداردهای وب، به ویژه استانداردهای WHATWG DOM و HTML اجرا می‌کند | تست شما را در یک مرورگر واقعی اجرا می‌کند و کد را در محیطی که کاربران شما استفاده می‌کنند اجرا می‌کند |
|2.| تعامل با کامپوننت‌ها فقط از طریق JavaScript قابل تقلید است | می‌توانید از [API وب‌درایور WebdriverIO](api) برای تعامل با عناصر از طریق پروتکل WebDriver استفاده کنید |
|3.| پشتیبانی از Canvas نیازمند [وابستگی‌های اضافی](https://www.npmjs.com/package/canvas) است و [محدودیت‌هایی دارد](https://github.com/Automattic/node-canvas/issues) | به [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) واقعی دسترسی دارید |
|4.| JSDOM دارای برخی [نکات احتیاطی](https://github.com/jsdom/jsdom#caveats) و Web APIهای پشتیبانی نشده است | همه Web APIها پشتیبانی می‌شوند زیرا تست در یک مرورگر واقعی اجرا می‌شود |
|5.| تشخیص خطاها در مرورگرهای مختلف غیرممکن است | پشتیبانی از همه مرورگرها از جمله مرورگرهای موبایل |
|6.| __نمی‌تواند__ حالت‌های کاذب (pseudo states) عناصر را تست کند | پشتیبانی از حالت‌های کاذب مانند `:hover` یا `:active` |

این رانر از [Vite](https://vitejs.dev/) برای کامپایل کد تست شما و بارگذاری آن در مرورگر استفاده می‌کند. این رانر با پیش‌تنظیم‌هایی برای فریم‌ورک‌های کامپوننت زیر ارائه می‌شود:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

هر فایل تست / گروه فایل تست درون یک صفحه واحد اجرا می‌شود، به این معنی که بین هر تست، صفحه مجدداً بارگذاری می‌شود تا جداسازی بین تست‌ها تضمین شود.

### نصب

برای استفاده از رانر مرورگر می‌توانید آن را از طریق دستور زیر نصب کنید:

```sh
npm install --save-dev @wdio/browser-runner
```

### راه‌اندازی

برای استفاده از رانر مرورگر، باید یک ویژگی `runner` را درون فایل `wdio.conf.js` خود تعریف کنید، به عنوان مثال:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### گزینه‌های رانر

رانر مرورگر پیکربندی‌های زیر را امکان‌پذیر می‌کند:

#### `preset`

اگر کامپوننت‌ها را با استفاده از یکی از فریم‌ورک‌های ذکر شده در بالا تست می‌کنید، می‌توانید یک پیش‌تنظیم تعریف کنید که اطمینان حاصل می‌کند همه چیز به صورت آماده پیکربندی شده است. این گزینه را نمی‌توان همراه با `viteConfig` استفاده کرد.

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

[پیکربندی Vite](https://vitejs.dev/config/) خود را تعریف کنید. می‌توانید یک شیء سفارشی ارسال کنید یا اگر از Vite.js برای توسعه استفاده می‌کنید، یک فایل `vite.conf.ts` موجود را import کنید. توجه داشته باشید که WebdriverIO پیکربندی‌های سفارشی Vite را برای راه‌اندازی محیط تست حفظ می‌کند.

__نوع:__ `string` یا [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) یا `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__مثال:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // یا فقط:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // یا اگر پیکربندی vite شما شامل پلاگین‌های زیادی است از یک تابع استفاده کنید
    // که فقط می‌خواهید هنگام خوانده شدن مقدار، resolve شوند
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

اگر روی `true` تنظیم شود، رانر capabilities را به‌روزرسانی می‌کند تا تست‌ها به صورت headless اجرا شوند. به طور پیش‌فرض این گزینه در محیط‌های CI که متغیر محیطی `CI` روی `'1'` یا `'true'` تنظیم شده باشد، فعال است.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`، در صورت تنظیم متغیر محیطی `CI` روی `true` تنظیم می‌شود

#### `rootDir`

دایرکتوری ریشه پروژه.

__نوع:__ `string`<br />
__پیش‌فرض:__ `process.cwd()`

#### `coverage`

WebdriverIO از گزارش‌دهی پوشش تست از طریق [`istanbul`](https://istanbul.js.org/) پشتیبانی می‌کند. برای جزئیات بیشتر [گزینه‌های پوشش](#coverage-options) را ببینید.

__نوع:__ `object`<br />
__پیش‌فرض:__ `undefined`

### گزینه‌های پوشش

گزینه‌های زیر امکان پیکربندی گزارش‌دهی پوشش را فراهم می‌کنند.

#### `enabled`

جمع‌آوری پوشش را فعال می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### `include`

لیست فایل‌هایی که به صورت الگوهای glob در پوشش گنجانده می‌شوند.

__نوع:__ `string[]`<br />
__پیش‌فرض:__ `[**]`

#### `exclude`

لیست فایل‌هایی که به صورت الگوهای glob از پوشش مستثنی می‌شوند.

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

لیست پسوندهای فایلی که گزارش باید شامل شود.

__نوع:__ `string | string[]`<br />
__پیش‌فرض:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

دایرکتوری که گزارش پوشش در آن نوشته می‌شود.

__نوع:__ `string`<br />
__پیش‌فرض:__ `./coverage`

#### `reporter`

گزارش‌دهنده‌های پوشش مورد استفاده. برای لیست کامل همه گزارش‌دهنده‌ها [مستندات istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) را ببینید.

__نوع:__ `string[]`<br />
__پیش‌فرض:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

بررسی آستانه‌ها به ازای هر فایل. برای آستانه‌های واقعی `lines`، `functions`، `branches` و `statements` را ببینید.

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

هنگام استفاده از رانر مرورگر WebdriverIO، توجه به این نکته مهم است که دیالوگ‌های مسدودکننده thread مانند `alert` یا `confirm` را نمی‌توان به صورت بومی استفاده کرد. دلیل این امر آن است که این دیالوگ‌ها صفحه وب را مسدود می‌کنند، به این معنی که WebdriverIO نمی‌تواند به ارتباط با صفحه ادامه دهد و باعث توقف اجرا می‌شود.

در چنین شرایطی، WebdriverIO برای این APIها mockهای پیش‌فرض با مقادیر بازگشتی پیش‌فرض ارائه می‌دهد. این امر تضمین می‌کند که اگر کاربر به طور تصادفی از Web APIهای popup همگام استفاده کند، اجرا متوقف نشود. با این حال، همچنان به کاربر توصیه می‌شود برای تجربه بهتر این Web APIها را mock کند. در [Mocking](/docs/component-testing/mocking) بیشتر بخوانید.

### مثال‌ها

حتماً مستندات مربوط به [تست کامپوننت](https://webdriver.io/docs/component-testing) را بررسی کنید و برای مثال‌هایی که از این فریم‌ورک‌ها و فریم‌ورک‌های مختلف دیگر استفاده می‌کنند، نگاهی به [مخزن مثال‌ها](https://github.com/webdriverio/component-testing-examples) بیندازید.