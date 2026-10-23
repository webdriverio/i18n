---
id: setting-up-webdriverio
title: راه‌اندازی WebdriverIO در محیط شما
description: "پیکربندی wdio.conf.ts و قابلیت‌های Appium برای اجرای یک برنامه Flutter با Appium Flutter Driver در Android و iOS."
---

فایل `wdio.conf.ts` فایل پیکربندی اصلی هر پروژه WebdriverIO است. این همان جایی است که مشخص می‌کنید تست‌ها کجا اجرا شوند، از کدام فریم‌ورک‌های تست استفاده شود، و `capabilities` لازم برای اینکه Appium بتواند برنامه Flutter را به‌درستی راه‌اندازی کند چه باشند.

:::warning
`appium-flutter-driver` متفاوت از درایورهای بومی سنتی (مانند `UiAutomator2` یا `XCUITest`) عمل می‌کند. این درایور از طریق یک پروتکل سفارشی با افزونه تست Flutter (`flutter_driver`) ارتباط برقرار می‌کند. به همین دلیل، دستورات استاندارد اتوماسیون بومی ممکن است به همان شکل کار نکنند یا الزاماً به استفاده از `appium-flutter-finder` نیاز داشته باشند.

برای درک کامل محدودیت‌ها، دستورات پشتیبانی‌شده و افزونه‌های پروتکل، به مخزن رسمی این ابزار مراجعه کنید: [Appium Flutter Driver on GitHub](https://github.com/appium/appium-flutter-driver).
:::

### پیکربندی Capabilities (Android و iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... سایر پیکربندی‌های wdio.conf.ts (runner، specs و غیره)
    

    services: [
        ['appium', {
            // WebdriverIO چرخه عمر سرور Appium را مدیریت می‌کند
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // پیکربندی ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // استفاده الزامی از درایور Flutter را تعیین می‌کند
            'appium:deviceName': 'Android_Emulator', // نام شبیه‌ساز پیکربندی‌شده یا دستگاه واقعی شما
            // نکته درباره مسیر (به یادداشت سیستم‌عامل‌ها در ادامه مراجعه کنید)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // پیکربندی IOS (نیازمند macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // استفاده الزامی از درایور Flutter را تعیین می‌کند
            'appium:deviceName': 'iPhone Simulator', // نام شبیه‌ساز iOS یا دستگاه واقعی
            'appium:platformVersion': '17.2', // به نسخه سیستم‌عامل هدف خود تغییر دهید
            // نکته درباره مسیر (به یادداشت سیستم‌عامل‌ها در ادامه مراجعه کنید)
            // برای شبیه‌ساز iOS از .app و برای دستگاه‌های واقعی iOS از .ipa استفاده کنید
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... بقیه پیکربندی
};
```

### نکات مهم درباره مسیر فایل‌ها (appium:app)

تعریف مسیر فایل باینری برنامه (`.apk` برای Android، و `.app` یا `.ipa` برای iOS) در ویژگی `appium:app` بسته به سیستم‌عامل و محیط هدف نیازمند دقت است:

- **در Windows**: این سیستم‌عامل از بک‌اسلش (`\`) برای مسیر پوشه‌ها استفاده می‌کند. هنگام تعیین مسیر فایل `.apk` در Windows، مطمئن شوید که بک‌اسلش‌ها را در فایل پیکربندی escape می‌کنید (برای مثال، `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) یا به‌طور یکپارچه از اسلش رو به جلو (`/`) استفاده کنید که Node.js آن را به‌درستی تفسیر می‌کند.
- **در macOS / Linux**: از مسیرهای استاندارد با اسلش رو به جلو (`/`) استفاده می‌شود. به خاطر داشته باشید که بیلدهای iOS (`.app` برای شبیه‌ساز یا `.ipa` برای دستگاه‌های واقعی) فقط در محیط macOS قابل کامپایل هستند.
- **شبیه‌ساز iOS در برابر دستگاه‌های واقعی**: هنگام اجرا روی شبیه‌ساز iOS از بسته‌های `.app` و هنگام اجرا روی دستگاه‌های فیزیکی iOS از بسته‌های امضاشده `.ipa` استفاده کنید.
- **مسیرهای مطلق در برابر نسبی**: اکیداً توصیه می‌شود از مسیرهای نسبی که از ریشه پروژه شروع می‌شوند (با استفاده از `./`) استفاده کنید تا قابلیت حمل بین ماشین‌های توسعه مختلف و محیط‌های یکپارچه‌سازی مداوم (CI) تضمین شود.