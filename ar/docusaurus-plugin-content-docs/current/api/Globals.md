---
id: globals
title: المتغيرات العامة
---

في ملفات الاختبار الخاصة بك، يضع WebdriverIO كل هذه الدوال والكائنات في البيئة العامة. لست بحاجة إلى استيراد أي شيء لاستخدامها. ومع ذلك، إذا كنت تفضل الاستيراد الصريح، يمكنك كتابة `import { browser, $, $$, expect } from '@wdio/globals'` وتعيين `injectGlobals: false` في إعدادات WDIO الخاصة بك.

يتم تعيين الكائنات العامة التالية ما لم يتم تكوينها بخلاف ذلك:

- `browser`: [كائن Browser](https://webdriver.io/docs/api/browser) الخاص بـ WebdriverIO
- `driver`: اسم بديل لـ `browser` (يُستخدم عند تشغيل اختبارات الأجهزة المحمولة)
- `multiRemoteBrowser`: اسم بديل لـ `browser` أو `driver` ولكن يتم تعيينه فقط لجلسات [multi-remote](/docs/multiremote)
- `$`: أمر لجلب عنصر (اطلع على المزيد في [وثائق API](/docs/api/browser/$))
- `$$`: أمر لجلب عناصر متعددة (اطلع على المزيد في [وثائق API](/docs/api/browser/$$))
- `expect`: إطار عمل التحقق (assertion) الخاص بـ WebdriverIO (راجع [وثائق API](/docs/api/expect-webdriverio))

__ملاحظة:__ لا يتحكم WebdriverIO في أطر العمل المستخدمة (مثل Mocha أو Jasmine) التي تقوم بتعيين متغيرات عامة عند تهيئة بيئتها.