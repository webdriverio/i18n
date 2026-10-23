---
id: cross-framework
title: الدعم عبر أُطر العمل
description: "قارن مدى اكتمال التقاط وضع التتبّع في DevTools لعمليات تشغيل WebdriverIO وSelenium وNightwatch، والثغرات الموجودة في كل محوّل."
---

تنسيق التتبّع ومشغّل `show-trace` متطابقان في WebdriverIO / Selenium / Nightwatch؛ وتوضّح هذه الصفحة المواضع التي يختلف فيها اكتمال الالتقاط. للاطلاع على المرجع الكامل لوضع التتبّع، راجع [Trace Mode](/docs/devtools/wdio/trace-mode).

توجد التحويلات التي تبني التتبّع في [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace)، وهي طبقة أدنى من المحوّلات، لذا فإن **تنسيق التتبّع ومشغّل `show-trace` متطابقان لكل محوّل** — إذ يُفتح ملف `.zip` (أو المجلد) نفسه في المشغّل نفسه بغض النظر عن المحوّل الذي أنتجه. وتتشارك المحوّلات الثلاثة أدناه بالإضافة إلى ذلك الخيارات الأساسية (`mode` و`traceGranularity` و`tracePolicy` و`traceFormat` و`filmstrip` و`emitArtifactsManifest` و`captureAssertions`).

**غير أن اكتمال الالتقاط يختلف باختلاف المحوّل** — فـ WebdriverIO هو الأكثر اكتمالًا؛ بينما يغطي Selenium وNightwatch التدفق الأساسي مع الثغرات المذكورة أدناه. توجد صيغة التفعيل الخاصة بكل إطار عمل في صفحة المحوّل الخاص به — راجع [Selenium](/docs/devtools/selenium#trace-mode) و[Nightwatch](/docs/devtools/nightwatch#trace-mode).

يكتب محوّل Python (راجع علامات التبويب **Python** في صفحة [Selenium](/docs/devtools/selenium)) الأرشيف نفسه ويُفتح في المشغّل نفسه، لكنه غير مدرج في هذا الجدول: فهو لا يشغّل أي JavaScript في عملية الاختبار، لذا تبني الواجهة الخلفية تتبّعه من التدفق الملتقَط بدلًا من أن يبنيه المحوّل داخل العملية. وللدقة والاحتفاظ مكافئات في Python — وهي `--devtools-trace-granularity session|test` و`--devtools-trace-policy`، حيث تتراجع قيم الأخير المراعية لإعادة المحاولة إلى `retain-on-failure` لأنه لا شيء في ذلك الاتصال يحمل رقم المحاولة. أما الصفوف التي ليس لها مكافئ في Python فهي تلك الخاصة بمخرجات كل اختبار: `screenshot` و`video` والإرفاق المضمّن في Allure. وما يلتقطه فعلًا - التنقل الزمني في DOM، وشريط الإطارات الكثيف، وشجرة A11y وطبقة العناصر، والأوامر، ووحدة التحكم، والشبكة، والتأكيدات، وعناصر التحكم في التشغيل، وPreserve & Rerun - موضّح في صفحته الخاصة.

| الإمكانية | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| وضع التتبّع + مشغّل `show-trace` | ✅ | ✅ | ✅ |
| التنقل الزمني في DOM (التقاط التغييرات) | ✅ | ✅ ¹ | ✅ |
| علامة تبويب A11y + طبقة اختيار المحدِّد (مشغّل التتبّع) | ✅ | ✅ | ✅ |
| اكتشاف جلسة Appium الأصلية | ✅ | ✅ | ✅ |
| تتبّع التطبيق الهجين إلى داخل webview الخاص به | ✅ | ⚠️ قدرات بدء التشغيل فقط | ⚠️ قدرات بدء التشغيل فقط |
| النص المفرَّغ + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` لكل اختبار | ✅ إرفاق مضمّن في Allure | ✅ إرفاق مضمّن في Allure | ⚠️ إنتاج فقط ² |
| `tracePolicy` المراعية لإعادة المحاولة | ✅ | ✅ | ⚠️ `retain-on-failure` فقط ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object؛ ينهار BDD `describe/it` إلى شريحة جلسة |
| تداخل Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ كامل | Feature→Scenario ⁵ |
| التقاط BiDi (وحدة التحكم / الشبكة / الاستثناءات) | ✅ تلقائي | ✅ تلقائي | ⚠️ اختياري (`bidi: true` + `webSocketUrl`) |
| تسجيل الشاشة (شريط الإطارات / الفيديو) | دفع CDP | دفع CDP | الاستطلاع فقط |
| علامتا تبويب A11y والنص المفرَّغ | مشغّل التتبّع فقط | مشغّل التتبّع فقط | مشغّل التتبّع فقط |

¹ مع BiDi، يسجّل Selenium مُجمِّع الصفحة عند بدء المستند، بحيث يثبّت كل مستند DOM الخاص به كما يفعل WebdriverIO. وبدون BiDi يلجأ إلى حقن المُجمِّع بعد كل عملية تنقل، وهنا قد تتأخر لقطة التنقل عن الأمر الذي أطلقه.
² لا يمتلك Nightwatch واجهة برمجية للإرفاق المباشر في Allure، لذا تُكتب مخرجات كل اختبار في مجلد مخرجات التتبّع وتُدرج في البيان، لكنها لا تُرفق باختبار Allure.
³ يعيد `--retries` في Nightwatch تشغيل الاختبار داخليًا دون إعادة إطلاق خطافات الإضافة الخاصة بكل اختبار، لذا تتراجع السياسات المراعية لإعادة المحاولة (`on-first-retry`، `retain-on-first-failure`، …) إلى `retain-on-failure`.
⁴ لا يحمل WebdriverIO بعدُ التسلسل الهرمي على مستوى الميزة، لذا يكون تداخل Cucumber فيه Scenario→Step.
⁵ لا يضع Nightwatch بعدُ تداخلًا لكل خطوة (Feature→Scenario فقط).