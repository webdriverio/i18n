---
id: modules
title: ماژول‌ها
---

WebdriverIO ماژول‌های مختلفی را در NPM و سایر مخازن منتشر می‌کند که می‌توانید از آن‌ها برای ساخت چارچوب خودکارسازی خود استفاده کنید. اطلاعات بیشتر درباره انواع راه‌اندازی WebdriverIO را [اینجا](/docs/setuptypes) ببینید.

## `webdriver` و `devtools`

بسته‌های پروتکل ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) یک کلاس با توابع استاتیک زیر را ارائه می‌دهند که به شما امکان می‌دهد جلسات را شروع کنید:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

یک جلسه جدید با قابلیت‌های خاص شروع می‌کند. بر اساس پاسخ جلسه، دستورات از پروتکل‌های مختلف ارائه می‌شوند.

##### پارامترها

- `options`: [گزینه‌های WebDriver](/docs/configuration#webdriver-options)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از بازگشت تغییر دهید
- `userPrototype`: شیء خصوصیات که امکان گسترش پروتوتایپ نمونه را فراهم می‌کند
- `customCommandWrapper`: تابعی که اجازه می‌دهد عملکرد را در اطراف فراخوانی‌های تابع بپیچید

##### بازگشت

- شیء [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

به یک جلسه WebDriver یا DevTools در حال اجرا متصل می‌شود.

##### پارامترها

- `attachInstance`: نمونه‌ای برای اتصال به جلسه یا حداقل یک شیء با خاصیت `sessionId` (مثلاً `{ sessionId: 'xxx' }`)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از بازگشت تغییر دهید
- `userPrototype`: شیء خصوصیات که امکان گسترش پروتوتایپ نمونه را فراهم می‌کند
- `customCommandWrapper`: تابعی که اجازه می‌دهد عملکرد را در اطراف فراخوانی‌های تابع بپیچید

##### بازگشت

- شیء [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

یک جلسه را با توجه به نمونه ارائه شده بازنشانی می‌کند.

##### پارامترها

- `instance`: نمونه بسته برای بازنشانی

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

مشابه بسته‌های پروتکل (`webdriver` و `devtools`)، شما همچنین می‌توانید از APIهای بسته WebdriverIO برای مدیریت جلسات استفاده کنید. این APIها را می‌توان با استفاده از `import { remote, attach, multiremote } from 'webdriverio` وارد کرد و شامل عملکردهای زیر هستند:

#### `remote(options, modifier)`

یک جلسه WebdriverIO را شروع می‌کند. این نمونه شامل تمام دستورات مانند بسته پروتکل است اما با توابع مرتبه بالاتر اضافی، به [مستندات API](/docs/api) مراجعه کنید.

##### پارامترها

- `options`: [گزینه‌های WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از بازگشت تغییر دهید

##### بازگشت

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

به یک جلسه WebdriverIO در حال اجرا متصل می‌شود.

##### پارامترها

- `attachOptions`: نمونه‌ای برای اتصال به جلسه یا حداقل یک شیء با خاصیت `sessionId` (مثلاً `{ sessionId: 'xxx' }`)

##### بازگشت

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

یک نمونه multiremote را راه‌اندازی می‌کند که به شما امکان می‌دهد چندین جلسه را در یک نمونه واحد کنترل کنید. برای موارد استفاده مشخص، [مثال‌های multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) ما را بررسی کنید.

##### پارامترها

- `multiremoteOptions`: یک شیء با کلیدهایی که نشان‌دهنده نام مرورگر و [گزینه‌های WebdriverIO](/docs/configuration#webdriverio) آن‌ها هستند.

##### بازگشت

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

به جای فراخوانی دستور `wdio`، می‌توانید اجراکننده تست را به عنوان ماژول وارد کرده و آن را در یک محیط دلخواه اجرا کنید. برای این کار، شما باید بسته `@wdio/cli` را به عنوان ماژول دریافت کنید، مانند این:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

پس از آن، یک نمونه از راه‌انداز ایجاد کرده و تست را اجرا کنید.

#### `Launcher(configPath, opts)`

سازنده کلاس `Launcher` انتظار URL به فایل پیکربندی و یک شیء `opts` با تنظیماتی که مقادیر پیکربندی را بازنویسی می‌کنند را دارد.

##### پارامترها

- `configPath`: مسیر به `wdio.conf.js` برای اجرا
- `opts`: آرگومان‌هایی ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) برای بازنویسی مقادیر از فایل پیکربندی

##### مثال

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

دستور `run` یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) را برمی‌گرداند. اگر تست‌ها با موفقیت اجرا شدند یا شکست خوردند، تایید می‌شود و اگر راه‌انداز نتوانست تست‌ها را اجرا کند، رد می‌شود.

## `@wdio/browser-runner`

هنگام اجرای تست‌های واحد یا کامپوننت با استفاده از [browser runner](/docs/runner#browser-runner) WebdriverIO، می‌توانید ابزارهای موک‌سازی را برای تست‌های خود وارد کنید، مثلاً:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

صادرات نام‌گذاری‌شده زیر در دسترس هستند:

#### `fn`

تابع موک، اطلاعات بیشتر را در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) ببینید.

#### `spyOn`

تابع جاسوسی، اطلاعات بیشتر را در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) ببینید.

#### `mock`

روشی برای موک کردن فایل یا ماژول وابستگی.

##### پارامترها

- `moduleName`: یا مسیر نسبی به فایلی که باید موک شود یا نام یک ماژول.
- `factory`: تابعی برای برگرداندن مقدار موک شده (اختیاری)

##### مثال

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

لغو موک وابستگی که در دایرکتوری موک دستی (`__mocks__`) تعریف شده است.

##### پارامترها

- `moduleName`: نام ماژولی که باید موک آن لغو شود.

##### مثال

```js
unmock('lodash')
```