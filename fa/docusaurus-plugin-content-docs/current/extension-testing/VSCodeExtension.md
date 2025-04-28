---
id: vscode-extensions
title: تست افزونه‌های VS Code
---

WebdriverIO به شما امکان می‌دهد تا به طور یکپارچه [افزونه‌های VS Code](https://code.visualstudio.com/) خود را از ابتدا تا انتها در محیط کاربری دسکتاپ VS Code یا به عنوان افزونه وب تست کنید. شما فقط باید مسیری به افزونه خود ارائه دهید و فریم‌ورک بقیه کارها را انجام می‌دهد. با [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) همه چیز مدیریت می‌شود و موارد بیشتر:

- 🏗️ نصب VSCode (نسخه پایدار، نسخه insider یا نسخه مشخص شده)
- ⬇️ دانلود Chromedriver مخصوص نسخه VSCode ارائه شده
- 🚀 به شما امکان دسترسی به API های VSCode از تست‌های خود را می‌دهد
- 🖥️ راه‌اندازی VSCode با تنظیمات کاربری سفارشی (شامل پشتیبانی از VSCode در اوبونتو، مک و ویندوز)
- 🌐 یا VSCode را از یک سرور ارائه می‌دهد تا از طریق هر مرورگر برای تست افزونه‌های وب قابل دسترسی باشد
- 📔 راه‌اندازی page objects با لوکیتورهای منطبق با نسخه VSCode شما

## شروع کار

برای شروع یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

یک راهنمای نصب شما را در طول فرآیند راهنمایی خواهد کرد. اطمینان حاصل کنید که گزینه _"VS Code Extension Testing"_ را هنگامی که از شما می‌پرسد چه نوع تستی می‌خواهید انجام دهید، انتخاب کنید. پس از آن، تنظیمات پیش‌فرض را نگه دارید یا بر اساس ترجیح خود تغییر دهید.

## مثال پیکربندی

برای استفاده از این سرویس، باید `vscode` را به لیست سرویس‌های خود اضافه کنید که اختیاری می‌تواند با یک شیء پیکربندی دنبال شود. این کار باعث می‌شود WebdriverIO نسخه‌های VSCode مورد نظر و نسخه مناسب Chromedriver را دانلود کند:

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

اگر `wdio:vscodeOptions` را با هر `browserName` دیگری به جز `vscode` تعریف کنید، مثلاً `chrome`، این سرویس افزونه را به عنوان افزونه وب ارائه می‌دهد. اگر روی Chrome تست می‌کنید، هیچ سرویس درایور اضافی مورد نیاز نیست، به عنوان مثال:

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

در فایل `tsconfig.json` خود، مطمئن شوید که `wdio-vscode-service` را به لیست types خود اضافه کرده‌اید:

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

سپس می‌توانید از متد `getWorkbench` برای دسترسی به page object‌ها برای لوکیتورهای منطبق با نسخه VSCode مورد نظر خود استفاده کنید:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

از آنجا می‌توانید با استفاده از متدهای page object مناسب به تمام page object‌ها دسترسی پیدا کنید. برای کسب اطلاعات بیشتر در مورد تمام page object‌های موجود و متدهای آنها به [مستندات page object](https://webdriverio-community.github.io/wdio-vscode-service/) مراجعه کنید.

### دسترسی به API‌های VSCode

اگر می‌خواهید اتوماسیون خاصی را از طریق [API VSCode](https://code.visualstudio.com/api/references/vscode-api) اجرا کنید، می‌توانید این کار را با اجرای دستورات راه دور از طریق دستور سفارشی `executeWorkbench` انجام دهید. این دستور به شما امکان می‌دهد کد را از تست خود در محیط VSCode به صورت راه دور اجرا کنید و امکان دسترسی به API VSCode را فراهم می‌کند. می‌توانید پارامترهای دلخواه را به تابع منتقل کنید که سپس به تابع منتقل می‌شوند. شی `vscode` همیشه به عنوان اولین آرگومان پس از پارامترهای تابع خارجی ارسال می‌شود. توجه داشته باشید که نمی‌توانید به متغیرهای خارج از محدوده تابع دسترسی داشته باشید زیرا callback به صورت راه دور اجرا می‌شود. در اینجا یک مثال آمده است:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

برای مستندات کامل page object، [مستندات](https://webdriverio-community.github.io/wdio-vscode-service/modules.html) را بررسی کنید. شما می‌توانید مثال‌های مختلف استفاده را در [مجموعه تست این پروژه](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs) پیدا کنید.

## اطلاعات بیشتر

شما می‌توانید اطلاعات بیشتری در مورد نحوه پیکربندی [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) و نحوه ایجاد page object‌های سفارشی در [مستندات سرویس](/docs/wdio-vscode-service) کسب کنید. همچنین می‌توانید سخنرانی زیر توسط [Christian Bromann](https://twitter.com/bromann) درباره [_تست افزونه‌های پیچیده VSCode با قدرت استانداردهای وب_](https://www.youtube.com/watch?v=PhGNTioBUiU) را تماشا کنید:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>