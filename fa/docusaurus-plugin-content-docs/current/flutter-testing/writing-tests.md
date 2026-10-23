---
id: writing-tests
title: نوشتن تست‌ها
description: "تست‌های WebdriverIO را برای اپلیکیشن‌های Flutter با جابه‌جایی به کانتکست Flutter و تعامل با ویجت‌ها از طریق افزونه flutter_driver بنویسید."
---

این بخش ساختار عملی ایجاد سناریوهای تست خودکار و نحوه تعامل مستقیم با درخت کامپوننت‌های داخلی Flutter با استفاده از WebdriverIO را پوشش می‌دهد.

### چرا جابه‌جایی کانتکست ضروری است؟

هنگام آغاز یک جلسه اتوماسیون با Appium، درایور اجرا را با نگاشت کانتکست بومی سیستم‌عامل که با نام `NATIVE_APP` شناخته می‌شود آغاز می‌کند. این کانتکست تنها می‌تواند پوسته بومی دربرگیرنده اپلیکیشن را ببیند (مانند نوار وضعیت سیستم یا دیالوگ‌های بومی Android/iOS).

از آنجا که Flutter رابط کاربری خود را درون یک Canvas ایزوله رندر می‌کند، عناصر داخلی در کانتکست `NATIVE_APP` قابل مشاهده نیستند. برای ارسال مستقیم دستورات به افزونه تست Flutter (`flutter_driver`)، باید به‌طور صریح تمرکز اتوماسیون را به کانتکست `FLUTTER` منتقل کنیم. بدون این جابه‌جایی، هر تلاشی برای یافتن یک Widget به خطای element not found منجر خواهد شد.

:::tip بهترین روش: همیشه کانتکست را در `beforeEach` جابه‌جا کنید
توصیه می‌شود در هر فایل تست، `await driver.switchContext('FLUTTER')` را در یک هوک `beforeEach` قرار دهید. این کار تضمین می‌کند که هر تست اجرای خود را در کانتکست `FLUTTER` آغاز کند و از ناپایداری یا نشت وضعیت جلوگیری می‌کند، در صورتی که یک تست قبلی به `NATIVE_APP` جابه‌جا شده باشد (برای مثال، برای مدیریت دیالوگ‌های مجوز سیستم‌عامل) یا یک جلسه کانتکست فعال را بازنشانی کند.
:::

### چرا `appium-flutter-finder` ضروری است؟

انتخابگرهای سنتی WebdriverIO، مانند `$('~selector')` یا `$('#id')`، برای یافتن عناصر با استفاده از راهبردهایی طراحی شده‌اند که برای رابط‌های وب یا رابط‌های بومی موبایل در نظر گرفته شده‌اند (مانند resource IDها یا XPath).

Flutter عناصر داخلی خود را مدیریت می‌کند و از روش‌های جستجوی اختصاصی (مانند `byValueKey`، `byText`، `byType`) استفاده می‌کند. کتابخانه `appium-flutter-finder` ضروری است زیرا نقش یک مترجم را ایفا می‌کند: این راهبردهای مکان‌یابی مختص Flutter را در قالبی سریال‌شده (Base64/JSON) ارائه می‌دهد که `appium-flutter-driver` می‌تواند آن را درون ماشین مجازی Dart (VM) تفسیر و اجرا کند.

### نمونه‌های عملی تست

ما سناریوهای رایج را با استفاده از `appium-flutter-finder` برای یافتن ویجت‌ها، همراه با دستورات مستقیم افزونه که از طریق `driver.execute('flutter:<command>')` اجرا می‌شوند، مستند می‌کنیم.

:::info دستورات و Finderهای افزونه Flutter Driver
`appium-flutter-driver` دستورات تخصصی برای تعامل با اپلیکیشن‌های Flutter فراهم می‌کند، از جمله:
- `flutter:waitFor`: منتظر می‌ماند تا یک ویجت قابل مشاهده شود.
- `flutter:waitForAbsent`: منتظر می‌ماند تا یک ویجت ناپدید شود.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: اسکرول درون نماهای قابل اسکرول را مدیریت می‌کند.
- `flutter:setTextEntryEmulation`: رفتار ورود متن را پیکربندی می‌کند.

برای فهرست کامل دستورات موجود، پارامترها و انواع مقادیر بازگشتی، به [مستندات دستورات Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands)، [کد منبع Finder برای Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) و [appium-flutter-finder در npm](https://www.npmjs.com/package/appium-flutter-finder) مراجعه کنید.
:::

### نمونه A — تعامل ساده (جریان شمارنده)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### نمونه B — ناوبری پایدار (جلوگیری از Timeout)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### نمونه C — جابه‌جایی کانتکست‌ها (دیالوگ‌ها و مجوزهای بومی سیستم‌عامل)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // ۱. در کانتکست FLUTTER: روی ویجتی کلیک کنید که یک دیالوگ مجوز یا هشدار در سطح سیستم‌عامل را فعال می‌کند
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // ۲. برای تعامل با دیالوگ سیستم‌عامل به کانتکست NATIVE_APP جابه‌جا شوید
        await driver.switchContext('NATIVE_APP');

        // دکمه بومی را با استفاده از انتخابگرهای استاندارد WebdriverIO پیدا کرده و روی آن کلیک کنید
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // ۳. برای ادامه بررسی ویجت‌های Flutter به کانتکست FLUTTER بازگردید
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## جریان ساخت و اجرا

برای اطمینان از اینکه تغییرات اخیر کد Dart و Keyها برای تست‌ها قابل مشاهده هستند، همیشه این مراحل را دنبال کنید:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

می‌توانید نمونه کدها را در این مخزن مشاهده کنید: https://github.com/webdriverio/appium-boilerplate