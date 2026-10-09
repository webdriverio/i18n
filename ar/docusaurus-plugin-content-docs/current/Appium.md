---
id: appium
title: إعداد Appium
description: "قم بإعداد Appium وبرامج التشغيل الخاصة به باستخدام مجموعة أدوات appium-installer لاختبار تطبيقات الهاتف المحمول الأصلية والهجينة وتطبيقات سطح المكتب باستخدام WebdriverIO."
---

باستخدام WebdriverIO، يمكنك اختبار ليس فقط تطبيقات الويب في المتصفح، بل أيضًا منصات أخرى مثل:

- 📱 تطبيقات الهاتف المحمول على iOS أو Android أو Tizen
- 🖥️ تطبيقات سطح المكتب على macOS أو Windows
- 📺 بالإضافة إلى تطبيقات التلفاز لـ Roku وtvOS وAndroid TV وSamsung

نوصي باستخدام [Appium](https://appium.io/) لمساعدتك في تسهيل هذه الأنواع من الاختبارات. يمكنك الحصول على نظرة عامة حول Appium في [صفحة الوثائق الرسمية](https://appium.io/docs/en/latest/intro/) الخاصة بهم.

إن إعداد البيئة المناسبة ليس أمرًا سهلًا. لحسن الحظ، يمتلك نظام Appium البيئي أدوات رائعة لمساعدتك في ذلك. لإعداد إحدى البيئات المذكورة أعلاه، ما عليك سوى تشغيل:

```sh
$ npx appium-installer
```

سيؤدي هذا إلى تشغيل مجموعة أدوات [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) التي ترشدك خلال عملية الإعداد.