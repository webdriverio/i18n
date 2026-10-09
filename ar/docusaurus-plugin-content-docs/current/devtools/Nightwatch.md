---
id: nightwatch
title: أدوات المطور لـ Nightwatch
description: "أضف واجهة تصحيح الأخطاء من DevTools إلى مجموعة اختبارات Nightwatch دون تغيير الاختبارات، واضبط تسجيلات الشاشة والتقاط BiDi ووضع التتبع."
---

محوّل Nightwatch لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools)، ويوفر واجهة تصحيح الأخطاء المرئية نفسها لمجموعة اختبارات Nightwatch دون أي تغيير في شيفرة الاختبارات.

## التثبيت

```bash
npm install @wdio/nightwatch-devtools
```

## الإعداد

### Nightwatch القياسي (بأسلوب mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // مطلوب لالتقاط طلبات الشبكة
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

شغّل اختباراتك كالمعتاد، وستُفتح واجهة DevTools تلقائيًا في نافذة متصفح جديدة:

```bash
nightwatch
```

> لا حاجة إلى أي تغييرات في ملفات الاختبار.

### Cucumber / BDD

استورد `cucumberHooksPath` إلى جانب التصدير الرئيسي، ومرّره إلى الخيار `require` في Cucumber. يسجّل ذلك خطافات السيناريو `Before` / `After` التي تحاكي سلوك `beforeScenario` / `afterScenario` في خدمة WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- تسجيل خطافات Cucumber الخاصة بـ DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## خيارات الإعداد

