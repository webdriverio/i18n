---
id: modules
title: ماژول‌ها
---

WebdriverIO ماژول‌های مختلفی را در NPM و سایر رجیستری‌ها منتشر می‌کند که می‌توانید از آن‌ها برای ساخت فریم‌ورک اتوماسیون خود استفاده کنید. مستندات بیشتر درباره انواع راه‌اندازی WebdriverIO را [اینجا](/docs/setuptypes) ببینید.

## `webdriver` و `devtools`

پکیج‌های پروتکل ([`webdriver`](https://www.npmjs.com/package/webdriver) و [`devtools`](https://www.npmjs.com/package/devtools)) یک کلاس با توابع استاتیک زیر ارائه می‌دهند که به شما امکان شروع نشست‌ها را می‌دهند:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

یک نشست جدید با قابلیت‌های (capabilities) مشخص شروع می‌کند. بر اساس پاسخ نشست، دستورات از پروتکل‌های مختلف ارائه خواهند شد.

##### پارامترها

- `options`: [گزینه‌های WebDriver](/docs/configuration#webdriver-options)
- `modifier`: تابعی که امکان تغییر نمونه کلاینت را قبل از بازگردانده شدن آن فراهم می‌کند
- `userPrototype`: شیء ویژگی‌ها که امکان گسترش پروتوتایپ نمونه را فراهم می‌کند
- `customCommandWrapper`: تابعی که امکان پوشاندن عملکرد حول فراخوانی‌های تابع را فراهم می‌کند

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

به یک نشست WebDriver یا DevTools در حال اجرا متصل می‌شود.

##### پارامترها

- `attachInstance`: نمونه‌ای که نشست باید به آن متصل شود یا حداقل یک شیء با ویژگی `sessionId` (مثلاً `{ sessionId: 'xxx' }`)
- `modifier`: تابعی که امکان تغییر نمونه کلاینت را قبل از بازگردانده شدن آن فراهم می‌کند
- `userPrototype`: شیء ویژگی‌ها که امکان گسترش پروتوتایپ نمونه را فراهم می‌کند
- `customCommandWrapper`: تابعی که امکان پوشاندن عملکرد حول فراخوانی‌های تابع را فراهم می‌کند

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

یک نشست را بر اساس نمونه ارائه‌شده مجدداً بارگذاری می‌کند.

##### پارامترها

- `instance`: نمونه پکیج برای بارگذاری مجدد

##### مثال

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

مشابه پکیج‌های پروتکل (`webdriver` و `devtools`)، می‌توانید از APIهای پکیج WebdriverIO نیز برای مدیریت نشست‌ها استفاده کنید. این APIها را می‌توان با استفاده از `import { remote, attach, multiRemote } from 'webdriverio` وارد کرد و شامل عملکردهای زیر هستند:

#### `remote(options, modifier)`

یک نشست WebdriverIO را شروع می‌کند. این نمونه شامل تمام دستورات پکیج پروتکل است، اما با توابع مرتبه بالاتر اضافی، [مستندات API](/docs/api) را ببینید.

##### پارامترها

- `options`: [گزینه‌های WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: تابعی که امکان تغییر نمونه کلاینت را قبل از بازگردانده شدن آن فراهم می‌کند

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

به یک نشست WebdriverIO در حال اجرا متصل می‌شود.

##### پارامترها

- `attachOptions`: نمونه‌ای که نشست باید به آن متصل شود یا حداقل یک شیء با ویژگی `sessionId` (مثلاً `{ sessionId: 'xxx' }`)

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

یک نمونه multi-remote را راه‌اندازی می‌کند که به شما امکان می‌دهد چندین نشست را در یک نمونه واحد کنترل کنید. برای موارد استفاده عملی، [مثال‌های multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) ما را بررسی کنید.

##### پارامترها

- `multiRemoteOptions`: یک شیء با کلیدهایی که نام مرورگر و [گزینه‌های WebdriverIO](/docs/configuration#webdriverio) آن‌ها را نشان می‌دهند.

##### مقدار بازگشتی

- شیء [Browser](/docs/api/browser)

##### مثال

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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

#### `Key`

شیئی شامل ثابت‌های کاراکترهای ویژه برای استفاده با دستور [`browser.keys`](/docs/api/browser/keys). این ثابت‌ها کلیدهای ویژه‌ای را نشان می‌دهند که می‌توان به مرورگر ارسال کرد، مانند `Enter`، `Tab`، `Escape`، کلیدهای جهت‌نما، کلیدهای تابعی و موارد دیگر.

##### مثال

```js
import { Key } from 'webdriverio'

// فشردن کلید Enter
await browser.keys(Key.Enter)

// استفاده از Ctrl+A برای انتخاب همه (به صورت چندسکویی کار می‌کند)
await browser.keys([Key.Ctrl, 'a'])

// پیمایش با کلیدهای جهت‌نما
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### کلیدهای موجود

کلیدهای ویژه زیر از طریق شیء `Key` در دسترس هستند:

**کلیدهای اصلاح‌کننده (Modifier):**

| ثابت | توضیحات |
|----------|-------------|
| `Key.Ctrl` | کلید کنترل چندسکویی (Command در Mac، Control در Windows/Linux) |
| `Key.Control` | کلید Control |
| `Key.Shift` | کلید Shift |
| `Key.Alt` | کلید Alt |
| `Key.Command` | کلید Command (Mac) |
| `Key.NULL` | کلید Null/رهاسازی — تمام کلیدهای اصلاح‌کننده نگه‌داشته‌شده فعلی را رها می‌کند |

**کلیدهای پیمایش:**

| ثابت | توضیحات |
|----------|-------------|
| `Key.Cancel` | کلید Cancel |
| `Key.Help` | کلید Help |
| `Key.Backspace` | کلید Backspace |
| `Key.Tab` | کلید Tab |
| `Key.Clear` | کلید Clear |
| `Key.Return` | کلید Return |
| `Key.Enter` | کلید Enter |
| `Key.Pause` | کلید Pause |
| `Key.Escape` | کلید Escape |
| `Key.Space` | کلید Space |
| `Key.PageUp` | کلید Page Up |
| `Key.PageDown` | کلید Page Down |
| `Key.End` | کلید End |
| `Key.Home` | کلید Home |
| `Key.ArrowLeft` | کلید جهت‌نمای چپ |
| `Key.ArrowUp` | کلید جهت‌نمای بالا |
| `Key.ArrowRight` | کلید جهت‌نمای راست |
| `Key.ArrowDown` | کلید جهت‌نمای پایین |
| `Key.Insert` | کلید Insert |
| `Key.Delete` | کلید Delete |

**کلیدهای کاراکتری:**

| ثابت | توضیحات |
|----------|-------------|
| `Key.Semicolon` | کلید نقطه‌ویرگول (Semicolon) |
| `Key.Equals` | کلید مساوی (Equals) |

**کلیدهای Numpad:**

| ثابت | توضیحات |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | اعداد ۰ تا ۹ در Numpad |
| `Key.Multiply` | ضرب در Numpad |
| `Key.Add` | جمع در Numpad |
| `Key.Separator` | جداکننده در Numpad |
| `Key.Subtract` | تفریق در Numpad |
| `Key.Decimal` | ممیز اعشار در Numpad |
| `Key.Divide` | تقسیم در Numpad |

**کلیدهای تابعی:**

| ثابت | توضیحات |
|----------|-------------|
| `Key.F1` - `Key.F12` | کلیدهای تابعی F1 تا F12 |

**سایر کلیدها:**

| ثابت | توضیحات |
|----------|-------------|
| `Key.ZenkakuHankaku` | کلید Zenkaku/Hankaku (ژاپنی) |

:::info کلیدهای اصلاح‌کننده چندسکویی

ثابت `Key.Ctrl` روشی راحت برای استفاده از کلید اصلاح‌کننده "control" در سیستم‌عامل‌های مختلف فراهم می‌کند. در macOS به کلید `Command` نگاشت می‌شود، در حالی که در Windows و Linux به کلید `Control` نگاشت می‌شود. این ویژگی هنگام نوشتن تست‌هایی که باید در چندین پلتفرم کار کنند مفید است، مثلاً برای عملیات انتخاب همه (`Ctrl+A`)، کپی (`Ctrl+C`) یا چسباندن (`Ctrl+V`).

:::

## `@wdio/cli`

به جای فراخوانی دستور `wdio`، می‌توانید اجراکننده تست را به عنوان ماژول وارد کرده و آن را در یک محیط دلخواه اجرا کنید. برای این کار، باید پکیج `@wdio/cli` را به عنوان ماژول به این صورت وارد کنید:

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

پس از آن، یک نمونه از launcher ایجاد کرده و تست را اجرا کنید.

#### `Launcher(configPath, opts)`

سازنده کلاس `Launcher` آدرس فایل پیکربندی و یک شیء `opts` با تنظیماتی که تنظیمات موجود در فایل پیکربندی را بازنویسی می‌کنند، انتظار دارد.

##### پارامترها

- `configPath`: مسیر فایل `wdio.conf.js` برای اجرا
- `opts`: آرگومان‌ها ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) برای بازنویسی مقادیر فایل پیکربندی

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

دستور `run` یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) برمی‌گرداند. اگر تست‌ها با موفقیت اجرا شوند یا شکست بخورند، resolve می‌شود و اگر launcher نتواند اجرای تست‌ها را شروع کند، reject می‌شود.

## `@wdio/browser-runner`

هنگام اجرای تست‌های واحد یا کامپوننت با استفاده از [browser runner](/docs/runner#browser-runner) در WebdriverIO، می‌توانید ابزارهای mock کردن را برای تست‌های خود وارد کنید، مثلاً:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

خروجی‌های نام‌دار زیر در دسترس هستند:

#### `fn`

تابع mock، اطلاعات بیشتر را در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) ببینید.

#### `spyOn`

تابع spy، اطلاعات بیشتر را در [مستندات رسمی Vitest](https://vitest.dev/api/mock.html#mock-functions) ببینید.

#### `mock`

متدی برای mock کردن فایل یا ماژول وابستگی.

##### پارامترها

- `moduleName`: یا یک مسیر نسبی به فایلی که باید mock شود یا نام یک ماژول.
- `factory`: تابعی برای بازگرداندن مقدار mock شده (اختیاری)

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

وابستگی‌ای را که در دایرکتوری mock دستی (`__mocks__`) تعریف شده است، از حالت mock خارج می‌کند.

##### پارامترها

- `moduleName`: نام ماژولی که باید از حالت mock خارج شود.

##### مثال

```js
unmock('lodash')
```