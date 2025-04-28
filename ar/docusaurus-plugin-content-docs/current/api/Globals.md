---
id: globals
title: الدوال العالمية
---

في ملفات الاختبار الخاصة بك، يضع WebdriverIO كل من هذه الدوال والكائنات في البيئة العالمية. لا تحتاج إلى استيراد أي شيء لاستخدامها. ومع ذلك، إذا كنت تفضل الاستيرادات الصريحة، يمكنك القيام بـ `import { browser, $, $$, expect } from '@wdio/globals'` وتعيين `injectGlobals: false` في تكوين WDIO الخاص بك.

يتم تعيين الكائنات العالمية التالية إذا لم يتم تكوينها بطريقة أخرى:

- `browser`: كائن [Browser](https://webdriver.io/docs/api/browser) في WebdriverIO
- `driver`: اسم مستعار لـ `browser` (يستخدم عند تشغيل اختبارات الموبايل)
- `multiremotebrowser`: اسم مستعار لـ `browser` أو `driver` ولكن يتم تعيينه فقط لجلسات [Multiremote](/docs/multiremote)
- `$`: أمر لجلب عنصر (انظر المزيد في [وثائق API](/docs/api/browser/$))
- `$$`: أمر لجلب العناصر (انظر المزيد في [وثائق API](/docs/api/browser/$$))
- `expect`: إطار التأكيد لـ WebdriverIO (انظر [وثائق API](/docs/api/expect-webdriverio))

__ملاحظة:__ ليس لدى WebdriverIO أي تحكم في الأطر المستخدمة (مثل Mocha أو Jasmine) التي تقوم بتعيين متغيرات عالمية عند تهيئة بيئتها.