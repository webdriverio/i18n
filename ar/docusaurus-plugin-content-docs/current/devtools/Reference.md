---
id: reference
title: مرجع الإعدادات
description: "استعرض جميع خيارات DevTools للوضع المباشر ووضع التتبع عبر محولات WebdriverIO وSelenium وNightwatch، مع القيم الافتراضية."
---

جميع خيارات DevTools في لمحة واحدة، عبر المحولات الثلاثة. **أسماء الخيارات وأنواعها وقيمها الافتراضية متطابقة** في كل محول؛ وحيثما يختلف السلوك، تتم الإشارة إلى ذلك. للاطلاع على الشرح الكامل لكل خيار من خيارات التتبع، راجع القسم المرتبط في صفحة [وضع التتبع](/docs/devtools/wdio/trace-mode).

مرّر الخيارات بالطريقة التي يتقبلها كل محول:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## خيارات الوضع والوضع المباشر

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `'live'` لوحة تحكم واجهة DevTools؛ بينما يتخطاها `'trace'` ويكتب ملفًا قابلًا للنقل. الوضعان متنافيان. |
| `port` | `number` | عشوائي | المنفذ الذي ترتبط به واجهة DevTools / الخادم الخلفي. للوضع المباشر فقط. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم. للوضع المباشر فقط. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | فيديو مستمر للجلسة (`.webm`). للوضع المباشر فقط — في وضع التتبع استخدم `video`. راجع [تسجيل الشاشة](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | القدرات المستخدمة لفتح نافذة واجهة DevTools. WebdriverIO، للوضع المباشر فقط. |

## خيارات وضع التتبع

تُطبَّق فقط عند `mode: 'trace'`.

| الخيار | النوع / القيم | القيمة الافتراضية | التفاصيل |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | أرشيف واحد مقابل مجلد غير مضغوط. [تنسيق المخرجات](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف spec / اختبار. القيمة `'test'` مطلوبة للقطات الشاشة والفيديو لكل اختبار وللإرفاق المضمّن في Allure. [دقة التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | تحدد التتبعات التي يتم الاحتفاظ بها. يُستخدم مع `traceGranularity: 'test'`. [الاحتفاظ](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | تسجيل شاشة كثيف ومستمر داخل التتبع لتصفح سلس؛ أما `false` فيسجل إطارًا واحدًا لكل إجراء. [شريط الإطارات الكثيف](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار (يتطلب `traceGranularity: 'test'`). خيار خاص بخدمة WebdriverIO. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | مقطع فيديو لكل اختبار (يتطلب `traceGranularity: 'test'`). خيار خاص بخدمة WebdriverIO. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | يكتب الملف `devtools-artifacts-<sessionId>.json`. يُفعَّل تلقائيًا عند اكتشاف مُبلِّغ Allure (اختياري في Nightwatch). [بيان الملفات الناتجة](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | يلتقط `node:assert` (ومطابقات `expect` الخاصة بإطار العمل حيثما كانت مدعومة) كإجراءات في التتبع. [التأكيدات](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## خاص بـ Nightwatch فقط

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `bidi` | `boolean` | `false` | تفعيل الالتقاط عبر WebDriver BiDi (وحدة التحكم + استثناءات JS + الشبكة). يتطلب `webSocketUrl: true` في القدرات. في WebdriverIO وSelenium، يتم إرفاق BiDi تلقائيًا. راجع [Nightwatch ← الالتقاط عبر BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## الاختلافات بين المحولات

تتراجع بعض قدرات التتبع في محولات معينة — راجع [مصفوفة الدعم عبر أطر العمل](/docs/devtools/cross-framework) للحصول على الصورة الكاملة. وأبرزها:

- **الاحتفاظ المراعي لإعادة المحاولات في Nightwatch** — القيمة `retain-on-failure` هي الوحيدة الموثوقة؛ وتتراجع قيم `tracePolicy` الأخرى إليها.
- **أسلوب BDD `describe/it` في Nightwatch** — تنكمش `traceGranularity: 'test'` إلى مقطع واحد على مستوى الجلسة.
- **الإرفاق في Allure مع Nightwatch** — يقتصر `screenshot`/`video` لكل اختبار على الإنتاج فقط (الملفات + البيان)، ولا يتم إرفاقها بشكل مضمّن.