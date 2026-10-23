---
id: nightwatch
title: أدوات المطوّر لـ Nightwatch
description: "أضف واجهة تصحيح الأخطاء الخاصة بـ DevTools إلى مجموعة اختبارات Nightwatch دون تعديل الاختبارات، واضبط تسجيلات الشاشة والتقاط BiDi ووضع التتبّع."
---

محوّل Nightwatch لـ [WebdriverIO DevTools](https://github.com/webdriverio/devtools)، ويوفّر واجهة تصحيح الأخطاء المرئية نفسها لمجموعة اختبارات Nightwatch دون أي تغيير في شيفرة الاختبارات.

## التثبيت

```bash
npm install @wdio/nightwatch-devtools
```

يتطلّب Nightwatch 3 أو أحدث. لاستخدام Cucumber يجب تثبيت `@cucumber/cucumber` في مشروعك، إذ يستخدم المحوّل النسخة المثبّتة لديك بدلاً من تضمين نسخة خاصة به.

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

شغّل اختباراتك كالمعتاد، وستُفتح واجهة DevTools تلقائياً في نافذة متصفح جديدة:

```bash
nightwatch
```

> لا حاجة إلى أي تغيير في ملفات الاختبار.

في الوضع المباشر يبقى التشغيل مفتوحاً بعد انتهاء الاختبارات لتتمكّن من مراجعة النتائج. أغلق نافذة DevTools لإنهائه، أو اضغط Ctrl+C للخروج مع إبقاء النافذة مفتوحة.

### Cucumber / BDD

استورد `cucumberHooksPath` إلى جانب التصدير الرئيسي ومرّره إلى خيار `require` في Cucumber. يسجّل ذلك خطافات السيناريو `Before` / `After` وخطافات الخطوات `BeforeStep` / `AfterStep` التي تحاكي سلوك `beforeScenario` / `afterScenario` في خدمة WebdriverIO. ويقوم خطاف `After` يعمل قبل الإغلاق بتفريغ تتبّع كل سيناريو بينما لا تزال جلسة المتصفح الخاصة به نشطة.

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
      require: [cucumberHooksPath] // <-- تسجيل خطافات DevTools الخاصة بـ Cucumber
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
| `port` | `number` | `3000` | منفذ خادم DevTools الخلفي. تُزاد قيمته تلقائياً إذا كان مستخدماً بالفعل. |
| `hostname` | `string` | `'localhost'` | اسم المضيف الذي يرتبط به الخادم الخلفي. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | تسجيل فيديو `.webm` لكل جلسة، في الوضع المباشر فقط. في وضع التتبّع استخدم `filmstrip` / `video`. راجع [تسجيل الشاشة](#screencast) أدناه. |
| `bidi` | `boolean` | `false` | تفعيل التقاط WebDriver BiDi لوحدة تحكّم المتصفح واستثناءات JS والشبكة. يتطلّب `webSocketUrl: true` في الإمكانيات (capabilities) وإصدار chromedriver يدعم BiDi. عند الاتصال، يُعطَّل مسار التقاط الشبكة عبر سجل أداء Chrome لكل أمر حتى لا تتكرّر الطلبات. |
| `mode` | `'live' \| 'trace'` | `'live'` | يفتح `live` واجهة DevTools، بينما يتخطّاها `trace` ويكتب ملفاً قابلاً للنقل بدلاً من ذلك. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | بنية ملف التتبّع. يُطبَّق فقط عند `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | تتبّع واحد لكل جلسة / ملف مواصفات / اختبار. يكتب `'test'` كل تتبّع إلى `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. يُطبَّق فقط عند `mode: 'trace'`. راجع [وضع التتبّع](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **تنبيه:** تنهار واجهة BDD `describe/it` إلى شريحة واحدة على مستوى الجلسة (راجع [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | التتبّعات التي يُحتفظ بها. يُستخدم مع `traceGranularity: 'test'`. يُطبَّق فقط عند `mode: 'trace'`، وضبطه خارج وضع التتبّع يسجّل تحذيراً. **تنبيه:** القيمة `'retain-on-failure'` وحدها موثوقة في Nightwatch. أما السياسات الأخرى المرتبطة بإعادة المحاولة فتتراجع إليها، لأن `--retries` يعيد تشغيل حالة الاختبار داخلياً دون إعادة إطلاق خطافات الإضافة الخاصة بكل اختبار. |
| `filmstrip` | `boolean` | `true` | تسجيل شريط لقطات كثيف ومتواصل داخل التتبّع لإتاحة التشغيل القابل للتمرير في مشغّل التتبّع، وليس مجرد إطار واحد لكل إجراء. يشغّل مسجّل الشاشة (بوضع الاستطلاع في Nightwatch) طوال الجلسة. يُطبَّق فقط عند `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | لقطة شاشة لكل اختبار. في وضع التتبّع مع `traceGranularity: 'test'` فقط. **إنتاج فقط**: تُكتب صورة PNG في مجلد مخرجات التتبّع (وفي البيان عند `emitArtifactsManifest: true`)، ولا تُرفق مباشرة في Allure (راجع الملاحظة أدناه). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | مقطع فيديو لكل اختبار، يُحتفظ به وفق السياسة المحدّدة (مثل `'retain-on-failure'`). في وضع التتبّع مع `traceGranularity: 'test'` فقط. أي قيمة غير `off` تشغّل مسجّل الشاشة بنفسها، ولا تحتاج **إلى** ضبط `filmstrip` أو `screencast.enabled` أيضاً. **إنتاج فقط**: يُكتب ملف `.webm` في مجلد مخرجات التتبّع (وفي البيان عند `emitArtifactsManifest: true`)، ولا يُرفق مباشرة في Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | كتابة البيان `devtools-artifacts-<sessionId>.json` (الفهرس العام الذي تستهلكه أدوات التقارير وأنظمة CI لاكتشاف الملفات المنتَجة) بجوار التتبّع. **اختياري في Nightwatch**: لا توجد إشارة Allure مباشرة يمكن الاعتماد عليها في الاكتشاف التلقائي، لذا لا يُفعَّل تلقائياً أبداً بخلاف WDIO/Selenium. يُطبَّق فقط عند `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | التقاط التأكيدات كصفوف إجراءات في التتبّع، بما في ذلك `node:assert` و`browser.assert`/`browser.verify` الأصليّين، ومنها المطابِقات المنفية `.not.*`. اضبطه على `false` لإلغاء التفعيل. |

> **الإرفاق المباشر في Allure غير مدعوم في Nightwatch.** فأداة التقارير الرسمية `nightwatch-allure` تعمل بعد انتهاء التشغيل (لا توجد واجهة برمجية للإرفاق المباشر)، كما أن الدالة `attachment()` من `allure-js-commons` لا تفعل شيئاً عند التشغيل في Nightwatch. لذلك تُ*نتَج* ملفات `screenshot` / `video` (ملفات، إضافة إلى بيان الملفات عند `emitArtifactsManifest: true`) في مجلد مخرجات التتبّع لكنها لا تُرفق باختبار في Allure. التقسيم لكل اختبار، وبالتالي هذه الملفات، له معنى في واجهتَي Cucumber وexports-object؛ أما واجهة BDD `describe/it` فتنهار إلى مستوى الجلسة، فلا يكون لبوابة كل اختبار أي أثر هناك.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## تسجيل الشاشة

سجّل فيديو `.webm` متواصلاً لجلسة المتصفح. تحصل كل جلسة WebDriver على تسجيل خاص بها: فاستدعاء `browser.end()` في منتصف التشغيل، أو إغلاق المتصفح بعد كل سيناريو في Cucumber، يُنهي الفيديو الحالي ويبدأ فيديو جديداً للجلسة التالية. يُنهى التسجيل الأخير في خطاف `after()` الخاص بـ Nightwatch، ويمكن اختيار أي تسجيل من القائمة المنسدلة في تبويب Screencast.

**وضع الاستطلاع فقط.** لا يوفّر Nightwatch منفذاً مستقراً للوصول إلى CDP كما يفعل WebdriverIO (`browser.getPuppeteer()`) وSelenium (`driver.createCDPConnection`)، لذا يلتقط تسجيل الشاشة الإطارات بطلب لقطة شاشة WebDriver على فترات ثابتة. يُرسَل الطلب مباشرة عبر نقل HTTP الخاص بـ WebDriver متجاوزاً طابور أوامر Nightwatch، فلا ينتظر أبداً خلف أوامر اختبارك. يعمل على كل متصفح يدعمه Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| الخيار | النوع | القيمة الافتراضية | ملاحظات |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | المفتاح الرئيسي. |
| `pollIntervalMs` | `number` | `200` | الفاصل الزمني بين لقطات الشاشة (بالمللي ثانية). القيمة الأقل تعني فيديو أكثر سلاسة وعدداً أكبر من رحلات الذهاب والإياب إلى WebDriver. ‏200 مللي ثانية ≈ 5 إطارات في الثانية. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | تنسيق البكسل لكل إطار الذي يُسلَّم إلى مُرمِّز ffmpeg قبل الدمج النهائي في `.webm`. في وضع الاستطلاع تُلتقط لقطات الشاشة المصدرية دائماً بتنسيق PNG، لذا فإن هذا الخيار **لا** يغيّر الالتقاط، بل التنسيق الذي يستلمه المُرمِّز لكل إطار فقط. |
| `maxBufferFrames` | `number` | `2000` | الحد الأقصى للإطارات المحفوظة في الذاكرة. عند تجاوزه يُخفَّف المخزن المؤقت في مكانه مع الإبقاء على الإطارين الأول والأخير. |
| `maxWidth` / `maxHeight` / `quality` | - | - | خيارات خاصة بـ CDP فقط، وتُتجاهل في وضع الاستطلاع. مذكورة للتوافق في البنية مع محوّلَي WDIO/Selenium. |

**المتطلبات المسبقة:** `fluent-ffmpeg` (وهو بالفعل اعتمادية تشغيل للحزمة) إضافة إلى الملف التنفيذي `ffmpeg` على PATH. على macOS: ‏`brew install ffmpeg`. على Linux: ‏`apt install ffmpeg`. بدون ffmpeg يظل المسجّل يعمل، لكن خطوة الترميز تسجّل تحذيراً وتتخطّى كتابة الملف.

**المخرجات:** يُكتب `nightwatch-video-<sessionId>.webm` في مجلد `test-results/` بجوار ملف الاختبار الذي جرى تشغيله للتو، وإلا ففي مجلد `nightwatch.conf.*`، ثم `process.cwd()`. تُتخطّى المجلدات الواقعة تحت `node_modules/`، وإذا لم يكن المجلد المختار قابلاً للكتابة يُحفظ الملف في المجلد المؤقت لنظام التشغيل. يظهر المسار الكامل في سطر سجل Nightwatch ‏`📹 Screencast video: <path>`، كما يُبثّ الفيديو أيضاً إلى تبويب Screencast في لوحة التحكم.

للاطّلاع على المرجع الكامل لميزة تسجيل الشاشة (دعم المتصفحات، ومسارات المخرجات في المحوّلات الثلاثة)، راجع [صفحة تسجيل الشاشة](/docs/devtools/wdio/screencast).

## التقاط BiDi (اختياري)

فعّل التقاط WebDriver BiDi لرسائل وحدة تحكّم المتصفح واستثناءات JS وطلبات الشبكة. وهو مكافئ للمسار الذي يستخدمه selenium-devtools، إذ يتشارك المحوّلان منطق الاتصال نفسه في `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

تحتاج أيضاً إلى `webSocketUrl: true` في الإمكانيات حتى يتيح chromedriver فعلياً قناة BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← يفعّل BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

عند الاتصال عبر BiDi، يُعطَّل مسار التقاط الشبكة عبر سجل أداء Chrome لكل أمر حتى لا تظهر الطلبات مرتين في لوحة التحكم. إذا كان `webSocketUrl` مفقوداً أو كان إصدار chromedriver لا يتيح BiDi، يسجّل الاتصال تحذيراً ويستمر البديل المعتمد على سجل الأداء في العمل. كما يسرد المُجمِّع المحقون كل طلب أيضاً، من مصدرين خاصين بالصفحة نفسها: يمرّ استدعاء `fetch` / `XMLHttpRequest` عبر الرقعة الخاصة به ويحمل الطريقة والترويسات والحالة والمحتوى، وكل تحميل آخر يأتي من مخزن Resource Timing الخاص بالصفحة مع توقيته وحجمه. في Chrome يقوم سجل الأداء بعد ذلك بترقية صفوف Resource Timing هذه في مكانها بإضافة الترويسات والحالة؛ أما في Safari، أو في أي جلسة يخدمها Appium، فتبقى كما رأتها الصفحة، دون ترويسات أو محتوى، ودون حالة في Safari. راجع [سجلات الشبكة](/docs/devtools/wdio/network-logs#without-webdriver-bidi).

**اضبط `webSocketUrl: true` حتى بدون `bidi: true`.** فبوجوده يسجّل المحوّل مُجمِّع الصفحة عند بداية المستند في كل صفحة، فيبقى التنقّل الزمني في DOM دقيقاً عبر عمليات التنقّل. وبدونه يلجأ المحوّل إلى حقن المُجمِّع بعد كل عملية تنقّل، مما قد يفوّت اللحظات الأولى من الصفحة الجديدة.

## وضع التتبّع

مسار التقاط دون واجهة، فلا تُفتح نافذة واجهة DevTools. عند انتهاء الجلسة يكتب المحوّل ملفاً قابلاً للنقل `trace-<sessionId>.zip` (أو مجلداً) في مجلد `test-results/` (بجوار مجلد الاختبار / الإعداد المحدَّد)، بالبنية نفسها لملف تتبّع WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // اختياري؛ القيمة الافتراضية 'zip'
})
```

### مستوى التفصيل وCucumber

يحدّد `traceGranularity` ما يغطيه الملف الواحد: `'session'` (الافتراضي)، أو `'spec'`، أو `'test'`.

يغلق Nightwatch المتصفح بعد كل سيناريو Cucumber. يمتد تتبّع `'session'` عبر ذلك: ملف zip واحد للتشغيل بأكمله، مع تداخل كل سيناريو تحت الميزة الخاصة به. أما `'test'` فيكتب ملف zip واحداً لكل سيناريو في مجلده الخاص، وهو الخيار الموصى به لـ Cucumber: ملفات أصغر، وهو مستوى التفصيل الذي تعتمد عليه سياسة الاحتفاظ `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // تتبّع واحد لكل سيناريو Cucumber
})
```

في واجهة BDD `describe/it`، ينهار `'test'` إلى شريحة واحدة على مستوى الجلسة: إذ يشغّل Nightwatch كل `it()` داخلياً ويطلق خطاف الإضافة الخاص بكل اختبار مرة واحدة فقط لكل وحدة. ومع ذلك تظل شجرة الإجراءات تعرض كل `it` كمجموعة مستقلة.

يُتخطّى ربط منفذ الخادم الخلفي ونافذة الواجهة في وضع التتبّع، ويُتجاهل `screencast.enabled` (ويُسجَّل تحذير عندما لا يحتاج أي شيء آخر إلى المسجّل). يسجّل وضع التتبّع شريط اللقطات الكثيف `filmstrip` افتراضياً بدلاً من ذلك، ولا تزال حقول ضبط تسجيل الشاشة (`pollIntervalMs` و`captureFormat` و`maxBufferFrames`) تنطبق على ذلك المسجّل. للاطّلاع على المرجع الكامل للميزة (محتويات الملف، والعارض، واختبار الأجهزة المحمولة، ومتى تختار `zip` أو `ndjson-directory`)، راجع [صفحة وضع التتبّع](/docs/devtools/wdio/trace-mode).

يتشارك Nightwatch مسار التتبّع نفسه مع محوّلَي WebdriverIO وSelenium، لذا تكون بنية الملف متطابقة بغضّ النظر عن المحوّل الذي أنتجه. يحمل تتبّع Nightwatch الالتقاط الكامل لكل إجراء: لقطة شاشة، ولقطة شجرة إمكانية الوصول ذات المسافات البادئة حسب العمق، وقائمة العناصر القابلة للتفاعل، والنص المدوّن بصيغة Markdown، لذا يُفتح في مشغّل `show-trace` مع التنقّل الزمني في DOM/اللقطات، وتبويبات **A11y** و**Transcript** و**Errors** (الإخفاقات مع الانتقال إلى المصدر)، وطبقة اختيار محدِّد العنصر، و(في Cucumber) تداخل **الميزة ← السيناريو**. تُتتبَّع الخطوات في لوحة التحكم المباشرة، لكنها لم تُدرج بعدُ كمجموعات مستقلة داخل التتبّع. تُفضّل المحدِّدات المنسوخة صيغة CSS العادية التي يقرؤها Nightwatch افتراضياً؛ ولا يقدّم لك المشغّل XPath إلا عند عدم وجود محدِّد CSS فريد، مع تعليق يذكر `useXpath()` / `locateStrategy: 'xpath'`.

افتح التتبّع باستخدام الملف التنفيذي `show-trace` المرفق مع `@wdio/nightwatch-devtools` (دون أي اعتمادية إضافية):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # في مشروع يثبّت المحوّل
pnpm show-trace test-results/trace-<sessionId>.zip  # من المستودع الأحادي devtools
```

راجع صفحة [مشغّل التتبّع](/docs/devtools/trace-player) للاطّلاع على الشرح الكامل واختصارات لوحة المفاتيح.

### التقسيم لكل اختبار وتنبيه BDD ‏`describe/it`

تحتاج الخيارات الخاصة بكل اختبار، وهي `traceGranularity: 'test'` وخيارات `tracePolicy` و`screenshot` و`video` المرتبطة به، إلى خطاف لكل اختبار لاقتطاع شريحة كل اختبار. توفّر واجهة **exports-object (بأسلوب mocha)** وواجهة **Cucumber** (خطافات لكل سيناريو) هذا الخطاف، لذا تحصلان على تقسيم حقيقي لكل اختبار. أما واجهة **BDD ‏`describe/it`** فهي الاستثناء: إذ يشغّل Nightwatch كل `it()` داخلياً ويطلق خطاف الإضافة الخاص بكل اختبار مرة واحدة فقط لكل وحدة، لذا ينهار `traceGranularity: 'test'` إلى شريحة واحدة **على مستوى الجلسة** مرتبطة بالاختبار الأول. ولا يزال بيان الملفات يسرد كل حالة اختبار بحالتها الصحيحة؛ وإنما ينهار فقط ربط الشرائح/الملفات بكل اختبار. ولا تتأثر التتبّعات على مستوى الجلسة أو ملف المواصفات.

## أمثلة

توجد أمثلة عاملة في مجلد `examples/` على المستوى الأعلى من المستودع. ابنِ مساحة العمل مرة واحدة (`pnpm install && pnpm build`)، ثم شغّل من جذر المستودع:

| المجلد | المشغّل | الأمر |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD ‏`describe/it` (وضع التتبّع افتراضياً؛ و`DEVTOOLS_MODE=live` للواجهة) | `pnpm demo:nightwatch` (يضيف `pnpm demo:nightwatch:retry` الخيار `--retries 1`) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (تطبيق الساعة على Android؛ والإعدادات على iOS مع `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## الأجهزة المحمولة (Appium)

تُلتقط جلسات Appium في الوضع المباشر ووضع التتبّع. صرّح بـ Appium تحت `selenium` مع `use_appium: true` و`start_process: false` و`default_path_prefix: ''`. للتطبيق الأصلي اضبط `browserName: null`؛ وإلا فسيملأ Nightwatch القيمة بـ Firefox وسيعامل المحوّل الجلسة على أنها تحتوي على صفحة ويب. اترك `bidi` معطّلاً، لأن Appium لا يخدم BiDi. تُلتقط شبكة التطبيق الأصلي عندما تضبط `desiredCapabilities` القيمة `'appium:intercept': true` ويشغّل Appium الإضافة appium-interceptor؛ راجع [شبكة التطبيق الأصلي](/docs/devtools/mobile#native-app-network).

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

تسجّل الجلسات الأصلية الأوامر ولقطات الشاشة وبيانات العناصر من شجرة XML الخاصة بالمنصة، دون DOM. ويُلتقط عرض الويب (webview) في التطبيق الهجين كما لو كان لا يزال أصلياً. جرّبه باستخدام `pnpm demo:nightwatch:mobile`، مع التشغيل من جذر نسخة مبنيّة من مستودع devtools (خطوات الإعداد في [تشغيل مثال](/docs/devtools/mobile#running-an-example)). راجع [صفحة اختبار الأجهزة المحمولة](/docs/devtools/mobile) للاطّلاع على المرجع الكامل للأجهزة المحمولة.

## الميزات

يوفّر محوّل Nightwatch تجربة واجهة DevTools نفسها التي يوفّرها WebdriverIO. تُلتقط كل ميزة أدناه تلقائياً باستخدام الإعداد الأساسي `globals: nightwatchDevtools({ port: 3000 })`، دون أي إعداد خاص بكل ميزة (تحتاج سجلات الشبكة إضافةً إلى ذلك إلى `'goog:loggingPrefs': { performance: 'ALL' }`، كما هو موضّح في [الإعداد](#setup)). تؤدّي الروابط إلى المرجع الكامل لكل ميزة.

- **[إعادة تشغيل الاختبارات التفاعلية والتصوّر](/docs/devtools/wdio/interactive-test-rerunning)** - معاينات مباشرة للمتصفح، ولقطات شاشة لكل أمر، وإعادة تشغيل الاختبار/المجموعة بنقرة واحدة
- **[الحفظ وإعادة التشغيل (المقارنة)](/docs/devtools/wdio/preserve-and-rerun)** - التقط لقطة لاختبار فاشل، وأعد تشغيله، وقارن بين التشغيلين جنباً إلى جنب. تعيد عمليات إعادة التشغيل في Nightwatch إطلاق إعداداتك مع ضبط `DEVTOOLS_RERUN_LABEL` وتصفّيها حتى ذلك الاختبار؛ وتحتاج إلى ملف `nightwatch.conf.*` قابل للاكتشاف، وبدونه تصدر الإضافة تحذيراً وتكون إعادة التشغيل غير متاحة
- **[دعم أطر عمل متعددة](/docs/devtools/wdio/multi-framework-support)** - المشغّلات القياسية (بأسلوب mocha) وCucumber/BDD
- **[سجلات وحدة التحكّم](/docs/devtools/wdio/console-logs)** - التقاط مخرجات وحدة تحكّم المتصفح وفحصها (في الوقت الفعلي مع `bidi: true`)
- **[سجلات الشبكة](/docs/devtools/wdio/network-logs)** - مراقبة استدعاءات API ونشاط الشبكة
- **[البيانات الوصفية](/docs/devtools/wdio/metadata)** - إمكانيات الجلسة والبيئة والتوقيت لكل جلسة متصفح
- **[TestLens](/docs/devtools/wdio/testlens)** - الانتقال من أي أمر إلى سطر المصدر الذي أطلقه
- **[تسجيل شاشة الجلسة](/docs/devtools/wdio/screencast)** - تسجيل `.webm` متواصل لجلسة المتصفح
- **[وضع التتبّع](/docs/devtools/wdio/trace-mode)** - التقاط دون واجهة يُنتج ملف `trace.zip` قابلاً للنقل (دون نافذة واجهة)

تسجيل الشاشة هو الميزة الوحيدة التي لها خيارات خاصة بها (القائمة الكاملة تحت [تسجيل الشاشة](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## القيود

لا يوفّر Nightwatch خطافات إطار العمل بالعمق نفسه الذي يوفّره WebdriverIO، لذا توجد بعض الاختلافات عن خدمة WDIO DevTools:

| القيد | التفاصيل |
|-----------|--------|
| لا توجد خطافات أوامر أصلية | لا يملك Nightwatch خطافاً من نوع `beforeCommand` / `afterCommand`. تُعترض الأوامر بدلاً من ذلك عبر غلاف وكيل (proxy) للمتصفح. |
| سياق اختبار محدود | يوفّر `browser.currentTest` بيانات وصفية أقل من سياق مشغّل WDIO؛ وتتطلّب أسماء الاختبارات ومسارات الملفات أساليب استدلالية إضافية. |
| تداخل مسطّح للمجموعات | لا يدعم Nightwatch أصلاً كتل `describe` المتداخلة على مستويات متعددة؛ وتُبلغ الإضافة عن مستويين كحدّ أقصى. |
| تأخّر توفّر النتائج | لا تُعتمد نتائج الاختبار نهائياً إلا في `afterEach`، ولا تتوفّر في منتصف الاختبار. |
| تسجيل الشاشة بوضع الاستطلاع فقط | بخلاف WDIO (دفع CDP عبر `browser.getPuppeteer()`) وSelenium (دفع CDP عبر `driver.createCDPConnection`)، يفتقر Nightwatch إلى منفذ مستقر للوصول إلى CDP، لذا تُلتقط الإطارات باستطلاع نقطة نهاية لقطات الشاشة في WebDriver. يعمل على كل متصفح يدعمه Nightwatch؛ مع تكلفة صغيرة لكل إطار تتناسب مع فاصل الاستطلاع. |
| تقسيم التتبّع لكل اختبار (BDD ‏`describe/it`) | تطلق واجهة BDD خطاف الإضافة الخاص بكل اختبار مرة واحدة لكل وحدة، لذا ينهار `traceGranularity: 'test'` إلى شريحة واحدة على مستوى الجلسة. تحصل واجهتا exports-object (بأسلوب mocha) وCucumber على تقسيم حقيقي لكل اختبار. راجع [التقسيم لكل اختبار](#per-test-slicing--the-bdd-describeit-caveat). |
| الاحتفاظ المرتبط بإعادة المحاولة | الخيار `tracePolicy: 'retain-on-failure'` وحده موثوق؛ أما السياسات الأخرى المرتبطة بإعادة المحاولة فتتراجع إليه. |
| ملفات تتبّع للإنتاج فقط | تُكتب ملفات `screenshot` / `video` لكل اختبار في مجلد مخرجات التتبّع (وفي البيان عند `emitArtifactsManifest: true`) لكنها لا تُرفق مباشرة في Allure، إذ لا يملك Nightwatch واجهة برمجية للإرفاق المباشر في Allure. |

يبلغ التكافؤ الإجمالي في الميزات مع خدمة WebdriverIO DevTools نحو **80-90%**.