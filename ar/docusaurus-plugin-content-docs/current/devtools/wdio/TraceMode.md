---
id: trace-mode
title: وضع التتبع
description: "التقط عناصر التتبع بدون واجهة باستخدام وضع التتبع في DevTools، واضبط التنسيق ومستوى التفصيل والاحتفاظ ولقطات الشاشة والفيديو والتأكيدات."
---

مسار التقاط بدون واجهة — لا تُفتح أي نافذة لواجهة DevTools. عند انتهاء الجلسة يكتب المحوّل (adapter) عناصر التتبع في مجلد `test-results/`: ضمن `outputDir` (أو `rootDir`) الخاص بـ WebdriverIO، وبالنسبة إلى Selenium وNightwatch بجوار ملف الاختبار، مع الرجوع إلى مجلد الإعدادات، ثم إلى المجلد الحالي. بالنسبة إلى مستوى التفصيل `session` / `spec` يكون الناتج ملف `trace-<sessionId>.zip` (أو مجلد `trace-<sessionId>/`)؛ أما مع مستوى التفصيل `test` فيحصل كل اختبار على مجلد فرعي خاص به (راجع [مستوى تفصيل التتبع](#trace-granularity--tracegranularity)). العنصر الناتج قابل للنقل ويتضمن كل ما يلزم لإعادة التشغيل دون اتصال، أو للمقارنة بواسطة وكلاء الذكاء الاصطناعي، أو لأي مستهلك يفضّل ملفًا على واجهة حية.

وضع التتبع **لا يجتمع مع الوضع الحي**. اختر أحدهما لكل جلسة: البشر الذين يصحّحون الأخطاء تفاعليًا يحتاجون إلى الوضع الحي؛ أما الوكلاء الذين يقارنون عمليات التشغيل أو روبوتات CI التي تجمع العناصر فيحتاجون إلى وضع التتبع.

## التفعيل

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

يحتاج وضع التتبع إلى WebDriver BiDi (Chrome 114+‏، Firefox 130+‏)، والذي يفعّله WebdriverIO تلقائيًا.

لتجربته، شغّل مثال mocha في وضع التتبع باستخدام `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha`؛ وأضف `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` للاحتفاظ على مستوى كل اختبار. ملف الإعدادات هو [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts).

يوفّر Selenium وNightwatch مسار التتبع نفسه — راجع صفحات المحوّلات الخاصة بهما لمعرفة صياغة التفعيل الخاصة بكل إطار عمل: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## محتويات العنصر الناتج

| الملف | المحتويات |
|---|---|
| `trace.trace` | أحداث NDJSON من نوع `context-options` + أحداث الإجراءات `before` / `after`؛ سطر واحد لكل سجل |
| `trace.network` | إدخالات شبكة بأسلوب HAR، إدخال واحد في كل سطر؛ الإدخال المقروء من مخزن Resource Timing المؤقت للصفحة (بدون BiDi، مثل Safari أو Appium) يحمل `_source: "resource-timing"` و`_resourceType` |
| `trace.mutations` | تدفق NDJSON لتغييرات DOM الذي يقوم عليه السفر عبر الزمن في DOM؛ يُحذف عندما لا يُلتقط شيء |
| `transcript.md` | ملخص Markdown قابل للقراءة من البشر والنماذج اللغوية الكبيرة، يتضمن التوقيت والمحددات وتعليقات القيم |
| `resources/page@<id>-<ts>.jpeg` | لقطة شاشة تُلتقط عند كل إجراء موجّه للمستخدم |
| `resources/page@<id>-<ts>-elements.json` | قائمة مسطحة بالعناصر القابلة للتفاعل عند ذلك الإجراء |
| `resources/page@<id>-<ts>-snapshot.txt` | لقطة لشجرة إمكانية الوصول بإزاحة حسب العمق (مناسبة للذكاء الاصطناعي) |
| `resources/<sha1>.jpeg` | إطارات شريط الأفلام الكثيف، معنونة حسب المحتوى |
| `resources/src@<sha1>.txt` | مصدر الاختبار الملتقط لعلامة التبويب Source |
| `resources/<sha1>` | أجسام استجابات الشبكة، معنونة حسب المحتوى |

### ما الذي يُعدّ "إجراءً"

تُرشَّح الأوامر عبر قائمة سماح قبل أن تنتج إدخالات في التتبع. أمثلة على ما يظهر في التتبع:

- `url` / `get` ← `Page.navigate`
- `click` ← `Element.click`
- `setValue` / `sendKeys` ← `Element.fill`
- `submit`، `clear`، `selectByVisibleText`، …

يُستبعد عمدًا تحديد المواقع (`$`، `$$`، `findElement(s)`)، واستطلاع `executeScript` في Selenium، و`clearValue` الذي يطلقه `setValue` داخليًا: فهي لا تمثل نية موجّهة للمستخدم وستملأ الخط الزمني بالضوضاء. أما الانتظارات الصريحة (`waitFor*`، `waitUntil`، و`waitForElement*` في Nightwatch)، وقراءات العناصر (`getText`، `isDisplayed`، …) و`execute` فتظهر. قائمة السماح هي `ACTION_MAP` في [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts).

## تنسيق المخرجات — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (الافتراضي) — أرشيف واحد في `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — الملفات نفسها مفكوكة في `test-results/trace-<sessionId>/`. خطوة فك ضغط أقل للمستهلكين البرمجيين أو الوكلاء الذين يريدون البحث / بث NDJSON مباشرة.

يُفتح ملف `zip` في [مشغّل `show-trace`](/docs/devtools/trace-player) الرسمي؛ أما تتبع `ndjson-directory` فيُفتح في عارضات تتبع متوافقة أخرى، أو اضغطه أولًا لفتحه في `show-trace`.

## مستوى تفصيل التتبع — `traceGranularity`

عدد عناصر التتبع التي ينتجها التشغيل:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| القيمة | المخرجات |
|---|---|
| `session` (الافتراضي) | تتبع واحد لكل عامل/جلسة — `test-results/trace-<sessionId>.zip`. |
| `spec` | تتبع واحد لكل ملف مواصفات، في `test-results/trace-<spec>-<hash>-<sessionId8>.zip`. أصغر حجمًا وأسهل في التصفح. |
| `test` | تتبع واحد **لكل اختبار**، كل منها في مجلده الخاص: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

بالنسبة إلى مستوى التفصيل `test`، يُبنى اسم المجلد من الاسم الأساسي لملف المواصفات، ومعرّف مختصر (slug) لعنوان الاختبار، والمتصفح، ولاحقة `-retry<N>` في محاولات إعادة التشغيل — مثل `test-results/login_e2e-logs-in-chrome/trace.zip`، مع أول إعادة محاولة في `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. التتبعات على مستوى كل اختبار هي الأسهل تصفحًا، وتعمل على أفضل وجه مع سياسة احتفاظ بحيث لا تُكتب إلا التتبعات التي تهمك.

## الاحتفاظ — `tracePolicy`

افتراضيًا يُحتفظ بكل تتبع (`'on'`). للاحتفاظ بالتتبعات المهمة فقط — وهو مثالي مع `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| السياسة | يُحتفظ بالتتبع عندما… |
|---|---|
| `'on'` (الافتراضي) | دائمًا — يُكتب كل تتبع. |
| `'retain-on-failure'` | تفشل المحاولة **الأخيرة** للاختبار. تسلسل إعادة المحاولة فشل-ثم-نجاح ينتهي بـ `passed`، لذا *لا* يُحتفظ به — فلا تحتفظ بأكثر من اللازم باختبار متقلّب نجح في النهاية. |
| `'retain-on-first-failure'` | تفشل **المحاولة 0**، بغض النظر عن نجاح إعادة محاولة لاحقة. |
| `'on-first-retry'` | أُعيدت محاولة الاختبار مرة واحدة على الأقل (توجد محاولة 1). |
| `'on-all-retries'` | توجد أي محاولة معادة (محاولة ≥ 1). |
| `'retain-on-failure-and-retries'` | تفشل المحاولة الأخيرة **أو** تُعاد محاولة الاختبار. |

الشريحة غير المحتفظ بها يُتخذ القرار بشأنها ولا تُكتب على القرص أبدًا. تعتمد السياسات المدركة لإعادة المحاولة على **سجل نتائج** لكل محاولة يحتفظ به المحوّل لكل معرّف اختبار ثابت عبر إعادة المحاولات، بحيث تقيّم `retain-on-failure` و`retain-on-first-failure` المحاولة الصحيحة. وحيث لا يكشف المشغّل معلومات إعادة المحاولة لكل محاولة، تتراجع كل سياسة باستثناء `retain-on-failure` إلى `retain-on-failure`؛ أما التشغيل الذي لا تُرصد فيه أي نتائج (مثل سكربت مستقل بسيط) فيفشل **بشكل مفتوح** ويحتفظ بالتتبع بدلًا من المخاطرة بحذف تتبع تحتاجه.

> جرى التحقق من الاحتفاظ المدرك لإعادة المحاولة من البداية إلى النهاية في **WebdriverIO** (mocha / cucumber) و**Selenium** (mocha). في **Nightwatch**، تعمل `retain-on-failure`، لكن السياسات الأخرى المدركة لإعادة المحاولة تتراجع إليها لأن `--retries` في Nightwatch يعيد تشغيل حالة الاختبار داخليًا دون إعادة إطلاق خطافات كل اختبار. كما أن `specFileRetries` العابر للعمليات في WDIO يقع خارج السجل (الخاص بكل عامل). راجع [صفحة محوّل Nightwatch](/docs/devtools/nightwatch#trace-mode) للتفاصيل.

## شريط الأفلام الكثيف — `filmstrip`

**افتراضيًا** يسجّل التتبع تصويرًا للشاشة **كثيفًا ومستمرًا** بحيث يتيح المشغّل تشغيلًا سلسًا عند التمرير بدلًا من القفز من إطار إلى آخر. تقع الإطارات الكثيفة إلى جانب إطارات كل إجراء (التي تحمل لقطات DOM). اضبط `filmstrip: false` لتسجيل إطار واحد فقط لكل إجراء — تتبع أصغر بدون مسجّل مستمر:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- تُضاف الإطارات الكثيفة **إلى جانب** إطارات كل إجراء (التي تحمل لقطات DOM)، لذا لا تُفقد أي بيانات DOM — وعند وجود الإطارات الكثيفة فإنها تحل محل شريط الأفلام المتفرق الخاص بكل إجراء عند التمرير.
- تُقلَّص الإطارات عند التصدير (بفاصل ≥100 ms) وتُعنون حسب المحتوى، لذا تندمج الإطارات المتطابقة (انتظار ثابت) في مورد واحد. يُحدّ المخزن المؤقت للجلسة الحية بواسطة `screencast.maxBufferFrames` (الافتراضي 2000).
- يستخدم التسجيل مسجّل تصوير الشاشة — دفع CDP على Chrome/Chromium، واستطلاع لقطات الشاشة في غيرها. على المتصفحات غير Chrome يُصدر الاستطلاع العديد من أوامر `takeScreenshot`؛ استخدمه مع خيار إسكات الخطوات في أداة التقارير لديك (راجع [تكامل Allure](/docs/devtools/allure)).

يتوفر `filmstrip` في المحوّلات الثلاثة جميعها (WebdriverIO / Selenium / Nightwatch).

## لقطة الشاشة والفيديو لكل اختبار — `screenshot` / `video`

عند `traceGranularity: 'test'` يمكن لكل اختبار أيضًا إنتاج لقطة شاشة مستقلة و/أو شريحة فيديو خاصة به، على غرار الأسلوب المألوف لالتقاط لقطة الشاشة/الفيديو عند الفشل:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| الخيار | القيم | السلوك |
|---|---|---|
| `screenshot` | `'off'` (الافتراضي) · `'on'` · `'only-on-failure'` | `'on'` يلتقط بعد كل اختبار؛ و`'only-on-failure'` بعد الاختبار الفاشل فقط. بصيغة PNG. |
| `video` | `'off'` (الافتراضي) · أي قيمة من قيم `tracePolicy` | يسجّل تصوير الشاشة باستمرار ويحتفظ بشريحة كل اختبار وفق دلالات الاحتفاظ نفسها في `tracePolicy`. بصيغة WebM؛ يحتاج الترميز إلى وجود `ffmpeg` في `PATH`. ضبط قيمة غير `off` يبدأ المسجّل من تلقاء نفسه — لا تحتاج أيضًا إلى `filmstrip` أو `screencast.enabled`. |

كلاهما مقيّد بوضع التتبع + `traceGranularity: 'test'` (النطاق الخاص بكل اختبار الذي يُرفقان به). في مستويات التفصيل الأعمّ لا يفعلان شيئًا.

- **WebdriverIO** — `screenshot` / `video` خيارات للخدمة؛ تُرفق مباشرة في Allure عند وجود `@wdio/allure-reporter`.
- **Selenium** — الخيارات نفسها في `DevToolsOptions` الخاصة به؛ تُرفق مباشرة في Allure عبر `allure-js-commons` عندما يكون محوّل مشغّل Allure نشطًا.
- **Nightwatch** — **إنتاج فقط**: تُكتب الملفات في مجلد مخرجات التتبع (وتُدرج في البيان)، لكنها لا تُرفق مباشرة في Allure — إذ لا يمتلك Nightwatch واجهة برمجية حية للإرفاق في Allure. راجع [قيود وضع التتبع](/docs/devtools/limitations).

> `screencast.enabled` هو تسجيل `.webm` المستمر المنفصل الخاص **بالوضع الحي** ويُتجاهل في وضع التتبع. في وضع التتبع استخدم `filmstrip` (إطارات كثيفة داخل التتبع) أو `video` لكل اختبار؛ ولا تزال حقول ضبط تصوير الشاشة (`quality`، `maxWidth`، `pollIntervalMs`، …) تنطبق على أي مسجّل يعمل.

## بيان العناصر — `emitArtifactsManifest`

يكتب ملف `devtools-artifacts-<sessionId>.json` بجوار التتبع — وهو فهرس عام تستهلكه أدوات التقارير وCI لاكتشاف العناصر المنتَجة (كل تتبع / لقطة شاشة / فيديو، إضافة إلى حالة كل اختبار):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **معطّل افتراضيًا.** **يُفعَّل تلقائيًا** عند اكتشاف أداة تقارير Allure — `@wdio/allure-reporter` الخاصة بـ WebdriverIO في الإعدادات، أو بيئة تشغيل `allure-js-commons` نشطة في Selenium.
- **Nightwatch يتطلب التفعيل اليدوي**: لا توجد لديه إشارة Allure حية للاكتشاف التلقائي (`nightwatch-allure` يعمل بعد الانتهاء)، لذا لا يُفعَّل تلقائيًا أبدًا — اضبطه صراحةً إن أردت البيان.

## التأكيدات — `captureAssertions`

تظهر التأكيدات كصفوف إجراءات أساسية في التتبع (مفعّلة افتراضيًا؛ اضبط `captureAssertions: false` لإلغائها):

- **`node:assert`** — تُلتقط في المحوّلات الثلاثة جميعها كصفوف `assert.<method>`.
- **`expect` في WebdriverIO** — مطابِقات `expect(...)` الناجحة *والفاشلة* (`expect($el).toHaveText(...)`، `toBeExisting()`، …) تظهر كصفوف `expect.<matcher>` تحمل القيمة المتوقعة وموقع العنصر في المصدر ولقطة؛ وتُكتم أوامر الاستطلاع الداخلية للمطابِق بحيث لا يظهر سوى التأكيد.
- **`browser.assert.*` / `browser.verify.*` في Nightwatch** — تظهر التأكيدات الأصلية كصفوف `assert.<m>` / `verify.<m>`.

تُعرض التأكيدات الناجحة باللون الأخضر؛ والفاشلة باللون الأحمر مع رسالة الخطأ.

## اختبار الأجهزة المحمولة

تُلتقط جلسات Appium في الوضع الحي ووضع التتبع. العامل المميِّز هو **اسم المتصفح** في الإمكانيات (capabilities)، وليس الجهاز:

- **الويب على الأجهزة المحمولة** (Chrome على Android، وSafari على iOS): مسار اللقطات نفسه القائم على DOM كما في سطح المكتب.
- **التطبيق الأصلي** (بدون `browserName`): تُعطَّل سكربتات DOM المحقونة في الصفحة؛ وتغذي شجرة Appium XML مُسلسِل اللقطات بدلًا منها.
- **التطبيق الهجين**: WebdriverIO وحده يتبع الجلسة إلى عرض الويب (webview) الخاص بها؛ أما المحوّلات الأخرى فتقرر بناءً على إمكانيات بدء التشغيل.

يسجّل `context-options` في التتبع المنصة والطراز وإصدار نظام التشغيل بحيث يصنّف العارض الإطارات بشكل صحيح. شغّل الأمثلة باستخدام `pnpm demo:wdio:mobile` (وكذلك `:selenium:mobile`، `:nightwatch:mobile`، `:python:mobile`). راجع **[اختبار الأجهزة المحمولة](/docs/devtools/mobile)** للمرجع الكامل.

## عرض العنصر الناتج

افتح التتبع في **[مشغّل التتبع](/docs/devtools/trace-player)** الرسمي — واجهة WebdriverIO DevTools في وضع مشغّل مخصص للقراءة فقط:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

يمنحك المشغّل السفر عبر الزمن في DOM، وعلامة التبويب A11y وطبقة اختيار المحدِّد، وعلامة التبويب Transcript مع خاصية Copy-for-LLM، وعلامات التبويب Errors / Console / Network / Source في الشريط السفلي، وخطًا زمنيًا قابلًا للتمرير. يُفتح ملف `.zip` المحمول نفسه أيضًا في عارضات تتبع مستقلة أخرى وداخل العارض المضمَّن في تقرير Allure. راجع صفحة **[مشغّل التتبع](/docs/devtools/trace-player)** للحصول على الشرح الكامل والميزات واختصارات لوحة المفاتيح.

## المحدِّدات في علامة التبويب A11y

يفتح الملف التنفيذي `show-trace` الذي يأتي مع كل محوّل الأرشيف نفسه في مشغّل DevTools، والذي يوفّر إضافةً إلى ذلك **علامة التبويب A11y**: شجرة إمكانية الوصول الملتقطة لكل إجراء، حيث يؤدي النقر على صف إلى نسخ محدِّد ذلك العنصر.

تُكتب هذه المحدِّدات بلهجة المشغّل الذي سجّلها، لذا تُلصق مباشرة في إطار العمل الذي أنتج التتبع. العنصر الذي يُعرَّف بنصه فقط يكون `a*=Logout` في WebdriverIO و`//a[contains(., "Logout")]` في Selenium — مع تعليق يوضح الاستدعاء الذي يحلّه، `By.xpath()`. يفضّل Nightwatch محدِّد CSS أصليًا مثل `button[type="submit"]`، لأنه المشغّل الوحيد الذي يقرأ سلسلة محدِّد مجردة وفق استراتيجية CSS الافتراضية، ولا يرجع إلى XPath (مع التعليق `useXpath()` / `locateStrategy: 'xpath'`) إلا عند عدم وجود محدِّد CSS فريد. كل المحدِّدات الأخرى هي CSS قابلة للنقل.

لاستهلاك النماذج اللغوية الكبيرة / الوكلاء، اقرأ `transcript.md` مباشرة — فهو عرض Markdown موجز للإجراءات مع المحدِّدات والقيم.

## اعرف المزيد

- **[مشغّل التتبع](/docs/devtools/trace-player)** — الشرح الكامل لمشغّل `show-trace` وميزاته واختصارات لوحة المفاتيح.
- **[تكامل Allure](/docs/devtools/allure)** — كيف تُرفق عناصر التتبع / لقطة الشاشة / الفيديو في تقرير Allure.
- **[الدعم عبر أطر العمل](/docs/devtools/cross-framework)** — مصفوفة الإمكانيات لكل محوّل (WebdriverIO / Selenium / Nightwatch).
- **[قيود وضع التتبع](/docs/devtools/limitations)** — ما يتخطاه وضع التتبع والثغرات المعروفة لكل محوّل.
- **[مرجع الإعدادات](/docs/devtools/reference)** — جميع الخيارات في لمحة.