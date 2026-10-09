---
id: mobile
title: اپلیکیشن‌های موبایل
description: راه‌اندازی و اجرای تست‌های WebdriverIO برای اپلیکیشن‌های نیتیو، هیبرید و وب موبایل روی شبیه‌سازهای Android و iOS، دستگاه‌های واقعی و سرویس‌های ابری دستگاه.
---

WebdriverIO پلتفرم‌های Android و iOS را از طریق [Appium](/docs/appium) خودکارسازی می‌کند که با پروتکل WebDriver ارتباط برقرار می‌کند. تست‌های شما از همان شیء `browser` (با نام مستعار `driver`)، انتخابگرهای `$`/`$$` و تطبیق‌دهنده‌های `expect` استفاده می‌کنند که در تست‌های مرورگر به کار می‌روند. Appium هر نشست را به یک درایور پلتفرم هدایت می‌کند که توسط `appium:automationName` انتخاب می‌شود. برای Android این درایور `UiAutomator2` است و Espresso نیز به‌عنوان جایگزینی وجود دارد که استراتژی‌های انتخابگر بیشتری را فراهم می‌کند. برای iOS و iPadOS این درایور `XCUITest` است. با این درایورها می‌توانید اپلیکیشن‌های نیتیو و وب موبایل را در Chrome روی Android یا Safari روی iOS تست کنید. همچنین می‌توانید اپلیکیشن‌های هیبرید را تست کنید و بین کانتکست نیتیو و webviewهای تعبیه‌شده جابه‌جا شوید. نشست‌ها می‌توانند روی شبیه‌سازهای Android (emulator)، شبیه‌سازهای iOS (simulator)، دستگاه‌های واقعی یا سرویس‌های ابری دستگاه مانند Sauce Labs، BrowserStack، TestingBot و TestMu AI اجرا شوند. سرویس [`@wdio/appium-service`](/docs/appium-service) یک سرور محلی Appium را برای شما راه‌اندازی و متوقف می‌کند. WebdriverIO علاوه بر API خام Appium، [دستورات موبایل](/docs/api/mobile) چندسکویی مانند `tap`، `swipe`، `longPress`، `scrollIntoView` و `switchContext` را اضافه می‌کند.

## شروع سریع

پیش‌نیازها: برای Android، نرم‌افزار Android Studio به همراه Android SDK و یک emulator؛ برای iOS، نرم‌افزار Xcode و یک simulator روی macOS. دستور `npx appium-installer` شما را در راه‌اندازی محیط راهنمایی می‌کند و دستور `npm init wdio@latest .` یک پروژه موبایل ایجاد می‌کند (Android یا iOS را انتخاب کنید). برای راه‌اندازی دستی:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/appium-service appium tsx
npx appium driver install uiautomator2   # Android
npx appium driver install xcuitest       # iOS
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './path/to/app.apk'
    }],
    services: ['appium'],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/app.e2e.ts"
import { expect, driver, $ } from '@wdio/globals'

