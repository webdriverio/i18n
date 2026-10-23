---
id: reference
title: مرجع الإعدادات
description: "ابحث عن كل خيارات DevTools للوضع المباشر ووضع التتبع عبر محولات WebdriverIO وSelenium وNightwatch، مع القيم الافتراضية."
---

جميع خيارات DevTools في لمحة واحدة، عبر المحولات الثلاثة. تحمل الخيارات المشتركة نفس **الأسماء والأنواع والقيم الافتراضية** في كل محول؛ وحيثما يختلف السلوك أو التوفر، تتم الإشارة إلى ذلك، كما تُدرج الخيارات الخاصة بمحول واحد بشكل منفصل. لا يقبل محول Python كائن خيارات؛ راجع علامات تبويب Python في صفحة [Selenium](/docs/devtools/selenium#configuration-options). للاطلاع على الشرح الكامل لكل خيار من خيارات التتبع، راجع القسم المرتبط في صفحة [وضع التتبع](/docs/devtools/wdio/trace-mode).

مرّر الخيارات بالطريقة التي يقبلها كل محول:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## خيارات الوضع والوضع المباشر

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `'live'` لوحة تحكم واجهة DevTools؛ بينما يتخطاها `'trace'` ويكتب ملفًا قابلًا للنقل. الوضعان متنافيان. |
| `port` | `number` | `3000` (يُستخدم منفذ متاح إذا كان مشغولًا) | المنفذ الذي ترتبط به واجهة DevTools / الخادم الخلفي. للوضع المباشر فقط. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم. للوضع المباشر فقط. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | فيديو مستمر للجلسة (`.webm`). للوضع المباشر فقط — في وضع التتبع استخدم `video`. يتضمن `maxBufferFrames` (القيمة الافتراضية `2000`)، وهو الحد الأقصى للإطارات المحفوظة في الذاكرة. راجع [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | القدرات المستخدمة لفتح نافذة واجهة DevTools. لـ WebdriverIO في الوضع المباشر فقط. |

## خيارات وضع التتبع

تُطبَّق فقط عند `mode: 'trace'`.

| الخيار | النوع / القيم | القيمة الافتراضية | التفاصيل |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | أرشيف واحد مقابل مجلد غير مضغوط. [تنسيق الإخراج](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف مواصفات / اختبار. القيمة `'test'` مطلوبة للقطات الشاشة والفيديو لكل اختبار وللإرفاق المضمّن في Allure. [دقة التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | التتبعات التي يجب الاحتفاظ بها. يُستخدم مع `traceGranularity: 'test'`. [الاحتفاظ](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | تسجيل شاشة كثيف ومستمر داخل التتبع للتنقل السلس؛ تسجّل القيمة `false` إطارًا واحدًا لكل إجراء. يُقلَّص عند التصدير إلى إطارات تفصل بينها 100 مللي ثانية على الأقل، بحد أقصى 600 إطار تقريبًا. [شريط الإطارات الكثيف](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار (تتطلب `traceGranularity: 'test'`). تُرفق مضمّنة في Allure على WebdriverIO وSelenium؛ وتُنتَج فقط على Nightwatch. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | مقطع فيديو لكل اختبار (يتطلب `traceGranularity: 'test'`؛ ويتطلب الترميز وجود `ffmpeg` في `PATH`). يُرفق مضمّنًا في Allure على WebdriverIO وSelenium؛ ويُنتَج فقط على Nightwatch. [لقطة الشاشة والفيديو لكل اختبار](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | يكتب `devtools-artifacts-<sessionId>.json`. يُفعَّل تلقائيًا عند اكتشاف مُبلِّغ Allure (اختياري على Nightwatch). [بيان الملفات الناتجة](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | يلتقط `node:assert` (ومطابِقات `expect` الخاصة بإطار العمل حيثما كانت مدعومة) كإجراءات في التتبع. [التأكيدات](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## خاص بـ Selenium (Node.js)

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `openUi` | `boolean` | `true` | يفتح نافذة لوحة التحكم تلقائيًا. اضبطه على `false` في بيئة CI. |
| `headless` | `boolean` | `false` | يشغّل متصفح الاختبار بدون واجهة (`--headless=old`). لا تتأثر نافذة لوحة التحكم. |
| `rerunCommand` | `string` | تلقائي | قالب أمر لإعادة تشغيل كل اختبار على حدة؛ يُستبدل `{{testName}}`. يُشتق من argv الخاص بالمشغّل عند حذفه. |

## خاص بـ Nightwatch

| الخيار | النوع / القيم | القيمة الافتراضية | ملاحظات |
|---|---|---|---|
| `bidi` | `boolean` | `false` | تفعيل اختياري لالتقاط WebDriver BiDi (وحدة التحكم + استثناءات JS + الشبكة). يتطلب `webSocketUrl: true` في القدرات. على WebdriverIO وSelenium، يُربط BiDi تلقائيًا. راجع [Nightwatch → التقاط BiDi](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## الاختلافات بين المحولات

تتراجع بعض قدرات التتبع على محولات معينة — راجع [مصفوفة الدعم عبر أطر العمل](/docs/devtools/cross-framework) للاطلاع على الصورة الكاملة. أبرزها:

- **الاحتفاظ المراعي لإعادة المحاولة في Nightwatch** — القيمة `retain-on-failure` وحدها موثوقة؛ وتتراجع قيم `tracePolicy` الأخرى إليها.
- **BDD `describe/it` في Nightwatch** — تنهار `traceGranularity: 'test'` إلى مقطع واحد على مستوى الجلسة.
- **إرفاق Allure في Nightwatch** — يُنتَج `screenshot`/`video` لكل اختبار فقط (ملفات + بيان)، ولا يُرفقان بشكل مضمّن.