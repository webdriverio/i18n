---
id: vscode-extensions
title: تست افزونه‌های VS Code
description: "افزونه‌های VS Code را به‌صورت سرتاسری در IDE دسکتاپ یا به‌عنوان افزونه‌های وب با WebdriverIO و سرویس VS Code تست کنید."
---

WebdriverIO به شما امکان می‌دهد افزونه‌های [VS Code](https://code.visualstudio.com/) خود را به‌صورت یکپارچه و سرتاسری در IDE دسکتاپ VS Code یا به‌عنوان افزونه وب تست کنید. تنها کافی است مسیر افزونه خود را ارائه دهید و فریم‌ورک بقیه کارها را انجام می‌دهد. با [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) همه چیز مدیریت می‌شود و امکانات بسیار بیشتری نیز در اختیار دارید:

- 🏗️ نصب VSCode (نسخه stable، insiders یا یک نسخه مشخص)
- ⬇️ دانلود Chromedriver مخصوص نسخه مشخص‌شده VSCode
- 🚀 امکان دسترسی به API مربوط به VSCode از داخل تست‌ها
- 🖥️ اجرای VSCode با تنظیمات کاربری سفارشی (شامل پشتیبانی از VSCode روی Ubuntu، MacOS و Windows)
- 🌐 یا ارائه VSCode از طریق یک سرور تا هر مرورگری بتواند برای تست افزونه‌های وب به آن دسترسی داشته باشد
- 📔 راه‌اندازی page objectها با locatorهای منطبق با نسخه VSCode شما

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

یک راهنمای نصب شما را در طول فرایند همراهی می‌کند. هنگامی که پرسیده می‌شود چه نوع تستی می‌خواهید انجام دهید، حتماً گزینه _"VS Code Extension Testing"_ را انتخاب کنید و پس از آن تنظیمات پیش‌فرض را حفظ کنید یا آن‌ها را بر اساس ترجیح خود تغییر دهید.

## نمونه پیکربندی

برای استفاده از این سرویس باید `vscode` را به فهرست سرویس‌های خود اضافه کنید و در صورت تمایل یک شیء پیکربندی نیز به آن بدهید. این کار باعث می‌شود WebdriverIO فایل‌های اجرایی VSCode مشخص‌شده و نسخه مناسب Chromedriver را دانلود کند:

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

اگر `wdio:vscodeOptions` را با هر `browserName` دیگری به‌جز `vscode`، مثلاً `chrome`، تعریف کنید، سرویس افزونه را به‌عنوان افزونه وب ارائه می‌دهد. اگر روی Chrome تست می‌کنید، به هیچ سرویس درایور اضافی نیاز نیست، برای مثال:

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

_توجه:_ هنگام تست افزونه‌های وب، تنها می‌توانید بین `stable` یا `insiders` به‌عنوان `browserVersion` انتخاب کنید.

### راه‌اندازی TypeScript

در فایل `tsconfig.json` خود، حتماً `wdio-vscode-service` را به فهرست typeها اضافه کنید:

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

## نحوه استفاده

سپس می‌توانید از متد `getWorkbench` برای دسترسی به page objectهای مربوط به locatorهای منطبق با نسخه موردنظر VSCode استفاده کنید:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

از آنجا می‌توانید با استفاده از متدهای مناسب page object به همه page objectها دسترسی داشته باشید. اطلاعات بیشتر درباره همه page objectهای موجود و متدهای آن‌ها را در [مستندات page object](https://webdriverio-community.github.io/wdio-vscode-service/) بیابید.

### دسترسی به APIهای VSCode

اگر می‌خواهید خودکارسازی خاصی را از طریق [API مربوط به VSCode](https://code.visualstudio.com/api/references/vscode-api) اجرا کنید، می‌توانید این کار را با اجرای دستورات از راه دور به کمک دستور سفارشی `executeWorkbench` انجام دهید. این دستور امکان اجرای از راه دور کد از داخل تست شما در محیط VSCode را فراهم می‌کند و دسترسی به API مربوط به VSCode را ممکن می‌سازد. می‌توانید پارامترهای دلخواه را به تابع بدهید که سپس به داخل تابع منتقل می‌شوند. شیء `vscode` همیشه به‌عنوان آرگومان اول و پیش از پارامترهای تابع بیرونی ارسال می‌شود. توجه داشته باشید که نمی‌توانید به متغیرهای خارج از محدوده تابع دسترسی داشته باشید، زیرا callback از راه دور اجرا می‌شود. در اینجا یک مثال آورده شده است:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // خروجی: "I am an API call!"
```

برای مشاهده مستندات کامل page object، به [مستندات](https://webdriverio-community.github.io/wdio-vscode-service/modules.html) مراجعه کنید. نمونه‌های مختلف استفاده را می‌توانید در [مجموعه تست این پروژه](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs) بیابید.

## اطلاعات بیشتر

می‌توانید درباره نحوه پیکربندی [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) و چگونگی ایجاد page objectهای سفارشی در [مستندات سرویس](/docs/wdio-vscode-service) اطلاعات بیشتری کسب کنید. همچنین می‌توانید سخنرانی زیر از [Christian Bromann](https://twitter.com/bromann) با عنوان [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) را تماشا کنید:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>