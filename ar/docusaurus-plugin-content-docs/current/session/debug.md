---
id: debug
title: تصحيح أخطاء اختبار باستخدام جلسة
description: أوقف تشغيل WebdriverIO الفاشل مؤقتًا وافحصه باستخدام wdio session، ثم استأنفه أو أغلقه.
---

يوقف الأمر `wdio run --debug=agent` العامل (worker) مؤقتًا عند `await browser.debug()` وبعد فشل أي اختبار، ويرفع مهلة إطار العمل إلى 24 ساعة. يشمل الإيقاف المؤقت كلًّا من اختبارات Mocha وخطوات Cucumber. يطبع التشغيل اسم الجلسة (`debug-0-0` للعامل الأول):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

يؤدي تنفيذ `close` على تلك الجلسة إلى فشل الاختبار الموقوف مؤقتًا مع الرسالة `Session closed from wdio session`. استأنف عندما ينبغي أن يستمر الاختبار، وأغلق عندما تريد أن يفشل التشغيل عند نقطة الإيقاف المؤقت.

لا يزال `browser.debug()` بدون `--debug=agent` يفتح [REPL](/docs/repl) داخل الاختبار. أما `--debug=agent` فهو المسار الذي يتيح لعملية أخرى، بما في ذلك وكيل برمجة (coding agent)، التحكم في العامل الموقوف مؤقتًا باستخدام `wdio session`.

## إرفاق REPL

يتصل الأمر `wdio repl --session <name>` بجلسة مفتوحة بالفعل ويتركها قيد التشغيل عند الخروج:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

يُنفَّذ كل سطر في REPL بوصفه `wdio session exec`. ويطبع `.exit` الرسالة `Detached from "default" (still running)`.

## Doctor

يفحص الأمر `npx wdio session doctor` كلًّا من Node.js والمتصفح وAppium وحزم SDK وبيانات اعتماد الخدمات السحابية قبل فتح الجلسة. ويفحص `doctor <target>` فقط ما يحتاجه ذلك الهدف. تنتهي العملية برمز الخروج 1 عند فشل أي فحص. تُترك الجلسة التي لا تزال قيد البدء في مكانها، بينما تُزال الجلسة التي انتهت عمليتها.

## استكشاف الأخطاء وإصلاحها

| الرسالة | ما يجب فعله |
| --- | --- |
| `Session closed from wdio session` | لقد أغلقت جلسة تصحيح الأخطاء. استخدم `resume` عندما ينبغي أن يستمر الاختبار. |
| لا توجد جلسة `debug-0-0` | لم يتوقف التشغيل مؤقتًا بعد، أو استخدم معرّف عامل مختلفًا. يطبع الأمر `wdio session list` الأسماء. |
| لا يحدث الإيقاف المؤقت أبدًا | يجب أن يكون الأمر `wdio run --debug=agent`. لا يتوقف الاختبار الناجح مؤقتًا إلا إذا استدعى `browser.debug()`. |

## الخطوات التالية

- [تصحيح الأخطاء](/docs/debugging) — `browser.debug()` ونقاط التوقف والاختبارات غير المستقرة
- [REPL](/docs/repl) — الصدفة التفاعلية
- [wdio session](/docs/session) — افتح جلسة غير مرتبطة بتشغيل اختبار