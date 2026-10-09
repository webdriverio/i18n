---
id: writing-tests
title: كتابة الاختبارات
description: "اكتب اختبارات WebdriverIO لتطبيقات Flutter من خلال التبديل إلى سياق Flutter والتفاعل مع عناصر الواجهة (Widgets) عبر امتداد flutter_driver."
---

يتناول هذا القسم البنية العملية لإنشاء سيناريوهات الاختبار الآلي، وكيفية التفاعل مباشرةً مع شجرة المكونات الداخلية لـ Flutter باستخدام WebdriverIO.

### لماذا يُعد تبديل السياق ضروريًا؟

عند بدء جلسة أتمتة باستخدام Appium، يبدأ المشغّل (driver) التنفيذ بتعيين السياق الأصلي لنظام التشغيل، المعروف باسم `NATIVE_APP`. لا يمكن لهذا السياق رؤية سوى الغلاف الأصلي المحيط بالتطبيق (مثل شريط حالة النظام أو مربعات الحوار الأصلية في Android/iOS).

نظرًا لأن Flutter يعرض واجهة المستخدم الخاصة به داخل Canvas معزول، فإن العناصر الداخلية تكون غير مرئية ضمن سياق `NATIVE_APP`. ولإرسال الأوامر مباشرةً إلى امتداد الاختبار الخاص بـ Flutter (`flutter_driver`)، يجب علينا تبديل تركيز الأتمتة صراحةً إلى سياق `FLUTTER`. وبدون هذا التبديل، ستؤدي أي محاولة لتحديد موقع Widget إلى خطأ عدم العثور على العنصر.

:::tip أفضل ممارسة: بدّل السياق دائمًا في `beforeEach`
من أفضل الممارسات الموصى بها تضمين `await driver.switchContext('FLUTTER')` في خطاف `beforeEach` في كل ملف اختبار. يضمن ذلك أن يبدأ كل اختبار تنفيذه في سياق `FLUTTER`، مما يجنّب عدم الاستقرار (flakiness) أو تسرّب الحالة إذا قام اختبار سابق بالتبديل إلى `NATIVE_APP` (على سبيل المثال، للتعامل مع مربعات حوار أذونات نظام التشغيل) أو إذا أعادت جلسة ما تعيين السياق النشط.
:::

### لماذا تُعد `appium-flutter-finder` ضرورية؟

صُممت محددات WebdriverIO التقليدية، مثل `$('~selector')` أو `$('#id')`، لتحديد موقع العناصر باستخدام استراتيجيات مخصصة لواجهات الويب أو الواجهات الأصلية للأجهزة المحمولة (مثل معرّفات الموارد أو XPath).

يدير Flutter عناصره الداخلية الخاصة ويستخدم أساليب بحث خاصة به (مثل `byValueKey` و`byText` و`byType`). وتُعد مكتبة `appium-flutter-finder` ضرورية لأنها تعمل كمترجم: فهي تعرض استراتيجيات تحديد المواقع الخاصة بـ Flutter بتنسيق متسلسل (Base64/JSON) يمكن لـ `appium-flutter-driver` تفسيره وتنفيذه داخل آلة Dart الافتراضية (VM).

### أمثلة اختبار عملية

نوثّق هنا سيناريوهات شائعة تستخدم `appium-flutter-finder` لتحديد موقع عناصر الواجهة (Widgets)، إلى جانب أوامر الامتداد المباشرة التي تُنفَّذ عبر `driver.execute('flutter:<command>')`.

:::info أوامر امتداد Flutter Driver والمحددات (Finders)
يوفر `appium-flutter-driver` أوامر متخصصة للتفاعل مع تطبيقات Flutter، بما في ذلك:
- `flutter:waitFor`: ينتظر حتى يصبح عنصر الواجهة مرئيًا.
- `flutter:waitForAbsent`: ينتظر حتى يختفي عنصر الواجهة.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: يتعامل مع التمرير داخل طرق العرض القابلة للتمرير.
- `flutter:setTextEntryEmulation`: يضبط سلوك إدخال النص.

للاطلاع على القائمة الكاملة للأوامر المتاحة ومعاملاتها وأنواع القيم المُرجعة، راجع [توثيق أوامر Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands)، و[الشيفرة المصدرية لـ Node.js Finder](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs)، و[appium-flutter-finder على npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### المثال A — تفاعل بسيط (تدفق العدّاد)

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

### المثال B — تنقّل مستقر (تجنّب انتهاء المهلة)

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

### المثال C — تبديل السياقات (مربعات حوار نظام التشغيل الأصلية والأذونات)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. في سياق FLUTTER: انقر على عنصر الواجهة الذي يُطلق مربع حوار أذونات أو تنبيه على مستوى نظام التشغيل
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. بدّل إلى سياق NATIVE_APP للتفاعل مع مربع حوار نظام التشغيل
        await driver.switchContext('NATIVE_APP');

        // حدّد موقع الزر الأصلي وانقر عليه باستخدام محددات WebdriverIO القياسية
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. عُد إلى سياق FLUTTER لمواصلة التحقق من عناصر واجهة Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## تدفق البناء والتنفيذ

لضمان أن تكون أحدث تغييرات شيفرة Dart والمفاتيح (Keys) مرئية للاختبارات، اتبع هذه الخطوات دائمًا:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

يمكنك الاطلاع على أمثلة الشيفرة في المستودع: https://github.com/webdriverio/appium-boilerplate