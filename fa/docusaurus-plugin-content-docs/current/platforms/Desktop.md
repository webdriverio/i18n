---
id: desktop
title: برنامه‌های دسکتاپ
description: راه‌اندازی مناسب WebdriverIO را برای برنامه‌های بومی macOS و برای برنامه‌های Electron، Tauri و Dioxus روی macOS، Windows و Linux انتخاب کنید و اولین تست خود را اجرا کنید.
---

نحوه خودکارسازی یک برنامه دسکتاپ توسط WebdriverIO به نحوه ساخت آن برنامه بستگی دارد. برنامه‌های بومی macOS از طریق [Appium](/docs/appium) با درایور Mac2 (`'appium:automationName': 'Mac2'`) خودکارسازی می‌شوند که به Xcode نیاز دارد. برنامه‌هایی که با یک فریم‌ورک مبتنی بر وب ساخته شده‌اند، از طریق موتور مرورگر تعبیه‌شده‌شان و توسط یک سرویس اختصاصی WebdriverIO کنترل می‌شوند. [سرویس Electron](/docs/desktop-testing/electron) از Chromium از طریق یک Chromedriver که به‌صورت خودکار نصب می‌شود استفاده می‌کند و همچنین می‌تواند APIهای فرایند اصلی (main process) در Electron را فراخوانی کند. [سرویس Tauri](/docs/desktop-testing/tauri) و [سرویس Dioxus](/docs/desktop-testing/dioxus) وب‌ویوی سیستم‌عامل را کنترل می‌کنند: WebView2 در Windows، WKWebView در macOS و WebKitGTK در Linux. این سه سرویس مجموعه تست یکسانی را روی Windows، macOS و Linux اجرا می‌کنند. برای برنامه‌های بومی Windows در حال حاضر هیچ درایور پیشنهادی وجود ندارد: درایور Windows در Appium بر پایه WinAppDriver مایکروسافت ساخته شده که دیگر نگهداری نمی‌شود. هیچ پشتیبانی مستندی برای خودکارسازی برنامه‌های بومی دلخواه در Linux وجود ندارد.

| نوع برنامه | macOS | Windows | Linux | روش |
|----------|-------|---------|-------|-----|
| برنامه بومی | بله | توصیه نمی‌شود | مستند نشده | درایور Appium Mac2 |
| Electron | بله | بله | بله | `@wdio/electron-service` (Chromedriver) |
| Tauri | بله | بله | بله | `@wdio/tauri-service` (پلاگین تعبیه‌شده، `tauri-driver` یا CrabNebula) |
| Dioxus | بله | بله | بله | `@wdio/dioxus-service` (درایور تعبیه‌شده؛ درایور خارجی فقط در Windows) |

## شروع سریع

دستور `npm create wdio@latest ./` همه این موارد را راه‌اندازی می‌کند. گزینه "Desktop Testing - of Electron, Tauri, Dioxus, or macOS Applications" و سپس فریم‌ورک خود را انتخاب کنید. هر یک از راه‌اندازی‌های زیر همچنین به `@wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx` و یک فایل `tsconfig.json` با `"types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]` نیاز دارد.

### Electron (macOS، Windows، Linux)

```sh
npm install --save-dev @wdio/electron-service
```

```ts title="wdio.conf.ts"
/// <reference types="@wdio/electron-service" />
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'electron',
        'wdio:electronServiceOptions': {
            // فقط در صورتی لازم است که تشخیص خودکار خروجی Electron Forge / electron-builder با شکست مواجه شود
            // appBinaryPath: './dist-electron/linux-unpacked/myApp',
            appArgs: []
        }
    }],
    services: ['electron'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { browser } from '@wdio/globals'

describe('Electron Testing', () => {
    it('should print application title', async () => {
        console.log('Hello', await browser.getTitle(), 'application!')
    })
})
```

از `browser.electron.execute((electron, ...args) => { ... })` برای اجرای کد در فرایند اصلی و از `browser.electron.mock()` برای ماک کردن APIهای Electron استفاده کنید.

### برنامه بومی macOS (Appium Mac2)

```sh
npm install --save-dev @wdio/appium-service appium appium-mac2-driver
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Mac',
        'appium:automationName': 'Mac2',
        'appium:bundleId': 'com.apple.calculator'
    }],
    services: ['appium'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/calculator.e2e.ts"
import { expect, $ } from '@wdio/globals'

describe('MacOS Testing', () => {
    it('should calculate the meaning of life', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    })
})
```

`appium:bundleId` برنامه‌ای را که باید در شروع نشست (session) اجرا شود انتخاب می‌کند.

### Tauri و Dioxus

هر دو به یک افزودنی در سمت Rust برنامه شما نیاز دارند، بنابراین راهنمای شروع سریع آن‌ها را دنبال کنید:

- Tauri: کریت `tauri-plugin-wdio-webdriver` (ارائه‌دهنده تعبیه‌شده) را اضافه کنید، سپس از `services: [['tauri', { appBinaryPath: './src-tauri/target/release/my-tauri-app', driverProvider: 'embedded' }]]` استفاده کنید. [شروع سریع Tauri](/docs/desktop-testing/tauri/quick-start) را ببینید.
- Dioxus: کریت `wdio-dioxus-bridge` را اضافه کنید و یک بیلد دیباگ (`cargo build`) بسازید. سپس از `services: [['dioxus', { driverProvider: 'embedded' }]]` همراه با `browserName: 'dioxus'` و `'dioxus:options': { application: './target/debug/my-app' }` استفاده کنید. [شروع سریع Dioxus](/docs/desktop-testing/dioxus/quick-start) را ببینید.

