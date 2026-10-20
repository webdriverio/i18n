---
id: reference
title: مرجع الإعدادات
description: "اطّلع على جميع خيارات DevTools لوضع البث المباشر ووضع التتبع عبر محوّلات WebdriverIO وSelenium وNightwatch، مع قيمها الافتراضية."
---

جميع خيارات DevTools في لمحة واحدة، عبر المحوّلات الثلاثة. **أسماء الخيارات وأنواعها وقيمها الافتراضية متطابقة** في كل محوّل؛ وحيثما يختلف السلوك، تتم الإشارة إلى ذلك. للاطلاع على الشرح الكامل لكل خيار من خيارات التتبع، راجع القسم المرتبط في صفحة [وضع التتبع](/docs/devtools/wdio/trace-mode).

مرّر الخيارات بالطريقة التي يتقبّلها كل محوّل:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## خيارات الوضع ووضع البث المباشر

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `'live'` لوحة تحكم واجهة DevTools؛ بينما يتخطاها `'trace'` ويكتب ملفًا ناتجًا قابلًا للنقل. الوضعان متنافيان. |
| `port` | `number` | عشوائي | المنفذ الذي ترتبط به واجهة DevTools / الخادم الخلفي. لوضع البث المباشر فقط. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم. لوضع البث المباشر فقط. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | فيديو متواصل للجلسة (`.webm`). لوضع البث المباشر فقط — في وضع التتبع استخدم `video`. راجع [تسجيل الشاشة](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | الإمكانيات المستخدمة لفتح نافذة واجهة DevTools. خاص بـ WebdriverIO، ولوضع البث المباشر فقط. |

## خيارات وضع التتبع

تنطبق فقط عند استخدام `mode: 'trace'`.

| الخيار | النوع / القيم | القيمة الافتراضية | التفاصيل |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | أرشيف واحد مقابل مجلد غير مضغوط. [تنسيق المخرجات](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبّع واحد لكل جلسة / ملف مواصفات / اختبار. القيمة `'test'` مطلوبة للحصول على لقطة شاشة/فيديو لكل اختبار وللإرفاق المضمّن في Allure. [دقة التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | يحدد التتبعات التي يتم الاحتفاظ بها. يُستخدم مع `traceGranularity: 'test'`. [الاحتفاظ](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | تسجيل شاشة كثيف ومتواصل داخل التتبع للتنقّل السلس؛ بينما تسجّل القيمة `false` إطارًا واحدًا لكل إجراء. [شريط الإطارات الكثيف](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار (تتطلب `traceGranularity: 'test'`). خيار خاص بخدمة WebdriverIO. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | مقطع فيديو لكل اختبار (يتطلب `traceGranularity: 'test'`). خيار خاص بخدمة WebdriverIO. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | يكتب الملف `devtools-artifacts-<sessionId>.json`. يُفعَّل تلقائيًا عند اكتشاف مُبلِّغ Allure (اختياري في Nightwatch). [بيان الملفات الناتجة](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | يلتقط `node:assert` (ومطابِقات `expect` الخاصة بإطار العمل حيثما كانت مدعومة) كإجراءات في التتبع. [التأكيدات](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## خاص بـ Nightwatch فقط

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `bidi` | `boolean` | `false` | تفعيل الالتقاط عبر WebDriver BiDi اختياريًا (وحدة التحكم + استثناءات JS + الشبكة). يتطلب `webSocketUrl: true` في الإمكانيات. في WebdriverIO وSelenium، يتم إرفاق BiDi تلقائيًا. راجع [Nightwatch ← التقاط BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## الاختلافات بين المحوّلات

تتراجع بعض إمكانيات التتبع في محوّلات معيّنة — راجع [مصفوفة الدعم عبر أطر العمل](/docs/devtools/cross-framework) للاطلاع على الصورة الكاملة. أبرزها:

- **الاحتفاظ المراعي لإعادة المحاولة في Nightwatch** — القيمة `retain-on-failure` فقط هي الموثوقة؛ أما قيم `tracePolicy` الأخرى فتتراجع إليها.
- **أسلوب BDD ‏`describe/it` في Nightwatch** — يتقلّص `traceGranularity: 'test'` إلى مقطع واحد على نطاق الجلسة.
- **الإرفاق في Allure في Nightwatch** — يتم إنتاج `screenshot`/`video` لكل اختبار فقط (ملفات + بيان)، دون إرفاقها بشكل مضمّن.