| الخيار | النوع | القيمة الافتراضية | الوصف |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | منفذ خادم DevTools الخلفي. يُزاد تلقائيًا إذا كان مستخدمًا بالفعل. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم الخلفي. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة. راجع [Screencast](#screencast) أدناه. |
| `bidi` | `boolean` | `false` | تفعيل التقاط WebDriver BiDi لوحدة تحكم المتصفح واستثناءات JS والشبكة. يتطلب `webSocketUrl: true` في الإمكانات (capabilities) ونسخة chromedriver تدعم BiDi. عند الاتصال، يُعطَّل مسار الشبكة المعتمد على سجل أداء Chrome لكل أمر حتى لا تتكرر الطلبات. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools؛ أما `trace` فيتخطاها ويكتب ملف أثر قابلًا للنقل بدلًا من ذلك. راجع [وضع التتبع](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | بنية ملف التتبع. ينطبق فقط عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف مواصفات / اختبار. تكتب القيمة `'test'` كل تتبع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. ينطبق فقط عند `mode: 'trace'`. راجع [وضع التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **تنبيه:** تنهار واجهة BDD `describe/it` إلى شريحة واحدة على مستوى الجلسة (راجع [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | التتبعات التي يُحتفظ بها. يُستخدم مع `traceGranularity: 'test'`. ينطبق فقط عند `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | تسجيل شريط لقطات شاشة كثيف ومتواصل داخل التتبع للتشغيل القابل للتمرير في مشغل التتبع، وليس مجرد إطار واحد لكل إجراء. يشغّل مسجّل الشاشة (وضع الاستطلاع في Nightwatch) طوال الجلسة. ينطبق فقط عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار. في وضع التتبع مع `traceGranularity: 'test'` فقط. **إنتاج فقط**: يُكتب ملف PNG إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`)، ولا يُرفق مباشرة بـ Allure (راجع الملاحظة أدناه). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | مقطع فيديو لكل اختبار، يُحتفظ به وفق السياسة المحددة (مثل `'retain-on-failure'`). في وضع التتبع مع `traceGranularity: 'test'` فقط. أي قيمة غير `off` تشغّل مسجّل الشاشة بنفسها، فلا تحتاج **أيضًا** إلى `filmstrip` أو `screencast.enabled`. **إنتاج فقط**: يُكتب ملف `.webm` إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`)، ولا يُرفق مباشرة بـ Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | كتابة البيان `devtools-artifacts-<sessionId>.json` (الفهرس العام الذي تستهلكه أدوات التقارير وأنظمة CI لاكتشاف الملفات المُنتَجة) بجوار التتبع. **اختياري في Nightwatch**: لا توجد إشارة Allure حية يمكن الاكتشاف التلقائي بناءً عليها، لذا لا يُفعَّل تلقائيًا أبدًا بخلاف WDIO/Selenium. ينطبق فقط عند `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | التقاط التأكيدات (assertions) كصفوف إجراءات في التتبع، وتشمل `node:assert` إضافة إلى `browser.assert`/`browser.verify` الأصلية، بما في ذلك المطابِقات المنفية `.not.*`. اضبطه على `false` لإلغاء التفعيل. |

> **الإرفاق المباشر بـ Allure غير مدعوم في Nightwatch.** أداة التقارير الرسمية `nightwatch-allure` تعمل بعد انتهاء التشغيل (لا توجد واجهة برمجية للإرفاق المباشر)، كما أن الدالة `attachment()` من `allure-js-commons` لا تفعل شيئًا في تشغيل Nightwatch. لذلك تُ*نتَج* ملفات `screenshot` / `video` (ملفات، إضافة إلى بيان الملفات عند `emitArtifactsManifest: true`) في مجلد مخرجات التتبع، لكنها لا تُرفق باختبار Allure. التقسيم لكل اختبار - وبالتالي هذه الملفات - له معنى في واجهتي Cucumber وexports-object؛ أما واجهة BDD `describe/it` فتنهار إلى مستوى الجلسة، فلا يعمل شرط كل اختبار هناك.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## تسجيل الشاشة (Screencast)

سجّل فيديو `.webm` متواصلًا لجلسة المتصفح. يبدأ التسجيل مع أول جلسة يرصدها المكوّن الإضافي، ويُنهى في الخطاف `after()` الخاص بـ Nightwatch.

**وضع الاستطلاع فقط.** لا يوفر Nightwatch منفذًا ثابتًا للوصول إلى CDP كما يفعل WebdriverIO (`browser.getPuppeteer()`) وSelenium (`driver.createCDPConnection`)، لذا يلتقط تسجيل الشاشة الإطارات عبر استدعاء `browser.takeScreenshot()` على فترات ثابتة. يعمل على جميع المتصفحات التي يدعمها Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| الخيار | النوع | القيمة الافتراضية | ملاحظات |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | المفتاح الرئيسي. |
| `pollIntervalMs` | `number` | `200` | الفاصل الزمني بين لقطات الشاشة (بالمللي ثانية). قيمة أقل = فيديو أكثر سلاسة وعدد أكبر من الرحلات إلى WebDriver. ‏200 ms ≈ ‏5 إطارات في الثانية. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | تنسيق البكسل لكل إطار الذي يُسلَّم إلى مُرمِّز ffmpeg قبل الدمج النهائي في `.webm`. في وضع الاستطلاع تُلتقط لقطات الشاشة المصدرية دائمًا بتنسيق PNG، لذا **لا** يغيّر هذا الخيار الالتقاط، بل فقط التنسيق الذي يستقبله المُرمِّز لكل إطار. |
| `maxWidth` / `maxHeight` / `quality` | - | - | خيارات خاصة بـ CDP فقط، وتُتجاهل في وضع الاستطلاع. مذكورة للتوافق في البنية مع محوّلَي WDIO/Selenium. |

**المتطلبات المسبقة:** `fluent-ffmpeg` (وهو بالفعل اعتمادية تشغيل للحزمة) إضافة إلى الملف التنفيذي `ffmpeg` في PATH. على macOS: ‏`brew install ffmpeg`. على Linux: ‏`apt install ffmpeg`. بدون ffmpeg يظل المسجّل يعمل، لكن خطوة الترميز تسجّل تحذيرًا وتتخطى كتابة الملف.

**المخرجات:** يُكتب ملف الفيديو بجوار ملف الاختبار الذي تم تشغيله للتو (مع استخدام مجلد `nightwatch.conf.*` كبديل، ثم `process.cwd()` كملاذ أخير). يظهر المسار الكامل في سطر سجل Nightwatch ‏`📹 Screencast video: <path>`، كما يُبث الفيديو إلى تبويب Screencast في لوحة التحكم.

للاطلاع على المرجع الكامل لميزة تسجيل الشاشة (دعم المتصفحات، ومسارات المخرجات عبر المحوّلات الثلاثة)، راجع [صفحة Screencast](/docs/devtools/wdio/screencast).

## التقاط BiDi (اختياري)

فعّل التقاط WebDriver BiDi لرسائل وحدة تحكم المتصفح واستثناءات JS وطلبات الشبكة. وهو مكافئ للمسار الذي يستخدمه selenium-devtools، إذ يتشارك المحوّلان منطق الاتصال نفسه في `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

تحتاج أيضًا إلى `webSocketUrl: true` في الإمكانات حتى يكشف chromedriver فعليًا قناة BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← يفعّل BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

عند الاتصال عبر BiDi، يُعطَّل مسار التقاط الشبكة المعتمد على سجل أداء Chrome لكل أمر حتى لا تظهر الطلبات مرتين في لوحة التحكم. إذا كان `webSocketUrl` مفقودًا أو كان إصدار chromedriver لا يكشف BiDi، يفشل الاتصال بصمت ويستمر البديل المعتمد على سجل الأداء في العمل.

## وضع التتبع

مسار التقاط بدون واجهة، حيث لا تُفتح أي نافذة لواجهة DevTools. عند انتهاء الجلسة يكتب المحوّل ملفًا قابلًا للنقل `trace-<sessionId>.zip` (أو مجلدًا) داخل مجلد `test-results/` (بجوار مجلد الاختبار / الإعداد المُحدَّد)، بنفس بنية ملف تتبع WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختياري؛ القيمة الافتراضية 'zip'
})
```

### مستوى التفصيل وCucumber

يحدد `traceGranularity` ما يغطيه ملف واحد: `'session'` (الافتراضي)، أو `'spec'`، أو `'test'`.

يغلق Nightwatch المتصفح بعد كل سيناريو Cucumber. يمتد تتبع `'session'` عبر ذلك: ملف zip واحد للتشغيل بأكمله، مع تداخل كل سيناريو تحت الميزة الخاصة به. أما `'test'` فيكتب ملف zip لكل سيناريو في مجلد خاص به، وهو الخيار الموصى به لـ Cucumber: ملفات أصغر، وهو مستوى التفصيل الذي تعتمد عليه سياسة الاحتفاظ `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // تتبع واحد لكل سيناريو Cucumber
})
```

في واجهة BDD `describe/it`، تنهار القيمة `'test'` إلى شريحة واحدة على مستوى الجلسة: يشغّل Nightwatch كل `it()` داخليًا ويطلق خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة فقط لكل وحدة. ومع ذلك تظل شجرة الإجراءات تعرض كل `it` كمجموعة مستقلة.

يُتخطى ربط منفذ الخادم الخلفي ونافذة الواجهة والخيار `screencast` جميعها في وضع التتبع. للاطلاع على المرجع الكامل للميزة (محتويات الملف، والعارض، واختبار الأجهزة المحمولة، ومتى تختار `zip` أو `ndjson-directory`)، راجع [صفحة وضع التتبع](/docs/devtools/wdio/trace-mode).

يتشارك Nightwatch مسار التتبع نفسه مع محوّلَي WebdriverIO وSelenium، لذا تكون بنية الملف متطابقة بغض النظر عن المحوّل الذي أنتجه. يحمل تتبع Nightwatch الالتقاط الكامل لكل إجراء: لقطة شاشة، ولقطة شجرة إمكانية الوصول ذات المسافات البادئة حسب العمق، وقائمة العناصر القابلة للتفاعل، والنص المكتوب بصيغة Markdown، لذا يُفتح في مشغل `show-trace` مع التنقل الزمني في DOM/اللقطات، وتبويبَي **A11y** و**Transcript**، وطبقة اختيار محدد العناصر، و(في Cucumber) التداخل **Feature → Scenario → Step**.

افتح تتبعًا باستخدام الأمر `show-trace` المرفق مع `@wdio/nightwatch-devtools` (دون اعتمادية إضافية):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # في مشروع يثبّت المحوّل
pnpm show-trace test-results/trace-<sessionId>.zip  # من المستودع الموحّد devtools
```

راجع صفحة [مشغل التتبع](/docs/devtools/trace-player) للحصول على الشرح الكامل واختصارات لوحة المفاتيح.

### التقسيم لكل اختبار وتنبيه واجهة BDD `describe/it`

تحتاج الخيارات الخاصة بكل اختبار - `traceGranularity: 'test'`، والخيارات `tracePolicy` و`screenshot` و`video` المقترنة به - إلى خطاف لكل اختبار لاقتطاع شريحة كل اختبار. توفر واجهة **exports-object (بأسلوب mocha)** وواجهة **Cucumber** (خطافات لكل سيناريو) هذا الخطاف، فتحصلان على تقسيم حقيقي لكل اختبار. أما واجهة **BDD `describe/it`** فهي الاستثناء: يشغّل Nightwatch كل `it()` داخليًا ويطلق خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة فقط لكل وحدة، لذا تنهار `traceGranularity: 'test'` إلى شريحة واحدة **على مستوى الجلسة** مرتبطة بالاختبار الأول. يظل بيان الملفات يسرد كل حالة اختبار مع حالتها الصحيحة؛ وإنما ينهار فقط ربط الشرائح/الملفات بكل اختبار. أما التتبعات على مستوى الجلسة والمواصفات فلا تتأثر.

## أمثلة

توجد أمثلة عاملة في المجلد `examples/` على المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل من جذر المستودع:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch بأسلوب mocha | `pnpm demo:nightwatch` |

## الميزات

يوفر محوّل Nightwatch تجربة واجهة DevTools نفسها التي يوفرها WebdriverIO. تُلتقط كل ميزة أدناه تلقائيًا باستخدام الإعداد الأساسي `globals: nightwatchDevtools({ port: 3000 })`، دون إعداد خاص بكل ميزة (تحتاج سجلات الشبكة إضافةً إلى ذلك إلى `'goog:loggingPrefs': { performance: 'ALL' }`، كما هو موضح في [الإعداد](#setup)). تؤدي الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات تفاعليًا والتصوّر](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات حية للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار/المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقاط لقطة لاختبار فاشل، وإعادة تشغيله، ومقارنة التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - المشغّلات القياسية (بأسلوب mocha) وCucumber/BDD
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقاط مخرجات وحدة تحكم المتصفح وفحصها (في الوقت الفعلي مع `bidi: true`)
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - إمكانات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال من أي أمر إلى سطر الشيفرة المصدرية الذي أطلقه
- **[تسجيل شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل `.webm` متواصل لجلسة المتصفح
- **[وضع التتبع](/docs/devtools/wdio/trace-mode)** - التقاط بدون واجهة يُنتج ملف `trace.zip` قابلًا للنقل (دون نافذة واجهة)

تسجيل الشاشة هو الميزة الوحيدة التي لها خيارات خاصة بها (القائمة الكاملة ضمن [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## القيود

لا يوفر Nightwatch العمق نفسه من خطافات إطار العمل الذي يوفره WebdriverIO، لذا توجد بعض الاختلافات عن خدمة WDIO DevTools:

| القيد | التفاصيل |
|-----------|--------|
| لا توجد خطافات أوامر أصلية | لا يملك Nightwatch خطاف `beforeCommand` / `afterCommand`. تُعترض الأوامر بدلًا من ذلك عبر غلاف وكيل (proxy) للمتصفح. |
| سياق اختبار محدود | يوفر `browser.currentTest` بيانات وصفية أقل من سياق مشغّل WDIO؛ وتتطلب أسماء الاختبارات ومسارات الملفات أساليب استدلالية إضافية. |
| تداخل مسطّح للمجموعات | لا يدعم Nightwatch أصلًا كتل `describe` متعددة التداخل؛ ويُبلغ المكوّن الإضافي عن مستويين كحد أقصى. |
| تأخر توفر النتائج | لا تُنهى نتائج الاختبار إلا في `afterEach`، ولا تتوفر في منتصف الاختبار. |
| تسجيل الشاشة في وضع الاستطلاع فقط | بخلاف WDIO (دفع CDP عبر `browser.getPuppeteer()`) وSelenium (دفع CDP عبر `driver.createCDPConnection`)، يفتقر Nightwatch إلى منفذ ثابت للوصول إلى CDP، لذا تُلتقط الإطارات عبر استطلاع `browser.takeScreenshot()`. يعمل على جميع المتصفحات التي يدعمها Nightwatch؛ مع تكلفة صغيرة لكل إطار تتناسب مع فاصل الاستطلاع. |
| تقسيم التتبع لكل اختبار (BDD `describe/it`) | تطلق واجهة BDD خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة لكل وحدة، لذا تنهار `traceGranularity: 'test'` إلى شريحة واحدة على مستوى الجلسة. تحصل واجهتا exports-object (بأسلوب mocha) وCucumber على تقسيم حقيقي لكل اختبار. راجع [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat). |
| ملفات تتبع للإنتاج فقط | تُكتب ملفات `screenshot` / `video` لكل اختبار إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`) لكنها لا تُرفق مباشرة بـ Allure، إذ لا يملك Nightwatch واجهة برمجية للإرفاق المباشر بـ Allure. |

تبلغ نسبة التكافؤ الإجمالي في الميزات مع خدمة WebdriverIO DevTools حوالي **80-90%**.