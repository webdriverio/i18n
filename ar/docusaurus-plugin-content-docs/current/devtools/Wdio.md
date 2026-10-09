---
id: wdio
title: أدوات المطور WebDriverIO DevTools
description: "قم بتثبيت خدمة WebdriverIO DevTools وتهيئتها لتصحيح أخطاء الاختبارات باستخدام إعادة تشغيل DOM، ولقطات الشاشة، والتقاط الشبكة ووحدة التحكم، وتسجيلات الشاشة."
---

خدمة WebdriverIO توفر واجهة مستخدم لأدوات المطور لتشغيل اختبارات أتمتة المتصفح وتصحيح أخطائها وفحصها. تشمل الميزات إعادة تشغيل تغييرات DOM، ولقطات شاشة لكل أمر، وفحص طلبات الشبكة، والتقاط سجلات وحدة التحكم، وتسجيل فيديو للجلسة.

## التثبيت

```sh
npm install @wdio/devtools-service --save-dev
```

## الاستخدام

### مشغل الاختبارات

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### الوضع المستقل

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## خيارات الخدمة

```ts
services: [['devtools', options]]
```

| الخيار | النوع | القيمة الافتراضية | الوصف |
|---|---|---|---|
| `port` | `number` | عشوائي | المنفذ الذي يستمع عليه خادم واجهة DevTools |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به خادم واجهة DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | الإمكانيات المستخدمة لفتح نافذة واجهة DevTools |
| `screencast` | `ScreencastOptions` | - | تسجيل فيديو للجلسة ([انظر Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools؛ بينما يتخطاها `trace` ويكتب بدلاً من ذلك ملفاً قابلاً للنقل ([انظر وضع التتبع](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | تخطيط ملف التتبع — أرشيف واحد مقابل مجلد غير مضغوط. ينطبق فقط عند `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف مواصفات / اختبار. يكتب `'test'` كل تتبع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. ينطبق فقط عند `mode: 'trace'` ([انظر وضع التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | التتبعات التي يتم الاحتفاظ بها. يُستخدم مع `traceGranularity: 'test'`. ينطبق فقط عند `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | يسجل شريط إطارات كثيفاً ومستمراً *داخل* التتبع لتشغيل سلس قابل للتمرير في المشغل — إطارات كثيفة إلى جانب إطارات كل إجراء، يتم تقليلها وعنونتها حسب المحتوى عند التصدير. ينطبق فقط عند `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار، تُرفق مضمّنة في Allure (`image/png`). يتطلب `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | فيديو لكل اختبار، يُحتفظ به وفقاً للسياسة المحددة ويُرفق مضمّناً في Allure (`video/webm`). يتطلب `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | يكتب `devtools-artifacts-<sessionId>.json` — فهرس عام لكل الملفات الناتجة بالإضافة إلى حالة كل اختبار، لأدوات التقارير/CI. يُفعَّل تلقائياً عند وجود `@wdio/allure-reporter` في الإعدادات. ينطبق فقط عند `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | التقاط التأكيدات كصفوف إجراءات في التتبع — `node:assert` بالإضافة إلى مطابقات `expect(...)` الناجحة/الفاشلة. اضبطه على `false` لإلغاء التفعيل |

## البدء

1. شغّل اختبارات WebdriverIO الخاصة بك
2. تُفتح واجهة DevTools تلقائياً في نافذة متصفح خارجية
3. تبدأ الاختبارات في التنفيذ فوراً مع عرض مرئي في الوقت الفعلي
4. اعرض معاينة المتصفح المباشرة، وتقدم الاختبار، وتنفيذ الأوامر
5. بعد اكتمال التشغيل الأولي، استخدم أزرار التشغيل لإعادة تشغيل اختبارات أو مجموعات فردية
6. انقر على زر الإيقاف في أي وقت لإنهاء الاختبارات قيد التشغيل
7. استكشف الإجراءات، والبيانات الوصفية، وسجلات وحدة التحكم، والشيفرة المصدرية في علامات تبويب منطقة العمل

## الميزات

استكشف ميزات WebDriverIO DevTools بالتفصيل:

- **[إعادة تشغيل الاختبارات التفاعلية والعرض المرئي](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات المتصفح في الوقت الفعلي مع إعادة تشغيل الاختبارات
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن الفروقات بين التشغيلين جنباً إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - يعمل مع Mocha وJasmine وCucumber
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقاط مخرجات وحدة تحكم المتصفح وفحصها
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - إمكانيات الجلسة، والبيئة، والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال إلى الشيفرة المصدرية مع تنقل ذكي في الشيفرة
- **[تسجيل الجلسة](/docs/devtools/wdio/screencast)** - تسجيل فيديو تلقائي لجلسات المتصفح
- **[وضع التتبع](/docs/devtools/wdio/trace-mode)** - مسار التقاط دون واجهة ينتج ملف `trace.zip` قابلاً للنقل (بدون نافذة واجهة)؛ يدعم صيغتي الإخراج `zip` و`ndjson-directory`، ودقة على مستوى الجلسة/المواصفات/الاختبار، وسياسات احتفاظ تراعي إعادة المحاولة، و`filmstrip` كثيفاً اختيارياً، وكلها قابلة للعرض في مشغل `show-trace` الرسمي

## مشغل التتبع

يُفتح التتبع المسجل باستخدام `mode: 'trace'` في مشغل `show-trace` الرسمي (`npx show-trace path/to/trace.zip`) — مع التنقل الزمني في DOM، وعلامة تبويب A11y وتراكب العناصر لاختيار محدد الموقع، وعلامة تبويب Transcript مع خاصية Copy-for-LLM، وعلامات تبويب Errors / Console / Network / Source، وخط زمني قابل للتمرير (شريط إطارات كثيف، وتداخل Cucumber Feature → Scenario → Step).

راجع صفحة **[مشغل التتبع](/docs/devtools/trace-player)** للاطلاع على الشرح الكامل والعارضات المتوافقة الأخرى.

## تقارير Allure

عند وجود `@wdio/allure-reporter` في الإعدادات، تُرفق ملفات وضع التتبع (ملف التتبع المضغوط، بالإضافة إلى لقطة الشاشة والفيديو لكل اختبار عند `traceGranularity: 'test'`) بتقرير Allure تلقائياً، ويُفعَّل `emitArtifactsManifest` تلقائياً.

راجع **[التكامل مع Allure](/docs/devtools/allure)** للاطلاع على تفاصيل المرفقات وخيارات إخفاء خطوات أداة التقارير.