describe('My app', () => {
    it('should open the contacts screen', async () => {
        await $('~Contacts').click()
        await expect($('~Add contact')).toBeDisplayed()
    })

    it('should interact with a webview', async () => {
        await driver.switchContext({ title: 'My Webview Title' })
        await expect($('h1')).toBeDisplayed()
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

`~` انتخابگر accessibility id است: در Android به `content-description` و در iOS به `accessibilityIdentifier` نگاشت می‌شود و استراتژی ترجیحی چندسکویی است. شناسه‌های نمونه، عنوان webview و مسیر اپلیکیشن را با مقادیر خودتان جایگزین کنید.

برای اهداف دیگر فقط capabilities تغییر می‌کند:

```ts title="iOS simulator (native app)"
{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone Simulator',
    'appium:platformVersion': '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': './path/to/MyApp.app' // .app for simulators, signed .ipa for real devices
}
```

```ts title="Mobile web (Chrome on an Android emulator)"
{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:deviceName': 'Android GoogleAPI Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
}
```

برای وب موبایل در iOS، از `platformName: 'iOS'`، `browserName: 'Safari'` و `'appium:automationName': 'XCUITest'` استفاده کنید.

## مسیر خود را انتخاب کنید

- [راه‌اندازی Appium](/docs/appium): Appium چه پلتفرم‌هایی را پوشش می‌دهد (iOS، Android، Tizen، اپلیکیشن‌های تلویزیون) و نحوه نصب ابزارهای مورد نیاز.
- [سرویس Appium](/docs/appium-service): گزینه‌های سرویس (`args`، `command`، `logPath`)، دستور `npx start-appium-inspector` برای باز کردن Appium Inspector و یک بهینه‌ساز آزمایشی برای انتخابگرهای XPath کند.
- [دستورات موبایل](/docs/api/mobile): حرکات و ابزارهای کمکی چندسکویی. شامل اپلیکیشن‌های هیبرید با [`getContexts`](/docs/api/mobile/getContexts) و [`switchContext`](/docs/api/mobile/switchContext) و همچنین capabilities مربوط به webview برای iOS.
- [انتخابگرهای موبایل](/docs/selectors#mobile-selectors): accessibility id، UiAutomator در Android، تطبیق‌دهنده‌های data/view در Espresso و predicate stringها و class chainها در iOS.
- [دستورات پروتکل Appium](/docs/api/appium): endpointهای خام Appium که روی `driver` در دسترس هستند.
- [اپلیکیشن‌های Flutter](/docs/flutter-testing/introduction): چرا Flutter به Appium Flutter Driver نیاز دارد، سپس [آماده‌سازی اپلیکیشن](/docs/flutter-testing/preparing-flutter-application)، [پیکربندی Appium](/docs/flutter-testing/base-appium-configuration)، [راه‌اندازی WebdriverIO](/docs/flutter-testing/setting-up-webdriverio) و [نوشتن تست‌ها](/docs/flutter-testing/writing-tests).
- [سرویس‌های ابری](/docs/cloudservices): اتصال به Sauce Labs، BrowserStack، TestingBot، TestMu AI، Perfecto یا RobotActions برای اجرا روی دستگاه‌های واقعی میزبانی‌شده.
- [تست بصری](/docs/visual-testing): مقایسه تصویر برای اپلیکیشن‌های نیتیو، اپلیکیشن‌های هیبرید و مرورگرهای موبایل. برای Percy روی موبایل، به [App Percy](/docs/visual-testing/integrate-with-app-percy) مراجعه کنید.
- [Multi-remote](/docs/multiremote): هماهنگ‌سازی چندین دستگاه یا مرورگر در یک تست.

شبیه‌سازی viewport یک دستگاه در مرورگر دسکتاپ با [`browser.emulate('device', ...)`](/docs/emulation) تست موبایل محسوب نمی‌شود. موتورهای مرورگر دسکتاپ با موتورهای موبایل تفاوت دارند، بنابراین به‌جای آن از Appium با یک مرورگر موبایل واقعی استفاده کنید.

## عیب‌یابی

- نشست شروع نمی‌شود: مطمئن شوید درایور Appium مربوط به `appium:automationName` شما نصب شده و emulator یا simulator در حال اجرا است. از `port: 4723` استفاده کنید، مگر اینکه پورت Appium را تغییر داده باشید.
- iOS نمی‌تواند webview را پیدا کند: `appium:webviewConnectRetries`، `appium:webviewConnectTimeout` یا `appium:includeSafariInWebviews` را امتحان کنید (به [اپلیکیشن‌های هیبرید](/docs/api/mobile#hybrid-apps) مراجعه کنید).
- webview در Android دیر ظاهر می‌شود: مقادیر `androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout` را در `getContexts`/`switchContext` تنظیم کنید.
- ویجت‌های Flutter با انتخابگرهای نیتیو پیدا نمی‌شوند: این رفتار مورد انتظار است. از درایور Flutter و finderهای توضیح داده‌شده در [راهنمای Flutter](/docs/flutter-testing/introduction) استفاده کنید.

## گام‌های بعدی

- مراجع [پیکربندی](/docs/configuration) و [Capabilities](/docs/capabilities).
- [الگوی Page Object](/docs/pageobjects) برای اشتراک‌گذاری صفحه‌ها بین specهای Android و iOS.
- [MCP](/docs/mcp) برای اینکه یک عامل هوش مصنوعی بتواند نشست‌های iOS و Android را از طریق Appium هدایت کند.
- پلتفرم‌های دیگر: [مرورگرهای وب](/docs/platforms/web)، [اپلیکیشن‌های دسکتاپ](/docs/platforms/desktop)، [افزونه‌ها و ویرایشگرها](/docs/platforms/apps-and-extensions).