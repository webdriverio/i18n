---
id: setting-up-webdriverio
title: إعداد WebdriverIO في بيئتك
description: "قم بتهيئة wdio.conf.ts وإمكانيات Appium لتشغيل تطبيق Flutter باستخدام Appium Flutter Driver على Android وiOS."
---

يُعد ملف `wdio.conf.ts` ملف التهيئة الأساسي لأي مشروع WebdriverIO. هنا تحدد مكان تشغيل الاختبارات، وأُطر الاختبار التي ستستخدمها، و`capabilities` اللازمة لكي يقوم Appium بتهيئة تطبيق Flutter بشكل صحيح.

:::warning
يعمل `appium-flutter-driver` بشكل مختلف عن برامج التشغيل الأصلية التقليدية (مثل `UiAutomator2` أو `XCUITest`). فهو يتواصل مع امتداد الاختبار الخاص بـ Flutter (`flutter_driver`) من خلال بروتوكول مخصص. ولهذا السبب، قد لا تعمل أوامر الأتمتة الأصلية القياسية بالطريقة نفسها، أو قد تتطلب بشكل صارم استخدام `appium-flutter-finder`.

لفهم القيود والأوامر المدعومة وامتدادات البروتوكول بشكل كامل، راجع المستودع الرسمي للأداة: [Appium Flutter Driver on GitHub](https://github.com/appium/appium-flutter-driver).
:::

### تهيئة الإمكانيات (Android وiOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... إعدادات wdio.conf.ts الأخرى (runner، specs، إلخ)
    

    services: [
        ['appium', {
            // يدير WebdriverIO دورة حياة خادم Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // تهيئة ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // يفرض استخدام برنامج تشغيل Flutter
            'appium:deviceName': 'Android_Emulator', // اسم المحاكي الذي قمت بتهيئته أو الجهاز الحقيقي
            // ملاحظة حول المسار (انظر ملاحظة أنظمة التشغيل أدناه)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // تهيئة IOS (تتطلب macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // يفرض استخدام برنامج تشغيل Flutter
            'appium:deviceName': 'iPhone Simulator', // اسم محاكي iOS أو الجهاز الحقيقي
            'appium:platformVersion': '17.2', // غيّره إلى إصدار نظام التشغيل المستهدف
            // ملاحظة حول المسار (انظر ملاحظة أنظمة التشغيل أدناه)
            // استخدم .app لمحاكي iOS، أو .ipa لأجهزة iOS الحقيقية
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... بقية التهيئة
};
```

### ملاحظات مهمة حول مسارات الملفات (appium:app)

يتطلب تحديد مسار التطبيق الثنائي (`.apk` لـ Android، و`.app` أو `.ipa` لـ iOS) داخل الخاصية `appium:app` اهتمامًا دقيقًا بحسب نظام التشغيل والبيئة المستهدفة:

- **على Windows**: يستخدم نظام التشغيل الشرطات المائلة العكسية (`\`) لمسارات المجلدات. عند تحديد مسار ملف `.apk` على Windows، تأكد من تهريب الشرطات المائلة العكسية في ملف التهيئة (مثل `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) أو استخدم الشرطات المائلة الأمامية (`/`) بشكل متسق، إذ يحللها Node.js بشكل صحيح.
- **على macOS / Linux**: تُستخدم المسارات القياسية ذات الشرطات المائلة الأمامية (`/`). تذكّر أن إصدارات iOS (`.app` للمحاكي أو `.ipa` للأجهزة الحقيقية) لا يمكن تجميعها إلا داخل بيئات macOS.
- **محاكي iOS مقابل الأجهزة الحقيقية**: استخدم حزم `.app` عند التنفيذ على محاكي iOS، وحزم `.ipa` الموقّعة عند التشغيل على أجهزة iOS الفعلية.
- **المسارات المطلقة مقابل المسارات النسبية**: يُوصى بشدة باستخدام المسارات النسبية بدءًا من جذر المشروع (باستخدام `./`) لضمان قابلية النقل بين أجهزة التطوير المختلفة وبيئات التكامل المستمر (CI).