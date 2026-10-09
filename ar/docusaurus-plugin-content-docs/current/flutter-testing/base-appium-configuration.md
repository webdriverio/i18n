---
id: base-appium-configuration
title: إعداد Appium الأساسي
description: "ثبّت خدمة Appium وحزمة Flutter finder وقم بإعداد Appium الأساسي لاختبار تطبيقات Flutter باستخدام WebdriverIO."
---

يستخدم WebdriverIO أداة Appium لتشغيل الاختبارات عبر المحاكيات المحمولة (emulators وsimulators) والأجهزة الحقيقية. تدير خدمة `@wdio/appium-service` دورة حياة خادم Appium تلقائيًا أثناء تنفيذ الاختبارات.

للاطلاع على إعداد Appium العام وخيارات القدرات (capabilities)، راجع [توثيق خدمة Appium](https://webdriver.io/docs/appium-service/).

## تثبيت التبعيات

لاختبار تطبيقات Flutter، ثبّت خدمة Appium وحزمة Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### تثبيت Appium Flutter Driver

يمكنك تثبيت Appium Flutter Driver (`appium-flutter-driver`) بإحدى طريقتين:

#### الخيار 1: كتبعية تطوير (موصى به لـ CI/CD)

تضمن إضافة برنامج التشغيل مباشرةً إلى `devDependencies` أن يكون مثبتًا تلقائيًا لدى جميع أعضاء الفريق وفي مسارات CI/CD دون الحاجة إلى خطوات إعداد إضافية:

```bash
npm install --save-dev appium-flutter-driver
```

> يمكنك أيضًا تثبيت جميع الحزم المطلوبة معًا بأمر واحد:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### الخيار 2: عبر Appium CLI (إعداد محلي)

بدلًا من ذلك، يمكنك تثبيت برنامج التشغيل محليًا في بيئة Appium الخاصة بك باستخدام Appium CLI:

```bash
npx appium driver install flutter
```

### نظرة عامة على الحزم

توفر هذه الحزم ما يلي:
- **`@wdio/appium-service` و`appium`**: تشغيل خادم Appium وإدارته أثناء تنفيذ الاختبارات.
- **`appium-flutter-driver`**: برنامج تشغيل Appium المسؤول عن التواصل مع امتداد الاختبار الخاص بـ Flutter.
- **`appium-flutter-finder`**: مكتبة مساعدة توفر استراتيجيات تحديد العناصر الخاصة بـ Flutter (`byValueKey` و`byText` و`byTooltip`).