---
id: parallel-tests
title: الاختبارات المتوازية في ملف مواصفات واحد
description: "شغّل اختبارات Mocha أو سيناريوهات Cucumber الموجودة في ملف مواصفات واحد في الوقت نفسه، كلٌّ منها في سياق تصفح WebDriver BiDi خاص به، باستخدام mochaOpts.parallelMode أو cucumberOpts.parallelMode، وهو شكل من أشكال تجميع المتصفحات (browser pooling) يشبه fullyParallel في Playwright."
---

منذ الإصدار v10، يستطيع WebdriverIO تشغيل اختبارات ملف مواصفات واحد في الوقت نفسه. يحصل كل `it()` في Mocha أو كل سيناريو في Cucumber على نافذة متصفح خاصة به ([سياق تصفح](https://w3c.github.io/webdriver-bidi/#browsing-context) في WebDriver BiDi) ضمن عامل (worker) واحد وجلسة متصفح واحدة. استخدمه مع ملفات المواصفات التي تحتوي على العديد من الاختبارات المستقلة: فهي تنتهي أسرع، ولا تحتاج إلى مزيد من العمليات العاملة أو جلسات المتصفح، لأن كل اختبار لا يتحمل سوى تكلفة فتح نافذة.

إنه شكل من أشكال تجميع المتصفحات (browser pooling): تتشارك الاختبارات مجموعةً من النوافذ في متصفح واحد، لا مجموعةً من المتصفحات. إذا كنت قادمًا من Playwright، فإن `parallelMode: 'userContexts'` هو أقرب مكافئ لـ [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): إذ يحصل كل اختبار على سياق معزول خاص به. والفرق هو أن Playwright يوزّع اختبارات الملف على عمليات عاملة متعددة، لكلٍّ منها متصفحها الخاص، بينما يشغّلها WebdriverIO في الوقت نفسه ضمن عامل واحد ومتصفح واحد.

هذا منفصل عن [`maxInstances`](./OrganizingTestSuites.md)، الذي يشغّل ملفات مواصفات كاملة بالتوازي، بعامل واحد وجلسة واحدة لكل ملف مواصفات. يمكنك الجمع بين الاثنين: يحدد `maxInstances` عدد ملفات المواصفات التي تعمل في الوقت نفسه، ويحدد `maxParallelContexts` عدد الاختبارات التي تعمل في الوقت نفسه داخل كل ملف من تلك الملفات.

:::warning تجريبي
يتطلب الوضع المتوازي الخاصية التجريبية `'wdio:experimentalBiDiCommands'`، والتي تغيّر طريقة تنفيذ أوامر العناصر في كل اختبار، وليس فقط في الاختبارات المتوازية. راجع [تغييرات سلوك أوامر عناصر BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## تفعيل الوضع المتوازي

تحتاج إلى:

- جلسة WebDriver BiDi (وهي الافتراضية، ما لم تضبط `'wdio:enforceWebDriverClassic': true`)،
- الخاصية `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` أو `@wdio/cucumber-framework`. لا يدعم Jasmine الوضع المتوازي.

إذا لم تكن الجلسة تستخدم BiDi، أو كانت الخاصية مفقودة، يسجّل WebdriverIO تحذيرًا ويشغّل الاختبارات واحدًا تلو الآخر. بدون `parallelMode`، لا يتغير شيء.

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

لا يحتاج ملف المواصفات إلى أي تغييرات:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

يعمل كلا الاختبارين في الوقت نفسه، كلٌّ منهما في نافذته الخاصة. تعمل `browser.url()` و`$()` و`expect()` على نافذة الاختبار الذي يستدعيها.

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

يعمل كل سيناريو من ملف الميزة (feature file) في نافذته الخاصة. تعمل الملفات الشخصية (`cucumberOpts.profiles` و`cucumberOpts.file`)، والمواصفات مع أرقام الأسطر (`--spec ./features/login.feature:5`)، والخيارات `tags` و`name` و`order` و`strict` و`dryRun` و`failFast` و`retry` و`retryTagFilter` كما في التشغيل التسلسلي. ويتم الإبلاغ عن الميزات والسيناريوهات والخطوات والخطافات (hooks) كما في التشغيل التسلسلي، وكذلك مع `ignoreUndefinedDefinitions` و`failAmbiguousDefinitions` و`tagsInTitle` و`scenarioLevelReporter`.

## الخيارات

| الخيار | القيم | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | غير مضبوط (تسلسلي) | يفعّل الوضع المتوازي ويحدد مقدار ما تتشاركه الاختبارات. |
| `maxParallelContexts` | رقم | `os.cpus().length` | عدد الاختبارات التي تعمل في الوقت نفسه. |

اضبط كليهما في `mochaOpts` أو في `cucumberOpts`.

يحدد `maxParallelContexts` عدد الفتحات (slots). تشغّل كل فتحة اختبارًا واحدًا في كل مرة، وتفتح النافذة لاختبارها التالي أثناء تشغيل الاختبار الحالي، وتغلق النافذة السابقة في الخلفية. لذلك قد يكون ما يصل إلى 3 × `maxParallelContexts` نافذة، بالإضافة إلى النافذة الأولى للجلسة، مفتوحًا لفترة قصيرة: إذ يمكن أن تحتوي كل فتحة على نافذة نشطة، ونافذة مُجهّزة مسبقًا، ونافذة قيد الإغلاق. لا يغلق الوضع المتوازي إلا النوافذ التي فتحها.

## الاختيار بين `contexts` و`userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| نافذة لكل اختبار | نعم | نعم |
| ملفات تعريف الارتباط و`localStorage` وعمّال الخدمة (service workers) | مشتركة بين جميع الاختبارات | معزولة لكل اختبار ([سياق المستخدم](https://w3c.github.io/webdriver-bidi/#user-context)) |
| تسجيل الدخول | مرة واحدة، إذا أعادت الاختبارات استخدام ملف تعريف ارتباط الجلسة | في كل اختبار |
| دعم برامج التشغيل (drivers) | أي متصفح يدعم BiDi | يحتاج إلى دعم `browser.createUserContext()`، وإلا يفشل التشغيل |

اختر `'contexts'` بشكل افتراضي. واختر `'userContexts'` عندما يجب ألا ترى الاختبارات ملفات تعريف الارتباط أو التخزين الخاصة ببعضها، على سبيل المثال الاختبارات التي تسجّل الدخول بمستخدمين مختلفين. ومثل `'contexts'`، يعود `'userContexts'` إلى التشغيل التسلسلي مع تحذير عندما لا تكون الجلسة WebDriver BiDi أو عندما تكون `'wdio:experimentalBiDiCommands'` مفقودة من الخصائص. أما إذا لم يدعم برنامج التشغيل `browser.createUserContext`، فإن التشغيل يفشل بدلًا من العودة إلى الوضع التسلسلي.

علامة التبويب أو النافذة التي يفتحها اختبار باستخدام `browser.newWindow(url)` تُفتح من نافذة الاختبار، لذا تحمل ملفات تعريف الارتباط والتخزين الخاصة بالاختبار. لفتح نافذة خارج عزل ملفات تعريف الارتباط والتخزين الخاص بالاختبار، أنشئها باستخدام `browser.browsingContextCreate()`، واحصل على سياق التصفح الخاص بها من `browser.browsingContexts()`:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## ما يملكه كل اختبار

داخل اختبار متوازٍ، تعمل هذه الأوامر على نافذة الاختبار الخاصة:

- التنقل: `url` و`back` و`forward` و`refresh` و`getUrl` و`getTitle`
- أوامر العناصر: `$` و`$$` و`shadow$` و`click` و`setValue` و`getText` وأوامر `waitFor*` وغيرها
- `execute` و`actions` و`addInitScript`
- ملفات تعريف الارتباط: تستخدم `getCookies` و`setCookies` و`deleteCookies` قسم ملفات تعريف الارتباط الخاص بالاختبار
- `mock()`: المحاكاة (mock) المُنشأة في اختبار متوازٍ لا تعترض ولا تسجّل إلا طلبات نافذة ذلك الاختبار وإطاراتها، لذا يمكن لاختبارين محاكاة عنوان URL نفسه
- لقطات الشاشة: `saveScreenshot` و`takeElementScreenshot`

## الأوامر التي ترمي أخطاء في الوضع المتوازي

تعمل بعض الأوامر على المتصفح بأكمله أو الجلسة بأكملها، لذا لا يمكنها استهداف نافذة اختبار واحد. داخل اختبار متوازٍ، ترمي هذه الأوامر خطأً بدلًا من التأثير على اختبار آخر:

| الأوامر | السبب | البديل |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | نافذة نظام التشغيل مشتركة | استخدم `browser.setViewport()` لضبط حجم صفحة الاختبار. تتشارك الاختبارات المتوازية نافذة نظام تشغيل واحدة |
| `throttleNetwork`، `throttleCPU` | تُطبَّق على المتصفح بأكمله | شغّل تلك الاختبارات بدون الوضع المتوازي |
| `closeWindow`، `switchToParentFrame` | تغيّر النافذة المُركَّز عليها، والتي تتشاركها جميع الاختبارات | أبقِ كل اختبار في نافذته الخاصة |
| `reloadSession`، `setTimeout` | تغيّر الجلسة التي تتشاركها جميع الاختبارات | استدعها في خطاف `before` في `wdio.conf.ts` |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | التنبيهات تنتمي إلى سياق تصفح | استدعها على السياق الذي تُرجعه `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. استخدم `page.acceptAlert(text)` بدلًا من `sendAlertText(text)`. تعمل `dismissAlert()` و`getAlertText()` على السياق أيضًا |
| `getComputedRole`، `getComputedLabel` | لا يستطيع WebDriver BiDi قراءتها | شغّل تلك الاختبارات بدون الوضع المتوازي |

أُزيل `switchWindow` لجميع جلسات WebDriver BiDi في الإصدار v10، وليس فقط في الوضع المتوازي. وهو يرمي الخطأ ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` احتفظ بكائن السياق بدلًا من التبديل إليه.

يرفض WebdriverIO مربعات الحوار (prompts) تلقائيًا ما لم يكن هناك ما يستمع إلى حدث `dialog`، لذا سجّل مستمعًا (`browser.on('dialog', () => {})`) قبل أن تجيب على مربع حوار من داخل اختبار.

كل أوامر WebDriver Classic الأخرى ترمي أخطاء أيضًا. يُسمح فقط بـ `status` و`getTimeouts` و`getWindowHandles`. إذا عاد أمر من أوامر WebdriverIO إلى WebDriver Classic في الوضع المتوازي دون أن تستدعي أنت أمرًا من Classic، يُرجى [الإبلاغ عن ذلك](https://github.com/webdriverio/webdriverio/issues/new/choose).

## الخطافات والمهلات

### Mocha

- تعمل `before()` و`after()` في ملف المواصفات **مرة واحدة لكل اختبار**، وليس مرة واحدة لكل `describe`، لأن لكل اختبار نافذته الخاصة. يشغّل كل اختبار `before` و`beforeEach` والاختبار و`afterEach` و`after` في نافذته. ضع الإعداد الذي يجب أن يعمل مرة واحدة لكل ملف مواصفات في خطافات `beforeSuite` / `afterSuite` في `wdio.conf.ts`. تعمل هذه مرة واحدة، خارج أي نافذة اختبار.
- بما أن كل اختبار يشغّل خطافاته الخاصة، فإن الخطاف الفاشل لا يؤثر إلا على اختباره. يُبلَّغ عن فشل `before()` مرة واحدة لكل اختبار، وليس مرة واحدة لـ `describe`. ولا يوقف فشل `beforeEach()` أو `afterEach()` الاختبارات الأخرى في `describe`، بينما في التشغيل التسلسلي يتخطاها Mocha. مع `failHookAffectedTests` (الافتراضي)، يفشل الاختبار الذي تخطاه فشل `before()` أو `beforeEach()` بالنص نفسه كما في التشغيل التسلسلي. فقط عنوان الخطاف قد يختلف: إذ يذكر فشل `beforeEach()` اختبار نافذته الخاصة (`"before each" hook for "t2"`)، بينما يذكر التشغيل التسلسلي الاختبار الأول لجميعها.
- لا يُطبَّق سوى `mochaOpts.timeout`. يرمي `this.timeout()` في اختبار أو خطاف خطأً، ويُتجاهل `it(...).timeout()` أو مهلة `describe` مع تحذير. راجع [مهلات Mocha وخطافات WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- لا يُدعم `mochaOpts.bail` ولا إعادة المحاولة في Mocha، ويؤديان إلى فشل التشغيل: `mochaOpts.retries` و`this.retries(n)` في `describe` و`it(...).retries(n)`. يرمي `this.retries()` في اختبار أو خطاف خطأً. تعمل [إعادة المحاولة في WebdriverIO](./Retry.md) (`it(title, fn, retries)`) في الوضع المتوازي.
- تعمل `.only()` و`this.skip()` و`grep` و`fgrep` و`invert` كما في التشغيل التسلسلي.
- الخطأ الذي لا ينتظره أي اختبار (على سبيل المثال مؤقّت يرمي خطأً) يُفشل الاختبار أو الخطاف الخاص بالنافذة التي جاء منها، وتستمر الاختبارات الأخرى. وكما في التشغيل التسلسلي، لا يُفشل الرفض غير المعالج (unhandled rejection) أي اختبار، ومع `mochaOpts.allowUncaught` يُنهي الخطأ العامل. أما الخطأ الذي يأتي بعد انتهاء اختباره، بينما لا تزال اختبارات أخرى قيد التشغيل، فإنه يُفشل التشغيل ويُسجَّل، لكن لا يظهر في أي اختبار (يُظهره التشغيل التسلسلي على الاختبار الذي يعمل في ذلك الوقت). بعد إغلاق آخر نافذة، يُنهي مثل هذا الخطأ العامل، كما في التشغيل التسلسلي. وينطبق الأمر نفسه على الخطأ الصادر من باعث أحداث (event emitter) أنشأته شيفرتك خارج اختبار، وعلى Node.js 22 بالنسبة للخطأ الصادر من `queueMicrotask()`، لأن نافذة الاختبار غير معروفة هناك.
- لا تُطبَّق `mochaOpts.dryRun` و`forbidPending` و`checkLeaks` في الوضع المتوازي بعد: إذ تعمل الاختبارات، ولا يفشل الاختبار المعلّق، ولا يُبلَّغ عن التسرّب العام (global leak).

### Cucumber

- تعمل `BeforeAll` / `AfterAll` وخطافات `beforeFeature` / `afterFeature` في `wdio.conf.ts` مرة واحدة لكل عامل، وليس مرة واحدة لكل ميزة. تتلقى `beforeFeature` / `afterFeature` الـ uri والميزة الخاصة بملف الميزة الأول فقط، وهو أمر مهم عندما يشغّل عامل واحد عدة ملفات ميزات، على سبيل المثال المواصفات المجمّعة. وهي تعمل خارج نافذة أي سيناريو، لذا يجب ألا تستخدم أوامر تحتاج إلى نافذة.
- تعمل `Before` / `After` و`BeforeStep` / `AfterStep` وخطافات السيناريو والخطوة في `wdio.conf.ts` لكل سيناريو، في نافذة ذلك السيناريو.
- القيمة الافتراضية لـ `cucumberOpts.strict` هي `false` في WebdriverIO. لا تُفشل الخطوة المعلّقة السيناريو إلا مع `strict: true`.
- مع `failFast`، تكتمل السيناريوهات التي تعمل بالفعل في نوافذ أخرى بعد الفشل الأول. ويُبلَّغ عن السيناريوهات التي لم تبدأ على أنها متخطاة، كما في التشغيل التسلسلي.
- مع `ignoreUndefinedDefinitions: true`، تؤدي الخطوة الملتبسة (مع `failAmbiguousDefinitions: false`)، أو الخطوة المعلّقة مع `strict: true`، إلى فشل التشغيل. بينما ينجح التشغيل التسلسلي في هذه الحالة.
- لا تعمل منسّقات Cucumber (`format` و`formatOptions` و`publish`)، لذا لا تكتب أي ملف.

### كلا الإطارين

تُغلق نافذة الاختبار بمجرد انتهاء الاختبار. لا تبدأ مؤقّتات أو وعودًا (promises) تستمر في العمل بعد انتهاء الاختبار.

## تغييرات سلوك أوامر عناصر BiDi

تستبدل `'wdio:experimentalBiDiCommands': true` تنفيذ العديد من أوامر العناصر في كل اختبار في الجلسة، سواء كان تسلسليًا أو متوازيًا:

- ترسل `addValue` و`clearValue` أحداث DOM اصطناعية، وليس أحداث مفاتيح موثوقة.
- تتبع `getAttribute` قواعد WebDriver لقيم الخصائص والسمات.
- تُرسَل `click` عبر Actions API.

شغّل مجموعة اختباراتك مرة واحدة مع هذه الخاصية وبدون `parallelMode` للعثور على الاختبارات التي تعتمد على سلوك Classic.

## المُبلِّغات (Reporters)

المُبلِّغات التي توسّع [`@wdio/reporter`](./CustomReporter.md) تُبلّغ عن الاختبارات المتوازية تحت المجموعة الصحيحة، وتُرفق كل أمر بالاختبار الذي أرسله سياق التصفح الخاص به.

يدعم `@wdio/allure-reporter` الوضع المتوازي مع Mocha. فهو يكتب نتيجة الاختبار عندما ينتهي الاختبار وخطافا `afterEach()` و`after()` الخاصان به. تعمل خطافات `before()` و`after()` مرة واحدة لكل اختبار في الوضع المتوازي، لذا يُظهر التقرير تجهيزاتها (fixtures) مرة واحدة لكل اختبار. أما مع Cucumber، فلا يدعم Allure الوضع المتوازي بعد: إذ قد تظهر النتائج والخطوات والمرفقات الخاصة بالسيناريوهات المتداخلة تحت السيناريو الخطأ، لذا استخدمه مع التشغيلات التسلسلية.

لا يدعم `@wdio/spec-reporter` الوضع المتوازي بعد: إذ تُعرض كتلة `describe` في Mocha تأتي بعد كتلة أخرى، أو سيناريو Cucumber يبدأ أثناء تشغيل سيناريو آخر، متداخلةً تحته، ومع `retry` في Cucumber قد يكون عدد الاختبارات الناجحة خاطئًا. أما نتائج الاختبارات ورمز الخروج فهي صحيحة.

لا يدعم `@wdio/cucumberjs-json-reporter` الوضع المتوازي بعد: إذ قد تظهر الخطوات والمرفقات الخاصة بالسيناريوهات المتداخلة في السيناريو الخطأ، ويسجّل المُبلِّغ تحذيرًا. استخدمه مع التشغيلات التسلسلية.

لا يدعم `@wdio/html-reporter` الوضع المتوازي بعد: إذ قد تظهر السجلات ولقطات الشاشة ومقاطع الفيديو التي يرسلها اختبار بعد بدء اختبار آخر تحت الاختبار الخطأ. استخدمه مع التشغيلات التسلسلية.

يسجّل `@wdio/video-reporter` كل اختبار متوازٍ في مقطع فيديو خاص به. ومع Cucumber، لا يُرفق مقاطع الفيديو بـ Allure.

يجب ألا يفترض المُبلِّغ المخصص أن الاختبار ينتهي قبل أن يبدأ الاختبار التالي. راجع [المُبلِّغات والاختبارات المتوازية](./CustomReporter.md#reporters-and-parallel-tests).

## مزوّدو الخدمات السحابية

يسجّل مزوّدو الخدمات السحابية مقطع فيديو واحدًا، ومجموعة سجلات واحدة، وحالة اختبار واحدة لكل جلسة متصفح. في الوضع المتوازي، تتشارك اختبارات كثيرة تلك الجلسة، لذا لا تستطيع لوحة تحكم المزوّد تقسيم الفيديو أو السجلات أو حالة النجاح/الفشل حسب الاختبار. كما يحتاج `userContexts` إلى أن تدعم شبكة المزوّد `browser.createUserContext` (و`browser.removeUserContext` مع Mocha). لم يُختبر الوضع المتوازي على أي مزوّد خدمات سحابية بعد.

نوصي بأن تُبقي الوضع المتوازي معطّلًا عند التشغيل على مزوّد خدمات سحابية، وأن تستخدم [`maxInstances`](./OrganizingTestSuites.md) لتشغيل ملفات المواصفات بالتوازي. لتعطيله، أزل `parallelMode` من خيارات الإطار. إذا أزلت `'wdio:experimentalBiDiCommands'` فقط، فستعمل الاختبارات واحدًا تلو الآخر وسيسجّل كل تشغيل تحذيرًا.

## استكشاف الأخطاء وإصلاحها

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

أضف `'wdio:experimentalBiDiCommands': true` إلى الخاصية. بدونها، تعمل الاختبارات واحدًا تلو الآخر. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

تستخدم الجلسة WebDriver Classic. أزل `'wdio:enforceWebDriverClassic': true` من الخاصية، أو استخدم متصفحًا وبرنامج تشغيل يدعمان WebDriver BiDi. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

لا يستطيع برنامج التشغيل إنشاء سياقات مستخدم. استخدم `parallelMode: 'contexts'` أو حدّث المتصفح وبرنامج التشغيل. مع Cucumber، تكون الرسالة `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` or `... is not supported in parallel mode`

استدعى الاختبار أمرًا من [الأوامر التي ترمي أخطاء في الوضع المتوازي](#commands-that-throw-in-parallel-mode). استخدم البديل الموجود في الجدول.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

أزل `mochaOpts.bail` أو `mochaOpts.retries`، أو `this.retries(n)` / `.retries(n)` الخاص بالاختبار الذي يذكره الخطأ، أو شغّل ملف المواصفات بدون `parallelMode`. لإعادة محاولة اختبار في الوضع المتوازي، استخدم [إعادة المحاولة في WebdriverIO](./Retry.md) (`it(title, fn, retries)`).

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

يحتوي ملف المواصفات على خطافات `before()` أو `after()`. وهي تعمل لكل اختبار. انقل الإعداد الذي يجب أن يعمل مرة واحدة فقط إلى `beforeSuite` / `afterSuite` في `wdio.conf.ts`.

## صفحات ذات صلة

- [تنظيم مجموعات الاختبار](./OrganizingTestSuites.md): تشغيل ملفات المواصفات بالتوازي باستخدام `maxInstances`
- [التجزئة (Sharding)](./Sharding.md): تقسيم مجموعة الاختبارات على عدة أجهزة
- [الأطر](./Frameworks.md): جميع خيارات Mocha وCucumber
- [بروتوكولات الأتمتة](./AutomationProtocols.md): WebDriver BiDi وWebDriver Classic