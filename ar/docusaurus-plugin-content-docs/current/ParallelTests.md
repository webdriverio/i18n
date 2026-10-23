---
id: parallel-tests
title: الاختبارات المتوازية في ملف Spec
description: "شغّل اختبارات Mocha أو سيناريوهات Cucumber الموجودة في ملف spec واحد في الوقت نفسه، كلٌّ منها في سياق تصفح WebDriver BiDi خاص به، باستخدام mochaOpts.parallelMode أو cucumberOpts.parallelMode، وهو شكل من أشكال تجميع المتصفحات (browser pooling) يشبه fullyParallel في Playwright."
---

منذ الإصدار v10، يستطيع WebdriverIO تشغيل اختبارات ملف spec واحد في الوقت نفسه. يحصل كل `it()` في Mocha أو كل سيناريو في Cucumber على نافذة متصفح خاصة به ([سياق تصفح](https://w3c.github.io/webdriver-bidi/#browsing-context) في WebDriver BiDi) ضمن عامل (worker) واحد وجلسة متصفح واحدة. استخدمه مع ملفات spec التي تحتوي على العديد من الاختبارات المستقلة: إذ تنتهي بشكل أسرع، ولا تحتاج إلى المزيد من عمليات العمال أو جلسات المتصفح، لأن كل اختبار لا يتحمّل سوى تكلفة فتح نافذة.

إنه شكل من أشكال تجميع المتصفحات (browser pooling): تتشارك الاختبارات مجموعة من النوافذ في متصفح واحد، وليس مجموعة من المتصفحات. إذا كنت قادمًا من Playwright، فإن `parallelMode: 'userContexts'` هو أقرب مكافئ لـ [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file): إذ يحصل كل اختبار على سياق معزول خاص به. الفرق هو أن Playwright يوزّع اختبارات الملف على عمليات عمال متعددة، لكل منها متصفحها الخاص، بينما يشغّلها WebdriverIO في الوقت نفسه ضمن عامل واحد ومتصفح واحد.

هذا منفصل عن [`maxInstances`](./OrganizingTestSuites.md)، الذي يشغّل ملفات spec كاملة بالتوازي، بعامل واحد وجلسة واحدة لكل ملف spec. يمكنك الجمع بين الاثنين: يحدد `maxInstances` عدد ملفات spec التي تعمل في الوقت نفسه، ويحدد `maxParallelContexts` عدد الاختبارات التي تعمل في الوقت نفسه داخل كل ملف من تلك الملفات.

:::warning تجريبي
يتطلب الوضع المتوازي القدرة (capability) التجريبية `'wdio:experimentalBiDiCommands'`، والتي تغيّر طريقة تنفيذ أوامر العناصر في كل اختبار، وليس في الاختبارات المتوازية فقط. راجع [تغييرات سلوك أوامر عناصر BiDi](#behavior-changes-of-the-bidi-element-commands).
:::

## تفعيل الوضع المتوازي

تحتاج إلى:

- جلسة WebDriver BiDi (وهي الافتراضية، ما لم تضبط `'wdio:enforceWebDriverClassic': true`)،
- القدرة `'wdio:experimentalBiDiCommands': true`،
- `@wdio/mocha-framework` أو `@wdio/cucumber-framework`. لا يدعم Jasmine الوضع المتوازي.

إذا لم تستخدم الجلسة BiDi، أو كانت القدرة مفقودة، يسجّل WebdriverIO تحذيرًا ويشغّل الاختبارات واحدًا تلو الآخر. بدون `parallelMode`، لا يتغير شيء.

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

لا يحتاج ملف spec إلى أي تغييرات:

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

يعمل الاختباران في الوقت نفسه، كلٌّ منهما في نافذته الخاصة. تعمل `browser.url()` و`$()` و`expect()` على نافذة الاختبار الذي يستدعيها.

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

يعمل كل سيناريو من ملف feature في نافذته الخاصة. تعمل الملفات الشخصية (`cucumberOpts.profiles` و`cucumberOpts.file`)، وملفات spec مع أرقام الأسطر (`--spec ./features/login.feature:5`) والخيارات `tags` و`name` و`order` و`strict` و`dryRun` و`failFast` و`retry` و`retryTagFilter` كما في التشغيل المتسلسل. يتم الإبلاغ عن الميزات والسيناريوهات والخطوات والخطافات (hooks) كما في التشغيل المتسلسل، وكذلك مع `ignoreUndefinedDefinitions` و`failAmbiguousDefinitions` و`tagsInTitle` و`scenarioLevelReporter`.

## الخيارات

| الخيار | القيم | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`، `'userContexts'` | غير مضبوط (متسلسل) | يفعّل الوضع المتوازي ويحدد مقدار ما تتشاركه الاختبارات. |
| `maxParallelContexts` | رقم | `os.cpus().length` | عدد الاختبارات التي تعمل في الوقت نفسه. |

اضبط كليهما في `mochaOpts` أو في `cucumberOpts`.

يحدد `maxParallelContexts` عدد الخانات (slots). تشغّل كل خانة اختبارًا واحدًا في كل مرة، وتفتح النافذة للاختبار التالي أثناء تشغيل الاختبار الحالي، وتغلق النافذة السابقة في الخلفية. لذلك يمكن أن تكون حتى 3 × `maxParallelContexts` نافذة، بالإضافة إلى النافذة الأولى للجلسة، مفتوحة لفترة قصيرة: إذ يمكن لكل خانة أن تحتوي على نافذة نشطة، ونافذة مُجهّزة مسبقًا، ونافذة قيد الإغلاق. لا يغلق الوضع المتوازي إلا النوافذ التي فتحها.

## الاختيار بين `contexts` و`userContexts`

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| نافذة لكل اختبار | نعم | نعم |
| ملفات تعريف الارتباط و`localStorage` وعمّال الخدمة (service workers) | مشتركة بين جميع الاختبارات | معزولة لكل اختبار ([سياق المستخدم](https://w3c.github.io/webdriver-bidi/#user-context)) |
| تسجيل الدخول | مرة واحدة، إذا أعادت الاختبارات استخدام ملف تعريف ارتباط الجلسة | في كل اختبار |
| دعم برامج التشغيل | أي متصفح يدعم BiDi | يحتاج إلى دعم `browser.createUserContext()`، وإلا يفشل التشغيل |

اختر `'contexts'` افتراضيًا. اختر `'userContexts'` عندما يجب ألا ترى الاختبارات ملفات تعريف الارتباط أو التخزين الخاصة ببعضها البعض، على سبيل المثال الاختبارات التي تسجّل الدخول كمستخدمين مختلفين. مثل `'contexts'`، يعود `'userContexts'` إلى التشغيل المتسلسل مع تحذير عندما لا تكون الجلسة WebDriver BiDi أو عندما تكون `'wdio:experimentalBiDiCommands'` مفقودة من القدرات. إذا كان برنامج التشغيل لا يدعم `browser.createUserContext`، يفشل التشغيل بدلًا من العودة إلى الوضع المتسلسل.

يفتح `browser.newWindow()` النافذة في سياق المستخدم الافتراضي، لذا فإن النافذة المفتوحة بهذه الطريقة تكون خارج عزل ملفات تعريف الارتباط والتخزين الخاص بالاختبار.

## ما يملكه كل اختبار

داخل الاختبار المتوازي، تعمل هذه الأوامر على نافذة الاختبار الخاصة:

- التنقل: `url` و`back` و`forward` و`refresh` و`getUrl` و`getTitle`
- أوامر العناصر: `$` و`$$` و`shadow$` و`click` و`setValue` و`getText` وأوامر `waitFor*` وغيرها
- `execute` و`actions` و`addInitScript`
- ملفات تعريف الارتباط: تستخدم `getCookies` و`setCookies` و`deleteCookies` قسم ملفات تعريف الارتباط الخاص بالاختبار
- `mock()`: المحاكاة (mock) التي يتم إنشاؤها في اختبار متوازٍ لا تعترض وتسجّل إلا طلبات نافذة ذلك الاختبار وإطاراتها، لذا يمكن لاختبارين محاكاة عنوان URL نفسه
- لقطات الشاشة: `saveScreenshot` و`takeElementScreenshot`

## الأوامر التي ترمي أخطاء في الوضع المتوازي

تعمل بعض الأوامر على المتصفح بأكمله أو الجلسة بأكملها، لذا لا يمكنها استهداف نافذة اختبار واحد. داخل الاختبار المتوازي، ترمي هذه الأوامر خطأً بدلًا من التأثير على اختبار آخر:

| الأوامر | السبب | البديل |
| --- | --- | --- |
| `getWindowSize`، `setWindowSize` | نافذة نظام التشغيل مشتركة | استخدم `browser.setViewport()` لتحديد حجم صفحة الاختبار. تتشارك الاختبارات المتوازية نافذة نظام تشغيل واحدة |
| `throttleNetwork`، `throttleCPU` | تنطبق على المتصفح بأكمله | شغّل تلك الاختبارات بدون الوضع المتوازي |
| `closeWindow`، `switchToParentFrame` | تغيّر النافذة المُركَّز عليها، والتي تتشاركها جميع الاختبارات | أبقِ كل اختبار في نافذته الخاصة |
| `reloadSession`، `setTimeout` | تغيّر الجلسة التي تتشاركها جميع الاختبارات | استدعها في الخطاف `before` في `wdio.conf.ts` |
| `acceptAlert`، `dismissAlert`، `getAlertText`، `sendAlertText` | التنبيهات تنتمي إلى سياق تصفح | استدعها على السياق الذي يُرجعه `browser.url()`: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`. استخدم `page.acceptAlert(text)` بدلًا من `sendAlertText(text)`. تعمل `dismissAlert()` و`getAlertText()` على السياق أيضًا |
| `getComputedRole`، `getComputedLabel` | لا يستطيع WebDriver BiDi قراءتها | شغّل تلك الاختبارات بدون الوضع المتوازي |

تمت إزالة `switchWindow` لجميع جلسات WebDriver BiDi في الإصدار v10، وليس في الوضع المتوازي فقط. وهي ترمي الخطأ ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` احتفظ بكائن السياق بدلًا من التبديل إليه.

يرفض WebdriverIO نوافذ المطالبة (prompts) تلقائيًا ما لم يكن هناك شيء يستمع إلى الحدث `dialog`، لذا سجّل مستمعًا (`browser.on('dialog', () => {})`) قبل أن تجيب على مطالبة من اختبار.

كما ترمي جميع أوامر WebDriver Classic الأخرى خطأً. لا يُسمح إلا بـ `status` و`getTimeouts` و`getWindowHandles`. إذا عاد أحد أوامر WebdriverIO إلى WebDriver Classic في الوضع المتوازي دون أن تستدعي أمر Classic، يُرجى [الإبلاغ عن ذلك](https://github.com/webdriverio/webdriverio/issues/new/choose).

## الخطافات والمهل الزمنية

### Mocha

- يعمل `before()` و`after()` في ملف spec **مرة واحدة لكل اختبار**، وليس مرة واحدة لكل `describe`، لأن لكل اختبار نافذته الخاصة. يشغّل كل اختبار `before` و`beforeEach` والاختبار و`afterEach` و`after` في نافذته. ضع الإعداد الذي يجب أن يعمل مرة واحدة لكل ملف spec في الخطافين `beforeSuite` / `afterSuite` في `wdio.conf.ts`. يعمل هذان مرة واحدة، خارج أي نافذة اختبار.
- لا ينطبق إلا `mochaOpts.timeout`. يرمي `this.timeout()` في اختبار أو خطاف خطأً، ويتم تجاهل `it(...).timeout()` أو مهلة `describe` مع تحذير. راجع [مهل Mocha الزمنية وخطافات WebdriverIO](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks).
- الخياران `mochaOpts.bail` و`mochaOpts.retries` غير مدعومين ويؤديان إلى فشل التشغيل. يرمي `this.retries()` خطأً.
- تعمل `.only()` و`this.skip()` و`grep` و`fgrep` و`invert` كما في التشغيل المتسلسل.

### Cucumber

- يعمل `BeforeAll` / `AfterAll` والخطافان `beforeFeature` / `afterFeature` في `wdio.conf.ts` مرة واحدة لكل عامل، وليس مرة واحدة لكل ميزة. يتلقى `beforeFeature` / `afterFeature` الـ uri والميزة لملف feature الأول فقط، وهو أمر مهم عندما يشغّل عامل واحد عدة ملفات feature، على سبيل المثال ملفات spec المجمّعة. تعمل هذه الخطافات خارج نافذة أي سيناريو، لذا يجب ألا تستخدم أوامر تحتاج إلى نافذة.
- يعمل `Before` / `After` و`BeforeStep` / `AfterStep` وخطافات السيناريو والخطوات في `wdio.conf.ts` لكل سيناريو، في نافذة ذلك السيناريو.
- القيمة الافتراضية لـ `cucumberOpts.strict` هي `false` في WebdriverIO. لا تؤدي الخطوة المعلّقة (pending) إلى فشل السيناريو إلا مع `strict: true`.
- مع `failFast`، تنتهي السيناريوهات التي تعمل بالفعل في نوافذ أخرى بعد الفشل الأول. يتم الإبلاغ عن السيناريوهات التي لم تبدأ على أنها متخطاة، كما في التشغيل المتسلسل.
- مع `ignoreUndefinedDefinitions: true`، تؤدي الخطوة الغامضة (مع `failAmbiguousDefinitions: false`)، أو الخطوة المعلّقة مع `strict: true`، إلى فشل التشغيل. بينما ينجح التشغيل المتسلسل في هذه الحالة.
- لا تعمل منسّقات Cucumber (`format` و`formatOptions` و`publish`)، لذا لا تكتب أي ملف.

### كلا الإطارين

تُغلق نافذة الاختبار بمجرد انتهاء الاختبار. لا تبدأ مؤقتات أو وعودًا (promises) تستمر في العمل بعد انتهاء الاختبار.

## تغييرات سلوك أوامر عناصر BiDi

يستبدل `'wdio:experimentalBiDiCommands': true` تنفيذ العديد من أوامر العناصر في كل اختبار من الجلسة، سواء كان متسلسلًا أو متوازيًا:

- يرسل `addValue` و`clearValue` أحداث DOM اصطناعية، وليس أحداث مفاتيح موثوقة.
- يتبع `getAttribute` قواعد WebDriver لقيم الخصائص والسمات.
- يُرسَل `click` عبر Actions API.

شغّل مجموعة اختباراتك مرة واحدة مع القدرة وبدون `parallelMode` للعثور على الاختبارات التي تعتمد على سلوك Classic.

## المُبلِّغون (Reporters)

المُبلِّغون الذين يمتدون من [`@wdio/reporter`](./CustomReporter.md) يُبلغون عن الاختبارات المتوازية تحت المجموعة الصحيحة، ويربطون كل أمر بالاختبار الذي أرسله سياق تصفحه.

يدعم `@wdio/allure-reporter` الوضع المتوازي مع Mocha. وهو يكتب نتيجة الاختبار عند انتهائه. تعمل خطافات `before()` و`after()` مرة واحدة لكل اختبار في الوضع المتوازي، لذا يعرض التقرير تجهيزاتها (fixtures) مرة واحدة لكل اختبار. مع Cucumber، لا يدعم Allure الوضع المتوازي بعد: قد تظهر النتائج والخطوات والمرفقات الخاصة بالسيناريوهات المتداخلة تحت السيناريو الخطأ، لذا استخدمه مع التشغيل المتسلسل.

لا يدعم `@wdio/spec-reporter` الوضع المتوازي بعد: تظهر كتلة `describe` في Mocha التي تأتي بعد أخرى، أو سيناريو Cucumber الذي يبدأ أثناء تشغيل سيناريو آخر، متداخلة تحتها، ومع `retry` في Cucumber قد يكون عدد الاختبارات الناجحة خاطئًا. نتائج الاختبارات ورمز الخروج صحيحة.

لا يدعم `@wdio/cucumberjs-json-reporter` الوضع المتوازي بعد: قد تظهر الخطوات والمرفقات الخاصة بالسيناريوهات المتداخلة في السيناريو الخطأ، ويسجّل المُبلِّغ تحذيرًا. استخدمه مع التشغيل المتسلسل.

لا يدعم `@wdio/html-reporter` الوضع المتوازي بعد: قد تظهر السجلات ولقطات الشاشة ومقاطع الفيديو التي يرسلها اختبار بعد بدء اختبار آخر تحت الاختبار الخطأ. استخدمه مع التشغيل المتسلسل.

يجب ألا يفترض المُبلِّغ المخصص أن الاختبار ينتهي قبل بدء الاختبار التالي. راجع [المُبلِّغون والاختبارات المتوازية](./CustomReporter.md#reporters-and-parallel-tests).

## مزودو الخدمات السحابية

يسجّل مزودو الخدمات السحابية فيديو واحدًا ومجموعة سجلات واحدة وحالة اختبار واحدة لكل جلسة متصفح. في الوضع المتوازي، تتشارك العديد من الاختبارات تلك الجلسة، لذا لا تستطيع لوحة تحكم المزود تقسيم الفيديو أو السجلات أو حالة النجاح/الفشل حسب الاختبار. كما يحتاج `userContexts` إلى أن تدعم شبكة (grid) المزود `browser.createUserContext` (و`browser.removeUserContext` مع Mocha). لم يتم اختبار الوضع المتوازي على أي مزود خدمات سحابية بعد.

نوصي بإيقاف الوضع المتوازي عند التشغيل على مزود خدمات سحابية واستخدام [`maxInstances`](./OrganizingTestSuites.md) لتشغيل ملفات spec بالتوازي. لإيقافه، أزل `parallelMode` من خيارات الإطار. إذا أزلت `'wdio:experimentalBiDiCommands'` فقط، تعمل الاختبارات واحدًا تلو الآخر ويسجّل كل تشغيل تحذيرًا.

## استكشاف الأخطاء وإصلاحها

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

أضف `'wdio:experimentalBiDiCommands': true` إلى القدرة. بدونها، تعمل الاختبارات واحدًا تلو الآخر. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`.

### `... is set but the browser session does not support WebDriver Bidi`

تستخدم الجلسة WebDriver Classic. أزل `'wdio:enforceWebDriverClassic': true` من القدرة، أو استخدم متصفحًا وبرنامج تشغيل يدعمان WebDriver BiDi. مع Cucumber، تكون الرسالة `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

لا يستطيع برنامج التشغيل إنشاء سياقات المستخدم. استخدم `parallelMode: 'contexts'` أو حدّث المتصفح وبرنامج التشغيل. مع Cucumber، تكون الرسالة `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` أو `... is not supported in parallel mode`

استدعى الاختبار أمرًا من [الأوامر التي ترمي أخطاء في الوضع المتوازي](#commands-that-throw-in-parallel-mode). استخدم البديل من الجدول.

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

أزل `mochaOpts.bail` أو `mochaOpts.retries`، أو شغّل ملف spec بدون `parallelMode`.

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

يحتوي ملف spec على خطافات `before()` أو `after()`. وهي تعمل لكل اختبار. انقل الإعداد الذي يجب أن يعمل مرة واحدة فقط إلى `beforeSuite` / `afterSuite` في `wdio.conf.ts`.

## صفحات ذات صلة

- [تنظيم مجموعات الاختبار](./OrganizingTestSuites.md): تشغيل ملفات spec بالتوازي باستخدام `maxInstances`
- [التجزئة (Sharding)](./Sharding.md): تقسيم مجموعة الاختبارات عبر عدة أجهزة
- [الأطر](./Frameworks.md): جميع خيارات Mocha وCucumber
- [بروتوكولات الأتمتة](./AutomationProtocols.md): WebDriver BiDi وWebDriver Classic