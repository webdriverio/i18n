---
id: export
title: تصدير جلسة كاختبار
description: حوّل الخطوات التي نفّذتها في wdio session إلى ملف مواصفات (spec) وكائنات صفحات (page objects) وأوامر مخصصة.
---

يكتب `export` ملف مواصفات (spec) من الخطوات المسجّلة. تُستبدل المراجع (refs) بمحددات ثابتة. بالنسبة لصفحة ويب، يُستخدم أول ما يطابق عنصرًا واحدًا بالضبط من بين ما يلي: معرّف اختبار (`data-testid`، `data-test`، `data-qa`)، أو [محدد دور](/docs/selectors#role-selector) مثل `role/button[name="Add to cart"]`، أو اسم يمكن الوصول إليه (`aria/Add to cart`)، أو معرّف (id)، أو نص زر أو رابط، أو اسم حقل نموذج، وأخيرًا مسار CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

يطبع `history` الخطوات قبل التصدير. ويحذفها `history clear`.

## كائنات الصفحات

يكتب `--page-objects` كائن صفحة (page object) بجوار ملف المواصفات. تُجمَّع المحددات حسب المسار الذي نُفّذت عليه. يصبح `$('…')` الحرفي في خطوة مسجّلة دالةَ جلب (getter). أما `$$`، والسلاسل النصية التي تصادف أنها تحتوي على `$('…')`، و`$(selector)` الديناميكي فتبقى كما هي.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

يرفض الأمر الكتابة فوق كائن صفحة موجود بالفعل في مجلد الإخراج. غيّر `--out` أو احذف ذلك الملف أولًا. أما ملف المواصفات نفسه فتُعاد كتابته.

يُرفع `import` الموجود في أعلى خطوة `exec` إلى أعلى ملف المواصفات، خارج دالة الاختبار.

## الدوال المساعدة

أضف ملفًا ضمن `.wdio/helpers/` عندما تكون الخطوة أطول من أن تُنفَّذ عبر `exec`. يصدّر كل ملف افتراضيًا (default export) دالةً تستقبل المتصفح وتسجّل الأوامر باستخدام `addCommand`. تبقى الاستيرادات النسبية نسبيةً إلى ذلك الملف. وتُحَلّ استيرادات الحزم المجردة من المشروع.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

تُحمَّل الدوال المساعدة عند فتح الجلسة، ومرة أخرى باستخدام `npx wdio session helpers --reload`. إذا لم يكن `.wdio/helpers` موجودًا بعد، فإن الجلسة تراقب ظهوره. تصبح الدوال المساعدة أوامر مخصصة في الاختبار المُصدَّر.

## الخطوات التالية

- [تشغيل الشيفرة](/docs/session/exec) — الخطوات التي يسجّلها `export`
- [الأوامر](/docs/session-commands) — خيارات `export` و`history` و`helpers`