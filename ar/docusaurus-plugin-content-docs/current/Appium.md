---
id: appium
title: إعداد Appium
---

باستخدام WebdriverIO يمكنك اختبار ليس فقط تطبيقات الويب في المتصفح ولكن أيضًا منصات أخرى مثل:

- 📱 تطبيقات الجوال على iOS و Android و Tizen
- 🖥️ تطبيقات سطح المكتب على macOS أو Windows
- 📺 وكذلك تطبيقات التلفزيون لـ Roku و tvOS و Android TV و Samsung

نوصي باستخدام [Appium](https://appium.io/) لمساعدتك في تسهيل هذه الأنواع من الاختبارات. يمكنك الحصول على نظرة عامة على Appium على [صفحة التوثيق الرسمية](https://appium.io/docs/en/latest/intro/).

إعداد البيئة المناسبة ليس بالأمر السهل. لحسن الحظ، فإن نظام Appium البيئي يحتوي على أدوات رائعة لمساعدتك في ذلك. لإعداد إحدى البيئات المذكورة أعلاه، ما عليك سوى تشغيل:

```sh
$ npx appium-installer
```

سيؤدي هذا إلى بدء مجموعة أدوات [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) التي ترشدك خلال عملية الإعداد.