## مسیر خود را انتخاب کنید

- [macOS](/docs/desktop-testing/macos): برنامه‌های بومی macOS با Appium و درایور Mac2.
- [Windows](/docs/desktop-testing/windows): وضعیت فعلی خودکارسازی برنامه‌های بومی Windows.
- [Electron](/docs/desktop-testing/electron): راه‌اندازی، سپس [پیکربندی](/docs/desktop-testing/electron/configuration) (شامل مسیرهای فایل اجرایی برای هر سیستم‌عامل)، [دسترسی به APIهای Electron](/docs/desktop-testing/electron/api)، [مرجع API و ماک کردن](/docs/desktop-testing/electron/api-reference)، [مدیریت پنجره‌ها](/docs/desktop-testing/electron/window-management)، [دیپ‌لینک‌ها](/docs/desktop-testing/electron/deeplink-testing)، [حالت مستقل](/docs/desktop-testing/electron/standalone) و [دیباگ کردن](/docs/desktop-testing/electron/debugging).
- [Tauri](/docs/desktop-testing/tauri): [پشتیبانی از پلتفرم‌ها](/docs/desktop-testing/tauri/platform-support)، [پیکربندی](/docs/desktop-testing/tauri/configuration)، [راه‌اندازی پلاگین](/docs/desktop-testing/tauri/plugin-setup)، [CrabNebula](/docs/desktop-testing/tauri/crabnebula-setup)، [Edge WebDriver در Windows](/docs/desktop-testing/tauri/edge-webdriver-windows)، [نمونه‌های استفاده](/docs/desktop-testing/tauri/usage-examples) و [مرجع API](/docs/desktop-testing/tauri/api).
- [Dioxus](/docs/desktop-testing/dioxus): [پشتیبانی از پلتفرم‌ها](/docs/desktop-testing/dioxus/platform-support)، [پیکربندی](/docs/desktop-testing/dioxus/configuration)، [راه‌اندازی bridge](/docs/desktop-testing/dioxus/plugin-setup)، [حالت مرورگر](/docs/desktop-testing/dioxus/browser-mode) (تست‌های فقط فرانت‌اند در Chrome با دستورات ماک‌شده)، [نمونه‌های استفاده](/docs/desktop-testing/dioxus/usage-examples) و [مرجع API](/docs/desktop-testing/dioxus/api).
- [Multi-remote](/docs/multiremote): سرویس‌های Electron، Tauri و Dioxus از نشست‌های multi-remote پشتیبانی می‌کنند، برای مثال دو نمونه از برنامه در یک تست.

## Linux

در Linux، WebdriverIO برنامه‌های Electron، Tauri و Dioxus را کنترل می‌کند. نکاتی که باید بدانید:

- CI بدون رابط گرافیکی (Headless): این برنامه‌ها به یک سرور نمایش (display server) نیاز دارند. وقتی هیچ نمایشگری وجود نداشته باشد، testrunner سرور Weston را راه‌اندازی می‌کند یا به‌عنوان جایگزین از Xvfb استفاده می‌کند. اگر هیچ‌کدام نصب نشده باشند، `displayServerAutoInstall: true` را تنظیم کنید تا یکی از آن‌ها نصب شود. به‌عنوان راه دیگر، testrunner را با xvfb-run اجرا کنید، برای مثال `xvfb-run -a npx wdio run wdio.conf.ts`. [Headless و سرورهای نمایش](/docs/headless-and-display-servers) را ببینید.
- Tauri با ارائه‌دهنده `official` به WebKitWebDriver (بسته `webkit2gtk-driver`) نیاز دارد. ارائه‌دهنده `embedded` به هیچ درایور خارجی نیاز ندارد.
- Dioxus در Linux فقط از ارائه‌دهنده `embedded` پشتیبانی می‌کند و ساخت برنامه‌های Dioxus به کتابخانه‌های توسعه WebKitGTK نیاز دارد.
- Electron در Ubuntu 24.04+ و سایر توزیع‌هایی که AppArmor در آن‌ها فعال است: اگر Electron اجرا نشد، گزینه سرویس `apparmorAutoInstall` را تنظیم کنید.

## عیب‌یابی

- Electron: [مشکلات رایج](/docs/desktop-testing/electron/common-issues)، برای مثال خطای "DevToolsActivePort file doesn't exist" در CI.
- Tauri: [عیب‌یابی](/docs/desktop-testing/tauri/troubleshooting)، شامل عدم تطابق نسخه‌های Edge WebDriver و WebView2.
- Dioxus: [عیب‌یابی](/docs/desktop-testing/dioxus/troubleshooting).
- macOS: برای راه‌اندازی‌های مختص درایور مانند Xcode، پروژه [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) را ببینید.

## گام‌های بعدی

- مرجع [پیکربندی](/docs/configuration) برای تمام گزینه‌های `wdio.conf.ts`.
- گزینه‌های [سرویس Appium](/docs/appium-service) برای راه‌اندازی Mac2.
- پلتفرم‌های دیگر: [مرورگرهای وب](/docs/platforms/web)، [برنامه‌های موبایل](/docs/platforms/mobile)، [افزونه‌ها و ویرایشگرها](/docs/platforms/apps-and-extensions).