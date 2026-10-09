---
id: vscode-extensions
title: تست افزونه‌های VS Code
description: "افزونه‌های VS Code را به صورت سرتاسری (end to end) در IDE دسکتاپ یا به عنوان افزونه‌های وب با WebdriverIO و سرویس VS Code تست کنید."
---

WebdriverIO به شما امکان می‌دهد افزونه‌های [VS Code](https://code.visualstudio.com/) خود را به صورت یکپارچه و سرتاسری در IDE دسکتاپ VS Code یا به عنوان افزونه وب تست کنید. تنها کافی است مسیر افزونه خود را ارائه دهید و فریم‌ورک بقیه کارها را انجام می‌دهد. با [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) همه چیز مدیریت می‌شود و موارد بسیار بیشتری نیز در اختیار شما قرار می‌گیرد:

- 🏗️ نصب VSCode (نسخه stable، insiders یا یک نسخه مشخص)
- ⬇️ دانلود Chromedriver مخصوص نسخه VSCode داده‌شده
- 🚀 امکان دسترسی به VSCode API از داخل تست‌های شما
- 🖥️ راه‌اندازی VSCode با تنظیمات کاربری سفارشی (شامل پشتیبانی از VSCode در Ubuntu، MacOS و Windows)
- 🌐 یا ارائه VSCode از طریق یک سرور تا هر مرورگری برای تست افزونه‌های وب به آن دسترسی داشته باشد
- 📔 راه‌اندازی اولیه page objectها با locatorهای منطبق با نسخه VSCode شما

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

یک راهنمای نصب شما را در طول فرآیند همراهی می‌کند. هنگامی که از شما پرسیده می‌شود چه نوع تستی می‌خواهید انجام دهید، حتماً گزینه _"VS Code Extension Testing"_ را انتخاب کنید، سپس مقادیر پیش‌فرض را حفظ کنید یا بر اساس ترجیح خود تغییر دهید.

## نمونه پیکربندی

برای استفاده از این سرویس باید `vscode` را به فهرست سرویس‌های خود اضافه کنید که به صورت اختیاری می‌تواند با یک شیء پیکربندی همراه باشد. این کار باعث می‌شود WebdriverIO فایل‌های اجرایی VSCode داده‌شده و نسخه مناسب Chromedriver را دانلود کند:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optionally you can define the path WebdriverIO stores all
     * VSCode and Chromedriver binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

اگر `wdio:vscodeOptions` را با هر `browserName` دیگری به جز `vscode` تعریف کنید، مثلاً `chrome`، سرویس افزونه را به عنوان افزونه وب ارائه می‌دهد. اگر روی Chrome تست می‌کنید، به هیچ سرویس درایور اضافه‌ای نیاز نیست، برای مثال:

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

_نکته:_ هنگام تست افزونه‌های وب، تنها می‌توانید بین `stable` یا `insiders` به عنوان `browserVersion` انتخاب کنید.

### راه‌اندازی TypeScript

در فایل `tsconfig.json` خود حتماً `wdio-vscode-service` را به فهرست types اضافه کنید:

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## استفاده

سپس می‌توانید از متد `getWorkbench` برای دسترسی به page objectهای مربوط به locatorهای منطبق با نسخه VSCode مورد نظر خود استفاده کنید:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

از آنجا می‌توانید با استفاده از متدهای مناسب page object به همه page objectها دسترسی داشته باشید. درباره همه page objectهای موجود و متدهای آن‌ها در [مستندات page object](https://webdriverio-community.github.io/wdio-vscode-service/) بیشتر بیاموزید.

### دسترسی به VSCode APIها

اگر می‌خواهید خودکارسازی خاصی را از طریق [VSCode API](https://code.visualstudio.com/api/references/vscode-api) اجرا کنید، می‌توانید این کار را با اجرای دستورات از راه دور از طریق دستور سفارشی `executeWorkbench` انجام دهید. این دستور به شما امکان می‌دهد کدی را از تست خود به صورت از راه دور در محیط VSCode اجرا کنید و به VSCode API دسترسی داشته باشید. می‌توانید پارامترهای دلخواه را به تابع ارسال کنید که سپس به داخل تابع منتقل می‌شوند. شیء `vscode` همیشه به عنوان اولین آرگومان و پیش از پارامترهای تابع بیرونی ارسال می‌شود. توجه داشته باشید که نمی‌توانید به متغیرهای خارج از محدوده تابع دسترسی داشته باشید، زیرا callback به صورت از راه دور اجرا می‌شود. در اینجا یک مثال آمده است:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // خروجی: "I am an API call!"
```

برای مستندات کامل page object، [مستندات](https://webdriverio-community.github.io/wdio-vscode-service/modules.html) را بررسی کنید. می‌توانید نمونه‌های استفاده متنوعی را در [مجموعه تست این پروژه](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs) پیدا کنید.

## اطلاعات بیشتر

می‌توانید درباره نحوه پیکربندی [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) و چگونگی ایجاد page objectهای سفارشی در [مستندات سرویس](/docs/wdio-vscode-service) بیشتر بیاموزید. همچنین می‌توانید سخنرانی زیر از [Christian Bromann](https://twitter.com/bromann) با عنوان [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) را تماشا کنید:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>