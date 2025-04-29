---
id: wdio-vscode-service
title: سرویس تست افزونه VSCode
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service) مراجعه کنید

تست شده روی:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> سرویس WebdriverIO برای تست افزونه‌های VSCode.

این سرویس WebdriverIO به شما اجازه می‌دهد تا افزونه‌های VSCode خود را از ابتدا تا انتها در محیط VSCode Desktop IDE یا به عنوان یک افزونه وب به صورت یکپارچه تست کنید. شما فقط باید مسیری به افزونه خود ارائه دهید و سرویس بقیه کارها را با انجام موارد زیر انجام می‌دهد:

- 🏗️ نصب VSCode (می‌تواند `stable`، `insiders` یا نسخه مشخص شده باشد)
- ⬇️ دانلود Chromedriver مخصوص نسخه VSCode مورد نظر
- 🚀 به شما امکان دسترسی به API های VSCode از تست‌های خود را می‌دهد
- 🖥️ اجرای VSCode با تنظیمات کاربری سفارشی (شامل پشتیبانی از VSCode در Ubuntu، MacOS و Windows)
- 🌐 یا VSCode را از یک سرور ارائه می‌دهد تا توسط هر مرورگری برای تست [افزونه‌های وب](https://code.visualstudio.com/api/extension-guides/web-extensions) قابل دسترسی باشد
- 📔 راه‌اندازی page object ها با locator های مطابق با نسخه VSCode شما

این پروژه به شدت از پروژه [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) که بر پایه Selenium است، الهام گرفته شده است. این بسته ایده را گرفته و آن را با WebdriverIO سازگار کرده است.

از نسخه VSCode v1.86 به بعد، استفاده از `webdriverio` نسخه v8.14 یا بالاتر برای نصب Chromedriver بدون نیاز به پیکربندی لازم است. اگر نیاز به تست نسخه‌های قدیمی‌تر VSCode دارید، به بخش [پیکربندی Chromedriver](#chromedriver) در زیر مراجعه کنید.

## نصب

برای شروع یک پروژه جدید WebdriverIO، اجرا کنید:

```bash
npm create wdio ./
```

یک ویزارد نصب شما را در این فرآیند راهنمایی می‌کند. اطمینان حاصل کنید که TypeScript را به عنوان کامپایلر انتخاب کرده‌اید و از ایجاد page object ها توسط آن خودداری کنید زیرا این پروژه با تمام page object های مورد نیاز همراه است. سپس مطمئن شوید که `vscode` را در لیست سرویس‌ها انتخاب کنید:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

برای اطلاعات بیشتر در مورد نحوه نصب `WebdriverIO`، لطفاً به [مستندات پروژه](https://webdriver.io/docs/gettingstarted) مراجعه کنید.

## نمونه پیکربندی

برای استفاده از سرویس، شما باید `vscode` را به لیست سرویس‌های خود اضافه کنید که اختیاراً می‌تواند با یک شیء پیکربندی دنبال شود. این کار باعث می‌شود WebdriverIO باینری‌های VSCode مورد نظر و نسخه مناسب Chromedriver را دانلود کند:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Optionally define the path WebdriverIO stores all VSCode binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

اگر `wdio:vscodeOptions` را با هر `browserName` دیگری جز `vscode` تعریف کنید، مثلاً `chrome`، سرویس افزونه را به عنوان یک افزونه وب ارائه می‌دهد. اگر روی Chrome تست می‌کنید، نیازی به سرویس درایور اضافی نیست، به عنوان مثال:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_نکته:_ هنگام تست افزونه‌های وب، شما فقط می‌توانید بین `stable` یا `insiders` به عنوان `browserVersion` انتخاب کنید.

### تنظیمات TypeScript

در فایل `tsconfig.json` خود مطمئن شوید که `wdio-vscode-service` را به لیست types خود اضافه کرده‌اید:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## استفاده

سپس می‌توانید از متد `getWorkbench` برای دسترسی به page object های مربوط به locator های مطابق با نسخه VSCode مورد نظر خود استفاده کنید:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### دسترسی به API های VSCode

اگر می‌خواهید اتوماسیون خاصی را از طریق [API های VSCode](https://code.visualstudio.com/api/references/vscode-api) اجرا کنید، می‌توانید این کار را با اجرای دستورات از راه دور از طریق دستور سفارشی `executeWorkbench` انجام دهید. این دستور به شما امکان می‌دهد کدی را از تست خود در محیط VSCode به صورت از راه دور اجرا کنید و به شما امکان دسترسی به API های VSCode را می‌دهد. می‌توانید پارامترهای دلخواه را به تابع منتقل کنید که سپس به تابع منتقل می‌شوند. شیء `vscode` همیشه به عنوان اولین آرگومان و پس از آن پارامترهای تابع خارجی ارسال می‌شود. توجه داشته باشید که نمی‌توانید به متغیرهای خارج از محدوده تابع دسترسی پیدا کنید زیرا کالبک به صورت از راه دور اجرا می‌شود. در اینجا یک مثال آمده است:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

برای مستندات کامل page object، [مستندات](https://webdriverio-community.github.io/wdio-vscode-service/modules.html) را بررسی کنید. می‌توانید نمونه‌های مختلف استفاده را در [مجموعه تست‌های این پروژه](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs) پیدا کنید.

## پیکربندی

از طریق پیکربندی سرویس، می‌توانید نسخه VSCode و همچنین تنظیمات کاربر برای VSCode را مدیریت کنید:

### گزینه‌های سرویس

گزینه‌های سرویس، گزینه‌هایی هستند که برای راه‌اندازی محیط تست به سرویس نیاز دارند.

#### `cachePath`

مسیر کش را تعریف کنید تا از دانلود مجدد بسته‌های VS Code جلوگیری شود. این برای CI/CD مفید است تا از دانلود مجدد VSCode برای هر اجرای تست جلوگیری شود.

نوع: `string`<br />
پیش‌فرض: `process.cwd()`

### قابلیت‌های VSCode (`wdio:vscodeOptions`)

برای اجرای تست‌ها از طریق VSCode، باید `vscode` را به عنوان `browserName` تعریف کنید. می‌توانید نسخه VSCode را با ارائه قابلیت `browserVersion` مشخص کنید. گزینه‌های سفارشی VSCode سپس در قابلیت سفارشی `wdio:vscodeOptions` تعریف می‌شوند. گزینه‌ها به شرح زیر هستند:

#### `binary`

مسیر به نصب محلی VSCode. اگر این گزینه ارائه نشود، سرویس VSCode را بر اساس `browserVersion` داده شده (یا `stable` اگر داده نشده باشد) دانلود می‌کند.

نوع: `string`

#### `extensionPath`

دایرکتوری افزونه‌ای را که می‌خواهید تست کنید تعریف کنید.

نوع: `string`

#### `storagePath`

مکان سفارشی برای VS Code جهت ذخیره تمام داده‌های آن تعریف کنید. این ریشه برای دایرکتوری‌های داخلی VS Code مانند (لیست جزئی) است
* **user-data-dir**: دایرکتوری که تمام تنظیمات کاربر (تنظیمات جهانی)، لاگ‌های افزونه و غیره در آن ذخیره می‌شوند.
* **extension-install-dir**: دایرکتوری که افزونه‌های VS Code در آن نصب می‌شوند.

اگر ارائه نشود، از یک دایرکتوری موقت استفاده می‌شود.

نوع: `string`

#### `userSettings`

تنظیمات کاربر سفارشی برای اعمال به VSCode تعریف کنید.

نوع: `Record<string, number | string | object | boolean>`<br />
پیش‌فرض: `{}`

#### `workspacePath`

VSCode را برای یک فضای کاری خاص باز می‌کند. اگر ارائه نشود، VSCode بدون باز شدن فضای کاری شروع می‌شود.

نوع: `string`

#### `filePath`

VSCode را با یک فایل خاص باز شده باز می‌کند.

نوع: `string`

#### `vscodeArgs`

آرگومان‌های اضافی راه‌اندازی به عنوان یک شیء، به عنوان مثال:

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

به صورت زیر ارسال خواهد شد:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

نوع: `Record<string, string | boolean>`<br />
پیش‌فرض: به [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14) مراجعه کنید

#### `verboseLogging`

اگر روی true تنظیم شود، سرویس خروجی VSCode از میزبان افزونه و API کنسول را ثبت می‌کند.

نوع: `boolean`<br />
پیش‌فرض: `false`

#### `vscodeProxyOptions`

تنظیمات پروکسی API VSCode تعریف می‌کند که چگونه WebdriverIO به workbench VSCode متصل می‌شود تا به شما دسترسی به API VSCode را بدهد.

نوع: `VSCodeProxyOptions`<br />
پیش‌فرض:

```ts
{
    /**
     * If set to true, the service tries to establish a connection with the
     * VSCode workbench to enable access to the VSCode API
     */
    enable: true,
    /**
     * Port of the WebSocket connection used to connect to the workbench.
     * By default set to an available port in your operating system.
     */
    // port?: number
    /**
     * Timeout for connecting to WebSocket inside of VSCode
     */
    connectionTimeout: 5000,
    /**
     * Timeout for command to be executed within VSCode
     */
    commandTimeout: 5000
}
```

### Chromedriver

از نسخه VSCode v1.86 به بعد، استفاده از `webdriverio` نسخه v8.14 یا بالاتر برای نصب Chromedriver بدون نیاز به پیکربندی لازم است. [تنظیمات ساده‌شده اتوماسیون مرورگر](https://webdriver.io/blog/2023/07/31/driver-management) همه کارها را برای شما انجام می‌دهد.

برای تست نسخه‌های قدیمی‌تر VS Code، نسخه مورد انتظار Chromedriver را از لاگ‌ها پیدا کنید، [Chromedriver](https://chromedriver.chromium.org/downloads) را دانلود کنید و مسیر را پیکربندی کنید. به عنوان مثال:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## ایجاد Page Object های خودتان

می‌توانید از اجزای مورد استفاده در این سرویس برای page object های بررسی خود استفاده کنید. برای این کار ابتدا فایلی ایجاد کنید که تمام selectors شما را تعریف می‌کند، به عنوان مثال:

```ts
// e.g. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // component container element
    submit: 'button[type="submit"]', // submit button
    username: 'input.username', // username input
    password: 'input.password' // password input
}
```

اکنون می‌توانید یک page object به صورت زیر ایجاد کنید:

```ts
// e.g. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private locator key to identify locator map (see locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

اکنون در تست خود، می‌توانید از page object خود به صورت زیر استفاده کنید:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// e.g. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // you can also use page object elements directly via `[selector]$`
        // or `[selector]$$`, e.g.:
        await loginForm.submit$.click()

        // or access locators directly
        console.log(loginForm.locators.username)
        // outputs: "input.username"
    })
})
```

## پشتیبانی TypeScript

اگر از WebdriverIO با TypeScript استفاده می‌کنید، مطمئن شوید که `wdio-vscode-service` را به `types` در `tsconfig.json` خود اضافه کنید، به عنوان مثال:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // add this service to your types
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## پشتیبانی پروکسی

در طول راه‌اندازی این سرویس، یک توزیع ChromeDriver و VSCode دانلود می‌شود. می‌توانید این درخواست‌ها را از طریق یک پروکسی با تنظیم متغیر محیطی `HTTPS_PROXY` یا `https_proxy` ارسال کنید. به عنوان مثال:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## منابع

افزونه‌های VS Code زیر از `wdio-vscode-service` استفاده می‌کنند:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k دانلود)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m دانلود)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k دانلود)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m دانلود)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k دانلود)

## مشارکت

قبل از ارسال یک pull request، لطفاً موارد زیر را اجرا کنید:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (یا `npm run ci`)

## اطلاعات بیشتر

اگر می‌خواهید در مورد تست افزونه‌های VSCode بیشتر بدانید، سخنرانی [Christian Bromann](https://twitter.com/bromann) را در [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU) بررسی کنید:

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

برای اطلاعات بیشتر در مورد WebdriverIO، [صفحه اصلی](https://webdriver.io) پروژه را بررسی کنید.