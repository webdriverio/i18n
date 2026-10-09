---
id: apps-and-extensions
title: افزونه‌ها و ویرایشگرها
description: یک افزونه مرورگر یا افزونه VS Code را در یک نشست WebdriverIO بارگذاری کنید و آن را به‌صورت سرتاسری (end to end) تست کنید.
---

WebdriverIO افزونه‌های مرورگر و افزونه‌های ویرایشگر را با بارگذاری آن‌ها در برنامه میزبان واقعی تست می‌کند. افزونه‌های مرورگر (وب) درون Chrome یا Firefox اجرا می‌شوند. شما آن‌ها را از طریق قابلیت‌های (capabilities) مرورگر بارگذاری می‌کنید: در Chrome با `--load-extension` یا یک فایل `.crx` به‌صورت base64 از طریق `goog:chromeOptions`، یا در Firefox با `browser.installAddOn()` برای یک فایل `.xpi`. در یک نشست WebDriver BiDi همچنین می‌توانید با `browser.installExtension()` و `browser.uninstallExtension()` یک افزونه را در میانه نشست نصب و حذف کنید. Safari نشست BiDi ندارد، بنابراین این دستور Safari را پوشش نمی‌دهد. از آن پس، اسکریپت‌های محتوا (content scripts) و صفحات popup را با دستورات معمول WebDriver تست می‌کنید. افزونه‌های VS Code با سرویس جامعه‌محور [`wdio-vscode-service`](/docs/wdio-vscode-service) تست می‌شوند. این سرویس VS Code (نسخه stable، insiders یا یک نسخه مشخص) و Chromedriver متناظر را دانلود می‌کند، سپس VS Code را با افزونه شما و تنظیمات کاربری سفارشی اجرا می‌کند. Page objectها برای workbench از طریق `browser.getWorkbench()` در دسترس هستند و `browser.executeWorkbench()` کد را روی API مربوط به VS Code اجرا می‌کند. همین سرویس می‌تواند VS Code را در مرورگر نیز ارائه دهد تا افزونه‌های وب را تست کنید. پلاگین‌های Obsidian نیز یک سرویس جامعه‌محور دارند.

## شروع سریع

ابتدا testrunner و پشتیبانی TypeScript را نصب کنید:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

### افزونه Chrome

افزونه خود را در یک پوشه (در اینجا `./dist`) build کنید و آن را با آرگومان Chrome یعنی `--load-extension` بارگذاری کنید:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // با عنصری جایگزین کنید که اسکریپت محتوای شما به صفحه اضافه می‌کند
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

کلیک روی آیکون افزونه در نوار ابزار کار نمی‌کند. برای تست یک `default_popup`، شناسه افزونه را در `chrome://extensions/` پیدا کنید و `chrome-extension://<id>/<popup>.html` را با `browser.url()` باز کنید. [راهنمای افزونه وب](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) یک دستور سفارشی آماده به نام `openExtensionPopup` برای این کار دارد.

### افزونه VS Code

```sh
npm install --save-dev wdio-vscode-service
```

`"wdio-vscode-service"` را به آرایه `types` در `tsconfig.json` اضافه کنید.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // همچنین ممکن است: "insiders" یا یک نسخه مشخص مثلاً "1.80.0"
        'wdio:vscodeOptions': {
            // به پوشه‌ای اشاره می‌کند که package.json افزونه در آن قرار دارد
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

برای تست افزونه به‌عنوان یک افزونه وب VS Code، مقدار `browserName: 'chrome'` را تنظیم کنید و `wdio:vscodeOptions` را حفظ کنید. در این حالت، `browserVersion` فقط می‌تواند `stable` یا `insiders` باشد. اجرای `npm create wdio@latest ./` با گزینه "VS Code Extension Testing" این پیکربندی را برای شما ایجاد می‌کند.

## مسیر خود را انتخاب کنید

- [تست افزونه وب](/docs/extension-testing/web-extensions): بارگذاری افزونه‌ها در Chrome (پوشه یا `.crx`) و Firefox (`.xpi` از طریق [`installAddOn`](/docs/api/gecko#installaddon))، یا نصب و حذف یک افزونه در میانه نشست با [`installExtension`](/docs/api/browser/installExtension). افزونه‌های وب Safari پوشش داده نمی‌شوند.
- [سرویس پروفایل Firefox](/docs/firefox-profile-service): ساخت یک پروفایل Firefox که شامل افزونه‌ها باشد.
- [تست افزونه VS Code](/docs/extension-testing/vscode-extensions): پیکربندی، راه‌اندازی TypeScript، page objectهای workbench و `executeWorkbench`.
- [سرویس VS Code](/docs/wdio-vscode-service): همه گزینه‌های سرویس، مانند `cachePath`، و نحوه نوشتن page objectهای سفارشی.
- [سرویس تست پلاگین Obsidian](/docs/wdio-obsidian-service): یک سرویس جامعه‌محور که پلاگین‌های Obsidian را در نسخه‌های مختلف Obsidian روی Windows، macOS، Linux و Android تست می‌کند.
- [دستورات سفارشی](/docs/customcommands): بسته‌بندی توابع کمکی مانند `openExtensionPopup` برای استفاده مجدد.

تست‌های افزونه وب در یک نشست معمولی Chrome یا Firefox اجرا می‌شوند، بنابراین همه موارد مطرح‌شده در [مرورگرهای وب](/docs/platforms/web) نیز صدق می‌کنند، از جمله selectorها، شبیه‌سازی شبکه (network mocking) و تست بصری.

## عیب‌یابی

- Firefox به دلیل امضا (signing) یک افزونه build‌شده محلی را نمی‌پذیرد: به جای استفاده از پروفایل، آن را در هوک `before` با `browser.installAddOn(extension.toString('base64'), true)` نصب کنید. فایل `.xpi` را با `npx web-ext build` بسازید.
- استفاده از Edge، Brave یا Opera به جای Chrome: معمولاً همان آرگومان‌ها با قابلیت گزینه‌های آن مرورگر کار می‌کنند، مثلاً `ms:edgeOptions`.
- فایل‌های اجرایی VS Code و Chromedriver در یک پوشه cache دانلود می‌شوند. برای کنترل محل ذخیره آن‌ها، مثلاً برای cache کردن در CI، مقدار `services: [['vscode', { cachePath: __dirname }]]` را تنظیم کنید.
- TypeScript نمی‌تواند `getWorkbench` یا `executeWorkbench` را پیدا کند: `wdio-vscode-service` را به `compilerOptions.types` اضافه کنید.

## گام‌های بعدی

- مرجع [پیکربندی](/docs/configuration) برای همه گزینه‌های `wdio.conf.ts`.
- [Electron](/docs/desktop-testing/electron) برای تست برنامه‌های دسکتاپ کامل ساخته‌شده بر پایه Chromium.
- پلتفرم‌های دیگر: [مرورگرهای وب](/docs/platforms/web)، [اپلیکیشن‌های موبایل](/docs/platforms/mobile)، [اپلیکیشن‌های دسکتاپ](/docs/platforms/desktop).