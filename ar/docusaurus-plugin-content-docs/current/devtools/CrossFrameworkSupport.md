---
id: cross-framework
title: الدعم عبر أُطر العمل
description: "قارن مدى اكتمال التقاط وضع التتبع في DevTools لتشغيلات WebdriverIO وSelenium وNightwatch، والثغرات الموجودة في كل محوّل."
---

تنسيق التتبع ومشغّل `show-trace` متطابقان عبر WebdriverIO / Selenium / Nightwatch؛ وتوضح هذه الصفحة المواضع التي يختلف فيها اكتمال الالتقاط. للاطلاع على المرجع الكامل لوضع التتبع، راجع [وضع التتبع](/docs/devtools/wdio/trace-mode).

توجد التحويلات التي تبني التتبع في [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace)، في طبقة أدنى من المحوّلات، لذا فإن **تنسيق التتبع ومشغّل `show-trace` متطابقان لكل محوّل** — إذ يُفتح ملف `.zip` نفسه (أو المجلد نفسه) في المشغّل نفسه بغض النظر عن المحوّل الذي أنتجه. وتتشارك المحوّلات الثلاثة أدناه أيضًا الخيارات الأساسية (`mode` و`traceGranularity` و`tracePolicy` و`traceFormat` و`filmstrip` و`emitArtifactsManifest` و`captureAssertions`).

**غير أن اكتمال الالتقاط يختلف باختلاف المحوّل** — فـ WebdriverIO هو الأكثر اكتمالًا؛ بينما يغطي Selenium وNightwatch التدفق الأساسي مع الثغرات المذكورة أدناه. توجد صيغة التفعيل الخاصة بكل إطار عمل في صفحة المحوّل الخاص به — راجع [Selenium](/docs/devtools/selenium#trace-mode) و[Nightwatch](/docs/devtools/nightwatch#trace-mode).

يكتب محوّل Python (راجع علامات تبويب **Python** في صفحة [Selenium](/docs/devtools/selenium)) الأرشيف نفسه ويُفتح في المشغّل نفسه، لكنه غير مُدرج في هذا الجدول: فهو لا يشغّل أي JavaScript في عملية الاختبار، لذا تبني الواجهة الخلفية التتبع من البث الملتقَط بدلًا من أن يبنيه المحوّل داخل العملية. ولخيارات الدقة والاحتفاظ مكافئات في Python — وهي `--devtools-trace-granularity session|test` و`--devtools-trace-policy`، حيث تتراجع قيم الأخير المراعية لإعادة المحاولة إلى `retain-on-failure` لأنه لا شيء على ذلك الاتصال يحمل رقم المحاولة. أما الصفوف التي ليس لها مكافئ في Python فهي الخاصة بعناصر كل اختبار: `screenshot` و`video` والإرفاق المضمّن في Allure. أما ما يلتقطه فعلًا - التنقل الزمني في DOM، وشريط اللقطات الكثيف، وشجرة A11y وتراكب العناصر، والأوامر، ووحدة التحكم، والشبكة، والتأكيدات، وعناصر التحكم في التشغيل، وميزة Preserve & Rerun - فموجود في صفحته الخاصة.

| الإمكانية | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| وضع التتبع + مشغّل `show-trace` | ✅ | ✅ | ✅ |
| التنقل الزمني في DOM (التقاط التغييرات) | ✅ | ✅ ¹ | ✅ |
| علامة تبويب A11y + تراكب اختيار المحدِّد (مشغّل التتبع) | ✅ | ✅ | ✅ |
| النص المكتوب + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` لكل اختبار | ✅ مضمّن في Allure | ✅ مضمّن في Allure | ⚠️ إنتاج فقط ² |
| الاكتشاف التلقائي لـ `emitArtifactsManifest` | ✅ | ✅ | ⚠️ بالتفعيل الاختياري فقط |
| `tracePolicy` المراعي لإعادة المحاولة | ✅ | ✅ | ⚠️ `retain-on-failure` فقط ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / كائن exports؛ ويُدمج BDD `describe/it` في شريحة جلسة واحدة |
| تداخل Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ كامل | Feature→Scenario ⁵ |
| التقاط BiDi (وحدة التحكم / الشبكة / الاستثناءات) | ✅ تلقائي | ✅ تلقائي | ⚠️ بالتفعيل الاختياري (`bidi: true` + `webSocketUrl`) |
| تسجيل الشاشة (شريط اللقطات / الفيديو) | دفع CDP | دفع CDP | الاستطلاع فقط |
| علامة تبويب A11y + التراكب في لوحة المعلومات المباشرة | ✅ | مشغّل التتبع فقط | مشغّل التتبع فقط |

¹ يعيد Selenium بناء DOM لكل عملية تنقّل؛ وتوقيت الربط تقريبي (فقد تتأخر لقطة التنقل عن الأمر الذي أطلقه).
² لا يملك Nightwatch واجهة برمجية للإرفاق المباشر في Allure، لذا تُكتب عناصر كل اختبار في مجلد مخرجات التتبع وتُدرج في البيان، لكنها لا تُرفق باختبار في Allure.
³ يعيد خيار `--retries` في Nightwatch تشغيل الاختبار داخليًا دون إعادة إطلاق خطافات المكوّن الإضافي الخاصة بكل اختبار، لذا تتراجع السياسات المراعية لإعادة المحاولة (`on-first-retry` و`retain-on-first-failure` و…) إلى `retain-on-failure`.
⁴ لا يحمل WebdriverIO بعدُ التسلسل الهرمي على مستوى الميزة، لذا يكون تداخل Cucumber فيه Scenario→Step.
⁵ لا يضع Nightwatch بعدُ علامات التداخل لكل خطوة (Feature→Scenario فقط).