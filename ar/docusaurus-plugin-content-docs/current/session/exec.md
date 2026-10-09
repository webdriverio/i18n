---
id: exec
title: تشغيل التعليمات البرمجية في جلسة
description: شغّل تعليمات WebdriverIO البرمجية والتأكيدات في جلسة wdio نشطة باستخدام exec.
---

يُشغّل `exec` تعليمات WebdriverIO البرمجية في الجلسة المفتوحة. استخدمه عندما تكون الخطوة أكثر من مجرد `click` أو `fill` واحد، ولكل تأكيد.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

استخدم `await` دائمًا مع الأوامر. يُعيد `$` عنصرًا واحدًا ويُطلق خطأً عندما يكون مفقودًا. ويُعيد `$$` قائمة. لا يوجد وضع متزامن ولا يوجد `browser.element`.

تبقى الأسماء التي تُعرّفها متاحة في `exec` التالي. ويتم تحميل `import` على المستوى الأعلى من دليل المشروع.

## التأكيدات

ضع التأكيدات في `exec` باستخدام `expect-webdriverio`. ثبّته في مشروعك. بدونه، يفشل `expect(...)` مع تلميح للتثبيت.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

استخدم `visual check <tag>` عندما يكون السؤال عن مظهر الشاشة. يحتاج هذا الأمر إلى `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

ينسخ `visual accept cart` أحدث صورة فعلية لهذا الوسم فوق الصورة المرجعية. ولا ينسخ الصور الأقدم التي تشترك في بادئة الوسم نفسها.

## متى تستخدم اختصارًا بدلًا من ذلك

تُعدّ `click` و`fill` و`type` و`press` و`tap` أقصر من `exec` لتفاعل واحد، وتطبع سطر WebdriverIO الذي نفّذته. فضّل استخدامها مع مرجع من أحدث [لقطة](/docs/session/snapshots). استخدم `exec` لعمليات الانتظار والتأكيدات وأي شيء يحتاج إلى أكثر من أمر واحد.

## الخطوات التالية

- [تصدير اختبار](/docs/session/export) — احفظ الخطوات، بما في ذلك `exec`
- [الأوامر](/docs/session-commands) — خيارات `exec` و`visual`