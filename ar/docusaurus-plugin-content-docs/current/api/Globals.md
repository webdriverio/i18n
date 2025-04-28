---
id: globals
title: المتغيرات العالمية
---

في ملفات الاختبار الخاصة بك، يضع WebdriverIO كل من هذه الوظائف والكائنات في البيئة العالمية. لا تحتاج إلى استيراد أي شيء لاستخدامها. ومع ذلك، إذا كنت تفضل الاستيرادات الصريحة، يمكنك استخدام `import { browser, $, $$, expect } from '@wdio/globals'` وتعيين `injectGlobals: false` في تكوين WDIO الخاص بك.

يتم تعيين الكائنات العالمية التالية إذا لم يتم تكوينها خلاف ذلك:

- `browser`: كائن [Browser object](https://webdriver.io/docs/api/browser) الخاص بـ WebdriverIO
- `driver`: اسم مستعار لـ `browser` (يستخدم عند تشغيل اختبارات الجوال)
- `multiremotebrowser`: اسم مستعار لـ `browser` أو `driver` ولكن يتم تعيينه فقط لجلسات [Multiremote](/docs/multiremote)
- `$`: أمر لجلب عنصر (انظر المزيد في [API docs](/docs/api/browser/$))
- `$$`: أمر لجلب العناصر (انظر المزيد في [API docs](/docs/api/browser/$$))
- `expect`: إطار التأكيد لـ WebdriverIO (انظر [API docs](/docs/api/expect-webdriverio))

__ملاحظة:__ لا يملك WebdriverIO أي تحكم في الأطر المستخدمة (مثل Mocha أو Jasmine) التي تقوم بتعيين متغيرات عالمية عند بدء تشغيل بيئتها.