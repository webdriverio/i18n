---
id: modules
title: ماژول‌ها
---

WebdriverIO ماژول‌های مختلفی را در NPM و سایر رجیستری‌ها منتشر می‌کند که می‌توانید از آن‌ها برای ساخت فریمورک اتوماسیون خود استفاده کنید. اطلاعات بیشتر در مورد انواع راه‌اندازی WebdriverIO را [اینجا](/docs/setuptypes) ببینید.

## `webdriver` و `devtools`

بسته‌های پروتکل ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) یک کلاس با توابع استاتیک زیر را ارائه می‌دهند که به شما امکان ایجاد جلسات را می‌دهند:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

یک جلسه جدید با قابلیت‌های خاص را شروع می‌کند. بر اساس پاسخ جلسه، دستورات از پروتکل‌های مختلف ارائه می‌شوند.

##### پارامترها

- `options`: [گزینه‌های WebDriver](/docs/configuration#webdriver-options)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از برگرداندن تغییر دهید
- `userPrototype`: اشیاء خصوصیات که اجازه می‌دهد پروتوتایپ نمونه را گسترش دهید
- `customCommandWrapper`: تابعی که اجازه می‌دهد عملکرد را در اطراف فراخوانی‌های تابع بسته‌بندی کنید

##### مقدار بازگشتی

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

- `attachInstance`: نمونه‌ای برای اتصال به یک جلسه یا حداقل یک شیء با ویژگی `sessionId` (مثلاً `{ sessionId: 'xxx' }`)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از برگرداندن تغییر دهید
- `userPrototype`: اشیاء خصوصیات که اجازه می‌دهد پروتوتایپ نمونه را گسترش دهید
- `customCommandWrapper`: تابعی که اجازه می‌دهد عملکرد را در اطراف فراخوانی‌های تابع بسته‌بندی کنید

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

جلسه مشخص شده را با نمونه ارائه شده بازنشانی می‌کند.

##### پارامترها

- `instance`: نمونه بسته برای بازنشانی

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

مشابه بسته‌های پروتکل (`webdriver` و `devtools`)، همچنین می‌توانید از API‌های بسته WebdriverIO برای مدیریت جلسات استفاده کنید. API‌ها را می‌توان با استفاده از `import { remote, attach, multiremote } from 'webdriverio` وارد کرد و شامل عملکردهای زیر است:

#### `remote(options, modifier)`

یک جلسه WebdriverIO را شروع می‌کند. نمونه شامل تمام دستورات مانند بسته پروتکل است اما با توابع ترتیب بالاتر، به [مستندات API](/docs/api) مراجعه کنید.

##### پارامترها

- `options`: [گزینه‌های WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: تابعی که اجازه می‌دهد نمونه کلاینت را قبل از برگرداندن تغییر دهید

##### مقدار بازگشتی

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

- `attachOptions`: نمونه‌ای برای اتصال به یک جلسه یا حداقل یک شیء با ویژگی `sessionId` (مثلاً `{ sessionId: 'xxx' }`)

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

یک نمونه multiremote را آغاز می‌کند که به شما امکان می‌دهد چندین جلسه را در یک نمونه واحد کنترل کنید. مثال‌های [multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) ما را برای موارد استفاده مشخص بررسی کنید.

##### پارامترها

- `multiremoteOptions`: یک شیء با کلیدهایی که نام مرورگر را نشان می‌دهند و [گزینه‌های WebdriverIO](/docs/configuration#webdriverio) آنها.

##### مقدار بازگشتی

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

به جای فراخوانی دستور `wdio`، می‌توانید اجراکننده تست را به عنوان ماژول وارد کرده و آن را در یک محیط دلخواه اجرا کنید. برای این کار، باید بسته `@wdio/cli` را به عنوان ماژول وارد کنید، مانند این:

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

پس از آن، یک نمونه از لانچر ایجاد کنید و تست را اجرا کنید.

#### `Launcher(configPath, opts)`

سازنده کلاس `Launcher` انتظار URL فایل پیکربندی و یک شیء `opts` با تنظیماتی که مقادیر در پیکربندی را بازنویسی خواهند کرد، دارد.

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

دستور `run` یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) را برمی‌گرداند. اگر تست‌ها با موفقیت اجرا شدند یا شکست خوردند، حل می‌شود، و اگر لانچر نتوانست تست‌ها را اجرا کند، رد می‌شود.

## `@wdio/browser-runner`

هنگام اجرای تست‌های واحد یا کامپوننت با استفاده از [اجراکننده مرورگر](/docs/runner#browser-runner) WebdriverIO، می‌توانید ابزارهای موک‌سازی را برای تست‌های خود وارد کنید، مثلاً:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

صادرات نام‌گذاری شده زیر در دسترس هستند:

#### `fn`

تابع موک، اطلاعات بیشتر در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) را ببینید.

#### `spyOn`

تابع جاسوسی، اطلاعات بیشتر در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) را ببینید.

#### `mock`

روشی برای موک کردن فایل یا ماژول وابستگی.

##### پارامترها

- `moduleName`: یا یک مسیر نسبی به فایلی که باید موک شود یا یک نام ماژول.
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

- `moduleName`: نام ماژولی که باید از حالت موک خارج شود.

##### مثال

```js
unmock('lodash')
```