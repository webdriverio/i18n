---
id: wdio
title: أدوات المطور WebDriverIO DevTools
description: "ثبّت خدمة WebdriverIO DevTools واضبط إعداداتها لتصحيح أخطاء الاختبارات باستخدام إعادة تشغيل DOM ولقطات الشاشة والتقاط الشبكة ووحدة التحكم وتسجيلات الشاشة."
---

خدمة WebdriverIO توفر واجهة مستخدم لأدوات المطور لتشغيل اختبارات أتمتة المتصفح وتصحيح أخطائها وفحصها. تشمل الميزات إعادة تشغيل تغييرات DOM، ولقطات شاشة لكل أمر، وفحص طلبات الشبكة، والتقاط سجلات وحدة التحكم، وتسجيل فيديو للجلسة (screencast).

## التثبيت

```sh
npm install @wdio/devtools-service --save-dev
```

## الاستخدام

### مشغّل الاختبارات (Test Runner)

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### الوضع المستقل (Standalone)

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

يتطلب جلسة متصفح تدعم WebDriver BiDi (‏Chrome 114+‏، Firefox 130+)، والتي يفعّلها WebdriverIO تلقائيًا. تتخطى جلسات Appium التقاط الصفحة الذي يحتاج إليها؛ اضبط `'wdio:enforceWebDriverClassic': true` في كتلة إمكانيات Appium (راجع [اختبار الأجهزة المحمولة](/docs/devtools/mobile)).

## خيارات الخدمة

```ts
services: [['devtools', options]]
```

| الخيار | النوع | القيمة الافتراضية | الوصف |
|---|---|---|---|
| `port` | `number` | `3000` (يُستخدم منفذ متاح إذا كان مشغولًا) | المنفذ الذي يستمع عليه خادم واجهة DevTools |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به خادم واجهة DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | الإمكانيات المستخدمة لفتح نافذة واجهة DevTools |
| `screencast` | `ScreencastOptions` | - | تسجيل فيديو للجلسة ([راجع Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools؛ بينما يتخطاها `trace` ويكتب بدلًا من ذلك ملفًا قابلًا للنقل ([راجع وضع التتبع](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | تخطيط ملف التتبع — أرشيف واحد مقابل مجلد غير مضغوط. ينطبق فقط عند `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف مواصفات / اختبار. يكتب `'test'` كل تتبع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. ينطبق فقط عند `mode: 'trace'` ([راجع وضع التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | أي التتبعات يُحتفظ بها. يُستخدم مع `traceGranularity: 'test'`. ينطبق فقط عند `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | يسجّل شريط إطارات (filmstrip) كثيفًا ومستمرًا *داخل* التتبع لتشغيل سلس قابل للتمرير في المشغّل — إطارات كثيفة إلى جانب الإطارات الخاصة بكل إجراء، تُخفَّف وتُعنوَن حسب المحتوى عند التصدير. ينطبق فقط عند `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار، تُرفق مضمّنة في Allure (`image/png`). يتطلب `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | فيديو تسجيل شاشة لكل اختبار، يُحتفظ به وفق السياسة المحددة ويُرفق مضمّنًا في Allure (`video/webm`). يتطلب `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | يكتب `devtools-artifacts-<sessionId>.json` — فهرس عام لكل ملف ناتج بالإضافة إلى حالة كل اختبار، لأدوات إعداد التقارير/CI. يُفعَّل تلقائيًا عند وجود `@wdio/allure-reporter` في الإعدادات. ينطبق فقط عند `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | التقاط التأكيدات كصفوف إجراءات في التتبع — `node:assert` بالإضافة إلى مطابِقات `expect(...)` الناجحة/الفاشلة. اضبطه على `false` لإلغاء التفعيل |

## لقطة وقت التشغيل

تضيف الخدمة الأمر `browser.getSnapshot()` الذي يُرجع شجرة إمكانية وصول قابلة للقراءة بواسطة الذكاء الاصطناعي للصفحة الحالية (`text`) بالإضافة إلى خريطة `elements` من مراجع قصيرة (`e1`، `e2`، …) إلى المحددات:

```ts
const { text, elements } = await browser.getSnapshot({ inViewportOnly: true })
```

يقرأ الصفحة الحية مباشرة، دون أي عبء إضافي لوضع التتبع. تستخدم محدداته دائمًا CSS / XPath القابلة للنقل، لذا قد يختلف محدد النص عن المحدد بلهجة WebdriverIO الذي يعرضه تبويب A11y في مشغّل التتبع.

## البدء

1. شغّل اختبارات WebdriverIO الخاصة بك
2. تفتح واجهة DevTools تلقائيًا في نافذة متصفح خارجية
3. يبدأ تنفيذ الاختبارات فورًا مع عرض مرئي في الوقت الفعلي
4. اعرض المعاينة الحية للمتصفح وتقدم الاختبارات وتنفيذ الأوامر
5. بعد اكتمال التشغيل الأولي، استخدم أزرار التشغيل لإعادة تشغيل اختبارات أو مجموعات اختبارات فردية
6. انقر على زر الإيقاف في أي وقت لإنهاء الاختبارات الجارية
7. استكشف الإجراءات والبيانات الوصفية وسجلات وحدة التحكم والشيفرة المصدرية في تبويبات منطقة العمل

## الميزات

استكشف ميزات WebDriverIO DevTools بالتفصيل:

- **[إعادة تشغيل الاختبارات التفاعلية والعرض المرئي](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات متصفح في الوقت الفعلي مع إعادة تشغيل الاختبارات
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن بين التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - يعمل مع Mocha وJasmine وCucumber
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقط مخرجات وحدة تحكم المتصفح وافحصها
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - راقب استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - إمكانيات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - انتقل إلى الشيفرة المصدرية عبر تنقل ذكي في الشيفرة
- **[تسجيل شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل فيديو تلقائي لجلسات المتصفح
- **[وضع التتبع](/docs/devtools/wdio/trace-mode)** - مسار التقاط بدون واجهة ينتج ملف `trace.zip` قابلًا للنقل (دون نافذة واجهة)؛ يدعم تنسيقي الإخراج `zip` و`ndjson-directory`، ودقة على مستوى الجلسة/ملف المواصفات/الاختبار، وسياسات احتفاظ مدركة لإعادة المحاولة، و`filmstrip` كثيفًا اختياريًا، وكلها قابلة للعرض في المشغّل الرسمي `show-trace`

## مشغّل التتبع

يُفتح التتبع المسجَّل باستخدام `mode: 'trace'` في المشغّل الرسمي `show-trace` (`npx show-trace path/to/trace.zip`) — مع التنقل عبر الزمن في DOM، وتبويب A11y وطبقة تحديد العنصر لاختيار المحدد، وتبويب Transcript مع خيار Copy-for-LLM، وتبويبات Errors / Console / Network / Source، وخط زمني قابل للتمرير (شريط إطارات كثيف، وتداخل Scenario → Step في Cucumber).

راجع صفحة **[مشغّل التتبع](/docs/devtools/trace-player)** للحصول على الشرح الكامل وعارضات أخرى متوافقة.

## تقارير Allure

عند وجود `@wdio/allure-reporter` في الإعدادات، تُرفق ملفات وضع التتبع (ملف zip الخاص بالتتبع، بالإضافة إلى لقطة الشاشة والفيديو لكل اختبار عند `traceGranularity: 'test'`) بتقرير Allure تلقائيًا، ويُفعَّل `emitArtifactsManifest` تلقائيًا.

راجع **[التكامل مع Allure](/docs/devtools/allure)** للاطلاع على تفاصيل المرفقات وخيارات إخفاء خطوات أداة التقارير.