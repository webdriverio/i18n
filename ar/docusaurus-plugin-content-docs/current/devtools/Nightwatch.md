---
id: nightwatch
title: أدوات DevTools لـ Nightwatch
description: "أضف واجهة تصحيح الأخطاء DevTools إلى مجموعة اختبارات Nightwatch دون تغيير الاختبارات، واضبط تسجيلات الشاشة والتقاط BiDi ووضع التتبع."
---

محوّل Nightwatch لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools) - يجلب واجهة تصحيح الأخطاء المرئية نفسها إلى مجموعة اختبارات Nightwatch الخاصة بك دون أي تغييرات في شيفرة الاختبارات.

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
        // Required for network request capture
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

شغّل اختباراتك كالمعتاد - تُفتح واجهة DevTools تلقائيًا في نافذة متصفح جديدة:

```bash
nightwatch
```

> لا حاجة لأي تغييرات في ملفات الاختبار الخاصة بك.

### Cucumber / BDD

استورد `cucumberHooksPath` إلى جانب التصدير الرئيسي ومرّره إلى خيار `require` في Cucumber. يسجّل هذا خطافات السيناريو `Before` / `After` التي تحاكي سلوك `beforeScenario` / `afterScenario` في خدمة WebdriverIO.

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

| الخيار | النوع | الافتراضي | الوصف |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | منفذ خادم DevTools الخلفي. تتم زيادته تلقائيًا إذا كان قيد الاستخدام بالفعل. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم الخلفي. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة. انظر [تسجيل الشاشة](#screencast) أدناه. |
| `bidi` | `boolean` | `false` | تفعيل التقاط WebDriver BiDi لوحدة تحكم المتصفح + استثناءات JS + الشبكة. يتطلب `webSocketUrl: true` في قدراتك (capabilities) ونسخة chromedriver تدعم BiDi. عند الاتصال، يتم تعطيل مسار شبكة سجل أداء Chrome لكل أمر حتى لا تتكرر الطلبات. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools؛ بينما يتخطاها `trace` ويكتب بدلًا من ذلك ملفًا قابلًا للنقل. انظر [وضع التتبع](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | تخطيط ملف التتبع. ينطبق فقط عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبع واحد لكل جلسة / ملف مواصفات / اختبار. يكتب `'test'` كل تتبع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. ينطبق فقط عند `mode: 'trace'`. انظر [وضع التتبع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **تنبيه:** تنهار واجهة BDD `describe/it` إلى شريحة واحدة على مستوى الجلسة (انظر [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | أي التتبعات يتم الاحتفاظ بها. يُستخدم مع `traceGranularity: 'test'`. ينطبق فقط عند `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | تسجيل شريط أفلام كثيف ومستمر من لقطات الشاشة داخل التتبع لتشغيل قابل للتمرير في مشغل التتبع — وليس مجرد إطار واحد لكل إجراء. يشغّل مسجّل الشاشة (وضع الاستطلاع في Nightwatch) طوال الجلسة. ينطبق فقط عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار. في وضع التتبع + `traceGranularity: 'test'` فقط. **إنتاج فقط** — تُكتب صورة PNG إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`)؛ ولا تُرفق مباشرةً بـ Allure (انظر الملاحظة أدناه). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | مقطع فيديو لكل اختبار، يُحتفظ به وفق السياسة المحددة (مثل `'retain-on-failure'`). في وضع التتبع + `traceGranularity: 'test'` فقط. أي قيمة غير `off` تشغّل مسجّل الشاشة بنفسها — **لا** تحتاج أيضًا إلى `filmstrip` أو `screencast.enabled`. **إنتاج فقط** — يُكتب ملف `.webm` إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`)؛ ولا يُرفق مباشرةً بـ Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | كتابة البيان `devtools-artifacts-<sessionId>.json` (الفهرس العام الذي تستهلكه أدوات التقارير/CI لاكتشاف الملفات المُنتَجة) بجوار التتبع. **اختياري في Nightwatch** — إذ لا توجد إشارة Allure حية لاكتشافها تلقائيًا، لذا وعلى عكس WDIO/Selenium لا يُفعَّل تلقائيًا أبدًا. ينطبق فقط عند `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | التقاط التأكيدات (assertions) كصفوف إجراءات في التتبع — `node:assert` بالإضافة إلى `browser.assert`/`browser.verify` الأصلية، بما في ذلك المطابِقات المنفية `.not.*`. اضبطه على `false` لإلغاء التفعيل. |

> **الإرفاق المباشر بـ Allure غير مدعوم في Nightwatch.** إن أداة التقارير الرسمية `nightwatch-allure` تعمل بعد انتهاء التشغيل (دون واجهة برمجية للإرفاق الحي)، و`attachment()` من `allure-js-commons` لا تفعل شيئًا في تشغيل Nightwatch. لذا فإن ملفات `screenshot` / `video` *تُنتَج* (ملفات، بالإضافة إلى بيان الملفات عند `emitArtifactsManifest: true`) في مجلد مخرجات التتبع ولكنها لا تُرفق باختبار Allure. التقسيم لكل اختبار — وبالتالي هذه الملفات — ذو معنى في واجهتي Cucumber وexports-object؛ أما واجهة BDD `describe/it` فتنهار إلى مستوى الجلسة، لذا لا يعمل شرط كل اختبار هناك.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## تسجيل الشاشة

سجّل فيديو `.webm` مستمرًا لجلسة المتصفح. يبدأ التسجيل في أول جلسة يراها المكوّن الإضافي ويُنهى في خطاف `after()` الخاص بـ Nightwatch.

**وضع الاستطلاع فقط.** لا يوفر Nightwatch منفذ CDP مستقرًا كما يفعل WebdriverIO (`browser.getPuppeteer()`) وSelenium (`driver.createCDPConnection`)، لذا يلتقط تسجيل الشاشة الإطارات عبر استدعاء `browser.takeScreenshot()` على فترات ثابتة. يعمل على كل متصفح يدعمه Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| الخيار | النوع | الافتراضي | ملاحظات |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | المفتاح الرئيسي. |
| `pollIntervalMs` | `number` | `200` | الفاصل الزمني بين لقطات الشاشة (بالمللي ثانية). قيمة أقل = فيديو أكثر سلاسة، ورحلات ذهاب وإياب أكثر لـ WebDriver. ‏200 مللي ثانية ≈ 5 إطارات في الثانية. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | صيغة البكسل لكل إطار التي تُسلَّم إلى مُرمِّز ffmpeg قبل الدمج النهائي في `.webm`. في وضع الاستطلاع تُلتقط لقطات الشاشة المصدرية دائمًا بصيغة PNG، لذا **لا** يغيّر هذا الالتقاط - بل فقط الصيغة التي يستقبلها المُرمِّز لكل إطار. |
| `maxWidth` / `maxHeight` / `quality` | - | - | خيارات خاصة بـ CDP فقط، تُتجاهل في وضع الاستطلاع. مدرجة للتوافق في البنية مع محوّلات WDIO/Selenium. |

**المتطلبات المسبقة:** `fluent-ffmpeg` (وهو بالفعل اعتمادية تشغيل للحزمة) بالإضافة إلى الملف التنفيذي `ffmpeg` على PATH. على macOS: `brew install ffmpeg`. على Linux: `apt install ffmpeg`. بدون ffmpeg يظل المسجّل يعمل لكن خطوة الترميز تسجّل تحذيرًا وتتخطى كتابة الملف.

**المخرجات:** يُكتب ملف الفيديو بجوار ملف الاختبار الذي تم تشغيله للتو (مع مجلد `nightwatch.conf.*` كبديل، ثم `process.cwd()` كملاذ أخير). يظهر المسار الكامل في سطر سجل Nightwatch ‏`📹 Screencast video: <path>` ويُبث الفيديو أيضًا إلى تبويب Screencast في لوحة التحكم.

للاطلاع على المرجع الكامل لميزة تسجيل الشاشة (دعم المتصفحات، مسارات المخرجات عبر المحوّلات الثلاثة)، انظر [صفحة تسجيل الشاشة](/docs/devtools/wdio/screencast).

## التقاط BiDi (اختياري)

فعّل التقاط WebDriver BiDi لرسائل وحدة تحكم المتصفح واستثناءات JS وطلبات الشبكة. وهو مكافئ للمسار الذي يستخدمه selenium-devtools - إذ يتشارك المحوّلان منطق الاتصال نفسه في `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

تحتاج أيضًا إلى `webSocketUrl: true` في قدراتك حتى يكشف chromedriver فعليًا قناة BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← يفعّل BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

عند اتصال BiDi، يتم تعطيل مسار التقاط الشبكة عبر سجل أداء Chrome لكل أمر حتى لا تظهر الطلبات مرتين في لوحة التحكم. إذا كان `webSocketUrl` مفقودًا أو كان إصدار chromedriver لا يكشف BiDi، يفشل الاتصال بصمت ويستمر بديل سجل الأداء في العمل.

## وضع التتبع

مسار التقاط دون واجهة — لا تُفتح أي نافذة لواجهة DevTools. عند نهاية الجلسة يكتب المحوّل ملفًا قابلًا للنقل `trace-<sessionId>.zip` (أو مجلدًا) في مجلد `test-results/` (بجوار مجلد الاختبار / الإعداد المحدد)، بالبنية نفسها لملف تتبع WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; default 'zip'
})
```

### مستوى التفصيل وCucumber

يحدد `traceGranularity` ما يغطيه ملف واحد — `'session'` (الافتراضي)، أو `'spec'`، أو `'test'`.

يُغلق Nightwatch المتصفح بعد كل سيناريو Cucumber. يمتد تتبع `'session'` عبر ذلك: ملف zip واحد للتشغيل بأكمله، مع تداخل كل سيناريو تحت ميزته. أما `'test'` فيكتب ملف zip واحدًا لكل سيناريو في مجلده الخاص، وهو الخيار الموصى به لـ Cucumber — ملفات أصغر، ومستوى التفصيل الذي تعتمد عليه سياسة الاحتفاظ `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // one trace per Cucumber scenario
})
```

في واجهة BDD `describe/it`، ينهار `'test'` إلى شريحة واحدة على مستوى الجلسة: يشغّل Nightwatch كل `it()` داخليًا ويطلق خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة فقط لكل وحدة. ومع ذلك، تظل شجرة الإجراءات تعرض كل `it` كمجموعة مستقلة.

يتم تخطي ربط منفذ الخادم الخلفي ونافذة الواجهة وخيار `screencast` جميعها في وضع التتبع. للاطلاع على المرجع الكامل للميزة (محتويات الملف، العارض، اختبار الأجهزة المحمولة، متى تختار `zip` مقابل `ndjson-directory`)، انظر [صفحة وضع التتبع](/docs/devtools/wdio/trace-mode).

يتشارك Nightwatch خط معالجة التتبع نفسه مع محوّلي WebdriverIO وSelenium، لذا تكون بنية الملف متطابقة بغض النظر عن المحوّل الذي أنتجه. يحمل تتبع Nightwatch الالتقاط الكامل لكل إجراء — لقطة شاشة، ولقطة شجرة إمكانية الوصول مع إزاحة حسب العمق، وقائمة العناصر القابلة للتفاعل، ونص Markdown — لذا يُفتح في مشغل `show-trace` مع التنقل الزمني في DOM/اللقطات، وتبويبي **A11y** و**Transcript**، وطبقة اختيار محدِّد العناصر، و(في Cucumber) تداخل **Feature → Scenario → Step**.

افتح تتبعًا باستخدام الأمر التنفيذي `show-trace`، المرفق مع `@wdio/nightwatch-devtools` (دون اعتمادية إضافية):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

انظر صفحة [مشغل التتبع](/docs/devtools/trace-player) للاطلاع على الشرح الكامل واختصارات لوحة المفاتيح.

### التقسيم لكل اختبار وتنبيه BDD `describe/it`

تحتاج خيارات كل اختبار — `traceGranularity: 'test'`، وخيارات `tracePolicy` و`screenshot` و`video` المرتبطة به — إلى خطاف لكل اختبار لاقتطاع شريحة كل اختبار. تكشف واجهة **exports-object (بأسلوب mocha)** وواجهة **Cucumber** (خطافات لكل سيناريو) هذا الخطاف، لذا تحصلان على تقسيم حقيقي لكل اختبار. أما واجهة **BDD `describe/it`** فهي الاستثناء: يشغّل Nightwatch كل `it()` داخليًا ويطلق خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة فقط لكل وحدة، لذا ينهار `traceGranularity: 'test'` إلى شريحة واحدة **على مستوى الجلسة** مرتبطة بالاختبار الأول. يظل بيان الملفات يسرد كل حالة اختبار بحالتها الصحيحة؛ فقط ربط الشرائح/الملفات لكل اختبار هو ما ينهار. لا تتأثر التتبعات على مستوى الجلسة ومستوى المواصفات.

## أمثلة

توجد أمثلة عملية في مجلد `examples/` في المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل من جذر المستودع:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch بأسلوب mocha | `pnpm demo:nightwatch` |

## الميزات

يوفر محوّل Nightwatch تجربة واجهة DevTools نفسها التي يوفرها WebdriverIO. تُلتقط كل ميزة أدناه تلقائيًا باستخدام الإعداد الأساسي `globals: nightwatchDevtools({ port: 3000 })` — دون إعداد خاص بكل ميزة (تحتاج سجلات الشبكة إضافيًا إلى `'goog:loggingPrefs': { performance: 'ALL' }`، كما هو موضح في [الإعداد](#setup)). تؤدي الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات التفاعلية والتصور](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات حية للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار/المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن بين التشغيلين جنبًا إلى جنب
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - مشغّلات قياسية (بأسلوب mocha) وCucumber/BDD
- **[سجلات وحدة التحكم](/docs/devtools/wdio/console-logs)** - التقاط وفحص مخرجات وحدة تحكم المتصفح (في الوقت الفعلي مع `bidi: true`)
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - قدرات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال من أي أمر إلى سطر المصدر الذي أطلقه
- **[تسجيل شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل `.webm` مستمر لجلسة المتصفح
- **[وضع التتبع](/docs/devtools/wdio/trace-mode)** - التقاط دون واجهة ينتج ملف `trace.zip` قابلًا للنقل (دون نافذة واجهة)

تسجيل الشاشة هو الميزة الوحيدة التي لها خيارات خاصة بها (القائمة الكاملة تحت [تسجيل الشاشة](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## القيود

لا يوفر Nightwatch العمق نفسه من خطافات إطار العمل الذي يوفره WebdriverIO، لذا هناك بعض الاختلافات عن خدمة WDIO DevTools:

| القيد | التفاصيل |
|-----------|--------|
| لا توجد خطافات أوامر أصلية | لا يملك Nightwatch خطاف `beforeCommand` / `afterCommand`. بدلًا من ذلك، يتم اعتراض الأوامر عبر غلاف وكيل للمتصفح. |
| سياق اختبار محدود | يوفر `browser.currentTest` بيانات وصفية أقل من سياق مشغّل WDIO؛ وتتطلب أسماء الاختبارات ومسارات الملفات أساليب استدلالية إضافية. |
| تداخل مسطح للمجموعات | لا يدعم Nightwatch أصلًا كتل `describe` المتداخلة على مستويات متعددة؛ ويعرض المكوّن الإضافي مستويين كحد أقصى. |
| تأخر توفر النتائج | لا تُنهى نتائج الاختبار إلا في `afterEach`، ولا تتوفر في منتصف الاختبار. |
| تسجيل الشاشة في وضع الاستطلاع فقط | على عكس WDIO (دفع CDP عبر `browser.getPuppeteer()`) وSelenium (دفع CDP عبر `driver.createCDPConnection`)، يفتقر Nightwatch إلى منفذ CDP مستقر، لذا تُلتقط الإطارات عبر استطلاع `browser.takeScreenshot()`. يعمل على كل متصفح يدعمه Nightwatch؛ مع تكلفة صغيرة لكل إطار تتناسب مع فترة الاستطلاع. |
| تقسيم التتبع لكل اختبار (BDD `describe/it`) | تطلق واجهة BDD خطاف كل اختبار الخاص بالمكوّن الإضافي مرة واحدة لكل وحدة، لذا ينهار `traceGranularity: 'test'` إلى شريحة واحدة على مستوى الجلسة. تحصل واجهتا exports-object (بأسلوب mocha) وCucumber على تقسيم حقيقي لكل اختبار. انظر [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat). |
| ملفات تتبع للإنتاج فقط | تُكتب ملفات `screenshot` / `video` لكل اختبار إلى مجلد مخرجات التتبع (وإلى البيان عند `emitArtifactsManifest: true`) لكنها لا تُرفق مباشرةً بـ Allure — إذ لا يملك Nightwatch واجهة برمجية للإرفاق الحي في Allure. |

يبلغ التكافؤ الإجمالي في الميزات مع خدمة WebdriverIO DevTools حوالي **80-90%**.